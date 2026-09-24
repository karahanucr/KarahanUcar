# Bileşen tarifleri

Sitedeki gerçek uygulamalar: `karahanucar-com/css/style.css`, `css/sahne.css`, `js/sahne/motor.js`, `js/kitaplik.js`, `js/kutuphane.js`.
Aşağıdakiler bağımsız kullanılabilecek özlerdir. Hepsinin `@media (prefers-reduced-motion: reduce)` karşılığı olmalı.

## 1. Dönen kor çerçeve (kart, eşik, randevu)
```css
@property --ang { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.kor-cerceve { position: relative; border-radius: 12px; }
.kor-cerceve::before { content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 2px; pointer-events: none;
  background: conic-gradient(from var(--ang), transparent 0 45%, rgba(232,189,98,.35) 65%, #E8BD62 82%, #FFE2A0 90%, transparent 96%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); animation: dolan 5s linear infinite; }
@keyframes dolan { to { --ang: 360deg; } }
```
Kartta yalnız üzerine gelince (`opacity 0 → 1`), eşik/randevu kartında sürekli. Gündüzde renkler `#a8741e / #8a5a14`.

## 2. Parıldayan nesne (etkileşim noktası)
```html
<button class="nokta" style="--x:40;--y:62"><span class="halka"><i></i></span><span class="nokta-ad">Kitabe</span></button>
```
```css
.nokta { position: absolute; left: calc(var(--x)*1%); top: calc(var(--y)*1%); translate: -50% -50%; display: flex; flex-direction: column; align-items: center; gap: .45rem; background: none; border: 0; color: #f6ecd2; cursor: pointer; }
.halka { position: relative; width: 2.3rem; height: 2.3rem; border-radius: 50%; border: 1.5px solid var(--vurgu);
  background: radial-gradient(closest-side, rgba(255,226,160,.35), rgba(255,226,160,.06) 70%, transparent); box-shadow: 0 0 14px rgba(232,189,98,.45); }
.halka::before, .halka::after { content: ""; position: absolute; inset: -1px; border-radius: 50%; border: 1px solid var(--vurgu); opacity: 0; animation: dalga 2.8s ease-out infinite; }
.halka::after { animation-delay: 1.4s; }
@keyframes dalga { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(2.4); opacity: 0; } }
.nokta-ad { font-size: .78rem; letter-spacing: .06em; padding: .18rem .7rem; border-radius: 999px; background: rgba(12,9,7,.7); border: 1px solid rgba(232,189,98,.28); }
```
Biçim çeşitleri: **yıldız** (clip-path yıldız + dönme), **kor** (turuncu radyal, titrek), **kristal** (döndürülmüş kare, cam), **yaprak** (`border-radius: 0 60% 0 60%`, sallanır), **dalga** (kesikli dönen halka).
Nokta tıklanınca yanında cam-parşömen **panel** açılır (eser sağdaysa panel solda): başlık serif, `pn-ust` küçük altın etiket, `pn-soz` alıntı kutusu (sol kenarda altın çizgi).

## 3. Alıntı: harf harf yazılır, dönüşür
- Varsayılan: harf harf yazılır (38–78 ms), sonunda yanıp sönen `▍` imleç; 15 sn sonra **buğulanarak** (blur + yukarı) söner, yenisi yazılır.
- **Kül** (en sevilen): her harf `span` olur; sırayla altından turuncuya, kızıla, griye döner, sonra rastgele yönde düşüp döner ve kaybolur
  (`translate(dx, 60–150px) rotate(±60deg) scale(.6)`, 1.7 sn, harf başına 28 ms gecikme). Yenisi korlardan doğar: turuncu, bulanık, küçük → açık altın.
  Gerçek kod: `motor.js › sozBaslat › kul / dogus`.

## 4. Pirinç levha
```css
.levha { padding: .55rem .9rem; border-radius: 6px; border: 1px solid #5a3e14; color: #3a2408; font: 600 .95rem var(--serif);
  background: linear-gradient(160deg, #f3d488, #c99a3e 45%, #e8c06a 60%, #a8782a); box-shadow: 0 3px 8px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.5); position: relative; overflow: hidden; }
.levha::after { content: ""; position: absolute; top: 0; bottom: 0; width: 40%; left: -60%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.55), transparent); animation: parla 6s ease-in-out infinite; }
@keyframes parla { 0%, 70% { left: -60%; } 100% { left: 130%; } }
```
Üstte küçük bir çivi noktası. Raf adları, portrenin altındaki ad levhası, "Çalışmalarım".

