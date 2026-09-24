/* Diller odasının yeni kapıları: Almanca (Gutenberg'in atölyesi), Fransızca (bir Paris salonu), İngilizce (Globe Tiyatrosu). */
(function () {
  var S = window.SAHNE; if (!S || !S.kit) return;
  var h = S.h, K = S.kit;

  /* ════════ ALMANCA: Mainz, Gutenberg'in atölyesi ════════ */
  S.kaydet("almanca", {
    ad: "Almanca", ust: "diller", yer: "Mainz · Gutenberg’in atölyesi · 1455", vurgu: "#E8C070", alan: "diller",
    alt: "Ahşap pres gıcırdıyor, kurşun harfler kasalarda, yeni basılmış sayfalar ipte kuruyor. Almancanın ortak yazı dili burada doğmaya başlıyor.",
    parcacik: { tur: "harf", adet: 40, harfler: "ABCDEFGHÄÖÜßabcdefgäöü", renk: "rgba(232,200,130," }, isaret: "halka",
    sozler: [
      { metin: "Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.", dil: "de", ceviri: "Dilimin sınırları dünyamın sınırları demektir.", kaynak: "Wittgenstein, Tractatus 5.6, 1921" },
      { metin: "Wer fremde Sprachen nicht kennt, weiß nichts von seiner eigenen.", dil: "de", ceviri: "Yabancı dil bilmeyen kendi dilinden de bir şey bilmez.", kaynak: "Goethe, Maximen und Reflexionen" },
      { metin: "…man muss die Mutter im Hause… drum fragen und denselbigen auf das Maul sehen.", dil: "de", ceviri: "…evdeki anneye sormalı ve onların ağzına bakmalı.", kaynak: "Luther, Çeviri Üzerine Mektup, 1530" }
    ],
    arka: function () {
      var s = K.duvar("al", "#3a2a1c", "#140e0a") + K.pencere(1180, 120, 220, 330, true);
      s += K.raf(40, 140, 300, 420, 13, 5);
      /* harf kasaları */
      s += '<g transform="translate(390 200)"><rect width="260" height="200" fill="#4a3220" stroke="#2a1a10" stroke-width="6"/>';
      for (var yy = 0; yy < 5; yy++) for (var xx = 0; xx < 8; xx++) s += '<rect x="' + (8 + xx * 31) + '" y="' + (8 + yy * 38) + '" width="28" height="34" fill="#2a1a10"/><text x="' + (22 + xx * 31) + '" y="' + (31 + yy * 38) + '" font-size="15" text-anchor="middle" fill="#c8a860" font-family="Georgia,serif">' + "ABCDEFGHIKLMNOPQRSTUVWXYZÄÖÜßÆ&.,;:!?"[(yy * 8 + xx) % 38] + "</text>";
      s += "</g>";
      /* ip üstünde kuruyan sayfalar */
      s += '<path d="M660 120Q900 170 1140 120" stroke="#8a7a5a" stroke-width="2" fill="none"/>' + [700, 790, 880, 970, 1060].map(function (x, i) { return '<g class="asili" style="--s:' + (4 + i * 0.4) + 's;--a:3deg"><rect x="' + (x - 34) + '" y="' + (136 + Math.sin(i) * 6) + '" width="68" height="92" fill="#efe2c2"/><rect x="' + (x - 26) + '" y="' + (146 + Math.sin(i) * 6) + '" width="24" height="70" fill="none" stroke="#6a5a4a" stroke-width="1" opacity=".5"/><rect x="' + (x + 2) + '" y="' + (146 + Math.sin(i) * 6) + '" width="24" height="70" fill="none" stroke="#6a5a4a" stroke-width="1" opacity=".5"/><rect x="' + (x - 26) + '" y="' + (146 + Math.sin(i) * 6) + '" width="10" height="10" fill="#a8302a"/></g>'; }).join("");
      /* baskı presi */
      s += '<g transform="translate(560 860)"><rect x="-150" y="-470" width="30" height="470" fill="#5a3a22"/><rect x="120" y="-470" width="30" height="470" fill="#5a3a22"/><rect x="-170" y="-490" width="340" height="40" fill="#6a4428"/><rect x="-170" y="-300" width="340" height="30" fill="#6a4428"/>' +
        '<rect x="-14" y="-450" width="28" height="160" fill="#8a6a3a"/><path d="M-14 -440L14 -430M-14 -420L14 -410M-14 -400L14 -390M-14 -380L14 -370M-14 -360L14 -350" stroke="#4a3220" stroke-width="3"/>' +
        '<g class="sallan" style="--a:14deg;--s:3s"><rect x="-10" y="-395" width="150" height="12" rx="6" fill="#4a3220"/></g><rect x="-110" y="-270" width="220" height="30" fill="#7a5a3a"/><rect x="-180" y="-150" width="360" height="24" fill="#6a4428"/><rect x="-120" y="-176" width="240" height="26" fill="#2a1a10"/></g>';
      s += K.zemin("al", 820, "#2a1c12", "#0e0906");
      /* kürsüde açık İncil, masada defter ve mum */
      s += '<g transform="translate(1000 820)"><path d="M-30 0L-12 -170H12L30 0Z" fill="#4a2e1a"/><path d="M-80 -178L80 -168L70 -146L-70 -156Z" fill="#6a4a2a"/><path d="M-74 -180C-40 -196 -6 -190 0 -178C6 -190 40 -196 74 -180V-162C40 -176 6 -170 0 -160C-6 -170 -40 -176 -74 -162Z" fill="#efe2c2"/><path d="M-60 -178h24M-60 -172h30M8 -176h28M8 -170h40" stroke="#6a2a1a" stroke-width="2"/></g>';
      s += K.masa(1220, 700, 300) + K.kagit(1260, 660, 100, 40, -4) + K.mum(1470, 700, .9) + K.kitaplar(1400, 700, 3, 21);
      return h.svg(s);
    },
    eserler: [
      { x: 35, y: 58, ad: "Baskı presi", panel: '<h3>Gutenberg ve matbaa</h3><p>Mainzlı kuyumcu <b>Johannes Gutenberg</b> 1450 civarında dökme metal harfleri, yağlı mürekkebi ve şarap presinden uyarlanmış bir baskı makinesini birleştirir. 1455’te 42 satırlı İncil basılır; yaklaşık 180 nüshadan 49’u bugüne ulaştı.</p><p>Elli yıl içinde Avrupa’da 20 milyon kitap basılır. Yazılı dil standartlaşır: aynı kitap artık her yerde aynıdır.</p>' },
      { x: 55, y: 20, ad: "Kuruyan sayfalar", panel: '<h3>Luther İncili ve ortak Almanca</h3><p><b>Martin Luther</b> Yeni Ahit’i 1522’de Wartburg Kalesi’nde on bir haftada çevirir; tam İncil 1534’te çıkar. Saksonya saray dilini temel alır ama “halkın ağzına bakarak” yazar.</p><p>Matbaanın gücüyle yayılan bu çeviri, lehçelere bölünmüş Almanca konuşanlara ortak bir yazı dili (<i>Hochdeutsch</i>) kazandırır. <i>Lückenbüßer, Lästermaul, Denkzettel</i> gibi sözcükler Luther’le yaygınlaşır.</p>' },
      { x: 32, y: 32, ad: "Harf kasası", panel: '<h3>Almancanın sesleri ve harfleri</h3><ul><li><b>ä, ö, ü</b> (Umlaut): ünlülerin inceleşmiş hâli; eskiden üstüne küçük bir <i>e</i> yazılırdı.</li><li><b>ß</b> (Eszett): uzun ünlüden sonra “ss”; İsviçre’de kullanılmaz. 2017’den beri büyük harfi de var: ẞ.</li><li>Bütün adlar büyük harfle başlar: <i>der Hund, die Freiheit</i>.</li><li>Sözcük sonundaki b, d, g sertleşir: <i>Tag</i> “tak” diye okunur.</li></ul>' },
      { x: 12, y: 42, ad: "Sözlük rafı", panel: '<h3>Grimm Kardeşler</h3><p>Masallarıyla tanınan Jacob ve Wilhelm Grimm aslında dilbilimcidir. 1838’de <b>Deutsches Wörterbuch</b>’a başlarlar; sözlük ancak 1961’de 33 ciltle tamamlanır.</p><p><b>Grimm yasası</b> (1822): Cermen dillerinde ünsüzler düzenli biçimde kaymıştır. Latince <i>pater</i> → İngilizce <i>father</i>, Almanca <i>Vater</i>; <i>tres</i> → <i>three, drei</i>. Karşılaştırmalı dilbilimin temel taşlarından.</p>' },
      { x: 81, y: 30, ad: "Pencere", panel: '<h3>Weimar klasikleri</h3><p>18. yüzyılın sonunda küçük Weimar kenti Almanca edebiyatın merkezi olur: <b>Goethe</b> (Genç Werther’in Acıları, Faust) ve <b>Schiller</b> (Haydutlar, Neşeye Övgü) dostluk ve rekabet içinde yazar.</p><p class="pn-soz">«Zwei Seelen wohnen, ach! in meiner Brust.» <small>Ah, iki ruh yaşıyor göğsümde! — Goethe, Faust I</small></p>' },
      { x: 86, y: 74, ad: "Masadaki defter", panel: '<h3>Felsefenin Almancası</h3><p>Kant, Hegel, Marx, Nietzsche, Husserl, Heidegger: modern felsefenin büyük bölümü Almanca yazılır ve bu dil bileşik sözcüklerle yeni kavramlar kurmaya çok elverişlidir.</p><ul><li><i>Weltanschauung</i> — dünya görüşü</li><li><i>Zeitgeist</i> — çağın ruhu</li><li><i>Aufhebung</i> — aşma, hem kaldırma hem saklama</li><li><i>Dasein</i> — orada-olmak, Heidegger’de insan varoluşu</li></ul>' },
      { x: 62, y: 70, ad: "Açık İncil", panel: '<h3>Der, die, das: dilbilgisi</h3><p>Almancada üç cins (eril <i>der</i>, dişil <i>die</i>, yansız <i>das</i>) ve dört hâl vardır: yalın, belirtme, yönelme, tamlayan. Tanımlık hem cinse hem hâle göre değişir: <i>der Mann, den Mann, dem Mann, des Mannes</i>.</p><p>Bileşik sözcükler sınırsız uzayabilir: <i>Donaudampfschifffahrtsgesellschaft</i> (Tuna Buharlı Gemi İşletmesi). Fiil çoğu zaman cümlenin sonuna gider; Mark Twain bundan şikâyet eden eğlenceli bir deneme yazmıştır (1880).</p>' }
    ]
  });

  /* ════════ FRANSIZCA: Aydınlanma çağında bir Paris salonu ════════ */
  S.kaydet("fransizca", {
    ad: "Fransızca", ust: "diller", yer: "Paris · bir edebiyat salonu · 1750’ler · gece", vurgu: "#B8C8F0", alan: "diller",
    alt: "Avizede mumlar yanıyor, masada Ansiklopedi’nin yeni cildi, pencereden Seine ve Notre-Dame. Konuşmanın sanata dönüştüğü bir salon.",
    parcacik: { tur: "toz", adet: 60 }, isaret: "kristal", sozYer: "sag",
    sozler: [
      { metin: "Je pense, donc je suis.", dil: "fr", ceviri: "Düşünüyorum, öyleyse varım.", kaynak: "Descartes, Yöntem Üzerine Konuşma IV, 1637" },
      { metin: "Ce qui n’est pas clair n’est pas français.", dil: "fr", ceviri: "Açık olmayan Fransızca değildir.", kaynak: "Rivarol, Fransız Dilinin Evrenselliği Üzerine, 1784" },
      { metin: "Il faut cultiver notre jardin.", dil: "fr", ceviri: "Bahçemizi işlemeliyiz.", kaynak: "Voltaire, Candide, 1759" }
    ],
    arka: function () {
      var s = K.duvar("fr", "#3a3448", "#141220");
      for (var x = 60; x < 1600; x += 320) s += '<rect x="' + x + '" y="160" width="220" height="520" fill="none" stroke="#c8b070" stroke-width="3" opacity=".35"/>';
      /* büyük pencere: Seine ve Notre-Dame */
      s += '<g><path d="M960 700V260A170 170 0 0 1 1300 260V700Z" fill="#0e1830"/>' + h.yildizlar(20, 77, 970, 110, 1290, 400) + '<path d="M1010 600V480H1060V440L1085 400L1110 440V480H1170V440L1195 400L1220 440V600Z" fill="#1e2438"/><circle cx="1115" cy="530" r="18" fill="#2e3450"/>' +
        '<rect x="960" y="600" width="340" height="100" fill="#1a2a48"/><path class="dalga-x" d="M800 630q40 -4 80 0t80 0t80 0t80 0t80 0t80 0" stroke="#e8c070" stroke-width="2" opacity=".35" fill="none"/>' +
        '<path d="M960 700V260A170 170 0 0 1 1300 260V700" fill="none" stroke="#e8dcc0" stroke-width="16"/><path d="M1130 90V700M960 450H1300" stroke="#e8dcc0" stroke-width="8"/></g>';
      /* avize */
      s += '<g class="asili" style="--a:1.2deg;--s:7s"><path d="M560 0V120" stroke="#c8a040" stroke-width="3"/><ellipse cx="560" cy="150" rx="110" ry="20" fill="none" stroke="#c8a040" stroke-width="5"/>' + [-100, -50, 0, 50, 100].map(function (dx) { return '<rect x="' + (556 + dx) + '" y="130" width="8" height="20" fill="#efe2c2"/>' + h.alev(560 + dx, 130, .15, dx / 100); }).join("") + '<path d="M500 170L560 230L620 170" stroke="#c8a040" stroke-width="2" fill="none" opacity=".6"/></g>';
      s += '<g transform="translate(260 300)"><rect x="-80" y="-60" width="160" height="120" fill="#efe2c2" stroke="#8a6a2a" stroke-width="8"/>' + [-40, -24, -8, 8, 24].map(function (y) { return '<path d="M-60 ' + y + 'H' + (40 + (y % 3) * 6) + '" stroke="#6a4a24" stroke-width="2" opacity=".6"/>'; }).join("") + '<circle cx="50" cy="40" r="12" fill="#a8302a"/></g>';
      s += K.zemin("fr", 760, "#3a2a24", "#120c0a");
      s += K.masa(380, 720, 460, "#5a3a24") + '<g>' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<rect x="' + (440 + i * 26) + '" y="620" width="22" height="100" fill="' + ["#3a4a6a", "#5a2a2a", "#3a4a6a", "#5a2a2a", "#3a4a6a", "#5a2a2a", "#3a4a6a"][i] + '"/><path d="M' + (442 + i * 26) + ' 640h18M' + (442 + i * 26) + ' 700h18" stroke="#d9b25e" stroke-width="2"/>'; }).join("") + "</g>" + K.kagit(660, 686, 90, 34, 6) + K.mum(800, 720, .9);
      s += '<g transform="translate(1420 760)"><path d="M0 0V-80" stroke="#6a4a2a" stroke-width="6"/><circle cy="-120" r="40" fill="#3a5a8a"/><g class="don" style="--s:40s"><path d="M-28 -136C-8 -126 8 -146 28 -128M-32 -104C-4 -96 12 -112 34 -102" stroke="#c8b888" stroke-width="5" fill="none"/></g><ellipse cy="-120" rx="46" ry="9" fill="none" stroke="#c8a040" stroke-width="3"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 16, y: 33, ad: "Çerçeveli belge", panel: '<h3>Strazburg Andları (842)</h3><p>Şarlman’ın torunları Dazlak Karl ve Alman Ludwig, kardeşlerine karşı ittifak yemini ederken metnin bir bölümünü askerlerin anlayacağı dilde okutur: Roman dili ve eski Almanca.</p><p class="pn-soz">«Pro Deo amur et pro christian poblo et nostro commun salvament…» <small>Fransızcanın bilinen en eski yazılı metni</small></p><p>Halk Latincesi artık ayrı bir dil olmuştur: Eski Fransızca.</p>' },
      { x: 70, y: 40, ad: "Kubbe ve katedral", panel: '<h3>Académie française</h3><p>Kardinal Richelieu 1635’te kırk üyeli akademiyi kurar: görevi dili “arı, anlaşılır ve belagatli” kılmak. Üyelere <i>les Immortels</i> (Ölümsüzler) denir; kılıç ve yeşil işlemeli giysi taşırlar.</p><p>Sözlüğünün dokuzuncu baskısı 1935’te başlar, 2024’te biter. Akademi bugün de İngilizce sözcüklere Fransızca karşılıklar önerir: <i>courriel</i> (e-posta), <i>ordinateur</i> (bilgisayar).</p>' },
      { x: 43, y: 74, ad: "Yöntem Üzerine", panel: '<h3>Descartes Fransızca yazıyor</h3><p><b>Discours de la méthode</b> (1637), felsefenin Latince değil halkın dilinde yazılmış ilk büyük eserlerinden biridir: Descartes “yalnızca sağduyularını kullananların” da okumasını ister.</p><p>Dört kural: apaçık olmayanı kabul etme; sorunları parçalara böl; basitten karmaşığa git; hiçbir şeyi atlamadığından emin ol.</p>' },
      { x: 32, y: 68, ad: "Ansiklopedi", panel: '<h3>L’Encyclopédie (1751–1772)</h3><p><b>Diderot</b> ve <b>d’Alembert</b>’in yönettiği 28 ciltlik, 72.000 maddelik dev eser: “bilimlerin, sanatların ve zanaatların akla dayalı sözlüğü”. Voltaire, Rousseau, Montesquieu yazar; zanaatların resimleri ilk kez bu kadar ayrıntılı basılır.</p><p>Kilise ve devlet birkaç kez yasaklar; eser Aydınlanma’nın simgesi olur.</p>' },
      { x: 35, y: 17, ad: "Avize", panel: '<h3>Salonlar ve konuşma sanatı</h3><p>Madame Geoffrin, Madame du Deffand ve Julie de Lespinasse’ın salonlarında filozoflar, bilim insanları ve sanatçılar buluşur. Açıklık, incelik ve nükte (<i>esprit</i>) Fransız düzyazısının ölçüsü olur.</p><p>18. yüzyılda Fransızca Avrupa’nın diplomasi ve kültür dilidir: Rusya’dan Prusya’ya saraylar Fransızca konuşur.</p>' },
      { x: 50, y: 82, ad: "Mektup", panel: '<h3>Aksanlar ve söyleyiş</h3><ul><li><b>é</b> (accent aigu), <b>è</b> (grave), <b>ê</b> (circonflexe): <i>ê</i> çoğu zaman düşmüş bir s’yi hatırlatır: <i>forêt</i> ← forest, <i>hôpital</i> ← hospital.</li><li><b>ç</b> (cédille): <i>ça, français</i>.</li><li><i>Liaison</i>: sessiz son ünsüz, ünlüyle başlayan sözcükten önce okunur: <i>les amis</i> “le-za-mi”.</li><li>Burun ünlüleri: <i>vin, blanc, bon, brun</i>.</li></ul>' },
      { x: 89, y: 76, ad: "Yerküre", panel: '<h3>Frankofoni</h3><p>Fransızca bugün beş kıtada yaklaşık 320 milyon kişi tarafından konuşuluyor; konuşanların çoğu artık Afrika’da. Quebec, Belçika, İsviçre, Senegal, Fildişi Kıyısı…</p><p>Türkçeye de binlerce sözcük Fransızcadan geçti: <i>kuaför, asansör, bulvar, şoför, tiyatro</i>. Tanzimat aydınlarının Batı’ya açılan penceresi Fransızcaydı.</p>' }
    ]
  });

  /* ════════ İNGİLİZCE: Thames kıyısında Globe Tiyatrosu ════════ */
  S.kaydet("ingilizce", {
    ad: "İngilizce", ust: "diller", yer: "Londra · Thames kıyısı · Globe Tiyatrosu · 1600", vurgu: "#E8B080", alan: "diller",
    alt: "Bayrak direğinde oyun günü bayrağı, nehirde kayıklar, köprünün üstünde evler. Bu akşam Hamlet oynanıyor.",
    parcacik: { tur: "toz", adet: 40 }, isaret: "yildiz",
    sozler: [
      { metin: "To be, or not to be, that is the question.", dil: "en", ceviri: "Olmak ya da olmamak, işte bütün mesele bu.", kaynak: "Shakespeare, Hamlet III.1" },
      { metin: "Whan that Aprille with his shoures soote…", dil: "enm", ceviri: "Nisan tatlı sağanaklarıyla geldiğinde…", kaynak: "Chaucer, Canterbury Hikâyeleri, Genel Giriş" },
      { metin: "Language is the dress of thought.", dil: "en", ceviri: "Dil düşüncenin giysisidir.", kaynak: "Samuel Johnson, Şairlerin Hayatları, 1779" }
    ],
    arka: function () {
      var s = K.gokAksam("en") + h.bulut(400, 160, 1, 180, 20) + h.bulut(1100, 120, .9, 220, 90);
      /* köprü üstündeki evler ve eski St Paul's */
      s += '<g fill="#3a2a34"><path d="M1060 520V380L1080 340L1100 380V520Z"/><rect x="1020" y="420" width="120" height="100"/><path d="M1076 340L1080 230L1084 340Z"/></g>';
      s += '<g fill="#2e2230"><rect x="0" y="470" width="620" height="60"/>' + [20, 90, 160, 230, 300, 370, 440, 510].map(function (x, i) { return '<rect x="' + x + '" y="' + (420 - i % 3 * 16) + '" width="60" height="60"/><path d="M' + (x - 4) + " " + (420 - i % 3 * 16) + "L" + (x + 30) + " " + (390 - i % 3 * 16) + "L" + (x + 64) + " " + (420 - i % 3 * 16) + 'Z"/>'; }).join("") + [40, 160, 280, 400, 520].map(function (x) { return '<path d="M' + x + ' 530v60h60v-60a30 30 0 0 0 -60 0Z" fill="#1a1420"/>'; }).join("") + "</g>";
      for (var j = 0; j < 12; j++) s += '<rect class="pencere-isik" style="animation-delay:-' + j * 0.7 + 's" x="' + (32 + j * 48) + '" y="' + (440 - j % 3 * 16) + '" width="8" height="10" fill="#ffd27a"/>';
      /* nehir */
      s += '<rect y="560" width="1600" height="160" fill="url(#enSu)"/>';
      for (var w = 0; w < 5; w++) s += '<path class="dalga-x" style="--d:-' + w + 's" d="M-160 ' + (580 + w * 28) + 'q40 -4 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(255,220,180,.18)" stroke-width="2"/>';
      s += '<g class="yuz" style="--s:5s"><path d="M760 640H880L860 660H780Z" fill="#4a3020"/><path d="M820 640V580L850 630Z" fill="#e8dcc0"/></g>';
      /* Globe: çok köşeli, sazdan çatılı, bayraklı */
      s += '<g transform="translate(1250 700)"><path d="M-200 0V-190L-140 -230H140L200 -190V0Z" fill="#e8dcc4"/><path d="M-200 -190L-140 -230H140L200 -190L140 -210H-140Z" fill="#c8a860"/>' +
        [-170, -110, -50, 10, 70, 130].map(function (x) { return '<path d="M' + x + ' 0V-190" stroke="#6a4a2a" stroke-width="6"/>'; }).join("") + '<path d="M-200 -120H200M-200 -60H200" stroke="#6a4a2a" stroke-width="5"/><path d="M-30 0V-60H30V0Z" fill="#3a2414"/>' +
        '<rect x="-10" y="-300" width="30" height="80" fill="#e8dcc4"/><path d="M-14 -300L5 -320L24 -300Z" fill="#c8a860"/><path d="M5 -320V-380" stroke="#4a3020" stroke-width="3"/><g class="asili" style="--a:6deg;--s:2s"><path d="M5 -380H55L45 -368L55 -356H5Z" fill="#c8302a"/></g></g>';
      s += K.zemin("en", 720, "#3a2a1a", "#120c08");
      /* ön planda fıçı üstünde sözlük, hokka ve tüy, oyun afişi */
      s += '<g transform="translate(560 860)"><rect x="-70" y="-110" width="140" height="110" rx="20" fill="#6a4428"/><path d="M-70 -80H70M-70 -30H70" stroke="#3a2414" stroke-width="6"/><rect x="-60" y="-146" width="120" height="36" fill="#5a2a2a"/><path d="M-60 -128h120" stroke="#d9b25e" stroke-width="2"/><path d="M40 -150l40 -70" stroke="#efe2c2" stroke-width="4"/><rect x="24" y="-162" width="22" height="16" fill="#1a1a2a"/></g>';
      s += '<g transform="translate(180 800)"><rect x="-6" y="0" width="12" height="100" fill="#4a3020"/><rect x="-80" y="-120" width="160" height="130" fill="#efe2c2"/><text y="-86" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#3a2414">HAMLET</text><path d="M-60 -64H60M-50 -48H50M-56 -32H56M-40 -16H40" stroke="#6a4a24" stroke-width="2" opacity=".5"/></g>';
      return h.svg(s, '<linearGradient id="enSu" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a5a5a"/><stop offset="1" stop-color="#1a1a30"/></linearGradient>');
    },
    eserler: [
      { x: 78, y: 58, ad: "Globe Tiyatrosu", panel: '<h3>Shakespeare</h3><p>1599’da Thames’in güney kıyısında açılan Globe’da Hamlet, Kral Lear, Macbeth oynanır. <b>Shakespeare</b> (1564–1616) İngilizceye yüzlerce sözcük ve deyim kazandırır ya da yaygınlaştırır: <i>eyeball, bedroom, lonely, swagger; break the ice, wild-goose chase</i>.</p><p>1613’te bir oyunda atılan top çatıdaki sazı tutuşturur ve tiyatro yanar; aslına uygun yeniden yapılan Globe 1997’de açıldı.</p>' },
      { x: 52, y: 70, ad: "Kayık", panel: '<h3>Eski İngilizce (450–1100)</h3><p>Angıl, Sakson ve Jüt kabileleri Kuzey Denizi’ni aşıp Britanya’ya gelir. Dilleri Almanca ve Felemenkçeyle akrabadır; sonra Vikinglerin Eski Norsçası karışır: <i>sky, egg, they, window</i>.</p><p class="pn-soz">«Hwæt! We Gardena in geardagum…» <small>Dinle! Eski günlerde Danimarkalıların… — Beowulf’un ilk dizesi</small></p>' },
      { x: 20, y: 48, ad: "Köprüdeki evler", panel: '<h3>Chaucer ve Orta İngilizce</h3><p>1066’da Normanlar İngiltere’yi fetheder; üç yüzyıl boyunca saray Fransızca konuşur. İngilizceye binlerce Fransızca sözcük girer: tarladaki hayvan <i>cow, pig</i> (Anglosakson), sofradaki eti <i>beef, pork</i> (Fransızca).</p><p><b>Geoffrey Chaucer</b>’ın Canterbury Hikâyeleri (1387–1400) hacılara giden yolcuların anlattığı öykülerle Orta İngilizcenin şaheseridir.</p>' },
      { x: 67, y: 32, ad: "Kule", panel: '<h3>King James İncili (1611)</h3><p>Kral I. James’in görevlendirdiği 47 bilgin, altı yıl çalışır. Tyndale’in önceki çevirisine çok şey borçludur. Dili yüzyıllar boyunca İngiliz düzyazısını biçimlendirir: <i>let there be light, the salt of the earth, a labour of love</i>.</p>' },
      { x: 35, y: 78, ad: "Fıçıdaki sözlük", panel: '<h3>Samuel Johnson’ın sözlüğü (1755)</h3><p>Dokuz yıllık emekle 42.000 sözcük ve 114.000 alıntı. Tanımlarında nükte eksik olmaz: <i>lexicographer</i> “sözlük yazarı; zararsız bir angaryacı”.</p><p>İngiliz yazımı büyük ölçüde bu sözlükle sabitlenir; Amerikan yazımı ise Noah Webster’ın 1828 sözlüğüyle ayrılır: <i>colour/color, centre/center</i>.</p>' },
      { x: 11, y: 82, ad: "Oyun afişi", panel: '<h3>Büyük Ünlü Kayması</h3><p>1400–1700 arasında uzun ünlüler kayar: Chaucer’ın <i>bite</i>’ı “biite”, <i>house</i>’u “huus” diye okunur. Yazım ise matbaayla daha önce sabitlendiği için İngilizcede yazılış ile okunuş arasındaki uçurum buradan gelir.</p><p><i>Knight, though, through, tough</i>: harfler eski sesleri hâlâ taşır.</p>' },
      { x: 93, y: 50, ad: "Bayrak", panel: '<h3>Küresel dil ve felsefe dili</h3><p>Bugün yaklaşık 1,5 milyar kişi İngilizce konuşuyor; ana dili olanlar bunun ancak dörtte biri. Bilimin, internetin ve havacılığın ortak dili.</p><p>Felsefede Locke, Berkeley, Hume ve Mill’den analitik felsefeye (Russell, Moore, Austin) uzanan bir gelenek: sıradan dilin dikkatli çözümlemesi. Austin’e göre bir şey söylemek bazen bir şey yapmaktır: “Söz veriyorum.”</p>' }
    ]
  });

  S.merkezeEkle("diller", [
    { hedef: "almanca", aciklama: "Gutenberg’in atölyesi: matbaa, Luther, Grimm ve felsefenin Almancası.",
      sanat: K.kapi("#E8C070", '<rect x="-50" y="-40" width="100" height="16" fill="#6a4428"/><rect x="-44" y="-24" width="10" height="80" fill="#5a3a22"/><rect x="34" y="-24" width="10" height="80" fill="#5a3a22"/><rect x="-6" y="-26" width="12" height="44" fill="#8a6a3a"/><rect x="-36" y="20" width="72" height="12" fill="#6a4428"/><text y="0" x="0" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#c8a860" class="yuz" style="--s:3s">ß</text>') },
    { hedef: "fransizca", aciklama: "Bir Paris salonu: Descartes, Ansiklopedi ve Aydınlanma.",
      sanat: K.kapi("#B8C8F0", '<g class="asili" style="--a:2deg"><path d="M0 -70V-40" stroke="#c8a040" stroke-width="2"/><ellipse cy="-30" rx="44" ry="8" fill="none" stroke="#c8a040" stroke-width="3"/>' + [-36, -12, 12, 36].map(function (x) { return '<rect x="' + (x - 3) + '" y="-44" width="6" height="12" fill="#efe2c2"/><circle cx="' + x + '" cy="-50" r="4" fill="#ffd27a"/>'; }).join("") + '</g><text y="40" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-style="italic" fill="#B8C8F0">é</text>', "#10121c") },
    { hedef: "ingilizce", aciklama: "Globe Tiyatrosu: Beowulf’tan Shakespeare’e ve küresel dile.",
      sanat: K.kapi("#E8B080", '<path d="M-60 50V-10L-40 -24H40L60 -10V50Z" fill="#e8dcc4"/><path d="M-60 -10L-40 -24H40L60 -10L40 -18H-40Z" fill="#c8a860"/><path d="M-40 50V-10M-10 50V-10M20 50V-10M50 50V-10" stroke="#6a4a2a" stroke-width="3"/><path d="M0 -24V-70" stroke="#4a3020" stroke-width="2"/><path class="asili" style="--a:8deg" d="M0 -70H30L24 -62L30 -54H0Z" fill="#c8302a"/>') }
  ]);
})();
