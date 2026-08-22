# outbid.love

Çürüyen bid mekaniğiyle çalışan sıralama tablosu.

**Kuruluş fazı:** ödeme kapalı. İlk 30 kayıt ücretsiz ve herkes $10 çürüyen
kredi ile başlıyor. Sıralamayı belirleyen tek şey etkin tutar; her ödeme kendi
tarihinden itibaren günde %10 eriyor — **cron job yok**, çürüme okuma anında
SQL'de hesaplanıyor.

Veritabanı **kurulu ve çalışıyor**. Bağlantı bilgileri `lib/db.ts` içinde
varsayılan olarak gömülü (Supabase publishable key — tarayıcıya açılması
tasarım gereği güvenli, taban tablolar RLS ile kapalı). Yani **hiçbir ortam
değişkeni girmeden deploy edip çalıştırabilirsin.**

---

## Yayına alma — GitHub üzerinden (önerilen)

Panel üzerinden tek seferlik kurulum; sonrasında her `git push` otomatik deploy.

### 1. GitHub'a koy

**Terminal biliyorsan:**

```bash
cd outbid-love
git init && git add -A && git commit -m "outbid.love"
gh repo create outbid-love --private --source=. --push
```

**Terminal kullanmak istemiyorsan:** github.com → **New repository** → adı
`outbid-love` → oluştur → **uploading an existing file** bağlantısına tıkla →
bu klasörün *içindeki* dosyaları (klasörün kendisini değil) sürükle bırak →
Commit.

> `node_modules` ve `.next` klasörlerini yükleme. Zip'te zaten yoklar.

### 2. Vercel'e bağla

vercel.com → **Add New → Project** → GitHub deposunu seç → **Deploy**.

Framework otomatik algılanır (Next.js), ayar gerekmez. Proje panelden
oluştuğu için tüm ayarları sen kontrol edersin — deployment protection dahil.

**Alternatif: Netlify.** app.netlify.com → **Add new site → Import an existing
project** → GitHub → depoyu seç → Deploy. Netlify Next.js'i otomatik tanır ve
yeni siteler varsayılan olarak herkese açıktır.

### 3. Alan adı

Vercel: **Settings → Domains → `outbid.love`** ekle, gösterdiği DNS
kayıtlarını alan adı sağlayıcına gir.
Netlify: **Domain management → Add a domain**.

### 4. Plausible

plausible.io → `outbid.love` sitesini ekle → **Settings → Visibility → Public
dashboard**'u aç. Script zaten kodda; footer'daki "Live traffic" linki oraya
gider. Farklı bir adres istersen `NEXT_PUBLIC_STATS_URL` ile değiştir.

---

## Ortam değişkenleri (hepsi opsiyonel)

| Değişken | Ne işe yarar |
|---|---|
| `SUPABASE_URL` | Varsayılanı ezmek istersen |
| `SUPABASE_ANON_KEY` | Varsayılanı ezmek istersen |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Alan adı bağlanmadan önce hangi domain sayılsın |
| `NEXT_PUBLIC_STATS_URL` | Footer'daki "Live traffic" hedefi |
| `NEXT_PUBLIC_SITE_URL` | Yönlendirmelerin döneceği ana adres |

---

## Ayarlar

Ekonominin tamamı iki yerde:

**`lib/config.ts`** — arayüz tarafı

| Ayar | Varsayılan | Ne yapar |
|---|---|---|
| `phase` | `founding` | `paid` yapınca ödemeli faza geçer |
| `decayPerDay` | 0.9 | Günlük %10 erime |
| `dropoutCents` | 100 | $1 altı board'dan çıkar |
| `minBidCents` | 1000 | Ödemeli fazda minimum |
| `blockedHosts` | — | Kısaltıcı ve davet linkleri |

**Veritabanındaki `app_config` tablosu** — sunucu tarafı, asıl otorite

```sql
update app_config set value = 50 where key = 'founding_slots';
update app_config set value = 1500 where key = 'founding_credit';
update app_config set value = 5 where key = 'ip_limit_per_hour';
```

