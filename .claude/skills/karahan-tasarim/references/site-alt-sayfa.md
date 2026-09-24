# Siteye yeni oda (alt sayfa / sahne) eklemek

Site: `karahanucar-com/` (durağan HTML/CSS/JS, derleme yok, harici bağımlılık yok). Yerelde denemek için:
`python3 -m http.server 8766 --directory karahanucar-com` → `http://localhost:8766/#sahne-<kimlik>` sahneyi doğrudan açar.

## Mimari (bilmen gereken)
| Dosya | Görev |
|---|---|
| `index.html` | Ana sayfa. Bölümler: I Hakkında · II Bilgi (ağaç kitaplık + Son eklenenler) · III Yayınlar · IV Kanal · V Randevu · VI İletişim · VII Dil |
| `js/icerik.js` | **Bütün içerik tek listede** (sunum, makale, video, not…). Bilgi/Yayınlar/Kanal listeleri ve sahne sandıkları buradan beslenir. yazi.js'ten önce yüklenir. |
| `js/kitaplik.js` | Kitaplık rafları (`RAFLAR`) ve kitap sırtı motifleri (`MOTIF`); ağacı çizer. |
| `js/sahne/motor.js` | Sahne motoru: kitap açılışı, geçişler, parıldayan nesneler, panel, alıntılar, harita, sandık, sözlükçe, yörünge, panorama. |
| `js/sahne/{felsefe,diller,doga,diger}.js` | Sahne tanımları (`SAHNE.kaydet`). |
| `js/haritalar.js` | Her alt sahnenin "… haritası" durakları. |
| `js/arsiv.js` | Çalışmalarım sandığının çekmece (tür) sırası. |
| `js/sozlukce.js` | Sözlükçe terimleri (felsefe, doga, formel, sosyal, estetik). |
| `js/terimce.js` | Metinlerde sözlükçe terimlerini işaretler. |
| `js/ses.js` | Web Audio: bağlama göre tık sesleri (`KAPI`, `NOKTA`) ve odalara ortam sesleri (`ORTAM`, `HARITA`). |
| `js/diller.js` | 6 dilde çeviri sözlüğü (Türkçe metin → çeviri). |
| `css/style.css`, `css/sahne.css` | Ana sayfa ve sahne stilleri (sona eklenen bloklar öncekileri ezer). |

Betik sırası index.html'de önemlidir: hareket → icerik → kitaplik → ses → diller → yazi → tema → kutuphane → arsiv → sozlukce → haritalar → terimce → sahne/motor → sahne/*.

## Örnek: "Sosyal Bilimler içine Tarih odası aç"

### 1) Sahneyi tanımla — `js/sahne/diger.js` (sosyal bölümünün altına)
```js
S.kaydet("tarih", {
  ad: "Tarih", ust: "sosyal-bilimler", yer: "Bir arşiv mahzeni · mum ışığında · bugün", vurgu: "#E8B070", alan: "sosyal-bilimler",
  alt: "Tozlu belgeler, mühürler, eski bir takvim: geçmiş nasıl bilinir, nasıl anlatılır?",
  parcacik: { tur: "toz", adet: 60 },           // toz · atesbocegi · yaprak · yildiz · kor · kum · harf
  isaret: "halka",                              // halka · yildiz · kor · kristal · yaprak · dalga
  sozYer: "sag",                                // alıntı sağ üstte (boşsa sol altta)
  sozGecis: "kul",                              // isteğe bağlı: yanıp kül olarak değişsin
  sozler: [
    { metin: "Historia magistra vitae.", dil: "la", ceviri: "Tarih hayatın öğretmenidir.", kaynak: "Cicero, De Oratore II.36" },
    { metin: "Ἱστορίης ἀπόδεξις ἥδε", dil: "grc", ceviri: "Bu, bir araştırmanın sergilenmesidir.", kaynak: "Herodotos, Tarih I.1" }
  ],
  arka: function () { return h.svg('<rect width="1600" height="900" fill="url(#trG)"/>' /* + tonozlar, raflar, mum … */, '<linearGradient id="trG" …/>'); },
  on: function () { return h.svg('…ön plandaki masa kenarı…'); },   // isteğe bağlı, paralaksta daha çok oynar
  eserler: [
    { x: 30, y: 62, ad: "Mühürlü ferman", panel: '<h3>Birincil kaynak</h3><p>…</p><p class="pn-soz">«…» <small>…</small></p>' },
    { x: 58, y: 48, ad: "Takvim", panel: "<h3>Kronoloji</h3><p>…</p>" }
  ]
});
```
- Koordinatlar 1600×900 çizimin yüzdesidir; kenarlardan en az %6 içeride tut (motor taşanı içeri iter ama çizimle kayar).
- SVG'de sınıflar hazır canlanır: `yp` (yıldız pırıltısı), `don` / `don-ters` (döner, `--s` süre), `yuz` (yüzer), `alev` + `h.alev(x,y,ölçek)`, `h.bulut(...)`, `h.yildizlar(...)`, `pencere-isik`, `dalga-x`.
- Gradyan kimlikleri sahneye özgü önek alsın (`trG`, `trM`…) ki diğer sahnelerle çakışmasın.
- **Çok nesne gerekiyorsa**: `genislik: 1.6` ver ve çizimi `viewBox="0 0 2560 900"` genişliğinde yap; kamera sürükleyerek/kenara yaklaşınca kayar.
- Başlığın solundaki harita ve sağındaki Çalışmalarım sandığı **kendiliğinden** gelir (alt sahnelerde).

