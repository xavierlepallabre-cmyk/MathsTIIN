// Maths TIIN — fiches de cours visuelles (une par thème, même ordre que THEMES)
// Chaque fiche : accroche TIIN, schéma SVG, à retenir, méthode, exemple résolu pas à pas, piège, situation TIIN.
(function(root){
 const svg=(vb,body,label)=>`<svg class="cv" viewBox="${vb}" role="img" aria-label="${label}">${body}</svg>`;
 const arrowDefs='<defs><marker id="cvArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="cv-fill-ink"/></marker><marker id="cvArrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="cv-fill-accent"/></marker></defs>';

 const COURS=[
 // 0 — Calcul numérique
 {accroche:'Un bon de commande, un temps d’intervention, un bilan matière : un calcul fait dans le mauvais ordre donne un résultat faux, même avec une calculatrice.',
  visuel:svg('0 0 600 250',`${arrowDefs}
   <rect x="20" y="20" width="250" height="56" rx="10" class="cv-brand"/><text x="145" y="55" class="cv-t-on cv-big" text-anchor="middle">1 · ( parenthèses )</text>
   <rect x="45" y="92" width="200" height="56" rx="10" class="cv-brand2"/><text x="145" y="127" class="cv-t-on cv-big" text-anchor="middle">2 · ×  et  ÷</text>
   <rect x="70" y="164" width="150" height="56" rx="10" class="cv-accent"/><text x="145" y="199" class="cv-t-on cv-big" text-anchor="middle">3 · +  et  −</text>
   <text x="330" y="44" class="cv-tb">7 + 3 × 4 = ?</text>
   <rect x="320" y="62" width="250" height="62" rx="10" class="cv-bad"/><text x="335" y="88" class="cv-t">Faux — de gauche à droite :</text><text x="335" y="112" class="cv-tb">7 + 3 = 10 ; 10 × 4 = 40</text>
   <rect x="320" y="138" width="250" height="62" rx="10" class="cv-ok"/><text x="335" y="164" class="cv-t">Juste — × d’abord :</text><text x="335" y="188" class="cv-tb">3 × 4 = 12 ; 7 + 12 = 19</text>
   <text x="330" y="232" class="cv-small">À même niveau : de gauche à droite.</text>`,'Ordre des priorités de calcul'),
  legende:'On descend la pyramide : d’abord les parenthèses, ensuite × et ÷, enfin + et −.',
  retenir:['( ) → × ÷ → + −','À priorité égale : de gauche à droite','Ordre de grandeur : 19,8 × 4,1 ≈ 20 × 4 = 80'],
  methode:['Repérer les parenthèses et les calculer en premier.','Effectuer les multiplications et divisions, de gauche à droite.','Terminer par les additions et soustractions.','Contrôler avec un ordre de grandeur : le résultat est-il plausible ?'],
  exemple:{enonce:'Calculer (12 + 8) × 3 − 5.',etapes:['Parenthèse : 12 + 8 = 20','Multiplication : 20 × 3 = 60','Soustraction : 60 − 5 = 55'],reponse:'55'},
  piege:'Taper « 7 + 3 × 4 » sur un téléphone en mode simple peut afficher 40. Sur une calculatrice scientifique, on obtient bien 19.',
  tiin:'Commande de 6 joints à 14 € + 9 € de port : 6 × 14 + 9 = 84 + 9 = 93 €. Calculer (14 + 9) × 6 = 138 € reviendrait à payer le port six fois.'},

 // 1 — Nombres relatifs
 {accroche:'Températures négatives, dépression d’un local ventilé, baisse d’un niveau de cuve : les signes portent une information physique.',
  visuel:svg('0 0 600 230',`${arrowDefs}
   <line x1="30" y1="120" x2="570" y2="120" class="cv-line" marker-end="url(#cvArr)"/>
   ${[-10,-5,0,5,10,15,20,25,30].map((v,i)=>`<line x1="${50+i*62}" y1="112" x2="${50+i*62}" y2="128" class="cv-line"/><text x="${50+i*62}" y="150" text-anchor="middle" class="${v===0?'cv-tb':'cv-t'}">${v<0?'−'+(-v):v}</text>`).join('')}
   <rect x="50" y="104" width="124" height="32" class="cv-cold" rx="4"/><text x="112" y="96" text-anchor="middle" class="cv-small">négatifs</text>
   <circle cx="360" cy="120" r="8" class="cv-fill-brand"/><circle cx="484" cy="120" r="8" class="cv-fill-accent"/>
   <path d="M484 85 Q422 40 364 85" class="cv-arrow-a" marker-end="url(#cvArrA)"/>
   <text x="424" y="42" text-anchor="middle" class="cv-tb">ΔT = 15 − 25 = −10</text>
   <text x="484" y="185" text-anchor="middle" class="cv-small">initiale 25 °C</text><text x="360" y="185" text-anchor="middle" class="cv-small">finale 15 °C</text>
   <text x="30" y="215" class="cv-small">Variation = finale − initiale. Négative → baisse ; positive → hausse.</text>`,'Droite graduée et variation de température'),
  legende:'Une variation se lit comme une flèche : elle part de la valeur initiale et arrive à la valeur finale.',
  retenir:['Δ = valeur finale − valeur initiale','− (−a) = + a','(−) × (−) = (+)   ·   (−) × (+) = (−)'],
  methode:['Écrire la valeur initiale et la valeur finale avec leur signe.','Poser Δ = finale − initiale, en gardant les parenthèses : 12 − (−4).','Transformer « moins un négatif » en « plus ».','Interpréter le signe : baisse (−) ou hausse (+).'],
  exemple:{enonce:'Un relevé passe de −4 °C à 12 °C. Calculer la variation ΔT.',etapes:['ΔT = finale − initiale = 12 − (−4)','Moins un négatif = plus : 12 + 4','ΔT = +16 °C : la température a augmenté'],reponse:'16 °C'},
  piege:'L’écart entre −4 et 12 n’est pas 8 : on oublie souvent que traverser 0 compte (4 pour aller à 0, puis 12).',
  tiin:'Les locaux d’une INB sont maintenus en dépression : un local à −140 Pa est plus « aspiré » qu’un local à −60 Pa. L’air circule du moins négatif vers le plus négatif.'},

 // 2 — Fractions
 {accroche:'« La cuve est aux trois quarts », « un tiers du temps en atelier » : une fraction, c’est une part d’un tout.',
  visuel:svg('0 0 600 240',`
   <rect x="40" y="30" width="110" height="180" rx="8" class="cv-frame"/>
   <rect x="44" y="79" width="102" height="127" rx="4" class="cv-water"/>
   ${[1,2,3].map(i=>`<line x1="40" y1="${30+i*45}" x2="150" y2="${30+i*45}" class="cv-dash"/>`).join('')}
   <text x="165" y="80" class="cv-tb">3/4</text><text x="165" y="100" class="cv-small">remplie</text>
   <text x="95" y="232" text-anchor="middle" class="cv-small">cuve de 200 L</text>
   <text x="330" y="70" text-anchor="middle" class="cv-huge cv-brand-t">3</text><line x1="295" y1="84" x2="365" y2="84" class="cv-line-b"/><text x="330" y="128" text-anchor="middle" class="cv-huge">4</text>
   <text x="390" y="62" class="cv-t">← numérateur : parts prises</text><text x="390" y="122" class="cv-t">← dénominateur : parts du tout</text>
   <rect x="275" y="160" width="300" height="56" rx="10" class="cv-soft"/><text x="425" y="186" text-anchor="middle" class="cv-tb">3/4 de 200 L = 200 × 3 ÷ 4</text><text x="425" y="206" text-anchor="middle" class="cv-t">= 150 L</text>`,'Cuve remplie aux trois quarts'),
  legende:'Le dénominateur découpe le tout en parts égales, le numérateur compte les parts prises.',
  retenir:['a/b de Q = Q × a ÷ b','a/b + c/b = (a + c)/b','Même dénominateur avant d’additionner'],
  methode:['Simplifier si possible (diviser haut et bas par le même nombre).','Pour additionner : mettre au même dénominateur.','Pour prendre une fraction d’une quantité : multiplier par le numérateur, diviser par le dénominateur.','Vérifier : une fraction < 1 donne un résultat plus petit que la quantité.'],
  exemple:{enonce:'Calculer 1/4 + 2/3.',etapes:['Dénominateur commun : 12','1/4 = 3/12 et 2/3 = 8/12','3/12 + 8/12 = 11/12 ≈ 0,917'],reponse:'11/12'},
  piege:'1/4 + 1/4 ne fait pas 2/8 : on n’additionne jamais les dénominateurs. 1/4 + 1/4 = 2/4 = 1/2.',
  tiin:'Un apprenti passe 2/5 de ses 35 h hebdomadaires en atelier : 35 × 2 ÷ 5 = 14 h.'},

 // 3 — Puissances de 10
 {accroche:'En radioprotection, on passe sans cesse du µSv au mSv, du Bq au GBq : les puissances de 10 rangent ces ordres de grandeur.',
  visuel:svg('0 0 600 230',`${arrowDefs}
   ${[['G','giga','10⁹'],['M','méga','10⁶'],['k','kilo','10³'],['—','unité','10⁰'],['m','milli','10⁻³'],['µ','micro','10⁻⁶'],['n','nano','10⁻⁹']].map((p,i)=>`<rect x="${18+i*82}" y="40" width="72" height="84" rx="10" class="${i===3?'cv-accent':i<3?'cv-brand':'cv-brand2'}"/><text x="${54+i*82}" y="78" text-anchor="middle" class="cv-t-on cv-big">${p[0]}</text><text x="${54+i*82}" y="100" text-anchor="middle" class="cv-t-on cv-small">${p[1]}</text><text x="${54+i*82}" y="148" text-anchor="middle" class="cv-tb">${p[2]}</text>`).join('')}
   ${[0,1,2,3,4,5].map(i=>`<line x1="${66+i*82}" y1="176" x2="${124+i*82}" y2="176" class="cv-arrow" marker-end="url(#cvArr)"/><text x="${95+i*82}" y="198" text-anchor="middle" class="cv-small">× 1000</text>`).join('')}
   <text x="300" y="225" text-anchor="middle" class="cv-small">Vers la droite : chaque cran multiplie la valeur par 1 000 (et l’unité est 1 000 fois plus petite)</text>`,'Échelle des préfixes et puissances de 10'),
  legende:'Chaque préfixe correspond à une puissance de 10 ; entre deux crans voisins, le facteur est 1 000.',
  retenir:['a × 10ⁿ avec 1 ≤ a < 10','10ᵃ × 10ᵇ = 10ᵃ⁺ᵇ   ·   10ᵃ ÷ 10ᵇ = 10ᵃ⁻ᵇ','10⁻ⁿ = 1 / 10ⁿ  (10⁻³ = 0,001)'],
  methode:['Repérer le préfixe de départ et celui d’arrivée.','Compter les crans : chaque cran vaut × 1 000 ou ÷ 1 000.','En écriture scientifique, déplacer la virgule pour avoir un seul chiffre non nul avant elle.','Compter le déplacement : vers la gauche → n positif, vers la droite → n négatif.'],
  exemple:{enonce:'Un intervenant reste 2 h sous 25 µSv/h. Quelle dose en mSv ?',etapes:['Dose = débit × durée = 25 × 2 = 50 µSv','µ → m : un cran vers la gauche, donc ÷ 1 000','50 µSv = 0,05 mSv = 5 × 10⁻² mSv'],reponse:'0,05 mSv'},
  piege:'10⁻³ n’est pas un nombre négatif : c’est 0,001. L’exposant négatif signifie « petit », pas « en dessous de zéro ».',
  tiin:'Une source de 370 MBq = 3,7 × 10⁸ Bq. Les valeurs de dose réglementaires s’écrivent en mSv, les relevés de dosimètre souvent en µSv.'},

 // 4 — Unités et conversions
 {accroche:'Débit de pompe en L/min, volume de cuve en m³, cote de plan en mm : avant tout calcul, on met les unités d’accord.',
  visuel:svg('0 0 600 250',`${arrowDefs}
   ${['km','hm','dam','m','dm','cm','mm'].map((u,i)=>`<rect x="${20+i*58}" y="${150-i*18}" width="54" height="${40+i*18}" rx="6" class="${u==='m'?'cv-accent':'cv-brand2'}"/><text x="${47+i*58}" y="${172-i*18}" text-anchor="middle" class="cv-t-on cv-tb2">${u}</text>`).join('')}
   <text x="20" y="225" class="cv-small">longueur : × 10 à chaque marche vers la droite (km → mm)</text>
   <rect x="440" y="30" width="140" height="140" class="cv-frame"/><rect x="440" y="100" width="70" height="70" class="cv-water"/>
   <text x="510" y="24" text-anchor="middle" class="cv-tb">1 m³ = 1 000 L</text>
   <text x="475" y="140" text-anchor="middle" class="cv-small">1 dm³</text><text x="475" y="156" text-anchor="middle" class="cv-small">= 1 L</text>
   <text x="510" y="195" text-anchor="middle" class="cv-t">1 m = 10 dm</text><text x="510" y="214" text-anchor="middle" class="cv-t">10 × 10 × 10 = 1 000</text>`,'Escalier des unités de longueur et cube de 1 m³'),
  legende:'Longueur : facteur 10 par marche. Surface : 100. Volume : 1 000 — et 1 dm³ = 1 L.',
  retenir:['1 m = 1 000 mm   ·   1 m² = 10 000 cm²','1 m³ = 1 000 L   ·   1 L = 1 dm³','1 h = 60 min = 3 600 s'],
  methode:['Écrire l’unité de départ et l’unité demandée.','Trouver le facteur entre les deux (tableau, préfixe, 60 pour le temps).','Vers une unité plus petite → multiplier ; plus grande → diviser.','Pour un débit, convertir séparément le haut (L → m³) et le bas (min → h).'],
  exemple:{enonce:'Convertir un débit de 30 L/min en m³/h.',etapes:['En 1 h il y a 60 min : 30 × 60 = 1 800 L/h','1 000 L = 1 m³ : 1 800 ÷ 1 000 = 1,8','Débit = 1,8 m³/h'],reponse:'1,8 m³/h'},
  piege:'1 m² ≠ 100 cm² : c’est 100 × 100 = 10 000 cm². Pour les surfaces et les volumes, le facteur se met au carré ou au cube.',
  tiin:'Un plan est coté en mm, une fiche de pompe donne le débit en m³/h et un mode opératoire parle en L/min : tout ramener dans les mêmes unités avant de calculer un temps de vidange.'},

 // 5 — Proportionnalité
 {accroche:'Temps de montage, prix au mètre, échelle d’un plan, dose au même débit : si l’un double, l’autre double.',
  visuel:svg('0 0 600 240',`${arrowDefs}
   <rect x="20" y="40" width="300" height="100" rx="10" class="cv-soft"/>
   <line x1="20" y1="90" x2="320" y2="90" class="cv-line-thin"/><line x1="120" y1="40" x2="120" y2="140" class="cv-line-thin"/><line x1="220" y1="40" x2="220" y2="140" class="cv-line-thin"/>
   <text x="30" y="70" class="cv-t">pièces</text><text x="170" y="72" text-anchor="middle" class="cv-tb">4</text><text x="270" y="72" text-anchor="middle" class="cv-tb">10</text>
   <text x="30" y="120" class="cv-t">minutes</text><text x="170" y="122" text-anchor="middle" class="cv-tb">18</text><text x="270" y="122" text-anchor="middle" class="cv-tb cv-accent-t">?</text>
   <path d="M328 62 Q362 90 328 118" class="cv-arrow-a" marker-end="url(#cvArrA)"/><text x="366" y="95" class="cv-tb cv-accent-t">× 4,5</text>
   <text x="20" y="175" class="cv-t">? = 18 × 10 ÷ 4 = 45 min</text><text x="20" y="200" class="cv-small">coefficient : 18 ÷ 4 = 4,5 min par pièce</text>
   <line x1="420" y1="210" x2="590" y2="210" class="cv-line" marker-end="url(#cvArr)"/><line x1="420" y1="210" x2="420" y2="30" class="cv-line" marker-end="url(#cvArr)"/>
   <line x1="420" y1="210" x2="570" y2="50" class="cv-curve"/><circle cx="480" cy="146" r="5" class="cv-fill-accent"/><circle cx="540" cy="82" r="5" class="cv-fill-accent"/>
   <text x="505" y="232" text-anchor="middle" class="cv-small">droite qui passe par l’origine</text>`,'Tableau de proportionnalité et droite passant par l’origine'),
  legende:'Dans un tableau de proportionnalité, on passe d’une ligne à l’autre en multipliant toujours par le même coefficient.',
  retenir:['y = k × x  (k : coefficient)','Produit en croix : a/b = c/x ⇒ x = b × c ÷ a','Échelle 1:n → réel = plan × n'],
  methode:['Vérifier que la situation est proportionnelle (au même rythme, même prix…).','Ranger les valeurs dans un tableau à deux lignes.','Calculer le coefficient ou faire le produit en croix.','Vérifier le sens : plus de pièces → plus de temps.'],
  exemple:{enonce:'Sur un plan au 1:20, une cote mesure 37 mm. Longueur réelle ?',etapes:['1:20 → 1 mm sur le plan = 20 mm en réel','37 × 20 = 740 mm','740 mm = 0,74 m'],reponse:'740 mm'},
  piege:'Tout n’est pas proportionnel : deux pompes identiques vident une cuve deux fois plus vite, le temps est divisé par 2, pas multiplié.',
  tiin:'Au même débit de dose, 12 µSv en 20 min donnent 12 × 45 ÷ 20 = 27 µSv en 45 min : c’est la base d’une prévision de dose.'},

 // 6 — Pourcentages
 {accroche:'Taux de non-conformité, remise fournisseur, hausse d’un temps d’arrêt : un pourcentage compare à 100.',
  visuel:svg('0 0 600 240',`${arrowDefs}
   <rect x="20" y="40" width="560" height="44" rx="8" class="cv-soft"/><rect x="20" y="40" width="140" height="44" rx="8" class="cv-accent"/>
   <text x="90" y="68" text-anchor="middle" class="cv-t-on cv-tb2">25 %</text><text x="370" y="68" text-anchor="middle" class="cv-t">75 %</text>
   <text x="20" y="30" class="cv-small">le tout = 100 %</text>
   <rect x="20" y="120" width="130" height="50" rx="10" class="cv-brand"/><text x="85" y="151" text-anchor="middle" class="cv-t-on cv-tb2">120 min</text>
   <path d="M155 135 L280 112" class="cv-arrow" marker-end="url(#cvArr)"/><text x="210" y="112" text-anchor="middle" class="cv-small">+ 20 % → × 1,20</text>
   <rect x="285" y="90" width="130" height="44" rx="10" class="cv-ok"/><text x="350" y="118" text-anchor="middle" class="cv-tb">144 min</text>
   <path d="M155 155 L280 182" class="cv-arrow" marker-end="url(#cvArr)"/><text x="210" y="196" text-anchor="middle" class="cv-small">− 15 % → × 0,85</text>
   <rect x="285" y="162" width="130" height="44" rx="10" class="cv-bad"/><text x="350" y="190" text-anchor="middle" class="cv-tb">102 min</text>
   <text x="440" y="130" class="cv-t">hausse de p % :</text><text x="440" y="150" class="cv-tb">× (1 + p/100)</text>
   <text x="440" y="178" class="cv-t">baisse de p % :</text><text x="440" y="198" class="cv-tb">× (1 − p/100)</text>`,'Barre de pourcentage et coefficients multiplicateurs'),
  legende:'Augmenter ou diminuer d’un pourcentage revient à multiplier par un coefficient.',
  retenir:['part = total × p ÷ 100','taux = part ÷ total × 100','évolution = (finale − initiale) ÷ initiale × 100'],
  methode:['Identifier le total (la référence qui vaut 100 %).','Pour une part : total × p ÷ 100.','Pour un taux : part ÷ total × 100.','Pour une évolution : diviser l’écart par la valeur initiale, jamais par la finale.'],
  exemple:{enonce:'Sur 40 contrôles, 6 sont non conformes. Taux de non-conformité ?',etapes:['Part = 6, total = 40','6 ÷ 40 = 0,15','0,15 × 100 = 15 %'],reponse:'15 %'},
  piege:'+10 % puis −10 % ne ramène pas au départ : 100 → 110 → 99. Le second pourcentage s’applique à 110, pas à 100.',
  tiin:'Un arrêt de tranche prévu sur 50 jours en dure 56 : (56 − 50) ÷ 50 × 100 = 12 % de dépassement.'},

 // 7 — Formules
 {accroche:'P = U × I, Q = V/t, v = d/t : une formule est un outil. On remplace, on calcule, et on n’oublie pas l’unité.',
  visuel:svg('0 0 600 240',`
   <path d="M150 20 L270 210 L30 210 Z" class="cv-tri"/><line x1="75" y1="135" x2="225" y2="135" class="cv-line-b"/><line x1="150" y1="135" x2="150" y2="210" class="cv-line-b"/>
   <text x="150" y="110" text-anchor="middle" class="cv-huge cv-brand-t">U</text><text x="105" y="190" text-anchor="middle" class="cv-huge">R</text><text x="195" y="190" text-anchor="middle" class="cv-huge">I</text>
   <text x="150" y="232" text-anchor="middle" class="cv-small">Cacher la grandeur cherchée : il reste la formule</text>
   <rect x="320" y="30" width="260" height="46" rx="10" class="cv-soft"/><text x="450" y="60" text-anchor="middle" class="cv-tb">U = R × I</text>
   <rect x="320" y="88" width="260" height="46" rx="10" class="cv-soft"/><text x="450" y="118" text-anchor="middle" class="cv-tb">R = U ÷ I</text>
   <rect x="320" y="146" width="260" height="46" rx="10" class="cv-soft"/><text x="450" y="176" text-anchor="middle" class="cv-tb">I = U ÷ R</text>
   <text x="450" y="222" text-anchor="middle" class="cv-small">U en V · R en Ω · I en A</text>`,'Triangle de la loi d’Ohm'),
  legende:'Le triangle aide à isoler une grandeur : ce qui est en haut se divise, ce qui est côte à côte se multiplie.',
  retenir:['P = U × I  (W, V, A)','U = R × I  (V, Ω, A)','Q = V ÷ t   ·   v = d ÷ t'],
  methode:['Écrire la formule et la grandeur cherchée.','Vérifier les unités (V, A, W, s, m…) et convertir si besoin.','Isoler la grandeur cherchée si elle n’est pas seule.','Remplacer, calculer, écrire le résultat avec son unité.'],
  exemple:{enonce:'Un radiateur de 2 300 W fonctionne sous 230 V. Intensité absorbée ?',etapes:['P = U × I, on cherche I','I = P ÷ U','I = 2 300 ÷ 230 = 10 A'],reponse:'10 A'},
  piege:'Mélanger les unités : une vitesse calculée avec des mm et des secondes est en mm/s, pas en m/s.',
  tiin:'Avant de consigner un moteur, on lit sa plaque : P = 4 kW sous 400 V triphasé. Les formules de puissance permettent de vérifier l’ordre de grandeur du courant mesuré à la pince.'},

 // 8 — Équations
 {accroche:'Combien de minutes pour vider la cuve jusqu’au niveau de sécurité ? Quand une inconnue est cachée dans une relation, on résout une équation.',
  visuel:svg('0 0 600 240',`${arrowDefs}
   <path d="M300 60 L300 200 M240 210 L360 210" class="cv-line-b"/><path d="M300 60 L285 40 L315 40 Z" class="cv-fill-ink"/>
   <line x1="90" y1="60" x2="510" y2="60" class="cv-line-b"/>
   <line x1="140" y1="60" x2="140" y2="100" class="cv-line"/><line x1="460" y1="60" x2="460" y2="100" class="cv-line"/>
   <rect x="70" y="100" width="140" height="56" rx="10" class="cv-brand"/><text x="140" y="136" text-anchor="middle" class="cv-t-on cv-big">3x + 7</text>
   <rect x="390" y="100" width="140" height="56" rx="10" class="cv-accent"/><text x="460" y="136" text-anchor="middle" class="cv-t-on cv-big">31</text>
   <text x="300" y="30" text-anchor="middle" class="cv-tb">la balance reste équilibrée</text>
   <text x="140" y="185" text-anchor="middle" class="cv-small">− 7 des deux côtés</text><text x="460" y="185" text-anchor="middle" class="cv-small">− 7 des deux côtés</text>
   <text x="300" y="235" text-anchor="middle" class="cv-t">3x = 24  →  ÷ 3 des deux côtés  →  x = 8</text>`,'Balance équilibrée pour résoudre une équation'),
  legende:'Une équation est une balance : ce qu’on fait d’un côté, on le fait de l’autre.',
  retenir:['x + b = c ⇒ x = c − b','k × x = c ⇒ x = c ÷ k','On termine toujours par une vérification'],
  methode:['Repérer l’inconnue et ce qui « l’entoure ».','Enlever d’abord ce qui est ajouté ou retranché (opération inverse des deux côtés).','Puis diviser par le nombre qui multiplie l’inconnue.','Vérifier en remplaçant x dans l’équation de départ.'],
  exemple:{enonce:'Résoudre 3x + 7 = 31.',etapes:['On retire 7 des deux côtés : 3x = 24','On divise par 3 : x = 8','Vérification : 3 × 8 + 7 = 31 ✓'],reponse:'x = 8'},
  piege:'« Passer de l’autre côté en changeant de signe » marche pour + et −, pas pour × : dans 3x = 24, on divise par 3, on ne retranche pas 3.',
  tiin:'Une cuve de 950 L doit garder 200 L ; la pompe retire 25 L/min : 950 − 25t = 200 ⇒ 25t = 750 ⇒ t = 30 min.'},

 // 9 — Géométrie
 {accroche:'Surface à peindre, section d’une tuyauterie, volume d’une cuve cylindrique : la géométrie sert à dimensionner.',
  visuel:svg('0 0 600 240',`
   <rect x="25" y="60" width="150" height="100" class="cv-shape"/><text x="100" y="180" text-anchor="middle" class="cv-t">L</text><text x="12" y="115" class="cv-t">l</text>
   <text x="100" y="40" text-anchor="middle" class="cv-tb">Rectangle</text><text x="100" y="210" text-anchor="middle" class="cv-small">S = L × l</text><text x="100" y="228" text-anchor="middle" class="cv-small">P = 2 × (L + l)</text>
   <circle cx="300" cy="110" r="55" class="cv-shape"/><line x1="300" y1="110" x2="355" y2="110" class="cv-line-b"/><circle cx="300" cy="110" r="3" class="cv-fill-ink"/><text x="327" y="102" text-anchor="middle" class="cv-tb cv-accent-t">R</text>
   <text x="300" y="40" text-anchor="middle" class="cv-tb">Disque</text><text x="300" y="190" text-anchor="middle" class="cv-small">S = π × R²</text><text x="300" y="208" text-anchor="middle" class="cv-small">P = 2 × π × R</text><text x="300" y="226" text-anchor="middle" class="cv-small">D = 2 × R</text>
   <ellipse cx="490" cy="72" rx="55" ry="14" class="cv-shape"/><path d="M435 72 L435 160 A55 14 0 0 0 545 160 L545 72" class="cv-shape-open"/>
   <line x1="560" y1="72" x2="560" y2="160" class="cv-line"/><text x="572" y="120" class="cv-t">h</text><line x1="490" y1="72" x2="545" y2="72" class="cv-line-b"/><text x="517" y="54" text-anchor="middle" class="cv-tb cv-accent-t">R</text>
   <text x="490" y="30" text-anchor="middle" class="cv-tb">Cylindre</text><text x="490" y="208" text-anchor="middle" class="cv-small">V = π × R² × h</text>`,'Rectangle, disque et cylindre avec leurs formules'),
  legende:'Aire en unité² (m², mm²), volume en unité³ (m³) : attention au rayon, c’est la moitié du diamètre.',
  retenir:['Disque : S = π × R²','Cylindre : V = π × R² × h','Pavé : V = L × l × h'],
  methode:['Reconnaître la forme et faire un croquis coté.','Mettre toutes les mesures dans la même unité.','Passer du diamètre au rayon : R = D ÷ 2.','Appliquer la formule et donner l’unité au carré (aire) ou au cube (volume).'],
  exemple:{enonce:'Cuve cylindrique : D = 1,2 m, h = 2 m. Volume en litres ?',etapes:['R = 1,2 ÷ 2 = 0,6 m','V = π × 0,6² × 2 = π × 0,36 × 2 ≈ 2,26 m³','2,26 m³ × 1 000 ≈ 2 262 L'],reponse:'≈ 2 262 L'},
  piege:'Utiliser le diamètre à la place du rayon multiplie l’aire par 4 : π × D² au lieu de π × R².',
  tiin:'Une tuyauterie DN 100 (environ 100 mm de diamètre intérieur) a une section de π × 50² ≈ 7 854 mm² ≈ 78,5 cm² : c’est elle qui fixe la vitesse du fluide pour un débit donné.'},

 // 10 — Pythagore et trigonométrie
 {accroche:'Longueur d’une élingue, angle d’une échelle, diagonale d’une trémie : tout triangle rectangle se résout avec Pythagore ou la trigonométrie.',
  visuel:svg('0 0 600 240',`
   <path d="M60 200 L300 200 L300 40 Z" class="cv-tri"/><path d="M285 200 L285 185 L300 185" class="cv-line"/>
   <path d="M105 200 A45 45 0 0 0 97 175" class="cv-arrow-a"/><text x="118" y="190" class="cv-tb cv-accent-t">α</text>
   <text x="180" y="225" text-anchor="middle" class="cv-tb">adjacent</text><text x="312" y="125" class="cv-tb">opposé</text>
   <text x="160" y="108" text-anchor="middle" class="cv-tb cv-brand-t" transform="rotate(-33 160 108)">hypoténuse</text>
   <rect x="380" y="20" width="200" height="46" rx="10" class="cv-brand"/><text x="480" y="50" text-anchor="middle" class="cv-t-on cv-tb2">c² = a² + b²</text>
   <rect x="380" y="78" width="200" height="40" rx="10" class="cv-soft"/><text x="480" y="104" text-anchor="middle" class="cv-t">cos α = adj ÷ hyp</text>
   <rect x="380" y="126" width="200" height="40" rx="10" class="cv-soft"/><text x="480" y="152" text-anchor="middle" class="cv-t">sin α = opp ÷ hyp</text>
   <rect x="380" y="174" width="200" height="40" rx="10" class="cv-soft"/><text x="480" y="200" text-anchor="middle" class="cv-t">tan α = opp ÷ adj</text>
   <text x="480" y="234" text-anchor="middle" class="cv-small">astuce : SOH · CAH · TOA</text>`,'Triangle rectangle : côtés et formules'),
  legende:'L’hypoténuse est en face de l’angle droit, c’est le plus long côté. « Opposé » et « adjacent » dépendent de l’angle α choisi.',
  retenir:['c² = a² + b²  (c : hypoténuse)','côté = √(c² − a²)','angle = cos⁻¹, sin⁻¹ ou tan⁻¹ du rapport'],
  methode:['Vérifier que le triangle est rectangle et repérer l’hypoténuse.','Deux côtés connus, un côté cherché → Pythagore.','Un angle en jeu → nommer opposé / adjacent / hypoténuse par rapport à cet angle, choisir cos, sin ou tan.','Calculatrice en mode degrés pour les angles.'],
  exemple:{enonce:'Une échelle de 5 m a son pied à 1,5 m du mur. Hauteur atteinte et angle avec le sol ?',etapes:['Hauteur² = 5² − 1,5² = 25 − 2,25 = 22,75','Hauteur = √22,75 ≈ 4,77 m','cos α = 1,5 ÷ 5 = 0,3 ⇒ α = cos⁻¹(0,3) ≈ 72,5°'],reponse:'≈ 4,77 m ; ≈ 72,5°'},
  piege:'La calculatrice en mode radians donne cos(60) ≈ −0,95 au lieu de 0,5. Vérifier le « D » ou « DEG » à l’écran.',
  tiin:'Pour une élingue à deux brins, plus l’angle entre les brins est ouvert, plus chaque brin est tendu : la trigonométrie explique les tableaux de charge des élingues.'},

 // 11 — Lecture de données
 {accroche:'Courbe de température, relevé de débit de dose, tableau de suivi : savoir lire un graphique, c’est savoir lire une installation.',
  visuel:svg('0 0 600 250',`${arrowDefs}
   <line x1="60" y1="210" x2="580" y2="210" class="cv-line" marker-end="url(#cvArr)"/><line x1="60" y1="210" x2="60" y2="20" class="cv-line" marker-end="url(#cvArr)"/>
   ${[0,5,10,15,20].map((t,i)=>`<line x1="${60+i*120}" y1="205" x2="${60+i*120}" y2="215" class="cv-line"/><text x="${60+i*120}" y="232" text-anchor="middle" class="cv-small">${t}</text>`).join('')}
   ${[20,40,60,80].map((v,i)=>`<line x1="55" y1="${190-i*45}" x2="575" y2="${190-i*45}" class="cv-grid"/><text x="48" y="${194-i*45}" text-anchor="end" class="cv-small">${v}</text>`).join('')}
   <polyline points="60,190 180,163 300,127 420,98 540,82" class="cv-curve"/>
   <line x1="300" y1="210" x2="300" y2="127" class="cv-read"/><line x1="300" y1="127" x2="60" y2="127" class="cv-read"/><circle cx="300" cy="127" r="6" class="cv-fill-accent"/>
   <text x="312" y="148" class="cv-tb cv-accent-t">t = 10 min → 48 °C</text>
   <text x="580" y="246" text-anchor="end" class="cv-small">temps (min)</text><text x="66" y="16" class="cv-small">température (°C)</text>
   <rect x="380" y="158" width="190" height="44" rx="8" class="cv-soft"/><text x="475" y="178" text-anchor="middle" class="cv-small">variation moyenne 0 → 20 min</text><text x="475" y="195" text-anchor="middle" class="cv-tb">(68 − 20) ÷ 20 = 2,4 °C/min</text>`,'Lecture d’une courbe de température'),
  legende:'Pour lire une valeur : on part de l’axe horizontal, on monte jusqu’à la courbe, on lit sur l’axe vertical.',
  retenir:['Lire : titre → axes → unités → graduation','Écart = valeur finale − valeur initiale','Variation moyenne = écart ÷ durée'],
  methode:['Lire le titre et les deux axes : quelle grandeur, quelle unité ?','Repérer la valeur d’une graduation (de 1 en 1 ? de 5 en 5 ?).','Placer le point de lecture et tracer les pointillés jusqu’aux axes.','Pour une évolution : écart entre deux points, divisé par la durée si on veut un « par minute ».'],
  exemple:{enonce:'La température passe de 20 °C à t = 0 à 68 °C à t = 20 min. Variation moyenne ?',etapes:['Écart : 68 − 20 = 48 °C','Durée : 20 − 0 = 20 min','48 ÷ 20 = 2,4 °C/min'],reponse:'2,4 °C/min'},
  piege:'Compter les carreaux au lieu de lire la graduation : si une graduation vaut 5, trois carreaux font 15, pas 3.',
  tiin:'Sur une courbe de décroissance radioactive, la lecture graphique permet de retrouver la période : le temps au bout duquel l’activité est divisée par 2.'}
 ];
 root.MathsCours=COURS;if(typeof module!=='undefined'&&module.exports)module.exports=COURS;
})(globalThis);
