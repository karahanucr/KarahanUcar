/* Doğa Bilimleri odasının yeni kapıları: Ekoloji (yaz akşamı bir gölet), Tıp (Bergama Asklepieion'u), Mühendislik (Pont du Gard şantiyesi). */
(function () {
  var S = window.SAHNE; if (!S || !S.kit) return;
  var h = S.h, K = S.kit;

  /* ════════ EKOLOJİ: yaz akşamı bir gölet, ateş böcekleri ════════ */
  S.kaydet("ekoloji", {
    ad: "Ekoloji", ust: "doga-bilimleri", yer: "Bir gölet kıyısı · yaz akşamı", vurgu: "#A8D878", alan: "doga-bilimleri",
    alt: "Nilüferin üstünde bir kurbağa, sazların arasında bir balıkçıl, çürüyen kütükte mantarlar. Hepsi aynı ağın düğümleri.",
    parcacik: { tur: "atesbocegi", adet: 40 }, isaret: "yaprak", sozYer: "sag",
    sozler: [
      { metin: "When we try to pick out anything by itself, we find it hitched to everything else in the Universe.", dil: "en", ceviri: "Herhangi bir şeyi tek başına ayırmaya çalıştığımızda, onun evrendeki her şeye bağlı olduğunu görürüz.", kaynak: "John Muir, Sierra’da İlk Yazım, 1911" },
      { metin: "A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.", dil: "en", ceviri: "Bir şey, canlı topluluğun bütünlüğünü, dengesini ve güzelliğini korumaya yöneldiğinde doğrudur.", kaynak: "Aldo Leopold, Bir Kum İlçesi Almanağı, 1949" }
    ],
    arka: function () {
      var s = K.gokAksam("ek") + K.gunes(1040, 470, 32, "#ffc880");
      s += K.tepe(520, "#3a4a3a", 71, 60) + K.tepe(560, "#2a3a2a", 72, 40) + K.zemin("ek", 580, "#3a5030", "#141c10");
      /* gölet */
      s += '<ellipse cx="820" cy="720" rx="460" ry="120" fill="url(#ekSu)"/><ellipse cx="820" cy="720" rx="460" ry="120" fill="none" stroke="#4a6a3a" stroke-width="6"/>';
      s += '<ellipse class="halka-su" cx="700" cy="740" rx="30" ry="8" fill="none" stroke="#cfe8ff" stroke-width="1.5"/><ellipse class="halka-su s2" cx="980" cy="700" rx="30" ry="8" fill="none" stroke="#cfe8ff" stroke-width="1.5"/>';
      [[620, 700, 1], [760, 770, .8], [900, 740, 1.1], [1060, 690, .7]].forEach(function (p) { s += '<g transform="translate(' + p[0] + " " + p[1] + ") scale(" + p[2] + ')"><path d="M0 0L40 -6A40 16 0 1 1 36 8Z" fill="#4a8a3a"/><path d="M0 0L30 -3" stroke="#2a5a2a" stroke-width="2"/></g>'; });
      s += '<circle cx="945" cy="722" r="10" fill="#f0d0e8"/><circle cx="945" cy="722" r="4" fill="#f8e070"/>';
      /* kurbağa */
      s += '<g transform="translate(905 732)"><ellipse rx="22" ry="13" fill="#5a9a3a"/><circle cx="-12" cy="-10" r="6" fill="#6aaa4a"/><circle cx="10" cy="-10" r="6" fill="#6aaa4a"/><circle cx="-12" cy="-11" r="2.4" fill="#1a1a0c"/><circle cx="10" cy="-11" r="2.4" fill="#1a1a0c"/><path class="yuz" style="--s:1.2s" d="M-6 4Q0 10 6 4" stroke="#2a4a1a" stroke-width="2" fill="#cfe8a0"/></g>';
      /* balıkçıl */
      s += '<g transform="translate(1180 700)"><path d="M0 0V60M12 0V58" stroke="#8a8a90" stroke-width="3"/><ellipse cx="6" cy="-20" rx="30" ry="22" fill="#c8ccd4"/><path d="M28 -30C40 -60 30 -90 44 -100" stroke="#c8ccd4" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="46" cy="-102" r="8" fill="#d8dce4"/><path d="M52 -102L84 -96L52 -98Z" fill="#e8b040"/><circle cx="48" cy="-104" r="1.6" fill="#1a1a1a"/></g>';
      /* sazlar, meşe ve baykuş, kütük ve mantarlar, çiçekler ve arılar */
      for (var i = 0; i < 18; i++) { var x = 360 + i * 14 + (i % 3) * 4; s += '<path class="sallan" style="--a:2deg;--s:' + (3 + i % 4) + 's" d="M' + x + ' 740Q' + (x - 6) + " 660 " + (x + 4) + " " + (560 + (i * 29) % 70) + '" stroke="#3a5a2a" stroke-width="4" fill="none"/>'; }
      s += K.agac(180, 840, 1.5, "#3a5a2a", 81) + '<g transform="translate(200 470)"><ellipse rx="16" ry="20" fill="#6a5a40"/><circle cx="-6" cy="-6" r="5" fill="#ffd27a"/><circle cx="6" cy="-6" r="5" fill="#ffd27a"/><circle cx="-6" cy="-6" r="2" fill="#1a1a0c"/><circle cx="6" cy="-6" r="2" fill="#1a1a0c"/></g>';
      s += '<g transform="translate(560 850)"><rect x="-120" y="-30" width="240" height="44" rx="22" fill="#5a3a22"/><ellipse cx="120" cy="-8" rx="10" ry="22" fill="#8a6a4a"/>' + [-80, -40, 10, 50].map(function (x, i) { return '<path d="M' + x + ' -30v-' + (14 + i * 3) + '" stroke="#e8dcc0" stroke-width="5"/><ellipse cx="' + x + '" cy="-' + (44 + i * 3) + '" rx="' + (14 - i) + '" ry="7" fill="' + (i % 2 ? "#c8603a" : "#d8a060") + '"/>'; }).join("") + "</g>";
      s += '<g transform="translate(1380 830)">' + [0, 1, 2, 3, 4, 5].map(function (i) { var x = (i - 2.5) * 34; return '<path d="M' + x + ' 30V' + (-40 - i % 3 * 16) + '" stroke="#3a6a2a" stroke-width="3"/><circle cx="' + x + '" cy="' + (-46 - i % 3 * 16) + '" r="10" fill="' + ["#e070a0", "#f0c040", "#a080e0"][i % 3] + '"/>'; }).join("") +
        '<g class="don" style="--s:6s"><g transform="translate(40 -40)"><ellipse rx="6" ry="4" fill="#f0c020"/><path d="M-3 -2v4M1 -2v4" stroke="#2a1a0a" stroke-width="1.5"/><ellipse cy="-4" rx="4" ry="3" fill="rgba(255,255,255,.7)"/></g></g></g>';
      s += '<g transform="translate(1420 560)"><path d="M0 -30C-12 -40 -20 -20 -8 -14C-20 -8 -12 10 0 0" fill="none" stroke="#8a7a5a" stroke-width="3"/><ellipse cx="0" cy="0" rx="46" ry="16" fill="#6a5a3a"/><ellipse cx="0" cy="-4" rx="34" ry="10" fill="#3a2a1a"/>' + [-12, 0, 12].map(function (x) { return '<ellipse cx="' + x + '" cy="-8" rx="6" ry="5" fill="#8ab0d8"/>'; }).join("") + "</g>";
      return h.svg(s, '<radialGradient id="ekSu"><stop offset="0" stop-color="#6a7a8a"/><stop offset="1" stop-color="#1a2a3a"/></radialGradient>');
    },
    eserler: [
      { x: 57, y: 80, ad: "Kurbağa ve nilüfer", panel: '<h3>Besin ağı</h3><p>Güneş ışığını yakalayan bitkiler <b>üreticidir</b>; sinekler, kurbağalar, balıkçıllar <b>tüketicidir</b>; mantarlar ve bakteriler ölüleri çözen <b>ayrıştırıcılardır</b>. İlişkiler bir zincir değil, bir ağdır.</p><p>Charles Elton (Hayvan Ekolojisi, 1927) besin zincirleri ve piramitleri kavramlarını yerleştirir: üstteki her basamakta daha az birey vardır.</p>' },
      { x: 65, y: 52, ad: "Batan güneş", panel: '<h3>Enerji akışı</h3><p>Madde döngü içinde dolaşır; enerji ise tek yönlü akar ve her basamakta büyük bölümü ısı olarak kaybolur. Raymond Lindeman (1942) bir göl üzerinde bunu ölçer: bir basamaktan ötekine enerjinin yalnızca yaklaşık <b>onda biri</b> geçer.</p><p>Bu yüzden yüksek basamaktaki yırtıcılar az ve kırılgandır; aynı araziyle bitki yiyerek daha çok insan beslenebilir.</p>' },
      { x: 35, y: 90, ad: "Çürüyen kütük", panel: '<h3>Madde döngüleri</h3><p>Karbon havadan yaprağa, yapraktan hayvana, oradan toprağa ve yeniden havaya döner. Azot döngüsünde bakteriler havadaki azotu bitkilerin kullanabileceği biçime getirir.</p><p>Mantarlar ormanın gizli ağıdır: kökler arasında besin ve sinyal taşıyan <i>mikoriza</i> ağları (“wood wide web”).</p>' },
      { x: 76, y: 70, ad: "Balıkçıl", panel: '<h3>“Ökologie” (1866)</h3><p>Alman zoolog <b>Ernst Haeckel</b>, Yunanca <i>oikos</i> (ev) ve <i>logos</i> sözcüklerinden “ekoloji”yi türetir: canlıların birbirleriyle ve çevreleriyle ilişkilerinin bilimi, doğanın “ev ekonomisi”.</p><p>Her türün bir <b>nişi</b> vardır: yaşadığı yer ve ekosistemdeki “mesleği”. Balıkçıl sığ suyun kıyısında pusuya yatan yırtıcıdır.</p>' },
      { x: 12, y: 48, ad: "Meşe ve baykuş", panel: '<h3>Doğanın bütünlüğü</h3><p><b>Alexander von Humboldt</b> Güney Amerika yolculuğunda (1799–1804) iklimi, bitki kuşaklarını ve insan etkisini birlikte ölçer: doğa bir bütündür, “her şey karşılıklı etkileşim içindedir”.</p><p>İngiliz botanikçi Arthur Tansley 1935’te <b>ekosistem</b> terimini önerir: canlılar ve cansız çevre tek bir sistem olarak incelenmelidir.</p>' },
      { x: 86, y: 86, ad: "Çiçekler ve arı", panel: '<h3>Tozlaşma ve biyoçeşitlilik</h3><p>Çiçekli bitkilerin yaklaşık dörtte üçü hayvanlarla tozlaşır; arılar, kelebekler, yarasalar. Bu karşılıklı yararlı (<i>mutualist</i>) ilişki milyonlarca yıllık ortak evrimin ürünüdür.</p><p>Biyoçeşitlilik yalnızca tür sayısı değil, genlerin, türlerin ve ekosistemlerin çeşitliliğidir; çeşitli sistemler bozulmaya karşı daha dayanıklıdır.</p>' },
      { x: 89, y: 60, ad: "Sessiz yuva", panel: '<h3>Sessiz Bahar (1962)</h3><p>Deniz biyoloğu <b>Rachel Carson</b>, DDT gibi tarım ilaçlarının besin ağında birikerek kuşları öldürdüğünü anlatır: kuşların ötmediği bir bahar. Kitap modern çevre hareketini başlatır; DDT 1972’de ABD’de yasaklanır.</p><p>Bugünkü büyük sorunlar: iklim değişikliği, yaşam alanı kaybı ve türlerin hızlanan yok oluşu.</p>' }
    ]
  });

  /* ════════ TIP: Bergama Asklepieion'u ════════ */
  S.kaydet("tip", {
    ad: "Tıp", ust: "doga-bilimleri", yer: "Bergama · Asklepieion · MS 2. yüzyıl · şafak", vurgu: "#F0A8A0", alan: "doga-bilimleri",
    alt: "Kutsal kaynağın suyu şırıldıyor, uyku salonunda hastalar düş bekliyor. Genç Galenos gladyatörleri iyileştirmeyi burada öğrendi.",
    parcacik: { tur: "toz", adet: 40 }, isaret: "halka", sozYer: "sag",
    sozler: [
      { metin: "Ὁ βίος βραχύς, ἡ δὲ τέχνη μακρή.", dil: "grc", ceviri: "Hayat kısa, sanat uzun.", kaynak: "Hipokrat, Aforizmalar 1.1" },
      { metin: "Primum non nocere.", dil: "la", ceviri: "Önce zarar verme.", kaynak: "Hipokratik geleneğin Latince özdeyişi" }
    ],
    arka: function () {
      var s = K.gokAksam("tp") + K.gunes(360, 480, 34, "#ffd0a0");
      s += K.tepe(540, "#5a4a4a", 91, 80) + '<g fill="#6a5250"><rect x="1080" y="400" width="200" height="140"/><path d="M1060 400L1180 330L1300 400Z"/></g>' + K.tepe(600, "#4a4a38", 92, 40);
      s += K.zemin("tp", 620, "#9a8a6a", "#3a3020");
      s += K.tapinak(100, 720, 700, 200, "#e8dcc4");
      /* yuvarlak tapınak ve kutsal kaynak */
      s += '<g transform="translate(1100 720)"><rect x="-140" y="-130" width="280" height="130" fill="#d8ccb4"/><path d="M-160 -130A160 60 0 0 1 160 -130Z" fill="#c8b8a0"/>' + [-110, -55, 0, 55, 110].map(function (x) { return '<rect x="' + (x - 10) + '" y="-126" width="20" height="120" fill="#efe6d0"/>'; }).join("") + "</g>";
      s += '<g transform="translate(900 830)"><ellipse rx="120" ry="28" fill="#b8ac94"/><ellipse rx="104" ry="20" fill="#3a6a7a"/><ellipse class="halka-su" rx="30" ry="6" fill="none" stroke="#cfe8ff" stroke-width="1.5"/><ellipse class="halka-su s2" rx="30" ry="6" fill="none" stroke="#cfe8ff" stroke-width="1.5"/><path class="su" d="M-60 -60Q-40 -30 -30 -6" stroke="#bfe6ff" stroke-width="3" fill="none"/><rect x="-72" y="-80" width="24" height="30" fill="#d8ccb4"/></g>';
      /* yılanlı asa heykeli */
      s += '<g transform="translate(1400 840)"><rect x="-40" y="-40" width="80" height="40" fill="#b8ac94"/><path d="M0 -40V-300" stroke="#8a6a3a" stroke-width="10"/><path class="yuz" style="--s:4s" d="M0 -60C30 -80 -30 -110 0 -130C30 -150 -30 -180 0 -200C24 -214 10 -240 -4 -246" stroke="#4a8a4a" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="-6" cy="-248" r="7" fill="#4a8a4a"/></g>';
      /* hekim masası: tomar, havan, anatomi ve kalp çizimleri, şişe */
      s += K.masa(380, 780, 380, "#5a3a24");
      s += '<g transform="translate(430 766)"><rect x="-30" y="-14" width="60" height="14" rx="7" fill="#e8dcc0"/><rect x="-36" y="-18" width="10" height="22" rx="4" fill="#c8b890"/><rect x="26" y="-18" width="10" height="22" rx="4" fill="#c8b890"/></g>';
      s += '<g transform="translate(520 780)"><path d="M-22 -40H22L16 0H-16Z" fill="#8a7a6a"/><path d="M10 -36L40 -80" stroke="#6a5a4a" stroke-width="7" stroke-linecap="round"/></g>';
      s += '<g transform="translate(620 770) rotate(-4)"><rect x="-44" y="-60" width="88" height="60" fill="#efe2c2"/><path d="M0 -52v44M0 -44l-16 12M0 -44l16 12M0 -8l-12 6M0 -8l12 6M-8 -52h16" stroke="#8a3a2a" stroke-width="2" fill="none"/><circle cy="-54" r="5" fill="none" stroke="#8a3a2a" stroke-width="2"/></g>';
      s += '<g transform="translate(720 766)"><path d="M-10 -40h20v10l10 20v12h-40v-12l10 -20Z" fill="rgba(200,230,255,.5)" stroke="#8aa0b0" stroke-width="2"/><rect x="-18" y="-18" width="36" height="16" fill="#a8d0a0" opacity=".7"/></g>';
      s += '<g transform="translate(760 560) rotate(6)"><rect x="-50" y="-44" width="100" height="88" fill="#efe2c2"/><path d="M0 24C-40 0 -30 -30 -10 -28C0 -28 0 -20 0 -18C0 -20 0 -28 10 -28C30 -30 40 0 0 24Z" fill="none" stroke="#a8302a" stroke-width="3"/><path d="M-6 -28V-40M8 -28V-38" stroke="#3a5a9a" stroke-width="3"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 87, y: 70, ad: "Yılanlı asa", panel: '<h3>Asklepios ve asası</h3><p>Hekimlik tanrısı Asklepios’un tek yılanlı asası bugün de tıbbın simgesi. Bergama Asklepieion’u antik dünyanın ünlü şifa merkezlerinden biriydi: hastalar kutsal kaynakta yıkanır, tapınağın uyku salonunda (<i>enkoimesis</i>) tanrının düşte vereceği tedaviyi bekler.</p><p>Tedavi yalnız dinsel değildi: kaplıca, diyet, egzersiz, tiyatro ve kütüphane de şifanın parçasıydı.</p>' },
      { x: 56, y: 88, ad: "Kutsal kaynak", panel: '<h3>Hipokrat</h3><p>Koslu <b>Hipokrat</b> (MÖ 5. yy) ve okuluyla hastalık tanrıların cezası değil, doğal nedenleri olan bir süreç olarak görülür. Dört sıvı (kan, balgam, sarı ve kara safra) dengesi kuramı iki bin yıl yaşar.</p><p><b>Hipokrat yemini</b>: zarar vermemek, sırları saklamak, öldürücü ilaç vermemek. Bugün de tıp fakültesi mezuniyetlerinde yenilenmiş biçimleri okunur.</p>' },
      { x: 27, y: 83, ad: "Tomar", panel: '<h3>Bergamalı Galenos</h3><p>MS 129’da Bergama’da doğar, burada gladyatörlerin hekimliğini yapar; sonra Roma’da imparatorların hekimi olur. Yüzlerce eser yazar: nabız, anatomi, farmakoloji.</p><p>Sinirlerin beyinden çıktığını, atardamarların kan taşıdığını deneylerle gösterir. Yanılgıları da (insan anatomisini maymundan çıkarmak) 1400 yıl boyunca otorite olarak kalır.</p>' },
      { x: 33, y: 76, ad: "Havan", panel: '<h3>İbn Sînâ, El-Kânûn fi’t-Tıbb</h3><p>1025’te tamamlanan beş ciltlik <b>Kanun</b>, Arapça tıbbın özeti ve Avrupa üniversitelerinde 17. yüzyıla kadar okutulan ders kitabıdır. Bulaşıcı hastalıkların su ve toprakla yayıldığını, karantinanın gerekliliğini, ilaçların klinik denemesinin kurallarını yazar.</p><p>Aynı çağda Zehrâvî cerrahi aletleri çizer, İbnü’n-Nefîs (13. yy) küçük kan dolaşımını tarif eder.</p>' },
      { x: 39, y: 76, ad: "Anatomi çizimi", panel: '<h3>Vesalius (1543)</h3><p>Padova’da genç bir hoca olan <b>Andreas Vesalius</b> kadavraları kendisi keser ve Galenos’un 200’den fazla hatasını gösterir. <b>De humani corporis fabrica</b>, Tiziano atölyesinden sanatçıların çizdiği gravürlerle modern anatominin başlangıcıdır.</p><p>Aynı yıl Kopernik’in kitabı da çıkar: 1543 bilim devriminin simge yılıdır.</p>' },
      { x: 48, y: 62, ad: "Kalp çizimi", panel: '<h3>Harvey ve kan dolaşımı (1628)</h3><p><b>William Harvey</b> kalbin bir pompa olduğunu ve kanın vücutta tek bir devrede dolaştığını gösterir; basit bir hesapla: kalp bir saatte vücut ağırlığından fazla kan pompalar, bu kan sürekli yeniden üretilemez.</p><p>Kılcal damarlar onun göremediği halkadır; Malpighi 1661’de mikroskopla bulur.</p>' },
      { x: 45, y: 82, ad: "Şişe", panel: '<h3>Aşılar ve antibiyotikler</h3><ul><li><b>Jenner</b> (1796): inek çiçeği ile çiçek hastalığına karşı ilk aşı. Osmanlı’daki aşılama geleneğini Avrupa’ya Lady Montagu anlatmıştı (1717).</li><li><b>Pasteur</b> ve <b>Koch</b> (1860–1880): mikrop kuramı; kuduz aşısı, verem basili.</li><li><b>Fleming</b> (1928): unutulmuş bir petri kabındaki küf bakterileri öldürür: penisilin.</li></ul><p>1980’de çiçek hastalığı dünyadan silinir.</p>' }
    ]
  });

  /* ════════ MÜHENDİSLİK: Pont du Gard şantiyesi ════════ */
  S.kaydet("muhendislik", {
    ad: "Mühendislik", ust: "doga-bilimleri", yer: "Pont du Gard · su kemeri şantiyesi · MS 1. yüzyıl", vurgu: "#E8C070", alan: "doga-bilimleri",
    alt: "Dev çarklı vinç taşları kaldırıyor, iskelenin üstünde son kemer örülüyor. Suyu 50 kilometre öteden şehre taşımak: bilgi, taş ve sabır.",
    parcacik: { tur: "toz", adet: 40 }, isaret: "kristal", sozYer: "sag",
    sozler: [
      { metin: "Δός μοι πᾶ στῶ καὶ τὰν γᾶν κινάσω.", dil: "grc", ceviri: "Bana duracak bir yer ver, Dünya’yı yerinden oynatayım.", kaynak: "Arşimet (Pappos’un aktarımı)" },
      { metin: "Firmitas, utilitas, venustas.", dil: "la", ceviri: "Sağlamlık, kullanışlılık, güzellik.", kaynak: "Vitruvius, Mimarlık Üzerine I.3" },
      { metin: "Tot aquarum tam multis necessariis molibus pyramidas videlicet otiosas compares…", dil: "la", ceviri: "Bunca gerekli su yapısının yanına işe yaramaz piramitleri koy bakalım…", kaynak: "Frontinus, Su Yolları Üzerine I.16" }
    ],
    arka: function () {
      var s = K.gokGun("mh");
      s += K.tepe(500, "#8a9a6a", 101, 90) + K.tepe(540, "#6a7a4a", 102, 60);
      /* nehir */
      s += '<path d="M0 720Q400 690 800 720T1600 700V780H0Z" fill="#4a7a8a"/>';
      for (var w = 0; w < 3; w++) s += '<path class="dalga-x" style="--d:-' + w + 's" d="M-160 ' + (730 + w * 14) + 'q40 -4 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>';
      /* üç katlı su kemeri; sağ uç yapım hâlinde */
      var kemer = function (x0, y, w, hh, n, renk) { var r = ""; for (var i = 0; i < n; i++) { var x = x0 + i * w; r += '<path d="M' + x + " " + y + "V" + (y - hh) + "H" + (x + w) + "V" + y + "H" + (x + w - 10) + "V" + (y - hh + w / 2) + "A" + (w / 2 - 10) + " " + (w / 2 - 10) + " 0 0 0 " + (x + 10) + " " + (y - hh + w / 2) + "V" + y + 'Z" fill="' + renk + '"/>'; } return r; };
      s += kemer(100, 720, 160, 200, 7, "#d8c098") + kemer(100, 520, 160, 150, 7, "#d0b890") + kemer(100, 370, 54, 60, 21, "#c8b088");
      s += '<rect x="100" y="302" width="1134" height="10" fill="#b8a078"/>';
      /* iskele ve yarım kemer */
      s += '<g stroke="#8a6a3a" stroke-width="5" fill="none"><path d="M1240 720V300M1320 720V300M1400 720V360M1240 520H1400M1240 400H1400M1240 620H1400M1240 720L1320 620L1400 720M1240 520L1320 400L1400 520"/></g><path d="M1240 520A80 80 0 0 1 1400 520" fill="none" stroke="#d8c098" stroke-width="22" stroke-dasharray="30 8"/>';
      /* çarklı vinç */
      s += '<g transform="translate(1480 640)"><path d="M-40 80L0 -260L40 80" stroke="#6a4a2a" stroke-width="10" fill="none"/><path d="M0 -260L-120 -200" stroke="#6a4a2a" stroke-width="8"/><path d="M-120 -200V-100" stroke="#8a7a5a" stroke-width="2"/><rect x="-140" y="-100" width="40" height="30" fill="#d0b890"/>' +
        '<g class="don" style="--s:14s"><circle r="70" fill="none" stroke="#7a5a32" stroke-width="10"/>' + [0, 30, 60, 90, 120, 150].map(function (a) { return '<path d="M0 0L' + (70 * Math.cos(a * Math.PI / 180)).toFixed(0) + " " + (70 * Math.sin(a * Math.PI / 180)).toFixed(0) + "M0 0L" + (-70 * Math.cos(a * Math.PI / 180)).toFixed(0) + " " + (-70 * Math.sin(a * Math.PI / 180)).toFixed(0) + '" stroke="#7a5a32" stroke-width="4"/>'; }).join("") + "</g></g>";
      s += K.zemin("mh", 780, "#9a8a5a", "#4a3a22");
      /* Arşimet burgusu, taş blokları, çizim masası (kubbe, buhar makinesi, çelik kule) */
      s += '<g transform="translate(260 800) rotate(-24)"><rect x="-10" y="-14" width="220" height="28" rx="14" fill="#8a6a3a"/><g class="dalga-x" style="--d:0s">' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<path d="M' + (i * 30) + ' -14L' + (i * 30 + 16) + ' 14" stroke="#5a3a1a" stroke-width="4"/>'; }).join("") + "</g></g>";
      s += '<g fill="#d0b890" stroke="#a88a60" stroke-width="2"><rect x="560" y="820" width="90" height="50"/><rect x="600" y="780" width="80" height="40"/><rect x="660" y="830" width="70" height="40"/></g>';
      s += K.masa(860, 800, 460, "#6a4a2a") + '<g transform="translate(960 780) rotate(-3)"><rect x="-70" y="-50" width="140" height="56" fill="#e8e0c8"/><path d="M-50 0A50 44 0 0 1 50 0M-50 0H50M-26 -40V-48M0 -44V-54" stroke="#3a4a6a" stroke-width="2" fill="none"/></g>' +
        '<g transform="translate(1100 790)"><rect x="-40" y="-40" width="50" height="40" fill="#5a5a60"/><circle cx="-15" cy="-50" r="12" fill="none" stroke="#5a5a60" stroke-width="4"/><rect x="10" y="-80" width="10" height="50" fill="#4a4a50"/><path class="yuz" style="--s:2s" d="M15 -86c-6 -8 6 -14 0 -22" stroke="#e8e8f0" stroke-width="3" fill="none" opacity=".6"/></g>' +
        '<g transform="translate(1240 794)"><path d="M-24 0L0 -96L24 0M-18 -24H18M-12 -50H12M-6 -74H6" stroke="#6a6a7a" stroke-width="3" fill="none"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 40, y: 44, ad: "Kemerler", panel: '<h3>Kemer ve Roma su yolları</h3><p>Kemer, taşın çekmeye değil sıkışmaya dayanıklı olmasından yararlanır: yük, kilit taşından yanlara ve aşağıya basınç olarak aktarılır. Kalıp (iskele) sökülünce kemer kendi kendini taşır.</p><p><b>Pont du Gard</b> 49 metre yüksekliğindeki üç katlı kemerleriyle Nîmes’e su taşıyan 50 km’lik su yolunun parçasıdır; toplam eğim yalnızca 12,6 metredir, yani kilometrede ortalama 25 cm. Roma’ya günde bir milyon metreküpten fazla su gelirdi.</p>' },
      { x: 90, y: 64, ad: "Çarklı vinç", panel: '<h3>Basit makineler</h3><p>Kaldıraç, makara, eğik düzlem, vida, çark: kuvvet azalırken yol uzar, iş aynı kalır. Romalıların <i>polyspastos</i> vinci içinde yürüyen işçilerin döndürdüğü dev bir çarkla birkaç tonluk taşı kaldırabiliyordu.</p><p>Arşimet makara sistemleriyle tek başına bir gemiyi karaya çektiği anlatılır; kaldıraç yasasını ilk kez matematikle ifade eden odur.</p>' },
      { x: 20, y: 86, ad: "Arşimet burgusu", panel: '<h3>Arşimet burgusu</h3><p>Eğik bir boru içinde dönen sarmal: her dönüşte bir miktar suyu yukarı taşır. Mısır’da tarlaları sulamak ve gemilerin ambarını boşaltmak için kullanıldı; bugün de atık su tesislerinde ve balık geçitlerinde çalışıyor.</p>' },
      { x: 60, y: 80, ad: "Kubbe çizimi", panel: '<h3>Kubbeler: Brunelleschi ve Sinan</h3><p><b>Brunelleschi</b> Floransa Katedrali’nin kubbesini (1420–1436) iskelesiz, iç içe iki kabuk ve balıksırtı tuğla örgüsüyle kurar.</p><p><b>Mimar Sinan</b> (1490–1588) 300’den fazla yapıda kubbenin yükünü yarım kubbeler ve payelerle dağıtmayı kusursuzlaştırır. Selimiye’nin (1575) 31 metrelik kubbesi, “ustalık eserim” dediği yapıdır.</p>' },
      { x: 69, y: 80, ad: "Buhar makinesi", panel: '<h3>Buhar ve Sanayi Devrimi</h3><p>Newcomen’in maden pompası (1712) çok yakıt harcıyordu; <b>James Watt</b> ayrı yoğuşturucuyu (1769) ekleyerek verimi dörde katlar. Buhar gücü fabrikaları, lokomotifleri ve gemileri hareket ettirir.</p><p>Isı makinelerinin sınırını anlamaya çalışan Carnot’nun sorusu (1824) termodinamiği doğurur: mühendislik fiziği besler.</p>' },
      { x: 78, y: 78, ad: "Çelik kule", panel: '<h3>Çelik, köprüler ve etik</h3><p><b>Eyfel Kulesi</b> (1889) 18.000 demir parça ve 2,5 milyon perçinle iki yılda kurulur; <b>Brooklyn Köprüsü</b> (1883) çelik halatlı ilk büyük asma köprüdür.</p><p>Mühendislik aynı zamanda bir sorumluluktur: Tacoma Narrows Köprüsü’nün rüzgârda çöküşü (1940) ve Challenger faciası (1986) mühendislik etiğinin ders kitabı örnekleridir.</p>' },
      { x: 83, y: 38, ad: "İskele", panel: '<h3>Vitruvius ve mühendisin bilgisi</h3><p>Augustus döneminin mimar-mühendisi <b>Vitruvius</b>, <b>Mimarlık Üzerine On Kitap</b>’ta iyi bir yapının üç niteliğini sayar: sağlamlık, kullanışlılık, güzellik.</p><p>Mühendisin bilmesi gerekenler: geometri, optik, aritmetik, tarih, müzik (makinelerin gerginliği için), tıp (sağlıklı yer seçimi için) ve hukuk. Rönesans’ta yeniden keşfedilen kitap Leonardo’nun Vitruvius adamına da ilham verir.</p>' }
    ]
  });

  S.merkezeEkle("doga-bilimleri", [
    { hedef: "ekoloji", aciklama: "Yaz akşamı bir gölet: besin ağı, döngüler, Sessiz Bahar.",
      sanat: K.kapi("#A8D878", '<ellipse cy="30" rx="60" ry="16" fill="#2a4a5a"/><path d="M-30 30L0 26A30 10 0 1 1 -4 36Z" fill="#4a8a3a"/><g transform="translate(-10 20)"><ellipse rx="12" ry="7" fill="#5a9a3a"/><circle cx="-6" cy="-6" r="3" fill="#6aaa4a"/><circle cx="6" cy="-6" r="3" fill="#6aaa4a"/></g><circle cx="20" cy="-30" r="3" fill="#e8ff80" class="hale"/><circle cx="-26" cy="-50" r="2.5" fill="#e8ff80" class="hale" style="animation-delay:-1s"/>', "#0e1a10") },
    { hedef: "tip", aciklama: "Bergama Asklepieion’u: Hipokrat, Galenos, İbn Sînâ, Harvey.",
      sanat: K.kapi("#F0A8A0", '<path d="M0 60V-70" stroke="#c8a060" stroke-width="6"/><path class="yuz" style="--s:4s" d="M0 40C24 26 -24 6 0 -10C24 -26 -24 -46 0 -60" stroke="#6aaa5a" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="-3" cy="-62" r="5" fill="#6aaa5a"/>') },
    { hedef: "muhendislik", aciklama: "Pont du Gard şantiyesi: kemerler, vinçler, kubbeler, buhar.",
      sanat: K.kapi("#E8C070", '<path d="M-70 50V10H-30V50H-38V30A12 12 0 0 0 -62 30V50ZM-30 50V10H10V50H2V30A12 12 0 0 0 -22 30V50ZM10 50V10H50V50H42V30A12 12 0 0 0 18 30V50Z" fill="#d8c098"/><g class="don" style="--s:8s" transform="translate(50 -40)"><circle r="26" fill="none" stroke="#a8804a" stroke-width="5"/><path d="M-26 0H26M0 -26V26M-18 -18L18 18M18 -18L-18 18" stroke="#a8804a" stroke-width="3"/></g>') }
  ]);
})();
