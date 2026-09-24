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
