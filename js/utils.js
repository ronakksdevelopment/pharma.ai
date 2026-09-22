/**
 * Utility functions — base path resolution, DOM helpers, escaping.
 */

const Utils = (() => {
  /**
   * Resolve the app's base path so asset URLs and the service worker
   * work correctly whether hosted at a domain root or a GitHub Pages
   * project path (e.g. https://user.github.io/repo-name/).
   */
  function getBasePath() {
    const { pathname } = window.location;
    // Directory containing index.html — strip filename if present.
    const dir = pathname.substring(0, pathname.lastIndexOf("/") + 1);
    return dir || "/";
  }

  function assetUrl(relativePath) {
    return getBasePath() + relativePath;
  }

  function qs(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function qsa(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function trapFocus(container) {
    const focusable = qsa(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      container
    ).filter((el) => !el.disabled && el.offsetParent !== null);
    if (focusable.length === 0) return () => {};
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeydown(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    container.addEventListener("keydown", handleKeydown);
    first.focus();
    return () => container.removeEventListener("keydown", handleKeydown);
  }

  return { getBasePath, assetUrl, qs, qsa, escapeHtml, debounce, trapFocus };
})();
