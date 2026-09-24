/* Sahne motoru: raftaki bir cilde basınca kitap açılır, büyür ve tam ekran bir sahneye dönüşür.
   Sahneler js/sahne/*.js dosyalarında SAHNE.kaydet(id, tanım) ile tanımlanır. Merkez sahnelerden (kapılar)
   alt sahnelere kamera yakınlaşarak geçilir; tarayıcının geri tuşu, Esc ve "Geri" düğmesi bir adım geri götürür.
   Tanım alanları: ad, yer, alt, ust (bir üst sahne), vurgu, arka() → SVG, on() → ön katman SVG,
   parcacik: {tur, adet}, eserler: [{x, y, ad, panel}], kapilar: [{hedef, x, y, sanat, aciklama}],
   yakinda: [...], soz: {metin, ceviri, kaynak}, alan (dizindeki data-alan), hazirla(el), kare(t, el). */
(function () {
  var SAHNELER = {};
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var kok, ustBar, geriBtn, kapatBtn, yolEl, aktif = null, yigin = [], kaynakCilt = null, dongu = 0;
  var fare = { x: 0, y: 0, hx: 0, hy: 0 };

  function dil() { var l = document.documentElement.lang; return l === "grc" ? "el" : l; }
  function t(s) { var D = window.DILLER && window.DILLER[dil()]; return (D && D[s]) || s; }
  function kacis(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ── Yardımcılar (sahne dosyaları SVG üretirken kullanır) ── */
  var h = {
    svg: function (ic, defs) {
      return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + (defs || "") + "</defs>" + ic + "</svg>";
    },
    rnd: function (tohum) { var s = tohum || 1; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; },
    /* Titreyen alev: dış turuncu, iç sarı, altında ışık halesi */
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
    }
  };

  /* ── Parçacıklar: sahnenin havası (toz, ateş böceği, yıldız, kor, kum, harf) ── */
  function Parcacik(tuval, ayar) {
    var c = tuval.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), w = 0, h2 = 0, ps = [];
    var tur = ayar.tur, HARFLER = "ΑΒΓΔΘΛΞΠΣΦΨΩαβγδλσωABCDEFGRSQVXابجدهوحطيكلمنعفقرشت";
    function boy() { w = tuval.clientWidth; h2 = tuval.clientHeight; tuval.width = w * dpr; tuval.height = h2 * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function yeni(ilk) {
      var p = { x: Math.random() * w, y: ilk ? Math.random() * h2 : (tur === "kor" || tur === "harf" ? h2 + 10 : Math.random() * h2), f: Math.random() * 6.28, s: Math.random() };
      if (tur === "harf") { p.ch = HARFLER[Math.floor(Math.random() * HARFLER.length)]; p.boy = 12 + p.s * 26; }
      if (tur === "yildiz") p.y = Math.random() * h2 * 0.8;
      return p;
    }
    boy();
    var adet = Math.round((ayar.adet || 60) * Math.min(1.2, (w * h2) / (1440 * 820)) + 8);
    for (var i = 0; i < adet; i++) ps.push(yeni(true));
    var kayan = null;
    this.boyut = boy;
    this.ciz = function (tm) {
      c.clearRect(0, 0, w, h2);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i], a;
        p.f += 0.01 + p.s * 0.02;
        if (tur === "toz") {
          p.y -= 0.08 + p.s * 0.12; p.x += Math.sin(p.f) * 0.25;
          a = (0.25 + 0.45 * Math.abs(Math.sin(p.f * 0.7))) * 0.8;
          c.fillStyle = "rgba(255,226,170," + a.toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, 0.6 + p.s * 1.4, 0, 6.283); c.fill();
          if (p.y < -5) ps[i] = yeni(false), ps[i].y = h2 + 5;
        } else if (tur === "atesbocegi") {
          p.x += Math.cos(p.f * 0.6) * 0.5; p.y += Math.sin(p.f * 0.8) * 0.4;
          a = Math.max(0, Math.sin(p.f * 1.3 + p.s * 9)); a = a * a;
          var g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9);
          g.addColorStop(0, "rgba(230,255,140," + (a * 0.9).toFixed(3) + ")"); g.addColorStop(1, "rgba(200,255,100,0)");
          c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, 9, 0, 6.283); c.fill();
          if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h2 + 20) ps[i] = yeni(true);
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
          c.font = p.boy.toFixed(0) + "px " + "Georgia, 'Times New Roman', serif";
          c.fillStyle = "rgba(232,200,130," + a.toFixed(3) + ")"; c.fillText(p.ch, p.x, p.y);
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

  /* ── İskelet: tam ekran katman, üst çubuk (geri · yol · kapat) ── */
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
      '<button type="button" class="sk-kapat"><span class="sk-kapat-ad"></span> <span aria-hidden="true">×</span></button></div>';
    document.body.appendChild(kok);
    ustBar = kok.querySelector(".sk-ust");
    geriBtn = kok.querySelector(".sk-geri");
    kapatBtn = kok.querySelector(".sk-kapat");
    yolEl = kok.querySelector(".sk-yol");
    geriBtn.addEventListener("click", function () { history.back(); });
    kapatBtn.addEventListener("click", function () { kapatIstek(); });
    kok.addEventListener("pointermove", function (e) {
      fare.hx = (e.clientX / window.innerWidth) * 2 - 1;
      fare.hy = (e.clientY / window.innerHeight) * 2 - 1;
    });
    kok.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        if (aktif && panelKapat(aktif.el)) return;
        if (yigin.length > 1) history.back(); else kapatIstek();
      } else if (e.key === "Tab") {
        var o = [].slice.call(kok.querySelectorAll("button:not([hidden]), a[href], [tabindex='0']")).filter(function (x) { return x.offsetParent !== null; });
        if (!o.length) return;
        var ilk = o[0], son = o[o.length - 1];
        if (e.shiftKey && document.activeElement === ilk) { son.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === son) { ilk.focus(); e.preventDefault(); }
      }
    });
    window.addEventListener("resize", function () { if (aktif && aktif.pc) aktif.pc.boyut(); });
  }

  /* ── Bir sahneyi DOM'a kur ── */
  function kur(id) {
    var d = SAHNELER[id], el = document.createElement("section");
    el.className = "sk-sahne sk-" + id + (d.kapilar ? " sk-merkez" : "");
    el.dataset.sahne = id;
    if (d.vurgu) el.style.setProperty("--vurgu", d.vurgu);
    var noktalar = "";
    (d.eserler || []).forEach(function (e, i) {
      noktalar += '<button type="button" class="sk-nokta" data-eser="' + i + '" style="--x:' + e.x + ";--y:" + e.y + ";--g:" + (0.9 + i * 0.18).toFixed(2) + 's" aria-haspopup="dialog">' +
        '<span class="sk-halka" aria-hidden="true"></span><span class="sk-nokta-ad">' + kacis(t(e.ad)) + "</span></button>";
    });
    (d.kapilar || []).forEach(function (k, i) {
      var hd = SAHNELER[k.hedef];
      noktalar += '<button type="button" class="sk-kapi" data-hedef="' + k.hedef + '" style="--x:' + k.x + ";--y:" + k.y + ";--g:" + (0.8 + i * 0.22).toFixed(2) + 's">' +
        '<span class="sk-kapi-sanat" aria-hidden="true">' + k.sanat + '</span><span class="sk-kapi-ad">' + kacis(t(hd.ad)) + '</span><span class="sk-kapi-acik">' + kacis(t(k.aciklama)) + "</span></button>";
    });
    var ek = "";
    if (d.yakinda && d.yakinda.length) {
      ek += '<div class="sk-yakinda"><span class="sk-yakinda-bas">' + kacis(t("Yakında")) + "</span>" + d.yakinda.map(function (y) { return "<span>" + kacis(t(y)) + "</span>"; }).join("") + "</div>";
    }
    if (d.alan && d.kapilar) {
      var kayitlar = [].slice.call(document.querySelectorAll(".dizin .kayit:not(.kayit-yakinda)")).filter(function (k) { return (k.getAttribute("data-alan") || "").split(/\s+/).indexOf(d.alan) > -1; });
      if (kayitlar.length) {
        ek += '<div class="sk-icerikler"><p class="sk-icerikler-bas">' + kacis(t("Bu alandaki içerikler")) + "</p><ul>" + kayitlar.map(function (k) {
          var a = k.querySelector("h4 a"), tur = k.querySelector(".kayit-tur");
          return '<li><a href="' + a.getAttribute("href") + '"' + (a.target ? ' target="_blank" rel="noopener"' : "") + "><span>" + kacis(tur ? tur.textContent : "") + "</span> " + kacis(a.textContent) + "</a></li>";
        }).join("") + "</ul></div>";
      }
    }
    var soz = d.soz ? '<blockquote class="sk-soz' + (d.sozYer ? " sk-soz-" + d.sozYer : "") + '"><p class="sk-soz-metin" lang="' + (d.soz.dil || "") + '" data-metin="' + kacis(d.soz.metin) + '"></p><p class="sk-soz-ceviri">' + kacis(d.soz.ceviri) + '</p><cite>' + kacis(d.soz.kaynak) + "</cite></blockquote>" : "";
    el.innerHTML =
      '<div class="sk-cerceve"><div class="sk-kat sk-arka">' + d.arka() + "</div>" + (d.on ? '<div class="sk-kat sk-on">' + d.on() + "</div>" : "") + "</div>" +
      '<canvas class="sk-tuval" aria-hidden="true"></canvas><div class="sk-perde" aria-hidden="true"></div>' +
      '<div class="sk-baslik"><p class="sk-yer">' + kacis(t(d.yer || "")) + "</p><h2>" + kacis(t(d.ad)) + '</h2><p class="sk-alt">' + kacis(t(d.alt || "")) + "</p>" +
      (d.eserler ? '<p class="sk-ipucu">' + kacis(t("Parıldayan nesnelere dokun.")) + "</p>" : "") + "</div>" +
      '<div class="sk-noktalar">' + noktalar + "</div>" + soz + ek +
      '<div class="sk-panel" hidden tabindex="-1"><button type="button" class="sk-panel-kapat" aria-label="' + kacis(t("Paneli kapat")) + '">×</button><div class="sk-panel-ic"></div></div>';

    el.addEventListener("click", function (e) {
      var n = e.target.closest(".sk-nokta");
      if (n) { panelAc(el, SAHNELER[id].eserler[+n.dataset.eser], n); return; }
      var k = e.target.closest(".sk-kapi");
      if (k) { git(k.dataset.hedef, k); return; }
      if (e.target.closest(".sk-panel-kapat")) { panelKapat(el); return; }
      if (!e.target.closest(".sk-panel")) panelKapat(el);
    });
    return el;
  }

  /* ── Bilgi paneli: dokunulan eserin yanından açılır ── */
  function panelAc(el, eser, dugme) {
    var p = el.querySelector(".sk-panel"), ic = p.querySelector(".sk-panel-ic");
    el.querySelectorAll(".sk-nokta").forEach(function (n) { n.classList.toggle("secili", n === dugme); });
    ic.innerHTML = '<p class="pn-ust">' + kacis(t(eser.ad)) + "</p>" + eser.panel;
    var sagda = parseFloat(eser.x) > 52;
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
    return true;
  }

  /* ── Söz: harf harf yazılır ── */
  function sozYaz(el) {
    var m = el.querySelector(".sk-soz-metin");
    if (!m) return;
    var tam = m.getAttribute("data-metin");
    if (azalt) { m.textContent = tam; return; }
    var i = 0;
    (function yaz() {
      if (!m.isConnected) return;
      m.textContent = tam.slice(0, ++i);
      if (i < tam.length) setTimeout(yaz, 38 + Math.random() * 40);
    })();
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
    aktif = { id: id, el: el, tanim: d, arka: el.querySelector(".sk-arka"), on: el.querySelector(".sk-on"), noktalar: el.querySelector(".sk-noktalar"),
      mobil: window.matchMedia("(max-width: 48rem), (orientation: portrait)").matches };
    if (d.parcacik && !azalt) aktif.pc = new Parcacik(el.querySelector(".sk-tuval"), d.parcacik);
    if (d.hazirla) d.hazirla(el, azalt);
    if (azalt && d.kare) d.kare(0, el);
    sozYaz(el);
    ustGuncelle();
    if (!dongu && !azalt) dongu = requestAnimationFrame(kare);
  }

  function ustGuncelle() {
    var d = SAHNELER[yigin[yigin.length - 1]];
    kok.setAttribute("aria-label", t(d.ad));
    geriBtn.hidden = yigin.length < 2;
    if (yigin.length > 1) geriBtn.querySelector(".sk-geri-ad").textContent = t(SAHNELER[yigin[yigin.length - 2]].ad);
    kapatBtn.querySelector(".sk-kapat-ad").textContent = t("Kütüphaneye dön");
    yolEl.innerHTML = [t("Kütüphane")].concat(yigin.map(function (i) { return t(SAHNELER[i].ad); })).map(kacis).join(' <span aria-hidden="true">·</span> ');
  }

  /* ── Geçişler ── */
  function merkezOran(dugme) {
    var r = dugme.getBoundingClientRect();
    return ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1) + "% " + ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(1) + "%";
  }

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
    setTimeout(function () { var ilk = yeni.querySelector(".sk-nokta, .sk-kapi"); (ilk || kapatBtn).focus({ preventScroll: true }); }, azalt ? 50 : 900);
  }

  /* Bir adım geri: sahne uzaklaşır, üst sahne yakından geri gelir */
  function geri() {
    if (yigin.length < 2) return kapat();
    var cikan = aktif.el;
    yigin.pop();
    var id = yigin[yigin.length - 1], yeni = kur(id);
    kok.insertBefore(yeni, cikan);
    var kapiEl = yeni.querySelector('.sk-kapi[data-hedef="' + aktif.id + '"]');
    cikan.animate(azalt ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: "scale(1)", opacity: 1 }, { transform: "scale(.5)", opacity: 0, filter: "blur(10px)" }], { duration: azalt ? 200 : 900, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () { cikan.remove(); };
    etkinlestir(id, yeni);
    requestAnimationFrame(function () {
      if (kapiEl) yeni.style.transformOrigin = merkezOran(kapiEl);
      yeni.animate(azalt ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: "scale(2.6)", opacity: 0, filter: "blur(8px)" }, { transform: "scale(1)", opacity: 1, filter: "blur(0)" }], { duration: azalt ? 200 : 1100, easing: "cubic-bezier(.2,.7,.2,1)" });
      if (kapiEl) kapiEl.focus({ preventScroll: true });
    });
  }

  /* Kitap açılışı: cilt raftan çıkıp döner, kapağı açılır, sayfa büyüyüp sahneye dönüşür */
  function ac(id, cilt) {
    if (!SAHNELER[id]) return;
    iskelet();
    kaynakCilt = cilt || null;
    yigin = [];
    history.pushState({ sahne: id }, "", "#sahne-" + id);
    document.documentElement.classList.add("sahne-acik");
    kok.hidden = false;
    var yeni = kur(id);
    kok.appendChild(yeni);
    yigin.push(id);
    etkinlestir(id, yeni);
    kok.animate([{ backgroundColor: "rgba(7,6,10,0)" }, { backgroundColor: "rgba(7,6,10,1)" }], { duration: azalt ? 150 : 700, fill: "backwards" });
    ustBar.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: azalt ? 0 : 1500, fill: "backwards" });

    if (azalt || !cilt) {
      yeni.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 });
      kapatBtn.focus({ preventScroll: true });
      return;
    }
    var r = cilt.getBoundingClientRect(), stil = getComputedStyle(cilt);
    var kH = Math.min(window.innerHeight * 0.62, 520), kW = kH * 0.7, cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var k = document.createElement("div");
    k.className = "kitap-uc";
    k.style.cssText = "left:" + (cx - kW / 2) + "px;top:" + (cy - kH / 2) + "px;width:" + kW + "px;height:" + kH + "px;--c:" + stil.getPropertyValue("--c");
    var ad = cilt.querySelector(".cilt-ad").textContent;
    k.innerHTML = '<div class="ku-sayfa"><span class="ku-sayfa-ad">' + kacis(ad) + '</span><span class="ku-sayfa-cizgi"></span></div><div class="ku-kapak"><span class="ku-ad">' + kacis(ad) + "</span></div>";
    document.body.appendChild(k);
    /* 1) raftaki cildin yerinden, sırtı bize dönük hâlden kapak görünümüne */
    var sx = r.width / kW, sy = r.height / kH, dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
    var a1 = k.animate([
      { transform: "translate(" + dx + "px," + dy + "px) scale(" + sx.toFixed(3) + "," + sy.toFixed(3) + ") perspective(1400px) rotateY(80deg)" },
      { transform: "translate(0,-12px) scale(1.04) perspective(1400px) rotateY(-12deg)", offset: 0.7 },
      { transform: "translate(0,0) scale(1) perspective(1400px) rotateY(0deg)" }
    ], { duration: 900, easing: "cubic-bezier(.3,.7,.2,1)", fill: "forwards" });
    yeni.style.opacity = "0";
    a1.onfinish = function () {
      /* 2) kapak açılır */
      var kapak = k.querySelector(".ku-kapak");
      kapak.animate([{ transform: "perspective(1600px) rotateY(0)" }, { transform: "perspective(1600px) rotateY(-168deg)" }], { duration: 850, easing: "cubic-bezier(.5,0,.2,1)", fill: "forwards" }).onfinish = function () {
        /* 3) sayfanın içine dalış: kitap büyür ve söner, sahne ışıktan belirir */
        k.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(4.5)", opacity: 0 }], { duration: 1000, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () { k.remove(); };
        yeni.style.opacity = "";
        yeni.animate([{ transform: "scale(.4)", opacity: 0, filter: "blur(14px) brightness(2)" }, { transform: "scale(1)", opacity: 1, filter: "blur(0) brightness(1)" }], { duration: 1300, delay: 150, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
        setTimeout(function () { var ilk = yeni.querySelector(".sk-kapi, .sk-nokta"); (ilk || kapatBtn).focus({ preventScroll: true }); }, 1100);
      };
    };
  }

  function kapatIstek() {
    /* Geçmişte açtığımız adımları geri sar; popstate gerisini yapar */
    var n = yigin.length;
    if (n && history.state && history.state.sahne) history.go(-n); else kapat();
  }

  function kapat() {
    if (!aktif) return;
    var el = aktif.el, cilt = kaynakCilt;
    var bitir = function () {
      el.remove();
      kok.querySelectorAll(".sk-sahne").forEach(function (s) { s.remove(); });
      kok.hidden = true;
      document.documentElement.classList.remove("sahne-acik");
      aktif = null; yigin = [];
      cancelAnimationFrame(dongu); dongu = 0;
      if (cilt) { cilt.focus({ preventScroll: true }); if (!azalt) cilt.animate([{ transform: "translateY(-1.4rem)" }, { transform: "translateY(0)" }], { duration: 700, easing: "cubic-bezier(.3,1.4,.4,1)" }); }
    };
    if (azalt) return bitir();
    if (cilt) {
      var r = cilt.getBoundingClientRect();
      el.style.transformOrigin = ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1) + "% " + ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(1) + "%";
    }
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
    if (!aktif) { if (hedef) ac(hedef, null); return; }
    if (!hedef) return kapat();
    var i = yigin.lastIndexOf(hedef);
    if (i === yigin.length - 1) return;
    if (i > -1) { while (yigin.length - 1 > i + 1) yigin.pop(); geri(); }
    else git(hedef, null, true);
  });

  /* Adres çubuğunda #sahne-latince gibi bir bağlantıyla gelinirse doğrudan o sahne açılır */
  document.addEventListener("DOMContentLoaded", function () {
    var m = location.hash.match(/^#sahne-([\w-]+)$/);
    if (!m || !SAHNELER[m[1]]) return;
    var zincir = [m[1]];
    while (SAHNELER[zincir[0]].ust) zincir.unshift(SAHNELER[zincir[0]].ust);
    history.replaceState(null, "", location.pathname + location.search);
    var cilt = document.querySelector('.cilt[data-sahne="' + zincir[0] + '"]');
    ac(zincir[0], null);
    kaynakCilt = cilt;
    for (var i = 1; i < zincir.length; i++) git(zincir[i], null);
  });

  window.SAHNE = { kaydet: function (id, tanim) { SAHNELER[id] = tanim; }, ac: ac, h: h, var: function (id) { return !!SAHNELER[id]; } };
})();
