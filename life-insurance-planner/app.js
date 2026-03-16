(function () {
  const STORAGE_KEYS = {
    profile: "lipPlannerProfile",
    includeDetailed: "lipPlannerIncludeDetailed",
    recommendation: "lipPlannerRecommendation",
    strategy: "lipPlannerStrategy",
    notes: "lipPlannerNotes",
    clientStatus: "lensClientStatus",
    clientView: "lensClientView",
    clientItemsShown: "lensClientItemsShown",
    clientItemsShownReset: "lensClientItemsShownReset",
    clientRecords: "lensClientRecords",
    routeLoading: "lensRouteLoading",
    authUsers: "lipPlannerAuthUsers",
    authSession: "lipPlannerAuthSession",
    workflowNavExpanded: "lipPlannerWorkflowNavExpanded",
    language: "lensLanguage"
  };
  const ADMIN_CREDENTIALS = {
    email: "admin@lens.com",
    password: "admin1001"
  };
  const DEFAULT_CLIENT_RECORDS = [
    {
      id: "cl-80421",
      viewType: "households",
      displayName: "Carter Household",
      lastName: "Carter",
      summary: "Household protection review",
      caseRef: "CL/80421",
      lastReview: "2026-03-10",
      insured: "2",
      source: "Referral",
      statusGroup: "in-review",
      statusLabels: ["Income", "Debt"],
      coverageAmount: 1850000,
      coverageGap: 1450000
    },
    {
      id: "cl-80437",
      viewType: "individuals",
      displayName: "Daniel Brooks",
      lastName: "Brooks",
      summary: "Key person coverage update",
      caseRef: "CL/80437",
      lastReview: "2026-03-08",
      insured: "Yes",
      source: "CPA",
      statusGroup: "coverage-placed",
      statusLabels: ["Business", "Estate"],
      coverageAmount: 1200000,
      coverageGap: 780000
    },
    {
      id: "cl-80462",
      viewType: "individuals",
      displayName: "Sophia Nguyen",
      lastName: "Nguyen",
      summary: "Family education funding plan",
      caseRef: "CL/80462",
      lastReview: "2026-03-07",
      insured: "Yes",
      source: "Seminar",
      statusGroup: "prospects",
      statusLabels: ["Education", "Income"],
      coverageAmount: 2600000,
      coverageGap: 2100000
    },
    {
      id: "cl-80488",
      viewType: "individuals",
      displayName: "Michael Torres",
      lastName: "Torres",
      summary: "Mortgage and survivor income analysis",
      caseRef: "CL/80488",
      lastReview: "2026-03-05",
      insured: "Yes",
      source: "Website",
      statusGroup: "coverage-placed",
      statusLabels: ["Mortgage", "Needs"],
      coverageAmount: 1350000,
      coverageGap: 920000
    },
    {
      id: "cl-80501",
      viewType: "households",
      displayName: "Mitchell Household",
      lastName: "Mitchell",
      summary: "Coverage review before renewal",
      caseRef: "CL/80501",
      lastReview: "2026-03-02",
      insured: "2",
      source: "Client Referral",
      statusGroup: "closed",
      statusLabels: ["Review", "Retention"],
      coverageAmount: 620000,
      coverageGap: 430000
    }
  ];

  const allSteps = [
    { id: "profile-1", label: "Client Profile 1", path: "profile.html" },
    { id: "profile-2", label: "Client Profile 2", path: "profile-2.html" },
    { id: "profile-3", label: "Client Profile 3", path: "profile-3.html" },
    { id: "estimate", label: "Estimate Need", path: "analysis-estimate.html" },
    { id: "detail", label: "Detailed Analysis", path: "analysis-detail.html" },
    { id: "recommendations", label: "Coverage Options", path: "recommendations.html" },
    { id: "planner", label: "Policy Planner", path: "planner.html" },
    { id: "summary", label: "Summary", path: "summary.html" }
  ];
  const TRANSLATIONS = {
    en: {
      "pageTitle.home": "Life Evaluation & Needs Analysis",
      "pageTitle.lens": "LENS | Life Evaluation & Needs Analysis",
      "pageTitle.clients": "Clients | Advisor Planning Suite",
      "nav.records": "Records",
      "nav.clients": "Clients",
      "nav.financialProducts": "Products",
      "nav.resources": "Resources",
      "search.placeholder": "Search",
      "language.label": "Language",
      "language.english": "English",
      "language.spanish": "Spanish",
      "language.french": "French",
      "account.signIn": "Sign In",
      "account.welcome": "Welcome, {name}",
      "account.helpCenter": "Help Center",
      "account.settings": "Settings",
      "account.accountDetails": "Account Details",
      "account.signOut": "Sign Out",
      "account.adminView": "Admin View",
      "home.banner": "Built by Agents, for Agents",
      "home.eyebrow": "Home",
      "home.openLens": "Open LENS",
      "home.activeModuleText": "Life Evaluation & Needs Analysis is the active planning module currently available in this workspace.",
      "home.activeModuleLabel": "Active Module",
      "product.name": "Life Evaluation & Needs Analysis",
      "home.moduleDescription": "Guide clients through profile intake, need estimation, analysis review, recommendation framing, policy strategy discussion, and a final planning summary.",
      "home.metricWorkflow": "Workflow",
      "home.metricWorkflowValue": "Profile to Summary",
      "home.metricPurpose": "Purpose",
      "home.metricPurposeValue": "Needs-Based Planning",
      "home.metricFormat": "Format",
      "home.metricFormatValue": "Advisor-Facing",
      "home.notesLabel": "Workspace Notes",
      "home.notesText": "Use this home screen as a stable launch point for planning tools rather than dropping directly into a single calculator-like experience.",
      "home.searchLabel": "Search",
      "home.searchText": "The search bar is prepared for future cases, saved plans, internal references, and additional modules.",
      "lens.eyebrow": "Advisor Planning Workflow",
      "lens.subtitle": "A structured advisor tool for estimating life insurance needs and shaping durable protection strategies during client meetings.",
      "lens.copy": "Use a guided workflow to capture client data, evaluate death benefit needs, compare planning approaches, and frame thoughtful coverage recommendations without dropping into carrier-specific quoting.",
      "lens.startPlanning": "Start Planning",
      "lens.metricFocus": "Focus",
      "lens.metricFocusValue": "Needs-Based Planning",
      "lens.metricUseCase": "Use Case",
      "lens.metricUseCaseValue": "Advisor-Led Meetings",
      "clients.heading": "Client Directory",
      "clients.subtitle": "A dedicated space for client records and future case management tools.",
      "clients.helper": "This page is currently a placeholder for future client record workflows.",
      "clients.recordsLabel": "Client Records",
      "clients.mainHeading": "Client directory and saved case files",
      "clients.mainCopy": "This section is ready for future client search, saved plans, case notes, and status tracking. For now it acts as the first records destination in the main navigation.",
      "clients.metricStatus": "Status",
      "clients.metricStatusValue": "Placeholder",
      "clients.metricNextBuild": "Next Build",
      "clients.metricNextBuildValue": "Client List",
      "clients.metricPurposeValue": "Recordkeeping",
      "clients.plannedUseLabel": "Planned Use",
      "clients.plannedUseText": "Use this area later for recently viewed clients, search results, and cross-links into planning workflows.",
      "clients.currentStateLabel": "Current State",
      "clients.currentStateText": "Navigation is in place. Data-backed record management can be added when you are ready."
    },
    es: {
      "pageTitle.home": "Evaluacion de Vida y Analisis de Necesidades",
      "pageTitle.lens": "LENS | Evaluacion de Vida y Analisis de Necesidades",
      "pageTitle.clients": "Clientes | Suite de Planificacion para Asesores",
      "nav.records": "Records",
      "nav.clients": "Clientes",
      "nav.financialProducts": "Products",
      "nav.resources": "Resources",
      "search.placeholder": "Buscar",
      "language.label": "Idioma",
      "language.english": "Ingles",
      "language.spanish": "Espanol",
      "language.french": "Frances",
      "account.signIn": "Iniciar sesion",
      "account.welcome": "Bienvenido, {name}",
      "account.helpCenter": "Centro de ayuda",
      "account.settings": "Configuracion",
      "account.accountDetails": "Detalles de la cuenta",
      "account.signOut": "Cerrar sesion",
      "account.adminView": "Vista de administrador",
      "home.banner": "Creado por agentes, para agentes",
      "home.eyebrow": "Inicio",
      "home.openLens": "Abrir LENS",
      "home.activeModuleText": "Evaluacion de Vida y Analisis de Necesidades es el modulo activo disponible en este espacio de trabajo.",
      "home.activeModuleLabel": "Modulo activo",
      "product.name": "Evaluacion de Vida y Analisis de Necesidades",
      "home.moduleDescription": "Guie a los clientes a traves del perfil, la estimacion de necesidad, la revision del analisis, la recomendacion de cobertura, la estrategia de poliza y el resumen final.",
      "home.metricWorkflow": "Flujo",
      "home.metricWorkflowValue": "Perfil a resumen",
      "home.metricPurpose": "Objetivo",
      "home.metricPurposeValue": "Planificacion basada en necesidades",
      "home.metricFormat": "Formato",
      "home.metricFormatValue": "Orientado al asesor",
      "home.notesLabel": "Notas del espacio de trabajo",
      "home.notesText": "Use esta pantalla principal como punto de partida estable para herramientas de planificacion en lugar de entrar directamente en una sola calculadora.",
      "home.searchLabel": "Busqueda",
      "home.searchText": "La barra de busqueda esta preparada para futuros casos, planes guardados, referencias internas y modulos adicionales.",
      "lens.eyebrow": "Flujo de planificacion del asesor",
      "lens.subtitle": "Una herramienta estructurada para estimar necesidades de seguro de vida y definir estrategias de proteccion durante reuniones con clientes.",
      "lens.copy": "Use un flujo guiado para capturar datos del cliente, evaluar necesidades de beneficio por fallecimiento, comparar enfoques de planificacion y definir recomendaciones sin entrar en cotizaciones por aseguradora.",
      "lens.startPlanning": "Comenzar planificacion",
      "lens.metricFocus": "Enfoque",
      "lens.metricFocusValue": "Planificacion basada en necesidades",
      "lens.metricUseCase": "Caso de uso",
      "lens.metricUseCaseValue": "Reuniones dirigidas por asesores",
      "clients.heading": "Directorio de clientes",
      "clients.subtitle": "Un espacio dedicado a los registros de clientes y futuras herramientas de gestion de casos.",
      "clients.helper": "Esta pagina es actualmente un marcador para futuros flujos de trabajo de registros de clientes.",
      "clients.recordsLabel": "Registros de clientes",
      "clients.mainHeading": "Directorio de clientes y expedientes guardados",
      "clients.mainCopy": "Esta seccion esta lista para futuras busquedas de clientes, planes guardados, notas de casos y seguimiento de estado. Por ahora funciona como el primer destino de registros en la navegacion principal.",
      "clients.metricStatus": "Estado",
      "clients.metricStatusValue": "Marcador",
      "clients.metricNextBuild": "Siguiente desarrollo",
      "clients.metricNextBuildValue": "Lista de clientes",
      "clients.metricPurposeValue": "Mantenimiento de registros",
      "clients.plannedUseLabel": "Uso previsto",
      "clients.plannedUseText": "Use esta area mas adelante para clientes vistos recientemente, resultados de busqueda y enlaces a flujos de planificacion.",
      "clients.currentStateLabel": "Estado actual",
      "clients.currentStateText": "La navegacion ya esta lista. La gestion de registros con datos reales puede agregarse cuando este listo."
    },
    fr: {
      "pageTitle.home": "Evaluation de Vie et Analyse des Besoins",
      "pageTitle.lens": "LENS | Evaluation de Vie et Analyse des Besoins",
      "pageTitle.clients": "Clients | Suite de planification pour conseillers",
      "nav.records": "Records",
      "nav.clients": "Clients",
      "nav.financialProducts": "Products",
      "nav.resources": "Resources",
      "search.placeholder": "Recherche",
      "language.label": "Langue",
      "language.english": "Anglais",
      "language.spanish": "Espagnol",
      "language.french": "Francais",
      "account.signIn": "Se connecter",
      "account.welcome": "Bienvenue, {name}",
      "account.helpCenter": "Centre d'aide",
      "account.settings": "Parametres",
      "account.accountDetails": "Details du compte",
      "account.signOut": "Se deconnecter",
      "account.adminView": "Vue administrateur",
      "home.banner": "Cree par des agents, pour des agents",
      "home.eyebrow": "Accueil",
      "home.openLens": "Ouvrir LENS",
      "home.activeModuleText": "Evaluation de Vie et Analyse des Besoins est le module actif actuellement disponible dans cet espace de travail.",
      "home.activeModuleLabel": "Module actif",
      "product.name": "Evaluation de Vie et Analyse des Besoins",
      "home.moduleDescription": "Guidez les clients a travers le profil, l'estimation du besoin, l'analyse detaillee, la recommandation de couverture, la strategie de police et le resume final.",
      "home.metricWorkflow": "Flux",
      "home.metricWorkflowValue": "Du profil au resume",
      "home.metricPurpose": "Objectif",
      "home.metricPurposeValue": "Planification basee sur les besoins",
      "home.metricFormat": "Format",
      "home.metricFormatValue": "Destine aux conseillers",
      "home.notesLabel": "Notes de l'espace de travail",
      "home.notesText": "Utilisez cet ecran d'accueil comme point de depart stable pour les outils de planification plutot que d'entrer directement dans un seul calculateur.",
      "home.searchLabel": "Recherche",
      "home.searchText": "La barre de recherche est prete pour les futurs dossiers, plans enregistres, references internes et modules supplementaires.",
      "lens.eyebrow": "Flux de planification conseiller",
      "lens.subtitle": "Un outil structure pour estimer les besoins en assurance vie et definir des strategies de protection pendant les reunions clients.",
      "lens.copy": "Utilisez un flux guide pour saisir les donnees client, evaluer les besoins, comparer les approches de planification et formuler des recommandations sans passer par des devis assureur.",
      "lens.startPlanning": "Commencer",
      "lens.metricFocus": "Orientation",
      "lens.metricFocusValue": "Planification basee sur les besoins",
      "lens.metricUseCase": "Cas d'usage",
      "lens.metricUseCaseValue": "Reunions menees par le conseiller",
      "clients.heading": "Repertoire clients",
      "clients.subtitle": "Un espace dedie aux dossiers clients et aux futurs outils de gestion de cas.",
      "clients.helper": "Cette page est actuellement un espace reserve pour les futurs flux de gestion des dossiers clients.",
      "clients.recordsLabel": "Dossiers clients",
      "clients.mainHeading": "Repertoire clients et dossiers enregistres",
      "clients.mainCopy": "Cette section est prete pour la recherche client, les plans enregistres, les notes de dossier et le suivi du statut. Pour l'instant, elle sert de premier point d'entree des dossiers dans la navigation principale.",
      "clients.metricStatus": "Statut",
      "clients.metricStatusValue": "Espace reserve",
      "clients.metricNextBuild": "Prochaine etape",
      "clients.metricNextBuildValue": "Liste des clients",
      "clients.metricPurposeValue": "Tenue de dossiers",
      "clients.plannedUseLabel": "Usage prevu",
      "clients.plannedUseText": "Utilisez cet espace plus tard pour les clients recents, les resultats de recherche et les liens vers les flux de planification.",
      "clients.currentStateLabel": "Etat actuel",
      "clients.currentStateText": "La navigation est en place. La gestion des dossiers avec donnees reelles pourra etre ajoutee plus tard."
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    initializeHomepage();
    initializeAuthPage();
    initializeAdminPortal();
    initializeLanguageSelector();
    applyTranslations();
    initializeAccountProfile();
    initializeReturnHomeButton();
    initializeWorkflowNav();
    initializeProfileForm();
    initializeEstimatePage();
    initializeRecommendationSelection();
    initializeStrategySelection();
    initializeSummaryPage();
    initializeNotesSync();
    initializeClientCreationForm();
    initializeClientDirectory();
    initializeClientDirectoryNavLinks();
    initializeRouteLoading();
  });

  function initializeLanguageSelector() {
    const slots = document.querySelectorAll("[data-language-slot]");
    if (!slots.length) {
      return;
    }

    const currentLanguage = getCurrentLanguage();
    const languageIconPath = window.location.pathname.includes("/pages/")
      ? "../Images/Untitled design.png"
      : "Images/Untitled design.png";

    slots.forEach((slot) => {
      slot.innerHTML = `
        <div class="language-dropdown">
          <button class="language-trigger" type="button" aria-label="${translate("language.label")}">
            <img class="language-icon-image" src="${languageIconPath}" alt="" aria-hidden="true">
          </button>
          <div class="language-dropdown-menu">
            <button class="language-menu-item ${currentLanguage === "en" ? "is-active" : ""}" type="button" data-language-option="en">${translate("language.english")}</button>
            <button class="language-menu-item ${currentLanguage === "es" ? "is-active" : ""}" type="button" data-language-option="es">${translate("language.spanish")}</button>
            <button class="language-menu-item ${currentLanguage === "fr" ? "is-active" : ""}" type="button" data-language-option="fr">${translate("language.french")}</button>
          </div>
        </div>
      `;
    });

    document.querySelectorAll("[data-language-option]").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem(STORAGE_KEYS.language, button.dataset.languageOption);
        window.location.reload();
      });
    });
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      element.textContent = translate(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      element.setAttribute("placeholder", translate(key));
    });
  }

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

    accountSlots.forEach((slot) => {
      if (session?.name) {
        slot.innerHTML = renderAccountProfile(session, "account-profile");
      } else {
        const prefix = getPathPrefix();
        slot.innerHTML = renderSignedOutAccount(prefix);
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
    const firstName = getFirstName(session.name);
    const prefix = getPathPrefix();
    const adminViewItem = session.role === "admin"
      ? `<a class="account-menu-item account-menu-item-link" href="${prefix}pages/admin-accounts.html">${translate("account.adminView")}</a>`
      : "";

    return `
      <div class="account-dropdown">
        <button class="${className} account-dropdown-toggle" type="button">
          <span class="account-icon" aria-hidden="true">
            <span class="account-icon-head"></span>
            <span class="account-icon-body"></span>
          </span>
          <span class="sr-only">Open account menu for ${firstName}</span>
        </button>
        <div class="account-dropdown-menu">
          <div class="account-menu-section">
            <span class="account-menu-welcome">${translate("account.welcome", { name: firstName })}</span>
          </div>
          <div class="account-menu-divider"></div>
          <div class="account-menu-section">
            <button class="account-menu-item" type="button">${translate("account.helpCenter")}</button>
            <button class="account-menu-item" type="button">${translate("account.settings")}</button>
          </div>
          <div class="account-menu-divider"></div>
          <div class="account-menu-section">
            ${adminViewItem}
            <button class="account-menu-item" type="button">${translate("account.accountDetails")}</button>
            <button class="account-menu-item account-menu-item-danger" type="button" data-sign-out>${translate("account.signOut")}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSignedOutAccount(prefix) {
    return `
      <div class="account-dropdown">
        <a class="account-profile account-dropdown-toggle account-profile-signed-out" href="${prefix}pages/sign-in.html">
          <span class="account-icon" aria-hidden="true">
            <span class="account-icon-head"></span>
            <span class="account-icon-body"></span>
          </span>
          <span class="sr-only">Open sign in menu</span>
        </a>
        <div class="account-dropdown-menu">
          <div class="account-menu-section">
            <a class="account-menu-item account-menu-item-link" href="${prefix}pages/sign-in.html">${translate("account.signIn")}</a>
          </div>
          <div class="account-menu-divider"></div>
          <div class="account-menu-section">
            <button class="account-menu-item" type="button">${translate("account.helpCenter")}</button>
            <button class="account-menu-item" type="button">${translate("account.settings")}</button>
          </div>
        </div>
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
      const existingProfile = loadJson(STORAGE_KEYS.profile) || {};
      const profile = { ...existingProfile, ...Object.fromEntries(formData.entries()) };
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));

      const nextPage = form.dataset.nextPage || "analysis-estimate.html";
      window.location.href = nextPage;
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

  function initializeClientCreationForm() {
    const form = document.getElementById("client-creation-form");

    if (!form) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const records = getClientRecords();
      const clientType = form.dataset.clientType || "individual";
      const statusGroup = String(formData.get("statusGroup") || "prospects");
      const source = String(formData.get("source") || "Direct").trim() || "Direct";
      const coverageAmount = Number(formData.get("coverageAmount") || 0);
      const coverageGap = Number(formData.get("coverageGap") || 0);
      const summary = String(formData.get("summary") || "").trim() || "New client profile";

      const record = clientType === "household"
        ? {
            id: `cl-${Date.now()}`,
            viewType: "households",
            displayName: String(formData.get("householdName") || "").trim(),
            lastName: String(formData.get("primaryLastName") || "").trim(),
            summary,
            caseRef: buildNextCaseRef(records),
            lastReview: String(formData.get("lastReview") || ""),
            insured: String(formData.get("insuredCount") || "1").trim(),
            source,
            statusGroup,
            statusLabels: deriveStatusLabels(statusGroup, clientType),
            coverageAmount,
            coverageGap
          }
        : {
            id: `cl-${Date.now()}`,
            viewType: "individuals",
            displayName: `${String(formData.get("firstName") || "").trim()} ${String(formData.get("lastName") || "").trim()}`.trim(),
            lastName: String(formData.get("lastName") || "").trim(),
            summary,
            caseRef: buildNextCaseRef(records),
            lastReview: String(formData.get("lastReview") || ""),
            insured: String(formData.get("insured") || "Yes").trim(),
            source,
            statusGroup,
            statusLabels: deriveStatusLabels(statusGroup, clientType),
            coverageAmount,
            coverageGap
          };

      records.unshift(record);
      localStorage.setItem(STORAGE_KEYS.clientRecords, JSON.stringify(records));
      sessionStorage.setItem(STORAGE_KEYS.clientItemsShownReset, "true");
      window.location.href = "clients.html";
    });
  }

  function initializeClientDirectory() {
    const letterButtons = document.querySelectorAll("[data-client-letter]");
    const rowsHost = document.getElementById("client-table-rows");
    const emptyState = document.getElementById("client-empty-state");
    const searchField = document.querySelector(".client-table-search input");
    const exportButton = document.querySelector("[data-export-button]");
    const addClientButton = document.querySelector("[data-add-client-button]");
    const viewButtons = document.querySelectorAll("[data-client-view]");
    const statusButtons = document.querySelectorAll("[data-client-status]");
    const itemsDropdown = document.querySelector("[data-items-dropdown]");
    const itemsTrigger = document.querySelector("[data-items-trigger]");
    const itemsOptions = document.querySelectorAll("[data-items-option]");
    const paginationHost = document.getElementById("client-pagination-numbers");
    const prevPageButton = document.getElementById("client-prev-page");
    const nextPageButton = document.getElementById("client-next-page");

    if (!letterButtons.length || !rowsHost) {
      return;
    }

    ensureClientRecords();
    let allRecords = getClientRecords();
    const selectedRecordIds = new Set();
    let activeLetter = "all";
    const navigationEntry = window.performance.getEntriesByType("navigation")[0];
    const shouldRestoreClientStatus = navigationEntry?.type === "reload";
    let activeStatus = shouldRestoreClientStatus ? (sessionStorage.getItem(STORAGE_KEYS.clientStatus) || "all") : "all";
    const shouldRestoreClientView = navigationEntry?.type === "reload";
    let activeView = shouldRestoreClientView ? (sessionStorage.getItem(STORAGE_KEYS.clientView) || "individuals") : "individuals";
    const shouldResetItemsShown = sessionStorage.getItem(STORAGE_KEYS.clientItemsShownReset) === "true";
    const shouldRestoreItemsShown = navigationEntry?.type === "reload" && !shouldResetItemsShown;
    let itemsShown = Number(shouldRestoreItemsShown ? (sessionStorage.getItem(STORAGE_KEYS.clientItemsShown) || "15") : "15");
    let currentPage = 1;

    if (!shouldRestoreClientStatus) {
      sessionStorage.setItem(STORAGE_KEYS.clientStatus, "all");
    }

    if (!shouldRestoreClientView) {
      sessionStorage.setItem(STORAGE_KEYS.clientView, "individuals");
    }

    if (!shouldRestoreItemsShown) {
      sessionStorage.setItem(STORAGE_KEYS.clientItemsShown, "15");
    }

    sessionStorage.removeItem(STORAGE_KEYS.clientItemsShownReset);

    function syncItemsShownControls() {
      if (itemsTrigger) {
        itemsTrigger.textContent = `Items Shown (${itemsShown})`;
      }

      itemsOptions.forEach((option) => {
        option.classList.toggle("is-active", Number(option.dataset.itemsOption) === itemsShown);
      });
    }

    function syncStatusButtons() {
      const counts = buildStatusCounts(allRecords, activeView);

      statusButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.clientStatus === activeStatus);
        const counter = button.querySelector("[data-status-count]");
        if (counter) {
          counter.textContent = String(counts[button.dataset.clientStatus] || 0);
        }
      });
    }

    function syncExportButtonState() {
      if (!exportButton) {
        return;
      }

      const hasSelection = selectedRecordIds.size > 0;
      exportButton.classList.toggle("is-active", hasSelection);

      if (addClientButton) {
        addClientButton.classList.toggle("is-inactive", hasSelection);
      }
    }

    function getFilteredRecords() {
      const query = (searchField?.value || "").trim().toLowerCase();

      return allRecords.filter((record) => {
        const matchesView = record.viewType === activeView;
        const matchesLetter = activeLetter === "all" || getLastInitial(record.lastName) === activeLetter;
        const matchesStatus = activeStatus === "all" || record.statusGroup === activeStatus;
        const matchesSearch = !query
          || record.displayName.toLowerCase().includes(query)
          || record.summary.toLowerCase().includes(query)
          || record.caseRef.toLowerCase().includes(query);

        return matchesView && matchesLetter && matchesStatus && matchesSearch;
      });
    }

    function renderPagination(totalPages) {
      if (!paginationHost || !prevPageButton || !nextPageButton) {
        return;
      }

      prevPageButton.disabled = currentPage <= 1;
      nextPageButton.disabled = currentPage >= totalPages;
      paginationHost.innerHTML = "";

      for (let page = 1; page <= totalPages; page += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "client-page-number";
        if (page === currentPage) {
          button.classList.add("is-active");
        }
        button.textContent = String(page);
        button.addEventListener("click", () => {
          currentPage = page;
          renderDirectory();
        });
        paginationHost.appendChild(button);
      }
    }

    function renderDirectory() {
      allRecords = getClientRecords();
      const filteredRecords = getFilteredRecords();
      const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsShown));
      currentPage = Math.min(currentPage, totalPages);
      const startIndex = (currentPage - 1) * itemsShown;
      const visibleRecords = filteredRecords.slice(startIndex, startIndex + itemsShown);

      rowsHost.innerHTML = visibleRecords.map((record) => renderClientRow(record, selectedRecordIds.has(record.id))).join("");
      if (emptyState) {
        emptyState.hidden = visibleRecords.length > 0;
      }

      rowsHost.querySelectorAll("[data-client-checkbox]").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const recordId = checkbox.dataset.clientCheckbox;
          if (checkbox.checked) {
            selectedRecordIds.add(recordId);
          } else {
            selectedRecordIds.delete(recordId);
          }
          syncExportButtonState();
        });
      });

      renderPagination(totalPages);
      syncStatusButtons();
      syncExportButtonState();
    }

    letterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeLetter = button.dataset.clientLetter || "all";
        currentPage = 1;

        letterButtons.forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });

        renderDirectory();
      });
    });

    if (searchField) {
      searchField.addEventListener("input", () => {
        currentPage = 1;
        renderDirectory();
      });
    }

    viewButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.clientView === activeView);
      button.addEventListener("click", () => {
        activeView = button.dataset.clientView || "individuals";
        sessionStorage.setItem(STORAGE_KEYS.clientView, activeView);
        currentPage = 1;
        viewButtons.forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
        renderDirectory();
      });
    });

    statusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeStatus = button.dataset.clientStatus || "all";
        sessionStorage.setItem(STORAGE_KEYS.clientStatus, activeStatus);
        currentPage = 1;
        renderDirectory();
      });
    });

    itemsOptions.forEach((option) => {
      option.addEventListener("click", () => {
        itemsShown = Number(option.dataset.itemsOption) || 15;
        sessionStorage.setItem(STORAGE_KEYS.clientItemsShown, String(itemsShown));
        currentPage = 1;
        syncItemsShownControls();
        renderDirectory();
        if (itemsDropdown) {
          itemsDropdown.classList.remove("is-open");
          itemsTrigger?.setAttribute("aria-expanded", "false");
        }
        option.blur();
        itemsTrigger?.blur();
      });
    });

    if (itemsDropdown && itemsTrigger) {
      itemsTrigger.addEventListener("click", () => {
        const isOpen = itemsDropdown.classList.toggle("is-open");
        itemsTrigger.setAttribute("aria-expanded", String(isOpen));
      });

      itemsDropdown.addEventListener("mouseleave", () => {
        itemsDropdown.classList.remove("is-open");
        itemsTrigger.setAttribute("aria-expanded", "false");
      });
    }

    if (prevPageButton) {
      prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage -= 1;
          renderDirectory();
        }
      });
    }

    if (nextPageButton) {
      nextPageButton.addEventListener("click", () => {
        const totalPages = Math.max(1, Math.ceil(getFilteredRecords().length / itemsShown));
        if (currentPage < totalPages) {
          currentPage += 1;
          renderDirectory();
        }
      });
    }

    if (exportButton) {
      exportButton.addEventListener("click", () => {
        const selectedRecords = allRecords.filter((record) => selectedRecordIds.has(record.id));
        if (!selectedRecords.length) {
          return;
        }

        exportClientRecords(selectedRecords);
      });
    }

    syncItemsShownControls();
    renderDirectory();
  }

  function initializeClientDirectoryNavLinks() {
    const clientDirectoryNavLinks = document.querySelectorAll("[data-client-directory-nav]");

    clientDirectoryNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sessionStorage.setItem(STORAGE_KEYS.clientItemsShownReset, "true");
      });
    });
  }

  function initializeRouteLoading() {
    const loadingLinks = document.querySelectorAll("[data-loading-link]");
    const routeLoadingRaw = sessionStorage.getItem(STORAGE_KEYS.routeLoading);
    let routeLoading = null;
    if (routeLoadingRaw) {
      try {
        routeLoading = JSON.parse(routeLoadingRaw);
      } catch (error) {
        sessionStorage.removeItem(STORAGE_KEYS.routeLoading);
      }
    }
    const isProspectPage = document.body.classList.contains("prospect-page");

    loadingLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href) {
          return;
        }

        event.preventDefault();
        sessionStorage.setItem(STORAGE_KEYS.routeLoading, JSON.stringify({
          target: href,
          startedAt: Date.now()
        }));
        showRouteLoadingOverlay();
        window.setTimeout(() => {
          window.location.href = href;
        }, 60);
      });
    });

    if (!isProspectPage || !routeLoading?.startedAt) {
      return;
    }

    showRouteLoadingOverlay();
    const elapsed = Date.now() - routeLoading.startedAt;
    const remaining = Math.max(0, 1000 - elapsed);

    window.setTimeout(() => {
      hideRouteLoadingOverlay();
      sessionStorage.removeItem(STORAGE_KEYS.routeLoading);
    }, remaining);
  }

  function showRouteLoadingOverlay() {
    let overlay = document.querySelector("[data-route-loading-overlay]");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "route-loading-overlay";
      overlay.setAttribute("data-route-loading-overlay", "");
      overlay.innerHTML = `
        <div class="route-loading-card">
          <span class="route-loading-icon" aria-hidden="true">
            <span class="account-icon-head route-loading-head"></span>
            <span class="account-icon-body route-loading-body"></span>
          </span>
          <p class="route-loading-text">Opening new prospect...</p>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    document.body.classList.add("is-route-loading");
    document.documentElement.classList.add("is-route-loading");
  }

  function hideRouteLoadingOverlay() {
    document.body.classList.remove("is-route-loading");
    document.documentElement.classList.remove("is-route-loading");
  }

  function ensureClientRecords() {
    if (!localStorage.getItem(STORAGE_KEYS.clientRecords)) {
      localStorage.setItem(STORAGE_KEYS.clientRecords, JSON.stringify(DEFAULT_CLIENT_RECORDS));
    }
  }

  function getClientRecords() {
    ensureClientRecords();
    return loadJson(STORAGE_KEYS.clientRecords) || [];
  }

  function buildNextCaseRef(records) {
    const highestNumber = records.reduce((highest, record) => {
      const match = String(record.caseRef || "").match(/CL\/(\d+)/);
      return match ? Math.max(highest, Number(match[1])) : highest;
    }, 80400);

    return `CL/${highestNumber + 1}`;
  }

  function deriveStatusLabels(statusGroup, clientType) {
    const statusMap = {
      prospects: clientType === "household" ? ["Discovery", "Household"] : ["Discovery", "Individual"],
      "in-review": clientType === "household" ? ["Review", "Needs"] : ["Review", "Income"],
      "coverage-placed": clientType === "household" ? ["Placed", "Review"] : ["Placed", "Policy"],
      closed: clientType === "household" ? ["Closed", "Archive"] : ["Closed", "Archive"]
    };

    return statusMap[statusGroup] || ["Review"];
  }

  function getClientStatusDisplay(statusGroup) {
    const statusMap = {
      prospects: "Prospect",
      "in-review": "In Review",
      "coverage-placed": "Coverage Placed",
      closed: "Closed"
    };

    return statusMap[statusGroup] || "Prospect";
  }

  function buildStatusCounts(records, activeView) {
    return records
      .filter((record) => record.viewType === activeView)
      .reduce((counts, record) => {
        counts.all += 1;
        counts[record.statusGroup] = (counts[record.statusGroup] || 0) + 1;
        return counts;
      }, { all: 0, prospects: 0, "in-review": 0, "coverage-placed": 0, closed: 0 });
  }

  function getLastInitial(lastName) {
    const value = String(lastName || "").trim().toUpperCase();
    return value ? value.charAt(0) : "";
  }

  function renderClientRow(record, isSelected) {
    const avatarClass = getAvatarClass(record.lastName);
    const clientStatus = getClientStatusDisplay(record.statusGroup);

    return `
      <div class="client-table" role="row">
        <div class="client-table-cell client-table-cell-check"><input type="checkbox" aria-label="Select ${record.displayName}" data-client-checkbox="${record.id}" ${isSelected ? "checked" : ""}></div>
        <div class="client-table-cell client-table-cell-client">
          <span class="client-avatar ${avatarClass}">${getInitials(record.displayName)}</span>
          <div>
            <strong>${record.displayName}</strong>
            <span>${record.summary}</span>
          </div>
        </div>
        <div class="client-table-cell">${record.caseRef}</div>
        <div class="client-table-cell client-table-cell-last-review">${formatDateForDirectory(record.lastReview)}</div>
        <div class="client-table-cell client-table-cell-insured-value">${record.insured}</div>
        <div class="client-table-cell client-table-cell-source-value">${record.source}</div>
        <div class="client-table-cell client-table-cell-status-value">${clientStatus}</div>
        <div class="client-table-cell client-table-cell-coverage-amount-value">${formatCurrencyCompact(record.coverageAmount)}</div>
        <div class="client-table-cell client-table-cell-value">${formatCurrencyCompact(record.coverageGap)}</div>
      </div>
    `;
  }

  function exportClientRecords(records) {
    const header = ["Client", "Case Ref", "Last Review", "Insured", "Source", "Client Status", "Coverage Amount", "Coverage Gap"];
    const rows = records.map((record) => [
      record.displayName,
      record.caseRef,
      formatDateForDirectory(record.lastReview),
      record.insured,
      record.source,
      getClientStatusDisplay(record.statusGroup),
      formatCurrencyCompact(record.coverageAmount),
      formatCurrencyCompact(record.coverageGap)
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "client-directory-export.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function formatDateForDirectory(value) {
    if (!value) {
      return "--";
    }

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
  }

  function formatCurrencyCompact(value) {
    const amount = Number(value || 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: amount >= 1000000 ? "compact" : "standard",
      maximumFractionDigits: amount >= 1000000 ? 2 : 0
    }).format(amount);
  }

  function getInitials(name) {
    return String(name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "CL";
  }

  function getAvatarClass(lastName) {
    const classes = [
      "client-avatar-amber",
      "client-avatar-slate",
      "client-avatar-green",
      "client-avatar-blue",
      "client-avatar-rose"
    ];
    const seed = String(lastName || "A").charCodeAt(0);
    return classes[seed % classes.length];
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

  function getFirstName(name) {
    return name.split(" ").filter(Boolean)[0] || name;
  }

  function getCurrentLanguage() {
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
    return TRANSLATIONS[storedLanguage] ? storedLanguage : "en";
  }

  function translate(key, replacements = {}) {
    const language = getCurrentLanguage();
    const dictionary = TRANSLATIONS[language] || TRANSLATIONS.en;
    const fallback = TRANSLATIONS.en[key] || key;
    let value = dictionary[key] || fallback;

    Object.entries(replacements).forEach(([replacementKey, replacementValue]) => {
      value = value.replace(`{${replacementKey}}`, replacementValue);
    });

    return value;
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
