import type { Dict } from "../types";

export const vi: Dict = {
  metaTitle: "outbid.love — bảng xếp hạng trả phí, mỗi lượt đặt giá mất 10% mỗi ngày",
  metaDesc:
    "Đặt bất kỳ số tiền nào để đưa website hoặc tài khoản X của bạn lên bảng xếp hạng công khai. Mỗi lượt đặt giá mất 10% giá trị mỗi ngày, nên không ai giữ vị trí số 1 mãi mãi. Từ 5 đô, không cần tài khoản, không quảng cáo.",
  keywords: [
    "bảng xếp hạng trả phí",
    "đấu giá vị trí top",
    "thay thế outbid.lol",
    "quảng bá website không cần quảng cáo",
    "mua vị trí số 1",
    "thị trường chú ý",
    "leaderboard đặt giá",
    "quảng bá startup",
    "thư mục sản phẩm trả phí",
    "đẩy link lên top",
  ],

  nav: {
    board: "Bảng xếp hạng",
    categories: "Danh mục",
    how: "Cách hoạt động",
    faq: "Hỏi đáp",
    about: "Giới thiệu",
    rules: "Quy tắc",
  },

  h1: "Vị trí số 1 luôn có thể giành được.",
  lede:
    "Thứ hạng của bạn đúng bằng số tiền bạn đã trả — nhưng mỗi khoản thanh toán <strong>mất {pct}% mỗi ngày</strong>. Không ai ngồi trên đỉnh mãi mãi, và bảng xếp hạng không bao giờ đứng yên.",

  intro: [
    "outbid.love là bảng xếp hạng mà vị trí được mua bằng tiền: bạn đặt giá cho website, sản phẩm hoặc tài khoản X của mình, và thứ hạng chỉ do số tiền đã trả quyết định. Không thuật toán, không biên tập, không đấu giá quảng cáo, không cần tạo tài khoản.",
    "Điểm khác biệt so với mọi bảng đấu giá khác là sự hao mòn. Mỗi khoản thanh toán mất {pct}% giá trị mỗi ngày kể từ lúc được xác nhận, nên đặt giá giống tiền thuê hơn là quyền sở hữu. Vị trí mua hôm nay chỉ còn chưa tới một nửa giá trị sau một tuần — vì thế vị trí số 1 luôn có thể bị tranh chấp, và người mới với ngân sách nhỏ luôn có thể vượt qua người đã trả một lần rồi biến mất.",
    "Đặt giá bắt đầu từ {min}. Mỗi mục dẫn về website của bạn, số lượt nhấp ra ngoài được đếm công khai, và mỗi danh mục có bảng xếp hạng riêng — nên một ngách còn trống có thể chiếm bằng mức tối thiểu.",
  ],

  bidPill: "Đang mở đặt giá",
  bidBody:
    "Đưa link của bạn lên bảng — hoặc trả cao hơn người ngay phía trên. Bạn trả đúng số tiền đã đặt, một lần.",
  bidFine: "Website sản phẩm hoặc tài khoản X của bạn. Không tài khoản, không email — thanh toán thẻ qua Shopier.",

  formLinkPlaceholder: "trangcuaban.com hoặc @taikhoancuaban",
  formSubmit: "Đặt giá cao hơn →",
  formFine:
    "Tối thiểu {min}. Lấy vị trí số 1 với {top}. Thanh toán thẻ qua Shopier (tính bằng lira Thổ Nhĩ Kỳ theo tỷ giá thời điểm) — lượt đặt giá lên bảng ngay khi thanh toán thành công, rồi bắt đầu hao mòn như mọi người.",

  boardTitle: "Bảng xếp hạng",
  boardEmpty: "Bảng đang trống. Hãy chiếm vị trí đầu tiên.",

  decayH2: "Hao mòn hoạt động thế nào",
  decayP:
    "Mỗi khoản thanh toán mất {pct}% giá trị mỗi ngày, tính từ lúc trả tiền. {a} còn {b} sau một tuần và {c} sau hai tuần. Khi một mục rơi xuống dưới {drop}, nó rời khỏi bảng.",
  decayFine:
    "Đó là toàn bộ sản phẩm. Thứ hạng là chi phí duy trì, không phải một lần mua — nên vị trí số 1 không bao giờ ngoài tầm với.",

  howH2: "Cách lên vị trí số 1",
  howSteps: [
    "Chọn thứ bạn muốn đưa lên: URL sản phẩm hoặc tài khoản X. Không đăng ký, không email.",
    "Xem mức đặt giá cao nhất hiện tại. Chỉ cần hơn một xu là bạn dẫn đầu ngay bây giờ.",
    "Thanh toán bằng thẻ. Lượt đặt giá xuất hiện ngay khi giao dịch thành công.",
    "Quay lại và nạp thêm. Vì lượt đặt giá mất {pct}% mỗi ngày, giữ vị trí số 1 tốn một ít mỗi ngày thay vì rất nhiều một lần.",
  ],

  faqH2: "Câu hỏi thường gặp",
  faq: [
    {
      q: "outbid.love là gì?",
      a: "outbid.love là bảng xếp hạng công khai nơi vị trí được trả tiền. Bạn đặt giá để đưa một website hoặc tài khoản X lên bảng, và thứ hạng bằng đúng số tiền đã trả. Khác với các bảng đấu giá khác, mỗi lượt đặt giá mất 10% mỗi ngày, nên thứ tự liên tục xáo trộn và vị trí số 1 luôn có thể bị giành lấy.",
    },
    {
      q: "Hao mòn 10% mỗi ngày được tính ra sao?",
      a: "Từ lúc thanh toán được xác nhận, giá trị hiệu dụng của lượt đặt giá được nhân với 0,9 cho mỗi ngày trôi qua. Lượt 100 đô còn khoảng 47,83 đô sau bảy ngày và khoảng 22,88 đô sau mười bốn ngày. Khi xuống dưới 1 đô, mục đó bị xóa hẳn khỏi bảng.",
    },
    {
      q: "Lên số 1 tốn bao nhiêu?",
      a: "Đúng một xu nhiều hơn giá trị đã hao mòn của người đang dẫn đầu — và con số đó giảm từng giờ. Mức tối thiểu là 5 đô, nên nếu bảng trống hoặc danh mục chưa ai chiếm thì vị trí số 1 chỉ 5 đô.",
    },
    {
      q: "Có giống outbid.lol không?",
      a: "Không. Ý tưởng xếp hạng trả phí thì giống, nhưng ở outbid.lol lượt đặt giá là vĩnh viễn: ai trả nhiều nhất một lần sẽ giữ vị trí vô thời hạn. Ở outbid.love mỗi lượt đặt giá mất 10% mỗi ngày, biến đỉnh bảng thành cuộc đua lặp lại thay vì một lần mua đứt.",
    },
    {
      q: "Có cần tài khoản hay email không?",
      a: "Không. Không đăng ký, không đăng nhập, không email. Bạn nhập link, chọn số tiền, thanh toán thẻ, và mục xuất hiện.",
    },
    {
      q: "Thanh toán bằng cách nào, tiền gì?",
      a: "Bằng thẻ, qua Shopier. Giá niêm yết bằng đô la Mỹ và thu bằng lira Thổ Nhĩ Kỳ theo tỷ giá thời điểm. Lượt đặt giá tự động có hiệu lực sau khi thanh toán được xác nhận.",
    },
    {
      q: "Một lượt đặt giá kéo dài bao lâu?",
      a: "Cho đến khi hao mòn xuống dưới 1 đô. Lượt 5 đô kéo dài khoảng hai tuần; lượt 100 đô khoảng sáu tuần. Bạn có thể nạp thêm bất cứ lúc nào.",
    },
    {
      q: "Có ai mua đứt vị trí số 1 được không?",
      a: "Không, đó chính là mục đích của quy tắc hao mòn. Một khoản lớn mua được vị trí mạnh trong vài ngày nhưng tự bào mòn, nên giữ đỉnh bảng nghĩa là trả nhiều lần.",
    },
    {
      q: "Tôi được đưa những gì lên bảng?",
      a: "Website sản phẩm hoặc công ty, hoặc tài khoản X (Twitter). Link rút gọn, link mời và link ứng dụng nhắn tin bị chặn; các mục được kiểm duyệt theo quy tắc đã công bố.",
    },
    {
      q: "Tôi có được backlink SEO không?",
      a: "Không — link ra ngoài đều là nofollow và đi qua chuyển hướng. Thứ bạn nhận được là lưu lượng thật và độ hiển thị, với số lượt nhấp ra ngoài hiện công khai ở mỗi dòng.",
    },
    {
      q: "Tôi có thể đẩy mục của người khác không?",
      a: "Có. Ai cũng có thể nạp thêm cho bất kỳ mục nào, nên bạn có thể củng cố mục của mình hoặc tặng một cú đẩy cho dự án bạn thích.",
    },
    {
      q: "Có những danh mục nào?",
      a: "Hai mươi bảy danh mục, từ tác nhân AI và công cụ lập trình đến thương mại điện tử, tuyển dụng, game và bất động sản. Mỗi danh mục có bảng riêng, và danh mục còn trống có thể chiếm với mức tối thiểu 5 đô.",
    },
  ],

  catsH2: "Danh mục",
  catsLede:
    "Mỗi danh mục có bảng xếp hạng riêng. Chọn danh mục của bạn — danh mục trống nghĩa là <strong>vị trí số 1 chỉ bằng mức tối thiểu</strong>.",
  catsAll: "Tất cả danh mục",
  catUnclaimed: "Còn trống — hãy là người đầu tiên",
  catListings: "{n} mục",
  catTopIs: "số 1 là {title} với {amt}",
  catTitle: "Bảng xếp hạng {name}",
  catMetaDesc:
    "Ai đang dẫn đầu {name} lúc này? Đặt bất kỳ số tiền nào để chiếm đỉnh — mỗi lượt đặt giá mất 10% mỗi ngày, nên vị trí số 1 luôn giành được.",
  catHeroWith: "{n} mục — chiếm vị trí số 1 lúc này tốn <strong>{price}</strong>, và giảm từng giờ.",
  catHeroEmpty: "Chưa ai chiếm danh mục này. <strong>Vị trí số 1 giá {price}.</strong>",
  catEmpty: "Trống. Lượt đặt giá đầu tiên sở hữu danh mục này.",

  vsH2: "Vì sao hao mòn hơn hẳn đặt giá vĩnh viễn",
  vsP:
    "Bảng đặt giá vĩnh viễn luôn chết theo cùng một kiểu: một người túi sâu đỗ lại ở vị trí số 1 và tất cả những người khác bỏ cuộc. Hao mòn xóa bỏ cái kết đó. Mọi vị trí đều tạm thời, lật ngược thế cờ thì rẻ, và bảng vẫn chuyển động ngay cả khi không có người mới.",

  footer: {
    rules: "Quy tắc",
    pricing: "Giá",
    terms: "Điều khoản",
    privacy: "Riêng tư",
    refunds: "Hoàn tiền",
    traffic: "Lưu lượng trực tiếp",
    listings: "{n} mục",
    back: "← Quay lại bảng",
  },

  langLabel: "Ngôn ngữ",
  translatedNote:
    "Đây là bản tiếng Việt. Bảng xếp hạng thì mang tính toàn cầu — các lượt đặt giá từ mọi quốc gia đều xếp trên cùng một bảng.",

  cats: {
    "ai-agents": "Tác nhân AI & hạ tầng",
    "ai-media": "Tạo nội dung bằng AI",
    marketing: "Marketing & quảng cáo",
    "dev-tools": "Công cụ lập trình",
    productivity: "Năng suất & công cụ cá nhân",
    people: "Con người & hồ sơ",
    design: "Thiết kế & sáng tạo",
    seo: "SEO & hiện diện trên AI",
    social: "Mạng xã hội & công cụ sáng tạo",
    writing: "Viết lách & nội dung",
    sales: "Bán hàng & tìm khách",
    business: "Kinh doanh, tài chính & pháp lý",
    games: "Game & giải trí",
    education: "Giáo dục & học tập",
    health: "Sức khỏe, thể hình & wellness",
    ecommerce: "Thương mại điện tử & bán lẻ",
    directories: "Thư mục, ra mắt & khám phá",
    hiring: "Tuyển dụng, việc làm & sự nghiệp",
    audio: "Âm thanh, giọng nói & podcast",
    agencies: "Agency, studio & dịch vụ",
    security: "Bảo mật, riêng tư & tuân thủ",
    travel: "Du lịch, địa phương & lối sống",
    media: "Truyền thông & tin tức",
    domains: "Tên miền & tài sản web",
    leaderboards: "Bảng xếp hạng & thị trường chú ý",
    "real-estate": "Bất động sản",
    other: "Khác",
  },
};
