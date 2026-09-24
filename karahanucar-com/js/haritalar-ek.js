/* HARİTALAR (2) — 2026-09-25'te açılan odaların haritaları. Biçim js/haritalar.js ile aynı. */
(function () {
  var H = window.HARITA = window.HARITA || {};
  function d(yil, ad, yer, eser, kavram, metin, soz) { return { yil: yil, ad: ad, yer: yer, eser: eser, kavram: kavram, metin: metin, soz: soz }; }
  function s(metin, kaynak) { return { metin: metin, kaynak: kaynak }; }

  H["bilim-felsefesi"] = { alt: "Bacon’ın idollerinden Kuhn’un devrimlerine: bilim neyi, nasıl bilir?", donemler: [[0, 2, "Bilim devrimi"], [3, 4, "Pozitivizm"], [5, 8, "20. yüzyıl"]], duraklar: [
    d("1620", "Bacon, Novum Organum", "Londra", "Novum Organum", ["Tümevarım", "İdoller"], "Aklın önyargıları (kabile, mağara, pazar yeri ve tiyatro idolleri) temizlenmeli; doğa sistemli deney ve tümevarımla sorgulanmalıdır.", s("Doğaya ancak ona boyun eğerek hükmedilir.", "Bacon, Novum Organum I.3")),
    d("1687", "Newton’un yöntemi", "Cambridge", "Principia, Kurallar", ["Hipotez"], "Felsefe yapmanın dört kuralı: gereğinden fazla neden kabul etmemek, aynı etkilere aynı nedenleri vermek… “Hipotez uydurmam.”"),
    d("1739", "Hume’un sorusu", "Edinburgh", "İnsan Doğası Üzerine Bir İnceleme", ["Tümevarım sorunu", "Nedensellik"], "Gözlemlenmiş durumlardan gözlemlenmemiş olanlara geçişi hiçbir akıl yürütme haklı çıkaramaz; nedensellik bir alışkanlıktır."),
    d("1830 – 1843", "Comte ve Mill", "Paris · Londra", "Comte, Pozitif Felsefe Dersleri; Mill, Mantık Sistemi", ["Pozitivizm"], "Comte’a göre insanlık teolojik, metafizik ve pozitif evrelerden geçer; Mill tümevarımın kurallarını (benzerlik, fark yöntemleri) ortaya koyar."),
    d("1920’ler", "Viyana Çevresi", "Viyana", "Carnap, Dünyanın Mantıksal Yapısı (1928)", ["Doğrulanabilirlik", "Mantıkçı pozitivizm"], "Anlamlı önermeler ya mantıksal olarak doğrudur ya da deneyle doğrulanabilir; metafizik anlamsızdır."),
    d("1934", "Popper", "Viyana · Christchurch", "Bilimsel Araştırmanın Mantığı", ["Yanlışlanabilirlik"], "Bilim doğrulamayla değil yanlışlanmayla ilerler: cesur varsayımlar ve onları çürütme girişimleri."),
    d("1951", "Quine’in iki dogması", "Harvard", "“Deneyciliğin İki Dogması”", ["Holizm", "Analitik ve sentetik"], "Analitik–sentetik ayrımı ve indirgemecilik dogmadır; bilgimiz deneyimle kenarlarından temas eden bir ağdır."),
    d("1962", "Kuhn", "Berkeley", "Bilimsel Devrimlerin Yapısı", ["Paradigma", "Eşölçülemezlik"], "Olağan bilim, anomaliler, bunalım, devrim: bilim tarihinin birikimsel olmayan yapısı.", s("Paradigma değiştiğinde dünya da onunla birlikte değişir.", "Kuhn, 1962")),
    d("1970 – 1975", "Lakatos ve Feyerabend", "Londra · Berkeley", "Lakatos, Araştırma Programları; Feyerabend, Yönteme Karşı", ["Araştırma programı"], "Lakatos ilerleyen ve yozlaşan araştırma programlarını ayırır; Feyerabend tek bir bilimsel yöntem olmadığını savunur: “her şey gider.”") ] };

  H["politik-felsefe"] = { alt: "Polisten sözleşmeye, sözleşmeden adalete.", donemler: [[0, 1, "Antik"], [2, 2, "Rönesans"], [3, 5, "Sözleşmeciler"], [6, 8, "Modern"]], duraklar: [
    d("MÖ 375", "Platon, Devlet", "Atina", "Politeia", ["Adalet", "Filozof kral"], "Adil şehir ve adil ruh: her bölüm kendi işini yapar. Filozoflar yönetmedikçe kötülük bitmez."),
    d("MÖ 330’lar", "Aristoteles, Politika", "Atina", "Politika", ["Polis", "Politeia"], "İnsan siyasal bir canlıdır; şehir iyi yaşamak için vardır. Anayasaların karşılaştırılması ve karma yönetim.", s("Şehir doğal olarak vardır ve insan doğası gereği siyasal bir canlıdır.", "Politika 1253a")),
    d("1513", "Machiavelli", "Floransa", "Prens; Söylevler", ["Virtù", "Fortuna"], "Siyaset olması gerekeni değil olanı konu almalıdır: ustalık (virtù) ile talihe (fortuna) karşı durmak."),
    d("1651", "Hobbes", "Paris · Londra", "Leviathan", ["Doğa durumu", "Egemenlik"], "Herkesin herkese karşı savaşından kurtulmak için haklar mutlak bir egemene devredilir."),
    d("1689", "Locke", "Londra", "Yönetim Üzerine İki İnceleme", ["Doğal haklar", "Mülkiyet"], "Yaşam, özgürlük, mülkiyet: hükümet bu hakları korumak için kurulur, korumazsa direnme hakkı doğar."),
    d("1762", "Rousseau", "Cenevre · Paris", "Toplum Sözleşmesi", ["Toplum sözleşmesi", "Genel irade"], "Özgür doğan insan her yerde zincirlerdedir; meşru düzen yalnızca genel iradeye dayanabilir."),
    d("1859 – 1867", "Mill ve Marx", "Londra", "Mill, Özgürlük Üzerine; Marx, Kapital", ["Zarar ilkesi", "Sınıf"], "Mill bireysel özgürlüğün sınırını zarar ilkesiyle çizer; Marx siyaseti sınıflar ve üretim ilişkileri üzerinden yeniden düşünür."),
    d("1958", "Arendt", "Chicago", "İnsanlık Durumu", ["Eylem", "Kamusal alan"], "Siyaset, insanların birlikte eylediği ve konuştuğu kamusal alandır; totalitarizm bu alanı yok eder."),
    d("1971 – 1974", "Rawls ve Nozick", "Harvard", "Rawls, Bir Adalet Kuramı; Nozick, Anarşi, Devlet ve Ütopya", ["Cehalet peçesi", "Fark ilkesi"], "Cehalet peçesinin ardında seçilen adalet ilkeleri ile asgari devlet ve mülkiyet haklarının savunusu.") ] };

  H["felsefe-tarihi"] = { alt: "Thales’ten bugüne, üç geçidin ötesindeki yol.", donemler: [[0, 2, "Antik"], [3, 4, "Orta Çağ"], [5, 7, "Yeniçağ"], [8, 9, "Çağdaş"]], duraklar: [
    d("MÖ 585", "Thales", "Milet", "—", ["Arkhe"], "Bir güneş tutulmasını önceden bildirdiği anlatılan Thales, doğayı doğanın kendisiyle açıklamaya çalışan ilk filozof sayılır."),
    d("MÖ 399", "Sokrates’in ölümü", "Atina", "Platon, Savunma ve Phaidon", ["Elenkhos"], "Felsefenin şehitlik anı: sorgulamaktan vazgeçmektense ölümü seçen filozof."),
    d("MÖ 300 – MS 180", "Helenistik ve Roma felsefesi", "Atina · Roma", "Epikuros’un mektupları; Marcus Aurelius, Düşünceler", ["Ataraksia", "Stoacılık"], "Felsefe bir yaşama sanatı olur: Stoacılar, Epikurosçular ve şüpheciler mutluluğa giden yolu arar."),
    d("400 – 1000", "Augustinus’tan Kindî’ye", "Hippo · Bağdat", "İtiraflar; İlk Felsefe Üzerine", ["İman ve akıl"], "Hristiyan ve İslam dünyalarında felsefe, Yunan mirasını dinsel düşünceyle buluşturur."),
    d("1000 – 1350", "İbn Sînâ, İbn Rüşd, Aquinas, Ockham", "Buhara · Kurtuba · Paris · Oxford", "Şifâ; Summa theologiae", ["Skolastik", "Tümeller tartışması"], "Aristoteles’in yeniden keşfi, üniversiteler ve tümeller tartışması: skolastiğin altın çağı."),
    d("1400 – 1600", "Rönesans", "Floransa · Rotterdam · Bordeaux", "Ficino’nun Platon çevirileri; Montaigne, Denemeler", ["Hümanizm"], "Kaynaklara dönüş, Platonculuğun yeniden doğuşu, Machiavelli ve Montaigne: insan yeniden merkezde."),
    d("1600 – 1780", "Rasyonalistler ve empiristler", "Amsterdam · Londra", "Descartes, Spinoza, Leibniz; Locke, Berkeley, Hume", ["Rasyonalizm", "Empirizm"], "Bilgi akıldan mı deneyimden mi gelir? Yeniçağ felsefesinin büyük ikiliği."),
    d("1781 – 1831", "Kant ve Alman idealizmi", "Königsberg · Jena · Berlin", "Saf Aklın Eleştirisi; Tinin Fenomenolojisi", ["Eleştiri", "Diyalektik"], "Kant’ın eleştirel felsefesi ve Fichte, Schelling, Hegel’in sistemleri: tarih ve özgürlük felsefenin konusu olur."),
    d("1840 – 1930", "Kierkegaard’dan Wittgenstein’a", "Kopenhag · Basel · Cambridge", "Nietzsche, Zerdüşt; Frege; Russell; Tractatus", ["Varoluş", "Analiz"], "Varoluşçu ve analitik gelenekler ayrılmaya başlar; mantık ve dil felsefenin merkezine yerleşir."),
    d("1930 – bugün", "Çağdaş felsefe", "—", "Heidegger, Varlık ve Zaman; Quine; Rawls", ["Fenomenoloji", "Analitik felsefe"], "Fenomenoloji, hermeneutik, analitik felsefe, zihin felsefesi ve etik: felsefe uzmanlaşırken yeniden birbirine konuşmayı öğreniyor.") ] };

  H["ft-antik"] = { alt: "Milet’ten Atina’ya, Atina’dan İskenderiye’ye.", donemler: [[0, 1, "Sokratesöncesi"], [2, 4, "Klasik"], [5, 6, "Helenistik"]], duraklar: [
    d("MÖ 6. yy", "İyonyalılar", "Milet", "—", ["Arkhe", "Apeiron"], "Thales, Anaksimandros, Anaksimenes: doğanın ilkesini arayan ilk düşünürler."),
    d("MÖ 5. yy", "Elealılar ve atomcular", "Elea · Abdera", "Parmenides, Doğa Üzerine", ["Varlık", "Atom"], "Parmenides’in değişmeyen varlığı ve Zenon’un paradoksları; Demokritos’un atomları ve boşluğu."),
    d("MÖ 470 – 399", "Sokrates", "Atina", "Platon’un erken diyalogları", ["Elenkhos", "Erdem"], "Agorada sorular: erdem nedir, öğretilebilir mi?"),
    d("MÖ 387", "Platon’un Akademisi", "Atina", "Devlet, Symposion, Timaios", ["İdea (form)"], "İdealar kuramı ve ruhun yükselişi; dokuz yüzyıl sürecek bir okul."),
    d("MÖ 335", "Aristoteles’in Lykeion’u", "Atina", "Organon, Metafizik, Nikomakhos’a Etik", ["Töz", "Mutluluk"], "Mantıktan biyolojiye bir sistem; mutluluk erdemli etkinliktir."),
    d("MÖ 306 – 300", "Bahçe ve Stoa", "Atina", "Epikuros’un mektupları; Zenon", ["Ataraksia", "Logos"], "Epikuros’un dostluk topluluğu ve Zenon’un Stoası: Helenistik çağın iki yaşam felsefesi."),
    d("MÖ 3. yy – MS 3. yy", "İskenderiye ve Yeni Platonculuk", "İskenderiye", "Plotinos, Enneadlar", ["Bir", "Sudur"], "Kütüphane ve Mouseion; Plotinos’un her şeyin Bir’den taştığı sistemi.") ] };

  H["ft-roma"] = { alt: "Roma felsefeyi Yunanca öğrendi, Latince yaşadı.", donemler: [[0, 2, "Cumhuriyet"], [3, 5, "İmparatorluk"], [6, 6, "Geç Antik"]], duraklar: [
    d("MÖ 155", "Filozofların elçiliği", "Roma", "—", ["Retorik"], "Atina’dan gelen üç filozofun (Karneades, Diogenes, Kritolaos) konuşmaları Romalı gençleri büyüler; Cato onları hemen geri göndertir."),
    d("MÖ 55 civarı", "Lucretius", "Roma", "Şeylerin Doğası Üzerine", ["Atom", "Clinamen"], "Epikurosçu atomculuk Latin şiirinde; tanrı ve ölüm korkusundan kurtuluş."),
    d("MÖ 46 – 44", "Cicero’nun felsefe yılları", "Tusculum", "Tusculum Konuşmaları; Görevler Üzerine", ["Probabilizm"], "Yunan felsefesini Latince anlatır ve terimler türetir."),
    d("MS 62 – 65", "Seneca", "Roma", "Lucilius’a Mektuplar", ["Stoacılık"], "Zaman, ölüm, öfke ve dostluk üzerine mektuplar; Neron’un emriyle ölüm."),
    d("MS 108", "Epiktetos", "Nikopolis", "Söylevler; Encheiridion", ["Bize bağlı olan"], "Köle doğmuş filozof: bize bağlı olanlarla olmayanları ayırmak özgürlüğün başlangıcıdır."),
    d("MS 170 – 180", "Marcus Aurelius", "Tuna cephesi", "Kendime Düşünceler", ["Kosmopolis"], "İmparatorun kendine yazdığı notlar: geçicilik, görev ve aklın ortaklığı."),
    d("MS 524", "Boethius", "Pavia", "Felsefenin Tesellisi", ["Talih çarkı"], "Hapiste idamını beklerken yazılan teselli; Aristoteles’in mantığını Orta Çağ’a aktaran çeviriler.") ] };

  H["ft-ronesans"] = { alt: "Petrarca’nın mektuplarından Montaigne’in denemelerine.", donemler: [[0, 1, "Erken hümanizm"], [2, 4, "Floransa"], [5, 6, "Kuzey ve sonrası"]], duraklar: [
    d("1345", "Petrarca", "Verona", "Cicero’nun Atticus’a mektupları (buluntu)", ["Hümanizm"], "Cicero’nun kayıp mektuplarını bulur ve antik yazarlarla yazışır: hümanizmin başlangıcı."),
    d("1438 – 1439", "Floransa Konsili ve Plethon", "Floransa", "—", ["Platonculuk"], "Bizanslı Gemistos Plethon’un Platon dersleri Cosimo de’ Medici’ye bir akademi kurma fikrini verir."),
    d("1462 – 1484", "Ficino ve Careggi", "Floransa", "Platon’un bütün eserlerinin Latince çevirisi", ["Platonik aşk"], "Platon ve Plotinos Latinceye çevrilir; Hristiyanlık ile Platonculuk uzlaştırılır."),
    d("1486", "Pico della Mirandola", "Roma · Floransa", "İnsanın Onuru Üzerine", ["İnsan onuru"], "İnsan kendini biçimlendiren varlıktır: melek de olabilir, hayvan da."),
    d("1513", "Machiavelli", "San Casciano", "Prens", ["Virtù"], "Siyaset ahlaktan ayrılır; gerçekçi yönetim sanatı."),
    d("1511 – 1516", "Erasmus", "Rotterdam · Basel", "Deliliğe Övgü; Yeni Ahit’in Yunanca metni", ["Hıristiyan hümanizmi"], "İroni ve metin eleştirisi: kaynaklara dönüş kilisenin kendisine yöneltilir."),
    d("1580 – 1600", "Montaigne ve Bruno", "Bordeaux · Roma", "Denemeler; Sonsuz Evren ve Dünyalar Üzerine", ["Şüphecilik", "Sonsuz evren"], "Kendini konu edinen denemeler ve sonsuz evren tasavvuru; Bruno 1600’de yakılır.") ] };

  H.almanca = { alt: "Runlardan Luther’e, Goethe’den bugüne.", donemler: [[0, 1, "Eski Yüksek Almanca"], [2, 4, "Orta Çağ ve Reform"], [5, 7, "Modern"]], duraklar: [
    d("8. yy", "Hildebrandslied", "Fulda", "Hildebrand Türküsü", ["Aliterasyon"], "Baba ile oğulun savaş alanında karşılaştığı kahramanlık şiiri: Almanca edebiyatın en eski örneği."),
    d("1200 civarı", "Nibelungenlied", "Tuna boyu", "Nibelunglar Destanı", ["Destan"], "Siegfried, Kriemhild ve Burgundların yıkımı; Orta Yüksek Almanca şiirin doruğu."),
    d("1455", "Gutenberg", "Mainz", "42 satırlı İncil", ["Matbaa"], "Dökme harfli matbaa yazılı dili standartlaştırmaya başlar."),
    d("1522 – 1534", "Luther İncili", "Wartburg · Wittenberg", "Die Bibel", ["Hochdeutsch"], "Halkın diline yakın bir çeviri ortak yazı dilinin temeli olur."),
    d("1781 – 1807", "Kant ve Hegel", "Königsberg · Jena", "Saf Aklın Eleştirisi; Tinin Fenomenolojisi", ["Felsefe dili"], "Almanca modern felsefenin başlıca dili olur."),
    d("1774 – 1832", "Goethe ve Schiller", "Weimar", "Werther; Faust; Schiller’in dramları", ["Klasik"], "Weimar klasikleri ve Almanca edebiyatın dünya çapına çıkışı."),
    d("1838 – 1961", "Grimm Sözlüğü", "Göttingen · Berlin", "Deutsches Wörterbuch", ["Grimm yasası"], "Dilbilimin ve sözlükçüğün dev projesi; 123 yılda tamamlanır."),
    d("1901 – 1996", "Duden ve yazım reformları", "Leipzig · Mannheim", "Duden", ["Yazım"], "Ortak yazım kuralları; 1996 reformuyla ß kullanımı sadeleşir.") ] };

  H.fransizca = { alt: "Strazburg Andları’ndan Frankofoniye.", donemler: [[0, 1, "Eski ve Orta Fransızca"], [2, 4, "Klasik çağ"], [5, 6, "Modern"]], duraklar: [
    d("842", "Strazburg Andları", "Strazburg", "Serments de Strasbourg", ["Roman dilleri"], "Fransızcanın ilk yazılı metni."),
    d("1100 civarı", "Roland Şarkısı", "Normandiya", "La Chanson de Roland", ["Destan"], "Eski Fransızca kahramanlık destanı; şövalyelik edebiyatı başlar."),
    d("1539", "Villers-Cotterêts Fermanı", "Villers-Cotterêts", "Ordonnance", ["Resmî dil"], "I. François resmî belgelerde Latince yerine Fransızcayı zorunlu kılar."),
    d("1635 – 1637", "Akademi ve Descartes", "Paris · Leiden", "Académie française; Yöntem Üzerine Konuşma", ["Klasik Fransızca"], "Dilin kurallarını koyacak akademi kurulur; Descartes felsefeyi Fransızca yazar."),
    d("1751 – 1772", "Ansiklopedi", "Paris", "L’Encyclopédie", ["Aydınlanma"], "Diderot ve d’Alembert’in 28 ciltlik eseri."),
    d("1789 – 1794", "Devrim ve tek dil", "Paris", "Grégoire raporu", ["Ulus dili"], "Devrim, bölgesel dilleri geri iterek Fransızcayı ulusun dili yapmaya çalışır."),
    d("1970 – bugün", "Frankofoni", "Niamey · Paris", "Frankofoni örgütü (1970)", ["Frankofoni"], "Beş kıtada 320 milyon konuşur; Afrika’da hızla büyüyen bir dil.") ] };

  H.ingilizce = { alt: "Beowulf’tan küresel dile.", donemler: [[0, 1, "Eski İngilizce"], [2, 3, "Orta İngilizce"], [4, 6, "Erken Modern"], [7, 8, "Modern"]], duraklar: [
    d("450 – 1100", "Anglosakson", "Britanya", "Beowulf", ["Cermen dilleri"], "Angıl, Sakson ve Jütlerin dili; Viking etkisi."),
    d("1066", "Norman fethi", "Hastings", "—", ["Fransızca etkisi"], "Üç yüzyıl boyunca saray Fransızca konuşur; binlerce sözcük İngilizceye girer."),
    d("1387 – 1400", "Chaucer", "Londra", "Canterbury Hikâyeleri", ["Orta İngilizce"], "Londra lehçesi edebiyat dili olur."),
    d("1400 – 1700", "Büyük Ünlü Kayması", "İngiltere", "—", ["Ünlü kayması"], "Uzun ünlüler kayar; yazım ile söyleyiş arasındaki uçurum buradan gelir."),
    d("1476", "Caxton’ın matbaası", "Westminster", "İngiltere’de basılan ilk kitaplar", ["Matbaa"], "Yazım sabitlenmeye başlar."),
    d("1590 – 1611", "Shakespeare ve King James İncili", "Londra", "Hamlet; Authorized Version", ["Erken Modern İngilizce"], "Dilin en çok alıntılanan iki kaynağı."),
    d("1755", "Johnson Sözlüğü", "Londra", "A Dictionary of the English Language", ["Sözlükçülük"], "42.000 sözcüklük sözlük İngiliz yazımını sabitler."),
    d("1828", "Webster", "New Haven", "An American Dictionary", ["Amerikan İngilizcesi"], "Amerikan yazımı ayrılır: color, center."),
    d("Bugün", "Küresel İngilizce", "—", "—", ["Lingua franca"], "1,5 milyar konuşur; bilim, internet ve havacılığın ortak dili.") ] };

  H.ekoloji = { alt: "Humboldt’un doğa bütününden iklim krizine.", donemler: [[0, 1, "Doğa tarihi"], [2, 4, "Ekolojinin kuruluşu"], [5, 7, "Çevre çağı"]], duraklar: [
    d("1789", "White ve Selborne", "Selborne", "Selborne’un Doğa Tarihi", ["Gözlem"], "Gilbert White bir köyün doğasını yıllarca kaydeder: yerel gözlemin klasiği."),
    d("1799 – 1845", "Humboldt", "And Dağları · Berlin", "Kosmos", ["Bitki coğrafyası"], "Doğa bir bütündür: iklim, bitki ve insan birlikte ölçülür."),
    d("1866", "Haeckel", "Jena", "Genel Morfoloji", ["Ekosistem"], "“Ökologie” sözcüğü doğar."),
    d("1927", "Elton", "Oxford", "Hayvan Ekolojisi", ["Besin ağı", "Niş"], "Besin zincirleri, piramitler ve nişler."),
    d("1935 – 1942", "Tansley ve Lindeman", "Oxford · Minnesota", "Ekosistem kavramı; Trofik-dinamik makale", ["Ekosistem", "Enerji akışı"], "Canlı ve cansız tek sistem; enerjinin basamaklar arasındaki akışı ölçülür."),
    d("1949", "Leopold", "Wisconsin", "Bir Kum İlçesi Almanağı", ["Toprak etiği"], "İnsan, toprak topluluğunun fatihi değil, sade bir üyesidir."),
    d("1962", "Carson", "Maryland", "Sessiz Bahar", ["Biyobirikim"], "Tarım ilaçlarının besin ağındaki etkisi; modern çevre hareketi başlar."),
    d("1988 – bugün", "İklim ve biyoçeşitlilik", "Cenevre · Rio · Paris", "IPCC raporları; Paris Anlaşması (2015)", ["İklim değişikliği", "Biyoçeşitlilik"], "İnsan etkisinin gezegen ölçeğine çıktığı çağ: Antroposen tartışması.") ] };

  H.tip = { alt: "Asklepios’un tapınağından aşılara ve genoma.", donemler: [[0, 2, "Antik"], [3, 3, "İslam dünyası"], [4, 5, "Yeniçağ"], [6, 7, "Modern"]], duraklar: [
    d("MÖ 1750", "Hammurabi ve Mısır papirüsleri", "Babil · Teb", "Edwin Smith papirüsü", ["Tanı"], "Cerrahi vakaları sistemli anlatan en eski metinler."),
    d("MÖ 5. yy", "Hipokrat", "Kos", "Hipokrat Külliyatı", ["Humoral kuram", "Etik"], "Hastalığın doğal nedenleri ve hekim yemini.", s("Hayat kısa, sanat uzun.", "Aforizmalar 1.1")),
    d("MS 2. yy", "Galenos", "Bergama · Roma", "Vücudun Parçalarının Kullanımı", ["Anatomi"], "Deneysel fizyoloji ve 1400 yıllık otorite."),
    d("1025", "İbn Sînâ", "Hemedan", "el-Kânûn fi’t-Tıbb", ["Karantina", "Klinik deneme"], "Avrupa’da yüzyıllarca okutulan tıp kitabı."),
    d("1543", "Vesalius", "Padova", "De humani corporis fabrica", ["Anatomi"], "Kadavra diseksiyonuyla modern anatomi."),
    d("1628", "Harvey", "Londra", "De motu cordis", ["Dolaşım"], "Kanın bir devrede dolaştığının gösterilmesi."),
    d("1796 – 1928", "Aşılar ve penisilin", "Berkeley (İngiltere) · Paris · Londra", "Jenner; Pasteur; Fleming", ["Aşı", "Mikrop kuramı"], "Bulaşıcı hastalıklarla mücadelenin devrimleri."),
    d("1953 – bugün", "Moleküler tıp", "—", "DNA; İnsan Genom Projesi; mRNA aşıları (2020)", ["Genetik", "Kişiselleştirilmiş tıp"], "Genetik tanı, görüntüleme ve yeni aşı teknolojileri.") ] };

  H.muhendislik = { alt: "Piramitlerden kubbelere, buhardan uzay çağına.", donemler: [[0, 2, "Antik"], [3, 4, "Rönesans ve Osmanlı"], [5, 7, "Sanayi ve sonrası"]], duraklar: [
    d("MÖ 2560", "Büyük Piramit", "Giza", "—", ["Eğik düzlem"], "2,3 milyon taş blok; rampalar ve kaldıraçlarla."),
    d("MÖ 3. yy", "Arşimet", "Siraküza", "Kaldıraç ve burgular", ["Basit makineler"], "Mekanik ilk kez matematikle."),
    d("MS 1. yy", "Roma su yolları", "Nîmes · Roma", "Vitruvius, Mimarlık Üzerine", ["Kemer", "Beton"], "Pont du Gard ve Roma betonu (Pantheon kubbesi, MS 126)."),
    d("1420 – 1436", "Brunelleschi’nin kubbesi", "Floransa", "Santa Maria del Fiore", ["Kubbe"], "İskelesiz yükselen çift kabuklu kubbe."),
    d("1557 – 1575", "Mimar Sinan", "İstanbul · Edirne", "Süleymaniye; Selimiye", ["Kubbe", "Yük dağılımı"], "Osmanlı mimarisinin mühendislik doruğu."),
    d("1769", "Watt’ın buhar makinesi", "Glasgow · Birmingham", "Ayrı yoğuşturucu patenti", ["Verim"], "Sanayi Devrimi’nin motoru."),
    d("1883 – 1889", "Çelik çağ", "New York · Paris", "Brooklyn Köprüsü; Eyfel Kulesi", ["Çelik"], "Asma köprüler ve demir kuleler."),
    d("1969 – bugün", "Uzay ve sayısal mühendislik", "Houston · —", "Apollo 11; yarı iletkenler", ["Sistem mühendisliği"], "Ay’a iniş, mikroçipler ve sürdürülebilir mühendislik.") ] };

  H.bilisim = { alt: "Abaküsten yapay zekâya.", donemler: [[0, 2, "Hesap araçları"], [3, 4, "Kuram"], [5, 7, "Bilgisayar çağı"]], duraklar: [
    d("820 civarı", "Harezmî", "Bağdat", "Hint Rakamlarıyla Hesap", ["Algoritma"], "Onlu sistemle adım adım hesap yöntemleri; “algoritma” sözcüğünün kaynağı."),
    d("1642 – 1703", "Pascal ve Leibniz", "Paris · Hannover", "Pascaline; ikili sistem", ["İkili sistem"], "Mekanik hesap makineleri ve ikili aritmetik."),
    d("1804", "Jacquard tezgâhı", "Lyon", "—", ["Delikli kart"], "Desenleri delikli kartlardan okuyan tezgâh: ilk program."),
    d("1837 – 1843", "Babbage ve Lovelace", "Londra", "Analitik Makine; Lovelace’ın notları", ["Program"], "Programlanabilir makine tasarımı ve ilk yayımlanmış algoritma."),
    d("1936", "Turing ve Church", "Cambridge · Princeton", "“On Computable Numbers”", ["Turing makinesi", "Hesaplanabilirlik"], "Hesaplamanın matematiksel tanımı ve sınırları."),
    d("1939 – 1945", "Bletchley Park ve ENIAC", "Bletchley · Philadelphia", "Bombe; Colossus; ENIAC", ["Kriptanaliz"], "Savaşın hızlandırdığı elektronik bilgisayarlar."),
    d("1947 – 1989", "Transistör, internet, Web", "Bell Labs · ARPA · CERN", "Transistör; ARPANET; WWW", ["Ağ"], "Donanımın küçülmesi ve bilgisayarların birbirine bağlanması."),
    d("1956 – bugün", "Yapay zekâ", "Dartmouth · —", "Dartmouth önerisi; derin öğrenme; dil modelleri", ["Yapay zekâ"], "Sembolik yapay zekâdan öğrenen sistemlere.") ] };

  H.mantik = { alt: "Kıyastan eksiklik teoremlerine.", donemler: [[0, 1, "Antik"], [2, 2, "Orta Çağ"], [3, 4, "Cebirsel mantık"], [5, 7, "Modern mantık"]], duraklar: [
    d("MÖ 350", "Aristoteles", "Atina", "Organon", ["Kıyas", "Geçerlilik"], "Geçerli çıkarımın biçimleri."),
    d("MÖ 3. yy", "Stoacılar", "Atina", "Khrysippos’un eserleri (kayıp)", ["Önerme", "Modus ponens"], "Önermeler mantığının öncüsü."),
    d("1100 – 1350", "Skolastik mantık", "Paris · Oxford", "Abelard; Ockham, Summa logicae", ["Tümeller tartışması"], "Anlam, gönderme ve çıkarım üzerine ince tartışmalar."),
    d("1666 – 1690", "Leibniz’in düşü", "Hannover", "De arte combinatoria", ["Evrensel dil"], "Anlaşmazlıkları hesapla çözecek evrensel bir dil: “Calculemus!”"),
    d("1854", "Boole", "Cork", "Düşünce Yasaları", ["Boole cebiri"], "Mantığın cebirsel yazımı."),
    d("1879 – 1910", "Frege ve Russell", "Jena · Cambridge", "Begriffsschrift; Principia Mathematica", ["Niceleyici", "Russell paradoksu"], "Modern yüklemler mantığı ve mantıkçılık programı."),
    d("1931", "Gödel", "Viyana", "“Principia Mathematica ve İlgili Sistemlerin…”", ["Eksiklik teoremleri"], "Tutarlı ve yeterince güçlü sistemler eksiktir."),
    d("1933 – bugün", "Tarski ve sonrası", "Varşova · Berkeley", "Doğruluk kavramı; modal mantık; bilgisayar bilimi", ["Model kuramı", "Modalite"], "Anlambilim, modal mantık ve programların doğrulanması.") ] };

  H.matematik = { alt: "Kil tabletlerden sonsuzluklara.", donemler: [[0, 1, "Antik"], [2, 3, "Orta Çağ"], [4, 5, "Yeniçağ"], [6, 8, "Modern"]], duraklar: [
    d("MÖ 1800", "Babil", "Babil", "YBC 7289; Plimpton 322", ["Basamak değeri"], "60 tabanlı sistem ve √2’nin yaklaşık değeri."),
    d("MÖ 300", "Öklid", "İskenderiye", "Elemanlar", ["Aksiyom", "Asal sayı"], "Asal sayıların sonsuzluğunun kanıtı da Elemanlar’dadır."),
    d("628", "Brahmagupta", "Bhillamala", "Brahmasphutasiddhanta", ["Sıfır"], "Sıfırla işlem kuralları."),
    d("820", "Harezmî", "Bağdat", "el-Cebr ve’l-Mukâbele", ["Cebir"], "Denklemlerin sistemli çözümü."),
    d("1202", "Fibonacci", "Pisa", "Liber Abaci", ["Fibonacci dizisi"], "Hint-Arap rakamları Avrupa’ya."),
    d("1665 – 1684", "Newton ve Leibniz", "Cambridge · Hannover", "Kalkülüs", ["Türev", "Limit"], "Değişimin matematiği."),
    d("1748", "Euler", "Berlin", "Introductio in analysin infinitorum", ["Fonksiyon"], "e, i, π’nin buluştuğu formül."),
    d("1874 – 1900", "Cantor ve Hilbert", "Halle · Göttingen · Paris", "Küme kuramı; 23 problem", ["Küme", "Sonsuzluk"], "Sonsuzlukların hiyerarşisi ve yüzyılın problemleri."),
    d("1931 – bugün", "Gödel’den Perelman’a", "Viyana · Princeton · St. Petersburg", "Eksiklik; Fermat’nın Son Teoremi (Wiles, 1994); Poincaré sanısı (2003)", ["Teorem", "Kanıt (ispat)"], "Yüzyıllık problemlerin çözümü ve bilgisayar destekli kanıtlar.") ] };

  H.tarih = { alt: "Herodotos’tan mikrotarihe: geçmişi yazmanın yolları.", donemler: [[0, 1, "Antik"], [2, 2, "Orta Çağ"], [3, 4, "Modern tarih yazımı"], [5, 7, "20. yüzyıl"]], duraklar: [
    d("MÖ 430", "Herodotos", "Halikarnassos · Atina", "Tarih", ["Historiografi"], "“Araştırmalar”: tanıklık, gezi ve yorum."),
    d("MÖ 400", "Thukydides", "Atina", "Peloponnesos Savaşı Tarihi", ["Nedensellik"], "Tanıkları sorgulayan, siyasal nedenleri arayan tarih."),
    d("1377", "İbn Haldun", "Tunus", "Mukaddime", ["Asabiyye"], "Tarihin kuralları ve devletlerin döngüsü."),
    d("1440", "Lorenzo Valla", "Napoli", "Konstantin Bağışı Üzerine", ["Kaynak eleştirisi"], "Metin eleştirisiyle bir sahtekârlığın ortaya çıkarılması."),
    d("1824", "Ranke", "Berlin", "Latin ve Cermen Halklarının Tarihi", ["Arşiv"], "“Nasıl olduysa öyle”: arşive dayalı bilimsel tarih."),
    d("1929 – 1949", "Annales", "Strazburg · Paris", "Annales dergisi; Braudel, Akdeniz", ["Uzun süre"], "Ekonomi, iklim ve zihniyetlerin tarihi."),
    d("1961 – 1976", "Carr ve Ginzburg", "Cambridge · Bologna", "Tarih Nedir?; Peynir ve Kurtlar", ["Mikrotarih"], "Tarihçinin konumu ve sıradan insanların tarihi."),
    d("Bugün", "Küresel ve dijital tarih", "—", "—", ["Küresel tarih"], "Bağlantılı tarihler, sözlü tarih ve dijital arşivler.") ] };

  H.antropoloji = { alt: "Verandadan sahaya, sahadan yorum’a.", donemler: [[0, 1, "Evrimci antropoloji"], [2, 4, "Saha çağı"], [5, 6, "Yapı ve yorum"]], duraklar: [
    d("1871 – 1877", "Tylor ve Morgan", "Oxford · Rochester", "İlkel Kültür; Antik Toplum", ["Kültür"], "Kültürün ilk tanımı ve tek çizgili evrim şemaları."),
    d("1890", "Frazer", "Cambridge", "Altın Dal", ["Büyü", "Mit"], "Büyü, din ve bilim üzerine “koltuk antropolojisi”."),
    d("1896 – 1911", "Boas", "New York", "İlkel İnsanın Zihni", ["Kültürel görecelik"], "Tarihsel tikelcilik ve ırkçı kuramlara karşı çıkış."),
    d("1915 – 1922", "Malinowski", "Trobriand Adaları", "Batı Pasifik’in Argonotları", ["Katılımcı gözlem"], "Uzun süreli saha çalışmasının doğuşu."),
    d("1925", "Mauss", "Paris", "Armağan Üzerine Deneme", ["Armağan"], "Verme, alma ve karşılık verme yükümlülüğü."),
    d("1949 – 1962", "Lévi-Strauss", "Paris · Brezilya", "Akrabalığın Temel Yapıları; Yaban Düşünce", ["Yapısalcılık"], "Kültürün karşıtlıklardan kurulan yapıları."),
    d("1973 – bugün", "Geertz ve sonrası", "Princeton · Bali", "Kültürlerin Yorumlanması", ["Yoğun betimleme", "Etnografi"], "Yorumlayıcı antropoloji ve etnografinin kendini sorgulaması.") ] };

  H.ekonomi = { alt: "Oikonomia’dan davranışsal iktisada.", donemler: [[0, 1, "Antik ve Orta Çağ"], [2, 4, "Klasik iktisat"], [5, 7, "Modern"]], duraklar: [
    d("MÖ 4. yy", "Aristoteles", "Atina", "Politika I; Nikomakhos’a Etik V", ["Değişim değeri"], "Hane yönetimi, para ve adil değişim."),
    d("1377", "İbn Haldun", "Tunus", "Mukaddime", ["Vergi"], "Düşük vergi oranlarının geliri artırabileceği gözlemi ve emeğin değeri."),
    d("1602 – 1637", "Amsterdam", "Amsterdam", "VOC; lale çılgınlığı", ["Anonim şirket", "Spekülasyon"], "İlk modern borsa ve ilk ünlü balon."),
    d("1776", "Adam Smith", "Kirkcaldy · Londra", "Ulusların Zenginliği", ["İş bölümü", "Görünmez el"], "Pazarın kendiliğinden düzeni."),
    d("1817", "Ricardo", "Londra", "Ekonomi Politiğin ve Vergilendirmenin İlkeleri", ["Karşılaştırmalı üstünlük"], "Ticaretten karşılıklı kazanç."),
    d("1867", "Marx", "Londra", "Kapital I", ["Artı değer"], "Kapitalizmin eleştirisi."),
    d("1890 – 1936", "Marshall ve Keynes", "Cambridge", "İktisadın İlkeleri; Genel Teori", ["Arz ve talep", "Toplam talep"], "Neoklasik denge ve bunalım iktisadı."),
    d("1979 – bugün", "Davranışsal iktisat", "Princeton · Chicago", "Kahneman ve Tversky, Beklenti Kuramı", ["Sınırlı rasyonellik"], "İnsanlar her zaman hesapçı rasyonel aktörler değildir.") ] };

  H.edebiyat = { alt: "Gılgamış’tan romana, romandan bugüne.", donemler: [[0, 2, "Antik"], [3, 4, "Orta Çağ ve Rönesans"], [5, 7, "Modern"]], duraklar: [
    d("MÖ 2100 – 1200", "Gılgamış", "Uruk · Ninova", "Gılgamış Destanı", ["Destan"], "Ölümsüzlük arayışı ve dostluk."),
    d("MÖ 8. yy", "Homeros", "İonia", "İlyada; Odysseia", ["Destan"], "Avrupa edebiyatının başlangıcı."),
    d("MÖ 335", "Aristoteles, Poetika", "Atina", "Poetika", ["Mimesis", "Katharsis"], "Edebiyat kuramının ilk kitabı."),
    d("1320", "Dante", "Ravenna", "İlahi Komedya", ["Alegori"], "Öbür dünya yolculuğu ve İtalyancanın edebiyat dili olması."),
    d("1605 – 1615", "Cervantes", "Madrid", "Don Kişot", ["Roman"], "İlk modern roman."),
    d("13. – 19. yy", "Yunus Emre’den Şeyh Gâlib’e", "Anadolu · İstanbul", "Divan; Hüsn ü Aşk (1783)", ["Aruz", "Hece"], "Tasavvuf ve divan şiirinin iki yolu."),
    d("1922", "Modernizm", "Paris · Londra", "Ulysses; Çorak Ülke", ["Bilinç akışı"], "Anlatının içeriden yeniden kuruluşu."),
    d("1950 – bugün", "Dünya edebiyatı", "—", "Borges; Márquez; Pamuk (Nobel 2006)", ["Metafor"], "Büyülü gerçekçilik, postmodern oyunlar ve küresel roman.") ] };

  H.muzik = { alt: "Pisagor’un telinden Cage’in sessizliğine.", donemler: [[0, 1, "Antik ve Orta Çağ"], [2, 4, "Barok ve Klasik"], [5, 7, "Modern"]], duraklar: [
    d("MÖ 6. yy", "Pisagor", "Kroton", "—", ["Oran"], "Uyumlu aralıkların sayı oranları."),
    d("1025", "Guido d’Arezzo", "Arezzo", "Micrologus", ["Nota yazısı"], "Porte ve solfej heceleri."),
    d("1700 – 1750", "Bach", "Leipzig", "Das Wohltemperierte Klavier; Matta Pasyonu", ["Kontrpuan"], "Kontrpuanın doruğu ve eşit ayarlı klavye."),
    d("18. yy", "Itrî ve Dede Efendi", "İstanbul", "Itrî’nin Tekbir’i; Dede Efendi’nin ayinleri", ["Makam"], "Osmanlı-Türk makam müziğinin büyük bestecileri."),
    d("1824", "Beethoven, 9. Senfoni", "Viyana", "Senfoni no. 9", ["Romantizm"], "Neşeye Övgü ile biten senfoni."),
    d("1854 – 1859", "Hanslick ve Schopenhauer’in etkisi", "Viyana", "Müzikte Güzel Üzerine", ["Biçimcilik"], "Müziğin anlamı: duygu mu, biçim mi?"),
    d("1913 – 1952", "Stravinski’den Cage’e", "Paris · New York", "Bahar Ayini; 4′33″", ["Atonalite"], "Modern müziğin skandalları ve sessizlik."),
    d("1920’ler – bugün", "Caz, rock ve dijital", "New Orleans · —", "—", ["Doğaçlama"], "Doğaçlama, kayıt teknolojisi ve elektronik müzik.") ] };
})();
