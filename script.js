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

  const scrollButton = document.createElement("button");
  scrollButton.className = "scroll-top";
  scrollButton.type = "button";
  scrollButton.textContent = "↑";
  scrollButton.setAttribute("aria-label", "Terug naar boven");
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
