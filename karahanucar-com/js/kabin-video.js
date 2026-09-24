/* Kabin görselinin canlı hâli: video yalnızca görünür olunca yüklenir ve oynar,
   görünmeyince durur. Yerel dosya yoksa sıradaki kaynağa geçer; hiçbiri açılmazsa durağan görsel kalır. */
(function () {
  var v = document.querySelector(".kabin-video");
  if (!v || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var baglanti = navigator.connection;
  if (baglanti && baglanti.saveData) return;

  var kap = v.parentNode;
  var kaynaklar = (v.getAttribute("data-kaynaklar") || "").split(/\s+/).filter(Boolean);
  var sira = -1, yuklendi = false, gorunur = false;

  function sonraki() {
    sira++;
    if (sira >= kaynaklar.length) { kap.classList.remove("oynuyor"); return; }
    v.src = kaynaklar[sira];
    v.load();
    if (gorunur) oynat();
  }
  function oynat() {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  v.addEventListener("error", sonraki);
  v.addEventListener("playing", function () { kap.classList.add("oynuyor"); });

  new IntersectionObserver(function (girdiler) {
    gorunur = girdiler[0].isIntersecting;
    if (gorunur) {
      if (!yuklendi) { yuklendi = true; sonraki(); } else oynat();
    } else if (yuklendi) v.pause();
  }, { rootMargin: "200px 0px" }).observe(kap);
})();
