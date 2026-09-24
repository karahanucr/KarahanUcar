/* Sahne motoru: kitaplıkta bir kitaba ya da levhaya basınca kitap açılır, büyür ve tam ekran bir sahneye dönüşür.
   Sahneler js/sahne/*.js dosyalarında SAHNE.kaydet(id, tanım) ile tanımlanır. Merkez sahnelerden (kapılar) alt sahnelere
   kamera yakınlaşarak geçilir; tarayıcının geri tuşu, Esc ve "Geri" düğmesi bir adım geri götürür.
   Tanım alanları: ad, yer, alt, ust (bir üst sahne), vurgu, isaret (parıltı biçimi: halka|yildiz|kor|kristal|yaprak|dalga),
   arka() → SVG, on() → ön katman SVG, parcacik: {tur, adet}, eserler: [{x, y, ad, panel}], kapilar: [{hedef, x, y, sanat, aciklama}],
   yakinda: [...], sozler: [{metin, dil, ceviri, kaynak}], sozGecis ("kul" ya da varsayılan buğu), sozYer ("sag"),
   sandik: {x, y} (içerik sandığı; içeriği js/arsiv.js'te), sozlukce: "alan" (sözlükçe sahnesi), ses: ortam sesi anahtarı,
   alan (dizindeki data-alan), hazirla(el), kare(t, el). */
