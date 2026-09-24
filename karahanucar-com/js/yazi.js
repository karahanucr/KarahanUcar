/* Yazı katmanı: (1) 7 dilde çeviri (js/diller.js sözlüğü; Türkçe metinler HTML'de durur),
   (2) aşağı kaydırınca yazıların hafifçe yukarı savrulması (başlıklarda harf, paragraflarda kelime düzeyinde).
   Çeviri, sayfadaki metin düğümlerinin Türkçe özgünlerini anahtar olarak kullanır; sözlükte olmayan metin Türkçe kalır. */
(function () {
  var D = window.DILLER || {};
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var norm = function (s) { return s.replace(/\s+/g, " ").trim(); };
  var HARF = "h2, .card h3";
  var KELIME = ".lead, .sub, .card p, .timeline li";
  var FLING = HARF + ", " + KELIME;
  var YASAK = "script, style, noscript, svg, .imlec, [data-sabit]";

  /* 1) Türkçe özgün metinleri yakala */
  function seviye(el) {
    if (!el || el.closest(".draft")) return null;
    if (el.closest(HARF)) return "harf";
    if (el.closest(KELIME)) return "kelime";
    return null;
  }
  var kayitlar = [];
  var yuru = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      var p = n.parentElement;
      return (!p || p.closest(YASAK)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  var dugum;
  while ((dugum = yuru.nextNode())) {
    var m = dugum.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    kayitlar.push({ n: dugum, lead: m[1], orig: m[2], key: norm(m[2]), trail: m[3], sev: seviye(dugum.parentElement), parts: null, marker: null });
  }
  var oz = [];
  document.querySelectorAll("[alt], [aria-label]").forEach(function (el) {
    ["alt", "aria-label"].forEach(function (a) {
      var v = el.getAttribute(a);
      if (v && v.trim()) oz.push({ el: el, a: a, orig: v, key: norm(v) });
    });
  });
  var metaDesc = document.querySelector('meta[name="description"]');
  var ozBaslik = document.title, ozAciklama = metaDesc ? metaDesc.getAttribute("content") : "";

  /* 2) Kelime/harf parçalama (yalnız hareket serbestse) */
  function birlestir(r) {
    if (!r.parts) return;
    var yeni = document.createTextNode("");
    r.marker.parentNode.insertBefore(yeni, r.marker);
    r.parts.forEach(function (p) { if (p.parentNode) p.parentNode.removeChild(p); });
    r.marker.parentNode.removeChild(r.marker);
    r.n = yeni; r.parts = null; r.marker = null;
  }
  function bol(r, harfSeviyesi) {
    var metin = r.n.nodeValue;
    if (!metin.trim()) return;
    var kap = document.createDocumentFragment(), parcalar = [], isaret = document.createComment("");
    kap.appendChild(isaret);
    metin.split(/(\s+)/).forEach(function (tok) {
      if (tok === "") return;
      if (/^\s+$/.test(tok)) { var b = document.createTextNode(tok); kap.appendChild(b); parcalar.push(b); return; }
      var w = document.createElement("span");
      w.className = "hw";
      if (harfSeviyesi) {
        Array.from(tok).forEach(function (c, i) {
          var h = document.createElement("span");
          h.className = "hm";
          h.textContent = c;
          h.style.setProperty("--k", (-(0.5 + 0.55 * Math.abs(Math.sin(i * 1.7 + tok.length)))).toFixed(2));
          w.appendChild(h);
        });
      } else {
        w.className = "hw hm";
        w.textContent = tok;
        w.style.setProperty("--k", (-(0.5 + Math.random() * 0.6)).toFixed(2));
      }
      kap.appendChild(w); parcalar.push(w);
    });
    r.n.parentNode.replaceChild(kap, r.n);
    r.marker = isaret; r.parts = parcalar; r.n = null;
  }

  /* 3) Dil uygulama */
  var kod = "tr";
  function cevir(yeni) {
    kod = yeni;
    document.dispatchEvent(new CustomEvent("dil-oncesi")); // terimce.js işaretlerini geri alır
    kayitlar.forEach(birlestir);
    var S = (yeni !== "tr" && D[yeni]) ? D[yeni] : null;
    kayitlar.forEach(function (r) {
      var t = S && S[r.key];
      r.n.nodeValue = r.lead + (t != null ? t : r.orig) + r.trail;
    });
    oz.forEach(function (o) {
      var t = S && S[o.key];
      o.el.setAttribute(o.a, t != null ? t : o.orig);
    });
    document.title = (S && S.__title) || ozBaslik;
    if (metaDesc) metaDesc.setAttribute("content", (S && S.__desc) || ozAciklama);
    document.documentElement.lang = yeni === "el" ? "grc" : yeni; // "el" düğmesi Attik (Platon dönemi) Yunancayı taşır
    document.documentElement.dir = yeni === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-dil]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.dil === yeni));
      var ad = b.querySelector(".dil-ad"), et = b.querySelector(".dil-tr");
      if (ad && et) b.classList.toggle("ayni", norm(ad.textContent) === norm(et.textContent));
    });
    /* Kaydırınca harflerin savrulması isteğe göre kaldırıldı (2026-09-25); bol()/birlestir() yerinde duruyor, çağrılmıyor. */
    try { window.localStorage.setItem("dil", yeni); } catch (e) {}
    document.dispatchEvent(new CustomEvent("dil-sonrasi"));
  }

  /* 4) Kaydırınca savrulma: aşağı inerken yukarı, yukarı çıkarken aşağı doğru (yönle ters, rüzgâr gibi) */
  var eller = [], gorunen = new Set(), gozle = { observe: function () {} };
  if (false && !azalt && "IntersectionObserver" in window) {
    gozle = new IntersectionObserver(function (kayit) {
      kayit.forEach(function (k) { if (k.isIntersecting) gorunen.add(k.target); else { gorunen.delete(k.target); k.target.style.removeProperty("--lift"); } });
    }, { rootMargin: "80px" });
    var sonY = window.scrollY, deger = 0, yazilan = 0;
    var dongu = function () {
      var y = window.scrollY, dy = y - sonY; sonY = y;
      var hedef = Math.max(-8, Math.min(dy * 0.45, 8));
      deger += (hedef - deger) * (Math.abs(hedef) > Math.abs(deger) ? 0.35 : 0.12);
      if (hedef === 0 && Math.abs(deger) < 0.05) deger = 0;
      if (!document.hidden && Math.abs(deger - yazilan) > 0.02) {
        yazilan = deger;
        var px = deger.toFixed(2) + "px";
        gorunen.forEach(function (e) { e.style.setProperty("--lift", px); });
      }
      requestAnimationFrame(dongu);
    };
    requestAnimationFrame(dongu);
  }

  /* 5) Dil düğmeleri ve başlangıç */
  document.querySelectorAll("[data-dil]").forEach(function (b) {
    b.addEventListener("click", function () { cevir(b.dataset.dil); if (b.blur) b.blur(); });
  });
  var kayitli = "tr";
  try { var k = window.localStorage.getItem("dil"); if (k && (k === "tr" || D[k])) kayitli = k; } catch (e) {}
  cevir(kayitli);
})();
