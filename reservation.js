(() => {
  const form = document.querySelector("#booking-form");
  if (!form) return;

  const steps = [...form.querySelectorAll("[data-step]")];
  const progress = [...form.querySelectorAll("[data-progress]")];
  const service = form.querySelector("#booking-service");
  const mode = form.querySelector("#booking-mode");
  const date = form.querySelector("#booking-date");
  const name = form.querySelector("#booking-name");
  const email = form.querySelector("#booking-email");
  const details = form.querySelector("#booking-details");
  const authorizationWrap = form.querySelector("#security-authorization");
  const authorization = form.querySelector("#booking-authorization");
  const privacy = form.querySelector("#booking-privacy");
  const slotGrid = form.querySelector("#slot-grid");
  let selectedSlot = "";

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  const toInputDate = (value) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  date.min = toInputDate(minDate);
  date.max = toInputDate(maxDate);

  ["09:00", "10:30", "14:00", "15:30"].forEach((time) => {
    const button = document.createElement("button");
    button.className = "slot-button";
    button.type = "button";
    button.textContent = time;
    button.dataset.slot = time;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      selectedSlot = time;
      slotGrid.querySelectorAll("button").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      form.querySelector("#slot-error").hidden = true;
    });
    slotGrid.append(button);
  });

  const showStep = (stepNumber) => {
    steps.forEach((step) => {
      step.hidden = Number(step.dataset.step) !== stepNumber;
    });
    progress.forEach((item) => {
      const itemStep = Number(item.dataset.progress);
      item.classList.toggle("is-active", itemStep === stepNumber);
      item.classList.toggle("is-complete", itemStep < stepNumber);
    });
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validBusinessDate = () => {
    if (!date.value) return false;
    const chosen = new Date(`${date.value}T12:00:00`);
    const day = chosen.getDay();
    return date.value >= date.min && date.value <= date.max && day !== 0 && day !== 6;
  };

  const validateStep = (stepNumber) => {
    if (stepNumber === 1) {
      const valid = Boolean(service.value);
      form.querySelector("#service-error").hidden = valid;
      return valid;
    }
    if (stepNumber === 2) {
      const dateValid = validBusinessDate();
      const slotValid = Boolean(selectedSlot);
      form.querySelector("#date-error").hidden = dateValid;
      form.querySelector("#slot-error").hidden = slotValid;
      return dateValid && slotValid;
    }
    if (stepNumber === 3) {
      const securitySelected = service.value.includes("sécurité");
      const valid = name.value.trim().length >= 2
        && email.validity.valid
        && details.value.trim().length >= 10
        && (!securitySelected || authorization.checked);
      form.querySelector("#contact-error").hidden = valid;
      return valid;
    }
    return true;
  };

  const updateSecurityAuthorization = () => {
    const securitySelected = service.value.includes("sécurité");
    authorizationWrap.hidden = !securitySelected;
    authorization.required = securitySelected;
    if (!securitySelected) authorization.checked = false;
  };
  service.addEventListener("change", updateSecurityAuthorization);

  const requestedService = new URLSearchParams(window.location.search).get("service");
  const serviceOptions = {
    discovery: "Appel découverte — 30 min",
    web: "Projet de site web — 45 min",
    security: "Conseil en sécurité — 45 min",
    support: "Assistance informatique — 30 min",
  };
  if (requestedService && serviceOptions[requestedService]) {
    service.value = serviceOptions[requestedService];
    updateSecurityAuthorization();
  }

  const updateSummary = () => {
    const formattedDate = new Intl.DateTimeFormat("fr-BE", { dateStyle: "long" })
      .format(new Date(`${date.value}T12:00:00`));
    const values = {
      "summary-service": service.value,
      "summary-mode": mode.value,
      "summary-slot": `${formattedDate} à ${selectedSlot} — Europe/Brussels`,
      "summary-name": name.value.trim(),
      "summary-email": email.value.trim(),
      "summary-details": details.value.trim(),
    };
    Object.entries(values).forEach(([id, value]) => {
      form.querySelector(`#${id}`).textContent = value;
    });
  };

  form.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentStep = Number(button.closest("[data-step]").dataset.step);
      if (!validateStep(currentStep)) return;
      if (Number(button.dataset.next) === 4) updateSummary();
      showStep(Number(button.dataset.next));
    });
  });

  form.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => showStep(Number(button.dataset.back)));
  });

  form.querySelector("#send-booking").addEventListener("click", () => {
    if (!privacy.checked) {
      form.querySelector("#privacy-error").hidden = false;
      return;
    }
    form.querySelector("#privacy-error").hidden = true;
    const formattedDate = new Intl.DateTimeFormat("fr-BE", { dateStyle: "long" })
      .format(new Date(`${date.value}T12:00:00`));
    const subject = `Demande de rendez-vous — ${service.value}`;
    const body = [
      "Bonjour Amin,",
      "",
      `Service : ${service.value}`,
      `Format : ${mode.value}`,
      `Créneau souhaité : ${formattedDate} à ${selectedSlot} (Europe/Brussels)`,
      `Nom : ${name.value.trim()}`,
      `E-mail de réponse : ${email.value.trim()}`,
      "",
      "Contexte :",
      details.value.trim(),
      "",
      "Je comprends que ce créneau doit être confirmé par e-mail.",
    ].join("\n");
    form.querySelector("#booking-status").textContent = "Votre application e-mail va s'ouvrir. Vérifiez le message avant de l'envoyer.";
    form.querySelector("#booking-status").hidden = false;
    window.location.href = `mailto:amindarouiche2008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
