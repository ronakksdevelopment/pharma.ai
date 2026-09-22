/**
 * Home View
 */

const HomeView = (() => {
  function render() {
    const hero = APP_CONFIG.assets.illustrations.homeHero;
    const featuredMedicines = APP_DATA.medicines.slice(0, 3);
    const featuredResearch = APP_DATA.research.slice(0, 3);
    const topics = APP_DATA.exploreCards.slice(0, 4);

    return `
      <div class="home-greeting">
        <img class="home-greeting-logo" src="${Utils.assetUrl(APP_CONFIG.assets.logo.png96)}" alt="" width="48" height="48">
        <div class="home-greeting-text">
          <h1>Welcome back</h1>
          <p>${Utils.escapeHtml(APP_CONFIG.tagline)}</p>
        </div>
      </div>

      <div class="home-intro">
        <span class="badge badge-beta" style="margin-bottom:8px;">${Utils.escapeHtml(APP_CONFIG.versionLabel)}</span>
        <p>${Utils.escapeHtml(APP_CONFIG.description)}</p>
      </div>

      <section class="hero">
        <div class="hero-content">
          <span class="hero-eyebrow"><i class="fa-solid fa-flask" aria-hidden="true"></i> Pharmaceutical Technology</span>
          <h2>Where pharmacy meets AI-inspired science</h2>
          <p>Explore molecular concepts, delivery systems and research themes brought to life.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-nav-to="explore">Start Exploring</button>
            <button class="btn btn-secondary" data-nav-to="quiz">Take Quiz</button>
          </div>
        </div>
        <div class="hero-image">
          <picture>
            <source srcset="${Utils.assetUrl(hero.webp)}" type="image/webp">
            <img src="${Utils.assetUrl(hero.png)}" alt="${Utils.escapeHtml(hero.alt)}" width="900" height="600" loading="eager">
          </picture>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Quick Actions</h2>
        </div>
        <div class="scroll-row">
          <button class="quick-action" data-nav-to="explore">
            <span class="quick-action-icon"><i class="fa-solid fa-compass" aria-hidden="true"></i></span>
            <span>Explore Topics</span>
          </button>
          <button class="quick-action" data-nav-to="quiz">
            <span class="quick-action-icon"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i></span>
            <span>Take Quiz</span>
          </button>
          <button class="quick-action" data-nav-to="research">
            <span class="quick-action-icon"><i class="fa-solid fa-flask-vial" aria-hidden="true"></i></span>
            <span>Research</span>
          </button>
          <button class="quick-action" data-action="open-medicine" data-id="nanoparticle-delivery">
            <span class="quick-action-icon"><i class="fa-solid fa-atom" aria-hidden="true"></i></span>
            <span>Nanotech</span>
          </button>
          <button class="quick-action" data-nav-to="profile">
            <span class="quick-action-icon"><i class="fa-solid fa-circle-info" aria-hidden="true"></i></span>
            <span>About</span>
          </button>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Featured Research</h2>
          <button class="section-link" data-nav-to="research">See all</button>
        </div>
        <div class="scroll-row">
          ${featuredResearch.map(researchCardHtml).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Pharmacy Education Topics</h2>
          <button class="section-link" data-nav-to="explore">See all</button>
        </div>
        <div class="scroll-row">
          ${topics.map(topicCardHtml).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Featured Medicines</h2>
          <button class="section-link" data-nav-to="explore">See all</button>
        </div>
        ${featuredMedicines.map(medicineCardHtml).join("")}
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Test Your Knowledge</h2>
        </div>
        <div class="card" style="display:flex; align-items:center; gap:16px;">
          <div class="quick-action-icon" style="width:52px;height:52px;flex-shrink:0;">
            <i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
          </div>
          <div style="flex:1;">
            <h3 style="font-size:var(--fs-base); font-weight:700; margin-bottom:2px;">Pharmacy Quiz</h3>
            <p style="font-size:var(--fs-sm); color:var(--color-text-secondary);">${APP_DATA.quiz.length} questions · Best score: ${Storage.getQuizBest()}/${APP_DATA.quiz.length}</p>
          </div>
          <button class="btn btn-primary btn-sm" data-nav-to="quiz">Start</button>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Project Highlights</h2>
        </div>
        <div class="highlight-grid">
          <div class="highlight-card">
            <i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
            <h3>Installable PWA</h3>
            <p>Add to your home screen for an app-like experience.</p>
          </div>
          <div class="highlight-card">
            <i class="fa-solid fa-wifi" aria-hidden="true"></i>
            <h3>Works Offline</h3>
            <p>Core content cached for offline learning.</p>
          </div>
          <div class="highlight-card">
            <i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            <h3>Interactive Quiz</h3>
            <p>${APP_DATA.quiz.length} pharmacy science questions.</p>
          </div>
          <div class="highlight-card">
            <i class="fa-solid fa-shield-heart" aria-hidden="true"></i>
            <h3>Educational Only</h3>
            <p>Not a real pharmacy or prescription tool.</p>
          </div>
        </div>
      </section>
    `;
  }

  function topicCardHtml(topic) {
    return `
      <button class="topic-card" data-action="open-topic" data-id="${topic.id}">
        <span class="topic-card-icon"><i class="fa-solid ${topic.category === "basics" ? "fa-mortar-pestle" : "fa-book-open"}" aria-hidden="true"></i></span>
        <h3>${Utils.escapeHtml(topic.title)}</h3>
        <p>${Utils.escapeHtml(topic.summary)}</p>
      </button>`;
  }

  function researchCardHtml(item) {
    return `
      <button class="topic-card" data-action="open-research" data-id="${item.id}">
        <span class="topic-card-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></span>
        <span class="badge" style="align-self:flex-start;">${Utils.escapeHtml(item.badge)}</span>
        <h3>${Utils.escapeHtml(item.title)}</h3>
        <p>${Utils.escapeHtml(item.summary)}</p>
      </button>`;
  }

  function medicineCardHtml(med) {
    return `
      <button class="medicine-card" data-action="open-medicine" data-id="${med.id}">
        <span class="medicine-icon"><i class="fa-solid ${med.icon}" aria-hidden="true"></i></span>
        <div class="medicine-info">
          <h3>${Utils.escapeHtml(med.name)}</h3>
          <p>${Utils.escapeHtml(med.classLabel)}</p>
        </div>
        <i class="fa-solid fa-chevron-right list-card-chevron" aria-hidden="true"></i>
      </button>`;
  }

  return { render, topicCardHtml, researchCardHtml, medicineCardHtml };
})();
