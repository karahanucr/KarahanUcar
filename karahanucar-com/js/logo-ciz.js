/* Hakkında › portre kilit taşındaki logo kendini çizer: tepeden başlar, sol aşağı iner, sağa geçer, sağ yukarı çıkar,
   içeri kıvrılır ve gövdeden aşağı inerek tamamlanır. Logo biçimi değişmez; yalnızca bir maske (kalem) onu adım adım açar. */
(function () {
  var svg = document.querySelector(".logo-ciz");
  if (!svg) return;
  var kalem = svg.querySelector(".lc-kalem"), uc = svg.querySelector(".lc-uc");
  var L = kalem.getTotalLength();
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var calisiyor = false;
  function goster(p) {
    kalem.style.strokeDashoffset = (L * (1 - p)).toFixed(1);
    var q = kalem.getPointAtLength(L * p);
    uc.setAttribute("cx", q.x.toFixed(1)); uc.setAttribute("cy", q.y.toFixed(1));
    uc.style.opacity = p <= 0 || p >= 1 ? 0 : Math.min(1, p * 12, (1 - p) * 12).toFixed(2);
  }
  function ciz() {
    if (calisiyor) return;
    calisiyor = true; svg.classList.remove("bitti");
    var t0 = null, sure = 3600;
    (function kare(t) {
      if (t0 === null) t0 = t;
      var x = Math.min(1, (t - t0) / sure), p = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      goster(p);
      if (x < 1) requestAnimationFrame(kare); else { calisiyor = false; svg.classList.add("bitti"); }
    })(performance.now());
  }
  kalem.style.strokeDasharray = L.toFixed(1);
  if (azalt || !("IntersectionObserver" in window)) { goster(1); svg.classList.add("bitti"); return; }
  goster(0);
  var io = new IntersectionObserver(function (g) { if (g[0].isIntersecting) { io.disconnect(); setTimeout(ciz, 350); } }, { threshold: 0.6 });
  io.observe(svg);
  /* kilit taşına dokununca ya da üzerine gelince yeniden çizilir */
  var kilit = svg.closest(".portre-kilit");
  if (kilit) { kilit.addEventListener("pointerenter", function () { if (svg.classList.contains("bitti")) ciz(); }); }
})();
