# Yeni (yerel) oturum için görev promptu

Aşağıdaki metnin tamamını yeni oturuma yapıştır.

---

Merhaba. Ben Karahan Uçar. Bu depo kişisel/akademik sitemin deposu (karahanucar-com/). Önceki bir oturumda birlikte "Metafiziğe Giriş" adlı 10 dakikalık bir video planladık; şimdi onu Google Flow ile üretmeni istiyorum. Bu oturum benim bilgisayarımda çalışıyor; Chrome'da Google Flow'a (https://labs.google/fx/tools/flow) giriş yapmış durumdayım ve Claude in Chrome eklentisiyle Flow'u benim adıma kullanabilirsin.

## Önce oku
1. Git dalını çek: `git fetch origin claude/adoring-dijkstra-8fnhxj` ve bu dalda çalış (yoksa oluştur/izle). Bütün dosyalar orada.
2. `CLAUDE.md` ve `.claude/skills/karahan-tasarim/SKILL.md` (tasarım dilim, kesin kurallarım).
3. `video/metafizik-giris/01-metin.md` → anlatım metni. **ONAYLANDI**, metni değiştirme.
4. `video/metafizik-giris/02-sahne-tasarimi.html` → tarayıcıda aç. İçinde: altyazının canlı örneği (görünüşü bu olacak), stil kılavuzu, 32 sahne (zaman, kaynak, o sahnenin altyazısı, görsel tarif) ve 34 kopyalanabilir Google Flow promptu (her biri stil kılavuzuyla başlar). **Sahne tasarımı henüz onaylanmadı.**

## Kesin kararlar
- **Yapay ses yok.** Seslendirme yok; anlatım sahne sahne **altyazı** olarak akar. Altyazı görünümü odalardaki alıntılar gibi: italik serif, açık altın #FFE7A8, harf harf yazılır, mor imleç; yeni satırda önceki satır yukarı kayıp söner; paragraf sonunda satır yanıp kül olur; özgün dildeki alıntılar ortada büyük alıntı kartı; bölüm geçişlerinde dönen yörüngeli madalyon kartı; sol üstte küçük bölüm etiketi. Ölçüler ve davranış 02-sahne-tasarimi.html'deki canlı örnekte (CSS/JS oradan alınabilir).
- Flow görüntülerinde **yazı, harf, sayı, logo, konuşma olmayacak** (promptlarda yasak). Bütün yazılar altyazı katmanından gelir.
- Logo değiştirilmez; açılış/kapanışta kendini çizer (`.claude/skills/karahan-tasarim/assets/logo-cizen.svg.html` + `logo-ciz.js`, sıra: sol hilal · sağ hilal · gövde · en son taban).
- Maskot (gözlüklü kuzgun) yeniden çizilmez; videoda kullanılacaksa bana sor.
- Dosya silme yok. Adım adım onay benim kalıcı tercihim: her aşamanın sonunda bana göster, onayımla devam et.

## İş akışı (her adımın sonunda bana kısa rapor + onay)
1. **Sahne tasarımı onayı:** 02-sahne-tasarimi.html'yi bana özetle ve onayımı al. Açık iki soru: (a) Flow'daki maskot karakterim varsa harita/kapanış sahnelerinde rehber olsun mu? (b) Müzik: yalnız Flow'un ortam sesleri mi, yoksa ayrıca sakin bir müzik parçası mı? Benim değişikliklerimi 02 dosyasına işle.
2. **Flow'da deneme:** Flow'da "Metafiziğe Giriş" adında bir proje aç. Flow'da hazır karakterlerim, sahnelerim ve medyam var; uygun olanları referans (ingredients / frames) olarak kullan. Önce kredi durumunu ve model seçeneklerini (ör. Veo Fast / Quality) bana söyle, hangisini kullanacağımızı sor. Sonra yalnız **3 deneme klibi** üret (öneri: 01, 11a, 26a), indir ve bana göster; üslup onayı al.
3. **Bütün Flow klipleri:** Onaydan sonra 34 klibin hepsini üret (16:9). Her klibi kontrol et: yazı/logo çıktıysa, karakter tutarsızsa ya da tarifle uyuşmuyorsa yeniden üret. Dosyaları `video/metafizik-giris/klipler/` içine sahne adıyla kaydet (`S01.mp4`, `S11a.mp4`, `S11b.mp4`…). Kredi biterse dur ve bana söyle.
4. **Sitenin animasyonları (11 sahne: 04, 06, 07, 10, 13, 15, 19, 20, 22, 29, 32):** `video/metafizik-giris/animasyonlar/` içinde 1920×1080 HTML sahneler kur; zamanı JS ile denetlenebilir yap (ör. `window.zaman(t)`), Playwright ile kare kare yakala ve ffmpeg ile 30 fps videoya çevir. Hazır kaynaklar: metafizik odası (`karahanucar-com/js/sahne/felsefe.js` içindeki "metafizik" + `ek-nesneler.js`), kendini çizen logo, harita / terazi / kartlar / kül olan alıntı (`.claude/skills/karahan-tasarim/assets/sunum-canli-ornek.html`), adım adım okuma çizimi (`karahanucar-com/bilgi/matematiksel-evren.html`).
5. **Kabin sahnesi (05):** Seedance kabin videosu: önce `karahanucar-com/assets/video/kabin-maskot-gramofon.mp4`, yoksa https://d8j0ntlcm91z4.cloudfront.net/user_3Jcviuh0jli0uOYsJXGfqvG22US/hf_20260924_171253_2c1fd796-0c16-4764-b10a-83e1f62e24a7.mp4 (8 sn; dikişsiz döngüyle iki kez, çok yavaş yaklaşma).
6. **Altyazı katmanı:** 01-metin.md'deki cümleleri 02'deki sahne zamanlarına, karakter uzunluğuna göre dağıt (satır başına 3,5–5 sn, en çok iki satır). Altyazıyı ve alıntı/bölüm kartlarını 02'deki canlı örnekle birebir aynı görünümle HTML'de çiz, kare kare yakalayıp görüntünün üstüne bindir. Ayrıca düz bir `.srt` dosyası da üret.
7. **Montaj:** ffmpeg ile birleştir: sahne sırası ve süreleri 02'deki gibi; gerekirse klipleri 0,8× yavaşlat ya da uzun tut; sahneler arası 0,5 sn yumuşak geçiş; Flow ortam seslerini dengele, varsa müziği altına koy (seslendirme yok). Çıktı: `video/metafizik-giris/cikti/metafizige-giris.mp4` (1080p, 30 fps, H.264, yüksek kalite) + `.srt`.
8. **Denetim ve teslim:** Her sahneden birkaç kare çıkarıp kendin bak (altyazı okunuyor mu, taşma var mı, geçişler doğru mu), sonra bana videoyu ve kısa bir raporu ver. Büyük video dosyalarını git'e ekleme (gerekirse .gitignore'a yaz); HTML/kod ve küçük dosyaları commit edip aynı dala gönder.

Benimle Türkçe konuş. Bir aşamada takılırsan ya da bir karar bana aitse dur ve sor.
