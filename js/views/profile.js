/**
 * Profile View: install, about, credits, authors, disclaimer.
 */

const ProfileView = (() => {
  function render() {
    return `
      <div class="profile-header">
        <div class="profile-avatar"><i class="fa-solid fa-user" aria-hidden="true"></i></div>
        <h1>${Utils.escapeHtml(APP_CONFIG.appName)}</h1>
        <p>${Utils.escapeHtml(APP_CONFIG.versionLabel)}</p>
      </div>

      <div class="install-card" id="installCard">
        <i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
        <h3 id="installTitle">Install App</h3>
        <p id="installDescription">Add AI Empowered Pharmacy to your home screen for quick, app-like access.</p>
        <button class="btn btn-primary" id="installBtn">Install App</button>
      </div>

      <section class="section">
        <div class="section-header"><h2>Getting Started</h2></div>
        <div class="form-row" role="button" tabindex="0" id="replayOnboardingBtn" style="cursor:pointer;">
          <div class="form-row-label">
            <i class="fa-solid fa-rotate-right" aria-hidden="true"></i>
            <span>Replay Welcome Tour</span>
          </div>
          <i class="fa-solid fa-chevron-right" style="color:var(--color-text-secondary);" aria-hidden="true"></i>
        </div>
      </section>

      <section class="section">
        <div class="section-header"><h2>About Us</h2></div>
        <div class="card about-card">
          <img class="about-logo" src="${Utils.assetUrl(APP_CONFIG.assets.logo.png192)}" alt="${Utils.escapeHtml(APP_CONFIG.appName)} logo" width="96" height="96">
          <p class="about-text">AI Empowered Pharmacy combines pharmacy education, pharmaceutical science, AI-inspired concepts and interactive learning into one modern Progressive Web App experience.</p>
          <p class="about-text">This is ${Utils.escapeHtml(APP_CONFIG.versionLabel)}, an educational technology demonstration built to explore how mobile-first design and interactive content can make pharmaceutical science more approachable.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-header"><h2>Project Creators</h2></div>
        ${APP_CONFIG.authors.map(authorCardHtml).join("")}
      </section>

      <section class="section">
        <div class="section-header"><h2>Institutional Context</h2></div>
        <div class="card institutional-card">
          <img class="institutional-logo" src="${Utils.assetUrl(APP_CONFIG.assets.institutional.ripsatLogo.png)}" alt="${Utils.escapeHtml(APP_CONFIG.assets.institutional.ripsatLogo.alt)}" width="200" height="288" loading="lazy">
          <div class="institutional-text">
            <h3>${Utils.escapeHtml(APP_CONFIG.institution.name)}</h3>
            <p class="institutional-meta">${Utils.escapeHtml(APP_CONFIG.institution.authority)} &middot; ${Utils.escapeHtml(APP_CONFIG.institution.established)}</p>
            <p class="institutional-motto">&ldquo;${Utils.escapeHtml(APP_CONFIG.institution.motto)}&rdquo;</p>
            <p class="institutional-note">${Utils.escapeHtml(APP_CONFIG.institution.note)}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header"><h2>Credits</h2></div>
        <div class="card">
          <div class="form-row">
            <div class="form-row-label"><i class="fa-solid fa-code" aria-hidden="true"></i><span>Developer</span></div>
            <a href="${Utils.escapeHtml(APP_CONFIG.developer.githubUrl)}" target="_blank" rel="noopener" class="form-row-value">${Utils.escapeHtml(APP_CONFIG.developer.handle)}</a>
          </div>
          <div class="form-row">
            <div class="form-row-label"><i class="fa-brands fa-font-awesome" aria-hidden="true"></i><span>Icons</span></div>
            <span class="form-row-value">Font Awesome</span>
          </div>
          <div class="form-row">
            <div class="form-row-label"><i class="fa-solid fa-image" aria-hidden="true"></i><span>Visual Assets</span></div>
            <span class="form-row-value">Generated illustrations</span>
          </div>
          <div class="form-row">
            <div class="form-row-label"><i class="fa-brands fa-github" aria-hidden="true"></i><span>Source Code</span></div>
            <a href="${Utils.escapeHtml(APP_CONFIG.repo.githubUrl)}" target="_blank" rel="noopener" class="form-row-value">View on GitHub</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header"><h2>App Information</h2></div>
        <div class="card">
          <div class="form-row">
            <div class="form-row-label"><i class="fa-solid fa-code-branch" aria-hidden="true"></i><span>Version</span></div>
            <span class="form-row-value">${Utils.escapeHtml(APP_CONFIG.versionLabel)}</span>
          </div>
          <div class="form-row">
            <div class="form-row-label"><i class="fa-solid fa-wifi" aria-hidden="true"></i><span>Connection</span></div>
            <span class="form-row-value" id="connectionStatus">Checking...</span>
          </div>
          <div class="form-row">
            <div class="form-row-label"><i class="fa-solid fa-download" aria-hidden="true"></i><span>Install Status</span></div>
            <span class="form-row-value" id="installStatus">Checking...</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="disclaimer-box">
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          <span>${Utils.escapeHtml(APP_CONFIG.disclaimer)}</span>
        </div>
      </section>

      <footer class="app-footer">
        <p>Developer <strong>${Utils.escapeHtml(APP_CONFIG.developer.handle)}</strong></p>
        <p style="margin-top:4px;">${Utils.escapeHtml(APP_CONFIG.versionLabel)} &middot; Educational demonstration only</p>
      </footer>
    `;
  }

  function authorCardHtml(author) {
    const initial = author.name ? author.name.charAt(0).toUpperCase() : "?";
    const avatarInner = author.photo
      ? `<img src="${Utils.escapeHtml(author.photo)}" alt="">`
      : `<span>${initial}</span>`;
    const socialLinks = [];
    if (author.social?.instagram) {
      socialLinks.push(
        `<a href="${Utils.escapeHtml(author.social.instagram)}" target="_blank" rel="noopener" class="author-social-link" aria-label="${Utils.escapeHtml(author.name)} on Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>`
      );
    }
    if (author.social?.github) {
      socialLinks.push(
        `<a href="${Utils.escapeHtml(author.social.github)}" target="_blank" rel="noopener" class="author-social-link" aria-label="${Utils.escapeHtml(author.name)} on GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>`
      );
    }
    if (author.social?.linkedin) {
      socialLinks.push(
        `<a href="${Utils.escapeHtml(author.social.linkedin)}" target="_blank" rel="noopener" class="author-social-link" aria-label="${Utils.escapeHtml(author.name)} on LinkedIn"><i class="fa-brands fa-linkedin" aria-hidden="true"></i></a>`
      );
    }
    return `
      <div class="author-card">
        <div class="author-avatar">${avatarInner}</div>
        <div class="author-info" style="flex:1;">
          <h3>${Utils.escapeHtml(author.name)}</h3>
          <p>${Utils.escapeHtml(author.role)}</p>
        </div>
        ${socialLinks.length ? `<div class="author-social">${socialLinks.join("")}</div>` : ""}
      </div>`;
  }

  function attachEvents() {
    const replayBtn = document.getElementById("replayOnboardingBtn");
    if (replayBtn) {
      const trigger = () => Onboarding.replay();
      replayBtn.addEventListener("click", trigger);
      replayBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      });
    }

    PwaInstall.attachButton(document.getElementById("installBtn"));
    PwaInstall.updateProfileStatus();

    const connectionStatus = document.getElementById("connectionStatus");
    if (connectionStatus) {
      connectionStatus.textContent = navigator.onLine ? "Online" : "Offline";
    }
  }

  return { render, attachEvents };
})();
