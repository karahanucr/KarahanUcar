/* Doğa bilimleri odası: yörüngeler arasında üç kapı → Orman (Biyoloji), Gözlemevi (Astronomi), Laboratuvar (Fizik). */
(function () {
  var S = window.SAHNE; if (!S) return;
  var h = S.h;
  var TAU = Math.PI * 2;

  /* ════════ MERKEZ: Doğa Bilimleri ════════ */
  var kapiBiyo = '<svg viewBox="0 0 200 250"><defs><radialGradient id="kb1" cy=".3"><stop offset="0" stop-color="#9fd07a"/><stop offset=".6" stop-color="#2f5a2a"/><stop offset="1" stop-color="#10200e"/></radialGradient></defs>' +
    '<path d="M20 230V110a80 80 0 0 1 160 0V230Z" fill="url(#kb1)"/><path d="M20 230V110a80 80 0 0 1 160 0V230" fill="none" stroke="#cfe6b0" stroke-width="2" opacity=".6"/><path d="M40 70a70 70 0 0 1 40 -30" stroke="#fff" stroke-width="4" opacity=".35" fill="none" stroke-linecap="round"/>' +
    '<g class="sallan" style="--s:4s;--a:4deg"><path d="M100 215C60 190 50 130 100 80C150 130 140 190 100 215Z" fill="#6aa84a"/><path d="M100 215V84M100 120l-22 -16M100 145l-28 -18M100 170l-28 -14M100 120l22 -16M100 145l28 -18M100 170l28 -14" stroke="#cfe6a0" stroke-width="2" fill="none"/></g>' +
    '<g class="kapi-isik"><circle cx="60" cy="100" r="3" fill="#e6ff8c"/><circle cx="150" cy="140" r="2.5" fill="#e6ff8c"/></g>' +
    '<rect x="10" y="226" width="180" height="16" rx="3" fill="#5a3a22"/><ellipse cx="128" cy="222" rx="7" ry="4" fill="#1a0e08"/><ellipse cx="138" cy="222" rx="5" ry="3" fill="#1a0e08"/></svg>';
  var kapiAstro = '<svg viewBox="0 0 200 250"><defs><radialGradient id="ka2" cy=".4"><stop offset="0" stop-color="#2a3a7a"/><stop offset="1" stop-color="#070a1a"/></radialGradient></defs>' +
    '<circle cx="100" cy="110" r="92" fill="url(#ka2)"/><circle cx="100" cy="110" r="92" fill="none" stroke="#c9b27a" stroke-width="5"/>' +
    h.yildizlar(26, 3, 30, 40, 170, 180, "#fff").replace(/class="yp"/g, 'class="yp"') +
    '<g transform="translate(128 80)"><circle r="18" fill="#e8c890"/><ellipse rx="34" ry="8" fill="none" stroke="#f0dcb0" stroke-width="3" transform="rotate(-18)"/><path d="M-18 -2a18 18 0 0 0 36 0" fill="#c9a870" opacity=".5"/></g>' +
    '<g transform="translate(70 170) rotate(-35)"><rect x="-10" y="-60" width="20" height="70" rx="4" fill="#c9a870"/><rect x="-13" y="-66" width="26" height="10" rx="2" fill="#e8d6a0"/></g><path d="M70 176L48 240M70 176L92 240M70 176V240" stroke="#8a6a3a" stroke-width="4"/></svg>';
  var kapiFizik = '<svg viewBox="0 0 200 250"><path d="M100 14L184 62V158L100 206L16 158V62Z" fill="#141c26" stroke="#c9a14a" stroke-width="3"/>' +
    '<g transform="translate(100 110)"><circle r="12" fill="#e87a4a"/><circle cx="-5" cy="-4" r="6" fill="#f0a070"/><circle cx="5" cy="4" r="6" fill="#aab4c0"/>' +
    [0, 60, 120].map(function (a, i) { return '<g transform="rotate(' + a + ')"><ellipse rx="70" ry="22" fill="none" stroke="#e8c870" stroke-width="1.6" opacity=".8"/><g class="don" style="--s:' + (3 + i) + 's"><circle cx="70" cy="0" r="5" fill="#9fd8ff"/></g></g>'; }).join("") +
    '</g><path d="M40 222H160" stroke="#c9a14a" stroke-width="3"/><g class="sallan" style="--s:1.1s;--a:14deg;transform-origin:100px 222px"><path d="M100 222V246" stroke="#c9a14a"/></g></svg>';

  S.kaydet("doga-bilimleri", {
    ad: "Doğa Bilimleri", yer: "Kütüphane · Doğa odası", vurgu: "#9FD07A", alan: "doga-bilimleri",
    alt: "Hücreden galaksiye, sarkaçtan atoma: doğayı ölçerek, deneyerek ve hayret ederek anlamaya çalışan bilimler. Bir kapıdan içeri gir.",
    parcacik: { tur: "yildiz", adet: 110 },
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#nG)"/><circle cx="1320" cy="160" r="260" fill="url(#nN)"/>';
      s += '<g transform="translate(1320 160)" opacity=".55"><g class="don" style="--s:220s"><path d="M0 0C40 -60 120 -40 150 10M0 0C-40 60 -120 40 -150 -10" fill="none" stroke="#b9a8ff" stroke-width="10" opacity=".25"/><path d="M0 0C30 -40 90 -30 110 6M0 0C-30 40 -90 30 -110 -6" fill="none" stroke="#e0d6ff" stroke-width="4" opacity=".4"/><circle r="16" fill="#fff4dc"/></g></g>';
      s += '<g transform="translate(800 330)"><circle r="170" fill="url(#nA)"/>' +
        '<g transform="scale(1 .34)"><circle r="300" fill="none" stroke="rgba(159,208,122,.22)" stroke-width="2.5"/><circle r="440" fill="none" stroke="rgba(232,189,98,.18)" stroke-width="2.5"/>' +
        '<g class="don" style="--s:24s"><circle cx="300" r="10" fill="#e8c870"/></g><g class="don don-ters" style="--s:40s"><circle cx="-440" r="13" fill="#9fd8ff"/></g></g>' +
        '<clipPath id="nKl"><circle r="92"/></clipPath><circle r="92" fill="#1f5a8a"/><g clip-path="url(#nKl)"><g class="kita">' +
        [0, 300].map(function (o) { return '<g transform="translate(' + o + ' 0)"><path d="M-120 -40c30 -30 70 -20 80 10c10 30 -20 50 -40 40c-20 -10 -50 10 -60 -10c-8 -14 4 -30 20 -40Z" fill="#4a8a4a"/><path d="M-20 20c20 -10 50 0 50 20c0 30 -30 50 -40 40c-10 -10 -20 -40 -10 -60Z" fill="#5a9a4a"/><path d="M40 -60c30 0 60 20 50 40c-10 20 -40 0 -50 -20Z" fill="#6aa84a"/><path d="M90 30c20 -6 40 10 30 30c-10 10 -30 0 -30 -30Z" fill="#4a8a4a"/></g>'; }).join("") +
        '</g><circle r="92" fill="url(#nGo)"/></g><circle r="92" fill="none" stroke="#9fd8ff" stroke-width="2" opacity=".5"/></g>';
      s += h.yildizlar(120, 17, 0, 0, 1600, 900, "#e6f0ff");
      return h.svg(s,
        '<radialGradient id="nG" cx=".5" cy=".4" r=".85"><stop offset="0" stop-color="#132a2a"/><stop offset=".6" stop-color="#0a1418"/><stop offset="1" stop-color="#04070a"/></radialGradient>' +
        '<radialGradient id="nN"><stop offset="0" stop-color="#8a6aff" stop-opacity=".25"/><stop offset="1" stop-color="#8a6aff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="nA"><stop offset=".5" stop-color="#9fd8ff" stop-opacity=".25"/><stop offset="1" stop-color="#9fd8ff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="nGo" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>'
      );
    },
    hazirla: function (el) { this._k = el.querySelector(".kita"); },
    kare: function (t) { if (this._k) this._k.setAttribute("transform", "translate(" + (-((t / 90) % 300)).toFixed(1) + " 0)"); },
    kapilar: [
      { hedef: "biyoloji", x: 27, y: 66, sanat: kapiBiyo, aciklama: "Ormanın içi: karıncalar, yapraklar, mantarlar." },
      { hedef: "astronomi", x: 50, y: 72, sanat: kapiAstro, aciklama: "Gözlemevi: Orion, gezegenler, galaksiler." },
      { hedef: "fizik", x: 73, y: 66, sanat: kapiFizik, aciklama: "Laboratuvar: sarkaç dalgası, atom, ışık." }
    ],
    yakinda: ["Kimya", "Yer Bilimleri"]
  });

  /* ════════ BİYOLOJİ: Orman ════════ */
  function agac(x, taban, gen, boy, renk, r) {
    var s = '<path d="M' + (x - gen / 2) + " " + taban + "C" + (x - gen * 0.45) + " " + (taban - boy * 0.4) + " " + (x - gen * 0.35) + " " + (taban - boy * 0.8) + " " + (x - gen * 0.3) + " " + (taban - boy) +
      "L" + (x + gen * 0.3) + " " + (taban - boy) + "C" + (x + gen * 0.35) + " " + (taban - boy * 0.8) + " " + (x + gen * 0.45) + " " + (taban - boy * 0.4) + " " + (x + gen / 2) + " " + taban +
      "C" + (x + gen) + " " + (taban + 6) + " " + (x + gen * 1.2) + " " + (taban + 14) + " " + (x + gen * 1.3) + " " + (taban + 20) + "H" + (x - gen * 1.3) + "C" + (x - gen * 1.2) + " " + (taban + 14) + " " + (x - gen) + " " + (taban + 6) + " " + (x - gen / 2) + " " + taban + 'Z" fill="' + renk + '"/>';
    if (r) for (var i = 0; i < 7; i++) { var ox = x - gen * 0.3 + r() * gen * 0.6; s += '<path d="M' + ox.toFixed(0) + " " + (taban - boy) + "C" + (ox + (r() - 0.5) * 10).toFixed(0) + " " + (taban - boy * 0.5) + " " + (ox + (r() - 0.5) * 16).toFixed(0) + " " + (taban - boy * 0.2) + " " + (ox + (r() - 0.5) * 12).toFixed(0) + " " + taban + '" stroke="rgba(0,0,0,.28)" stroke-width="' + (2 + r() * 3).toFixed(1) + '" fill="none"/>'; }
    return s;
  }
  function karinca(i, yuk) {
    return '<g class="karinca" data-i="' + i + '"><g class="bacak"><path d="M-3 0l-3 -6M-3 0l-3 6M1 0l0 -7M1 0l0 7M4 0l3 -6M4 0l3 6" stroke="#1a0e08" stroke-width="1.2"/></g>' +
      '<ellipse cx="-7" rx="5" ry="3.6" fill="#2a1408"/><ellipse cx="1" rx="3.2" ry="2.4" fill="#2a1408"/><circle cx="7" r="2.8" fill="#2a1408"/><path d="M9 -1l4 -4M9 1l4 4" stroke="#2a1408" stroke-width="1"/>' +
      (yuk ? '<path d="M2 -3L14 -16L20 -4Z" fill="#7ab04a" opacity=".95"/>' : "") + "</g>";
  }
  S.kaydet("biyoloji", {
    ad: "Biyoloji", ust: "doga-bilimleri", yer: "Kuzey ormanı · şafak sonrası", vurgu: "#B7E07A", alan: "doga-bilimleri",
    alt: "Sabah ışığı yaprakların arasından süzülüyor. Karıncalar yuvaya yaprak taşıyor, mantarlar toprağın altında ağaçlarla konuşuyor. Canlılığın bilimine hoş geldin.",
    parcacik: { tur: "atesbocegi", adet: 40 }, sozYer: "sag",
    soz: { metin: "There is grandeur in this view of life.", dil: "en", ceviri: "Yaşama bu bakışta bir yücelik var.", kaynak: "Darwin · Türlerin Kökeni, 1859" },
    arka: function () {
      var r = h.rnd(33), s = '<rect width="1600" height="900" fill="url(#bG)"/><circle cx="1260" cy="60" r="420" fill="url(#bGu)"/>';
      for (var i = 0; i < 26; i++) { var x = r() * 1600; s += agac(x, 700 + r() * 30, 12 + r() * 16, 700, "rgba(60,96,70," + (0.25 + r() * 0.2).toFixed(2) + ")"); }
      [[1180, 0, 1250, 0, 760, 900, 520, 900], [1300, 0, 1340, 0, 1000, 900, 880, 900], [1060, 0, 1100, 0, 420, 900, 330, 900], [1400, 0, 1460, 0, 1300, 900, 1180, 900]].forEach(function (p, i) {
        s += '<polygon class="isik-huzme" style="animation-delay:-' + i * 1.7 + 's" points="' + p[0] + "," + p[1] + " " + p[2] + "," + p[3] + " " + p[4] + "," + p[5] + " " + p[6] + "," + p[7] + '" fill="url(#bH)"/>';
      });
      for (var j = 0; j < 12; j++) { var x2 = 80 + j * 135 + (r() - 0.5) * 60; s += agac(x2, 730, 28 + r() * 22, 760, "#1e2e1c"); }
      s += '<path d="M0 0H1600V110C1500 170 1420 120 1320 160C1220 200 1160 140 1060 170C940 210 880 150 760 180C640 210 560 160 440 200C320 240 220 170 120 210C60 230 20 210 0 220Z" fill="#0c1a0e"/>';
      for (var c = 0; c < 40; c++) s += '<circle cx="' + (r() * 1600).toFixed(0) + '" cy="' + (140 + r() * 80).toFixed(0) + '" r="' + (20 + r() * 40).toFixed(0) + '" fill="#0c1a0e"/>';
      s += '<rect x="0" y="690" width="1600" height="210" fill="url(#bZ)"/>';
      for (var m = 0; m < 30; m++) s += '<ellipse cx="' + (r() * 1600).toFixed(0) + '" cy="' + (720 + r() * 170).toFixed(0) + '" rx="' + (30 + r() * 80).toFixed(0) + '" ry="' + (6 + r() * 12).toFixed(0) + '" fill="#3a5a26" opacity="' + (0.3 + r() * 0.4).toFixed(2) + '"/>';
      for (var l = 0; l < 80; l++) s += '<ellipse cx="' + (r() * 1600).toFixed(0) + '" cy="' + (730 + r() * 170).toFixed(0) + '" rx="5" ry="2.4" transform="rotate(' + (r() * 180).toFixed(0) + " " + 0 + " " + 0 + ')" fill="' + ["#8a5a2a", "#a86a2a", "#6a4a1e", "#b8842a"][Math.floor(r() * 4)] + '" opacity=".7"/>';
      s += agac(170, 760, 150, 900, "#2a1c12", r) + agac(1440, 740, 170, 900, "#2e1f14", r);
      s += '<path d="M1440 360C1360 330 1300 300 1250 250" stroke="#2e1f14" stroke-width="22" fill="none" stroke-linecap="round"/>';
      s += '<g class="asili" style="--s:5s;--a:5deg"><path d="M1250 250C1244 270 1240 290 1242 310" stroke="#3a5a1e" stroke-width="4" fill="none"/>' +
        '<g transform="translate(1242 310)"><path d="M0 0C-70 40 -80 150 0 230C80 150 70 40 0 0Z" fill="url(#bY)"/><path d="M0 4V226" stroke="#d6f0a0" stroke-width="3"/>' +
        [40, 80, 120, 160].map(function (y, i) { return '<path d="M0 ' + y + "C-20 " + (y + 8) + " -36 " + (y + 20) + " -46 " + (y + 36 - i * 4) + "M0 " + y + "C20 " + (y + 8) + " 36 " + (y + 20) + " 46 " + (y + 36 - i * 4) + '" stroke="#c8e890" stroke-width="1.6" fill="none"/>'; }).join("") + "</g></g>";
      s += '<g transform="translate(1100 772)"><path d="M-220 -30H180A30 34 0 0 1 180 38H-220Z" fill="#4a3220"/><path d="M-220 -30H180" stroke="#6a4a2e" stroke-width="6"/><path d="M-200 -8H160M-180 14H150" stroke="rgba(0,0,0,.3)" stroke-width="3"/>' +
        '<ellipse cx="-220" cy="4" rx="30" ry="34" fill="#b8905a"/><ellipse cx="-220" cy="4" rx="22" ry="25" fill="none" stroke="#8a6a3a" stroke-width="2"/><ellipse cx="-220" cy="4" rx="14" ry="16" fill="none" stroke="#8a6a3a" stroke-width="2"/><ellipse cx="-220" cy="4" rx="6" ry="7" fill="none" stroke="#8a6a3a" stroke-width="2"/>' +
        '<ellipse cx="-60" cy="-34" rx="30" ry="8" fill="#4a7a2a"/><ellipse cx="90" cy="-33" rx="40" ry="9" fill="#3a6a24"/></g>';
      s += '<path id="kYol" d="M300 880C420 860 560 850 700 830C800 815 850 790 890 752C900 745 930 742 960 742H1260C1300 742 1320 760 1340 800C1360 840 1420 860 1500 870" fill="none" stroke="rgba(120,90,40,.25)" stroke-width="10" stroke-linecap="round"/>';
      s += '<g class="karincalar">' + Array.apply(null, { length: 22 }).map(function (_, i) { return karinca(i, i % 3 === 0); }).join("") + "</g>";
      s += '<g transform="translate(560 830)"><ellipse cx="0" cy="10" rx="60" ry="8" fill="#1a1208" opacity=".6"/>' +
        [[-30, 0, 1], [10, -10, 1.3], [40, 4, 0.8]].map(function (m) { return '<g transform="translate(' + m[0] + " " + m[1] + ") scale(" + m[2] + ')"><path d="M-5 0V-30h10V0Z" fill="#efe2c8"/><path d="M-26 -28C-24 -52 24 -52 26 -28Z" fill="#b8402a"/><circle cx="-10" cy="-38" r="3" fill="#fff4e0"/><circle cx="6" cy="-42" r="2.5" fill="#fff4e0"/><circle cx="14" cy="-33" r="2" fill="#fff4e0"/><ellipse cy="-30" rx="30" ry="12" fill="#ffb080" opacity=".12" class="hale"/></g>'; }).join("") + "</g>";
      s += '<g transform="translate(880 700)"><path d="M0 150V-40" stroke="#6a5030" stroke-width="3"/><path d="M0 130C-20 110 -24 80 -8 60C10 40 -10 10 6 -20C18 -40 10 -60 22 -80" stroke="#5a8a3a" stroke-width="3" fill="none"/>' +
        [[-8, 60, -30], [6, -20, 30], [-4, 110, 20]].map(function (p) { return '<g transform="translate(' + p[0] + " " + p[1] + ") rotate(" + p[2] + ')"><path d="M0 0C-8 12 -8 36 0 46C8 36 8 12 0 0Z" fill="#7ab84a"/><circle cy="14" r="4" fill="#a8d870"/><circle cy="24" r="4" fill="#a8d870"/><circle cy="34" r="4" fill="#a8d870"/></g>'; }).join("") +
        '<path d="M10 40c14 -6 22 -2 24 8M-10 90c-14 -6 -22 0 -20 10" stroke="#5a8a3a" stroke-width="2" fill="none"/><ellipse cx="18" cy="-4" rx="10" ry="6" fill="#e8e0f8"/><ellipse cx="-14" cy="80" rx="9" ry="5" fill="#e8e0f8"/></g>';
      s += '<g transform="translate(1520 650)"><path d="M0 250V0" stroke="#4a7a2a" stroke-width="4"/>' + [0, 1, 2, 3, 4, 5].map(function (k) { return '<path d="M0 ' + (k * 22) + 'c-18 4 -26 16 -22 26c8 2 18 -4 22 -14Z" fill="#b87ac8" opacity="' + (1 - k * 0.08) + '"/>'; }).join("") +
        '<g transform="translate(-40 40)"><g class="kanat"><path d="M0 0C-24 -30 -44 -10 -30 8C-40 18 -24 34 0 6Z" fill="#e8943a"/><circle cx="-24" cy="-8" r="4" fill="#1a1a2a"/></g><g class="kanat k2"><path d="M0 0C24 -30 44 -10 30 8C40 18 24 34 0 6Z" fill="#f0a64a"/><circle cx="24" cy="-8" r="4" fill="#1a1a2a"/></g><path d="M0 -8V14" stroke="#1a1208" stroke-width="3"/></g></g>';
      [[60, 820, 1], [340, 860, 0.8], [1300, 870, 0.9]].forEach(function (f, i) {
        s += '<g class="sallan" style="--s:' + (4 + i) + "s;--a:3deg;--d:-" + i + 's"><g transform="translate(' + f[0] + " " + f[1] + ") scale(" + f[2] + ')">' + [-50, -25, 0, 25, 50].map(function (a) { return '<path d="M0 0C' + (a * 1.2) + " -60 " + (a * 3) + " -110 " + (a * 3.6) + ' -150" stroke="#3a7a2a" stroke-width="6" fill="none"/>' + [0.3, 0.5, 0.7, 0.9].map(function (k) { return '<ellipse cx="' + (a * 3.6 * k) + '" cy="' + (-150 * k) + '" rx="14" ry="5" fill="#4a9a34" transform="rotate(' + (a > 0 ? -30 : 30) + " " + (a * 3.6 * k) + " " + (-150 * k) + ')"/>'; }).join(""); }).join("") + "</g></g>";
      });
      return h.svg(s,
        '<linearGradient id="bG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a4a2a"/><stop offset=".5" stop-color="#1c3420"/><stop offset="1" stop-color="#0e1a0e"/></linearGradient>' +
        '<radialGradient id="bGu"><stop offset="0" stop-color="#fff4c0" stop-opacity=".55"/><stop offset=".4" stop-color="#e8f0a0" stop-opacity=".15"/><stop offset="1" stop-color="#e8f0a0" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="bH" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".35"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="bZ" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a3a1a"/><stop offset="1" stop-color="#0e140a"/></linearGradient>' +
        '<linearGradient id="bY" x1="0" x2="1"><stop offset="0" stop-color="#5a9a2a"/><stop offset=".5" stop-color="#8ac84a"/><stop offset="1" stop-color="#4a8a24"/></linearGradient>'
      );
    },
    hazirla: function (el) {
      this._yol = el.querySelector("#kYol");
      this._kar = [].slice.call(el.querySelectorAll(".karinca"));
      this._uz = this._yol ? this._yol.getTotalLength() : 0;
    },
    kare: function (t) {
      if (!this._yol) return;
      var n = this._kar.length, L = this._uz;
      for (var i = 0; i < n; i++) {
        var s = (t * 0.035 + (i * L) / n + Math.sin(i * 7.3) * 18) % L;
        var p = this._yol.getPointAtLength(s), q = this._yol.getPointAtLength(Math.min(L, s + 3));
        var a = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
        this._kar[i].setAttribute("transform", "translate(" + p.x.toFixed(1) + " " + (p.y - 4).toFixed(1) + ") rotate(" + a.toFixed(1) + ")");
        this._kar[i].firstChild.setAttribute("transform", "skewX(" + (Math.sin(t / 60 + i) * 18).toFixed(1) + ")");
      }
    },
    eserler: [
      { x: 78, y: 45, ad: "Yaprak", panel:
        "<h3>Hücre</h3><p>Bütün canlılar hücrelerden oluşur. 1665'te Robert Hooke mantar dokusunda gördüğü odacıklara <i>cell</i> (hücre) adını verdi. <b>Hücre kuramı</b> 1838–1839'da Schleiden (bitkiler) ve Schwann (hayvanlar) ile kuruldu; 1855'te Virchow ekledi: <i>Omnis cellula e cellula</i>, her hücre bir hücreden gelir.</p>" +
        "<h4>Fotosentez</h4><p>Bu yaprağın hücrelerindeki kloroplastlar güneş ışığını kimyasal enerjiye çevirir:</p><p class=\"pn-soz\">6 CO₂ + 6 H₂O + ışık → C₆H₁₂O₆ + 6 O₂</p>" +
        "<p>Soluduğumuz oksijenin kaynağı budur. Bakteriler gibi çekirdeksiz (<b>prokaryot</b>) hücreler ile bitki, hayvan ve mantarlardaki çekirdekli (<b>ökaryot</b>) hücreler, yaşamın iki büyük hücre tipidir.</p>" },
      { x: 66, y: 81, ad: "Karınca izi", panel:
        "<h3>Ekoloji ve davranış</h3><p>Karıncalar <b>feromon</b> denen kimyasal izlerle haberleşir. Yiyecek bulan işçi yuvaya dönerken iz bırakır. Kullanılan iz güçlenir, kullanılmayan buharlaşıp söner. Bu basit kurallardan koloni ölçeğinde şaşırtıcı ölçüde akıllı bir yol bulma davranışı doğar.</p>" +
        "<p>Bu fikir bilgisayar bilimine de geçti: <b>karınca kolonisi algoritmaları</b> (Dorigo, 1992) en kısa yol problemlerini çözmekte kullanılır.</p>" +
        "<p>Sahnedeki karıncaların bir kısmı yaprak parçası taşıyor. Yaprak kesici karıncalar yaprakları yemez: onları yuvada yetiştirdikleri mantar bahçelerine besin olarak taşır. Bu, on milyonlarca yıllık bir tarım ortaklığıdır.</p>" +
        "<p><b>Ekoloji</b> (canlıların birbirleriyle ve çevreleriyle ilişkisi) terimini Ernst Haeckel 1866'da önerdi.</p>" },
      { x: 93, y: 78, ad: "Kelebek", panel:
        "<h3>Evrim</h3><p>Charles Darwin ve Alfred Russel Wallace <b>doğal seçilim</b> kuramını 1858'de birlikte sundu; Darwin'in <i>Türlerin Kökeni</i> 1859'da yayımlandı. Mantık üç adımlıdır: bireyler arasında <b>çeşitlilik</b> vardır, bu özelliklerin bir kısmı <b>kalıtsaldır</b>, ve bazı özellikler hayatta kalma ve üreme şansını artırır. Kuşaklar boyunca bu özellikler yaygınlaşır.</p>" +
        "<p>Kelebek kanatları evrimin canlı ders kitabıdır: yırtıcıyı ürküten göz lekeleri, zehirli türleri taklit eden zararsız türler (Bates taklitçiliği, 1862).</p>" +
        "<p class=\"pn-soz\">Nothing in biology makes sense except in the light of evolution.<small>Biyolojide hiçbir şey evrimin ışığı olmadan anlam taşımaz. · Theodosius Dobzhansky, 1973</small></p>" },
      { x: 55, y: 76, ad: "Bezelye", panel:
        "<h3>Genetik</h3><p>Gregor Mendel manastır bahçesinde yıllarca bezelye çaprazladı ve sonuçlarını 1866'da yayımladı. Kalıtımın karışarak değil, ayrı “birimler” (bugün <b>gen</b> diyoruz) hâlinde aktarıldığını gösterdi. Çalışması 1900'de de Vries, Correns ve Tschermak tarafından yeniden keşfedildi.</p>" +
        "<table class=\"pn-tablo\"><tr><th></th><th>R</th><th>r</th></tr><tr><td>R</td><td>RR · yuvarlak</td><td>Rr · yuvarlak</td></tr><tr><td>r</td><td>Rr · yuvarlak</td><td>rr · buruşuk</td></tr></table><p>İki melez (Rr) bezelyenin çaprazlanması: baskın özellik 3, çekinik özellik 1 oranında görünür.</p>" +
        "<p>1953'te Watson ve Crick, Rosalind Franklin ile Maurice Wilkins'in X-ışını verilerinden yararlanarak <b>DNA'nın çift sarmal yapısını</b> açıkladı. İnsan genomu yaklaşık 3 milyar baz çiftinden oluşur.</p>" },
      { x: 35, y: 89, ad: "Mantarlar", panel:
        "<h3>Mantarlar ve mikroplar</h3><p>Mantarlar ne bitkidir ne hayvan: kendi âlemleri vardır ve evrimsel olarak hayvanlara bitkilerden daha yakın akrabadırlar. Orman toprağının altında mantar iplikleri (<b>mikoriza</b>) ağaç kökleriyle birleşir ve su, mineral ve şeker alışverişi yapar.</p>" +
        "<h4>Mikrobiyoloji</h4><ul><li><b>Leeuwenhoek</b> (1670'ler): kendi yaptığı merceklerle mikroorganizmaları ilk gözlemledi</li><li><b>Pasteur</b> ve <b>Koch</b> (19. yüzyıl): hastalıkların mikroplardan kaynaklandığını gösteren mikrop kuramı</li><li><b>Fleming</b> (1928): bir küf mantarının (<i>Penicillium</i>) bakterileri öldürdüğünü fark etti: penisilin</li></ul>" },
      { x: 91, y: 38, ad: "Ağaç", panel:
        "<h3>Biyolojinin dalları</h3><p>Bir ağaç gibi: kökler ortak, dallar ayrı yönlere uzanıyor.</p><div class=\"pn-etiketler\"><span>Moleküler biyoloji</span><span>Hücre biyolojisi</span><span>Genetik</span><span>Evrim biyolojisi</span><span>Ekoloji</span><span>Botanik</span><span>Zooloji</span><span>Mikrobiyoloji</span><span>Biyokimya</span><span>Fizyoloji</span><span>Nörobiyoloji</span><span>Biyoloji felsefesi</span></div>" +
        "<h4>Biyoloji felsefesi</h4><p>Canlı olmak ne demek? Tür gerçek bir şey mi, yoksa bizim çizdiğimiz bir sınır mı? Bir organın “işlevi” olduğunu söylemek, doğaya amaç yüklemek mi? Bu soruları sunumumda ele alıyorum.</p><a class=\"pn-bag\" href=\"sunumlar/biyoloji-felsefesi/index.html\" target=\"_blank\" rel=\"noopener\">Yaşamın sınırları sunumunu aç →</a>" }
    ]
  });

  /* ════════ ASTRONOMİ: Gözlemevi ════════ */
  var GEZ = [[70, 4, 2.4, "#c8b8a0"], [100, 10, 3.6, "#f0d8a0"], [135, 16, 4, "#6ab0e8"], [170, 30, 3.2, "#e0784a"], [230, 190, 7.5, "#e8c8a0"], [290, 470, 6.5, "#f0dcb0"]];
  S.kaydet("astronomi", {
    ad: "Astronomi", ust: "doga-bilimleri", yer: "Dağ başında bir gözlemevi · açık bir gece", vurgu: "#9FC8FF", alan: "doga-bilimleri",
    alt: "Kubbenin kapağı açık, teleskop Orion'a dönük. Aynı gökyüzüne Babilliler, Uluğ Bey ve Galileo da baktı.",
    parcacik: { tur: "yildiz", adet: 160 },
    soz: { metin: "Der bestirnte Himmel über mir und das moralische Gesetz in mir.", dil: "de", ceviri: "Üstümdeki yıldızlı gök ve içimdeki ahlak yasası.", kaynak: "Kant · Pratik Aklın Eleştirisi, 1788" },
    arka: function () {
      var r = h.rnd(55), s = '<rect width="1600" height="900" fill="url(#oG)"/>';
      s += '<g transform="rotate(-24 800 450)"><ellipse cx="800" cy="400" rx="1100" ry="120" fill="url(#oS)"/><ellipse cx="800" cy="400" rx="900" ry="46" fill="#e8e0ff" opacity=".06"/>';
      for (var i = 0; i < 380; i++) { var u = (r() + r() + r() - 1.5) / 1.5; s += '<circle class="yp" cx="' + (r() * 2000 - 200).toFixed(0) + '" cy="' + (400 + u * 150).toFixed(0) + '" r="' + (0.4 + r() * 1.1).toFixed(1) + '" fill="#f0f0ff" style="animation-duration:' + (2 + r() * 4).toFixed(1) + 's;animation-delay:-' + (r() * 4).toFixed(1) + 's"/>'; }
      s += "</g>";
      s += '<g transform="translate(830 190)"><circle r="120" fill="url(#oGx)"/><g class="don" style="--s:160s"><path d="M0 0C20 -40 80 -40 96 4C104 30 80 50 60 40M0 0C-20 40 -80 40 -96 -4C-104 -30 -80 -50 -60 -40" fill="none" stroke="#d8ccff" stroke-width="8" opacity=".35" stroke-linecap="round"/><path d="M0 0C14 -26 54 -26 66 2M0 0C-14 26 -54 26 -66 -2" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/></g><circle r="10" fill="#fff8e8"/></g>';
      var orion = [[1200, 190, 5, "#ffb070"], [1360, 215, 3.4, "#dfe8ff"], [1250, 330, 3, "#e8f0ff"], [1286, 320, 3.2, "#e8f0ff"], [1322, 310, 3, "#e8f0ff"], [1232, 455, 3, "#dfe8ff"], [1395, 440, 4.6, "#b8d0ff"], [1282, 140, 2.2, "#fff"]];
      s += '<g class="orion" stroke="#9fc8ff" stroke-width="1.2" opacity=".55" fill="none"><path d="M1282 140L1200 190L1250 330L1232 455M1282 140L1360 215L1322 310L1395 440M1250 330L1286 320L1322 310M1200 190L1360 215"/></g>';
      orion.forEach(function (o, k) { s += '<circle cx="' + o[0] + '" cy="' + o[1] + '" r="' + o[2] * 4 + '" fill="' + o[3] + '" opacity=".15"/><circle class="yp" style="animation-duration:' + (2.5 + k * 0.4) + 's" cx="' + o[0] + '" cy="' + o[1] + '" r="' + o[2] + '" fill="' + o[3] + '"/>'; });
      s += '<ellipse cx="1290" cy="385" rx="10" ry="16" fill="#ff9ad0" opacity=".35"/>';
      s += '<g transform="translate(1470 110)"><circle r="46" fill="#f4ecd8"/><circle cx="18" cy="-8" r="44" fill="#0a1026"/><circle r="120" fill="url(#oAy)"/></g>';
      s += '<g class="orrery" transform="translate(760 560)"><g transform="scale(1 .38)">' + GEZ.map(function (g) { return '<circle r="' + g[0] + '" fill="none" stroke="rgba(159,200,255,.25)" stroke-width="2.4"/>'; }).join("") + "</g>" +
        '<circle r="46" fill="url(#oGu)"/><circle r="16" fill="#ffe8a0"/>' +
        GEZ.map(function (g, i) { return '<g class="gez" data-i="' + i + '"><circle r="' + g[2] + '" fill="' + g[3] + '"/>' + (i === 5 ? '<ellipse rx="' + g[2] * 2.2 + '" ry="' + g[2] * 0.6 + '" fill="none" stroke="#f0dcb0" stroke-width="1.5"/>' : "") + "</g>"; }).join("") + "</g>";
      s += '<path d="M0 760C150 700 300 720 460 690C620 660 760 700 920 670C1080 640 1240 650 1400 610C1500 590 1560 600 1600 590V900H0Z" fill="#070a14"/>';
      for (var p = 0; p < 36; p++) { var px = r() * 1600, py = 700 - (px > 1200 ? (px - 1200) * 0.1 : 0) + r() * 40, ph = 30 + r() * 60; s += '<path d="M' + px.toFixed(0) + " " + (py - ph).toFixed(0) + "L" + (px + ph * 0.28).toFixed(0) + " " + py.toFixed(0) + "H" + (px - ph * 0.28).toFixed(0) + 'Z" fill="#05070e"/>'; }
      s += '<g transform="translate(1240 610)"><rect x="-90" y="0" width="180" height="120" fill="#141a28"/><path d="M-100 0A100 100 0 0 1 100 0Z" fill="#c8ccd8"/><path d="M-100 0A100 100 0 0 1 100 0Z" fill="url(#oK)"/>' +
        '<path d="M-14 -99L14 -99L20 0H-20Z" fill="#0a0e18"/><g transform="translate(0 -20) rotate(28)"><rect x="-9" y="-120" width="18" height="110" rx="3" fill="#8a8e9a"/><rect x="-12" y="-126" width="24" height="12" rx="2" fill="#b8bcc8"/></g>' +
        '<rect x="-60" y="40" width="22" height="30" fill="#ffcc70" opacity=".85"/><rect x="40" y="40" width="22" height="30" fill="#ffcc70" opacity=".6"/><rect x="-14" y="70" width="28" height="50" fill="#2a2016"/></g>';
      s += '<rect x="0" y="880" width="1600" height="20" fill="#04060c"/>';
      return h.svg(s,
        '<linearGradient id="oG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#03050e"/><stop offset=".6" stop-color="#0c1430"/><stop offset=".85" stop-color="#1e2448"/><stop offset="1" stop-color="#2a2440"/></linearGradient>' +
        '<radialGradient id="oS"><stop offset="0" stop-color="#b8a8ff" stop-opacity=".22"/><stop offset=".6" stop-color="#6a7aff" stop-opacity=".07"/><stop offset="1" stop-color="#6a7aff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="oGx"><stop offset="0" stop-color="#fff0d8" stop-opacity=".5"/><stop offset=".3" stop-color="#b8a8ff" stop-opacity=".18"/><stop offset="1" stop-color="#b8a8ff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="oAy"><stop offset=".3" stop-color="#f4ecd8" stop-opacity=".18"/><stop offset="1" stop-color="#f4ecd8" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="oGu"><stop offset="0" stop-color="#ffe8a0" stop-opacity=".9"/><stop offset=".4" stop-color="#ffb040" stop-opacity=".35"/><stop offset="1" stop-color="#ff8020" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="oK" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>'
      );
    },
    hazirla: function (el) { this._g = [].slice.call(el.querySelectorAll(".gez")); },
    kare: function (t) {
      for (var i = 0; i < this._g.length; i++) {
        var g = GEZ[i], a = (t / 1000) * (TAU / (g[1] * 1.2)) + i * 1.7;
        this._g[i].setAttribute("transform", "translate(" + (Math.cos(a) * g[0]).toFixed(1) + " " + (Math.sin(a) * g[0] * 0.38).toFixed(1) + ")");
      }
    },
    eserler: [
      { x: 47, y: 55, ad: "Güneş sistemi", panel:
        "<h3>Güneş sistemi</h3><p>Güneş'in çevresinde sekiz gezegen döner: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün. Plüton 2006'da Uluslararası Astronomi Birliği kararıyla <b>cüce gezegen</b> sınıfına alındı. (Sahnedeki modelde ilk altısı var; dönüş hızları ölçekli değil.)</p>" +
        "<p>Kopernik 1543'te Güneş'i merkeze koydu. Kepler, Tycho Brahe'nin gözlemlerinden üç yasa çıkardı (1609 ve 1619):</p><ul><li>Gezegenler Güneş'in bir odakta durduğu <b>elipsler</b> çizer.</li><li>Güneş–gezegen çizgisi eşit zamanlarda <b>eşit alanlar</b> tarar.</li><li>Yörünge süresinin karesi, yörünge büyüklüğünün küpüyle orantılıdır: <b>T² ∝ a³</b>.</li></ul>" +
        "<p>Dünya–Güneş uzaklığı yaklaşık 150 milyon km'dir (1 astronomik birim). Güneş ışığı bu yolu yaklaşık 8 dakika 20 saniyede alır: Güneş'e her baktığında onun 8 dakika önceki hâlini görürsün.</p>" },
      { x: 81, y: 30, ad: "Orion", panel:
        "<h3>Yıldızlar: Orion</h3><p>Orion takımyıldızı iki uçtan iki dev yıldızı yan yana gösterir: sol omuzda kırmızı süperdev <b>Betelgeuse</b>, sağ ayakta mavi-beyaz süperdev <b>Rigel</b>. Renk, yüzey sıcaklığını gösterir: kırmızı görece soğuk, mavi çok sıcaktır.</p>" +
        "<p>Yıldızlar çekirdeklerinde hidrojeni helyuma dönüştürerek (nükleer füzyon) parlar. Kütleli yıldızlar ömürlerinin sonunda süpernova olarak patlar; demirden ağır elementlerin bir kısmı bu patlamalarda ve nötron yıldızı çarpışmalarında oluşur. Kanındaki demir ve kemiklerindeki kalsiyum bir zamanlar yıldızların içinde üretildi.</p>" +
        "<p>Kemerin altındaki pembe leke <b>Orion Bulutsusu</b>dur (M42): yaklaşık 1.300 ışık yılı uzakta, yeni yıldızların doğduğu bir gaz ve toz bulutu.</p>" },
      { x: 52, y: 21, ad: "Galaksi", panel:
        "<h3>Kozmoloji</h3><p>Samanyolu yüz milyarlarca yıldızdan oluşan sarmal bir galaksidir; gözlemlenebilir evrende ise yüz milyarlarca galaksi vardır.</p>" +
        "<ul><li><b>1927–1929</b>: Lemaître ve Hubble, uzak galaksilerin bizden uzaklaştığını, uzaklaştıkça daha hızlı kaçtığını gösterdi: evren genişliyor.</li><li><b>1965</b>: Penzias ve Wilson, Büyük Patlama'nın ardında kalan kozmik mikrodalga arka plan ışımasını buldu.</li><li>Bugünkü ölçümlere göre evren yaklaşık <b>13,8 milyar yaşında</b>.</li></ul>" +
        "<p>Evrenin yalnızca yaklaşık %5'i bildiğimiz sıradan maddedir; gerisi, doğası hâlâ bilinmeyen karanlık madde (yaklaşık %27) ve karanlık enerjidir (yaklaşık %68).</p>" +
        "<div class=\"pn-etiketler\"><span>Astrofizik</span><span>Kozmoloji</span><span>Gezegen bilimi</span><span>Astrobiyoloji</span><span>Gök mekaniği</span><span>Radyo astronomi</span></div>" +
        "<a class=\"pn-bag\" href=\"bilgi/matematiksel-evren.html\">Okuma: Evren bir matematiksel yapı mı? →</a>" },
      { x: 78, y: 62, ad: "Gözlemevi", panel:
        "<h3>Gözlemin tarihi</h3><ul><li><b>1420'ler, Semerkant</b>: Uluğ Bey'in gözlemevi; bin kadar yıldızın konumunu veren <i>Zîc-i Uluğ Bey</i> kataloğu.</li><li><b>1577, İstanbul</b>: Takiyüddin'in gözlemevi kuruldu; birkaç yıl sonra, 1580'de yıktırıldı.</li><li><b>1609–1610</b>: Galileo teleskobunu göğe çevirdi: Ay'daki dağlar, Jüpiter'in dört büyük uydusu, Samanyolu'nun sayısız yıldızdan oluştuğu. Hepsini <i>Sidereus Nuncius</i>'ta (Yıldız Habercisi) yayımladı.</li><li><b>1990</b>: Hubble Uzay Teleskobu yörüngeye yerleşti.</li><li><b>2021</b>: James Webb Uzay Teleskobu fırlatıldı; kızılötesinde evrenin ilk galaksilerine bakıyor.</li></ul>" },
      { x: 92, y: 12, ad: "Ay", panel:
        "<h3>Ay</h3><p>Dünya'dan ortalama yaklaşık 384.400 km uzaktadır. Kendi çevresinde ve Dünya'nın çevresinde aynı sürede döndüğü için (<b>kütleçekimsel kilitlenme</b>) bize hep aynı yüzünü gösterir.</p>" +
        "<p>Yıldızlara göre bir turunu yaklaşık 27,3 günde tamamlar; evrelerin döngüsü ise, Dünya da Güneş çevresinde ilerlediği için, yaklaşık 29,5 gün sürer. Okyanuslardaki gelgitleri esas olarak Ay'ın çekimi oluşturur.</p>" +
        "<p>Ay her yıl Dünya'dan yaklaşık 3,8 cm uzaklaşıyor. 20 Temmuz 1969'da Apollo 11 ile insanlar ilk kez Ay'a ayak bastı.</p>" }
    ]
  });

  /* ════════ FİZİK: Laboratuvar ════════ */
  var SARKAC = 15, CUBUK_X0 = 700, CUBUK_X1 = 1180, CUBUK_Y = 200;
  S.kaydet("fizik", {
    ad: "Fizik", ust: "doga-bilimleri", yer: "Laboratuvar · gece yarısı", vurgu: "#E8C870", alan: "doga-bilimleri",
    alt: "On beş sarkaç aynı anda bırakıldı: bir dalga, bir yılan, bir kaos, sonra yeniden düzen. Doğanın yasaları bazen dans eder.",
    parcacik: { tur: "toz", adet: 50 },
    soz: { metin: "Hypotheses non fingo.", dil: "la", ceviri: "Hipotez uydurmam.", kaynak: "Newton · Principia, Genel Not (1713)" },
    arka: function () {
      var s = '<rect width="1600" height="900" fill="url(#fG)"/><g stroke="rgba(232,200,112,.06)" stroke-width="1">';
      for (var x = 0; x <= 1600; x += 40) s += '<path d="M' + x + ' 0V900"/>';
      for (var y = 0; y <= 900; y += 40) s += '<path d="M0 ' + y + 'H1600"/>';
      s += "</g>";
      [["F = G·m₁m₂/r²", 120, 520, 20], ["∇·E = ρ/ε₀", 1320, 170, 22], ["iħ ∂ψ/∂t = Ĥψ", 540, 110, 22], ["S = k·log W", 1400, 700, 18], ["T = 2π√(L/g)", 1000, 90, 18], ["c ≈ 299 792 km/s", 160, 640, 16]].forEach(function (e, i) {
        s += '<text class="yuz" style="--s:' + (6 + i) + "s;--d:-" + i + 's" x="' + e[1] + '" y="' + e[2] + '" font-family="Georgia, serif" font-style="italic" font-size="' + e[3] + '" fill="rgba(232,200,112,.22)">' + e[0] + "</text>";
      });
      s += '<rect x="0" y="780" width="1600" height="120" fill="#1a1612"/><rect x="0" y="776" width="1600" height="8" fill="#3a2e22"/>';
      s += '<rect x="' + (CUBUK_X0 - 30) + '" y="' + (CUBUK_Y - 10) + '" width="' + (CUBUK_X1 - CUBUK_X0 + 60) + '" height="14" rx="4" fill="#8a7a5a"/><path d="M' + (CUBUK_X0 - 20) + " " + CUBUK_Y + "V780M" + (CUBUK_X1 + 20) + " " + CUBUK_Y + 'V780" stroke="#6a5a40" stroke-width="10"/><rect x="' + (CUBUK_X0 - 60) + '" y="770" width="' + (CUBUK_X1 - CUBUK_X0 + 120) + '" height="12" fill="#4a3e2e"/>';
      s += '<g class="sarkaclar">';
      for (var i = 0; i < SARKAC; i++) s += '<g class="sarkac"><path stroke="#c9b48a" stroke-width="1.2"/><circle r="11" fill="url(#fT)"/></g>';
      s += "</g>";
      s += '<g transform="translate(1340 500)"><circle r="130" fill="url(#fA)"/><g class="cekirdek">' + [[-6, -5, "#e8704a"], [7, -4, "#b8c0cc"], [0, 7, "#e8704a"], [-8, 6, "#b8c0cc"], [8, 7, "#e8704a"], [0, -10, "#b8c0cc"]].map(function (n) { return '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="8" fill="' + n[2] + '"/>'; }).join("") + "</g>" +
        [0, 60, 120].map(function (a) { return '<g transform="rotate(' + a + ')"><ellipse rx="120" ry="36" fill="none" stroke="#e8c870" stroke-width="1.6" opacity=".7"/><circle class="elektron" r="6" fill="#9fd8ff"/><circle class="elektron-hale" r="14" fill="#9fd8ff" opacity=".25"/></g>'; }).join("") + "</g>";
      s += '<g transform="translate(760 700)"><path d="M-360 10L-40 10" stroke="#fff" stroke-width="5" opacity=".9"/><path d="M-360 10L-40 10" stroke="#fff" stroke-width="16" opacity=".12"/>' +
        '<path d="M-40 60L0 -30L40 60Z" fill="rgba(200,230,255,.25)" stroke="#e0f0ff" stroke-width="2"/>' +
        ["#ff4a4a", "#ff9a3a", "#ffe24a", "#5ad05a", "#4a9aff", "#6a5aff", "#b05aff"].map(function (c, i) { return '<path d="M12 18L300 ' + (-40 + i * 16) + '" stroke="' + c + '" stroke-width="5" opacity=".85"/>'; }).join("") + "</g>";
      s += '<g transform="translate(1300 700)"><rect x="-44" y="-86" width="88" height="10" rx="3" fill="#8a6a3a"/><rect x="-44" y="76" width="88" height="10" rx="3" fill="#8a6a3a"/><path d="M-36 -76V76M36 -76V76" stroke="#8a6a3a" stroke-width="5"/>' +
        '<path d="M-30 -76C-30 -30 -4 -10 -3 0C-4 10 -30 30 -30 76H30C30 30 4 10 3 0C4 -10 30 -30 30 -76Z" fill="rgba(210,235,255,.18)" stroke="#d8ecff" stroke-width="2"/>' +
        '<path class="kum-ust" d="M-24 -60H24C20 -30 6 -12 0 -4C-6 -12 -20 -30 -24 -60Z" fill="#e8c070"/><path class="kum-akis" d="M0 -4V70" stroke="#e8c070" stroke-width="2" stroke-dasharray="3 5"/><path class="kum-alt" d="M-28 74C-20 50 -8 40 0 38C8 40 20 50 28 74Z" fill="#e8c070"/></g>';
      s += '<g transform="translate(330 470)"><text text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#ffe7a8" class="emc">E = mc²</text></g>';
      return h.svg(s,
        '<radialGradient id="fG" cx=".55" cy=".45" r=".8"><stop offset="0" stop-color="#232028"/><stop offset=".7" stop-color="#121014"/><stop offset="1" stop-color="#08070a"/></radialGradient>' +
        '<radialGradient id="fT" cx=".35" cy=".35"><stop offset="0" stop-color="#fff4d0"/><stop offset=".4" stop-color="#e8c060"/><stop offset="1" stop-color="#7a5a20"/></radialGradient>' +
        '<radialGradient id="fA"><stop offset="0" stop-color="#9fd8ff" stop-opacity=".2"/><stop offset="1" stop-color="#9fd8ff" stop-opacity="0"/></radialGradient>'
      );
    },
    hazirla: function (el) {
      this._s = [].slice.call(el.querySelectorAll(".sarkac"));
      this._e = [].slice.call(el.querySelectorAll(".elektron"));
      this._eh = [].slice.call(el.querySelectorAll(".elektron-hale"));
      this._emc = el.querySelector(".emc");
      this._kum = [el.querySelector(".kum-ust"), el.querySelector(".kum-alt")];
    },
    kare: function (t) {
      var sn = t / 1000, adim = (CUBUK_X1 - CUBUK_X0) / (SARKAC - 1);
      /* Sarkaç dalgası: i. sarkaç 60 saniyede tam 51+i salınım yapar (T = 60/(51+i) s); boyu T = 2π√(L/g)'den gelir.
         Sarkaçlar bize doğru salınır; hafif yukarıdan baktığımız için derinlik dikey kayma ve büyüklük olarak görünür. */
      for (var i = 0; i < this._s.length; i++) {
        var T = 60 / (51 + i), L = 9.81 * Math.pow(T / TAU, 2) * 1250, th = 0.5 * Math.cos(TAU * sn / T), z = Math.sin(th);
        var px = CUBUK_X0 + i * adim, bx = px, by = CUBUK_Y + Math.cos(th) * L * 0.8 + z * L * 0.42;
        this._s[i].firstChild.setAttribute("d", "M" + px.toFixed(1) + " " + CUBUK_Y + "L" + bx.toFixed(1) + " " + by.toFixed(1));
        this._s[i].lastChild.setAttribute("cx", bx.toFixed(1)); this._s[i].lastChild.setAttribute("cy", by.toFixed(1));
        this._s[i].lastChild.setAttribute("r", (12 * (1 + z * 0.45)).toFixed(2));
      }
      for (var k = 0; k < this._e.length; k++) {
        var a = sn * (2.2 + k * 0.7) + k * 2, ex = (Math.cos(a) * 120).toFixed(1), ey = (Math.sin(a) * 36).toFixed(1);
        this._e[k].setAttribute("cx", ex); this._e[k].setAttribute("cy", ey); this._eh[k].setAttribute("cx", ex); this._eh[k].setAttribute("cy", ey);
      }
      if (this._emc) this._emc.setAttribute("opacity", (0.75 + 0.25 * Math.sin(sn * 1.6)).toFixed(2));
      var f = (sn % 20) / 20;
      if (this._kum[0]) { this._kum[0].setAttribute("transform", "translate(0 " + (f * 50).toFixed(1) + ") scale(" + (1 - f * 0.7).toFixed(3) + ")"); this._kum[1].setAttribute("transform", "translate(0 " + ((1 - f) * 30).toFixed(1) + ") scale(" + (0.3 + f * 0.7).toFixed(3) + " " + (0.3 + f * 0.7).toFixed(3) + ")"); }
    },
    eserler: [
      { x: 59, y: 21, ad: "Sarkaç dalgası", panel:
        "<h3>Klasik mekanik</h3><p>Galileo, küçük salınımlarda bir sarkacın salınım süresinin genliğe değil, ipin boyuna bağlı olduğunu fark etti: <b>T = 2π√(L/g)</b>. Newton 1687'de <i>Principia</i>'da üç hareket yasasını ve evrensel kütleçekimini ortaya koydu: yere düşen elmayı ve Ay'ın yörüngesini aynı yasa açıklıyordu.</p>" +
        "<h4>Bu sahnedeki sarkaç dalgası</h4><p>On beş sarkacın boyları, 60 saniyede sırasıyla tam 51, 52, …, 65 salınım yapacak biçimde ayarlandı (boylar yukarıdaki formülle hesaplanıyor). Aralarındaki faz farkı büyüdükçe dalga, yılan ve kaos görünümleri oluşur; 60 saniyede hepsi yeniden hizaya gelir.</p>" +
        "<div class=\"pn-etiketler\"><span>Klasik mekanik</span><span>Termodinamik</span><span>Elektromanyetizma</span><span>Optik</span><span>Görelilik</span><span>Kuantum mekaniği</span><span>Parçacık fiziği</span><span>Yoğun madde</span><span>Astrofizik</span></div>" },
      { x: 84, y: 49, ad: "Atom", panel:
        "<h3>Kuantum</h3><ul><li><b>1900</b>: Planck, enerjinin paketler (kuantumlar) hâlinde yayıldığını varsaydı.</li><li><b>1905</b>: Einstein fotoelektrik olayını ışık kuantumlarıyla açıkladı.</li><li><b>1913</b>: Bohr'un atom modeli: elektronlar yalnızca belirli enerji düzeylerinde bulunabilir.</li><li><b>1926</b>: Schrödinger dalga denklemi.</li><li><b>1927</b>: Heisenberg belirsizlik ilkesi: Δx · Δp ≥ ħ/2.</li></ul>" +
        "<p>Sahnedeki gezegen benzeri yörüngeler Bohr'un resmidir. Bugünkü kuramda elektronun belirli bir yolu yoktur; yalnızca nerede bulunabileceğine dair bir olasılık bulutu (orbital) vardır.</p>" +
        "<p>Kuantum mekaniği felsefeye de soru sorar: Ölçüm gerçeklikte neyi değiştirir? Kopenhag yorumu, Everett'in çok dünyalı yorumu (1957) ve başkaları hâlâ tartışılıyor.</p>" },
      { x: 47, y: 78, ad: "Prizma", panel:
        "<h3>Işık ve elektromanyetizma</h3><p>Newton, 1660'larda yaptığı prizma deneyleriyle beyaz ışığın renklerin karışımı olduğunu gösterdi (<i>Opticks</i>, 1704): prizma ışığı kırar, her renk farklı açıyla kırıldığı için ayrışır.</p>" +
        "<p>1865'te Maxwell elektrik ve manyetizmayı dört denklemde birleştirdi ve ışığın bir <b>elektromanyetik dalga</b> olduğunu gösterdi. Işığın boşluktaki hızı yaklaşık 299.792 km/s'dir. Gözümüzün gördüğü aralık yaklaşık 380–750 nanometre dalga boyudur; radyo dalgaları, mikrodalgalar, X-ışınları da aynı ailedendir.</p>" },
      { x: 21, y: 60, ad: "E = mc²", panel:
        "<h3>Görelilik</h3><p><b>Özel görelilik (1905)</b>: Işık hızı bütün eylemsiz gözlemciler için aynıdır. Bunun bedeli, zamanın ve uzunluğun gözlemciye göre değişmesidir: hızlı hareket eden saatler yavaş işler. Aynı yıl Einstein kütle ile enerjinin eşdeğer olduğunu gösterdi: <b>E = mc²</b>.</p>" +
        "<p><b>Genel görelilik (1915)</b>: Kütleçekimi bir kuvvet değil, kütlenin eğdiği uzay-zamanın geometrisidir. 1919'da Eddington'ın gözlemleri, Güneş'in yakınından geçen yıldız ışığının bükülmesini doğruladı.</p>" +
        "<p>GPS uydularındaki saatler her gün, iki kuramın etkileri toplamında yerdeki saatlere göre yaklaşık 38 mikrosaniye ileri gider. Bu düzeltme yapılmasaydı konum hataları günde kilometrelerce birikirdi.</p>" },
      { x: 81, y: 78, ad: "Kum saati", panel:
        "<h3>Termodinamik ve zamanın oku</h3><ul><li><b>Birinci yasa</b>: Enerji yoktan var edilemez, var olan yok edilemez; yalnızca biçim değiştirir.</li><li><b>İkinci yasa</b>: Yalıtılmış bir sistemin <b>entropisi</b> (düzensizliği) azalmaz. Terimi Clausius 1865'te önerdi.</li><li><b>Mutlak sıfır</b>: −273,15 °C; ulaşılamayan en düşük sıcaklık.</li></ul>" +
        "<p>Boltzmann entropiyi olasılıkla bağladı: <b>S = k log W</b>. Bu denklem Viyana'daki mezar taşında yazılıdır.</p><p>Kum saatinde kum hep aşağı akar, hiç kendiliğinden yukarı çıkmaz. Fiziğin temel yasalarının çoğu zamanda ileri ve geri simetrikken, geçmişi gelecekten ayıran “zamanın oku”nun kaynağı bu entropi artışı olabilir.</p>" }
    ]
  });
})();
