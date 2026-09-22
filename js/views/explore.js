/**
 * Explore View — searchable educational cards with category filters.
 */

const ExploreView = (() => {
  let activeCategory = "all";
  let searchTerm = "";

  function render() {
    return `
      <div class="view-header">
        <h1>Explore</h1>
        <p>Search pharmacy and pharmaceutical science topics</p>
      </div>

      <div class="search-bar">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <input type="search" id="exploreSearch" placeholder="Search topics or medicines..." aria-label="Search educational topics and medicines" value="${Utils.escapeHtml(searchTerm)}">
        <button class="search-clear${searchTerm ? " is-visible" : ""}" id="exploreSearchClear" aria-label="Clear search">
          <i class="fa-solid fa-circle-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="chip-row" id="exploreChips">
        <button class="chip${activeCategory === "all" ? " is-active" : ""}" data-category="all">All</button>
        ${APP_DATA.categories
          .map(
            (cat) =>
              `<button class="chip${activeCategory === cat.id ? " is-active" : ""}" data-category="${cat.id}"><i class="fa-solid ${cat.icon}" aria-hidden="true"></i> ${Utils.escapeHtml(cat.label)}</button>`
          )
          .join("")}
      </div>

      <div id="exploreResults"></div>

      <section class="section" style="margin-top: var(--space-7);">
        <div class="section-header">
          <h2>Medicine Reference Cards</h2>
        </div>
        <div id="exploreMedicines"></div>
      </section>
    `;
  }

  function filteredCards() {
    return APP_DATA.exploreCards.filter((card) => {
      const matchesCategory = activeCategory === "all" || card.category === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        card.title.toLowerCase().includes(term) ||
        card.summary.toLowerCase().includes(term) ||
        card.tags.some((t) => t.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }

  function filteredMedicines() {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return APP_DATA.medicines;
    return APP_DATA.medicines.filter(
      (m) => m.name.toLowerCase().includes(term) || m.classLabel.toLowerCase().includes(term)
    );
  }

  function renderResults() {
    const resultsEl = document.getElementById("exploreResults");
    const medsEl = document.getElementById("exploreMedicines");
    if (!resultsEl || !medsEl) return;

    const cards = filteredCards();
    resultsEl.innerHTML = cards.length
      ? cards.map(listCardHtml).join("")
      : `<div class="empty-state"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><p>No topics match your search. Try different keywords.</p></div>`;

    const meds = filteredMedicines();
    medsEl.innerHTML = meds.length
      ? meds.map((m) => HomeView.medicineCardHtml(m)).join("")
      : `<div class="empty-state"><i class="fa-solid fa-pills" aria-hidden="true"></i><p>No medicine cards match your search.</p></div>`;
  }

  function listCardHtml(card) {
    const bookmarked = Storage.isBookmarked(card.id);
    return `
      <button class="list-card" data-action="open-topic" data-id="${card.id}">
        <span class="list-card-icon"><i class="fa-solid fa-book-open" aria-hidden="true"></i></span>
        <div class="list-card-body">
          <h3>${Utils.escapeHtml(card.title)}</h3>
          <p>${Utils.escapeHtml(card.summary)}</p>
          <div class="list-card-tags">
            ${card.tags.map((t) => `<span class="badge badge-outline">${Utils.escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
        <i class="fa-solid ${bookmarked ? "fa-bookmark" : "fa-chevron-right"} list-card-chevron" aria-hidden="true"></i>
      </button>`;
  }

  function attachEvents() {
    const searchInput = document.getElementById("exploreSearch");
    const clearBtn = document.getElementById("exploreSearchClear");
    const chipsRow = document.getElementById("exploreChips");

    if (searchInput) {
      searchInput.addEventListener(
        "input",
        Utils.debounce((e) => {
          searchTerm = e.target.value;
          clearBtn.classList.toggle("is-visible", searchTerm.length > 0);
          renderResults();
        }, 150)
      );
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchTerm = "";
        searchInput.value = "";
        clearBtn.classList.remove("is-visible");
        renderResults();
        searchInput.focus();
      });
    }

    if (chipsRow) {
      chipsRow.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-category]");
        if (!chip) return;
        activeCategory = chip.dataset.category;
        Utils.qsa(".chip", chipsRow).forEach((c) => c.classList.toggle("is-active", c === chip));
        renderResults();
      });
    }

    renderResults();
  }

  function reset() {
    activeCategory = "all";
    searchTerm = "";
  }

  return { render, attachEvents, reset };
})();
