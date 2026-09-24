# Kimlik: renk, yazı, biçim, ton

## Renkler

### Gece (varsayılan)
| Rol | Değer | Not |
|---|---|---|
| Zemin | `#16120f` | kanal koyusunun sıcak, odun tonlu hâli |
| Yüzey (kart, panel) | `#211b16` | |
| Çizgi | `rgba(232,189,98,.22)` | ince altın |
| Altın (vurgu) | `#E8BD62` | bağlantı, küçük başlık, halka |
| Açık altın | `#FFE2A0`, `#FFE7A8` | parıltı, vurgulu başlık |
| Fildişi (metin) | `#EDE6D0` / başlık `#f6ecd2` | |
| Sönük metin | `#A9A38F` | |
| Kor | `#c8642a` → `#E8BD62` → `#FFE2A0` | ilerleme çizgisi, alıntı yanması |
| Buz mavisi | `#d9eaff`, kenar `rgba(178,214,255,.42)` | yalnız çalışma alanı şeridi (gece) |
| Gece göğü | `#0b1118 → #142030 → #263a52 → #40587a` | kahraman alanı |

### Gündüz (her zaman birlikte düşünülür)
| Rol | Değer |
|---|---|
| Zemin (parşömen) | `#f5eddc` |
| Yüzey | `#ece0c7` · kart kâğıdı `#fbf6ea` |
| Çizgi | `rgba(118,78,20,.24)` |
| Vurgu (altının yerine) | `#764b0c` (kremde 6:1 kontrast) |
| Metin | `#2b2117` |
| Sönük | `#5e4e3a` |
| Serin tamamlayıcı (mürekkep mavisi) | `#33506a`: küçük başlıklar (eyebrow), üzerine gelme, ikincil düğme |
| Adaçayı | `#566b4f`: çift sıradaki etiketler, doğa vurguları |
| Gündüz göğü | `#8fc3e8 → #b6d8ef → #d9e9ef → #efe6cf` |
Gündüz üçlüsü: parşömen zemin + koyu mürekkep metin + bakır vurgu; mavi ve adaçayı yalnızca küçük dozda. Gündüzde altın/açık sarı ışıklar kremde kaybolur → koyu kehribar (`#a8741e`, `#8a5a14`) kullanılır. Kar/yağmur koyu mavi-gri olur.

### Oda (sahne) vurgu renkleri
Felsefe `#E8BD62` · Epistemoloji (mağara) `#F09A4A` · Metafizik (boşluk) `#C8B0FF` · Zihin `#9FB8FF` · Diller/Latince `#E8BD62` ·
Yunanca `#F0B870` · Arapça (Beytülhikme) `#E6C36A` · Doğa `#9FD07A` · Biyoloji `#B7E07A` · Astronomi `#9FC8FF` · Fizik `#E8C870` ·
Formel/Geometri `#9FC8FF` · Sosyal/Coğrafya `#F0B870` · Estetik/Film `#E89AC8`.
Yeni oda için: konunun ışığını düşün (mum sarısı, ay mavisi, yaprak yeşili, gün batımı turuncusu), koyu zeminde okunur bir pastel seç.

## Yazı
- Başlık: `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif` — 500 ağırlık, sıkı satır (1.02–1.2).
  Büyük sahne başlığı `clamp(2.5rem, 6.4vw, 5.2rem)`; bölüm başlığı `clamp(1.6rem, 4vw, 2.2rem)`.
- Gövde: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`, 1.0625rem / 1.7. Uzun paragraf iki yana yaslı (geniş sütunda), `text-wrap: pretty`.
- Üst başlık/etiket: .7–.8rem, BÜYÜK HARF, `letter-spacing: .2–.3em`, altın. (Yunanca ve Arapçada harf aralığı ve büyük harf kapatılır.)
- Alıntı: serif italik, açık altın `#FFE7A8`, altında çeviri (fildişi) ve kaynak (küçük, büyük harf, altın).
- Sayılar tablo hizalı (`font-variant-numeric: tabular-nums`).

## Biçim dili
- **Işık kaynağı her zaman var**, sıcak ve titrek: `radial-gradient(closest-side, rgba(232,189,98,.3), transparent)` + `titre` animasyonu.
- **Kenarlar yumuşak**: koyu görsel bantlar zemine gradyanla erir; köşeler 10–16px; hap biçimli düğmeler (`border-radius: 999px`).
- **Dönen kor çerçeve**: kartlarda üzerine gelince, eşik yazısında ve randevu kartında sürekli (`conic-gradient(from var(--ang), …)`).
- **Malzemeler**: koyu ahşap (`#3a2616 → #1b120c`), pirinç levha (`#f3d488 → #c99a3e → #e8c06a → #a8782a`, üzerinde parlama geçer),
  parşömen (`#f1e3c2 → #e2cc9c → #c9ad76`, içe gölgeli), kumaş kitap sırtı (koyu doygun renk + yaldız bantlar).
- **Kemer**: portre ve kapılar kemerli (`border-radius: 999px 999px 0 0`) — kütüphane penceresi, iwan, mağara ağzı.
- **Simgeler**: ince çizgi (1.6–2.5px), yuvarlak uç, altın; hepsi küçük bir hareket taşır (kalem yazar, büyüteç tarar, mektup açılır, sayfa çevrilir).
- **Parıldayan nesne** (etkileşim noktası): altın halka + dışa yayılan iki dalga + altında hap biçimli ad. Odanın karakterine göre biçim değişir:
  halka · yıldız · kor · kristal · yaprak · dalga.

## Ton ve metin
- Türkçe, sade ve sıcak; ikinci tekil şahıs ("seçtiğin video", "bir kapı seç"). Akademik ama davetkâr.
- Başlıklar yer + çağ verir: "Roma · Senato toplantısı · MÖ 63", "Bağdat · Beytülhikme'nin avlusu · 9. yüzyıl".
- Her odada bir alıntı: özgün dilinde (Latince, Attika Yunancası, Arapça…) + Türkçe çevirisi + kaynak.
- Liste ayırıcısı "·", tarih "Temmuz 2026 · Sunum" biçiminde.

## Maskot ve görseller
- Kuzgun maskot (gözlüklü, kitap okuyan): `assets/gpt/maskot-seffaf.webp`, `assets/maskot/*.png`. Arkasında sıcak ışık; yalnız "nefes" salınımı.
- Ana görseller: karlı ormanda şömineli kütüphane, kabin iç mekânı (şömine, lamba, karlı pencere). Görsel bantları kenarlardan zemine erir.
