/* Kabin görselinin canlı hâli: video yalnızca görünür olunca yüklenir ve oynar,
   görünmeyince durur. Yerel dosya yoksa sıradaki kaynağa geçer; hiçbiri açılmazsa durağan görsel kalır.
   Dikişsiz döngü: videonun ilk karesi alttaki görselle aynıdır. Son saniyede video görsele doğru
   söner, başa sarılır ve görünmez biçimde yeniden başlar. */
(function () {
  var v = document.querySelector(".kabin-video");
  if (!v || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var baglanti = navigator.connection;
  if (baglanti && baglanti.saveData) return;

  var SONUM = 1.1; // saniye: sona bu kadar kala sönmeye başlar
  var kap = v.parentNode;
  var kaynaklar = (v.getAttribute("data-kaynaklar") || "").split(/\s+/).filter(Boolean);
  var sira = -1, yuklendi = false, gorunur = false, kare = 0;

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
  function izle() {
    kare = 0;
    if (v.paused) return;
    if (v.duration && v.currentTime >= v.duration - SONUM) v.classList.add("sonum");
    kare = requestAnimationFrame(izle);
  }
  v.loop = false;
  v.addEventListener("error", sonraki);
  v.addEventListener("playing", function () {
    kap.classList.add("oynuyor");
    if (!kare) kare = requestAnimationFrame(izle);
  });
  v.addEventListener("ended", function () {
    v.currentTime = 0;
    oynat();
  });
  v.addEventListener("seeked", function () {
    if (v.currentTime < 0.5 && v.classList.contains("sonum")) {
      v.classList.remove("sonum");
    }
  });

  new IntersectionObserver(function (girdiler) {
    gorunur = girdiler[0].isIntersecting;
    if (gorunur) {
      if (!yuklendi) { yuklendi = true; sonraki(); } else oynat();
    } else if (yuklendi) v.pause();
  }, { rootMargin: "200px 0px" }).observe(kap);
})();
