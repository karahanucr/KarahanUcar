/* Estetik odasının yeni kapıları: Edebiyat (gece yarısı bir yazarın masası), Müzik (bir konser salonu). */
(function () {
  var S = window.SAHNE; if (!S || !S.kit) return;
  var h = S.h, K = S.kit;

  /* ════════ EDEBİYAT: gece yarısı bir yazarın masası ════════ */
  S.kaydet("edebiyat", {
    ad: "Edebiyat", ust: "estetik", yer: "Bir yazarın çalışma odası · gece yarısı · dışarıda yağmur", vurgu: "#E8B8D0", alan: "estetik",
    alt: "Daktilonun yanında hokka ve tüy, rafta bir kil tablet, duvarda bir yel değirmeni resmi. Gılgamış’tan Joyce’a, anlatmanın uzun gecesi.",
    parcacik: { tur: "harf", adet: 36, harfler: "abcçdefgğhıijklmnoöprsştuüvyz", renk: "rgba(240,210,230," }, isaret: "halka", sozYer: "sag",
    sozler: [
      { metin: "Ein Buch muss die Axt sein für das gefrorene Meer in uns.", dil: "de", ceviri: "Bir kitap, içimizdeki donmuş denize inen balta olmalıdır.", kaynak: "Kafka, Oskar Pollak’a mektup, 1904" },
      { metin: "Söz ola kese savaşı, söz ola kestire başı…", dil: "tr", ceviri: "Söz vardır savaşı bitirir, söz vardır baş kestirir.", kaynak: "Yunus Emre" },
      { metin: "ἔστιν οὖν τραγῳδία μίμησις πράξεως σπουδαίας καὶ τελείας", dil: "grc", ceviri: "Tragedya, ciddi ve tamamlanmış bir eylemin taklididir.", kaynak: "Aristoteles, Poetika 1449b" }
    ],
    arka: function () {
      var s = K.duvar("ed", "#2e2230", "#100a12") + K.pencere(1180, 100, 240, 360, true);
      for (var y = 0; y < 26; y++) s += '<path class="yagmur-c" style="animation-delay:-' + (y * 0.13).toFixed(2) + 's" d="M' + (1196 + (y * 37) % 210) + " " + (130 + (y * 53) % 260) + 'l-4 16" stroke="rgba(200,220,255,.5)" stroke-width="1.5"/>';
      s += K.raf(40, 120, 340, 520, 47, 5);
      /* kil tablet rafta; duvarda yel değirmeni resmi; tiyatro maskeleri */
      s += '<g transform="translate(250 212) rotate(-6)"><rect x="-34" y="-26" width="68" height="44" rx="6" fill="#b8905a"/>' + [0, 1, 2].map(function (r) { return '<path d="M-26 ' + (-16 + r * 12) + 'h52" stroke="#6a4a24" stroke-width="2" stroke-dasharray="3 3"/>'; }).join("") + "</g>";
      s += '<g transform="translate(560 170)"><rect width="240" height="170" fill="#8aa0b8" stroke="#6a4428" stroke-width="12"/><path d="M0 130Q120 110 240 140V170H0Z" fill="#8a9a5a"/><g transform="translate(150 110)"><path d="M-14 0L-8 -60H8L14 0Z" fill="#e8dcc0"/><g class="don" style="--s:10s"><path d="M0 -60L-40 -100M0 -60L40 -20M0 -60L40 -100M0 -60L-40 -20" stroke="#6a4a2a" stroke-width="6"/></g></g><g transform="translate(60 150)"><circle cy="-30" r="6" fill="#3a3a3a"/><path d="M0 -24V0M-10 -14L0 -20L14 -24M0 0L-6 14M0 0L6 14" stroke="#3a3a3a" stroke-width="3"/><path d="M14 -24L40 -40" stroke="#8a8a90" stroke-width="2"/></g></g>';
      s += '<g transform="translate(920 220)"><g class="sallan" style="--a:3deg"><path d="M-40 -30C-40 10 -20 30 0 30C20 30 40 10 40 -30Z" fill="#efe6d0"/><path d="M-24 -12q6 -6 12 0M12 -12q6 -6 12 0M-12 10q12 10 24 0" stroke="#3a2a1a" stroke-width="3" fill="none"/></g><g class="sallan" style="--a:-3deg" transform="translate(60 20)"><path d="M-40 -30C-40 10 -20 30 0 30C20 30 40 10 40 -30Z" fill="#c8b8a0"/><path d="M-24 -8q6 6 12 0M12 -8q6 6 12 0M-12 16q12 -10 24 0" stroke="#3a2a1a" stroke-width="3" fill="none"/></g></g>';
      s += K.zemin("ed", 760, "#2a1c20", "#0e080a") + K.masa(420, 700, 820, "#4a2e22");
      /* açık kitap (sayfası çevrilir), daktilo, hokka ve tüy, divan defteri, buruşuk kâğıtlar, mum */
      s += '<g transform="translate(560 690)"><path d="M-110 0C-60 -14 -20 -10 0 4C20 -10 60 -14 110 0V-16C60 -30 20 -26 0 -12C-20 -26 -60 -30 -110 -16Z" fill="#efe2c2"/><path class="asili" style="--a:8deg;--s:5s" d="M0 -12C20 -26 60 -30 110 -16V-80C60 -94 20 -90 0 -76Z" fill="#f4ead2"/><path d="M0 -12C-20 -26 -60 -30 -110 -16V-80C-60 -94 -20 -90 0 -76Z" fill="#efe2c2"/><path d="M0 -76V-12" stroke="#b09a70" stroke-width="2"/></g>';
      s += '<g transform="translate(860 690)"><rect x="-110" y="-60" width="220" height="60" rx="10" fill="#2a2a2e"/><rect x="-90" y="-110" width="180" height="56" fill="#1a1a1e"/><rect x="-70" y="-150" width="140" height="60" fill="#f4ead2"/><path d="M-60 -136h100M-60 -124h80" stroke="#3a2a1a" stroke-width="2"/>' + [0, 1, 2].map(function (r) { return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (c) { return '<circle cx="' + (-80 + c * 20 + r * 5) + '" cy="' + (-44 + r * 14) + '" r="6" fill="#d8d0c0"/>'; }).join(""); }).join("") + "</g>";
      s += '<g transform="translate(1050 690)"><path d="M-16 0V-24H16V0Z" fill="#1a1a2a"/><path d="M4 -24L60 -110" stroke="#efe6d0" stroke-width="4"/><path d="M40 -80C60 -100 70 -120 64 -130C50 -110 40 -100 34 -84" fill="#efe6d0"/></g>';
      s += '<g transform="translate(1150 690) rotate(6)"><rect x="-44" y="-20" width="88" height="20" fill="#6a2a3a"/><path d="M-44 -20H44" stroke="#d9b25e" stroke-width="3"/><text y="-6" text-anchor="middle" font-size="9" fill="#d9b25e" font-family="Georgia,serif">DİVAN</text></g>';
      s += '<g fill="#e8dcc0">' + [[700, 850], [760, 870], [1300, 860]].map(function (p) { return '<path d="M' + p[0] + " " + p[1] + 'l14 -10 12 6 10 -8 6 14 -12 10 -16 -2 -10 6Z"/>'; }).join("") + "</g>";
      s += K.mum(460, 700, 1);
      return h.svg(s);
    },
    eserler: [
      { x: 16, y: 23, ad: "Kil tablet", panel: '<h3>Gılgamış Destanı</h3><p>Uruk kralı Gılgamış’ın ölümsüzlük arayışı, bilinen en eski büyük edebiyat eseridir (Sümer öyküleri MÖ 2100, standart Babil sürümü MÖ 1200 civarı). 11. tabletteki tufan anlatısı 1872’de George Smith tarafından okununca büyük yankı uyandırır.</p><p>Dostluk (Enkidu), yas ve ölümlülüğün kabulü: dört bin yıl sonra bile tanıdık temalar.</p>' },
      { x: 35, y: 68, ad: "Açık kitap", panel: '<h3>Homeros ve destan</h3><p><b>İlyada</b> Truva savaşının elli gününü, <b>Odysseia</b> bir kahramanın on yıllık eve dönüşünü anlatır. Sözlü gelenekten gelen kalıp sözler (“gül parmaklı Şafak”) ozanın doğaçlamasına yardım eder (Milman Parry, 1930’lar).</p><p>Avrupa edebiyatının başlangıcı sayılan bu iki destan, Vergilius’tan Joyce’un Ulysses’ine kadar yeniden yazılır.</p>' },
      { x: 60, y: 26, ad: "Tiyatro maskeleri", panel: '<h3>Poetika: taklit ve arınma</h3><p><b>Aristoteles</b>’e göre sanat bir taklittir (<i>mimesis</i>): tarih olanı, şiir olabilecek olanı anlatır; bu yüzden şiir tarihten daha felsefidir.</p><p>Tragedya, acıma ve korku uyandırarak bu duygulardan bir arınma (<i>katharsis</i>) sağlar. İyi bir olay örgüsünün başı, ortası ve sonu vardır; en güçlü an tanıma ile talihin dönüşünün birleştiği andır (Oidipus).</p>' },
      { x: 42, y: 24, ad: "Yel değirmeni resmi", panel: '<h3>Don Kişot: ilk modern roman</h3><p><b>Cervantes</b> (1605, 1615), şövalye romanlarını okuyup aklını yitiren bir soyluyu yollara düşürür: yel değirmenlerini dev sanar, hanları şato. İdealizm ile gerçeklik, okumak ile yaşamak arasındaki çatışma.</p><p>İkinci ciltte karakterler birinci cildi okumuştur: roman kendi kendini düşünmeye başlar. Kundera’ya göre modern çağ Don Kişot’un evden çıktığı gün başlar.</p>' },
      { x: 72, y: 76, ad: "Divan defteri", panel: '<h3>Türkçe şiirin iki ırmağı</h3><p><b>Yunus Emre</b> (13.–14. yy) sade Türkçeyle, hece ölçüsüyle tasavvufi aşkı söyler. <b>Divan şiiri</b> Arap ve Fars aruzuyla ince bir imge sistemi kurar: Fuzûlî’nin “Leylâ ile Mecnûn”u, Bâkî, Nedîm, Şeyh Gâlib.</p><p>20. yüzyılda Nâzım Hikmet serbest ölçüyü, Orhan Veli günlük dili şiire taşır; Tanpınar ve Oğuz Atay modern Türk romanını kurar.</p>' },
      { x: 54, y: 66, ad: "Daktilo", panel: '<h3>Modernizm ve bilinç akışı</h3><p>1922 modernizmin mucize yılıdır: Joyce’un <b>Ulysses</b>’i (Dublin’de tek bir gün, 16 Haziran 1904) ve T. S. Eliot’ın Çorak Ülke’si. Virginia Woolf karakterin iç sesini, zihnin akışını yazıya geçirir.</p><p>Proust belleği, Kafka bürokratik kâbusu, Faulkner parçalanmış zamanı anlatır: gerçekçilik içeriden yeniden kurulur.</p>' },
      { x: 29, y: 74, ad: "Mum", panel: '<h3>Dante ve anlatıcının sesi</h3><p><b>Dante</b>’nin İlahi Komedya’sı (1320 civarı) şair-anlatıcıyı Cehennem, Araf ve Cennet boyunca yürütür; İtalyancayı edebiyat dili yapar. Kılavuzu Vergilius, sonra Beatrice’tir.</p><p>Anlatıcı kimdir, ne kadar bilir, güvenilir mi? Bakhtin’e göre Dostoyevski’nin romanları çoksesli (<i>polifonik</i>) romanlardır: hiçbir ses yazarınkine indirgenmez.</p>' }
    ]
  });

  /* ════════ MÜZİK: gece bir konser salonu ════════ */
  S.kaydet("muzik", {
    ad: "Müzik", ust: "estetik", yer: "Bir konser salonu · perde açılmadan hemen önce", vurgu: "#E8A0C8", alan: "estetik",
    alt: "Org boruları loşlukta parlıyor, piyanonun kapağı açık, köşede bir ney ve bir ud. Havada notalar uçuşuyor.",
    parcacik: { tur: "harf", adet: 34, harfler: "♪♫♩♬𝄞", renk: "rgba(240,200,230," }, isaret: "yildiz",
    sozler: [
      { metin: "Ohne Musik wäre das Leben ein Irrtum.", dil: "de", ceviri: "Müzik olmasaydı hayat bir yanılgı olurdu.", kaynak: "Nietzsche, Putların Alacakaranlığı, 1889" },
      { metin: "All art constantly aspires towards the condition of music.", dil: "en", ceviri: "Bütün sanatlar durmaksızın müziğin durumuna özlem duyar.", kaynak: "Walter Pater, Giorgione Okulu, 1877" }
    ],
    arka: function () {
      var s = '<rect width="1600" height="900" fill="#140c14"/>';
      /* org boruları */
      s += '<g>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(function (i) { var hh = 300 - Math.abs(i - 9) * 22, x = 520 + i * 30; return '<rect x="' + x + '" y="' + (440 - hh) + '" width="22" height="' + hh + '" rx="10" fill="url(#mzB)"/><path d="M' + (x + 4) + " " + (440 - hh + 40) + "h14" + '" stroke="#3a2a1a" stroke-width="4"/>'; }).join("") + "</g>";
      s += '<rect x="500" y="440" width="600" height="40" fill="#4a2e22"/>';
      /* kırmızı perdeler */
      s += '<path d="M0 0H420C400 200 380 500 420 900H0Z" fill="#6a1a24"/><path d="M1600 0H1180C1200 200 1220 500 1180 900H1600Z" fill="#6a1a24"/>' + [60, 140, 220, 300].map(function (x) { return '<path d="M' + x + ' 0C' + (x + 10) + ' 300 ' + (x - 10) + ' 600 ' + x + ' 900" stroke="#4a1018" stroke-width="10" fill="none"/><path d="M' + (1600 - x) + ' 0C' + (1590 - x) + ' 300 ' + (1610 - x) + ' 600 ' + (1600 - x) + ' 900" stroke="#4a1018" stroke-width="10" fill="none"/>'; }).join("") + '<path d="M0 0H1600V60C1200 90 400 90 0 60Z" fill="#7a2230"/>';
      s += '<ellipse cx="800" cy="700" rx="520" ry="140" fill="#ffd8a0" opacity=".1" class="hale"/>';
      s += '<rect y="660" width="1600" height="240" fill="#3a2418"/><path d="M0 660H1600" stroke="#6a4428" stroke-width="6"/>';
      /* piyano */
      s += '<g transform="translate(760 690)"><path d="M-200 0H120C200 0 220 -40 200 -80C180 -120 100 -120 60 -110H-200Z" fill="#141014"/><path d="M-200 -110L-40 -260" stroke="#141014" stroke-width="10"/><path d="M-200 -110L-60 -230L60 -110Z" fill="#1e181e"/><rect x="-200" y="-24" width="220" height="24" fill="#efe6d0"/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].filter(function (i) { return [2, 6, 9, 13].indexOf(i) < 0; }).map(function (i) { return '<rect x="' + (-194 + i * 15.5) + '" y="-24" width="9" height="14" fill="#141014"/>'; }).join("") + '<path d="M-180 0V70M100 0V70" stroke="#141014" stroke-width="12"/></g>';
      /* keman sehpada, nota sehpası, monokord, ney ve ud */
      s += '<g transform="translate(1080 700)"><path d="M0 0V-100" stroke="#3a2a1a" stroke-width="4"/><g transform="translate(0 -170) rotate(-12)"><path d="M0 -70C-26 -70 -30 -40 -18 -30C-34 -20 -34 10 -18 20C-30 30 -26 60 0 60C26 60 30 30 18 20C34 10 34 -20 18 -30C30 -40 26 -70 0 -70Z" fill="#a8502a"/><path d="M0 -70V-120" stroke="#3a1a0a" stroke-width="7"/><path d="M-4 -20V40M4 -20V40" stroke="#1a0a04" stroke-width="3"/></g></g>';
      s += '<g transform="translate(470 690)"><path d="M0 0V-160M-30 0H30" stroke="#6a6a70" stroke-width="4"/><rect x="-70" y="-240" width="140" height="90" fill="#efe6d0" transform="rotate(-8 0 -195)"/>' + [0, 1, 2, 3, 4].map(function (i) { return '<path d="M-60 ' + (-226 + i * 8) + 'h120" stroke="#3a2a1a" stroke-width="1" transform="rotate(-8 0 -195)"/>'; }).join("") + '<text x="-40" y="-196" font-size="20" fill="#3a2a1a" transform="rotate(-8 0 -195)">𝄞 ♩♪♫</text></g>';
      s += '<g transform="translate(270 790)"><rect x="-120" y="-24" width="240" height="24" fill="#8a6a3a"/><path d="M-110 -26H110" stroke="#e8e0d0" stroke-width="2"/><path class="m-tel" d="M-110 -30H110" stroke="#fff4d8" stroke-width="1"/><path d="M-110 -24L-100 -40M110 -24L100 -40M20 -24V-34" stroke="#5a3a1a" stroke-width="4"/></g>';
      s += '<g transform="translate(1300 800)"><ellipse cx="0" cy="-30" rx="56" ry="46" fill="#8a5a2a"/><circle cy="-40" r="12" fill="#3a2414"/><path d="M40 -60L110 -130" stroke="#6a4020" stroke-width="12"/><path d="M110 -130L130 -140" stroke="#4a2a14" stroke-width="10"/><path d="M-30 -20L100 -126M-26 -14L104 -122" stroke="#e8dcc0" stroke-width="1"/></g>';
      s += '<g transform="translate(1440 780) rotate(-24)"><rect x="-6" y="-150" width="12" height="160" rx="6" fill="#c8a868"/>' + [-120, -95, -70, -45, -20].map(function (y) { return '<circle cy="' + y + '" r="2.4" fill="#3a2414"/>'; }).join("") + "</g>";
      return h.svg(s, '<linearGradient id="mzB" x1="0" x2="1"><stop offset="0" stop-color="#8a6a3a"/><stop offset=".45" stop-color="#e8c870"/><stop offset="1" stop-color="#6a4a24"/></linearGradient>');
    },
    eserler: [
      { x: 17, y: 85, ad: "Monokord", panel: '<h3>Pisagor ve oranlar</h3><p>Rivayete göre Pisagor bir demircinin çekiçlerini dinlerken uyumlu seslerin basit oranlara dayandığını fark eder. Tek telli <b>monokord</b> bunu gösterir: teli ikiye bölünce oktav (2:1), üçte ikisi beşli (3:2), dörtte üçü dörtlü (4:3).</p><p>Sayı ile ses, müzik ile kosmos aynı düzeni paylaşır: “kürelerin müziği”. Boethius’a göre müzik, Orta Çağ eğitiminin dört matematik sanatından (<i>quadrivium</i>) biridir.</p>' },
      { x: 50, y: 30, ad: "Org boruları", panel: '<h3>Gregoryen ilahiden Bach’a</h3><p>Orta Çağ manastırlarında tek sesli, ölçüsüz Latince ilahiler söylenir. 12. yüzyılda Paris’te Notre-Dame okulu (Léonin, Pérotin) birden çok sesi üst üste koyar: <b>çoksesliliğin</b> doğuşu.</p><p><b>Johann Sebastian Bach</b> (1685–1750) kontrpuan sanatının doruğudur: bir temanın farklı seslerde kendini kovaladığı fügler, Matta Pasyonu, orgun görkemi.</p>' },
      { x: 42, y: 70, ad: "Piyano", panel: '<h3>Beethoven ve romantizm</h3><p><b>Beethoven</b> (1770–1827) klasik biçimleri kişisel bir dramın ifadesine çevirir. Otuzlu yaşlarında işitmesini yitirmeye başlar; Heiligenstadt vasiyetinde intiharı düşündüğünü, sanatı için yaşadığını yazar.</p><p>1824’te tamamen sağırken 9. Senfoni’yi yönetir; Schiller’in “Neşeye Övgü”süyle biten final bugün Avrupa Birliği’nin marşıdır.</p>' },
      { x: 29, y: 52, ad: "Nota sehpası", panel: '<h3>Nota yazısı</h3><p>11. yüzyılda keşiş <b>Guido d’Arezzo</b> dört çizgili portede notaları yazmanın ve bir ilahinin hece başlarıyla (ut, re, mi, fa, sol, la) adlandırmanın yolunu bulur; şarkıcılar artık bir ilahiyi hiç duymadan okuyabilir.</p><p>Nota yazısı müziği yazılı bir esere, besteciyi bir yazara dönüştürür; ama doğaçlama gelenekleri (caz, makam taksimi) sözlü aktarımı yaşatır.</p>' },
      { x: 84, y: 82, ad: "Ud ve ney", panel: '<h3>Makam müziği</h3><p><b>Fârâbî</b>’nin Kitâbü’l-Mûsîka’l-Kebîr’i (10. yy) ses aralıklarını ve çalgıları matematiksel olarak inceler. Osmanlı-Türk makam müziğinde her makam bir dizi, bir seyir (ezginin gidişi) ve bir duygudur: Hicaz, Rast, Uşşak, Segâh…</p><p>Buhûrîzâde <b>Itrî</b> (17. yy) ve <b>Dede Efendi</b> (19. yy) bu geleneğin büyük bestecileridir; ney Mevlevî ayinlerinin sesidir.</p>' },
      { x: 68, y: 62, ad: "Keman", panel: '<h3>Armoni ve tonalite</h3><p>Barok dönemden sonra Batı müziği <b>tonalite</b> üzerine kurulur: bir ana sesin çekim merkezi, gerilim (dominant) ve çözülme (tonik). Rameau’nun Armoni Kitabı (1722) akorları sistemleştirir.</p><p>Cremonalı <b>Stradivari</b>’nin kemanları (1700 civarı) hâlâ aşılamayan bir ses güzelliğiyle anılır; sırrı ahşapta, verniğinde ve ustalığındadır.</p>' },
      { x: 90, y: 45, ad: "Perde", panel: '<h3>Müzik felsefesi ve sessizlik</h3><p><b>Schopenhauer</b>’a göre müzik öbür sanatlar gibi fikirlerin değil, doğrudan iradenin kopyasıdır; bu yüzden en derin sanattır. <b>Hanslick</b> (1854) ise müziğin içeriğini “sesle hareket eden biçimler” olarak tanımlar: müzik duyguyu betimlemez.</p><p>1952’de <b>John Cage</b>’in 4′33″ eserinde piyanist dört dakika otuz üç saniye tek bir nota çalmaz: dinleyicinin duyduğu salonun sesleri müziğin kendisidir.</p>' }
    ]
  });

  S.merkezeEkle("estetik", [
    { hedef: "edebiyat", aciklama: "Bir yazarın gecesi: Gılgamış, Homeros, Cervantes, Joyce.",
      sanat: K.kapi("#E8B8D0", '<path d="M-60 30C-30 20 -10 22 0 32C10 22 30 20 60 30V-30C30 -40 10 -38 0 -28C-10 -38 -30 -40 -60 -30Z" fill="#efe2c2"/><path d="M0 -28V32" stroke="#b09a70" stroke-width="2"/><path class="yuz" style="--s:3s" d="M20 -40L60 -90" stroke="#efe6d0" stroke-width="3"/>', "#1a1018") },
    { hedef: "muzik", aciklama: "Konser salonu: Pisagor’dan Bach’a, Beethoven’a, makamlara.",
      sanat: K.kapi("#E8A0C8", '<g fill="#e8c870">' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { var hh = 80 - Math.abs(i - 3) * 14; return '<rect x="' + (-52 + i * 15) + '" y="' + (30 - hh) + '" width="11" height="' + hh + '" rx="5"/>'; }).join("") + '</g><text x="44" y="-36" font-size="30" fill="#E8A0C8" class="yuz" style="--s:2.4s">♪</text>', "#160c14") }
  ]);
})();
