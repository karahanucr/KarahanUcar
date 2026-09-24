/* Kitaplık: her raf bir alan, her kitap bir dal. Sırtlarda dalı çağrıştıran küçük, sürekli hareket eden bir motif durur.
   Yeni dal eklemek: ilgili rafın "kitaplar" listesine { ad, motif } ekle; kendi sahnesi varsa sahne: "sahne-kimligi".
   Motif adları aşağıdaki MOTIF sözlüğündedir. Bu dosya yazi.js'ten ÖNCE yüklenir ki kitap adları çevrilebilsin. */
(function () {
  var kap = document.getElementById("kitaplik");
  if (!kap) return;

  var RAFLAR = [
    { alan: "felsefe", ad: "Felsefe", sahne: "felsefe", kitaplar: [
      { ad: "Bilgi Felsefesi", sahne: "epistemoloji", motif: "goz" }, { ad: "Dil Felsefesi", sahne: "dil-felsefesi", motif: "balon" }, { ad: "Varlık Felsefesi", sahne: "metafizik", motif: "kup" },
      { ad: "Zihin Felsefesi", sahne: "zihin", motif: "beyin" }, { ad: "Mantık Felsefesi", sahne: "mantik-felsefesi", motif: "mantik" }, { ad: "Bilim Felsefesi", sahne: "bilim-felsefesi", motif: "atom" },
      { ad: "Politik Felsefe", sahne: "politik-felsefe", motif: "sutun" }, { ad: "Etik", sahne: "etik", motif: "terazi" }, { ad: "Din Felsefesi", sahne: "din-felsefesi", motif: "isik" },
      { ad: "Tarih Felsefesi", sahne: "tarih-felsefesi", motif: "kumsaati" }, { ad: "Sanat Felsefesi", sahne: "sanat-felsefesi", motif: "firca" }, { ad: "Felsefe Tarihi", sahne: "felsefe-tarihi", motif: "parsomen" },
      { ad: "Metafelsefe", sahne: "metafelsefe", motif: "ayna" }, { ad: "Sözlükçe", sahne: "sozlukce-felsefe", motif: "sozluk" } ] },
    { alan: "diller", ad: "Diller", sahne: "diller", kitaplar: [
      { ad: "Latince", sahne: "latince", motif: "spqr" }, { ad: "Antik Yunanca", sahne: "yunanca", motif: "lir" }, { ad: "Arapça", sahne: "arapca", motif: "hilal" },
      { ad: "Almanca", sahne: "almanca", motif: "harf", harfler: "ß·Ä·Ö·Ü" }, { ad: "Fransızca", sahne: "fransizca", motif: "harf", harfler: "ç·é·œ·à" }, { ad: "İngilizce", sahne: "ingilizce", motif: "harf", harfler: "W·æ·þ·Q" } ] },
    { alan: "doga-bilimleri", ad: "Doğa Bilimleri", sahne: "doga-bilimleri", kitaplar: [
      { ad: "Astronomi", sahne: "astronomi", motif: "yildiz" }, { ad: "Biyoloji", sahne: "biyoloji", motif: "yaprak" }, { ad: "Ekoloji", sahne: "ekoloji", motif: "dongu" },
      { ad: "Fizik", sahne: "fizik", motif: "sarkac" }, { ad: "Jeoloji", sahne: "jeoloji", motif: "katman" }, { ad: "Kimya", sahne: "kimya", motif: "sise" },
      { ad: "Mühendislik", sahne: "muhendislik", motif: "cark" }, { ad: "Tıp", sahne: "tip", motif: "nabiz" }, { ad: "Sözlükçe", sahne: "sozlukce-doga", motif: "sozluk" } ] },
    { alan: "formel-bilimler", ad: "Formel Bilimler", sahne: "formel-bilimler", kitaplar: [
      { ad: "Bilişim", sahne: "bilisim", motif: "kod" }, { ad: "Geometri", sahne: "geometri", motif: "pergel" }, { ad: "Mantık", sahne: "mantik", motif: "mantik" },
      { ad: "Matematik", sahne: "matematik", motif: "sonsuz" }, { ad: "Sözlükçe", sahne: "sozlukce-formel", motif: "sozluk" } ] },
    { alan: "sosyal-bilimler", ad: "Sosyal Bilimler", sahne: "sosyal-bilimler", kitaplar: [
      { ad: "Antropoloji", sahne: "antropoloji", motif: "insan" }, { ad: "Arkeoloji", sahne: "arkeoloji", motif: "comlek" }, { ad: "Coğrafya", sahne: "cografya", motif: "pusula" },
      { ad: "Dilbilimi", sahne: "dilbilimi", motif: "ses" }, { ad: "Ekonomi", sahne: "ekonomi", motif: "grafik" }, { ad: "Hukuk", sahne: "hukuk", motif: "terazi" }, { ad: "İlahiyat", sahne: "ilahiyat", motif: "isik" },
      { ad: "Siyaset ve Sosyoloji", sahne: "siyaset-sosyoloji", motif: "ag" }, { ad: "Psikoloji ve Psikanaliz", sahne: "psikoloji", motif: "psi" }, { ad: "Tarih", sahne: "tarih", motif: "kumsaati" },
      { ad: "Sözlükçe", sahne: "sozlukce-sosyal", motif: "sozluk" } ] },
    { alan: "estetik", ad: "Estetik", sahne: "estetik", kitaplar: [
      { ad: "Edebiyat", sahne: "edebiyat", motif: "kalem" }, { ad: "Görsel Sanatlar", sahne: "film", motif: "film" }, { ad: "Müzik", sahne: "muzik", motif: "nota" },
      { ad: "Sözlükçe", sahne: "sozlukce-estetik", motif: "sozluk" } ] }
  ];
  var RENK = ["#5c2b25", "#2b3a52", "#2f4533", "#303548", "#5b4521", "#4a2a3d", "#284543", "#6a3a1e", "#3a2a4a", "#1e3a3a", "#5a2a1a", "#2a3a2a", "#4a3a5a", "#3a1e1e"];
  var G = 'fill="none" stroke="#f0cf82" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

  /* Sırt motifleri (30×40 kutuda). Sınıflar css/style.css'teki "Kitap sırtı motifleri" bölümünde canlanır. */
  var MOTIF = {
    goz: '<g ' + G + '><path d="M3 20C8 12 22 12 27 20C22 28 8 28 3 20Z"/><circle class="m-bebek" cx="15" cy="20" r="4" fill="#f0cf82"/></g><path class="m-kirp" d="M3 20C8 12 22 12 27 20" fill="#1a120c" opacity="0"/>',
    balon: '<g ' + G + '><path d="M4 8h22v16H14l-6 6v-6H4Z"/></g><g class="m-nokta3" fill="#f0cf82"><circle cx="10" cy="16" r="1.8"/><circle cx="15" cy="16" r="1.8"/><circle cx="20" cy="16" r="1.8"/></g>',
    kup: '<g class="m-don" ' + G + '><path d="M15 6L26 12V26L15 32L4 26V12Z"/><path d="M4 12L15 18L26 12M15 18V32"/></g>',
    beyin: '<g ' + G + '><path d="M15 8C9 8 5 12 6 17C3 20 5 26 10 26C11 30 19 30 20 26C25 26 27 20 24 17C25 12 21 8 15 8Z"/><path d="M15 9V27" opacity=".6"/></g><circle class="m-sinyal" cx="10" cy="15" r="1.8" fill="#fff4c8"/><circle class="m-sinyal m-g2" cx="20" cy="20" r="1.8" fill="#fff4c8"/>',
    mantik: '<g fill="#f0cf82" font-family="Georgia,serif" font-size="11" text-anchor="middle"><text class="m-degis" x="15" y="16">∴</text><text class="m-degis m-g2" x="15" y="30">¬∧</text></g>',
    atom: '<g ' + G + ' stroke-width="1.2"><ellipse cx="15" cy="20" rx="11" ry="4"/><ellipse cx="15" cy="20" rx="11" ry="4" transform="rotate(60 15 20)"/><ellipse cx="15" cy="20" rx="11" ry="4" transform="rotate(-60 15 20)"/></g><circle cx="15" cy="20" r="2.4" fill="#f0cf82"/><g class="m-don"><circle cx="26" cy="20" r="1.6" fill="#9fd8ff"/></g>',
    sutun: '<g ' + G + '><path d="M5 9H25M7 12H23M8 12V30M12 12V30M18 12V30M22 12V30M5 32H25"/><path d="M5 9L15 4L25 9"/></g><rect class="m-parla" x="5" y="4" width="20" height="30" fill="#fff4c8" opacity="0"/>',
    terazi: '<g ' + G + '><path d="M15 6V32M9 32H21"/><g class="m-sal"><path d="M5 12H25"/><path d="M5 12L2 20H8Z"/><path d="M25 12L22 20H28Z"/></g></g>',
    isik: '<g class="m-don m-yavas" ' + G + ' stroke-width="1.1">' + [0, 45, 90, 135].map(function (a) { return '<path d="M15 8V12M15 28V32" transform="rotate(' + a + ' 15 20)"/>'; }).join("") + '</g><circle class="m-nabz" cx="15" cy="20" r="5" fill="#f0cf82"/>',
    kumsaati: '<g class="m-cevir" ' + G + '><path d="M8 6H22M8 34H22M9 6C9 14 15 16 15 20C15 24 9 26 9 34M21 6C21 14 15 16 15 20C15 24 21 26 21 34"/><path d="M11 30H19L15 25Z" fill="#f0cf82"/></g>',
    firca: '<g ' + G + '><path d="M22 6L12 22"/><path d="M12 22C8 22 6 26 7 30C10 30 14 28 14 24Z" fill="#f0cf82"/></g><path class="m-cizgi" d="M4 34C10 30 18 36 26 32" ' + G + ' stroke="#e8743a" pathLength="1"/>',
    parsomen: '<g ' + G + '><path d="M8 6H22V30H8Z"/><circle cx="8" cy="6" r="2"/><circle cx="22" cy="30" r="2"/></g><g class="m-satir" ' + G + ' stroke-width="1"><path d="M11 12H19M11 16H19M11 20H17M11 24H19" pathLength="1"/></g>',
    ayna: '<g ' + G + '><rect x="6" y="6" width="18" height="28" rx="2"/><rect class="m-kucul" x="10" y="12" width="10" height="16" rx="1.5"/><rect class="m-kucul m-g2" x="13" y="17" width="4" height="6" rx="1"/></g>',
    sozluk: '<g ' + G + '><path d="M5 8C9 6 13 7 15 9C17 7 21 6 25 8V32C21 30 17 31 15 33C13 31 9 30 5 32Z"/><path d="M15 9V33"/></g><text class="m-degis" x="10" y="22" font-size="9" fill="#f0cf82" font-family="Georgia,serif" text-anchor="middle">A</text><text class="m-degis m-g2" x="20" y="22" font-size="9" fill="#f0cf82" font-family="Georgia,serif" text-anchor="middle">Ω</text>',
    spqr: '<g ' + G + '><path d="M6 32V18A9 9 0 0 1 24 18V32"/><path d="M3 32H27M4 10H26"/></g><text class="m-parla-y" x="15" y="9" font-size="5.2" fill="#f0cf82" font-family="Georgia,serif" text-anchor="middle" letter-spacing=".4">SPQR</text>',
    lir: '<g ' + G + '><path d="M8 32C4 24 6 12 10 6M22 32C26 24 24 12 20 6M8 10H22M9 32H21"/></g><g class="m-tel" stroke="#fff0c0" stroke-width=".9"><path d="M12 10V32"/><path d="M15 10V32"/><path d="M18 10V32"/></g>',
    hilal: '<path d="M18 8a10 10 0 1 0 4 18a8 8 0 1 1 -4 -18Z" fill="#f0cf82"/><g class="m-yildiz"><path d="M24 8l1 2.4 2.6.2-2 1.7.6 2.5-2.2-1.3-2.2 1.3.6-2.5-2-1.7 2.6-.2Z" fill="#fff4c8"/></g>',
    harf: '',
    yildiz: '<g fill="#fff4c8"><path class="m-parilti" d="M15 8l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4Z"/><circle class="m-parilti m-g2" cx="8" cy="26" r="1.4"/><circle class="m-parilti m-g3" cx="23" cy="28" r="1.1"/><circle class="m-parilti m-g2" cx="22" cy="10" r=".9"/></g><path d="M3 34C9 30 21 30 27 34" ' + G + ' stroke-width="1"/>',
    yaprak: '<g class="m-sal"><path d="M15 34C6 26 6 14 15 6C24 14 24 26 15 34Z" fill="#6aa84a"/><path d="M15 8V33M15 16l-5 -3M15 21l-6 -3M15 16l5 -3M15 21l6 -3" stroke="#d6f0a0" stroke-width="1"/></g>',
    dongu: '<g class="m-don m-yavas" ' + G + '><path d="M15 7A13 13 0 0 1 27 17"/><path d="M27 23A13 13 0 0 1 9 32"/><path d="M5 26A13 13 0 0 1 9 10"/><path d="M24 14l3 3 3-3M12 33l-3-1 1-3M7 12l2-2 2 2"/></g><path d="M15 26C10 22 10 16 15 13C20 16 20 22 15 26Z" fill="#6aa84a"/>',
    sarkac: '<path d="M5 6H25" ' + G + '/><g class="m-sal m-hizli"><path d="M15 6V28" stroke="#f0cf82" stroke-width="1.2"/><circle cx="15" cy="30" r="3.4" fill="#f0cf82"/></g>',
    katman: '<g><path d="M3 12H27V18H3Z" fill="#8a6a3a"/><path d="M3 18H27V24H3Z" fill="#6a4a2a"/><path d="M3 24H27V30H3Z" fill="#4a3220"/><path d="M3 30H27V36H3Z" fill="#2a1a10"/></g><path class="m-magma" d="M15 36V18" stroke="#ff7a2a" stroke-width="2.4" stroke-linecap="round" pathLength="1"/><path d="M3 12L9 8L15 11L21 6L27 12" ' + G + '/>',
    sise: '<g ' + G + '><path d="M12 6H18M13 6V15L6 30C5 33 7 34 9 34H21C23 34 25 33 24 30L17 15V6"/></g><path d="M8 27H22L24 31C24 33 23 33 21 33H9C7 33 6 33 6 31Z" fill="#6ad0a0" opacity=".8"/><g fill="#d8fff0"><circle class="m-kabarcik" cx="12" cy="28" r="1.2"/><circle class="m-kabarcik m-g2" cx="17" cy="29" r="1"/><circle class="m-kabarcik m-g3" cx="15" cy="30" r=".8"/></g>',
    cark: '<g class="m-don"><g ' + G + '><circle cx="15" cy="20" r="7"/><circle cx="15" cy="20" r="2.4"/></g><g fill="#f0cf82">' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<rect x="13.5" y="10" width="3" height="4" transform="rotate(' + a + ' 15 20)"/>'; }).join("") + "</g></g>",
    nabiz: '<path class="m-ekg" d="M2 22H9L11 16L14 28L17 10L20 24L22 22H28" ' + G + ' stroke="#ff8a8a" pathLength="1"/><path d="M15 34C9 30 7 27 9 25C11 23 13 24 15 26C17 24 19 23 21 25C23 27 21 30 15 34Z" fill="#e85a5a" class="m-nabz"/>',
    kod: '<g font-family="monospace" font-size="5" fill="#9fe8a0"><text class="m-akis">0101 1</text><text class="m-akis m-g2" x="2">1 0110</text><text class="m-akis m-g3" x="4">01 101</text></g>',
    pergel: '<g ' + G + '><path d="M15 6V10"/><g class="m-sal"><path d="M15 10L7 32M15 10L23 32"/></g></g><circle class="m-cizgi" cx="15" cy="30" r="8" ' + G + ' stroke="#e8c870" stroke-width="1" pathLength="1"/>',
    sonsuz: '<path class="m-cizgi" d="M15 20C11 14 4 14 4 20C4 26 11 26 15 20C19 14 26 14 26 20C26 26 19 26 15 20Z" ' + G + ' stroke-width="2" pathLength="1"/><text x="15" y="35" font-size="7" fill="#f0cf82" text-anchor="middle" font-family="Georgia,serif">π</text>',
    insan: '<g ' + G + '><circle cx="15" cy="10" r="3.4"/><path d="M15 14V24M15 24L10 33M15 24L20 33"/><g class="m-sal"><path d="M15 17L8 21M15 17L22 13"/></g></g>',
    comlek: '<g class="m-yuz"><path d="M11 6H19L18 10C24 13 25 22 22 28C20 32 10 32 8 28C5 22 6 13 12 10Z" fill="#c8703a"/><path d="M8 18H22M8 24H22" stroke="#1a0e08" stroke-width="1.4"/></g><path d="M3 35H27" ' + G + '/>',
    pusula: '<g ' + G + '><circle cx="15" cy="20" r="11"/></g><g class="m-sal m-pusula"><path d="M15 10L18 20L15 30L12 20Z" fill="#f0cf82"/><path d="M15 10L18 20H12Z" fill="#e8743a"/></g>',
    ses: '<g ' + G + '><path class="m-dalga" d="M3 20C6 12 9 12 12 20C15 28 18 28 21 20C24 12 27 12 27 20"/></g><path d="M8 32h14" ' + G + ' stroke-width="1"/>',
    grafik: '<g ' + G + '><path d="M4 6V34H27"/></g><path class="m-cizgi" d="M6 30L11 24L15 27L20 15L26 10" ' + G + ' stroke="#9fe8a0" pathLength="1"/><path d="M22 10H26V14" ' + G + ' stroke="#9fe8a0"/>',
    ag: '<g stroke="#f0cf82" stroke-width="1" opacity=".7"><path d="M8 10L22 12L15 22L6 28L24 30L15 22L8 10"/></g><g fill="#f0cf82"><circle class="m-nabz" cx="8" cy="10" r="2.4"/><circle class="m-nabz m-g2" cx="22" cy="12" r="2.4"/><circle class="m-nabz m-g3" cx="15" cy="22" r="2.8"/><circle class="m-nabz m-g2" cx="6" cy="28" r="2.2"/><circle class="m-nabz" cx="24" cy="30" r="2.2"/></g>',
    psi: '<text class="m-nabz" x="15" y="27" font-size="20" fill="#f0cf82" font-family="Georgia,serif" text-anchor="middle">ψ</text><path class="m-don m-yavas" d="M15 20m-12 0a12 12 0 1 0 24 0a12 12 0 1 0 -24 0" ' + G + ' stroke-width=".8" stroke-dasharray="2 4"/>',
    kalem: '<g class="m-yaz"><path d="M24 4C16 8 12 16 10 26L9 30L12 28C18 22 22 14 24 4Z" fill="#f0e6d0"/><path d="M10 26L20 10" stroke="#8a7a5a" stroke-width=".8"/></g><path class="m-cizgi" d="M3 34C7 31 11 36 15 33C19 30 23 35 27 32" ' + G + ' stroke-width="1" pathLength="1"/>',
    film: '<g class="m-serit"><rect x="7" y="-8" width="16" height="56" fill="#1a1410" stroke="#f0cf82" stroke-width="1"/>' + [-6, 2, 10, 18, 26, 34, 42].map(function (y) { return '<rect x="8.5" y="' + y + '" width="2" height="3" fill="#f0cf82"/><rect x="19.5" y="' + y + '" width="2" height="3" fill="#f0cf82"/><rect x="12" y="' + (y - 1) + '" width="6" height="6" fill="#f0cf82" opacity=".35"/>'; }).join("") + "</g>",
    nota: '<g fill="#f0cf82"><g class="m-zipla"><path d="M11 26V10L23 7V23" stroke="#f0cf82" stroke-width="1.6" fill="none"/><ellipse cx="9" cy="26" rx="3.4" ry="2.6"/><ellipse cx="21" cy="23" rx="3.4" ry="2.6"/></g></g>'
  };

  function sayac(alan) {
    return (window.ICERIK || []).filter(function (o) { return o.tur !== "yakinda" && (o.alan || []).indexOf(alan) > -1; }).length;
  }
  function harfMotif(harfler) {
    return '<g fill="#f0cf82" font-family="Georgia,serif" font-size="14" text-anchor="middle">' + harfler.split("·").map(function (h, i, a) {
      return '<text class="m-harf" x="15" y="25" style="animation-delay:' + (i * 2) + "s;animation-duration:" + (a.length * 2) + 's">' + h + "</text>";
    }).join("") + "</g>";
  }

  /* Kitaplar: kendi sahnesi olan kitap düğmedir ve o sahneyi açar; içeriği henüz olmayan kitap tıklanmaz (üzerinde "Yakında" yazar).
     İçeriği hazırlanınca RAFLAR'daki satırına sahne: "..." eklemek yeter. */
  var html = "";
  RAFLAR.forEach(function (raf, ri) {
    var n = sayac(raf.alan);
    html += '<div class="kraf" data-alan="' + raf.alan + '"><button type="button" class="kraf-levha" data-sahne="' + raf.sahne + '" data-ad="' + raf.ad + '" aria-haspopup="dialog">' +
      '<span class="kraf-ad">' + raf.ad + '</span><span class="kraf-sayi" data-sabit>' + n + '</span></button><div class="kraf-kitaplar">';
    raf.kitaplar.forEach(function (k, i) {
      var renk = RENK[(ri * 5 + i * 3) % RENK.length], boy = 86 + ((i * 37 + ri * 11) % 15);
      var sinif = "kitap" + (k.ad.length > 20 ? " cok-uzun" : k.ad.length > 13 ? " uzun" : "") + (k.sahne ? " kitap-sahne" : " kitap-bos") + (k.motif === "sozluk" ? " kitap-sozluk" : "");
      var ic = (k.sahne ? '<span class="cilt-isik" aria-hidden="true"></span>' : "") +
        '<svg class="kitap-motif mo-' + k.motif + '" viewBox="0 0 30 40" aria-hidden="true">' + (k.motif === "harf" ? harfMotif(k.harfler) : MOTIF[k.motif] || "") + "</svg>" +
        '<span class="kitap-ad">' + k.ad + "</span>";
      var stil = ' style="--c:' + renk + ";--h:" + boy + '%"';
      html += k.sahne
        ? '<button type="button" class="' + sinif + '" data-sahne="' + k.sahne + '" data-ad="' + k.ad + '"' + stil + ' aria-haspopup="dialog">' + ic + "</button>"
        : '<span class="' + sinif + '" data-ad="' + k.ad + '"' + stil + '>' + ic + '<span class="kitap-yakinda" aria-hidden="true">Yakında</span></span>';
    });
    html += '</div><div class="kraf-tahta" aria-hidden="true"></div></div>';
  });
  kap.innerHTML = '<svg class="agac" aria-hidden="true" focusable="false"></svg><div class="kl-isik" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
    '<canvas class="kl-toz" aria-hidden="true"></canvas>' + html +
    '<div class="kl-yaprak" aria-hidden="true">' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<i style="--i:' + i + '"></i>'; }).join("") + "</div>";

  /* ── Ağaç: gövde sağda yükselir, raflar gövdeden sola uzanan dallardır; tepede bakır yapraklı taç, gövdede fenerli bir kovuk.
        Çizim rafların gerçek konumlarına göre (JS ile) yapılır; ekran boyu değişince yeniden çizilir. ── */
  var svg = kap.querySelector(".agac");
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function f(n) { return n.toFixed(1); }
  /* Kübik eğri boyunca incelen bir dal (dolgu şekli) */
  function dal(p, w0, w1, sinif) {
    var L = [], R = [], N = 22;
    for (var i = 0; i <= N; i++) {
      var t = i / N, u = 1 - t;
      var x = u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6];
      var y = u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7];
      var dx = 3 * u * u * (p[2] - p[0]) + 6 * u * t * (p[4] - p[2]) + 3 * t * t * (p[6] - p[4]);
      var dy = 3 * u * u * (p[3] - p[1]) + 6 * u * t * (p[5] - p[3]) + 3 * t * t * (p[7] - p[5]);
      var l = Math.hypot(dx, dy) || 1, w = (w0 + (w1 - w0) * t) * (1 + 0.08 * Math.sin(t * 11 + p[0])) / 2;
      L.push(f(x - dy / l * w) + " " + f(y + dx / l * w)); R.push(f(x + dy / l * w) + " " + f(y - dx / l * w));
    }
    return '<path class="' + (sinif || "kabuk") + '" d="M' + L.join("L") + "L" + R.reverse().join("L") + 'Z"/>';
  }
  function yapraklar(x, y, n, tohum, yay) {
    var s = "", r = tohum;
    function rnd() { r = (r * 16807) % 2147483647; return r / 2147483647; }
    var RN = ["#b8643a", "#d08a5a", "#e6a878", "#8a4228", "#c9774a", "#f0c090"];
    for (var i = 0; i < n; i++) {
      var a = rnd() * 6.28, d = rnd() * yay, lx = x + Math.cos(a) * d * 1.4, ly = y + Math.sin(a) * d * 0.7;
      s += '<ellipse cx="' + f(lx) + '" cy="' + f(ly) + '" rx="' + f(3 + rnd() * 3.5) + '" ry="' + f(1.8 + rnd() * 1.6) + '" transform="rotate(' + f(rnd() * 180) + " " + f(lx) + " " + f(ly) + ')" fill="' + RN[Math.floor(rnd() * RN.length)] + '"/>';
    }
    return '<g class="yp-kume" style="--d:-' + f(rnd() * 5) + "s;--s:" + f(4 + rnd() * 3) + 's">' + s + "</g>";
  }
  function ciz() {
    var kr = kap.getBoundingClientRect(), W = kr.width, H = kr.height;
    if (!W || !H) return;
    var mobil = W < 640, tx = W - (mobil ? 26 : 92), wAlt = mobil ? 34 : 96, wUst = mobil ? 18 : 44, tepe = mobil ? 28 : 54;
    var cx = function (y) { return tx + (mobil ? 5 : 14) * Math.sin(y / H * 5.2 + 0.8); };
    var cw = function (y) { var k = (y - tepe) / (H - tepe); return (wUst + (wAlt - wUst) * k * k) * (1 + 0.06 * Math.sin(y * 0.045)); };
    var s = '<defs><linearGradient id="kabukG" x1="0" x2="1"><stop offset="0" stop-color="#0e0907"/><stop offset=".35" stop-color="#2e2019"/><stop offset=".55" stop-color="#3b2a20"/><stop offset="1" stop-color="#110b08"/></linearGradient>' +
      '<linearGradient id="dalG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3d2c21"/><stop offset=".5" stop-color="#241810"/><stop offset="1" stop-color="#0c0806"/></linearGradient>' +
      '<radialGradient id="fenerG"><stop offset="0" stop-color="#ffd890" stop-opacity=".9"/><stop offset=".35" stop-color="#ff9a40" stop-opacity=".35"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient></defs>';
    /* kökler */
    var kok = "";
    [[-1, 250, 0], [-1, 150, 10], [-1, 80, 4], [1, 90, 6], [1, 40, 2], [-1, 330, 12]].forEach(function (k, i) {
      if (mobil && i > 2) return;
      var bx = cx(H - 30) + k[0] * 10, ey = H - 2 - k[2], ex = bx + k[0] * k[1] * (mobil ? 0.4 : 1);
      kok += dal([bx, H - 60, bx + k[0] * 20, H - 20, ex - k[0] * k[1] * 0.4, H - 8, ex, ey], (mobil ? 18 : 44) - i * 4, 3);
    });
    /* gövde */
    var sol = [], sag = [];
    for (var y = tepe; y <= H + 4; y += 10) { var x = cx(y), w = cw(y) / 2; sol.push(f(x - w) + " " + f(y)); sag.push(f(x + w) + " " + f(y)); }
    var govde = '<path class="kabuk govde" d="M' + sol.join("L") + "L" + sag.reverse().join("L") + 'Z"/>';
    /* kabuk dokusu: gövde boyunca kesikli oluklar */
    var doku = "";
    for (var d = -3; d <= 3; d++) {
      var pts = [];
      for (var y2 = tepe + 20; y2 <= H; y2 += 18) pts.push(f(cx(y2) + d * cw(y2) / 8 + 3 * Math.sin(y2 * 0.07 + d)) + " " + f(y2));
      doku += '<path d="M' + pts.join("L") + '" stroke="' + (d % 2 ? "rgba(0,0,0,.45)" : "rgba(255,214,170,.07)") + '" stroke-width="' + (d % 2 ? 2.2 : 1.4) + '" fill="none" stroke-dasharray="' + (30 + Math.abs(d) * 9) + " " + (8 + Math.abs(d) * 5) + '"/>';
    }
    /* raf dalları: her rafın altında, gövdeden sola */
    var dallar = "", ucYaprak = "", raflar = [];
    [].slice.call(kap.querySelectorAll(".kraf")).forEach(function (raf, i) {
      var kit = raf.querySelector(".kraf-kitaplar"), lev = raf.querySelector(".kraf-levha");
      var rb = kit.getBoundingClientRect(), lb = lev.getBoundingClientRect();
      var y = rb.bottom - kr.top, xa = mobil ? 4 : Math.min(lb.left, rb.left) - kr.left - 26, xb = cx(y) - cw(y) * 0.25;
      var kal = mobil ? 16 : 24;
      raflar.push({ y: y, xa: xa, xb: xb });
      dallar += dal([xb, y + kal / 2, xb - (xb - xa) * 0.35, y + kal / 2 + 3, xa + (xb - xa) * 0.3, y + 8, xa, y + 6], kal + 8, 11, "kabuk dal");
      if (!mobil) {
        dallar += dal([xa + 6, y + 7, xa - 26, y + 12, xa - 34, y - 16, xa - 16, y - 26], 10, 1.5, "kabuk dal");
        if (i % 2 === 0) ucYaprak += yapraklar(xa - 18, y - 30, 9, 31 + i * 7, 12);
        /* gövdeye yakın, rafın üstünden kıvrılan ince bir filiz */
        var ust = y - rb.height - 8;
        dallar += dal([xb - 6, y - 10, xb - 10, ust + 40, xb - 60, ust + 10, xb - 110 - (i % 3) * 30, ust + 18], 12, 1.5, "kabuk dal");
        ucYaprak += yapraklar(xb - 110 - (i % 3) * 30, ust + 16, 6, 97 + i * 13, 8);
      }
    });
    /* taç: gövdenin tepesinden sağa sola uzanan dallar ve bakır yapraklar */
    var tac = "", ty = tepe + 6, tx0 = cx(tepe);
    var uclar = mobil ? [[W * 0.45, 8], [W * 0.75, 4], [W - 4, 18]] : [[W * 0.12, 18], [W * 0.34, 4], [W * 0.56, 14], [W * 0.74, 2], [W - 6, 22], [tx0 - 40, -2]];
    uclar.forEach(function (u, i) {
      var mx = (tx0 + u[0]) / 2;
      tac += dal([tx0 + (u[0] > tx0 ? 6 : -6), ty + 20, mx + (i % 2 ? 20 : -10), ty - 30 - (i % 3) * 10, mx, u[1] + 20, u[0], u[1] + 4], (mobil ? 14 : 30) - i * 2, 2, "kabuk dal");
      tac += yapraklar(u[0], u[1] + 8, mobil ? 10 : 18, 11 + i * 17, mobil ? 14 : 26);
      tac += yapraklar(mx, ty - 22 - (i % 3) * 10, mobil ? 6 : 12, 53 + i * 19, mobil ? 10 : 20);
    });
    /* kovuk ve fener */
    var fy = H * (mobil ? 0.5 : 0.47), fx = cx(fy), kovuk = "";
    if (!mobil) {
      kovuk = '<ellipse cx="' + f(fx) + '" cy="' + f(fy) + '" rx="' + f(cw(fy) * 0.3) + '" ry="46" fill="#070504"/><ellipse cx="' + f(fx) + '" cy="' + f(fy) + '" rx="' + f(cw(fy) * 0.3) + '" ry="46" fill="none" stroke="#4a3526" stroke-width="5"/>' +
        '<circle class="fener-hale" cx="' + f(fx) + '" cy="' + f(fy + 10) + '" r="60" fill="url(#fenerG)"/>' +
        '<g class="fener" transform="translate(' + f(fx) + " " + f(fy + 6) + ')"><path d="M0 -26V-20" stroke="#8a6a3a" stroke-width="1.5"/><path d="M-9 -20H9L7 -16H-7Z" fill="#6a4a24"/><rect x="-8" y="-16" width="16" height="22" rx="3" fill="#ffcf7a" opacity=".85"/><path d="M-8 -9H8M0 -16V6" stroke="#6a4a24" stroke-width="1.4"/><path d="M-10 6H10L8 10H-8Z" fill="#6a4a24"/></g>';
    }
    /* Ağacın küçük sakinleri: dal boyunca gezinen salyangoz, gövdede inip çıkan uğur böceği, fenerin çevresinde dönen güve */
    var canli = "";
    if (!azalt) {
      var r2 = raflar[2] || raflar[0], r4 = raflar[4] || raflar[raflar.length - 1];
      if (r2) canli += '<g class="salyangoz" style="--x0:' + f(r2.xa + 40) + "px;--x1:" + f(r2.xb - 70) + "px;--y:" + f(r2.y + (mobil ? 4 : 7)) + 'px"><g class="sy-govde">' +
        '<path d="M-14 0C-14 -3 -8 -4 0 -4H10C13 -4 15 -7 16 -10M16 -10L18 -15M16 -10L14 -15" fill="none" stroke="#c9b48a" stroke-width="1.4" stroke-linecap="round"/>' +
        '<path d="M-15 1H12C14 1 15 0 14 -2L10 -4H-10C-13 -4 -15 -2 -15 1Z" fill="#d9c49a"/><circle cx="-4" cy="-9" r="7.5" fill="#8a5a2a" stroke="#5a3a18" stroke-width="1"/>' +
        '<path d="M-4 -9m-4.5 0a4.5 4.5 0 1 0 9 0a3 3 0 1 0 -6 0a1.5 1.5 0 1 0 3 0" fill="none" stroke="#e8c070" stroke-width="1"/><circle cx="18" cy="-15.5" r="1.2" fill="#2a1a0c"/><circle cx="14" cy="-15.5" r="1.2" fill="#2a1a0c"/></g></g>';
      if (r4 && !mobil) { var ty1 = r4.y - 30, ty2 = raflar[1] ? raflar[1].y + 30 : H * 0.3;
        canli += '<g class="ugur" style="--x0:' + f(cx(ty1) - cw(ty1) * 0.18) + "px;--y0:" + f(ty1) + "px;--x1:" + f(cx(ty2) - cw(ty2) * 0.18) + "px;--y1:" + f(ty2) + 'px"><g class="ug-govde">' +
          '<ellipse rx="5.2" ry="6" fill="#d8322a"/><path d="M0 -6V6" stroke="#2a0a08" stroke-width=".9"/><circle cx="-2.4" cy="-1" r="1.1" fill="#1a0808"/><circle cx="2.6" cy="1.8" r="1.2" fill="#1a0808"/><circle cx="-2" cy="3.4" r=".9" fill="#1a0808"/>' +
          '<circle cy="-7" r="2.6" fill="#1a0808"/><path d="M-1.4 -9L-3 -12M1.4 -9L3 -12" stroke="#1a0808" stroke-width=".7"/></g></g>'; }
      if (!mobil) canli += '<g transform="translate(' + f(fx) + " " + f(fy + 2) + ')"><g class="guve"><g transform="translate(34 0)"><path class="gv-kanat" d="M0 0C-5 -6 -9 -4 -8 0C-9 4 -5 6 0 0C5 -6 9 -4 8 0C9 4 5 6 0 0Z" fill="#d8cbb0" opacity=".85"/></g></g></g>';
    }
    svg.setAttribute("viewBox", "0 0 " + f(W) + " " + f(H));
    svg.innerHTML = s + '<g class="agac-govde">' + kok + govde + doku + dallar + tac + "</g>" + kovuk + '<g class="agac-yaprak">' + ucYaprak + "</g>" + canli;
    if (toz) toz.boyut(W, H, tx);
  }

  /* Işık huzmelerinde süzülen toz */
  var toz = null, tuval = kap.querySelector(".kl-toz");
  if (!azalt && tuval.getContext) {
    toz = (function () {
      var c = tuval.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, ps = [], gorunur = false;
      var TX = 0, bocek = [];
      function yeni(ilk) { return { x: Math.random() * W, y: ilk ? Math.random() * H : H + 5, r: 0.5 + Math.random() * 1.5, v: 0.08 + Math.random() * 0.22, f: Math.random() * 6.28 }; }
      /* ateş böcekleri: tacın ve fenerin çevresinde gezinip yanıp söner */
      function yeniBocek() { var tac = Math.random() < 0.6; return { x: tac ? Math.random() * W : TX - 60 + Math.random() * 120, y: tac ? 20 + Math.random() * 90 : H * (0.3 + Math.random() * 0.35), f: Math.random() * 6.28, s: Math.random() }; }
      function kare() {
        if (gorunur && !document.hidden) {
          c.clearRect(0, 0, W, H);
          var gun = document.documentElement.classList.contains("gunduz");
          for (var i = 0; i < ps.length; i++) {
            var p = ps[i]; p.y -= p.v; p.f += 0.01; p.x += Math.sin(p.f) * 0.25;
            /* huzme bantlarının içindeyken parlar (huzmeler ~25° eğik) */
            var b = (p.x + p.y * 0.47) / W, ic = Math.max(0, Math.sin(b * 9.4 + 0.6));
            var a = (0.12 + 0.7 * ic * ic) * (0.4 + 0.6 * Math.abs(Math.sin(p.f * 1.7)));
            c.fillStyle = (gun ? "rgba(255,246,220," : "rgba(255,222,160,") + a.toFixed(3) + ")";
            c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
            if (p.y < -4) ps[i] = yeni(false);
          }
          for (var j = 0; j < bocek.length; j++) {
            var q = bocek[j]; q.f += 0.012 + q.s * 0.01; q.x += Math.cos(q.f * 0.7) * 0.45; q.y += Math.sin(q.f * 0.9) * 0.3;
            var ya = Math.max(0, Math.sin(q.f * 2.2 + q.s * 9)); ya = ya * ya;
            var g = c.createRadialGradient(q.x, q.y, 0, q.x, q.y, 8);
            g.addColorStop(0, "rgba(" + (gun ? "150,190,40," : "220,255,120,") + (ya * 0.95).toFixed(3) + ")"); g.addColorStop(1, "rgba(200,255,100,0)");
            c.fillStyle = g; c.beginPath(); c.arc(q.x, q.y, 8, 0, 6.283); c.fill();
            if (q.x < -10 || q.x > W + 10 || q.y < 0 || q.y > H) bocek[j] = yeniBocek();
          }
        }
        requestAnimationFrame(kare);
      }
      new IntersectionObserver(function (k) { gorunur = k[0].isIntersecting; }).observe(tuval);
      requestAnimationFrame(kare);
      return { boyut: function (w, h, tx) {
        W = w; H = h; TX = tx || W - 90;
        bocek = []; for (var b = 0; b < (W < 640 ? 6 : 14); b++) bocek.push(yeniBocek()); tuval.width = W * dpr; tuval.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);
        ps = []; var n = Math.round(W * H / 9000); for (var i = 0; i < Math.min(n, 110); i++) ps.push(yeni(true));
      } };
    })();
  }

  /* Kitap kurtları: iki kitabın tepesinden ara sıra gözlüklü başını uzatıp etrafa bakar */
  if (!azalt) {
    var tum = [].slice.call(kap.querySelectorAll(".kitap"));
    [tum[3], tum[Math.floor(tum.length * 0.6)]].forEach(function (k, i) {
      if (!k) return;
      var kurt = document.createElement("span");
      kurt.className = "kitap-kurdu"; kurt.setAttribute("aria-hidden", "true"); kurt.style.setProperty("--kd", (-i * 7) + "s");
      kurt.innerHTML = '<svg viewBox="0 0 24 30"><path d="M12 30V14C12 8 14 5 17 5" fill="none" stroke="#9cc46a" stroke-width="7" stroke-linecap="round"/><path d="M12 26h0M12 20h0" stroke="#7aa24a" stroke-width="8" stroke-linecap="round" opacity=".5"/>' +
        '<circle cx="15" cy="6" r="1.8" fill="#1a1a0c"/><circle cx="20" cy="6" r="1.8" fill="#1a1a0c"/><circle cx="15" cy="6" r="3" fill="none" stroke="#e8c070" stroke-width=".9"/><circle cx="20" cy="6" r="3" fill="none" stroke="#e8c070" stroke-width=".9"/><path d="M18 6h-0" stroke="#e8c070"/></svg>';
      k.appendChild(kurt);
    });
  }

  var bekle = 0;
  ciz();
  if (window.ResizeObserver) new ResizeObserver(function () { clearTimeout(bekle); bekle = setTimeout(ciz, 80); }).observe(kap);
  window.addEventListener("load", ciz);

  /* Ara sıra biri raftan bir kitaba uzanıyormuş gibi: rastgele bir kitap hafifçe çekilip yerine döner */
  if (!azalt) setInterval(function () {
    if (document.hidden) return;
    var r = kap.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    var kitaplar = kap.querySelectorAll(".kitap"), k = kitaplar[Math.floor(Math.random() * kitaplar.length)];
    if (!k || k.matches(":hover")) return;
    k.classList.remove("cek"); void k.offsetWidth; k.classList.add("cek");
  }, 5200);
})();
