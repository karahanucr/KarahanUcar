/* V. Randevu: "Randevu al" düğmesi sayfanın içinde Google Takvim randevu sayfasını açar.
   Google'ın kendi randevu akışı (hafta · saatler → ad, soyad, e-posta → Randevu al) iframe içinde çalışır; randevu doğrudan takvime işlenir.
   Takvim, YouTube gibi, yalnızca ziyaretçi düğmeye basınca yüklenir (önceden hiçbir Google bağlantısı kurulmaz). */
(function () {
  var bolum = document.getElementById("randevu");
  if (!bolum) return;
  var ac = bolum.querySelector(".randevu-ac"), kutu = bolum.querySelector(".randevu-takvim");
  if (!ac || !kutu) return;
  var cerceve = kutu.querySelector(".rt-cerceve"), yuklendi = false;
  function t(s) { var D = window.DILLER, l = document.documentElement.lang; return (D && D[l] && D[l][s]) || s; }
  /* Gömme adresi: data-gomme (…/appointments/schedules/…) varsa o; yoksa paylaşım bağlantısı ?gv=true ile denenir */
  function adres() {
    var g = (bolum.getAttribute("data-gomme") || "").trim();
    if (g) return g + (g.indexOf("gv=true") > -1 ? "" : (g.indexOf("?") > -1 ? "&" : "?") + "gv=true");
    return ac.href.split("?")[0] + "?gv=true";
  }
  function yukle() {
    if (yuklendi) return;
    yuklendi = true;
    var f = document.createElement("iframe");
    f.src = adres();
    f.title = t("Randevu takvimi");
    f.setAttribute("loading", "eager");
    f.addEventListener("load", function () { cerceve.classList.add("hazir"); });
    cerceve.appendChild(f);
  }
  function goster(acik) {
    kutu.hidden = !acik;
    ac.setAttribute("aria-expanded", String(acik));
    if (acik) {
      yukle();
      requestAnimationFrame(function () { kutu.classList.add("acik"); });
      setTimeout(function () { kutu.scrollIntoView({ behavior: "smooth", block: "start" }); }, 120);
    } else kutu.classList.remove("acik");
  }
  ac.addEventListener("click", function (e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return; /* yeni sekme isteyene engel olma */
    e.preventDefault();
    goster(kutu.hidden);
  });
  kutu.querySelector(".rt-kapat").addEventListener("click", function () { goster(false); ac.focus(); });
  /* Menüden ya da kahramandaki "Randevu al →" bağlantısından gelince takvim kendiliğinden açılsın */
  if (location.hash === "#randevu-ac") setTimeout(function () { goster(true); }, 600);
  document.querySelectorAll('a.button[href="#randevu"]').forEach(function (b) { b.addEventListener("click", function () { if (kutu.hidden) setTimeout(function () { goster(true); }, 700); }); });
})();