### 2) Merkez odaya kapı ekle (aynı dosyada `sosyal-bilimler` tanımı)
`kapilar` listesine `{ hedef: "tarih", sanat: kapiTarih, aciklama: "Arşiv mahzeni: belgeler, mühürler, takvimler." }` ekle (`sanat` = 200×250'lik
bir SVG), `yakinda` listesinden "Tarih"i çıkar. Kapılar logonun çevresinde yörüngede kendiliğinden dizilir.

### 3) Kitabı canlandır — `js/kitaplik.js › RAFLAR`
`{ ad: "Tarih", motif: "kumsaati" }` → `{ ad: "Tarih", sahne: "tarih", motif: "kumsaati" }`. (Sahnesi olmayan kitap tıklanmaz; `sahne` eklenince açılır.)

### 4) Harita — `js/haritalar.js`
```js
tarih: { alt: "Herodotos'tan dijital arşivlere.", duraklar: [ { yil: "MÖ 430", ad: "Herodotos", metin: "…" }, … ] }
```
8–10 durak; her metin 1–2 cümle. Durak sayısı değişince harita kendini düzenler.

### 5) Ses — `js/ses.js`
`HARITA` (ortam sesi) ve `KAPI`/`NOKTA` (tık sesi) sözlüklerine `tarih: "…"` ekle (ör. ortam `"kutuphane"`, tık `"sayfa"`). Yeni bir ortam gerekirse `ORTAM`'a ekle.

### 6) İçerik ve sandık — `js/icerik.js`
```js
{ id: "tarih-notlari-1", tur: "notlar", baslik: "Kaynak eleştirisi", aciklama: "…", tarih: "2026-10",
  alan: ["sosyal-bilimler"], sandik: ["tarih"], belge: "belgeler/tarih/kaynak-elestirisi.pdf" }
```
`tur`: alistirma · bildiri · calistay · ceviri · izlence · kitap · konferans · makale · notlar · odevler · poster · proje · seminer · sempozyum · sunum · tezler · video.
`belge` varsa Yayınlar'da indirilebilir; `tur: "video"` + `youtube: "KIMLIK"` ise Kanal'da oynar. Her kayıt Bilgi › Son eklenenler'de görünür.

### 7) Sözlükçe (isteğe bağlı) — `js/sozlukce.js › sosyal`
`{ terim: "Kaynak eleştirisi", koken: "…", aciklama: "…", ornek: "…" }` → sözlükçe odasında ve metinlerde üzerine gelince tanım.

### 8) Çeviri — `js/diller.js`
Yeni arayüz metinleri (sahne adı, yer, alt, nesne adları, kapı açıklaması) için 6 dilde anahtar ekle. Panel içerikleri Türkçe kalabilir.

### 9) Bitir
- index.html'deki bütün `?v=` sürümlerini artır (ör. `20260924f` → `20261001a`).
- Tarayıcıda aç: `#sahne-tarih`; gece + gündüz, 1440×900 ve 390×844, hareket azaltılmış; konsolda hata olmasın; nesneler başlık/alıntıyla çakışmasın.
- Kural hatırlatması: dosya silme yok; harici font/CDN yok; logo ve maskot değiştirilmez.

## Yeni bir alan (raf) eklemek
`RAFLAR`'a `{ alan, ad, sahne: "<merkez-kimlik>", kitaplar: [...] }` ekle, merkez sahneyi `kapilar` ile tanımla, Bilgi süzgeçlerine
(`index.html › .dizin-suz`) bir düğme ekle; ağaç yeni dalı kendiliğinden çizer.
