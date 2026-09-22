/**
 * Storage — thin localStorage wrapper with namespacing and safe fallbacks.
 * All app persistence (onboarding state, bookmarks, quiz progress,
 * preferences) goes through this module.
 */

const Storage = (() => {
  const PREFIX = "aiep_";
  let memoryFallback = {};
  let storageAvailable = true;

  try {
    const testKey = `${PREFIX}__test__`;
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
  } catch (e) {
    storageAvailable = false;
    console.warn("localStorage unavailable — using in-memory fallback for this session.");
  }

  function key(k) {
    return `${PREFIX}${k}`;
  }

  function get(k, fallback = null) {
    try {
      if (!storageAvailable) {
        return k in memoryFallback ? memoryFallback[k] : fallback;
      }
      const raw = window.localStorage.getItem(key(k));
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(k, value) {
    try {
      if (!storageAvailable) {
        memoryFallback[k] = value;
        return true;
      }
      window.localStorage.setItem(key(k), JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Storage write failed", e);
      return false;
    }
  }

  function remove(k) {
    try {
      if (!storageAvailable) {
        delete memoryFallback[k];
        return;
      }
      window.localStorage.removeItem(key(k));
    } catch (e) {
      /* no-op */
    }
  }

  // ---- Domain-specific helpers -------------------------------------------

  const KEYS = {
    ONBOARDING_DONE: "onboarding_done",
    BOOKMARKS: "bookmarks",
    QUIZ_BEST: "quiz_best_score",
    QUIZ_ATTEMPTS: "quiz_attempts",
    PREFERENCES: "preferences",
  };

  function isOnboardingComplete() {
    return get(KEYS.ONBOARDING_DONE, false) === true;
  }

  function setOnboardingComplete(value = true) {
    set(KEYS.ONBOARDING_DONE, value);
  }

  function getBookmarks() {
    return get(KEYS.BOOKMARKS, []);
  }

  function toggleBookmark(id) {
    const list = getBookmarks();
    const idx = list.indexOf(id);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(id);
    }
    set(KEYS.BOOKMARKS, list);
    return list.includes(id);
  }

  function isBookmarked(id) {
    return getBookmarks().includes(id);
  }

  function getQuizBest() {
    return get(KEYS.QUIZ_BEST, 0);
  }

  function recordQuizAttempt(score, total) {
    const best = getQuizBest();
    if (score > best) set(KEYS.QUIZ_BEST, score);
    const attempts = get(KEYS.QUIZ_ATTEMPTS, 0);
    set(KEYS.QUIZ_ATTEMPTS, attempts + 1);
    return { best: Math.max(best, score), attempts: attempts + 1 };
  }

  function getQuizAttempts() {
    return get(KEYS.QUIZ_ATTEMPTS, 0);
  }

  return {
    get,
    set,
    remove,
    KEYS,
    isOnboardingComplete,
    setOnboardingComplete,
    getBookmarks,
    toggleBookmark,
    isBookmarked,
    getQuizBest,
    recordQuizAttempt,
    getQuizAttempts,
  };
})();
