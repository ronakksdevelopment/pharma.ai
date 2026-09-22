# AI Empowered Pharmacy

**Version 1.0**, an educational pharmacy & pharmaceutical technology demonstration Progressive Web App (PWA).

> ⚠️ **Educational demo only.** This is **not** a real pharmacy, diagnostic tool, prescription system or medical decision system. It does not dispense medication and must never be used for diagnosis, prescription, treatment or personalized dosage decisions. Always consult a licensed healthcare professional for medical advice.

---

## About

AI Empowered Pharmacy combines pharmacy education, pharmaceutical science, AI-inspired concepts and interactive learning into a single mobile-first, installable PWA. It's built with plain HTML5, CSS3 and vanilla JavaScript (ES6+), no frameworks, no backend, no build step.

## Features

- **Onboarding flow**, three-screen first-launch welcome tour, replayable anytime from Profile
- **Home**, hero section, quick actions, featured research, education topics, featured medicines and a quiz shortcut
- **Explore**, searchable, filterable educational cards across 7 categories (Pharmacy Basics, Pharmaceutical Science, Drug Delivery, Nanotechnology, AI in Healthcare, Dosage Forms, Medication Safety) plus medicine reference cards
- **Quiz**, 13 multiple-choice pharmacy & pharmaceutical science questions with instant feedback, progress tracking, scoring and retry
- **Research**, pharmaceutical technology themes including chitosan-based nanoparticle drug delivery, a real area of pharmaceutical science research
- **Profile**, PWA install button, replayable onboarding, About Us, Credits, two project-concept authors, developer contribution, GitHub link and educational disclaimer
- **Installable PWA**, manifest, service worker, offline caching, custom install prompt, installed-state detection
- **Accessible**, semantic HTML, ARIA labels, visible focus states, ~44px touch targets, `prefers-reduced-motion` support
- **Responsive**, mobile-first (9:16), scales cleanly to tablet and desktop with a sidebar navigation layout

## Tech Stack

- HTML5, CSS3 (custom properties / design tokens, no framework)
- Vanilla JavaScript ES6+ (IIFE modules, no build tools required)
- [Font Awesome 6](https://fontawesome.com/) (via CDN) for icons
- [Inter](https://fonts.google.com/specimen/Inter) (via Google Fonts) for typography

## Project Structure

```
├── index.html                 # App shell, all views live in one page
├── manifest.webmanifest       # PWA manifest
├── service-worker.js          # Offline caching (GitHub Pages path-safe)
├── css/
│   ├── variables.css          # Design tokens (colors, spacing, type scale)
│   ├── base.css                # Reset & base element styles
│   ├── layout.css              # App shell: topbar, bottom nav, desktop nav
│   ├── components.css          # Buttons, cards, badges, toasts, sheets, forms
│   ├── onboarding.css          # Onboarding flow styles
│   └── views.css               # Home hero, quiz, profile view specifics
├── js/
│   ├── config.js                # ⭐ Centralized asset paths, brand colors, authors
│   ├── data.js                  # Educational content (medicines, quiz, research, topics)
│   ├── utils.js                 # DOM helpers, base-path resolution, escaping
│   ├── storage.js               # localStorage wrapper (onboarding, bookmarks, quiz)
│   ├── toast.js                  # Toast notification system
│   ├── pwa-install.js           # beforeinstallprompt handling
│   ├── sheet.js                  # Bottom-sheet detail modal
│   ├── onboarding.js            # Onboarding flow logic
│   ├── views/
│   │   ├── home.js
│   │   ├── explore.js
│   │   ├── research.js
│   │   ├── quiz.js
│   │   └── profile.js
│   └── app.js                    # Router / orchestrator
└── assets/
    ├── icons/                   # App icons (72–512px), favicons, maskable icon
    └── illustrations/           # Welcome & hero illustrations (WebP + PNG fallback)
```

## Editing Content & Assets

All editable configuration lives in **`js/config.js`**:
- Asset paths (swap illustrations/icons without touching markup)
- Brand colors
- Author names, photos and social URLs
- Developer handle and GitHub URLs
- App version and disclaimer text

All educational content lives in **`js/data.js`**:
- Explore categories & cards
- Medicine reference cards
- Research topics
- Quiz questions

## Running Locally

No build step required. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. In repository **Settings → Pages**, set the source to the branch/folder containing these files (e.g. `main` / `/root`).
3. The app auto-detects its base path at runtime (`js/utils.js → getBasePath()`), so it works correctly whether hosted at a domain root or under a project path like `https://username.github.io/repo-name/`.
4. No further configuration is needed, all internal asset paths are relative.

## Credits

- **Project idea & concept:** two contributing authors (see Profile → Project Creators)
- **Developer contribution:** `@ronakksdevelopment`
- **Icons:** [Font Awesome](https://fontawesome.com/)
- **Visual assets:** generated illustrations created specifically for this project

## License & Disclaimer

This project is an educational technology demonstration. It is provided as-is for learning purposes and is not intended for real-world clinical, diagnostic or prescription use.
