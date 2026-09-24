/* Terimce: yüklenen içeriklerdeki (sahne panelleri, haritalar, Çalışmalarım, Son eklenenler, Yayınlar, Kanal, okumalar)
   sözcükler sözlükçede (js/sozlukce.js) varsa ince bir noktalı çizgiyle işaretlenir; üzerine gelince ya da dokununca tanım çıkar.
   Bir kapta her terim yalnız ilk geçtiği yerde işaretlenir (metin kalabalıklaşmasın). Türkçe ekleri tanır: "ontolojinin", "tözü". */
(function () {
  var SZ = window.SOZLUKCE || {};
  var ALAN_AD = { felsefe: "Felsefe", doga: "Doğa Bilimleri", formel: "Formel Bilimler", sosyal: "Sosyal Bilimler", estetik: "Estetik" };
  var YALNIZ_TAM = { gen: 1 }, ATLA = { terim: 1, "tür": 1, pi: 1 };
  var kucuk = function (s) { return s.toLocaleLowerCase("tr"); };
  var sozluk = {}, anahtarlar = [];
  Object.keys(SZ).forEach(function (alan) {
    (SZ[alan] || []).forEach(function (x) {
      var ad = kucuk(x.terim.replace(/\s*\(.*\)\s*$/, "").trim());
      if (!ad || ATLA[ad] || sozluk[ad]) return;
      sozluk[ad] = { x: x, alan: alan };
      anahtarlar.push(ad);
    });
  });
  if (!anahtarlar.length) return;
  anahtarlar.sort(function (a, b) { return b.length - a.length; });
  var H = "a-zçğıöşüâîû0-9";
  var desen = new RegExp("(^|[^" + H + "])(" + anahtarlar.map(function (a) { return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")([a-zçğıöşüâîû]{0,8})(?=$|[^" + H + "])", "g");
  var YASAK = "a, button, h1, h2, h3, h4, .terim, script, style, .sk-sozlukce, [data-terimsiz]";
  var sarilanlar = [];

  function uygula(kok) {
    if (!kok) return;
    var gorulen = {}, dugumler = [], yuru = document.createTreeWalker(kok, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { var p = n.parentElement; return !n.nodeValue.trim() || !p || p.closest(YASAK) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
    });
    kok.querySelectorAll(".terim").forEach(function (t) { gorulen[t.dataset.terim] = 1; });
    while (yuru.nextNode()) dugumler.push(yuru.currentNode);
    dugumler.forEach(function (n) {
      var metin = n.nodeValue, k = kucuk(metin);
      if (k.length !== metin.length) return;
      var parca = [], son = 0, m;
      desen.lastIndex = 0;
      while ((m = desen.exec(k))) {
        var ad = m[2], bas = m.index + m[1].length, bit = bas + ad.length + m[3].length;
        if (gorulen[ad] || (YALNIZ_TAM[ad] && m[3])) continue;
        gorulen[ad] = 1;
        parca.push([bas, bit, ad]);
      }
      if (!parca.length) return;
      var ekler = [], orijinal = metin;
      parca.forEach(function (p, i) {
        var sp = document.createElement("span");
        sp.className = "terim"; sp.tabIndex = 0; sp.dataset.terim = p[2];
        sp.setAttribute("aria-describedby", "terim-ipucu");
        sp.textContent = metin.slice(p[0], p[1]);
        ekler.push(sp);
        var sonra = metin.slice(p[1], i + 1 < parca.length ? parca[i + 1][0] : metin.length);
        if (sonra) ekler.push(document.createTextNode(sonra));
      });
      var ref = n.nextSibling;
      ekler.forEach(function (e) { n.parentNode.insertBefore(e, ref); });
      n.nodeValue = metin.slice(0, parca[0][0]);
      sarilanlar.push({ n: n, o: orijinal, e: ekler });
    });
  }
  /* Ana sayfadaki çevrilebilir metinlerde işaretleri geri al (dil değişirken yazi.js özgün metin düğümlerine döner) */
  function kaldir(kok) {
    sarilanlar = sarilanlar.filter(function (s) {
      if (kok && !kok.contains(s.n)) return true;
      s.e.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
      s.n.nodeValue = s.o;
      return false;
    });
  }

  /* ── İpucu kutusu ── */
  var ipucu = document.createElement("div");
  ipucu.id = "terim-ipucu"; ipucu.className = "terim-ipucu"; ipucu.setAttribute("role", "tooltip"); ipucu.hidden = true;
  document.body.appendChild(ipucu);
  var aktif = null, zaman = 0;
  function kacis(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function goster(sp) {
    var v = sozluk[sp.dataset.terim];
    if (!v) return;
    aktif = sp;
    ipucu.innerHTML = '<p class="ti-ust">Sözlükçe · ' + kacis(ALAN_AD[v.alan] || v.alan) + '</p><p class="ti-ad">' + kacis(v.x.terim) + (v.x.koken ? ' <span class="ti-koken">' + kacis(v.x.koken) + "</span>" : "") + "</p><p>" + kacis(v.x.aciklama) + "</p>";
    ipucu.hidden = false;
    var r = sp.getBoundingClientRect(), w = ipucu.offsetWidth, h = ipucu.offsetHeight;
    var x = Math.max(10, Math.min(window.innerWidth - w - 10, r.left + r.width / 2 - w / 2)), y = r.top - h - 10;
    ipucu.classList.toggle("altta", y < 10);
    if (y < 10) y = r.bottom + 10;
    ipucu.style.left = x + "px"; ipucu.style.top = y + "px";
  }
  function gizle() { aktif = null; ipucu.hidden = true; }
  document.addEventListener("mouseover", function (e) {
    var sp = e.target.closest && e.target.closest(".terim");
    clearTimeout(zaman);
    if (sp) zaman = setTimeout(function () { goster(sp); }, 120);
    else if (aktif && !e.target.closest(".terim-ipucu")) zaman = setTimeout(gizle, 150);
  });
  document.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("terim")) goster(e.target); });
  document.addEventListener("focusout", function (e) { if (e.target === aktif) gizle(); });
  document.addEventListener("click", function (e) {
    var sp = e.target.closest && e.target.closest(".terim");
    if (sp) { if (aktif === sp) gizle(); else goster(sp); } else if (!e.target.closest(".terim-ipucu")) gizle();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && aktif) { e.stopPropagation(); gizle(); } }, true);
  window.addEventListener("scroll", gizle, { passive: true });

  /* Ana sayfa listeleri (yalnız Türkçe okurken; tanımlar Türkçe) */
  var SAYFA = ".kayit-aciklama, .yayin-aciklama, .video-aciklama, [data-terimce]";
  function sayfayaUygula() {
    if (document.documentElement.lang !== "tr") return;
    document.querySelectorAll(SAYFA).forEach(uygula);
  }
  document.addEventListener("dil-oncesi", function () { gizle(); kaldir(null); });
  document.addEventListener("dil-sonrasi", sayfayaUygula);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", sayfayaUygula); else sayfayaUygula();

  window.TERIMCE = { uygula: uygula, kaldir: kaldir };
})();
