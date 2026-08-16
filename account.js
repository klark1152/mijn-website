(() => {
  const root = document.querySelector("[data-auth-root]");
  if (!root) return;

  const guestPanel = root.querySelector("[data-auth-guest]");
  const userPanel = root.querySelector("[data-auth-user]");
  const setupNotice = root.querySelector("[data-auth-setup]");
  const status = root.querySelector("[data-auth-status]");
  const emailForm = root.querySelector("[data-auth-email-form]");
  const emailInput = root.querySelector("[data-auth-email]");
  const emailSubmit = emailForm.querySelector("button");
  const providerButtons = [...root.querySelectorAll("[data-auth-provider]")];
  const signOutButton = root.querySelector("[data-auth-signout]");
  const userEmail = root.querySelector("[data-auth-user-email]");
  const userProvider = root.querySelector("[data-auth-user-provider]");
  const userInitial = root.querySelector("[data-auth-user-initial]");
  const controls = [...providerButtons, emailSubmit];
  const config = window.AUTH_CONFIG || {};
  const enabledProviders = new Set();

  const setStatus = (message, tone = "neutral") => {
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const setBusy = (busy) => {
    providerButtons.forEach((button) => {
      button.disabled = busy || !enabledProviders.has(button.dataset.authProvider);
    });
    emailSubmit.disabled = busy;
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

  const refreshProviderAvailability = async () => {
    providerButtons.forEach((button) => {
      button.disabled = true;
    });
    try {
      const response = await fetch(`${config.supabaseUrl}/auth/v1/settings`, {
        headers: { apikey: config.supabasePublishableKey },
      });
      if (!response.ok) throw new Error("Provider settings unavailable");
      const settings = await response.json();
      providerButtons.forEach((button) => {
        const provider = button.dataset.authProvider;
        const isEnabled = settings.external?.[provider] === true;
        if (isEnabled) enabledProviders.add(provider);
        button.disabled = !isEnabled;
        button.querySelector("[data-auth-provider-state]").textContent = isEnabled ? "Disponible" : "À configurer";
      });
      if (!guestPanel.hidden && !enabledProviders.size) {
        setStatus("La connexion par e-mail est active. Google et Apple attendent leur configuration fournisseur.");
      }
    } catch {
      providerButtons.forEach((button) => {
        button.querySelector("[data-auth-provider-state]").textContent = "Indisponible";
      });
      if (!guestPanel.hidden) {
        setStatus("La connexion par e-mail reste disponible. Impossible de vérifier Google et Apple pour le moment.");
      }
    }
  };

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

  refreshProviderAvailability();
})();
