# Amin Darouiche — services informatiques

Site professionnel présentant des services de création web, de conseil en sécurité numérique et d'assistance informatique pour les particuliers, indépendants et petites structures.

## Site en ligne

[Consulter le site](https://klark1152.github.io/mijn-website/)

## Services présentés

- création et refonte de sites vitrines ;
- amélioration des performances et de l'accessibilité ;
- diagnostic de sécurité et recommandations pratiques ;
- assistance informatique et accompagnement technique.

Les interventions de sécurité sont réalisées uniquement avec l'autorisation explicite du propriétaire des systèmes concernés.

## Fonctions principales

- parcours guidé de demande de rendez-vous en quatre étapes ;
- sélecteur interactif de services avec préparation automatique du bon rendez-vous ;
- diagnostic de sécurité en huit questions, calculé sans transmission des réponses ;
- créneaux sur les 30 prochains jours ouvrés, au fuseau `Europe/Brussels` ;
- récapitulatif avant envoi et confirmation humaine obligatoire ;
- centre de sécurité public et canal de signalement `security.txt` ;
- pages de confidentialité, référencement et erreur personnalisée ;
- navigation responsive, clavier, préférences de mouvement réduit et contrôles accessibles.

Le parcours de rendez-vous ne consulte pas un agenda en temps réel. Il prépare un e-mail dans l'application du visiteur : aucune donnée n'est enregistrée par le site et le créneau doit être confirmé manuellement.

## Technique

Le site utilise uniquement HTML, CSS et JavaScript, sans framework, tracker, police distante, compte utilisateur ni base de données. Une Content Security Policy limite les ressources au domaine du site. Les contrôles automatiques vérifient la syntaxe JavaScript, les pages requises, les liens locaux, les identifiants dupliqués et les dépendances distantes.

GitHub Pages ne permet pas de configurer tous les en-têtes HTTP ni un backend sécurisé. Une réservation synchronisée, des paiements ou des comptes devront utiliser une architecture distincte avec contrôle d'accès, journalisation et accord de traitement des données.

## Lancer le site localement

```bash
python -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`.

## Structure

- `index.html` : présentation générale ;
- `services.html` : offres et périmètre d'intervention ;
- `gallery.html` : exemples de missions et méthode ;
- `contact.html` : prise de contact ;
- `diagnostic.html` et `diagnostic.js` : auto-évaluation locale des pratiques de sécurité ;
- `reservation.html` et `reservation.js` : parcours de demande de rendez-vous ;
- `securite.html` : contrôles, référentiels et limites de sécurité ;
- `confidentialite.html` : informations sur les données personnelles ;
- `.well-known/security.txt` : canal de signalement responsable ;
- `.nojekyll` : publication statique fidèle, y compris du dossier `.well-known` ;
- `og.png` : carte de partage social du site ;
- `og-site.webp` : version légère utilisée dans l'accueil ;
- `scripts/validate-site.mjs` : validation statique locale ;
- `.github/workflows/quality.yml` : contrôle automatique du site.
