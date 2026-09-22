/**
 * Toast, lightweight notification system.
 */

const Toast = (() => {
  let region;

  function init() {
    region = document.getElementById("toastRegion");
  }

  const ICONS = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    info: "fa-circle-info",
  };

  function show(message, type = "info", duration = 2600) {
    if (!region) init();
    if (!region) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = `<i class="fa-solid ${ICONS[type] || ICONS.info}" aria-hidden="true"></i><span>${Utils.escapeHtml(
      message
    )}</span>`;

    region.appendChild(toast);

    const remove = () => {
      toast.classList.add("is-leaving");
      setTimeout(() => toast.remove(), 180);
    };

    const timer = setTimeout(remove, duration);
    toast.addEventListener("click", () => {
      clearTimeout(timer);
      remove();
    });
  }

  return {
    init,
    success: (msg, d) => show(msg, "success", d),
    error: (msg, d) => show(msg, "error", d),
    info: (msg, d) => show(msg, "info", d),
  };
})();
