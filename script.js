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
})();
