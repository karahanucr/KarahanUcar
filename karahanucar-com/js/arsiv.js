/* ÇALIŞMALARIM SANDIKLARI — her alt sahnede başlığın sağındaki, logolu sandık.
   ─────────────────────────────────────────────────────────────────────────────
   Sandığın içeriği ayrıca yazılmaz: js/icerik.js'teki kayıtlardan, "sandik" alanında o sahnenin adı geçenler gelir.
     örnek: { id: "latince-gramer-1", tur: "notlar", baslik: "Birinci çekim adlar", aciklama: "…", tarih: "2026-10",
              alan: ["diller"], sandik: ["latince"], belge: "belgeler/latince/gramer-01.pdf" }
   Böylece aynı çalışma Bilgi › Son eklenenler'de, (belgeyse) Yayınlar'da, (videoysa) Kanal'da ve sandıkta birlikte görünür.
   Sandıktaki çekmeceler (kategoriler) aşağıdaki sırayla dizilir; türü bunlardan biri olmayan kayıtlar yalnız "Tümü"nde görünür.
   ───────────────────────────────────────────────────────────────────────────── */
window.CALISMA_KATEGORI = ["alistirma", "bildiri", "calistay", "ceviri", "izlence", "kitap", "konferans", "makale", "notlar",
  "odevler", "poster", "proje", "seminer", "sempozyum", "sunum", "tezler", "video"];

/* Sahnenin sandığındaki kayıtlar */
window.CALISMALAR = function (sahne) {
  return (window.ICERIK || []).filter(function (o) { return (o.sandik || []).indexOf(sahne) > -1; })
    .sort(function (a, b) { return (b.tarih || "0").localeCompare(a.tarih || "0"); });
};
