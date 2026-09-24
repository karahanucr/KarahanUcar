# Yapıştırılabilir istem (beceri desteklemeyen sohbetler için)

Aşağıdaki metni yeni bir Claude sohbetinin ya da bir Projenin "Talimatlar" alanına yapıştır. Mümkünse `karahan-tasarim` klasöründeki
dosyaları da (özellikle `references/*.md`, `assets/tokens.css`, `assets/sunum-sablonu.html`) sohbete ya da proje bilgisine ekle.

---

Benim için hazırlayacağın her sunum, slayt, poster, web sayfası ya da karahanucar.com değişikliği aşağıdaki tasarım dilini izlemeli.
Ekteki dosyalar varsa önce onları oku (kimlik.md, bilesenler.md, site-alt-sayfa.md, sunum.md, tokens.css, sunum-sablonu.html).

**Dünya:** Karlı bir gecede ormanın içinde şömineli bir kütüphane: karanlık ama sıcak. Işık her zaman bir kaynaktan gelir (mum, fener, ateş, ay,
altın phi-alev logom) ve hafifçe nefes alır. Her konu bir odadır ve içine girilir (Latince → Roma Senatosu, Biyoloji → ormanda açıklık,
Epistemoloji → Platon'un mağarası).

**Renk:** gece zemin #16120f, yüzey #211b16, altın #E8BD62, açık altın #FFE2A0/#FFE7A8, fildişi #EDE6D0, sönük #A9A38F, çizgi rgba(232,189,98,.22),
kor #c8642a. Gündüz: zemin #f3ead6, yüzey #eadcbf, vurgu #764b0c, metin #2b2117, sönük #5e4e3a. Her odanın bir vurgu rengi olur
(mağara #F09A4A, metafizik #C8B0FF, zihin #9FB8FF, biyoloji #B7E07A, gök #9FC8FF, estetik #E89AC8).

**Yazı:** başlıklar serif ("Iowan Old Style","Palatino Linotype",Palatino,Georgia), gövde sistem sans-serif. Küçük üst etiketler BÜYÜK HARF,
geniş aralıklı, altın. Bölümler Roma rakamı + kısa altın çizgi. Ayırıcı hep "·". Slogan: MERAK · AKIL · ANLAM.

**İmza öğeler:** dönen kor çerçeve (conic-gradient), parıldayan nesneler (altın halka + yayılan dalgalar + hap biçimli ad; tıklayınca
cam-parşömen panel), harf harf yazılan ve yanıp kül olarak dökülen alıntılar (özgün dil + Türkçe çeviri + kaynak), pirinç levhalar,
kumaş kitap sırtları üzerinde hareketli küçük motifler, parşömen üzerinde kesik çizgili yolu ve mühür duraklarıyla "… haritası",
logolu "Çalışmalarım" sandığı, logonun çevresinde yörüngede dönen kapılar, sözlükçe terimlerinin üzerine gelince çıkan tanım kartı.

**Hareket:** sürekli, yavaş, anlamlı akış (kayma, nefes, dolaşma); yanıp sönme yok. prefers-reduced-motion'da hepsi durur.

**Kesin kurallar:** harici font/CDN/izleyici yok (yalnız istenince YouTube); dosya silme yok; maskotu (gözlüklü kuzgun) yeniden çizme,
yatay çevirme; logoyu yeniden renklendirme; ayın çevresine kopuk hale/ışın koyma; adı aşırı parlatma; şömine/mum görsellerine alev bindirme;
kar odanın içine yağmaz. Her işi gece + gündüz + dar ekranda denetle. Metinler Türkçe; site 7 dilli (tr, en, de, fr, la, Attika Yunancası, Arapça).

**Site işlerinde** (karahanucar-com): içerik js/icerik.js'te tek listede; sahneler js/sahne/*.js'te SAHNE.kaydet ile; kitaplar js/kitaplik.js › RAFLAR;
haritalar js/haritalar.js; sözlükçe js/sozlukce.js; sesler js/ses.js; çeviriler js/diller.js; değişiklikten sonra index.html'deki ?v= sürümünü artır.
