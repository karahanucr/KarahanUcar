/* Bilgi bölümü: kitaplıktaki kitaplar ve levhalar sahneleri açar; "Son eklenenler" alana göre süzülür ve
   dörtten fazla kayıt görünüyorsa birer birer akar (üzerine gelince/odaklanınca durur, ❚❚ ile tamamen durdurulur).
   Menü: okuma ilerleme çizgisi ve o an okunan bölümün menüde yanması da burada. */
(function () {
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Kitaplık → sahne ── */
  var kitaplik = document.getElementById("kitaplik");
  if (kitaplik) kitaplik.addEventListener("click", function (e) {
    var b = e.target.closest("[data-sahne]");
    if (!b || !window.SAHNE) return;
    var id = b.dataset.sahne;
    if (window.SAHNE.var(id)) window.SAHNE.ac(id, b);
  });

  /* ── Son eklenenler: süzme + akış ── */
  var dizin = document.querySelector(".dizin");
  if (dizin) {
    var GORUNUR = 4, SURE = 5200;
    var kayitlar = [].slice.call(dizin.querySelectorAll(".kayit"));
    var suzler = [].slice.call(document.querySelectorAll(".dizin-suz .suz"));
    var bos = document.querySelector(".dizin-bos"), kontrol = document.querySelector(".dizin-kontrol");
    var sayacEl = kontrol && kontrol.querySelector(".dizin-sayac"), cubuk = kontrol && kontrol.querySelector(".dizin-cubuk i");
    var durBtn = kontrol && kontrol.querySelector(".dizin-dur");
    var alanlar = function (k) { return (k.getAttribute("data-alan") || "").split(/\s+/).filter(Boolean); };
    var sayilan = kayitlar.filter(function (k) { return !k.classList.contains("kayit-yakinda"); });
    var sira = [], bas = 0, zaman = 0, durdu = azalt, uzerinde = false, gecis = false;

    /* Tür simgeleri: küçük, sürekli hareket eden çizimler */
    var SIMGE = {
      okuma: '<path d="M4 8C8 6 12 7 16 9C20 7 24 6 28 8V26C24 24 20 25 16 27C12 25 8 24 4 26Z"/><path d="M16 9V27"/><path class="s-sayfa" d="M16 9C20 7 24 6 28 8V26C24 24 20 25 16 27Z" fill="currentColor" fill-opacity=".18"/>',
      sunum: '<rect x="4" y="6" width="24" height="16" rx="2"/><path d="M16 22V27M11 28H21"/><path class="s-oynat" d="M13 10L20 14L13 18Z" fill="currentColor"/>',
      sahne: '<path d="M8 28V14A8 8 0 0 1 24 14V28Z"/><path class="s-kapi" d="M8 28V14A8 8 0 0 1 24 14V28Z" fill="currentColor" fill-opacity=".25"/><path d="M4 28H28"/>',
      video: '<rect x="4" y="8" width="24" height="16" rx="4"/><path class="s-oynat" d="M13 12L20 16L13 20Z" fill="currentColor"/>',
      ceviri: '<text x="9" y="17" font-size="10" fill="currentColor" stroke="none" font-family="Georgia,serif">A</text><text class="s-cevir" x="18" y="26" font-size="10" fill="currentColor" stroke="none" font-family="Georgia,serif">Ω</text><path d="M14 20L20 12"/>',
      not: '<path d="M8 4H22L26 8V28H8Z"/><path class="s-yaz" d="M12 12H22M12 16H22M12 20H18" pathLength="1"/>',
      yakinda: '<path d="M9 4H23M9 28H23M10 4C10 11 16 13 16 16C16 19 10 21 10 28M22 4C22 11 16 13 16 16C16 19 22 21 22 28"/><path class="s-kum" d="M12 25H20L16 21Z" fill="currentColor"/>'
    };
    kayitlar.forEach(function (k, i) {
      var tur = k.getAttribute("data-tur") || "okuma";
      var s = document.createElement("span");
      s.className = "kayit-simge";
      s.setAttribute("aria-hidden", "true");
      s.innerHTML = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (SIMGE[tur] || SIMGE.okuma) + "</svg>";
      k.insertBefore(s, k.firstChild);
      k.insertAdjacentHTML("beforeend", '<span class="kayit-no" aria-hidden="true" data-sabit></span>');
    });

    suzler.forEach(function (b) {
      var a = b.dataset.alan, n = a === "hepsi" ? sayilan.length : sayilan.filter(function (k) { return alanlar(k).indexOf(a) > -1; }).length;
      var s = b.querySelector(".suz-sayi"); if (s) s.textContent = n;
      b.classList.toggle("bos", n === 0);
    });

    function goster(animasyon) {
      var n = sira.length, cok = n > GORUNUR;
      kayitlar.forEach(function (k) { k.hidden = true; k.classList.remove("belir"); });
      for (var i = 0; i < Math.min(n, GORUNUR); i++) {
        var k = sira[(bas + i) % n];
        dizin.appendChild(k);
        k.hidden = false;
        k.style.setProperty("--sira", i);
        k.querySelector(".kayit-no").textContent = String(((bas + i) % n) + 1).padStart(2, "0");
        if (animasyon) { void k.offsetWidth; k.classList.add("belir"); }
      }
      if (kontrol) {
        kontrol.hidden = !cok;
        if (sayacEl) sayacEl.textContent = (bas + 1) + "–" + ((bas + GORUNUR - 1) % n + 1) + " / " + n;
      }
      if (bos) bos.hidden = n > 0;
    }

    /* Akış: en üstteki kayıt yukarı süzülüp söner, alttan yenisi belirir */
    function kaydir(yon) {
      var n = sira.length;
      if (n <= GORUNUR || gecis) return;
      gecis = true;
      var cikan = yon > 0 ? dizin.querySelector(".kayit:not([hidden])") : [].slice.call(dizin.querySelectorAll(".kayit:not([hidden])")).pop();
      var bitir = function () {
        bas = (bas + yon + n) % n;
        kayitlar.forEach(function (k) { k.hidden = true; });
        for (var i = 0; i < GORUNUR; i++) { var k = sira[(bas + i) % n]; dizin.appendChild(k); k.hidden = false; k.classList.remove("belir"); k.querySelector(".kayit-no").textContent = String(((bas + i) % n) + 1).padStart(2, "0"); }
        var giren = yon > 0 ? sira[(bas + GORUNUR - 1) % n] : sira[bas];
        if (!azalt) giren.animate([{ opacity: 0, transform: "translateY(" + (yon > 0 ? 26 : -26) + "px)", filter: "blur(3px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" });
        if (sayacEl) sayacEl.textContent = (bas + 1) + "–" + ((bas + GORUNUR - 1) % n + 1) + " / " + n;
        gecis = false;
      };
      if (azalt || !cikan) return bitir();
      var a = cikan.animate([{ opacity: 1, transform: "none", maxHeight: cikan.offsetHeight + "px" }, { opacity: 0, transform: "translateY(" + (yon > 0 ? -22 : 22) + "px)", maxHeight: cikan.offsetHeight + "px", offset: 0.55 }, { opacity: 0, transform: "translateY(" + (yon > 0 ? -22 : 22) + "px)", maxHeight: "0px", paddingTop: "0px", paddingBottom: "0px" }], { duration: 700, easing: "cubic-bezier(.5,0,.3,1)" });
      a.onfinish = bitir;
    }
    function kur() {
      clearTimeout(zaman);
      if (cubuk) { cubuk.style.animation = "none"; void cubuk.offsetWidth; cubuk.style.animation = ""; }
      var calis = sira.length > GORUNUR && !durdu && !uzerinde && !document.hidden;
      if (cubuk) cubuk.parentNode.classList.toggle("durdu", !calis);
      if (calis) zaman = setTimeout(function () { kaydir(1); kur(); }, SURE);
    }
    function sec(alan) {
      suzler.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.alan === alan)); });
      sira = kayitlar.filter(function (k) { return alan === "hepsi" || alanlar(k).indexOf(alan) > -1; });
      bas = 0;
      goster(true);
      kur();
    }
    suzler.forEach(function (b) { b.addEventListener("click", function () { sec(b.dataset.alan); }); });
    if (kontrol) {
      kontrol.querySelector(".dizin-ileri").addEventListener("click", function () { kaydir(1); kur(); });
      kontrol.querySelector(".dizin-geri").addEventListener("click", function () { kaydir(-1); kur(); });
      var durYaz = function () { durBtn.setAttribute("aria-pressed", String(durdu)); durBtn.textContent = durdu ? "▶" : "❚❚"; durBtn.setAttribute("aria-label", durdu ? "Akışı başlat" : "Akışı durdur"); };
      durBtn.addEventListener("click", function () { durdu = !durdu; durYaz(); kur(); });
      durYaz();
    }
    var kap = document.querySelector(".dizin-kap") || dizin;
    kap.addEventListener("mouseenter", function () { uzerinde = true; kur(); });
    kap.addEventListener("mouseleave", function () { uzerinde = false; kur(); });
    kap.addEventListener("focusin", function () { uzerinde = true; kur(); });
    kap.addEventListener("focusout", function (e) { if (!kap.contains(e.relatedTarget)) { uzerinde = false; kur(); } });
    document.addEventListener("visibilitychange", kur);
    sec("hepsi");
  }

  /* ── Menü: ilerleme çizgisi ve etkin bölüm ── */
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
