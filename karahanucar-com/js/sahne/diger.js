/* Formel Bilimler, Sosyal Bilimler ve Estetik odaları:
   Geometri (İskenderiye terası), Coğrafya (haritacının balkonu), Film (yazlık sinema) ve üç sözlükçe. */
(function () {
  var S = window.SAHNE; if (!S) return;
  var h = S.h, TAU = Math.PI * 2;

  /* ════════ Kapı çizimleri ════════ */
  var kapiGeo = '<svg viewBox="0 0 200 250"><circle cx="100" cy="120" r="88" fill="#0e1a2a" stroke="#9fc8ff" stroke-width="2"/>' +
    '<g fill="none" stroke="#e8c870" stroke-width="2"><circle cx="78" cy="140" r="44" opacity=".5"/><circle cx="122" cy="140" r="44" opacity=".5"/><path d="M78 140H122L100 102Z" stroke-width="3"/></g>' +
    '<g class="sallan" style="--s:2.4s;--a:8deg;transform-origin:100px 40px"><path d="M100 40L78 140M100 40L122 140" stroke="#f0e0b0" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="40" r="7" fill="#e8c870"/></g></svg>';
  var kapiCog = '<svg viewBox="0 0 200 250"><defs><clipPath id="kcK"><circle cx="100" cy="112" r="80"/></clipPath></defs><circle cx="100" cy="112" r="80" fill="#2a6a9a"/>' +
    '<g clip-path="url(#kcK)"><g class="kita-kay">' + [0, 240].map(function (o) { return '<g transform="translate(' + o + ' 0)"><path d="M20 70c30 -20 60 -10 70 20c6 20 -20 30 -34 24c-14 -6 -30 10 -40 -6Z M120 120c20 -8 44 0 44 20c0 26 -26 40 -34 32c-8 -8 -18 -34 -10 -52Z M40 150c16 -6 30 4 26 18c-4 12 -24 8 -26 -18Z" fill="#6aa84a"/></g>'; }).join("") + "</g></g>" +
    '<g fill="none" stroke="#d8ecff" stroke-width="1" opacity=".5"><ellipse cx="100" cy="112" rx="80" ry="26"/><ellipse cx="100" cy="112" rx="30" ry="80"/><path d="M20 112H180"/></g>' +
    '<path d="M100 32V192M40 210H160M100 192V210" stroke="#b08a3e" stroke-width="5"/><circle cx="100" cy="112" r="86" fill="none" stroke="#b08a3e" stroke-width="4"/></svg>';
  var kapiFilm = '<svg viewBox="0 0 200 250"><g class="don" style="--s:6s"><circle cx="100" cy="100" r="78" fill="#1a1612" stroke="#c9b48a" stroke-width="4"/>' +
    [0, 60, 120, 180, 240, 300].map(function (a) { return '<circle cx="100" cy="52" r="16" fill="#0a0806" transform="rotate(' + a + ' 100 100)"/>'; }).join("") + '<circle cx="100" cy="100" r="10" fill="#c9b48a"/></g>' +
    '<g transform="translate(20 188)"><rect width="160" height="44" fill="#1a1612" stroke="#c9b48a"/>' + [8, 38, 68, 98, 128].map(function (x) { return '<rect x="' + x + '" y="4" width="8" height="6" fill="#c9b48a"/><rect x="' + x + '" y="34" width="8" height="6" fill="#c9b48a"/><rect x="' + (x + 12) + '" y="12" width="16" height="20" fill="#f0e6c8" opacity=".5"/>'; }).join("") + "</g></svg>";

  /* ════════ FORMEL BİLİMLER (merkez) ════════ */
  S.kaydet("formel-bilimler", {
    ad: "Formel Bilimler", yer: "Kütüphane · Formel bilimler odası", vurgu: "#9FC8FF", alan: "formel-bilimler",
    alt: "Sayılar, biçimler, çıkarımlar: deneyden değil, tanımlardan ve kanıttan yürüyen bilimler. Bir kapıdan içeri gir.",
    parcacik: { tur: "harf", adet: 60, harfler: "0123456789πΣ∞√∫∂φ∀∃≡∴", renk: "rgba(159,200,255," },
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#frG)"/><g stroke="rgba(159,200,255,.08)">';
      for (var i = -20; i <= 20; i++) s += '<path d="M800 380L' + (800 + i * 120) + ' 900"/>';
      for (var y = 0; y < 12; y++) { var yy = 420 + Math.pow(y, 1.8) * 5; s += '<path d="M0 ' + yy.toFixed(0) + 'H1600"/>'; }
      s += "</g>";
      s += '<g transform="translate(800 280)"><g class="don" style="--s:80s"><circle r="200" fill="none" stroke="rgba(232,200,112,.25)" stroke-dasharray="4 10"/></g>' +
        '<g class="don don-ters" style="--s:40s"><path d="M0 -150L130 75L-130 75Z" fill="none" stroke="#e8c870" stroke-width="2"/><circle r="75" fill="none" stroke="#9fc8ff" stroke-width="1.5"/><circle r="150" fill="none" stroke="#9fc8ff" stroke-width="1" opacity=".5"/></g>' +
        '<text y="12" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#ffe7a8" font-style="italic">φ</text></g>';
      s += h.yildizlar(60, 81, 0, 0, 1600, 500, "#dfe8ff");
      return h.svg(s, '<radialGradient id="frG" cx=".5" cy=".35" r=".85"><stop offset="0" stop-color="#16223a"/><stop offset=".6" stop-color="#0a1020"/><stop offset="1" stop-color="#04060c"/></radialGradient>');
    },
    kapilar: [
      { hedef: "geometri", x: 36, y: 66, sanat: kapiGeo, aciklama: "İskenderiye terası: pergel, altın oran, Pisagor." },
      { hedef: "sozlukce-formel", x: 64, y: 66, sanat: S.sozlukSanat("#9FC8FF"), aciklama: "Aksiyomdan türeve: formel bilimlerin terimleri." }
    ],
    yakinda: ["Bilişim", "Mantık", "Matematik"]
  });

  /* ════════ GEOMETRİ: İskenderiye terası ════════ */
  var TEPSI = { x: 800, y: 700 };
  S.kaydet("geometri", {
    ad: "Geometri", ust: "formel-bilimler", yer: "İskenderiye · Mouseion'un terası · MÖ 300", vurgu: "#9FC8FF", alan: "formel-bilimler",
    alt: "Deniz meltemi esiyor, Pharos feneri ufukta. Kum tepsisinde pergel kendi kendine dönüyor: Öklid'in ilk önermesi, eşkenar üçgen.",
    parcacik: { tur: "kum", adet: 40 }, isaret: "kristal",
    sozler: [
      { metin: "ἀγεωμέτρητος μηδεὶς εἰσίτω.", dil: "grc", ceviri: "Geometri bilmeyen girmesin.", kaynak: "Platon'un Akademisi'nin kapısında yazdığı rivayet edilir" },
      { metin: "Ordine geometrico demonstrata.", dil: "la", ceviri: "Geometrik düzende kanıtlanmış.", kaynak: "Spinoza · Ethica, 1677" },
      { metin: "οὐκ ἔστι βασιλικὴ ἀτραπὸς ἐπὶ γεωμετρίαν.", dil: "grc", ceviri: "Geometriye giden kral yolu yoktur.", kaynak: "Öklid'e atfedilir (Proklos'un aktarımı)" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#gG)"/><circle cx="1100" cy="140" r="300" fill="url(#gGu)"/>' + h.bulut(300, 130, 1, 170, 40) + h.bulut(900, 90, .7, 210, 120);
      s += '<rect x="0" y="470" width="1600" height="180" fill="url(#gD)"/>';
      for (var w = 0; w < 9; w++) s += '<path class="dalga-x" style="--d:-' + w * 0.7 + 's" d="M-100 ' + (490 + w * 17) + 'q40 -6 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="#e8f4ff" stroke-width="1.4" opacity="' + (0.2 + w * 0.04).toFixed(2) + '"/>';
      s += '<g transform="translate(1330 470)"><path d="M-110 0C-80 -14 80 -14 110 0Z" fill="#b8a888"/><rect x="-40" y="-120" width="80" height="120" fill="#efe6d0"/><path d="M-30 -120L-26 -210H26L30 -120Z" fill="#e4dac2"/><path d="M-18 -210H18V-262H-18Z" fill="#dcd2ba"/>' +
        '<rect x="-24" y="-274" width="48" height="12" fill="#c8bea8"/><g class="fener-isin"><path d="M0 -290L-420 -330L-420 -250Z" fill="url(#gFi)"/></g><circle cy="-290" r="16" fill="#ffd27a"/><circle cy="-290" r="40" fill="url(#gFh)"/></g>';
      s += '<g class="yelken y1"><g transform="translate(0 540)"><path d="M-30 0H30L22 12H-22Z" fill="#6a4a2a"/><path d="M0 0V-50" stroke="#4a3220" stroke-width="2"/><path d="M0 -48L24 -8H0Z" fill="#f4ecd8"/><path d="M0 -44L-18 -10H0Z" fill="#e8dcc0"/></g></g>' +
        '<g class="yelken y2"><g transform="translate(0 600) scale(.7)"><path d="M-30 0H30L22 12H-22Z" fill="#6a4a2a"/><path d="M0 0V-50" stroke="#4a3220" stroke-width="2"/><path d="M0 -48L24 -8H0Z" fill="#f4ecd8"/></g></g>';
      s += '<rect x="0" y="640" width="1600" height="260" fill="url(#gZ)"/>';
      for (var i = -10; i <= 10; i++) s += '<path d="M800 520L' + (800 + i * 180) + ' 900" stroke="rgba(120,100,70,.14)" stroke-width="1.5"/>';
      [660, 690, 730, 785, 850].forEach(function (y) { s += '<path d="M0 ' + y + 'H1600" stroke="rgba(120,100,70,.14)" stroke-width="1.5"/>'; });
      s += '<rect x="0" y="628" width="1600" height="14" fill="#d8ccb0"/>' + [40, 120, 200, 280, 360, 1240, 1320, 1400, 1480, 1560].map(function (x) { return '<path d="M' + (x - 8) + " 628C" + (x - 14) + " 610 " + (x + 14) + " 610 " + (x + 8) + ' 628Z" fill="#cfc2a4"/>'; }).join("");
      s += '<g transform="translate(160 640)"><rect x="-30" y="-330" width="60" height="330" fill="#efe6d0"/><rect x="-8" y="-330" width="10" height="330" fill="#d8ccb0"/><rect x="-44" y="-350" width="88" height="22" fill="#e4dac2"/><circle cx="-40" cy="-338" r="12" fill="#e4dac2" stroke="#b8ac90"/><circle cx="40" cy="-338" r="12" fill="#e4dac2" stroke="#b8ac90"/></g>';
      s += '<g transform="translate(250 555)"><path d="M0 70V130M-40 130H40" stroke="#8a6a3a" stroke-width="6"/><circle r="64" fill="#1e3a5a" opacity=".85"/><g fill="none" stroke="#c9a14a" stroke-width="2"><ellipse rx="64" ry="20"/><ellipse rx="22" ry="64"/><circle r="64"/></g>' +
        '<path class="kure-ucgen" d="M0 -64L48 20L-40 30Z" fill="rgba(255,120,80,.25)" stroke="#ff8a5a" stroke-width="2.5"/></g>';
      s += '<g transform="translate(' + TEPSI.x + " " + TEPSI.y + ')"><path d="M-240 0L-200 -70H200L240 0Z" fill="#8a6a44"/><path d="M-240 0L-200 -70H200L240 0V14H-240Z" fill="#6a4e32"/><path d="M-222 -6L-188 -64H188L222 -6Z" fill="url(#gK)"/>' +
        '<g transform="translate(0 -35) scale(1 .42)"><g class="insa" fill="none" stroke="#5a3a1a" stroke-width="3.2" stroke-linecap="round">' +
        '<path class="i-ab" d="M-70 0H70" pathLength="1"/><circle class="i-ca" cx="-70" cy="0" r="140" pathLength="1"/><circle class="i-cb" cx="70" cy="0" r="140" pathLength="1"/>' +
        '<path class="i-ac" d="M-70 0L0 -121" pathLength="1"/><path class="i-bc" d="M70 0L0 -121" pathLength="1"/></g>' +
        '<g fill="#3a200c" font-family="Georgia, serif" font-size="30" font-style="italic"><text x="-96" y="30">A</text><text x="80" y="30">B</text><text class="i-c" x="-10" y="-134">Γ</text></g></g></g>';
      s += '<g transform="translate(1000 640)"><g class="pergel"><path d="M0 0L-26 70M0 0L26 70" stroke="#c9a14a" stroke-width="5" stroke-linecap="round"/><circle r="7" fill="#e8c870"/></g><path d="M40 72L160 60" stroke="#8a6a44" stroke-width="6" stroke-linecap="round"/></g>';
      s += '<g transform="translate(330 812) scale(1 .45)"><rect x="-150" y="-110" width="300" height="200" fill="#e6dcc4" stroke="#c9b48a" stroke-width="3"/>' +
        '<g fill="none" stroke="#b09a70" stroke-width="2"><rect x="-150" y="-110" width="200" height="200"/><rect x="50" y="-110" width="100" height="100"/><rect x="50" y="-10" width="100" height="100"/><rect x="50" y="-10" width="50" height="50"/></g>' +
        '<path class="altin-spiral" pathLength="1" d="M50 90A200 200 0 0 1 -150 -110M-150 -110A200 200 0 0 1 50 -110M50 -110A100 100 0 0 1 150 -10M150 -10A50 50 0 0 1 100 40" fill="none" stroke="#c9801e" stroke-width="5"/></g>';
      s += '<g transform="translate(1210 800) scale(1 .5)"><path d="M-60 60L60 60L-60 -30Z" fill="rgba(232,200,112,.25)" stroke="#8a6a3a" stroke-width="3"/>' +
        '<rect x="-60" y="60" width="120" height="120" fill="rgba(159,200,255,.35)" stroke="#5a7a9a" stroke-width="3"/><rect x="-150" y="-30" width="90" height="90" fill="rgba(255,160,120,.35)" stroke="#9a5a3a" stroke-width="3"/>' +
        '<path d="M60 60L-60 -30L-150 90L-30 180Z" fill="rgba(200,240,160,.3)" stroke="#5a8a3a" stroke-width="3" transform="translate(150 -180) rotate(0)"/>' +
        '<g class="pisagor" fill="#fff4c8" opacity=".85">' + [0, 1, 2, 3].map(function (a) { return [0, 1, 2, 3].map(function (b) { return '<rect x="' + (-60 + a * 30 + 2) + '" y="' + (62 + b * 30) + '" width="26" height="26" style="animation-delay:' + ((a * 4 + b) * 0.18).toFixed(2) + 's"/>'; }).join(""); }).join("") + "</g></g>";
      return h.svg(s,
        '<linearGradient id="gG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6ab4e8"/><stop offset=".45" stop-color="#bfe0f0"/><stop offset=".52" stop-color="#f6ead0"/></linearGradient>' +
        '<radialGradient id="gGu"><stop offset="0" stop-color="#fffbe0" stop-opacity=".9"/><stop offset=".2" stop-color="#fff4c8" stop-opacity=".35"/><stop offset="1" stop-color="#fff4c8" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="gD" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3a8ab8"/><stop offset="1" stop-color="#1e5a80"/></linearGradient>' +
        '<linearGradient id="gZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#efe4cc"/><stop offset="1" stop-color="#c8b898"/></linearGradient>' +
        '<linearGradient id="gK" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e8d4a4"/><stop offset="1" stop-color="#d4bc88"/></linearGradient>' +
        '<linearGradient id="gFi" x1="1" x2="0"><stop offset="0" stop-color="#fff0b0" stop-opacity=".6"/><stop offset="1" stop-color="#fff0b0" stop-opacity="0"/></linearGradient>' +
        '<radialGradient id="gFh"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".8"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient>'
      );
    },
    hazirla: function (el) {
      this._p = ["i-ab", "i-ca", "i-cb", "i-ac", "i-bc"].map(function (c) { return el.querySelector("." + c); });
      this._c = el.querySelector(".i-c"); this._perg = el.querySelector(".pergel");
      this._isin = el.querySelector(".fener-isin"); this._y = [el.querySelector(".y1"), el.querySelector(".y2")];
    },
    kare: function (t) {
      /* Öklid I.1: AB doğrusu → A merkezli çember → B merkezli çember → kesişim Γ → AΓ, BΓ: eşkenar üçgen */
      var f = (t / 1000) % 12, dilim = [[0, 1], [1, 3.2], [3.2, 5.4], [6, 7], [7, 8]];
      for (var i = 0; i < 5; i++) {
        var a = dilim[i], k = Math.max(0, Math.min(1, (f - a[0]) / (a[1] - a[0])));
        if (this._p[i]) { this._p[i].style.strokeDasharray = "1"; this._p[i].style.strokeDashoffset = (1 - k).toFixed(3); this._p[i].style.opacity = f > 11 ? (12 - f).toFixed(2) : "1"; }
      }
      if (this._c) this._c.style.opacity = f > 5.4 && f < 11.5 ? "1" : "0";
      if (this._perg) this._perg.setAttribute("transform", "rotate(" + (f < 5.4 ? Math.sin(f * 2.4) * 22 : 0).toFixed(1) + ")");
      if (this._isin) this._isin.setAttribute("transform", "translate(0 -290) scale(" + Math.cos(t / 1400).toFixed(3) + " 1) translate(0 290)");
      if (this._y[0]) this._y[0].setAttribute("transform", "translate(" + ((t / 70) % 1900 - 150).toFixed(1) + " 0)");
      if (this._y[1]) this._y[1].setAttribute("transform", "translate(" + (1750 - (t / 110) % 1900).toFixed(1) + " 0)");
    },
    eserler: [
      { x: 50, y: 74, ad: "Kum tepsisi", panel:
        "<h3>Öklid'in Elemanları</h3><p>MÖ 300 civarında İskenderiye'de yazılan <i>Elemanlar</i>, 13 kitaplık bir geometri ve sayı kuramı kitabıdır. Birkaç tanım, beş postulat ve birkaç “ortak kavramdan” yola çıkarak yüzlerce önermeyi adım adım kanıtlar. İki bin yıl boyunca matematiğin ders kitabı ve <b>aksiyomatik yöntemin</b> örneği oldu.</p>" +
        "<h4>Tepsideki çizim: I. kitap, 1. önerme</h4><p>“Verilen bir doğru parçası üzerine eşkenar üçgen kurmak.” A merkezli ve AB yarıçaplı bir çember, B merkezli ve BA yarıçaplı bir çember çizilir; kesiştikleri Γ noktası A'ya ve B'ye birleştirilir. AΓ ve BΓ ikisi de AB'ye eşit olduğu için üçgen eşkenardır. Kum tepsisindeki pergel bu inşayı sürekli yeniden çiziyor.</p>" },
      { x: 62, y: 70, ad: "Pergel ve cetvel", panel:
        "<h3>Pergel ve cetvelin sınırları</h3><p>Antik geometriciler yalnız işaretsiz bir cetvel ve bir pergelle neler inşa edilebileceğini sordu. Üç ünlü problem iki bin yıl direndi:</p><ul><li>Bir daireyle aynı alana sahip kareyi çizmek</li><li>Herhangi bir açıyı üç eşit parçaya bölmek</li><li>Bir küpün hacmini iki katına çıkarmak</li></ul>" +
        "<p>Üçü de olanaksızdır. Wantzel 1837'de açıyı üçe bölmenin ve küpü iki katına çıkarmanın; Lindemann 1882'de π'nin aşkın bir sayı olduğunu göstererek daireyi kareye çevirmenin olanaksızlığını kanıtladı.</p><p>Öte yandan 19 yaşındaki Gauss 1796'da düzgün 17-genin pergel ve cetvelle çizilebileceğini buldu.</p>" },
      { x: 21, y: 88, ad: "Altın spiral", panel:
        "<h3>Altın oran</h3><p>Bir doğru parçasını, bütünün büyük parçaya oranı büyük parçanın küçüğe oranına eşit olacak biçimde bölmek. Öklid buna “aşırı ve ortalama oran” der. Bu oran <b>φ = (1 + √5) / 2 ≈ 1,618</b> değerini verir.</p>" +
        "<p>Fibonacci'nin 1202'deki <i>Liber Abaci</i>'sinde geçen 1, 1, 2, 3, 5, 8, 13… dizisinde ardışık terimlerin oranı φ'ye yaklaşır. Zemindeki mozaikte kenarları bu sayılarla orantılı kareler ve içlerinden geçen spiral var.</p>" +
        "<p class=\"pn-not\">Not: Parthenon ya da Mona Lisa'da altın oran bulunduğuna dair popüler iddiaların çoğu ölçümlerle doğrulanmaz.</p>" },
      { x: 76, y: 88, ad: "Pisagor karoları", panel:
        "<h3>Pisagor teoremi</h3><p>Dik üçgende dik kenarların üzerine kurulan karelerin alanları toplamı, hipotenüs üzerindeki karenin alanına eşittir: <b>a² + b² = c²</b>. Karolardaki 3–4–5 üçgeninde: 9 + 16 = 25.</p>" +
        "<p>İlişki Pisagor'dan (MÖ 6. yüzyıl) çok önce biliniyordu: MÖ 1800 civarına tarihlenen Babil tableti <b>Plimpton 322</b>, Pisagor üçlülerine dayanan bir tablo içerir. Teoremin bugün yüzlerce farklı kanıtı vardır.</p>" },
      { x: 16, y: 60, ad: "Küre", panel:
        "<h3>Öklid dışı geometriler</h3><p>Öklid'in beşinci postulatı (paralellik postulatı) ötekiler kadar apaçık görünmedi; yüzyıllarca ötekilerden kanıtlanmaya çalışıldı. 19. yüzyılda Gauss, Bolyai ve Lobaçevski bu postulatı reddeden tutarlı <b>hiperbolik geometriyi</b> buldu; Riemann (1854) eğri uzayların genel geometrisini kurdu.</p>" +
        "<p>Kürenin üzerine çizilen üçgenin iç açılarının toplamı 180°'den büyüktür. Einstein'ın genel göreliliği, uzay-zamanın bu türden eğri bir geometriye sahip olduğunu söyler: geometri artık fiziksel bir sorudur.</p>" },
      { x: 83, y: 26, ad: "Pharos feneri", panel:
        "<h3>İskenderiye</h3><p>Büyük İskender'in MÖ 331'de kurduğu İskenderiye, Ptolemaioslar döneminde bilginin başkenti oldu. <b>Mouseion</b> (Musalar'ın yeri) ve büyük <b>Kütüphane</b>, Akdeniz'in dört bir yanından bilginleri topladı.</p>" +
        "<ul><li><b>Öklid</b>: <i>Elemanlar</i></li><li><b>Eratosthenes</b>: Dünya'nın çevresini ölçtü</li><li><b>Arşimet</b>: burada öğrenim gördüğü düşünülür; π'yi 3 10/71 ile 3 1/7 arasına sıkıştırdı</li><li><b>Hypatia</b> (ö. 415): matematikçi ve filozof</li></ul>" +
        "<p>Ufuktaki Pharos Feneri MÖ 3. yüzyılda inşa edildi ve dünyanın yedi harikasından biri sayıldı.</p>" }
    ]
  });

  /* ════════ SOSYAL BİLİMLER (merkez) ════════ */
  S.kaydet("sosyal-bilimler", {
    ad: "Sosyal Bilimler", yer: "Kütüphane · Sosyal bilimler odası", vurgu: "#F0B870", alan: "sosyal-bilimler",
    alt: "İnsanlar, toplumlar, haritalar ve hafıza: birlikte yaşamanın bilimleri. Şehrin ışıkları birbirine bağlanıyor. Bir kapıdan içeri gir.",
    parcacik: { tur: "toz", adet: 50 },
    arka: function () {
      var r = h.rnd(61), s = '<rect width="1600" height="900" fill="url(#ssG)"/>' + h.yildizlar(70, 61, 0, 0, 1600, 380, "#fff4dc");
      var binalar = [];
      for (var x = 0; x < 1600; x += 50 + r() * 40) {
        var w = 40 + r() * 60, hh = 120 + r() * 260; binalar.push([x, w, hh]);
        s += '<rect x="' + x.toFixed(0) + '" y="' + (720 - hh).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + hh.toFixed(0) + '" fill="#1a1624"/>';
        for (var yy = 720 - hh + 14; yy < 700; yy += 22) for (var xx = x + 8; xx < x + w - 10; xx += 16) if (r() < 0.35) s += '<rect class="pencere-isik" style="animation-delay:-' + (r() * 8).toFixed(1) + 's" x="' + xx.toFixed(0) + '" y="' + yy.toFixed(0) + '" width="8" height="10" fill="#ffd27a" opacity=".8"/>';
      }
      s += '<g stroke="rgba(240,184,112,.35)" stroke-width="1.2" fill="none">';
      for (var i = 0; i < 14; i++) { var a = binalar[Math.floor(r() * binalar.length)], b = binalar[Math.floor(r() * binalar.length)]; s += '<path class="ag-hat" style="animation-delay:-' + (r() * 6).toFixed(1) + 's" d="M' + (a[0] + a[1] / 2).toFixed(0) + " " + (720 - a[2]).toFixed(0) + "Q" + ((a[0] + b[0]) / 2).toFixed(0) + " " + (300 - r() * 200).toFixed(0) + " " + (b[0] + b[1] / 2).toFixed(0) + " " + (720 - b[2]).toFixed(0) + '" pathLength="1"/>'; }
      s += "</g>";
      s += '<rect x="0" y="720" width="1600" height="180" fill="url(#ssZ)"/>';
      return h.svg(s, '<linearGradient id="ssG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1a1430"/><stop offset=".55" stop-color="#4a2a3a"/><stop offset=".8" stop-color="#b8603a"/></linearGradient><linearGradient id="ssZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1a1216"/><stop offset="1" stop-color="#08060a"/></linearGradient>');
    },
    kapilar: [
      { hedef: "cografya", x: 36, y: 66, sanat: kapiCog, aciklama: "Haritacının balkonu: portolan, yerküre, gemiler." },
      { hedef: "sozlukce-sosyal", x: 64, y: 66, sanat: S.sozlukSanat("#F0B870"), aciklama: "Demokrasiden yapısalcılığa: sosyal bilimlerin terimleri." }
    ],
    yakinda: ["Antropoloji", "Arkeoloji", "Dilbilimi", "Ekonomi", "Hukuk", "İlahiyat", "Siyaset ve Sosyoloji", "Psikoloji ve Psikanaliz", "Tarih"]
  });

  /* ════════ COĞRAFYA: haritacının balkonu ════════ */
  S.kaydet("cografya", {
    ad: "Coğrafya", ust: "sosyal-bilimler", yer: "Akdeniz kıyısında bir haritacının balkonu · 16. yüzyıl", vurgu: "#F0B870", alan: "sosyal-bilimler",
    alt: "Masada yarım kalmış bir portolan, köşede dönen bir yerküre, açıkta rüzgârla dolan yelkenler. Dünyayı kâğıda sığdırma sanatı.",
    parcacik: { tur: "toz", adet: 30 }, isaret: "yildiz",
    sozler: [
      { metin: "The map is not the territory.", dil: "en", ceviri: "Harita, toprağın kendisi değildir.", kaynak: "Alfred Korzybski, 1931" },
      { metin: "Hic sunt dracones.", dil: "la", ceviri: "Burada ejderhalar var.", kaynak: "Hunt–Lenox yerküresi, 1510 civarı" },
      { metin: "Terra incognita.", dil: "la", ceviri: "Bilinmeyen topraklar.", kaynak: "Eski haritalarda keşfedilmemiş bölgelerin adı" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#cG)"/><circle cx="1250" cy="170" r="280" fill="url(#cGu)"/>' + h.bulut(250, 150, 1.1, 180, 30) + h.bulut(820, 110, .8, 220, 100) + h.bulut(1300, 230, 1, 200, 60);
      s += '<path d="M0 470C80 420 150 360 230 380C300 400 330 330 400 340C470 350 520 420 600 460L620 470Z" fill="#8a9aa8" opacity=".75"/><path d="M0 470C60 440 120 420 200 430C280 440 340 410 420 430C500 450 560 460 640 470Z" fill="#6a8a6a"/>';
      s += '<g fill="#e8dcc4">' + [440, 470, 500, 530, 560].map(function (x, i) { return '<rect x="' + x + '" y="' + (440 - i % 2 * 10) + '" width="22" height="' + (30 + i % 2 * 10) + '"/><path d="M' + (x - 2) + " " + (440 - i % 2 * 10) + "l13 -10l13 10Z" + '" fill="#b8604a"/>'; }).join("") + "</g>";
      s += '<rect x="0" y="470" width="1600" height="200" fill="url(#cD)"/>';
      for (var w = 0; w < 8; w++) s += '<path class="dalga-x" style="--d:-' + w * 0.9 + 's" d="M-100 ' + (490 + w * 22) + 'q40 -6 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="#e8f4ff" stroke-width="1.4" opacity="' + (0.2 + w * 0.05).toFixed(2) + '"/>';
      s += '<g class="gemi g1"><g transform="translate(0 540)"><path d="M-70 0H70L50 26H-50Z" fill="#5a3a22"/><path d="M-20 0V-110M24 0V-90" stroke="#3a2414" stroke-width="4"/><path d="M-20 -104C10 -90 12 -40 -20 -26Z" fill="#f4ecd8"/><path d="M24 -86C50 -74 50 -34 24 -24Z" fill="#efe4cc"/><path d="M-20 -110L-2 -118L-20 -122" fill="#b8402a"/></g></g>';
      s += '<g transform="translate(1300 540)"><path d="M-90 0H90L66 34H-66Z" fill="#4a2e1a"/><path d="M-30 0V-150M30 0V-120" stroke="#2a1a0e" stroke-width="5"/><path d="M-30 -140H10M-30 -100H14M30 -110H64M30 -76H66" stroke="#8a7a5a" stroke-width="2"/><path d="M-90 -10L-120 -40" stroke="#2a1a0e" stroke-width="3"/></g>';
      s += '<g class="marti"><path d="M0 0q10 -8 20 0q10 -8 20 0" stroke="#fff" stroke-width="3" fill="none"/></g><g class="marti m2"><path d="M0 0q8 -6 16 0q8 -6 16 0" stroke="#fff" stroke-width="2.5" fill="none"/></g>';
      s += '<rect x="0" y="640" width="1600" height="260" fill="url(#cZ)"/><rect x="0" y="628" width="1600" height="16" fill="#cbb896"/>' +
        Array.apply(null, { length: 34 }).map(function (_, i) { var x = 20 + i * 48; return '<path d="M' + (x - 9) + " 628C" + (x - 16) + " 596 " + (x + 16) + " 596 " + (x + 9) + " 628Z M" + (x - 6) + " 596h12v-10h-12Z" + '" fill="#bfae8c"/>'; }).join("") + '<rect x="0" y="584" width="1600" height="12" fill="#d8c8a6"/>';
      s += '<g transform="translate(1150 830) scale(1 .38)"><g class="don" style="--s:120s"><circle r="170" fill="rgba(160,120,70,.25)" stroke="#8a6a3a" stroke-width="4"/>' +
        [0, 45, 90, 135, 180, 225, 270, 315].map(function (a, i) { return '<path d="M0 0L-14 -14L0 ' + (i % 2 ? -110 : -165) + 'L14 -14Z" transform="rotate(' + a + ')" fill="' + (i % 2 ? "#c9a86a" : "#8a5a2a") + '"/>'; }).join("") + '<circle r="16" fill="#b8402a"/></g></g>';
      s += '<g transform="translate(800 740)"><path d="M-300 0L-250 -90H250L300 0Z" fill="#6a4a2e"/><path d="M-300 0V16H300V0Z" fill="#4a3220"/><path d="M-268 -8L-228 -80H228L268 -8Z" fill="#f0e2c0"/>' +
        '<g opacity=".55" stroke="#8a5a2a" stroke-width="1">' + Array.apply(null, { length: 16 }).map(function (_, i) { var a = i * Math.PI / 8; return '<path d="M-90 -44L' + (-90 + Math.cos(a) * 200).toFixed(0) + " " + (-44 + Math.sin(a) * 60).toFixed(0) + '"/><path d="M110 -40L' + (110 + Math.cos(a) * 200).toFixed(0) + " " + (-40 + Math.sin(a) * 60).toFixed(0) + '"/>'; }).join("") + "</g>" +
        '<path class="kiyi" pathLength="1" d="M-220 -30C-190 -60 -160 -40 -130 -64C-100 -76 -60 -50 -30 -66C0 -74 30 -40 60 -58C100 -76 150 -40 200 -60" fill="none" stroke="#3a2414" stroke-width="2.5"/>' +
        '<circle cx="-90" cy="-44" r="10" fill="none" stroke="#b8402a" stroke-width="2"/><circle cx="110" cy="-40" r="10" fill="none" stroke="#b8402a" stroke-width="2"/>' +
        '<path d="M150 -20L260 -34" stroke="#c9a14a" stroke-width="7" stroke-linecap="round"/><path d="M-250 -20h40" stroke="#1a1410" stroke-width="10" stroke-linecap="round"/></g>';
      s += '<g transform="translate(290 560)"><path d="M0 80V160M-50 160H50" stroke="#6a4a2e" stroke-width="7"/><clipPath id="cK"><circle r="80"/></clipPath><circle r="80" fill="#2a6a9a"/>' +
        '<g clip-path="url(#cK)"><g class="kita-kay">' + [0, 300].map(function (o) { return '<g transform="translate(' + (o - 150) + ' -80)"><path d="M20 50c30 -20 60 -10 70 20c6 20 -20 30 -34 24c-14 -6 -30 10 -40 -6Z M120 100c20 -8 44 0 44 20c0 26 -26 40 -34 32c-8 -8 -18 -34 -10 -52Z M60 130c16 -6 30 4 26 18c-4 12 -24 8 -26 -18Z M200 40c30 -10 50 10 40 30c-10 16 -40 10 -40 -30Z" fill="#8aa85a"/></g>'; }).join("") + "</g></g>" +
        '<g fill="none" stroke="#d8ecff" stroke-width="1" opacity=".5"><ellipse rx="80" ry="26"/><ellipse rx="30" ry="80"/></g><circle r="88" fill="none" stroke="#b08a3e" stroke-width="5"/></g>';
      return h.svg(s,
        '<linearGradient id="cG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#78b8e0"/><stop offset=".48" stop-color="#f6e2c0"/></linearGradient>' +
        '<radialGradient id="cGu"><stop offset="0" stop-color="#fff8d8" stop-opacity=".9"/><stop offset=".25" stop-color="#fff0c0" stop-opacity=".3"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="cD" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a82b0"/><stop offset="1" stop-color="#1a5a80"/></linearGradient>' +
        '<linearGradient id="cZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d8c8a6"/><stop offset="1" stop-color="#a8906a"/></linearGradient>'
      );
    },
    hazirla: function (el) { this._g = el.querySelector(".g1"); this._m = el.querySelectorAll(".marti"); this._k = el.querySelectorAll(".kita-kay"); this._kiyi = el.querySelector(".kiyi"); },
    kare: function (t) {
      if (this._g) this._g.setAttribute("transform", "translate(" + ((t / 60) % 1900 - 150).toFixed(1) + " " + (Math.sin(t / 700) * 3).toFixed(1) + ")");
      for (var i = 0; i < this._m.length; i++) { var x = ((t / (22 + i * 8)) + i * 600) % 1800 - 100, y = 180 + i * 70 + Math.sin(t / 600 + i) * 30; this._m[i].setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(1 " + (0.6 + Math.abs(Math.sin(t / 180 + i)) * 0.6).toFixed(2) + ")"); }
      for (var k = 0; k < this._k.length; k++) this._k[k].setAttribute("transform", "translate(" + (-((t / 80) % 300)).toFixed(1) + " 0)");
      if (this._kiyi) { var f = (t / 9000) % 1; this._kiyi.style.strokeDasharray = "1"; this._kiyi.style.strokeDashoffset = (1 - Math.min(1, f * 1.4)).toFixed(3); }
    },
    eserler: [
      { x: 50, y: 78, ad: "Portolan harita", panel:
        "<h3>Portolanlar ve Piri Reis</h3><p><b>Portolan</b> haritaları 13.–16. yüzyıllarda Akdeniz denizcilerinin kullandığı kıyı haritalarıdır. Üzerlerinde rüzgâr güllerinden yayılan kerte hatları bulunur: denizci pusulayla bu hatlardan birini izleyerek rotasını çizerdi. Masadaki haritada kıyı çizgisi yavaş yavaş çiziliyor.</p>" +
        "<p><b>Piri Reis</b> 1513'te, Kolomb'un bir haritası dâhil pek çok kaynağı birleştirerek bir dünya haritası çizdi; bugüne kalan parçası Topkapı Sarayı'ndadır. 1521'de tamamladığı <i>Kitâb-ı Bahriye</i>, Akdeniz kıyılarını ayrıntılı haritalarla anlatan bir denizcilik kılavuzudur.</p>" },
      { x: 18, y: 58, ad: "Yerküre", panel:
        "<h3>Dünyayı ölçmek</h3><p>MÖ 240 civarında İskenderiye'de <b>Eratosthenes</b>, yaz gün dönümünde Siene'de (Asvan) güneşin tam tepede olduğunu, aynı anda İskenderiye'de ise gölgenin bir çemberin yaklaşık elliden biri kadar açı yaptığını kullanarak Dünya'nın çevresini hesapladı. Kullandığı stadion biriminin tam uzunluğu belirsiz olsa da sonucu, bugünkü yaklaşık 40.000 km'ye şaşırtıcı derecede yakındır.</p>" +
        "<p>Günümüze ulaşan en eski yerküre, Martin Behaim'in 1492'de Nürnberg'de yaptırdığı “Erdapfel”dir; Amerika henüz üzerinde yoktur.</p>" },
      { x: 72, y: 91, ad: "Pusula gülü", panel:
        "<h3>Haritanın yalanı: projeksiyonlar</h3><p>Gauss 1827'de kanıtladı: bir kürenin yüzeyi hiçbir biçimde bozulmadan düzleme açılamaz. Her harita bir şeyi korumak için başka bir şeyden vazgeçer.</p>" +
        "<p><b>Mercator</b>'un 1569 projeksiyonu açıları korur, bu yüzden denizciler için çok değerlidir: pusulayla izlenen sabit rota haritada düz bir çizgidir. Bedeli, kutuplara yaklaştıkça alanların şişmesidir: Grönland neredeyse Afrika kadar görünür, oysa Afrika yaklaşık 14 kat büyüktür.</p>" },
      { x: 81, y: 50, ad: "Gemi", panel:
        "<h3>Boylam problemi</h3><p>Enlemi güneşin ya da Kutup Yıldızı'nın yüksekliğinden bulmak kolaydır. Boylam içinse doğru bir saate gerekir: yerel öğle ile limandaki saat arasındaki her bir saat farkı 15 derece boylam demektir. Denizde doğru çalışan bir saat yapmak yüzyıllarca çözülemedi.</p>" +
        "<p>İngiltere 1714'te büyük bir ödül koydu; saatçi <b>John Harrison</b>'ın H4 deniz kronometresi 1761'deki deneme yolculuğunda sorunun çözülebildiğini gösterdi.</p>" +
        "<p>Çok daha önce, 1154'te <b>el-İdrîsî</b> Sicilya Kralı II. Roger için <i>Tabula Rogeriana</i>'yı hazırlamıştı: Orta Çağ'ın en ayrıntılı dünya haritalarından biri.</p>" },
      { x: 24, y: 45, ad: "Kıyı dağları", panel:
        "<h3>Fiziki ve beşerî coğrafya</h3><p>Coğrafya iki büyük koldan oluşur: yeryüzünün şekillerini, iklimi, suları ve toprağı inceleyen <b>fiziki coğrafya</b>; insanların yeryüzüne nasıl yayıldığını, yerleştiğini ve onu nasıl dönüştürdüğünü inceleyen <b>beşerî coğrafya</b>.</p>" +
        "<p>1912'de Alfred Wegener kıtaların kaydığını öne sürdü; fikir ancak 1960'larda <b>levha tektoniği</b> kuramıyla kabul gördü. Dağlar levhaların çarpışmasıyla yükselir: Himalayalar hâlâ yükselmektedir.</p>" +
        "<div class=\"pn-etiketler\"><span>Jeomorfoloji</span><span>Klimatoloji</span><span>Hidrografya</span><span>Kartografya</span><span>Nüfus coğrafyası</span><span>Kent coğrafyası</span><span>Siyasi coğrafya</span></div>" }
    ]
  });

  /* ════════ ESTETİK (merkez) ════════ */
  S.kaydet("estetik", {
    ad: "Estetik", yer: "Kütüphane · Estetik odası", vurgu: "#E89AC8", alan: "estetik",
    alt: "Perde aralanıyor: sözcükler, imgeler ve sesler. Güzel olan, yüce olan, bizi değiştiren her şey. Bir kapıdan içeri gir.",
    parcacik: { tur: "harf", adet: 40, harfler: "♪♫♩✦❦✧", renk: "rgba(240,200,210," },
    arka: function () {
      var s = '<rect width="1600" height="900" fill="#0e080c"/><polygon class="isik-huzme" points="740,0 860,0 1120,900 480,900" fill="url(#eI2)"/><ellipse cx="800" cy="840" rx="360" ry="50" fill="#ffe7c8" opacity=".12"/>';
      s += '<path d="M0 0H420C380 200 400 500 340 900H0Z" fill="url(#eP)"/><path d="M1600 0H1180C1220 200 1200 500 1260 900H1600Z" fill="url(#eP)"/>';
      for (var i = 0; i < 8; i++) { s += '<path d="M' + (40 + i * 46) + ' 0C' + (30 + i * 44) + " 300 " + (50 + i * 40) + " 600 " + (20 + i * 40) + ' 900" stroke="rgba(0,0,0,.28)" stroke-width="8" fill="none"/><path d="M' + (1560 - i * 46) + ' 0C' + (1570 - i * 44) + " 300 " + (1550 - i * 40) + " 600 " + (1580 - i * 40) + ' 900" stroke="rgba(0,0,0,.28)" stroke-width="8" fill="none"/>'; }
      s += '<path d="M0 0H1600V70C1400 110 1200 60 1000 100C800 130 600 60 400 100C200 130 100 80 0 110Z" fill="#6a1424"/><path d="M0 110C100 80 200 130 400 100C600 60 800 130 1000 100C1200 60 1400 110 1600 70" stroke="#d9b25e" stroke-width="5" fill="none" stroke-dasharray="3 8"/>';
      s += '<g transform="translate(800 300)"><rect x="-120" y="-90" width="240" height="180" fill="none" stroke="#d9b25e" stroke-width="10"/><rect x="-104" y="-74" width="208" height="148" fill="#1a1216"/>' +
        '<g class="yuz" style="--s:6s"><path d="M-40 -20C-40 -50 40 -50 40 -20C40 20 20 40 0 40C-20 40 -40 20 -40 -20Z" fill="#f0e6d8"/><path d="M-24 -18q8 -8 16 0M8 -18q8 -8 16 0M-14 16q14 10 28 0" stroke="#1a1216" stroke-width="3" fill="none"/></g></g>';
      s += '<rect x="0" y="820" width="1600" height="80" fill="#2a1a12"/><path d="M0 820H1600" stroke="#d9b25e" stroke-width="3"/>';
      return h.svg(s, '<linearGradient id="eI2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff0d8" stop-opacity=".35"/><stop offset="1" stop-color="#fff0d8" stop-opacity=".05"/></linearGradient><linearGradient id="eP" x1="0" x2="1"><stop offset="0" stop-color="#4a0e1a"/><stop offset=".5" stop-color="#8a1a2e"/><stop offset="1" stop-color="#5a1020"/></linearGradient>');
    },
    kapilar: [
      { hedef: "film", x: 36, y: 68, sanat: kapiFilm, aciklama: "Görsel sanatlar: bir yaz gecesi, yazlık sinema." },
      { hedef: "sozlukce-estetik", x: 64, y: 68, sanat: S.sozlukSanat("#E89AC8"), aciklama: "Katharsis'ten montaja: estetiğin terimleri." }
    ],
    yakinda: ["Edebiyat", "Müzik"]
  });

  /* ════════ FİLM: yazlık sinema ════════ */
  S.kaydet("film", {
    ad: "Film", ust: "estetik", yer: "Görsel sanatlar · bir yaz gecesi, yazlık sinema", vurgu: "#E89AC8", alan: "estetik",
    alt: "Cırcır böcekleri, ampul dizileri, makinenin tıkırtısı. Işık huzmesi tozun içinden geçip perdeye düşüyor: önce geri sayım, sonra Ay'a giden bir roket.",
    parcacik: { tur: "yildiz", adet: 90 }, isaret: "yildiz",
    sozler: [
      { metin: "Le cinéma, c'est la vérité vingt-quatre fois par seconde.", dil: "fr", ceviri: "Sinema, saniyede yirmi dört kez hakikattir.", kaynak: "Jean-Luc Godard · Le Petit Soldat, 1963" },
      { metin: "Qu'est-ce que le cinéma ?", dil: "fr", ceviri: "Sinema nedir?", kaynak: "André Bazin, 1958–1962" },
      { metin: "Le cinéma est une invention sans avenir.", dil: "fr", ceviri: "Sinema geleceği olmayan bir icattır.", kaynak: "Lumière'lere atfedilir" }
    ],
    arka: function () {
      var r = h.rnd(77), s = '<rect width="1600" height="900" fill="url(#fiG)"/>' + h.yildizlar(80, 77, 0, 0, 1600, 420, "#fff");
      s += '<circle cx="1430" cy="110" r="36" fill="#f4ecd8"/><circle cx="1430" cy="110" r="100" fill="url(#fiAy)"/>';
      s += '<g fill="#06080a">' + [[40, 560, 220], [180, 580, 160], [1320, 560, 200], [1480, 570, 240]].map(function (a) { return '<ellipse cx="' + a[0] + '" cy="' + (a[1] - a[2] * 0.6) + '" rx="' + a[2] * 0.55 + '" ry="' + a[2] * 0.6 + '"/><rect x="' + (a[0] - 8) + '" y="' + (a[1] - a[2] * 0.2) + '" width="16" height="' + a[2] * 0.4 + '"/>'; }).join("") + "</g>";
      s += '<rect x="560" y="140" width="660" height="400" fill="#2a2420"/><rect class="perde" x="590" y="160" width="600" height="340" fill="#ece6d8"/>';
      s += '<g class="geri-sayim" transform="translate(890 330)"><circle r="150" fill="none" stroke="#3a3430" stroke-width="3"/><circle r="120" fill="none" stroke="#3a3430" stroke-width="2"/><path d="M-300 0H300M0 -170V170" stroke="#3a3430" stroke-width="2"/><path class="gs-dilim" fill="rgba(40,34,30,.35)"/><text class="gs-sayi" y="46" text-anchor="middle" font-family="Georgia, serif" font-size="130" fill="#2a2420">5</text></g>';
      s += '<g class="melies" opacity="0"><rect x="590" y="160" width="600" height="340" fill="#1e1c1a"/>' + h.yildizlar(30, 9, 600, 170, 1180, 490, "#ece6d8") +
        '<g transform="translate(960 300)"><circle r="110" fill="#e8e0cc"/><circle r="110" fill="none" stroke="#b8b0a0" stroke-width="4"/><path d="M-60 -30q20 -14 40 0M20 -30q20 -14 40 0" stroke="#5a5448" stroke-width="5" fill="none"/><circle cx="-40" cy="-18" r="10" fill="#5a5448"/><path d="M-40 50q40 22 80 0" stroke="#5a5448" stroke-width="6" fill="none"/><circle cx="-80" cy="30" r="14" fill="#d0c8b4"/><circle cx="60" cy="70" r="10" fill="#d0c8b4"/></g>' +
        '<g class="roket"><path d="M0 -14L48 0L0 14Z" fill="#c8c0b0"/><rect x="-40" y="-14" width="42" height="28" fill="#d8d0c0"/><path d="M-40 -14L-54 -24V24L-40 14Z" fill="#a8a090"/></g></g>';
      s += '<rect class="perde-cizik" x="700" y="160" width="2" height="340" fill="#fff" opacity="0"/><rect class="perde-titre" x="590" y="160" width="600" height="340" fill="#fff" opacity="0"/>';
      s += '<g transform="translate(200 380)"><rect x="-110" y="-80" width="220" height="200" fill="#3a2a22"/><rect x="-110" y="-96" width="220" height="20" fill="#5a3a2a"/><rect x="30" y="-40" width="54" height="40" fill="#ffe7a8"/><rect x="-80" y="-40" width="54" height="40" fill="#2a1a12"/><rect x="-30" y="60" width="50" height="60" fill="#1a120c"/></g>';
      s += '<polygon class="huzme" points="284,346 284,374 1190,500 1190,160" fill="url(#fiH)"/>';
      s += '<g stroke="#2a2420" stroke-width="1.5" fill="none"><path d="M0 60Q400 160 800 90Q1200 20 1600 110"/><path d="M0 220Q300 300 560 250"/><path d="M1220 250Q1400 300 1600 230"/></g>';
      var amp = "";
      for (var k = 0; k <= 22; k++) { var tt = k / 22, x = tt * 1600, y = (1 - tt) * (1 - tt) * 60 + 2 * (1 - tt) * tt * 125 + tt * tt * 90; if (k < 11) y = (1 - tt * 2) * (1 - tt * 2) * 60 + 2 * (1 - tt * 2) * tt * 2 * 160 + tt * 2 * tt * 2 * 90; else { var u = (tt - 0.5) * 2; y = (1 - u) * (1 - u) * 90 + 2 * (1 - u) * u * 20 + u * u * 110; } amp += '<circle class="ampul" style="animation-delay:-' + (r() * 3).toFixed(1) + 's" cx="' + x.toFixed(0) + '" cy="' + (y + 8).toFixed(0) + '" r="6" fill="#ffd27a"/>'; }
      s += amp;
      s += '<rect x="0" y="560" width="1600" height="340" fill="url(#fiZ)"/>';
      for (var sira = 0; sira < 4; sira++) {
        var y0 = 620 + sira * 70, o = 0.8 + sira * 0.22;
        for (var j = 0; j < 12 - sira; j++) {
          var x0 = 380 + j * (78 * o) + (sira % 2) * 30 - sira * 40;
          if (r() < 0.75) s += '<g transform="translate(' + x0.toFixed(0) + " " + y0 + ") scale(" + o.toFixed(2) + ')"><circle cy="-34" r="13" fill="#0a0808"/><path d="M-20 0C-20 -18 -12 -24 0 -24C12 -24 20 -18 20 0Z" fill="#0a0808"/></g>';
          s += '<rect x="' + (x0 - 22 * o).toFixed(0) + '" y="' + (y0 - 4) + '" width="' + (44 * o).toFixed(0) + '" height="' + (30 * o).toFixed(0) + '" fill="#4a2e1a" opacity=".9"/>';
        }
      }
      s += '<g transform="translate(1350 420)"><rect x="-80" y="-120" width="160" height="230" fill="#e8d8b8" stroke="#6a4a2a" stroke-width="6"/><rect x="-66" y="-106" width="132" height="120" fill="#1e2a3a"/><circle cx="0" cy="-46" r="34" fill="#e8e0cc"/><path d="M-40 -6L40 -70" stroke="#c8c0b0" stroke-width="6"/>' +
        '<text y="44" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#6a1424">AY\'A</text><text y="70" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#6a1424">YOLCULUK</text></g>';
      s += '<g transform="translate(1280 760)"><circle r="46" fill="#1a1612" stroke="#c9b48a" stroke-width="4"/><g class="makara">' + [0, 60, 120, 180, 240, 300].map(function (a) { return '<circle cx="0" cy="-26" r="9" fill="#0a0806" transform="rotate(' + a + ')"/>'; }).join("") + '</g><circle r="6" fill="#c9b48a"/><path d="M40 20L120 60" stroke="#2a2420" stroke-width="16"/></g>';
      return h.svg(s,
        '<linearGradient id="fiG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#060a18"/><stop offset=".6" stop-color="#101a30"/><stop offset="1" stop-color="#1a1420"/></linearGradient>' +
        '<radialGradient id="fiAy"><stop offset="0" stop-color="#f4ecd8" stop-opacity=".3"/><stop offset="1" stop-color="#f4ecd8" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="fiH" x1="0" x2="1"><stop offset="0" stop-color="#fff4d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff4d8" stop-opacity=".08"/></linearGradient>' +
        '<linearGradient id="fiZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1a1410"/><stop offset="1" stop-color="#0a0806"/></linearGradient>'
      );
    },
    hazirla: function (el) {
      this._gs = el.querySelector(".geri-sayim"); this._dil = el.querySelector(".gs-dilim"); this._sayi = el.querySelector(".gs-sayi");
      this._m = el.querySelector(".melies"); this._roket = el.querySelector(".roket"); this._makara = el.querySelector(".makara");
      this._ciz = el.querySelector(".perde-cizik"); this._titre = el.querySelector(".perde-titre"); this._huzme = el.querySelector(".huzme");
    },
    kare: function (t) {
      var f = (t / 1000) % 12;
      if (f < 5) {
        var n = 5 - Math.floor(f), p = f % 1, a = p * TAU;
        this._gs.setAttribute("opacity", "1"); this._m.setAttribute("opacity", "0");
        if (this._sayi.textContent !== String(n)) this._sayi.textContent = n;
        this._dil.setAttribute("d", "M0 0L0 -150A150 150 0 " + (p > 0.5 ? 1 : 0) + " 1 " + (Math.sin(a) * 150).toFixed(1) + " " + (-Math.cos(a) * 150).toFixed(1) + "Z");
      } else {
        this._gs.setAttribute("opacity", "0"); this._m.setAttribute("opacity", "1");
        var k = Math.min(1, (f - 5.3) / 3.2), rx = 620 + k * 280, ry = 440 - k * 150 + Math.sin(k * Math.PI) * -40;
        this._roket.setAttribute("transform", "translate(" + rx.toFixed(1) + " " + ry.toFixed(1) + ") rotate(" + (-22 + k * 10).toFixed(1) + ")");
      }
      if (this._makara) this._makara.setAttribute("transform", "rotate(" + ((t / 8) % 360).toFixed(1) + ")");
      if (this._titre) this._titre.setAttribute("opacity", (Math.random() * 0.06).toFixed(3));
      if (this._huzme) this._huzme.setAttribute("opacity", (0.85 + Math.random() * 0.15).toFixed(2));
      if (this._ciz) { var c = Math.random() < 0.08; this._ciz.setAttribute("opacity", c ? "0.35" : "0"); if (c) this._ciz.setAttribute("x", (600 + Math.random() * 580).toFixed(0)); }
    },
    eserler: [
      { x: 14, y: 42, ad: "Projektör", panel:
        "<h3>Sinematograf</h3><p>28 Aralık 1895'te Paris'te Grand Café'nin bodrumunda <b>Lumière kardeşler</b> sinematograflarıyla ilk ücretli halka açık film gösterimini yaptı. Sinematograf hem kamera, hem baskı makinesi, hem de projektördü.</p>" +
        "<p>Hareket bir yanılsamadır: perdeye art arda düşen durağan kareleri gözümüz ve beynimiz sürekli bir hareket olarak algılar. Sessiz filmler saniyede farklı kare hızlarında çekilirdi; sesli filmle birlikte saniyede <b>24 kare</b> standart oldu.</p><p>Türkiye'de ilk film gösterimleri 1896'da İstanbul'da yapıldı.</p>" },
      { x: 56, y: 30, ad: "Perde", panel:
        "<h3>Méliès: Ay'a Yolculuk</h3><p>Perdede dönen, <b>Georges Méliès</b>'in 1902 tarihli <i>Le Voyage dans la Lune</i> (Ay'a Yolculuk) filminin en ünlü görüntüsünden esinlenen bir sahne: roket Ay'ın gözüne saplanır.</p>" +
        "<p>Méliès bir sihirbazdı. Çekimi durdurup sahnedekini değiştirerek nesneleri yok eden, dönüştüren numaralar buldu; sinemanın yalnızca gerçeği kaydetmek için değil, düş kurmak için de kullanılabileceğini gösterdi.</p><p>Film başlamadan önceki geri sayım (film kılavuz şeridi) makinistin görüntüyü ve sesi hizalamasına yardım eder.</p>" },
      { x: 80, y: 84, ad: "Film makarası", panel:
        "<h3>Montaj</h3><p>Film, çekimlerin birbirine eklenmesiyle anlam kazanır. Sovyet yönetmen <b>Lev Kuleşov</b>'un deneylerinde aynı ifadesiz yüz, ardından gelen görüntüye (bir tabak çorba, bir tabut, oynayan bir çocuk) göre seyircinin gözünde açlık, yas ya da sevgi ifade eder: <b>Kuleşov etkisi</b>.</p>" +
        "<p><b>Sergey Eisenstein</b>'a göre iki çekimin çarpışmasından, ikisinde de olmayan üçüncü bir anlam doğar. <i>Potemkin Zırhlısı</i>'ndaki (1925) Odessa merdivenleri sahnesi montaj tarihinin en çok incelenen sahnelerindendir.</p>" },
      { x: 45, y: 76, ad: "Seyirciler", panel:
        "<h3>Yazlık sinema</h3><p>Yaz akşamları açık havada, bahçelerde ve damlarda kurulan yazlık sinemalar, Türkiye'de özellikle Yeşilçam'ın en verimli yıllarında (1950'lerin sonundan 1970'lere) şehir hayatının parçasıydı: tahta sandalyeler, çekirdek, gazoz, ara verilen makara değişimleri.</p>" +
        "<p>Sinema kolektif bir deneyimdir: aynı karanlıkta, aynı anda gülen ya da susan bir kalabalık. Televizyonun ve sonra ev videosunun yaygınlaşmasıyla bu kültür büyük ölçüde azaldı.</p>" },
      { x: 84, y: 44, ad: "Afiş", panel:
        "<h3>Film kuramı ve felsefe</h3><ul><li><b>Rudolf Arnheim</b>, <i>Film als Kunst</i> (1932): filmin gerçeği kopyalayamadığı için sanat olabildiğini savundu.</li><li><b>André Bazin</b>, <i>Sinema Nedir?</i>: fotoğraf ve sinemanın gerçekliğin izini taşıdığını, uzun çekimin ve alan derinliğinin gerçekliğe saygı gösterdiğini yazdı.</li><li><b>Gilles Deleuze</b>, <i>Sinema 1: Hareket-İmge</i> (1983) ve <i>Sinema 2: Zaman-İmge</i> (1985): sinemayı imgeler ve zaman üzerine bir düşünme biçimi olarak ele aldı.</li></ul>" +
        "<div class=\"pn-etiketler\"><span>Resim</span><span>Fotoğraf</span><span>Film</span><span>Dizi</span><span>Animasyon</span></div>" }
    ]
  });

  S.sozlukce("sozlukce-formel", { ust: "formel-bilimler", alan: "formel", yer: "Formel Bilimler · terimler", vurgu: "#9FC8FF", harfler: "0123456789πΣ∞√∫∂φ∀∃" });
  S.sozlukce("sozlukce-sosyal", { ust: "sosyal-bilimler", alan: "sosyal", yer: "Sosyal Bilimler · terimler", vurgu: "#F0B870" });
  S.sozlukce("sozlukce-estetik", { ust: "estetik", alan: "estetik", yer: "Estetik · terimler", vurgu: "#E89AC8", harfler: "♪♫♩✦❦✧ABCÇDEFG" });
})();
