# Sunumlar (slayt, deste, poster)

Hazır, çalışan örnek: `assets/sunum-sablonu.html` (tek dosya, harici bağımlılık yok, logo aynı klasörden).
Yeni bir sunum için bu dosyayı kopyala, slaytları konuya göre değiştir. İstenirse aynı dil PPTX'e de aktarılır (aşağıda).

## İlke
Sunum da bir **oda**dır: konunun yerini ve çağını seç (Metafizik → varlığın boşluğu, yıldızlar; Latince → Senato; Biyoloji → orman).
Karanlık, sıcak ışıklı zemin; her slaytta tek bir ışık kaynağı; yavaş, anlamlı hareket. Metin az, imge ve yapı çok.
Aydınlık salonlar/projeksiyon için gündüz teması (`T` tuşu) — krem kâğıt, koyu kehribar.

## Slayt türleri (şablonda hepsi var)
| Tür | Siteden karşılığı | Kurgu |
|---|---|---|
| **Kapak** | Kahraman (gece göğü, ay, logo) | Yıldızlar pırıldar, logo ateş gibi titrer; üstte küçük altın etiket (etkinlik · yer · tarih), serif büyük başlık, altında kor çizgisi süzülür; altta "MERAK · AKIL · ANLAM". |
| **Bölüm açılışı** | Bölüm numaraları + Eşik | Büyük Roma rakamı (I, II…), yanında kısa altın çizgi, başlık; altında dönen kor çerçeveli tek cümle. |
| **Sahne / kavram** | Alt sahneler | Solda başlık + kısa metin, sağda konu çizimi üzerinde **parıldayan nesneler**; tıklayınca cam-parşömen panel açılır (anlatırken tek tek açılır). |
| **Alıntı** | Sahne alıntıları | Özgün dilde italik serif, harf harf yazılır; sonraki alıntıya geçerken **yanıp kül olur** ve dökülür. Altında çeviri ve kaynak. |
| **Harita** | "… haritası" | Parşömen üzerinde kesik çizgili yol, mühür gibi numaralı duraklar; yolcu ışık seçilen durağa yürür. Tarihsel akış, argüman adımları, okuma sırası için. |
| **Kartlar** | Kartlar, kitap sırtları | 2–4 kart; üzerine gelince kor çerçeve dolaşır; köşede soluk büyük numara; üstte küçük tür etiketi. |
| **Karşıtlık** | — | İki sütun (tez / antitez, rasyonalizm / empirizm), ortada dikey altın çizgi ve "·". |
| **Sözlükçe** | Sözlükçe odası | Terim kartları: serif terim, italik köken, tanım; bir terim seçilince büyür. |
| **Kapanış** | Alt bilgi | Logo, "Teşekkürler", iletişim (· ile ayrılmış), slogan. |

## KALICI KURAL: bağlama uygun başlık animasyonları (Karahan'ın özellikle beğendiği)
Her sunumda, özellikle karşıtlık ve kavram slaytlarında, başlıkların **üstüne** konuyu anlatan küçük, sürekli hareket eden bir SVG çizim konur.
Süs değil, **kavramın kendisini** gösterir. Örnek (Çağdaş Metafizik, 10. slayt "Nesneler zamanda nasıl sürer?"):
- *Üç boyutçuluk* başlığının üstünde: bir zaman çizgisi boyunca **bütün hâlinde** kayan tek bir altın küre (aynı nesne her anda tümüyle var).
- *Dört boyutçuluk* başlığının üstünde: zamana yayılmış mor bir "solucan" ve üzerinde **sırayla yanan zamansal dilimler**.

Tarif: `<svg class="zaman-ciz" viewBox="0 0 520 90">` (genişlik %100, yükseklik ~70 px, `overflow: visible`) + tek bir CSS animasyonu
(`translateX` ile kayma, `animation-delay: calc(var(--i) * .5s)` ile sıralı yanma, `stroke-dashoffset` ile çizilme, `scale` ile nabız).
Hareket yavaş (4–8 sn), döngülü ya da `alternate`; renkler altın `#E8BD62` / açık altın `#FFE7A8` / oda vurgusu; `prefers-reduced-motion`'da durur.

Konuya göre fikir bankası:
| Kavram | Çizim |
|---|---|
| Değişim / süreç / tarih | zaman çizgisi üzerinde kayan nesne, sırayla yanan duraklar |
| Parça–bütün, bileşim | dağılan noktalar (nihilizm), atan hücre (organizma), hepsini birleştiren çizgiler (evrenselcilik) |
| Tümel / tikel | merkeze bağlı dönen düğümler / ayrı ayrı yanıp sönen noktalar |
| Temellendirme, öncelik | alttan üste sırayla parlayan katmanlar |
| İki görüş, tartışma | ortada salınan terazi; üzerine gelinen tarafa eğilir |
| Söndürme, anlamsızlık | küçülüp sönen halka; kesme / eklem: kesikli çizgi akışı |
| Nedensellik | bir topun diğerine çarpıp onu harekete geçirmesi |
| Olanaklılık | merkez dünyadan kesikli ışınlarla uzanan küçük dünyalar |
Kartlarda aynı dil küçük ölçekte: sağ üstte 60 px hareketli simge (`.k-simge`).

