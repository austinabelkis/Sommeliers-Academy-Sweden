(function () {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Language toggle
  const buttons = document.querySelectorAll("[data-lang-btn]");
  const translatables = document.querySelectorAll("[data-en]");

  function applyLanguage(lang) {
    translatables.forEach(el => {
      const v = el.getAttribute(`data-${lang}`);
      if (v !== null && v !== "") el.textContent = v;
    });

    buttons.forEach(b => b.classList.toggle("is-active", b.getAttribute("data-lang-btn") === lang));

    try { localStorage.setItem("sas_lang", lang); } catch(e) {}
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang-btn")));
  });

  let saved = "en";
  try { saved = localStorage.getItem("sas_lang") || "en"; } catch(e) {}
  applyLanguage(saved);

  // Home hero background rotation
  const hero = document.querySelector(".hero");
  if (hero) {
    const images = ["images/hero1.jpg","images/hero2.jpg","images/hero3.jpg"];
    let idx = 0;

    function setHero(i){ hero.style.backgroundImage = `url(${images[i]})`; }
    setHero(idx);

    setInterval(() => {
      idx = (idx + 1) % images.length;
      setHero(idx);
    }, 5500);
  }
})();
