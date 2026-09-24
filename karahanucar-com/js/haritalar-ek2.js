/* HARİTALAR (3) — 2026-09-26'da açılan odaların haritaları. Biçim js/haritalar.js ile aynı. */
(function () {
  var H = window.HARITA = window.HARITA || {};
  function d(yil, ad, yer, eser, kavram, metin, soz) { return { yil: yil, ad: ad, yer: yer, eser: eser, kavram: kavram, metin: metin, soz: soz }; }
  function s(metin, kaynak) { return { metin: metin, kaynak: kaynak }; }

  H["dil-felsefesi"] = { alt: "Kratylos’tan Kripke’ye: sözcükler dünyaya nasıl bağlanır?", donemler: [[0, 1, "Antik ve Orta Çağ"], [2, 3, "Yeniçağ"], [4, 8, "Analitik dönem"]], duraklar: [
    d("MÖ 4. yy", "Platon, Kratylos", "Atina", "Kratylos", ["Doğal ad", "Uzlaşım"], "Adlar nesnelere doğaları gereği mi uyar, yoksa uzlaşımla mı konur? Dil felsefesinin ilk diyaloğu."),
    d("1300’ler", "Ockham ve zihinsel dil", "Oxford", "Summa Logicae", ["Suppositio", "Adcılık"], "Terimlerin neyin yerine geçtiği (suppositio) kuramı; tümeller yalnızca zihinsel işaretlerdir."),
    d("1690", "Locke", "Londra", "İnsan Anlığı Üzerine Deneme III", ["İdea", "İşaret"], "Sözcükler öncelikle konuşanın zihnindeki ideaların işaretleridir."),
    d("1836", "Humboldt", "Berlin", "İnsan Dil Yapısının Çeşitliliği Üzerine", ["Dünya görüşü"], "Her dil kendine özgü bir dünya görüşü taşır; dil sonlu araçlardan sonsuz kullanım yapar."),
    d("1892", "Frege", "Jena", "Über Sinn und Bedeutung", ["Anlam", "Gönderim"], "Akşam Yıldızı ile Sabah Yıldızı: aynı gönderim, farklı anlam.", s("Nur im Zusammenhange eines Satzes bedeutet ein Wort etwas.", "Frege, 1884")),
    d("1905", "Russell", "Cambridge", "On Denoting", ["Betimlemeler"], "“Şimdiki Fransa kralı keldir”: dilbilgisel biçim ile mantıksal biçim ayrılır."),
    d("1921 – 1953", "Wittgenstein", "Viyana · Cambridge", "Tractatus; Felsefi Soruşturmalar", ["Resim kuramı", "Dil oyunu"], "Önce dil dünyanın mantıksal resmidir; sonra anlam kullanımdır ve dil oyunlarıyla yaşam biçimlerine gömülüdür."),
    d("1955 – 1975", "Austin, Grice, Searle", "Oxford · Berkeley", "How to Do Things with Words; Logic and Conversation", ["Söz edimi", "İma"], "Dilin eylem boyutu ve söylenen ile kastedilen arasındaki fark."),
    d("1970", "Kripke", "Princeton", "Adlandırma ve Zorunluluk", ["Katı belirleyici", "Nedensel ad kuramı"], "Adlar bütün olası dünyalarda aynı şeyi gösterir; gönderim bir nedensel zincirle aktarılır.") ] };

  H["mantik-felsefesi"] = { alt: "Paradokslardan kanıtlara: mantığın temelleri ve sınırları.", donemler: [[0, 1, "Antik"], [2, 4, "Temeller"], [5, 7, "Sınırlar ve çoğulluk"]], duraklar: [
    d("MÖ 4. yy", "Eubulides", "Megara", "—", ["Yalancı", "Yığın"], "Megara okulunun paradoksları: yalancı, yığın, kel adam, maskeli adam."),
    d("MÖ 3. yy", "Stoacı önermeler mantığı", "Atina", "Khrysippos’un kayıp eserleri", ["Koşullu önerme"], "“Eğer… öyleyse” önermelerinin doğruluk koşulları; önermeler mantığının ilk biçimi."),
    d("1879", "Frege", "Jena", "Begriffsschrift", ["Niceleyici", "Mantıkçılık"], "Modern mantığın doğuşu: işlev, argüman ve niceleyiciler."),
    d("1901 – 1902", "Russell paradoksu", "Cambridge · Jena", "Russell’ın Frege’ye mektubu", ["Küme", "Paradoks"], "Kendini içermeyen kümelerin kümesi: temellerde çatlak.", s("Aritmetik sarsıldı.", "Frege’nin yanıtı, 1902")),
    d("1910 – 1913", "Principia Mathematica", "Cambridge", "Whitehead ve Russell", ["Tipler kuramı"], "Matematiği mantıktan türetme girişimi; 1+1=2 ikinci cildin ortalarında kanıtlanır."),
    d("1931", "Gödel", "Viyana", "Eksiklik teoremleri", ["Eksiklik", "Tutarlılık"], "Yeterince güçlü tutarlı sistemlerde kanıtlanamayan doğru cümleler vardır."),
    d("1933 – 1936", "Tarski ve Turing", "Varşova · Cambridge", "Doğruluk kavramı; Hesaplanabilir sayılar", ["Üst dil", "Hesaplanabilirlik"], "Doğruluğun tanımı ve hesaplamanın sınırları: karar problemi çözülemez."),
    d("1959 – 1970", "Kripke ve Quine", "Harvard", "Kip mantığı anlambilimi; Mantık Felsefesi", ["Olası dünyalar", "Mantığı revize etmek"], "Olası dünyalar anlambilimi; Quine’a göre mantık da ilke olarak revize edilebilir, ama bedeli ağırdır.") ] };

  H["etik"] = { alt: "Sokrates’in sorusundan tramvay sorununa: nasıl yaşamalı?", donemler: [[0, 2, "Antik"], [3, 3, "Orta Çağ"], [4, 6, "Modern"], [7, 8, "Çağdaş"]], duraklar: [
    d("MÖ 399", "Sokrates", "Atina", "Platon, Savunma", ["Erdem bilgidir"], "Sorgulanmamış hayat yaşanmaya değmez; kimse bile bile kötülük yapmaz."),
    d("MÖ 4. yy", "Aristoteles", "Atina", "Nikomakhos’a Etik", ["Eudaimonia", "Orta"], "Erdem iki aşırılık arasındaki ortadır; mutluluk erdemli etkinliktir."),
    d("MÖ 300 – MS 180", "Epikurosçular ve Stoacılar", "Atina · Roma", "Epikuros, Mektuplar; Marcus Aurelius, Kendime", ["Ataraksia", "Apatheia"], "Sükûnet: biri acı ve korkudan kurtulmakla, öteki doğaya ve akla uygun yaşamakla."),
    d("1265 – 1274", "Aquinas", "Paris · Napoli", "Summa Theologiae I-II", ["Doğal yasa"], "Aristoteles’in erdem etiğini Hristiyan doğal yasa öğretisiyle birleştirir."),
    d("1785", "Kant", "Königsberg", "Ahlak Metafiziğinin Temellendirilmesi", ["Kategorik buyruk", "Özerklik"], "Ahlak yasası akıldan gelir; insan her zaman amaçtır.", s("İki şey zihni hayranlıkla doldurur: üstümdeki yıldızlı gök ve içimdeki ahlak yasası.", "Kant, 1788")),
    d("1789 – 1861", "Bentham ve Mill", "Londra", "İlkeler; Faydacılık", ["Fayda", "Hedonik hesap"], "Doğru eylem en çok sayıda kişi için en büyük mutluluğu üretendir."),
    d("1887", "Nietzsche", "Sils Maria", "Ahlakın Soykütüğü", ["Değerlerin yeniden değerlendirilmesi"], "İyi ve kötü kavramlarının tarihsel ve psikolojik kökenleri."),
    d("1958 – 1971", "Anscombe ve Rawls", "Oxford · Harvard", "Modern Ahlak Felsefesi; Bir Adalet Kuramı", ["Erdem etiğinin dönüşü", "Adalet"], "Erdem etiği yeniden canlanır; Rawls adaleti sözleşme kuramıyla temellendirir."),
    d("1967 – 1975", "Foot, Singer", "Oxford · Melbourne", "Tramvay sorunu; Hayvan Özgürlüğü", ["Uygulamalı etik"], "Düşünce deneyleri, küresel yoksulluk ve hayvanlar: etik gündelik hayata iner.") ] };

  H["din-felsefesi"] = { alt: "İlk hareket ettiriciden Plantinga’ya: inanç ve akıl.", donemler: [[0, 0, "Antik"], [1, 4, "Orta Çağ"], [5, 7, "Modern"], [8, 8, "Çağdaş"]], duraklar: [
    d("MÖ 4. yy", "Aristoteles", "Atina", "Metafizik Λ", ["İlk hareket ettirici"], "Kendisi hareket etmeyen, her şeyi hareket ettiren ilk ilke: düşüncenin düşüncesi."),
    d("9. yy", "Kindî", "Bağdat", "İlk Felsefe Üzerine", ["Kelam argümanı"], "Evrenin sonlu bir geçmişi olduğunu ve bir yaratıcıya işaret ettiğini savunur."),
    d("1078", "Anselmus", "Bec", "Proslogion", ["Ontolojik argüman"], "Kendisinden daha büyüğü düşünülemeyen varlık zihinde olduğu gibi gerçekte de vardır."),
    d("1095 – 1180", "Gazzâlî ve İbn Rüşd", "Bağdat · Kurtuba", "Tehâfütü’l-Felâsife; Tehâfütü’t-Tehâfüt", ["Nedensellik", "Âlemin kıdemi"], "Filozofların tutarsızlığına karşı tutarsızlığın tutarsızlığı: akıl ve vahiy tartışması."),
    d("1265 – 1274", "Aquinas", "Paris", "Summa Theologiae I, q.2", ["Beş yol"], "Tanrı’nın varlığı için beş yol: hareket, neden, olumsallık, dereceler, amaç."),
    d("1670", "Pascal", "Paris", "Düşünceler", ["Bahis"], "Akıl karar veremediğinde bahse girmek zorundayız.", s("Yüreğin, aklın bilmediği kendi gerekçeleri vardır.", "Pascal")),
    d("1779", "Hume", "Edinburgh", "Doğal Din Üzerine Söyleşiler", ["Tasarım argümanı", "Mucize"], "Tasarım argümanının ve mucize tanıklıklarının eleştirisi."),
    d("1843 – 1902", "Kierkegaard ve James", "Kopenhag · Harvard", "Korku ve Titreme; Dinsel Deneyimin Çeşitleri", ["İman", "Deneyim"], "İmanın sıçrayışı ve dinsel deneyimin psikolojisi."),
    d("1967 – bugün", "Analitik din felsefesi", "Notre Dame · Oxford", "Plantinga, Swinburne, Mackie", ["Reformcu epistemoloji", "Kötülük sorunu"], "Tanrı inancının rasyonelliği, kötülük sorunu ve kip ontolojik argüman yeniden tartışılır.") ] };

  H["tarih-felsefesi"] = { alt: "Döngülerden ilerlemeye, ilerlemeden fırtınaya.", donemler: [[0, 1, "Klasik"], [2, 4, "Modern"], [5, 7, "20. yüzyıl"]], duraklar: [
    d("413 – 426", "Augustinus", "Hippo", "Tanrı Devleti", ["İki şehir", "Doğrusal zaman"], "Tarih yaratılıştan sona uzanan anlamlı bir çizgidir."),
    d("1377", "İbn Haldun", "Kal’at İbn Selâme", "Mukaddime", ["Asabiyye", "Umran"], "Toplumların yükselişi ve çöküşünün nedenleri; tarih yazımının eleştirisi."),
    d("1725", "Vico", "Napoli", "Yeni Bilim", ["Verum-factum", "Corsi e ricorsi"], "İnsan kendi yaptığını bilebilir; uluslar üç çağdan geçer."),
    d("1784", "Kant ve Herder", "Königsberg · Weimar", "Evrensel Tarih Fikri; Fikirler", ["Aydınlanma", "Halk ruhu"], "Kant için tarih akla doğru ilerler; Herder her kültürün kendi değerini vurgular."),
    d("1822 – 1848", "Hegel ve Marx", "Berlin · Londra", "Tarih Felsefesi Dersleri; Manifesto", ["Tin", "Tarihsel materyalizm"], "Özgürlük bilincinin ilerleyişi ile sınıf mücadelesinin tarihi.", s("Minerva’nın baykuşu ancak alacakaranlık çökerken uçar.", "Hegel, 1820")),
    d("1918 – 1961", "Spengler ve Toynbee", "Münih · Londra", "Batı’nın Çöküşü; Tarih Araştırması", ["Kültür döngüsü"], "Uygarlıklar doğar, olgunlaşır ve çöker."),
    d("1940 – 1946", "Benjamin ve Collingwood", "Paris · Oxford", "Tarih Kavramı Üzerine; Tarih Tasarımı", ["Tarihin meleği", "Yeniden canlandırma"], "İlerlemeye kuşkuyla bakmak ve geçmiş düşünceyi yeniden düşünmek."),
    d("1973 – 1992", "White ve Fukuyama", "Berkeley · Washington", "Metatarih; Tarihin Sonu", ["Anlatı", "Liberal demokrasi"], "Tarih yazımının anlatı biçimleri ve “tarihin sonu” tartışması.") ] };

  H["sanat-felsefesi"] = { alt: "Taklitten kuruma: sanat nedir, güzel nedir?", donemler: [[0, 1, "Antik"], [2, 4, "Modern estetik"], [5, 7, "20. yüzyıl"]], duraklar: [
    d("MÖ 375", "Platon", "Atina", "Devlet X", ["Mimesis"], "Sanat görünüşün taklididir; hakikatten üç derece uzak."),
    d("MÖ 335", "Aristoteles", "Atina", "Poetika", ["Katharsis", "Olay örgüsü"], "Trajedi acıma ve korku yoluyla arınma sağlar; şiir tarihten daha felsefidir."),
    d("1750", "Baumgarten", "Frankfurt (Oder)", "Aesthetica", ["Estetik"], "“Estetik” adı: duyusal bilginin bilimi."),
    d("1757", "Hume ve Burke", "Edinburgh · Londra", "Beğeninin Ölçütü; Yüce ve Güzel", ["Beğeni", "Yüce"], "Beğeninin bir ölçütü var mı? Güzel ile yüce arasındaki fark."),
    d("1790", "Kant", "Königsberg", "Yargı Gücünün Eleştirisi", ["Çıkarsız hoşlanma", "Amaçsız amaçlılık"], "Güzellik yargısı öznel ama evrensel geçerlilik talep eder."),
    d("1835 – 1872", "Hegel ve Nietzsche", "Berlin · Basel", "Estetik Dersleri; Tragedyanın Doğuşu", ["Sanatın sonu", "Apollon ve Dionysos"], "Sanat tinin kendini tanımasının bir biçimidir; trajedi iki gücün birliğidir."),
    d("1917 – 1936", "Duchamp ve Benjamin", "New York · Paris", "Çeşme; Sanat Yapıtı", ["Hazır nesne", "Aura"], "Bir pisuvar sanat olabilir mi? Yeniden üretim çağında aura söner."),
    d("1964 – 1974", "Danto ve Dickie", "New York", "The Artworld; Art and the Aesthetic", ["Sanat dünyası", "Kurumsal kuram"], "Sanatı sanat yapan, gözle görülmeyen bir kuram ve kurum bağlamıdır.", s("Bir şeyi sanat olarak görmek, gözün göremediği bir şey ister.", "Danto, 1964")) ] };

  H["metafelsefe"] = { alt: "Felsefenin kendine sorduğu soru: ne yapıyoruz?", donemler: [[0, 1, "Antik"], [2, 3, "Modern"], [4, 7, "20. ve 21. yüzyıl"]], duraklar: [
    d("MÖ 399", "Sokrates", "Atina", "Savunma; Theaitetos", ["At sineği", "Ebelik"], "Felsefe bir yaşam biçimi ve soru sorma sanatıdır."),
    d("MÖ 4. yy", "Platon ve Aristoteles", "Atina", "Theaitetos 155d; Metafizik A", ["Hayret"], "Felsefe hayretle başlar."),
    d("1637 – 1647", "Descartes", "Leiden · Paris", "Yöntem Üzerine Konuşma; İlkeler’in Fransızca önsözü", ["Yöntem", "Kesinlik"], "Felsefe bir ağaçtır: kökleri metafizik, gövdesi fizik, dalları öteki bilimler."),
    d("1748 – 1781", "Hume ve Kant", "Edinburgh · Königsberg", "Soruşturma XII; Saf Aklın Eleştirisi", ["Aklın sınırları"], "Metafiziği alevlere atmak ya da onun sınırlarını çizmek."),
    d("1929 – 1932", "Davos ve Viyana", "Davos · Viyana", "Cassirer–Heidegger; Carnap, Metafiziğin Aşılması", ["Analitik ve kıtasal"], "Felsefenin iki yola ayrıldığı yıllar."),
    d("1953", "Wittgenstein", "Cambridge", "Felsefi Soruşturmalar", ["Terapi"], "Felsefi sorunlar dilin yanlış anlaşılmasından doğar.", s("Sineğe şişeden çıkış yolunu göstermek.", "§309")),
    d("1969 – 1979", "Quine ve Rorty", "Harvard · Princeton", "Doğallaştırılmış Epistemoloji; Doğanın Aynası", ["Doğalcılık", "Pragmatizm"], "Felsefe bilimle süreklidir ya da kültürün bir sohbetidir."),
    d("2003 – bugün", "Deneysel felsefe", "—", "Knobe, Williamson, Chalmers", ["Sezgi", "Felsefi ilerleme"], "Sezgilerin güvenilirliği ve felsefede ilerleme olup olmadığı tartışması.") ] };

  H["jeoloji"] = { alt: "Dil taşlarından levhalara: Dünya’nın derin zamanı.", donemler: [[0, 1, "Öncüler"], [2, 4, "Derin zaman"], [5, 7, "Levhalar ve yaş"]], duraklar: [
    d("1669", "Steno", "Floransa", "Prodromus", ["Üst üste gelme"], "Fosiller canlı kalıntısıdır; alttaki katman üsttekinden eskidir."),
    d("1788", "Hutton", "Edinburgh · Siccar Point", "Yerin Kuramı", ["Derin zaman", "Kaya döngüsü"], "Başlangıcın izi yok, sonun görüntüsü yok.", s("…no vestige of a beginning,—no prospect of an end.", "Hutton, 1788")),
    d("1815", "William Smith", "Londra", "İngiltere jeoloji haritası", ["Fosil korelasyonu"], "Fosiller katmanları eşleştirmenin anahtarıdır."),
    d("1830 – 1833", "Lyell", "Londra", "Jeolojinin İlkeleri", ["Tekdüzecilik"], "Bugün işleyen yavaş süreçler geçmişi açıklar; Darwin Beagle’da okur."),
    d("1862 – 1896", "Kelvin ve radyoaktivite", "Glasgow · Paris", "Soğuma hesabı; Becquerel", ["Dünya’nın yaşı"], "Kelvin’in kısa yaşı radyoaktivitenin keşfiyle çöker."),
    d("1915", "Wegener", "Marburg", "Kıtaların ve Okyanusların Kökeni", ["Kıtaların kayması", "Pangea"], "Kıtalar bir zamanlar birdi."),
    d("1936 – 1956", "Lehmann ve Patterson", "Kopenhag · Caltech", "İç çekirdek; 4,55 milyar yıl", ["Deprem dalgaları", "Radyometrik yaş"], "Dünya’nın katı iç çekirdeği ve kesin yaşı."),
    d("1960’lar", "Levha tektoniği", "Princeton · Cambridge", "Hess; Vine ve Matthews", ["Okyanus tabanı yayılması"], "Okyanus ortası sırtlar, manyetik şeritler ve dalma-batma: jeolojinin birleştirici kuramı.") ] };

  H["kimya"] = { alt: "İmbikten tabloya: maddenin dili.", donemler: [[0, 1, "Simya"], [2, 4, "Kimya devrimi"], [5, 8, "Modern kimya"]], duraklar: [
    d("8. – 10. yy", "Câbir ve Râzî", "Kûfe · Rey", "Câbir külliyatı; Sırrü’l-Esrâr", ["Damıtma", "Sınıflandırma"], "Laboratuvar yöntemleri ve maddelerin sınıflandırılması."),
    d("1538", "Paracelsus", "Basel · Salzburg", "Septem Defensiones", ["Doz"], "Simyayı ilaca yöneltir: doz zehri yapar."),
    d("1661", "Boyle", "Oxford", "The Sceptical Chymist", ["Parçacık", "Gaz yasası"], "Deney ve parçacık felsefesi; dört element öğretisinin eleştirisi."),
    d("1774 – 1789", "Priestley, Scheele, Lavoisier", "Birmingham · Uppsala · Paris", "Traité élémentaire de chimie", ["Oksijen", "Kütlenin korunumu"], "Oksijenin keşfi ve adlandırılması; flojistonun sonu.", s("Hiçbir şey yok olmaz, hiçbir şey yoktan var olmaz; her şey dönüşür.", "Lavoisier’ye atfedilir")),
    d("1808", "Dalton", "Manchester", "Kimya Felsefesinin Yeni Sistemi", ["Atom kuramı"], "Her elementin atomları kendine özgü ağırlıktadır."),
    d("1828 – 1865", "Wöhler ve Kekulé", "Berlin · Gent", "Üre sentezi; benzen halkası", ["Organik kimya", "Yapı"], "Organik maddeler sentezlenebilir; moleküllerin yapısı vardır."),
    d("1869", "Mendeleyev", "St. Petersburg", "Periyodik yasa", ["Periyodiklik"], "Boşluklarıyla geleceği öngören tablo."),
    d("1898 – 1913", "Curie ve Haber", "Paris · Karlsruhe", "Polonyum ve radyum; amonyak sentezi", ["Radyoaktivite", "Kataliz"], "Atomun içine bakış ve havadan ekmek."),
    d("1939 – bugün", "Pauling ve sonrası", "Caltech", "Kimyasal Bağın Doğası", ["Kuantum kimyası"], "Bağlar kuantum mekaniğiyle açıklanır; polimerler, ilaçlar, yeşil kimya.") ] };

  H["arkeoloji"] = { alt: "Hazine avından bağlam bilimine; Anadolu’dan dünyaya.", donemler: [[0, 1, "Antikacılık"], [2, 4, "Bilimsel kazı"], [5, 7, "Yeni yöntemler"]], duraklar: [
    d("1748 – 1764", "Pompeii ve Winckelmann", "Napoli · Roma", "Antik Sanat Tarihi", ["Antikacılık"], "Gömülü kentler ve sanat tarihinin doğuşu."),
    d("1799 – 1822", "Rosetta ve Champollion", "Mısır · Paris", "Hiyerogliflerin çözülmesi", ["Epigrafi"], "Mısırbilimin başlangıcı."),
    d("1870 – 1890", "Schliemann", "Hisarlık", "Troia kazıları", ["Stratigrafi"], "Homeros’un izinde, ama katmanları yıkarak.", s("Arkeolog nesneleri değil, insanları kazıp çıkarır.", "Wheeler, 1954")),
    d("1899", "Petrie", "Mısır", "Sıralı tarihleme", ["Seriasyon"], "Çömlek türleriyle göreli kronoloji."),
    d("1925 – 1948", "Kültepe kazıları", "Kayseri", "Hrozný (1925); Tahsin Özgüç (1948’den)", ["Kârum", "Tablet"], "Anadolu’nun ilk yazılı belgeleri ve Türk arkeoloji okulunun kuruluşu."),
    d("1949", "Libby", "Chicago", "Radyokarbon tarihleme", ["C-14"], "Organik kalıntılar için mutlak tarih."),
    d("1958 – 2017", "Çatalhöyük", "Konya", "Mellaart; Hodder", ["Düşünümsel arkeoloji"], "Neolitik bir kasaba ve yorumun kazıyla birlikte başladığı yöntem."),
    d("1995 – bugün", "Göbeklitepe ve lidar", "Şanlıurfa · Guatemala", "Klaus Schmidt; Maya lidar taraması (2018)", ["Neolitik", "Uzaktan algılama"], "Tarımdan önce anıtlar ve ormanın altındaki kentler.") ] };

  H["dilbilimi"] = { alt: "Pāṇini’den büyük dil modellerine: dilin bilimi.", donemler: [[0, 1, "Klasik gelenekler"], [2, 3, "Tarihsel dilbilim"], [4, 7, "Modern dilbilim"]], duraklar: [
    d("MÖ ~4. yy", "Pāṇini", "Gandhara", "Aṣṭādhyāyī", ["Kural dizgesi"], "Sanskritçenin yaklaşık 4.000 kurallık dilbilgisi."),
    d("1072 – 1077", "Kaşgarlı Mahmud", "Bağdat", "Dîvânu Lugâti’t-Türk", ["Karşılaştırma", "Sözlük"], "Türk dillerinin ilk büyük sözlüğü ve haritası."),
    d("1786", "William Jones", "Kalküta", "Üçüncü Yıllık Söylev", ["Hint-Avrupa"], "Sanskritçe, Yunanca ve Latincenin ortak kökeni."),
    d("1822 – 1853", "Grimm ve Schleicher", "Göttingen · Jena", "Deutsche Grammatik; soy ağacı", ["Ses yasası", "Dil ağacı"], "Ses değişimlerinin düzenliliği ve dil aileleri."),
    d("1916", "Saussure", "Cenevre", "Genel Dilbilim Dersleri", ["Dil ve söz", "Gösterge"], "Dil bir farklar sistemidir.", s("Dilde yalnızca farklılıklar vardır.", "Saussure, 1916")),
    d("1928 – 1939", "Prag Okulu", "Prag", "Trubetskoy, Sesbilimin İlkeleri", ["Sesbirim"], "Sesbilimin yapısal çözümlemesi."),
    d("1957", "Chomsky", "MIT", "Sözdizimsel Yapılar", ["Üretici dilbilgisi", "Evrensel dilbilgisi"], "Dilbilgisi sonsuz tümce üreten sonlu kurallardır."),
    d("1990’lar – bugün", "Derlem ve hesaplamalı dilbilim", "—", "Büyük derlemler, istatistiksel modeller, dil modelleri", ["Derlem", "Kullanım"], "Dil kullanımının büyük ölçekli verilerle incelenmesi; öğrenilebilirlik tartışması yeniden açılır.") ] };

  H["hukuk"] = { alt: "Taş stelden anayasaya: kural, adalet, güvence.", donemler: [[0, 1, "Eski Çağ"], [2, 4, "Orta Çağ"], [5, 7, "Modern"]], duraklar: [
    d("MÖ ~1754", "Hammurabi", "Babil", "Hammurabi Yasası", ["Kısas", "Yazılı yasa"], "282 madde, taşa kazınmış ve herkese açık."),
    d("MÖ 450", "On İki Levha", "Roma", "Lex Duodecim Tabularum", ["Ius civile"], "Roma hukukunun ilk yazılı temeli."),
    d("529 – 534", "Iustinianus", "Konstantinopolis", "Corpus Iuris Civilis", ["Digesta"], "Roma hukukunun büyük derlemesi.", s("Adalet, herkese hakkını vermek yönündeki sürekli iradedir.", "Ulpianus, Digesta 1.1.10")),
    d("1088", "Bologna", "Bologna", "Irnerius’un dersleri", ["Glossatorlar"], "Roma hukukunun yeniden keşfi ve üniversitenin doğuşu."),
    d("1215", "Magna Carta", "Runnymede", "Büyük Ferman", ["Hukukun üstünlüğü"], "Kral da yasaya bağlıdır."),
    d("1748 – 1764", "Montesquieu ve Beccaria", "Paris · Milano", "Kanunların Ruhu; Suçlar ve Cezalar", ["Kuvvetler ayrılığı", "Orantılılık"], "Özgürlüğün güvenceleri ve ceza hukukunun insanileşmesi."),
    d("1869 – 1926", "Mecelle ve Medeni Kanun", "İstanbul · Ankara", "Mecelle-i Ahkâm-ı Adliyye; Türk Kanunu Medenisi", ["Kodifikasyon"], "Fıkhın maddelere dökülmesi ve İsviçre modelli medeni hukuka geçiş."),
    d("1934 – 1961", "Kelsen ve Hart", "Viyana · Oxford", "Saf Hukuk Kuramı; Hukuk Kavramı", ["Normlar hiyerarşisi", "Tanıma kuralı"], "Hukuki pozitivizmin iki büyük kuramı."),
    d("1948 – 1950", "İnsan hakları", "Paris · Roma", "İHEB; Avrupa İnsan Hakları Sözleşmesi", ["Evrensel haklar"], "Savaş sonrası dünyada bireyin hakları uluslararası güvenceye kavuşur.") ] };

  H["ilahiyat"] = { alt: "İznik’ten Kurtuba’ya, Kurtuba’dan bugüne: inancın ilimleri.", donemler: [[0, 1, "Geç Antikçağ"], [2, 5, "Klasik dönem"], [6, 7, "Modern"]], duraklar: [
    d("325", "İznik Konsili", "İznik", "İznik İnanç Bildirgesi", ["Teslis", "Konsil"], "Hristiyan inancının temel formülü Anadolu’da kabul edilir."),
    d("~200 – 500", "Mişna ve Talmud", "Celile · Babil", "Mişna; Babil Talmudu", ["Sözlü Tora", "Yorum"], "Yahudi hukukunun ve yorum geleneğinin derlenmesi."),
    d("833 – 944", "Mihne ve kelam okulları", "Bağdat · Semerkant", "Eş’arî; Mâtürîdî", ["Mutezile", "Eş’arilik", "Mâtürîdîlik"], "Akıl ve vahiy ilişkisi üzerine Sünni kelamın kuruluşu."),
    d("820 – 923", "Şâfiî, Buhârî, Taberî", "Kahire · Buhara · Bağdat", "er-Risâle; Sahîh; Câmiu’l-Beyân", ["Usul", "Hadis", "Tefsir"], "Fıkıh usulü, hadis derlemeleri ve büyük tefsirler."),
    d("1095 – 1111", "Gazzâlî", "Bağdat · Tus", "İhyâu Ulûmi’d-Dîn", ["Tasavvuf", "Kelam"], "Fıkıh, kelam ve tasavvufun birleşimi."),
    d("1178 – 1190", "İbn Rüşd ve İbn Meymun", "Kurtuba · Kahire", "Faslü’l-Makâl; Şaşkınlara Kılavuz", ["Akıl ve vahiy"], "Hakikat hakikate karşıt olmaz.", s("Hakikat hakikate karşıt olmaz; ona uyar ve tanıklık eder.", "İbn Rüşd")),
    d("1517", "Reform", "Wittenberg", "Luther’in 95 tezi", ["Sola scriptura"], "Kutsal metin ve gelenek ilişkisi yeniden sorgulanır."),
    d("1873 – bugün", "Din bilimi", "Oxford · Ankara", "Max Müller; Ankara İlahiyat Fakültesi (1949)", ["Karşılaştırmalı dinler"], "Dinlerin tarihsel, toplumsal ve psikolojik incelenmesi; Türkiye’de modern ilahiyat eğitimi.") ] };

  H["siyaset-sosyoloji"] = { alt: "Polisten ağ toplumuna: toplum nasıl bir arada durur?", donemler: [[0, 0, "Klasik"], [1, 2, "Kurucular"], [3, 5, "Klasik sosyoloji"], [6, 7, "Çağdaş"]], duraklar: [
    d("MÖ 330’lar", "Aristoteles", "Atina", "Politika", ["Polis"], "İnsan doğası gereği siyasal bir canlıdır."),
    d("1377", "İbn Haldun", "Tunus", "Mukaddime", ["Asabiyye"], "Toplumsal dayanışma ve devletlerin döngüsü."),
    d("1835 – 1848", "Tocqueville, Comte, Marx", "Paris · Londra", "Amerika’da Demokrasi; Manifesto", ["Demokrasi", "Sınıf"], "“Sosyoloji” adı (Comte), demokrasinin çözümlemesi ve sınıf mücadelesi."),
    d("1893 – 1897", "Durkheim", "Bordeaux", "İş Bölümü; İntihar", ["Dayanışma", "Anomi"], "Toplumsal olgular birer şey gibi incelenmelidir.", s("Toplumsal olgular birer şey gibi ele alınmalıdır.", "Durkheim, 1895")),
    d("1903", "Simmel", "Berlin", "Büyük Kentler ve Zihinsel Hayat", ["Kent", "Para"], "Modern kentin psikolojisi."),
    d("1904 – 1919", "Weber", "Heidelberg · Münih", "Protestan Ahlakı; Meslek Olarak Siyaset", ["Bürokrasi", "Meşruiyet"], "Akılcılaşma, demir kafes ve siyasetin ahlakı."),
    d("1962 – 1975", "Habermas ve Foucault", "Frankfurt · Paris", "Kamusallığın Yapısal Dönüşümü; Gözetleme ve Cezalandırma", ["Kamusal alan", "Disiplin"], "Kamusal akıl ve iktidarın yeni biçimleri."),
    d("1979 – 1996", "Bourdieu ve Castells", "Paris · Berkeley", "Ayrım; Ağ Toplumunun Yükselişi", ["Sermaye türleri", "Ağ toplumu"], "Beğeninin toplumsal kökenleri ve bilgi çağının toplumu.") ] };

  H["psikoloji"] = { alt: "Ruhun sınırlarından beynin haritalarına.", donemler: [[0, 0, "Felsefi kökler"], [1, 3, "Kuruluş"], [4, 5, "Okullar"], [6, 8, "Bilişsel dönem"]], duraklar: [
    d("MÖ 4. yy", "Aristoteles", "Atina", "Ruh Üzerine (De Anima)", ["Ruh", "Algı"], "Ruh canlı bedenin biçimidir; psikolojinin ilk sistemli kitabı."),
    d("1879", "Wundt", "Leipzig", "İlk deneysel psikoloji laboratuvarı", ["İç gözlem", "Tepki süresi"], "Psikoloji bağımsız, deneysel bir bilim olur."),
    d("1890", "William James", "Harvard", "Psikolojinin İlkeleri", ["Bilinç akışı", "Alışkanlık"], "İşlevselci psikolojinin temel kitabı."),
    d("1899 – 1923", "Freud", "Viyana", "Düşlerin Yorumu; Ben ve O", ["Bilinçdışı", "Bastırma"], "Psikanalizin doğuşu.", s("O’nun olduğu yerde Ben olmalıdır.", "Freud, 1933")),
    d("1904 – 1938", "Pavlov, Watson, Skinner", "St. Petersburg · Baltimore · Harvard", "Koşullu refleksler; Davranışçı Manifesto", ["Koşullanma", "Davranışçılık"], "Gözlenebilir davranışın bilimi."),
    d("1912 – 1936", "Gestalt ve Piaget", "Frankfurt · Cenevre", "Wertheimer; Çocukta Zekânın Doğuşu", ["Bütün", "Gelişim evreleri"], "Algıda bütünün parçalardan fazla oluşu; çocuğun düşüncesinin evreleri."),
    d("1956 – 1967", "Bilişsel devrim", "MIT · Harvard", "Miller, “Sihirli Sayı Yedi”; Neisser, Bilişsel Psikoloji", ["Bilgi işleme"], "Zihin yeniden bilimsel araştırmanın konusu olur."),
    d("1961 – 1979", "Milgram ve Kahneman–Tversky", "Yale · Kudüs", "İtaat deneyi; Beklenti kuramı", ["Durum", "Sezgisel yargılar"], "İnsan davranışının durumsal ve yanlı yüzleri."),
    d("2015 – bugün", "Yinelenme krizi ve açık bilim", "—", "Open Science Collaboration", ["Ön kayıt", "Açık veri"], "Bulguların güvenilirliği üzerine yöntemsel bir yeniden yapılanma.") ] };
})();
