(function () {
  const STORAGE_KEYS = {
    profile: "lipPlannerProfile",
    includeDetailed: "lipPlannerIncludeDetailed",
    recommendation: "lipPlannerRecommendation",
    strategy: "lipPlannerStrategy",
    notes: "lipPlannerNotes"
  };

  const allSteps = [
    { id: "profile", label: "Client Profile", path: "profile.html" },
    { id: "estimate", label: "Estimate Need", path: "analysis-estimate.html" },
    { id: "detail", label: "Detailed Analysis", path: "analysis-detail.html" },
    { id: "recommendations", label: "Coverage Options", path: "recommendations.html" },
    { id: "planner", label: "Policy Planner", path: "planner.html" },
    { id: "summary", label: "Summary", path: "summary.html" }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    initializeHomepage();
    initializeReturnHomeButton();
    initializeWorkflowNav();
    initializeProfileForm();
    initializeEstimatePage();
    initializeRecommendationSelection();
    initializeStrategySelection();
    initializeSummaryPage();
    initializeNotesSync();
  });

  function initializeHomepage() {
    const startPlanningButton = document.getElementById("start-planning");

    if (!startPlanningButton) {
      return;
    }

    startPlanningButton.addEventListener("click", () => {
      sessionStorage.removeItem(STORAGE_KEYS.includeDetailed);
    });
  }

  function initializeWorkflowNav() {
    const navHost = document.getElementById("workflow-nav");
    const currentStep = document.body.dataset.step;

    if (!navHost || !currentStep) {
      return;
    }

    if (currentStep === "detail") {
      sessionStorage.setItem(STORAGE_KEYS.includeDetailed, "true");
    }

    const steps = getActiveSteps(currentStep);
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    const currentNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

    navHost.className = "workflow-nav";
    navHost.innerHTML = `
      <header class="workflow-header">
        <div class="step-track" style="--step-count:${steps.length}">
          ${steps.map((step, index) => renderStep(step, index, currentIndex)).join("")}
        </div>
      </header>
    `;
  }

  function initializeReturnHomeButton() {
    const isHomePage = document.body.classList.contains("app-home");

    if (isHomePage) {
      return;
    }

    const button = document.createElement("a");
    button.href = "../index.html";
    button.className = "return-home-button";
    button.textContent = "Return to Home";
    document.body.appendChild(button);
  }

  function renderStep(step, index, currentIndex) {
    let stateClass = "";

    if (index < currentIndex) {
      stateClass = "is-complete";
    } else if (index === currentIndex) {
      stateClass = "is-current";
    }

    return `
      <a class="step-item ${stateClass}" href="${step.path}">
        <span class="step-number">Step ${index + 1}</span>
        <span class="step-title">${step.label}</span>
      </a>
    `;
  }

  function getActiveSteps(currentStep) {
    const storedChoice = sessionStorage.getItem(STORAGE_KEYS.includeDetailed);
    const shouldSkipDetailed = storedChoice === "false" && ["recommendations", "planner", "summary"].includes(currentStep);

    if (shouldSkipDetailed) {
      return allSteps.filter((step) => step.id !== "detail");
    }

    return allSteps;
  }

  function initializeProfileForm() {
    const form = document.getElementById("client-profile-form");

    if (!form) {
      return;
    }

    populateForm(form, loadJson(STORAGE_KEYS.profile));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
      window.location.href = "analysis-estimate.html";
    });
  }

  function initializeEstimatePage() {
    const resultValue = document.getElementById("balanced-estimate-value");
    const viewDetailedButton = document.getElementById("view-detailed-analysis");
    const skipDetailedButton = document.getElementById("skip-detailed-analysis");

    if (resultValue) {
      resultValue.textContent = window.PlannerCalculations.getBalancedEstimate();
    }

    if (document.getElementById("estimate-chart-placeholder")) {
      window.PlannerCharts.renderEstimateNeedPlaceholder("estimate-chart-placeholder");
    }

    if (viewDetailedButton) {
      viewDetailedButton.addEventListener("click", () => {
        sessionStorage.setItem(STORAGE_KEYS.includeDetailed, "true");
        window.location.href = "analysis-detail.html";
      });
    }

    if (skipDetailedButton) {
      skipDetailedButton.addEventListener("click", () => {
        sessionStorage.setItem(STORAGE_KEYS.includeDetailed, "false");
        window.location.href = "recommendations.html";
      });
    }
  }

  function initializeRecommendationSelection() {
    const cards = document.querySelectorAll("[data-recommendation]");

    if (!cards.length) {
      return;
    }

    const savedRecommendation = localStorage.getItem(STORAGE_KEYS.recommendation) || "Balanced Protection";
    localStorage.setItem(STORAGE_KEYS.recommendation, savedRecommendation);
    setSelectedCard(cards, savedRecommendation, "recommendation");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const value = card.dataset.recommendation;
        localStorage.setItem(STORAGE_KEYS.recommendation, value);
        setSelectedCard(cards, value, "recommendation");
      });
    });

    const continueButton = document.getElementById("to-policy-planner");
    if (continueButton) {
      continueButton.addEventListener("click", () => {
        window.location.href = "planner.html";
      });
    }
  }

  function initializeStrategySelection() {
    const cards = document.querySelectorAll("[data-strategy]");

    if (!cards.length) {
      return;
    }

    const savedStrategy = localStorage.getItem(STORAGE_KEYS.strategy) || "Hybrid Strategy";
    localStorage.setItem(STORAGE_KEYS.strategy, savedStrategy);
    setSelectedCard(cards, savedStrategy, "strategy");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const value = card.dataset.strategy;
        localStorage.setItem(STORAGE_KEYS.strategy, value);
        setSelectedCard(cards, value, "strategy");
      });
    });

    const continueButton = document.getElementById("to-summary");
    if (continueButton) {
      continueButton.addEventListener("click", () => {
        const notesField = document.getElementById("advisor-notes");
        if (notesField) {
          localStorage.setItem(STORAGE_KEYS.notes, notesField.value);
        }
        window.location.href = "summary.html";
      });
    }
  }

  function setSelectedCard(cards, selectedValue, type) {
    cards.forEach((card) => {
      const cardValue = type === "recommendation" ? card.dataset.recommendation : card.dataset.strategy;
      card.classList.toggle("is-selected", cardValue === selectedValue);
    });
  }

  function initializeSummaryPage() {
    const summaryPage = document.getElementById("summary-page");

    if (!summaryPage) {
      return;
    }

    const profile = loadJson(STORAGE_KEYS.profile);
    const recommendation = localStorage.getItem(STORAGE_KEYS.recommendation) || "Balanced Protection";
    const strategy = localStorage.getItem(STORAGE_KEYS.strategy) || "Hybrid Strategy";
    const notes = localStorage.getItem(STORAGE_KEYS.notes) || "Advisor notes will appear here.";
    const includeDetailed = sessionStorage.getItem(STORAGE_KEYS.includeDetailed) !== "false";

    setText("summary-client-name", profile?.clientName || "Client name pending");
    setText("summary-age-gender", buildInlineValue(profile?.age, profile?.gender));
    setText("summary-income", formatCurrency(profile?.annualIncome));
    setText("summary-family", buildFamilySummary(profile || {}));
    setText("summary-balanced-need", window.PlannerCalculations.getBalancedEstimate());
    setText("summary-detailed-analysis", includeDetailed ? "DIME, Needs Analysis, and Human Life Value placeholders included." : "Detailed Analysis step was skipped in this planning path.");
    setText("summary-recommendation", recommendation);
    setText("summary-strategy", strategy);
    setText("summary-notes", notes);
  }

  function initializeNotesSync() {
    const notesField = document.getElementById("advisor-notes");

    if (!notesField) {
      return;
    }

    notesField.value = localStorage.getItem(STORAGE_KEYS.notes) || "";
    notesField.addEventListener("input", () => {
      localStorage.setItem(STORAGE_KEYS.notes, notesField.value);
    });
  }

  function populateForm(form, values) {
    if (!values) {
      return;
    }

    Object.entries(values).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) {
        field.value = value;
      }
    });
  }

  function loadJson(key) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function buildInlineValue(first, second) {
    const parts = [first, second].filter(Boolean);
    return parts.length ? parts.join(" | ") : "Pending profile inputs";
  }

  function buildFamilySummary(profile) {
    const parts = [];

    if (profile.maritalStatus) {
      parts.push(profile.maritalStatus);
    }

    if (profile.dependents) {
      parts.push(`${profile.dependents} dependents`);
    }

    if (profile.youngestChildAge) {
      parts.push(`Youngest child age ${profile.youngestChildAge}`);
    }

    return parts.length ? parts.join(" | ") : "Family profile pending";
  }

  function formatCurrency(value) {
    const number = Number(value);
    if (!number) {
      return "Value pending";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(number);
  }
})();