## 5. Kitap sırtı (+ canlı motif)
Koyu doygun kumaş rengi (`#5c2b25 #2b3a52 #2f4533 #303548 #5b4521 #4a2a3d #284543 …`), yatay ışık gradyanı, iki yaldız bant, üstte 30×40'lık
**hareketli çizgi motif** (göz kırpar, atom döner, terazi sallanır, kum saati döner, sarkaç salınır, film bandı akar), altta dikey serif ad.
Kendi sahnesi olan kitapta altta küçük kor nokta; içeriği olmayan kitap sönük ve tıklanmaz ("Yakında" ipucu). Motiflerin tamamı: `js/kitaplik.js › MOTIF`.

## 6. Ağaç kitaplık
Gövde sağda yükselir, raflar gövdeden sola uzanan dallardır; tepede bakır yapraklı taç (`#b8643a #d08a5a #e6a878 #8a4228`), gövdede fenerli kovuk.
Aradan eğik ışık huzmeleri (25°, `mix-blend-mode: screen`), huzmelerde toz, ara sıra düşen yaprak, arada bir raftan hafifçe çekilen kitap.
Dallar incelen kübik eğrilerle JS'te çizilir (`js/kitaplik.js › dal()`), ekran boyu değişince yeniden çizilir.

## 7. Akış listesi ("Son eklenenler")
Sabit yükseklikli pencere (bütün satırlar en uzun satır kadar); 4'ten fazla kayıt varsa 5,2 sn'de bir şerit **bir satır yukarı kayar**
(çıkan bulanıklaşıp söner, giren belirir). Altta sayaç `2–5 / 11`, ilerleme çubuğu (kor gradyan), ‹ ❚❚ › düğmeleri. Üzerine gelince/odakta durur.
Her satır: hareketli tür simgesi (daire içinde), TÜR etiketi, serif başlık, açıklama (2 satır), "Felsefe · Eylül 2026", sağda soluk numara ve ok.

## 8. Harita (konunun tarihi)
Parşömen kâğıt üzerinde kesik çizgili kırmızı-kahve yol (Catmull-Rom ile duraklardan geçer), maskeyle çizilerek belirir; duraklar mühür gibi
numaralı kırmızı daireler (seçilen parlar, geçilenler altın olur), üst/alt dönüşümlü etiket (yıl + ad), köşede pusula gülü, silik kara parçaları.
Parlayan bir **yolcu** yol boyunca seçilen durağa yürür. Yanda (dar ekranda altta) açıklama kartı ve ‹ n / N ›. Dar ekranda yol dikey.
Kenarlar feTurbulence ile yanık/yırtık; arkada dönem kuşakları (renkli, adlı), altta yıl cetveli, denizde dalgacıklar ve küçük bir gemi.
"Yolculuğa çık" düğmesi durakları 6 sn arayla kendiliğinden gezer. Kart: yıl · yer, ad, metin, "Anahtar eser", söz (alıntı bloğu), kavram çipleri.
Veri: `{ yil, ad, yer, eser, kavram[], metin, soz }` + `donemler`. Kod: `motor.js › haritaAc / haritaSec / turDur`.

## 9. Çalışmalarım sandığı
Ahşap sandık (kapak üzerine gelince aralanır, açılınca içinden ışık), önünde logolu kilit plakası. Açılınca: logolu başlık, sahne adı,
çekmece gibi 18 sekme (Tümü + ALIŞTIRMA, BİLDİRİ, ÇALIŞTAY, ÇEVİRİ, İZLENCE, KİTAP, KONFERANS, MAKALE, NOTLAR, ÖDEVLER, POSTER, PROJE,
SEMİNER, SEMPOZYUM, SUNUM, TEZLER, VİDEO), boş çekmece: "❦ Bu çekmece henüz boş; yakında dolacak."
Kayıtlar yerinde açılır: video ve belge satır içi (kayıt genişler), poster küçük resmi büyütülür; etiket çipleri tıklanınca sandık o etikete süzülür.
Merkez odalarda "Bu alandaki içerikler" de akış listesi gibi kayar (3'ten fazlaysa 4,5 sn'de bir); her satırda "→ Oda adı" ve #etiketler.

