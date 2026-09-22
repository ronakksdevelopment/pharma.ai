/**
 * AI Empowered Pharmacy — Central Configuration
 * ------------------------------------------------
 * Single source of truth for asset paths, brand colors, app metadata,
 * author/credit info and editable social links. Edit this file to
 * re-skin the app or swap assets without touching markup or logic.
 *
 * NOTE: This is an educational demo project. It is NOT a real pharmacy,
 * diagnostic tool, prescription system or medical decision system.
 */

const APP_CONFIG = {
  // ---- App identity ----------------------------------------------------
  appName: "AI Empowered Pharmacy",
  shortName: "AIEmpPharm",
  version: "0.5",
  versionLabel: "v0.5 Beta Prototype",
  tagline: "Learn pharmacy & pharmaceutical science with AI-inspired concepts",
  description:
    "An educational demonstration app exploring pharmacy education, pharmaceutical science and AI-in-healthcare concepts through interactive learning.",

  // ---- Base path (GitHub Pages project-page support) --------------------
  // Auto-detected at runtime in js/utils.js via getBasePath().
  // Leave as "./" here; utils.js resolves the real base for asset URLs.
  basePath: "./",

  // ---- Brand colors (kept in sync with css/variables.css) --------------
  colors: {
    background: "#FFFFFF",
    primaryBlue: "#1769D2",
    deepBlue: "#0D47A1",
    textPrimary: "#111111",
    textSecondary: "#5F6B7A",
    surfaceBlue: "#EAF3FF",
  },

  // ---- Asset paths (centralized — swap files here only) -----------------
  assets: {
    logo: {
      png512: "assets/icons/icon-512.png",
      png192: "assets/icons/icon-192.png",
      png96: "assets/icons/icon-96.png",
    },
    favicon: {
      png32: "assets/icons/favicon-32.png",
      png16: "assets/icons/favicon-16.png",
    },
    illustrations: {
      welcome1: {
        webp: "assets/illustrations/welcome-1-pharmacy-ai.webp",
        png: "assets/illustrations/welcome-1-pharmacy-ai.png",
        alt: "Pharmacist reviewing pharmaceutical science notes with an AI-assisted mobile app",
      },
      welcome2: {
        webp: "assets/illustrations/welcome-2-research.webp",
        png: "assets/illustrations/welcome-2-research.png",
        alt: "Laboratory research illustration with microscope, nanoparticle model and molecular structures",
      },
      welcome3: {
        webp: "assets/illustrations/welcome-3-learning.webp",
        png: "assets/illustrations/welcome-3-learning.png",
        alt: "Pharmacist using a tablet with an interactive learning app interface",
      },
      homeHero: {
        webp: "assets/illustrations/home-hero-3d.webp",
        png: "assets/illustrations/home-hero-3d.png",
        alt: "3D illustration of a capsule, DNA helix, molecule and AI brain icon representing pharmaceutical technology",
      },
    },
  },

  // ---- Navigation --------------------------------------------------------
  nav: [
    { id: "home", label: "Home", icon: "fa-house" },
    { id: "explore", label: "Explore", icon: "fa-compass" },
    { id: "quiz", label: "Quiz", icon: "fa-graduation-cap" },
    { id: "research", label: "Research", icon: "fa-flask" },
    { id: "profile", label: "Profile", icon: "fa-user" },
  ],

  // ---- Authors / project concept creators --------------------------------
  // Edit names, photos and social URLs here only. Never invent contact info.
  authors: [
    {
      name: "Author One",
      role: "Project Idea & Concept",
      photo: null, // add a path under assets/ if a photo is supplied
      social: {
        github: null,
        linkedin: null,
      },
    },
    {
      name: "Author Two",
      role: "Project Idea & Concept",
      photo: null,
      social: {
        github: null,
        linkedin: null,
      },
    },
  ],

  // ---- Developer contribution ---------------------------------------------
  developer: {
    handle: "@ronakksdevelopment",
    githubUrl: "https://github.com/ronakksdevelopment", // editable
  },

  // ---- Repository / GitHub Pages -----------------------------------------
  repo: {
    githubUrl: "https://github.com/ronakksdevelopment/ai-empowered-pharmacy", // editable
  },

  // ---- Social links (only include if a real URL is supplied) -------------
  social: {
    // Left empty intentionally — populate only with verified real URLs.
  },

  // ---- Disclaimer ----------------------------------------------------------
  disclaimer:
    "AI Empowered Pharmacy is an educational technology demonstration only. It is not a real pharmacy, does not dispense medication, and must never be used for diagnosis, prescription, treatment or personalized dosage decisions. Always consult a licensed healthcare professional for medical advice.",
};

// Freeze to avoid accidental runtime mutation of shared config.
Object.freeze(APP_CONFIG.colors);
Object.freeze(APP_CONFIG.assets);
