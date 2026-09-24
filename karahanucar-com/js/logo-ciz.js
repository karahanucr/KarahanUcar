/* Hakkında › portre kilit taşındaki logo kendini çizer. Sıra: tepeden sol hilal aşağı iner; kalem ucu alttan sağa geçer (bir şey çizmeden);
   sağ hilal yukarı çıkıp içeri kıvrılır; gövde aşağı iner; en son alttaki taban işareti soldan sağa tamamlanır.
   Logo biçimi değişmez: her parça (sol hilal, sağ hilal, gövde+taban) yalnızca kendi maskesiyle adım adım açılır. */
(function () {
  var svg = document.querySelector(".logo-ciz");
  if (!svg) return;
  var uc = svg.querySelector(".lc-uc");
  var yollar = [].slice.call(svg.querySelectorAll(".lc-yollar path")).map(function (p) {
    return { id: p.dataset.seg, yol: p, L: p.getTotalLength(), kalem: svg.querySelector('.lc-kalem[data-seg="' + p.dataset.seg + '"]') };
  });
  var TOP = yollar.reduce(function (t, y) { return t + y.L; }, 0);
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, calisiyor = false;
  yollar.forEach(function (y) { if (y.kalem) y.kalem.style.strokeDasharray = y.L.toFixed(1); });
  function goster(p) {
    var kalan = TOP * p, uj = null;
    yollar.forEach(function (y) {
      var q = Math.max(0, Math.min(1, kalan / y.L));
      if (y.kalem) y.kalem.style.strokeDashoffset = (y.L * (1 - q)).toFixed(1);
      if (kalan > 0 && (kalan <= y.L || !uj)) uj = y.yol.getPointAtLength(Math.min(kalan, y.L));
      kalan -= y.L;
    });
    if (uj) { uc.setAttribute("cx", uj.x.toFixed(1)); uc.setAttribute("cy", uj.y.toFixed(1)); }
    uc.style.opacity = p <= 0 || p >= 1 ? 0 : Math.min(1, p * 14, (1 - p) * 14).toFixed(2);
  }
  function ciz() {
    if (calisiyor) return;
    calisiyor = true; svg.classList.remove("bitti");
    var t0 = null, sure = 4200;
    (function kare(t) {
      if (t0 === null) t0 = t;
      var x = Math.min(1, (t - t0) / sure), p = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      goster(p);
      if (x < 1) requestAnimationFrame(kare); else { calisiyor = false; svg.classList.add("bitti"); }
    })(performance.now());
  }
  if (azalt || !("IntersectionObserver" in window)) { goster(1); svg.classList.add("bitti"); return; }
  goster(0);
  var io = new IntersectionObserver(function (g) { if (g[0].isIntersecting) { io.disconnect(); setTimeout(ciz, 350); } }, { threshold: 0.6 });
  io.observe(svg);
  var kilit = svg.closest(".portre-kilit");
  if (kilit) kilit.addEventListener("pointerenter", function () { if (svg.classList.contains("bitti")) ciz(); });
})();
