(function(root){
 const THEMES=[
  {name:'Calcul numérique',short:'Calcul',desc:'Priorités, opérations et ordre de grandeur',icon:'<path d="M5 4h14v16H5zM8 8h8M8 12h2M14 12h2M8 16h2M14 16h2"/>'},
  {name:'Nombres relatifs',short:'Relatifs',desc:'Signes, écarts et variations',icon:'<path d="M4 12h16M12 4v16M6 8h4M16 7v2M15 8h2"/>'},
  {name:'Fractions',short:'Fractions',desc:'Simplifier, calculer et interpréter',icon:'<path d="M7 7h4M13 17h4M6 12h12M8 4v6M16 14v6"/>'},
  {name:'Puissances de 10',short:'Puissances',desc:'Notation scientifique et ordres de grandeur',icon:'<path d="M5 17h7M8.5 17V7l-3 2M15 8h4l-4 5h4"/>'},
  {name:'Unités et conversions',short:'Conversions',desc:'Longueur, volume, débit, puissance et intensité',icon:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>'},
  {name:'Proportionnalité',short:'Proportionnalité',desc:'Règle de trois, échelles et débits',icon:'<path d="M5 18 19 6M6 6h4v4H6zM14 14h4v4h-4z"/>'},
  {name:'Pourcentages',short:'Pourcentages',desc:'Part, évolution et diminution',icon:'<path d="M5 19 19 5M7 7h.01M17 17h.01"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>'},
  {name:'Formules',short:'Formules',desc:'Remplacer, calculer et isoler une grandeur',icon:'<path d="M5 5h6l-4 14h6M14 8h5M14 16h5"/>'},
  {name:'Équations',short:'Équations',desc:'Trouver l’inconnue dans une relation simple',icon:'<path d="M5 8h5M5 16h5M14 8h5M14 16h5M10 12h4"/>'},
  {name:'Géométrie',short:'Géométrie',desc:'Périmètres, surfaces et volumes',icon:'<rect x="5" y="5" width="14" height="14" rx="1"/><circle cx="12" cy="12" r="4"/>'},
  {name:'Pythagore et trigonométrie',short:'Pythagore / trigo',desc:'Diagonales, triangles rectangles et angles',icon:'<path d="M5 19h14L5 5zM5 14h5v5"/>'},
  {name:'Lecture de données',short:'Données',desc:'Tableaux, graphiques et variations',icon:'<path d="M4 19V5M4 19h16M7 15l4-5 3 2 5-6"/>'}
 ];
 const refs=[
  {title:'Priorités de calcul',html:'<div class="formula">( ) → × et ÷ → + et −</div><p>On effectue d’abord les parenthèses, puis les multiplications et divisions.</p>'},
  {title:'Fractions',html:'<div class="formula">a/b + c/b = (a+c)/b</div><p>Pour additionner deux fractions, il faut d’abord les mettre au même dénominateur.</p>'},
  {title:'Puissances de 10',html:'<div class="formula">10ᵃ × 10ᵇ = 10ᵃ⁺ᵇ</div><div class="formula">10ᵃ / 10ᵇ = 10ᵃ⁻ᵇ</div>'},
  {title:'Préfixes',html:'<ul><li>kilo k = 10³</li><li>milli m = 10⁻³</li><li>micro µ = 10⁻⁶</li><li>méga M = 10⁶</li></ul>'},
  {title:'Proportionnalité',html:'<div class="formula">a/b = c/x ⇒ x = b×c/a</div><p>Avant le produit en croix, vérifier que les grandeurs sont bien proportionnelles.</p>'},
  {title:'Pourcentage',html:'<div class="formula">part = total × p/100</div><div class="formula">évolution = (final−initial)/initial ×100</div>'},
  {title:'Vitesse et débit',html:'<div class="formula">v = d/t</div><div class="formula">Q = V/t</div><p>Toujours harmoniser les unités avant le calcul.</p>'},
  {title:'Électricité',html:'<div class="formula">P = U × I</div><div class="formula">U = R × I</div><p>Puissance en W, tension en V, intensité en A.</p>'},
  {title:'Aires',html:'<div class="formula">Rectangle : S = L×l</div><div class="formula">Disque : S = πR²</div>'},
  {title:'Volumes',html:'<div class="formula">Pavé : V = L×l×h</div><div class="formula">Cylindre : V = πR²h</div>'},
  {title:'Pythagore',html:'<div class="formula">c² = a² + b²</div><p>Uniquement dans un triangle rectangle ; c est l’hypoténuse.</p>'},
  {title:'Trigonométrie',html:'<div class="formula">cos α = adjacent / hypoténuse</div><div class="formula">sin α = opposé / hypoténuse</div><div class="formula">tan α = opposé / adjacent</div>'}
 ];
 const rint=(a,b,r=Math.random)=>Math.floor(r()*(b-a+1))+a;
 const pick=(a,r=Math.random)=>a[rint(0,a.length-1,r)];
 const round=(x,n=4)=>Number(x.toFixed(n));
 const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
 const fr=x=>String(x).replace('.',',');
 const SUP={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
 const sup=n=>String(n).split('').map(c=>SUP[c]).join('');
 function ex(theme,level,random=Math.random){
  if(theme<0||theme>=THEMES.length||![1,2,3].includes(level))throw Error('Paramètres invalides');
  const I=(a,b)=>rint(a,b,random),P=a=>pick(a,random);let q,a,unit='',hints=[],corr='',visual='';
  if(theme===0){
   if(level===1){const x=I(3,18),y=I(2,9),z=I(2,8);q=`Calculer : ${x} + ${y} × ${z}`;a=x+y*z;hints=['Commence par repérer l’opération prioritaire.','La multiplication se fait avant l’addition.'];corr=`${y} × ${z} = ${y*z}, puis ${x} + ${y*z} = ${a}.`}
   else if(level===2){const x=I(4,14),y=I(2,8),z=I(2,7);q=`Calculer : (${x} + ${y}) × ${z} − ${y}`;a=(x+y)*z-y;hints=['Commence par la parenthèse.','Calcule ensuite la multiplication, puis la soustraction.'];corr=`(${x}+${y})=${x+y} ; ${x+y}×${z}=${(x+y)*z} ; ${(x+y)*z}−${y}=${a}.`}
   else{const n=I(3,8),price=I(12,38),discount=P([5,10,15]);q=`Pour préparer une intervention, on commande ${n} pièces à ${price} € l’unité. Le fournisseur applique ${discount} % de remise sur l’ensemble. Quel est le montant à payer ?`;a=n*price*(1-discount/100);unit='€';hints=['Calcule d’abord le prix avant remise.','La remise vaut prix × pourcentage / 100.'];corr=`Prix initial : ${n}×${price}=${n*price} €. Remise : ${round(n*price*discount/100,2)} €. Montant final : ${round(a,2)} €.`}
  }else if(theme===1){
   if(level===1){const x=-I(2,12),y=I(4,15);q=`Calculer : ${x} + ${y}`;a=x+y;hints=['Les deux nombres ont des signes différents.','Compare leurs valeurs absolues puis conserve le signe du plus grand en valeur absolue.'];corr=`${x} + ${y} = ${a}.`}
   else if(level===2){const x=-I(3,10),y=-I(2,8),z=I(2,5);q=`Calculer : (${x}) − (${y}) × ${z}`;a=x-y*z;hints=['Effectue la multiplication en premier.','Le produit d’un nombre négatif par un positif est négatif.'];corr=`(${y})×${z}=${y*z}. Donc ${x}−(${y*z})=${a}.`}
   else{const start=I(18,30),end=I(2,12);q=`La température d’un équipement passe de ${start} °C à ${end} °C. Quelle est la variation ΔT = Tfinale − Tinitiale ?`;a=end-start;unit='°C';hints=['Une variation se calcule : valeur finale − valeur initiale.','Une baisse donne une variation négative.'];corr=`ΔT = ${end} − ${start} = ${a} °C.`}
  }else if(theme===2){
   if(level===1){let n=I(2,9),d=I(n+1,12);const k=P([1,2]);n*=k;d*=k;q=`Calculer la valeur de la fraction ${n}/${d}. Tu peux répondre avec une fraction équivalente ou un nombre décimal.`;a=n/d;hints=['Tu peux simplifier le numérateur et le dénominateur par un même nombre.','Une fraction représente aussi une division.'];corr=`${n}/${d} = ${round(a,4)}.`}
   else if(level===2){const d=P([4,5,8,10]),n1=I(1,d-1),n2=I(1,d-1);q=`Calculer : ${n1}/${d} + ${n2}/${d}`;a=(n1+n2)/d;hints=['Les deux fractions ont déjà le même dénominateur.','Additionne les numérateurs et garde le dénominateur.'];corr=`(${n1}+${n2})/${d} = ${n1+n2}/${d} = ${round(a,4)}.`}
   else{const cap=P([120,160,200,240]),num=P([1,2,3]),den=4;q=`Une cuve de ${cap} L est remplie aux ${num}/${den}. Quel volume contient-elle ?`;a=cap*num/den;unit='L';hints=['Cherche la fraction de la capacité totale.','Multiplie la capacité par le numérateur puis divise par le dénominateur.'];corr=`${cap} × ${num}/${den} = ${a} L.`}
  }else if(theme===3){
   if(level===1){const p=I(-6,6);q=`Calculer 10${sup(p)}.`;a=10**p;hints=['Un exposant négatif donne un nombre inférieur à 1.','10⁻ⁿ = 1 / 10ⁿ.'];corr=`10${sup(p)} = ${fr(a)}.`}
   else if(level===2){const p1=I(-4,5),p2=I(-4,5);q=`Trouver l’exposant n : 10${sup(p1)} × 10${sup(p2)} = 10ⁿ.`;a=p1+p2;hints=['Lors d’un produit de puissances de même base, on additionne les exposants.'];corr=`n = ${p1} + (${p2}) = ${a}.`}
   else{const D=P([12,25,40,80,150,250]),t=P([0.5,1.5,2,3,4]);q=`En zone contrôlée, le débit de dose mesuré est de ${D} µSv/h. Un intervenant y travaille ${fr(t)} h. Quelle dose reçoit-il, en mSv ?`;a=D*t/1000;unit='mSv';hints=['Calcule d’abord la dose en µSv : débit × durée.','1 mSv = 10³ µSv : divise par 1000.'];corr=`Dose = ${D} × ${fr(t)} = ${fr(D*t)} µSv = ${fr(D*t)} × 10⁻³ mSv = ${fr(round(a,4))} mSv.`}
  }else if(theme===4){
   if(level===1){const mm=I(120,950);q=`Convertir ${mm} mm en m.`;a=mm/1000;unit='m';hints=['1 m = 1000 mm.','Pour passer de mm à m, divise par 1000.'];corr=`${mm}/1000 = ${fr(a)} m.`}
   else if(level===2){const l=P([1.2,1.5,2.4,3.6]);q=`Convertir ${fr(l)} m³ en litres.`;a=l*1000;unit='L';hints=['1 m³ = 1000 L.'];corr=`${fr(l)} × 1000 = ${fr(a)} L.`}
   else{const ql=I(12,45),min=I(4,18);q=`Une pompe débite ${ql} L/min pendant ${min} min. Quel volume a-t-elle transféré, en m³ ?`;a=ql*min/1000;unit='m³';hints=['Calcule d’abord le volume en litres.','Puis utilise 1000 L = 1 m³.'];corr=`V = ${ql}×${min} = ${ql*min} L = ${round(a,3)} m³.`}
  }else if(theme===5){
   if(level===1){const a0=I(2,8),b0=I(6,24),x=I(3,12);q=`${a0} pièces correspondent à ${b0} minutes de travail. Au même rythme, combien de minutes faut-il pour ${x} pièces ?`;a=b0*x/a0;unit='min';hints=['Les grandeurs sont proportionnelles.','Temps par pièce = temps total / nombre de pièces.'];corr=`${b0}/${a0} = ${round(b0/a0,3)} min/pièce ; pour ${x} pièces : ${round(a,3)} min.`}
   else if(level===2){const scale=P([5,10,20]),draw=I(12,55);q=`Sur un plan à l’échelle 1:${scale}, une longueur mesure ${draw} mm. Quelle est la longueur réelle ?`;a=draw*scale;unit='mm';hints=['À l’échelle 1:n, 1 mm sur le plan représente n mm en réel.'];corr=`${draw}×${scale} = ${a} mm.`}
   else{const flow=I(15,40),vol=I(3,8)*100;q=`Une pompe débite ${flow} L/min. Combien de temps faut-il théoriquement pour transférer ${vol} L ?`;a=vol/flow;unit='min';hints=['t = V / Q.','Le volume est déjà en litres et le débit en L/min : les unités sont cohérentes.'];corr=`t = ${vol}/${flow} = ${round(a,2)} min.`}
  }else if(theme===6){
   if(level===1){const p=P([5,10,20,25]),n=I(80,400);q=`Calculer ${p} % de ${n}.`;a=n*p/100;hints=['p % signifie p/100.'];corr=`${n}×${p}/100 = ${a}.`}
   else if(level===2){const init=I(80,200),p=P([5,10,15,20]);q=`Une durée initiale de ${init} min diminue de ${p} %. Quelle est la nouvelle durée ?`;a=init*(1-p/100);unit='min';hints=['Calcule la diminution, puis retire-la à la valeur initiale.'];corr=`Diminution : ${round(init*p/100,2)} min ; nouvelle durée : ${round(a,2)} min.`}
   else{const total=P([20,25,40,50]),bad=I(2,Math.floor(total/4));q=`Sur ${total} contrôles, ${bad} présentent un défaut. Quel pourcentage cela représente-t-il ?`;a=bad/total*100;unit='%';hints=['Pourcentage = part / total × 100.'];corr=`${bad}/${total}×100 = ${round(a,2)} %.`}
  }else if(theme===7){
   if(level===1){const U=P([24,48,230]),I0=P([0.5,1.5,2,3,5]);q=`Calculer la puissance P = U × I pour U = ${U} V et I = ${fr(I0)} A.`;a=U*I0;unit='W';hints=['Remplace directement U et I dans la formule.'];corr=`P = ${U}×${fr(I0)} = ${fr(a)} W.`}
   else if(level===2){const d=I(80,400),t=I(10,50);q=`Avec v = d/t, calculer v pour d = ${d} m et t = ${t} s.`;a=d/t;unit='m/s';hints=['La distance et le temps sont déjà dans des unités compatibles.'];corr=`v = ${d}/${t} = ${round(a,3)} m/s.`}
   else{const P0=P([460,920,1150,2300]),U=230;q=`Un équipement électrique absorbe ${P0} W sous ${U} V. À partir de P = U × I, calculer l’intensité I.`;a=P0/U;unit='A';hints=['Il faut isoler I : I = P/U.'];corr=`I = ${P0}/${U} = ${round(a,2)} A.`}
  }else if(theme===8){
   if(level===1){const x=I(2,15),b=I(2,12);q=`Résoudre : x + ${b} = ${x+b}.`;a=x;hints=[`Retire ${b} des deux côtés de l’égalité.`];corr=`x = ${x+b} − ${b} = ${x}.`}
   else if(level===2){const x=I(2,12),k=I(2,7),b=I(1,9),rhs=k*x+b;q=`Résoudre : ${k}x + ${b} = ${rhs}.`;a=x;hints=[`Commence par retirer ${b} des deux côtés.`,`Puis divise par ${k}.`];corr=`${k}x = ${rhs-b}, donc x = ${rhs-b}/${k} = ${x}.`}
   else{const flow=I(12,35),time=I(8,20),reserve=I(15,40);const total=flow*time+reserve;q=`Une cuve contient ${total} L. Après une opération, il doit rester ${reserve} L. Une pompe retire ${flow} L/min. Résoudre ${total} − ${flow}t = ${reserve} pour trouver la durée t.`;a=time;unit='min';hints=[`Déplace d’abord ${reserve} : ${total-reserve} = ${flow}t.`,`Puis divise par ${flow}.`];corr=`${flow}t = ${total-reserve}; t = ${total-reserve}/${flow} = ${time} min.`}
  }else if(theme===9){
   if(level===1){const L=I(8,20),l=I(4,10);q=`Calculer l’aire d’un rectangle de ${L} cm par ${l} cm.`;a=L*l;unit='cm²';hints=['Aire du rectangle : S = L × l.'];corr=`S = ${L}×${l} = ${a} cm².`}
   else if(level===2){const d=P([40,50,60,80,100]);q=`Calculer l’aire d’un disque de diamètre ${d} mm. Prendre π ≈ 3,1416.`;a=Math.PI*(d/2)**2;unit='mm²';hints=['Le rayon vaut la moitié du diamètre.','S = πR².'];corr=`R = ${d/2} mm ; S = π×${d/2}² ≈ ${round(a,1)} mm².`}
   else{const d=P([100,120,160,200]),h=P([200,250,300,400]);q=`Un cylindre a un diamètre intérieur de ${d} mm et une longueur de ${h} mm. Calculer son volume en litres.`;a=Math.PI*(d/2)**2*h/1e6;unit='L';hints=['Volume : V = πR²h.','1 L = 1 000 000 mm³.'];corr=`V = π×${d/2}²×${h} ≈ ${round(a*1e6,0)} mm³ = ${round(a,3)} L.`}
  }else if(theme===10){
   if(level===1){const a0=P([3,5,6,8]),b0=P([4,12,8,15]);q=`Un triangle rectangle a pour côtés de l’angle droit ${a0} m et ${b0} m. Calculer l’hypoténuse.`;a=Math.hypot(a0,b0);unit='m';hints=['Utilise le théorème de Pythagore : c² = a² + b².'];corr=`c = √(${a0}²+${b0}²) = ${round(a,3)} m.`}
   else if(level===2){const angle=P([30,45,60]),hyp=P([100,120,200]);q=`Dans un triangle rectangle, l’hypoténuse mesure ${hyp} mm et un angle vaut ${angle}°. Calculer le côté adjacent à cet angle.`;a=hyp*Math.cos(angle*Math.PI/180);unit='mm';hints=['cos(angle) = adjacent / hypoténuse.','Donc adjacent = hypoténuse × cos(angle).'];corr=`Adjacent = ${hyp}×cos(${angle}°) ≈ ${round(a,1)} mm.`}
   else{const opp=P([40,60,80]),adj=P([80,100,120]);q=`Pour contrôler une inclinaison, on mesure ${opp} mm de dénivelé pour ${adj} mm horizontalement. Calculer l’angle α avec tan α = opposé/adjacent.`;a=Math.atan(opp/adj)*180/Math.PI;unit='°';hints=['Calcule d’abord le rapport opposé/adjacent.','Puis utilise la fonction arctan (tan⁻¹) de la calculatrice.'];corr=`α = arctan(${opp}/${adj}) ≈ ${round(a,1)}°.`}
  }else{
   const values=[20,32,48,61,70].map(v=>v+I(-3,3));const times=[0,5,10,15,20];visual=chart(times,values,'Temps (min)','Température (°C)');
   if(level===1){const idx=I(1,3);q=`Lire le graphique : quelle est la température à t = ${times[idx]} min ?`;a=values[idx];unit='°C';hints=['Repère le temps sur l’axe horizontal, puis remonte jusqu’au point.'];corr=`À ${times[idx]} min, le point correspond à ${values[idx]} °C.`}
   else if(level===2){q=`À partir du graphique, calculer l’augmentation de température entre 5 min et 15 min.`;a=values[3]-values[1];unit='°C';hints=['Lis les deux températures puis calcule valeur finale − valeur initiale.'];corr=`ΔT = ${values[3]} − ${values[1]} = ${a} °C.`}
   else{q=`Le relevé correspond à une montée en température d’un équipement. Calculer l’augmentation moyenne de température par minute entre 0 et 20 min.`;a=(values[4]-values[0])/20;unit='°C/min';hints=['Calcule d’abord la variation totale de température.','Puis divise cette variation par 20 min.'];corr=`(${values[4]}−${values[0]})/20 = ${round(a,2)} °C/min.`}
  }
  return {theme,level,question:q,answer:a,unit,hints,correction:corr,visual,exact:Number.isInteger(a)};
 }
 // Saisie acceptée : 12,5 · -4.2 · 3/4 · 1e-3 · 2,5×10^-3 · 2.5*10^3 · 10^-6 · signe moins typographique
 function parse(v){
  let s=String(v??'').trim().replace(/[\s  ]/g,'').replace(/[−–]/g,'-').replace(/,/g,'.').replace(/[x×·]/gi,'*');
  if(!s)return NaN;
  const num='[-+]?(?:\\d+\\.?\\d*|\\.\\d+)';
  let m;
  if(new RegExp(`^${num}/${num}$`).test(s)){const [a,b]=s.split('/').map(Number);return b?a/b:NaN}
  if((m=s.match(new RegExp(`^(${num})\\*10\\^\\(?([-+]?\\d+)\\)?$`))))return Number(m[1])*10**Number(m[2]);
  if((m=s.match(/^([-+]?)10\^\(?([-+]?\d+)\)?$/)))return (m[1]==='-'?-1:1)*10**Number(m[2]);
  if(new RegExp(`^${num}(?:e[-+]?\\d+)?$`,'i').test(s))return Number(s);
  return NaN}
 // Nombre de décimales tapées (pour accepter un arrondi correct de la valeur exacte)
 function decimals(v){const s=String(v).replace(',','.');if(/[e^\/]/i.test(s))return null;const i=s.indexOf('.');return i<0?0:s.length-i-1}
 function accepted(e,n,raw){
  const a=e.answer;
  if(e.exact)return Math.abs(n-a)<1e-9;
  if(a!==0&&Math.abs(n-a)<=Math.abs(a)*0.01)return true;          // écart relatif ≤ 1 %
  const d=decimals(raw);                                           // ou arrondi correct de la valeur exacte
  if(d!=null&&d>0&&Math.abs(n-Number(a.toFixed(d)))<1e-9){const sd=Math.abs(n)>=1?String(Math.floor(Math.abs(n))).length+d:(String(n).replace(/^-?0\.0*/,'').length);return sd>=2}
  return false}
 function check(e,v){const n=parse(v);if(!Number.isFinite(n))return {ok:false,input:true,message:'Je ne reconnais pas ce nombre. Exemples acceptés : 12,5 · 3/4 · 2,5×10^-3 · 1e-3.'};const ok=accepted(e,n,String(v).trim().replace(/[\s  ]/g,''));return {ok,value:n,message:ok?'Correct. Le résultat est cohérent.':'Ce n’est pas encore le bon résultat. Reprends les étapes ou demande un indice.'}}
 function chart(xs,ys,xlab,ylab){const W=560,H=190,p=34,minY=Math.min(...ys)-5,maxY=Math.max(...ys)+5;const X=i=>p+i*(W-2*p)/(xs.length-1),Y=v=>H-p-(v-minY)*(H-2*p)/(maxY-minY);const pts=ys.map((v,i)=>`${X(i)},${Y(v)}`).join(' ');return `<div class="exercise-visual"><svg class="mini-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Graphique ${ylab} en fonction du temps">${[0,1,2,3,4].map(i=>`<line class="grid" x1="${p}" y1="${p+i*(H-2*p)/4}" x2="${W-p}" y2="${p+i*(H-2*p)/4}"/>`).join('')}<line class="axis" x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}"/><line class="axis" x1="${p}" y1="${p}" x2="${p}" y2="${H-p}"/><polyline class="curve" points="${pts}"/>${ys.map((v,i)=>`<circle class="point" cx="${X(i)}" cy="${Y(v)}" r="4"/><text x="${X(i)}" y="${H-12}" text-anchor="middle">${xs[i]}</text><text x="${X(i)+5}" y="${Y(v)-8}">${v}</text>`).join('')}<text x="${W-85}" y="${H-3}">${xlab}</text><text x="6" y="14">${ylab}</text></svg></div>`}
 root.MathsExercises={THEMES,refs,generate:ex,check,parse};if(typeof module!=='undefined'&&module.exports)module.exports=root.MathsExercises;
})(globalThis);
