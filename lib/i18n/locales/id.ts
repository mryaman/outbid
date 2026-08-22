import type { Dict } from "../types";

export const id: Dict = {
  metaTitle: "outbid.love — papan peringkat berbayar yang nilainya turun 10% per hari",
  metaDesc:
    "Pasang tawaran berapa pun untuk menaikkan situs atau akun X Anda di papan peringkat publik. Setiap tawaran kehilangan 10% nilainya setiap hari, jadi peringkat 1 tidak bisa dibeli selamanya. Mulai $5, tanpa akun, tanpa iklan.",
  keywords: [
    "papan peringkat berbayar",
    "lelang peringkat website",
    "alternatif outbid.lol",
    "beli peringkat 1 website",
    "promosi website tanpa iklan",
    "pasar perhatian",
    "leaderboard tawaran",
    "promosi startup",
    "direktori produk berbayar",
    "naikkan tawaran peringkat",
  ],

  nav: {
    board: "Peringkat",
    categories: "Kategori",
    how: "Cara kerjanya",
    faq: "Tanya jawab",
    about: "Tentang",
    rules: "Aturan",
  },

  h1: "Puncak selalu bisa direbut.",
  lede:
    "Peringkat Anda persis sebesar yang Anda bayar — tapi setiap pembayaran <strong>menyusut {pct}% per hari</strong>. Tidak ada yang bertahan di puncak selamanya, dan papan ini tidak pernah beku.",

  intro: [
    "outbid.love adalah papan peringkat yang posisinya dibeli: Anda menawar dengan uang untuk situs, produk, atau akun X Anda, dan posisi ditentukan semata-mata oleh jumlah yang dibayar. Tidak ada algoritma, tidak ada kurasi redaksi, tidak ada lelang iklan, tidak ada akun yang perlu dibuat.",
    "Yang membedakannya dari papan lelang lain adalah penyusutan. Setiap pembayaran kehilangan {pct}% nilainya per hari sejak dana masuk, jadi tawaran adalah sewa, bukan kepemilikan. Posisi yang dibeli hari ini nilainya kurang dari separuh sepekan kemudian — itulah sebabnya peringkat 1 selalu bisa digugat dan pendatang bermodal kecil selalu bisa melewati orang yang membayar sekali lalu pergi.",
    "Tawaran dimulai dari {min}. Setiap entri menautkan ke situs Anda, klik keluar dihitung secara terbuka, dan tiap kategori punya peringkatnya sendiri — ceruk yang masih kosong bisa direbut dengan tawaran minimum.",
  ],

  bidPill: "Penawaran dibuka",
  bidBody:
    "Pasang tautan Anda di papan — atau lampaui tawaran di atas Anda. Anda membayar persis sebesar tawaran, sekali saja.",
  bidFine: "Situs produk atau akun X Anda. Tanpa akun, tanpa email — bayar kartu lewat Shopier.",

  formLinkPlaceholder: "situsanda.com atau @akunanda",
  formSubmit: "Tawar lebih tinggi →",
  formFine:
    "Minimum {min}. Sekarang peringkat 1 bisa direbut dengan {top}. Bayar dengan kartu lewat Shopier (ditagih dalam lira Turki sesuai kurs berjalan) — tawaran Anda tayang begitu pembayaran lolos, lalu mulai menyusut seperti yang lain.",

  boardTitle: "Peringkat",
  boardEmpty: "Papan masih kosong. Rebut posisi pertama.",

  decayH2: "Cara kerja penyusutan",
  decayP:
    "Setiap pembayaran kehilangan {pct}% nilainya per hari, dihitung sejak saat dibayarkan. {a} menjadi {b} setelah sepekan dan {c} setelah dua pekan. Begitu sebuah entri turun di bawah {drop}, entri itu keluar dari papan.",
  decayFine:
    "Inilah keseluruhan produknya. Peringkat adalah biaya berjalan, bukan pembelian — karena itu posisi 1 tidak pernah di luar jangkauan.",

  howH2: "Cara sampai ke peringkat 1",
  howSteps: [
    "Tentukan apa yang dipasang: URL produk atau akun X. Tanpa pendaftaran, tanpa email.",
    "Lihat tawaran tertinggi saat ini. Melampauinya satu sen saja sudah cukup untuk memimpin sekarang juga.",
    "Bayar dengan kartu. Tawaran Anda muncul di papan begitu pembayaran lolos.",
    "Kembali dan tambah lagi. Karena tawaran menyusut {pct}% per hari, mempertahankan peringkat 1 berarti sedikit tiap hari, bukan banyak sekali di awal.",
  ],

  faqH2: "Pertanyaan yang sering diajukan",
  faq: [
    {
      q: "Apa itu outbid.love?",
      a: "outbid.love adalah papan peringkat publik yang posisinya dibayar. Anda menawar untuk mendaftarkan sebuah situs atau akun X, dan peringkat Anda setara dengan uang yang sudah dibayarkan. Berbeda dari papan lelang lain, setiap tawaran menyusut 10% per hari, sehingga peringkat terus berubah dan posisi 1 selalu bisa direbut.",
    },
    {
      q: "Bagaimana penyusutan 10% per hari dihitung?",
      a: "Sejak pembayaran lolos, nilai efektif tawaran Anda dikalikan 0,9 untuk setiap hari yang berlalu. Tawaran $100 bernilai sekitar $47,83 setelah tujuh hari dan sekitar $22,88 setelah empat belas hari. Ketika turun di bawah $1, entri itu hilang sepenuhnya dari papan.",
    },
    {
      q: "Berapa biaya untuk mencapai peringkat 1?",
      a: "Persis satu sen lebih tinggi dari nilai tersusut pemuncak saat ini — dan angka itu turun tiap jam. Tawaran minimum $5, jadi jika papan kosong atau kategori belum diambil, peringkat 1 hanya $5.",
    },
    {
      q: "Apakah ini sama dengan outbid.lol?",
      a: "Tidak. Gagasan peringkat berbayarnya sama, tetapi di outbid.lol tawaran bersifat permanen: siapa yang sekali membayar paling besar akan menahan posisi tanpa batas waktu. Di outbid.love setiap tawaran menyusut 10% per hari, sehingga puncak menjadi kompetisi berulang, bukan pembelian sekali jadi.",
    },
    {
      q: "Perlu akun atau email?",
      a: "Tidak. Tidak ada pendaftaran, tidak ada login, tidak perlu email. Anda memasukkan tautan, memilih jumlah, membayar dengan kartu, lalu entri muncul.",
    },
    {
      q: "Bagaimana dan dalam mata uang apa pembayarannya?",
      a: "Dengan kartu, melalui Shopier. Tawaran ditampilkan dalam dolar AS dan ditagih dalam lira Turki sesuai kurs berjalan. Tawaran aktif otomatis setelah pembayaran dikonfirmasi.",
    },
    {
      q: "Berapa lama satu tawaran bertahan?",
      a: "Sampai menyusut di bawah $1. Tawaran $5 bertahan sekitar dua pekan; $100 sekitar enam pekan. Anda bisa menambah nilai entri kapan saja.",
    },
    {
      q: "Bisakah seseorang membeli peringkat 1 selamanya?",
      a: "Tidak, dan itulah inti aturan penyusutan. Satu pembayaran besar membeli posisi kuat selama beberapa hari, tapi terkikis otomatis — mempertahankan puncak berarti membayar berulang kali.",
    },
    {
      q: "Apa yang boleh dipasang?",
      a: "Situs produk atau perusahaan, atau akun X (Twitter). Pemendek tautan, tautan undangan, dan tautan aplikasi chat diblokir, dan semua entri dimoderasi menurut aturan yang dipublikasikan.",
    },
    {
      q: "Apakah saya mendapat backlink SEO?",
      a: "Tidak — tautan keluar bersifat nofollow dan melewati pengalihan. Yang Anda dapat adalah trafik nyata dan visibilitas, dengan jumlah klik keluar ditampilkan terbuka di tiap baris.",
    },
    {
      q: "Bisakah saya mendorong entri orang lain?",
      a: "Bisa. Entri mana pun boleh ditambah oleh siapa pun, jadi Anda bisa memperkuat entri sendiri atau memberi dorongan kepada proyek yang Anda sukai.",
    },
    {
      q: "Ada kategori apa saja?",
      a: "Dua puluh tujuh, dari agen AI dan perkakas developer sampai e-commerce, lowongan kerja, gim, dan properti. Tiap kategori punya peringkat sendiri, dan kategori kosong bisa direbut dengan minimum $5.",
    },
  ],

  catsH2: "Kategori",
  catsLede:
    "Tiap kategori punya peringkatnya sendiri. Pilih milik Anda — di kategori kosong, <strong>peringkat 1 hanya seharga tawaran minimum</strong>.",
  catsAll: "Semua kategori",
  catUnclaimed: "Belum diambil — jadilah yang pertama",
  catListings: "{n} entri",
  catTopIs: "peringkat 1: {title} dengan {amt}",
  catTitle: "Peringkat {name}",
  catMetaDesc:
    "Siapa yang memimpin {name} sekarang? Pasang tawaran berapa pun untuk merebut puncak — setiap tawaran menyusut 10% per hari, jadi posisi 1 selalu bisa direbut.",
  catHeroWith: "{n} entri — merebut peringkat 1 sekarang butuh <strong>{price}</strong>, dan angkanya turun tiap jam.",
  catHeroEmpty: "Kategori ini belum diambil siapa pun. <strong>Peringkat 1 seharga {price}.</strong>",
  catEmpty: "Kosong. Tawaran pertama memiliki kategori ini.",

  vsH2: "Kenapa penyusutan lebih baik daripada tawaran permanen",
  vsP:
    "Papan dengan tawaran permanen selalu berakhir sama: satu pemodal besar parkir di peringkat 1 dan yang lain berhenti bermain. Penyusutan menghapus akhir itu. Setiap posisi bersifat sementara, membalikkan keadaan itu murah, dan papan tetap bergerak meski tidak ada pemain baru.",

  footer: {
    rules: "Aturan",
    pricing: "Harga",
    terms: "Ketentuan",
    privacy: "Privasi",
    refunds: "Pengembalian dana",
    traffic: "Trafik langsung",
    listings: "{n} entri",
    back: "← Kembali ke papan",
  },

  langLabel: "Bahasa",
  translatedNote:
    "Ini edisi bahasa Indonesia. Papan peringkatnya sendiri bersifat global — tawaran dari negara mana pun bersaing di papan yang sama.",

  cats: {
    "ai-agents": "Agen AI & Infrastruktur",
    "ai-media": "Generasi Media AI",
    marketing: "Pemasaran & Periklanan",
    "dev-tools": "Perkakas Developer",
    productivity: "Produktivitas & Alat Pribadi",
    people: "Orang & Profil",
    design: "Desain & Kreatif",
    seo: "SEO & Visibilitas AI",
    social: "Media Sosial & Alat Kreator",
    writing: "Penulisan & Konten",
    sales: "Penjualan & Prospek",
    business: "Bisnis, Keuangan & Hukum",
    games: "Gim & Hiburan",
    education: "Pendidikan & Pembelajaran",
    health: "Kesehatan, Kebugaran & Wellness",
    ecommerce: "E-commerce & Ritel",
    directories: "Direktori, Peluncuran & Penemuan",
    hiring: "Rekrutmen, Lowongan & Karier",
    audio: "Audio, Suara & Podcast",
    agencies: "Agensi, Studio & Jasa",
    security: "Keamanan, Privasi & Kepatuhan",
    travel: "Perjalanan, Lokal & Gaya Hidup",
    media: "Media & Berita",
    domains: "Domain & Aset Web",
    leaderboards: "Papan Peringkat & Pasar Perhatian",
    "real-estate": "Properti & Real Estat",
    other: "Lainnya",
  },
};
