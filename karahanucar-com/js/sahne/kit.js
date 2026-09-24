/* Sahne kiti: yeni odaları hızlı ama aynı dilde kurmak için hazır çizim parçaları (SVG metni döndürür).
   Kullanım: var K = SAHNE.kit; arka: function () { return h.svg(K.gokGece("xyz") + K.tepe(620, "#1a2418", 7) + …, K.defs("xyz")); }
   Kimlik öneki (on) her sahnede farklı olmalı ki gradyan kimlikleri çakışmasın. Sınıflar css/sahne.css'teki hazır animasyonları kullanır
   (yp pırıltı, yuz yüzme, sallan, asili, don, alev/hale, bulut, pencere-isik, dalga-x). */
(function () {
  var S = window.SAHNE; if (!S) return;
  var h = S.h;
  function f(n) { return (+n).toFixed(1); }
  var K = {
    /* Gökler: gece (yıldızlı), alacakaranlık, gündüz (bulutlu) */
    gokGece: function (on, genis) {
      var W = 1600 * (genis || 1);
      return '<defs><linearGradient id="' + on + 'Gk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#060a14"/><stop offset=".55" stop-color="#16213a"/><stop offset="1" stop-color="#2c3a58"/></linearGradient></defs>' +
        '<rect width="' + W + '" height="900" fill="url(#' + on + 'Gk)"/>' + h.yildizlar(Math.round(140 * (genis || 1)), on.length * 31, 0, 0, W, 520);
    },
    gokAksam: function (on, genis) {
      var W = 1600 * (genis || 1);
      return '<defs><linearGradient id="' + on + 'Ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1a1430"/><stop offset=".45" stop-color="#4a2a4a"/><stop offset=".75" stop-color="#c0603a"/><stop offset="1" stop-color="#f0a860"/></linearGradient></defs>' +
        '<rect width="' + W + '" height="900" fill="url(#' + on + 'Ga)"/>' + h.yildizlar(Math.round(50 * (genis || 1)), on.length * 17, 0, 0, W, 260, "#fff4dc");
    },
    gokGun: function (on, genis) {
      var W = 1600 * (genis || 1);
      return '<defs><linearGradient id="' + on + 'Gg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5f93c8"/><stop offset=".6" stop-color="#a9cde6"/><stop offset="1" stop-color="#f1e2c4"/></linearGradient></defs>' +
        '<rect width="' + W + '" height="900" fill="url(#' + on + 'Gg)"/>' + h.bulut(260, 150, 1.1, 190, 30) + h.bulut(900, 110, .8, 230, 110) + h.bulut(1350, 220, 1, 210, 70);
    },
    ay: function (x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 3) + '" fill="#e8f0ff" opacity=".06"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#f4f6ff"/><circle cx="' + (x + r * 0.35) + '" cy="' + (y - r * 0.2) + '" r="' + r * 0.9 + '" fill="#e4e9f6" opacity=".35"/>'; },
    gunes: function (x, y, r, renk) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r * 2.6 + '" fill="' + (renk || "#ffd890") + '" opacity=".18" class="hale"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (renk || "#ffe6a8") + '"/>'; },
    /* Dalgalı tepe sırası (y: taban çizgisi) */
    tepe: function (y, renk, tohum, genlik, genis) {
      var r = h.rnd(tohum || 3), W = 1600 * (genis || 1), g = genlik || 60, d = "M0 900V" + y;
      for (var x = 0; x <= W; x += 200) d += "Q" + f(x + 100) + " " + f(y - g * (0.4 + r())) + " " + f(x + 200) + " " + f(y - g * 0.3 * r());
      return '<path d="' + d + "V900Z" + '" fill="' + renk + '"/>';
    },
    zemin: function (on, y, r1, r2, genis) {
      return '<defs><linearGradient id="' + on + 'Z" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + r1 + '"/><stop offset="1" stop-color="' + r2 + '"/></linearGradient></defs><rect y="' + y + '" width="' + 1600 * (genis || 1) + '" height="' + (900 - y) + '" fill="url(#' + on + 'Z)"/>';
    },
    /* İç mekân duvarı: ahşap/taş tonlu gradyan + ince panel çizgileri */
    duvar: function (on, r1, r2, genis) {
      var W = 1600 * (genis || 1), s = '<defs><linearGradient id="' + on + 'D" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + r1 + '"/><stop offset="1" stop-color="' + r2 + '"/></linearGradient><radialGradient id="' + on + 'Dl" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient></defs>' +
        '<rect width="' + W + '" height="900" fill="url(#' + on + 'D)"/>';
      for (var x = 0; x < W; x += 160) s += '<path d="M' + x + ' 0V900" stroke="rgba(0,0,0,.18)" stroke-width="2"/>';
      return s + '<rect width="' + W + '" height="900" fill="url(#' + on + 'Dl)"/>';
    },
    /* Kemerli pencere (gece ya da gün), içinde gök ve istenirse ay */
    pencere: function (x, y, w, hh, gece) {
      var r = w / 2, id = "pn" + x + y;
      return '<defs><linearGradient id="' + id + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + (gece ? "#0a1426" : "#8fc0e6") + '"/><stop offset="1" stop-color="' + (gece ? "#2a3a5a" : "#f0e0c0") + '"/></linearGradient></defs>' +
        '<path d="M' + x + " " + (y + hh) + "V" + (y + r) + "A" + r + " " + r + " 0 0 1 " + (x + w) + " " + (y + r) + "V" + (y + hh) + 'Z" fill="url(#' + id + ')" stroke="#3a2616" stroke-width="14"/>' +
        (gece ? h.yildizlar(14, x + y, x + 10, y + 10, x + w - 10, y + hh * 0.7) : "") +
        '<path d="M' + (x + w / 2) + " " + y + "V" + (y + hh) + "M" + x + " " + (y + hh * 0.55) + "H" + (x + w) + '" stroke="#3a2616" stroke-width="6"/>';
    },
    /* Kitaplık duvarı: raflar ve renkli kitap sırtları */
    raf: function (x, y, w, hh, tohum, kat) {
      var r = h.rnd(tohum || 5), n = kat || 4, rh = hh / n, s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="#2a1a10"/>', R = ["#5c2b25", "#2b3a52", "#2f4533", "#5b4521", "#4a2a3d", "#284543", "#6a3a1e", "#3a2a4a"];
      for (var k = 0; k < n; k++) {
        var yy = y + (k + 1) * rh, xx = x + 6;
        while (xx < x + w - 10) { var bw = 8 + r() * 12, bh = rh * (0.6 + r() * 0.32); if (xx + bw > x + w - 6) break;
          s += '<rect x="' + f(xx) + '" y="' + f(yy - bh - 6) + '" width="' + f(bw) + '" height="' + f(bh) + '" fill="' + R[Math.floor(r() * R.length)] + '"/><path d="M' + f(xx + 1) + " " + f(yy - bh + 4) + "h" + f(bw - 2) + '" stroke="#d9b25e" stroke-width="1" opacity=".5"/>';
          xx += bw + 1 + (r() < 0.1 ? 10 : 0); }
        s += '<rect x="' + x + '" y="' + f(yy - 6) + '" width="' + w + '" height="8" fill="#5a3a22"/>';
      }
      return s + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="none" stroke="#3a2616" stroke-width="10"/>';
    },
    masa: function (x, y, w, renk) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="18" rx="3" fill="' + (renk || "#5a3a22") + '"/><rect x="' + (x + 20) + '" y="' + (y + 18) + '" width="14" height="' + (900 - y) + '" fill="#3a2414"/><rect x="' + (x + w - 34) + '" y="' + (y + 18) + '" width="14" height="' + (900 - y) + '" fill="#3a2414"/>'; },
    mum: function (x, y, o) { o = o || 1; return '<g transform="translate(' + x + " " + y + ") scale(" + o + ')"><rect x="-7" y="-46" width="14" height="46" rx="3" fill="#efe2c2"/><rect x="-12" y="-4" width="24" height="6" rx="2" fill="#a8782a"/></g>' + h.alev(x, y - 46 * o, 0.28 * o, Math.random()); },
    kagit: function (x, y, w, hh, don) { var s = '<g transform="rotate(' + (don || 0) + " " + x + " " + y + ')"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="#efe2c2"/>'; for (var yy = y + 14; yy < y + hh - 8; yy += 10) s += '<path d="M' + (x + 10) + " " + yy + "h" + (w - 20 - (yy % 3) * 10) + '" stroke="#8a7a5a" stroke-width="1.4" opacity=".5"/>'; return s + "</g>"; },
    kitaplar: function (x, y, n, tohum) { var r = h.rnd(tohum || 9), s = "", R = ["#5c2b25", "#2b3a52", "#2f4533", "#5b4521", "#4a2a3d"]; for (var i = 0; i < n; i++) { var w = 70 + r() * 40, hh = 12 + r() * 6; y -= hh; s += '<rect x="' + f(x - w / 2 + (r() - 0.5) * 14) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(hh) + '" rx="2" fill="' + R[i % R.length] + '"/>'; } return s; },
    /* Klasik sütun ve tapınak cephesi */
    sutun: function (x, y, hh, w, renk) { renk = renk || "#e8dcc4"; var s = '<rect x="' + (x - w / 2 - 8) + '" y="' + (y - 16) + '" width="' + (w + 16) + '" height="16" fill="' + renk + '"/><rect x="' + (x - w / 2) + '" y="' + (y - hh) + '" width="' + w + '" height="' + (hh - 16) + '" fill="' + renk + '"/>'; for (var k = 1; k < 4; k++) s += '<path d="M' + f(x - w / 2 + k * w / 4) + " " + (y - hh + 4) + "V" + (y - 20) + '" stroke="rgba(0,0,0,.14)" stroke-width="2"/>'; return s + '<rect x="' + (x - w / 2 - 10) + '" y="' + (y - hh - 14) + '" width="' + (w + 20) + '" height="14" fill="' + renk + '"/>'; },
    tapinak: function (x, y, w, hh, renk) { renk = renk || "#e8dcc4"; var n = Math.max(4, Math.round(w / 90)), s = ""; for (var i = 0; i < n; i++) s += K.sutun(x + 30 + i * (w - 60) / (n - 1), y, hh, 34, renk); return s + '<rect x="' + (x - 10) + '" y="' + (y - hh - 40) + '" width="' + (w + 20) + '" height="28" fill="' + renk + '"/><path d="M' + (x - 20) + " " + (y - hh - 40) + "L" + (x + w / 2) + " " + (y - hh - 120) + "L" + (x + w + 20) + " " + (y - hh - 40) + 'Z" fill="' + renk + '"/><rect x="' + (x - 30) + '" y="' + y + '" width="' + (w + 60) + '" height="14" fill="' + renk + '"/>'; },
    /* Ağaç: gövde + yaprak kümeleri (rüzgârda hafifçe sallanır) */
    agac: function (x, y, o, renk, tohum) {
      var r = h.rnd(tohum || 11); o = o || 1; renk = renk || "#2f4a2a";
      var s = '<g class="sallan" style="--a:1deg;--s:' + (5 + r() * 3).toFixed(1) + 's"><path d="M' + (x - 10 * o) + " " + y + "C" + (x - 6 * o) + " " + (y - 80 * o) + " " + (x - 12 * o) + " " + (y - 140 * o) + " " + x + " " + (y - 200 * o) + "C" + (x + 10 * o) + " " + (y - 140 * o) + " " + (x + 8 * o) + " " + (y - 80 * o) + " " + (x + 12 * o) + " " + y + 'Z" fill="#3a2616"/>';
      for (var i = 0; i < 7; i++) s += '<circle cx="' + f(x + (r() - 0.5) * 150 * o) + '" cy="' + f(y - 190 * o - r() * 110 * o) + '" r="' + f((50 + r() * 40) * o) + '" fill="' + renk + '" opacity="' + (0.85 + r() * 0.15).toFixed(2) + '"/>';
      return s + "</g>";
    },
    servi: function (x, y, o) { o = o || 1; return '<g class="sallan" style="--a:.8deg"><path d="M' + x + " " + y + "C" + (x - 26 * o) + " " + (y - 120 * o) + " " + (x - 18 * o) + " " + (y - 230 * o) + " " + x + " " + (y - 300 * o) + "C" + (x + 18 * o) + " " + (y - 230 * o) + " " + (x + 26 * o) + " " + (y - 120 * o) + " " + x + " " + y + 'Z" fill="#1e3322"/></g>'; },
    /* Kapı sanatı (merkez odalarda yörüngede dönen kapılar için, 200×250): kemerli çerçeve + içinde odanın simgesi */
    kapi: function (renk, ic, zemin) {
      return '<svg viewBox="0 0 200 250"><defs><radialGradient id="kk' + renk.slice(1) + '" cy=".55"><stop offset="0" stop-color="' + renk + '" stop-opacity=".45"/><stop offset="1" stop-color="' + (zemin || "#120c08") + '"/></radialGradient></defs>' +
        '<path d="M14 246V104C14 54 52 14 100 14C148 14 186 54 186 104V246Z" fill="url(#kk' + renk.slice(1) + ')" stroke="' + renk + '" stroke-width="3"/>' +
        '<path d="M28 246V108C28 64 60 30 100 30C140 30 172 64 172 108V246" fill="none" stroke="' + renk + '" stroke-width="1" opacity=".45"/>' +
        '<g transform="translate(100 140)">' + ic + "</g></svg>";
    }
  };
  S.kit = K;
})();
