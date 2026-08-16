(() => {
  const emailButton = document.querySelector("[data-email-button]");
  const copyButton = document.querySelector("[data-copy-email]");
  const emailAddress = document.querySelector("[data-email-address]");
  const feedback = document.querySelector("[data-email-feedback]");

  if (!emailButton || !copyButton || !emailAddress || !feedback) return;

  emailButton.addEventListener("click", () => {
    feedback.textContent = "Ouverture de votre application e-mail… Si rien ne se passe, copiez l'adresse ci-dessous.";
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress.value);
      feedback.textContent = `Adresse copiée : ${emailAddress.value}`;
      copyButton.textContent = "Adresse copiée";
    } catch {
      emailAddress.focus();
      emailAddress.select();
      feedback.textContent = "L'adresse est sélectionnée. Utilisez Ctrl+C ou Cmd+C pour la copier.";
    }
  });
})();