## 10. Yörünge (merkez oda)
Kapılar ortadaki logonun çevresinde elips yörüngede yavaşça döner (75 sn/tur): öndeki büyük ve parlak, arkadaki küçük ve sönük
(`scale .6–1`, `brightness .5–1`). Üzerine gelince durur, klavyeyle odaklanan kapı öne döner. "Yakında" odalar dış yörüngede, ters yönde,
kesik çizgili küçük uydular. Logonun çevresinde yavaş dönen iki ince halka.

### 10b. Kalabalık merkez ve komşu odalar
9'dan fazla kapı olunca kapılar **iki halkaya** bölünür: çift sıradakiler dış halkada, tekler iç halkada ters yönde döner; derinlik sırası ekran yüksekliğine göre verilir.
Her alt odanın altında ortada **komşu odalar** çubuğu vardır: "‹ Önceki oda · n / N · Sonraki oda ›" (klavyede `[` ve `]`); geçiş yana kayarak olur, geri tuşu merkeze döner.
Liste merkezin kapı sırasından (ya da geçitli odalarda geçit sırasından) gelir; sözlükçe dahil değildir.

## 11. Terimce
Sözlükçede olan terimler metinde noktalı altın alt çizgiyle işaretlenir (her terim bir kapta bir kez, Türkçe ekleri tanır);
üzerine gelince koyu cam kart: "SÖZLÜKÇE · FELSEFE", serif terim + köken (italik), tanım.

## 12. Küçük ama karakteristik
- **Eşik**: "DÜŞÜNCENİN EŞİĞİNDE" — geniş aralıklı altın büyük harf, çevresinde sürekli dönen kor çerçeve.
- **Ayraç**: bölümler arasında iki yana sönen çizgi ve ortada hareketli ikon (yazan tüy kalem, tarayan büyüteç, çevrilen sayfa, açılan mektup, dönen küre).
- **Kayan şerit**: "Varlık Felsefesi *(Metafizik)* · Zihin Felsefesi · Bilgi Felsefesi *(Epistemoloji)* · Dil Felsefesi" soldan sağa sürekli kayar, kenarlar maskeyle söner.
- **Ay ↔ güneş**: tema değişirken gök cismi ağaçların arkasına batar, diğeri doğar.
- **Okuma ilerlemesi**: menünün altında soldan sağa yanan kor çizgisi.
- **Kitaplık canlıları**: ağaçta yavaşça yürüyen salyangoz ve uğur böceği, fenerin çevresinde dönen güve, iki kitaptan başını çıkaran kitap kurdu, raflar arasında ateş böcekleri; altta sayaç "6 alan · N oda · N harita · N terim" ve "✦ Rastgele bir oda aç".
- **Katlanır ortam paneli**: sol altta "› Ses: Şömine · Yağmur · Rüzgâr · Kapalı · Tık sesi" ve "› Dışarıda: Kar · Yağmur · Rüzgâr"; etikete basınca seçenekler içine çekilir.

## 13. Tur 7 eklentileri
- **Randevu takvimi** (`js/randevu.js`): "Randevu al" sayfada altın çerçeveli bir takvim sayfası açar; içinde Google Takvim randevu akışı (iframe, yalnız tıklanınca yüklenir). Gömme adresi `#randevu[data-gomme]`.
- **İletişim simgeleri**: her bağlantının önünde altın çizgili madalyon içinde çizgisel simge; üzerine gelince dolar ve hafifçe döner.
- **Bölüm ayırıcı**: iki ince altın çizgi, ortada baklava ve kıvrımlı kartuş (gece altın, gündüz bakır).
- **Kendini çizen logo** (`js/logo-ciz.js`): logo bir maskeyle, tepeden sol aşağı, sağa, sağ yukarı, içeri kıvrılıp gövdeden aşağı inerek açılır; logonun biçimi değişmez.
- **Dışarıda › Uzay**: derin yıldız alanı, ara sıra akan yıldız, nefes alan bulutsular (katman içeriğin önünde, yalnız "screen" karışımıyla).
- **Sahne üst çubuğu**: logo ve ad ortada; solda geri + yol, sağda ses + kütüphaneye dön.
