/**
 * PwaInstall, handles beforeinstallprompt capture and custom Install
 * button wiring, plus installed-state detection.
 */

const PwaInstall = (() => {
  let deferredPrompt = null;
  let isInstalled = false;
  let buttons = [];

  function isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function init() {
    isInstalled = isStandalone();

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      refreshButtons();
    });

    window.addEventListener("appinstalled", () => {
      isInstalled = true;
      deferredPrompt = null;
      Toast.success("App installed successfully");
      refreshButtons();
      updateProfileStatus();
    });
  }

  function refreshButtons() {
    buttons.forEach(updateButtonState);
  }

  function updateButtonState(btn) {
    if (!btn) return;
    if (isInstalled) {
      btn.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> App Installed';
      btn.disabled = true;
    } else if (deferredPrompt) {
      btn.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i> Install App';
      btn.disabled = false;
    } else {
      btn.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i> Install App';
      btn.disabled = false;
    }
  }

  function attachButton(btn) {
    if (!btn) return;
    buttons.push(btn);
    updateButtonState(btn);

    btn.addEventListener("click", async () => {
      if (isInstalled) return;

      if (!deferredPrompt) {
        Toast.info("Use your browser's menu to \u201cAdd to Home Screen\u201d");
        return;
      }

      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        Toast.success("Installing app...");
      } else {
        Toast.info("Install dismissed");
      }
      deferredPrompt = null;
      refreshButtons();
    });
  }

  function updateProfileStatus() {
    const statusEl = document.getElementById("installStatus");
    if (statusEl) {
      statusEl.textContent = isInstalled ? "Installed" : "Not installed";
    }
  }

  return { init, attachButton, updateProfileStatus, isStandalone };
})();
