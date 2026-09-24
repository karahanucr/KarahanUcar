/* İÇERİK — sitedeki her şeyin tek listesi.
   ─────────────────────────────────────────────────────────────────────────────
   Buraya eklenen her kayıt kendiliğinden şu yerlerde görünür:
     · II. Bilgi › "Son eklenenler"      → her şey (türü yazılır, tıklayınca yerine götürür)
     · III. Yayınlar                     → "belge" alanı olanlar (indirilebilir PDF vb.)
     · IV. Kanal                         → tur: "video" olanlar (oynatıcıda izlenir)
     · Sahnelerdeki "Çalışmalarım" sandığı → "sandik" alanında adı geçen sahneler
   ALANLAR
     id        kısa, benzersiz ad (bağlantılar için): "meinong-seminer"
     tur       çalışma türü: alistirma · bildiri · calistay · ceviri · izlence · kitap · konferans · makale · notlar ·
               odevler · poster · proje · seminer · sempozyum · sunum · tezler · video
               (sitenin kendi türleri: sahne · okuma · yakinda)
     baslik    başlık
     aciklama  bir iki cümlelik açıklama (sözlükçede olan terimlerin üzerine gelince tanımı çıkar)
     tarih     "2026-09" (yıl-ay); liste yeniden eskiye bu tarihe göre sıralanır
     alan      ["felsefe", "diller", "doga-bilimleri", "formel-bilimler", "sosyal-bilimler", "estetik"] (Bilgi süzgeçleri)
     sandik    ["metafizik", "latince", ...] (hangi sahnelerin sandığında görünsün)
     bag       açılacak sayfa (sunum, okuma, dış bağlantı);  yeniSekme: true → yeni sekmede
     sahne     "epistemoloji" → sahneyi açar
     belge     "belgeler/dosya.pdf" → Yayınlar'da indirme bağlantısı ("" = belge henüz yüklenmedi)
     youtube   "VIDEO_KIMLIGI" (youtube.com/watch?v=BURASI)   ya da   dosya: "videolar/dosya.mp4"
   ───────────────────────────────────────────────────────────────────────────── */
window.ICERIK = [
  { id: "tegmark", tur: "okuma", baslik: "Evren bir matematiksel yapı mı?", tarih: "2026-09",
    aciklama: "Tegmark’ın “Matematiksel Evren” makalesi kaydırarak, adım adım: dış gerçeklik, yapılar, Gödel ve soyut nesneler sorusu.",
    alan: ["felsefe", "doga-bilimleri", "formel-bilimler"], sandik: ["astronomi", "metafizik"], bag: "bilgi/matematiksel-evren.html" },
  { id: "magara", tur: "sahne", baslik: "Platon’un Mağarası", tarih: "2026-09", sahne: "epistemoloji",
    aciklama: "Duvarda kayan gölgeler, ateş ve gün ışığı: bilgi nedir, nereden bileceğiz?", alan: ["felsefe"] },
  { id: "senato", tur: "sahne", baslik: "Roma Senatosu’nda Latince", tarih: "2026-09", sahne: "latince",
    aciklama: "Cicero kürsüde: alfabe, dilbilgisi, Latincenin serüveni ve ünlü sözler.", alan: ["diller"] },
  { id: "metafizik-sunum", tur: "sunum", baslik: "Metafizik", tarih: "2026-08", bag: "sunumlar/metafizik/index.html", yeniSekme: true,
    aciklama: "Aristoteles’ten Hegel’e metafizik sorunlar.", alan: ["felsefe"], sandik: ["metafizik"] },
  { id: "orman", tur: "sahne", baslik: "Ormanın içinde biyoloji", tarih: "2026-09", sahne: "biyoloji",
    aciklama: "Karınca izleri, yapraklar ve mantarlar arasında hücre, evrim ve genetik.", alan: ["doga-bilimleri"] },
  { id: "yasamin-sinirlari", tur: "sunum", baslik: "Yaşamın sınırları", tarih: "2026-08", bag: "sunumlar/biyoloji-felsefesi/index.html", yeniSekme: true,
    aciklama: "Biyoloji felsefesi üzerine etkileşimli sunum.", alan: ["felsefe", "doga-bilimleri"], sandik: ["biyoloji"] },
  { id: "modality", tur: "sunum", baslik: "Information: Modality", tarih: "2026-07", belge: "",
    aciklama: "Modalite üzerine sunum: zorunluluk, olanak ve olası dünyalar.", alan: ["felsefe"], sandik: ["metafizik"] },
  { id: "meinong-seminer", tur: "seminer", baslik: "Non-Existence Seminar: Meinong and the Problem of Intentionality", tarih: "2026-06", belge: "",
    aciklama: "Meinong’un olmayan nesneler kuramı ve yönelimsellik sorunu üzerine seminer sunumu.", alan: ["felsefe"], sandik: ["metafizik", "zihin"] },
  { id: "ems", tur: "proje", baslik: "Europa Macht Schule (EMS) projesi", tarih: "2026-05", belge: "",
    aciklama: "Avrupalı öğrencilerin okullarda kendi ülkelerini ve dillerini tanıttığı değişim projesi.", alan: [] },
  { id: "kanal", tur: "video", baslik: "Düşüncenin Eşiğinde — YouTube kanalım", bag: "https://www.youtube.com/@karahan6927",
    aciklama: "Merak, akıl, anlam: konu anlatımları ve yeni videolar. Videolar eklendikçe burada, oynatıcıda izlenebilecek.", alan: [], sandik: ["film"] },
  { id: "yakinda", tur: "yakinda", baslik: "Sıradaki okuma", aciklama: "Yeni bir adım adım okuma hazırlanıyor.", alan: [] }
];

