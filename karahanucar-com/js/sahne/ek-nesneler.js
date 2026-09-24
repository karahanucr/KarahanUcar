/* İlk on iki alt odaya yeni parıldayan nesneler: sahneler aynı kalır, çizime küçük nesneler eklenir.
   Latince, Antik Yunanca ve Arapça odalarında o dilde yazmış büyük adlar; Astronomi odası panoramaya genişler (sağa kayınca Semerkant). */
(function () {
  var S = window.SAHNE; if (!S) return;

  /* ek(id, {cizim, eserler, sozler, genislik, genisCizim}): tanımı yerinde zenginleştirir */
  S.ekle = ek;
  function ek(id, o) {
    var d = S.tanim(id); if (!d) return;
    if (o.cizim || o.genislik) {
      var eski = d.arka;
      d.arka = function () {
        var s = eski.apply(this, arguments);
        if (o.genislik) s = s.replace('viewBox="0 0 1600 900"', 'viewBox="0 0 ' + Math.round(1600 * o.genislik) + ' 900"').replace('<rect width="1600" height="900"', '<rect width="' + Math.round(1600 * o.genislik) + '" height="900"');
        return s.replace(/<\/svg>\s*$/, (o.genisCizim || "") + (o.cizim || "") + "</svg>");
      };
    }
    if (o.genislik) d.genislik = o.genislik;
    if (o.eserler) d.eserler = d.eserler.concat(o.eserler);
    if (o.sozler) d.sozler = (d.sozler || []).concat(o.sozler);
  }

  /* ════════ LATİNCE: sıralardaki senatörler, Latince yazan yazarları temsil eder ════════ */
  ek("latince", {
    eserler: [
      { x: 9, y: 64, ad: "Sol sıralar", panel:
        "<h3>Roma'nın kalemleri</h3><p>Sol sıralarda Latin nesrinin ve şiirinin büyükleri oturuyor. Hepsi Cicero'nun dilini paylaşır, ama her biri onu başka bir işe koşar.</p>" +
        "<ul><li><b>Iulius Caesar</b> (MÖ 100–44): <i>Commentarii de Bello Gallico</i>. Kendisinden üçüncü tekil kişiyle söz eden, yalın ve askerî bir düzyazı: “Gallia est omnis divisa in partes tres.”</li>" +
        "<li><b>Lucretius</b> (MÖ ~99–55): <i>De rerum natura</i>. Epikuros'un atomculuğunu altı kitaplık bir şiirle anlatır; 1417'de yeniden bulunması Rönesans'ı sarstı.</li>" +
        "<li><b>Vergilius</b> (MÖ 70–19): <i>Aeneis</i>. Troya'dan kaçan Aeneas'ın Roma'yı kurmaya giden yolculuğu; Dante onu Cehennem'de rehber seçer.</li>" +
        "<li><b>Seneca</b> (MÖ ~4–MS 65): <i>Epistulae morales ad Lucilium</i>. Stoacı ahlakın mektuplarla öğretimi: zamanı, öfkeyi, ölümü yönetmek.</li>" +
        "<li><b>Tacitus</b> (~56–120): <i>Annales</i>, <i>Germania</i>. İmparatorluğu içeriden eleştiren keskin, sıkıştırılmış bir üslup.</li></ul>" +
        "<div class=\"pn-etiketler\"><span>tarih</span><span>şiir</span><span>Stoa</span><span>Epikurosçuluk</span></div>" },
      { x: 91, y: 64, ad: "Sağ sıralar", panel:
        "<h3>Roma'dan sonra Latince düşünenler</h3><p>Roma düştü, Latince yaşamaya devam etti. Sağ sıralardakiler imparatorluktan sonra bu dilde yazarak Avrupa düşüncesini kurdu.</p>" +
        "<ul><li><b>Augustinus</b> (354–430): <i>Confessiones</i>, <i>De civitate Dei</i>. İçe dönük özyaşamöyküsünün ilk büyük örneği; zamanın ruhun “uzanımı” olduğunu söyler.</li>" +
        "<li><b>Boethius</b> (~480–524): <i>De consolatione philosophiae</i>. Hapiste idamını beklerken felsefeyle konuşur.</li>" +
        "<li><b>Thomas Aquinas</b> (1225–1274): <i>Summa theologiae</i>. Aristoteles'i Hristiyan düşüncesiyle uzlaştıran dev sistem; “beş yol”.</li>" +
        "<li><b>René Descartes</b> (1596–1650): <i>Meditationes de prima philosophia</i> (1641). Kuşkudan kesinliğe: “Ego sum, ego existo.” Kitabı Fransızcaya da çevrildi ama önce Latince yayımlandı.</li>" +
        "<li><b>Baruch Spinoza</b> (1632–1677): <i>Ethica, ordine geometrico demonstrata</i> (1677). Tanım, belit ve önermelerle geometri düzeninde bir ahlak: <i>Deus sive Natura</i>.</li>" +
        "<li><b>Isaac Newton</b> (1643–1727): <i>Philosophiae naturalis principia mathematica</i> (1687). Hareket yasaları ve evrensel çekim, hepsi Latince.</li></ul>" +
        "<p class=\"pn-not\">Latince 18. yüzyıla dek Avrupa'nın bilim dili kaldı; Gauss'un <i>Disquisitiones arithmeticae</i>'si (1801) de Latincedir.</p>" },
      { x: 50, y: 44, ad: "Nişteki heykel", panel:
        "<h3>Horatius ve Ovidius: şiirin iki yüzü</h3><p>Nişteki heykel bir şairi andırıyor. Augustus çağı Latin şiirinin altın çağıdır.</p>" +
        "<ul><li><b>Horatius</b> (MÖ 65–8): <i>Carmina</i>, <i>Ars poetica</i>. “Carpe diem” ve “sapere aude” ondan. “Exegi monumentum aere perennius”: “Tunçtan kalıcı bir anıt diktim.”</li>" +
        "<li><b>Ovidius</b> (MÖ 43–MS 17/18): <i>Metamorphoses</i>. Yüzlerce mitin başkalaşım teması etrafında örüldüğü destan; Shakespeare'den Kafka'ya uzanan bir kaynak. Augustus onu Karadeniz kıyısındaki Tomis'e (bugün Köstence) sürgün etti.</li></ul>" }
    ],
    sozler: [
      { metin: "Gallia est omnis divisa in partes tres.", dil: "la", ceviri: "Galya bütünüyle üç parçaya ayrılmıştır.", kaynak: "Caesar · De Bello Gallico I, 1" },
      { metin: "Omnia, Lucili, aliena sunt, tempus tantum nostrum est.", dil: "la", ceviri: "Her şey başkasınındır, Lucilius; yalnızca zaman bizimdir.", kaynak: "Seneca · Epistulae morales I, 3" },
      { metin: "Si enim fallor, sum.", dil: "la", ceviri: "Yanılıyorsam, varım.", kaynak: "Augustinus · De civitate Dei XI, 26" },
      { metin: "Omnia praeclara tam difficilia quam rara sunt.", dil: "la", ceviri: "Bütün seçkin şeyler ne kadar zorsa o kadar da nadirdir.", kaynak: "Spinoza · Ethica V, 42" }
    ]
  });

  /* ════════ ANTİK YUNANCA ════════ */
  ek("yunanca", {
    eserler: [
      { x: 22, y: 56, ad: "Stoa", panel:
        "<h3>Stoanın gölgesinde: şairler ve tarihçiler</h3><p>Revaklı yol (<i>stoa</i>) agoranın kamusal salonuydu; Zenon öğrencilerini Boyalı Stoa'da topladığı için okulunun adı Stoacılık oldu.</p>" +
        "<ul><li><b>Homeros</b> (MÖ ~8. yy): <i>İlyada</i> ve <i>Odysseia</i>; Yunan eğitiminin temeli.</li>" +
        "<li><b>Hesiodos</b>: <i>Theogonia</i>, tanrıların soykütüğü; <i>İşler ve Günler</i>.</li>" +
        "<li><b>Sappho</b> (MÖ ~630–570): Midilli'den lirik şair; şiirlerinin çoğu yalnızca parçalar hâlinde kaldı.</li>" +
        "<li><b>Herodotos</b> (MÖ ~484–425): Bodrum (Halikarnassos) doğumlu; <i>Historiai</i> (“araştırmalar”) sözcüğüyle tarihe adını verdi.</li>" +
        "<li><b>Thukydides</b> (MÖ ~460–400): <i>Peloponnesos Savaşı</i>; güç siyasetinin soğukkanlı çözümlemesi (Melos diyaloğu).</li>" +
        "<li><b>Sophokles</b> (MÖ ~497–406): <i>Kral Oidipus</i>, <i>Antigone</i>; trajedinin doruğu.</li></ul>" },
      { x: 51, y: 58, ad: "Zeytin ağacı", panel:
        "<h3>Zeytinliğin filozofları</h3><p>Platon'un okulu Akademia, Atina dışındaki kutsal zeytinlikte kuruldu. Yunanca yazan filozoflar felsefenin kavram dağarcığını kurdu: <i>ousia</i>, <i>logos</i>, <i>epistēmē</i>, <i>ēthos</i>.</p>" +
        "<ul><li><b>Platon</b> (MÖ 427–347): diyaloglar; <i>Devlet</i>, <i>Symposion</i>, <i>Timaios</i>.</li>" +
        "<li><b>Aristoteles</b> (MÖ 384–322): <i>Organon</i>, <i>Fizik</i>, <i>Metafizik</i>, <i>Nikomakhos'a Etik</i>.</li>" +
        "<li><b>Epikuros</b> (MÖ 341–270): Bahçe okulu; atomlar ve ölüm korkusundan kurtuluş. “Ölüm bizim için hiçbir şeydir.”</li>" +
        "<li><b>Zenon</b> (Kıbrıslı, MÖ ~334–262): Stoa'nın kurucusu; doğaya uygun yaşamak.</li>" +
        "<li><b>Epiktetos</b> (~50–135): azatlı köle; “Bize bağlı olanlar ve olmayanlar.”</li>" +
        "<li><b>Plotinos</b> (205–270): <i>Enneadlar</i>; Bir'den taşan varlık; Yeni Platonculuk.</li></ul>" +
        "<p class=\"pn-not\">Marcus Aurelius bir Roma imparatoruydu ama <i>Kendime Düşünceler</i>'i Yunanca yazdı: felsefenin dili o çağda hâlâ Yunancaydı.</p>" }
    ],
    sozler: [
      { metin: "ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον.", dil: "grc", ceviri: "Anlat bana, ey Musa, o çok yönlü adamı.", kaynak: "Homeros · Odysseia I, 1" },
      { metin: "ὁ θάνατος οὐδὲν πρὸς ἡμᾶς.", dil: "grc", ceviri: "Ölüm bizim için hiçbir şeydir.", kaynak: "Epikuros · Kyriai Doxai 2" }
    ]
  });

  /* ════════ ARAPÇA ════════ */
  ek("arapca", {
    eserler: [
      { x: 10, y: 45, ad: "Sol revak", panel:
        "<h3>Sol revak: bilginler</h3><p>Arapça yüzyıllarca Endülüs'ten Semerkant'a bilimin ortak dili oldu. Yazarların çoğu Arap değildi: Fars, Türk, Berberî, Yahudi, Süryani.</p>" +
        "<ul><li><b>Harezmî</b> (~780–850): <i>el-Kitâbü'l-muhtasar fî hisâbi'l-cebr ve'l-mukâbele</i>; cebirin adı buradan.</li>" +
        "<li><b>İbnü'l-Heysem</b> (965–1040): <i>Kitâbü'l-Menâzır</i>; görmenin ışığın gözden değil nesneden gelmesiyle olduğunu deneylerle gösterdi. Latince çevirisi Kepler'e dek okundu.</li>" +
        "<li><b>Bîrûnî</b> (973–1048): <i>Tahkîku mâ li'l-Hind</i>; Dünya'nın yarıçapını dağ tepesinden ufuk açısıyla ölçtü.</li>" +
        "<li><b>Cezerî</b> (1136–1206): <i>el-Câmi' beyne'l-ilm ve'l-amel</i>; su saatleri, otomatlar, krank mili.</li></ul>" },
      { x: 89, y: 45, ad: "Sağ revak", panel:
        "<h3>Sağ revak: filozoflar</h3><p><i>Falsafa</i>: Yunan felsefesinin Arapçada yeniden düşünülmesi. Latinceye çevrilince Orta Çağ Avrupa'sının da felsefesi oldu; Aquinas İbn Rüşd'ü sadece “Şârih” (Yorumcu) diye anar.</p>" +
        "<ul><li><b>Kindî</b> (~801–873): “Arapların filozofu”; <i>İlk Felsefe Üzerine</i>. Hakikati nereden gelirse gelsin almaktan utanmamak gerekir.</li>" +
        "<li><b>Fârâbî</b> (~870–950): “İkinci Öğretmen”; <i>el-Medînetü'l-fâzıla</i> (Erdemli Şehir), <i>İhsâu'l-ulûm</i>.</li>" +
        "<li><b>İbn Sînâ</b> (980–1037): <i>eş-Şifâ</i>, <i>el-Kânûn fi't-tıbb</i>; öz–varlık ayrımı ve “uçan adam” düşünce deneyi.</li>" +
        "<li><b>Gazzâlî</b> (1058–1111): <i>Tehâfütü'l-felâsife</i>; nedensellik eleştirisi, Hume'dan yüzyıllar önce.</li>" +
        "<li><b>İbn Rüşd</b> (1126–1198): <i>Tehâfütü't-Tehâfüt</i> ile yanıt; Aristoteles şerhleri.</li>" +
        "<li><b>İbn Haldun</b> (1332–1406): <i>Mukaddime</i>; asabiyet, devletlerin yükselişi ve çöküşü; toplum biliminin öncüsü.</li></ul>" },
      { x: 50, y: 78, ad: "Şadırvan", panel:
        "<h3>Kök ve kalıp</h3><p>Arapçada sözcüklerin çoğu üç ünsüzlü bir <b>kök</b>ten, kalıplara (<i>vezin</i>) dökülerek türer; tıpkı şadırvanın suyunun aynı kaynaktan farklı oluklara akması gibi.</p>" +
        "<table class=\"pn-tablo\"><tr><th>K-T-B (yazmak)</th><th>Anlam</th></tr><tr><td>kataba</td><td>yazdı</td></tr><tr><td>kâtib</td><td>yazan, kâtip</td></tr><tr><td>kitâb</td><td>kitap</td></tr><tr><td>mektûb</td><td>yazılmış, mektup</td></tr><tr><td>mektebe</td><td>kütüphane</td></tr><tr><td>mekteb</td><td>okul</td></tr></table>" +
        "<p>Türkçedeki binlerce sözcük (ilim, âlim, malum, muallim: hepsi <b>ʿ-L-M</b> kökünden) bu sistemin izini taşır.</p>" }
    ],
    sozler: [
      { metin: "ينبغي لنا أن لا نستحيي من استحسان الحق واقتناء الحق من أين أتى", dil: "ar", ceviri: "Hakikati takdir etmekten ve nereden gelirse gelsin onu edinmekten utanmamalıyız.", kaynak: "Kindî · İlk Felsefe Üzerine" }
    ]
  });

  /* ════════ EPİSTEMOLOJİ: kavanozdaki beyin, durmuş saat ════════ */
  ek("epistemoloji", {
    cizim: '<g transform="translate(190 520)"><ellipse cx="0" cy="92" rx="52" ry="10" fill="#000" opacity=".4"/><rect x="-44" y="-10" width="88" height="100" rx="14" fill="#9fd0c8" opacity=".22" stroke="#cfe8e0" stroke-opacity=".5" stroke-width="2"/>' +
      '<rect x="-48" y="-22" width="96" height="16" rx="4" fill="#6a5a4a"/><path d="M-26 40c-6-26 14-40 26-32c12-10 34 4 28 26c8 14-4 30-18 26c-8 10-26 8-30-4c-12 2-16-12-6-16Z" fill="#e8a8a0" opacity=".85"/>' +
      '<path d="M-14 30c6-6 14 2 20-4M4 46c6 4 12-2 16 2" stroke="#b86a68" stroke-width="2" fill="none"/><path d="M0 70V90M-8 90h16" stroke="#8ac8d8" stroke-width="2"/><path d="M40 20c30 0 40 -40 70 -40" stroke="#6ab0c8" stroke-width="2" fill="none" stroke-dasharray="4 4"/></g>' +
      '<g transform="translate(1430 400)"><circle r="44" fill="#2a1c12" stroke="#b08a5a" stroke-width="5"/><circle r="36" fill="#e8d8b8" opacity=".9"/>' +
      [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(function (a) { return '<path d="M0 -32V-27" stroke="#4a3a2a" stroke-width="2" transform="rotate(' + a + ')"/>'; }).join("") +
      '<path d="M0 0L0 -22" stroke="#2a1c12" stroke-width="3" stroke-linecap="round" transform="rotate(60)"/><path d="M0 0L0 -28" stroke="#2a1c12" stroke-width="2" stroke-linecap="round" transform="rotate(-2)"/><circle r="3" fill="#2a1c12"/></g>',
    eserler: [
      { x: 12, y: 62, ad: "Kavanozdaki beyin", panel:
        "<h3>Radikal kuşku</h3><p>Descartes <i>Meditationes</i>'te (1641) her şeyin bir aldatıcı cin (<i>genius malignus</i>) tarafından uydurulduğunu varsayar. Hilary Putnam 1981'de bunu güncelledi: ya bir bilim insanı beynini bir kavanoza koyup ona bilgisayarla deneyimler besliyorsa?</p>" +
        "<p>Kuşkucu argümanın iskeleti: (1) Kavanozdaki beyin olmadığını bilmiyorsun. (2) Bunu bilmiyorsan elinin olduğunu da bilmiyorsun. (3) Öyleyse elinin olduğunu bilmiyorsun.</p>" +
        "<h4>Yanıtlar</h4><ul><li><b>Moore</b>: “İşte bir el”; sağduyu kuşkucu öncülden daha kesindir.</li><li><b>Putnam</b>: kavanozdaki beynin “beyin” sözcüğü gerçek beyinlere gönderme yapamaz; tez kendini çürütür.</li><li><b>Bağlamcılık</b>: “bilmek”in ölçütü konuşma bağlamına göre yükselir.</li></ul>" },
      { x: 89, y: 44, ad: "Durmuş saat", panel:
        "<h3>Gettier sorunu</h3><p>Bilgiye Platon'dan beri “gerekçelendirilmiş doğru inanç” denirdi. Edmund Gettier 1963'te üç sayfalık bir makaleyle buna karşı örnekler verdi.</p>" +
        "<p>Russell'ın örneği: Saate bakıyorsun, 2'yi gösteriyor; “saat 2” diye inanıyorsun. Saat aslında dün durmuş, ama şans eseri gerçekten saat 2. İnancın doğru ve gerekçeli, ama bilgi mi?</p>" +
        "<p>Sonraki altmış yıl “dördüncü koşul” arayışıyla geçti: nedensel bağ, güvenilir süreç, hassasiyet, erdem epistemolojisi. Timothy Williamson ise bilgiyi tanımlanamaz bir temel kavram sayar: <i>knowledge first</i>.</p>" }
    ]
  });

  /* ════════ METAFİZİK: Theseus'un gemisi, kum saati ════════ */
  ek("metafizik", {
    cizim: '<g transform="translate(822 720)" opacity=".92"><path d="M-80 0H80L60 30H-60Z" fill="#6a4a2e" stroke="#d8c08a" stroke-width="1.5"/><path d="M-60 30H-20V0M-20 30H20V0M20 30H60" stroke="#e8d8a8" stroke-width="1" fill="none" stroke-dasharray="3 3"/>' +
      '<path d="M0 0V-110" stroke="#d8c08a" stroke-width="3"/><path d="M4 -104C40 -80 44 -40 6 -12Z" fill="#efe2c0" opacity=".9"/><path d="M-4 -96C-30 -72 -32 -40 -4 -18Z" fill="#c8b890" opacity=".85"/>' +
      '<path d="M-100 40q20 -8 40 0t40 0t40 0t40 0t40 0" stroke="#9fb8ff" stroke-width="2" fill="none" opacity=".5"/></g>' +
      '<g transform="translate(1140 340)"><path d="M-30 -60H30M-30 60H30" stroke="#d8c08a" stroke-width="5" stroke-linecap="round"/><path d="M-24 -56C-24 -10 -4 -8 -2 0C-4 8 -24 10 -24 56H24C24 10 4 8 2 0C4 -8 24 -10 24 -56Z" fill="#c8d0ff" opacity=".18" stroke="#c8d0ff" stroke-opacity=".6" stroke-width="2"/>' +
      '<path d="M-16 -40C-10 -20 -2 -8 0 -2C2 -8 10 -20 16 -40Z" fill="#e8c878"/><path d="M-20 54C-14 30 -4 26 0 24C4 26 14 30 20 54Z" fill="#e8c878"/><path d="M0 -2V24" stroke="#e8c878" stroke-width="1.5" class="kum-akis"/></g>',
    eserler: [
      { x: 51, y: 78, ad: "Theseus'un gemisi", panel:
        "<h3>Özdeşlik ve zaman</h3><p>Plutarkhos anlatır: Atinalılar Theseus'un gemisini yüzyıllarca korudu, çürüyen her tahtayı yenisiyle değiştirdi. Bütün tahtaları değişmiş gemi hâlâ aynı gemi mi? Hobbes soruyu keskinleştirir: eski tahtalar toplanıp ikinci bir gemi yapılırsa hangisi Theseus'unkidir?</p>" +
        "<h4>Olası yanıtlar</h4><ul><li><b>Süreklilik</b>: kademeli değişim özdeşliği korur.</li><li><b>Mereolojik özcülük</b>: parçası değişen şey artık aynı şey değildir.</li><li><b>Dört boyutçuluk</b>: nesne zamana yayılmış bir “solucan”dır; gemiler zamansal kesitleriyle örtüşür.</li><li><b>Uzlaşımcılık</b>: “aynı gemi” sorusunun yanıtını dilsel pratiklerimiz belirler.</li></ul>" +
        "<p class=\"pn-not\">Aynı soru kişisel özdeşlik için de sorulur: Locke belleği, Parfit ise psikolojik sürekliliği öne çıkarır ve “özdeşlik önemli olan değildir” der.</p>" },
      { x: 71, y: 38, ad: "Kum saati", panel:
        "<h3>Zamanın metafiziği</h3><p>McTaggart 1908'de zamanın gerçek olmadığını savundu ve iki diziyi ayırdı:</p><ul><li><b>A-dizisi</b>: geçmiş, şimdi, gelecek; olaylar “akar”.</li><li><b>B-dizisi</b>: önce ve sonra; sabit ilişkiler.</li></ul>" +
        "<p><b>Şimdicilik</b> yalnızca şimdiki olanın var olduğunu söyler; <b>ebedicilik</b> (blok evren) geçmiş, şimdi ve geleceğin eşit derecede var olduğunu. Einstein'ın görelilik kuramı eşzamanlılığı gözlemciye bağladığından ebediciliğe destek sayılır.</p>" +
        "<p>Augustinus'un itirafı hâlâ geçerli: “Kimse sormazsa bilirim; soran birine açıklamak istersem bilmem.” (<i>Confessiones</i> XI, 14)</p>" }
    ]
  });

  /* ════════ ZİHİN: ayna, Leibniz'in değirmeni ════════ */
  ek("zihin", {
    cizim: '<g transform="translate(560 700)"><ellipse cx="0" cy="0" rx="34" ry="48" fill="#1a2440" stroke="#b8c8ff" stroke-width="4"/><ellipse cx="-8" cy="-14" rx="12" ry="22" fill="#e8f0ff" opacity=".18"/><path d="M0 48V90M-24 90H24" stroke="#8a9ac8" stroke-width="4"/></g>' +
      '<g transform="translate(1180 300)" opacity=".85"><path d="M-22 60L-14 -10H14L22 60Z" fill="#2a3458" stroke="#8aa0e0" stroke-width="2"/><path d="M-16 -14L0 -30L16 -14Z" fill="#3a4470" stroke="#8aa0e0" stroke-width="2"/>' +
      '<g class="don" style="--s:14s;transform-origin:0 -4px"><path d="M0 -4L0 -54M0 -4L50 -4M0 -4L0 46M0 -4L-50 -4" stroke="#b8c8ff" stroke-width="3"/><path d="M0 -54h10v28h-10ZM50 -4v10h-28v-10ZM0 46h-10v-28h10ZM-50 -4v-10h28v10Z" fill="#6a7ab0" opacity=".7"/></g></g>',
    eserler: [
      { x: 35, y: 78, ad: "Ayna", panel:
        "<h3>Öz-bilinç ve ayna</h3><p>Gordon Gallup 1970'te şempanzelerin alnına boya sürüp onları aynaya baktırdı: lekeye dokundular, yani aynadakinin kendileri olduğunu anladılar. Ayna testini geçenler arasında orangutanlar, yunuslar, filler ve saksağanlar var; insan bebekleri yaklaşık 18 aylıkken geçer.</p>" +
        "<p>Ama kendini aynada tanımak, kendinin farkında olmakla aynı mı? Filozoflar <b>fenomenal bilinç</b> (bir şeyin nasıl hissettirdiği) ile <b>öz-bilinç</b> (kendini düşüncenin nesnesi yapabilme) arasında ayrım yapar.</p>" +
        "<p class=\"pn-not\">Lacan'ın “ayna evresi”: çocuk bütünlüklü imgesini aynada bulur ve benliğini bir yabancılaşma üzerinden kurar.</p>" },
      { x: 74, y: 33, ad: "Değirmen", panel:
        "<h3>Leibniz'in değirmeni</h3><p><i>Monadoloji</i> §17 (1714): Düşünen bir makineyi bir değirmene girebilecek kadar büyüttüğümüzü varsayalım. İçeride birbirini iten parçalardan başka bir şey görmeyiz; algıyı açıklayacak hiçbir şey bulamayız.</p>" +
        "<p>Argüman bugünkü <b>açıklama boşluğu</b> (Levine, 1983) ve <b>bilincin zor sorunu</b> (Chalmers, 1995) tartışmalarının atasıdır: nöronların işleyişini tümüyle bilsek bile öznel deneyimin neden var olduğu açık kalır mı?</p>" +
        "<div class=\"pn-etiketler\"><span>Monadoloji</span><span>qualia</span><span>zor sorun</span><span>işlevselcilik</span></div>" }
    ]
  });

  /* ════════ BİYOLOJİ: arı kovanı, ispinoz ════════ */
  ek("biyoloji", {
    cizim: '<g transform="translate(220 540)"><path d="M0 -60V-30" stroke="#4a3a22" stroke-width="3"/><ellipse cx="0" cy="0" rx="34" ry="40" fill="#c8963a"/>' +
      [-24, -8, 8, 24].map(function (y) { return '<path d="M-' + (32 - Math.abs(y) / 3) + " " + y + "H" + (32 - Math.abs(y) / 3) + '" stroke="#8a5a1e" stroke-width="3"/>'; }).join("") +
      '<ellipse cx="0" cy="28" rx="7" ry="5" fill="#3a2410"/>' +
      [[40, -20], [52, 10], [-44, 6]].map(function (b, i) { return '<g class="asili" style="--s:' + (1.4 + i * 0.3) + 's;--a:14deg"><ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="4" ry="3" fill="#f0c040"/><ellipse cx="' + b[0] + '" cy="' + (b[1] - 3) + '" rx="3" ry="2" fill="#fff" opacity=".7"/></g>'; }).join("") + "</g>" +
      '<g transform="translate(640 522)"><path d="M-40 16H40" stroke="#4a3220" stroke-width="5" stroke-linecap="round"/><g class="sallan" style="--s:3s;--a:4deg"><ellipse cx="0" cy="0" rx="16" ry="11" fill="#7a5a3a"/><circle cx="12" cy="-8" r="8" fill="#6a4a2e"/><path d="M19 -9l9 3l-9 2Z" fill="#3a2a1a"/><circle cx="14" cy="-10" r="1.6" fill="#111"/><path d="M-14 2l-14 6l14 0Z" fill="#5a4028"/><path d="M-2 10v6M4 10v6" stroke="#3a2a1a" stroke-width="2"/></g></g>',
    eserler: [
      { x: 14, y: 60, ad: "Arı kovanı", panel:
        "<h3>Toplumsal böcekler</h3><p>Bir bal arısı kovanında yaklaşık 20.000–80.000 işçi, bir kraliçe ve birkaç yüz erkek arı yaşar. Karl von Frisch arıların yiyecek kaynağının yönünü ve uzaklığını <b>salınım dansı</b> ile birbirine anlattığını gösterdi (Nobel, 1973): dansın açısı Güneş'e göre yönü, süresi uzaklığı kodlar.</p>" +
        "<p>Darwin'i düşündüren bir soru: kısır işçiler neden var? W. D. Hamilton'ın <b>akraba seçilimi</b> kuramı (1964) yanıtlar: kız kardeşlere yardım etmek de kendi genlerini aktarmanın bir yoludur.</p>" +
        "<p class=\"pn-not\">Tozlaşmayla bitkilerin üremesini sağlayan arılar, besin üretiminin önemli bir bölümünün dayandığı ekosistem hizmetinin taşıyıcısıdır.</p>" },
      { x: 40, y: 58, ad: "İspinoz", panel:
        "<h3>Darwin'in ispinozları</h3><p>Darwin Galápagos'tan (1835) ispinoz örnekleri getirdi; kuşbilimci John Gould bunların birbirine yakın ayrı türler olduğunu gösterdi. Adadan adaya gagalar farklıydı: tohum kıranlar kalın, böcek toplayanlar ince.</p>" +
        "<p>Peter ve Rosemary Grant 1973'ten itibaren Daphne Major adasında kırk yıl ispinozları ölçtü: 1977 kuraklığından sonra yalnızca büyük, sert tohumlar kaldı ve bir kuşakta ortalama gaga derinliği ölçülebilir biçimde arttı. Evrim, gözümüzün önünde.</p>" +
        "<div class=\"pn-etiketler\"><span>doğal seçilim</span><span>uyumsal açılım</span><span>türleşme</span></div>" }
    ]
  });

  /* ════════ FİZİK: Newton'un elması, mıknatıs ════════ */
  ek("fizik", {
    cizim: '<g transform="translate(420 440)"><g class="asili" style="--s:3.2s;--a:6deg"><path d="M0 -40V-14" stroke="#5a4028" stroke-width="3"/><path d="M0 -22c6-8 16-8 20-2c-8 2-14 4-20 2Z" fill="#5a9a3a"/><circle cx="-7" cy="0" r="15" fill="#c83a2a"/><circle cx="7" cy="0" r="15" fill="#c83a2a"/><ellipse cx="-6" cy="-6" rx="5" ry="3" fill="#fff" opacity=".35"/></g>' +
      '<path d="M0 30V70" stroke="#e8c870" stroke-width="2" stroke-dasharray="4 5" opacity=".7"/><path d="M-6 62L0 72L6 62" fill="none" stroke="#e8c870" stroke-width="2" opacity=".7"/></g>' +
      '<g transform="translate(1000 752)"><path d="M-30 0V-40A30 30 0 0 1 30 -40V0H14V-40A14 14 0 0 0 -14 -40V0Z" fill="#b83030"/><rect x="-30" y="-8" width="16" height="10" fill="#d8d8e0"/><rect x="14" y="-8" width="16" height="10" fill="#d8d8e0"/>' +
      [-70, -50, 50, 70].map(function (x, i) { return '<path d="M' + x + ' 6q' + (x < 0 ? 10 : -10) + ' -20 0 -40" stroke="#6a6a7a" stroke-width="1.5" fill="none" opacity=".6"/>'; }).join("") + "</g>",
    eserler: [
      { x: 26, y: 49, ad: "Elma", panel:
        "<h3>Evrensel çekim</h3><p>Newton'un kendi anlatısını genç dostu William Stukeley aktarır (1752): Woolsthorpe'daki bahçede düşen bir elma, onu Ay'ı yörüngesinde tutan kuvvetin aynı kuvvet olup olmadığını düşünmeye yöneltti.</p>" +
        "<p><b>F = G·m₁m₂ / r²</b>: iki kütle arasındaki çekim kütlelerin çarpımıyla doğru, uzaklığın karesiyle ters orantılıdır. Aynı yasa elmayı, Ay'ı, gelgitleri ve kuyrukluyıldızları açıklar; Halley bu sayede 1758 dönüşünü önceden bildirdi.</p>" +
        "<p>Einstein'ın genel göreliliği (1915) çekimi bir kuvvet olarak değil, kütle-enerjinin <b>uzay-zamanı bükmesi</b> olarak anlatır. Newton'un yasası güçlü alanlar ve yüksek hızlar dışında hâlâ mükemmel bir yaklaşımdır.</p>" },
      { x: 62, y: 84, ad: "Mıknatıs", panel:
        "<h3>Elektromanyetizma</h3><p>Manyetit taşları Antik Çağ'dan beri bilinir; “mıknatıs”ın Yunancası Manisa (Magnesia) bölgesinin adını taşır. William Gilbert <i>De Magnete</i>'de (1600) Dünya'nın dev bir mıknatıs olduğunu savundu.</p>" +
        "<ul><li><b>1820</b>: Ørsted, akım taşıyan telin pusula iğnesini saptırdığını gördü.</li><li><b>1831</b>: Faraday, değişen manyetik alanın akım ürettiğini buldu (indüksiyon); jeneratörlerin ilkesi.</li><li><b>1865</b>: Maxwell dört denklemde elektriği, manyetizmayı ve ışığı birleştirdi: ışık bir elektromanyetik dalgadır.</li></ul>" }
    ]
  });

  /* ════════ GEOMETRİ: Thales'in gemisi, Hypatia'nın sütunu ════════ */
  ek("geometri", {
    cizim: '<g transform="translate(1000 430)" opacity=".9"><g class="yuz" style="--s:6s;--d:-1s"><path d="M-40 0H40L28 14H-28Z" fill="#6a4a2e"/><path d="M0 0V-60" stroke="#5a3a22" stroke-width="3"/><path d="M3 -56L34 -8H3Z" fill="#f4ead2"/><path d="M-3 -50L-26 -8H-3Z" fill="#e8dcc0"/></g></g>' +
      '<path d="M1000 430L1350 700" stroke="#c89a3a" stroke-width="1.5" stroke-dasharray="6 6" opacity=".5"/>',
    eserler: [
      { x: 62, y: 46, ad: "Uzaktaki gemi", panel:
        "<h3>Thales ve benzer üçgenler</h3><p>Miletli Thales (MÖ ~624–546) geleneğe göre geometriyi Mısır'dan Yunanistan'a getirdi. Eudemos'a göre denizdeki bir geminin kıyıya uzaklığını, iki açısı ve arasındaki kenarı eşit üçgenlerin eş olduğu ilkesiyle hesapladı.</p>" +
        "<p>Piramidin yüksekliğini de gölgesinden ölçtüğü söylenir: kendi gölgesinin boyuna eşit olduğu anda piramidin gölgesini ölçmek yeter. Benzer üçgenlerde karşılıklı kenarların oranı eşittir.</p>" +
        "<p class=\"pn-not\">Thales teoremi: bir çemberin çapını gören çevre açısı dik açıdır. İspatlanmış ilk teoremlerden biri olarak anılır.</p>" },
      { x: 7, y: 46, ad: "Sütun", panel:
        "<h3>İskenderiye'nin matematikçileri</h3><ul><li><b>Öklid</b> (MÖ ~300): <i>Elementler</i>; 13 kitap, 5 postulat, 465 önerme. Yirmi yüzyıl boyunca en çok okunan ders kitabı.</li>" +
        "<li><b>Eratosthenes</b> (MÖ ~276–194): Syene'de öğle güneşi kuyunun dibini aydınlatırken İskenderiye'de gölge 7,2° düşer; Dünya'nın çevresini şaşırtıcı bir yakınlıkla hesapladı.</li>" +
        "<li><b>Apollonios</b> (Pergeli): <i>Konikler</i>; elips, parabol ve hiperbolün adları ondan.</li>" +
        "<li><b>Hypatia</b> (~355–415): Diophantos ve Apollonios üzerine yorumlar yazan matematikçi ve Yeni Platoncu filozof; 415'te bir güruh tarafından öldürüldü.</li></ul>" }
    ]
  });

  /* ════════ COĞRAFYA: martılar, baharat sandığı ════════ */
  ek("cografya", {
    cizim: '<g stroke="#f4f0e8" stroke-width="3" fill="none" stroke-linecap="round">' +
      [[1120, 240, 1], [1180, 270, .8], [1240, 230, .9]].map(function (m, i) { return '<g class="sallan" style="--s:' + (2 + i * 0.4) + 's;--a:5deg"><path transform="translate(' + m[0] + " " + m[1] + ") scale(" + m[2] + ')" d="M-20 0q10 -12 20 0q10 -12 20 0"/></g>'; }).join("") + "</g>" +
      '<g transform="translate(1385 742)"><rect x="-44" y="-30" width="88" height="54" fill="#8a5a2e" stroke="#4a2e16" stroke-width="3"/><path d="M-44 -12H44M-44 6H44" stroke="#5a3a1e" stroke-width="2"/>' +
      '<ellipse cx="-16" cy="-32" rx="18" ry="7" fill="#c86a2a"/><ellipse cx="14" cy="-34" rx="16" ry="7" fill="#d8a83a"/><ellipse cx="0" cy="-38" rx="10" ry="5" fill="#6a2a1a"/><text x="0" y="12" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#e8d0a0">SMYRNA</text></g>',
    eserler: [
      { x: 74, y: 28, ad: "Martılar", panel:
        "<h3>Rüzgârlar ve iklim</h3><p>Yelkenli çağında coğrafya rüzgâr bilgisiydi. <b>Alize rüzgârları</b> ekvatorun iki yanında düzenli eser; Kolomb 1492'de Kanarya Adaları'ndan bunlarla batıya gitti, dönüşte daha kuzeydeki batı rüzgârlarını kullandı.</p>" +
        "<p>George Hadley 1735'te alizeleri ekvatorda yükselen sıcak havanın ve Dünya'nın dönüşünün birlikte etkisiyle açıkladı; bugün <b>Hadley hücresi</b> denir. Coriolis etkisi kuzey yarımkürede hareket eden havayı sağa saptırır.</p>" +
        "<p>Köppen iklim sınıflandırması (1884'ten itibaren) dünyayı sıcaklık ve yağışa göre beş ana kuşağa ayırır; Akdeniz iklimi (<i>Csa</i>) sıcak kuru yaz, ılık yağışlı kış demektir.</p>" },
      { x: 87, y: 82, ad: "Baharat sandığı", panel:
        "<h3>Ticaret yolları</h3><p>Karabiber, tarçın, karanfil ve muskat Hint Okyanusu'ndan Kızıldeniz ya da Basra Körfezi üzerinden Akdeniz limanlarına ulaşırdı. İpek Yolu karada Çin'i Anadolu'ya bağladı.</p>" +
        "<p>Vasco da Gama'nın 1498'de Ümit Burnu'nu dolaşıp Hindistan'a varması ticaret coğrafyasını değiştirdi. Portolan haritalar bu dünyanın kıyı kıyı ölçülmüş bilgisini taşır.</p>" +
        "<p class=\"pn-not\">Sandıktaki İzmir (Smyrna), 17.–19. yüzyıllarda Levant ticaretinin en işlek limanlarından biriydi.</p>" }
    ]
  });

  /* ════════ FİLM: zoetrop, klaket ════════ */
  ek("film", {
    cizim: '<g transform="translate(250 620)"><path d="M-10 60L0 20L10 60Z" fill="#3a2a1e"/><ellipse cx="0" cy="20" rx="46" ry="12" fill="#2a1e16"/><path d="M-46 -30V20A46 12 0 0 0 46 20V-30" fill="#5a3a24"/>' +
      '<g class="don" style="--s:3s;transform-origin:0 -5px">' + [-36, -18, 0, 18, 36].map(function (x) { return '<rect x="' + (x - 3) + '" y="-24" width="6" height="14" fill="#ffd89a" opacity=".85"/>'; }).join("") + "</g>" +
      '<ellipse cx="0" cy="-30" rx="46" ry="12" fill="#6a4a2e" stroke="#c8a060" stroke-width="2"/></g>' +
      '<g transform="translate(1430 610) rotate(-6)"><rect x="-44" y="-10" width="88" height="56" fill="#1a1a1a" stroke="#ddd" stroke-width="1.5"/><path d="M-44 6H44M-44 26H44" stroke="#888"/>' +
      '<g transform="rotate(-14 -44 -10)"><rect x="-44" y="-26" width="88" height="16" fill="#1a1a1a"/>' + [-40, -22, -4, 14, 32].map(function (x) { return '<path d="M' + x + ' -26l10 0 -6 16h-10Z" fill="#f0f0f0"/>'; }).join("") + "</g>" +
      '<text x="0" y="20" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#ddd">SAHNE 1 · ÇEKİM 3</text></g>',
    eserler: [
      { x: 16, y: 69, ad: "Zoetrop", panel:
        "<h3>Hareketin yanılsaması</h3><p>Sinemadan önce oyuncaklar vardı: <b>fenakistiskop</b> (Plateau, 1832), <b>zoetrop</b> (Horner, 1834), <b>praksinoskop</b> (Reynaud, 1877). Dönen silindirin yarıklarından bakınca art arda çizilmiş kareler tek bir hareketli imgeye dönüşür.</p>" +
        "<p>Eadweard Muybridge 1878'de on iki kamerayla dörtnala koşan bir atı fotoğrafladı: dört ayağın da aynı anda yerden kesildiği an vardı. Ardından Edison'un kinetoskobu ve 28 Aralık 1895'te Lumière kardeşlerin Paris'teki ilk ücretli gösterimi geldi.</p>" +
        "<p class=\"pn-not\">Hareket algısı için saniyede yaklaşık 16 kare yeter; sesli sinema 24 kareyi standart yaptı.</p>" },
      { x: 89, y: 67, ad: "Klaket", panel:
        "<h3>Kurgu: Kuleşov etkisi</h3><p>Klaket, ayrı kaydedilen görüntü ile sesi eşlemek için vurulur. Ama sinemanın asıl dili, çekimlerin birbirine eklenmesidir.</p>" +
        "<p>Lev Kuleşov 1920'lerde aynı ifadesiz oyuncu yüzünü bir çorba tabağı, tabuttaki bir çocuk ve divanda uzanan bir kadınla art arda gösterdi. İzleyiciler oyuncuda sırasıyla açlık, keder ve arzu gördüklerini söyledi.</p>" +
        "<p>Eisenstein bunu <b>çarpışma montajı</b>na dönüştürdü: iki çekimin toplamı, ikisinde de olmayan üçüncü bir anlam üretir. Bazin ise kesmeden süren <b>uzun çekim</b>i savundu: gerçekliğin belirsizliğine saygı.</p>" }
    ]
  });

  /* ════════ ASTRONOMİ: panorama; sağa kayınca kuyrukluyıldız, Andromeda ve Uluğ Bey'in sekstantı ════════ */
  var r = S.h.rnd(77), yz = "";
  for (var i = 0; i < 160; i++) yz += '<circle class="yp" cx="' + (1600 + r() * 800).toFixed(0) + '" cy="' + (r() * 620).toFixed(0) + '" r="' + (0.4 + r() * 1.2).toFixed(1) + '" fill="#f0f0ff" style="animation-duration:' + (2 + r() * 4).toFixed(1) + "s;animation-delay:-" + (r() * 4).toFixed(1) + 's"/>';
  ek("astronomi", {
    genislik: 1.5,
    genisCizim: yz +
      '<g transform="translate(2210 250) rotate(-30)"><ellipse rx="110" ry="30" fill="#c8b8ff" opacity=".12"/><ellipse rx="64" ry="16" fill="#e8dcff" opacity=".2"/><ellipse rx="16" ry="6" fill="#fff4e0" opacity=".7"/></g>' +
      '<g transform="translate(1880 180) rotate(24)"><path d="M0 0L-240 -40L-240 40Z" fill="url(#oKy)"/><circle r="7" fill="#f4faff"/><circle r="22" fill="#cfe8ff" opacity=".2"/></g>' +
      '<defs><linearGradient id="oKy" x1="1" x2="0"><stop offset="0" stop-color="#cfe8ff" stop-opacity=".6"/><stop offset="1" stop-color="#cfe8ff" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="M1600 590C1700 580 1820 610 1940 640C2060 670 2200 650 2400 620V900H1600Z" fill="#070a14"/>' +
      '<g transform="translate(2020 640)"><path d="M-120 0A120 120 0 0 1 0 -120V0Z" fill="#20283c"/><path d="M-110 0A110 110 0 0 1 0 -110" fill="none" stroke="#c8b070" stroke-width="3"/><path d="M-96 0A96 96 0 0 1 0 -96" fill="none" stroke="#8a7a50" stroke-width="2" stroke-dasharray="3 6"/>' +
      '<rect x="-4" y="-130" width="130" height="130" fill="#1a2030"/><path d="M-130 0H130" stroke="#3a4460" stroke-width="4"/><rect x="30" y="-60" width="18" height="24" fill="#ffcc70" opacity=".75"/><rect x="70" y="-60" width="18" height="24" fill="#ffcc70" opacity=".5"/><path d="M-4 -130L60 -170L126 -130Z" fill="#2a3450"/></g>' +
      '<rect x="1600" y="880" width="800" height="20" fill="#04060c"/>',
    eserler: [
      { x: 117, y: 20, ad: "Kuyrukluyıldız", panel:
        "<h3>Kuyrukluyıldızlar</h3><p>Buz, toz ve kayaçtan “kirli kartopları”. Güneş'e yaklaştıkça buzları buharlaşır; Güneş rüzgârı kuyruğu her zaman Güneş'in tersine doğru iter, yani kuyruk kuyrukluyıldızın gidiş yönünü değil Güneş'in yönünü gösterir.</p>" +
        "<p>Edmond Halley, 1531, 1607 ve 1682'de görülenlerin aynı cisim olduğunu Newton'un yasalarıyla hesapladı ve 1758'de döneceğini bildirdi. Öldükten sonra, tam vaktinde döndü. Halley kuyrukluyıldızı en son 1986'da geldi; bir sonraki dönüşü 2061.</p>" +
        "<p class=\"pn-not\">Rosetta sondası 2014'te 67P kuyrukluyıldızının yörüngesine girdi; Philae iniş aracı bir kuyrukluyıldızın yüzeyine konan ilk araç oldu.</p>" },
      { x: 138, y: 28, ad: "Andromeda", panel:
        "<h3>Andromeda Galaksisi</h3><p>Çıplak gözle görülebilen en uzak nesnelerden biri: yaklaşık 2,5 milyon ışık yılı. Sûfî (Abdurrahman es-Sûfî) 964'teki <i>Kitâbü Suveri'l-Kevâkibi's-Sâbite</i>'de onu “küçük bulut” olarak kaydetti.</p>" +
        "<p>1923'te Edwin Hubble, Andromeda'daki bir Sefeid değişken yıldızın uzaklığını ölçerek onun Samanyolu'nun dışında, ayrı bir galaksi olduğunu gösterdi. Evren bir anda milyonlarca kat büyüdü.</p>" +
        "<p>Andromeda bize saniyede yaklaşık 110 km hızla yaklaşıyor; yaklaşık 4–5 milyar yıl sonra Samanyolu ile birleşmesi bekleniyor.</p>" },
      { x: 126, y: 66, ad: "Semerkant", panel:
        "<h3>Uluğ Bey Gözlemevi</h3><p>Timur'un torunu Uluğ Bey 1420'lerde Semerkant'ta bir medrese ve üç katlı bir gözlemevi kurdu. Gözlemevinin kalbi, kayaya oyulmuş yaklaşık 40 metre yarıçaplı dev bir <b>Fahrî sekstant</b>ıydı: yay ne kadar büyükse ölçüm o kadar hassastı.</p>" +
        "<ul><li><b>Zîc-i Uluğ Bey</b> (Zîc-i Cedîd-i Sultânî): 1.018 yıldızın konumu; Ptolemaios'tan sonra ilk bağımsız büyük yıldız kataloğu.</li><li>Yıldız yılının uzunluğunu 365 gün 6 saat 10 dakika 8 saniye olarak ölçtü (gerçeğinden yaklaşık bir dakika fazla).</li><li>Ekibinde Kadızâde-i Rûmî ve Gıyâseddin Cemşîd el-Kâşî vardı; Ali Kuşçu, Uluğ Bey'in ölümünden sonra İstanbul'a gelip Ayasofya'da ders verdi.</li></ul>" +
        "<p class=\"pn-not\">Gözlemevi 1449'da Uluğ Bey'in öldürülmesinden sonra yıkıldı; kalıntıları 1908'de Vasiliy Vyatkin tarafından bulundu.</p>" }
    ]
  });
})();
