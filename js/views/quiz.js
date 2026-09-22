/**
 * Quiz View, interactive multiple-choice pharmacy quiz.
 */

const QuizView = (() => {
  const TOTAL = APP_DATA.quiz.length;
  let state = "intro"; // intro | question | results
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let selectedIndex = null;
  let questionOrder = [];

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function resetQuiz() {
    state = "intro";
    currentIndex = 0;
    score = 0;
    answered = false;
    selectedIndex = null;
  }

  function render() {
    if (state === "intro") return renderIntro();
    if (state === "results") return renderResults();
    return renderQuestion();
  }

  function renderIntro() {
    const best = Storage.getQuizBest();
    const attempts = Storage.getQuizAttempts();
    return `
      <div class="view-header">
        <h1>Quiz</h1>
        <p>Test your pharmacy &amp; pharmaceutical science knowledge</p>
      </div>
      <div class="quiz-intro">
        <div class="quiz-intro-icon"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i></div>
        <h2>Pharmacy Knowledge Quiz</h2>
        <p>${TOTAL} multiple-choice questions covering pharmacology basics, drug delivery, nanotechnology and more.</p>
        <div class="quiz-stats">
          <div class="quiz-stat"><strong>${best}/${TOTAL}</strong><span>Best Score</span></div>
          <div class="quiz-stat"><strong>${attempts}</strong><span>Attempts</span></div>
        </div>
        <button class="btn btn-primary btn-block" id="quizStartBtn" style="max-width:280px; margin:0 auto;">Start Quiz</button>
      </div>
    `;
  }

  function renderQuestion() {
    const q = APP_DATA.quiz[currentIndex];
    const pct = Math.round((currentIndex / TOTAL) * 100);
    return `
      <div class="quiz-header">
        <div class="progress-track" style="flex:1;">
          <div class="progress-fill" style="width:${pct}%;"></div>
        </div>
        <span class="quiz-header-count">${currentIndex + 1} / ${TOTAL}</span>
      </div>
      <h2 class="quiz-question">${Utils.escapeHtml(q.question)}</h2>
      <div class="quiz-options" id="quizOptions" role="radiogroup" aria-label="Answer options">
        ${q.options
          .map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return `<button class="quiz-option" data-option-index="${i}" role="radio" aria-checked="false">
              <span class="quiz-option-letter">${letter}</span>
              <span>${Utils.escapeHtml(opt)}</span>
            </button>`;
          })
          .join("")}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <button class="btn btn-primary btn-block" id="quizNextBtn" disabled>
        ${currentIndex === TOTAL - 1 ? "See Results" : "Next Question"}
      </button>
    `;
  }

  function renderResults() {
    const pct = Math.round((score / TOTAL) * 100);
    Storage.recordQuizAttempt(score, TOTAL);
    let message = "Keep exploring to strengthen your knowledge!";
    if (pct >= 90) message = "Outstanding! You have excellent pharmacy science knowledge.";
    else if (pct >= 70) message = "Great job! You know your pharmacy fundamentals well.";
    else if (pct >= 50) message = "Good effort! Review a few topics and try again.";

    return `
      <div class="quiz-results">
        <div class="quiz-score-ring" style="--score-pct:${pct};">
          <div class="quiz-score-ring-value">
            <strong>${score}/${TOTAL}</strong>
            <span>${pct}% CORRECT</span>
          </div>
        </div>
        <h2>Quiz Complete!</h2>
        <p>${message}</p>
        <div class="quiz-results-actions">
          <button class="btn btn-primary btn-block" id="quizRetryBtn">Retry Quiz</button>
          <button class="btn btn-secondary btn-block" id="quizExploreBtn">Explore More Topics</button>
        </div>
      </div>
    `;
  }

  function mount(container) {
    container.innerHTML = render();
    attachEvents(container);
  }

  function attachEvents(container) {
    if (state === "intro") {
      const startBtn = document.getElementById("quizStartBtn");
      if (startBtn) {
        startBtn.addEventListener("click", () => {
          state = "question";
          currentIndex = 0;
          score = 0;
          mount(container);
        });
      }
      return;
    }

    if (state === "results") {
      const retryBtn = document.getElementById("quizRetryBtn");
      const exploreBtn = document.getElementById("quizExploreBtn");
      if (retryBtn) {
        retryBtn.addEventListener("click", () => {
          resetQuiz();
          state = "question";
          mount(container);
        });
      }
      if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
          resetQuiz();
          App.navigateTo("explore");
        });
      }
      return;
    }

    // Question state
    answered = false;
    selectedIndex = null;
    const optionsEl = document.getElementById("quizOptions");
    const nextBtn = document.getElementById("quizNextBtn");
    const feedbackEl = document.getElementById("quizFeedback");
    const q = APP_DATA.quiz[currentIndex];

    optionsEl.addEventListener("click", (e) => {
      const optBtn = e.target.closest(".quiz-option");
      if (!optBtn || answered) return;
      answered = true;
      selectedIndex = parseInt(optBtn.dataset.optionIndex, 10);
      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) score += 1;

      Utils.qsa(".quiz-option", optionsEl).forEach((btn, i) => {
        btn.disabled = true;
        btn.setAttribute("aria-checked", i === selectedIndex ? "true" : "false");
        if (i === q.correctIndex) btn.classList.add("is-correct");
        else if (i === selectedIndex) btn.classList.add("is-incorrect");
      });

      feedbackEl.classList.add("is-visible");
      feedbackEl.innerHTML = `
        <strong>${isCorrect ? '<i class="fa-solid fa-circle-check" style="color:var(--color-success);" aria-hidden="true"></i> Correct!' : '<i class="fa-solid fa-circle-xmark" style="color:var(--color-danger);" aria-hidden="true"></i> Not quite'}</strong>
        ${Utils.escapeHtml(q.explanation)}
      `;

      nextBtn.disabled = false;
      nextBtn.focus();
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex === TOTAL - 1) {
        state = "results";
      } else {
        currentIndex += 1;
      }
      mount(container);
    });
  }

  function reset() {
    resetQuiz();
  }

  return { mount, reset };
})();