Canlı katman (her sunumda): arka planda kor tozu ve ateş böcekleri (canvas), imleç ışığı, fareyle hafif paralaks,
hafifçe dolaşan kor çerçeveli kartlar (üzerine gelince eğilir, tıklayınca argüman/eleştiri paneli), çevrilen sözlükçe kartları,
madalyon bölüm numaraları (dönen yörünge + kıvılcım), kapakta kendini çizen logo.
Hazır, çalışan örnek: `assets/sunum-canli-ornek.html` (bu katmanların hepsi; yeni sunumda buradan kopyala).

## Düzen ölçüleri (16:9, 1600×900 tuval)
- Kenar boşluğu 96 px; başlık sol üstte (x 96, y 120); içerik ızgarası 12 sütun, 24 px aralık.
- Başlık 72–96 px serif; üst etiket 18 px, `letter-spacing .3em`, altın; gövde 26–30 px, en çok 6 satır.
- Görsel bantlar kenarlardan zemine erir; bir slaytta en çok 5 parıldayan nesne.
- Her slaytta sağ altta küçük numara `03 / 12` ve altta ilerleme kor çizgisi.

## Hareket
Giriş: başlık harf aralığı açılarak ve bulanıklıktan netleşerek (1.2 sn); üst etiket ve metin arkadan (0.2 sn arayla).
Geçiş: önceki slayt hafifçe büyüyüp bulanıklaşarak söner, yenisi uzaktan gelir (sahneler arası "kapıdan geçiş" hissi).
Sürekli: yıldız pırıltısı, logo alevi, kor çerçeve, huzme — hepsi yavaş. `prefers-reduced-motion`da hepsi durur.

## PPTX gerekirse
- Arka plan `#16120f` (gündüz `#f3ead6`); başlık yazı tipi Palatino Linotype / Georgia; gövde Segoe UI / Calibri.
- Renkler: altın `#E8BD62`, açık altın `#FFE7A8`, fildişi `#EDE6D0`, sönük `#A9A38F`, çizgi `#E8BD62` %22 saydam.
- Logo: `assets/logo-seffaf.svg` (koyu zemin) / `logo-seffaf-gunduz.svg` (açık zemin) PNG'ye çevrilerek; renklendirme yok.
- Geçiş: "Solma" (0.8 sn) ya da "Morph"; nesne animasyonu: "Belirme + Yakınlaştırma", sıralı.
- Parıldayan nesne yerine: altın halkalı küçük daire + etiket; tıklama yerine sıralı animasyon.
- Alıntı kül efekti PPTX'te yok → alıntıyı "Silinme (parçalar halinde)" ya da "Solma" ile değiştir.

## Denetim listesi
- [ ] Gece ve gündüz temada okunuyor (kontrast ≥ 4.5:1)
- [ ] Başlık/metin/nesne çakışmıyor, taşmıyor
- [ ] Alıntıların kaynağı ve çevirisi var
- [ ] Ayırıcılar "·", tarihler "Temmuz 2026" biçiminde
- [ ] Harici font/CDN yok; logo ve maskot değiştirilmemiş

## Varyant: Gustave Doré gravür modeli (Karahan istedi, Eylül 2026)
Aynı dünya, 19. yüzyıl ağaç gravürü diliyle. Çalışan örnek: `assets/sunum-dore-ornek.html` ("Işığın Tarihi", 5 levha).
- **Her çizim oymadır:** dolgu yerine çizgi. `--oyma` / `--oyma-2` / `--oyma-3` renkleri; `<pattern>` ile tek yönlü tarama (yarı gölge) ve çapraz tarama (derin gölge).
  En parlak yer **hiç çizilmemiş** alandır (ışığın merkezi boş bırakılır, çevresi ışınlarla sıklaşır).
- **Gece:** gece kütüphanesinde altın mürekkeple oyulmuş levha. **Gündüz (T):** krem kâğıda koyu sepya mürekkep; Doré'nin kendi baskısı gibi.
- **Kitap levhası çerçevesi:** tuvalin içinde çift çizgi + köşe süsleri, hafif yatay oyma dokusu; slaytlar "Pl. I … V" diye numaralanır,
  levha altında italik künye (ör. "Cennet · Canto XXXI").
- **Hareketli motifler:** yavaş dönen ışın demeti, zıt yönlerde dönen basık "melek halkaları" (Göksel Gül), süzülen taranmış bulut kıyıları,
  ışığın karşısında küçük siluetler (yüce duygusu), gravür kalemiyle satır satır oyulan çizgiler, küre üzerinde dolaşan ışık ve kayan gölge (chiaroscuro).
- Diğer kurallar aynen geçerli: kendini çizen logo (ışığın merkezinde), başlık üstü hareketli SVG, tıklanınca açılan paneller, kül olan alıntılar, harita.
