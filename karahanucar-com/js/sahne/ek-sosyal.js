/* Sosyal Bilimler odasının yeni kapıları: Tarih (arşiv mahzeni), Antropoloji (Trobriand Adaları'nda bir saha çadırı), Ekonomi (Amsterdam, 1637). */
(function () {
  var S = window.SAHNE; if (!S || !S.kit) return;
  var h = S.h, K = S.kit;

  /* ════════ TARİH: mum ışığında bir arşiv mahzeni ════════ */
  S.kaydet("tarih", {
    ad: "Tarih", ust: "sosyal-bilimler", yer: "Bir arşiv mahzeni · tonozların altında · mum ışığı", vurgu: "#E8B070", alan: "sosyal-bilimler",
    alt: "Raflarda tomarlar ve defterler, masada mühürlü bir ferman ve bir büyüteç. Geçmiş burada, kâğıtların arasında konuşmayı bekliyor.",
    parcacik: { tur: "toz", adet: 70 }, isaret: "halka",
    sozler: [
      { metin: "Historia… testis temporum, lux veritatis, vita memoriae, magistra vitae, nuntia vetustatis.", dil: "la", ceviri: "Tarih zamanların tanığı, hakikatin ışığı, belleğin canı, hayatın öğretmeni, eskinin habercisidir.", kaynak: "Cicero, Hatip Üzerine II.36" },
      { metin: "Ἡροδότου Ἁλικαρνησσέος ἱστορίης ἀπόδεξις ἥδε", dil: "grc", ceviri: "Halikarnassoslu Herodotos’un araştırmasının sergilenmesi budur.", kaynak: "Herodotos, Tarih I.1" },
      { metin: "Those who cannot remember the past are condemned to repeat it.", dil: "en", ceviri: "Geçmişi hatırlayamayanlar onu tekrarlamaya mahkûmdur.", kaynak: "George Santayana, Aklın Hayatı, 1905" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="#140e0a"/>';
      /* tonozlar */
      for (var i = 0; i < 4; i++) { var x = i * 420 - 30; s += '<path d="M' + x + ' 900V360A210 210 0 0 1 ' + (x + 420) + ' 360V900" fill="#2a1e16" stroke="#3a2a1e" stroke-width="30"/>'; }
      for (var j = 0; j < 30; j++) s += '<rect x="' + ((j * 137) % 1600) + '" y="' + (80 + (j * 71) % 260) + '" width="60" height="24" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>';
      s += K.raf(40, 380, 360, 420, 31, 5) + K.raf(1200, 380, 360, 420, 37, 5);
      /* tomar rafı */
      s += '<g transform="translate(480 380)"><rect width="260" height="300" fill="#2a1a10" stroke="#3a2616" stroke-width="10"/>';
      for (var r = 0; r < 5; r++) for (var c = 0; c < 6; c++) s += '<circle cx="' + (26 + c * 42) + '" cy="' + (34 + r * 56) + '" r="18" fill="#e8dcc0"/><circle cx="' + (26 + c * 42) + '" cy="' + (34 + r * 56) + '" r="6" fill="#b8a888"/>';
      s += "</g>";
      /* duvardaki Akdeniz haritası */
      s += '<g transform="translate(840 200) rotate(2)"><rect width="300" height="200" fill="#e8d8b0" stroke="#6a4a24" stroke-width="6"/><path d="M20 120C60 100 90 130 130 110C170 90 200 120 240 100C260 90 280 110 290 100V190H20Z" fill="#c8b890"/><path d="M40 60C80 40 120 70 160 50C200 34 240 60 280 44" stroke="#8a6a3a" stroke-width="2" fill="none"/><circle cx="160" cy="96" r="5" fill="#a8302a"/></g>';
      s += '<rect y="780" width="1600" height="120" fill="#0e0a07"/>' + K.masa(560, 740, 520, "#4a2e1a");
      /* ferman, büyüteç, kum saati, mum, defter, kitaplar */
      s += '<g transform="translate(680 720) rotate(-5)"><rect x="-70" y="-28" width="140" height="56" fill="#efe2c2"/><path d="M-56 -16h90M-56 -4h100M-56 8h80" stroke="#6a4a24" stroke-width="2" opacity=".6"/><circle cx="46" cy="16" r="12" fill="#a8302a"/><path d="M46 28l-6 14M46 28l6 14" stroke="#a8302a" stroke-width="3"/></g>';
      s += '<g transform="translate(800 724)"><circle r="24" fill="rgba(200,230,255,.25)" stroke="#a8804a" stroke-width="5"/><path d="M16 18L44 48" stroke="#5a3a22" stroke-width="8" stroke-linecap="round"/></g>';
      s += '<g transform="translate(920 740)"><g class="m-cevir" style="animation:sk-don 8s steps(2) infinite;transform-box:fill-box;transform-origin:center"><path d="M-22 -80H22M-22 0H22M-18 -80C-18 -54 0 -46 0 -40C0 -34 -18 -26 -18 0M18 -80C18 -54 0 -46 0 -40C0 -34 18 -26 18 0" stroke="#a8804a" stroke-width="4" fill="none"/><path d="M-12 -6H12L0 -22Z" fill="#e8c870"/></g></g>';
      s += K.mum(1020, 740, 1) + K.mum(600, 740, .8) + K.kitaplar(1100, 740, 5, 41);
      s += '<g transform="translate(990 700) rotate(8)"><rect x="-40" y="-8" width="80" height="16" fill="#6a3a2a"/><path d="M-40 -8H40" stroke="#d9b25e" stroke-width="2"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 38, y: 55, ad: "Tomarlar", panel: '<h3>Herodotos ve Thukydides</h3><p>Halikarnassoslu <b>Herodotos</b> (MÖ 5. yy), Yunanlarla Persler arasındaki savaşların nedenlerini anlatırken gördüklerini, duyduklarını ve kendi yorumunu ayırır; kitabının adı <i>historiai</i>, “araştırmalar”dır. Cicero ona “tarihin babası” der.</p><p><b>Thukydides</b> Peloponnesos Savaşı’nı yazarken tanıklıkları sorgular, efsaneleri dışlar ve siyasal nedenselliği arar: “ebedî bir miras” yazmak ister.</p>' },
      { x: 42, y: 80, ad: "Mühürlü ferman", panel: '<h3>Kaynak ve kaynak eleştirisi</h3><p>Olayın çağından kalan belge <b>birincil kaynak</b>tır (ferman, mektup, sicil); ondan yararlanan sonraki anlatı ikincil kaynaktır. Tarihçi her kaynağa sorar: kim yazdı, ne zaman, kimin için, neden?</p><p>1440’ta <b>Lorenzo Valla</b>, papalığın dayandığı “Konstantin Bağışı” belgesinin 4. yüzyılda yazılamayacağını dilbilgisi ve sözcük analiziyle kanıtlar: bir sahtekârlık. Metin eleştirisinin kuruluş anı.</p>' },
      { x: 57, y: 76, ad: "Kum saati", panel: '<h3>İbn Haldun’un Mukaddime’si (1377)</h3><p>Tunuslu <b>İbn Haldun</b>, tarih yazmadan önce tarihin kurallarını arar: haberlerin doğruluğu “olabilirlik” ile sınanmalıdır. Toplumlar <b>asabiyye</b>, yani dayanışma duygusuyla güç kazanır; devletler kurulur, yerleşik refahla yumuşar ve üç dört kuşakta çöker.</p><p>Toynbee’ye göre bu kitap “hiçbir zamanda ve yerde hiçbir zihnin yaratmadığı türden en büyük eser”dir.</p>' },
      { x: 50, y: 78, ad: "Büyüteç", panel: '<h3>Ranke ve arşiv</h3><p><b>Leopold von Ranke</b> (1824) tarihçinin işini “nasıl olduysa öyle göstermek” (<i>wie es eigentlich gewesen</i>) olarak tanımlar. Venedik elçilik raporları gibi arşiv belgelerine dayanan seminer yöntemi modern akademik tarihçiliği kurar.</p><p>20. yüzyılda bu nesnellik iddiası sorgulanır: Carr (1961) “tarih, tarihçi ile olgular arasında sürekli bir etkileşimdir” der.</p>' },
      { x: 62, y: 33, ad: "Akdeniz haritası", panel: '<h3>Annales okulu ve uzun süre</h3><p>1929’da Marc Bloch ve Lucien Febvre <i>Annales</i> dergisini kurar: savaş ve kral tarihi yerine ekonomi, iklim, zihniyetler ve gündelik hayat.</p><p><b>Fernand Braudel</b> Akdeniz’i (1949) üç zaman katmanında yazar: coğrafyanın neredeyse değişmeyen <b>uzun süre</b>si, ekonomilerin yavaş döngüleri ve olayların köpüğü.</p>' },
      { x: 65, y: 77, ad: "Kırmızı defter", panel: '<h3>Mikrotarih</h3><p>Carlo Ginzburg, <b>Peynir ve Kurtlar</b>’da (1976) engizisyon kayıtlarından 16. yüzyılda yaşamış değirmenci Menocchio’nun evren tasavvurunu çıkarır: dünya bir peynir gibi mayalanmış, melekler içindeki kurtlar gibi doğmuştur.</p><p>Küçük ölçekli, yakından bakış sıradan insanların sesini duyurur; büyük yapıların içindeki bireysel hayatları görünür kılar.</p>' },
      { x: 90, y: 60, ad: "Defter rafı", panel: '<h3>Tarih felsefesi</h3><p>Tarihin bir yönü, bir anlamı var mı? Augustinus’un iki devleti, Vico’nun döngüleri, Hegel’in özgürlük bilincinin ilerleyişi, Marx’ın üretim biçimleri.</p><p><b>R. G. Collingwood</b> (Tarih Tasarımı, 1946): tarih, geçmişteki insanların düşüncelerini tarihçinin kendi zihninde yeniden canlandırmasıdır. Walter Benjamin ise ilerleme fikrini, arkasını geleceğe dönmüş “tarihin meleği” imgesiyle sorgular.</p>' }
    ]
  });

  /* ════════ ANTROPOLOJİ: Trobriand Adaları, bir saha çadırı ════════ */
  S.kaydet("antropoloji", {
    ad: "Antropoloji", ust: "sosyal-bilimler", yer: "Trobriand Adaları · Malinowski’nin çadırı · 1915", vurgu: "#F0C080", alan: "sosyal-bilimler",
    alt: "Kumsalda bir çadır, fenerin ışığında açık bir saha defteri; açıkta kula yolculuğundan dönen kanolar. İnsanı onun yanında yaşayarak anlamak.",
    parcacik: { tur: "atesbocegi", adet: 24 }, isaret: "yildiz", sozYer: "sag",
    sozler: [
      { metin: "…to grasp the native’s point of view, his relation to life, to realise his vision of his world.", dil: "en", ceviri: "…yerlinin bakış açısını, yaşamla ilişkisini kavramak, onun dünyasını nasıl gördüğünü anlamak.", kaynak: "Bronisław Malinowski, Batı Pasifik’in Argonotları, 1922" },
      { metin: "…man is an animal suspended in webs of significance he himself has spun.", dil: "en", ceviri: "…insan, kendi ördüğü anlam ağlarında asılı duran bir hayvandır.", kaynak: "Clifford Geertz, Kültürlerin Yorumlanması, 1973" }
    ],
    arka: function () {
      var s = K.gokAksam("an") + K.gunes(900, 500, 40, "#ffc070");
      s += '<rect y="520" width="1600" height="170" fill="url(#anSu)"/>';
      for (var w = 0; w < 5; w++) s += '<path class="dalga-x" style="--d:-' + w + 's" d="M-160 ' + (540 + w * 28) + 'q40 -4 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(255,220,170,.22)" stroke-width="2"/>';
      /* kanolar (dengeleyicili) */
      var kano = function (x, y, o, d) { return '<g class="yuz" style="--s:5s;--d:-' + d + 's"><g transform="translate(' + x + " " + y + ") scale(" + o + ')"><path d="M-80 0C-40 14 40 14 80 0L70 -6H-70Z" fill="#3a2414"/><path d="M-50 -6V-26M30 -6V-26M-60 -26H40" stroke="#3a2414" stroke-width="3"/><path d="M-20 -6V-90L30 -20Z" fill="#d8b888"/></g></g>'; };
      s += kano(500, 600, .9, 1) + kano(1200, 580, .6, 3);
      s += '<path d="M0 680Q400 650 800 670T1600 660V900H0Z" fill="#d8c090"/>' + '<path d="M0 760Q500 730 1000 760T1600 750V900H0Z" fill="#c8ac78"/>';
      /* palmiyeler */
      var palmiye = function (x, y, o) { return '<g class="sallan" style="--a:2deg;--s:6s"><path d="M' + x + " " + y + "C" + (x + 10 * o) + " " + (y - 150 * o) + " " + (x + 40 * o) + " " + (y - 250 * o) + " " + (x + 30 * o) + " " + (y - 320 * o) + '" stroke="#5a3a22" stroke-width="' + 14 * o + '" fill="none"/>' + [0, 60, 120, 180, 240, 300].map(function (a) { var r = a * Math.PI / 180; return '<path d="M' + (x + 30 * o) + " " + (y - 320 * o) + "Q" + (x + 30 * o + Math.cos(r) * 80 * o) + " " + (y - 340 * o + Math.sin(r) * 30 * o - 40 * o) + " " + (x + 30 * o + Math.cos(r) * 150 * o) + " " + (y - 300 * o + Math.abs(Math.sin(r)) * 60 * o) + '" stroke="#2a5a2a" stroke-width="' + 12 * o + '" fill="none" stroke-linecap="round"/>'; }).join("") + "</g>"; };
      s += palmiye(120, 760, 1.2) + palmiye(1450, 740, 1) + palmiye(1320, 720, .7);
      /* çadır, fener, defter; yam deposu; ateş; kabuklar; horoz */
      s += '<g transform="translate(360 800)"><path d="M-160 0L0 -200L160 0Z" fill="#e8dcc0"/><path d="M-60 0L0 -150L60 0Z" fill="#ffd89a" opacity=".85"/><path d="M0 -200V0" stroke="#b8a888" stroke-width="3"/><rect x="-40" y="-40" width="80" height="10" fill="#6a4a2a"/>' + K.kagit(-36, -62, 44, 26, -6) + '<circle cx="24" cy="-60" r="10" fill="#ffd27a" class="hale"/></g>';
      s += '<g transform="translate(1000 760)"><path d="M-80 0V-110L0 -170L80 -110V0Z" fill="#8a6a3a"/><path d="M-90 -110L0 -180L90 -110" stroke="#5a3a1a" stroke-width="10" fill="none"/><path d="M-70 -100H70M-70 -70H70M-70 -40H70" stroke="#6a4a24" stroke-width="3"/>' + [-50, -20, 10, 40].map(function (x) { return '<ellipse cx="' + x + '" cy="-20" rx="12" ry="18" fill="#a8783a"/>'; }).join("") + "</g>";
      s += h.alev(720, 830, .7, 0) + '<g transform="translate(720 840)"><path d="M-40 0L40 -6M-40 -6L40 0" stroke="#3a2414" stroke-width="8"/></g>';
      s += '<g transform="translate(620 860)"><path d="M-40 0C-40 -30 0 -40 40 -20" stroke="#efe2c2" stroke-width="3" fill="none"/>' + [-36, -24, -12, 0, 12, 24].map(function (x, i) { return '<ellipse cx="' + x + '" cy="' + (-24 + Math.abs(i - 2.5) * 5) + '" rx="5" ry="7" fill="#e8b8a8"/>'; }).join("") + '<circle cx="60" cy="-10" r="16" fill="none" stroke="#f0e8d8" stroke-width="6"/></g>';
      s += '<g transform="translate(1180 820)"><ellipse rx="26" ry="18" fill="#a8401a"/><path d="M-20 -6C-40 -30 -30 -46 -26 -50" stroke="#2a5a3a" stroke-width="8" fill="none"/><circle cx="22" cy="-18" r="10" fill="#b8401a"/><path d="M20 -28l4 -8 4 8" fill="#d8302a"/><path d="M30 -18l8 2 -8 2Z" fill="#e8b040"/><path d="M-6 16V30M6 16V30" stroke="#e8b040" stroke-width="3"/></g>';
      return h.svg(s, '<linearGradient id="anSu" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d88060"/><stop offset="1" stop-color="#2a4a6a"/></linearGradient>');
    },
    eserler: [
      { x: 22, y: 80, ad: "Saha defteri", panel: '<h3>Katılımcı gözlem</h3><p>Polonyalı antropolog <b>Bronisław Malinowski</b>, Birinci Dünya Savaşı sırasında Trobriand Adaları’nda iki yılı aşkın yaşar, dili öğrenir, günlük hayata katılır. <b>Batı Pasifik’in Argonotları</b> (1922) “verandadan antropoloji”ye son verir: insanları kendi dünyalarının içinden anlamak.</p><p>Ölümünden sonra yayımlanan kişisel günlükleri (1967) ise gözlemcinin önyargılarını ve yalnızlığını gösterir: antropolojinin kendi üzerine düşünmesinin başlangıcı.</p>' },
      { x: 40, y: 92, ad: "Deniz kabukları", panel: '<h3>Kula halkası</h3><p>Adalar arasında yüzlerce kilometrelik bir çemberde iki tür değerli nesne dolaşır: kırmızı kabuk kolyeler (<i>soulava</i>) saat yönünde, beyaz kabuk kolluklar (<i>mwali</i>) ters yönde. Hiçbiri kalıcı olarak sahiplenilmez; ün, verip almaktan gelir.</p><p>Kula ekonomik takas değildir ama onunla birlikte gündelik ticaret de yapılır: değer toplumsal ilişkilerin içindedir.</p>' },
      { x: 63, y: 74, ad: "Yam deposu", panel: '<h3>Mauss: Armağan (1925)</h3><p><b>Marcel Mauss</b>’a göre armağan “bedava” değildir: vermek, almak ve karşılık vermek yükümlülükleri toplumu bir arada tutar. Trobriand’da kadınların kardeşlerinden aldığı yam hasadı, kuzey Amerika’da potlatch törenleri…</p><p>Armağan kişiyi ve nesneyi birbirine bağlar; “bütünsel toplumsal olgu”dur: ekonomik, hukuki, dinsel ve estetik aynı anda.</p>' },
      { x: 31, y: 64, ad: "Kano", panel: '<h3>Boas ve kültürel görecelik</h3><p>Alman kökenli Amerikalı <b>Franz Boas</b>, kültürlerin tek bir evrim merdiveninde “ilkel”den “uygar”a sıralanamayacağını savunur: her kültür kendi tarihi ve bağlamı içinde anlaşılmalıdır. Irkçı kuramlara karşı ölçümlerle karşı çıkar.</p><p>Öğrencileri Ruth Benedict (Kültür Örüntüleri, 1934) ve Margaret Mead (Samoa’da Ergenlik, 1928) antropolojiyi geniş kitlelere taşır.</p>' },
      { x: 45, y: 86, ad: "Ateş", panel: '<h3>Lévi-Strauss: yapısalcılık</h3><p><b>Claude Lévi-Strauss</b>, Saussure’ün dilbilimini kültüre uygular: mitler, akrabalık kuralları ve yemek pişirme, karşıtlıklardan (doğa/kültür, çiğ/pişmiş) kurulu yapılardır.</p><p><b>Yaban Düşünce</b> (1962): “ilkel” düşünce bilimsel düşünceden daha az mantıklı değildir; yalnızca farklı malzemelerle, somut olanla çalışır (<i>bricolage</i>). Hüzünlü Dönenceler (1955) ise bir saha anısı ve bir ağıttır.</p>' },
      { x: 74, y: 88, ad: "Horoz", panel: '<h3>Geertz: yoğun betimleme</h3><p>Bir göz kırpması ile gözün seğirmesi dışarıdan aynı görünür; farkı anlamdadır. <b>Clifford Geertz</b> (1973) antropoloğun işini anlam katmanlarını çözen “yoğun betimleme” olarak tanımlar.</p><p>Bali’de horoz dövüşünü, Balililerin kendilerine kendileri hakkında anlattıkları bir öykü olarak okur: kültür bir metin gibi yorumlanır.</p>' },
      { x: 88, y: 46, ad: "Palmiyeler", panel: '<h3>Geçiş ritleri</h3><p>Arnold van Gennep (1909): doğum, erginlenme, evlilik ve ölüm törenlerinin üç evresi vardır: ayrılma, eşik (<i>liminal</i>) ve yeniden katılma. Victor Turner eşikteki insanların eşitlik ve dayanışma duygusuna <i>communitas</i> der.</p><p>Mezuniyetten askerliğe, modern toplumlar da ritlerle doludur.</p>' }
    ]
  });

  /* ════════ EKONOMİ: Amsterdam, 1637 ════════ */
  S.kaydet("ekonomi", {
    ad: "Ekonomi", ust: "sosyal-bilimler", yer: "Amsterdam · kanal kıyısında bir tüccar evi · 1637", vurgu: "#D8C070", alan: "sosyal-bilimler",
    alt: "Kanalda Doğu Hint gemileri, masada terazi, sikkeler ve bir saksı lale: bir soğanın bir evden pahalı olduğu kış.",
    parcacik: { tur: "toz", adet: 40 }, isaret: "kristal", sozYer: "sag",
    sozler: [
      { metin: "It is not from the benevolence of the butcher, the brewer, or the baker, that we expect our dinner, but from their regard to their own interest.", dil: "en", ceviri: "Akşam yemeğimizi kasabın, biracının ya da fırıncının iyiliğinden değil, kendi çıkarlarını gözetmelerinden bekleriz.", kaynak: "Adam Smith, Ulusların Zenginliği I.2, 1776" },
      { metin: "In the long run we are all dead.", dil: "en", ceviri: "Uzun vadede hepimiz ölüyüz.", kaynak: "John Maynard Keynes, Para Reformu Üzerine, 1923" }
    ],
    arka: function () {
      var s = K.gokGun("ek2");
      /* kanal evleri: basamaklı alınlıklar */
      s += '<g>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var x = 60 + i * 190, hh = 280 + (i * 53) % 90, renk = ["#6a3a2a", "#3a3a4a", "#5a4a3a", "#7a4a3a"][i % 4]; return '<path d="M' + x + ' 560V' + (560 - hh) + 'h30v-24h30v-24h60v24h30v24h30V560Z" fill="' + renk + '"/>' + [0, 1, 2].map(function (r) { return '<rect x="' + (x + 30) + '" y="' + (560 - hh + 40 + r * 70) + '" width="30" height="40" fill="#e8dcc0"/><rect x="' + (x + 100) + '" y="' + (560 - hh + 40 + r * 70) + '" width="30" height="40" fill="#e8dcc0"/>'; }).join("") + '<path d="M' + (x + 80) + " " + (560 - hh - 10) + 'v-20h40" stroke="#3a2414" stroke-width="5" fill="none"/>'; }).join("") + "</g>";
      /* kanal ve gemiler */
      s += '<rect y="560" width="1600" height="120" fill="#4a6a7a"/>';
      for (var w = 0; w < 4; w++) s += '<path class="dalga-x" style="--d:-' + w + 's" d="M-160 ' + (578 + w * 26) + 'q40 -4 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/>';
      s += '<g class="yuz" style="--s:6s"><g transform="translate(1250 640)"><path d="M-160 0H160L130 40H-130Z" fill="#5a3a22"/><path d="M-60 0V-260M40 0V-220M120 0V-160" stroke="#3a2414" stroke-width="6"/><path d="M-60 -250Q-10 -210 -60 -160ZM-60 -150Q0 -110 -60 -60ZM40 -210Q90 -170 40 -120ZM40 -110Q90 -70 40 -30Z" fill="#efe2c2"/><path d="M-60 -260h40l-6 12h-34Z" fill="#c85a2a"/></g></g>';
      s += '<rect y="680" width="1600" height="220" fill="#5a3e28"/><rect y="680" width="1600" height="10" fill="#7a5a3a"/>';
      /* masa: terazi, sikkeler, defter, lale, iğne kutusu, arz-talep tabelası */
      s += K.masa(300, 760, 820, "#4a2e1a");
      s += '<g transform="translate(420 740)"><path d="M0 0V-110" stroke="#a8804a" stroke-width="5"/><g class="sallan" style="--a:5deg;--s:4s"><path d="M-80 -110H80" stroke="#a8804a" stroke-width="5"/><path d="M-80 -110L-100 -60H-60ZM80 -110L60 -60H100Z" fill="none" stroke="#a8804a" stroke-width="2"/><ellipse cx="-80" cy="-60" rx="22" ry="5" fill="#c8a040"/><ellipse cx="80" cy="-60" rx="22" ry="5" fill="#c8a040"/></g><rect x="-30" y="-6" width="60" height="10" fill="#6a4a2a"/></g>';
      s += '<g transform="translate(560 752)">' + [0, 1, 2, 3, 4].map(function (i) { return '<ellipse cx="' + (i % 3 * 16) + '" cy="' + (-i * 6) + '" rx="14" ry="5" fill="#e0b848" stroke="#a8802a"/>'; }).join("") + "</g>";
      s += '<g transform="translate(690 740) rotate(-4)"><rect x="-60" y="-26" width="120" height="30" fill="#3a2a1a"/><rect x="-56" y="-22" width="112" height="22" fill="#efe2c2"/><path d="M0 -22V0M-50 -14h40M8 -14h40M-50 -6h34M8 -6h30" stroke="#6a4a24" stroke-width="1.5"/></g>';
      s += '<g transform="translate(860 760)"><path d="M-26 0L-20 -46H20L26 0Z" fill="#b86a3a"/><path d="M0 -46V-110" stroke="#3a6a2a" stroke-width="4"/><path d="M-14 -46C-30 -70 -20 -84 0 -70" fill="#4a8a3a"/><g class="sallan" style="--a:4deg;--s:3s"><path d="M-16 -110C-18 -140 -6 -150 0 -134C6 -150 18 -140 16 -110C10 -100 -10 -100 -16 -110Z" fill="#e84a4a"/><path d="M0 -134V-104" stroke="#f8e8e8" stroke-width="3"/></g></g>';
      s += '<g transform="translate(990 752)"><rect x="-40" y="-20" width="80" height="20" fill="#8a6a3a"/><path d="M-30 -20V-30M-20 -20V-32M-10 -20V-30M0 -20V-32M10 -20V-30M20 -20V-32M30 -20V-30" stroke="#d8d8e0" stroke-width="2"/></g>';
      s += '<g transform="translate(1440 720)"><path d="M0 0V60" stroke="#4a3020" stroke-width="8"/><rect x="-80" y="-120" width="160" height="120" fill="#efe2c2" stroke="#4a3020" stroke-width="5"/><path d="M-60 -20V-100M-60 -20H60" stroke="#3a2a1a" stroke-width="2"/><path d="M-50 -90L50 -30" stroke="#3a6a9a" stroke-width="3"/><path d="M-50 -30L50 -90" stroke="#a8302a" stroke-width="3"/><circle cy="-60" r="4" fill="#3a2a1a"/></g>';
      s += '<g transform="translate(160 540)"><rect x="-10" y="0" width="20" height="160" fill="#5a4a3a"/><path d="M-60 0H10" stroke="#5a4a3a" stroke-width="10"/><path d="M-50 0V70" stroke="#8a7a5a" stroke-width="2"/><rect x="-66" y="70" width="32" height="26" fill="#b89860"/><path d="M-66 78h32" stroke="#6a4a24"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 54, y: 72, ad: "Lale saksısı", panel: '<h3>Lale çılgınlığı (1636–37)</h3><p>Osmanlı bahçelerinden Avrupa’ya gelen lale, Hollanda’da bir statü simgesi olur. Alacalı “Semper Augustus” soğanının fiyatı bir kanal evininkini aşar; soğanlar toprakta dururken bile kâğıt üzerinde defalarca el değiştirir.</p><p>Şubat 1637’de alıcılar birden kaybolur, fiyatlar çöker. Ekonomi tarihçileri etkinin abartıldığını söylese de lale çılgınlığı <b>spekülatif balonların</b> simgesi olarak kalır.</p>' },
      { x: 26, y: 70, ad: "Terazi", panel: '<h3>Aristoteles: oikonomia</h3><p>“Ekonomi” sözcüğü Yunanca <i>oikos</i> (ev) ve <i>nomos</i> (yasa) sözcüklerinden gelir: hane yönetimi. <b>Aristoteles</b> ihtiyaç için edinmeyi (oikonomia), sınırsız para kazanma sanatından (<i>khrematistike</i>) ayırır ve faizi doğaya aykırı bulur.</p><p>Bir ayakkabının iki kullanımı vardır: giymek ve takas etmek. Kullanım değeri ile değişim değeri ayrımı Marx’a kadar uzanır.</p>' },
      { x: 43, y: 80, ad: "Muhasebe defteri", panel: '<h3>Çift kayıt ve şirket</h3><p>Luca Pacioli 1494’te Venedik tüccarlarının çift taraflı kayıt yöntemini yayımlar: her işlem hem borç hem alacak olarak yazılır ve defter denkleşir.</p><p>1602’de kurulan <b>Hollanda Doğu Hindistan Şirketi</b> (VOC) hisselerini halka satan ilk büyük anonim şirkettir; Amsterdam borsası bu hisseler için doğar.</p>' },
      { x: 78, y: 48, ad: "Doğu Hint gemisi", panel: '<h3>Ticaret ve karşılaştırmalı üstünlük</h3><p><b>David Ricardo</b> (1817): Portekiz hem şarabı hem kumaşı İngiltere’den daha verimli üretse bile, iki ülke de kendi “görece” daha iyi olduğu işte uzmanlaşıp ticaret yaparsa ikisi de kazanır.</p><p>17. yüzyılın baharat ticareti ise tekeller, savaşlar ve sömürgecilikle iç içeydi: serbest ticaretin savunusu tarihin bu yüzüyle birlikte okunmalıdır.</p>' },
      { x: 62, y: 81, ad: "İğne kutusu", panel: '<h3>Adam Smith</h3><p><b>Ulusların Zenginliği</b> (1776) bir iğne fabrikasıyla açılır: bir işçi tek başına günde belki bir iğne yapar; on işçi işi on sekiz adıma bölünce günde 48.000 iğne.</p><p>İş bölümü, pazar ve “görünmez el”: herkes kendi çıkarını gözetirken farkında olmadan toplumun yararına hizmet edebilir. Ama Smith’in önceki kitabı <b>Ahlaki Duygular Kuramı</b>’dır; piyasa ahlaktan bağımsız değildir.</p>' },
      { x: 10, y: 66, ad: "Vinç kirişi", panel: '<h3>Marx: Kapital (1867)</h3><p><b>Karl Marx</b>’a göre kapitalizmde işçinin emek gücü de bir metadır. İşçi, ücretinin karşılığından fazlasını üretir: <b>artı değer</b>, kârın kaynağıdır.</p><p>Metaların “fetişizmi”: insanlar arasındaki toplumsal ilişkiler, şeyler arasındaki ilişkiler gibi görünür. Kapitalizmin bunalımlara eğilimi ve sınıf mücadelesi üzerine teorisi 20. yüzyılı derinden etkiler.</p>' },
      { x: 90, y: 70, ad: "Arz–talep tabelası", panel: '<h3>Arz, talep ve Keynes</h3><p>Alfred Marshall’ın <b>makası</b> (1890): fiyat, arz ve talep eğrilerinin kesiştiği yerde oluşur; iki bıçaktan hangisinin kestiğini sormak anlamsızdır.</p><p>1929 bunalımında bu denge işsizliği gidermez. <b>Keynes</b> (Genel Teori, 1936): toplam talep yetersizse ekonomi uzun süre işsizlikle dengede kalabilir; devlet harcamaları talebi canlandırmalıdır.</p>' }
    ]
  });

  S.merkezeEkle("sosyal-bilimler", [
    { hedef: "tarih", aciklama: "Arşiv mahzeni: Herodotos, İbn Haldun, Ranke, Annales.",
      sanat: K.kapi("#E8B070", '<g transform="translate(0 -6)"><path d="M-22 -40H22M-22 40H22M-18 -40C-18 -10 0 -4 0 0C0 4 -18 10 -18 40M18 -40C18 -10 0 -4 0 0C0 4 18 10 18 40" stroke="#e8c870" stroke-width="3" fill="none"/><path d="M-12 34H12L0 18Z" fill="#e8c870"/></g><rect x="-60" y="44" width="120" height="16" rx="8" fill="#e8dcc0"/>') },
    { hedef: "antropoloji", aciklama: "Trobriand Adaları: katılımcı gözlem, kula, armağan.",
      sanat: K.kapi("#F0C080", '<path d="M-60 40L0 -40L60 40Z" fill="#e8dcc0"/><path d="M-20 40L0 -10L20 40Z" fill="#ffd89a"/><path d="M50 50C54 -10 70 -40 66 -60" stroke="#6a4a2a" stroke-width="5" fill="none"/><path d="M66 -60Q40 -70 20 -50M66 -60Q90 -74 100 -50" stroke="#2a6a2a" stroke-width="5" fill="none"/>') },
    { hedef: "ekonomi", aciklama: "Amsterdam 1637: lale çılgınlığı, Smith, Marx, Keynes.",
      sanat: K.kapi("#D8C070", '<path d="M0 50V-40" stroke="#a8804a" stroke-width="4"/><g class="sallan" style="--a:6deg"><path d="M-50 -40H50" stroke="#a8804a" stroke-width="4"/><ellipse cx="-50" cy="0" rx="18" ry="4" fill="#c8a040"/><ellipse cx="50" cy="0" rx="18" ry="4" fill="#c8a040"/><path d="M-50 -40L-66 0M-50 -40L-34 0M50 -40L34 0M50 -40L66 0" stroke="#a8804a" stroke-width="1.5"/></g><path d="M-8 -60C-10 -76 -2 -82 0 -72C2 -82 10 -76 8 -60Z" fill="#e84a4a"/>') }
  ]);
})();
