(() => {
  const root = document.querySelector("[data-auth-root]");
  if (!root) return;

  const guestPanel = root.querySelector("[data-auth-guest]");
  const userPanel = root.querySelector("[data-auth-user]");
  const setupNotice = root.querySelector("[data-auth-setup]");
  const status = root.querySelector("[data-auth-status]");
  const emailForm = root.querySelector("[data-auth-email-form]");
  const emailInput = root.querySelector("[data-auth-email]");
  const providerButtons = [...root.querySelectorAll("[data-auth-provider]")];
  const signOutButton = root.querySelector("[data-auth-signout]");
  const userEmail = root.querySelector("[data-auth-user-email]");
  const userProvider = root.querySelector("[data-auth-user-provider]");
  const userInitial = root.querySelector("[data-auth-user-initial]");
  const controls = [...providerButtons, emailForm.querySelector("button")];
  const config = window.AUTH_CONFIG || {};

  const setStatus = (message, tone = "neutral") => {
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const setBusy = (busy) => {
    controls.forEach((control) => {
      control.disabled = busy;
    });
    root.setAttribute("aria-busy", String(busy));
  };

  const projectUrlIsValid = (() => {
    try {
      const url = new URL(config.supabaseUrl);
      return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
    } catch {
      return false;
    }
  })();
  const publishableKeyIsValid = typeof config.supabasePublishableKey === "string"
    && (config.supabasePublishableKey.startsWith("sb_publishable_") || config.supabasePublishableKey.split(".").length === 3);
  const clientIsAvailable = typeof window.supabase?.createClient === "function";

  if (!projectUrlIsValid || !publishableKeyIsValid || !clientIsAvailable) {
    setupNotice.hidden = false;
    controls.forEach((control) => {
      control.disabled = true;
    });
    setStatus("L'interface est prête. Ajoutez la configuration Supabase publique pour activer les connexions.");
    return;
  }

  const authClient = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  const redirectUrl = new URL("account.html", window.location.href);
  redirectUrl.search = "";
  redirectUrl.hash = "";

  const renderSession = (session) => {
    const user = session?.user;
    guestPanel.hidden = Boolean(user);
    userPanel.hidden = !user;
    if (!user) return;

    const email = user.email || "Compte connecté";
    const provider = user.app_metadata?.provider || "e-mail";
    userEmail.textContent = email;
    userProvider.textContent = provider === "email" ? "Lien sécurisé par e-mail" : `Connexion avec ${provider}`;
    userInitial.textContent = email.charAt(0).toUpperCase();
    setStatus("Connexion réussie. Votre espace client est prêt.", "success");
  };

  providerButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      setBusy(true);
      setStatus(`Redirection sécurisée vers ${button.dataset.authProvider}…`);
      const { error } = await authClient.auth.signInWithOAuth({
        provider: button.dataset.authProvider,
        options: { redirectTo: redirectUrl.href },
      });
      if (error) {
        setBusy(false);
        setStatus("La connexion n'a pas pu démarrer. Vérifiez la configuration du fournisseur puis réessayez.", "error");
      }
    });
  });

  emailForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!emailForm.reportValidity()) return;
    setBusy(true);
    setStatus("Envoi du lien de connexion…");
    const { error } = await authClient.auth.signInWithOtp({
      email: emailInput.value.trim(),
      options: {
        emailRedirectTo: redirectUrl.href,
        shouldCreateUser: true,
      },
    });
    setBusy(false);
    if (error) {
      setStatus("Le lien n'a pas pu être envoyé. Réessayez dans quelques instants.", "error");
      return;
    }
    emailForm.reset();
    setStatus("Lien envoyé. Consultez votre boîte e-mail pour terminer la connexion.", "success");
  });

  signOutButton.addEventListener("click", async () => {
    signOutButton.disabled = true;
    const { error } = await authClient.auth.signOut();
    signOutButton.disabled = false;
    if (error) {
      setStatus("La déconnexion a échoué. Actualisez la page puis réessayez.", "error");
      return;
    }
    renderSession(null);
    setStatus("Vous êtes déconnecté.");
  });

  authClient.auth.onAuthStateChange((_event, session) => {
    renderSession(session);
  });

  authClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      setStatus("Impossible de vérifier la session. Actualisez la page.", "error");
      return;
    }
    renderSession(data.session);
  });
})();
