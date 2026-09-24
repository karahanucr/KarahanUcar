/* Felsefe odası: takımyıldızlar arasında yanan phi, üç kapı → Platon'un Mağarası (Epistemoloji), Metafizik, Zihin felsefesi. */
(function () {
  var S = window.SAHNE; if (!S) return;
  var h = S.h;
  var TAU = Math.PI * 2, PHI = (1 + Math.sqrt(5)) / 2;

  /* ════════ MERKEZ: Felsefe ════════ */
  var kapiMagara = '<svg viewBox="0 0 200 250"><defs><radialGradient id="kf1" cy=".75"><stop offset="0" stop-color="#ffb04a"/><stop offset=".5" stop-color="#8a3a14"/><stop offset="1" stop-color="#1a0c06"/></radialGradient></defs>' +
    '<path d="M0 250V120C10 60 50 20 100 16C150 20 190 60 200 120V250Z" fill="#2a2420"/><path d="M28 250V140C34 90 64 54 100 50C136 54 166 90 172 140V250Z" fill="url(#kf1)"/>' +
    '<g class="kapi-isik" opacity=".8"><path d="M60 150c4 -20 20 -24 22 -6c10 -6 18 4 12 18l-8 40h-20Z" fill="#1a0c06"/><path d="M110 170l30 -10l6 12l-30 8Z" fill="#1a0c06"/></g>' +
    '<path d="M40 250C60 236 80 240 100 232C120 240 140 236 160 250Z" fill="#120a06"/>' + h.alev(100, 238, 0.55, 0) + "</svg>";
  var kapiMeta = '<svg viewBox="0 0 200 250"><circle cx="100" cy="115" r="92" fill="#120c22" stroke="#b9a0ff" stroke-width="2" opacity=".9"/>' +
    '<g transform="translate(100 115)"><g class="don" style="--s:30s"><ellipse rx="86" ry="22" fill="none" stroke="#e8c870" stroke-width="1.5" opacity=".6"/></g>' +
    '<g class="don don-ters" style="--s:18s"><path d="M0 -58L50 -29L50 29L0 58L-50 29L-50 -29Z" fill="none" stroke="#f0d890" stroke-width="2.5"/><path d="M0 -58L0 0L50 29M0 0L-50 29M-50 -29L0 0M50 -29L0 0M0 58L0 0" stroke="#f0d890" stroke-width="1.2" opacity=".6"/></g>' +
    '<circle r="6" fill="#fff4c8"/></g><text x="100" y="236" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#d8c8ff" opacity=".8" font-style="italic">τὸ ὄν</text></svg>';
  var kapiZihin = '<svg viewBox="0 0 200 250"><defs><radialGradient id="kf3" cx=".45" cy=".4"><stop offset="0" stop-color="#6a8aff" stop-opacity=".6"/><stop offset="1" stop-color="#1a1a4a" stop-opacity=".2"/></radialGradient></defs>' +
    '<path d="M60 238V200C36 186 24 160 26 128C28 70 70 34 118 36C160 38 184 74 180 116C178 130 186 140 192 150L178 156V178C178 192 168 198 150 196V238Z" fill="url(#kf3)" stroke="#9fb8ff" stroke-width="2"/>' +
    '<g class="kapi-isik">' + [[80, 90], [110, 70], [140, 96], [96, 120], [130, 130], [70, 140], [150, 150]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#dfe8ff"/>'; }).join("") + "</g>" +
    '<path d="M80 90L110 70L140 96L130 130L96 120L80 90L70 140L96 120M130 130L150 150" stroke="#9fb8ff" stroke-width="1.2" fill="none" opacity=".7"/></svg>';

  S.kaydet("felsefe", {
    ad: "Felsefe", yer: "Kütüphane · Felsefe odası", vurgu: "#E8BD62", alan: "felsefe",
    alt: "Hayretle başlar, soruyla ilerler. Bir kapı seç: gölgelerin mağarasına, varlığın boşluğuna ya da zihnin içine gir.",
    parcacik: { tur: "kor", adet: 50 },
    arka: function () {
      var r = h.rnd(71), s = '<rect width="1600" height="900" fill="url(#fsG)"/>';
      s += h.yildizlar(160, 71, 0, 0, 1600, 900, "#f3e2b5");
      var takim = [[[140, 420], [240, 380], [300, 450], [220, 520]], [[1280, 120], [1380, 170], [1460, 110], [1520, 200], [1420, 260]], [[1300, 700], [1380, 640], [1480, 690], [1440, 780]], [[430, 90], [520, 140], [600, 90]]];
      takim.forEach(function (t) {
        s += '<path d="M' + t.map(function (p) { return p.join(" "); }).join("L") + '" fill="none" stroke="rgba(232,189,98,.22)" stroke-width="1.2"/>';
        t.forEach(function (p) { s += '<circle class="yp" cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="#ffe7a8"/>'; });
      });
      s += '<circle cx="800" cy="300" r="260" fill="url(#fsI)"/>';
      s += '<g transform="translate(800 300)"><g class="don" style="--s:90s"><circle r="200" fill="none" stroke="rgba(232,189,98,.14)" stroke-dasharray="2 10"/></g><g class="don don-ters" style="--s:140s"><circle r="150" fill="none" stroke="rgba(232,189,98,.12)" stroke-dasharray="1 6"/></g>' +
        "</g>"; // logo artık kapıların döndüğü yörüngenin merkezinde (motor.js)
      return h.svg(s,
        '<radialGradient id="fsG" cx=".5" cy=".35" r=".85"><stop offset="0" stop-color="#241a1e"/><stop offset=".55" stop-color="#110c10"/><stop offset="1" stop-color="#050306"/></radialGradient>' +
        '<radialGradient id="fsI"><stop offset="0" stop-color="#ffb04a" stop-opacity=".35"/><stop offset=".45" stop-color="#e8743a" stop-opacity=".1"/><stop offset="1" stop-color="#e8743a" stop-opacity="0"/></radialGradient>'
      );
    },
    kapilar: [
      { hedef: "epistemoloji", x: 20, y: 64, sanat: kapiMagara, aciklama: "Platon'un Mağarası: gölgeler, ateş ve gün ışığı." },
      { hedef: "metafizik", x: 40, y: 68, sanat: kapiMeta, aciklama: "Varlığın boşluğu: formlar, altın dağ, yuvarlak kare." },
      { hedef: "zihin", x: 60, y: 68, sanat: kapiZihin, aciklama: "Zihnin içi: sinirler, yarasa, Mary'nin odası." },
      { hedef: "sozlukce-felsefe", x: 80, y: 64, sanat: S.sozlukSanat("#E8BD62"), aciklama: "A priori'den töze: felsefenin terimleri." }
    ],
    yakinda: ["Dil Felsefesi", "Mantık Felsefesi", "Bilim Felsefesi", "Politik Felsefe", "Etik", "Din Felsefesi", "Tarih Felsefesi", "Sanat Felsefesi", "Felsefe Tarihi", "Metafelsefe"]
  });

  /* ════════ EPİSTEMOLOJİ: Platon'un Mağarası ════════ */
  var KUKLA = [
    '<path d="M-40 0c6 -24 26 -34 44 -30c10 -14 22 -18 30 -12l-6 10c10 4 12 18 4 26l-10 -2l-6 18h-8l-2 -14h-24l-4 14h-8l-2 -16c-6 -2 -10 -2 -8 -12Z"/>',
    '<path d="M-12 0c-10 -12 -10 -30 0 -40h4v-8h16v8h4c10 10 10 28 0 40ZM-16 -30c-10 -2 -12 10 -4 14M16 -30c10 -2 12 10 4 14" />',
    '<path d="M-10 0l4 -34c-8 -2 -10 -12 -4 -18c6 -8 18 -6 20 2c4 8 -2 14 -6 16l16 10l-4 6l-12 -6l2 24Z"/>',
    '<path d="M-30 0c0 -20 14 -36 30 -36s30 16 30 36Zm26 -36l6 -14 8 4 -6 12"/>',
    '<path d="M-24 0l10 -40l14 -10l14 10l10 40Zm8 -30h32"/>'
  ];
  S.kaydet("epistemoloji", {
    ad: "Epistemoloji", ust: "felsefe", yer: "Platon'un Mağarası · Devlet, VII. kitap", vurgu: "#F09A4A", alan: "felsefe",
    alt: "Zincirli mahkûmlar yalnızca önlerindeki duvarı görebiliyor. Arkalarındaki ateşin önünden taşınan kuklaların gölgelerini gerçek sanıyorlar. Bilgi nedir, ve nereden bileceğiz?",
    parcacik: { tur: "kor", adet: 70 }, isaret: "kor", sozGecis: "kul",
    sozler: [
      { metin: "Ὁμοίους ἡμῖν.", dil: "grc", ceviri: "Bize benziyorlar.", kaynak: "Sokrates, mahkûmlar için · Platon, Devlet 515a" },
      { metin: "ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι.", dil: "grc", ceviri: "Bilmediğim şeyi bildiğimi de sanmıyorum.", kaynak: "Sokrates · Platon, Savunma 21d" },
      { metin: "No man's knowledge here can go beyond his experience.", dil: "en", ceviri: "Burada hiç kimsenin bilgisi deneyiminin ötesine geçemez.", kaynak: "Locke · İnsan Anlığı Üzerine Bir Deneme II.1.19" },
      { metin: "Habe Mut, dich deines eigenen Verstandes zu bedienen!", dil: "de", ceviri: "Kendi aklını kullanma cesaretini göster!", kaynak: "Kant · Aydınlanma Nedir?, 1784" }
    ],
    arka: function () {
      var r = h.rnd(91), s = '<rect width="1600" height="900" fill="#0c0806"/>';
      s += '<path d="M180 640C160 460 200 260 320 150C520 70 1000 60 1260 150C1380 230 1420 420 1400 640Z" fill="url(#eD)"/>';
      for (var i = 0; i < 40; i++) s += '<path d="M' + (220 + r() * 1150).toFixed(0) + " " + (120 + r() * 480).toFixed(0) + "c" + (20 + r() * 60).toFixed(0) + " " + (-10 + r() * 20).toFixed(0) + " " + (40 + r() * 60).toFixed(0) + " " + (r() * 30).toFixed(0) + " " + (60 + r() * 80).toFixed(0) + " " + (-10 + r() * 20).toFixed(0) + '" stroke="rgba(0,0,0,.18)" stroke-width="' + (2 + r() * 4).toFixed(0) + '" fill="none"/>';
      s += '<circle class="duvar-isik" cx="1100" cy="700" r="700" fill="url(#eI)"/>';
      s += '<g class="golgeler" filter="url(#eBl)" fill="#1a0a04" opacity=".72">' + KUKLA.map(function (k) { return '<g class="golge">' + k + "</g>"; }).join("") + "</g>";
      s += '<path d="M1200 0H1600V300C1540 240 1480 170 1420 140C1350 110 1290 70 1200 0Z" fill="#241a14"/><path d="M1340 20C1400 40 1460 90 1500 150L1560 60C1520 30 1440 10 1340 20Z" fill="url(#eG)"/>';
      s += '<polygon class="isik-huzme" points="1350,30 1560,70 900,560 820,500" fill="url(#eGh)"/>';
      s += '<path d="M1500 150C1470 200 1440 250 1380 300" stroke="#3a2a1e" stroke-width="18" stroke-linecap="round" fill="none" stroke-dasharray="14 10"/>';
      s += '<path d="M0 0H1600V60C1300 90 1100 30 800 40C500 50 300 110 0 90Z" fill="#050302"/><path d="M0 0V900H220C160 700 140 400 200 220C230 140 260 90 320 40L300 0Z" fill="#070403"/><path d="M1600 300V900H1380C1430 700 1440 520 1420 420C1470 380 1540 340 1600 300Z" fill="#070403"/>';
      s += '<rect x="0" y="600" width="1600" height="300" fill="url(#eZ)"/>';
      for (var p = 0; p < 6; p++) {
        var px = 420 + p * 150;
        s += '<g transform="translate(' + px + ' 630)"><path d="M-26 0C-30 -30 -24 -56 -14 -66L14 -66C24 -56 30 -30 26 0Z" fill="#1a100a"/><circle cy="-78" r="14" fill="#1a100a"/><path d="M-10 -66C0 -56 10 -56 18 -66" stroke="#3a2416" stroke-width="3" fill="none"/>' +
          '<path d="M-30 0L-50 30M30 0L50 30" stroke="#5a4a3a" stroke-width="2" stroke-dasharray="4 3"/></g>';
      }
      s += '<path d="M200 640H1400" stroke="#6a5a4a" stroke-width="2" stroke-dasharray="6 4" opacity=".6"/>';
      s += '<g class="kuklalar" fill="#8a5a36" stroke="#f0a060" stroke-width="1.5">' + KUKLA.map(function (k) { return '<g class="kukla"><path d="M0 0V60" stroke="#4a3020" stroke-width="4"/>' + k + "</g>"; }).join("") + "</g>";
      s += '<path d="M120 720H1480V780H120Z" fill="#2a1a10"/><path d="M120 720H1480" stroke="#6a4a2a" stroke-width="4"/>';
      for (var b = 0; b < 26; b++) s += '<rect x="' + (120 + b * 52) + '" y="' + (730 + (b % 2) * 22) + '" width="48" height="18" fill="#1e140c" opacity=".7"/>';
      s += '<g transform="translate(1180 860)"><ellipse rx="160" ry="30" fill="#1a0c04"/>' + h.alev(-40, -10, 1.8, 0) + h.alev(30, -6, 2.2, 0.35) + h.alev(-4, -4, 2.6, 0.7) + '<path d="M-90 10L90 -6M-80 -6L70 14" stroke="#3a1c0a" stroke-width="14" stroke-linecap="round"/></g>';
      return h.svg(s,
        h.alevDefs +
        '<radialGradient id="eD" cx=".6" cy=".75" r=".8"><stop offset="0" stop-color="#8a4a22"/><stop offset=".5" stop-color="#4a2814"/><stop offset="1" stop-color="#1c100a"/></radialGradient>' +
        '<radialGradient id="eI"><stop offset="0" stop-color="#ff9a3a" stop-opacity=".45"/><stop offset=".5" stop-color="#ff7a2a" stop-opacity=".12"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="eG" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset="1" stop-color="#cfe6ff"/></linearGradient>' +
        '<linearGradient id="eGh" x1="1" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fffbe8" stop-opacity=".35"/><stop offset="1" stop-color="#fffbe8" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="eZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a1a10"/><stop offset="1" stop-color="#0a0604"/></linearGradient>' +
        '<filter id="eBl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>'
      );
    },
    hazirla: function (el) {
      this._k = [].slice.call(el.querySelectorAll(".kukla"));
      this._g = [].slice.call(el.querySelectorAll(".golge"));
      this._i = el.querySelector(".duvar-isik");
    },
    kare: function (t) {
      var n = this._k.length, ALAN = 1300;
      for (var i = 0; i < n; i++) {
        var x = 150 + ((t * 0.04 + (i * ALAN) / n) % ALAN), y = 660 + Math.sin(t / 400 + i) * 3;
        this._k[i].setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")");
        var gx = 800 + (x - 1180) * 0.55 + 380, gy = 420 + Math.sin(t / 400 + i) * 6;
        this._g[i].setAttribute("transform", "translate(" + gx.toFixed(1) + " " + gy.toFixed(1) + ") scale(2.6)");
      }
      if (this._i) this._i.setAttribute("opacity", (0.8 + Math.sin(t / 110) * 0.08 + Math.sin(t / 47) * 0.07).toFixed(2));
    },
    eserler: [
      { x: 55, y: 32, ad: "Duvardaki gölgeler", panel:
        "<h3>Mağara alegorisi</h3><p>Platon <i>Devlet</i>'in VII. kitabında (514a–520a) bir benzetme kurar: doğduklarından beri zincirli mahkûmlar yalnız karşılarındaki duvarı görür. Arkalarında bir ateş yanar; ateşle mahkûmlar arasındaki yoldan insanlar eşya ve figürler taşır. Mahkûmlar bu nesnelerin duvardaki <b>gölgelerini</b> gerçekliğin kendisi sanır.</p>" +
        "<h4>Bölünmüş çizgi</h4><p>Hemen öncesinde (509d–511e) Platon bilişi dört basamağa ayırır:</p><table class=\"pn-tablo\"><tr><th>Basamak</th><th>Nesnesi</th></tr><tr><td>eikasia · tahmin</td><td>gölgeler, yansımalar</td></tr><tr><td>pistis · inanç</td><td>görünür şeyler</td></tr><tr><td>dianoia · çıkarımsal düşünce</td><td>matematiksel nesneler</td></tr><tr><td>noēsis · kavrayış</td><td>formlar (ideler)</td></tr></table><p>İlk ikisi <i>doxa</i> (sanı), son ikisi <i>epistēmē</i> (bilgi) alanıdır.</p>" },
      { x: 42, y: 64, ad: "Mahkûmlar", panel:
        "<h3>Şüphecilik</h3><p>Ya biz de mahkûmsak? Şüphecilik, dünyaya dair bilgimizin gerekçesini sorgular.</p>" +
        "<ul><li><b>Pyrrhon</b> (MÖ 4. yüzyıl): her iddianın karşısına eşit güçte bir iddia konabilir; yargıyı askıya al (<i>epokhē</i>).</li><li><b>Descartes</b>, <i>Meditasyonlar</i> (1641): Ya beni sistemli biçimde yanıltan kötü niyetli bir cin (<i>genius malignus</i>) varsa? Geriye kalan tek kesinlik: düşünüyorum, öyleyse varım.</li><li><b>Kavanozdaki beyin</b>: Ya bütün deneyimlerim bir bilgisayarın beslediği bir beyinde oluşuyorsa? Putnam (1981) bu senaryonun kendi kendini çürüttüğünü savunur.</li><li><b>G. E. Moore</b> (1939): “İşte bir el, işte bir el daha.” Sağduyunun kesinliği, şüpheci öncüllerden daha güçlüdür.</li></ul>" },
      { x: 62, y: 70, ad: "Kuklalar", panel:
        "<h3>Bilgi nedir?</h3><p>Platon'un <i>Theaitetos</i> diyaloğunda bilginin “gerekçesiyle (logos) birlikte doğru sanı” olduğu önerisi tartışılır. Bu fikir uzun süre <b>gerekçelendirilmiş doğru inanç</b> tanımı olarak kabul gördü: S, p'yi bilir ancak ve ancak (1) p doğrudur, (2) S p'ye inanır, (3) S'nin inancı gerekçelidir.</p>" +
        "<p>1963'te Edmund Gettier üç sayfalık bir makaleyle bu tanımı sarstı: gerekçeli ve doğru olduğu hâlde, doğruluğu yalnızca şansa bağlı olduğu için bilgi sayamayacağımız inançlar vardır.</p>" +
        "<p class=\"pn-soz\">Durmuş bir saate bakıp “saat üç” diyorsun ve gerçekten saat üç. Gerekçen var, inancın doğru. Ama biliyor musun?<small>Russell'ın durmuş saat örneği (1948), Gettier tarzı bir vaka olarak</small></p>" },
      { x: 74, y: 90, ad: "Ateş", panel:
        "<h3>Akıl mı, deneyim mi?</h3><p>Bilgimizin kaynağı nedir?</p><ul><li><b>Rasyonalizm</b> (Descartes, Spinoza, Leibniz): bazı bilgiler deneyimden bağımsız, <i>a priori</i> olarak akılla edinilir: matematik, mantık, belki Tanrı ve ruh.</li><li><b>Empirizm</b> (Locke, Berkeley, Hume): zihin başlangıçta boş bir sayfadır; bütün kavramlar ve bilgi deneyimden gelir.</li></ul>" +
        "<p><b>Kant</b>, <i>Saf Aklın Eleştirisi</i>'nde (1781) iki yolu birleştirmeye çalıştı: bilgi deneyimle başlar, ama tümüyle deneyimden doğmaz; zihin deneyimi kendi biçimleriyle (uzay, zaman, kategoriler) düzenler.</p>" +
        "<p class=\"pn-soz\">İçeriksiz düşünceler boştur, kavramsız görüler kördür.<small>Kant · Saf Aklın Eleştirisi, A51/B75</small></p>" },
      { x: 86, y: 16, ad: "Mağaranın ağzı", panel:
        "<h3>Güneşe çıkış</h3><p>Mahkûmlardan biri zincirlerinden kurtarılıp dışarı çıkarılsa, önce ışık gözlerini acıtır; alışınca önce gölgeleri, sonra yansımaları, sonra şeylerin kendilerini ve en sonunda güneşi görür. Platon'da güneş <b>iyi ideası</b>nın benzeridir: şeyleri hem görünür hem de var kılan kaynak.</p>" +
        "<p>Platon'a göre eğitim, görmeyen gözlere görme yerleştirmek değil, ruhun bütünüyle gölgelerden gerçeğe doğru <b>çevrilmesidir</b> (<i>periagōgē</i>, 518c–d). Dışarıyı gören, geri dönüp ötekilere anlatmakla yükümlüdür; ama mağaradakiler ona gülebilir.</p>" +
        "<div class=\"pn-etiketler\"><span>Bilgi kuramı</span><span>Gerekçelendirme</span><span>Şüphecilik</span><span>Algı felsefesi</span><span>Tanıklık</span><span>Toplumsal epistemoloji</span><span>Formel epistemoloji</span></div>" }
    ]
  });

  /* ════════ METAFİZİK: Varlığın boşluğu ════════ */
  function kose(ad) {
    var a = [], s, t, u;
    if (ad === "tetra") a = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    if (ad === "kup") for (s = -1; s <= 1; s += 2) for (t = -1; t <= 1; t += 2) for (u = -1; u <= 1; u += 2) a.push([s, t, u]);
    if (ad === "okta") a = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    if (ad === "ikosa") for (s = -1; s <= 1; s += 2) for (t = -1; t <= 1; t += 2) a.push([0, s, t * PHI], [s, t * PHI, 0], [s * PHI, 0, t]);
    if (ad === "dodeka") {
      for (s = -1; s <= 1; s += 2) for (t = -1; t <= 1; t += 2) { for (u = -1; u <= 1; u += 2) a.push([s, t, u]); a.push([0, s / PHI, t * PHI], [s / PHI, t * PHI, 0], [s * PHI, 0, t / PHI]); }
    }
    var enKisa = Infinity, kenar = [];
    for (var i = 0; i < a.length; i++) for (var j = i + 1; j < a.length; j++) { var d = Math.hypot(a[i][0] - a[j][0], a[i][1] - a[j][1], a[i][2] - a[j][2]); if (d < enKisa - 1e-6) enKisa = d; }
    for (i = 0; i < a.length; i++) for (j = i + 1; j < a.length; j++) if (Math.abs(Math.hypot(a[i][0] - a[j][0], a[i][1] - a[j][1], a[i][2] - a[j][2]) - enKisa) < 1e-6) kenar.push([i, j]);
    var m = Math.max.apply(null, a.map(function (v) { return Math.hypot(v[0], v[1], v[2]); }));
    return { v: a.map(function (v) { return [v[0] / m, v[1] / m, v[2] / m]; }), e: kenar };
  }
  var CISIM = [["dodeka", 820, 420, 150, 0.00018], ["tetra", 1080, 170, 60, 0.0004], ["kup", 1360, 250, 62, 0.0003], ["okta", 1300, 520, 60, 0.00035], ["ikosa", 1080, 650, 58, 0.00028]];
  S.kaydet("metafizik", {
    ad: "Metafizik", ust: "felsefe", yer: "Varlığın boşluğu · zamanın ve yerin dışında", vurgu: "#C8B0FF", alan: "felsefe",
    alt: "Burada hiçbir şey yere düşmüyor. Platon'un kusursuz cisimleri dönüyor, var olmayan bir altın dağ havada asılı, bir kare yuvarlak olmaya çalışıyor. Ne vardır?",
    parcacik: { tur: "yildiz", adet: 120 }, isaret: "kristal",
    sozler: [
      { metin: "Pourquoi il y a plutôt quelque chose que rien ?", dil: "fr", ceviri: "Neden hiçbir şey değil de bir şey var?", kaynak: "Leibniz · Doğanın ve Lütfun İlkeleri, 1714" },
      { metin: "τὸ γὰρ αὐτὸ νοεῖν ἐστίν τε καὶ εἶναι.", dil: "grc", ceviri: "Çünkü düşünmek ve olmak aynı şeydir.", kaynak: "Parmenides · Fragman B3" },
      { metin: "Die Welt ist alles, was der Fall ist.", dil: "de", ceviri: "Dünya, olup biten her şeydir.", kaynak: "Wittgenstein · Tractatus 1" },
      { metin: "To be is to be the value of a variable.", dil: "en", ceviri: "Var olmak, bir değişkenin değeri olmaktır.", kaynak: "Quine · On What There Is, 1948" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#mG)"/><circle cx="1100" cy="300" r="520" fill="url(#mN1)"/><circle cx="400" cy="700" r="420" fill="url(#mN2)"/>';
      s += '<g transform="translate(820 420)" opacity=".35">' + [220, 300, 390].map(function (r, i) { return '<g class="don' + (i % 2 ? " don-ters" : "") + '" style="--s:' + (80 + i * 40) + 's"><ellipse rx="' + r + '" ry="' + r * 0.32 + '" fill="none" stroke="#c8b0ff" stroke-dasharray="3 9"/></g>'; }).join("") + "</g>";
      s += CISIM.map(function (c) { return '<g transform="translate(' + c[1] + " " + c[2] + ')"><circle r="' + c[3] * 1.5 + '" fill="url(#mH)"/><path class="cisim-hale" fill="none" stroke="#e8d0ff" stroke-width="6" opacity=".12"/><path class="cisim" fill="none" stroke="#f0dca0" stroke-width="' + (c[3] > 100 ? 2 : 1.6) + '" stroke-linejoin="round"/></g>'; }).join("");
      s += '<g class="yuz" style="--s:8s"><g transform="translate(310 560)"><path d="M-150 0C-140 30 -100 60 -60 90C-30 120 -10 170 0 200C10 160 30 110 60 80C100 50 140 30 150 0Z" fill="#3a2a3a"/><path d="M-150 0C-140 30 -100 60 -60 90" stroke="#5a4a5a" stroke-width="3" fill="none"/>' +
        '<ellipse rx="150" ry="22" fill="#4a3a2a"/><ellipse rx="150" ry="22" fill="#6a7a3a" opacity=".6"/><path d="M-110 -6L-40 -120L0 -70L40 -150L110 -6Z" fill="url(#mA)"/><path d="M40 -150L60 -110L20 -90Z" fill="#fff4c8" opacity=".8"/><path d="M-40 -120L-26 -96L-52 -90Z" fill="#fff4c8" opacity=".6"/>' +
        '<circle cy="-60" r="170" fill="url(#mAh)"/><path d="M0 200V280" stroke="#e8c870" stroke-width="2" stroke-dasharray="2 8" opacity=".6"/></g></g>';
      s += '<g transform="translate(620 640)">' + [[-60, -20, 34, "#8ac0ff"], [10, -60, 26, "#ffb0d0"], [60, 0, 38, "#b0ffc8"], [-10, 40, 22, "#ffe0a0"], [-80, 50, 18, "#d0b0ff"]].map(function (b, i) {
        return '<g class="yuz" style="--s:' + (5 + i) + "s;--d:-" + i + 's"><circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="' + b[3] + '" opacity=".16"/><circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="none" stroke="' + b[3] + '" stroke-width="1.5" opacity=".7"/><circle cx="' + (b[0] - b[2] * 0.35) + '" cy="' + (b[1] - b[2] * 0.35) + '" r="' + b[2] * 0.18 + '" fill="#fff" opacity=".6"/></g>';
      }).join("") + "</g>";
      s += '<g transform="translate(1000 810)"><rect class="yk" x="-46" y="-46" width="92" height="92" fill="rgba(232,200,112,.08)" stroke="#f0dca0" stroke-width="2.5"/><rect class="yk-hale" x="-46" y="-46" width="92" height="92" fill="none" stroke="#f0dca0" stroke-width="10" opacity=".15"/></g>';
      s += '<g transform="translate(1300 800) scale(.8)"><path d="M-160 30H160" stroke="#2a5a3a" stroke-width="40" stroke-linecap="round" opacity=".7"/><path d="M-160 30H160" stroke="#6a4a2a" stroke-width="46" stroke-linecap="round" fill="none" opacity=".35"/><circle class="top-a" r="14" fill="#f4ecd8"/><circle class="top-b" r="14" fill="#c83a2a"/></g>';
      return h.svg(s,
        '<radialGradient id="mG" cx=".5" cy=".45" r=".85"><stop offset="0" stop-color="#1c1430"/><stop offset=".6" stop-color="#0c0818"/><stop offset="1" stop-color="#040208"/></radialGradient>' +
        '<radialGradient id="mN1"><stop offset="0" stop-color="#7a4aff" stop-opacity=".16"/><stop offset="1" stop-color="#7a4aff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="mN2"><stop offset="0" stop-color="#ff7ab0" stop-opacity=".1"/><stop offset="1" stop-color="#ff7ab0" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="mH"><stop offset="0" stop-color="#f0dca0" stop-opacity=".12"/><stop offset="1" stop-color="#f0dca0" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="mA" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".5" stop-color="#e8b840"/><stop offset="1" stop-color="#8a6a18"/></linearGradient>' +
        '<radialGradient id="mAh"><stop offset="0" stop-color="#ffd870" stop-opacity=".25"/><stop offset="1" stop-color="#ffd870" stop-opacity="0"/></radialGradient>'
      );
    },
    hazirla: function (el) {
      this._c = CISIM.map(function (c) { return kose(c[0]); });
      this._p = [].slice.call(el.querySelectorAll(".cisim"));
      this._ph = [].slice.call(el.querySelectorAll(".cisim-hale"));
      this._yk = [el.querySelector(".yk"), el.querySelector(".yk-hale")];
      this._ta = el.querySelector(".top-a"); this._tb = el.querySelector(".top-b");
    },
    kare: function (t) {
      for (var i = 0; i < CISIM.length; i++) {
        var c = CISIM[i], g = this._c[i], ay = t * c[4] * 6 + i, ax = t * c[4] * 3.3 + i * 2, R = c[3];
        var cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax), P = [];
        for (var k = 0; k < g.v.length; k++) {
          var v = g.v[k], x = v[0] * cy + v[2] * sy, z = -v[0] * sy + v[2] * cy, y = v[1] * cx - z * sx, z2 = v[1] * sx + z * cx, o = 1 + z2 * 0.18;
          P.push([(x * R * o).toFixed(1), (y * R * o).toFixed(1)]);
        }
        var d = g.e.map(function (e) { return "M" + P[e[0]].join(" ") + "L" + P[e[1]].join(" "); }).join("");
        this._p[i].setAttribute("d", d); this._ph[i].setAttribute("d", d);
      }
      var rx = (23 + 23 * Math.sin(t / 900)).toFixed(1), rot = "rotate(" + ((t / 60) % 360).toFixed(1) + ")";
      for (var q = 0; q < 2; q++) { this._yk[q].setAttribute("rx", rx); this._yk[q].setAttribute("transform", rot); }
      var f = (t % 4200) / 4200, xa, xb;
      if (f < 0.4) { xa = -130 + (f / 0.4) * 116; xb = 14; } else if (f < 0.8) { xa = -14; xb = 14 + ((f - 0.4) / 0.4) * 116; } else { xa = -14; xb = 130; }
      var op = f > 0.9 ? ((1 - f) / 0.1).toFixed(2) : f < 0.05 ? (f / 0.05).toFixed(2) : "1";
      this._ta.setAttribute("cx", xa.toFixed(1)); this._tb.setAttribute("cx", xb.toFixed(1)); this._ta.setAttribute("opacity", op); this._tb.setAttribute("opacity", op);
    },
    eserler: [
      { x: 51, y: 47, ad: "Platon cisimleri", panel:
        "<h3>Ne vardır? Tümeller ve formlar</h3><p>Dönen beş cisim, bütün yüzleri özdeş düzgün çokgenlerden oluşan yegâne beş düzgün çokyüzlüdür: dörtyüzlü, küp, sekizyüzlü, onikiyüzlü, yirmiyüzlü. Platon <i>Timaios</i>'ta dördünü ateş, toprak, hava ve suyla eşleştirir; onikiyüzlüyü evrenin bütünü için kullanıldığını söyler. Bunların hepsi, hesaplanarak gerçek zamanlı üç boyutta döndürülüyor.</p>" +
        "<h4>Tümeller sorunu</h4><p>İki kırmızı gül ortak bir şeye, “kırmızılığa” sahip görünür. Bu ortak şey var mı, varsa nerede?</p><ul><li><b>Platoncu gerçekçilik</b>: tümeller ayrı, değişmez formlar olarak vardır.</li><li><b>Aristotelesçi gerçekçilik</b>: tümeller vardır ama yalnızca şeylerin içinde.</li><li><b>Adcılık</b> (Ockham): yalnızca tekil şeyler vardır; tümeller birer addır.</li></ul>" +
        "<p class=\"pn-soz\">What is there? Everything.<small>Ne vardır? Her şey. · Quine, “On What There Is” (1948). Asıl tartışma, bu cevabın neleri kapsadığı üzerinedir.</small></p>" },
      { x: 19, y: 55, ad: "Altın dağ", panel:
        "<h3>Olmayan nesneler</h3><p>Altın bir dağ düşünebilirim. Düşüncem <i>bir şey</i> hakkında. Ama altın dağ yok. O hâlde düşüncemin nesnesi nedir?</p>" +
        "<p><b>Alexius Meinong</b> (<i>Über Gegenstandstheorie</i>, 1904) cesur bir cevap verdi: her düşüncenin bir nesnesi vardır, ama her nesne var olmak zorunda değildir. Bir nesnenin <b>ne olduğu</b> (<i>Sosein</i>: altın olmak, dağ olmak) onun <b>var olup olmamasından</b> (<i>Sein</i>) bağımsızdır. Meinong bu nesnelerin varlığın ötesinde olduğunu söyler (<i>Außersein</i>).</p>" +
        "<p><b>Bertrand Russell</b> “On Denoting”de (1905) buna karşı <b>betimlemeler kuramını</b> geliştirdi: “Fransa'nın şimdiki kralı keldir” cümlesi aslında gizli bir varlık iddiası taşır ve yanlıştır; olmayan bir nesneye göndermeye gerek yoktur.</p>" +
        "<p>Parsons, Zalta ve Priest gibi yeni-Meinongcular bu tartışmayı bugün sürdürüyor. Soyut ve olmayan nesneler benim de özellikle üzerinde çalıştığım konu.</p>" },
      { x: 62, y: 90, ad: "Yuvarlak kare", panel:
        "<h3>İmkânsız nesneler</h3><p>Yuvarlak bir kare hem yuvarlak hem de yuvarlak değildir. Sahnedeki şekil ikisi arasında gidip geliyor, ama asla ikisini birden başaramıyor.</p>" +
        "<p>Aristoteles'e göre en sağlam ilke <b>çelişmezlik ilkesidir</b>: aynı şey aynı anda ve aynı bakımdan hem bir şeye ait olup hem de olmayamaz (<i>Metafizik</i> Γ, 1005b). Meinong ise yuvarlak kareyi bile bir nesne sayar: çelişkili özelliklere sahip, ama hakkında konuşabildiğimiz bir nesne.</p>" +
        "<p>Graham Priest gibi diyaleteistler bazı çelişkilerin doğru olabileceğini ileri sürer; tartışma, mantığın kendisinin sınırlarına dayanır.</p>" },
      { x: 39, y: 71, ad: "Olası dünyalar", panel:
        "<h3>Olanak ve zorunluluk</h3><p>“Sezar Rubicon'u geçmeyebilirdi” doğru görünüyor; “2 + 2 = 5 olabilirdi” yanlış. Bu farkı nasıl anlarız?</p>" +
        "<p><b>Leibniz</b>, Tanrı'nın sonsuz sayıda olası dünya arasından en iyisini yarattığını düşündü. 20. yüzyılda <b>Kripke</b>, modal mantık için olası dünyalar semantiğini geliştirdi: zorunlu olan, bütün olası dünyalarda doğru olandır; olanaklı olan, en az birinde.</p>" +
        "<p><b>David Lewis</b> (<i>On the Plurality of Worlds</i>, 1986) daha da ileri gitti: öteki olası dünyalar, bizimki kadar gerçektir (modal gerçekçilik). Her baloncuk, işlerin başka türlü olabileceği bir dünya.</p>" },
      { x: 81, y: 89, ad: "Bilardo topları", panel:
        "<h3>Nedensellik</h3><p>Beyaz top kırmızıya çarpıyor, kırmızı yuvarlanıyor. Birincinin ikinciyi hareket ettirdiğini <i>gördüğümüzü</i> sanırız. <b>David Hume</b> (<i>İnsan Anlığı Üzerine Bir Soruşturma</i>, 1748) bu örneği kullanarak şunu gösterdi: iki olayın birbirini izlediğini görürüz, ama aralarındaki <b>zorunlu bağı</b> hiçbir zaman gözlemleyemeyiz.</p>" +
        "<p>Nedensellik düşüncemiz, olayların <b>sürekli birlikte görülmesinden</b> doğan bir alışkanlıktır. Hume'un bu sorusu Kant'ı “dogmatik uykusundan” uyandırdı.</p>" +
        "<h4>Aristoteles'in dört nedeni</h4><p>Maddi neden (neyden?), biçimsel neden (ne?), fail neden (ne yaptı?), ereksel neden (ne için?). Modern bilim çoğunlukla yalnızca fail nedenle yetinir.</p>" }
    ]
  });

  /* ════════ ZİHİN FELSEFESİ ════════ */
  S.kaydet("zihin", {
    ad: "Zihin felsefesi", ust: "felsefe", yer: "Bir zihnin içi · şimdi", vurgu: "#9FB8FF", alan: "felsefe",
    alt: "Sinir hücreleri ateşleniyor, sinyaller akıyor. Ama bütün bunlar nasıl oluyor da bir şey hissetmeye, kırmızıyı görmeye, bir düşünceye dönüşüyor?",
    parcacik: { tur: "toz", adet: 40 }, isaret: "dalga",
    sozler: [
      { metin: "What is it like to be a bat?", dil: "en", ceviri: "Yarasa olmak nasıl bir şey?", kaynak: "Thomas Nagel, 1974" },
      { metin: "Consciousness poses the most baffling problems in the science of the mind.", dil: "en", ceviri: "Bilinç, zihin biliminin en şaşırtıcı sorunlarını ortaya koyar.", kaynak: "David Chalmers, 1995" },
      { metin: "Syntax is not sufficient for semantics.", dil: "en", ceviri: "Sözdizimi anlambilime yetmez.", kaynak: "John Searle, 1984" },
      { metin: "Ego sum, ego existo.", dil: "la", ceviri: "Ben varım, ben mevcudum.", kaynak: "Descartes · Meditasyonlar II, 1641" }
    ],
    arka: function () {
      var r = h.rnd(123), s = '<rect width="1600" height="900" fill="url(#zG)"/>';
      s += '<path d="M700 900V780C640 750 600 700 590 640C560 620 560 580 580 560C560 520 560 470 575 430C560 300 650 170 820 150C990 135 1120 240 1130 380C1135 430 1160 470 1190 510C1200 530 1190 545 1170 550L1160 600C1165 640 1150 670 1110 670L1060 680C1040 690 1030 720 1030 760V900Z" fill="url(#zB)" stroke="#9fb8ff" stroke-width="2" opacity=".95"/>';
      var dugum = [];
      for (var i = 0; i < 46; i++) { var a = r() * TAU, rr = Math.sqrt(r()); dugum.push([860 + Math.cos(a) * rr * 210, 360 + Math.sin(a) * rr * 150]); }
      var kenar = [];
      dugum.forEach(function (p, i) {
        var y = dugum.map(function (q, j) { return [Math.hypot(p[0] - q[0], p[1] - q[1]), j]; }).sort(function (a, b) { return a[0] - b[0]; });
        for (var k = 1; k <= 3; k++) if (y[k][1] > i) kenar.push([i, y[k][1]]);
      });
      this._dugum = dugum; this._kenar = kenar;
      s += '<g stroke="#8aa8ff" stroke-width="1" opacity=".35">' + kenar.map(function (e) { return '<path d="M' + dugum[e[0]][0].toFixed(0) + " " + dugum[e[0]][1].toFixed(0) + "L" + dugum[e[1]][0].toFixed(0) + " " + dugum[e[1]][1].toFixed(0) + '"/>'; }).join("") + "</g>";
      s += dugum.map(function (p, i) { return '<circle class="dugum" data-i="' + i + '" cx="' + p[0].toFixed(0) + '" cy="' + p[1].toFixed(0) + '" r="3.5" fill="#cfe0ff" opacity=".5"/>'; }).join("");
      s += '<g class="sinyaller">' + Array.apply(null, { length: 16 }).map(function () { return '<circle r="3" fill="#fff"/>'; }).join("") + "</g>";
      s += '<circle cx="880" cy="470" r="30" fill="url(#zE)"/><circle cx="880" cy="470" r="7" fill="#ffd870"/>';
      s += '<g transform="translate(1380 180)"><path d="M-160 -60H160" stroke="#2a2a3a" stroke-width="8"/><g class="asili" style="--s:3s;--a:4deg"><path d="M0 -56V-40" stroke="#1a1a2a" stroke-width="3"/>' +
        '<path d="M0 -40C-8 -40 -12 -30 -10 -18C-24 -26 -44 -22 -54 -8C-40 -12 -30 -4 -22 4C-14 0 -8 4 -6 10H6C8 4 14 0 22 4C30 -4 40 -12 54 -8C44 -22 24 -26 10 -18C12 -30 8 -40 0 -40Z" fill="#1a1622" stroke="#6a6a8a" stroke-width="1.5"/><circle cx="-3" cy="-6" r="1.6" fill="#ffd870"/><circle cx="3" cy="-6" r="1.6" fill="#ffd870"/></g>' +
        [0, 1, 2].map(function (k) { return '<circle class="eko" style="animation-delay:' + k * 0.8 + 's" r="20" fill="none" stroke="#9fb8ff" stroke-width="1.5"/>'; }).join("") + "</g>";
      s += '<g transform="translate(400 540)"><path d="M-120 -80L0 -130L120 -80V70L0 120L-120 70Z" fill="#2a2a2e"/><path d="M-120 -80L0 -30L120 -80" fill="none" stroke="#8a8a8e" stroke-width="2"/><path d="M0 -30V120" stroke="#6a6a6e" stroke-width="2"/>' +
        '<path d="M-120 -80L0 -30V120L-120 70Z" fill="#4a4a4e"/><path d="M120 -80L0 -30V120L120 70Z" fill="#3a3a3e"/>' +
        '<path d="M-90 -40l40 16v40l-40 -16Z" fill="#2a2a2e" stroke="#9a9a9e"/><path d="M40 20l40 -16v50l-40 16Z" fill="#6a6a6e"/>' +
        '<g transform="translate(-10 60)"><path d="M0 0V-44" stroke="#3a6a3a" stroke-width="3"/><circle cy="-52" r="13" fill="#d8283a"/><circle cy="-52" r="30" fill="#ff3a4a" opacity=".2" class="hale"/><path d="M-8 -56c4 -6 12 -6 16 0M-10 -48c6 4 14 4 20 0" stroke="#8a0a1a" stroke-width="2" fill="none"/></g></g>';
      s += '<g transform="translate(1330 620)"><path d="M-100 -60L0 -100L100 -60V60L0 100L-100 60Z" fill="#3a2a1e"/><path d="M-100 -60L0 -20L100 -60" fill="none" stroke="#8a6a3a" stroke-width="2"/><path d="M-100 -60L0 -20V100L-100 60Z" fill="#5a3e28"/><path d="M100 -60L0 -20V100L100 60Z" fill="#4a3220"/>' +
        '<path d="M-70 10l40 16" stroke="#1a0e08" stroke-width="6"/><g class="kagit"><path d="M-56 6l28 11l-4 22l-28 -11Z" fill="#f4ecd8"/><text x="-48" y="26" font-size="14" fill="#2a1a10" transform="rotate(22 -48 26)">中</text></g>' +
        '<text x="44" y="0" font-size="30" fill="#e8c870" opacity=".6" transform="skewY(-22)">?</text></g>';
      return h.svg(s,
        '<radialGradient id="zG" cx=".55" cy=".45" r=".85"><stop offset="0" stop-color="#1a1e3a"/><stop offset=".6" stop-color="#0c0e1e"/><stop offset="1" stop-color="#04050c"/></radialGradient>' +
        '<radialGradient id="zB" cx=".5" cy=".4"><stop offset="0" stop-color="#3a4a9a" stop-opacity=".45"/><stop offset="1" stop-color="#141a3a" stop-opacity=".3"/></radialGradient>' +
        '<radialGradient id="zE"><stop offset="0" stop-color="#ffd870" stop-opacity=".6"/><stop offset="1" stop-color="#ffd870" stop-opacity="0"/></radialGradient>'
      );
    },
    hazirla: function (el) {
      var d = this._dugum, k = this._kenar;
      this._n = [].slice.call(el.querySelectorAll(".dugum"));
      this._sin = [].slice.call(el.querySelectorAll(".sinyaller circle")).map(function (c) { var e = k[Math.floor(Math.random() * k.length)]; return { c: c, e: e, yon: Math.random() < 0.5, p: Math.random() }; });
      this._isik = new Float32Array(d.length);
      this._kag = el.querySelector(".kagit");
      this._eko = [].slice.call(el.querySelectorAll(".eko"));
      this._son = 0;
    },
    kare: function (t) {
      var d = this._dugum, k = this._kenar, dt = Math.min(50, t - (this._son || t)) / 1000; this._son = t;
      for (var i = 0; i < this._sin.length; i++) {
        var s = this._sin[i]; s.p += dt * 1.1;
        if (s.p >= 1) {
          var hedef = s.yon ? s.e[1] : s.e[0]; this._isik[hedef] = 1;
          var komsu = k.filter(function (e) { return e[0] === hedef || e[1] === hedef; });
          s.e = komsu[Math.floor(Math.random() * komsu.length)] || s.e; s.yon = s.e[0] === hedef; s.p = 0;
        }
        var a = d[s.yon ? s.e[0] : s.e[1]], b = d[s.yon ? s.e[1] : s.e[0]];
        s.c.setAttribute("cx", (a[0] + (b[0] - a[0]) * s.p).toFixed(1)); s.c.setAttribute("cy", (a[1] + (b[1] - a[1]) * s.p).toFixed(1));
      }
      for (var j = 0; j < this._n.length; j++) {
        this._isik[j] *= 0.94;
        this._n[j].setAttribute("opacity", (0.35 + this._isik[j] * 0.65).toFixed(2));
        this._n[j].setAttribute("r", (3.5 + this._isik[j] * 3).toFixed(1));
      }
      var f = (t % 5000) / 5000;
      if (this._kag) this._kag.setAttribute("transform", "translate(" + (f * 60).toFixed(1) + " " + (f * 24).toFixed(1) + ")");
      for (var e = 0; e < this._eko.length; e++) {
        var g = ((t / 2400) + e / 3) % 1;
        this._eko[e].setAttribute("r", (10 + g * 90).toFixed(1)); this._eko[e].setAttribute("opacity", (0.7 * (1 - g)).toFixed(2));
      }
    },
    eserler: [
      { x: 55, y: 55, ad: "Epifiz bezi", panel:
        "<h3>Zihin–beden sorunu</h3><p><b>Descartes</b> (<i>Meditasyonlar</i>, 1641) dünyayı iki tür şeye ayırdı: düşünen şey (<i>res cogitans</i>, zihin) ve uzamlı şey (<i>res extensa</i>, madde). İkisi beyinde, ortadaki küçük <b>epifiz bezinde</b> etkileşir diye düşündü.</p>" +
        "<p>1643'te Bohemyalı Prenses Elisabeth ona keskin bir soru yazdı: uzamı olmayan bir zihin, uzamlı bir bedeni nasıl hareket ettirebilir? Bu soru hâlâ cevap bekliyor.</p>" +
        "<ul><li><b>Düalizm</b>: zihin ile madde iki ayrı türdür.</li><li><b>Fizikalizm</b>: yalnızca fiziksel olan vardır; özdeşlik kuramına göre zihinsel durumlar beyin durumlarıdır (Place 1956, Smart 1959).</li><li><b>Panpsişizm</b>: bilinç, maddenin temel bir özelliğidir.</li></ul>" },
      { x: 53, y: 30, ad: "Sinir ağı", panel:
        "<h3>İşlevselcilik ve zor problem</h3><p>İnsan beyninde yaklaşık 86 milyar sinir hücresi (nöron) vardır. Sahnede sinyaller düğümden düğüme akıyor; bir sinyal ulaştığında düğüm kısa bir süre parlıyor.</p>" +
        "<p><b>İşlevselcilik</b> (Putnam, 1960'lar): zihinsel bir durumu tanımlayan şey, neyden yapıldığı değil, <b>ne işe yaradığıdır</b>, yani girdiler, çıktılar ve öteki durumlarla ilişkisi. Aynı zihin farklı malzemelerde gerçekleşebilir (çoklu gerçeklenebilirlik): belki silikonda da.</p>" +
        "<p><b>David Chalmers</b> (1995) “kolay” problemleri (algı, dikkat, bellek gibi işlevleri açıklamak) <b>zor problemden</b> ayırdı: bütün bu işlemlere neden bir de öznel deneyim eşlik ediyor? Neden karanlıkta değil de “içeriden bir ışıkla” oluyorlar?</p>" },
      { x: 86, y: 23, ad: "Yarasa", panel:
        "<h3>Yarasa olmak nasıl bir şey?</h3><p>Yarasalar dünyayı <b>ekolokasyonla</b> algılar: yüksek frekanslı sesler çıkarır, yankılardan uzaklığı, biçimi ve hareketi çözer. Sahnedeki halkalar bu ses dalgalarını gösteriyor.</p>" +
        "<p><b>Thomas Nagel</b> 1974 tarihli makalesinde şunu savundu: bir organizmanın bilinçli olması, onun için <b>o organizma olmanın nasıl bir şey olduğunun</b> bulunması demektir. Yarasanın nörofizyolojisini eksiksiz bilsek bile, yankılarla dünyayı algılamanın <i>içeriden</i> nasıl bir şey olduğunu bilemeyebiliriz.</p>" +
        "<p>Nagel'e göre fiziksel, nesnel betimleme, deneyimin bu <b>öznel karakterini</b> dışarıda bırakıyor olabilir.</p>" },
      { x: 25, y: 55, ad: "Mary'nin odası", panel:
        "<h3>Qualia: Mary'nin odası</h3><p><b>Frank Jackson</b>'ın düşünce deneyi (1982): Mary parlak bir bilimcidir ve renk görmenin fiziği ve nörofizyolojisi hakkında bilinebilecek her şeyi bilir. Ama hayatı boyunca siyah-beyaz bir odada yaşamıştır.</p>" +
        "<p>Bir gün odadan çıkar ve ilk kez kırmızı bir gül görür. <b>Yeni bir şey öğrenir mi?</b></p>" +
        "<p>Öğreniyorsa, fiziksel bilgi her şeyi kapsamıyor demektir: geriye deneyimin kendine özgü niteliği, <i>qualia</i> kalır. Jackson bu argümanı fizikalizme karşı öne sürdü; ilginçtir ki 1990'ların sonunda görüşünü değiştirip fizikalizmi benimsedi.</p>" },
      { x: 83, y: 70, ad: "Çin odası", panel:
        "<h3>Çin odası</h3><p><b>John Searle</b>'ın düşünce deneyi (1980): Çince bilmeyen biri bir odada, dışarıdan gelen Çince sembollere hangi sembollerle cevap vereceğini söyleyen dev bir kural kitabıyla oturuyor. Kuralları kusursuz izlediği için dışarıdakiler onun Çince anladığını düşünüyor.</p>" +
        "<p>Searle'e göre o kişi hiçbir şey <b>anlamıyor</b>: yalnızca sembolleri biçimlerine göre işliyor. Programlar da böyledir: <b>sözdizimi, anlambilime yetmez</b>.</p>" +
        "<p>Alan Turing ise 1950'de “Makineler düşünebilir mi?” sorusunun yerine bir davranış testi (taklit oyunu) önermişti. Büyük dil modelleri çağında bu iki bakış arasındaki tartışma yeniden alevlendi.</p>" }
    ]
  });
})();

window.SAHNE && window.SAHNE.sozlukce("sozlukce-felsefe", { ust: "felsefe", alan: "felsefe", yer: "Felsefe · terimler", vurgu: "#E8BD62", harfler: "ΑΒΓΔΘΛΞΠΣΦΨΩABCDEFGHIKLMNOPQRSTVXYZ" });
