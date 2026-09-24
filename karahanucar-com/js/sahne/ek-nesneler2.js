/* Sonradan açılan odalara ek parıldayan nesneler (S.ekle: js/sahne/ek-nesneler.js). Çizimler yalnızca gerektiğinde eklenir. */
(function () {
  var S = window.SAHNE; if (!S || !S.ekle) return;
  var ek = S.ekle;

  ek("ft-antik", {
    cizim: '<g transform="translate(720 380)"><ellipse rx="16" ry="21" fill="#8a7a5a"/><circle cx="-6" cy="-8" r="5.5" fill="#f0e0a0"/><circle cx="6" cy="-8" r="5.5" fill="#f0e0a0"/><circle cx="-6" cy="-8" r="2.4" fill="#1a1008"/><circle cx="6" cy="-8" r="2.4" fill="#1a1008"/><path d="M-2 -2L0 3L2 -2Z" fill="#d8a040"/><path d="M-14 -20L-9 -13M14 -20L9 -13" stroke="#8a7a5a" stroke-width="4"/><path d="M-6 20v5M6 20v5" stroke="#c8a060" stroke-width="2"/></g>',
    eserler: [
      { x: 45, y: 42, ad: "Baykuş", panel: '<h3>Athena’nın baykuşu</h3><p>Baykuş, bilgelik tanrıçası ve kentin koruyucusu Athena’nın simgesiydi; Atina’nın gümüş drahmilerinin (tetradrahmi) bir yüzünde Athena, öteki yüzünde baykuş vardı. Bu sikkeler Laurion gümüş madenlerinden basıldı ve Akdeniz’in her yerinde geçerliydi.</p><p>“Atina’ya baykuş götürmek” (<i>glauk’ eis Athēnas</i>) deyimi, bir şeyin zaten bol olduğu yere onu taşımak anlamına gelirdi: Aristophanes’in <i>Kuşlar</i>’ında geçer.</p><p>Hegel’in “Minerva’nın baykuşu” imgesi bu simgeyi felsefeye taşır: felsefe bir çağ biterken, geriye bakarak anlar.</p>' },
      { x: 74, y: 40, ad: "Uzak tapınak", panel: '<h3>Perikles Atinası</h3><p>MÖ 447–432 yıllarında Akropolis’te <b>Parthenon</b> yapıldı: mimarlar İktinos ve Kallikrates, heykeller Pheidias’ın yönetiminde. Dor düzenindeki tapınak optik düzeltmelerle ünlüdür: sütunlar hafifçe şişkin, basamaklar hafifçe kavislidir.</p><p>Perikles’in yönetimindeki bu “altın çağ” aynı zamanda Delos Birliği’nin hazinesinin kullanıldığı bir imparatorluk dönemiydi. Sofistler, Sokrates, tragedya yazarları ve Herodotos aynı sokaklarda dolaştı.</p><p>Perikles’in Thukydides’te aktarılan cenaze söylevi (MÖ 431) demokratik Atina’nın kendini nasıl gördüğünü anlatır: “Güzeli sadelikle, bilgeliği yumuşaklığa kapılmadan severiz.”</p>' }
    ]
  });

  ek("ft-roma", {
    eserler: [
      { x: 31, y: 57, ad: "Tuna", panel: '<h3>İmparatorluğun sınırında</h3><p>Tuna, Roma’nın kuzey sınırıydı (<i>limes</i>). <b>Marcus Aurelius</b> (hd. 161–180) saltanatının büyük bölümünü burada, Markomanlara ve Kuadlara karşı savaşarak geçirdi. <i>Kendime Düşünceler</i>’in ilk kitabının sonunda “Kuadların ülkesinde, Granua kıyısında” yazdığı not edilir.</p><p>Aynı yıllarda imparatorluğu Antoninus vebası (büyük olasılıkla çiçek hastalığı) kasıp kavurdu. Filozof-imparator, Platon’un filozof-kral düşüne en çok yaklaşan hükümdar sayılır; ama oğlu Commodus’u varis bırakması bu tabloyu gölgeler.</p>' },
      { x: 60, y: 17, ad: "Yıldızlar", panel: '<h3>Stoacı kozmos</h3><p>Stoacılara göre evren, her şeyi içten düzenleyen bir akıl (<i>logos</i>) tarafından yönetilen canlı bir bütündür. İnsan aklı bu evrensel aklın bir parçasıdır; iyi yaşamak doğayla uyum içinde yaşamaktır.</p><p>Marcus Aurelius kendine şöyle öğütler: “Yıldızların akışını, sanki onlarla birlikte koşuyormuşsun gibi seyret” (<i>Kendime</i> VII.47). Pierre Hadot’nun “yukarıdan bakış” dediği bu Stoacı ruhsal alıştırma şudur: kendi kaygılarını evrenin ölçeğine yerleştirmek.</p><p>Seneca, Epiktetos ve Marcus Aurelius’un metinleri Rönesans’tan bugünkü bilişsel davranışçı terapiye uzanan bir etki bıraktı.</p>' }
    ]
  });

  ek("ft-ronesans", {
    eserler: [
      { x: 58, y: 42, ad: "Kule", panel: '<h3>Floransa ve Machiavelli</h3><p>Uzaktaki kule Floransa’nın yönetim merkezi <b>Palazzo della Signoria</b>’yı (Palazzo Vecchio) andırıyor. 1498’de <b>Niccolò Machiavelli</b> burada cumhuriyetin ikinci kançılaryasının sekreteri oldu; elçiliklerde Cesare Borgia’yı yakından izledi.</p><p>1512’de Mediciler geri dönünce görevinden alındı, işkence gördü ve San Casciano’daki çiftliğine çekildi. Akşamları çamurlu giysilerini çıkarıp “eskilerin sarayına” girer gibi kitaplarının başına geçtiğini yazar: <i>Prens</i> (1513) ve <i>Titus Livius Üzerine Söylevler</i> böyle doğdu.</p><p>Rönesans hümanizmi siyasette de eskilere döndü: ama Machiavelli onlardan ahlak dersi değil, gücün işleyişini öğrenmek istedi.</p>' }
    ]
  });

  ek("felsefe-tarihi", {
    cizim: '<g transform="translate(1100 800)"><ellipse rx="110" ry="26" fill="#8a7458" opacity=".85"/><ellipse rx="96" ry="21" fill="none" stroke="#e8c870" stroke-width="2"/>' + [-80, -55, -30, 0, 30, 55, 80].map(function (x) { return '<path d="M0 0L' + x + ' -' + (Math.sqrt(Math.max(0, 1 - (x * x) / 9216)) * 21).toFixed(1) + '" stroke="#e8c870" stroke-width="1.2" opacity=".7"/>'; }).join("") + '<path d="M0 0L-10 -40L10 0Z" fill="#c8a060"/><path d="M0 0L70 10" stroke="#2a1a10" stroke-width="4" opacity=".5"/></g>',
    eserler: [
      { x: 69, y: 88, ad: "Güneş saati", panel: '<h3>Felsefe tarihi nasıl yazılır?</h3><p>İlk felsefe tarihçisi sayılan <b>Aristoteles</b>, <i>Metafizik</i> A’da öncüllerini kendi dört neden kuramının eksik biçimleri olarak okur. 3. yüzyılda <b>Diogenes Laertios</b> <i>Ünlü Filozofların Yaşamları</i>’nı derler: anekdotlar, öğretiler, vasiyetler. Bugün birçok filozofu yalnızca onun sayesinde biliyoruz.</p><p><b>Hegel</b> felsefe tarihini, düşüncenin kendi kendini geliştirmesi olarak görür: her sistem hem çürütülür hem korunur (<i>Aufhebung</i>). 20. yüzyılda <b>Rorty</b> ve <b>Quentin Skinner</b> iki yaklaşımı ayırır: geçmiş filozofları bugünün tartışmalarına katılan “meslektaşlar” olarak okumak (rasyonel yeniden kuruluş) ya da kendi bağlamlarında anlamak (tarihsel yeniden kuruluş).</p>' }
    ]
  });

  ek("bilim-felsefesi", {
    cizim: '<g transform="translate(870 640)"><path d="M0 0V80" stroke="#5a3a22" stroke-width="6"/><rect x="-54" y="-70" width="108" height="72" fill="#efe2c2" stroke="#5a3a22" stroke-width="4"/><path d="M-26 -34C-26 -52 2 -54 8 -40C14 -30 8 -18 -6 -18C-20 -18 -26 -26 -26 -34Z" fill="none" stroke="#3a2a1a" stroke-width="2.5"/><path d="M-26 -38L-44 -44L-26 -30M-26 -32L-44 -30L-24 -26" stroke="#3a2a1a" stroke-width="2.5" fill="none"/><circle cx="-12" cy="-38" r="2" fill="#3a2a1a"/><path d="M8 -38L26 -40" stroke="#3a2a1a" stroke-width="2"/></g>',
    eserler: [
      { x: 54, y: 67, ad: "Ördek–tavşan", panel: '<h3>Gözlem kurama yüklüdür</h3><p>Bu çizim sola bakınca ördek, sağa bakınca tavşandır; çizgiler değişmez, gördüğümüz değişir. Wittgenstein <i>Soruşturmalar</i>’da bu “olarak görme” deneyimini inceler.</p><p><b>Norwood Russell Hanson</b> (<i>Keşif Örüntüleri</i>, 1958): Tycho Brahe ile Kepler şafakta aynı Güneş’e bakar; biri dönen bir Güneş, öteki dönen bir Dünya görür. Gözlem kuramdan bağımsız, saf bir veri değildir.</p><p><b>Thomas Kuhn</b> paradigma değişimini böyle bir “Gestalt dönüşümü”ne benzetir. Tartışma: kuramlar gözlemi belirliyorsa, kuramları karşılaştırmak için ortak bir zemin kalır mı? <b>Duhem–Quine</b> tezi ekler: bir deney tek bir varsayımı değil, bütün bir varsayımlar ağını sınar.</p>' }
    ]
  });

  ek("almanca", {
    cizim: '<g transform="translate(1180 560)"><path d="M0 0V150M-36 150H36" stroke="#4a2e1a" stroke-width="9"/><path d="M-70 0L70 -24V-8L-70 16Z" fill="#6a4a2a"/><path d="M-62 -4L0 -22L62 -32V-26L0 -16L-62 2Z" fill="#efe2c2"/><path d="M-50 -8L-8 -20M8 -22L50 -30" stroke="#6a5a3a" stroke-width="1.4"/><path d="M-4 -44V-26M-12 -38H4" stroke="#d9b25e" stroke-width="3"/></g>',
    eserler: [
      { x: 74, y: 60, ad: "Luther İncili", panel: '<h3>Luther ve ortak Almanca</h3><p>Martin Luther, Wartburg Kalesi’nde saklanırken Yeni Ahit’i on bir haftada Yunancadan Almancaya çevirdi (<i>Septembertestament</i>, 1522); tam İncil 1534’te çıktı. “Halkın ağzına bakmak” istedi: annenin evde, çocukların sokakta, sıradan adamın pazarda nasıl konuştuğuna.</p><p>Saksonya kançılaryasının dilini temel alan bu çeviri, matbaa sayesinde yüz binlerce nüshaya ulaştı ve lehçelere bölünmüş Almanca konuşan dünyada <b>ortak yazı dilinin</b> (Hochdeutsch) yerleşmesinde belirleyici oldu.</p><p class="pn-not">Almancada bütün adların büyük harfle başlaması da 16.–17. yüzyıl basımevlerinde yaygınlaştı.</p>' }
    ]
  });

  ek("fransizca", {
    cizim: '<g transform="translate(800 560)"><rect x="-90" y="-70" width="180" height="130" fill="#8a6a2a"/><rect x="-80" y="-60" width="160" height="110" fill="#3a3040"/><circle cx="-30" cy="-16" r="16" fill="#e8c8a8"/><path d="M-50 40C-50 0 -10 0 -10 40Z" fill="#8a3a5a"/><circle cx="30" cy="-10" r="14" fill="#d8b898"/><path d="M12 40C12 6 48 6 48 40Z" fill="#3a5a7a"/><path d="M-70 -40h140" stroke="#c8a060" opacity=".4"/><circle cx="0" cy="-44" r="8" fill="#ffe0a0" opacity=".6"/></g>',
    eserler: [
      { x: 50, y: 62, ad: "Salon tablosu", panel: '<h3>Salonlar ve Akademi</h3><p>1635’te Kardinal Richelieu <b>Académie française</b>’i kurdu: kırk “ölümsüz” üye, dilin kurallarını belirlemek ve bir sözlük hazırlamakla görevliydi (ilk baskı 1694). Fransızca bundan sonra açıklık ve kuralcılıkla anılır.</p><p>Resmî kurumların yanında <b>salonlar</b> vardı: Madame de Rambouillet’den (17. yy) Madame Geoffrin’e ve Julie de Lespinasse’a (18. yy) uzanan ev sahipleri, yazarları, bilginleri ve aristokratları sohbet için bir araya getirdi. <i>Ansiklopedi</i>’nin yazarları da bu salonlarda buluştu.</p><p>18. yüzyılda Fransızca Avrupa’nın diplomasi ve seçkin kültür diliydi: Berlin Akademisi 1784’te “Fransızcayı evrensel kılan nedir?” diye yarışma açtı; Rivarol ödülü aldı: “Açık olmayan Fransızca değildir.”</p>' }
    ]
  });

  ek("ingilizce", {
    cizim: '<g transform="translate(1300 730)"><g class="yuz" style="--s:7s"><path d="M-26 0C-26 -12 -4 -14 14 -8C20 -6 22 -12 20 -22C18 -30 24 -34 28 -30C24 -26 26 -16 28 -6C28 4 18 8 0 8C-14 8 -26 6 -26 0Z" fill="#f4f0ea"/><path d="M28 -30l6 2 -6 2Z" fill="#e8903a"/></g></g>',
    eserler: [
      { x: 81, y: 79, ad: "Kuğu", panel: '<h3>“Avon’un tatlı kuğusu” ve dünya dili</h3><p>Ben Jonson, 1623’te basılan ilk Shakespeare külliyatının (<i>First Folio</i>) başındaki şiirinde onu “Avon’un tatlı kuğusu” diye anar. Thames’teki kuğular bugün de geleneksel olarak Kraliyet’e aittir ve her yaz sayılır (<i>swan upping</i>).</p><p>Shakespeare’in döneminde İngilizce yaklaşık beş-altı milyon kişinin diliydi. Bugün ana dil ve ikinci dil olarak bir buçuk milyarı aşkın insan konuşuyor: denizcilik, sanayi devrimi, sömürgecilik, ardından ABD’nin ekonomik ve kültürel gücü.</p><p>Dilbilimciler artık tek bir İngilizceden değil, <b>“İngilizceler”</b>den söz ediyor: Hint, Nijerya, Singapur, Karayip İngilizceleri, kendi sözcükleri ve kurallarıyla.</p>' }
    ]
  });

  ek("ekoloji", {
    cizim: '<g stroke="#1a1418" stroke-width="3" fill="none" stroke-linecap="round" class="yuz" style="--s:9s">' + [[0, 0], [-30, 16], [-60, 32], [30, 16], [60, 32], [-90, 48], [90, 48]].map(function (p) { return '<path transform="translate(' + (1000 + p[0]) + " " + (290 + p[1]) + ')" d="M-10 0q5 -6 10 0q5 -6 10 0"/>'; }).join("") + "</g>",
    eserler: [
      { x: 62, y: 35, ad: "Göçmen kuşlar", panel: '<h3>Göç ve değişen iklim</h3><p>Her yıl milyarlarca kuş kıtalar arasında göç eder; Türkiye, Afrika–Avrasya göç yolunun en işlek geçitlerinden biridir: sonbaharda İstanbul Boğazı ve Belen Geçidi’nden on binlerce leylek ve yırtıcı kuş geçer.</p><p><b>Fenoloji</b>, doğadaki dönemsel olayların (çiçeklenme, göç, yumurtlama) zamanlamasını inceler. İklim ısınınca bitkiler daha erken çiçeklenir; ama uzun mesafeden gelen kuşlar hâlâ gün uzunluğuna göre yola çıkar ve yavrularını besleyecekleri böceklerin zirvesini kaçırabilir: <b>zamanlama uyumsuzluğu</b>.</p><p>Rachel Carson’ın <i>Sessiz Bahar</i>’ı (1962) böceklerle birlikte kuşların da zehirlendiği bir baharı anlatıyordu; kitap modern çevre hareketinin başlangıcı sayılır.</p>' }
    ]
  });

  ek("tip", {
    eserler: [
      { x: 53, y: 66, ad: "Yuvarlak yapı", panel: '<h3>Asklepieion’da tedavi</h3><p>Bergama Asklepieionu, Epidauros ve Kos ile birlikte antik dünyanın en ünlü sağlık merkezlerindendi. Hastalar arınma banyolarından sonra kutsal uyku salonlarında (<i>enkoimesis</i>) uyur, gördükleri düşleri rahiplere anlatırdı; tedavi bu düşlere göre belirlenirdi.</p><p>Kalıntılar arasında iki katlı yuvarlak bir yapı (<b>Telesphoros tapınağı</b> olarak da anılır) ve ona inen yaklaşık 80 metrelik bir yeraltı tüneli bulunur. Tedavide müzik, tiyatro, spor, çamur banyoları ve diyet de kullanılırdı: bugün bütüncül tıp diyebileceğimiz bir yaklaşım.</p><p>Bergamalı <b>Galenos</b> (129–216) burada gladyatörleri tedavi ederek yetişti; Roma’da imparator Marcus Aurelius’un hekimi oldu.</p>' }
    ]
  });

  ek("bilisim", {
    eserler: [
      { x: 90, y: 27, ad: "Pencere", panel: '<h3>Bletchley’nin insanları</h3><p>Savaşın sonunda Bletchley Park’ta yaklaşık 10.000 kişi çalışıyordu; bunların yaklaşık dörtte üçü kadındı. Kadınlar Bombe makinelerini işletti, şifre çözümlemesi yaptı ve dünyanın ilk programlanabilir elektronik sayısal bilgisayarlarından <b>Colossus</b>’u (1944) çalıştırdı.</p><p>Herkes 1974’e dek süren bir gizlilik yemini etmişti; birçoğu yaptığı işi ailesine bile anlatamadan öldü. Colossus makineleri savaştan sonra söküldü ve varlığı onlarca yıl bilinmedi.</p><p>Alan Turing 1952’de eşcinselliği nedeniyle mahkûm edildi ve 1954’te öldü. 2013’te ölümünden sonra kraliyet affı aldı; 2021’den beri İngiltere’nin 50 sterlinlik banknotunda onun portresi var.</p>' }
    ]
  });

  ek("mantik", {
    eserler: [
      { x: 20, y: 45, ad: "Stoa sütunları", panel: '<h3>Stoacı mantık</h3><p>Aristoteles terimlerin (“her insan”, “ölümlü”) mantığını kurdu; Stoacılar ise <b>önermelerin</b> mantığını. Khrysippos (MÖ ~279–206) “eğer”, “ve”, “ya da” bağlaçlarıyla kurulan önermeleri ve onlardan geçerli çıkarımları inceledi.</p><p>Beş “kanıtlanamayan” temel çıkarım biçimi saydı; örneğin: “Eğer gündüzse aydınlıktır; gündüzdür; öyleyse aydınlıktır” (<i>modus ponens</i>). Koşullu önermenin doğruluk koşulları üzerine Megaralı Philon’un görüşü, bugünkü maddi gerektirmeye çok yakındır.</p><p>Khrysippos’un yedi yüzü aşkın kitabından hiçbiri tam olarak günümüze ulaşmadı; bu yüzden Stoacı mantığın değeri ancak 20. yüzyılda, modern önermeler mantığı geliştikten sonra anlaşıldı.</p>' }
    ]
  });

  ek("tarih", {
    eserler: [
      { x: 81, y: 33, ad: "Tonoz", panel: '<h3>Arşivler</h3><p>Tarihçinin laboratuvarı arşivdir. İstanbul’daki <b>Cumhurbaşkanlığı Devlet Arşivleri</b> (Osmanlı Arşivi) dünyanın en zengin arşivlerinden biri sayılır: milyonlarca belge, defter ve tahrir kaydı, Balkanlardan Arabistan’a uzanan bir coğrafyanın tarihi.</p><p><b>Tahrir defterleri</b> vergi amaçlı nüfus ve üretim sayımlarıdır; köylerin hane sayısını, ekilen ürünleri, değirmenleri kaydeder. Şer’iyye sicilleri ise kadı mahkemelerinin kayıtlarıdır: miras, borç, evlilik, mahalle kavgaları. Gündelik hayat tarihinin temel kaynaklarıdır.</p><p>Arşivin kendisi de tarafsız değildir: neyin kaydedildiğine ve saklandığına, iktidar karar verir. Sessiz kalanların tarihini yazmak bu yüzden ayrı bir çaba ister.</p>' }
    ]
  });

  ek("antropoloji", {
    eserler: [
      { x: 76, y: 63, ad: "Uzak yelkenli", panel: '<h3>Lévi-Strauss ve yapısalcılık</h3><p><b>Claude Lévi-Strauss</b> 1930’larda Brezilya’da Bororo ve Nambikwara halkları arasında çalıştı; <i>Hüzünlü Dönenceler</i> (1955) şöyle başlar: “Yolculuklardan ve kâşiflerden nefret ediyorum.”</p><p>Saussure’ün dilbilimini antropolojiye taşıdı: akrabalık sistemleri ve mitler, dil gibi, zıtlıkların oluşturduğu yapılardır (çiğ / pişmiş, doğa / kültür). <i>Akrabalığın Temel Yapıları</i> (1949) evlilik kurallarını gruplar arasında bir kadın mübadelesi olarak çözümler.</p><p>Eleştirmenler, yapısalcılığın tarihi ve bireysel eylemi silikleştirdiğini söyledi; ama insan zihninin evrensel sınıflandırma eğilimi üzerine sorusu hâlâ güncel.</p>' }
    ]
  });

  ek("ekonomi", {
    eserler: [
      { x: 40, y: 45, ad: "Kanal evleri", panel: '<h3>Hollanda Altın Çağı</h3><p>17. yüzyılda küçük Hollanda Cumhuriyeti dünyanın en zengin ülkesiydi. <b>Amsterdam Bankası</b> (Wisselbank, 1609) güvenilir bir hesap parası yarattı; borsada hisseler ve vadeli işlemler alınıp satıldı; ticaret filosu Avrupa’nın en büyüğüydü.</p><p>Kanal evleri dar ve derindir: vergiler cephe genişliğine göre alınırdı. Çatılardaki kancalarla eşyalar pencerelerden çekilirdi. Evlerin iç duvarları, tüccarların satın aldığı resimlerle doluydu: Rembrandt ve Vermeer’in pazarı.</p><p><b>Merkantilizm</b> çağıydı: ülkelerin zenginliği altın ve gümüş stoklarıyla, ticaret fazlasıyla ölçülüyordu. Adam Smith bu görüşü eleştirecekti: zenginlik, halkın üretebildiği mal ve hizmetlerdir.</p>' }
    ]
  });

  ek("edebiyat", {
    eserler: [
      { x: 7, y: 62, ad: "Kitaplık", panel: '<h3>Borges: Babil Kütüphanesi</h3><p><b>Jorge Luis Borges</b>’in 1941 tarihli öyküsünde evren, altıgen odalardan oluşan sonsuz bir kütüphanedir. Her kitap 410 sayfa, 25 karakterin bütün olası dizilişleri; kitapların neredeyse hepsi anlamsızdır, ama bir yerde her şey yazılıdır: senin gerçek biyografin de, onun binlerce yanlış sürümü de.</p><p>Kütüphaneciler bir anlam, bir katalog, “bütün kitapların anahtarı” olan kitabı aramaktadır. Öykü bilgi, anlam ve rastlantı üzerine bir meseldir; bugün internet ve dil modelleri için sık sık yeniden okunuyor.</p><p>Borges, yıllarca Buenos Aires Ulusal Kütüphanesi’nin müdürlüğünü yaptı; bu göreve getirildiğinde neredeyse kör olmuştu. “Tanrı’nın ironisi: bana aynı anda kitapları ve geceyi verdi.”</p>' }
    ]
  });

  ek("muzik", {
    eserler: [
      { x: 62, y: 28, ad: "Uçuşan notalar", panel: '<h3>Müzik yazısı</h3><p>Orta Çağ’ın başlarında ilahiler, melodinin yalnızca yönünü gösteren <b>neuma</b> işaretleriyle yazılırdı. 11. yüzyılda <b>Guido d’Arezzo</b> dört çizgili portede notaları kesin yüksekliklere yerleştirdi ve öğrencilerine bir ilahinin dizelerinin ilk heceleriyle öğretti: <i>Ut</i> queant laxis, <i>Re</i>sonare fibris, <i>Mi</i>ra gestorum, <i>Fa</i>muli tuorum, <i>Sol</i>ve polluti, <i>La</i>bii reatum… “Do” sonradan <i>ut</i>’un yerini aldı.</p><p>Osmanlı müziğinde uzun süre sözlü aktarım ve meşk esastı; Kantemiroğlu (18. yy başı) harf notasını, Hamparsum Limonciyan (19. yy başı) kendi adıyla anılan nota yazısını geliştirdi. Batı notası 19. yüzyılda yaygınlaştı.</p>' }
    ]
  });
})();
