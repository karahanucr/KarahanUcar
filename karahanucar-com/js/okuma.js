/* Adım adım okumalar karuseli: .okuma-serit içindeki her .card.okuma bir sayfa.
   7 sn'de bir kendiliğinden geçer; üzerine gelince/odaklanınca durur; sağ alttaki ‹ › ile elle gezilir,
   ❚❚ ile otomatik geçiş tamamen durdurulur (WCAG 2.2.2). Tek okuma varsa geçiş yapılmaz. */
(function () {
  var kok = document.querySelector(".okuma-karusel");
  if (!kok) return;
  var ogeler = [].slice.call(kok.querySelectorAll(".okuma-serit > .okuma"));
  var sayac = kok.querySelector(".okuma-sayac"), geri = kok.querySelector(".okuma-geri"),
      ileri = kok.querySelector(".okuma-ileri"), dur = kok.querySelector(".okuma-dur");
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SURE = 7000, i = 0, zaman = 0, durduruldu = azalt, uzerinde = false;
  var n = ogeler.length;

  function goster(yeni) {
    i = (yeni + n) % n;
    ogeler.forEach(function (o, k) {
      var aktif = k === i;
      o.classList.toggle("aktif", aktif);
      o.setAttribute("aria-hidden", aktif ? "false" : "true");
      o.querySelectorAll("a, button").forEach(function (a) { a.tabIndex = aktif ? 0 : -1; });
    });
    if (sayac) sayac.textContent = (i + 1) + " / " + n;
  }
  function kur() {
    clearTimeout(zaman);
    if (n > 1 && !durduruldu && !uzerinde && !document.hidden) zaman = setTimeout(function () { goster(i + 1); kur(); }, SURE);
  }

  kok.classList.toggle("tek", n < 2);
  [geri, ileri, dur].forEach(function (b) { if (b) b.disabled = n < 2; });
  if (dur) {
    dur.setAttribute("aria-pressed", String(durduruldu));
    dur.textContent = durduruldu ? "▶" : "❚❚";
    dur.setAttribute("aria-label", durduruldu ? "Otomatik geçişi başlat" : "Otomatik geçişi durdur");
    dur.addEventListener("click", function () {
      durduruldu = !durduruldu;
      dur.setAttribute("aria-pressed", String(durduruldu));
      dur.textContent = durduruldu ? "▶" : "❚❚";
      dur.setAttribute("aria-label", durduruldu ? "Otomatik geçişi başlat" : "Otomatik geçişi durdur");
      kur();
    });
  }
  if (geri) geri.addEventListener("click", function () { goster(i - 1); kur(); });
  if (ileri) ileri.addEventListener("click", function () { goster(i + 1); kur(); });
  kok.addEventListener("mouseenter", function () { uzerinde = true; kur(); });
  kok.addEventListener("mouseleave", function () { uzerinde = false; kur(); });
  kok.addEventListener("focusin", function () { uzerinde = true; kur(); });
  kok.addEventListener("focusout", function (e) { if (!kok.contains(e.relatedTarget)) { uzerinde = false; kur(); } });
  document.addEventListener("visibilitychange", kur);

  goster(0);
  kur();
})();
