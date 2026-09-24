/* Sahne motoru: kitaplıkta bir kitaba ya da levhaya basınca kitap açılır, büyür ve tam ekran bir sahneye dönüşür.
   Sahneler js/sahne/*.js dosyalarında SAHNE.kaydet(id, tanım) ile tanımlanır. Merkez sahnelerden (kapılar) alt sahnelere
   kamera yakınlaşarak geçilir; tarayıcının geri tuşu, Esc ve "Geri" düğmesi bir adım geri götürür.
   Tanım alanları: ad, yer, alt, ust (bir üst sahne), vurgu, isaret (parıltı biçimi: halka|yildiz|kor|kristal|yaprak|dalga),
   arka() → SVG, on() → ön katman SVG, parcacik: {tur, adet}, eserler: [{x, y, ad, panel}], kapilar: [{hedef, x, y, sanat, aciklama}],
   yakinda: [...], sozler: [{metin, dil, ceviri, kaynak}], sozGecis ("kul" ya da varsayılan buğu), sozYer ("sag"),
   sozlukce: "alan" (sözlükçe sahnesi), ses: ortam sesi anahtarı, alan (Bilgi süzgeçlerindeki alan), hazirla(el), kare(t, el),
   genislik: 1.6 gibi (1'den büyükse sahne panoramadır: çizim 1600×genislik genişliğinde yapılır, kamera sürükleyerek/fareyle kayar).
   Her alt sahnede başlığın solunda "… haritası" (js/haritalar.js), sağında "Çalışmalarım" sandığı (js/icerik.js → sandik) kendiliğinden durur.
   Merkez sahnelerde (kapilar) kapılar logonun çevresinde bir yörüngede döner; "yakinda" odalar dış yörüngede küçük uydulardır. */
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
    svg: function (ic, defs, genislik) {
      return '<svg viewBox="0 0 ' + Math.round(1600 * (genislik || 1)) + ' 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + (defs || "") + "</defs>" + ic + "</svg>";
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
        if (aktif && (arsivKapat(aktif.el) || haritaKapat(aktif.el) || panelKapat(aktif.el))) return;
        if (yigin.length > 1) history.back(); else kapatIstek();
      } else if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && aktif && !aktif.el.querySelector(".sk-harita").hidden && !/INPUT/.test(document.activeElement.tagName)) {
        var H = aktif.el.querySelector(".sk-harita"); haritaSec(aktif.el, (H._i || 0) + (e.key === "ArrowRight" ? 1 : -1)); e.preventDefault();
      } else if ((e.key === "[" || e.key === "]") && aktif && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        var kb2 = aktif.el.querySelector('.sk-kardes-btn[data-yon="' + (e.key === "]" ? 1 : -1) + '"]');
        if (kb2) { yan(kb2.dataset.hedef, e.key === "]" ? 1 : -1); e.preventDefault(); }
      } else if (e.key === "Tab") {
        var o = [].slice.call(kok.querySelectorAll("button:not([hidden]), a[href], input, [tabindex='0']")).filter(function (x) { return x.offsetParent !== null && !x.closest("[hidden]") && !x.closest(".cikiyor"); });
        if (!o.length) return;
        var ilk = o[0], son = o[o.length - 1];
        if (e.shiftKey && document.activeElement === ilk) { son.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === son) { ilk.focus(); e.preventDefault(); }
      }
    });
    window.addEventListener("resize", function () { if (aktif) { if (aktif.pc) aktif.pc.boyut(); aktif.mobil = mobilMi(); sigdir(aktif.el); if (aktif.yr) { aktif.yr.kapilar.concat(aktif.yr.uydular).forEach(function (k) { k._w = 0; }); yorungeCiz(aktif.yr, 0); } if (aktif.pan) aktif.pan.olc(); } });
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
    /* x, y: 1600×900 çizimin yüzdesi; panoramada (genislik) x 100'ü aşabilir (ör. 130 = çizimin 2080. pikseli).
       hedef: "sahne-kimligi" verilen nesne panel açmaz, bir alt sahneye geçittir (ör. Felsefe Tarihi → Antik Yunan). */
    var gen = d.genislik || 1;
    (d.eserler || []).forEach(function (e, i) {
      var gecit = e.hedef && SAHNELER[e.hedef];
      noktalar += '<button type="button" class="sk-nokta' + (gecit ? " sk-gecit" : "") + '" data-eser="' + i + '" style="--x:' + (e.x / gen).toFixed(3) + ";--y:" + e.y + ";--g:" + (0.9 + i * 0.18).toFixed(2) + 's"' + (gecit ? "" : ' aria-haspopup="dialog"') + ">" +
        '<span class="sk-halka" aria-hidden="true"><i></i></span><span class="sk-nokta-ad">' + kacis(t(e.ad)) + (gecit ? ' <b aria-hidden="true">→</b>' : "") + "</span></button>";
    });
    var altSahne = !d.kapilar && !d.sozlukce, harita = window.HARITA && window.HARITA[id];
    var harBtn = harita ? '<button type="button" class="sk-harita-btn" aria-haspopup="dialog"><span class="sk-bb-sanat" aria-hidden="true">' + HARITA_SANAT + '</span><span class="sk-nokta-ad">' + kacis(haritaAd(d)) + "</span></button>" : "";
    var sanBtn = altSahne ? '<button type="button" class="sk-sandik" aria-haspopup="dialog"><span class="sk-bb-sanat" aria-hidden="true">' + sandikSanat(id) + '</span><span class="sk-nokta-ad">' + kacis(t("Çalışmalarım")) + "</span></button>" : "";
    var yorunge = "";
    if (d.kapilar) {
      yorunge = '<div class="sk-yorunge"><div class="yr-merkez" aria-hidden="true"><span class="yr-halka"></span><span class="yr-halka yr-h2"></span><img src="assets/logo-seffaf.svg" alt="" width="120" height="120"></div>';
      d.kapilar.forEach(function (k, i) {
        var hd = SAHNELER[k.hedef];
        yorunge += '<button type="button" class="sk-kapi yr-kapi" data-hedef="' + k.hedef + '" data-i="' + i + '" style="--g:' + (0.8 + i * 0.22).toFixed(2) + 's">' +
          '<span class="sk-kapi-sanat" aria-hidden="true">' + k.sanat + '</span><span class="sk-kapi-ad">' + kacis(t(hd ? hd.ad : k.hedef)) + '</span><span class="sk-kapi-acik">' + kacis(t(k.aciklama)) + "</span></button>";
      });
      (d.yakinda || []).forEach(function (y, i) { yorunge += '<span class="yr-uydu" data-i="' + i + '" aria-hidden="true">' + kacis(t(y)) + "</span>"; });
      yorunge += "</div>" + (d.yakinda && d.yakinda.length ? '<p class="yr-not">' + kacis(t("Dış yörüngedeki odalar yakında açılacak")) + ": " + d.yakinda.map(function (y) { return kacis(t(y)); }).join(", ") + "</p>" : "");
    }
    var ek = "";
    if (d.yakinda && d.yakinda.length && !d.kapilar) {
      ek += '<div class="sk-yakinda"><span class="sk-yakinda-bas">' + kacis(t("Yakında")) + "</span>" + d.yakinda.map(function (y) { return "<span>" + kacis(t(y)) + "</span>"; }).join("") + "</div>";
    }
    /* Merkez odada bu alanın çalışmaları: Son eklenenler gibi kendi penceresinde akar; her kaydın hangi odaya ait olduğu ve etiketleri yazar */
    if (d.alan && d.kapilar) {
      var ilgili = (window.ICERIK || []).filter(function (o) { return o.tur !== "yakinda" && !o.sahne && (o.alan || []).indexOf(d.alan) > -1; })
        .sort(function (a, b) { return (b.tarih || "0").localeCompare(a.tarih || "0"); });
      if (ilgili.length) {
        ek += '<div class="sk-icerikler' + (ilgili.length > 3 ? " akar" : "") + '"><p class="sk-icerikler-bas">' + kacis(t("Bu alandaki içerikler")) + ' <span data-sabit>' + ilgili.length + '</span></p><div class="ic-pencere"><ul>' + ilgili.map(function (o) {
          var hd = window.ICERIK_HEDEF(o), yerler = (o.sandik || []).filter(function (x) { return SAHNELER[x]; }).map(function (x) { return t(SAHNELER[x].ad); });
          return '<li><a href="' + kacis(hd ? hd.href : "#") + '"' + (hd ? hd.veri : "") + "><span>" + kacis(t((window.ICERIK_TUR || {})[o.tur] || o.tur)) + "</span> " + kacis(o.baslik) + "</a>" +
            (yerler.length ? '<small class="ic-yer">→ ' + yerler.map(kacis).join(" · ") + "</small>" : "") +
            ((o.etiketler || []).length ? '<small class="ic-etiket">' + o.etiketler.slice(0, 3).map(function (e) { return "#" + kacis(e); }).join(" ") + "</small>" : "") + "</li>";
        }).join("") + "</ul></div></div>";
      }
    }
    var sozler = d.sozler || (d.soz ? [d.soz] : []);
    var soz = sozler.length ? '<blockquote class="sk-soz' + (d.sozYer ? " sk-soz-" + d.sozYer : "") + '"><p class="sk-soz-metin"></p><p class="sk-soz-ceviri"></p><cite></cite></blockquote>' : "";
    var sozluk = d.sozlukce ? sozlukceHTML(d) : "";
    var kd = kardesler(id), kardes = "";
    if (kd.length > 2) {
      var ki = kd.indexOf(id), onc = kd[(ki - 1 + kd.length) % kd.length], snr = kd[(ki + 1) % kd.length];
      kardes = '<nav class="sk-kardes" aria-label="' + kacis(t("Komşu odalar")) + '"><button type="button" class="sk-kardes-btn" data-hedef="' + onc + '" data-yon="-1"><span aria-hidden="true">‹</span> ' + kacis(t(SAHNELER[onc].ad)) + '</button><span class="sk-kardes-say" aria-hidden="true">' + (ki + 1) + " / " + kd.length + '</span><button type="button" class="sk-kardes-btn" data-hedef="' + snr + '" data-yon="1">' + kacis(t(SAHNELER[snr].ad)) + ' <span aria-hidden="true">›</span></button></nav>';
    }
    el.innerHTML =
      '<div class="sk-cerceve"><div class="sk-kat sk-arka">' + d.arka() + "</div>" + (d.on ? '<div class="sk-kat sk-on">' + d.on() + "</div>" : "") + "</div>" +
      '<canvas class="sk-tuval" aria-hidden="true"></canvas><div class="sk-perde" aria-hidden="true"></div>' +
      '<div class="sk-baslik"><p class="sk-yer">' + kacis(t(d.yer || "")) + '</p><div class="sk-baslik-satir"><h2>' + kacis(t(d.ad)) + "</h2>" + (harBtn || sanBtn ? '<div class="sk-baslik-araclar">' + harBtn + sanBtn + "</div>" : "") + '</div><p class="sk-alt">' + kacis(t(d.alt || "")) + "</p>" +
      (d.eserler ? '<p class="sk-ipucu">' + kacis(t("Parıldayan nesnelere dokun.")) + "</p>" : "") + "</div>" +
      '<div class="sk-noktalar">' + noktalar + "</div>" + yorunge + soz + ek + sozluk + kardes + (d.genislik > 1 ? '<div class="sk-pan" aria-hidden="true"><i></i></div><p class="sk-pan-ipucu" aria-hidden="true">' + kacis(t("Sürükle ya da kenara yaklaş: sahne kayar")) + "</p>" : "") +
      '<div class="sk-panel" hidden tabindex="-1"><button type="button" class="sk-panel-kapat" aria-label="' + kacis(t("Paneli kapat")) + '">×</button><div class="sk-panel-ic"></div></div>' +
      '<div class="sk-arsiv" hidden tabindex="-1" role="region"></div><div class="sk-harita" hidden tabindex="-1" role="region"></div>';
    if (d.genislik > 1) { el.classList.add("sk-genis"); el.style.setProperty("--g", d.genislik); }

    el.addEventListener("click", function (e) {
      var n = e.target.closest(".sk-nokta");
      if (n) { var es = SAHNELER[id].eserler[+n.dataset.eser]; if (es.hedef && SAHNELER[es.hedef]) git(es.hedef, n); else panelAc(el, es, n); return; }
      var sd = e.target.closest(".sk-sandik");
      if (sd) { arsivAc(el, id, sd); return; }
      var hb = e.target.closest(".sk-harita-btn");
      if (hb) { haritaAc(el, id, hb); return; }
      if (e.target.closest(".sk-harita-kapat")) { haritaKapat(el); return; }
      var dr = e.target.closest(".hr-durak");
      if (dr) { haritaSec(el, +dr.dataset.i); return; }
      var hy = e.target.closest(".hr-onceki, .hr-sonraki");
      if (hy) { var H = el.querySelector(".sk-harita"); haritaSec(el, (H._i || 0) + (hy.classList.contains("hr-sonraki") ? 1 : -1)); return; }
      /* sahnenin içinden Kanal'daki videoya ya da Yayınlar'daki belgeye: önce sahne kapanır, sonra oraya gidilir */
      var yer = e.target.closest("a[data-video], a[data-yayin]");
      if (yer) { e.preventDefault(); e.stopPropagation(); kapatIstek(); setTimeout(function () { var a2 = yer.cloneNode(true); a2.hidden = true; document.body.appendChild(a2); a2.click(); a2.remove(); }, 1000); return; }
      var k = e.target.closest(".sk-kapi");
      if (k) { if (SAHNELER[k.dataset.hedef]) git(k.dataset.hedef, k); return; }
      var kb = e.target.closest(".sk-kardes-btn");
      if (kb) { yan(kb.dataset.hedef, +kb.dataset.yon); return; }
      if (e.target.closest(".sk-panel-kapat")) { panelKapat(el); return; }
      if (e.target.closest(".sk-arsiv-kapat")) { arsivKapat(el); return; }
      var tema = e.target.closest(".ar-tema");
      if (tema) { arsivTema(el, tema.dataset.k); return; }
      var izle = e.target.closest(".ar-izle, .ar-oku");
      if (izle) { arsivIzle(izle); return; }
      var gor = e.target.closest(".ar-gorsel");
      if (gor) { var bu = el.querySelector(".sk-arsiv .ar-buyut"); bu.querySelector("img").src = gor.dataset.src; bu.hidden = false; return; }
      if (e.target.closest(".ar-buyut")) { e.target.closest(".ar-buyut").hidden = true; return; }
      var et = e.target.closest(".ar-etiket");
      if (et) { arsivTema(el, "", et.dataset.e); return; }
      if (e.target.closest(".ar-etiket-suz")) { arsivTema(el, ""); return; }
      var terim = e.target.closest(".sz-terim-bas");
      if (terim) { var li = terim.parentNode, acik = li.classList.toggle("acik"); terim.setAttribute("aria-expanded", String(acik)); return; }
      var harf = e.target.closest(".sz-harf");
      if (harf) { sozlukSuz(el, harf.dataset.harf); return; }
      if (!e.target.closest(".sk-panel, .sk-arsiv, .sk-harita, .sk-sozlukce")) panelKapat(el);
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
    if (window.TERIMCE) window.TERIMCE.uygula(ic);
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

  /* ── Başlığın iki yanındaki nesneler: solda harita, sağda logolu "Çalışmalarım" sandığı ── */
  var HARITA_SANAT = '<svg viewBox="0 0 80 64"><defs><linearGradient id="hrK" x1="0" x2="1"><stop offset="0" stop-color="#c9a870"/><stop offset=".5" stop-color="#f0dfb8"/><stop offset="1" stop-color="#c9a870"/></linearGradient></defs>' +
    '<ellipse class="sd-isik" cx="40" cy="34" rx="38" ry="26" fill="rgba(255,226,160,.25)"/>' +
    '<path d="M12 12L30 8L50 14L68 10V52L50 56L30 50L12 54Z" fill="url(#hrK)" stroke="#6a4a24" stroke-width="1.5"/><path d="M30 8V50M50 14V56" stroke="#8a6a3a" stroke-width="1" opacity=".5"/>' +
    '<path class="hr-sanat-yol" d="M18 44C24 36 30 42 36 32S48 22 56 26S62 20 64 16" fill="none" stroke="#8a2a1a" stroke-width="1.8" stroke-dasharray="3 3"/>' +
    '<path d="M60 12l4 4M64 12l-4 4" stroke="#8a2a1a" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="44" r="2.4" fill="#8a2a1a"/>' +
    '<g class="hr-sanat-pusula" transform="translate(22 20)"><circle r="6" fill="none" stroke="#6a4a24" stroke-width="1"/><path d="M0 -5L1.6 0L0 5L-1.6 0Z" fill="#8a2a1a"/></g></svg>';
  function sandikSanat(id) {
    return '<svg viewBox="0 0 80 64"><defs><radialGradient id="sdI' + id + '"><stop offset="0" stop-color="#ffe7a8"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse class="sd-isik" cx="40" cy="28" rx="34" ry="20" fill="url(#sdI' + id + ')"/>' +
      '<rect x="8" y="30" width="64" height="30" rx="3" fill="#6a3e1e"/><path d="M8 38H72M8 52H72" stroke="#3a200c" stroke-width="2"/><rect x="16" y="30" width="6" height="30" fill="#a8782a"/><rect x="58" y="30" width="6" height="30" fill="#a8782a"/>' +
      '<g class="sd-kapak"><path d="M8 30V22C8 12 20 8 40 8C60 8 72 12 72 22V30Z" fill="#7a4a24"/><path d="M8 22C8 12 20 8 40 8C60 8 72 12 72 22" fill="none" stroke="#a8782a" stroke-width="3"/><rect x="16" y="10" width="6" height="20" fill="#a8782a"/><rect x="58" y="10" width="6" height="20" fill="#a8782a"/></g>' +
      '<circle cx="40" cy="44" r="11" fill="#2a1a0c" stroke="#d9b25e" stroke-width="1.6"/><image href="assets/logo-seffaf.svg" x="31" y="35" width="18" height="18"/></svg>';
  }
  function haritaAd(d) { return t("{ad} haritası").replace("{ad}", t(d.ad)); }

  /* ── Çalışmalarım sandığı: sahnenin çalışmaları, türlere göre çekmecelerde (js/icerik.js + js/arsiv.js) ── */
  var TUR_SIMGE = { alistirma: "✎", bildiri: "❝", calistay: "⚒", ceviri: "⇄", izlence: "☰", kitap: "❧", konferans: "◎", makale: "¶", notlar: "✐", odevler: "✓",
    poster: "▦", proje: "⚙", seminer: "◉", sempozyum: "⁂", sunum: "▭", tezler: "§", video: "▶", okuma: "❧", sahne: "⌂" };
  function turAd(tur) { return t((window.ICERIK_TUR || {})[tur] || tur); }
  var AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  function tarihYaz(s) { var p = String(s || "").split("-"); return p[1] ? t(AYLAR[(+p[1] || 1) - 1]) + " " + p[0] : p[0]; }
  function arsivAc(el, id, dugme) {
    panelKapat(el); haritaKapat(el);
    var liste = window.CALISMALAR ? window.CALISMALAR(id) : [], K = window.CALISMA_KATEGORI || [];
    var a = el.querySelector(".sk-arsiv");
    var say = function (k) { return liste.filter(function (o) { return o.tur === k; }).length; };
    a.innerHTML = '<div class="ar-bas"><span class="ar-simge" aria-hidden="true"><img src="assets/logo-seffaf.svg" alt=""></span><div><p class="pn-ust">' + kacis(t("Çalışmalarım")) + "</p><h3>" + kacis(t(SAHNELER[id].ad)) + '</h3><p class="ar-sayi">' + liste.length + " " + kacis(t("içerik")) + "</p></div>" +
      '<button type="button" class="sk-arsiv-kapat" aria-label="' + kacis(t("Sandığı kapat")) + '">×</button></div>' +
      '<div class="ar-temalar" role="tablist"><button type="button" role="tab" class="ar-tema" data-k="" aria-selected="true">' + kacis(t("Tümü")) + ' <span data-sabit>' + liste.length + "</span></button>" +
      K.map(function (k) { var n = say(k); return '<button type="button" role="tab" class="ar-tema' + (n ? "" : " bos") + '" data-k="' + k + '" aria-selected="false"><i aria-hidden="true">' + (TUR_SIMGE[k] || "•") + "</i>" + kacis(turAd(k)) + ' <span data-sabit>' + n + "</span></button>"; }).join("") + "</div>" +
      '<p class="ar-etiket-suz" hidden><button type="button">' + kacis(t("Etiket")) + ': <b></b> ×</button></p><div class="ar-icerik"></div>' +
      '<div class="ar-buyut" hidden role="dialog"><img alt=""><button type="button" aria-label="' + kacis(t("Kapat")) + '">×</button></div>' +
      '<p class="ar-not">' + kacis(t("Yeni bir çalışma eklemek için: js/icerik.js dosyasına bir kayıt ekle ve sandik alanına bu sahnenin adını yaz.")) + "</p>";
    a._liste = liste;
    a.hidden = false;
    dugme.classList.add("acik");
    a._dugme = dugme;
    arsivTema(el, "");
    if (!azalt) a.animate([{ opacity: 0, transform: "translateY(30px) scale(.94)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)" });
    a.focus({ preventScroll: true });
  }
  function arsivTema(el, k, etiket) {
    var a = el.querySelector(".sk-arsiv"), liste = (a._liste || []).filter(function (o) { return (!k || o.tur === k) && (!etiket || (o.etiketler || []).indexOf(etiket) > -1); });
    a.querySelectorAll(".ar-tema").forEach(function (b) { b.setAttribute("aria-selected", String(!etiket && b.dataset.k === k)); });
    var ef = a.querySelector(".ar-etiket-suz");
    if (ef) { ef.hidden = !etiket; ef.querySelector("b").textContent = etiket ? "#" + etiket : ""; }
    var ic = a.querySelector(".ar-icerik");
    if (!liste.length) {
      ic.innerHTML = '<div class="ar-bos"><span aria-hidden="true">❦</span><p>' + kacis(t("Bu çekmece henüz boş; yakında dolacak.")) + "</p></div>";
    } else {
      ic.innerHTML = '<ul class="ar-liste">' + liste.map(function (o, i) {
        /* çalışma sandığın içinde okunur/izlenir: video, poster, PDF ya da sunum önizlemesi aynı kartta açılır */
        var eylem = "", ic2 = /^https?:/.test(o.bag || "") ? "" : (o.bag || "");
        if (o.youtube) eylem += '<button type="button" class="ar-izle" data-yt="' + kacis(o.youtube) + '">' + kacis(t("İzle")) + " ▶</button>";
        if (o.dosya) eylem += '<button type="button" class="ar-izle" data-dosya="' + kacis(o.dosya) + '">' + kacis(t("İzle")) + " ▶</button>";
        if (o.belge) eylem += '<button type="button" class="ar-oku" data-src="' + kacis(o.belge) + '">' + kacis(t("Oku")) + " ❧</button>";
        else if (/\.html?$/.test(ic2)) eylem += '<button type="button" class="ar-oku" data-src="' + kacis(ic2) + '">' + kacis(t("Önizle")) + " ◧</button>";
        if (o.belge) eylem += '<a href="' + kacis(o.belge) + '" download>' + kacis(t("İndir")) + " ⤓</a>";
        if (o.bag) eylem += '<a href="' + kacis(o.bag) + '"' + (o.yeniSekme || /^https?:/.test(o.bag) ? ' target="_blank" rel="noopener"' : "") + ">" + kacis(t("Aç")) + " →</a>";
        return '<li class="ar-oge" style="--sira:' + i + '"><span class="ar-tur" aria-hidden="true">' + (TUR_SIMGE[o.tur] || "•") + '</span><div><p class="ar-tur-ad">' + kacis(turAd(o.tur)) + (o.tarih ? " · " + kacis(tarihYaz(o.tarih)) : "") + "</p><h4>" + kacis(o.baslik) + "</h4>" + (o.aciklama ? '<p class="terimli">' + kacis(o.aciklama) + "</p>" : "") +
          (o.gorsel ? '<button type="button" class="ar-gorsel" data-src="' + kacis(o.gorsel) + '" aria-label="' + kacis(t("Büyüt")) + '"><img src="' + kacis(o.gorsel) + '" alt="" loading="lazy"></button>' : "") +
          ((o.etiketler || []).length ? '<p class="ar-etiketler">' + o.etiketler.map(function (e) { return '<button type="button" class="ar-etiket" data-e="' + kacis(e) + '">#' + kacis(e) + "</button>"; }).join("") + "</p>" : "") +
          '<div class="ar-eylem">' + eylem + '</div><div class="ar-oynatici"></div></div></li>';
      }).join("") + "</ul>";
      if (window.TERIMCE) window.TERIMCE.uygula(ic);
    }
    if (!azalt) ic.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  }
  function arsivIzle(b) {
    var yer = b.closest(".ar-oge").querySelector(".ar-oynatici");
    if (yer.firstChild && yer._kaynak === b) { yer.innerHTML = ""; yer._kaynak = null; b.closest(".ar-oge").classList.remove("genis"); return; }
    yer.innerHTML = ""; yer._kaynak = b;
    var f;
    if (b.dataset.yt) {
      f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(b.dataset.yt) + "?autoplay=1&rel=0";
      f.title = "YouTube"; f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true;
    } else if (b.dataset.dosya) {
      f = document.createElement("video"); f.src = b.dataset.dosya; f.controls = true; f.autoplay = true; f.playsInline = true;
    } else {
      f = document.createElement("iframe"); f.src = b.dataset.src; f.title = t("Önizle"); f.className = "ar-okuyucu";
    }
    yer.appendChild(f);
    b.closest(".ar-oge").classList.add("genis");
    b.closest(".ar-oge").scrollIntoView({ block: "nearest", behavior: azalt ? "auto" : "smooth" });
    if (window.SES && !b.dataset.src) window.SES.ortam(null);
  }
  function arsivKapat(el) {
    var a = el.querySelector(".sk-arsiv");
    if (!a || a.hidden) return false;
    a.hidden = true; a.innerHTML = "";
    if (a._dugme) { a._dugme.classList.remove("acik"); a._dugme.focus({ preventScroll: true }); }
    ses("fis");
    return true;
  }

  /* ── Harita: konunun tarihine kuşbakışı; duraklar eski bir haritadaki kesik çizgili yol boyunca dizilir ── */
  /* Harita durağı: { yil, ad, metin, yer?, eser?, kavram?: [..], soz?: { metin, kaynak } }; harita: { alt, donemler?: [[ilk, son, "Dönem adı"], …], duraklar } */
  var DONEM_RENK = ["rgba(176,120,60,.16)", "rgba(110,130,80,.16)", "rgba(150,80,90,.15)", "rgba(80,110,140,.15)", "rgba(140,110,50,.17)", "rgba(110,90,140,.15)"];
  function haritaAc(el, id, dugme) {
    panelKapat(el); arsivKapat(el);
    var H = window.HARITA[id], D = H.duraklar, n = D.length, dikey = mobilMi();
    var W = dikey ? 400 : 1000, Y = dikey ? 150 + (n - 1) * 104 : 520;
    var P = D.map(function (x, i) {
      return dikey ? [i % 2 ? 92 : 48, 80 + i * 104] : [70 + i * (860 / Math.max(1, n - 1)), 250 + (i % 2 ? 1 : -1) * (88 + 20 * Math.sin(i * 1.9))];
    });
    /* Catmull–Rom → Bézier: duraklardan geçen yumuşak yol */
    var yol = "M" + P[0][0] + " " + P[0][1];
    for (var i = 0; i < n - 1; i++) {
      var p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(n - 1, i + 2)];
      yol += "C" + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + " " + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + " " + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + " " + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + " " + p2[0] + " " + p2[1];
    }
    var r = h.rnd(id.length * 977 + n), sus = "";
    /* dönem kuşakları: dönemin duraklarını saran yumuşak renkli bir bölge ve kâğıda yazılmış dönem adı */
    (H.donemler || []).forEach(function (dn, k) {
      var a = P[dn[0]], b = P[Math.min(n - 1, dn[1])], renk = DONEM_RENK[k % DONEM_RENK.length];
      if (!a || !b) return;
      if (dikey) {
        sus += '<rect x="8" y="' + (a[1] - 46) + '" width="' + (W - 16) + '" height="' + (b[1] - a[1] + 92) + '" rx="22" fill="' + renk + '"/>' +
          '<text class="hr-donem" x="' + (W - 18) + '" y="' + (a[1] - 30) + '" text-anchor="end">' + kacis(dn[2]) + "</text>";
      } else {
        var x0 = a[0] - 48, x1 = b[0] + 48;
        sus += '<rect x="' + x0 + '" y="40" width="' + (x1 - x0) + '" height="' + (Y - 110) + '" rx="30" fill="' + renk + '"/>' +
          '<text class="hr-donem" x="' + ((x0 + x1) / 2) + '" y="30" text-anchor="middle">' + kacis(dn[2]) + "</text>";
      }
    });
    /* kara parçaları, eş yükselti çizgileri, dalgacıklar, küçük bir gemi */
    for (var k = 0; k < (dikey ? 4 : 6); k++) {
      var cx = r() * W, cy = 40 + r() * (Y - 120), rx = 40 + r() * 90, ry = 26 + r() * 60, ada = "";
      for (var j = 0; j < 3; j++) {
        var s2 = 1 - j * 0.28, pts = [];
        for (var q = 0; q < 12; q++) { var aq = q / 12 * 6.283, rr = 1 + (r() - 0.5) * 0.35; pts.push([(cx + Math.cos(aq) * rx * s2 * rr).toFixed(0), (cy + Math.sin(aq) * ry * s2 * rr).toFixed(0)]); }
        ada += '<path d="M' + pts.map(function (p) { return p.join(" "); }).join("L") + 'Z" fill="' + (j ? "none" : "rgba(120,90,50,.07)") + '" stroke="rgba(110,80,40,' + (0.3 - j * 0.08) + ')" stroke-width="' + (j ? 0.8 : 1.3) + '" stroke-linejoin="round"/>';
      }
      sus += ada;
    }
    for (var d2 = 0; d2 < 16; d2++) { var dx = r() * W, dy = 40 + r() * (Y - 110); sus += '<path class="hr-dalgacik" d="M' + dx.toFixed(0) + " " + dy.toFixed(0) + 'q6 -4 12 0t12 0" fill="none" stroke="rgba(80,100,110,.3)" stroke-width="1"/>'; }
    var gx = dikey ? W - 70 : 140, gy = dikey ? 40 : Y - 110;
    sus += '<g class="hr-gemi" transform="translate(' + gx + " " + gy + ')" opacity=".55"><path d="M-22 0H22L15 9H-15Z" fill="#6a4a24"/><path d="M-2 0V-30M-2 -28L14 -6H-2Z" stroke="#6a4a24" stroke-width="1.5" fill="rgba(240,225,190,.9)"/><path d="M-30 12q8 -4 16 0t16 0t16 0t16 0" stroke="rgba(80,100,110,.5)" fill="none"/></g>';
    var pusula = '<g class="hr-pusula" transform="translate(' + (dikey ? W - 50 : W - 70) + " " + (dikey ? Y - 70 : 80) + ')"><circle r="34" fill="none" stroke="rgba(110,80,40,.5)" stroke-width="1"/><circle r="26" fill="none" stroke="rgba(110,80,40,.35)" stroke-width="1" stroke-dasharray="2 3"/>' +
      '<path d="M0 -40L6 0L0 40L-6 0Z" fill="rgba(138,42,26,.75)"/><path d="M-40 0L0 -5L40 0L0 5Z" fill="rgba(110,80,40,.55)"/><text y="-44" text-anchor="middle" font-size="11" font-family="Georgia,serif" fill="#6a4a24">N</text></g>';
    /* zaman cetveli: kâğıdın altında, her durağın yılı bir çentik */
    var cetvel = "";
    if (!dikey) {
      var cy2 = Y - 34;
      cetvel = '<g class="hr-cetvel"><path d="M40 ' + cy2 + "H" + (W - 40) + '" stroke="rgba(90,55,20,.55)" stroke-width="1.2"/>' +
        P.map(function (p, i) { return '<path d="M' + p[0] + " " + (cy2 - 5) + "V" + (cy2 + 5) + '" stroke="rgba(90,55,20,.6)"/><text x="' + p[0] + '" y="' + (cy2 + 19) + '" text-anchor="middle">' + kacis(D[i].yil) + "</text>"; }).join("") +
        '<path d="M' + (W - 46) + " " + (cy2 - 4) + "L" + (W - 38) + " " + cy2 + "L" + (W - 46) + " " + (cy2 + 4) + '" fill="none" stroke="rgba(90,55,20,.6)"/></g>';
    }
    var mid = "hrM-" + id, fid = "hrF-" + id;
    var svg = '<svg viewBox="0 0 ' + W + " " + Y + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><mask id="' + mid + '"><path class="hr-maske" d="' + yol + '" pathLength="1" fill="none" stroke="#fff" stroke-width="20"/></mask>' +
      '<filter id="' + fid + '" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="' + (id.length * 7) + '"/><feDisplacementMap in="SourceGraphic" scale="14"/></filter>' +
      '<radialGradient id="hrY"><stop offset="0" stop-color="#fff2c0"/><stop offset=".4" stop-color="#ffb040" stop-opacity=".8"/><stop offset="1" stop-color="#ff8a20" stop-opacity="0"/></radialGradient></defs>' +
      sus + pusula + cetvel + '<path d="' + yol + '" fill="none" stroke="rgba(90,50,20,.18)" stroke-width="9" stroke-linecap="round" mask="url(#' + mid + ')"/>' +
      '<path class="hr-yol" d="' + yol + '" fill="none" stroke="#8a2a1a" stroke-width="2.4" stroke-dasharray="7 7" stroke-linecap="round" mask="url(#' + mid + ')"/>' +
      '<rect class="hr-kenar" x="-4" y="-4" width="' + (W + 8) + '" height="' + (Y + 8) + '" fill="none" stroke="rgba(70,35,10,.5)" stroke-width="16" filter="url(#' + fid + ')"/>' +
      '<g class="hr-yolcu"><circle r="16" fill="url(#hrY)"/><circle r="4.5" fill="#fff6d8" stroke="#8a2a1a" stroke-width="1.5"/></g></svg>';
    var duraklar = D.map(function (x, i) {
      var ust = dikey ? false : !(i % 2), yan = dikey ? "sag" : "";
      return '<button type="button" class="hr-durak' + (ust ? " ust" : "") + (yan ? " " + yan : "") + '" data-i="' + i + '" style="left:' + (P[i][0] / W * 100).toFixed(2) + "%;top:" + (P[i][1] / Y * 100).toFixed(2) + "%;--sira:" + i + '">' +
        '<span class="hr-muhur" aria-hidden="true">' + (i + 1) + '</span><span class="hr-etiket"><span class="hr-yil">' + kacis(x.yil) + '</span><span class="hr-ad">' + kacis(x.ad) + "</span></span></button>";
    }).join("");
    var m = el.querySelector(".sk-harita");
    m.innerHTML = '<div class="ar-bas"><span class="hr-simge" aria-hidden="true">' + HARITA_SANAT + '</span><div><p class="pn-ust">' + kacis(t("Harita")) + "</p><h3>" + kacis(haritaAd(SAHNELER[id])) + '</h3><p class="ar-sayi">' + kacis(H.alt || "") + "</p></div>" +
      '<button type="button" class="hr-tur" aria-pressed="false"><span aria-hidden="true">▶</span> ' + kacis(t("Yolculuğa çık")) + "</button>" +
      '<button type="button" class="sk-arsiv-kapat sk-harita-kapat" aria-label="' + kacis(t("Haritayı kapat")) + '">×</button></div>' +
      '<div class="hr-govde' + (dikey ? " dikey" : "") + '"><div class="hr-kagit"><div class="hr-tuval" style="aspect-ratio:' + W + " / " + Y + '">' + svg + duraklar + "</div></div>" +
      '<div class="hr-detay" aria-live="polite"><div class="hr-detay-ic"></div><div class="hr-gez"><button type="button" class="hr-onceki" aria-label="' + kacis(t("Önceki")) + '">‹</button><span class="hr-sayac" data-sabit></span><button type="button" class="hr-sonraki" aria-label="' + kacis(t("Sonraki")) + '">›</button></div></div></div>';
    m.hidden = false; m._id = id; m._i = -1;
    dugme.classList.add("acik"); m._dugme = dugme;
    /* her durağın yol üzerindeki uzunluğu (yolcu durağa kadar yol boyunca yürür) */
    var yolEl = m.querySelector(".hr-yol"), L = yolEl.getTotalLength(), uz = P.map(function () { return 0; });
    P.forEach(function (p, i) {
      var en = 1e9, bas = i ? uz[i - 1] : 0;
      for (var l = bas; l <= L; l += 3) { var q = yolEl.getPointAtLength(l), dd = (q.x - p[0]) * (q.x - p[0]) + (q.y - p[1]) * (q.y - p[1]); if (dd < en) { en = dd; uz[i] = l; } else if (dd > en + 4000) break; }
    });
    m._yol = yolEl; m._uz = uz; m._konum = 0;
    var yc = m.querySelector(".hr-yolcu"), p0 = yolEl.getPointAtLength(0);
    yc.setAttribute("transform", "translate(" + p0.x + " " + p0.y + ")");
    /* yolculuk: duraklar 6 sn arayla kendiliğinden gezilir; bir durağa dokununca ya da yeniden basınca durur */
    var turBtn = m.querySelector(".hr-tur");
    turBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (m._tur) return turDur(m);
      m._tur = setInterval(function () { if (m.hidden) return turDur(m); var s = (m._i + 1) % n; haritaSec(el, s, true); }, 6000);
      turBtn.setAttribute("aria-pressed", "true"); turBtn.lastChild.textContent = " " + t("Yolculuğu durdur"); turBtn.firstChild.textContent = "❚❚";
      if (m._i >= n - 1) haritaSec(el, 0, true);
    });
    if (!azalt) m.animate([{ opacity: 0, transform: "translateY(24px) scale(.96)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }], { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)" });
    setTimeout(function () { haritaSec(el, 0, true); }, azalt ? 0 : 1500);
    m.focus({ preventScroll: true });
    ses("sayfa");
  }
  function turDur(m) {
    clearInterval(m._tur); m._tur = 0;
    var b = m.querySelector(".hr-tur");
    if (b) { b.setAttribute("aria-pressed", "false"); b.lastChild.textContent = " " + t("Yolculuğa çık"); b.firstChild.textContent = "▶"; }
  }
  function haritaSec(el, i, kendi) {
    var m = el.querySelector(".sk-harita");
    if (!m || m.hidden) return;
    if (!kendi) turDur(m);
    var D = window.HARITA[m._id].duraklar, n = D.length;
    i = Math.max(0, Math.min(n - 1, i));
    if (i === m._i) return;
    m._i = i;
    m.querySelectorAll(".hr-durak").forEach(function (b, k) { b.classList.toggle("secili", k === i); b.classList.toggle("gecildi", k < i); b.setAttribute("aria-pressed", String(k === i)); });
    var x = D[i], ic = m.querySelector(".hr-detay-ic");
    ic.innerHTML = '<p class="hr-d-yil">' + kacis(x.yil) + (x.yer ? ' <span class="ayir">·</span> ' + kacis(x.yer) : "") + "</p><h4>" + kacis(x.ad) + '</h4><p class="terimli">' + kacis(x.metin) + "</p>" +
      (x.eser ? '<p class="hr-eser"><span>' + kacis(t("Anahtar eser")) + "</span> " + kacis(x.eser) + "</p>" : "") +
      (x.soz ? '<blockquote class="hr-soz"><p>' + kacis(x.soz.metin) + "</p>" + (x.soz.kaynak ? "<cite>" + kacis(x.soz.kaynak) + "</cite>" : "") + "</blockquote>" : "") +
      (x.kavram && x.kavram.length ? '<p class="hr-kavramlar terimli">' + x.kavram.map(function (k) { return "<span>" + kacis(k) + "</span>"; }).join("") + "</p>" : "");
    if (window.TERIMCE) window.TERIMCE.uygula(ic);
    m.querySelector(".hr-sayac").textContent = (i + 1) + " / " + n;
    m.querySelector(".hr-onceki").disabled = i === 0;
    m.querySelector(".hr-sonraki").disabled = i === n - 1;
    ic.scrollTop = 0;
    if (!azalt) ic.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 450, easing: "ease-out" });
    /* yolcu yol boyunca yeni durağa yürür */
    var yolEl = m._yol, yc = m.querySelector(".hr-yolcu"), bas = m._konum, hedef = m._uz[i], t0 = performance.now(), sure = azalt ? 0 : Math.min(1600, 300 + Math.abs(hedef - bas) * 2.2);
    cancelAnimationFrame(m._raf);
    (function adim(now) {
      var k = sure ? Math.min(1, (now - t0) / sure) : 1, e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      m._konum = bas + (hedef - bas) * e;
      var q = yolEl.getPointAtLength(m._konum);
      yc.setAttribute("transform", "translate(" + q.x.toFixed(1) + " " + q.y.toFixed(1) + ")");
      if (k < 1) m._raf = requestAnimationFrame(adim);
    })(t0);
    var b = m.querySelectorAll(".hr-durak")[i];
    if (b && m.querySelector(".hr-govde.dikey")) b.scrollIntoView({ block: "nearest", behavior: azalt ? "auto" : "smooth" });
    ses("tik");
  }
  function haritaKapat(el) {
    var m = el.querySelector(".sk-harita");
    if (!m || m.hidden) return false;
    cancelAnimationFrame(m._raf); turDur(m);
    m.hidden = true; m.innerHTML = "";
    if (m._dugme) { m._dugme.classList.remove("acik"); m._dugme.focus({ preventScroll: true }); }
    ses("fis");
    return true;
  }

  /* ── Yörünge: merkez sahnelerde kapılar logonun çevresinde döner; öndeki büyük ve parlak, arkadaki küçük ve sönük ── */
  function yorungeKur(el) {
    var yr = el.querySelector(".sk-yorunge");
    if (!yr) return null;
    var o = { el: yr, kapilar: [].slice.call(yr.querySelectorAll(".yr-kapi")), uydular: [].slice.call(yr.querySelectorAll(".yr-uydu")), merkez: yr.querySelector(".yr-merkez"), aci: Math.PI / 2 - 0.5, uydu: 0, hedef: null, dur: false, son: 0 };
    yr.addEventListener("pointerover", function (e) { if (e.target.closest(".yr-kapi")) o.dur = true; });
    yr.addEventListener("pointerout", function (e) { if (e.target.closest(".yr-kapi") && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(".yr-kapi"))) o.dur = false; });
    yr.addEventListener("focusin", function (e) {
      var k = e.target.closest(".yr-kapi");
      if (!k) return;
      var yer = halkaYeri(o, +k.dataset.i), iste = yer.r ? (yer.ofs + yer.j * 2 * Math.PI / yer.n - Math.PI / 2) / 0.8 : Math.PI / 2 - yer.j * 2 * Math.PI / yer.n;
      while (iste - o.aci > Math.PI) iste -= 2 * Math.PI;
      while (o.aci - iste > Math.PI) iste += 2 * Math.PI;
      o.hedef = iste; o.dur = true;
      if (azalt) { o.aci = iste; yorungeCiz(o, 0); }
    });
    yr.addEventListener("focusout", function (e) { if (!yr.contains(e.relatedTarget)) { o.dur = false; o.hedef = null; } });
    yorungeCiz(o, 0);
    return o;
  }
  /* Kalabalık merkezlerde (9'dan fazla kapı) kapılar iki halkaya bölünür: çift sıradakiler dış halkada, tekler iç halkada ters yönde döner */
  function halkaYeri(o, i) {
    var n = o.kapilar.length;
    if (n <= 9) return { r: 0, j: i, n: n, ofs: 0 };
    var n0 = Math.ceil(n / 2), n1 = n - n0;
    return i % 2 ? { r: 1, j: (i - 1) / 2, n: n1, ofs: Math.PI / n1 } : { r: 0, j: i / 2, n: n0, ofs: 0 };
  }
  function yorungeCiz(o, dt) {
    var W = window.innerWidth, H = window.innerHeight, dar = mobilMi();
    var iki = o.kapilar.length > 9;
    var cx = dar ? W / 2 : W * 0.6, cy = dar ? H * (iki ? 0.64 : 0.62) : H * (iki ? 0.63 : 0.58);
    var Rx = dar ? W * 0.3 : Math.min(W * 0.27, 470), Ry = dar ? Math.min(H * 0.17, 150) : Math.min(H * 0.2, 175);
    if (o.hedef != null) { o.aci += (o.hedef - o.aci) * Math.min(1, dt * 5); if (Math.abs(o.hedef - o.aci) < 0.001) o.hedef = null; }
    else if (!o.dur) o.aci += dt * (2 * Math.PI / 75);
    o.uydu -= dt * (2 * Math.PI / 140);
    o.merkez.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
    o.merkez.style.zIndex = iki ? String(Math.round(cy)) : "";
    var n = o.kapilar.length, kucult = n > 5 ? Math.max(0.62, 4.6 / n) : 1;
    if (n > 5 && !iki) { Rx *= 1.12; Ry *= 1.18; }
    var R = iki ? [{ rx: dar ? W * 0.4 : Math.min(W - cx - 70, 540), ry: dar ? Math.min(H * 0.2, 170) : Math.min(H * 0.22, 190), k: dar ? 0.66 : 0.8 },
      { rx: dar ? W * 0.22 : Math.min(W - cx - 70, 540) * 0.58, ry: dar ? Math.min(H * 0.11, 96) : Math.min(H * 0.12, 106), k: dar ? 0.5 : 0.62 }] : null;
    o.kapilar.forEach(function (k, i) {
      var yer = halkaYeri(o, i), a, rx = Rx, ry = Ry, kc = kucult;
      if (iki) { var hl = R[yer.r]; rx = hl.rx; ry = hl.ry; kc = hl.k; a = (yer.r ? -o.aci * 0.8 + yer.ofs : o.aci) + yer.j * 2 * Math.PI / yer.n; }
      else a = o.aci + i * 2 * Math.PI / n;
      var d = (Math.sin(a) + 1) / 2, s = (0.55 + 0.45 * d) * kc;
      if (!k._w) { k._w = k.offsetWidth; k._h = k.offsetHeight; }
      var x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      k.style.transform = "translate(" + (x - k._w / 2).toFixed(1) + "px," + (y - k._h * 0.62).toFixed(1) + "px) scale(" + s.toFixed(3) + ")";
      k.style.zIndex = String(iki ? Math.round(y) : Math.round(d * 100));
      k.style.setProperty("--derin", d.toFixed(3));
    });
    var m = o.uydular.length;
    o.uydular.forEach(function (u, i) {
      var a = o.uydu + i * 2 * Math.PI / m, d = (Math.sin(a) + 1) / 2;
      if (!u._w) u._w = u.offsetWidth;
      var x = cx + Rx * 1.34 * Math.cos(a), y = cy + Ry * 1.6 * Math.sin(a) - (dar ? 0 : 30);
      u.style.transform = "translate(" + (x - u._w / 2).toFixed(1) + "px," + y.toFixed(1) + "px) scale(" + (0.75 + 0.25 * d).toFixed(3) + ")";
      u.style.opacity = (0.3 + 0.55 * d).toFixed(2);
      u.style.zIndex = String(Math.round(d * 100) - 1);
    });
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

  /* ── Merkez odadaki içerik akışı: üç satırlık pencerede 4,5 sn'de bir satır yukarı kayar; üzerine gelince durur ── */
  function icerikAkisi(el) {
    var kap = el.querySelector(".sk-icerikler.akar");
    if (!kap || azalt) return;
    var ul = kap.querySelector("ul"), dur = false;
    kap.addEventListener("mouseenter", function () { dur = true; });
    kap.addEventListener("mouseleave", function () { dur = false; });
    kap.addEventListener("focusin", function () { dur = true; });
    kap.addEventListener("focusout", function () { dur = false; });
    var z = setInterval(function () {
      if (!kap.isConnected) { clearInterval(z); return; }
      if (dur || document.hidden) return;
      var ilk = ul.firstElementChild, hh = ilk.offsetHeight;
      var a = ul.animate([{ transform: "translateY(0)" }, { transform: "translateY(" + (-hh) + "px)" }], { duration: 800, easing: "cubic-bezier(.55,0,.25,1)" });
      ilk.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700 });
      a.onfinish = function () { ul.appendChild(ilk); ilk.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 }); };
    }, 4500);
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
    var ogeler = el.querySelectorAll(".sk-noktalar .sk-nokta, .sk-noktalar .sk-kapi");
    ogeler.forEach(function (o) { o.style.removeProperty("--dx"); o.style.removeProperty("--dy"); });
    if (mobilMi()) return;
    var W = window.innerWidth, H = window.innerHeight, ust = 64, pay = 14, genis = el.classList.contains("sk-genis");
    /* Başlık ve alıntı bölgesiyle çakışan noktalar bu bölgelerin dışına itilir */
    var engeller = [].slice.call(el.querySelectorAll(".sk-soz, .sk-baslik, .sk-kardes")).map(function (b) {
      var r = b.getBoundingClientRect(), m = b.querySelector(".sk-soz-metin, h2, .sk-alt"), g = r;
      return { l: g.left - 6, r: g.right + 6, t: g.top - 6, b: g.bottom + 6, alt: (b.classList.contains("sk-soz") && !b.classList.contains("sk-soz-sag")) || b.classList.contains("sk-kardes") };
    });
    ogeler.forEach(function (o) {
      var r = o.getBoundingClientRect(), dx = 0, dy = 0;
      if (genis) { /* panoramada yatay konum kameraya bırakılır */ } else if (r.left < pay) dx = pay - r.left; else if (r.right > W - pay) dx = W - pay - r.right;
      if (r.top < ust) dy = ust - r.top; else if (r.bottom > H - pay) dy = H - pay - r.bottom;
      engeller.forEach(function (e) {
        var L = r.left + dx, R = r.right + dx, T = r.top + dy, B = r.bottom + dy;
        if (L < e.r && R > e.l && T < e.b && B > e.t) {
          var sagaKac = e.r - L, yukariKac = B - e.t, asagiKac = e.b - T;
          if (genis) return;
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
    var a = aktif, dt = Math.min(0.1, ((tm || 0) - (a.son || tm || 0)) / 1000); a.son = tm;
    if (a.yr) yorungeCiz(a.yr, dt);
    if (a.pan) panKare(a);
    if (a.arka) a.arka.style.transform = "translate3d(" + (-fare.x * 10).toFixed(2) + "px," + (-fare.y * 7).toFixed(2) + "px,0)";
    if (a.noktalar && !a.mobil) a.noktalar.style.transform = (a.pan ? "translate(" + (-a.pan.x).toFixed(1) + "px,-50%)" : "translate(-50%,-50%)") + " translate3d(" + (-fare.x * 10).toFixed(2) + "px," + (-fare.y * 7).toFixed(2) + "px,0)";
    if (a.on) a.on.style.transform = "translate3d(" + (-fare.x * 26).toFixed(2) + "px," + (-fare.y * 16).toFixed(2) + "px,0)";
    if (a.pc) a.pc.ciz(tm);
    if (a.tanim.kare) a.tanim.kare(tm, a.el);
  }

  /* ── Panorama: genişliği ekrandan büyük sahnelerde kamera sürükleyerek, tekerlekle, ok tuşlarıyla ya da fare kenara yaklaşınca kayar.
        Böylece bir sahneye sığmayacak kadar çok parıldayan nesne eklenebilir; odaklanan nesne kendiliğinden görüş alanına gelir. ── */
  function panKur(el) {
    var c = el.querySelector(".sk-cerceve"), cubuk = el.querySelector(".sk-pan i");
    var o = { x: 0, h: 0, max: 0, surukle: null };
    o.olc = function () { o.max = Math.max(0, c.offsetWidth - window.innerWidth); o.h = Math.min(o.h, o.max); if (cubuk) { cubuk.style.width = (window.innerWidth / c.offsetWidth * 100).toFixed(1) + "%"; } };
    o.olc();
    o.h = 0; o.x = 0;
    el.addEventListener("pointerdown", function (e) { if (e.target.closest("button, a, input, .sk-panel, .sk-arsiv, .sk-harita")) return; o.surukle = { x0: e.clientX, h0: o.h }; el.classList.add("suruklu"); });
    window.addEventListener("pointermove", function (e) { if (o.surukle) o.h = Math.max(0, Math.min(o.max, o.surukle.h0 - (e.clientX - o.surukle.x0) * 1.4)); });
    window.addEventListener("pointerup", function () { o.surukle = null; el.classList.remove("suruklu"); });
    el.addEventListener("wheel", function (e) { if (e.target.closest(".sk-panel, .sk-arsiv, .sk-harita, .sk-sozlukce")) return; o.h = Math.max(0, Math.min(o.max, o.h + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY))); }, { passive: true });
    el.addEventListener("keydown", function (e) { if (e.target.matches("input")) return; if (e.key === "ArrowRight") o.h = Math.min(o.max, o.h + 160); else if (e.key === "ArrowLeft") o.h = Math.max(0, o.h - 160); });
    el.addEventListener("focusin", function (e) {
      var n = e.target.closest(".sk-noktalar .sk-nokta");
      if (!n) return;
      var r = n.getBoundingClientRect(), W = window.innerWidth;
      if (r.left < W * 0.15 || r.right > W * 0.85) o.h = Math.max(0, Math.min(o.max, o.h + (r.left + r.width / 2 - W / 2)));
    });
    return o;
  }
  function panKare(a) {
    var o = a.pan;
    if (!o.surukle && !a.mobil) { var kx = fare.hx; if (Math.abs(kx) > 0.8) o.h = Math.max(0, Math.min(o.max, o.h + (kx - Math.sign(kx) * 0.8) * 60)); }
    o.x += (o.h - o.x) * 0.08;
    a.el.querySelector(".sk-cerceve").style.transform = "translateX(" + (-o.x).toFixed(1) + "px)";
    var cubuk = a.el.querySelector(".sk-pan i");
    if (cubuk && o.max) cubuk.style.left = (o.x / (o.max + window.innerWidth) * 100).toFixed(2) + "%";
  }

  function etkinlestir(id, el) {
    var d = SAHNELER[id];
    aktif = { id: id, el: el, tanim: d, arka: el.querySelector(".sk-arka"), on: el.querySelector(".sk-on"), noktalar: el.querySelector(".sk-noktalar"), mobil: mobilMi() };
    aktif.yr = yorungeKur(el);
    if (d.genislik > 1) aktif.pan = panKur(el);
    if (d.parcacik && !azalt) aktif.pc = new Parcacik(el.querySelector(".sk-tuval"), d.parcacik);
    if (d.hazirla) d.hazirla(el, azalt);
    if (azalt && d.kare) d.kare(0, el);
    sozBaslat(el, d);
    icerikAkisi(el);
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

  /* Komşu odalar: aynı merkezin kapıları (ya da aynı odanın geçitleri), sırasıyla. Sözlükçe dışarıda kalır. */
  function kardesler(id) {
    var d = SAHNELER[id], u = d && d.ust && SAHNELER[d.ust];
    if (!u || d.sozlukce) return [];
    var l = (u.kapilar || []).map(function (k) { return k.hedef; }).concat((u.eserler || []).map(function (e) { return e.hedef; }));
    return l.filter(function (h, i) { return h && SAHNELER[h] && !SAHNELER[h].sozlukce && l.indexOf(h) === i; });
  }
  /* Yana geçiş: yığının tepesi değişir; eski oda yana kayıp söner, yenisi öbür yandan gelir */
  function yan(id, yon) {
    if (!SAHNELER[id] || !aktif || aktif.id === id || yigin.length < 2) return;
    var eski = aktif.el, yeni = kur(id);
    kok.appendChild(yeni);
    yigin[yigin.length - 1] = id;
    history.replaceState({ sahne: id }, "", "#sahne-" + id);
    eski.classList.add("cikiyor");
    eski.animate(azalt ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: "translateX(0)", opacity: 1 }, { transform: "translateX(" + (-yon * 18) + "%)", opacity: 0, filter: "blur(6px)" }], { duration: azalt ? 200 : 900, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }).onfinish = function () { eski.remove(); };
    yeni.animate(azalt ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: "translateX(" + (yon * 18) + "%)", opacity: 0, filter: "blur(6px)" }, { transform: "translateX(0)", opacity: 1, filter: "blur(0)" }], { duration: azalt ? 200 : 1000, delay: azalt ? 0 : 200, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
    etkinlestir(id, yeni);
    ses("sayfa");
    setTimeout(function () { var b = yeni.querySelector('.sk-kardes-btn[data-yon="' + yon + '"]'); if (b) b.focus({ preventScroll: true }); }, azalt ? 50 : 700);
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
    sozlukSanat: sozlukSanat, sozlukce: sozlukceKaydet, liste: function () { return Object.keys(SAHNELER); } };
})();
