# Kurulum: tasarım dilini başka Claude modellerine öğretmek

Bu klasör bir **Claude becerisi (skill)**dir. Beceriler kalıcıdır: bir kez eklenince, konu açıldığında Claude onu kendiliğinden okur.

## 1) claude.ai (web, masaüstü, mobil) — önerilen
1. `karahan-tasarim.zip` dosyasını aç**ma**, olduğu gibi kullan.
2. claude.ai → **Ayarlar → Yetenekler (Capabilities) → Beceriler (Skills)** → "Beceri yükle" → zip'i seç.
3. Artık hangi modeli seçersen seç (Sonnet, Opus, Haiku…), "X konusunda bir sunum hazırla" ya da "sitemde Sosyal bilimler içine Tarih sayfası aç"
   dediğinde beceri devreye girer. Emin olmak için başına "karahan-tasarim becerisini kullanarak" yazabilirsin.

## 2) Claude Projeleri (beceri yüklenemiyorsa)
Yeni bir Proje aç → **Talimatlar**a `PROMPT.md` içindeki metni yapıştır → **Proje bilgisi**ne `references/` altındaki dört .md dosyasını,
`assets/tokens.css` ve `assets/sunum-sablonu.html` dosyalarını ekle. O projedeki bütün sohbetler bu dili kullanır.

## 3) Tek bir sohbet
`PROMPT.md` metnini ilk mesaja yapıştır, istersen dosyaları da ekle.

## 4) Claude Code
- Bu depoda zaten `.claude/skills/karahan-tasarim/` olarak duruyor: depoda açılan her Claude Code oturumu (bulut ya da yerel) kendiliğinden görür.
- Bütün projelerinde kullanmak için klasörü `~/.claude/skills/karahan-tasarim/` altına kopyala.

## İçerik
- `SKILL.md` — özün özü, kesin kurallar, çalışma sırası
- `references/kimlik.md` — renk, yazı, biçim, ton
- `references/bilesenler.md` — bileşen tarifleri (kod özleriyle)
- `references/site-alt-sayfa.md` — siteye adım adım yeni oda eklemek (örnek: Tarih)
- `references/sunum.md` — sunum slayt türleri, ölçüler, PPTX'e aktarma
- `assets/tokens.css` — hazır CSS değişkenleri ve bileşenler
- `assets/sunum-sablonu.html` — çalışan örnek sunum (9 slayt türü; → ← ile gezin, T gece/gündüz, F tam ekran)
- `assets/logo-seffaf.svg`, `logo-seffaf-gunduz.svg` — logo (renklendirilmez)

Tasarım dili değiştikçe bu dosyaları güncelle (ya da Claude'a "karahan-tasarim becerisini şu değişiklikle güncelle" de); yeni zip'i yeniden yükle.
