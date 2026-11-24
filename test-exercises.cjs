// Tests du générateur d'exercices — lancer avec : node test-exercises.cjs
const M = require('./exercises.js');
const fail = m => { throw Error(m); };
let n = 0;

for (let t = 0; t < M.THEMES.length; t++) for (let l = 1; l <= 3; l++) for (let i = 0; i < 200; i++) {
  const e = M.generate(t, l); n++;
  if (!Number.isFinite(e.answer)) fail(`Réponse invalide t${t} l${l}`);
  if (!e.question || !e.correction || !e.hints.length) fail(`Énoncé incomplet t${t} l${l}`);
  if (/undefined|NaN/.test(e.question + e.correction)) fail(`Texte cassé t${t} l${l} : ${e.question}`);
  if (!M.check(e, String(e.answer)).ok) fail(`Bonne réponse refusée t${t} l${l} : ${e.answer}`);
  if (!M.check(e, String(e.answer).replace('.', ',')).ok) fail(`Virgule refusée t${t} l${l}`);
  // Une erreur d'une unité sur un résultat entier doit être refusée
  if (e.exact && M.check(e, String(e.answer + 1)).ok) fail(`Réponse fausse acceptée t${t} l${l} : ${e.answer + 1}`);
  // Zéro ne doit jamais être accepté pour un résultat non nul
  if (e.answer !== 0 && M.check(e, '0').ok) fail(`0 accepté t${t} l${l} pour ${e.answer}`);
}

const eq = (s, v) => { const p = M.parse(s); if (Math.abs(p - v) > 1e-12 * Math.max(1, Math.abs(v))) fail(`Parse ${s} → ${p}, attendu ${v}`); };
eq('3/4', 0.75); eq('2,5', 2.5); eq('1e-3', 0.001); eq('-4.2', -4.2); eq('−7', -7);
eq('2,5×10^-3', 0.0025); eq('2.5*10^3', 2500); eq('10^-6', 1e-6); eq('1 200', 1200); eq('3x10^(4)', 30000);

// Arrondis : 2/7 ≈ 0,2857 → 0,29 accepté, 0,3 refusé (1 seul chiffre significatif)
const frac = { answer: 2 / 7, exact: false };
if (!M.check(frac, '0,29').ok || !M.check(frac, '0,286').ok) fail('Arrondi correct refusé');
if (M.check(frac, '0,3').ok || M.check(frac, '0,28').ok) fail('Arrondi incorrect accepté');

console.log(`OK — ${n} exercices générés et vérifiés, saisie et arrondis contrôlés`);
