(function () {
  const GA_ID = "G-17FRMR8VXP";
  const META_PIXEL_ID = "1697477751238767";

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const buttons = document.querySelectorAll("[data-lang-btn]");
  const textNodes = document.querySelectorAll("[data-en]");
  const placeholderNodes = document.querySelectorAll("[data-placeholder-en]");
  const titleTag = document.querySelector("title");

  function applyLanguage(lang) {
    textNodes.forEach(el => {
      const value = el.getAttribute(`data-${lang}`);
      if (value !== null) el.textContent = value;
    });

    placeholderNodes.forEach(el => {
      const value = el.getAttribute(`data-placeholder-${lang}`);
      if (value !== null) el.setAttribute("placeholder", value);
    });

    if (titleTag && titleTag.dataset[`title${lang.toUpperCase()}`]) {
      titleTag.textContent = titleTag.dataset[`title${lang.toUpperCase()}`];
    }

    buttons.forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang-btn") === lang);
    });

    try {
      localStorage.setItem("sas_lang", lang);
    } catch (e) {}
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.getAttribute("data-lang-btn"));
    });
  });

  let savedLang = "en";
  try {
    savedLang = localStorage.getItem("sas_lang") || "en";
  } catch (e) {}
  applyLanguage(savedLang);

 const slides = document.querySelectorAll(".hero-slide");

if (slides.length > 0) {
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 5000);
}

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  function loadMetaPixel() {
    if (window.__metaLoaded) return;
    window.__metaLoaded = true;

    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  function loadTracking() {
    loadGA();
    loadMetaPixel();

    if (document.body.dataset.page === "thanks") {
      if (window.gtag) gtag("event", "generate_lead");
      if (window.fbq) fbq("track", "Lead");
    }
  }

  const consentKey = "sas_cookie_consent";
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  function applyConsent() {
    let consent = null;
    try {
      consent = localStorage.getItem(consentKey);
    } catch (e) {}

    if (consent === "accepted") {
      loadTracking();
    } else if (consent === "rejected") {
      // do nothing
    } else if (banner) {
      banner.classList.add("show");
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      try {
        localStorage.setItem(consentKey, "accepted");
      } catch (e) {}
      if (banner) banner.classList.remove("show");
      loadTracking();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      try {
        localStorage.setItem(consentKey, "rejected");
      } catch (e) {}
      if (banner) banner.classList.remove("show");
    });
  }

  applyConsent();
})();
