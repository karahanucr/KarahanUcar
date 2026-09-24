/* Kitaplık: her raf bir alan, her kitap bir dal. Sırtlarda dalı çağrıştıran küçük, sürekli hareket eden bir motif durur.
   Yeni dal eklemek: ilgili rafın "kitaplar" listesine { ad, motif } ekle; kendi sahnesi varsa sahne: "sahne-kimligi".
   Motif adları aşağıdaki MOTIF sözlüğündedir. Bu dosya yazi.js'ten ÖNCE yüklenir ki kitap adları çevrilebilsin. */
(function () {
  var kap = document.getElementById("kitaplik");
  if (!kap) return;

  var RAFLAR = [
    { alan: "felsefe", ad: "Felsefe", sahne: "felsefe", kitaplar: [
      { ad: "Bilgi Felsefesi", sahne: "epistemoloji", motif: "goz" }, { ad: "Dil Felsefesi", motif: "balon" }, { ad: "Varlık Felsefesi", sahne: "metafizik", motif: "kup" },
      { ad: "Zihin Felsefesi", sahne: "zihin", motif: "beyin" }, { ad: "Mantık Felsefesi", motif: "mantik" }, { ad: "Bilim Felsefesi", motif: "atom" },
      { ad: "Politik Felsefe", motif: "sutun" }, { ad: "Etik", motif: "terazi" }, { ad: "Din Felsefesi", motif: "isik" },
      { ad: "Tarih Felsefesi", motif: "kumsaati" }, { ad: "Sanat Felsefesi", motif: "firca" }, { ad: "Felsefe Tarihi", motif: "parsomen" },
      { ad: "Metafelsefe", motif: "ayna" }, { ad: "Sözlükçe", sahne: "sozlukce-felsefe", motif: "sozluk" } ] },
    { alan: "diller", ad: "Diller", sahne: "diller", kitaplar: [
      { ad: "Latince", sahne: "latince", motif: "spqr" }, { ad: "Antik Yunanca", sahne: "yunanca", motif: "lir" }, { ad: "Arapça", sahne: "arapca", motif: "hilal" },
      { ad: "Almanca", motif: "harf", harfler: "ß·Ä·Ö·Ü" }, { ad: "Fransızca", motif: "harf", harfler: "ç·é·œ·à" }, { ad: "İngilizce", motif: "harf", harfler: "W·æ·þ·Q" } ] },
    { alan: "doga-bilimleri", ad: "Doğa Bilimleri", sahne: "doga-bilimleri", kitaplar: [
      { ad: "Astronomi", sahne: "astronomi", motif: "yildiz" }, { ad: "Biyoloji", sahne: "biyoloji", motif: "yaprak" }, { ad: "Ekoloji", motif: "dongu" },
      { ad: "Fizik", sahne: "fizik", motif: "sarkac" }, { ad: "Jeoloji", motif: "katman" }, { ad: "Kimya", motif: "sise" },
      { ad: "Mühendislik", motif: "cark" }, { ad: "Tıp", motif: "nabiz" }, { ad: "Sözlükçe", sahne: "sozlukce-doga", motif: "sozluk" } ] },
    { alan: "formel-bilimler", ad: "Formel Bilimler", sahne: "formel-bilimler", kitaplar: [
      { ad: "Bilişim", motif: "kod" }, { ad: "Geometri", sahne: "geometri", motif: "pergel" }, { ad: "Mantık", motif: "mantik" },
      { ad: "Matematik", motif: "sonsuz" }, { ad: "Sözlükçe", sahne: "sozlukce-formel", motif: "sozluk" } ] },
    { alan: "sosyal-bilimler", ad: "Sosyal Bilimler", sahne: "sosyal-bilimler", kitaplar: [
      { ad: "Antropoloji", motif: "insan" }, { ad: "Arkeoloji", motif: "comlek" }, { ad: "Coğrafya", sahne: "cografya", motif: "pusula" },
      { ad: "Dilbilimi", motif: "ses" }, { ad: "Ekonomi", motif: "grafik" }, { ad: "Hukuk", motif: "terazi" }, { ad: "İlahiyat", motif: "isik" },
      { ad: "Siyaset ve Sosyoloji", motif: "ag" }, { ad: "Psikoloji ve Psikanaliz", motif: "psi" }, { ad: "Tarih", motif: "kumsaati" },
      { ad: "Sözlükçe", sahne: "sozlukce-sosyal", motif: "sozluk" } ] },
    { alan: "estetik", ad: "Estetik", sahne: "estetik", kitaplar: [
      { ad: "Edebiyat", motif: "kalem" }, { ad: "Görsel Sanatlar", sahne: "film", motif: "film" }, { ad: "Müzik", motif: "nota" },
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
    return [].slice.call(document.querySelectorAll(".dizin .kayit:not(.kayit-yakinda)")).filter(function (k) { return (k.getAttribute("data-alan") || "").split(/\s+/).indexOf(alan) > -1; }).length;
  }
  function harfMotif(harfler) {
    return '<g fill="#f0cf82" font-family="Georgia,serif" font-size="14" text-anchor="middle">' + harfler.split("·").map(function (h, i, a) {
      return '<text class="m-harf" x="15" y="25" style="animation-delay:' + (i * 2) + "s;animation-duration:" + (a.length * 2) + 's">' + h + "</text>";
    }).join("") + "</g>";
  }

  var html = "";
  RAFLAR.forEach(function (raf, ri) {
    var n = sayac(raf.alan);
    html += '<div class="kraf" data-alan="' + raf.alan + '"><button type="button" class="kraf-levha" data-sahne="' + raf.sahne + '" data-ad="' + raf.ad + '" style="--c:' + RENK[ri * 3 % RENK.length] + '" aria-haspopup="dialog">' +
      '<span class="kraf-ad">' + raf.ad + '</span><span class="kraf-sayi" data-sabit>' + n + '</span></button><div class="kraf-kitaplar">';
    raf.kitaplar.forEach(function (k, i) {
      var renk = RENK[(ri * 5 + i * 3) % RENK.length], boy = 86 + ((i * 37 + ri * 11) % 15);
      var hedef = k.sahne || raf.sahne;
      html += '<button type="button" class="kitap' + (k.ad.length > 20 ? " cok-uzun" : k.ad.length > 13 ? " uzun" : "") + (k.sahne ? " kitap-sahne" : "") + (k.motif === "sozluk" ? " kitap-sozluk" : "") + '" data-sahne="' + hedef + '" data-ad="' + k.ad + '" style="--c:' + renk + ";--h:" + boy + '%" aria-haspopup="dialog">' +
        (k.sahne ? '<span class="cilt-isik" aria-hidden="true"></span>' : "") +
        '<svg class="kitap-motif" viewBox="0 0 30 40" aria-hidden="true">' + (k.motif === "harf" ? harfMotif(k.harfler) : MOTIF[k.motif] || "") + "</svg>" +
        '<span class="kitap-ad">' + k.ad + "</span></button>";
    });
    html += '</div><div class="kraf-tahta" aria-hidden="true"></div></div>';
  });
  kap.innerHTML = html;
})();
