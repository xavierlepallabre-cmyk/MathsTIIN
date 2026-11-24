# Maths TIIN v0.1.1

Petite PWA d'entraînement en mathématiques pour les apprentis de Bac Pro TIIN.

## Objectif

Permettre un entraînement court, progressif et autonome sur les outils mathématiques réellement mobilisés en Bac Pro TIIN : calcul numérique, nombres relatifs, fractions, puissances de 10, conversions, proportionnalité, pourcentages, formules, équations, géométrie, Pythagore/trigonométrie et lecture de données.

## Fonctionnement

- 12 thèmes ;
- 3 niveaux : base, calculs, situation TIIN ;
- valeurs aléatoires pour éviter l'apprentissage par cœur ;
- indices progressifs et correction détaillée ;
- test de départ de 12 questions ;
- progression enregistrée uniquement dans `localStorage` ;
- aucun compte, nom d'apprenti ou donnée distante ;
- fonctionnement hors ligne après la première visite grâce au service worker ;
- mode clair/sombre ;
- responsive téléphone / tablette / ordinateur.

## Saisie des réponses

Formats acceptés : `12,5` · `-4.2` · `3/4` · `1e-3` · `2,5×10^-3` · `10^-6`. Les résultats entiers doivent être exacts ; pour les autres, un écart de 1 % ou un arrondi correct (au moins 2 chiffres significatifs) est accepté.

## Tests

```bash
node test-exercises.cjs
```

Génère 7 200 exercices et vérifie que chaque bonne réponse est acceptée, qu'une erreur d'une unité ou un « 0 » est refusé, et que les formats de saisie sont bien lus.

## Publication

Le dossier peut être publié tel quel sur GitHub Pages. Aucun build n'est nécessaire.

Pour tester localement :

```bash
python -m http.server 8000
```

puis ouvrir `http://localhost:8000`.

## Identité visuelle

Le système graphique reprend volontairement les codes de Nucléa TIIN : bleu `#1A3C89`, orange `#F18A52`, surfaces claires, cartes et mode sombre. La pile de polices privilégie Lexend si elle est déjà disponible sur l’appareil, avec une police système de repli. Aucun fichier de police externe n’est nécessaire.

## Données de progression

La maîtrise affichée est un indicateur d'entraînement, pas une note scolaire. Une bonne réponse fait progresser l'indicateur ; une erreur le fait légèrement redescendre. Le bilan peut être copié en texte pour être transmis volontairement à l'enseignant.

---

**Conception originale : Xavier Le Pallabre**
Ressource pédagogique développée à titre personnel, avec l'assistance d'outils d'intelligence artificielle.
© 2026 Xavier Le Pallabre — Attribution de l'auteur original à conserver lors des réutilisations et adaptations, conformément à la licence applicable ([CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr)).
