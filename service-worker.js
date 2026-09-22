/**
 * Service Worker, AI Empowered Pharmacy
 * Provides offline caching for the app shell and core assets.
 * Uses self.registration.scope to remain GitHub Pages project-path safe.
 */

const CACHE_VERSION = "aiep-v1.0.0";
const CACHE_NAME = `aiep-cache-${CACHE_VERSION}`;

// Resolve the scope root once, works whether hosted at domain root
// or under a GitHub Pages project path like /repo-name/.
const SCOPE = self.registration ? self.registration.scope : self.location.href;

const APP_SHELL = [
  "",
  "index.html",
  "manifest.webmanifest",
  "css/variables.css",
  "css/base.css",
  "css/layout.css",
  "css/components.css",
  "css/onboarding.css",
  "css/views.css",
  "js/config.js",
  "js/data.js",
  "js/utils.js",
  "js/storage.js",
  "js/toast.js",
  "js/pwa-install.js",
  "js/sheet.js",
  "js/onboarding.js",
  "js/views/home.js",
  "js/views/explore.js",
  "js/views/research.js",
  "js/views/quiz.js",
  "js/views/profile.js",
  "js/app.js",
  "assets/icons/icon-72.png",
  "assets/icons/icon-96.png",
  "assets/icons/icon-128.png",
  "assets/icons/icon-144.png",
  "assets/icons/icon-152.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-256.png",
  "assets/icons/icon-384.png",
  "assets/icons/icon-512.png",
  "assets/icons/favicon-32.png",
  "assets/icons/favicon-16.png",
  "assets/illustrations/welcome-1-pharmacy-ai.webp",
  "assets/illustrations/welcome-2-research.webp",
  "assets/illustrations/welcome-3-learning.webp",
  "assets/illustrations/home-hero-3d.webp",
  "assets/illustrations/welcome-1-pharmacy-ai.png",
  "assets/illustrations/welcome-2-research.png",
  "assets/illustrations/welcome-3-learning.png",
  "assets/illustrations/home-hero-3d.png",
  "assets/authors/karnajit-reang.jpg",
  "assets/authors/kishaloy-debnath.jpg",
  "assets/institutional/ripsat-logo.png",
].map((path) => new URL(path, SCOPE).toString());

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("SW install cache error:", err))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("aiep-cache-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Strategy:
// - Navigation requests: network-first, falling back to cached index.html (offline shell).
// - Same-origin static assets: cache-first, falling back to network, then caching response.
// - Cross-origin (fonts, Font Awesome CDN): network-first, cache as available.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(new URL("index.html", SCOPE).toString()).then((res) => res || caches.match(request))
      )
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // Cross-origin (CDN fonts/icons): try network, fall back to cache.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
