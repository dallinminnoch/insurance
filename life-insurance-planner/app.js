(function () {
  const STORAGE_KEYS = {
    profile: "lipPlannerProfile",
    includeDetailed: "lipPlannerIncludeDetailed",
    recommendation: "lipPlannerRecommendation",
    strategy: "lipPlannerStrategy",
    notes: "lipPlannerNotes",
    authUsers: "lipPlannerAuthUsers",
    authSession: "lipPlannerAuthSession",
    workflowNavExpanded: "lipPlannerWorkflowNavExpanded"
  };
  const ADMIN_CREDENTIALS = {
    email: "admin@lens.com",
    password: "admin1001"
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
    initializeAuthPage();
    initializeAdminPortal();
    initializeAccountProfile();
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

  function initializeAuthPage() {
    const form = document.getElementById("auth-form");

    if (!form) {
      return;
    }

    const feedback = document.getElementById("auth-feedback");
    const submitButton = document.getElementById("auth-submit-button");
    const modeButtons = document.querySelectorAll("[data-auth-mode]");
    const registerFieldsHost = document.getElementById("auth-register-fields");
    let currentMode = "signin";

    updateAuthMode(currentMode, modeButtons, registerFieldsHost, submitButton, feedback);

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentMode = button.dataset.authMode;
        updateAuthMode(currentMode, modeButtons, registerFieldsHost, submitButton, feedback);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const password = String(formData.get("password") || "").trim();
      const users = loadJson(STORAGE_KEYS.authUsers) || [];

      if (!email || !password) {
        setAuthFeedback(feedback, "Enter your email and password.");
        return;
      }

      if (currentMode === "register") {
        if (!name) {
          setAuthFeedback(feedback, "Enter your name to create an account.");
          return;
        }

        if (email === ADMIN_CREDENTIALS.email) {
          setAuthFeedback(feedback, "That email is reserved.");
          return;
        }

        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          setAuthFeedback(feedback, "An account with that email already exists.");
          return;
        }

        const newUser = { name, email, password, status: "active" };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.authUsers, JSON.stringify(users));
        localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify({ name, email, role: "user" }));
        window.location.href = "../index.html";
        return;
      }

      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify({
          name: "Lens Admin",
          email: ADMIN_CREDENTIALS.email,
          role: "admin"
        }));
        window.location.href = "admin-accounts.html";
        return;
      }

      const disabledUser = users.find((user) => {
        const status = user.status || "active";
        return user.email === email && user.password === password && status !== "active";
      });

      if (disabledUser) {
        setAuthFeedback(feedback, "This account has been disabled. Contact an administrator.");
        return;
      }

      const matchedUser = users.find((user) => {
        const status = user.status || "active";
        return user.email === email && user.password === password && status === "active";
      });

      if (!matchedUser) {
        if (email === ADMIN_CREDENTIALS.email) {
          setAuthFeedback(feedback, "Admin credentials were not accepted. Use the Sign In tab and enter the exact admin password.");
        } else {
          setAuthFeedback(feedback, "We could not match that email and password.");
        }
        return;
      }

      localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email,
        role: "user"
      }));
      window.location.href = "../index.html";
    });
  }

  function initializeAdminPortal() {
    const adminPage = document.getElementById("admin-accounts-page");

    if (!adminPage) {
      return;
    }

    const session = loadJson(STORAGE_KEYS.authSession);
    if (session?.role !== "admin") {
      window.location.href = "sign-in.html";
      return;
    }

    renderAdminAccounts();

    const signOutButton = document.getElementById("admin-sign-out");
    if (signOutButton) {
      signOutButton.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEYS.authSession);
        window.location.href = "sign-in.html";
      });
    }

    const accountsHost = document.getElementById("admin-accounts-list");
    if (accountsHost) {
      accountsHost.addEventListener("click", (event) => {
        const actionButton = event.target.closest("[data-admin-action]");
        if (!actionButton) {
          return;
        }

        const action = actionButton.dataset.adminAction;
        const email = actionButton.dataset.email;
        updateManagedAccount(email, action);
      });
    }
  }

  function renderAdminAccounts() {
    const users = getManagedUsers();
    const accountsHost = document.getElementById("admin-accounts-list");
    const countHost = document.getElementById("admin-account-count");
    const activeCountHost = document.getElementById("admin-active-count");

    if (countHost) {
      countHost.textContent = String(users.length);
    }

    if (activeCountHost) {
      activeCountHost.textContent = String(users.filter((user) => (user.status || "active") === "active").length);
    }

    if (!accountsHost) {
      return;
    }

    if (!users.length) {
      accountsHost.innerHTML = `
        <div class="admin-empty-state">
          <h3>No registered accounts</h3>
          <p class="panel-copy">User accounts will appear here after registration.</p>
        </div>
      `;
      return;
    }

    accountsHost.innerHTML = users.map((user) => {
      const status = user.status || "active";
      const toggleAction = status === "active" ? "disable" : "enable";
      const toggleLabel = status === "active" ? "Disable" : "Enable";

      return `
        <article class="admin-account-card">
          <div class="admin-account-main">
            <div class="admin-account-name">${user.name}</div>
            <div class="admin-account-email">${user.email}</div>
          </div>
          <div class="admin-account-meta">
            <span class="admin-status-badge ${status === "active" ? "is-active" : "is-disabled"}">${status}</span>
            <div class="admin-account-actions">
              <button class="admin-action-button" type="button" data-admin-action="${toggleAction}" data-email="${user.email}">${toggleLabel}</button>
              <button class="admin-action-button is-danger" type="button" data-admin-action="delete" data-email="${user.email}">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function updateManagedAccount(email, action) {
    const users = getManagedUsers();
    const nextUsers = users
      .map((user) => {
        if (user.email !== email) {
          return user;
        }

        if (action === "enable") {
          return { ...user, status: "active" };
        }

        if (action === "disable") {
          return { ...user, status: "disabled" };
        }

        return user;
      })
      .filter((user) => !(action === "delete" && user.email === email));

    localStorage.setItem(STORAGE_KEYS.authUsers, JSON.stringify(nextUsers));

    const session = loadJson(STORAGE_KEYS.authSession);
    if (session?.email === email && action !== "enable") {
      localStorage.removeItem(STORAGE_KEYS.authSession);
    }

    renderAdminAccounts();
  }

  function getManagedUsers() {
    const users = loadJson(STORAGE_KEYS.authUsers) || [];

    return users
      .filter((user) => user.email !== ADMIN_CREDENTIALS.email)
      .map((user) => ({
        ...user,
        status: user.status || "active"
      }));
  }

  function updateAuthMode(mode, modeButtons, registerFieldsHost, submitButton, feedback) {
    modeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.authMode === mode);
    });

    if (registerFieldsHost) {
      if (mode === "register") {
        registerFieldsHost.innerHTML = `
          <div class="field-group auth-register-only">
            <label for="auth-name">Name</label>
            <input id="auth-name" name="name" type="text" placeholder="Advisor name" required>
          </div>
        `;
      } else {
        registerFieldsHost.innerHTML = "";
      }
    }

    submitButton.textContent = mode === "register" ? "Create Account" : "Sign In";
    setAuthFeedback(feedback, "");
  }

  function setAuthFeedback(element, message) {
    if (!element) {
      return;
    }

    element.textContent = message;
  }

  function initializeAccountProfile() {
    const accountSlots = document.querySelectorAll("[data-account-slot]");
    const session = loadJson(STORAGE_KEYS.authSession);
    const adminNavSlots = document.querySelectorAll("[data-admin-nav-slot]");

    adminNavSlots.forEach((slot) => {
      if (session?.role === "admin") {
        const prefix = getPathPrefix();
        slot.innerHTML = `<a class="site-nav-link" href="${prefix}pages/admin-accounts.html">Admin View</a>`;
      } else {
        slot.innerHTML = "";
      }
    });

    accountSlots.forEach((slot) => {
      if (session?.name) {
        slot.innerHTML = renderAccountProfile(session, "account-profile");
      } else {
        const prefix = getPathPrefix();
        slot.innerHTML = `<a class="site-nav-link account-signin-link" href="${prefix}pages/sign-in.html">Sign In</a>`;
      }
    });

    document.querySelectorAll("[data-sign-out]").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEYS.authSession);
        window.location.reload();
      });
    });
  }

  function renderAccountProfile(session, className) {
    const initials = buildInitials(session.name);

    return `
      <div class="${className}">
        <div class="account-avatar">${initials}</div>
        <div class="account-details">
          <strong>${session.name}</strong>
          <span>${session.email}</span>
        </div>
        <button class="account-signout" type="button" data-sign-out>Sign Out</button>
      </div>
    `;
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

    initializeWorkflowNavState(navHost);
  }

  function initializeWorkflowNavState(navHost) {
    const shouldPersistExpanded = sessionStorage.getItem(STORAGE_KEYS.workflowNavExpanded) === "true";

    if (shouldPersistExpanded) {
      navHost.classList.add("is-persisted-expanded");
      const clearPersistedState = (event) => {
        if (navHost.contains(event.target)) {
          return;
        }

        navHost.classList.remove("is-persisted-expanded");
        sessionStorage.removeItem(STORAGE_KEYS.workflowNavExpanded);
        document.removeEventListener("mousemove", clearPersistedState);
      };

      document.addEventListener("mousemove", clearPersistedState);
    }

    navHost.querySelectorAll(".step-item").forEach((item) => {
      item.addEventListener("click", () => {
        sessionStorage.setItem(STORAGE_KEYS.workflowNavExpanded, "true");
      });
    });
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

  function getPathPrefix() {
    return window.location.pathname.includes("/pages/") ? "../" : "";
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

  function buildInitials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
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