/* Türlerin adları ve ekranda sırası (sandıktaki çekmeceler bu sırayla dizilir) */
window.ICERIK_TUR = {
  alistirma: "Alıştırma", bildiri: "Bildiri", calistay: "Çalıştay", ceviri: "Çeviri", izlence: "İzlence", kitap: "Kitap",
  konferans: "Konferans", makale: "Makale", notlar: "Notlar", odevler: "Ödevler", poster: "Poster", proje: "Proje",
  seminer: "Seminer", sempozyum: "Sempozyum", sunum: "Sunum", tezler: "Tezler", video: "Video",
  okuma: "Okuma", sahne: "Sahne", yakinda: "Yakında"
};

/* ── Listeleri kur (yazi.js'ten ÖNCE çalışır ki metinler çevrilebilsin) ── */
(function () {
  var L = window.ICERIK, TUR = window.ICERIK_TUR;
  var AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var ALAN_AD = { "felsefe": "Felsefe", "diller": "Diller", "doga-bilimleri": "Doğa Bilimleri", "formel-bilimler": "Formel Bilimler", "sosyal-bilimler": "Sosyal Bilimler", "estetik": "Estetik" };
  function k(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tarihHTML(t) {
    if (!t) return "";
    var p = t.split("-"), ay = AYLAR[(+p[1] || 1) - 1];
    return (p[1] ? "<span>" + ay + "</span> " : "") + p[0];
  }
  function sirala(a) { return a.slice().sort(function (x, y) { return (y.tarih || "0").localeCompare(x.tarih || "0"); }); }
  var belgeMi = function (o) { return o.belge !== undefined; };
  var videoMu = function (o) { return o.tur === "video"; };

  /* Bir kaydın sitede "yeri": video → Kanal, belge → Yayınlar, sahne → sahne, yoksa kendi bağlantısı */
  function hedef(o) {
    if (videoMu(o)) return { href: "#kanal", veri: ' data-video="' + k(o.id) + '"' };
    if (belgeMi(o)) return { href: "#yayin-" + o.id, veri: ' data-yayin="' + k(o.id) + '"' };
    if (o.sahne) return { href: "#sahne-" + o.sahne, veri: "" };
    if (o.bag) return { href: o.bag, veri: o.yeniSekme || /^https?:/.test(o.bag) ? ' target="_blank" rel="noopener"' : "" };
    return null;
  }
  window.ICERIK_HEDEF = hedef;

  function kontrol() {
    return '<div class="dizin-kontrol" hidden><span class="dizin-sayac" aria-hidden="true" data-sabit></span><span class="dizin-cubuk" aria-hidden="true"><i></i></span>' +
      '<button type="button" class="dizin-geri" aria-label="Önceki">‹</button><button type="button" class="dizin-dur" aria-pressed="false" aria-label="Akışı durdur">❚❚</button>' +
      '<button type="button" class="dizin-ileri" aria-label="Sonraki">›</button></div>';
  }

  /* II. Bilgi › Son eklenenler: her şey */
  var bilgi = document.querySelector('[data-akis="bilgi"]');
  if (bilgi) {
    var sirali = sirala(L.filter(function (o) { return o.tur !== "yakinda"; })).concat(L.filter(function (o) { return o.tur === "yakinda"; }));
    bilgi.innerHTML = '<div class="akis-pencere"><ul class="dizin akis-liste">' + sirali.map(function (o) {
      var h = hedef(o), yak = o.tur === "yakinda";
      return '<li class="kayit' + (yak ? " kayit-yakinda" : "") + '" data-alan="' + (o.alan || []).join(" ") + '" data-tur="' + o.tur + '">' +
        '<span class="kayit-tur">' + k(TUR[o.tur] || o.tur) + "</span>" +
        '<div class="kayit-govde"><h4>' + (h ? '<a href="' + k(h.href) + '"' + h.veri + ">" + k(o.baslik) + "</a>" : k(o.baslik)) + "</h4>" +
        '<p class="kayit-aciklama">' + k(o.aciklama) + "</p>" +
        ((o.alan || []).length || o.tarih ? '<p class="kayit-alan">' + (o.alan || []).map(function (a) { return "<span>" + ALAN_AD[a] + "</span>"; }).join(" · ") + (o.tarih ? '<span class="kayit-tarih">' + tarihHTML(o.tarih) + "</span>" : "") + "</p>" : "") +
        "</div>" + (yak ? "" : '<span class="kayit-ok" aria-hidden="true">→</span>') + "</li>";
    }).join("") + "</ul></div>" + kontrol();
  }

  /* III. Yayınlar: indirilebilir belgeler */
  var yay = document.querySelector('[data-akis="yayin"]');
  if (yay) {
    var belgeler = sirala(L.filter(belgeMi));
    yay.innerHTML = '<div class="akis-pencere"><ul class="akis-liste pubs">' + belgeler.map(function (o) {
      var indir = o.belge
        ? '<a class="indir" href="' + k(o.belge) + '" download><span class="indir-simge" aria-hidden="true"><svg viewBox="0 0 32 32"><path class="indir-ok" d="M16 5V20M9 14L16 21L23 14"/><path d="M6 24V27H26V24"/></svg></span><span>Belgeyi indir</span></a>'
        : '<span class="indir indir-bekle"><span class="indir-simge" aria-hidden="true"><svg viewBox="0 0 32 32"><path class="indir-ok" d="M16 5V20M9 14L16 21L23 14"/><path d="M6 24V27H26V24"/></svg></span><span>Belge yakında eklenecek</span></span>';
      return '<li class="kayit yayin" id="yayin-' + k(o.id) + '" data-tur="' + o.tur + '"><details><summary><span class="pub-baslik">' + k(o.baslik) + '</span><span class="pub-meta">' + tarihHTML(o.tarih) + ' · <span>' + k(TUR[o.tur] || o.tur) + "</span></span></summary>" +
        '<div class="yayin-ic"><p class="yayin-aciklama">' + k(o.aciklama) + "</p>" + indir + "</div></details></li>";
    }).join("") + "</ul></div>" + kontrol();
  }

  /* IV. Kanal: videolar */
  var kan = document.querySelector('[data-akis="video"]');
  if (kan) {
    var videolar = sirala(L.filter(videoMu));
    kan.innerHTML = '<div class="akis-pencere"><ul class="dizin akis-liste video-liste">' + videolar.map(function (o) {
      return '<li class="kayit" data-tur="video" data-video="' + k(o.id) + '"><span class="kayit-tur">' + k(TUR.video) + "</span>" +
        '<div class="kayit-govde"><h4><button type="button" class="video-sec" data-video="' + k(o.id) + '">' + k(o.baslik) + "</button></h4>" +
        '<p class="kayit-aciklama">' + k(o.aciklama) + "</p>" + (o.tarih ? '<p class="kayit-alan"><span class="kayit-tarih">' + tarihHTML(o.tarih) + "</span></p>" : "") +
        '</div><span class="kayit-ok" aria-hidden="true">▶</span></li>';
    }).join("") + "</ul></div>" + kontrol();
  }
})();
