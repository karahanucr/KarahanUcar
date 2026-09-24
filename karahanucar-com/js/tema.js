/* Gece / gündüz: aya tıklayınca güneş doğar ve sayfa sıcak parşömen renkli gündüz atmosferine geçer;
   güneşe tıklayınca ay döner ve gece atmosferi geri gelir. Seçim tarayıcıda hatırlanır (yoksa gece). */
(function () {
  var kok = document.documentElement, dugme = document.querySelector(".hero .ay");
  if (!dugme) return;
  /* Logo: altın (#E8BD62) krem/mavi gökte kayboluyor; gündüzde koyu altın sürüm (#7A4E0E) */
  var logolar = document.querySelectorAll(".flame, .brand img");
  function yaz() {
    var gunduz = kok.classList.contains("gunduz");
    for (var i = 0; i < logolar.length; i++) logolar[i].src = gunduz ? "assets/logo-seffaf-gunduz.svg" : "assets/logo-seffaf.svg";
    dugme.setAttribute("aria-pressed", gunduz ? "true" : "false");
    dugme.setAttribute("aria-label", gunduz ? "Geceye dön (ayı getir)" : "Gündüze geç (güneşi doğur)");
    dugme.title = gunduz ? "Ayı getir" : "Güneşi doğur";
  }
  dugme.addEventListener("click", function () {
    kok.classList.add("tema-gecis");
    var gunduz = kok.classList.toggle("gunduz");
    try { localStorage.setItem("tema", gunduz ? "gunduz" : "gece"); } catch (e) {}
    yaz();
    dugme.parentNode.scrollLeft = 0; // taşan ay halesi yüzünden odaklanınca giriş bölümü yana kaymasın
    clearTimeout(dugme._z);
    dugme._z = setTimeout(function () { kok.classList.remove("tema-gecis"); }, 1400);
  });
  yaz();
})();
