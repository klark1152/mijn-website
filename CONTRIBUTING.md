# Contribuer

Les améliorations utiles et vérifiables sont les bienvenues.

## Proposer une modification

1. Créez une branche avec un nom explicite, par exemple `fix/navigation-mobile`.
2. Limitez chaque commit à une amélioration cohérente.
3. Testez toutes les pages sur ordinateur et mobile.
4. Ouvrez une pull request en expliquant le problème résolu.

## Qualité attendue

- utiliser un HTML sémantique et accessible ;
- conserver un contraste suffisant et une navigation au clavier ;
- ne jamais ajouter de chemins locaux comme `file:///C:/...` ;
- ne publier aucune donnée personnelle sans consentement ;
- ne pas ajouter de script, tracker ou police distante sans analyse documentée du risque et de la confidentialité ;
- ne jamais présenter une certification, une mission ou un client fictif comme réel ;
- pour tout contenu lié à la sécurité, rappeler que les tests exigent une autorisation explicite.

Les vulnérabilités ne doivent pas être publiées dans une issue. Utilisez le canal indiqué dans `.well-known/security.txt`.

## Test local

```bash
python -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000` et vérifiez les liens, le contenu et le responsive.

Exécutez également :

```bash
node --check script.js
node --check reservation.js
node scripts/validate-site.mjs
```
