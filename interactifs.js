// Maths TIIN — exercices interactifs : trouver l'erreur, remettre en ordre, toucher le schéma, choisir la bonne réponse.
(function(root){
 const nf=(x,d=3)=>Number(x.toFixed(d)).toLocaleString('fr-FR',{maximumFractionDigits:d});
 const sg=x=>x<0?'−'+nf(-x):nf(x);
 const shuffle=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const KIND={erreur:'Trouve l’erreur',ordre:'Remets dans l’ordre',toucher:'Touche le schéma',choix:'Choisis la bonne réponse'};

 // ---------- Trouver l'erreur : lignes d'un calcul d'apprenti, une seule est fausse ----------
 const ERR={
  0:(I,P)=>{const a=I(3,12),b=I(2,9),c=I(2,9);return {q:`Calculer ${a} + ${b} × ${c}.`,lines:[`${a} + ${b} × ${c}`,`= ${a+b} × ${c}`,`= ${(a+b)*c}`],bad:1,why:`La multiplication passe avant l’addition : ${b} × ${c} = ${b*c}, puis ${a} + ${b*c} = ${a+b*c}.`}},
  1:(I,P)=>{const ti=-I(2,9),tf=I(5,20);return {q:`La température passe de ${sg(ti)} °C à ${tf} °C. Calculer ΔT.`,lines:[`ΔT = ${tf} − (${sg(ti)})`,`ΔT = ${tf} − ${-ti}`,`ΔT = ${tf+ti} °C`],bad:1,why:`Soustraire un négatif revient à ajouter : ${tf} − (${sg(ti)}) = ${tf} + ${-ti} = ${tf-ti} °C.`}},
  2:(I,P)=>{const d=P([4,5,6,8]),n1=I(1,d-2),n2=I(1,d-n1-1);return {q:`Calculer ${n1}/${d} + ${n2}/${d}.`,lines:[`${n1}/${d} + ${n2}/${d}`,`= ${n1+n2}/${2*d}`,`= ${nf((n1+n2)/(2*d))}`],bad:1,why:`On n’additionne pas les dénominateurs : ${n1}/${d} + ${n2}/${d} = ${n1+n2}/${d} ≈ ${nf((n1+n2)/d)}.`}},
  3:(I,P)=>{const D=P([20,25,40,60]),t=P([2,3,4]);return {q:`Débit de dose ${D} µSv/h pendant ${t} h. Dose en mSv ?`,lines:[`Dose = ${D} × ${t}`,`Dose = ${D*t} µSv`,`Dose = ${D*t} × 1 000 = ${nf(D*t*1000)} mSv`],bad:2,why:`µSv → mSv : l’unité est 1 000 fois plus grande, donc on divise : ${D*t} ÷ 1 000 = ${nf(D*t/1000)} mSv.`}},
  4:(I,P)=>{const L=P([2,3,4]),l=P([1.5,2,2.5]);return {q:`Une plaque mesure ${nf(L)} m × ${nf(l)} m. Surface en cm² ?`,lines:[`S = ${nf(L)} × ${nf(l)} = ${nf(L*l)} m²`,`1 m² = 100 cm²`,`S = ${nf(L*l*100)} cm²`],bad:1,why:`1 m² = 100 cm × 100 cm = 10 000 cm², donc S = ${nf(L*l*10000)} cm².`}},
  5:(I,P)=>{const T=P([30,40,60,90]);return {q:`Une pompe vide une cuve en ${T} min. Combien de temps avec deux pompes identiques ?`,lines:[`1 pompe → ${T} min`,`2 pompes → 2 × ${T} = ${2*T} min`,`Il faut ${2*T} min`],bad:1,why:`Deux pompes vont deux fois plus vite : le temps est divisé par 2, soit ${T/2} min. Ce n’est pas une situation de proportionnalité directe.`}},
  6:(I,P)=>{const v=P([100,200,400,500]),p=P([10,20]);return {q:`Un prix de ${v} € augmente de ${p} %, puis baisse de ${p} %. Prix final ?`,lines:[`Après la hausse : ${v} × ${nf(1+p/100,2)} = ${nf(v*(1+p/100))} €`,`Après la baisse : on revient à ${v} €`,`Prix final : ${v} €`],bad:1,why:`La baisse s’applique à ${nf(v*(1+p/100))} € : ${nf(v*(1+p/100))} × ${nf(1-p/100,2)} = ${nf(v*(1+p/100)*(1-p/100))} €.`}},
  7:(I,P)=>{const d=P([300,450,600,900]),t=P([2,3,5]);return {q:`Une tige de vérin parcourt ${d} mm en ${t} s. Vitesse en m/s ?`,lines:[`v = d ÷ t`,`v = ${d} ÷ ${t} = ${nf(d/t)}`,`v = ${nf(d/t)} m/s`],bad:2,why:`La distance est en mm : v = ${nf(d/t)} mm/s = ${nf(d/t/1000)} m/s.`}},
  8:(I,P)=>{const x=I(2,9),k=I(2,6),b=I(2,12),c=k*x+b;return {q:`Résoudre ${k}x + ${b} = ${c}.`,lines:[`${k}x + ${b} = ${c}`,`${k}x = ${c} + ${b} = ${c+b}`,`x = ${c+b} ÷ ${k} = ${nf((c+b)/k)}`],bad:1,why:`Pour enlever + ${b}, on retire ${b} des deux côtés : ${k}x = ${c-b}, donc x = ${x}.`}},
  9:(I,P)=>{const D=P([40,60,80,100]);return {q:`Aire de la section d’un tuyau de diamètre ${D} mm ?`,lines:[`D = ${D} mm`,`S = π × ${D}² = ${nf(Math.PI*D*D,0)} mm²`,`S ≈ ${nf(Math.PI*D*D/100,1)} cm²`],bad:1,why:`La formule utilise le rayon R = ${D/2} mm : S = π × ${D/2}² ≈ ${nf(Math.PI*D*D/4,0)} mm².`}},
  10:(I,P)=>{const [a,b,c]=P([[3,4,5],[6,8,10],[5,12,13],[9,12,15]]);return {q:`Triangle rectangle : côtés de l’angle droit ${a} m et ${b} m. Hypoténuse ?`,lines:[`c² = ${a}² + ${b}²`,`c² = ${a*a} + ${b*b} = ${c*c}`,`c = ${c*c} m`],bad:2,why:`On a trouvé c², il faut prendre la racine carrée : c = √${c*c} = ${c} m.`}},
  11:(I,P)=>{const n=I(2,5),g=P([5,10]),base=P([20,40]);return {q:`Sur un graphique, une graduation vaut ${g} °C. Le point est ${n} graduations au-dessus de ${base} °C. Température ?`,lines:[`Une graduation = ${g} °C`,`Le point est à ${n} graduations au-dessus de ${base} °C`,`T = ${base} + ${n} = ${base+n} °C`],bad:2,why:`Chaque graduation vaut ${g} °C : T = ${base} + ${n} × ${g} = ${base+n*g} °C.`}}
 };

 // ---------- Remettre en ordre ----------
 const ORD={
  0:(I,P)=>{const a=I(4,12),b=I(2,8),c=I(2,6),d=I(2,9);return {q:`Remets dans l’ordre le calcul de (${a} + ${b}) × ${c} − ${d}.`,steps:[`Parenthèse : ${a} + ${b} = ${a+b}`,`Multiplication : ${a+b} × ${c} = ${(a+b)*c}`,`Soustraction : ${(a+b)*c} − ${d} = ${(a+b)*c-d}`]}},
  4:(I,P)=>{const q=P([20,30,50,120]);return {q:`Remets dans l’ordre la conversion de ${q} L/min en m³/h.`,steps:[`Écrire le débit : ${q} L/min`,`Passer en L/h : ${q} × 60 = ${q*60} L/h`,`Passer en m³/h : ${q*60} ÷ 1 000 = ${nf(q*60/1000)} m³/h`,`Vérifier l’ordre de grandeur du résultat`]}},
  6:(I,P)=>{const A=P([40,50,80]),B=A+P([6,10,12]);return {q:`Remets dans l’ordre le calcul de l’évolution de ${A} à ${B} jours d’arrêt.`,steps:[`Écart : ${B} − ${A} = ${B-A}`,`Diviser par la valeur initiale : ${B-A} ÷ ${A} = ${nf((B-A)/A,4)}`,`Multiplier par 100 : ${nf((B-A)/A*100,2)} %`,`Conclure : hausse de ${nf((B-A)/A*100,2)} %`]}},
  8:(I,P)=>{const x=I(2,9),k=I(2,6),b=I(2,12),c=k*x+b;return {q:`Remets dans l’ordre la résolution de ${k}x + ${b} = ${c}.`,steps:[`Retirer ${b} des deux côtés : ${k}x = ${c-b}`,`Diviser par ${k} des deux côtés : x = ${x}`,`Vérifier : ${k} × ${x} + ${b} = ${c}`]}},
  9:(I,P)=>{const D=P([0.8,1.2,1.6]),h=P([1.5,2,2.5]),R=D/2,V=Math.PI*R*R*h;return {q:`Remets dans l’ordre le calcul du volume d’une cuve cylindrique (D = ${nf(D)} m, h = ${nf(h)} m) en litres.`,steps:[`Rayon : R = ${nf(D)} ÷ 2 = ${nf(R)} m`,`Section : S = π × ${nf(R)}² ≈ ${nf(Math.PI*R*R)} m²`,`Volume : V = ${nf(Math.PI*R*R)} × ${nf(h)} ≈ ${nf(V)} m³`,`En litres : ${nf(V)} × 1 000 ≈ ${nf(V*1000,0)} L`]}},
  10:(I,P)=>{const L=P([4,5]),d=P([1,1.5]);return {q:`Remets dans l’ordre le calcul de l’angle d’une échelle de ${L} m dont le pied est à ${nf(d)} m du mur.`,steps:['Repérer l’hypoténuse : l’échelle',`Repérer le côté adjacent à α : ${nf(d)} m au sol`,`Calculer cos α = ${nf(d)} ÷ ${L} = ${nf(d/L)}`,`Appliquer cos⁻¹ (mode degrés) : α ≈ ${nf(Math.acos(d/L)*180/Math.PI,1)}°`]}}
 };

 // ---------- Choisir la bonne réponse ----------
 const CH={
  2:(I,P)=>{const [f,v]=P([['3/4','0,75'],['1/4','0,25'],['2/5','0,4'],['1/8','0,125']]);return {q:`Quelle écriture décimale correspond à ${f} ?`,ok:v,opts:[v,...P([['0,34','4,3','0,43'],['0,14','1,4','4,1'],['2,5','0,25','5,2'],['0,18','1,8','8,1']]).filter(o=>o!==v)].slice(0,4),why:`${f} = ${f.replace('/',' ÷ ')} = ${v}.`}},
  3:(I,P)=>{const k=P([0,1,2]);const Q=[['1 mSv = … µSv','1 000',['10','100','0,001']],['1 GBq = … MBq','1 000',['100','10⁶','0,001']],['10⁻³ = …','0,001',['−1 000','0,01','−3']]][k];return {q:Q[0],ok:Q[1],opts:[Q[1],...Q[2]],why:['milli → micro : un cran, facteur 1 000.','giga → méga : un cran, facteur 1 000.','Exposant négatif : 10⁻³ = 1 ÷ 1 000 = 0,001.'][k]}},
  4:(I,P)=>{const k=P([0,1,2]);const Q=[['1 m³ = … L','1 000',['100','10','1 000 000']],['1 m² = … cm²','10 000',['100','1 000','1 000 000']],['1 h = … s','3 600',['60','360','6 000']]][k];return {q:Q[0],ok:Q[1],opts:[Q[1],...Q[2]],why:['1 m³ = 1 000 dm³ et 1 dm³ = 1 L.','1 m² = 100 cm × 100 cm.','1 h = 60 min × 60 s.'][k]}},
  5:(I,P)=>{const k=P([0,1,2]);const Q=[['Laquelle de ces situations est proportionnelle ?','Dose reçue et durée, à débit de dose constant',['Temps de vidange et nombre de pompes','Âge et taille d’une personne','Température et heure de la journée']],['Sur un plan au 1:20, 1 cm représente…','20 cm en réalité',['1/20 cm en réalité','2 m en réalité','20 m en réalité']],['Le graphique d’une situation proportionnelle est…','une droite passant par l’origine',['une droite qui ne passe pas par l’origine','une courbe qui monte','une droite horizontale']]][k];return {q:Q[0],ok:Q[1],opts:[Q[1],...Q[2]],why:['À débit constant, doubler la durée double la dose.','Échelle 1:20 : réel = plan × 20.','y = k × x : droite qui passe par (0 ; 0).'][k]}},
  6:(I,P)=>{const p=P([5,15,20,30]),h=P([0,1]);const c=h?1+p/100:1-p/100;return {q:`${h?'Hausse':'Baisse'} de ${p} % : par quel coefficient multiplier ?`,ok:nf(c,2),opts:[nf(c,2),nf(h?1-p/100:1+p/100,2),nf(p/100,2),String(h?p:-p)],why:`${h?'Hausse':'Baisse'} de ${p} % : × (1 ${h?'+':'−'} ${p}/100) = × ${nf(c,2)}.`}},
  7:(I,P)=>{const k=P([0,1,2]);const Q=[['Tu connais P et U. Comment calculer I ?','I = P ÷ U',['I = P × U','I = U ÷ P','I = P − U']],['Tu connais U et I. Comment calculer R ?','R = U ÷ I',['R = U × I','R = I ÷ U','R = U + I']],['Tu connais un volume et une durée. Le débit vaut…','Q = V ÷ t',['Q = V × t','Q = t ÷ V','Q = V − t']]][k];return {q:Q[0],ok:Q[1],opts:[Q[1],...Q[2]],why:['P = U × I donc I = P ÷ U.','U = R × I donc R = U ÷ I.','Un débit est un volume par unité de temps.'][k]}},
  9:(I,P)=>{const k=P([0,1]);const Q=[['Volume d’une cuve cylindrique ?','V = π × R² × h',['V = π × D² × h','V = 2 × π × R × h','V = π × R × h']],['Aire d’un disque de diamètre D ?','S = π × (D ÷ 2)²',['S = π × D²','S = 2 × π × D','S = π × D']]][k];return {q:Q[0],ok:Q[1],opts:[Q[1],...Q[2]],why:['Section π × R², multipliée par la hauteur.','R = D ÷ 2, puis S = π × R².'][k]}},
  10:(I,P)=>{const k=P([0,1,2]);const Q=[['Tu connais l’hypoténuse et α ; tu cherches le côté opposé.','sin',['cos','tan','Pythagore']],['Tu connais les deux côtés de l’angle droit ; tu cherches l’hypoténuse.','Pythagore',['sin','cos','tan']],['Tu connais l’opposé et l’adjacent ; tu cherches α.','tan⁻¹',['sin⁻¹','cos⁻¹','Pythagore']]][k];return {q:Q[0]+' Quel outil ?',ok:Q[1],opts:[Q[1],...Q[2]],why:['sin α = opposé ÷ hypoténuse.','c² = a² + b².','tan α = opposé ÷ adjacent.'][k]}}
 };

 // ---------- Toucher le schéma ----------
 const arr='<defs><marker id="iArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="cv-fill-ink"/></marker></defs>';
 const TOU={
  1:(I,P)=>{const v=I(-9,9);const X=x=>40+(x+10)*520/20;let g=arr+`<line x1="25" y1="70" x2="580" y2="70" class="cv-line" marker-end="url(#iArr)"/>`;const pts=[];for(let x=-10;x<=10;x++){g+=`<line x1="${X(x)}" y1="${x%5?64:58}" x2="${X(x)}" y2="${x%5?76:82}" class="cv-line"/>`;if(x%5===0)g+=`<text x="${X(x)}" y="104" text-anchor="middle" class="${x?'cv-small':'cv-tb'}">${sg(x)}</text>`;pts.push({x:X(x),y:70,v:x})}
   return {q:`Touche la position de ${sg(v)} sur la droite graduée.`,svg:g,vb:'0 0 600 120',pts,ok:pts.findIndex(p=>p.v===v),why:`${sg(v)} est ${v<0?'à gauche':v>0?'à droite':'à l’origine'} de 0, à ${Math.abs(v)} graduation${Math.abs(v)>1?'s':''}.`,label:p=>sg(p.v)}},
  5:(I,P)=>{const k=P([20,40,60,80]),t=P([0.5,1,1.5,2,2.5,3,3.5]);const X=x=>60+x*125,Y=y=>210-y*0.6;let g=arr+`<line x1="60" y1="210" x2="580" y2="210" class="cv-line" marker-end="url(#iArr)"/><line x1="60" y1="210" x2="60" y2="15" class="cv-line" marker-end="url(#iArr)"/>`;for(let x=0;x<=4;x++)g+=`<text x="${X(x)}" y="230" text-anchor="middle" class="cv-small">${x} h</text>`;for(let y=50;y<=300;y+=50)g+=`<line x1="60" y1="${Y(y)}" x2="575" y2="${Y(y)}" class="cv-grid"/><text x="52" y="${Y(y)+4}" text-anchor="end" class="cv-small">${y}</text>`;g+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(4)}" y2="${Y(k*4)}" class="cv-curve"/><text x="66" y="14" class="cv-small">dose (µSv)</text>`;
   const pts=[];for(let x=0.5;x<=4;x+=0.5)pts.push({x:X(x),y:Y(k*x),v:x});const dose=k*t;return {q:`Débit de dose : ${k} µSv/h. Touche le point de la droite où la dose atteint ${nf(dose)} µSv.`,svg:g,vb:'0 0 600 240',pts,ok:pts.findIndex(p=>p.v===t),why:`Durée = dose ÷ débit = ${nf(dose)} ÷ ${k} = ${nf(t)} h.`,visible:true}},
  11:(I,P)=>{const vals=shuffle([20,30,35,45,50,60,65,75],Math.random).slice(0,5),T=[0,5,10,15,20],idx=I(0,4);const X=t=>60+t*25,Y=v=>210-(v-10)*2.6;let g=arr+`<line x1="60" y1="210" x2="580" y2="210" class="cv-line" marker-end="url(#iArr)"/><line x1="60" y1="210" x2="60" y2="15" class="cv-line" marker-end="url(#iArr)"/>`;for(let t=0;t<=20;t+=5)g+=`<text x="${X(t)}" y="230" text-anchor="middle" class="cv-small">${t}</text>`;for(let v=10;v<=80;v+=10)g+=`<line x1="60" y1="${Y(v)}" x2="575" y2="${Y(v)}" class="cv-grid"/><text x="52" y="${Y(v)+4}" text-anchor="end" class="cv-small">${v}</text>`;g+=`<polyline points="${T.map((t,i)=>X(t)+','+Y(vals[i])).join(' ')}" class="cv-curve"/><text x="580" y="246" text-anchor="end" class="cv-small">temps (min)</text><text x="66" y="14" class="cv-small">température (°C)</text>`;
   const pts=T.map((t,i)=>({x:X(t),y:Y(vals[i]),v:t}));return {q:`Touche le point de la courbe où la température vaut ${vals[idx]} °C.`,svg:g,vb:'0 0 600 250',pts,ok:idx,why:`On part de ${vals[idx]} °C sur l’axe vertical et on va horizontalement jusqu’à la courbe : c’est à t = ${T[idx]} min.`,visible:true}}
 };

 const TABLE={erreur:ERR,ordre:ORD,choix:CH,toucher:TOU};
 function kindsFor(theme){return Object.keys(TABLE).filter(k=>TABLE[k][theme])}
 function generate(theme,level,random=Math.random,kind){
  const ks=kindsFor(theme);if(!ks.length)return null;const k=kind&&ks.includes(kind)?kind:ks[Math.floor(random()*ks.length)];
  const I=(a,b)=>Math.floor(random()*(b-a+1))+a,P=a=>a[Math.floor(random()*a.length)];
  const d=TABLE[k][theme](I,P);
  if(k==='choix'){const opts=shuffle([...new Set(d.opts)],random);d.opts=opts;d.okIndex=opts.indexOf(d.ok)}
  if(k==='ordre'){d.order=shuffle(d.steps.map((_,i)=>i),random);if(d.order.every((v,i)=>v===i))d.order.reverse()}
  return Object.assign({inter:true,kind:k,kindLabel:KIND[k],theme,level},d)}

 // Rendu dans un conteneur ; report(ok) est appelé à chaque tentative
 function render(ex,el,report){
  const fb=(ok,msg)=>{const b=el.querySelector('.inter-fb');b.className='inter-fb feedback '+(ok?'ok':'bad');b.innerHTML=msg;b.hidden=false};
  let done=false;const finish=ok=>{report(ok);if(ok){done=true;el.classList.add('inter-done')}};
  if(ex.kind==='erreur'){
   el.innerHTML=`<p class="question">${ex.q}</p><p class="muted">Voici le calcul d’un apprenti. Touche la ligne qui contient l’erreur.</p><div class="err-lines">${ex.lines.map((l,i)=>`<button type="button" data-i="${i}"><span>${i+1}</span>${l}</button>`).join('')}</div><div class="inter-fb" hidden></div>`;
   el.querySelectorAll('.err-lines button').forEach(b=>b.onclick=()=>{if(done)return;const i=+b.dataset.i,ok=i===ex.bad;b.classList.add(ok?'good':'wrong');if(ok)fb(true,`Bien vu ! ${ex.why}`);else fb(false,'Cette ligne est juste. Regarde les autres.');finish(ok)})}
  else if(ex.kind==='ordre'){
   let pick=[];const draw=()=>{el.querySelector('.ord-pool').innerHTML=ex.order.map(i=>pick.includes(i)?'':`<button type="button" data-i="${i}">${ex.steps[i]}</button>`).join('');el.querySelector('.ord-list').innerHTML=pick.map((i,k)=>`<li><span>${k+1}</span>${ex.steps[i]}</li>`).join('')||'<li class="ph">Touche les étapes dans le bon ordre…</li>';
    el.querySelectorAll('.ord-pool button').forEach(b=>b.onclick=()=>{if(done)return;pick.push(+b.dataset.i);draw();if(pick.length===ex.steps.length){const ok=pick.every((v,i)=>v===i);if(ok)fb(true,'Bon ordre ! Chaque étape utilise le résultat de la précédente.');else{fb(false,'Ce n’est pas le bon ordre. Recommence : quelle étape faut-il faire en premier ?');setTimeout(()=>{pick=[];draw()},1400)}finish(ok)}})};
   el.innerHTML=`<p class="question">${ex.q}</p><ol class="steps ord-list"></ol><div class="ord-pool"></div><div class="inter-fb" hidden></div>`;draw()}
  else if(ex.kind==='choix'){
   el.innerHTML=`<p class="question">${ex.q}</p><div class="choice-grid">${ex.opts.map((o,i)=>`<button type="button" data-i="${i}">${o}</button>`).join('')}</div><div class="inter-fb" hidden></div>`;
   el.querySelectorAll('.choice-grid button').forEach(b=>b.onclick=()=>{if(done)return;const ok=+b.dataset.i===ex.okIndex;b.classList.add(ok?'good':'wrong');fb(ok,ok?`Exact. ${ex.why}`:'Non. Réfléchis encore ou consulte le cours.');finish(ok)})}
  else if(ex.kind==='toucher'){
   el.innerHTML=`<p class="question">${ex.q}</p><div class="exercise-visual"><svg class="cv touch-svg" viewBox="${ex.vb}">${ex.svg}${ex.pts.map((p,i)=>`<g class="tp${ex.visible?' vis':''}" data-i="${i}"><circle cx="${p.x}" cy="${p.y}" r="16" class="tp-hit"/><circle cx="${p.x}" cy="${p.y}" r="${ex.visible?6:4}" class="tp-dot"/></g>`).join('')}</svg></div><div class="inter-fb" hidden></div>`;
   el.querySelectorAll('.tp').forEach(g=>g.onclick=()=>{if(done)return;const i=+g.dataset.i,ok=i===ex.ok;g.classList.add(ok?'good':'wrong');fb(ok,ok?`Exact. ${ex.why}`:'Ce n’est pas ce point. Essaie encore.');finish(ok)})}
 }
 root.MathsInter={generate,render,kindsFor,KIND,_tables:TABLE};if(typeof module!=='undefined'&&module.exports)module.exports=root.MathsInter;
})(globalThis);