(function () {
  var SAHNELER = {};
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var kok, ustBar, geriBtn, kapatBtn, sesBtn, yolEl, aktif = null, yigin = [], kaynakCilt = null, dongu = 0;
  var fare = { x: 0, y: 0, hx: 0, hy: 0 };
  var SOZ_SURE = 15000;

  function dil() { var l = document.documentElement.lang; return l === "grc" ? "el" : l; }
  function t(s) { var D = window.DILLER && window.DILLER[dil()]; return (D && D[s]) || s; }
  function kacis(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ses(tur, a) { if (window.SES) window.SES.tik(tur, a); }

  /* ── Yardımcılar (sahne dosyaları SVG üretirken kullanır) ── */
  var h = {
    svg: function (ic, defs) {
      return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + (defs || "") + "</defs>" + ic + "</svg>";
    },
    rnd: function (tohum) { var s = tohum || 1; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; },
    alev: function (x, y, o, gecikme) {
      o = o || 1; var g = gecikme || 0;
      return '<g transform="translate(' + x + " " + y + ") scale(" + o + ')">' +
        '<circle r="70" cy="-20" fill="url(#alevHale)" class="hale" style="animation-delay:' + g + 's"/>' +
        '<g class="alev" style="animation-delay:' + g + 's"><path d="M0 0C-22 -8 -26 -34 -12 -58C-8 -40 4 -44 0 -78C18 -52 26 -28 18 -8C14 -2 8 0 0 0Z" fill="#e8742a"/>' +
        '<path d="M0 -2C-10 -6 -12 -22 -4 -36C-2 -26 6 -28 4 -48C14 -32 16 -16 10 -6C7 -3 4 -2 0 -2Z" fill="#ffd27a"/></g></g>';
    },
    alevDefs: '<radialGradient id="alevHale"><stop offset="0" stop-color="#ffb04a" stop-opacity=".55"/><stop offset=".45" stop-color="#ff8a2a" stop-opacity=".18"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>',
    yildizlar: function (n, tohum, x0, y0, x1, y1, renk) {
      var r = h.rnd(tohum), s = "";
      for (var i = 0; i < n; i++) {
        var b = (0.5 + r() * r() * 2.2).toFixed(1);
        s += '<circle class="yp" cx="' + (x0 + r() * (x1 - x0)).toFixed(0) + '" cy="' + (y0 + r() * (y1 - y0)).toFixed(0) + '" r="' + b + '" fill="' + (renk || "#fff") + '" style="animation-duration:' + (2 + r() * 4).toFixed(1) + "s;animation-delay:-" + (r() * 5).toFixed(1) + 's"/>';
      }
      return s;
    },
    bulut: function (x, y, o, sure, gecikme) {
      return '<g class="bulut" style="--s:' + sure + "s;--d:-" + gecikme + 's"><g transform="translate(' + x + " " + y + ") scale(" + o + ')" fill="#fff" opacity=".85">' +
        '<ellipse cx="0" cy="0" rx="70" ry="22"/><ellipse cx="-30" cy="-14" rx="34" ry="24"/><ellipse cx="20" cy="-20" rx="40" ry="30"/><ellipse cx="55" cy="-6" rx="30" ry="18"/></g></g>';
    }
  };

  /* ── Parçacıklar: sahnenin havası ── */
  function Parcacik(tuval, ayar) {
    var c = tuval.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), w = 0, h2 = 0, ps = [];
    var tur = ayar.tur, HARFLER = ayar.harfler || "ΑΒΓΔΘΛΞΠΣΦΨΩαβγδλσωABCDEFGRSQVXابجدهوحطيكلمنعفقرشت";
    function boy() { w = tuval.clientWidth; h2 = tuval.clientHeight; tuval.width = w * dpr; tuval.height = h2 * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function yeni(ilk) {
      var p = { x: Math.random() * w, y: ilk ? Math.random() * h2 : (tur === "kor" || tur === "harf" ? h2 + 10 : Math.random() * h2), f: Math.random() * 6.28, s: Math.random() };
      if (tur === "harf") { p.ch = HARFLER[Math.floor(Math.random() * HARFLER.length)]; p.boy = 12 + p.s * 26; }
      if (tur === "yildiz") p.y = Math.random() * h2 * 0.8;
      if (tur === "yaprak") { p.y = ilk ? Math.random() * h2 : -10; p.renk = ["#8ab84a", "#c8a03a", "#b8702a", "#6a9a3a"][Math.floor(Math.random() * 4)]; }
      return p;
    }
    boy();
    var adet = Math.round((ayar.adet || 60) * Math.min(1.2, (w * h2) / (1440 * 820)) + 8);
    for (var i = 0; i < adet; i++) ps.push(yeni(true));
    var kayan = null;
    this.boyut = boy;
    this.ciz = function () {
      c.clearRect(0, 0, w, h2);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i], a;
        p.f += 0.01 + p.s * 0.02;
        if (tur === "toz") {
          p.y -= 0.08 + p.s * 0.12; p.x += Math.sin(p.f) * 0.25;
          a = (0.25 + 0.45 * Math.abs(Math.sin(p.f * 0.7))) * 0.8;
          c.fillStyle = "rgba(255,226,170," + a.toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, 0.6 + p.s * 1.4, 0, 6.283); c.fill();
          if (p.y < -5) { ps[i] = yeni(false); ps[i].y = h2 + 5; }
        } else if (tur === "atesbocegi") {
          p.x += Math.cos(p.f * 0.6) * 0.5; p.y += Math.sin(p.f * 0.8) * 0.4;
          a = Math.max(0, Math.sin(p.f * 1.3 + p.s * 9)); a = a * a;
          var g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9);
          g.addColorStop(0, "rgba(230,255,140," + (a * 0.9).toFixed(3) + ")"); g.addColorStop(1, "rgba(200,255,100,0)");
          c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, 9, 0, 6.283); c.fill();
          if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h2 + 20) ps[i] = yeni(true);
        } else if (tur === "yaprak") {
          p.y += 0.35 + p.s * 0.5; p.x += Math.sin(p.f) * 0.9 + 0.2;
          c.save(); c.translate(p.x, p.y); c.rotate(p.f * 2); c.scale(1, 0.5 + 0.5 * Math.abs(Math.sin(p.f * 1.5)));
          c.globalAlpha = 0.75; c.fillStyle = p.renk; c.beginPath(); c.ellipse(0, 0, 5 + p.s * 3, 2.5 + p.s, 0, 0, 6.283); c.fill(); c.restore();
          if (p.y > h2 + 10) ps[i] = yeni(false);
        } else if (tur === "yildiz") {
          a = 0.25 + 0.75 * Math.abs(Math.sin(p.f * 0.5));
          c.fillStyle = "rgba(230,238,255," + (a * (0.35 + p.s * 0.6)).toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, 0.4 + p.s * 1.3, 0, 6.283); c.fill();
        } else if (tur === "kor") {
          p.y -= 0.5 + p.s * 1.1; p.x += Math.sin(p.f) * 0.6;
          a = Math.max(0, Math.min(1, p.y / h2)) * 0.9;
          c.fillStyle = "rgba(255," + (120 + Math.round(p.s * 90)) + ",40," + a.toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, 0.7 + p.s * 1.6, 0, 6.283); c.fill();
          if (p.y < -10) ps[i] = yeni(false);
        } else if (tur === "kum") {
          p.x += 0.25 + p.s * 0.5; p.y += Math.sin(p.f) * 0.2;
          c.fillStyle = "rgba(255,210,150," + (0.15 + p.s * 0.35).toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, 0.5 + p.s * 1.4, 0, 6.283); c.fill();
          if (p.x > w + 5) { ps[i] = yeni(true); ps[i].x = -5; }
        } else if (tur === "harf") {
          p.y -= 0.18 + p.s * 0.35; p.x += Math.sin(p.f * 0.5) * 0.3;
          a = Math.sin(Math.max(0, Math.min(1, p.y / h2)) * Math.PI) * (0.12 + p.s * 0.4);
          c.font = p.boy.toFixed(0) + "px Georgia, 'Times New Roman', serif";
          c.fillStyle = (ayar.renk || "rgba(232,200,130,") + a.toFixed(3) + ")"; c.fillText(p.ch, p.x, p.y);
          if (p.y < -30) ps[i] = yeni(false);
        }
      }
      if (tur === "yildiz") {
        if (!kayan && Math.random() < 0.004) kayan = { x: w * (0.3 + Math.random() * 0.7), y: Math.random() * h2 * 0.35, k: 0 };
        if (kayan) {
          kayan.k += 0.025; var L = 140, kx = kayan.x - kayan.k * 420, ky = kayan.y + kayan.k * 190;
          var gr = c.createLinearGradient(kx, ky, kx + L, ky - L * 0.45);
          gr.addColorStop(0, "rgba(255,255,255," + (1 - kayan.k).toFixed(2) + ")"); gr.addColorStop(1, "rgba(255,255,255,0)");
          c.strokeStyle = gr; c.lineWidth = 1.5; c.beginPath(); c.moveTo(kx, ky); c.lineTo(kx + L, ky - L * 0.45); c.stroke();
          if (kayan.k >= 1) kayan = null;
        }
      }
    };
  }

  /* ── İskelet: tam ekran katman, üst çubuk (geri · yol · ses · kapat) ── */
  function iskelet() {
    if (kok) return;
    kok = document.createElement("div");
    kok.className = "sahne-kat";
    kok.hidden = true;
    kok.setAttribute("role", "dialog");
    kok.setAttribute("aria-modal", "true");
    kok.innerHTML =
      '<div class="sk-ust"><button type="button" class="sk-geri"><span aria-hidden="true">←</span> <span class="sk-geri-ad"></span></button>' +
      '<p class="sk-yol" aria-live="polite"></p>' +
      '<button type="button" class="sk-ses" aria-pressed="true"><span class="sk-ses-simge" aria-hidden="true"><i></i><i></i><i></i></span> <span class="sk-ses-ad"></span></button>' +
      '<button type="button" class="sk-kapat"><span class="sk-kapat-ad"></span> <span aria-hidden="true">×</span></button></div>';
    document.body.appendChild(kok);
    ustBar = kok.querySelector(".sk-ust");
    geriBtn = kok.querySelector(".sk-geri");
    kapatBtn = kok.querySelector(".sk-kapat");
    sesBtn = kok.querySelector(".sk-ses");
    yolEl = kok.querySelector(".sk-yol");
    geriBtn.addEventListener("click", function () { history.back(); });
    kapatBtn.addEventListener("click", function () { kapatIstek(); });
    sesBtn.addEventListener("click", function () {
      if (!window.SES) return;
      window.SES.ortamAcik(!window.SES.ortamAcik());
      sesYaz();
      if (window.SES.ortamAcik() && aktif) window.SES.ortam(aktif.tanim.ses || aktif.id);
    });
    kok.addEventListener("pointermove", function (e) {
      fare.hx = (e.clientX / window.innerWidth) * 2 - 1;
      fare.hy = (e.clientY / window.innerHeight) * 2 - 1;
    });
    kok.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        if (aktif && (arsivKapat(aktif.el) || panelKapat(aktif.el))) return;
        if (yigin.length > 1) history.back(); else kapatIstek();
      } else if (e.key === "Tab") {
        var o = [].slice.call(kok.querySelectorAll("button:not([hidden]), a[href], input, [tabindex='0']")).filter(function (x) { return x.offsetParent !== null && !x.closest("[hidden]") && !x.closest(".cikiyor"); });
        if (!o.length) return;
        var ilk = o[0], son = o[o.length - 1];
        if (e.shiftKey && document.activeElement === ilk) { son.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === son) { ilk.focus(); e.preventDefault(); }
      }
    });
    window.addEventListener("resize", function () { if (aktif) { if (aktif.pc) aktif.pc.boyut(); aktif.mobil = mobilMi(); sigdir(aktif.el); } });
  }
  function sesYaz() {
    if (!sesBtn) return;
    var acik = window.SES ? window.SES.ortamAcik() : false;
    sesBtn.hidden = !window.SES;
    sesBtn.setAttribute("aria-pressed", String(acik));
    sesBtn.querySelector(".sk-ses-ad").textContent = t(acik ? "Ses açık" : "Ses kapalı");
  }
  function mobilMi() { return window.matchMedia("(max-width: 48rem), (orientation: portrait)").matches; }

  /* ── Bir sahneyi DOM'a kur ── */
  function kur(id) {
    var d = SAHNELER[id], el = document.createElement("section");
    el.className = "sk-sahne sk-" + id + (d.kapilar ? " sk-merkez" : "") + " sk-isaret-" + (d.isaret || "halka") + (d.sozlukce ? " sk-sozlukce-sahne" : "");
    el.dataset.sahne = id;
    if (d.vurgu) el.style.setProperty("--vurgu", d.vurgu);
    var noktalar = "";
    (d.eserler || []).forEach(function (e, i) {
      noktalar += '<button type="button" class="sk-nokta" data-eser="' + i + '" style="--x:' + e.x + ";--y:" + e.y + ";--g:" + (0.9 + i * 0.18).toFixed(2) + 's" aria-haspopup="dialog">' +
        '<span class="sk-halka" aria-hidden="true"><i></i></span><span class="sk-nokta-ad">' + kacis(t(e.ad)) + "</span></button>";
    });
    if (d.sandik && window.ARSIV) {
      noktalar += '<button type="button" class="sk-sandik" style="--x:' + d.sandik.x + ";--y:" + d.sandik.y + '" aria-haspopup="dialog">' +
        '<svg viewBox="0 0 80 64" aria-hidden="true"><defs><radialGradient id="sdI' + id + '"><stop offset="0" stop-color="#ffe7a8"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient></defs>' +
        '<ellipse class="sd-isik" cx="40" cy="28" rx="34" ry="20" fill="url(#sdI' + id + ')"/>' +
        '<rect x="8" y="30" width="64" height="30" rx="3" fill="#6a3e1e"/><path d="M8 38H72M8 52H72" stroke="#3a200c" stroke-width="2"/><rect x="18" y="30" width="6" height="30" fill="#a8782a"/><rect x="56" y="30" width="6" height="30" fill="#a8782a"/>' +
        '<g class="sd-kapak"><path d="M8 30V22C8 12 20 8 40 8C60 8 72 12 72 22V30Z" fill="#7a4a24"/><path d="M8 22C8 12 20 8 40 8C60 8 72 12 72 22" fill="none" stroke="#a8782a" stroke-width="3"/><rect x="18" y="10" width="6" height="20" fill="#a8782a"/><rect x="56" y="10" width="6" height="20" fill="#a8782a"/></g>' +
        '<rect x="34" y="28" width="12" height="12" rx="2" fill="#d9b25e"/><circle cx="40" cy="34" r="2" fill="#3a200c"/></svg>' +
        '<span class="sk-nokta-ad">' + kacis(t("Arşiv sandığı")) + "</span></button>";
    }
    (d.kapilar || []).forEach(function (k, i) {
      var hd = SAHNELER[k.hedef];
      noktalar += '<button type="button" class="sk-kapi" data-hedef="' + k.hedef + '" style="--x:' + k.x + ";--y:" + k.y + ";--g:" + (0.8 + i * 0.22).toFixed(2) + 's">' +
        '<span class="sk-kapi-sanat" aria-hidden="true">' + k.sanat + '</span><span class="sk-kapi-ad">' + kacis(t(hd ? hd.ad : k.hedef)) + '</span><span class="sk-kapi-acik">' + kacis(t(k.aciklama)) + "</span></button>";
    });
    var ek = "";
    if (d.yakinda && d.yakinda.length) {
      ek += '<div class="sk-yakinda"><span class="sk-yakinda-bas">' + kacis(t("Yakında")) + "</span>" + d.yakinda.map(function (y) { return "<span>" + kacis(t(y)) + "</span>"; }).join("") + "</div>";
    }
    if (d.alan && d.kapilar) {
      var kayitlar = [].slice.call(document.querySelectorAll(".dizin .kayit:not(.kayit-yakinda)")).filter(function (k) { return (k.getAttribute("data-alan") || "").split(/\s+/).indexOf(d.alan) > -1 && !/^#sahne-/.test(k.querySelector("h4 a").getAttribute("href")); });
      if (kayitlar.length) {
        ek += '<div class="sk-icerikler"><p class="sk-icerikler-bas">' + kacis(t("Bu alandaki içerikler")) + "</p><ul>" + kayitlar.map(function (k) {
          var a = k.querySelector("h4 a"), tur = k.querySelector(".kayit-tur");
          return '<li><a href="' + a.getAttribute("href") + '"' + (a.target ? ' target="_blank" rel="noopener"' : "") + "><span>" + kacis(tur ? tur.textContent : "") + "</span> " + kacis(a.textContent) + "</a></li>";
        }).join("") + "</ul></div>";
      }
    }
    var sozler = d.sozler || (d.soz ? [d.soz] : []);
    var soz = sozler.length ? '<blockquote class="sk-soz' + (d.sozYer ? " sk-soz-" + d.sozYer : "") + '"><p class="sk-soz-metin"></p><p class="sk-soz-ceviri"></p><cite></cite></blockquote>' : "";
    var sozluk = d.sozlukce ? sozlukceHTML(d) : "";
    el.innerHTML =
      '<div class="sk-cerceve"><div class="sk-kat sk-arka">' + d.arka() + "</div>" + (d.on ? '<div class="sk-kat sk-on">' + d.on() + "</div>" : "") + "</div>" +
      '<canvas class="sk-tuval" aria-hidden="true"></canvas><div class="sk-perde" aria-hidden="true"></div>' +
      '<div class="sk-baslik"><p class="sk-yer">' + kacis(t(d.yer || "")) + "</p><h2>" + kacis(t(d.ad)) + '</h2><p class="sk-alt">' + kacis(t(d.alt || "")) + "</p>" +
      (d.eserler ? '<p class="sk-ipucu">' + kacis(t("Parıldayan nesnelere dokun.")) + "</p>" : "") + "</div>" +
      '<div class="sk-noktalar">' + noktalar + "</div>" + soz + ek + sozluk +
      '<div class="sk-panel" hidden tabindex="-1"><button type="button" class="sk-panel-kapat" aria-label="' + kacis(t("Paneli kapat")) + '">×</button><div class="sk-panel-ic"></div></div>' +
      '<div class="sk-arsiv" hidden tabindex="-1" role="region"></div>';

    el.addEventListener("click", function (e) {
      var n = e.target.closest(".sk-nokta");
      if (n) { panelAc(el, SAHNELER[id].eserler[+n.dataset.eser], n); return; }
      var sd = e.target.closest(".sk-sandik");
      if (sd) { arsivAc(el, id, sd); return; }
      var k = e.target.closest(".sk-kapi");
      if (k) { if (SAHNELER[k.dataset.hedef]) git(k.dataset.hedef, k); return; }
      if (e.target.closest(".sk-panel-kapat")) { panelKapat(el); return; }
      if (e.target.closest(".sk-arsiv-kapat")) { arsivKapat(el); return; }
      var tema = e.target.closest(".ar-tema");
      if (tema) { arsivTema(el, +tema.dataset.i); return; }
      var izle = e.target.closest(".ar-izle");
      if (izle) { arsivIzle(izle); return; }
      var terim = e.target.closest(".sz-terim-bas");
      if (terim) { var li = terim.parentNode, acik = li.classList.toggle("acik"); terim.setAttribute("aria-expanded", String(acik)); return; }
      var harf = e.target.closest(".sz-harf");
      if (harf) { sozlukSuz(el, harf.dataset.harf); return; }
      if (!e.target.closest(".sk-panel, .sk-arsiv, .sk-sozlukce")) panelKapat(el);
    });
    if (d.sozlukce) {
      var ara = el.querySelector(".sz-ara");
      ara.addEventListener("input", function () { sozlukSuz(el, null, ara.value); });
    }
    return el;
  }

  /* ── Bilgi paneli: dokunulan eserin yanından açılır ── */
  function panelAc(el, eser, dugme) {
    arsivKapat(el);
    var p = el.querySelector(".sk-panel"), ic = p.querySelector(".sk-panel-ic");
    el.querySelectorAll(".sk-nokta").forEach(function (n) { n.classList.toggle("secili", n === dugme); });
    ic.innerHTML = '<p class="pn-ust">' + kacis(t(eser.ad)) + "</p>" + eser.panel;
    var r = dugme.getBoundingClientRect(), sagda = (r.left + r.width / 2) > window.innerWidth * 0.52;
    p.classList.toggle("solda", sagda);
    p.hidden = false;
    p.scrollTop = 0;
    if (!azalt) p.animate([{ opacity: 0, transform: "translateX(" + (sagda ? "-" : "") + "24px) scale(.97)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" });
    p._dugme = dugme;
    p.focus({ preventScroll: true });
  }
  function panelKapat(el) {
    var p = el.querySelector(".sk-panel");
    if (!p || p.hidden) return false;
    p.hidden = true;
    el.querySelectorAll(".sk-nokta.secili").forEach(function (n) { n.classList.remove("secili"); });
    if (p._dugme) p._dugme.focus({ preventScroll: true });
    ses("fis");
    return true;
  }

  /* ── Arşiv sandığı: sahnenin konusuna ait notlar, sunumlar, videolar, çeviriler (js/arsiv.js) ── */
  var TUR_AD = { not: "Not", sunum: "Sunum", video: "Video", ceviri: "Çeviri", pdf: "PDF", gorsel: "Görsel", okuma: "Okuma", baglanti: "Bağlantı" };
  var TUR_SIMGE = { not: "✎", sunum: "▭", video: "▶", ceviri: "⇄", pdf: "▤", gorsel: "◩", okuma: "❧", baglanti: "↗" };
  function arsivAc(el, id, dugme) {
    panelKapat(el);
    var A = (window.ARSIV || {})[SAHNELER[id].arsiv || id] || { temalar: [] };
    var a = el.querySelector(".sk-arsiv");
    var toplam = A.temalar.reduce(function (s, x) { return s + x.ogeler.length; }, 0);
    a.innerHTML = '<div class="ar-bas"><span class="ar-simge" aria-hidden="true"></span><div><p class="pn-ust">' + kacis(t("Arşiv sandığı")) + "</p><h3>" + kacis(t(A.baslik || SAHNELER[id].ad)) + '</h3><p class="ar-sayi">' + toplam + " " + kacis(t("içerik")) + "</p></div>" +
      '<button type="button" class="sk-arsiv-kapat" aria-label="' + kacis(t("Sandığı kapat")) + '">×</button></div>' +
      '<div class="ar-temalar" role="tablist">' + A.temalar.map(function (tm, i) { return '<button type="button" role="tab" class="ar-tema" data-i="' + i + '" aria-selected="' + (i === 0) + '">' + kacis(t(tm.ad)) + ' <span data-sabit>' + tm.ogeler.length + "</span></button>"; }).join("") + "</div>" +
      '<div class="ar-icerik"></div>' +
      '<p class="ar-not">' + kacis(t("Yeni not, sunum, video ya da çeviri eklemek için: js/arsiv.js dosyasında bu sahnenin temasına bir satır ekle; dosyaları arsiv/ klasörüne koy.")) + "</p>";
    a._A = A;
    a.hidden = false;
    dugme.classList.add("acik");
    a._dugme = dugme;
    arsivTema(el, 0);
    if (!azalt) a.animate([{ opacity: 0, transform: "translateY(30px) scale(.94)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)" });
    a.focus({ preventScroll: true });
  }
  function arsivTema(el, i) {
    var a = el.querySelector(".sk-arsiv"), A = a._A, tm = A.temalar[i];
    a.querySelectorAll(".ar-tema").forEach(function (b, k) { b.setAttribute("aria-selected", String(k === i)); });
    var ic = a.querySelector(".ar-icerik");
    if (!tm || !tm.ogeler.length) {
      ic.innerHTML = '<div class="ar-bos"><span aria-hidden="true">❦</span><p>' + kacis(t("Bu çekmece henüz boş; yakında dolacak.")) + "</p></div>";
    } else {
      ic.innerHTML = '<ul class="ar-liste">' + tm.ogeler.map(function (o, k) {
        var tur = o.tur || "not";
        var eylem = o.youtube ? '<button type="button" class="ar-izle" data-yt="' + kacis(o.youtube) + '">' + kacis(t("İzle")) + " ▶</button>"
          : o.bag ? '<a href="' + kacis(o.bag) + '"' + (/^https?:/.test(o.bag) || /\.(pdf|pptx?|docx?)$/i.test(o.bag) ? ' target="_blank" rel="noopener"' : "") + ">" + kacis(t("Aç")) + " →</a>" : "";
        return '<li class="ar-oge" style="--sira:' + k + '"><span class="ar-tur" aria-hidden="true">' + (TUR_SIMGE[tur] || "•") + '</span><div><p class="ar-tur-ad">' + kacis(t(TUR_AD[tur] || tur)) + (o.tarih ? " · " + kacis(o.tarih) : "") + "</p><h4>" + kacis(o.ad) + "</h4>" + (o.aciklama ? "<p>" + kacis(o.aciklama) + "</p>" : "") + '<div class="ar-eylem">' + eylem + '</div><div class="ar-oynatici"></div></div></li>';
      }).join("") + "</ul>";
    }
    if (!azalt) ic.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  }
  function arsivIzle(b) {
    var yer = b.closest(".ar-oge").querySelector(".ar-oynatici");
    if (yer.firstChild) { yer.innerHTML = ""; return; }
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(b.dataset.yt) + "?autoplay=1&rel=0";
    f.title = "YouTube"; f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true;
    yer.appendChild(f);
    if (window.SES) window.SES.ortam(null);
  }
  function arsivKapat(el) {
    var a = el.querySelector(".sk-arsiv");
    if (!a || a.hidden) return false;
    a.hidden = true; a.innerHTML = "";
    if (a._dugme) { a._dugme.classList.remove("acik"); a._dugme.focus({ preventScroll: true }); }
    ses("fis");
    return true;
  }

  /* ── Sözlükçe: arama, harf dizini, açılır terimler (js/sozlukce.js) ── */
  function sozlukceHTML(d) {
    var liste = ((window.SOZLUKCE || {})[d.sozlukce] || []).slice().sort(function (a, b) { return a.terim.localeCompare(b.terim, "tr"); });
    var harfler = [];
    liste.forEach(function (x) { var hf = x.terim.charAt(0).toLocaleUpperCase("tr"); if (harfler.indexOf(hf) < 0) harfler.push(hf); });
    return '<div class="sk-sozlukce"><div class="sz-sol"><label class="sz-ara-et"><span>' + kacis(t("Terim ara")) + '</span><input type="search" class="sz-ara" autocomplete="off" spellcheck="false"></label>' +
      '<div class="sz-harfler"><button type="button" class="sz-harf secili" data-harf="">' + kacis(t("Tümü")) + "</button>" + harfler.map(function (hf) { return '<button type="button" class="sz-harf" data-harf="' + hf + '">' + hf + "</button>"; }).join("") + "</div>" +
      '<p class="sz-sayi"><span data-sabit>' + liste.length + "</span> " + kacis(t("terim")) + "</p></div>" +
      '<ul class="sz-liste">' + liste.map(function (x, i) {
        return '<li class="sz-terim" data-harf="' + x.terim.charAt(0).toLocaleUpperCase("tr") + '" data-ara="' + kacis((x.terim + " " + (x.koken || "") + " " + x.aciklama).toLocaleLowerCase("tr")) + '" style="--sira:' + i + '">' +
          '<button type="button" class="sz-terim-bas" aria-expanded="false"><span class="sz-ad">' + kacis(x.terim) + "</span>" + (x.koken ? '<span class="sz-koken">' + kacis(x.koken) + "</span>" : "") + "</button>" +
          '<div class="sz-aciklama"><div><p>' + kacis(x.aciklama) + "</p>" + (x.ornek ? '<p class="sz-ornek">' + kacis(x.ornek) + "</p>" : "") + "</div></div></li>";
      }).join("") + "</ul></div>";
  }
  function sozlukSuz(el, harf, metin) {
    var ara = el.querySelector(".sz-ara"), m = (metin != null ? metin : ara.value).trim().toLocaleLowerCase("tr");
    if (harf != null) { el.querySelectorAll(".sz-harf").forEach(function (b) { b.classList.toggle("secili", b.dataset.harf === harf); }); el._harf = harf; }
    var hf = el._harf || "";
    el.querySelectorAll(".sz-terim").forEach(function (li) { li.hidden = (hf && li.dataset.harf !== hf) || (m && li.dataset.ara.indexOf(m) < 0); });
  }

  /* ── Alıntılar: harf harf yazılır; bir süre sonra (buğulanarak ya da yanıp kül olarak) başkasına yer açar ── */
  function sozBaslat(el, d) {
    var bq = el.querySelector(".sk-soz");
    if (!bq) return;
    var sozler = d.sozler || [d.soz], i = 0, metin = bq.querySelector(".sk-soz-metin"), cev = bq.querySelector(".sk-soz-ceviri"), kay = bq.querySelector("cite");
    function yaz(s, ilk) {
      metin.setAttribute("lang", s.dil || "");
      cev.textContent = t(s.ceviri || ""); kay.textContent = t(s.kaynak || "");
      if (azalt) { metin.textContent = s.metin; setTimeout(function () { sigdir(el); }, 50); return; }
      setTimeout(function () { if (aktif && aktif.el === el) sigdir(el); }, 400 + s.metin.length * 60);
      if (d.sozGecis === "kul" && !ilk) { dogus(s.metin); return; }
      metin.textContent = "";
      var k = 0;
      (function adim() { if (!metin.isConnected || metin._iptal) return; metin.textContent = s.metin.slice(0, ++k); if (k < s.metin.length) setTimeout(adim, 38 + Math.random() * 40); })();
      [cev, kay].forEach(function (x) { x.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 300, fill: "backwards" }); });
    }
    /* Mağara: yazı yeniden doğarken harfler korlardan belirir */
    function dogus(s) {
      metin.textContent = "";
      Array.from(s).forEach(function (c, k) {
        var sp = document.createElement("span"); sp.className = "sz-harfi"; sp.textContent = c; metin.appendChild(sp);
        sp.animate([{ opacity: 0, color: "#ff8a3a", filter: "blur(4px)", textShadow: "0 0 14px #ff7a2a", transform: "translateY(10px) scale(.7)" }, { opacity: 1, color: "#ffb060", filter: "blur(0)", textShadow: "0 0 10px #ff9a3a", offset: 0.6 }, { opacity: 1, color: "#FFE7A8", transform: "none", textShadow: "0 0 0 transparent" }], { duration: 900, delay: k * 35, easing: "ease-out", fill: "backwards" });
      });
      [cev, kay].forEach(function (x) { x.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 600, fill: "backwards" }); });
    }
    /* Mağara: yazı tutuşur, kararır, kül olup dökülür */
    function kul(sonra) {
      var tam = metin.textContent; metin.textContent = "";
      var harfler = Array.from(tam).map(function (c) { var sp = document.createElement("span"); sp.className = "sz-harfi"; sp.textContent = c; metin.appendChild(sp); return sp; });
      var son = 0;
      harfler.forEach(function (sp, k) {
        var gec = k * 28 + Math.random() * 300, dx = (Math.random() - 0.5) * 40, dy = 60 + Math.random() * 90, r = (Math.random() - 0.5) * 120;
        son = Math.max(son, gec + 1700);
        sp.animate([{ color: "#FFE7A8" }, { color: "#ff9a3a", textShadow: "0 0 12px #ff6a1a", offset: 0.2 }, { color: "#8a3a1a", textShadow: "0 0 4px #ff4a0a", offset: 0.4 }, { color: "#5a5550", textShadow: "none", transform: "translate(0,0)", opacity: 1, offset: 0.55 }, { color: "#3a3835", transform: "translate(" + dx + "px," + dy + "px) rotate(" + r + "deg) scale(.6)", opacity: 0 }], { duration: 1700, delay: gec, easing: "ease-in", fill: "forwards" });
      });
      [cev, kay].forEach(function (x) { x.animate([{ opacity: 1, filter: "blur(0)" }, { opacity: 0, filter: "blur(3px)" }], { duration: 900, fill: "forwards" }); });
      if (window.SES) window.SES.tik("ates");
      setTimeout(function () { cev.getAnimations().concat(kay.getAnimations()).forEach(function (a) { a.cancel(); }); sonra(); }, son + 200);
    }
    function bugu(sonra) {
      bq.animate([{ opacity: 1, filter: "blur(0)", transform: "none" }, { opacity: 0, filter: "blur(8px)", transform: "translateY(-8px)" }], { duration: 900, easing: "ease-in", fill: "forwards" }).onfinish = function () { bq.getAnimations().forEach(function (a) { a.cancel(); }); sonra(); };
    }
    yaz(sozler[0], true);
    if (sozler.length < 2 || azalt) return;
    var z = setInterval(function () {
      if (!bq.isConnected) { clearInterval(z); return; }
      if (document.hidden) return;
      i = (i + 1) % sozler.length;
      (d.sozGecis === "kul" ? kul : bugu)(function () { yaz(sozler[i]); });
    }, SOZ_SURE);
  }

  /* ── Ekrandan taşan eser noktalarını içeri al (çerçeve 16:9'u kapladığı için dar ekranda kenarlar kırpılır) ── */
  function sigdir(el) {
    if (!el) return;
    var ogeler = el.querySelectorAll(".sk-nokta, .sk-sandik, .sk-kapi");
    ogeler.forEach(function (o) { o.style.removeProperty("--dx"); o.style.removeProperty("--dy"); });
    if (mobilMi()) return;
    var W = window.innerWidth, H = window.innerHeight, ust = 64, pay = 14;
    /* Başlık ve alıntı bölgesiyle çakışan noktalar bu bölgelerin dışına itilir */
    var engeller = [].slice.call(el.querySelectorAll(".sk-soz, .sk-baslik")).map(function (b) {
      var r = b.getBoundingClientRect(), m = b.querySelector(".sk-soz-metin, h2, .sk-alt"), g = r;
      return { l: g.left - 6, r: g.right + 6, t: g.top - 6, b: g.bottom + 6, alt: b.classList.contains("sk-soz") && !b.classList.contains("sk-soz-sag") };
    });
    ogeler.forEach(function (o) {
      var r = o.getBoundingClientRect(), dx = 0, dy = 0;
      if (r.left < pay) dx = pay - r.left; else if (r.right > W - pay) dx = W - pay - r.right;
      if (r.top < ust) dy = ust - r.top; else if (r.bottom > H - pay) dy = H - pay - r.bottom;
      engeller.forEach(function (e) {
        var L = r.left + dx, R = r.right + dx, T = r.top + dy, B = r.bottom + dy;
        if (L < e.r && R > e.l && T < e.b && B > e.t) {
          var sagaKac = e.r - L, yukariKac = B - e.t, asagiKac = e.b - T;
          if (e.alt) { if (sagaKac < yukariKac && R + sagaKac < W - pay) dx += sagaKac; else dy -= yukariKac; }
          else { if (sagaKac < asagiKac && R + sagaKac < W - pay) dx += sagaKac; else dy += asagiKac; }
        }
      });
      if (dx) o.style.setProperty("--dx", dx.toFixed(0) + "px");
      if (dy) o.style.setProperty("--dy", dy.toFixed(0) + "px");
    });
  }

  /* ── Her kare: parçacıklar, fare paralaksı, sahneye özgü canlandırma ── */
  function kare(tm) {
    dongu = requestAnimationFrame(kare);
    if (!aktif || document.hidden) return;
    fare.x += (fare.hx - fare.x) * 0.05; fare.y += (fare.hy - fare.y) * 0.05;
    var a = aktif;
    if (a.arka) a.arka.style.transform = "translate3d(" + (-fare.x * 10).toFixed(2) + "px," + (-fare.y * 7).toFixed(2) + "px,0)";
    if (a.noktalar && !a.mobil) a.noktalar.style.transform = "translate(-50%,-50%) translate3d(" + (-fare.x * 10).toFixed(2) + "px," + (-fare.y * 7).toFixed(2) + "px,0)";
    if (a.on) a.on.style.transform = "translate3d(" + (-fare.x * 26).toFixed(2) + "px," + (-fare.y * 16).toFixed(2) + "px,0)";
    if (a.pc) a.pc.ciz(tm);
    if (a.tanim.kare) a.tanim.kare(tm, a.el);
  }

  function etkinlestir(id, el) {
    var d = SAHNELER[id];
    aktif = { id: id, el: el, tanim: d, arka: el.querySelector(".sk-arka"), on: el.querySelector(".sk-on"), noktalar: el.querySelector(".sk-noktalar"), mobil: mobilMi() };
    if (d.parcacik && !azalt) aktif.pc = new Parcacik(el.querySelector(".sk-tuval"), d.parcacik);
    if (d.hazirla) d.hazirla(el, azalt);
    if (azalt && d.kare) d.kare(0, el);
    sozBaslat(el, d);
    ustGuncelle();
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (aktif && aktif.el === el) sigdir(el); }); });
    setTimeout(function () { if (aktif && aktif.el === el) sigdir(el); }, 1600);
    if (window.SES) window.SES.ortam(d.ses || id);
    if (!dongu && !azalt) dongu = requestAnimationFrame(kare);
  }

  function ustGuncelle() {
    var d = SAHNELER[yigin[yigin.length - 1]];
    kok.setAttribute("aria-label", t(d.ad));
    geriBtn.hidden = yigin.length < 2;
    if (yigin.length > 1) geriBtn.querySelector(".sk-geri-ad").textContent = t(SAHNELER[yigin[yigin.length - 2]].ad);
    kapatBtn.querySelector(".sk-kapat-ad").textContent = t("Kütüphaneye dön");
    yolEl.innerHTML = [t("Kütüphane")].concat(yigin.map(function (i) { return t(SAHNELER[i].ad); })).map(kacis).join(' <span aria-hidden="true">·</span> ');
    sesYaz();
  }

  /* ── Geçişler ── */
  function merkezOran(dugme) {
    var r = dugme.getBoundingClientRect();
    return ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1) + "% " + ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(1) + "%";
  }
  function zincir(id) { var z = [id]; while (SAHNELER[z[0]] && SAHNELER[z[0]].ust) z.unshift(SAHNELER[z[0]].ust); return z; }

  /* Alt sahneye gir: eski sahne kapıya doğru yakınlaşıp söner, yenisi uzaktan gelir */
  function git(id, dugme, gecmisYok) {
    if (!SAHNELER[id] || (aktif && aktif.id === id)) return;
    var eski = aktif && aktif.el, yeni = kur(id);
    kok.appendChild(yeni);
    yigin.push(id);
    if (!gecmisYok) history.pushState({ sahne: id }, "", "#sahne-" + id);
    var or = dugme ? merkezOran(dugme) : "50% 50%";
    if (eski) {
      eski.classList.add("cikiyor");
      var e1 = azalt ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: "scale(1)", opacity: 1, filter: "blur(0)" }, { transform: "scale(3.2)", opacity: 0, filter: "blur(10px)" }];
      eski.style.transformOrigin = or;
      eski.animate(e1, { duration: azalt ? 200 : 1100, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () { eski.remove(); };
    }
    yeni.style.transformOrigin = or;
    var e2 = azalt ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: "scale(.55)", opacity: 0, filter: "blur(12px)" }, { transform: "scale(1)", opacity: 1, filter: "blur(0)" }];
    yeni.animate(e2, { duration: azalt ? 200 : 1300, delay: azalt ? 0 : 350, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
    etkinlestir(id, yeni);
    setTimeout(function () { var ilk = yeni.querySelector(".sk-nokta, .sk-kapi, .sz-ara"); (ilk || kapatBtn).focus({ preventScroll: true }); }, azalt ? 50 : 900);
  }

  /* Bir adım geri: sahne uzaklaşır, üst sahne yakından geri gelir */
  function geri() {
    if (yigin.length < 2) return kapat();
    var cikan = aktif.el, cikanId = aktif.id;
    yigin.pop();
    var id = yigin[yigin.length - 1], yeni = kur(id);
    kok.insertBefore(yeni, cikan);
    cikan.classList.add("cikiyor");
    cikan.animate(azalt ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: "scale(1)", opacity: 1 }, { transform: "scale(.5)", opacity: 0, filter: "blur(10px)" }], { duration: azalt ? 200 : 900, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () { cikan.remove(); };
    etkinlestir(id, yeni);
    requestAnimationFrame(function () {
      var kapiEl = yeni.querySelector('.sk-kapi[data-hedef="' + cikanId + '"]');
      if (kapiEl) yeni.style.transformOrigin = merkezOran(kapiEl);
      yeni.animate(azalt ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: "scale(2.6)", opacity: 0, filter: "blur(8px)" }, { transform: "scale(1)", opacity: 1, filter: "blur(0)" }], { duration: azalt ? 200 : 1100, easing: "cubic-bezier(.2,.7,.2,1)" });
      if (kapiEl) kapiEl.focus({ preventScroll: true });
    });
  }

  /* Kitap açılışı: kitap raftan çıkıp döner, kapağı açılır, sayfa büyüyüp sahneye dönüşür.
     Alt sahneye ait bir kitapsa (örn. Biyoloji), merkez sahne geçmişe yazılır; "geri" alanın odasına götürür. */
  function ac(id, cilt) {
    if (!SAHNELER[id] || aktif) return;
    iskelet();
    kaynakCilt = cilt || null;
    var z = zincir(id);
    yigin = z.slice();
    z.forEach(function (s) { history.pushState({ sahne: s }, "", "#sahne-" + s); });
    document.documentElement.classList.add("sahne-acik");
    kok.hidden = false;
    var yeni = kur(id);
    kok.appendChild(yeni);
    etkinlestir(id, yeni);
    kok.animate([{ backgroundColor: "rgba(7,6,10,0)" }, { backgroundColor: "rgba(7,6,10,1)" }], { duration: azalt ? 150 : 700, fill: "backwards" });
    ustBar.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: azalt ? 0 : 1500, fill: "backwards" });

    if (azalt || !cilt) {
      yeni.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 });
      setTimeout(function () { var ilk = yeni.querySelector(".sk-kapi, .sk-nokta, .sz-ara"); (ilk || kapatBtn).focus({ preventScroll: true }); }, 60);
      return;
    }
    var r = cilt.getBoundingClientRect(), stil = getComputedStyle(cilt);
    var kH = Math.min(window.innerHeight * 0.62, 520), kW = kH * 0.7, cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var k = document.createElement("div");
    k.className = "kitap-uc";
    k.style.cssText = "left:" + (cx - kW / 2) + "px;top:" + (cy - kH / 2) + "px;width:" + kW + "px;height:" + kH + "px;--c:" + stil.getPropertyValue("--c");
    var ad = t(cilt.dataset.ad || (cilt.querySelector(".cilt-ad, .kitap-ad, .kraf-ad") || cilt).textContent);
    var motif = cilt.querySelector(".kitap-motif");
    k.innerHTML = '<div class="ku-sayfa"><span class="ku-sayfa-ad">' + kacis(ad) + '</span><span class="ku-sayfa-cizgi"></span></div><div class="ku-kapak">' + (motif ? '<span class="ku-motif">' + motif.outerHTML + "</span>" : "") + '<span class="ku-ad">' + kacis(ad) + "</span></div>";
    document.body.appendChild(k);
    var sx = r.width / kW, sy = r.height / kH, dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
    var a1 = k.animate([
      { transform: "translate(" + dx + "px," + dy + "px) scale(" + sx.toFixed(3) + "," + sy.toFixed(3) + ") perspective(1400px) rotateY(80deg)" },
      { transform: "translate(0,-12px) scale(1.04) perspective(1400px) rotateY(-12deg)", offset: 0.7 },
      { transform: "translate(0,0) scale(1) perspective(1400px) rotateY(0deg)" }
    ], { duration: 900, easing: "cubic-bezier(.3,.7,.2,1)", fill: "forwards" });
    yeni.style.opacity = "0";
    a1.onfinish = function () {
      var kapak = k.querySelector(".ku-kapak");
      ses("sayfa");
      kapak.animate([{ transform: "perspective(1600px) rotateY(0)" }, { transform: "perspective(1600px) rotateY(-168deg)" }], { duration: 850, easing: "cubic-bezier(.5,0,.2,1)", fill: "forwards" }).onfinish = function () {
        k.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(4.5)", opacity: 0 }], { duration: 1000, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () { k.remove(); };
        yeni.style.opacity = "";
        yeni.animate([{ transform: "scale(.4)", opacity: 0, filter: "blur(14px) brightness(2)" }, { transform: "scale(1)", opacity: 1, filter: "blur(0) brightness(1)" }], { duration: 1300, delay: 150, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
        setTimeout(function () { sigdir(yeni); var ilk = yeni.querySelector(".sk-kapi, .sk-nokta, .sz-ara"); (ilk || kapatBtn).focus({ preventScroll: true }); }, 1250);
      };
    };
  }

  function kapatIstek() {
    var n = yigin.length;
    if (n && history.state && history.state.sahne) history.go(-n); else kapat();
  }

  function kapat() {
    if (!aktif) return;
    var el = aktif.el, cilt = kaynakCilt;
    if (window.SES) window.SES.ortam(null);
    var bitir = function () {
      kok.querySelectorAll(".sk-sahne").forEach(function (s) { s.remove(); });
      kok.hidden = true;
      document.documentElement.classList.remove("sahne-acik");
      aktif = null; yigin = [];
      cancelAnimationFrame(dongu); dongu = 0;
      if (cilt && cilt.isConnected) { cilt.focus({ preventScroll: true }); if (!azalt) cilt.animate([{ transform: "translateY(-1.4rem)" }, { transform: "translateY(0)" }], { duration: 700, easing: "cubic-bezier(.3,1.4,.4,1)" }); }
    };
    if (azalt) return bitir();
    if (cilt && cilt.isConnected) {
      var r = cilt.getBoundingClientRect();
      el.style.transformOrigin = ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1) + "% " + ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(1) + "%";
    }
    ses("kapat");
    kok.animate([{ backgroundColor: "rgba(7,6,10,1)" }, { backgroundColor: "rgba(7,6,10,0)" }], { duration: 800, fill: "forwards" });
    ustBar.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
    el.animate([{ transform: "scale(1)", opacity: 1, filter: "blur(0)" }, { transform: "scale(.05)", opacity: 0, filter: "blur(6px)" }], { duration: 800, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () {
      kok.getAnimations().forEach(function (a) { a.cancel(); });
      ustBar.getAnimations().forEach(function (a) { a.cancel(); });
      bitir();
    };
  }

  window.addEventListener("popstate", function (e) {
    var hedef = e.state && e.state.sahne;
    if (!aktif) { if (hedef) hashtenAc(hedef); return; }
    if (!hedef) return kapat();
    var i = yigin.lastIndexOf(hedef);
    if (i === yigin.length - 1) return;
    if (i > -1) { while (yigin.length - 1 > i + 1) yigin.pop(); geri(); }
    else git(hedef, null, true);
  });

  /* #sahne-latince gibi bağlantılar (adres çubuğu ya da sayfa içi bağlantı) doğrudan o sahneyi açar */
  function hashtenAc(id) {
    if (!SAHNELER[id] || aktif) return;
    var kaynak = document.querySelector('#kitaplik [data-sahne="' + id + '"]') || document.querySelector('#kitaplik [data-sahne="' + zincir(id)[0] + '"]');
    history.replaceState(null, "", location.pathname + location.search);
    ac(id, null);
    kaynakCilt = kaynak;
  }
  function hashKontrol() { var m = location.hash.match(/^#sahne-([\w-]+)$/); if (m) hashtenAc(m[1]); }
  document.addEventListener("DOMContentLoaded", hashKontrol);
  window.addEventListener("hashchange", hashKontrol);

  /* Sözlükçe kapısının çizimi: açık bir sözlük, sayfalarından harfler yükselir */
  function sozlukSanat(renk) {
    return '<svg viewBox="0 0 200 250"><rect x="10" y="30" width="180" height="200" rx="10" fill="#1a140e" stroke="' + renk + '" stroke-width="2" opacity=".95"/>' +
      '<path d="M22 150C52 136 82 138 100 152C118 138 148 136 178 150V214C148 200 118 202 100 216C82 202 52 200 22 214Z" fill="#efe2c2"/><path d="M100 152V216" stroke="#b09a70" stroke-width="2"/>' +
      '<path d="M36 164h46M36 174h40M36 184h44M118 164h46M118 174h38M118 184h42" stroke="#8a7a5a" stroke-width="2" opacity=".6"/>' +
      [["A", 60, 110, 0], ["Ω", 100, 86, 1], ["ب", 140, 112, 2], ["Z", 80, 60, 3], ["λ", 124, 52, 4]].map(function (x) { return '<text class="yuz" style="--s:' + (3 + x[3] * 0.6) + "s;--d:-" + x[3] + 's" x="' + x[1] + '" y="' + x[2] + '" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="' + renk + '">' + x[0] + "</text>"; }).join("") + "</svg>";
  }
  /* Kart katalog çekmeceleriyle dolu bir okuma salonu: bütün sözlükçelerin ortak sahnesi, alanın rengine bürünür */
  function sozlukceKaydet(id, o) {
    SAHNELER[id] = { ad: "Sözlükçe", ust: o.ust, yer: o.yer, vurgu: o.vurgu, alt: "", sozlukce: o.alan, ses: "sozluk",
      parcacik: { tur: "harf", adet: 36, harfler: o.harfler || "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ", renk: "rgba(232,200,130," },
      arka: function () {
        var s = '<rect width="1600" height="900" fill="#140e0a"/><circle cx="800" cy="200" r="700" fill="url(#szI)"/>';
        for (var y = 0; y < 7; y++) for (var x = 0; x < 16; x++) {
          var px = 20 + x * 98, py = 40 + y * 118;
          s += '<rect x="' + px + '" y="' + py + '" width="90" height="108" rx="4" fill="#3a2616" stroke="#1a100a" stroke-width="3"/><rect x="' + (px + 18) + '" y="' + (py + 22) + '" width="54" height="26" rx="2" fill="#e8dcc0" opacity=".75"/><path d="M' + (px + 32) + " " + (py + 70) + 'h26" stroke="' + o.vurgu + '" stroke-width="6" stroke-linecap="round"/>';
        }
        s += '<rect width="1600" height="900" fill="url(#szP)"/>';
        return h.svg(s, '<radialGradient id="szI"><stop offset="0" stop-color="' + o.vurgu + '" stop-opacity=".22"/><stop offset="1" stop-color="' + o.vurgu + '" stop-opacity="0"/></radialGradient><linearGradient id="szP" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".5" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></linearGradient>');
      } };
  }

  window.SAHNE = { kaydet: function (id, tanim) { SAHNELER[id] = tanim; }, ac: ac, h: h, var: function (id) { return !!SAHNELER[id]; }, tanim: function (id) { return SAHNELER[id]; },
    sozlukSanat: sozlukSanat, sozlukce: sozlukceKaydet };
})();
