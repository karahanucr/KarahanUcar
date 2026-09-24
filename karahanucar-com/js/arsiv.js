/* ARŞİV SANDIKLARI — her sahnedeki sandığın içeriği.
   ─────────────────────────────────────────────────────────────────────────────
   YENİ İÇERİK EKLEMEK (sunum, not, video, çeviri, PDF):
   1) Dosyayı arsiv/<sahne>/ klasörüne koy (örn. arsiv/latince/gramer-01.pdf).
   2) Aşağıda o sahnenin ilgili temasının "ogeler" listesine bir satır ekle:
        { tur: "not", ad: "Birinci çekim adlar", aciklama: "Kısa bir açıklama", bag: "arsiv/latince/gramer-01.pdf", tarih: "Ekim 2026" }
      tur: not · sunum · video · ceviri · pdf · gorsel · okuma · baglanti
      Video için bag yerine youtube: "VIDEO_KIMLIGI" yaz (sandığın içinde, tıklayınca oynar; önceden hiçbir şey yüklenmez).
   3) Yeni bir tema gerekirse temalar listesine { ad: "Tema adı", ogeler: [] } ekle.
   Tema adları şimdilik örnektir; F:\PANTA\KÜTÜPHANE altındaki klasör adlarına göre güncellenecek.
   ───────────────────────────────────────────────────────────────────────────── */
window.ARSIV = {
  latince: { baslik: "Latince notlarım", temalar: [
    { ad: "Gramer", ogeler: [] }, { ad: "Sözcük dağarcığı", ogeler: [] }, { ad: "Çeviriler", ogeler: [] }, { ad: "Metin okumaları", ogeler: [] } ] },
  yunanca: { baslik: "Antik Yunanca notlarım", temalar: [
    { ad: "Gramer", ogeler: [] }, { ad: "Sözcük dağarcığı", ogeler: [] }, { ad: "Çeviriler", ogeler: [] }, { ad: "Platon okumaları", ogeler: [] } ] },
  arapca: { baslik: "Arapça notlarım", temalar: [
    { ad: "Gramer", ogeler: [] }, { ad: "Kökler ve sözcükler", ogeler: [] }, { ad: "Çeviriler", ogeler: [] }, { ad: "Hat ve yazı", ogeler: [] } ] },
  biyoloji: { baslik: "Biyoloji arşivim", temalar: [
    { ad: "Hücre", ogeler: [] }, { ad: "Evrim", ogeler: [] }, { ad: "Genetik", ogeler: [] }, { ad: "Ekoloji", ogeler: [] },
    { ad: "Biyoloji felsefesi", ogeler: [
      { tur: "sunum", ad: "Yaşamın sınırları", aciklama: "Biyoloji felsefesi üzerine etkileşimli sunum.", bag: "sunumlar/biyoloji-felsefesi/index.html" } ] } ] },
  astronomi: { baslik: "Astronomi arşivim", temalar: [
    { ad: "Güneş sistemi", ogeler: [] }, { ad: "Yıldızlar", ogeler: [] },
    { ad: "Kozmoloji", ogeler: [
      { tur: "okuma", ad: "Evren bir matematiksel yapı mı?", aciklama: "Tegmark'ın makalesi, adım adım.", bag: "bilgi/matematiksel-evren.html" } ] },
    { ad: "Gözlem", ogeler: [] } ] },
  fizik: { baslik: "Fizik arşivim", temalar: [
    { ad: "Klasik mekanik", ogeler: [] }, { ad: "Kuantum", ogeler: [] }, { ad: "Görelilik", ogeler: [] }, { ad: "Termodinamik", ogeler: [] } ] },
  epistemoloji: { baslik: "Bilgi felsefesi arşivim", temalar: [
    { ad: "Bilginin tanımı", ogeler: [] }, { ad: "Şüphecilik", ogeler: [] }, { ad: "Rasyonalizm ve empirizm", ogeler: [] }, { ad: "Platon", ogeler: [] } ] },
  metafizik: { baslik: "Varlık felsefesi arşivim", temalar: [
    { ad: "Ontoloji", ogeler: [
      { tur: "sunum", ad: "Metafizik: Aristoteles'ten Hegel'e", aciklama: "Metafiziğin temel sorunları üzerine etkileşimli sunum.", bag: "sunumlar/metafizik/index.html" } ] },
    { ad: "Olmayan nesneler", ogeler: [
      { tur: "sunum", ad: "Non-Existence Seminar: Meinong and the Problem of Intentionality", aciklama: "Seminer sunumu.", bag: "https://philpeople.org/profiles/karahan-ucar", tarih: "Haziran 2026" } ] },
    { ad: "Modalite", ogeler: [
      { tur: "sunum", ad: "Information: Modality", bag: "https://philpeople.org/profiles/karahan-ucar", tarih: "Temmuz 2026" } ] },
    { ad: "Nedensellik", ogeler: [] } ] },
  zihin: { baslik: "Zihin felsefesi arşivim", temalar: [
    { ad: "Zihin–beden sorunu", ogeler: [] }, { ad: "Bilinç", ogeler: [] }, { ad: "Yapay zekâ", ogeler: [] }, { ad: "Düşünce deneyleri", ogeler: [] } ] },
  geometri: { baslik: "Geometri arşivim", temalar: [
    { ad: "Öklid", ogeler: [] }, { ad: "Analitik geometri", ogeler: [] }, { ad: "Öklid dışı geometriler", ogeler: [] } ] },
  cografya: { baslik: "Coğrafya arşivim", temalar: [
    { ad: "Haritacılık", ogeler: [] }, { ad: "Fiziki coğrafya", ogeler: [] }, { ad: "Beşerî coğrafya", ogeler: [] } ] },
  film: { baslik: "Film arşivim", temalar: [
    { ad: "Film kuramı", ogeler: [] }, { ad: "Yönetmenler", ogeler: [] }, { ad: "İncelemeler", ogeler: [] },
    { ad: "Videolarım", ogeler: [
      { tur: "baglanti", ad: "YouTube kanalım", aciklama: "Düşüncenin Eşiğinde: videolar ve yeni yayınlar.", bag: "https://www.youtube.com/@karahan6927" } ] } ] }
};
