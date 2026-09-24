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
  var azalt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, mesgul = false;
  function degistir() {
    kok.classList.add("tema-gecis");
    var gunduz = kok.classList.toggle("gunduz");
    try { localStorage.setItem("tema", gunduz ? "gunduz" : "gece"); } catch (e) {}
    yaz();
    clearTimeout(dugme._z);
    dugme._z = setTimeout(function () { kok.classList.remove("tema-gecis"); }, 1400);
  }
  /* Ay (ya da güneş) ağaçların ardına batar; gök rengi döner; öteki gök cismi ufuktan doğar */
  dugme.addEventListener("click", function () {
    if (mesgul) return;
    if (azalt || !dugme.animate) { degistir(); return; }
    mesgul = true;
    var h = dugme.parentNode.clientHeight, inis = Math.round(h * 0.62) + "px";
    dugme.classList.add("ufukta");
    dugme.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: "translate(-40px," + inis + ")", opacity: .35 }], { duration: 1150, easing: "cubic-bezier(.55,0,.85,.5)", fill: "forwards" }).onfinish = function () {
      degistir();
      dugme.getAnimations().forEach(function (a) { a.cancel(); });
      dugme.animate([{ transform: "translate(60px," + inis + ")", opacity: .35 }, { transform: "translate(0,0)", opacity: 1 }], { duration: 1500, easing: "cubic-bezier(.15,.55,.3,1)" }).onfinish = function () {
        dugme.classList.remove("ufukta"); mesgul = false; dugme.parentNode.scrollLeft = 0; dugme.focus({ preventScroll: true });
      };
    };
  });
  yaz();
})();
