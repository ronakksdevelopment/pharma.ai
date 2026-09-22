/**
 * Research View
 */

const ResearchView = (() => {
  function render() {
    return `
      <div class="view-header">
        <h1>Research</h1>
        <p>Pharmaceutical technology and scientific concepts</p>
      </div>

      <div class="card card-surface" style="margin-bottom: var(--space-6); display:flex; gap:12px; align-items:flex-start;">
        <i class="fa-solid fa-circle-info" aria-hidden="true" style="color: var(--color-primary); margin-top:2px;"></i>
        <p style="font-size: var(--fs-sm); line-height: var(--lh-relaxed);">These cards explore general pharmaceutical science themes and the project's own concepts for educational purposes. They do not represent specific clinical claims or approved products.</p>
      </div>

      <div id="researchList">
        ${APP_DATA.research.map(researchListItem).join("")}
      </div>
    `;
  }

  function researchListItem(item) {
    return `
      <button class="list-card" data-action="open-research" data-id="${item.id}">
        <span class="list-card-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></span>
        <div class="list-card-body">
          <span class="badge" style="margin-bottom:6px;">${Utils.escapeHtml(item.badge)}</span>
          <h3>${Utils.escapeHtml(item.title)}</h3>
          <p>${Utils.escapeHtml(item.summary)}</p>
        </div>
        <i class="fa-solid fa-chevron-right list-card-chevron" aria-hidden="true"></i>
      </button>`;
  }

  function attachEvents() {
    /* handled by global delegated listener in app.js */
  }

  return { render, attachEvents };
})();
