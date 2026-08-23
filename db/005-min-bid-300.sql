-- 005 — minimum teklif $5 → $3 (23 Ağu 2026)
--
-- Neden $3, $2 değil: ücretsiz şehir hakkı $2 (`free_city_cents`) ve
-- `leaderboard` sıralaması `order by effective_cents desc, l.created_at asc`.
-- Eşitlikte önce kaydedilen kazandığı için $2 ödeyen kullanıcı bedava kaydı
-- GEÇEMEZDİ — parayı öder, 2. sırada kalırdı. Minimum, ücretsiz tutardan kesin
-- büyük olmalı.
--
-- Komisyon kontrolü (Shopier en düşük hacim dilimi: %4,99 + 0,49 TL + %20 KDV,
-- kur ≈ 48,2 TL/$): $3 → 145 TL tahsil, 9,27 TL kesinti, ~%93,9 kalıyor.
-- $5'te oran %93,8; yani düşük tutar komisyon açısından cezalandırmıyor.
--
-- lib/config.ts içindeki CONFIG.minBidCents ile AYNI olmalı (300).
--
-- Supabase'e uygulandı: migration `min_bid_300`.

update app_config set value = 300 where key = 'min_bid_cents';
