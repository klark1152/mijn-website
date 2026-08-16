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
- ne jamais présenter une certification, une mission ou un client fictif comme réel ;
- pour tout contenu lié à la sécurité, rappeler que les tests exigent une autorisation explicite.

## Test local

```bash
python -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000` et vérifiez les liens, le contenu et le responsive.
