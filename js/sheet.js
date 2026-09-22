/**
 * Sheet, bottom-sheet / modal detail view for topics, medicines and
 * research items.
 */

const Sheet = (() => {
  let overlay, sheetEl, releaseFocusTrap;
  let lastFocusedEl = null;

  function init() {
    overlay = document.getElementById("sheetOverlay");
    sheetEl = Utils.qs(".sheet", overlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  function openTopic(id) {
    const topic = APP_DATA.exploreCards.find((c) => c.id === id);
    if (!topic) return;
    const bookmarked = Storage.isBookmarked(topic.id);
    open(`
      <div class="sheet-header">
        <h2>${Utils.escapeHtml(topic.title)}</h2>
        <button class="sheet-close" data-sheet-close aria-label="Close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </div>
      <div class="sheet-body">
        <div class="list-card-tags" style="margin-bottom:12px;">
          ${topic.tags.map((t) => `<span class="badge badge-outline">${Utils.escapeHtml(t)}</span>`).join("")}
        </div>
        <p>${Utils.escapeHtml(topic.body)}</p>
      </div>
      <button class="btn ${bookmarked ? "btn-secondary" : "btn-outline"} btn-block" style="margin-top:20px;" id="sheetBookmarkBtn" data-id="${topic.id}" data-type="topic">
        <i class="fa-solid fa-bookmark" aria-hidden="true"></i> ${bookmarked ? "Bookmarked" : "Bookmark this topic"}
      </button>
    `);
    wireBookmarkButton();
  }

  function openMedicine(id) {
    const med = APP_DATA.medicines.find((m) => m.id === id);
    if (!med) return;
    open(`
      <div class="sheet-header">
        <h2>${Utils.escapeHtml(med.name)}</h2>
        <button class="sheet-close" data-sheet-close aria-label="Close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </div>
      <div class="sheet-body">
        <span class="badge" style="margin-bottom:12px;">${Utils.escapeHtml(med.classLabel)}</span>
        <p>${Utils.escapeHtml(med.summary)}</p>
        <ul class="fact-list">
          ${med.facts.map((f) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>${Utils.escapeHtml(f)}</span></li>`).join("")}
        </ul>
      </div>
      <div class="sheet-note">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        <span>${Utils.escapeHtml(med.note)}</span>
      </div>
    `);
  }

  function openResearch(id) {
    const item = APP_DATA.research.find((r) => r.id === id);
    if (!item) return;
    open(`
      <div class="sheet-header">
        <h2>${Utils.escapeHtml(item.title)}</h2>
        <button class="sheet-close" data-sheet-close aria-label="Close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </div>
      <div class="sheet-body">
        <span class="badge" style="margin-bottom:12px;">${Utils.escapeHtml(item.badge)}</span>
        <p>${Utils.escapeHtml(item.body)}</p>
      </div>
    `);
  }

  function wireBookmarkButton() {
    const btn = document.getElementById("sheetBookmarkBtn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nowBookmarked = Storage.toggleBookmark(id);
      btn.innerHTML = `<i class="fa-solid fa-bookmark" aria-hidden="true"></i> ${nowBookmarked ? "Bookmarked" : "Bookmark this topic"}`;
      btn.className = `btn ${nowBookmarked ? "btn-secondary" : "btn-outline"} btn-block`;
      Toast.success(nowBookmarked ? "Added to bookmarks" : "Removed from bookmarks");
    });
  }

  function open(html) {
    if (!overlay) init();
    lastFocusedEl = document.activeElement;
    sheetEl.innerHTML = `<div class="sheet-handle"></div>${html}`;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    Utils.qsa("[data-sheet-close]", sheetEl).forEach((btn) => btn.addEventListener("click", close));
    releaseFocusTrap = Utils.trapFocus(sheetEl);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (releaseFocusTrap) releaseFocusTrap();
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  return { init, openTopic, openMedicine, openResearch, close };
})();
