/* Felsefe odasının yeni kapıları: Bilim Felsefesi (kuğulu göl), Politik Felsefe (Leviathan'ın gölgesi), Felsefe Tarihi (zaman galerisi)
   ve Felsefe Tarihi'nin içindeki geçitler: Antik Yunan (Akademi'nin bahçesi), Roma (Tuna kıyısında bir ordugâh), Rönesans (Careggi villası). */
(function () {
  var S = window.SAHNE; if (!S || !S.kit) return;
  var h = S.h, K = S.kit;

  /* Merkez odaya (Felsefe) yeni kapılar: tanım zaten kayıtlı, kapı listesine eklenir ve "yakında"dan çıkarılır */
  function merkezeEkle(merkez, kapilar) {
    var d = S.tanim(merkez); if (!d) return;
    kapilar.forEach(function (k) {
      var sz = d.kapilar.map(function (x) { return x.hedef; }).filter(function (x) { return /^sozlukce/.test(x); })[0];
      var yer = sz ? d.kapilar.map(function (x) { return x.hedef; }).indexOf(sz) : d.kapilar.length;
      d.kapilar.splice(yer, 0, k);
    });
    var adlar = kapilar.map(function (k) { return (S.tanim(k.hedef) || {}).ad; });
    d.yakinda = (d.yakinda || []).filter(function (y) { return adlar.indexOf(y) < 0 && !kapilar.some(function (k) { return k.yakindaAdi === y; }); });
  }
  S.merkezeEkle = merkezeEkle;

  /* ════════ BİLİM FELSEFESİ: alacakaranlıkta bir göl, beyaz kuğular ve bir kara kuğu ════════ */
  S.kaydet("bilim-felsefesi", {
    ad: "Bilim Felsefesi", ust: "felsefe", yer: "Bir göl kıyısı · alacakaranlık · kuğular", vurgu: "#9FD0E0", alan: "felsefe",
    alt: "Binlerce beyaz kuğu gördün; yarın bir kara kuğu çıkarsa? Bilim neyi, nasıl ve ne kadar kesin bilir?",
    parcacik: { tur: "atesbocegi", adet: 26 }, isaret: "dalga", sozYer: "sag",
    sozler: [
      { metin: "Ipsa scientia potestas est.", dil: "la", ceviri: "Bilginin kendisi güçtür.", kaynak: "Francis Bacon, Meditationes Sacrae, 1597" },
      { metin: "Our knowledge can only be finite, while our ignorance must necessarily be infinite.", dil: "en", ceviri: "Bilgimiz ancak sonlu olabilir; cehaletimiz ise zorunlu olarak sonsuzdur.", kaynak: "Karl Popper, Varsayımlar ve Çürütmeler, 1963" },
      { metin: "Anything goes.", dil: "en", ceviri: "Her şey gider.", kaynak: "Paul Feyerabend, Yönteme Karşı, 1975" }
    ],
    arka: function () {
      var s = K.gokAksam("bf") + K.gunes(800, 520, 46, "#ffd08a") + h.bulut(300, 180, 1, 200, 40) + h.bulut(1200, 140, .8, 240, 120);
      s += K.tepe(560, "#3a2a3a", 21, 70) + K.tepe(585, "#2a2030", 22, 40);
      s += '<rect y="580" width="1600" height="320" fill="url(#bfSu)"/><path d="M700 600H900M720 640H880M680 690H920M740 740H860" stroke="#ffd08a" stroke-width="3" opacity=".45" class="dalga-x" style="--d:-2s"/>';
      for (var w = 0; w < 9; w++) s += '<path class="dalga-x" style="--d:-' + w * 0.7 + 's" d="M-160 ' + (620 + w * 30) + 'q40 -5 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(255,220,180,.13)" stroke-width="2"/>';
      /* kuğular: beyazlar yavaşça süzülür, biri kara */
      var kugu = function (x, y, o, renk, d) { return '<g class="yuz" style="--s:' + (5 + o) + "s;--d:-" + d + 's"><g transform="translate(' + x + " " + y + ") scale(" + o + ')"><path d="M-40 0C-40 -18 -10 -22 20 -14C30 -12 34 -20 30 -34C28 -46 36 -54 44 -50C38 -46 36 -40 40 -28C44 -14 40 2 20 6C0 10 -40 10 -40 0Z" fill="' + renk + '"/><path d="M44 -50L54 -46L44 -44Z" fill="#e8742a"/><path d="M-40 4C-10 12 20 10 40 4" stroke="rgba(0,0,0,.25)" stroke-width="3" fill="none"/></g></g>'; };
      s += kugu(360, 700, 1, "#f4f0ea", 1) + kugu(520, 760, .8, "#f4f0ea", 3) + kugu(1180, 690, .9, "#f4f0ea", 2) + kugu(1340, 780, .7, "#f4f0ea", 4) + kugu(990, 720, 1.05, "#1a1418", 0);
      /* şövale: iki gök modeli (paradigma değişimi) */
      s += '<g transform="translate(320 470)"><path d="M-60 250L0 -10L60 250M0 -10V260" stroke="#5a3a22" stroke-width="8"/><rect x="-80" y="0" width="160" height="120" fill="#efe2c2" stroke="#5a3a22" stroke-width="5"/>' +
        '<circle cx="-40" cy="60" r="30" fill="none" stroke="#6a4a24" stroke-width="2"/><circle cx="-40" cy="60" r="6" fill="#3a6a9a"/><circle cx="-40" cy="60" r="18" fill="none" stroke="#6a4a24" stroke-dasharray="3 3"/>' +
        '<circle cx="40" cy="60" r="30" fill="none" stroke="#6a4a24" stroke-width="2"/><circle cx="40" cy="60" r="7" fill="#e8a83a"/><g class="don" style="--s:12s"><circle cx="40" cy="42" r="4" fill="#3a6a9a"/></g><path d="M-4 60h8" stroke="#8a2a1a" stroke-width="3"/></g>';
      /* kıyıda masa: Viyana Çevresi'nin kahvesi ve dergi */
      s += '<g transform="translate(530 670)"><rect x="-70" y="0" width="140" height="12" fill="#5a3a22"/><rect x="-6" y="12" width="12" height="90" fill="#3a2414"/><rect x="-40" y="-20" width="46" height="20" fill="#e8dcc0"/><text x="-17" y="-6" font-size="8" text-anchor="middle" fill="#3a2a1a" font-family="Georgia,serif">Erkenntnis</text><path d="M24 -18h20v14a10 10 0 0 1 -20 0Z" fill="#f4f0ea"/><path d="M30 -24c2 -6 -2 -8 0 -14M38 -24c2 -6 -2 -8 0 -14" stroke="#fff" stroke-width="1.5" opacity=".5" class="yuz" style="--s:2s"/></g>';
      /* sazlar ve örümcek ağı (inanç ağı) */
      for (var i = 0; i < 22; i++) { var x = 1260 + i * 16 + (i % 3) * 5; s += '<path class="sallan" style="--a:2deg;--s:' + (3 + i % 4) + 's" d="M' + x + ' 900Q' + (x - 6) + " 700 " + (x + 4) + " " + (560 + (i * 37) % 80) + '" stroke="#2a3a22" stroke-width="4" fill="none"/>'; }
      s += '<g transform="translate(1345 555)" stroke="rgba(240,240,255,.55)" fill="none" stroke-width="1">' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<path d="M0 0L' + (70 * Math.cos(a * Math.PI / 180)).toFixed(0) + " " + (70 * Math.sin(a * Math.PI / 180)).toFixed(0) + '"/>'; }).join("") + [18, 34, 50, 64].map(function (r) { return '<circle r="' + r + '"/>'; }).join("") + '<circle r="4" fill="#2a1a10" stroke="none"/></g>';
      /* kâğıttan tekne ve teleskop */
      s += '<g class="yuz" style="--s:4s"><path d="M1130 830L1190 830L1175 848H1145Z" fill="#efe2c2"/><path d="M1160 830V800L1182 828Z" fill="#e8dcc0"/></g>';
      s += '<g transform="translate(1460 500)"><path d="M-30 180L0 40L30 180M0 40V190" stroke="#3a2414" stroke-width="5"/><g transform="rotate(-32)"><rect x="-10" y="-8" width="90" height="16" rx="4" fill="#a8782a"/><rect x="76" y="-11" width="14" height="22" rx="3" fill="#6a4a24"/></g></g>';
      s += '<rect y="840" width="1600" height="60" fill="#1a1418" opacity=".8"/>';
      return h.svg(s, '<linearGradient id="bfSu" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c08070"/><stop offset=".35" stop-color="#5a3a52"/><stop offset="1" stop-color="#1a1428"/></linearGradient>');
    },
    eserler: [
      { x: 62, y: 76, ad: "Kara kuğu", panel: '<h3>Yanlışlanabilirlik</h3><p>Binlerce beyaz kuğu “bütün kuğular beyazdır” önermesini kanıtlamaz; tek bir kara kuğu onu çürütür. <b>Karl Popper</b> (Bilimsel Araştırmanın Mantığı, 1934) buradan bilimle bilim olmayanı ayıran ölçütü çıkarır: bir kuram, onu yanlışlayabilecek gözlemleri yasaklıyorsa bilimseldir.</p><p>Bilim kesinlik değil, cesur varsayımlar ve onları çürütme çabasıdır. Astrolojiye ve (Popper’a göre) Freud’a bu yüzden itiraz edilir: her sonuçla uyuşan bir kuram hiçbir şey söylemez.</p><p class="pn-soz">«Bütün kuğular beyazdır.» — ta ki Avustralya’da kara kuğular görülene kadar (1697). <small>Hume ve Mill’in de kullandığı klasik örnek</small></p>' },
      { x: 50, y: 56, ad: "Batan güneş", panel: '<h3>Tümevarım sorunu</h3><p>Güneş her sabah doğdu; yarın da doğacağını nereden biliyoruz? <b>David Hume</b>’a (1739) göre geleceğin geçmişe benzeyeceği ne mantıkla ne deneyle kanıtlanabilir: deneyle kanıtlamaya çalışmak, kanıtlamak istediğimizi varsaymaktır.</p><p>Russell’ın tavuğu her sabah yemini getiren çiftçinin bir gün boynunu kıracağını bilemez. Goodman’ın “yeşmavi” bilmecesi (1955) sorunu daha da derinleştirir: hangi yüklemler tümevarıma uygundur?</p>' },
      { x: 20, y: 56, ad: "Şövale: iki gök", panel: '<h3>Paradigmalar ve bilimsel devrimler</h3><p><b>Thomas Kuhn</b> (Bilimsel Devrimlerin Yapısı, 1962): bilim düz bir çizgide birikmez. “Olağan bilim” bir paradigmanın içinde bulmacalar çözer; açıklanamayan <i>anomaliler</i> birikince bunalım ve devrim gelir.</p><p>Batlamyus’tan Kopernik’e geçmek yalnızca yeni bir veri değil, bir dünya görüşü değişimidir. Kuhn’a göre iki paradigma ortak bir ölçüyle karşılaştırılamaz (<i>eşölçülemezlik</i>) — bu tez bilimin rasyonelliği üzerine uzun bir tartışma başlatır.</p>' },
      { x: 84, y: 60, ad: "Örümcek ağı", panel: '<h3>İnanç ağı: Duhem–Quine</h3><p>Bir deney kuramı yalanladığında hangi parçasının yanlış olduğunu bilemeyiz: kuram, yardımcı varsayımlar, ölçüm aletleri, hepsi birlikte sınanır (<b>Pierre Duhem</b>, 1906).</p><p><b>Quine</b> (“Deneyciliğin İki Dogması”, 1951) daha da ileri gider: bilgimiz kenarları deneyime değen bir ağdır; çatışma çıkınca ağın herhangi bir yerini, mantığı bile, yeniden düzenleyebiliriz.</p>' },
      { x: 34, y: 72, ad: "Kahve ve dergi", panel: '<h3>Viyana Çevresi</h3><p>1920’lerin Viyana kahvelerinde Schlick, Carnap, Neurath ve Gödel toplanır; dergileri <i>Erkenntnis</i>. <b>Mantıkçı pozitivizm</b>: bir önerme ya mantıksal olarak doğrudur ya da deneyle doğrulanabilir; gerisi (metafizik) anlamsızdır.</p><p>Doğrulanabilirlik ölçütü kendi kendini doğrulayamaz; yine de bu hareket bilim felsefesini bir disiplin olarak kurar. 1938’den sonra üyelerin çoğu Nazilerden kaçarak Amerika’ya göçer.</p>' },
      { x: 73, y: 90, ad: "Kâğıt tekne", panel: '<h3>Yönteme karşı</h3><p><b>Paul Feyerabend</b> (1975): Galileo gibi büyük bilim insanları yöntem kurallarını çiğnediği için başarılı oldu. Tek bir bilimsel yöntem yoktur; “her şey gider”.</p><p>Lakatos’un araştırma programları ve Laudan’ın problem çözme modeli ise Popper ile Kuhn arasında bir yol arar. Bugün tartışma bilimsel gerçekçilik, açıklama ve modeller etrafında sürüyor.</p>' },
      { x: 91, y: 50, ad: "Teleskop", panel: '<h3>Deney ve gözlem</h3><p><b>Francis Bacon</b> (Novum Organum, 1620) aklın “idollerini”, yani önyargılarını sayar ve tümevarımcı bir deney bilimi önerir. Galileo teleskopu göğe çevirdiğinde gözlem artık araçlıdır.</p><p>Sonraki soru: gözlem kuramdan bağımsız mıdır? Hanson (1958) her gözlemin “kuram yüklü” olduğunu savunur: aynı gün doğumunu Tycho ile Kepler farklı görür.</p>' }
    ]
  });

  /* ════════ POLİTİK FELSEFE: tepelerin ardından yükselen Leviathan ════════ */
  S.kaydet("politik-felsefe", {
    ad: "Politik Felsefe", ust: "felsefe", yer: "Leviathan’ın gölgesinde bir şehir · 1651", vurgu: "#E8A070", alan: "felsefe",
    alt: "İnsanlar neden bir arada yaşar, kime ve neden itaat eder? Tepelerin ardında, binlerce insandan yapılmış bir dev yükseliyor.",
    parcacik: { tur: "toz", adet: 40 }, isaret: "halka",
    sozler: [
      { metin: "L’homme est né libre, et partout il est dans les fers.", dil: "fr", ceviri: "İnsan özgür doğar, oysa her yerde zincire vurulmuştur.", kaynak: "Rousseau, Toplum Sözleşmesi I.1, 1762" },
      { metin: "…and the life of man, solitary, poor, nasty, brutish, and short.", dil: "en", ceviri: "…ve insanın hayatı yalnız, yoksul, iğrenç, hayvanca ve kısadır.", kaynak: "Hobbes, Leviathan, 13. bölüm" },
      { metin: "ἄνθρωπος φύσει πολιτικὸν ζῷον", dil: "grc", ceviri: "İnsan doğası gereği siyasal bir canlıdır.", kaynak: "Aristoteles, Politika 1253a" }
    ],
    arka: function () {
      var s = K.gokAksam("pf");
      /* Leviathan: taçlı, kılıçlı dev; bedeni küçük insanlardan (noktalar) */
      s += '<g class="yuz" style="--s:9s"><g transform="translate(800 470)" opacity=".92"><path d="M-150 60C-160 -80 -120 -180 -60 -210C-40 -250 40 -250 60 -210C120 -180 160 -80 150 60Z" fill="#2a2030"/>' +
        '<circle cy="-250" r="52" fill="#2a2030"/><path d="M-44 -300L-30 -340L-12 -310L0 -350L12 -310L30 -340L44 -300Z" fill="#c8a040"/>' +
        '<path d="M140 -120L260 -380" stroke="#8a8aa0" stroke-width="10"/><path d="M250 -360L275 -400L265 -350" fill="#8a8aa0"/><path d="M-140 -120L-230 -340" stroke="#6a5030" stroke-width="10"/><path d="M-230 -340c-30 -10 -30 -50 0 -50c20 0 30 20 16 36" fill="none" stroke="#6a5030" stroke-width="8"/>';
      var r = h.rnd(51);
      for (var i = 0; i < 260; i++) { var px = (r() - 0.5) * 280, py = -200 + r() * 250; if (Math.abs(px) < 140 - Math.max(0, -py - 100) * 0.3) s += '<circle cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" r="2.2" fill="#6a5a78"/>'; }
      s += '<circle cx="-18" cy="-258" r="4" fill="#f0d890"/><circle cx="18" cy="-258" r="4" fill="#f0d890"/></g></g>';
      s += K.tepe(560, "#3a2a2a", 31, 90) + K.tepe(610, "#2a2020", 33, 50);
      /* surlu şehir */
      s += '<g transform="translate(560 600)" fill="#2e2226"><rect x="-160" y="-60" width="320" height="60"/>' + [-150, -90, -30, 30, 90, 150].map(function (x) { return '<rect x="' + (x - 14) + '" y="-80" width="28" height="20"/>'; }).join("") +
        '<rect x="-40" y="-150" width="30" height="90"/><path d="M-44 -150L-25 -190L-6 -150Z"/><rect x="60" y="-120" width="40" height="60"/><path d="M-20 0V-36A20 20 0 0 1 20 -36V0Z" fill="#1a1216"/></g>';
      for (var j = 0; j < 14; j++) s += '<rect class="pencere-isik" style="animation-delay:-' + j * 0.6 + 's" x="' + (420 + j * 20) + '" y="' + (560 + (j % 3) * 12) + '" width="5" height="7" fill="#ffd27a"/>';
      s += K.zemin("pf", 640, "#4a3a22", "#1e160e");
      /* sütun ve baykuş, taş masa ve parşömen, sandalyede peçe, çitli tarla, oy sandığı */
      s += K.sutun(230, 760, 220, 40, "#d8ccb4") + '<g transform="translate(230 530)"><ellipse rx="14" ry="18" fill="#6a5a40"/><circle cx="-5" cy="-6" r="4" fill="#ffd27a"/><circle cx="5" cy="-6" r="4" fill="#ffd27a"/><path d="M-2 0L0 4L2 0Z" fill="#d8a040"/></g>';
      s += '<g transform="translate(900 740)"><rect x="-90" y="0" width="180" height="24" fill="#8a7a6a"/><rect x="-60" y="24" width="120" height="70" fill="#6a5a4a"/>' + K.kagit(-60, -30, 110, 34, -4) + "</g>";
      s += '<g transform="translate(1350 690)"><rect x="-40" y="0" width="80" height="10" fill="#5a3a22"/><rect x="-36" y="-80" width="8" height="80" fill="#5a3a22"/><rect x="28" y="-80" width="8" height="80" fill="#5a3a22"/><rect x="-36" y="10" width="8" height="60" fill="#3a2414"/><rect x="28" y="10" width="8" height="60" fill="#3a2414"/>' +
        '<path class="asili" d="M-40 -84C-20 -60 20 -60 40 -84V20C20 34 -20 34 -40 20Z" fill="rgba(240,235,225,.75)"/></g>';
      s += '<g stroke="#6a5030" stroke-width="4">' + [0, 1, 2, 3, 4, 5, 6].map(function (k) { return '<path d="M' + (1060 + k * 34) + ' 800V760"/>'; }).join("") + '<path d="M1056 772H1270M1056 790H1270"/></g><path d="M1080 820q60 -18 120 0" stroke="#3a2a14" stroke-width="3" fill="none"/>';
      s += '<g transform="translate(420 800)"><rect x="-44" y="-50" width="88" height="60" fill="#6a4a2a"/><rect x="-24" y="-54" width="48" height="6" fill="#1a120c"/><path class="yuz" style="--s:2.5s" d="M-8 -80h16v22h-16Z" fill="#efe2c2"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 50, y: 22, ad: "Leviathan", panel: '<h3>Hobbes: doğa durumu ve egemen</h3><p>Devletten önce “herkesin herkese karşı savaşı” vardır; hayat yalnız, yoksul, iğrenç, hayvanca ve kısadır. Korku ve akıl insanları bir sözleşmeye götürür: haklarını, kendilerini koruyacak mutlak bir egemene devrederler.</p><p><b>Leviathan</b>’ın (1651) ünlü kapağında dev, binlerce küçük insandan oluşur: devlet, onu kuran bireylerin ortak bedenidir.</p><p class="pn-soz">«Bellum omnium contra omnes.» <small>Hobbes, De cive, 1642</small></p>' },
      { x: 15, y: 60, ad: "Sütun ve baykuş", panel: '<h3>Platon: filozof kral</h3><p><b>Devlet</b>’te adil şehir, ruhun üç bölümüne karşılık gelen üç sınıftan oluşur: yöneticiler (akıl), bekçiler (öfke), üreticiler (arzu). Adalet her sınıfın kendi işini yapmasıdır.</p><p>“Filozoflar kral ya da krallar filozof olmadıkça” şehirlerin kötülüğü bitmez. Demokrasi, Platon’a göre halkın gemi kaptanını seçip dümene aşçıyı geçirmesi gibidir.</p>' },
      { x: 35, y: 59, ad: "Şehir kapısı", panel: '<h3>Aristoteles: polis</h3><p>İnsan doğası gereği siyasal bir canlıdır; şehirden (polis) bağımsız yaşayan ya bir hayvandır ya bir tanrı. Şehir, iyi yaşamak için vardır.</p><p><b>Politika</b>’da 158 anayasayı karşılaştırır: tek kişinin, azınlığın ve çoğunluğun yönetimi, her birinin iyi ve bozuk biçimleri (krallık–tiranlık, aristokrasi–oligarşi, politeia–demokrasi).</p>' },
      { x: 72, y: 82, ad: "Çitli tarla", panel: '<h3>Locke: doğal haklar</h3><p>Doğa durumunda da ahlak yasası vardır: herkesin <b>yaşam, özgürlük ve mülkiyet</b> hakkı. İnsan emeğini doğaya kattığında mülk edinir.</p><p>Hükümet bu hakları korumak için kurulur; korumazsa halkın direnme hakkı vardır (İki İnceleme, 1689). Amerikan Bağımsızlık Bildirgesi’nin dili buradan gelir.</p>' },
      { x: 56, y: 80, ad: "Taş masadaki sözleşme", panel: '<h3>Rousseau: genel irade</h3><p>Toplum sözleşmesiyle herkes kendini bütünüyle topluluğa verir ve yine yalnız kendine itaat eder: yasa, <b>genel iradenin</b> ifadesidir; genel irade herkesin iradesinin toplamı değil, ortak iyiye yönelen iradedir.</p><p class="pn-soz">«L’homme est né libre, et partout il est dans les fers.» <small>Du contrat social, 1762</small></p>' },
      { x: 84, y: 70, ad: "Peçeli sandalye", panel: '<h3>Rawls: cehalet peçesi</h3><p>Toplumun kurallarını, o toplumda kim olacağınızı bilmeden seçtiğinizi düşünün: zengin mi yoksul mu, yetenekli mi, hangi dinden… <b>John Rawls</b> (Bir Adalet Kuramı, 1971) bu “köken durumunda” iki ilke seçeceğimizi savunur:</p><ul><li>Herkes için eşit temel özgürlükler;</li><li>Eşitsizlikler ancak en kötü durumdakilerin yararına ise (fark ilkesi).</li></ul><p>Nozick (1974) buna mülkiyet hakları adına itiraz eder.</p>' },
      { x: 26, y: 86, ad: "Oy sandığı", panel: '<h3>Demokrasi ve özgürlük</h3><p><b>John Stuart Mill</b> (Özgürlük Üzerine, 1859): bir kişinin özgürlüğüne ancak başkalarına zarar vermesini önlemek için karışılabilir. Çoğunluğun tiranlığı da bir tiranlıktır.</p><p>Tocqueville Amerika’da demokrasiyi gözlemler (1835); Habermas müzakereci demokrasiyi, Arendt ise siyaseti birlikte eylemin alanı olarak düşünür.</p>' }
    ]
  });

  /* ════════ FELSEFE TARİHİ: zaman galerisi — üç geçit üç çağa açılır ════════ */
  S.kaydet("felsefe-tarihi", {
    ad: "Felsefe Tarihi", ust: "felsefe", yer: "Zaman galerisi · üç geçit, üç çağ", vurgu: "#E8C878", alan: "felsefe",
    alt: "Uzun bir galeri; her kemerin ardında başka bir çağın ışığı. Bir geçide dokun ve o çağın içine yürü.",
    parcacik: { tur: "toz", adet: 60 }, isaret: "halka",
    sozler: [
      { metin: "Die Eule der Minerva beginnt erst mit der einbrechenden Dämmerung ihren Flug.", dil: "de", ceviri: "Minerva’nın baykuşu ancak alacakaranlık çökerken uçuşa başlar.", kaynak: "Hegel, Hukuk Felsefesinin İlkeleri, Önsöz, 1820" },
      { metin: "…a series of footnotes to Plato.", dil: "en", ceviri: "…Platon’a düşülmüş bir dizi dipnot.", kaynak: "Whitehead, Süreç ve Gerçeklik, 1929" }
    ],
    arka: function () {
      var s = K.duvar("ft", "#2a1e16", "#120c08");
      /* üç kemerli geçit: her birinin içinde kendi çağının manzarası */
      var gecit = function (x, ic, renk, id) {
        return '<defs><linearGradient id="' + id + '" x1="0" x2="0" y1="0" y2="1">' + renk + '</linearGradient><clipPath id="' + id + 'k"><path d="M' + (x - 150) + ' 760V330A150 150 0 0 1 ' + (x + 150) + ' 330V760Z"/></clipPath></defs>' +
          '<path d="M' + (x - 150) + ' 760V330A150 150 0 0 1 ' + (x + 150) + ' 330V760Z" fill="url(#' + id + ')"/><g clip-path="url(#' + id + 'k)">' + ic + "</g>" +
          '<path d="M' + (x - 170) + ' 760V330A170 170 0 0 1 ' + (x + 170) + ' 330V760" fill="none" stroke="#6a4a2a" stroke-width="30"/><path d="M' + (x - 150) + ' 330A150 150 0 0 1 ' + (x + 150) + ' 330" fill="none" stroke="#d9b25e" stroke-width="3" opacity=".6"/>' +
          '<ellipse cx="' + x + '" cy="770" rx="170" ry="24" fill="' + (id === "g1" ? "#9fc8ff" : id === "g2" ? "#ff9a6a" : "#ffd27a") + '" opacity=".2" class="hale"/>';
      };
      s += gecit(360, '<rect x="200" y="160" width="320" height="600" fill="#6a9ac8" opacity=".0"/>' + K.tapinak(250, 640, 220, 150, "#f0e6d0") + '<path d="M200 700Q300 640 520 690V760H200Z" fill="#6a7a4a"/>' + K.servi(230, 700, .5) + K.servi(500, 700, .45),
        '<stop offset="0" stop-color="#3a6aa8"/><stop offset=".7" stop-color="#a8c8e8"/><stop offset="1" stop-color="#e8dcc0"/>', "g1");
      s += gecit(800, '<path d="M680 760V560A120 120 0 0 1 920 560V760H880V580A80 80 0 0 0 720 580V760Z" fill="#c8a080"/><path d="M650 470H950V500H650Z" fill="#b89070"/>' + h.alev(800, 740, .5, 0) + '<path d="M650 760Q800 720 950 760Z" fill="#5a3a2a"/>',
        '<stop offset="0" stop-color="#3a1a2a"/><stop offset=".6" stop-color="#b8583a"/><stop offset="1" stop-color="#f0a860"/>', "g2");
      s += gecit(1240, '<path d="M1120 700H1360V760H1120Z" fill="#6a4a3a"/><path d="M1180 700V640H1300V700Z" fill="#c89868"/><path d="M1180 640A60 60 0 0 1 1300 640Z" fill="#b8583a"/><path d="M1236 580V556h8V580" fill="#c89868"/><rect x="1300" y="560" width="22" height="140" fill="#d8b888"/>' + K.servi(1140, 720, .6) + K.servi(1350, 720, .5),
        '<stop offset="0" stop-color="#2a2a5a"/><stop offset=".6" stop-color="#d88a5a"/><stop offset="1" stop-color="#f8d8a0"/>', "g3");
      s += '<rect y="760" width="1600" height="140" fill="#1a120c"/><path d="M0 760H1600" stroke="#5a3a22" stroke-width="6"/>';
      for (var x = 0; x < 1600; x += 80) s += '<path d="M' + x + ' 760L' + (x - 120) + ' 900" stroke="rgba(90,58,34,.35)" stroke-width="2"/>';
      /* kürsüdeki kitap, büst, yazı tomarları */
      s += '<g transform="translate(120 760)"><path d="M-40 0L-20 -140H20L40 0Z" fill="#4a2e1a"/><path d="M-50 -150L50 -140L40 -118L-40 -128Z" fill="#6a4a2a"/><path d="M-44 -150C-20 -160 0 -156 2 -148C4 -156 24 -160 46 -150V-138C24 -146 4 -142 2 -136C0 -142 -20 -146 -44 -138Z" fill="#efe2c2"/></g>';
      s += '<g transform="translate(1030 760)"><rect x="-30" y="-150" width="60" height="150" fill="#6a5a4a"/><rect x="-40" y="-164" width="80" height="16" fill="#7a6a5a"/><path d="M-26 -164C-30 -200 -20 -236 0 -240C20 -236 30 -200 26 -164Z" fill="#d8ccb4"/><circle cx="0" cy="-250" r="22" fill="#d8ccb4"/></g>';
      s += '<g transform="translate(1500 760)"><rect x="-44" y="-90" width="88" height="90" fill="#3a2616"/>' + [-28, -8, 12, 30].map(function (x, i) { return '<rect x="' + (x - 7) + '" y="' + (-120 - i % 2 * 10) + '" width="14" height="40" rx="7" fill="#e8dcc0"/>'; }).join("") + "</g>";
      return h.svg(s);
    },
    eserler: [
      { x: 22.5, y: 58, ad: "Antik Yunan", hedef: "ft-antik" },
      { x: 50, y: 58, ad: "Roma", hedef: "ft-roma" },
      { x: 77.5, y: 58, ad: "Rönesans", hedef: "ft-ronesans" },
      { x: 7.5, y: 64, ad: "Kürsüdeki kitap", panel: '<h3>Felsefe tarihi nasıl yazılır?</h3><p>İlk felsefe tarihi denemeleri doksograflardır: filozofların görüşlerinin derlemeleri. <b>Diogenes Laertios</b>’un Ünlü Filozofların Yaşamları ve Görüşleri (MS 3. yy) hem en önemli kaynağımız hem de anekdot deposudur.</p><p>Modern felsefe tarihçiliği iki eğilim arasında gider: geçmiş düşünürleri kendi bağlamlarında anlamak (tarihsel yaklaşım) ve onları bugünün sorunlarına ortak yapmak (rasyonel yeniden kurma).</p>' },
      { x: 64.5, y: 58, ad: "Büst", panel: '<h3>Hegel: felsefenin tarihi, felsefenin kendisi</h3><p><b>Hegel</b> için felsefe tarihi hataların bir mezarlığı değil, aklın kendini tanıma sürecidir: her sistem bir öncekinin çelişkilerini aşar ve korur (<i>Aufhebung</i>).</p><p>Heidegger’e göre ise felsefe tarihi “varlığın unutuluşu”nun tarihidir; Rorty felsefeyi bitmeyen bir konuşma olarak görür.</p>' },
      { x: 94, y: 78, ad: "Yazı tomarları", panel: '<h3>Kayıplar ve kurtulanlar</h3><p>Antik felsefenin büyük bölümü kayıptır: Aristoteles’in yayımlanmış diyalogları, Stoacıların neredeyse bütün eserleri, Demokritos’un kitapları. Elimizde olanlar ders notları, alıntılar ve kopyalardır.</p><p>Kurtulanlar Bizans kâtipleri, Süryani ve Arap çevirmenler ve Latin manastırlarıyla bize ulaştı; 1752’de Herculaneum’da kömürleşmiş Epikurosçu tomarlar bulundu ve bugün yapay zekâ yardımıyla okunuyor.</p>' }
    ]
  });

  /* ════════ ANTİK YUNAN: Akademi'nin bahçesi ════════ */
  S.kaydet("ft-antik", {
    ad: "Antik Yunan", ust: "felsefe-tarihi", yer: "Atina · Akademi’nin zeytinliği · MÖ 4. yüzyıl", vurgu: "#9FC8FF", alan: "felsefe",
    alt: "Uzakta Akropolis günbatımında, zeytinlerin arasında bir sütunlu galeri. Burada “her şey nedir?” sorusu ilk kez sorulur.",
    parcacik: { tur: "kum", adet: 40 }, isaret: "yildiz",
    sozler: [
      { metin: "Πάντα ῥεῖ.", dil: "grc", ceviri: "Her şey akar.", kaynak: "Herakleitos (Simplikios’un aktarımı)" },
      { metin: "ὁ θάνατος οὐδὲν πρὸς ἡμᾶς", dil: "grc", ceviri: "Ölüm bizim için hiçbir şeydir.", kaynak: "Epikuros, Menoikeus’a Mektup" },
      { metin: "θαυμάζειν… ἀρχὴ φιλοσοφίας", dil: "grc", ceviri: "Hayret, felsefenin başlangıcıdır.", kaynak: "Platon, Theaitetos 155d" }
    ],
    arka: function () {
      var s = K.gokAksam("fa") + K.gunes(1180, 470, 40, "#ffd08a");
      s += '<path d="M900 560Q1100 470 1400 540L1500 580H880Z" fill="#6a4a4a"/>' + K.tapinak(1040, 500, 260, 80, "#d8b8a0");
      s += K.tepe(600, "#5a5a3a", 41, 60) + K.zemin("fa", 640, "#8a7a4a", "#3a3020");
      s += K.tapinak(120, 760, 620, 240, "#e8dcc4");
      for (var i = 0; i < 6; i++) s += K.agac(820 + i * 140 + (i % 2) * 40, 720 + (i % 3) * 30, .7 + (i % 2) * .2, "#6a7a4a", 60 + i);
      /* çeşme (Thales'in suyu), baldıran kasesi, yazıt, patika, incir */
      s += '<g transform="translate(260 800)"><ellipse rx="80" ry="20" fill="#8aa6a0"/><ellipse rx="70" ry="15" fill="#4a7a8a"/><path class="su" d="M0 -60Q-20 -20 -40 0M0 -60Q20 -20 40 0" stroke="#bfe6ff" stroke-width="3" fill="none"/><rect x="-8" y="-70" width="16" height="70" fill="#d8ccb4"/><ellipse class="halka-su" rx="30" ry="7" fill="none" stroke="#bfe6ff" stroke-width="1.5"/></g>';
      s += '<g transform="translate(560 800)"><rect x="-70" y="0" width="140" height="16" fill="#d8ccb4"/><rect x="-60" y="16" width="16" height="40" fill="#b8ac94"/><rect x="44" y="16" width="16" height="40" fill="#b8ac94"/><path d="M-10 -26h20l-4 26h-12Z" fill="#8a7a5a"/><ellipse cy="-26" rx="10" ry="3" fill="#3a4a2a"/></g>';
      s += '<g transform="translate(430 470)"><rect x="-110" y="0" width="220" height="30" fill="#f0e6d0"/><text y="21" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#6a4a24" letter-spacing="2">ΑΓΕΩΜΕΤΡΗΤΟΣ ΜΗΔΕΙΣ ΕΙΣΙΤΩ</text></g>';
      s += '<path d="M820 900C900 820 1000 800 1140 780C1260 764 1400 770 1600 740" stroke="#c8b888" stroke-width="30" fill="none" opacity=".5"/>';
      s += K.agac(1480, 840, .6, "#4a6a3a", 77);
      return h.svg(s);
    },
    eserler: [
      { x: 16, y: 80, ad: "Çeşme", panel: '<h3>Sokratesöncesiler: arkhe</h3><p><b>Thales</b> (MÖ 6. yy): her şeyin ilkesi sudur. Anaksimandros sınırsızı (apeiron), Anaksimenes havayı, Herakleitos ateşi ve akışı, Parmenides değişmeyen varlığı, Demokritos atomları ve boşluğu önerir.</p><p>Soru aynıdır: çokluğun ve değişimin altında yatan bir ve kalıcı olan nedir? Mitos yerine logos: açıklama artık doğanın kendisinden aranır.</p>' },
      { x: 35, y: 86, ad: "Baldıran kasesi", panel: '<h3>Sokrates</h3><p>Hiç yazmadı; onu Platon’un diyaloglarından, Ksenophon’dan ve Aristophanes’in alaylarından tanıyoruz. Agorada soru sorar: cesaret nedir, erdem öğretilebilir mi? Kesin bildiğini sananların çelişkilerini gösterir.</p><p>MÖ 399’da gençleri yoldan çıkarmak ve şehrin tanrılarına saygısızlıkla suçlanır, baldıran zehri içerek ölür. <b>Savunma</b> ve <b>Phaidon</b> son günlerini anlatır.</p><p class="pn-soz">«Sorgulanmamış hayat yaşanmaya değmez.» <small>Platon, Savunma 38a</small></p>' },
      { x: 27, y: 50, ad: "Akademi yazıtı", panel: '<h3>Platon ve Akademi</h3><p>MÖ 387 civarında kahraman Akademos’un korusunda kurulan okul neredeyse dokuz yüzyıl sürer (MS 529’a dek). Kapısında “geometri bilmeyen girmesin” yazdığı anlatılır.</p><p>Platon’un diyalogları: idealar kuramı, ruhun ölümsüzlüğü, adil şehir, aşk (Şölen), bilgi (Theaitetos), evrenin yapımı (Timaios).</p>' },
      { x: 62, y: 88, ad: "Gezinti yolu", panel: '<h3>Aristoteles ve Lykeion</h3><p>Akademi’de yirmi yıl okuduktan sonra kendi okulunu kurar; derslerini yürüyerek verdiği için öğrencilerine <i>peripatetikler</i> denir. Mantıktan biyolojiye, etikten poetikaya bir ansiklopedi.</p><p>Platon’un idealarını eleştirir: form şeylerin içindedir. “Platon’u severim ama hakikati daha çok severim” sözü onun bu tutumundan türetilmiştir.</p>' },
      { x: 92, y: 90, ad: "İncir ağacı", panel: '<h3>Epikuros’un bahçesi</h3><p>MÖ 306’da Atina’da bir bahçe satın alır; kadınların ve kölelerin de katıldığı bir dostluk topluluğu kurar. Amaç <b>ataraksia</b>: ruhun dinginliği ve bedenin acısızlığı.</p><p>Atomculuk tanrı korkusunu, ölüm korkusunu giderir: “Ben varken ölüm yok, ölüm varken ben yokum.”</p>' },
      { x: 10, y: 38, ad: "Sütunlu galeri", panel: '<h3>Stoa</h3><p>Kıbrıslı <b>Zenon</b> MÖ 300 civarında Atina agorasındaki boyalı sütunlu galeride (Stoa Poikile) ders verir; okul adını buradan alır. Kleanthes ve Khrysippos ile mantık, fizik ve etikten oluşan bir sistem kurulur.</p><p>Doğaya, yani akla uygun yaşa; iyi olan yalnızca erdemdir, gerisi (sağlık, zenginlik) “kayıtsız”dır. Stoacılık Roma’da Seneca, Epiktetos ve Marcus Aurelius ile sürer.</p>' }
    ]
  });

  /* ════════ ROMA: Tuna kıyısında bir ordugâh, imparatorun çadırı ════════ */
  S.kaydet("ft-roma", {
    ad: "Roma", ust: "felsefe-tarihi", yer: "Tuna kıyısında bir ordugâh · MS 170’ler · gece", vurgu: "#E89A6A", alan: "felsefe",
    alt: "İmparator Marcus Aurelius savaş çadırında, kandil ışığında kendine notlar yazıyor. Roma felsefeyi bir yaşama sanatı olarak öğrendi.",
    parcacik: { tur: "kor", adet: 40 }, isaret: "kor", sozGecis: "kul",
    sozler: [
      { metin: "Vivere militare est.", dil: "la", ceviri: "Yaşamak savaşmaktır.", kaynak: "Seneca, Ahlak Mektupları 96.5" },
      { metin: "Τῶν ὄντων τὰ μέν ἐστιν ἐφ᾽ ἡμῖν, τὰ δὲ οὐκ ἐφ᾽ ἡμῖν.", dil: "grc", ceviri: "Kimi şeyler bize bağlıdır, kimileri değildir.", kaynak: "Epiktetos, Encheiridion 1" },
      { metin: "Nullam rem e nilo gigni divinitus umquam.", dil: "la", ceviri: "Hiçbir şey tanrısal bir güçle yoktan var edilmez.", kaynak: "Lucretius, Şeylerin Doğası Üzerine I.150" }
    ],
    arka: function () {
      var s = K.gokGece("fr") + K.ay(1300, 150, 34);
      s += K.tepe(560, "#1a2230", 51, 70) + '<rect y="600" width="1600" height="60" fill="#1a2a3a"/>';
      for (var w = 0; w < 4; w++) s += '<path class="dalga-x" style="--d:-' + w + 's" d="M-160 ' + (614 + w * 12) + 'q40 -4 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(200,220,255,.2)" stroke-width="2"/>';
      s += K.zemin("fr", 650, "#2a2418", "#0e0a08");
      /* uzaktaki çadırlar ve ateşler */
      for (var i = 0; i < 7; i++) { var x = 120 + i * 200; s += '<path d="M' + (x - 50) + ' 680L' + x + ' 620L' + (x + 50) + ' 680Z" fill="#3a3020"/>' + h.alev(x + 70, 690, .25, i * 0.3); }
      /* imparatorun çadırı: açık kapıdan kandil ışığı, masada tabletler */
      s += '<g transform="translate(800 820)"><path d="M-300 0L0 -300L300 0Z" fill="#6a2a1e"/><path d="M-300 0L0 -300L0 0Z" fill="#5a2218"/><path d="M-120 0L0 -200L120 0Z" fill="#ffb86a" opacity=".85"/>' +
        '<path d="M-120 0L0 -200L-60 0Z" fill="#7a3020"/><path d="M0 -300V-360" stroke="#5a3a22" stroke-width="6"/><path d="M0 -358L40 -346L0 -334Z" fill="#c8303a"/>' +
        '<rect x="-60" y="-60" width="120" height="10" fill="#4a2e1a"/><rect x="-40" y="-78" width="36" height="18" fill="#c8a860"/><rect x="4" y="-76" width="30" height="16" fill="#b89850"/></g>' + h.alev(800, 750, .3, .2);
      /* lejyon sancakları, meşale, kalkan */
      s += '<g transform="translate(420 820)"><path d="M0 0V-260" stroke="#6a4a2a" stroke-width="6"/><circle cy="-270" r="18" fill="#d8b050"/><rect x="-26" y="-240" width="52" height="60" fill="#8a2020"/><text y="-203" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#f0d890">SPQR</text></g>';
      s += '<g transform="translate(1200 830)"><ellipse rx="50" ry="70" fill="#8a2a20"/><circle r="14" fill="#d8b050"/><path d="M-50 0H50" stroke="#d8b050" stroke-width="4"/></g>';
      s += '<g transform="translate(1440 830)"><path d="M0 0V-150" stroke="#4a2e1a" stroke-width="8"/></g>' + h.alev(1440, 680, .45, .5);
      s += '<g transform="translate(250 840)"><rect x="-60" y="-24" width="120" height="24" fill="#3a2414"/><rect x="-44" y="-40" width="40" height="16" rx="8" fill="#e8dcc0"/><rect x="0" y="-38" width="44" height="14" rx="7" fill="#d8ccb0"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 50, y: 82, ad: "İmparatorun masası", panel: '<h3>Marcus Aurelius</h3><p>İmparator (161–180), yıllarını Tuna boyunda Germen kabileleriyle savaşarak geçirir. Geceleri çadırında Yunanca olarak kendine notlar yazar: <b>Ta eis heauton</b> (Kendime Düşünceler).</p><p>Her sabah nankör, küstah, bencil insanlarla karşılaşacağını hatırlatır kendine; ama onlar da aynı akla ortaktır. Her şey geçicidir; önemli olan şimdi erdemle davranmak.</p><p class="pn-soz">«Ne kadar kısa sürdüğünü düşün yaşamın.» <small>Düşünceler IV.48</small></p>' },
      { x: 26, y: 62, ad: "Sancak", panel: '<h3>Cicero: felsefeyi Latinceye taşımak</h3><p>Siyasetten uzaklaştırıldığı yıllarda (MÖ 46–44) Yunan felsefesini Latince anlatan bir dizi eser yazar: Tusculum Konuşmaları, Tanrıların Doğası, Görevler Üzerine. <i>Qualitas, essentia</i> gibi sözcüklerin bir kısmı onunla doğar.</p><p>Akademik şüpheci bir tavır: kesinlik yerine en olası olan. Augustinus’u felsefeye yönelten kitap Cicero’nun (kayıp) Hortensius’udur.</p>' },
      { x: 16, y: 90, ad: "Tomarlar", panel: '<h3>Lucretius: Şeylerin Doğası</h3><p>MÖ 1. yüzyılda Epikuros’un atomculuğunu 7400 dizelik bir Latin şiirine döker: evren boşlukta düşen ve arada bir “sapan” (<i>clinamen</i>) atomlardan oluşur; ruh da ölümlüdür, tanrılardan korkmaya gerek yoktur.</p><p>Tek elyazması 1417’de Poggio Bracciolini tarafından bir Alman manastırında bulunur ve Rönesans’ı derinden etkiler.</p>' },
      { x: 75, y: 90, ad: "Kalkan", panel: '<h3>Seneca</h3><p>Neron’un hocası ve danışmanı, zengin bir Stoacı. <b>Lucilius’a Ahlak Mektupları</b>: zamanı iyi kullanmak, ölüme hazırlık, öfke, dostluk üzerine 124 mektup.</p><p>MS 65’te Neron’a karşı bir komploya karıştığı iddiasıyla intihara zorlanır; Tacitus ölümünü Sokrates’inkine benzer biçimde anlatır.</p><p class="pn-soz">«Dum differtur, vita transcurrit.» <small>Ertelenirken hayat akıp gider. — Mektuplar 1.2</small></p>' },
      { x: 90, y: 72, ad: "Meşale", panel: '<h3>Epiktetos</h3><p>Hierapolis’te (bugün Pamukkale) köle olarak doğar; azat edilince Roma’da, sonra Nikopolis’te ders verir. Öğrencisi Arrianos derslerini ve kısa el kitabını (<b>Encheiridion</b>) yazıya geçirir.</p><p>Temel ayrım: yargılarımız, isteklerimiz bize bağlıdır; bedenimiz, malımız, ünümüz değil. Bizi üzen şeyler değil, şeyler hakkındaki yargılarımızdır.</p>' },
      { x: 8, y: 68, ad: "Uzak ateşler", panel: '<h3>Plotinos ve Yeni Platonculuk</h3><p>MS 3. yüzyılda Roma’da ders veren Mısırlı filozof. Her şey <b>Bir</b>’den taşar: Bir → Akıl (Nous) → Ruh → madde. Ruh, içe dönerek kaynağına yükselebilir.</p><p>Öğrencisi Porphyrios derslerini <b>Enneadlar</b> olarak düzenler. Yeni Platonculuk Augustinus’tan İslam felsefesine ve Rönesans’a uzanan en etkili akımlardan biridir.</p>' },
      { x: 81, y: 17, ad: "Ay ışığı", panel: '<h3>Boethius: Felsefenin Tesellisi</h3><p>Roma’nın “son filozofu”. Ostrogot kralı Theoderik’e ihanetle suçlanır; hapiste idamını beklerken (524) <b>Felsefenin Tesellisi</b>’ni yazar: Felsefe bir kadın kılığında gelir ve talih çarkının dönmesini, gerçek mutluluğu anlatır.</p><p>Aristoteles’in mantık eserlerini Latinceye çevirerek Orta Çağ’a aktarır; <i>persona</i> tanımı yüzyıllarca kullanılır.</p>' }
    ]
  });

  /* ════════ RÖNESANS: Careggi villasının terası, uzakta Floransa ════════ */
  S.kaydet("ft-ronesans", {
    ad: "Rönesans", ust: "felsefe-tarihi", yer: "Floransa · Careggi villası · 1460’lar · akşamüstü", vurgu: "#F0C070", alan: "felsefe",
    alt: "Medici’lerin villasında Ficino Platon’u çeviriyor; uzakta Brunelleschi’nin kubbesi. İnsan yeniden merkezde.",
    parcacik: { tur: "toz", adet: 50 }, isaret: "halka", sozYer: "sag",
    sozler: [
      { metin: "Nec certam sedem, nec propriam faciem… tibi dedimus, o Adam.", dil: "la", ceviri: "Sana ne belirli bir yer ne de kendine özgü bir yüz verdik, ey Âdem.", kaynak: "Pico della Mirandola, İnsanın Onuru Üzerine, 1486" },
      { metin: "Que sais-je ?", dil: "fr", ceviri: "Ne biliyorum ki?", kaynak: "Montaigne, Denemeler II.12, 1580" },
      { metin: "…è molto più sicuro essere temuto che amato.", dil: "it", ceviri: "…korkulmak sevilmekten çok daha güvenlidir.", kaynak: "Machiavelli, Prens XVII" }
    ],
    arka: function () {
      var s = K.gokAksam("fn") + K.gunes(300, 480, 36, "#ffd8a0");
      s += K.tepe(560, "#5a4a4a", 61, 60);
      /* Floransa silueti: Duomo kubbesi, çan kulesi, Palazzo Vecchio */
      s += '<g fill="#6a4238"><rect x="600" y="500" width="600" height="80"/><path d="M820 500Q820 390 890 380Q960 390 960 500Z" fill="#a85a3a"/><rect x="884" y="360" width="12" height="24"/><rect x="1010" y="370" width="36" height="130"/><rect x="1120" y="400" width="44" height="100"/><rect x="1130" y="360" width="24" height="40"/></g>';
      for (var j = 0; j < 16; j++) s += '<rect class="pencere-isik" style="animation-delay:-' + j * 0.5 + 's" x="' + (620 + j * 34) + '" y="' + (520 + (j % 3) * 14) + '" width="5" height="8" fill="#ffd27a"/>';
      s += K.tepe(620, "#4a4a30", 62, 40) + K.servi(520, 640, .8) + K.servi(1300, 640, .9) + K.servi(1380, 650, .7);
      /* teras: korkuluk, masa, küre, şövalede Vitruvius adamı */
      s += '<rect y="700" width="1600" height="200" fill="#8a6a4a"/><rect y="690" width="1600" height="14" fill="#c8a880"/>';
      for (var x = 20; x < 1600; x += 44) s += '<path d="M' + x + ' 700v-80c-10 -10 -10 -30 0 -40h14c10 10 10 30 0 40v80" fill="#d8bc94"/>';
      s += '<rect y="610" width="1600" height="16" fill="#e0c8a0"/>';
      s += K.masa(560, 770, 380, "#6a4228") + K.kagit(600, 730, 110, 40, -3) + K.kitaplar(790, 770, 4, 12) + K.mum(900, 770, .9);
      s += '<g transform="translate(420 760)"><path d="M0 0V-60" stroke="#6a4a2a" stroke-width="6"/><circle cy="-100" r="44" fill="#4a6a8a"/><g class="don" style="--s:30s"><path d="M-30 -120C-10 -110 10 -130 30 -110M-36 -90C-6 -80 10 -96 38 -86" stroke="#c8b888" stroke-width="5" fill="none"/></g><ellipse cy="-100" rx="50" ry="10" fill="none" stroke="#c8a040" stroke-width="3"/></g>';
      s += '<g transform="translate(1180 820)"><path d="M-60 80L0 -200L60 80M0 -200V90" stroke="#5a3a22" stroke-width="8"/><rect x="-80" y="-180" width="160" height="170" fill="#efe2c2" stroke="#5a3a22" stroke-width="5"/>' +
        '<circle cy="-96" r="62" fill="none" stroke="#6a4a24" stroke-width="2"/><rect x="-52" y="-150" width="104" height="104" fill="none" stroke="#6a4a24" stroke-width="2"/><circle cy="-128" r="9" fill="none" stroke="#6a4a24" stroke-width="2"/><path d="M0 -118V-70M0 -104L-46 -114M0 -104L46 -114M0 -104L-40 -86M0 -104L40 -86M0 -70L-24 -34M0 -70L24 -34M0 -70L-12 -36M0 -70L12 -36" stroke="#6a4a24" stroke-width="2"/></g>';
      return h.svg(s);
    },
    eserler: [
      { x: 42, y: 80, ad: "Masadaki çeviri", panel: '<h3>Ficino ve Platon Akademisi</h3><p>Cosimo de’ Medici, 1462’de <b>Marsilio Ficino</b>’ya Careggi’de bir villa ve Platon’un Yunanca elyazmalarını verir. Ficino Platon’un bütün diyaloglarını (1484) ve Plotinos’u Latinceye çevirir.</p><p>“Platonik aşk” deyimi onundur: güzelliğe duyulan sevgi ruhu Tanrı’ya yükseltir. Toplantılarda Platon’un doğum günü şölenle kutlanır.</p>' },
      { x: 26, y: 72, ad: "Yerküre", panel: '<h3>Giordano Bruno: sonsuz dünyalar</h3><p>Kopernik’ten de ileri gider: evren sonsuzdur, sayısız güneş ve gezegenle dolu, merkezi yoktur. Hafıza sanatı ve büyü üzerine de yazar.</p><p>Engizisyon tarafından yedi yıl yargılandıktan sonra 17 Şubat 1600’de Roma’da Campo de’ Fiori’de yakılır. Heykeli bugün aynı meydanda duruyor.</p>' },
      { x: 74, y: 72, ad: "Vitruvius adamı", panel: '<h3>Leonardo ve insanın ölçüsü</h3><p>Leonardo da Vinci’nin 1490 civarındaki çizimi, Romalı mimar Vitruvius’un kuralını görselleştirir: iyi biçimli bir insan bedeni hem daireye hem kareye sığar.</p><p>İnsan evrenin küçük bir modelidir (<i>mikrokosmos</i>). Sanat, bilim ve mühendislik Rönesans insanında (<i>uomo universale</i>) birleşir.</p>' },
      { x: 56, y: 36, ad: "Kubbe", panel: '<h3>Pico della Mirandola</h3><p>Yirmi üç yaşında 900 tezini herkese açık bir tartışmaya sunar (1486); açılış konuşması <b>İnsanın Onuru Üzerine</b> Rönesans’ın manifestosu sayılır.</p><p>Tanrı insana sabit bir yer vermemiştir: insan kendini hayvanlar kadar alçaltabilir ya da meleklere yükseltebilir. Kabala, Platon, Aristoteles ve İslam filozoflarını uzlaştırmak ister.</p>' },
      { x: 86, y: 48, ad: "Selvi", panel: '<h3>Machiavelli: Prens</h3><p>Floransa’nın sürgündeki eski diplomatı 1513’te <b>Il Principe</b>’yi yazar. Siyaset olması gerekeni değil, olanı konu almalıdır: prens gerektiğinde “iyi olmamayı” öğrenmelidir.</p><p>Talih (<i>fortuna</i>) bir ırmak gibidir; ona karşı set çekecek olan <i>virtù</i>, yani ustalık ve cesarettir. Söylevler’de ise cumhuriyetin savunucusudur.</p>' },
      { x: 20, y: 52, ad: "Batan güneş", panel: '<h3>Petrarca ve hümanizm</h3><p>“Hümanizmin babası” Petrarca (1304–1374) Cicero’nun kayıp mektuplarını bulur, antik yazarlara mektuplar yazar ve Orta Çağ’ı “karanlık çağ” olarak adlandırır.</p><p><i>Studia humanitatis</i>: dilbilgisi, retorik, tarih, şiir ve ahlak felsefesi. Kaynaklara dönüş (<i>ad fontes</i>) sloganıyla antik metinler aranır, düzeltilir, basılır.</p>' },
      { x: 94, y: 82, ad: "Korkuluk", panel: '<h3>Erasmus ve Montaigne</h3><p>Rotterdamlı <b>Erasmus</b> Deliliğe Övgü’de (1511) kilisenin ve bilginlerin kibriyle alay eder; Yeni Ahit’in Yunanca metnini yayımlar (1516).</p><p><b>Montaigne</b> Denemeler’inde (1580) kendini konu edinir: “Kitabımın malzemesi benim.” Şüpheci sorusu “Ne biliyorum ki?” Descartes’a ve modern bireyin ortaya çıkışına uzanır.</p>' }
    ]
  });
  merkezeEkle("felsefe", [
    { hedef: "bilim-felsefesi", aciklama: "Kuğulu göl: yanlışlanabilirlik, paradigmalar, inanç ağı.",
      sanat: K.kapi("#9FD0E0", '<path d="M-60 40H60" stroke="#9FD0E0" stroke-width="2" opacity=".5"/><g transform="translate(-22 20) scale(.9)"><path d="M-40 0C-40 -18 -10 -22 20 -14C30 -12 34 -20 30 -34C28 -46 36 -54 44 -50C38 -46 36 -40 40 -28C44 -14 40 2 20 6C0 10 -40 10 -40 0Z" fill="#f4f0ea"/></g><g class="yuz" style="--s:4s" transform="translate(30 36) scale(.6)"><path d="M-40 0C-40 -18 -10 -22 20 -14C30 -12 34 -20 30 -34C28 -46 36 -54 44 -50C38 -46 36 -40 40 -28C44 -14 40 2 20 6C0 10 -40 10 -40 0Z" fill="#1a1418" stroke="#9FD0E0" stroke-width="1"/></g>', "#101820") },
    { hedef: "politik-felsefe", aciklama: "Leviathan’ın gölgesi: Platon’dan Rawls’a devlet ve adalet.",
      sanat: K.kapi("#E8A070", '<rect x="-14" y="-40" width="28" height="90" fill="#d8ccb4"/><rect x="-22" y="-50" width="44" height="12" fill="#d8ccb4"/><rect x="-22" y="48" width="44" height="10" fill="#d8ccb4"/><path d="M-26 -60L-18 -84L-8 -66L0 -90L8 -66L18 -84L26 -60Z" fill="#c8a040" class="yuz" style="--s:3s"/>') },
    { hedef: "felsefe-tarihi", aciklama: "Zaman galerisi: Antik Yunan, Roma ve Rönesans’a açılan geçitler.",
      sanat: K.kapi("#E8C878", [-50, 0, 50].map(function (x, i) { return '<path d="M' + (x - 20) + ' 50V-10A20 20 0 0 1 ' + (x + 20) + ' -10V50Z" fill="' + ["#6a9ac8", "#c8603a", "#e8b060"][i] + '" opacity=".85" class="hale" style="animation-delay:-' + i + 's"/>'; }).join("") + '<path d="M-80 52H80" stroke="#E8C878" stroke-width="2"/>') }
  ]);
})();
