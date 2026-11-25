(function () {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector("#mobileToggle");
  if (btn && nav) {
    btn.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Set active menu link based on current page
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("href").toLowerCase() === path) {
      a.style.background = "rgba(255,255,255,.06)";
      a.style.color = "var(--text)";
    }
  });
})();

// Partners marquee (auto clone + distance dynamique)
(function () {
  const slider = document.querySelector("#partnersSlider");
  if (!slider) return;

  const track = slider.querySelector(".partners-track");
  if (!track) return;

  // Duplique une fois pour un effet infini
  const original = track.innerHTML;
  track.innerHTML = original + original;

  // Calcul de la moitié (largeur du set original)
  const compute = () => {
    // scrollWidth / 2 = largeur du set original (car on a doublé)
    const distance = track.scrollWidth / 2;

    // Durée proportionnelle à la distance => vitesse constante
    const pxPerSecond = 70; // ajuste: 50 plus lent / 90 plus rapide
    const duration = Math.max(12, distance / pxPerSecond);

    track.style.setProperty("--marquee-distance", `${distance}px`);
    track.style.setProperty("--marquee-duration", `${duration}s`);
  };

  // Attendre que les images chargent
  const imgs = track.querySelectorAll("img");
  let loaded = 0;

  const done = () => {
    loaded++;
    if (loaded >= imgs.length) compute();
  };

  imgs.forEach(img => {
    if (img.complete) done();
    else img.addEventListener("load", done);
  });

  window.addEventListener("resize", compute);
})();

// Video modal (Hero Pro)
(function () {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  if (!modal || !frame) return;

  const openBtns = document.querySelectorAll("[data-open-video]");
  const closeEls = modal.querySelectorAll("[data-close-video]");

  const open = (url) => {
    frame.src = url + (url.includes("?") ? "&" : "?") + "autoplay=1";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    frame.src = "";
    document.body.style.overflow = "";
  };

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => open(btn.getAttribute("data-open-video")));
  });

  closeEls.forEach(el => el.addEventListener("click", close));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

// Google Form modal (robuste)
(function () {
  const modal = document.getElementById("formModal");
  const frame = document.getElementById("formFrame");
  const loading = document.getElementById("formLoading");
  const fallbackBox = document.getElementById("formFallback");
  const fallbackLink = document.getElementById("fallbackLink");

  if (!modal || !frame || !loading || !fallbackBox || !fallbackLink) return;

  let lastFocus = null;
  let timer = null;

  const openWith = (embedUrl, formUrl) => {
    lastFocus = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    loading.style.display = "flex";
    frame.style.display = "none";
    fallbackBox.hidden = true;

    fallbackLink.href = formUrl || embedUrl || "#";

    frame.src = embedUrl;

    clearTimeout(timer);
    timer = setTimeout(() => {
      // si iframe n’a pas affiché => fallback
      if (frame.style.display !== "block") {
        loading.style.display = "none";
        fallbackBox.hidden = false;
      }
    }, 4500);

    const closeBtn = modal.querySelector("[data-close-form]");
    closeBtn && closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    frame.src = "";
    clearTimeout(timer);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  frame.addEventListener("load", () => {
    loading.style.display = "none";
    frame.style.display = "block";
    fallbackBox.hidden = true;
    clearTimeout(timer);
  });

  document.querySelectorAll("[data-open-form]").forEach(btn => {
    btn.addEventListener("click", () => {
      const embedUrl = btn.getAttribute("data-form-embed") || "";
      const formUrl = btn.getAttribute("data-form-url") || "";
      if (!embedUrl) {
        // si pas d’embed, on fallback direct
        window.open(formUrl, "_blank", "noopener");
        return;
      }
      openWith(embedUrl, formUrl);
    });
  });

  modal.querySelectorAll("[data-close-form]").forEach(el => el.addEventListener("click", close));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();

