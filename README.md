# Maths TIIN v0.4

Petite PWA d'entraînement en mathématiques pour les apprentis de Bac Pro TIIN.

## Objectif

Permettre un entraînement court, progressif et autonome sur les outils mathématiques réellement mobilisés en Bac Pro TIIN : calcul numérique, nombres relatifs, fractions, puissances de 10, conversions, proportionnalité, pourcentages, formules, équations, géométrie, Pythagore/trigonométrie et lecture de données.

## Nouveautés v0.4 — points de difficulté

Ajouts ciblés sur les questions les moins réussies du test de positionnement national de seconde professionnelle (DEPP, 2025) :

- **Nouveau thème « Décimaux et droite graduée »** (placé après Fractions) : fraction ↔ décimal (0,7 = 7/10), comparaison de décimaux (0,8 > 0,75), lecture d’une graduation, zoom entre deux décimaux, lecture de manomètre, radiamètre analogique et jauge de cuve. Fiche de cours, schéma manipulable et exercices interactifs.
- **Nouveau format « Repère les données utiles »** : énoncé en environnement nucléaire avec des informations parasites ; l’élève sélectionne seulement les données nécessaires au calcul.
- **Exercices ciblés** : règle des signes sur trois facteurs, carré ≠ double (a², 7², E = k × a²), substitution dans la formule du volume d’un cône.
- Signe moins typographique (−) dans tous les énoncés.

## Nouveautés v0.3 — interactivité

- **Schémas à manipuler** dans chaque fiche de cours (`sims.js`) : curseurs et boutons qui recalculent en direct (cuve fractionnée, droite graduée, convertisseur de préfixes, débit de pompe, dose = débit × temps, triangle de la loi d’Ohm, balance d’équation, cuve cylindrique, triangle rectangle déformable, curseurs sur une courbe).
- **Nouveaux formats d’exercices** (`interactifs.js`) : trouve l’erreur, remets dans l’ordre, touche le schéma, choisis la bonne réponse. Sélecteur « Format » : mélange, calcul ou interactif.
- **Correction animée** : les étapes de la correction apparaissent une à une.
- **Défis** (`outils.js`) : calcul mental en 60 s avec record sur l’appareil, échauffement de 5 exercices.
- **Boîte à outils** accessible partout : convertisseur (longueur, surface, volume, débit, temps, dose, débit de dose, activité, puissance, pression) et calculatrice de formules.
- **Mode tableau** pour la projection en classe (plein écran, gros caractères).
- Les situations professionnelles sont désormais présentées comme « en environnement nucléaire ».

## Nouveautés v0.2

- Onglet **Cours en images** : une fiche par thème avec schéma, « à retenir », méthode, exemple résolu à dévoiler étape par étape, piège classique et application en environnement nucléaire.
- Boutons « Revoir le cours » depuis un exercice et « Cours » depuis le parcours.
- 2 à 3 types d'énoncés par thème et par niveau (dépression des locaux, dose prévisionnelle, activité en Bq, section de tuyauterie, élingue, diagramme d'interventions…).

## Fonctionnement

- 13 thèmes ;
- 3 niveaux : base, calculs, environnement nucléaire ;
- valeurs aléatoires pour éviter l'apprentissage par cœur ;
- indices progressifs et correction détaillée ;
- test de départ de 13 questions ;
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

Génère 7 200 exercices numériques et plus de 4 000 exercices interactifs, et vérifie que chaque bonne réponse est acceptée, qu'une erreur d'une unité ou un « 0 » est refusé, et que les formats de saisie sont bien lus.

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
