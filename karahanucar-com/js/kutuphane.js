/* Bilgi, Yayınlar ve Kanal listeleri (js/icerik.js kurar):
   · Akış: dörtten fazla kayıt görünüyorsa sabit yükseklikli bir pencerenin içinde birer birer yukarı kayar
     (sayfa düzeni kıpırdamaz; üzerine gelince/odaklanınca durur, ❚❚ ile tamamen durdurulur).
   · Bilgi: alan süzgeçleri; video → Kanal ekranı, belge → Yayınlar'daki kaydı açar.
   · Kanal: seçilen video ekranda oynar (YouTube yalnız "İzle"ye basınca yüklenir).
   Kitaplık tıklaması ve menünün ilerleme çizgisi de burada. */
(function () {
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function t(s) { var l = document.documentElement.lang, D = window.DILLER && window.DILLER[l === "grc" ? "el" : l]; return (D && D[s]) || s; }

  /* ── Kitaplık → sahne (içeriği olmayan kitapların data-sahne'si yoktur, tıklanmaz) ── */
  var kitaplik = document.getElementById("kitaplik");
  if (kitaplik) kitaplik.addEventListener("click", function (e) {
    var b = e.target.closest("[data-sahne]");
    if (!b || !window.SAHNE) return;
    var id = b.dataset.sahne;
    if (window.SAHNE.var(id)) window.SAHNE.ac(id, b);
  });

  /* Tür simgeleri: küçük, sürekli hareket eden çizimler */
  var S = {
    okuma: '<path d="M4 8C8 6 12 7 16 9C20 7 24 6 28 8V26C24 24 20 25 16 27C12 25 8 24 4 26Z"/><path d="M16 9V27"/><path class="s-sayfa" d="M16 9C20 7 24 6 28 8V26C24 24 20 25 16 27Z" fill="currentColor" fill-opacity=".18"/>',
    sunum: '<rect x="4" y="6" width="24" height="16" rx="2"/><path d="M16 22V27M11 28H21"/><path class="s-oynat" d="M13 10L20 14L13 18Z" fill="currentColor"/>',
    kursu: '<path d="M10 14H22L20 28H12Z"/><path d="M8 14H24"/><circle class="s-oynat" cx="16" cy="7" r="3" fill="currentColor"/><path d="M16 14V10" />',
    belge: '<path d="M8 4H20L25 9V28H8Z"/><path d="M20 4V9H25"/><path class="s-yaz" d="M12 14H21M12 18H21M12 22H18" pathLength="1"/>',
    sahne: '<path d="M8 28V14A8 8 0 0 1 24 14V28Z"/><path class="s-kapi" d="M8 28V14A8 8 0 0 1 24 14V28Z" fill="currentColor" fill-opacity=".25"/><path d="M4 28H28"/>',
    video: '<rect x="4" y="8" width="24" height="16" rx="4"/><path class="s-oynat" d="M13 12L20 16L13 20Z" fill="currentColor"/>',
    ceviri: '<text x="9" y="17" font-size="10" fill="currentColor" stroke="none" font-family="Georgia,serif">A</text><text class="s-cevir" x="18" y="26" font-size="10" fill="currentColor" stroke="none" font-family="Georgia,serif">Ω</text><path d="M14 20L20 12"/>',
    not: '<path d="M8 4H22L26 8V28H8Z"/><path class="s-yaz" d="M12 12H22M12 16H22M12 20H18" pathLength="1"/>',
    proje: '<circle cx="16" cy="16" r="6"/><g class="s-don">' + [0, 60, 120, 180, 240, 300].map(function (a) { return '<path d="M16 5V8" transform="rotate(' + a + ' 16 16)"/>'; }).join("") + "</g>",
    yakinda: '<path d="M9 4H23M9 28H23M10 4C10 11 16 13 16 16C16 19 10 21 10 28M22 4C22 11 16 13 16 16C16 19 22 21 22 28"/><path class="s-kum" d="M12 25H20L16 21Z" fill="currentColor"/>'
  };
  var SIMGE_TUR = { okuma: "okuma", sunum: "sunum", seminer: "kursu", konferans: "kursu", sempozyum: "kursu", calistay: "kursu", bildiri: "kursu",
    makale: "belge", kitap: "okuma", tezler: "belge", poster: "belge", izlence: "not", notlar: "not", alistirma: "not", odevler: "not",
    ceviri: "ceviri", video: "video", sahne: "sahne", proje: "proje", yakinda: "yakinda" };
  function simge(tur) {
    return '<span class="kayit-simge" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (S[SIMGE_TUR[tur]] || S.not) + "</svg></span>";
  }

  /* ── Akış penceresi ── */
  function Akis(kap, ayar) {
    var GORUNUR = 4, SURE = 5200;
    var pencere = kap.querySelector(".akis-pencere"), liste = kap.querySelector(".akis-liste");
    if (!liste) return null;
    var kayitlar = [].slice.call(liste.children);
    var kontrol = kap.querySelector(".dizin-kontrol"), sayacEl = kontrol && kontrol.querySelector(".dizin-sayac"), cubuk = kontrol && kontrol.querySelector(".dizin-cubuk i"), durBtn = kontrol && kontrol.querySelector(".dizin-dur");
    var sira = kayitlar.slice(), bas = 0, zaman = 0, durdu = azalt, uzerinde = false, gecis = false, acikVar = false;
    kayitlar.forEach(function (k) {
      if (ayar.simge !== false) k.insertBefore(document.createRange().createContextualFragment(simge(k.getAttribute("data-tur") || "okuma")), k.firstChild);
      k.insertAdjacentHTML("beforeend", '<span class="kayit-no" aria-hidden="true" data-sabit></span>');
    });

    /* Bütün kayıtlar aynı yükseklikte: pencere hep GORUNUR × satır kadar; kayarken altındaki denetim ve sayfa oynamaz */
    function olc() {
      if (acikVar) return;
      liste.style.removeProperty("--kh");
      var eski = kayitlar.map(function (k) { return k.hidden; }), en = 0;
      kayitlar.forEach(function (k) { k.hidden = false; k.style.height = "auto"; });
      kayitlar.forEach(function (k) { en = Math.max(en, k.getBoundingClientRect().height); });
      kayitlar.forEach(function (k, i) { k.hidden = eski[i]; k.style.height = ""; });
      liste.style.setProperty("--kh", Math.ceil(en) + "px");
      pencere.style.height = acikVar ? "" : Math.ceil(en) * Math.min(GORUNUR, sira.length) + "px";
    }
    function numara(k, i) { k.querySelector(".kayit-no").textContent = String(i + 1).padStart(2, "0"); }
    function yaz() {
      var n = sira.length;
      if (sayacEl) sayacEl.textContent = (bas + 1) + "–" + ((bas + GORUNUR - 1) % n + 1) + " / " + n;
    }
    function goster(animasyon) {
      var n = sira.length, cok = n > GORUNUR;
      kayitlar.forEach(function (k) { k.hidden = true; k.classList.remove("belir"); });
      for (var i = 0; i < Math.min(n, GORUNUR); i++) {
        var k = sira[(bas + i) % n];
        liste.appendChild(k); k.hidden = false; k.style.setProperty("--sira", i); numara(k, (bas + i) % n);
        if (animasyon && !azalt) { void k.offsetWidth; k.classList.add("belir"); }
      }
      if (kontrol) { kontrol.hidden = !cok; yaz(); }
      if (ayar.bos) ayar.bos.hidden = n > 0;
      olc();
    }
    function kaydir(yon) {
      var n = sira.length;
      if (n <= GORUNUR || gecis || acikVar) return;
      gecis = true;
      var kh = parseFloat(liste.style.getPropertyValue("--kh")) || 100;
      var bitir = function () {
        bas = (bas + yon + n) % n;
        kayitlar.forEach(function (k) { k.hidden = true; });
        for (var i = 0; i < GORUNUR; i++) { var k = sira[(bas + i) % n]; liste.appendChild(k); k.hidden = false; k.classList.remove("belir"); numara(k, (bas + i) % n); }
        liste.style.transform = "";
        yaz(); gecis = false;
      };
      if (azalt) return bitir();
      /* sıradaki kaydı pencerenin dışına (alta ya da üste) ekle, bütün şeridi bir satır kaydır */
      var giren = sira[yon > 0 ? (bas + GORUNUR) % n : (bas - 1 + n) % n];
      var cikan = yon > 0 ? sira[bas] : sira[(bas + GORUNUR - 1) % n];
      giren.hidden = false; numara(giren, sira.indexOf(giren));
      if (yon > 0) liste.appendChild(giren); else liste.insertBefore(giren, liste.firstChild);
      var bas0 = yon > 0 ? 0 : -kh, son0 = yon > 0 ? -kh : 0;
      var a = liste.animate([{ transform: "translateY(" + bas0 + "px)" }, { transform: "translateY(" + son0 + "px)" }], { duration: 780, easing: "cubic-bezier(.55,0,.25,1)", fill: "forwards" });
      cikan.animate([{ opacity: 1, filter: "blur(0)" }, { opacity: 0, filter: "blur(3px)" }], { duration: 700, easing: "ease-in" });
      giren.animate([{ opacity: 0, filter: "blur(3px)" }, { opacity: 1, filter: "blur(0)" }], { duration: 780, easing: "ease-out" });
      a.onfinish = function () { a.cancel(); bitir(); };
    }
    function kur() {
      clearTimeout(zaman);
      if (cubuk) { cubuk.style.animation = "none"; void cubuk.offsetWidth; cubuk.style.animation = ""; }
      var calis = sira.length > GORUNUR && !durdu && !uzerinde && !acikVar && !document.hidden;
      if (cubuk) cubuk.parentNode.classList.toggle("durdu", !calis);
      if (calis) zaman = setTimeout(function () { kaydir(1); kur(); }, SURE);
    }
    function sec(filtre) {
      sira = kayitlar.filter(filtre);
      bas = 0; goster(true); kur();
    }
    /* belli bir kaydı pencerenin başına getir */
    function getir(k) {
      var i = sira.indexOf(k);
      if (i < 0) { sira = kayitlar.slice(); i = sira.indexOf(k); }
      bas = sira.length > GORUNUR ? i : 0; goster(false); kur();
    }
    if (kontrol) {
      kontrol.querySelector(".dizin-ileri").addEventListener("click", function () { kaydir(1); kur(); });
      kontrol.querySelector(".dizin-geri").addEventListener("click", function () { kaydir(-1); kur(); });
      var durYaz = function () { durBtn.setAttribute("aria-pressed", String(durdu)); durBtn.textContent = durdu ? "▶" : "❚❚"; durBtn.setAttribute("aria-label", t(durdu ? "Akışı başlat" : "Akışı durdur")); };
      durBtn.addEventListener("click", function () { durdu = !durdu; durYaz(); kur(); });
      durYaz();
    }
    kap.addEventListener("mouseenter", function () { uzerinde = true; kur(); });
    kap.addEventListener("mouseleave", function () { uzerinde = false; kur(); });
    kap.addEventListener("focusin", function () { uzerinde = true; kur(); });
    kap.addEventListener("focusout", function (e) { if (!kap.contains(e.relatedTarget)) { uzerinde = false; kur(); } });
    /* Yayınlar: bir kayıt açılınca akış durur ve pencere açılan metne göre büyür */
    liste.addEventListener("toggle", function () {
      acikVar = !!liste.querySelector("details[open]");
      if (acikVar) { pencere.style.height = pencere.scrollHeight + "px"; requestAnimationFrame(function () { pencere.style.height = "auto"; }); } else olc();
      kur();
    }, true);
    document.addEventListener("visibilitychange", kur);
    var rz = 0;
    window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(olc, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(olc);
    sec(function () { return true; });
    return { sec: sec, getir: getir };
  }

  /* ── II. Bilgi: süzgeçler ── */
  var bilgiKap = document.querySelector('[data-akis="bilgi"]');
  if (bilgiKap) {
    var alanlar = function (k) { return (k.getAttribute("data-alan") || "").split(/\s+/).filter(Boolean); };
    var bilgi = Akis(bilgiKap, { bos: document.querySelector(".dizin-bos") });
    var suzler = [].slice.call(document.querySelectorAll(".dizin-suz .suz"));
    var sayilan = [].slice.call(bilgiKap.querySelectorAll(".kayit:not(.kayit-yakinda)"));
    suzler.forEach(function (b) {
      var a = b.dataset.alan, n = a === "hepsi" ? sayilan.length : sayilan.filter(function (k) { return alanlar(k).indexOf(a) > -1; }).length;
      var s = b.querySelector(".suz-sayi"); if (s) s.textContent = n;
      b.classList.toggle("bos", n === 0);
      b.addEventListener("click", function () {
        suzler.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        bilgi.sec(function (k) { return a === "hepsi" || alanlar(k).indexOf(a) > -1; });
      });
    });
  }

  /* ── III. Yayınlar ── */
  var yayinKap = document.querySelector('[data-akis="yayin"]');
  var yayin = yayinKap ? Akis(yayinKap, { simge: true }) : null;
  function yayinAc(id) {
    var li = document.getElementById("yayin-" + id);
    if (!li || !yayin) return;
    yayin.getir(li);
    var d = li.querySelector("details");
    d.open = true;
    li.classList.remove("vurgula"); void li.offsetWidth; li.classList.add("vurgula");
    li.scrollIntoView({ behavior: azalt ? "auto" : "smooth", block: "center" });
  }

  /* ── IV. Kanal: video ekranı ── */
  var videoKap = document.querySelector('[data-akis="video"]');
  var video = videoKap ? Akis(videoKap, {}) : null;
  var panel = document.querySelector(".video-panel");
  var secili = null;
  function videoBul(id) { return (window.ICERIK || []).filter(function (o) { return o.id === id; })[0]; }
  function videoSec(id, oynat) {
    var o = videoBul(id);
    if (!o || !panel) return;
    secili = o;
    var yer = panel.querySelector(".video-yer");
    yer.innerHTML = ""; panel.classList.remove("oynuyor");
    panel.querySelector(".video-baslik").textContent = o.baslik;
    panel.querySelector(".video-aciklama").textContent = o.aciklama || "";
    var dis = panel.querySelector(".video-dis");
    dis.href = o.youtube ? "https://www.youtube.com/watch?v=" + encodeURIComponent(o.youtube) : (o.bag || "https://www.youtube.com/@karahan6927");
    panel.querySelector(".video-oynat-ad").textContent = t(o.youtube || o.dosya ? "İzle" : "YouTube’da aç ↗");
    if (videoKap) videoKap.querySelectorAll(".kayit").forEach(function (k) { k.classList.toggle("secili", k.dataset.video === id); });
    if (window.TERIMCE) window.TERIMCE.uygula(panel.querySelector(".video-aciklama"));
    if (oynat) videoOynat();
  }
  function videoOynat() {
    var o = secili;
    if (!o) return;
    var yer = panel.querySelector(".video-yer");
    if (o.youtube) {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(o.youtube) + "?autoplay=1&rel=0";
      f.title = o.baslik; f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true;
      yer.appendChild(f);
    } else if (o.dosya) {
      var v = document.createElement("video");
      v.src = o.dosya; v.controls = true; v.autoplay = true; v.playsInline = true;
      yer.appendChild(v);
    } else { window.open(o.bag || "https://www.youtube.com/@karahan6927", "_blank", "noopener"); return; }
    panel.classList.add("oynuyor");
  }
  if (panel) {
    panel.querySelector(".video-oynat").addEventListener("click", videoOynat);
    var ilk = (window.ICERIK || []).filter(function (o) { return o.tur === "video"; }).sort(function (a, b) { return (b.tarih || "0").localeCompare(a.tarih || "0"); })[0];
    if (ilk) videoSec(ilk.id);
    if (videoKap) videoKap.addEventListener("click", function (e) {
      var k = e.target.closest(".kayit");
      if (!k) return;
      videoSec(k.dataset.video, false);
      panel.scrollIntoView({ behavior: azalt ? "auto" : "smooth", block: "center" });
    });
  }

  /* ── Bilgi'deki kayıtlar yerine götürür: video → Kanal ekranı, belge → Yayınlar ── */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-video], a[data-yayin]");
    if (!a || a.closest("[data-akis='video']")) return;
    e.preventDefault();
    if (a.dataset.video) { videoSec(a.dataset.video, false); if (panel) panel.scrollIntoView({ behavior: azalt ? "auto" : "smooth", block: "center" }); }
    else yayinAc(a.dataset.yayin);
  });
  var m = location.hash.match(/^#yayin-([\w-]+)$/);
  if (m) setTimeout(function () { yayinAc(m[1]); }, 300);

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
