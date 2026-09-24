/* Diller odası: harf halkaları arasında üç kapı → Roma Senatosu (Latince), Atina Agorası (Antik Yunanca), Beytülhikme (Arapça). */
(function () {
  var S = window.SAHNE; if (!S) return;
  var h = S.h;

  /* ════════ MERKEZ: Diller ════════ */
  function halkaMetni(r, metin, sinif, boy, renk) {
    var id = "hk" + r;
    return '<path id="' + id + '" d="M800 ' + (470 - r) + "a" + r + " " + r + " 0 1 1 -.1 0" + '" fill="none"/>' +
      '<g class="don ' + sinif + '" style="--s:' + (r / 2.2).toFixed(0) + 's"><text font-family="Georgia, serif" font-size="' + boy + '" fill="' + renk + '" letter-spacing="6"><textPath href="#' + id + '">' + metin + "</textPath></text></g>";
  }
  var kapiLatin = '<svg viewBox="0 0 200 250"><defs><linearGradient id="kl1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e2d3b3"/><stop offset="1" stop-color="#8f7d62"/></linearGradient>' +
    '<radialGradient id="kl2" cy=".7"><stop offset="0" stop-color="#ffd58a"/><stop offset=".6" stop-color="#c46a2a"/><stop offset="1" stop-color="#3a1a0e"/></radialGradient></defs>' +
    '<rect x="14" y="30" width="172" height="215" fill="url(#kl1)"/><rect x="8" y="18" width="184" height="30" fill="#cdbd9b"/><text x="100" y="40" text-anchor="middle" font-family="Georgia,serif" font-size="17" letter-spacing="5" fill="#5c4a30">S·P·Q·R</text>' +
    '<path d="M52 245V128a48 48 0 0 1 96 0V245Z" fill="url(#kl2)"/><g class="kapi-isik"><path d="M52 245V128a48 48 0 0 1 96 0V245Z" fill="#ffd58a" opacity=".25"/></g>' +
    '<g fill="#3a2215" opacity=".75"><rect x="70" y="150" width="7" height="95"/><rect x="123" y="150" width="7" height="95"/><circle cx="100" cy="196" r="7"/><path d="M92 245l2-40h12l2 40Z"/></g>' +
    '<rect x="22" y="60" width="14" height="185" fill="#b8a684"/><rect x="164" y="60" width="14" height="185" fill="#b8a684"/><path d="M52 128a48 48 0 0 1 96 0" fill="none" stroke="#6d5c42" stroke-width="3"/></svg>';
  var kapiYunan = '<svg viewBox="0 0 200 250"><defs><linearGradient id="ky1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffcf7a"/><stop offset=".6" stop-color="#e0703a"/><stop offset="1" stop-color="#5a2a3a"/></linearGradient></defs>' +
    '<rect x="16" y="78" width="168" height="150" fill="url(#ky1)"/><g class="kapi-isik"><circle cx="100" cy="170" r="30" fill="#fff0c0" opacity=".7"/></g>' +
    '<path d="M6 76L100 20L194 76Z" fill="#e9dcc0"/><path d="M26 70L100 30L174 70Z" fill="#d4c29e"/><rect x="4" y="74" width="192" height="12" fill="#f0e4c8"/>' +
    '<g fill="#efe3c6">' + [22, 62, 116, 156].map(function (x) { return '<rect x="' + x + '" y="86" width="22" height="142"/><rect x="' + (x - 3) + '" y="86" width="28" height="7"/>'; }).join("") + "</g>" +
    '<g fill="#b9a67f" opacity=".6">' + [22, 62, 116, 156].map(function (x) { return '<rect x="' + (x + 15) + '" y="93" width="7" height="135"/>'; }).join("") + "</g>" +
    '<rect x="0" y="228" width="200" height="8" fill="#e2d4b4"/><rect x="-6" y="236" width="212" height="9" fill="#cdbd98"/></svg>';
  var kapiArap = '<svg viewBox="0 0 200 250"><defs><linearGradient id="ka1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0d2233"/><stop offset="1" stop-color="#1d4a4a"/></linearGradient></defs>' +
    '<rect x="10" y="10" width="180" height="235" rx="4" fill="#2a5a5a"/><rect x="18" y="18" width="164" height="227" fill="#1c3c3e"/>' +
    '<path d="M40 245V120C40 80 72 58 100 30C128 58 160 80 160 120V245Z" fill="url(#ka1)"/>' +
    '<path d="M40 245V120C40 80 72 58 100 30C128 58 160 80 160 120V245" fill="none" stroke="#d9b25e" stroke-width="3"/>' +
    '<path d="M126 70a16 16 0 1 0 8 28a13 13 0 1 1 -8 -28Z" fill="#f4e6b0"/>' +
    '<g class="asili" style="--s:4s;--a:4deg"><path d="M100 40V120" stroke="#b08a3e" stroke-width="1.5"/><path d="M92 122h16l-3 22h-10Z" fill="#d9b25e"/><g class="kapi-isik"><circle cx="100" cy="134" r="16" fill="#ffc862" opacity=".6"/></g></g>' +
    '<g transform="translate(100 196)" fill="none" stroke="#d9b25e" stroke-width="2"><rect x="-22" y="-22" width="44" height="44"/><rect x="-22" y="-22" width="44" height="44" transform="rotate(45)"/><circle r="9"/></g>' +
    '<path d="M18 30h164" stroke="#d9b25e" stroke-width="2"/></svg>';

  S.kaydet("diller", {
    ad: "Diller", yer: "Kütüphane · Diller odası", vurgu: "#E8BD62", alan: "diller",
    alt: "Her dil dünyayı başka türlü bölen bir penceredir. Bir kapı seç ve o dilin konuşulduğu yere gir.",
    parcacik: { tur: "harf", adet: 70 },
    arka: function () {
      return h.svg(
        '<rect width="1600" height="900" fill="url(#dG)"/><circle cx="800" cy="470" r="520" fill="url(#dI)"/>' +
        halkaMetni(420, "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ · ABCDEFGHIKLMNOPQRSTVXYZ · ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ · ABCDEFGHIKLMNOPQRSTVXYZ ·", "", 30, "rgba(232,200,130,.16)") +
        halkaMetni(340, "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي · ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ·", "don-ters", 30, "rgba(232,200,130,.13)") +
        halkaMetni(260, "λόγος · verbum · كلمة · Wort · parole · word · söz · λόγος · verbum · كلمة · Wort · parole · word · söz ·", "", 22, "rgba(232,200,130,.2)") +
        '<circle cx="800" cy="470" r="470" fill="none" stroke="rgba(232,189,98,.08)"/><circle cx="800" cy="470" r="300" fill="none" stroke="rgba(232,189,98,.08)"/>' +
        h.yildizlar(90, 11, 0, 0, 1600, 900, "#f3e2b5"),
        '<radialGradient id="dG" cx=".5" cy=".55" r=".8"><stop offset="0" stop-color="#1d1830"/><stop offset=".6" stop-color="#0e0b18"/><stop offset="1" stop-color="#050408"/></radialGradient>' +
        '<radialGradient id="dI"><stop offset="0" stop-color="#e8bd62" stop-opacity=".12"/><stop offset="1" stop-color="#e8bd62" stop-opacity="0"/></radialGradient>'
      );
    },
    kapilar: [
      { hedef: "latince", x: 31, y: 60, sanat: kapiLatin, aciklama: "Roma Senatosu, MÖ 63 — Cicero kürsüde." },
      { hedef: "yunanca", x: 50, y: 56, sanat: kapiYunan, aciklama: "Atina Agorası, gün batımı — Akropolis'in gölgesinde." },
      { hedef: "arapca", x: 69, y: 60, sanat: kapiArap, aciklama: "Bağdat, Beytülhikme — kandiller ve el yazmaları." }
    ],
    yakinda: ["Almanca", "Fransızca", "İngilizce"]
  });

  /* ════════ LATİNCE: Roma Senatosu ════════ */
  function sutun(x, ust, alt, w, koyu) {
    var bh = w * 0.32, ch = w * 0.42, s = "";
    s += '<rect x="' + (x - w / 2) + '" y="' + (ust + ch) + '" width="' + w + '" height="' + (alt - bh - ust - ch) + '" fill="url(#lM)"/>';
    for (var k = 1; k < 5; k++) s += '<path d="M' + (x - w / 2 + (k * w) / 5).toFixed(1) + " " + (ust + ch) + "V" + (alt - bh) + '" stroke="rgba(70,52,34,.22)" stroke-width="' + (w / 40).toFixed(1) + '"/>';
    s += '<rect x="' + (x - w / 2) + '" y="' + (ust + ch) + '" width="' + w + '" height="' + (alt - bh - ust - ch) + '" fill="url(#lS)"/>';
    s += '<rect x="' + (x - w * 0.72) + '" y="' + ust + '" width="' + w * 1.44 + '" height="' + ch * 0.4 + '" fill="#cbbd9f"/>';
    s += '<circle cx="' + (x - w * 0.55) + '" cy="' + (ust + ch * 0.62) + '" r="' + ch * 0.26 + '" fill="#bfae8c" stroke="#8a7658"/><circle cx="' + (x + w * 0.55) + '" cy="' + (ust + ch * 0.62) + '" r="' + ch * 0.26 + '" fill="#bfae8c" stroke="#8a7658"/>';
    s += '<rect x="' + (x - w * 0.6) + '" y="' + (ust + ch * 0.4) + '" width="' + w * 1.2 + '" height="' + ch * 0.45 + '" fill="#d6c8aa"/>';
    s += '<rect x="' + (x - w * 0.66) + '" y="' + (alt - bh) + '" width="' + w * 1.32 + '" height="' + bh + '" fill="#b9a988"/>';
    if (koyu) s += '<rect x="' + (x - w * 0.72) + '" y="' + ust + '" width="' + w * 1.44 + '" height="' + (alt - ust) + '" fill="#0c0806" opacity="' + koyu + '"/>';
    return s;
  }
  function senator(x, y, o, r) {
    var ton = ["#d8cbb0", "#cfc1a3", "#e2d6bc", "#c7b89a"][Math.floor(r() * 4)];
    return '<g transform="translate(' + x.toFixed(0) + " " + y.toFixed(0) + ") scale(" + o.toFixed(2) + ')">' +
      '<path d="M-17 0C-19 -18 -16 -34 -10 -40L10 -40C16 -34 19 -18 17 0Z" fill="' + ton + '"/><path d="M-10 -40C-2 -26 6 -16 16 -6" stroke="rgba(110,90,60,.45)" stroke-width="2" fill="none"/>' +
      '<circle cy="-49" r="8.5" fill="#b48c68"/><path d="M-8.5 -52a8.5 8.5 0 0 1 17 0Z" fill="#3a2a1e"/></g>';
  }
  S.kaydet("latince", {
    ad: "Latince", ust: "diller", yer: "Roma · Senato toplantısı · MÖ 63", vurgu: "#E8BD62", alan: "diller",
    alt: "Konsül Cicero ayağa kalktı; salon sustu. Latince, Roma'nın hukukunu, felsefesini ve bin yıl boyunca Avrupa'nın bilim dilini taşıdı.",
    parcacik: { tur: "toz", adet: 90 }, sozYer: "sag", isaret: "halka",
    sozler: [
      { metin: "Quo usque tandem abutere, Catilina, patientia nostra?", dil: "la", ceviri: "Ne zamana dek, Catilina, sabrımızı kötüye kullanacaksın?", kaynak: "Cicero · In Catilinam I, 1" },
      { metin: "Sapere aude.", dil: "la", ceviri: "Bilmeye cesaret et.", kaynak: "Horatius · Epistulae I.2.40" },
      { metin: "Historia vero testis temporum, lux veritatis, vita memoriae, magistra vitae.", dil: "la", ceviri: "Tarih zamanların tanığı, hakikatin ışığı, belleğin canı, hayatın öğretmenidir.", kaynak: "Cicero · De Oratore II, 36" },
      { metin: "Cogito, ergo sum.", dil: "la", ceviri: "Düşünüyorum, öyleyse varım.", kaynak: "Descartes · Principia philosophiae, 1644" }
    ],
    arka: function () {
      var r = h.rnd(21), s = "";
      s += '<rect width="1600" height="900" fill="url(#lD)"/>';
      s += '<rect x="250" y="70" width="1100" height="90" fill="#6d5a44"/><rect x="250" y="150" width="1100" height="10" fill="#8a7458"/><rect x="250" y="62" width="1100" height="10" fill="#8a7458"/>';
      s += '<text x="800" y="128" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="40" letter-spacing="10" fill="#e4cf9e" opacity=".8">SENATVS·POPVLVSQVE·ROMANVS</text>';
      [470, 1130].forEach(function (x) { s += '<path d="M' + (x - 40) + " 300V210a40 40 0 0 1 80 0V300Z" + '" fill="#ffe2a8" opacity=".75"/>'; });
      s += '<polygon class="isik-huzme" points="436,215 510,215 900,900 640,900" fill="url(#lH)"/><polygon class="isik-huzme" style="animation-delay:-3s" points="1090,215 1164,215 1020,900 780,900" fill="url(#lH)"/>';
      s += '<path d="M720 540V300a80 80 0 0 1 160 0V540Z" fill="#231a13"/><path d="M720 300a80 80 0 0 1 160 0" fill="none" stroke="#8a7458" stroke-width="6"/>';
      s += '<rect x="770" y="470" width="60" height="70" fill="#6d5c46"/><path d="M800 340c-10 0-15 10-13 20c-12 5-17 25-18 50c-2 30 4 50 7 60h48c3-10 9-30 7-60c-1-25-6-45-18-50c2-10-3-20-13-20Z" fill="#5e4e3a"/>';
      s += '<polygon points="0,560 1600,560 1600,900 0,900" fill="url(#lZ)"/>';
      for (var i = -12; i <= 12; i++) s += '<path d="M800 470L' + (800 + i * 150) + ' 900" stroke="rgba(0,0,0,.22)" stroke-width="1.5"/>';
      [575, 600, 632, 674, 728, 800, 890].forEach(function (y) { s += '<path d="M0 ' + y + "H1600" + '" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>'; });
      s += '<ellipse cx="800" cy="760" rx="250" ry="58" fill="#5c2222" opacity=".85"/><ellipse cx="800" cy="760" rx="230" ry="50" fill="none" stroke="#c9b48a" stroke-width="3" opacity=".6"/><ellipse cx="800" cy="760" rx="120" ry="26" fill="#2d4a36" opacity=".8"/>';
      [0, 1, 2].forEach(function (k) {
        s += '<polygon points="0,' + (640 + k * 70) + " 560," + (560 + k * 14) + " 560," + (580 + k * 14) + " 0," + (690 + k * 70) + '" fill="#6a553f"/><polygon points="0,' + (640 + k * 70) + " 560," + (560 + k * 14) + " 560," + (566 + k * 14) + " 0," + (652 + k * 70) + '" fill="#9b8466"/>';
        s += '<polygon points="1600,' + (640 + k * 70) + " 1040," + (560 + k * 14) + " 1040," + (580 + k * 14) + " 1600," + (690 + k * 70) + '" fill="#5a4634"/><polygon points="1600,' + (640 + k * 70) + " 1040," + (560 + k * 14) + " 1040," + (566 + k * 14) + " 1600," + (652 + k * 70) + '" fill="#8a7458"/>';
      });
      [2, 1, 0].forEach(function (k) {
        for (var j = 0; j < 7; j++) {
          var f = j / 7 + r() * 0.05, x = 20 + f * 520, y = 640 + k * 70 + (560 + k * 14 - 640 - k * 70) * (x / 560), o = 1.35 - f * 0.75 + k * 0.12;
          s += senator(x, y, o, r); s += senator(1600 - x + r() * 10, y, o, r);
        }
      });
      [[40, 0.0], [210, 0.28], [345, 0.5], [450, 0.68], [528, 0.82]].forEach(function (c, i) {
        var f = c[1], ust = 170 + f * 150, alt = 900 - f * 330, w = 104 - f * 70, koyu = (0.1 + f * 0.35).toFixed(2);
        s += sutun(c[0], ust, alt, w, koyu) + sutun(1600 - c[0], ust, alt, w, koyu);
      });
      [[470, 690], [1130, 690]].forEach(function (b, i) {
        s += '<g transform="translate(' + b[0] + " " + b[1] + ')"><path d="M-26 90L-6 10M26 90L6 10M0 90V10" stroke="#5a4028" stroke-width="5"/><path d="M-40 0H40L28 18H-28Z" fill="#8a5a2a"/><ellipse cy="0" rx="40" ry="8" fill="#3a1e0e"/></g>' + h.alev(b[0], b[1] + 2, 0.9, i * 0.4);
      });
      s += '<g transform="translate(250 760)"><rect x="-60" y="-10" width="120" height="70" fill="#4a3220"/><rect x="-66" y="-16" width="132" height="10" fill="#6a4a2e"/>' +
        '<ellipse cx="-20" cy="-26" rx="26" ry="14" fill="#6a4a2a"/><rect x="-46" y="-80" width="52" height="56" fill="#7a5530"/><ellipse cx="-20" cy="-80" rx="26" ry="10" fill="#8a6238"/>' +
        [-36, -24, -12, -2].map(function (x, i) { return '<rect x="' + (x - 4) + '" y="' + (-106 + i * 4) + '" width="9" height="32" rx="4" fill="#e6d7b0"/><circle cx="' + x + '" cy="' + (-106 + i * 4) + '" r="4.5" fill="#b89a60"/>'; }).join("") +
        '<g transform="rotate(-8 40 -30)"><rect x="18" y="-40" width="56" height="16" rx="8" fill="#ead9b2"/><circle cx="18" cy="-32" r="8" fill="#c9a86c"/><circle cx="74" cy="-32" r="8" fill="#c9a86c"/></g></g>';
      s += '<g transform="translate(1250 770)"><rect x="-70" y="0" width="140" height="80" fill="#4a3220"/><rect x="-78" y="-8" width="156" height="10" fill="#6a4a2e"/>' +
        '<g transform="rotate(-6)"><rect x="-58" y="-40" width="54" height="36" fill="#6b4a28"/><rect x="-52" y="-35" width="42" height="26" fill="#2a2016"/><rect x="2" y="-40" width="54" height="36" fill="#6b4a28"/><rect x="8" y="-35" width="42" height="26" fill="#2a2016"/>' +
        '<path d="M-48 -28h30M-48 -22h24M-48 -16h28M12 -28h30M12 -22h20M12 -16h26" stroke="#c8b27e" stroke-width="1.4" opacity=".8"/></g><path d="M40 -10L80 -44" stroke="#c9a86c" stroke-width="4" stroke-linecap="round"/></g>';
      s += '<g transform="translate(990 818)"><ellipse cx="0" cy="18" rx="46" ry="10" fill="#1a120a" opacity=".6"/><circle r="30" fill="#c0c3c8"/><circle r="25" fill="#a9adb3"/><circle r="30" fill="none" stroke="#e6e8ec" stroke-width="2"/>' +
        '<path d="M-6 -14c8 -4 16 0 16 8c0 10-10 14-16 18c6 0 10 4 10 8" fill="none" stroke="#6d7076" stroke-width="3"/><text y="-17" text-anchor="middle" font-size="6" fill="#55585e" font-family="Georgia,serif">ROMA</text></g>';
      s += '<g transform="translate(700 452)"><circle cx="0" cy="120" r="230" fill="url(#lC)"/>' +
        '<path d="M-44 36C-60 100 -66 220 -54 330L58 330C66 226 60 108 44 36Z" fill="url(#lT)"/>' +
        '<path d="M-42 40C-8 120 22 176 56 214" stroke="#6b2a4a" stroke-width="7" fill="none"/><path d="M-30 110C-10 180 0 260 -6 330M10 150C20 220 26 280 24 330M-50 180C-44 240 -40 290 -40 330" stroke="rgba(120,100,70,.45)" stroke-width="3" fill="none"/>' +
        '<path d="M-44 44C-70 90 -74 140 -60 170L-40 176C-48 140 -44 100 -30 70Z" fill="#dccfb2"/><g transform="translate(-58 172) rotate(-10)"><rect x="-8" y="-2" width="40" height="13" rx="6" fill="#ead9b2"/><circle cx="-8" cy="4.5" r="6.5" fill="#c9a86c"/></g>' +
        '<g class="cicero-kol"><path d="M26 36C50 24 70 -4 82 -38L102 -30C90 8 66 44 38 64Z" fill="#e6dac0"/><path d="M30 40C52 28 70 2 84 -30" stroke="rgba(120,100,70,.35)" stroke-width="3" fill="none"/>' +
        '<path d="M84 -36c-2 -10 2 -20 8 -26l4 -14 5 2 -2 12 6 -14 5 2 -4 14 7 -10 4 3 -6 12c4 4 4 12 0 18Z" fill="#cda07a"/></g>' +
        '<rect x="-9" y="14" width="18" height="18" fill="#c9a07a"/><circle cx="0" cy="0" r="24" fill="#cfa580"/><path d="M-24 -4C-24 -22 -12 -30 0 -30C14 -30 24 -22 24 -6C18 -16 8 -18 0 -18C-10 -18 -18 -14 -24 -4Z" fill="#8a8078"/>' +
        '<path d="M-44 330h36v8h-36ZM12 330h40v8h-40Z" fill="#3a2a1e"/></g>';
      return h.svg(s,
        h.alevDefs +
        '<linearGradient id="lD" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3e3024"/><stop offset=".6" stop-color="#2a2018"/><stop offset="1" stop-color="#16100b"/></linearGradient>' +
        '<linearGradient id="lZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6a5a48"/><stop offset="1" stop-color="#2a2018"/></linearGradient>' +
        '<linearGradient id="lH" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffe2a8" stop-opacity=".38"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="lM" x1="0" x2="1"><stop offset="0" stop-color="#e3d8c2"/><stop offset="1" stop-color="#b5a78d"/></linearGradient>' +
        '<linearGradient id="lS" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>' +
        '<linearGradient id="lT" x1="0" x2="1"><stop offset="0" stop-color="#f3e9d2"/><stop offset=".6" stop-color="#d9ccae"/><stop offset="1" stop-color="#a99a7c"/></linearGradient>' +
        '<radialGradient id="lC"><stop offset="0" stop-color="#ffe2a8" stop-opacity=".28"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></radialGradient>'
      );
    },
    on: function () {
      return h.svg('<path d="M0 0H1600V60C1500 110 1380 70 1280 100C1180 130 1080 80 980 90V0Z" fill="#4a1414" opacity=".92"/><path d="M0 0H620V70C520 120 380 60 260 96C160 126 60 90 0 110Z" fill="#5a1818" opacity=".95"/>' +
        '<path d="M0 110C60 90 160 126 260 96C380 60 520 120 620 70" fill="none" stroke="#c9a14a" stroke-width="4" stroke-dasharray="2 6"/>' +
        '<rect x="-20" y="0" width="70" height="900" fill="#0d0907"/><rect x="1550" y="0" width="70" height="900" fill="#0d0907"/>');
    },
    hazirla: function (el) { this._kol = el.querySelector(".cicero-kol"); },
    kare: function (t) { if (this._kol) this._kol.setAttribute("transform", "rotate(" + (Math.sin(t / 900) * 6 + Math.sin(t / 370) * 2).toFixed(2) + " 34 44)"); },
    eserler: [
      { x: 50, y: 13, ad: "Taş yazıt", panel:
        "<h3>Latin alfabesi</h3><p>Klasik Latince 23 harfle yazılırdı: <span class=\"yabanci\">A B C D E F G H I K L M N O P Q R S T V X Y Z</span>. <b>J, U ve W yoktu</b>; I hem ünlü /i/ hem ünsüz /j/, V hem /u/ hem /w/ sesini karşılardı. Y ve Z, Yunancadan alınan sözcükler için sonradan eklendi.</p>" +
        "<p>Anıt yazıtlarında sözcükler boşlukla değil nokta (<i>interpunctus</i>) ile ayrılırdı. Duvardaki yazı: <span class=\"yabanci\">SENATVS·POPVLVSQVE·ROMANVS</span> — “Roma Senatosu ve Halkı”, kısaca S·P·Q·R.</p>" +
        "<h4>Klasik telaffuz</h4><table class=\"pn-tablo\"><tr><th>Yazılış</th><th>Okunuş</th></tr><tr><td>Cicero</td><td>C her zaman /k/: “Kikero”</td></tr><tr><td>veni</td><td>V ünsüzken /w/: “weni”</td></tr><tr><td>Caesar</td><td>AE /ai/: “Kaysar”</td></tr><tr><td>malum · mālum</td><td>ünlü uzunluğu anlam değiştirir: kötülük · elma</td></tr></table>" },
      { x: 44, y: 70, ad: "Cicero", panel:
        "<h3>Marcus Tullius Cicero</h3><p>MÖ 106–43. Hatip, avukat, devlet adamı ve filozof. MÖ 63'te konsülken Catilina'nın darbe girişimini Senato önünde dört söylevle (<i>In Catilinam</i>) açığa çıkardı. Bu sahne ilk söylevin açılışını canlandırıyor.</p>" +
        "<h4>Latince felsefenin kurucusu</h4><p>Yunan felsefesini Latinceye taşırken yeni sözcükler türetti. Yunanca <i>poiotēs</i> karşılığı olarak <b>qualitas</b> (“nitelik”, bugünkü <i>kalite</i>) ve <i>ēthikos</i> karşılığı olarak <b>moralis</b> (“ahlaka ilişkin”) onun önerileridir.</p>" +
        "<div class=\"pn-etiketler\"><span>De re publica</span><span>De officiis</span><span>De natura deorum</span><span>Tusculanae disputationes</span></div>" +
        "<p class=\"pn-not\">Tarihsel not: İlk Catilina söylevi, Senato'nun o gün toplandığı Iuppiter Stator Tapınağı'nda yapıldı. Sahnedeki salon, Senato binası Curia Iulia'dan esinlenen hayalî bir kurgudur.</p>" },
      { x: 78, y: 82, ad: "Balmumu tablet", panel:
        "<h3>Dilbilgisi</h3><p>Latince çekimli bir dildir: sözcüğün cümledeki görevini sonundaki ek gösterir, bu yüzden sözcük sırası serbesttir. <i>Puella rosam amat</i> ile <i>Rosam puella amat</i> aynı anlamdadır: “Kız gülü sever.”</p>" +
        "<h4>Altı hâl: puella (kız)</h4><table class=\"pn-tablo\"><tr><th>Hâl</th><th>Biçim</th><th>İşlev</th></tr><tr><td>Nominativus</td><td>puella</td><td>özne</td></tr><tr><td>Genitivus</td><td>puellae</td><td>-in (iyelik)</td></tr><tr><td>Dativus</td><td>puellae</td><td>-e (yönelme)</td></tr><tr><td>Accusativus</td><td>puellam</td><td>-i (nesne)</td></tr><tr><td>Ablativus</td><td>puellā</td><td>-den, ile</td></tr><tr><td>Vocativus</td><td>puella</td><td>seslenme</td></tr></table>" +
        "<h4>amāre (sevmek), şimdiki zaman</h4><p class=\"yabanci\">amō · amās · amat · amāmus · amātis · amant</p><p>Adlar beş çekim grubuna (<i>declinatio</i>), fiiller dört çekim grubuna (<i>coniugatio</i>) ayrılır. Türkçe gibi Latincede de tanımlık (<i>the</i>, <i>der</i>, <i>le</i>) yoktur.</p>" },
      { x: 17, y: 78, ad: "Kitap kutusu", panel:
        "<h3>Latincenin serüveni</h3><p>Hint-Avrupa dil ailesinin İtalik kolundandır; adını Roma'nın bulunduğu Latium bölgesinden alır. Kitaplar o zaman rulo (<i>volumen</i>) hâlindeydi ve bu kutularda (<i>capsa</i>) taşınırdı.</p>" +
        "<ul><li><b>Eski Latince</b>: ilk yazıtlar, MÖ 6. yüzyıl civarı</li><li><b>Klasik Latince</b>: MÖ 1. yüzyıl – MS 1. yüzyıl başı; Cicero, Caesar, Vergilius, Horatius, Ovidius</li><li><b>Geç ve Kilise Latincesi</b>: Augustinus, Hieronymus'un İncil çevirisi <i>Vulgata</i></li><li><b>Orta Çağ ve Yeni Latince</b>: skolastik felsefe ve bilimin ortak dili; Thomas Aquinas, Spinoza'nın <i>Ethica</i>'sı, Newton'un <i>Principia</i>'sı (1687)</li></ul>" +
        "<p>Halk ağzındaki Latince (<i>sermo vulgaris</i>) zamanla İtalyanca, Fransızca, İspanyolca, Portekizce ve Rumenceye dönüştü. Latince bugün hâlâ Vatikan'ın (Kutsal Makam) resmî dilidir.</p>" },
      { x: 62, y: 91, ad: "Denarius", panel:
        "<h3>Sikkenin iki yüzü: ünlü sözler</h3>" +
        "<p class=\"pn-soz\">Veni, vidi, vici.<small>Geldim, gördüm, yendim. · Caesar, MÖ 47 (Suetonius'un aktarımı)</small></p>" +
        "<p class=\"pn-soz\">O tempora, o mores!<small>Ey zamanlar, ey ahlak! · Cicero, In Catilinam I</small></p>" +
        "<p class=\"pn-soz\">Historia magistra vitae.<small>Tarih hayatın öğretmenidir. · Cicero, De Oratore II</small></p>" +
        "<p class=\"pn-soz\">Carpe diem.<small>Günü yakala. · Horatius, Carmina I.11</small></p>" +
        "<p class=\"pn-soz\">Cogito, ergo sum.<small>Düşünüyorum, öyleyse varım. · Descartes, Principia philosophiae (1644)</small></p>" +
        "<p>Felsefe hâlâ Latince konuşur: <i>a priori</i>, <i>a posteriori</i>, <i>ex nihilo nihil fit</i> (hiçten hiçbir şey çıkmaz), <i>causa sui</i> (kendinin nedeni).</p>" }
    ]
  });

  /* ════════ ANTİK YUNANCA: Atina Agorası ════════ */
  function zeytin(x, y, o, d) {
    var s = '<g transform="translate(' + x + " " + y + ") scale(" + o + ')"><path d="M-8 0C-12 -40 4 -70 -6 -110C6 -90 14 -70 8 -40C10 -20 12 -8 12 0Z" fill="#3e2a1c"/>';
    s += '<g class="sallan" style="--s:' + (5 + d) + "s;--d:-" + d + 's;--a:1.2deg">';
    [[-60, -140, 70, 40], [10, -170, 80, 46], [60, -130, 60, 36], [-20, -120, 70, 34], [30, -110, 50, 28]].forEach(function (c, i) {
      s += '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="' + c[2] + '" ry="' + c[3] + '" fill="' + (i % 2 ? "#6f7a52" : "#58643f") + '" opacity=".95"/>';
      s += '<ellipse cx="' + (c[0] + 10) + '" cy="' + (c[1] - 8) + '" rx="' + c[2] * 0.6 + '" ry="' + c[3] * 0.5 + '" fill="#9aa378" opacity=".35"/>';
    });
    return s + "</g></g>";
  }
  function filozof(x, renk1, renk2) {
    return '<g transform="translate(' + x + ' 0)"><g class="adim"><path d="M-14 0C-18 -40 -16 -80 -8 -96L8 -96C16 -80 18 -40 14 0Z" fill="' + renk1 + '"/><path d="M-8 -96C0 -70 8 -40 14 -10" stroke="' + renk2 + '" stroke-width="5" fill="none"/>' +
      '<circle cy="-106" r="9" fill="#8a5a3a"/><path d="M-9 -104c2 10 16 10 18 0l2 8c-4 10-18 10-22 0Z" fill="#d8d0c0"/></g></g>';
  }
  S.kaydet("yunanca", {
    ad: "Antik Yunanca", ust: "diller", yer: "Atina · Agora · MÖ 4. yüzyıl", vurgu: "#F0B870", alan: "diller",
    alt: "Güneş Akropolis'in ardına iniyor; stoanın gölgesinde iki filozof yürüyerek tartışıyor. Felsefenin ilk kavramları bu dilde doğdu.",
    parcacik: { tur: "kum", adet: 70 }, isaret: "yildiz",
    sozler: [
      { metin: "ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ.", dil: "grc", ceviri: "Sorgulanmamış bir hayat, insan için yaşanmaya değmez.", kaynak: "Sokrates · Platon, Savunma 38a" },
      { metin: "πάντες ἄνθρωποι τοῦ εἰδέναι ὀρέγονται φύσει.", dil: "grc", ceviri: "Bütün insanlar doğaları gereği bilmeyi arzular.", kaynak: "Aristoteles · Metafizik A, 980a" },
      { metin: "γνῶθι σεαυτόν.", dil: "grc", ceviri: "Kendini bil.", kaynak: "Delfoi'deki Apollon tapınağı" },
      { metin: "πάντα ῥεῖ.", dil: "grc", ceviri: "Her şey akar.", kaynak: "Herakleitos'a atfedilir" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#yG)"/><circle cx="1170" cy="520" r="330" fill="url(#yGl)"/><circle cx="1170" cy="520" r="62" fill="#fff0c8"/>';
      s += '<path d="M0 560C200 520 320 540 480 500C640 470 760 520 900 500C1100 470 1300 520 1600 480V900H0Z" fill="#7a4250" opacity=".55"/>';
      s += '<path d="M780 620C860 560 930 520 990 430L1030 405H1340L1380 430C1440 520 1520 570 1600 600V900H780Z" fill="#4a2630"/>';
      s += '<g fill="#3a1c24"><rect x="1040" y="392" width="290" height="14"/><rect x="1046" y="318" width="278" height="10"/><path d="M1040 318L1185 280L1330 318Z"/>';
      for (var i = 0; i < 9; i++) s += '<rect x="' + (1052 + i * 32.5) + '" y="328" width="13" height="64"/>';
      s += '</g><path d="M1040 318L1185 280L1330 318" fill="none" stroke="#ffb870" stroke-width="2" opacity=".6"/>';
      s += '<g fill="#5a2e34" opacity=".8">' + [120, 190, 260, 330, 420, 500, 580, 660].map(function (x, i) { return '<rect x="' + x + '" y="' + (560 - (i % 3) * 16) + '" width="' + (50 + (i % 2) * 20) + '" height="80"/><path d="M' + (x - 6) + " " + (560 - (i % 3) * 16) + "L" + (x + 30 + (i % 2) * 10) + " " + (540 - (i % 3) * 16) + "L" + (x + 56 + (i % 2) * 20) + " " + (560 - (i % 3) * 16) + 'Z"/>'; }).join("") + "</g>";
      s += '<g class="kuslar"><path d="M300 200q10 -8 20 0q10 -8 20 0" stroke="#3a1c24" stroke-width="3" fill="none"/><path d="M360 230q7 -6 14 0q7 -6 14 0" stroke="#3a1c24" stroke-width="2.5" fill="none"/><path d="M250 250q6 -5 12 0q6 -5 12 0" stroke="#3a1c24" stroke-width="2" fill="none"/></g>';
      s += '<rect x="0" y="640" width="1600" height="260" fill="url(#yZ)"/>';
      s += '<rect x="0" y="400" width="720" height="250" fill="#3a2418"/><rect x="0" y="370" width="740" height="36" fill="#b88a5c"/><path d="M0 370L740 370L700 340H0Z" fill="#8a5a3a"/>';
      for (var c = 0; c < 10; c++) { var x = 30 + c * 72; s += '<rect x="' + x + '" y="406" width="34" height="240" fill="#d8b082"/><rect x="' + (x + 20) + '" y="406" width="14" height="240" fill="#f0cc98"/><rect x="' + (x - 5) + '" y="398" width="44" height="10" fill="#e6c08e"/><rect x="' + (x - 3) + '" y="640" width="40" height="8" fill="#b88a5c"/>'; }
      s += '<g opacity=".35" fill="#2a140e">' + [30, 102, 174, 246, 318, 390, 462, 534, 606, 678].map(function (x) { return '<polygon points="' + x + ",648 " + (x + 34) + ",648 " + (x - 160) + ",760 " + (x - 200) + ',760"/>'; }).join("") + "</g>";
      s += zeytin(820, 700, 1.1, 0) + zeytin(1480, 720, 1.3, 2) + zeytin(90, 780, 0.9, 1);
      s += '<g class="yuruyus"><g transform="translate(0 700)">' + filozof(0, "#e8dcc4", "#8a3a2a") + filozof(-46, "#cfd6dc", "#2a4a6a") + "</g></g>";
      s += '<g transform="translate(780 846)"><path d="M-40 10l30 -26l40 6l-14 30Z" fill="#b8643a"/><path d="M8 20l26 -20l30 10l-20 22Z" fill="#a8582e"/><path d="M-80 30l20 -18l26 8l-8 18Z" fill="#c07040"/>' +
        '<text x="-30" y="0" transform="rotate(-12 -30 0)" font-size="9" font-family="Georgia,serif" fill="#2a120a" letter-spacing="1">ΘΕΜΙΣΘΟΚΛΕΣ</text></g>';
      s += '<g transform="translate(1190 800)"><ellipse cy="60" rx="50" ry="10" fill="#2a140e" opacity=".5"/><path d="M-14 -70h28l-4 12c34 14 44 50 36 86c-6 22-20 30-30 34l-6 0h-20l-6 0c-10 -4 -24 -12 -30 -34c-8 -36 2 -72 36 -86Z" fill="#c8703a"/>' +
        '<path d="M-38 -10h76M-40 30h80" stroke="#1a0e08" stroke-width="3"/><path d="M-26 -4c6 -10 14 -4 12 6c8 -2 12 6 6 12c-8 4-18 0-18 -8M6 0l10 20l10 -18" fill="#1a0e08"/><path d="M-14 -58c-16 -6 -24 6 -18 18M14 -58c16 -6 24 6 18 18" stroke="#b8643a" stroke-width="6" fill="none"/></g>';
      s += '<g transform="translate(1000 800)"><rect x="-90" y="0" width="180" height="26" fill="#cdb48e"/><rect x="-80" y="26" width="20" height="40" fill="#a88e6a"/><rect x="60" y="26" width="20" height="40" fill="#a88e6a"/>' +
        '<rect x="-40" y="-12" width="90" height="14" fill="#e8d6a8"/><circle cx="-40" cy="-5" r="8" fill="#c8a870"/><circle cx="50" cy="-5" r="8" fill="#c8a870"/><path d="M-28 -8h66" stroke="#6a4a2a" stroke-width="1" stroke-dasharray="4 3"/></g>';
      s += '<g transform="translate(1380 520)"><rect x="-50" y="0" width="100" height="340" fill="#e2d6be"/><rect x="30" y="0" width="20" height="340" fill="#b6a88c"/><path d="M-50 0L0 -30L50 0Z" fill="#d6c8aa"/>' +
        '<text x="-6" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#6a5a40" letter-spacing="3">ΓΝΩΘΙ</text><text x="-6" y="104" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#6a5a40" letter-spacing="3">ΣΑΥ</text><text x="-6" y="138" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#6a5a40" letter-spacing="3">ΤΟΝ</text></g>';
      return h.svg(s,
        '<linearGradient id="yG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2c1f3d"/><stop offset=".38" stop-color="#8a4a52"/><stop offset=".6" stop-color="#e0864a"/><stop offset=".7" stop-color="#f6c26a"/></linearGradient>' +
        '<radialGradient id="yGl"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset=".3" stop-color="#ffc070" stop-opacity=".35"/><stop offset="1" stop-color="#ff9050" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="yZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#b87a4a"/><stop offset="1" stop-color="#4a2a1a"/></linearGradient>'
      );
    },
    on: function () {
      return h.svg('<path d="M1500 0C1540 120 1560 260 1600 300V0Z" fill="#2a1a12"/><g opacity=".9">' + zeytin(1560, 260, 1.4, 3) + "</g>");
    },
    hazirla: function (el) {
      this._y = el.querySelector(".yuruyus"); this._k = el.querySelector(".kuslar"); this._a = el.querySelectorAll(".adim");
    },
    kare: function (t) {
      if (!this._y) return;
      var x = -120 + ((t / 55) % 1900);
      this._y.setAttribute("transform", "translate(" + x.toFixed(1) + " 0)");
      for (var i = 0; i < this._a.length; i++) this._a[i].setAttribute("transform", "translate(0 " + (Math.abs(Math.sin(t / 260 + i)) * -3).toFixed(1) + ")");
      if (this._k) this._k.setAttribute("transform", "translate(" + ((t / 40) % 1900 - 300).toFixed(1) + " " + (Math.sin(t / 1400) * 20).toFixed(1) + ")");
    },
    eserler: [
      { x: 48, y: 92, ad: "Ostrakon", panel:
        "<h3>Alfabe</h3><p>Yunan alfabesi MÖ 8. yüzyıl civarında Fenike alfabesinden uyarlandı. Büyük yenilik şuydu: Yunanlar, kendi dillerinde karşılığı olmayan bazı Fenike ünsüzlerini <b>ünlü harflere</b> dönüştürdü (<i>aleph</i> → <i>alpha</i>). Böylece ünlüleri düzenli olarak yazan ilk alfabelerden biri doğdu; Latin ve Kiril alfabeleri de ondan türedi.</p>" +
        "<table class=\"pn-tablo\"><tr><th>Harf</th><th>Ad</th><th>Ses</th></tr><tr><td>Α α</td><td>alpha</td><td>a</td></tr><tr><td>Η η</td><td>ēta</td><td>uzun e</td></tr><tr><td>Θ θ</td><td>thēta</td><td>th (soluklu t)</td></tr><tr><td>Φ φ</td><td>phi</td><td>ph (soluklu p)</td></tr><tr><td>Ω ω</td><td>ōmega</td><td>uzun o</td></tr></table>" +
        "<p><b>Ostrakon</b> çömlek kırığıdır. Atinalılar tehlikeli buldukları bir siyasetçiyi on yıllığına sürgüne göndermek için adını bunlara kazırdı (<i>ostrakismos</i>). Yerdeki kırıkta Themistokles'in adı, eski Atina yazımıyla: ΘΕΜΙΣΘΟΚΛΕΣ. Atina İyon alfabesini ancak MÖ 403/402'de resmen benimsedi; o zamana kadar uzun e'yi de Ε ile yazıyordu.</p>" },
      { x: 74, y: 84, ad: "Amfora", panel:
        "<h3>Homeros ve lehçeler</h3><p>Antik Yunanca tek bir dil değil, bir lehçeler ailesiydi: <b>İyonca</b> (Herodotos), <b>Attika lehçesi</b> (Atina), <b>Dorca</b> (Sparta, Korinth), <b>Aiolca</b> (Sappho, Lesbos). Homeros destanlarının dili ise İyonca ağırlıklı, farklı lehçelerden beslenen yapay bir şiir dilidir.</p>" +
        "<p class=\"pn-soz\" lang=\"grc\">μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος<small>Öfkeyi söyle, tanrıça, Peleusoğlu Akhilleus'un. · İlyada'nın ilk dizesi</small></p>" +
        "<p>Büyük İskender'den sonra Attika temelli <b>Koine</b> (“ortak dil”) Akdeniz'in ortak dili oldu; Yeni Ahit bu dille yazıldı. Bugünkü Yunanca bu çizginin devamıdır.</p>" },
      { x: 63, y: 86, ad: "Papirüs", panel:
        "<h3>Felsefenin dili</h3><p>Felsefenin temel kavramları Yunanca doğdu; birçoğu Latince üzerinden bugünkü dillere geçti.</p>" +
        "<table class=\"pn-tablo\"><tr><th>Terim</th><th>Anlam</th></tr><tr><td>λόγος · logos</td><td>söz, akıl, gerekçe, oran</td></tr><tr><td>οὐσία · ousia</td><td>öz, töz (Lat. substantia)</td></tr><tr><td>εἶδος · eidos</td><td>biçim, form, idea</td></tr><tr><td>ἐπιστήμη · epistēmē</td><td>bilgi, bilim</td></tr><tr><td>δόξα · doxa</td><td>sanı, kanı</td></tr><tr><td>ἀρετή · aretē</td><td>erdem, mükemmellik</td></tr><tr><td>ψυχή · psychē</td><td>ruh, canlılık ilkesi</td></tr><tr><td>τέλος · telos</td><td>amaç, erek</td></tr></table>" +
        "<p><b>Metafizik</b> adı da buradan gelir: <i>τὰ μετὰ τὰ φυσικά</i>, “fizik kitaplarından sonrakiler”. Aristoteles'in bu eserlerine ad, yazılarını sonradan düzenleyenlerce verildi.</p><p>Sahnede yürüyerek tartışan iki filozof, Aristoteles'in okulunun adını hatırlatır: <i>Peripatos</i>, yani “gezinti yolu”.</p>" },
      { x: 86, y: 86, ad: "Stel", panel:
        "<h3>Delfoi'nin öğüdü</h3><p class=\"pn-soz\" lang=\"grc\">γνῶθι σεαυτόν<small>Kendini bil.</small></p><p class=\"pn-soz\" lang=\"grc\">μηδὲν ἄγαν<small>Hiçbir şeyde aşırıya kaçma.</small></p>" +
        "<p>Antik yazarlar bu özlü sözlerin Delfoi'deki Apollon tapınağının girişinde yazılı olduğunu aktarır. Sokrates “kendini bil” öğüdünü felsefesinin merkezine koydu: bilgelik, önce kendi bilgisizliğinin farkına varmaktır.</p>" +
        "<p>Stelin üzerindeki yazı klasik dönemdeki gibi yalnız büyük harflerle, boşluksuz ve aksansız yazıldı; küçük harfler çok daha sonra, Orta Çağ'da yaygınlaştı.</p>" },
      { x: 73, y: 38, ad: "Akropolis", panel:
        "<h3>Attika Yunancası ve politonik yazı</h3><p>Platon, Thukydides, trajedi yazarları ve Aristophanes Atina'nın dili olan <b>Attika lehçesiyle</b> yazdı; Stagiralı Aristoteles de. Bu sitenin Yunanca sürümü de Platon dönemi Attika Yunancasıyla hazırlandı.</p>" +
        "<h4>Aksanlar ve soluk işaretleri</h4><table class=\"pn-tablo\"><tr><th>İşaret</th><th>Ad</th></tr><tr><td>ά</td><td>tiz (oxeia)</td></tr><tr><td>ὰ</td><td>pes (bareia)</td></tr><tr><td>ᾶ</td><td>inişli-çıkışlı (perispomene)</td></tr><tr><td>ἁ</td><td>sert soluk: kelime başında /h/</td></tr><tr><td>ἀ</td><td>yumuşak soluk: /h/ yok</td></tr></table>" +
        "<p>Bu işaretleri Helenistik dönemde, geleneğe göre Bizanslı Aristophanes (MÖ 3.–2. yüzyıl) okumayı kolaylaştırmak için getirdi. Aksan başlangıçta vurgu değil, ses perdesi (tonlama) gösteriyordu.</p><p>Parthenon MÖ 447–432 yılları arasında Athena'ya adanarak inşa edildi.</p>" }
    ]
  });

  /* ════════ ARAPÇA: Beytülhikme ════════ */
  function yildiz8(x, y, r, renk, kal) {
    return '<g transform="translate(' + x + " " + y + ')" fill="none" stroke="' + renk + '" stroke-width="' + (kal || 1.5) + '"><rect x="' + -r + '" y="' + -r + '" width="' + 2 * r + '" height="' + 2 * r + '"/><rect x="' + -r + '" y="' + -r + '" width="' + 2 * r + '" height="' + 2 * r + '" transform="rotate(45)"/></g>';
  }
  function kandil(x, ust, uzun, s, d) {
    return '<g class="asili" style="--s:' + s + "s;--d:-" + d + 's;--a:2.5deg"><path d="M' + x + " " + ust + "V" + (ust + uzun) + '" stroke="#8a6a2a" stroke-width="2"/>' +
      '<g transform="translate(' + x + " " + (ust + uzun) + ')"><circle cy="34" r="90" fill="url(#aK)" class="hale" style="animation-delay:-' + d + 's"/><path d="M-10 0h20l14 18c4 20 -2 38 -24 44c-22 -6 -28 -24 -24 -44Z" fill="#c9a24a"/><path d="M-12 22h24c2 16 -2 28 -12 32c-10 -4 -14 -16 -12 -32Z" fill="#ffd27a" opacity=".85"/>' +
      '<path d="M-8 62h16l-8 14Z" fill="#b08a3a"/><circle cy="-4" r="4" fill="#d9b25e"/></g></g>';
  }
  function kitaplik(x, y, w, hh) {
    var r = h.rnd(x), s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="#1a1410"/>', raf = hh / 4;
    for (var k = 0; k < 4; k++) {
      var cx = x + 6;
      while (cx < x + w - 14) {
        var bw = 8 + r() * 12, bh = raf * (0.6 + r() * 0.3), renk = ["#6a2a22", "#2a4a3a", "#7a5a2a", "#3a2a4a", "#8a6a3a", "#5a3020"][Math.floor(r() * 6)];
        s += '<rect x="' + cx.toFixed(0) + '" y="' + (y + raf * (k + 1) - bh - 4).toFixed(0) + '" width="' + bw.toFixed(0) + '" height="' + bh.toFixed(0) + '" fill="' + renk + '"/>';
        cx += bw + 1.5;
      }
      s += '<rect x="' + x + '" y="' + (y + raf * (k + 1) - 4) + '" width="' + w + '" height="5" fill="#5a3a22"/>';
    }
    return s;
  }
  var ARAP_PANEL = {
    kitabe: "<h3>Alfabe ve yazı</h3><p>Arap alfabesi <b>28 harftir</b> ve sağdan sola yazılır. Harflerin çoğu birbirine bağlanır; her harf sözcükteki yerine göre (tek başına, başta, ortada, sonda) biçim değiştirir:</p>" +
        "<table class=\"pn-tablo\"><tr><th>Tek</th><th>Başta</th><th>Ortada</th><th>Sonda</th></tr><tr><td lang=\"ar\">ه</td><td lang=\"ar\">هـ</td><td lang=\"ar\">ـهـ</td><td lang=\"ar\">ـه</td></tr><tr><td lang=\"ar\">ع</td><td lang=\"ar\">عـ</td><td lang=\"ar\">ـعـ</td><td lang=\"ar\">ـع</td></tr></table>" +
        "<p>Kısa ünlüler çoğunlukla yazılmaz; gerekince harfin üstüne ya da altına konan işaretlerle (<i>hareke</i>) gösterilir. Alfabe, Nabatî yazısından gelişti.</p><p>Kemerdeki yazı: <span class=\"yabanci\" lang=\"ar\">بيت الحكمة</span> <i>Beyt el-Hikme</i>, “Bilgelik Evi”.</p>",
    kok: "<h3>Kök sistemi</h3><p>Arapça bir Sami dilidir: sözcükler çoğunlukla <b>üç ünsüzlü bir kökten</b>, belli kalıplara (<i>vezin</i>) ünlüler ve ekler yerleştirilerek türetilir. Kök anlamı taşır, kalıp işlevi.</p>" +
        "<h4>K-T-B: yazmak</h4><table class=\"pn-tablo\"><tr><th>Sözcük</th><th>Anlam</th><th>Türkçede</th></tr><tr><td lang=\"ar\">كَتَبَ</td><td>kataba: yazdı</td><td></td></tr><tr><td lang=\"ar\">كِتَاب</td><td>kitāb: kitap</td><td>kitap</td></tr><tr><td lang=\"ar\">كَاتِب</td><td>kātib: yazan</td><td>kâtip</td></tr><tr><td lang=\"ar\">مَكْتَب</td><td>maktab: yazı yeri, okul</td><td>mektep</td></tr><tr><td lang=\"ar\">مَكْتُوب</td><td>maktūb: yazılmış</td><td>mektup</td></tr><tr><td lang=\"ar\">مَكْتَبَة</td><td>maktaba: kütüphane</td><td></td></tr></table>" +
        "<h4>ʿ-L-M: bilmek</h4><p><span lang=\"ar\">عِلْم</span> ʿilm (ilim) · <span lang=\"ar\">عَالِم</span> ʿālim (âlim) · <span lang=\"ar\">مُعَلِّم</span> muʿallim (muallim) · <span lang=\"ar\">مَعْلُوم</span> maʿlūm (malum)</p>",
    hat: "<h3>Hat sanatı</h3><p>Yazı, kamıştan yontulmuş bir kalem ve isten yapılmış mürekkeple yazılırdı. Arap dünyasında yazı başlı başına bir sanata dönüştü.</p>" +
        "<ul><li><b>Kûfî</b>: köşeli, anıtsal; erken dönem Kur'an nüshaları ve yapı yazıtları</li><li><b>Nesih</b>: yuvarlak, okunaklı kitap yazısı; bugünkü matbaa harflerinin temeli</li><li><b>Sülüs</b>: görkemli başlık ve kitabe yazısı</li><li><b>Divânî</b> ve <b>Rik'a</b>: resmî yazışma ve gündelik yazı</li></ul>" +
        "<p>10. yüzyılda vezir <b>İbn Mukle</b>, harfleri eliften ve kalemin bıraktığı noktadan türeyen oranlara bağlayan bir ölçü sistemi kurdu; “oranlı yazı” (<i>el-hatt el-mansûb</i>) böyle doğdu.</p>",
    ceviri: "<h3>Çeviri hareketi</h3><p>8.–10. yüzyıllarda Abbasi Bağdat'ında Yunanca eserler (çoğu kez Süryanice aracılığıyla), Farsça ve Sanskritçe metinler büyük bir çeviri hareketiyle Arapçaya aktarıldı. Aristoteles, Galenos, Öklid ve Batlamyus böylece yeni bir dilde okunmaya başladı.</p>" +
        "<ul><li><b>Huneyn b. İshak</b> (809–873): Galenos'un tıp külliyatının ve Aristoteles'in bazı eserlerinin çevirmeni</li><li><b>Harezmî</b> (ö. ~850): <i>el-Cebr ve'l-Mukabele</i> ile cebire adını verdi; “algoritma” sözcüğü onun adından gelir</li></ul>" +
        "<p>Terimler de yolculuğa çıktı: <i>falsafa</i> ← <i>philosophia</i>, <i>hayûlâ</i> (madde) ← <i>hylē</i>. Usturlap ise gökyüzünü ölçmek için kullanılan bir hesap aletidir; bu dönemde çok gelişti.</p>" +
        "<p class=\"pn-not\">Beytülhikme'nin tam olarak nasıl bir kurum olduğu tarihçiler arasında tartışmalıdır: bir saray kütüphanesi ve bilgin topluluğu olduğu düşünülür.</p>",
    kindi: "<h3>Kindî ve Arapça felsefe</h3><p><b>el-Kindî</b> (ö. ~870), “Arapların filozofu” diye anılır; Yunan felsefesini Arapçada ilk sistemli biçimde işleyenlerdendir. <i>İlk Felsefe Üzerine</i> adlı eserinde hakikati, nereden, hatta uzak milletlerden gelse bile, kabul etmekten utanılmaması gerektiğini söyler.</p>" +
        "<ul><li><b>Fârâbî</b> (ö. 950): Aristoteles'ten sonraki “İkinci Öğretmen” (<i>el-Muallim es-Sânî</i>)</li><li><b>İbn Sînâ</b> (ö. 1037): <i>Kitâbü'ş-Şifâ</i>; öz ile varlık ayrımı, “uçan adam” düşünce deneyi</li><li><b>İbn Rüşd</b> (ö. 1198): Aristoteles şerhleriyle Latin Avrupa'da kısaca “Şârih” (<i>Commentator</i>) diye anıldı</li></ul>" +
        "<p>İbn Sînâ'nın öz–varlık ayrımı, Latince çevirileri üzerinden Thomas Aquinas'a kadar uzanan metafizik tartışmaları besledi.</p>"
  };
  function revak(sol) {
    /* perspektifte sivri kemerli revak: avlunun iki yanından derine doğru */
    var s = "", n = 5;
    for (var i = 0; i < n; i++) {
      var f = i / n, f2 = (i + 1) / n, x0 = sol ? f * 470 : 1600 - f * 470, x1 = sol ? f2 * 470 : 1600 - f2 * 470;
      var ust = 250 + f * 170, alt = 900 - f * 330, ust2 = 250 + f2 * 170, alt2 = 900 - f2 * 330;
      var w = Math.abs(x1 - x0), gX = Math.min(x0, x1), kx = gX + w / 2, yuk = alt - ust, kemer = ust + yuk * 0.2;
      s += '<path d="M' + x0 + " " + ust + "L" + x1 + " " + ust2 + "L" + x1 + " " + alt2 + "L" + x0 + " " + alt + 'Z" fill="#c9a676"/>';
      s += '<path d="M' + (gX + w * 0.16).toFixed(1) + " " + (alt - yuk * 0.04).toFixed(1) + "V" + (kemer + yuk * 0.2).toFixed(1) + "C" + (gX + w * 0.16).toFixed(1) + " " + (kemer + yuk * 0.07).toFixed(1) + " " + (kx - w * 0.12).toFixed(1) + " " + (kemer + yuk * 0.02).toFixed(1) + " " + kx.toFixed(1) + " " + kemer.toFixed(1) +
        "C" + (kx + w * 0.12).toFixed(1) + " " + (kemer + yuk * 0.02).toFixed(1) + " " + (gX + w * 0.84).toFixed(1) + " " + (kemer + yuk * 0.07).toFixed(1) + " " + (gX + w * 0.84).toFixed(1) + " " + (kemer + yuk * 0.2).toFixed(1) + "V" + (alt - yuk * 0.04).toFixed(1) + 'Z" fill="#3a2a1e"/>';
      s += '<rect x="' + (gX + w * 0.24).toFixed(1) + '" y="' + (alt - yuk * 0.44).toFixed(1) + '" width="' + (w * 0.52).toFixed(1) + '" height="' + (yuk * 0.34).toFixed(1) + '" fill="url(#aRaf)" opacity=".85"/>';
      s += '<circle cx="' + kx.toFixed(1) + '" cy="' + (alt - yuk * 0.5).toFixed(1) + '" r="' + (w * 0.5).toFixed(1) + '" fill="url(#aK)" opacity=".7"/>';
      s += '<path d="M' + x0 + " " + (ust + 14 * (1 - f)).toFixed(1) + "L" + x1 + " " + (ust2 + 14 * (1 - f2)).toFixed(1) + '" stroke="#2a7a7a" stroke-width="' + (10 * (1 - f * 0.6)).toFixed(1) + '"/>';
    }
    return s;
  }
  function kandilA(x, ust, uzun, s, d) {
    return '<g class="asili" style="--s:' + s + "s;--d:-" + d + 's;--a:2.5deg"><path d="M' + x + " " + ust + "V" + (ust + uzun) + '" stroke="#8a6a2a" stroke-width="2"/>' +
      '<g transform="translate(' + x + " " + (ust + uzun) + ')"><circle cy="34" r="80" fill="url(#aK)" class="hale" style="animation-delay:-' + d + 's"/><path d="M-10 0h20l14 18c4 20 -2 38 -24 44c-22 -6 -28 -24 -24 -44Z" fill="#c9a24a"/><path d="M-12 22h24c2 16 -2 28 -12 32c-10 -4 -14 -16 -12 -32Z" fill="#ffd27a" opacity=".85"/>' +
      '<path d="M-8 62h16l-8 14Z" fill="#b08a3a"/><circle cy="-4" r="4" fill="#d9b25e"/></g></g>';
  }
  function hurma(x, taban, boy, d) {
    var s = '<g transform="translate(' + x + " " + taban + ')"><path d="M-6 0C-10 -' + boy * 0.4 + " 4 -" + boy * 0.7 + " 0 -" + boy + "L8 -" + boy + "C12 -" + boy * 0.7 + " -2 -" + boy * 0.4 + ' 6 0Z" fill="#5a3e24"/>';
    s += '<g class="sallan" style="--s:' + (5 + d) + "s;--d:-" + d + 's;--a:2deg"><g transform="translate(4 -' + boy + ')">';
    [-160, -130, -100, -70, -40, -10, 20].forEach(function (a) { s += '<path d="M0 0C30 -20 70 -10 100 20" transform="rotate(' + a + ')" stroke="#3a5a2a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M0 0C30 -20 70 -10 100 20" transform="rotate(' + (a + 4) + ')" stroke="#6a8a3a" stroke-width="2" fill="none" stroke-dasharray="4 5"/>'; });
    return s + "</g></g></g>";
  }
  S.kaydet("arapca", {
    ad: "Arapça", ust: "diller", yer: "Bağdat · Beytülhikme'nin avlusu · 9. yüzyıl", vurgu: "#E6C36A", alan: "diller",
    alt: "Akşam serinliği; şadırvanın suyu şırıldıyor, revakların altında kandiller yanıyor. Yunanca eserlerin Arapçaya çevrildiği bu avluda Aristoteles yeniden okundu, cebir doğdu.",
    parcacik: { tur: "toz", adet: 50 }, sozYer: "sag", isaret: "kristal",
    sozler: [
      { metin: "وخير جليس في الزمان كتاب", dil: "ar", ceviri: "Zamanın en iyi yoldaşı kitaptır.", kaynak: "el-Mütenebbî, 10. yüzyıl" },
      { metin: "العلم نور", dil: "ar", ceviri: "İlim nurdur.", kaynak: "Arap atasözü" },
      { metin: "بيت الحكمة", dil: "ar", ceviri: "Bilgelik Evi.", kaynak: "Abbasi Bağdat'ı" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#aG)"/>';
      s += h.yildizlar(70, 5, 300, 0, 1300, 300, "#fff6dc");
      s += '<path d="M1030 120a44 44 0 1 0 22 78a36 36 0 1 1 -22 -78Z" fill="#fff0c0"/><circle cx="1030" cy="160" r="110" fill="url(#aAy)"/>';
      s += '<g fill="#3a3050" opacity=".9"><rect x="380" y="470" width="840" height="90"/>' +
        '<path d="M470 470a60 60 0 0 1 120 0Z"/><rect x="620" y="360" width="12" height="110"/><path d="M614 360h24l-12 -34Z"/><path d="M700 470a100 100 0 0 1 200 0Z"/>' +
        '<path d="M940 470a70 70 0 0 1 140 0Z"/><rect x="1110" y="380" width="14" height="90"/><path d="M1104 380h26l-13 -40Z"/></g>';
      s += '<g fill="#ffd27a" opacity=".6">' + [430, 520, 690, 760, 850, 980, 1050, 1160].map(function (x, i) { return '<rect x="' + x + '" y="' + (500 + (i % 3) * 18) + '" width="6" height="9"/>'; }).join("") + "</g>";
      s += '<rect x="0" y="540" width="1600" height="360" fill="url(#aZ)"/>';
      for (var i = -10; i <= 10; i++) s += '<path d="M800 470L' + (800 + i * 170) + ' 900" stroke="rgba(90,60,30,.18)" stroke-width="1.5"/>';
      [575, 605, 645, 700, 770, 860].forEach(function (y) { s += '<path d="M0 ' + y + 'H1600" stroke="rgba(90,60,30,.18)" stroke-width="1.5"/>'; });
      s += '<g opacity=".35">' + [0, 1, 2, 3, 4, 5, 6].map(function (k) { return yildiz8(560 + k * 80, 860, 18, "#2a7a7a", 2.5); }).join("") + "</g>";
      s += '<path d="M660 560V400C660 340 730 300 800 270C870 300 940 340 940 400V560Z" fill="#c9a676"/><path d="M690 560V410C690 360 745 330 800 305C855 330 910 360 910 410V560Z" fill="#3a2a1e"/>';
      s += '<rect x="712" y="440" width="176" height="110" fill="url(#aRaf)"/><circle cx="800" cy="460" r="120" fill="url(#aK)" opacity=".8"/>';
      s += '<rect x="620" y="210" width="360" height="56" fill="#1e5a5a" stroke="#e6c36a" stroke-width="3"/><text x="800" y="250" text-anchor="middle" direction="rtl" font-family="\'Amiri\', \'Scheherazade New\', \'Noto Naskh Arabic\', \'Traditional Arabic\', \'Arabic Typesetting\', serif" font-size="36" fill="#f6dc8a">بيت الحكمة</text>';
      s += revak(true) + revak(false);
      s += hurma(560, 600, 250, 0) + hurma(1050, 596, 230, 2);
      s += '<g transform="translate(800 720)"><ellipse rx="190" ry="44" fill="#8aa6a0"/><ellipse rx="176" ry="38" fill="url(#aSu)"/><path d="M-190 0V26C-190 50 190 50 190 26V0" fill="#b8987a"/><ellipse rx="190" ry="44" fill="none" stroke="#e6c36a" stroke-width="3"/>' +
        '<ellipse class="halka-su" rx="60" ry="14" fill="none" stroke="#dff4f0" stroke-width="2"/><ellipse class="halka-su s2" rx="60" ry="14" fill="none" stroke="#dff4f0" stroke-width="2"/>' +
        '<rect x="-12" y="-70" width="24" height="70" fill="#c9a676"/><ellipse cy="-70" rx="34" ry="9" fill="#b8987a"/>' +
        '<g fill="none" stroke="#dff4f0" stroke-width="3" stroke-linecap="round"><path class="su" d="M0 -78C-10 -120 -50 -110 -70 -10"/><path class="su" d="M0 -78C10 -120 50 -110 70 -10"/><path class="su" d="M0 -78C0 -130 0 -130 0 -90"/></g></g>';
      s += kandilA(170, 250, 150, 5, 0) + kandilA(380, 330, 120, 6, 1.5) + kandilA(1220, 330, 120, 5.5, 3) + kandilA(1430, 250, 150, 6.5, 2);
      s += '<g transform="translate(360 800)"><path d="M-80 0L0 -40L80 0L0 40Z" fill="#6a3a1e"/><path d="M-80 0L-80 60L0 100L0 40Z" fill="#4a2814"/><path d="M80 0L80 60L0 100L0 40Z" fill="#3a1e0e"/>' +
        '<path d="M-64 -8C-40 -24 -10 -24 0 -12C10 -24 40 -24 64 -8L0 20Z" fill="#efe2c2"/><path d="M-50 -10h36M-48 -4h34M-46 2h30M12 -12h34M14 -6h32M16 0h28" stroke="#3a2a1a" stroke-width="1.6" opacity=".7"/>' +
        '<ellipse cx="54" cy="16" rx="12" ry="6" fill="#1a1410"/><path d="M50 12L20 -36" stroke="#c9a86c" stroke-width="3"/></g>';
      s += '<g transform="translate(250 670)">' + [0, 1, 2, 3, 4].map(function (k) { return '<rect x="' + (-60 + (k % 2) * 8) + '" y="' + (-k * 22) + '" width="' + (110 - k * 6) + '" height="20" rx="2" fill="' + ["#6a2a22", "#2a4a3a", "#7a5a2a", "#3a2a4a", "#8a4a2a"][k] + '"/><rect x="' + (-60 + (k % 2) * 8) + '" y="' + (-k * 22 + 8) + '" width="' + (110 - k * 6) + '" height="3" fill="#d9b25e" opacity=".6"/>'; }).join("") + "</g>";
      s += '<g transform="translate(1230 720)"><path d="M0 60v100M-40 160h80" stroke="#8a6a2a" stroke-width="6"/><circle r="64" fill="#b08a3e"/><circle r="56" fill="#2a2016"/><circle r="56" fill="none" stroke="#d9b25e" stroke-width="2"/>' +
        [0, 30, 60, 90, 120, 150].map(function (a) { return '<path d="M0 -56V56" transform="rotate(' + a + ')" stroke="#6a5a3a" stroke-width="1"/>'; }).join("") +
        '<g class="don" style="--s:40s"><circle r="40" fill="none" stroke="#e8c870" stroke-width="3"/><circle cy="-10" r="30" fill="none" stroke="#e8c870" stroke-width="2"/><path d="M-30 -30L0 -46L30 -30M-40 10L-52 16M40 10L52 18M0 40L0 54" stroke="#e8c870" stroke-width="3" stroke-linecap="round"/></g>' +
        '<g class="don don-ters" style="--s:25s"><path d="M0 0L0 -52" stroke="#fff0c0" stroke-width="2.5"/></g><circle r="5" fill="#e8c870"/><circle cy="-70" r="8" fill="none" stroke="#b08a3e" stroke-width="4"/></g>';
      return h.svg(s,
        '<linearGradient id="aG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1c2a50"/><stop offset=".35" stop-color="#4a4a7a"/><stop offset=".55" stop-color="#c8806a"/><stop offset=".62" stop-color="#f0b070"/></linearGradient>' +
        '<linearGradient id="aZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d8bc90"/><stop offset="1" stop-color="#9a7a56"/></linearGradient>' +
        '<linearGradient id="aSu" x1="0" x2="1"><stop offset="0" stop-color="#3a8a8a"/><stop offset=".5" stop-color="#7ac8c0"/><stop offset="1" stop-color="#3a8a8a"/></linearGradient>' +
        '<linearGradient id="aRaf" x1="0" x2="1"><stop offset="0" stop-color="#6a2a22"/><stop offset=".2" stop-color="#2a4a3a"/><stop offset=".4" stop-color="#7a5a2a"/><stop offset=".6" stop-color="#3a2a4a"/><stop offset=".8" stop-color="#8a6a3a"/><stop offset="1" stop-color="#5a3020"/></linearGradient>' +
        '<radialGradient id="aAy"><stop offset="0" stop-color="#fff0c0" stop-opacity=".3"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="aK"><stop offset="0" stop-color="#ffc862" stop-opacity=".5"/><stop offset=".4" stop-color="#ff9a3a" stop-opacity=".15"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient>'
      );
    },
    eserler: [
      { x: 50, y: 26, ad: "Kitabe", panel: ARAP_PANEL.kitabe },
      { x: 16, y: 70, ad: "Kitap yığını", panel: ARAP_PANEL.kok },
      { x: 23, y: 86, ad: "Rahle", panel: ARAP_PANEL.hat },
      { x: 77, y: 80, ad: "Usturlap", panel: ARAP_PANEL.ceviri },
      { x: 76, y: 52, ad: "Kandil", panel: ARAP_PANEL.kindi }
    ]
  });
})();
