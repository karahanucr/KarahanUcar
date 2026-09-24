/* Ses: tıklamaya bağlama göre değişen kısa efektler ve her sahnede sakin bir ortam müziği.
   Hiçbir ses dosyası yok; her şey tarayıcıda (Web Audio) üretilir. Tel sesleri Karplus–Strong yöntemiyle çekilir.
   Tercihler tarayıcıda hatırlanır: "Efekt" (tık sesleri) ve sahne "Ses" düğmesi (ortam müziği). */
(function () {
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  var ctx = null, efektCikis, ortamCikis, yanki, gurultuB, kahveB, ksOnbellek = {}, ortamSimdi = null, ortamAnahtar = null;
  function oku(k, v) { try { var x = localStorage.getItem(k); return x === null ? v : x === "1"; } catch (e) { return v; } }
  function yazK(k, v) { try { localStorage.setItem(k, v ? "1" : "0"); } catch (e) {} }
  var efektAcik = oku("ses-efekt", true), ortamAcik = oku("ses-ortam", true);

  function hazirla() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return true; }
    try { ctx = new AC(); } catch (e) { return false; }
    var ana = ctx.createDynamicsCompressor(); ana.threshold.value = -18; ana.ratio.value = 3; ana.connect(ctx.destination);
    yanki = ctx.createConvolver(); yanki.buffer = yankiTampon(2.6); var yG = ctx.createGain(); yG.gain.value = 0.35; yanki.connect(yG); yG.connect(ana);
    efektCikis = ctx.createGain(); efektCikis.gain.value = 0.55; efektCikis.connect(ana);
    ortamCikis = ctx.createGain(); ortamCikis.gain.value = 0.3; ortamCikis.connect(ana);
    gurultuB = tampon(2, false); kahveB = tampon(4, true);
    return true;
  }
  function tampon(sn, kahve) {
    var n = Math.floor(ctx.sampleRate * sn), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0), son = 0;
    for (var i = 0; i < n; i++) { var w = Math.random() * 2 - 1; if (kahve) { son = (son + 0.02 * w) / 1.02; d[i] = son * 3.5; } else d[i] = w; }
    return b;
  }
  function yankiTampon(sn) {
    var n = Math.floor(ctx.sampleRate * sn), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var d = b.getChannelData(c); for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6); }
    return b;
  }
  function zarf(g, t, a, tepe, kal, sure) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(tepe, t + a);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, kal), t + a + sure);
  }
  function cikis(hedef, yankiMik) {
    var g = ctx.createGain(); g.connect(hedef);
    if (yankiMik) { var y = ctx.createGain(); y.gain.value = yankiMik; g.connect(y); y.connect(yanki); }
    return g;
  }
  /* Gürültü patlaması (sayfa, yaprak, rüzgâr, ateş çıtırtısı) */
  function gurultu(hedef, t, sure, tip, frek, q, tepe, a, kahve) {
    var s = ctx.createBufferSource(); s.buffer = kahve ? kahveB : gurultuB;
    var f = ctx.createBiquadFilter(); f.type = tip; f.frequency.value = frek; f.Q.value = q || 1;
    var g = ctx.createGain(); zarf(g, t, a || 0.004, tepe, 0.0001, sure);
    s.connect(f); f.connect(g); g.connect(hedef);
    s.start(t, Math.random() * 1.5, sure + 0.1);
    return f;
  }
  function ton(hedef, t, frek, sure, tip, tepe, a, bitisFrek) {
    var o = ctx.createOscillator(); o.type = tip || "sine"; o.frequency.setValueAtTime(frek, t);
    if (bitisFrek) o.frequency.exponentialRampToValueAtTime(bitisFrek, t + sure);
    var g = ctx.createGain(); zarf(g, t, a || 0.005, tepe, 0.0001, sure);
    o.connect(g); g.connect(hedef); o.start(t); o.stop(t + sure + 0.1);
    return o;
  }
  /* Karplus–Strong tel: lir, ud, kithara */
  function ksTampon(f, sure, parlak) {
    var k = f.toFixed(1) + "|" + parlak;
    if (ksOnbellek[k]) return ksOnbellek[k];
    var sr = ctx.sampleRate, N = Math.max(2, Math.round(sr / f)), n = Math.floor(sr * sure), b = ctx.createBuffer(1, n, sr), d = b.getChannelData(0), hat = new Float32Array(N), p = 0;
    for (var i = 0; i < N; i++) hat[i] = Math.random() * 2 - 1;
    var sonum = f > 300 ? 0.996 : 0.998;
    for (i = 0; i < n; i++) { var v = hat[p], q = hat[(p + 1) % N]; hat[p] = (v * parlak + q * (1 - parlak)) * sonum; d[i] = v; p = (p + 1) % N; }
    ksOnbellek[k] = b;
    return b;
  }
  function tel(hedef, t, f, ses, parlak, sure, lp) {
    var s = ctx.createBufferSource(); s.buffer = ksTampon(f, sure || 2.4, parlak == null ? 0.5 : parlak);
    var g = ctx.createGain(); g.gain.setValueAtTime(ses, t); g.gain.exponentialRampToValueAtTime(0.0001, t + (sure || 2.4));
    var son = g;
    if (lp) { var fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = lp; s.connect(fl); fl.connect(g); } else s.connect(g);
    son.connect(hedef); s.start(t);
  }
  function can(hedef, t, f, ses, sure) {
    [[1, 1], [2.76, 0.45], [5.4, 0.22], [8.93, 0.1]].forEach(function (p) { ton(hedef, t, f * p[0], (sure || 2.2) / (1 + p[0] * 0.3), "sine", ses * p[1], 0.003); });
  }
  function ney(hedef, t, f, sure, ses) {
    var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), g2 = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    o.frequency.value = f; o2.type = "triangle"; o2.frequency.value = f * 2; g2.gain.value = 0.18;
    lfo.frequency.value = 5; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * 0.012, t + 0.6);
    lfo.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(ses, t + 0.45); g.gain.setValueAtTime(ses, t + sure - 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(hedef);
    [o, o2, lfo].forEach(function (x) { x.start(t); x.stop(t + sure + 0.1); });
    gurultu(hedef, t, sure * 0.9, "bandpass", f * 2, 4, ses * 0.25, 0.4);
  }
  function aulos(hedef, t, f, sure, ses) {
    var fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = 1700; fl.Q.value = 2;
    var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(ses, t + 0.12); g.gain.setValueAtTime(ses, t + sure - 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
    fl.connect(g); g.connect(hedef);
    [1, 1.006].forEach(function (k) { var o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f * k; o.connect(fl); o.start(t); o.stop(t + sure + 0.1); });
  }
  function def(hedef, t, ses, tek) {
    if (tek) { gurultu(hedef, t, 0.08, "bandpass", 1800, 1.4, ses * 0.8); return; }
    ton(hedef, t, 80, 0.35, "sine", ses, 0.003, 48); gurultu(hedef, t, 0.05, "lowpass", 900, 1, ses * 0.4);
  }
  function kus(hedef, t, ses) {
    var f = 2200 + Math.random() * 1600, n = 2 + Math.floor(Math.random() * 4);
    for (var i = 0; i < n; i++) ton(hedef, t + i * 0.11, f * (1 + Math.random() * 0.1), 0.08, "sine", ses, 0.005, f * (1.3 + Math.random() * 0.4));
  }

  var hz = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
  var DORIAN = [0, 2, 3, 5, 7, 9, 10], HICAZ = [0, 1, 4, 5, 7, 8, 10], PENTA = [0, 2, 4, 7, 9];
  function secNota(kok, dizi, oktav) { return hz(kok + dizi[Math.floor(Math.random() * dizi.length)] + 12 * Math.floor(Math.random() * (oktav || 1))); }

  /* ── Kısa efektler ── */
  var EFEKT = {
    tik: function (t, o) { gurultu(o, t, 0.025, "bandpass", 1900, 2, 0.35); ton(o, t, 880, 0.04, "sine", 0.12); },
    yumusak: function (t, o) { ton(o, t, 1320, 0.05, "sine", 0.08); gurultu(o, t, 0.02, "highpass", 3000, 1, 0.08); },
    sayfa: function (t, o) { for (var i = 0; i < 3; i++) gurultu(o, t + i * 0.055, 0.07, "bandpass", 2600 + i * 500, 0.8, 0.35 - i * 0.08, 0.01); gurultu(o, t, 0.3, "lowpass", 1200, 0.7, 0.12, 0.03); },
    kitap: function (t, o) { ton(o, t, 120, 0.16, "sine", 0.35, 0.003, 60); gurultu(o, t, 0.06, "lowpass", 700, 1, 0.25); EFEKT.sayfa(t + 0.12, o); },
    fis: function (t, o) { var f = gurultu(o, t, 0.4, "bandpass", 300, 1.2, 0.18, 0.15); f.frequency.exponentialRampToValueAtTime(2200, t + 0.35); },
    kapat: function (t, o) { var f = gurultu(o, t, 0.6, "bandpass", 2200, 1, 0.2, 0.05); f.frequency.exponentialRampToValueAtTime(300, t + 0.55); ton(o, t + 0.25, 110, 0.2, "sine", 0.2, 0.003, 70); },
    tas: function (t, o) { gurultu(o, t, 0.06, "lowpass", 700, 1, 0.45); ton(o, t, 180, 0.16, "sine", 0.3, 0.002, 120); },
    boru: function (t, o) {
      [[hz(50), 0, 0.28], [hz(57), 0.3, 0.55]].forEach(function (n) {
        var fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.setValueAtTime(400, t + n[1]); fl.frequency.linearRampToValueAtTime(2400, t + n[1] + 0.08); fl.connect(o);
        var g = ctx.createGain(); zarf(g, t + n[1], 0.04, 0.16, 0.0001, n[2]); g.connect(fl);
        var s = ctx.createOscillator(); s.type = "sawtooth"; s.frequency.setValueAtTime(n[0] * 0.94, t + n[1]); s.frequency.linearRampToValueAtTime(n[0], t + n[1] + 0.06); s.connect(g); s.start(t + n[1]); s.stop(t + n[1] + n[2] + 0.1);
      });
    },
    lir: function (t, o) { [62, 65, 69, 74].forEach(function (m, i) { tel(o, t + i * 0.07, hz(m), 0.35, 0.5, 2); }); },
    ud: function (t, o) { [62, 63, 66].forEach(function (m, i) { tel(o, t + i * 0.12, hz(m - 12), 0.45, 0.62, 1.8, 2400); }); def(o, t, 0.25); },
    can: function (t, o) { can(o, t, 1046, 0.12, 2.5); can(o, t + 0.09, 1568, 0.08, 2); },
    kristal: function (t, o) { can(o, t, hz(84 + PENTA[Math.floor(Math.random() * 5)]), 0.1, 3); },
    metal: function (t, o) { can(o, t, 1850, 0.08, 1); gurultu(o, t, 0.02, "highpass", 5000, 1, 0.1); },
    sinaps: function (t, o) { ton(o, t, 1400, 0.12, "sine", 0.18, 0.002, 600); ton(o, t + 0.05, 2100, 0.08, "sine", 0.08, 0.002, 900); },
    yaprak: function (t, o) { for (var i = 0; i < 5; i++) gurultu(o, t + i * 0.04 + Math.random() * 0.03, 0.05, "bandpass", 4000 + Math.random() * 2000, 1.5, 0.12, 0.01); kus(o, t + 0.1, 0.05); },
    kus: function (t, o) { kus(o, t, 0.12); kus(o, t + 0.35, 0.08); },
    ates: function (t, o) { for (var i = 0; i < 7; i++) gurultu(o, t + Math.random() * 0.35, 0.02 + Math.random() * 0.03, "bandpass", 800 + Math.random() * 3500, 2, 0.15 + Math.random() * 0.25, 0.002); gurultu(o, t, 0.5, "lowpass", 300, 1, 0.2, 0.05, true); },
    sandik: function (t, o) {
      var fl = ctx.createBiquadFilter(); fl.type = "bandpass"; fl.frequency.value = 650; fl.Q.value = 7; fl.connect(o);
      var g = ctx.createGain(); zarf(g, t, 0.05, 0.22, 0.0001, 0.55); g.connect(fl);
      var s = ctx.createOscillator(); s.type = "sawtooth"; s.frequency.setValueAtTime(60, t); s.frequency.linearRampToValueAtTime(95, t + 0.25); s.frequency.linearRampToValueAtTime(72, t + 0.55); s.connect(g); s.start(t); s.stop(t + 0.7);
      EFEKT.tik(t + 0.02, o); EFEKT.kristal(t + 0.45, o);
    },
    projektor: function (t, o) { for (var i = 0; i < 12; i++) gurultu(o, t + i / 24, 0.012, "bandpass", 2500, 3, 0.2); },
    ruzgar: function (t, o) { var f = gurultu(o, t, 0.9, "bandpass", 500, 0.8, 0.2, 0.3); f.frequency.linearRampToValueAtTime(1100, t + 0.8); },
    gok: function (t, o) { [72, 76, 79, 84, 88].forEach(function (m, i) { can(o, t + i * 0.09, hz(m), 0.06, 2.2); }); },
    pergel: function (t, o) { gurultu(o, t, 0.35, "bandpass", 5000, 3, 0.06, 0.05); EFEKT.kristal(t + 0.3, o); }
  };

  /* ── Ortam müzikleri: her biri durdurulabilir bir döngü döndürür ── */
  function dongu(fn, min, max) { var z = { canli: true }; (function adim() { if (!z.canli) return; fn(ctx.currentTime + 0.05); z.id = setTimeout(adim, min + Math.random() * (max - min)); })(); return z; }
  function pad(o, notalar, ses, dalga) {
    var g = ctx.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(ses, ctx.currentTime + 4); g.connect(o);
    var fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = 900; fl.connect(g);
    var osc = notalar.map(function (m, i) { var x = ctx.createOscillator(); x.type = dalga || (i % 2 ? "triangle" : "sine"); x.frequency.value = hz(m); x.detune.value = (Math.random() - 0.5) * 12; x.connect(fl); x.start(); return x; });
    var lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.07; lg.gain.value = ses * 0.4; lfo.connect(lg); lg.connect(g.gain); lfo.start();
    return { osc: osc.concat([lfo]), g: g };
  }
  function uguldu(o, frek, ses, tip, lfoHz) {
    var s = ctx.createBufferSource(); s.buffer = kahveB; s.loop = true;
    var f = ctx.createBiquadFilter(); f.type = tip || "lowpass"; f.frequency.value = frek;
    var g = ctx.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(ses, ctx.currentTime + 3);
    s.connect(f); f.connect(g); g.connect(o); s.start();
    if (lfoHz) { var l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = lfoHz; lg.gain.value = ses * 0.8; l.connect(lg); lg.connect(g.gain); l.start(); return { osc: [s, l] }; }
    return { osc: [s] };
  }
  var ORTAM = {
    roma: function (o) {
      return [pad(o, [38, 45, 50], 0.05, "sawtooth"), dongu(function (t) { tel(o, t, secNota(50, DORIAN, 2), 0.28, 0.5, 2.6); if (Math.random() < 0.3) tel(o, t + 0.18, secNota(50, DORIAN, 2), 0.18, 0.5, 2.6); }, 1300, 3200), uguldu(o, 500, 0.035, "bandpass", 0.05)];
    },
    atina: function (o) {
      return [uguldu(o, 700, 0.04, "bandpass", 0.08), dongu(function (t) { tel(o, t, secNota(52, DORIAN, 2), 0.25, 0.55, 2.4); }, 1800, 3800),
        dongu(function (t) { var n = 3 + Math.floor(Math.random() * 3), s = t; for (var i = 0; i < n; i++) { var sure = 0.5 + Math.random() * 0.9; aulos(o, s, secNota(64, DORIAN, 1), sure, 0.035); s += sure * 0.95; } }, 7000, 12000)];
    },
    bagdat: function (o) {
      var vurus = [1, 0, 0, 2, 0, 2, 1, 0], i = 0;
      return [pad(o, [38, 45], 0.04), uguldu(o, 1400, 0.03, "bandpass", 0.3),
        dongu(function (t) { var n = 2 + Math.floor(Math.random() * 3); for (var k = 0; k < n; k++) tel(o, t + k * 0.22, secNota(50, HICAZ, 1) / (Math.random() < 0.5 ? 2 : 1), 0.3, 0.62, 2, 2200); }, 2200, 4200),
        dongu(function (t) { ney(o, t, secNota(62, HICAZ, 1), 3 + Math.random() * 2, 0.045); }, 6500, 10000),
        dongu(function (t) { var v = vurus[i++ % vurus.length]; if (v) def(o, t, 0.07, v === 2); }, 300, 300)];
    },
    orman: function (o) {
      return [uguldu(o, 900, 0.05, "bandpass", 0.12), dongu(function (t) { kus(o, t, 0.05 + Math.random() * 0.04); }, 1500, 4500), dongu(function (t) { EFEKT.yaprak(t, o); }, 5000, 11000)];
    },
    gece: function (o) {
      return [pad(o, [69, 76, 81, 85], 0.035), dongu(function (t) { for (var i = 0; i < 4; i++) ton(o, t + i * 0.06, 4600, 0.035, "sine", 0.012); }, 700, 1600), dongu(function (t) { can(o, t, hz(81 + PENTA[Math.floor(Math.random() * 5)]), 0.025, 4); }, 4000, 8000)];
    },
    lab: function (o) {
      return [uguldu(o, 600, 0.03, "bandpass", 0.06), dongu(function (t) { EFEKT.tik(t, o); }, 1000, 1000), dongu(function (t) { can(o, t, 110 * (3 + Math.floor(Math.random() * 9)), 0.03, 3.5); }, 2500, 5000)];
    },
    magara: function (o) {
      return [uguldu(o, 280, 0.12, "lowpass", 0.2), pad(o, [33, 40], 0.04),
        dongu(function (t) { for (var i = 0; i < 3; i++) gurultu(o, t + Math.random() * 0.3, 0.02, "bandpass", 900 + Math.random() * 3000, 2, 0.06 + Math.random() * 0.1); }, 250, 900),
        dongu(function (t) { var d = cikis(o, 0.9); ton(d, t, 1300 + Math.random() * 500, 0.12, "sine", 0.07, 0.002, 2400); }, 4000, 9000)];
    },
    bosluk: function (o) {
      return [pad(o, [45, 52, 57, 64], 0.045), dongu(function (t) { var d = cikis(o, 1); can(d, t, hz(76 + PENTA[Math.floor(Math.random() * 5)]), 0.04, 5); }, 2500, 6000)];
    },
    sinir: function (o) {
      return [pad(o, [50, 57, 62], 0.03), dongu(function (t) { var d = cikis(o, 0.5); ton(d, t, hz(74 + PENTA[Math.floor(Math.random() * 5)]), 0.35, "sine", 0.05, 0.003); }, 500, 1400),
        dongu(function (t) { ton(o, t, 55, 0.2, "sine", 0.08, 0.01, 40); ton(o, t + 0.28, 55, 0.18, "sine", 0.05, 0.01, 40); }, 1100, 1100)];
    },
    deniz: function (o) {
      return [uguldu(o, 700, 0.09, "lowpass", 0.09), dongu(function (t) { tel(o, t, secNota(55, PENTA, 2), 0.2, 0.5, 2.4); }, 2500, 5500),
        dongu(function (t) { ton(o, t, 1300, 0.35, "sine", 0.03, 0.02, 950); ton(o, t + 0.4, 1250, 0.3, "sine", 0.02, 0.02, 900); }, 8000, 15000)];
    },
    ufuk: function (o) {
      return [uguldu(o, 500, 0.08, "lowpass", 0.08), uguldu(o, 1100, 0.03, "bandpass", 0.13), dongu(function (t) { can(o, t, 587, 0.04, 3); }, 9000, 16000),
        dongu(function (t) { ton(o, t, 1400, 0.3, "sine", 0.025, 0.02, 1000); }, 6000, 12000)];
    },
    yazlik: function (o) {
      var melodi = [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 84, 83, 79, 76, 74], i = 0;
      return [dongu(function (t) { for (var k = 0; k < 4; k++) ton(o, t + k * 0.06, 4400, 0.035, "sine", 0.01); }, 800, 1700), uguldu(o, 2400, 0.012, "bandpass", 24),
        dongu(function (t) { if (i % 16 === 0 && Math.random() < 0.5) { i++; return; } ton(o, t, hz(melodi[i++ % melodi.length]), 0.6, "triangle", 0.025, 0.01); }, 480, 480)];
    },
    sozluk: function (o) {
      return [pad(o, [48, 55, 60], 0.025), dongu(function (t) { ton(o, t, 1800, 0.015, "sine", 0.03); }, 1600, 1600), dongu(function (t) { EFEKT.sayfa(t, o); }, 7000, 14000)];
    },
    kutuphane: function (o) {
      return [pad(o, [50, 57, 62, 65], 0.04), dongu(function (t) { can(o, t, hz(74 + PENTA[Math.floor(Math.random() * 5)]), 0.02, 4); }, 5000, 9000)];
    },
    ocak: function (o) {
      return [uguldu(o, 300, 0.08, "lowpass", 0.15), pad(o, [45, 52, 57], 0.035), dongu(function (t) { gurultu(o, t, 0.02, "bandpass", 2000 + Math.random() * 2000, 2, 0.06); }, 300, 1200)];
    },
    kutu: function (o) {
      return [pad(o, [48, 55, 60], 0.03), dongu(function (t) { can(o, t, hz(72 + PENTA[Math.floor(Math.random() * 5)] + 12 * Math.floor(Math.random() * 2)), 0.03, 2.4); }, 600, 1400)];
    },
    sehir: function (o) {
      return [uguldu(o, 450, 0.06, "bandpass", 0.05), pad(o, [45, 52, 57], 0.03), dongu(function (t) { can(o, t, 660, 0.02, 3); }, 10000, 18000)];
    },
    sahne: function (o) {
      return [pad(o, [53, 60, 65, 69], 0.035), dongu(function (t) { tel(o, t, secNota(65, PENTA, 2), 0.15, 0.5, 2); }, 1800, 4000)];
    }
  };
  var HARITA = { diller: "kutuphane", latince: "roma", yunanca: "atina", arapca: "bagdat", "doga-bilimleri": "gece", biyoloji: "orman", astronomi: "gece", fizik: "lab",
    felsefe: "ocak", epistemoloji: "magara", metafizik: "bosluk", zihin: "sinir", "formel-bilimler": "kutu", geometri: "deniz", "sosyal-bilimler": "sehir", cografya: "ufuk",
    estetik: "sahne", film: "yazlik" };

  function ortam(anahtar) {
    if (!anahtar) { ortamAnahtar = null; if (ortamSimdi) sondur(ortamSimdi); ortamSimdi = null; return; }
    var k = ORTAM[anahtar] ? anahtar : HARITA[anahtar] || (/^sozlukce/.test(anahtar) ? "sozluk" : "kutuphane");
    ortamAnahtar = k;
    if (!ortamAcik || !hazirla()) return;
    if (ortamSimdi && ortamSimdi.k === k) return;
    if (ortamSimdi) sondur(ortamSimdi);
    var g = ctx.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5); g.connect(ortamCikis);
    var yk = ctx.createGain(); yk.gain.value = 0.5; g.connect(yk); yk.connect(yanki);
    ortamSimdi = { k: k, g: g, parca: ORTAM[k](g) };
  }
  function sondur(o) {
    var t = ctx.currentTime;
    o.g.gain.cancelScheduledValues(t); o.g.gain.setValueAtTime(o.g.gain.value, t); o.g.gain.linearRampToValueAtTime(0, t + 1.6);
    o.parca.forEach(function (p) { if (p.canli !== undefined) { p.canli = false; clearTimeout(p.id); } });
    setTimeout(function () { o.parca.forEach(function (p) { (p.osc || []).forEach(function (x) { try { x.stop(); } catch (e) {} }); }); o.g.disconnect(); }, 1800);
  }
  document.addEventListener("visibilitychange", function () { if (!ctx) return; if (document.hidden) ctx.suspend(); else ctx.resume(); });

  function tik(tur) {
    if (!efektAcik || !EFEKT[tur] || !hazirla()) return;
    var o = cikis(efektCikis, 0.25);
    EFEKT[tur](ctx.currentTime + 0.01, o);
  }

  /* ── Tıklamanın bağlamına göre efekt ── */
  var KAPI = { latince: "boru", yunanca: "lir", arapca: "ud", biyoloji: "kus", astronomi: "can", fizik: "metal", epistemoloji: "ates", metafizik: "kristal", zihin: "sinaps", geometri: "pergel", cografya: "ruzgar", film: "projektor" };
  var NOKTA = { latince: "tas", yunanca: "lir", arapca: "ud", biyoloji: "yaprak", astronomi: "can", fizik: "metal", epistemoloji: "ates", metafizik: "kristal", zihin: "sinaps", geometri: "kristal", cografya: "tik", film: "projektor" };
  var DIL = { la: "boru", el: "lir", ar: "ud" };
  function baglam(el) {
    if (el.closest(".gramofon, .radyo, .sk-panel-kapat, .sk-kapat, .sk-arsiv-kapat, .sk-ses, .efekt-anahtar")) return null;
    if (el.matches(".kitap, .kraf-levha")) return "kitap";
    if (el.matches(".sk-kapi")) { var h = el.dataset.hedef; return KAPI[h] || (/^sozlukce/.test(h) ? "sayfa" : "fis"); }
    if (el.matches(".sk-nokta")) { var s = el.closest(".sk-sahne"); return (s && NOKTA[s.dataset.sahne]) || "tik"; }
    if (el.matches(".sk-sandik")) return "sandik";
    if (el.matches(".sz-terim-bas, summary")) return "sayfa";
    if (el.matches(".sk-geri")) return "fis";
    if (el.matches("[data-dil]")) return DIL[el.dataset.dil] || "can";
    if (el.matches(".ay")) return "gok";
    if (el.matches('.kayit a, a[href^="#sahne-"]')) return "kitap";
    if (el.matches(".button, .top nav a, .alt-menu a")) return "yumusak";
    return el.matches("a") ? "yumusak" : "tik";
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("button, a, summary");
    if (!el) return;
    var tur = baglam(el);
    if (tur) tik(tur);
  }, true);

  /* ── "Efekt" anahtarı: ortam panelinde, ses ve hava düğmelerinin yanında ── */
  function anahtarKur() {
    var grup = document.querySelector(".ortam-ic .ses-anahtar");
    if (!grup) return;
    var ayr = document.createElement("span"); ayr.className = "ses-ayrac"; ayr.setAttribute("aria-hidden", "true");
    var b = document.createElement("button"); b.type = "button"; b.className = "efekt-anahtar"; b.textContent = "Tık sesi";
    function isaretle() { b.setAttribute("aria-pressed", String(efektAcik)); }
    b.addEventListener("click", function () { efektAcik = !efektAcik; yazK("ses-efekt", efektAcik); isaretle(); if (efektAcik) tik("yumusak"); });
    isaretle();
    grup.appendChild(ayr); grup.appendChild(b);
  }
  anahtarKur();

  window.SES = {
    tik: tik,
    ortam: ortam,
    ortamAcik: function (v) { if (v === undefined) return ortamAcik; ortamAcik = !!v; yazK("ses-ortam", ortamAcik); if (!ortamAcik) { var a = ortamAnahtar; ortam(null); ortamAnahtar = a; } return ortamAcik; }
  };
})();
