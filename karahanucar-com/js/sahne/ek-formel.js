/* Formel Bilimler odasının yeni kapıları: Bilişim (Bletchley Park), Mantık (zamanların buluştuğu revak), Matematik (Göttingen'de bir kara tahta). */
(function () {
  var S = window.SAHNE; if (!S || !S.kit) return;
  var h = S.h, K = S.kit;

  /* ════════ BİLİŞİM: Bletchley Park, Kulübe 11A ════════ */
  S.kaydet("bilisim", {
    ad: "Bilişim", ust: "formel-bilimler", yer: "Bletchley Park · Kulübe 11A · 1943 · gece", vurgu: "#8FE0B0", alan: "formel-bilimler",
    alt: "Bombe makinesinin davulları dönüyor, masada bir Enigma, kara tahtada sonsuz bir şerit. Düşünmenin mekanikleştiği oda.",
    parcacik: { tur: "harf", adet: 40, harfler: "0101100110101001", renk: "rgba(140,230,170," }, isaret: "dalga",
    sozler: [
      { metin: "We can only see a short distance ahead, but we can see plenty there that needs to be done.", dil: "en", ceviri: "İleriyi ancak kısa bir mesafe görebiliyoruz; ama orada yapılması gereken çok şey görüyoruz.", kaynak: "Alan Turing, Bilgisayar Makineleri ve Zekâ, 1950" },
      { metin: "The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.", dil: "en", ceviri: "Analitik Makine cebirsel desenler dokur, tıpkı Jacquard tezgâhının çiçek ve yaprak dokuması gibi.", kaynak: "Ada Lovelace, Not A, 1843" }
    ],
    arka: function () {
      var s = K.duvar("bl", "#2a3430", "#0e1412") + K.pencere(1360, 110, 180, 260, true);
      /* Bombe: dönen davullar ve yanıp sönen lambalar */
      s += '<g transform="translate(90 150)"><rect width="560" height="470" rx="6" fill="#1e2420" stroke="#3a4a40" stroke-width="8"/>';
      var renk = ["#c83a3a", "#3a8ac8", "#c8a83a", "#6a3a8a", "#3aa86a"];
      for (var r = 0; r < 3; r++) for (var c = 0; c < 9; c++) {
        var x = 44 + c * 58, y = 60 + r * 130;
        s += '<circle cx="' + x + '" cy="' + y + '" r="24" fill="#111"/><g class="don" style="--s:' + (1.5 + ((r * 9 + c) % 5) * 0.7) + 's"><circle cx="' + x + '" cy="' + y + '" r="20" fill="' + renk[(r + c) % 5] + '"/><path d="M' + x + " " + (y - 20) + "V" + (y - 8) + '" stroke="#fff" stroke-width="3"/></g>';
      }
      for (var l = 0; l < 14; l++) s += '<circle class="pencere-isik" style="animation-delay:-' + (l * 0.37).toFixed(2) + 's;animation-duration:' + (1.2 + l % 4 * 0.5) + 's" cx="' + (40 + l * 36) + '" cy="440" r="6" fill="#ffd27a"/>';
      s += "</g>";
      /* kara tahta: Turing makinesi şeridi */
      s += '<g transform="translate(760 150)"><rect width="520" height="300" fill="#1e2a24" stroke="#5a3a22" stroke-width="12"/><text x="24" y="44" font-family="Georgia,serif" font-size="22" fill="#e8e8d8" opacity=".85">q₀ ⊢ 1 → q₁, R</text>';
      for (var k = 0; k < 11; k++) s += '<rect x="' + (22 + k * 44) + '" y="120" width="42" height="42" fill="none" stroke="#e8e8d8" stroke-width="2" opacity=".8"/><text x="' + (43 + k * 44) + '" y="150" text-anchor="middle" font-family="monospace" font-size="22" fill="#e8e8d8">' + "01101001101"[k] + "</text>";
      s += '<g class="dalga-x" style="--d:0s;animation-duration:9s"><path d="M110 196L124 176L138 196Z" fill="#8FE0B0"/></g><text x="24" y="260" font-family="Georgia,serif" font-size="20" fill="#e8e8d8" opacity=".7">durur mu? ⟶ karar verilemez</text></g>';
      s += K.zemin("bl", 700, "#2a2420", "#0e0a08");
      /* masa: Enigma, delikli kartlar, ekran */
      s += K.masa(640, 700, 700, "#4a3424");
      s += '<g transform="translate(820 690)"><rect x="-110" y="-70" width="220" height="70" rx="6" fill="#2a2420"/><rect x="-96" y="-120" width="192" height="54" fill="#1a1612"/>' + [0, 1, 2].map(function (i) { return '<rect x="' + (-60 + i * 44) + '" y="-116" width="24" height="44" rx="4" fill="#8a7a5a"/>'; }).join("") +
        [0, 1, 2].map(function (rr) { return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (cc) { return '<circle cx="' + (-80 + cc * 20 + rr * 6) + '" cy="' + (-54 + rr * 16) + '" r="6" fill="#d8d0b8"/>'; }).join(""); }).join("") + '<circle class="ampul" cx="40" cy="-100" r="5" fill="#ffe27a"/></g>';
      s += '<g transform="translate(1020 690)">' + [0, 1, 2, 3].map(function (i) { return '<g transform="translate(' + (i * 6) + " " + (-i * 5) + ') rotate(' + (i * 3 - 4) + ')"><rect x="-50" y="-26" width="100" height="26" fill="#e8dcc0"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (j) { return '<rect x="' + (-42 + j * 11) + '" y="' + (-20 + (j * 7 + i) % 3 * 6) + '" width="4" height="6" fill="#3a2a1a"/>'; }).join("") + "</g>"; }).join("") + "</g>";
      s += '<g transform="translate(1220 700)"><rect x="-80" y="-130" width="160" height="110" rx="8" fill="#141a18" stroke="#3a4a40" stroke-width="6"/><text x="-66" y="-100" font-family="monospace" font-size="12" fill="#8FE0B0">def hesapla(n):</text><text x="-56" y="-84" font-family="monospace" font-size="12" fill="#8FE0B0">return n*2</text><rect class="ampul" x="-66" y="-72" width="8" height="12" fill="#8FE0B0"/><rect x="-10" y="-20" width="20" height="20" fill="#3a4a40"/></g>';
      s += '<g transform="translate(1420 520)"><rect x="-50" y="-66" width="100" height="120" fill="#5a3a22"/><rect x="-40" y="-56" width="80" height="100" fill="#3a3040"/><ellipse cy="-20" rx="20" ry="26" fill="#d8b8a0"/><path d="M-30 44C-30 10 30 10 30 44Z" fill="#6a3a5a"/><path d="M-22 -30C-24 -56 24 -56 22 -30C18 -46 -18 -46 -22 -30Z" fill="#3a2a1a"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 23, y: 44, ad: "Bombe makinesi", panel: '<h3>Turing ve Enigma’nın kırılışı</h3><p>Alman ordusunun Enigma şifresi her gün değişen ayarlarla 10²⁰’den fazla olasılık üretir. Polonyalı matematikçiler (Rejewski, 1932) ilk kırılışı başarır; Bletchley Park’ta <b>Alan Turing</b> ve Gordon Welchman bunu elektromekanik <b>Bombe</b> makineleriyle sanayileştirir.</p><p>Dönen davullar olası rotor ayarlarını tarar, çelişki bulunan ayarları eler. Tarihçilere göre bu çalışma savaşı birkaç yıl kısalttı.</p>' },
      { x: 51, y: 70, ad: "Enigma", panel: '<h3>Şifreleme</h3><p>Enigma’da her tuşa basış rotorları döndürür; aynı harf her seferinde başka bir harfe şifrelenir. Ama bir zaafı vardı: hiçbir harf kendisine şifrelenemezdi. Kırıcılar bu tür küçük düzenlilikleri (“beşikler”) kullandı.</p><p>Bugünkü şifreleme matematik problemlerinin zorluğuna dayanır: RSA (1977) büyük sayıları çarpanlarına ayırmanın güçlüğüne.</p>' },
      { x: 64, y: 30, ad: "Kara tahta", panel: '<h3>Turing makinesi (1936)</h3><p>Sonsuz bir şerit, okuyup yazan bir kafa ve sonlu sayıda durum: Turing, “hesaplamak” ne demektir sorusunu bu soyut makineyle yanıtlar. Hesaplanabilen her şeyi hesaplayabilen <b>evrensel makine</b> fikri bugünkü bilgisayarın kavramsal atasıdır.</p><p>Aynı makale gösterir ki bir programın durup durmayacağını her durumda söyleyen bir program yazılamaz (<b>durma problemi</b>): hesaplamanın da sınırları vardır.</p>' },
      { x: 89, y: 55, ad: "Çerçeve", panel: '<h3>Babbage ve Ada Lovelace</h3><p><b>Charles Babbage</b> buharla çalışacak programlanabilir bir <b>Analitik Makine</b> tasarlar (1837); hiç tamamlanamaz. <b>Ada Lovelace</b>, Menabrea’nın makalesini çevirip notlar ekler (1843): Bernoulli sayılarını hesaplayan adım adım bir yöntem — ilk yayımlanmış bilgisayar programı sayılır.</p><p>Makinenin sayıların ötesinde, müzik gibi simgelerle de çalışabileceğini ilk sezen odur.</p>' },
      { x: 64, y: 72, ad: "Delikli kartlar", panel: '<h3>Jacquard’dan Hollerith’e</h3><p>1804’te <b>Jacquard</b> dokuma tezgâhı desenleri delikli kartlardan okur: bir makine ilk kez bir “program” izler. Babbage bu kartları makinesine uyarlamak ister.</p><p><b>Herman Hollerith</b> 1890 ABD nüfus sayımını delikli kartlarla yıllar yerine aylar içinde sayar; kurduğu şirket sonra IBM olur.</p>' },
      { x: 38, y: 80, ad: "Masanın altındaki not", panel: '<h3>Harezmî, Leibniz ve ikili sistem</h3><p>“Algoritma” sözcüğü 9. yüzyılda Bağdat’ta yaşayan <b>el-Harezmî</b>’nin Latinceleşmiş adından (<i>Algoritmi</i>) gelir: adım adım işlem yöntemi.</p><p><b>Leibniz</b> ikili sayı sistemini 1703’te yayımlar ve bir hesap makinesi yapar. Boole’un cebiri ve Shannon’ın 1937’de gösterdiği gibi, anahtarlarla kurulan devreler mantık işlemlerini yapabilir: 0 ve 1’in dünyası.</p>' },
      { x: 76, y: 64, ad: "Ekran", panel: '<h3>Bilgisayardan ağa, ağdan yapay zekâya</h3><ul><li><b>von Neumann mimarisi</b> (1945): program ve veri aynı bellekte.</li><li><b>Transistör</b> (1947) ve tümleşik devre: Moore yasası.</li><li><b>ARPANET</b> (1969), <b>Web</b> (Tim Berners-Lee, CERN, 1989).</li><li><b>Yapay zekâ</b>: Dartmouth (1956)’dan derin öğrenmeye ve büyük dil modellerine.</li></ul><p>Turing’in 1950’deki sorusu yeniden gündemde: makineler düşünebilir mi?</p>' }
    ]
  });

  /* ════════ MANTIK: zamanların buluştuğu revak ════════ */
  S.kaydet("mantik", {
    ad: "Mantık", ust: "formel-bilimler", yer: "Zamanların buluştuğu bir revak · Aristoteles’ten Gödel’e", vurgu: "#C8B0FF", alan: "formel-bilimler",
    alt: "Kumda çizilmiş çemberler, taşa kazınmış bir kıyas, kürsüde Boole’un kitabı, köşede kendini sonsuza dek yansıtan bir ayna.",
    parcacik: { tur: "harf", adet: 36, harfler: "∀∃¬∧∨→↔⊢⊨PQRpq", renk: "rgba(210,190,255," }, isaret: "kristal", sozYer: "sag",
    sozler: [
      { metin: "Wovon man nicht sprechen kann, darüber muss man schweigen.", dil: "de", ceviri: "Hakkında konuşulamayan şey üzerine susmak gerekir.", kaynak: "Wittgenstein, Tractatus 7, 1921" },
      { metin: "Calculemus!", dil: "la", ceviri: "Hesaplayalım!", kaynak: "Leibniz, anlaşmazlıkların hesapla çözülmesi üzerine" },
      { metin: "συλλογισμὸς δέ ἐστι λόγος ἐν ᾧ τεθέντων τινῶν ἕτερόν τι… ἐξ ἀνάγκης συμβαίνει", dil: "grc", ceviri: "Kıyas, bazı şeyler konulduğunda onlardan başka bir şeyin zorunlu olarak çıktığı bir söylemdir.", kaynak: "Aristoteles, Önceki Analitikler 24b18" }
    ],
    arka: function () {
      var s = K.gokGun("mn");
      s += K.tepe(480, "#9aa8b8", 111, 50);
      s += K.tapinak(80, 640, 1440, 220, "#e8e0d0");
      /* dama taşlı zemin */
      s += '<rect y="640" width="1600" height="260" fill="#cfc4ae"/>';
      for (var r = 0; r < 5; r++) for (var c = 0; c < 20; c++) if ((r + c) % 2) s += '<path d="M' + (c * 80 - r * 40) + " " + (640 + r * 52) + "h80l-" + 20 + " 52h-80Z" + '" fill="#b8ac94" opacity=".7"/>';
      /* kum havuzu: Euler–Venn çemberleri kendini çizer */
      s += '<g transform="translate(800 790)"><ellipse rx="220" ry="70" fill="#d8c8a0" stroke="#a89878" stroke-width="6"/><g fill="none" stroke="#6a4a24" stroke-width="3"><ellipse class="altin-spiral" cx="-50" rx="80" ry="36" pathLength="1"/><ellipse class="altin-spiral" style="animation-delay:-2s" cx="50" rx="80" ry="36" pathLength="1"/><ellipse class="altin-spiral" style="animation-delay:-4s" cy="-20" rx="70" ry="30" pathLength="1"/></g></g>';
      /* taş tablet (Barbara), girit vazosu, kürsüde kitap, tahta, sonsuz ayna */
      s += '<g transform="translate(300 780)"><path d="M-80 60V-110A80 40 0 0 1 80 -110V60Z" fill="#b8b0a0" stroke="#8a8270" stroke-width="4"/><text y="-80" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#3a3024">BARBARA</text><text y="-50" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#3a3024">Her M, P’dir</text><text y="-28" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#3a3024">Her S, M’dir</text><path d="M-50 -18H50" stroke="#3a3024"/><text y="4" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#3a3024">∴ Her S, P’dir</text></g>';
      s += '<g transform="translate(120 860)"><path d="M-30 0C-50 -40 -40 -80 -20 -100V-120H20V-100C40 -80 50 -40 30 0Z" fill="#b8603a"/><path d="M-38 -60H38" stroke="#2a1a10" stroke-width="12"/><text y="-56" text-anchor="middle" font-size="9" fill="#e8c890" font-family="Georgia,serif">ΚΡΗΤΕΣ ΑΕΙ ΨΕΥΣΤΑΙ</text></g>';
      s += '<g transform="translate(1180 860)"><path d="M-30 0L-12 -170H12L30 0Z" fill="#6a4a2a"/><path d="M-80 -178L80 -168L70 -146L-70 -156Z" fill="#8a6a3a"/><path d="M-74 -180C-40 -196 -6 -190 0 -178C6 -190 40 -196 74 -180V-162C40 -176 6 -170 0 -160C-6 -170 -40 -176 -74 -162Z" fill="#efe2c2"/><text x="-36" y="-178" font-size="11" text-anchor="middle" fill="#3a2a1a" font-family="Georgia,serif">x² = x</text><text x="38" y="-176" font-size="11" text-anchor="middle" fill="#3a2a1a" font-family="Georgia,serif">1 · 0</text></g>';
      s += '<g transform="translate(1000 380)"><rect width="300" height="170" fill="#243028" stroke="#6a4a2a" stroke-width="10"/><path d="M30 40H70V100M70 70H110M110 40V100H150" stroke="#e8e8d8" stroke-width="2" fill="none"/><text x="160" y="76" font-family="Georgia,serif" font-size="18" fill="#e8e8d8">F(a)</text><text x="30" y="150" font-family="Georgia,serif" font-size="16" fill="#e8e8d8" opacity=".8">R = {x | x ∉ x}</text></g>';
      s += '<g transform="translate(1440 560)"><ellipse rx="80" ry="120" fill="#d8b050"/>' + [1, .82, .66, .52, .4, .3, .22, .15].map(function (k, i) { return '<ellipse rx="' + (70 * k) + '" ry="' + (108 * k) + '" fill="' + (i % 2 ? "#3a4a6a" : "#6a7a9a") + '" opacity=".95"/>'; }).join("") + '<circle r="4" fill="#fff" class="hale"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 19, y: 78, ad: "Taş tablet", panel: '<h3>Aristoteles ve kıyas</h3><p><b>Organon</b> (“araç”) adı verilen mantık eserlerinde Aristoteles geçerli çıkarımın biçimlerini sistemleştirir. “Her insan ölümlüdür; Sokrates insandır; öyleyse Sokrates ölümlüdür.” Geçerlilik içeriğe değil biçime bağlıdır.</p><p>Orta Çağ öğrencileri kıyas biçimlerini ezberlemek için uydurma adlar kullanırdı: <i>Barbara, Celarent, Darii, Ferio</i>; ünlüler önermelerin türünü gösterir. Kant bile mantığın Aristoteles’ten beri bir adım ilerlemediğini düşünüyordu.</p>' },
      { x: 50, y: 88, ad: "Kumdaki çemberler", panel: '<h3>Euler ve Venn çemberleri</h3><p><b>Euler</b> bir Alman prensesine yazdığı mektuplarda (1768) kıyasları iç içe ve kesişen çemberlerle gösterir. <b>John Venn</b> 1880’de bütün olası kesişimleri gösteren diyagramları geliştirir.</p><p>Görsel mantık, sezgiyle biçimsel kanıt arasında bir köprüdür; bugün küme kuramının ilk ders çizimidir.</p>' },
      { x: 74, y: 70, ad: "Kürsüdeki kitap", panel: '<h3>Boole’un Düşünce Yasaları (1854)</h3><p>Kendi kendini yetiştirmiş İrlandalı matematikçi <b>George Boole</b>, mantığı cebirle yazar: doğru = 1, yanlış = 0; “ve” çarpma, “veya” toplama gibi davranır; x² = x.</p><p>1937’de genç Claude Shannon, rölelerden kurulan devrelerin Boole cebirini hesaplayabildiğini gösterir: bütün sayısal bilgisayarların temeli.</p>' },
      { x: 72, y: 50, ad: "Kara tahta", panel: '<h3>Frege ve Russell paradoksu</h3><p><b>Gottlob Frege</b>’nin Begriffsschrift’i (1879) niceleyicileri (her, bazı) ve değişkenleri getirir: modern yüklemler mantığı doğar. Matematiği mantıktan türetmek ister.</p><p>1902’de Russell’dan bir mektup gelir: kendini içermeyen kümelerin kümesi kendini içerir mi? İçerirse içermez, içermezse içerir. Frege’nin sistemi çelişkilidir; kitabının ikinci cildine üzgün bir ek yazar.</p>' },
      { x: 8, y: 86, ad: "Girit vazosu", panel: '<h3>Yalancı paradoksu</h3><p>Giritli Epimenides “bütün Giritliler yalancıdır” der. Daha keskin biçimi Miletli Eubulides’indir: “Bu cümle yanlıştır.” Doğruysa yanlıştır, yanlışsa doğrudur.</p><p>Tarski (1933) buradan doğruluğun bir dilin içinde tanımlanamayacağını, ancak bir üst dilde tanımlanabileceğini çıkarır.</p>' },
      { x: 90, y: 62, ad: "Sonsuz ayna", panel: '<h3>Gödel’in eksiklik teoremleri (1931)</h3><p>25 yaşındaki <b>Kurt Gödel</b>, aritmetiği içeren tutarlı her biçimsel sistemde doğru ama sistem içinde kanıtlanamayan önermeler bulunduğunu gösterir. Üstelik böyle bir sistem kendi tutarlılığını kanıtlayamaz.</p><p>Hilbert’in bütün matematiği sağlam bir aksiyom sistemine oturtma programı bu sonuçla değişir. Gödel’in yöntemi, bir önermenin “kendinden söz etmesi”, yalancı paradoksunun kanıtlanabilirlik üzerine kurulmuş hâlidir.</p>' },
      { x: 50, y: 34, ad: "Revak", panel: '<h3>Stoacı önermeler mantığı</h3><p>Aristoteles terimlerle çalışırken Stoacılar, özellikle <b>Khrysippos</b> (MÖ 3. yy), bütün önermelerle çalışır: “Eğer gündüzse aydınlıktır; gündüzdür; öyleyse aydınlıktır.”</p><p>Beş “kanıtlanamaz” çıkarım biçimi (bugünkü <i>modus ponens</i>, <i>modus tollens</i>…) koşul önermesinin doğruluk koşulları üzerine tartışmalar: modern önermeler mantığının öncüsü.</p>' }
    ]
  });

  /* ════════ MATEMATİK: Göttingen'de bir kara tahta ════════ */
  S.kaydet("matematik", {
    ad: "Matematik", ust: "formel-bilimler", yer: "Göttingen · bir matematikçinin çalışma odası · 1900 · gece", vurgu: "#9FC8FF", alan: "formel-bilimler",
    alt: "Kara tahta formüllerle dolu, masada Babil’den kalma bir kil tablet ve bir abaküs; pencere önünde kendi içine dönen bir şerit.",
    parcacik: { tur: "harf", adet: 36, harfler: "∑∫∞πeiφ√∂∆λℵ0123456789", renk: "rgba(170,200,255," }, isaret: "yildiz",
    sozler: [
      { metin: "…questo grandissimo libro… è scritto in lingua matematica.", dil: "it", ceviri: "…bu çok büyük kitap (evren) matematik diliyle yazılmıştır.", kaynak: "Galileo, Altın Tartısı, 1623" },
      { metin: "Wir müssen wissen. Wir werden wissen.", dil: "de", ceviri: "Bilmeliyiz. Bileceğiz.", kaynak: "David Hilbert, Königsberg konuşması, 1930" },
      { metin: "Das Wesen der Mathematik liegt in ihrer Freiheit.", dil: "de", ceviri: "Matematiğin özü özgürlüğündedir.", kaynak: "Georg Cantor, 1883" }
    ],
    arka: function () {
      var s = K.duvar("mt", "#2a2430", "#100c14") + K.pencere(1390, 90, 150, 220, true);
      s += '<g transform="translate(640 300)"><rect width="700" height="390" fill="#1e2a24" stroke="#5a3a22" stroke-width="14"/>' +
        '<text x="40" y="70" font-family="Georgia,serif" font-size="38" fill="#e8e8d8">e<tspan font-size="24" dy="-16">iπ</tspan><tspan dy="16"> + 1 = 0</tspan></text>' +
        '<text x="40" y="150" font-family="Georgia,serif" font-size="28" fill="#e8e8d8" opacity=".9">∫ₐᵇ f(x) dx = F(b) − F(a)</text>' +
        '<text x="40" y="230" font-family="Georgia,serif" font-size="26" fill="#e8e8d8" opacity=".85">x = (−b ± √(b² − 4ac)) / 2a</text>' +
        '<text x="40" y="310" font-family="Georgia,serif" font-size="24" fill="#e8e8d8" opacity=".8">ζ(s) = Σ 1/nˢ  ·  ½ + it ?</text>' +
        '<text x="470" y="80" font-family="Georgia,serif" font-size="30" fill="#e8e8d8" opacity=".8">ℵ₀ &lt; 2^ℵ₀</text><text x="470" y="160" font-family="Georgia,serif" font-size="22" fill="#e8e8d8" opacity=".7">2, 3, 5, 7, 11, 13, …</text>' +
        '<text x="470" y="236" font-family="Georgia,serif" font-size="22" fill="#e8e8d8" opacity=".7">1, 1, 2, 3, 5, 8, 13…</text>' +
        '<path class="altin-spiral" d="M560 350A36 36 0 0 1 524 314A58 58 0 0 1 582 256A94 94 0 0 1 676 350" fill="none" stroke="#e8c870" stroke-width="3" pathLength="1"/></g>';
      s += K.zemin("mt", 720, "#2a2018", "#0c0908") + K.masa(560, 790, 940, "#5a3a24");
      /* kil tablet, abaküs, kâğıtlar, kitaplar, lamba, Möbius şeridi */
      s += '<g transform="translate(700 770) rotate(-8)"><ellipse rx="60" ry="46" fill="#b8905a"/><path d="M-50 0H50M0 -40V40M-36 -30L36 30M36 -30L-36 30" stroke="#8a6a3a" stroke-width="2"/></g>';
      s += '<g transform="translate(880 790)"><rect x="-90" y="-100" width="180" height="100" fill="none" stroke="#6a4428" stroke-width="10"/>' + [0, 1, 2, 3].map(function (r) { return '<path d="M-86 ' + (-80 + r * 22) + 'H86" stroke="#8a7a5a" stroke-width="2"/>' + [0, 1, 2, 3, 4].map(function (b) { return '<circle cx="' + (-70 + b * 16 + (r * 3 + b) % 2 * 40) + '" cy="' + (-80 + r * 22) + '" r="7" fill="' + (b % 2 ? "#a8302a" : "#d8b050") + '"/>'; }).join(""); }).join("") + "</g>";
      s += K.kagit(1010, 746, 110, 44, 5) + K.kitaplar(1190, 790, 4, 29);
      s += '<g transform="translate(1330 790)"><path d="M0 0V-110" stroke="#8a7a5a" stroke-width="4"/><path d="M-40 -110H40L28 -150H-28Z" fill="#3a6a4a"/><ellipse cy="-106" rx="60" ry="14" fill="#ffe8a0" opacity=".25" class="hale"/></g>';
      s += '<g transform="translate(1470 470)"><g class="don" style="--s:16s"><path d="M-70 0C-70 -40 -20 -40 0 0C20 40 70 40 70 0C70 -40 20 -40 0 0C-20 40 -70 40 -70 0Z" fill="none" stroke="#e8c870" stroke-width="14" opacity=".85"/><path d="M-70 0C-70 -40 -20 -40 0 0C20 40 70 40 70 0" fill="none" stroke="#fff4c8" stroke-width="3" opacity=".6"/></g></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 44, y: 84, ad: "Kil tablet", panel: '<h3>Babil’in 60 tabanı</h3><p>Mezopotamya’da MÖ 2. binyılda 60 tabanlı, basamak değerli bir sayı sistemi kullanılır; saatin 60 dakikası ve çemberin 360 derecesi bu mirastır. <b>YBC 7289</b> tabletinde bir karenin köşegeni ve √2 ≈ 1,41421296 yazılıdır: altı basamak doğru.</p><p><b>Plimpton 322</b> tableti Pisagor üçlülerinin bir listesini içerir; Pisagor’dan bin yıldan fazla önce.</p>' },
      { x: 55, y: 78, ad: "Abaküs", panel: '<h3>Sıfır ve Hint-Arap rakamları</h3><p>Hintli matematikçi <b>Brahmagupta</b> (628) sıfırı bir sayı olarak ele alır ve onunla işlem kuralları verir. Onlu, basamak değerli sistem Harezmî ile İslam dünyasına, <b>Fibonacci</b>’nin Liber Abaci’si (1202) ile Avrupa’ya ulaşır.</p><p>Abaküsçüler ile kalemle hesap yapan “algoritmacılar” arasındaki yarışmayı sonunda kâğıt kazanır. Fibonacci aynı kitapta tavşanların çoğalmasıyla ünlü dizisini de verir.</p>' },
      { x: 63, y: 57, ad: "Denklemin kökleri", panel: '<h3>Cebir: el-Cebr</h3><p>Bağdat’ta Beytülhikme’de çalışan <b>Harezmî</b>, 820 civarında el-Kitâbü’l-Muhtasar fî Hisâbi’l-Cebr ve’l-Mukâbele’yi yazar: “tamamlama ve dengeleme”. İkinci derece denklemleri sistemli olarak çözer; “cebir” (algebra) sözcüğü buradan gelir.</p><p>16. yüzyılda İtalyanlar üçüncü ve dördüncü dereceyi çözer; beşinci derecenin genel bir formülü olmadığını Abel ve Galois gösterir (1824, 1832).</p>' },
      { x: 62, y: 48, ad: "İntegral", panel: '<h3>Kalkülüs</h3><p><b>Newton</b> (1665–66) ve <b>Leibniz</b> (1675) birbirinden bağımsız olarak türev ve integrali, yani değişimin ve toplamanın matematiğini kurar. Kalkülüsün temel teoremi ikisinin birbirinin tersi olduğunu söyler.</p><p>Kimin önce bulduğu üzerine acı bir öncelik kavgası çıkar. Bugün Leibniz’in gösterimini (∫, dx) kullanıyoruz; kesin temelleri ise 19. yüzyılda Cauchy ve Weierstrass’ın limit tanımıyla atılır.</p>' },
      { x: 56, y: 39, ad: "Euler özdeşliği", panel: '<h3>eⁱᵖ + 1 = 0</h3><p><b>Leonhard Euler</b> (1707–1783) tarihin en üretken matematikçisidir; kör olduktan sonra da yazmayı sürdürür. e, i, π, 1 ve 0’ı tek bir eşitlikte buluşturan özdeşlik sık sık “en güzel denklem” seçilir.</p><p>Euler ayrıca Königsberg’in yedi köprüsü sorusunu (1736) çözerek çizge kuramını başlatır: her köprüden bir kez geçen bir yürüyüş yoktur.</p>' },
      { x: 76, y: 40, ad: "Sonsuzluklar", panel: '<h3>Cantor ve sonsuzluklar</h3><p><b>Georg Cantor</b> (1874, 1891) doğal sayıların sonsuzluğu ile gerçel sayıların sonsuzluğunun aynı büyüklükte olmadığını köşegen yöntemiyle gösterir: sonsuzluklar vardır ve bazıları daha büyüktür.</p><p>Hilbert’in oteli: dolu bir sonsuz otele yeni bir konuk, her konuğu bir oda kaydırarak yerleştirilir. Hilbert’e göre “Cantor’un bize açtığı cennetten kimse bizi kovamaz.”</p>' },
      { x: 80, y: 49, ad: "Asal sayılar", panel: '<h3>Hilbert’in 23 problemi</h3><p>1900’de Paris’teki Uluslararası Matematikçiler Kongresi’nde <b>David Hilbert</b>, yeni yüzyılın çözmesi gereken 23 problemi açıklar. Süreklilik hipotezi, aritmetiğin tutarlılığı, Riemann hipotezi bunlar arasındadır.</p><p><b>Riemann hipotezi</b> (1859): zeta fonksiyonunun bütün önemli sıfırları ½ doğrusu üzerinde mi? Cevabı asal sayıların dağılımının sırrını taşıyor; hâlâ çözülemedi.</p>' },
      { x: 92, y: 52, ad: "Möbius şeridi", panel: '<h3>Topoloji</h3><p>Bir kâğıt şeridi yarım bükerek uçlarını birleştirin: tek yüzü ve tek kenarı olan bir yüzey elde edersiniz (<b>Möbius</b>, 1858). Topoloji, esnetme ve bükmeyle değişmeyen özellikleri inceler: bir topoloğa göre kahve fincanı ile simit aynı şeydir.</p><p>Poincaré sanısı bir asır sonra 2003’te Grigori Perelman tarafından kanıtlandı; Perelman ödülleri reddetti.</p>' }
    ]
  });

  S.merkezeEkle("formel-bilimler", [
    { hedef: "bilisim", aciklama: "Bletchley Park: Turing, Enigma, Ada Lovelace ve algoritma.",
      sanat: K.kapi("#8FE0B0", [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) { return '<g class="don" style="--s:' + (2 + (r + c) % 3) + 's"><circle cx="' + (-40 + c * 40) + '" cy="' + (-30 + r * 36) + '" r="14" fill="' + ["#c83a3a", "#3a8ac8", "#c8a83a"][(r + c) % 3] + '"/><path d="M' + (-40 + c * 40) + " " + (-44 + r * 36) + "v8" + '" stroke="#fff" stroke-width="2"/></g>'; }).join(""); }).join(""), "#0c1410") },
    { hedef: "mantik", aciklama: "Zamanların revağı: Aristoteles, Boole, Frege, Gödel.",
      sanat: K.kapi("#C8B0FF", '<g fill="none" stroke="#C8B0FF" stroke-width="3"><circle cx="-18" cy="0" r="34"/><circle cx="18" cy="0" r="34"/><circle cy="-26" r="30" class="yuz" style="--s:3s"/></g><text y="60" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#e8dcff">∴</text>', "#120e1c") },
    { hedef: "matematik", aciklama: "Göttingen’de bir kara tahta: cebirden kalkülüse, sonsuzluklara.",
      sanat: K.kapi("#9FC8FF", '<rect x="-64" y="-50" width="128" height="80" fill="#1e2a24" stroke="#6a4a2a" stroke-width="4"/><text y="-14" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#e8e8d8">∫ eˣ dx</text><text y="14" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#e8e8d8">π ≈ 3,14</text><text y="60" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="#9FC8FF" class="yuz" style="--s:3s">∞</text>') }
  ]);
})();