Kontenjan ve kredi tutarı bilerek veritabanında tutuluyor: anahtar sızsa bile
dışarıdan oynatılamıyor.

> `decayPerDay` değerini değiştirirsen `db/schema.sql` içindeki **`0.90`**
> sabitini de aynı değere çek. İkisi ayrı yerlerde ama aynı formülü paylaşıyor.

---

## Mimari

```
app/page.tsx           Board (Server Component, ISR 15sn)
app/rules/page.tsx     Kurallar
app/api/submit         Kayıt: normalize → RPC
app/api/visit          Ziyaretçi + online sayacı
app/go?id=<uuid>       Tık sayacı + hedefe 302
lib/config.ts          Arayüz tarafı ayarlar
lib/normalize.ts       @handle / URL ayrımı, query string temizleme
lib/db.ts              Supabase REST istemcisi, hata toleranslı
components/Row.tsx     Satır + canlı çürüme göstergesi
db/schema.sql          Tablolar, view, RPC'ler, RLS
```

### Neden `bids` append-only

Hiçbir toplam üzerine yazılmıyor. Her ödeme ayrı satır, `payment_id` üzerinde
`unique` kısıt var. Ödemeli faza geçtiğinde webhook aynı olayı iki kez
gönderse bile ikinci kayıt sessizce reddedilir — **idempotency bedava geliyor.**

### Neden cron yok

Çürüme `leaderboard` view'ında hesaplanıyor:

```sql
sum(amount_cents * power(0.90, saniye_farkı / 86400.0))
```

Zamanlanmış görev yok, toplu UPDATE yok, yarış durumu yok. 10.000+ kayda
çıkarsan materialized view + 60sn refresh'e geçersin.

### Güvenlik

Taban tablolar RLS ile tamamen kapalı; dışarıya sadece `leaderboard` view'ı ve
üç `SECURITY DEFINER` fonksiyon açık. Supabase güvenlik denetçisi bunları
uyarı olarak işaretler — kasıtlı, mimarinin kendisi bu.

---

## Ödeme (Shopier — kurulu)

Shopier'in PAT tabanlı modern akışı kullanılıyor (klasik api_pay4 değil):

```
/api/checkout          teklif tutarında tek seferlik Shopier "ürünü" oluşturur,
                       pending_payments'a yazar, tarayıcıyı hosted checkout'a
                       POST eder. Tutar sunucuda doğrulanır (app_config
                       min/max), bid burada YAZILMAZ.
/api/shopier/webhook   order.created → HMAC-SHA256 imza doğrulanır, tutar
                       kontrol edilir, bid SADECE burada yazılır
                       (bids.payment_id unique → tekrar gönderim zararsız).
                       Bize ait taşıyıcı ürün silinir; mağazanın gerçek
                       ürünlerine dokunulmaz.
/api/shopier/setup     ?key=PAYMENT_RPC_SECRET ile korunan tek seferlik
                       kurulum/teşhis ucu: PAT'ı test eder, mağaza slug'ını
                       doğrular, order.created webhook aboneliğini oluşturur
                       (&create_webhook=1) ve token'ını döndürür.
```

Gerekli env değişkenleri (Netlify):

| Değişken | Ne |
|---|---|
| `SHOPIER_PAT` | Kişisel Erişim Belirteci (panel → Hesap Yönetimi → Kişisel Erişim Anahtarı) |
| `SHOPIER_SHOP_SLUG` | shopier.com/<slug> mağaza adı (hosted checkout için) |
| `SHOPIER_WEBHOOK_TOKEN` | webhook imza token'ı — `/api/shopier/setup` çıktısından |
| `PAYMENT_RPC_SECRET` | Supabase `payment_secrets.rpc_secret` ile aynı değer |
| `PHASE` | `paid` yapınca ödemeli faz açılır (deploy gerekmez, sadece env) |

Fazı `PHASE=paid` env'i VEYA `lib/config.ts` çevirir. Bid'ler yalnızca
webhook'ta oluşur; kullanıcı ödeme sonrası sekmeyi kapatsa bile kayıt düşer.

---

## Yerel geliştirme

```bash
npm install
npm run dev
```
