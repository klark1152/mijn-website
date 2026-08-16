(() => {
  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = currentYear;
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const targetPage = new URL(link.href, window.location.href).pathname.split("/").pop();
    if (targetPage === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const header = document.querySelector(".site-header");
  const navigation = header?.querySelector("nav");
  if (header && navigation) {
    header.classList.add("has-nav-toggle");
    navigation.id = navigation.id || "primary-navigation";
    const navToggle = document.createElement("button");
    navToggle.className = "nav-toggle";
    navToggle.type = "button";
    navToggle.textContent = "Menu";
    navToggle.setAttribute("aria-controls", navigation.id);
    navToggle.setAttribute("aria-expanded", "false");
    header.insertBefore(navToggle, navigation);

    navToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !navigation.classList.contains("is-open")) return;
      navigation.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    });

    document.addEventListener("click", (event) => {
      if (header.contains(event.target)) return;
      navigation.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navigation.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const scrollButton = document.createElement("button");
  scrollButton.className = "scroll-top";
  scrollButton.type = "button";
  scrollButton.textContent = "↑";
  scrollButton.setAttribute("aria-label", "Revenir en haut de la page");
  document.body.append(scrollButton);

  const updateScrollButton = () => {
    scrollButton.classList.toggle("is-visible", window.scrollY > 500);
  };

  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", updateScrollButton, { passive: true });
  updateScrollButton();

  const solutionLab = document.querySelector("[data-solution-lab]");
  if (solutionLab) {
    const tabs = [...solutionLab.querySelectorAll("[role='tab']")];
    const panel = solutionLab.querySelector("[role='tabpanel']");
    const solutions = {
      web: {
        code: "WEB / 01",
        status: "Projet cadré",
        title: "Un site qui explique votre valeur et transforme les visites en demandes.",
        description: "Architecture claire, interface responsive, performance, accessibilité et référencement technique sans dépendances superflues.",
        deliverables: ["Structure et parcours de conversion", "Design adapté au mobile", "Mise en ligne et documentation"],
        booking: "reservation.html?service=web",
        more: "services.html#web",
      },
      security: {
        code: "SEC / 02",
        status: "Risques priorisés",
        title: "Un diagnostic compréhensible pour renforcer ce qui compte vraiment.",
        description: "Revue autorisée des accès, mises à jour, sauvegardes et réglages visibles, suivie d'un plan d'amélioration proportionné.",
        deliverables: ["Périmètre et autorisation explicites", "Constats classés par niveau de risque", "Actions concrètes et ordre de priorité"],
        booking: "reservation.html?service=security",
        more: "services.html#securite",
      },
      support: {
        code: "SUP / 03",
        status: "Solution expliquée",
        title: "Un problème résolu sans vous rendre dépendant de la solution.",
        description: "Diagnostic initial, choix d'outils, configuration et documentation claire pour retrouver un environnement stable et maîtrisé.",
        deliverables: ["Analyse du problème et de son contexte", "Correction ou scénario de résolution", "Explications pour éviter la récidive"],
        booking: "reservation.html?service=support",
        more: "services.html#assistance",
      },
    };

    const activateSolution = (tab, moveFocus = false) => {
      const solution = solutions[tab.dataset.solution];
      if (!solution) return;
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", tab.id);
      panel.querySelector("[data-solution-code]").textContent = solution.code;
      panel.querySelector("[data-solution-status]").textContent = solution.status;
      panel.querySelector("[data-solution-title]").textContent = solution.title;
      panel.querySelector("[data-solution-description]").textContent = solution.description;
      const list = panel.querySelector("[data-solution-list]");
      list.replaceChildren(...solution.deliverables.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
      }));
      panel.querySelector("[data-solution-booking]").href = solution.booking;
      panel.querySelector("[data-solution-more]").href = solution.more;
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateSolution(tab));
      tab.addEventListener("keydown", (event) => {
        const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (index + 1) % tabs.length;
        if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        activateSolution(tabs[nextIndex], true);
      });
    });
  }

  const nextBusinessDay = document.querySelector("[data-next-business-day]");
  if (nextBusinessDay) {
    const date = new Date();
    do {
      date.setDate(date.getDate() + 1);
    } while ([0, 6].includes(date.getDay()));
    nextBusinessDay.textContent = new Intl.DateTimeFormat("fr-BE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".experience-card, .delivery-flow li, .faq-list details");
  if (!reducedMotion && "IntersectionObserver" in window) {
    revealTargets.forEach((target) => target.classList.add("reveal-item"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    revealTargets.forEach((target) => observer.observe(target));
  }
})();
