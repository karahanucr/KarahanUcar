/* Sayfa hareketleri ve atmosfer: bölüm geçişleri, orman, yıldızlar, sesler, imleç ışığı, logo ateşi, hava/rüzgâr/şimşek, kor.
   Azaltılmış harekette hareketli olanların hiçbiri çalışmaz (orman/yıldızlar durağan, sesler isteğe bağlı kalır). */
(function () {
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var gokSesi = null, sesHazirla = null; // ses bloğu doldurur; şimşek/hava blokları çağırır

  /* 1) Bölümler kaydırdıkça yumuşakça belirir (yalnız opacity/transform: yerleşim sıçramaz) */
  var bolumler = document.querySelectorAll(".reveal");
  if (azalt || !("IntersectionObserver" in window)) {
    bolumler.forEach(function (b) { b.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (kayitlar) {
      kayitlar.forEach(function (k) {
        if (k.isIntersecting) { k.target.classList.add("in"); io.unobserve(k.target); }
      });
    }, { threshold: 0.12 });
    bolumler.forEach(function (b) { io.observe(b); });
  }

  /* 2) Giriş manzarası: çam ormanı, kapsayıcının gerçek piksel ölçüsüne göre kurulur (tepeler kesilmez).
        Her ağaç farklı boyda/ince-kalın/kat sayısında; rüzgârda kendi ritminde sallanır (CSS). */
  var ormanKap = document.querySelector(".orman");
  var NS = "http://www.w3.org/2000/svg";
  function ormanKur() {
    if (!ormanKap) return;
    var W = ormanKap.clientWidth, H = ormanKap.clientHeight;
    if (!W || !H) return;
    ormanKap.textContent = "";
    var tohum = 7;
    var r = function () { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; };
    var f1 = function (x) { return x.toFixed(1); };
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("preserveAspectRatio", "xMidYMax meet");

    function cam(cx, by, h, n, wf, karli) {
      var govde = "", kar = "", kat = h * 0.42, adim = (h * 0.6) / (n - 1);
      for (var i = 0; i < n; i++) {
        var ay = by - h + i * adim, hw = h * wf * (1 + i * 1.65 / (n - 1)), sh = kat * 0.2, sw = hw * 0.2;
        govde += "M" + f1(cx) + " " + f1(ay) + "L" + f1(cx + hw) + " " + f1(ay + kat) + "L" + f1(cx - hw) + " " + f1(ay + kat) + "Z";
        if (karli) kar += "M" + f1(cx) + " " + f1(ay) + "L" + f1(cx + sw) + " " + f1(ay + sh) + "L" + f1(cx - sw) + " " + f1(ay + sh) + "Z";
      }
      govde += "M" + f1(cx - 2.5) + " " + f1(by - h * 0.06) + "h5v" + f1(h * 0.06) + "h-5Z";
      return [govde, kar];
    }
    var katmanlar = [
      { renk: ["#17273a", "#1a2b40", "#15243a", "#1d2f45"], kar: "#7d94ae", aralik: 46, hmin: 0.4, hmax: 0.72 },
      { renk: ["#0a120e", "#0c1510", "#08100c", "#0d1712"], kar: "#b4c4d6", aralik: 70, hmin: 0.5, hmax: 0.98 }
    ];
    katmanlar.forEach(function (k) {
      var g = document.createElementNS(NS, "g"), adet = Math.max(6, Math.round(W / k.aralik)), bant = W / adet;
      for (var i = 0; i < adet; i++) {
        if (r() < 0.1) continue; // ara sıra boşluk: düzenli dizilim izlenimini kır
        var cx = bant * (i + 0.5) + (r() - 0.5) * bant * 1.3;
        var h = H * (k.hmin + r() * r() * (k.hmax - k.hmin) + (r() < 0.25 ? (k.hmax - k.hmin) * 0.35 : 0));
        h = Math.min(h, H * 0.985);
        var n = 3 + Math.floor(r() * 3), wf = 0.075 + r() * 0.06, karli = r() < 0.75;
        var p = cam(cx, H + 2, h, n, wf, karli);
        var t = document.createElementNS(NS, "g"), b = document.createElementNS(NS, "path");
        t.setAttribute("class", "cam");
        t.style.setProperty("--rd", (3.4 + r() * 3.8).toFixed(1) + "s");
        t.style.setProperty("--rg", (-r() * 7).toFixed(1) + "s");
        t.style.setProperty("--ra", (0.6 + r() * 0.95).toFixed(2));
        b.setAttribute("d", p[0]); b.setAttribute("fill", k.renk[Math.floor(r() * k.renk.length)]);
        t.appendChild(b);
        if (karli) {
          var s = document.createElementNS(NS, "path");
          s.setAttribute("d", p[1]); s.setAttribute("fill", k.kar); s.setAttribute("fill-opacity", ".7");
          t.appendChild(s);
        }
        g.appendChild(t);
      }
      svg.appendChild(g);
    });
    ormanKap.appendChild(svg);
  }
  ormanKur();
  var ormanZaman = 0, ormanGen = ormanKap ? ormanKap.clientWidth : 0;
  window.addEventListener("resize", function () {
    clearTimeout(ormanZaman);
    ormanZaman = setTimeout(function () { if (ormanKap && ormanKap.clientWidth !== ormanGen) { ormanGen = ormanKap.clientWidth; ormanKur(); } }, 200);
  });

  /* 2b) Yıldızlar: gökyüzünün üst kısmında (ayın bulunduğu bölgede) titreşen yıldızlar */
  var yildizKap = document.querySelector(".yildizlar");
  if (yildizKap) {
    for (var yi = 0; yi < 95; yi++) {
      var y = document.createElement("i"), boy = 1 + Math.pow(Math.random(), 2) * 2.3;
      y.style.left = (Math.random() * 100).toFixed(1) + "%";
      y.style.top = (Math.random() * 96).toFixed(1) + "%";
      y.style.setProperty("--b", boy.toFixed(1) + "px");
      y.style.setProperty("--t", (2.4 + Math.random() * 3.8).toFixed(1) + "s");
      y.style.setProperty("--g", (-Math.random() * 6).toFixed(1) + "s");
      yildizKap.appendChild(y);
    }
  }

  /* 3) Sesler: tarayıcıda üretilen şömine, yağmur ve rüzgâr (dosya/telif yok); yalnızca tıklayınca başlar.
        Üçü bağımsız açılıp kapanır (birlikte de çalışabilir); "Kapalı" hepsini susturur. */
  (function () {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    var ctx = null, master, katman = {}, acik = { somine: false, yagmur: false, ruzgar: false }, tampBeyaz, kahveTamp;
    var sentez = {}, gercek = { somine: null, yagmur: null }; // gerçek CC0 kayıt yüklenirse üretilen ses susar

    function tampon(sn, kahverengi) {
      var n = Math.floor(ctx.sampleRate * sn), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0), son = 0;
      for (var i = 0; i < n; i++) {
        var w = Math.random() * 2 - 1;
        if (kahverengi) { son = (son + 0.02 * w) / 1.02; d[i] = son * 3.5; } else { d[i] = w; }
      }
      return b;
    }
    function dongu(buf, tip, frekans, hedef) {
      var s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
      var f = ctx.createBiquadFilter(); f.type = tip; f.frequency.value = frekans;
      s.connect(f); f.connect(hedef); s.start();
      return f;
    }
    function lfo(frekans, derinlik, hedefParam) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = frekans; g.gain.value = derinlik;
      o.connect(g); g.connect(hedefParam); o.start();
    }
    function kur() {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.45; master.connect(ctx.destination);      tampBeyaz = tampon(4, false);
      var kahve = kahveTamp = tampon(6, true);

      /* yağmur (üretilen ses; gerçek kayıt gelince yerini ona bırakır) */
      katman.yagmur = ctx.createGain(); katman.yagmur.gain.value = 0; katman.yagmur.connect(master);
      sentez.yagmur = ctx.createGain(); sentez.yagmur.connect(katman.yagmur);
      var yf = ctx.createBiquadFilter(); yf.type = "lowpass"; yf.frequency.value = 7500; yf.connect(sentez.yagmur);
      dongu(tampBeyaz, "highpass", 900, yf);
      var ya = ctx.createGain(); ya.gain.value = 0.55; ya.connect(sentez.yagmur);
      dongu(kahve, "lowpass", 1100, ya);

      /* şömine (üretilen ses; gerçek kayıt gelince yerini ona bırakır) */
      katman.somine = ctx.createGain(); katman.somine.gain.value = 0; katman.somine.connect(master);
      sentez.somine = ctx.createGain(); sentez.somine.connect(katman.somine);
      var sa = ctx.createGain(); sa.gain.value = 0.9; sa.connect(sentez.somine);
      dongu(kahve, "lowpass", 260, sa);
      var hs = ctx.createGain(); hs.gain.value = 0.05; hs.connect(sentez.somine);
      dongu(tampBeyaz, "bandpass", 3200, hs);
      (function patla() {
        if (acik.somine && !gercek.somine) {
          var kez = Math.random() < 0.25 ? 3 : 1;
          for (var i = 0; i < kez; i++) {
            var s = ctx.createBufferSource(); s.buffer = tampBeyaz;
            var f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 700 + Math.random() * 4300; f.Q.value = 0.8 + Math.random() * 3;
            var g = ctx.createGain(), t = ctx.currentTime + i * (0.012 + Math.random() * 0.03), tepe = 0.15 + Math.random() * (Math.random() < 0.12 ? 0.9 : 0.4), sn = 0.01 + Math.random() * 0.05;
            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(tepe, t + 0.002);
            g.gain.exponentialRampToValueAtTime(0.0001, t + sn);
            s.connect(f); f.connect(g); g.connect(sentez.somine);
            s.start(t, Math.random() * 3, sn + 0.02);
          }
        }
        setTimeout(patla, 45 + Math.random() * 380);
      })();

      /* rüzgâr: yavaşça yükselip alçalan esintiler, hafif ıslık ve alçak uğultu */
      katman.ruzgar = ctx.createGain(); katman.ruzgar.gain.value = 0; katman.ruzgar.connect(master);
      var rz = ctx.createGain(); rz.gain.value = 0.5; rz.connect(katman.ruzgar);
      var rf = dongu(tampBeyaz, "bandpass", 520, rz); rf.Q.value = 0.7;
      lfo(0.09, 0.32, rz.gain); lfo(0.23, 0.14, rz.gain); lfo(0.07, 260, rf.frequency);
      var iz = ctx.createGain(); iz.gain.value = 0.04; iz.connect(katman.ruzgar);
      var izf = dongu(tampBeyaz, "bandpass", 1500, iz); izf.Q.value = 8;
      lfo(0.09, 0.04, iz.gain); lfo(0.05, 380, izf.frequency);
      var ug = ctx.createGain(); ug.gain.value = 0.35; ug.connect(katman.ruzgar);
      dongu(kahve, "lowpass", 190, ug);

      /* gök gürültüsü: şimşek görsel efekti çakınca (Dışarıda: Yağmur seçiliyken) 1–2 sn sonra gelir
         (ışık sesten hızlı olduğu için önce şimşek görülür, gürültü sonra duyulur). Ses bağlamı bir kez
         kurulduysa (herhangi bir Ses düğmesine basılmış olsun), ayrı "Ses: Yağmur" açık olmasa da çalar —
         gürültü görseldeki şimşeğe bağlıdır, ayrı bir sese değil. */
      gokSesi = function (gecikme) {
        if (!ctx) return;
        var t0 = ctx.currentTime + gecikme;
        var s = ctx.createBufferSource(); s.buffer = kahveTamp;
        var f = ctx.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 0.8;
        f.frequency.setValueAtTime(520, t0); f.frequency.exponentialRampToValueAtTime(70, t0 + 4.6);
        var g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.linearRampToValueAtTime(0.68, t0 + 0.4);
        g.gain.exponentialRampToValueAtTime(0.2, t0 + 1.7);
        g.gain.linearRampToValueAtTime(0.5, t0 + 2.2);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 5.2);
        s.connect(f); f.connect(g); g.connect(master);
        s.start(t0, Math.random() * 0.5, 5.4);
      };

      /* gerçek CC0 kayıtlar (varsa): döngüye alınır, üretilen ses susar; yüklenemezse üretilen ses sürer */
      function gercekYukle(ad, url, seviye) {
        fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
          .then(function (b) { return new Promise(function (ok, hata) { ctx.decodeAudioData(b, ok, hata); }); })
          .then(function (buf) {
            var s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
            var g = ctx.createGain(); g.gain.value = seviye; s.connect(g); g.connect(katman[ad]); s.start();
            gercek[ad] = buf; sentez[ad].gain.setTargetAtTime(0, ctx.currentTime, 0.3);
          }).catch(function () {});
      }
      gercekYukle("somine", "assets/ses/somine.wav", 0.9);
      gercekYukle("yagmur", "assets/ses/yagmur.mp3", 0.8);
    }
    /* Ambiyans sesi açık olmasa da gök gürültüsünün çalabilmesi için ses bağlamını sessizce hazırlar
       (yalnız gerçek bir tıklamadan çağrılır; tarayıcı kuralları gereği). */
    sesHazirla = function () { if (!ctx) kur(); else if (ctx.state === "suspended") ctx.resume(); };
    function uygula() {
      var herhangi = acik.somine || acik.yagmur || acik.ruzgar;
      if (herhangi) { if (!ctx) kur(); if (ctx.state === "suspended") ctx.resume(); }
      if (!ctx) return;
      var t = ctx.currentTime;
      ["somine", "yagmur", "ruzgar"].forEach(function (k) { katman[k].gain.setTargetAtTime(acik[k] ? 1 : 0, t, 0.5); });
    }
    document.addEventListener("visibilitychange", function () {
      if (!ctx) return;
      if (document.hidden) ctx.suspend(); else if (acik.somine || acik.yagmur || acik.ruzgar) ctx.resume();
    });

    var kutu = document.createElement("div");
    kutu.className = "hava-anahtar ses-anahtar";
    kutu.setAttribute("role", "group");
    kutu.setAttribute("aria-label", "Ortam sesi");
    kutu.appendChild(document.createTextNode("Ses: "));
    function isaretle() {
      kutu.querySelectorAll("button").forEach(function (x) {
        var k = x.dataset.tur;
        x.setAttribute("aria-pressed", String(k === "kapali" ? !(acik.somine || acik.yagmur || acik.ruzgar) : acik[k]));
      });
    }
    [["somine", "Şömine"], ["yagmur", "Yağmur"], ["ruzgar", "Rüzgâr"], ["kapali", "Kapalı"]].forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = t[1]; b.dataset.tur = t[0];
      b.addEventListener("click", function () {
        if (t[0] === "kapali") { acik.somine = acik.yagmur = acik.ruzgar = false; } else { acik[t[0]] = !acik[t[0]]; }
        uygula(); isaretle();
      });
      kutu.appendChild(b);
    });
    isaretle();
    document.body.appendChild(kutu);
  })();

  /* 3b-2) Gramofon → alt radyo çubuğu: yalnız tıklayınca YouTube IFrame API yüklenir (KVKK: önceden hiçbir şey çekilmez).
     Video karesi küçük tutulur; çal/duraklat/ileri/geri/sessiz kendi düğmelerimizle YouTube'un JS API'siyle yapılır.
     Bir parça gömülemezse (embedding kapalı, "Hata 153" vb.) YouTube'un çirkin hata kartı yerine otomatik olarak
     listede bir sonrakine geçilir. İşlevsel olduğu için "hareketi azalt" dönüşünden ÖNCE bağlanır. */
  (function () {
    var buton = document.querySelector(".gramofon"), panel = document.querySelector(".radyo");
    if (!buton || !panel) return;
    var kapat = panel.querySelector(".radyo-kapat"), oynatBtn = panel.querySelector(".radyo-oynat"),
        geriBtn = panel.querySelector(".radyo-geri"), ileriBtn = panel.querySelector(".radyo-ileri"),
        sessizBtn = panel.querySelector(".radyo-sessiz"), baslik = panel.querySelector(".radyo-baslik"),
        durum = panel.querySelector(".radyo-durum");
    var LISTE = "PL8F6B0753B2CCA128", VIDEO = "_40V2lcxM7k";
    var oynatici = null, apiSoz = null, atlamaSayaci = 0;

    function apiYukle() {
      if (window.YT && window.YT.Player) return Promise.resolve();
      if (apiSoz) return apiSoz;
      apiSoz = new Promise(function (tamam) {
        var onceki = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () { if (onceki) onceki(); tamam(); };
        var s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      });
      return apiSoz;
    }

    function baslikGuncelle() {
      try { var v = oynatici.getVideoData(); baslik.textContent = (v && v.title) || "Müzik"; } catch (e) {}
    }

    function ac() {
      panel.hidden = false; document.body.classList.add("radyo-acik");
      buton.setAttribute("aria-expanded", "true");
      if (oynatici) { oynatici.playVideo(); return; }
      durum.textContent = "yükleniyor…";
      apiYukle().then(function () {
        oynatici = new YT.Player("radyo-oynatici", {
          videoId: VIDEO,
          playerVars: { list: LISTE, listType: "playlist", autoplay: 1, playsinline: 1, modestbranding: 1, rel: 0 },
          events: {
            onReady: function (e) { e.target.playVideo(); },
            onStateChange: function (e) {
              if (e.data === YT.PlayerState.PLAYING) { atlamaSayaci = 0; durum.textContent = ""; oynatBtn.textContent = "❚❚"; oynatBtn.setAttribute("aria-pressed", "true"); baslikGuncelle(); }
              else if (e.data === YT.PlayerState.PAUSED) { oynatBtn.textContent = "▶"; oynatBtn.setAttribute("aria-pressed", "false"); }
              else if (e.data === YT.PlayerState.CUED) { baslikGuncelle(); }
            },
            onError: function () {
              /* Gömme izni olmayan/kaldırılmış bir parça: YouTube'un hata kartını göstermek yerine sessizce bir sonrakine geç */
              atlamaSayaci++;
              if (atlamaSayaci > 12) { durum.textContent = "Bu listede oynatılabilen parça bulunamadı."; return; }
              durum.textContent = "bu parça atlanıyor…";
              oynatici.nextVideo();
            }
          }
        });
      });
    }
    function kapa() {
      panel.hidden = true; document.body.classList.remove("radyo-acik");
      buton.setAttribute("aria-expanded", "false"); buton.focus();
      if (oynatici) { try { oynatici.stopVideo(); } catch (e) {} }
    }
    buton.addEventListener("click", ac);
    kapat.addEventListener("click", kapa);
    oynatBtn.addEventListener("click", function () {
      if (!oynatici) return;
      var s = oynatici.getPlayerState();
      if (s === YT.PlayerState.PLAYING) oynatici.pauseVideo(); else oynatici.playVideo();
    });
    geriBtn.addEventListener("click", function () { if (oynatici) oynatici.previousVideo(); });
    ileriBtn.addEventListener("click", function () { if (oynatici) oynatici.nextVideo(); });
    sessizBtn.addEventListener("click", function () {
      if (!oynatici) return;
      var s = oynatici.isMuted();
      if (s) { oynatici.unMute(); sessizBtn.textContent = "🔊"; sessizBtn.setAttribute("aria-pressed", "false"); }
      else { oynatici.mute(); sessizBtn.textContent = "🔇"; sessizBtn.setAttribute("aria-pressed", "true"); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) kapa(); });
  })();

  if (azalt) return;

  /* 3b) Ara sıra kayan yıldız */
  if (yildizKap) {
    var kaydir = function () {
      if (!document.hidden) {
        var e = document.createElement("span");
        e.className = "kayan";
        e.style.left = (35 + Math.random() * 60).toFixed(1) + "%";
        e.style.top = (3 + Math.random() * 40).toFixed(1) + "%";
        yildizKap.appendChild(e);
        setTimeout(function () { if (e.parentNode) e.parentNode.removeChild(e); }, 1500);
      }
      setTimeout(kaydir, 6000 + Math.random() * 9000);
    };
    setTimeout(kaydir, 3000);
  }

  /* 3c) Kabin görselindeki pencerede yağan kar */
  var kabinKar = document.querySelector(".k-kar");
  if (kabinKar) {
    for (var ki = 0; ki < 28; ki++) {
      var kf = document.createElement("i"), ks = 5 + Math.random() * 6;
      kf.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
      kf.style.setProperty("--b", (1.2 + Math.random() * 2.2).toFixed(1) + "px");
      kf.style.setProperty("--s", ks.toFixed(1) + "s");
      kf.style.setProperty("--d", (-Math.random() * ks).toFixed(1) + "s");
      kf.style.setProperty("--dx", (-25 + Math.random() * 40).toFixed(0) + "px");
      kabinKar.appendChild(kf);
    }
  }

  /* 4) İmleç ışığı: fare gösterge aygıtlarında imlecin çevresinde titreyen sıcak ışık (asıl imleç görünür kalır) */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var isik = document.createElement("div");
    isik.className = "imlec";
    isik.setAttribute("aria-hidden", "true");
    document.body.appendChild(isik);
    var mx = 0, my = 0, bekliyor = false;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      isik.classList.add("gorunur");
      isik.classList.toggle("buyuk", !!(e.target.closest && e.target.closest("a, button, summary, .card")));
      if (!bekliyor) {
        bekliyor = true;
        requestAnimationFrame(function () {
          isik.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
          bekliyor = false;
        });
      }
    });
    document.addEventListener("mouseleave", function () { isik.classList.remove("gorunur"); });
  }

  /* 5) Logo ateşi: gürültü frekansı yavaşça değişir (SMIL yerine JS; ~30 kare/sn) */
  var gurultu = document.getElementById("ates-gurultu");
  var sonAlev = 0;
  function alev(t) {
    if (gurultu && !document.hidden && t - sonAlev > 33) {
      sonAlev = t;
      var s = t / 1000;
      var fx = 0.012 + 0.003 * Math.sin(s * 0.9) + 0.0015 * Math.sin(s * 2.3);
      var fy = 0.032 + 0.008 * Math.sin(s * 1.1 + 1) + 0.004 * Math.sin(s * 3.1);
      gurultu.setAttribute("baseFrequency", fx.toFixed(4) + " " + fy.toFixed(4));
    }
    requestAnimationFrame(alev);
  }
  requestAnimationFrame(alev);

  /* 6) Dışarıdaki hava: kar/yağmur + isteğe bağlı rüzgâr (savrulan yapraklar) + yağmurda ara sıra sönük şimşek */
  var havaTuval = document.getElementById("hava");
  if (havaTuval && havaTuval.getContext) {
    var hc = havaTuval.getContext("2d"), hw = 0, hh = 0, ps = [], yp = [], tur = "kar", ruzgar = false, esinti = 0;
    var hdpr = Math.min(window.devicePixelRatio || 1, 2);
    var yaprakRenk = ["#c98a3a", "#a5622a", "#d8b35a", "#7e8a3c", "#8c4a2a", "#b7733a"];
    try {
      var kay = window.localStorage.getItem("hava"); if (kay === "kar" || kay === "yagmur" || kay === "kapali") tur = kay;
      ruzgar = window.localStorage.getItem("ruzgar") === "1";
    } catch (e) {}

    var yeniH = function (ilk) {
      var s = Math.random();
      if (tur === "kar") return { x: Math.random() * hw, y: ilk ? Math.random() * hh : -10, r: 0.8 + s * 2.2, v: 0.25 + s * 0.9, f: Math.random() * 6.28, a: 0.25 + s * 0.45 };
      return { x: Math.random() * (hw + 80), y: ilk ? Math.random() * hh : -30, l: 10 + s * 14, v: 9 + s * 9, a: 0.10 + s * 0.22 };
    };
    var yeniYaprak = function (ilk) {
      return { x: ilk ? Math.random() * hw : -20 - Math.random() * 120, y: Math.random() * hh, s: 3 + Math.random() * 4.5, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.12,
        vx: 1.4 + Math.random() * 2.6, ph: Math.random() * 6.28, c: yaprakRenk[Math.floor(Math.random() * yaprakRenk.length)], a: 0.55 + Math.random() * 0.4 };
    };
    var kur = function () {
      ps = []; yp = [];
      hc.clearRect(0, 0, hw, hh);
      var n = tur === "kar" ? Math.min(150, Math.round(hw * hh / 11000)) : tur === "yagmur" ? Math.min(160, Math.round(hw * hh / 9000)) : 0;
      for (var i = 0; i < n; i++) ps.push(yeniH(true));
      if (ruzgar) { var m = Math.min(34, Math.round(hw * hh / 40000) + 8); for (var j = 0; j < m; j++) yp.push(yeniYaprak(true)); }
      document.documentElement.classList.toggle("ruzgarli", ruzgar);
    };
    var hBoyut = function () {
      hw = window.innerWidth; hh = window.innerHeight;
      havaTuval.width = hw * hdpr; havaTuval.height = hh * hdpr;
      hc.setTransform(hdpr, 0, 0, hdpr, 0, 0);
      kur();
    };
    var hCiz = function (zaman) {
      if (!document.hidden && (tur !== "kapali" || ruzgar)) {
        hc.clearRect(0, 0, hw, hh);
        var t = zaman / 1000;
        esinti = ruzgar ? Math.max(0, 0.7 + 0.5 * Math.sin(t * 0.45) + 0.3 * Math.sin(t * 1.3 + 1)) : 0;
        var gun = document.documentElement.classList.contains("gunduz"); // gündüzde beyaz kar/açık yağmur kremde görünmez → koyu mavi-gri
        for (var i = 0; i < ps.length; i++) {
          var p = ps[i];
          if (tur === "kar") {
            p.y += p.v; p.f += 0.012; p.x += Math.sin(p.f) * 0.35 + esinti * (0.8 + p.r * 0.5);
            hc.beginPath(); hc.arc(p.x, p.y, p.r, 0, 6.2832);
            hc.fillStyle = (gun ? "rgba(120,140,170," : "rgba(236,242,255,") + p.a.toFixed(2) + ")"; hc.fill();
            if (p.x > hw + 8) p.x = -8;
            if (p.y > hh + 6) ps[i] = yeniH(false);
          } else if (tur === "yagmur") {
            p.y += p.v; p.x -= p.v * 0.16; p.x += esinti * 2.6;
            var egim = -p.l * 0.16 + esinti * p.l * 0.28;
            hc.beginPath(); hc.moveTo(p.x, p.y); hc.lineTo(p.x + egim, p.y + p.l);
            hc.strokeStyle = (gun ? "rgba(90,110,140," : "rgba(190,208,232,") + p.a.toFixed(2) + ")"; hc.lineWidth = 1; hc.stroke();
            if (p.x > hw + 10) p.x = -10;
            if (p.y > hh + 30) ps[i] = yeniH(false);
          }
        }
        for (var k = 0; k < yp.length; k++) {
          var q = yp[k];
          q.x += q.vx * (0.35 + esinti * 1.5);
          q.y += Math.sin(t * 2 + q.ph) * (0.8 + esinti) + 0.12;
          q.rot += q.vr * (1 + esinti * 3);
          hc.save(); hc.translate(q.x, q.y); hc.rotate(q.rot); hc.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(t * 1.5 + q.ph)));
          hc.globalAlpha = q.a; hc.fillStyle = q.c;
          hc.beginPath(); hc.moveTo(0, -q.s); hc.quadraticCurveTo(q.s * 0.85, 0, 0, q.s); hc.quadraticCurveTo(-q.s * 0.85, 0, 0, -q.s); hc.fill();
          hc.restore();
          if (q.x > hw + 24 || q.y < -30 || q.y > hh + 30) yp[k] = yeniYaprak(false);
        }
      }
      requestAnimationFrame(hCiz);
    };

    var kutu = document.createElement("div");
    kutu.className = "hava-anahtar";
    kutu.setAttribute("role", "group");
    kutu.setAttribute("aria-label", "Dışarıdaki hava");
    kutu.appendChild(document.createTextNode("Dışarıda: "));
    var isaretleH = function () {
      kutu.querySelectorAll("button").forEach(function (x) {
        var k = x.dataset.tur, basili;
        if (k === "ruzgar") basili = ruzgar; else if (k === "kapali") basili = tur === "kapali" && !ruzgar; else basili = tur === k;
        x.setAttribute("aria-pressed", String(basili));
      });
    };
    var kaydet = function () { try { window.localStorage.setItem("hava", tur); window.localStorage.setItem("ruzgar", ruzgar ? "1" : "0"); } catch (e) {} };
    [["kar", "Kar"], ["yagmur", "Yağmur"], ["ruzgar", "Rüzgâr"], ["kapali", "Kapalı"]].forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = t[1]; b.dataset.tur = t[0];
      b.addEventListener("click", function () {
        if (t[0] === "ruzgar") { ruzgar = !ruzgar; } else if (t[0] === "kapali") { tur = "kapali"; ruzgar = false; } else { tur = t[0]; }
        if (tur === "yagmur" && sesHazirla) sesHazirla(); // gök gürültüsü çalabilsin diye ses bağlamını hazırla
        kur(); isaretleH(); kaydet();
      });
      kutu.appendChild(b);
    });
    document.body.appendChild(kutu);

    /* Yağmurda 7–19 sn arayla, çok sönük ve kısa bir şimşek */
    var simsek = document.querySelector(".simsek");
    var simsekDongusu = function () {
      if (simsek && tur === "yagmur" && !document.hidden) {
        simsek.classList.remove("cak"); void simsek.offsetWidth; simsek.classList.add("cak");
        if (gokSesi) gokSesi(1 + Math.random()); // önce ışık, 1–2 sn sonra ses
      }
      setTimeout(simsekDongusu, 7000 + Math.random() * 12000);
    };
    setTimeout(simsekDongusu, 5000);

    hBoyut(); isaretleH();
    window.addEventListener("resize", hBoyut);
    requestAnimationFrame(hCiz);
  }

  /* 7) Kahramanda yükselen kor parçacıkları */
  var tuval = document.getElementById("kor");
  if (!tuval || !tuval.getContext) return;
  var cx = tuval.getContext("2d");
  var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var parcalar = [];
  var gorunur = true, sekmeAcik = true;

  function boyutla() {
    var rc = tuval.getBoundingClientRect();
    w = rc.width; h = rc.height;
    tuval.width = w * dpr; tuval.height = h * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function yeni(ilk) {
    return {
      x: w * (0.3 + Math.random() * 0.4),
      y: ilk ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      v: 0.25 + Math.random() * 0.7,
      dr: (Math.random() - 0.5) * 0.4,
      f: Math.random() * Math.PI * 2
    };
  }
  function ciz() {
    if (gorunur && sekmeAcik) {
      cx.clearRect(0, 0, w, h);
      var renk = document.documentElement.classList.contains("gunduz") ? "rgba(190,110,30," : "rgba(232,189,98,"; // altın kor gündüz göğünde görünmez
      for (var i = 0; i < parcalar.length; i++) {
        var p = parcalar[i];
        p.y -= p.v; p.f += 0.02; p.x += Math.sin(p.f) * 0.3 + p.dr;
        var a = Math.max(0, Math.min(1, p.y / h)) * 0.75;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, 6.2832);
        cx.fillStyle = renk + a.toFixed(3) + ")";
        cx.fill();
        if (p.y < -10) parcalar[i] = yeni(false);
      }
    }
    requestAnimationFrame(ciz);
  }

  boyutla();
  var adet = w < 600 ? 22 : 42;
  for (var i = 0; i < adet; i++) parcalar.push(yeni(true));
  window.addEventListener("resize", boyutla);
  document.addEventListener("visibilitychange", function () { sekmeAcik = !document.hidden; });
  new IntersectionObserver(function (k) { gorunur = k[0].isIntersecting; }).observe(tuval);
  requestAnimationFrame(ciz);
})();
