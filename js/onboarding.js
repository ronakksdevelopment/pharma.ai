/**
 * Onboarding: first-launch welcome flow using the three welcome
 * illustrations. Replayable from Profile.
 */

const Onboarding = (() => {
  let currentSlide = 0;
  let overlay, track, dotsContainer, backBtn, nextBtn, skipBtn;
  let releaseFocusTrap = null;
  let onCompleteCallback = null;

  const slides = [
    {
      key: "welcome1",
      title: "Learn Pharmacy & AI Concepts",
      body: "Explore how pharmacy education blends with AI-inspired tools to make pharmaceutical science approachable and interactive.",
    },
    {
      key: "welcome2",
      title: "Pharmaceutical Science & Research",
      body: "Dive into research themes, from molecular structures to nanoparticle concepts, presented in a clear, educational way.",
    },
    {
      key: "welcome3",
      title: "An Interactive Learning Experience",
      body: "Test your knowledge with quizzes, browse educational cards and explore project research, all in one beta prototype app.",
    },
  ];

  function build() {
    overlay = document.getElementById("onboarding");
    if (!overlay) return;

    track = Utils.qs(".onboarding-track", overlay);
    dotsContainer = Utils.qs(".onboarding-dots", overlay);
    backBtn = Utils.qs("[data-onboarding-back]", overlay);
    nextBtn = Utils.qs("[data-onboarding-next]", overlay);
    skipBtn = Utils.qs("[data-onboarding-skip]", overlay);

    track.innerHTML = slides
      .map((slide, i) => {
        const illus = APP_CONFIG.assets.illustrations[slide.key];
        return `
        <div class="onboarding-slide" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">
          <div class="onboarding-slide-image">
            <picture>
              <source srcset="${Utils.assetUrl(illus.webp)}" type="image/webp">
              <img src="${Utils.assetUrl(illus.png)}" alt="${Utils.escapeHtml(illus.alt)}" width="700" height="1243" loading="${i === 0 ? "eager" : "lazy"}">
            </picture>
          </div>
          <h2>${Utils.escapeHtml(slide.title)}</h2>
          <p>${Utils.escapeHtml(slide.body)}</p>
        </div>`;
      })
      .join("");

    dotsContainer.innerHTML = slides
      .map((_, i) => `<span class="onboarding-dot${i === 0 ? " is-active" : ""}" data-dot="${i}"></span>`)
      .join("");

    skipBtn.addEventListener("click", complete);
    backBtn.addEventListener("click", () => goTo(currentSlide - 1));
    nextBtn.addEventListener("click", () => {
      if (currentSlide === slides.length - 1) {
        complete();
      } else {
        goTo(currentSlide + 1);
      }
    });

    overlay.addEventListener("keydown", (e) => {
      if (e.key === "Escape") complete();
    });

    // Basic swipe support
    let touchStartX = null;
    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    track.addEventListener(
      "touchend",
      (e) => {
        if (touchStartX === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 50) {
          if (delta < 0) goTo(currentSlide + 1);
          else goTo(currentSlide - 1);
        }
        touchStartX = null;
      },
      { passive: true }
    );

    render();
  }

  function goTo(index) {
    if (index < 0 || index > slides.length - 1) return;
    currentSlide = index;
    render();
  }

  function render() {
    const slideEls = Utils.qsa(".onboarding-slide", track);
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    slideEls.forEach((el, i) => {
      el.style.opacity = i === currentSlide ? "1" : "0.4";
    });

    Utils.qsa(".onboarding-dot", dotsContainer).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentSlide);
    });

    backBtn.style.visibility = currentSlide === 0 ? "hidden" : "visible";
    nextBtn.innerHTML =
      currentSlide === slides.length - 1
        ? '<span>Get Started</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>'
        : '<span>Next</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
  }

  function complete() {
    Storage.setOnboardingComplete(true);
    hide();
    if (typeof onCompleteCallback === "function") onCompleteCallback();
  }

  function show(onComplete) {
    onCompleteCallback = onComplete || null;
    if (!overlay) build();
    currentSlide = 0;
    render();
    overlay.classList.remove("is-hidden");
    document.body.style.overflow = "hidden";
    releaseFocusTrap = Utils.trapFocus(overlay);
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.add("is-hidden");
    document.body.style.overflow = "";
    if (releaseFocusTrap) releaseFocusTrap();
  }

  function replay() {
    show(() => {
      Toast.success("Welcome tour restarted from Profile");
    });
  }

  function maybeShowOnFirstLaunch() {
    if (!Storage.isOnboardingComplete()) {
      show();
    }
  }

  return { maybeShowOnFirstLaunch, replay };
})();
