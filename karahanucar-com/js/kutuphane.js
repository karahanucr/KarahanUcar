/* Kütüphane rafı ve dizin: her cilt bir alan; ciltteki sayı .dizin içindeki kayıtlardan sayılır.
   Cilde basınca dizin o alana süzülür, aynı cilde ya da "Tümü"ne basınca hepsi döner.
   Menü: okuma ilerleme çizgisi ve o an okunan bölümün menüde yanması da burada. */
(function () {
  var raf = document.querySelector(".raf"), dizin = document.querySelector(".dizin");
  if (raf && dizin) {
    var ciltler = [].slice.call(raf.querySelectorAll(".cilt"));
    var kayitlar = [].slice.call(dizin.querySelectorAll(".kayit"));
    var bos = document.querySelector(".dizin-bos");
    var alanlar = function (k) { return (k.getAttribute("data-alan") || "").split(/\s+/).filter(Boolean); };
    var sayilan = kayitlar.filter(function (k) { return !k.classList.contains("kayit-yakinda"); });

    ciltler.forEach(function (c) {
      var a = c.dataset.alan;
      var n = a === "hepsi" ? sayilan.length : sayilan.filter(function (k) { return alanlar(k).indexOf(a) > -1; }).length;
      var s = c.querySelector(".cilt-sayi");
      if (s) s.textContent = n;
      c.classList.toggle("bos", n === 0);
    });

    var sec = function (alan) {
      ciltler.forEach(function (c) { if (!c.dataset.sahne) c.setAttribute("aria-pressed", String(c.dataset.alan === alan)); });
      var gorunen = 0;
      kayitlar.forEach(function (k, i) {
        var uygun = alan === "hepsi" || alanlar(k).indexOf(alan) > -1;
        k.hidden = !uygun;
        if (uygun) {
          gorunen++;
          k.classList.remove("belir"); void k.offsetWidth; k.classList.add("belir");
          k.style.setProperty("--sira", gorunen - 1);
        }
      });
      if (bos) bos.hidden = gorunen > 0;
    };
    ciltler.forEach(function (c) {
      c.addEventListener("click", function () {
        if (c.dataset.sahne && window.SAHNE && window.SAHNE.var(c.dataset.sahne)) { window.SAHNE.ac(c.dataset.sahne, c); return; }
        var zaten = c.getAttribute("aria-pressed") === "true";
        sec(zaten ? "hepsi" : c.dataset.alan);
      });
    });
  }

  var ilerleme = document.querySelector(".ilerleme");
  var baglar = [].slice.call(document.querySelectorAll(".top nav > a[href^='#']"));
  var bolumler = baglar.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  var bekliyor = false;
  function guncelle() {
    bekliyor = false;
    var el = document.documentElement, max = el.scrollHeight - el.clientHeight;
    if (ilerleme) ilerleme.style.transform = "scaleX(" + (max > 0 ? Math.min(1, el.scrollTop / max) : 0).toFixed(4) + ")";
    var cizgi = window.innerHeight * 0.35, etkin = -1;
    bolumler.forEach(function (b, i) { if (b && b.getBoundingClientRect().top <= cizgi) etkin = i; });
    baglar.forEach(function (a, i) {
      var evet = i === etkin;
      a.classList.toggle("etkin", evet);
      if (evet) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", function () { if (!bekliyor) { bekliyor = true; requestAnimationFrame(guncelle); } }, { passive: true });
  window.addEventListener("resize", guncelle);
  guncelle();
})();
