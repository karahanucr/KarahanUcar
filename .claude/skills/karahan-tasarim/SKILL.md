---
name: karahan-tasarim
description: Karahan Uçar'ın tasarım dili ("Düşüncenin Eşiğinde" — gece kütüphanesi, altın phi-alev logo, parıldayan nesneler, kül olan alıntılar, haritalar, ağaç kitaplık). Karahan için bir SUNUM, slayt, deste, poster, kapak ya da web sayfası hazırlarken; karahanucar.com sitesine yeni bir alt sayfa/sahne (ör. "Sosyal bilimler içine Tarih sahnesi aç"), içerik, harita, sözlükçe terimi eklerken; ya da "benim tarzımda", "sitemdeki gibi" denildiğinde MUTLAKA kullan. Use for any presentation, slide deck, web page or site change for Karahan Uçar.
---

# Karahan Uçar tasarım dili

Bu beceri, karahanucar.com için geliştirilen ve Karahan'ın onayladığı tasarım dilini taşır. Amaç: başka bir oturumda ya da modelde de
**aynı dünyayı** kurmak — ister web sitesine yeni bir oda eklensin, ister bir konferans sunumu hazırlansın.

## Özün özü (her işte geçerli)

**Dünya:** Karlı bir gecede, ormanın içinde, şömineli bir kütüphane. Karanlık ama sıcak. Işık hep bir kaynaktan gelir (mum, fener,
ateş, ay, altın logo) ve hep hafifçe **nefes alır** (titrer, parıldar, dolaşır). Her konu bir **oda/sahne**dir: Latince → Roma Senatosu,
Biyoloji → ormanda bir açıklık, Epistemoloji → Platon'un mağarası. Bilgi "gösterilmez", içine **girilir**.

**Renk (gece):** zemin `#16120f`, yüzey `#211b16`, altın `#E8BD62`, açık altın `#FFE2A0`/`#FFE7A8`, fildişi `#EDE6D0`, sönük `#A9A38F`,
çizgi `rgba(232,189,98,.22)`, kor `#c8642a`. **Gündüz** (açık tema da her zaman düşünülür): zemin `#f3ead6`, yüzey `#eadcbf`,
koyu kehribar `#764b0c`, mürekkep `#2b2117`, sönük `#5e4e3a`. Ayrıntı: `references/kimlik.md`.

**Yazı:** başlıklar serif (`"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif`, 500 ağırlık), gövde sistem sans-serif.
Küçük üst başlıklar BÜYÜK HARF + geniş harf aralığı (.2–.3em) + altın. Bölümler Roma rakamıyla (I, II, III…) ve yanında kısa altın çizgi.
Ayırıcı her zaman orta nokta: **"·"** (Karahan bunu özellikle seviyor). Slogan: **MERAK · AKIL · ANLAM**.

**Hareket:** sürekli, yavaş ve **anlamlı** akış en sevilen şeydir (ör. alıntının yanıp kül olup dökülmesi, sonra yenisinin korlardan
doğması; dönen kor çerçeve; akıp giden listeler). Yanıp sönme (blink) değil, **kayma / nefes / dolaşma**. Her animasyonun
`prefers-reduced-motion` karşılığı olur.

**Ses:** tıklamalar bağlama göre ses verir (kitap → sayfa, Latince → taş, Yunanca → lir, Arapça → ud); her odada sakin bir ortam sesi.
Hepsi Web Audio ile üretilir (dosya/CDN yok), kapatılabilir.

## Kesin kurallar (Karahan'ın tercihleri — çiğneme)

- Harici font, CDN, izleyici **yok** (tek istisna: kullanıcı isteyince yüklenen YouTube). Her şey satır içi/yerel.
- **Kalıcı silme yok**: dosya silme; eskisini yerinde bırak, kullanılmıyorsa not düş.
- Maskot (gözlüklü kuzgun) **yeniden çizilmez, yatay çevrilmez**; yalnız bütün görsel hafifçe salınabilir. Logo (altın phi-alev) **yeniden renklendirilmez**
  (gece: `logo-seffaf.svg`, gündüz: `logo-seffaf-gunduz.svg`).
- Ayın çevresinde kopuk hale/ışın yok; adı (başlığı) aşırı parlatan efekt yok; şömine/mum görsellerinin üstüne alev bindirme yok; kar odanın içine yağmaz.
- Her değişiklikte hem **gece hem gündüz** görünümü ve **dar ekran** (390 px) denetlenir; yatay taşma olmaz.
- Metinler Türkçe; site 7 dilli (tr, en, de, fr, la, el=Attika Yunancası, ar=sağdan sola). Yeni arayüz metinleri `js/diller.js`'e 6 dilde eklenir.
- Nesneler ekrandan taşmaz, başlık/alıntıyla çakışmaz.

**Sunumlarda kalıcı kural:** başlıkların üstüne ve kartlara konuyu gösteren küçük, sürekli hareketli SVG çizimler konur
(ör. "Nesneler zamanda nasıl sürer?": bütün hâlinde kayan küre · sırayla yanan zamansal dilimler). Ayrıntı ve fikir bankası:
`references/sunum.md`; çalışan örnek: `assets/sunum-canli-ornek.html`.

## Hangi işte hangi dosya

| İş | Oku |
|---|---|
| Renk, yazı, boşluk, gölge, simge dili, ses/metin tonu | `references/kimlik.md` |
| Hazır bileşen tarifleri (kor çerçeve, parıldayan nesne, kül alıntı, pirinç levha, kitap sırtı, akış listesi, harita, sandık, yörünge, terimce…) | `references/bilesenler.md` |
| **Siteye yeni oda/alt sayfa**, içerik, harita, sözlükçe ekleme | `references/site-alt-sayfa.md` |
| **Sunum / slayt / poster** | `references/sunum.md` + `assets/sunum-sablonu.html` |
| Hazır CSS değişkenleri ve çekirdek bileşenler | `assets/tokens.css` |

## Çalışma sırası

1. İşin türünü belirle (site / sunum / diğer) ve yukarıdaki dosyayı oku.
2. Konunun **odasını** düşün: bu konu hangi yerde, hangi çağda, hangi ışıkla yaşar? (ör. Tarih → bir arşiv mahzeni ya da harabe;
   Müzik → gece konser salonu). Bir vurgu rengi seç (`kimlik.md` › oda renkleri).
3. Sayfayı/slaytı kur: başlık solda, yanında **harita** (konunun tarihine kuşbakışı), **Çalışmalarım sandığı**, parıldayan nesneler → açılan paneller,
   dönen/kül olan alıntılar, sözlükçe terimleri.
4. Gece + gündüz + dar ekran + hareket azaltılmış görünümü denetle; tarayıcıda aç ve ekran görüntüsüyle bak.
5. Siteye dokunduysan: css/js bağlantılarındaki `?v=` sürümünü artır.
