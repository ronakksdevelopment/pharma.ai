/**
 * App — main orchestrator: routing between views, navigation wiring,
 * global event delegation, online/offline detection.
 */

const App = (() => {
  const VIEWS = {
    home: { render: () => HomeView.render(), attach: () => {} },
    explore: {
      render: () => ExploreView.render(),
      attach: () => ExploreView.attachEvents(),
    },
    quiz: { render: null, attach: null }, // quiz manages its own mount
    research: {
      render: () => ResearchView.render(),
      attach: () => ResearchView.attachEvents(),
    },
    profile: {
      render: () => ProfileView.render(),
      attach: () => ProfileView.attachEvents(),
    },
  };

  let currentView = "home";
  let viewContainer;

  function init() {
    viewContainer = document.getElementById("viewContainer");

    Toast.init();
    Sheet.init();
    PwaInstall.init();
    registerGlobalDelegation();
    wireNav();
    wireOfflineIndicator();
    registerServiceWorker();

    navigateTo("home", { skipHistory: true });

    Onboarding.maybeShowOnFirstLaunch();
  }

  function wireNav() {
    Utils.qsa("[data-nav-target]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo(btn.dataset.navTarget));
    });
  }

  function navigateTo(viewId, opts = {}) {
    if (!VIEWS[viewId]) return;
    currentView = viewId;

    // Update nav active states
    Utils.qsa("[data-nav-target]").forEach((btn) => {
      const active = btn.dataset.navTarget === viewId;
      btn.classList.toggle("is-active", active);
      if (btn.classList.contains("nav-item")) {
        btn.setAttribute("aria-current", active ? "page" : "false");
      }
    });

    if (viewId === "quiz") {
      QuizView.mount(viewContainer);
    } else {
      viewContainer.innerHTML = VIEWS[viewId].render();
      VIEWS[viewId].attach();
    }

    if (!opts.skipHistory) {
      viewContainer.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    // Update page title for a11y
    document.title = `${capitalize(viewId)} · ${APP_CONFIG.appName}`;
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Delegated click handling for dynamically rendered content:
   * data-nav-to, data-action="open-topic|open-medicine|open-research"
   */
  function registerGlobalDelegation() {
    document.body.addEventListener("click", (e) => {
      const navBtn = e.target.closest("[data-nav-to]");
      if (navBtn) {
        navigateTo(navBtn.dataset.navTo);
        return;
      }

      const actionBtn = e.target.closest("[data-action]");
      if (actionBtn) {
        const { action, id } = actionBtn.dataset;
        if (action === "open-topic") Sheet.openTopic(id);
        else if (action === "open-medicine") Sheet.openMedicine(id);
        else if (action === "open-research") Sheet.openResearch(id);
      }
    });
  }

  function wireOfflineIndicator() {
    const banner = document.getElementById("offlineBanner");
    const statusDot = document.getElementById("connectivityDot");

    function update() {
      const offline = !navigator.onLine;
      if (banner) banner.classList.toggle("is-visible", offline);
      if (statusDot) statusDot.style.display = offline ? "block" : "none";
      const connectionStatus = document.getElementById("connectionStatus");
      if (connectionStatus) connectionStatus.textContent = offline ? "Offline" : "Online";
    }

    window.addEventListener("online", () => {
      update();
      Toast.success("Back online");
    });
    window.addEventListener("offline", () => {
      update();
      Toast.error("You are offline — showing cached content");
    });
    update();
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      const swUrl = Utils.assetUrl("service-worker.js");
      navigator.serviceWorker.register(swUrl).catch((err) => {
        console.warn("Service worker registration failed:", err);
      });
    });
  }

  return { init, navigateTo };
})();

document.addEventListener("DOMContentLoaded", App.init);
