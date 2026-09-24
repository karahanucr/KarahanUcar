/* Kendini çizen logo — Karahan Uçar tasarım dili standardı.
   Sayfadaki her .logo-cizen (içinde logo-cizen.svg.html'deki SVG) görünür olduğunda çizilir; bir sunum slaytındaysa slayt "aktif" olunca yeniden çizilir.
   Sıra: tepeden sol hilal aşağı iner → kalem ucu alttan sağa geçer (bir şey çizmeden, aşağı inmeden) → sağ hilal yukarı çıkıp içeri kıvrılır
   → gövde aşağı iner → en son alttaki taban işareti soldan sağa tamamlanır. Süre 4,2 sn; bitince logo alev gibi titrer (.bitti). */
(function () {
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, sayac = 0;
  function kur(kap) {
    var svg = kap.querySelector("svg"); if (!svg || kap._lc) return; kap._lc = 1;
    var on = "lc" + (++sayac) + "-";
    svg.querySelectorAll("mask[id]").forEach(function (m) { var eski = m.id, yeni = on + eski.replace(/^LC-|^lc-/, ""); m.id = yeni; svg.querySelectorAll('[mask="url(#' + eski + ')"]').forEach(function (p) { p.setAttribute("mask", "url(#" + yeni + ")"); }); });
    var uc = svg.querySelector(".lc-uc");
    var Y = [].slice.call(svg.querySelectorAll(".lc-yollar path")).map(function (p) { return { yol: p, L: p.getTotalLength(), kalem: svg.querySelector('.lc-kalem[data-seg="' + p.dataset.seg + '"]') }; });
    var TOP = Y.reduce(function (a, y) { return a + y.L; }, 0), calis = false;
    Y.forEach(function (y) { if (y.kalem) y.kalem.style.strokeDasharray = y.L.toFixed(1); });
    function goster(p) {
      var kalan = TOP * p, uj = null;
      Y.forEach(function (y) { var q = Math.max(0, Math.min(1, kalan / y.L)); if (y.kalem) y.kalem.style.strokeDashoffset = (y.L * (1 - q)).toFixed(1); if (kalan > 0 && (kalan <= y.L || !uj)) uj = y.yol.getPointAtLength(Math.min(kalan, y.L)); kalan -= y.L; });
      if (uj) { uc.setAttribute("cx", uj.x.toFixed(1)); uc.setAttribute("cy", uj.y.toFixed(1)); }
      uc.style.opacity = p <= 0 || p >= 1 ? 0 : Math.min(1, p * 14, (1 - p) * 14).toFixed(2);
    }
    function ciz() {
      if (azalt) { goster(1); kap.classList.add("bitti"); return; }
      if (calis) return; calis = true; kap.classList.remove("bitti"); goster(0);
      var t0 = null;
      (function kare(t) { if (t0 === null) t0 = t; var x = Math.min(1, (t - t0) / 4200), p = x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; goster(p); if (x < 1) requestAnimationFrame(kare); else { calis = false; kap.classList.add("bitti"); } })(performance.now());
    }
    goster(azalt ? 1 : 0);
    var slayt = kap.closest(".slayt");
    if (slayt) {
      if (slayt.classList.contains("aktif")) setTimeout(ciz, 700);
      new MutationObserver(function () { if (slayt.classList.contains("aktif")) setTimeout(ciz, 500); }).observe(slayt, { attributes: true, attributeFilter: ["class"] });
    } else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (g) { if (g[0].isIntersecting) { io.disconnect(); setTimeout(ciz, 350); } }, { threshold: .6 }); io.observe(kap);
    } else ciz();
    kap.addEventListener("pointerenter", function () { if (kap.classList.contains("bitti")) ciz(); });
  }
  function hepsi() { document.querySelectorAll(".logo-cizen").forEach(kur); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hepsi); else hepsi();
})();
