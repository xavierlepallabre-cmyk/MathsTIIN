// Maths TIIN — schémas manipulables (un par fiche de cours, même ordre que THEMES)
// Chaque simulateur : titre, consigne, mount(el) qui construit l'interface et la met à jour en direct.
(function(root){
 const nf=(x,d=3)=>Number.isFinite(x)?x.toLocaleString('fr-FR',{maximumFractionDigits:d}):'—';
 const sg=x=>x<0?'−'+nf(-x):nf(x);                      // signe moins typographique
 const sgp=x=>x>0?'+'+nf(x):sg(x);
 const SUP={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
 const sup=n=>String(n).split('').map(c=>SUP[c]||c).join('');
 const sci=x=>{if(!x)return '0';const e=Math.floor(Math.log10(Math.abs(x))),m=x/10**e;return `${nf(Number(m.toPrecision(4)))} × 10${sup(e)}`};
 const slider=(id,label,min,max,step,val,unit='')=>`<label class="sim-ctl"><span>${label} <b id="${id}V"></b> ${unit}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
 const arr='<defs><marker id="sArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="cv-fill-accent"/></marker><marker id="sArrI" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="cv-fill-ink"/></marker></defs>';
 function wire(el,ids,update){const q=id=>el.querySelector('#'+id);const get=()=>{const v={};ids.forEach(id=>{v[id]=+q(id).value;const o=q(id+'V');if(o)o.textContent=nf(+q(id).value)});return v};ids.forEach(id=>q(id).addEventListener('input',()=>update(get(),q)));update(get(),q);return q}

 const SIMS=[
 // 0 — Calcul numérique : priorités
 {titre:'Change les nombres, ajoute ou retire les parenthèses',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('a','a =',1,20,1,7)}${slider('b','b =',1,12,1,3)}${slider('c','c =',1,12,1,4)}</div>
  <div class="sim-toggle" role="group"><button type="button" data-p="0" class="active">a + b × c</button><button type="button" data-p="1">(a + b) × c</button></div>
  <div class="sim-steps" id="out"></div>`;
  let par=0;const run=v=>{const {a,b,c}=v;const s=par?[`(${a} + ${b}) × ${c}`,`<mark>${a} + ${b}</mark> = ${a+b}  → parenthèse d’abord`,`${a+b} × ${c} = <b>${(a+b)*c}</b>`]:[`${a} + ${b} × ${c}`,`<mark>${b} × ${c}</mark> = ${b*c}  → × avant +`,`${a} + ${b*c} = <b>${a+b*c}</b>`];el.querySelector('#out').innerHTML=s.map((t,i)=>`<div class="sim-step" style="animation-delay:${i*90}ms">${i?'<span>'+i+'</span>':'<span>›</span>'}${t}</div>`).join('')};
  const q=wire(el,['a','b','c'],run);el.querySelectorAll('[data-p]').forEach(bt=>bt.onclick=()=>{par=+bt.dataset.p;el.querySelectorAll('[data-p]').forEach(x=>x.classList.toggle('active',x===bt));run({a:+q('a').value,b:+q('b').value,c:+q('c').value})});
 }},
 // 1 — Relatifs : variation sur une droite graduée
 {titre:'Déplace la température initiale et la température finale',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('ti','Initiale :',-20,40,1,25,'°C')}${slider('tf','Finale :',-20,40,1,-4,'°C')}</div><svg class="cv sim-svg" viewBox="0 0 600 150" id="g"></svg><div class="sim-result" id="out"></div>`;
  const X=v=>40+(v+20)*520/60;
  wire(el,['ti','tf'],({ti,tf})=>{let g=arr+`<line x1="30" y1="95" x2="575" y2="95" class="cv-line"/>`;for(let v=-20;v<=40;v+=5)g+=`<line x1="${X(v)}" y1="88" x2="${X(v)}" y2="102" class="cv-line"/><text x="${X(v)}" y="122" text-anchor="middle" class="${v===0?'cv-tb':'cv-small'}">${sg(v)}</text>`;
   g+=`<rect x="${X(-20)}" y="88" width="${X(0)-X(-20)}" height="14" class="cv-cold"/>`;
   if(ti!==tf)g+=`<path d="M${X(ti)} 80 Q${(X(ti)+X(tf))/2} ${Math.max(10,80-Math.abs(X(tf)-X(ti))/3)} ${X(tf)} 80" class="cv-arrow-a" marker-end="url(#sArr)"/>`;
   g+=`<circle cx="${X(ti)}" cy="95" r="8" class="cv-fill-brand"/><circle cx="${X(tf)}" cy="95" r="8" class="cv-fill-accent"/>`;
   el.querySelector('#g').innerHTML=g;const d=tf-ti;
   el.querySelector('#out').innerHTML=`ΔT = finale − initiale = ${sg(tf)} − (${sg(ti)}) = <b>${sgp(d)} °C</b> <span class="sim-tag ${d<0?'bad':d>0?'ok':''}">${d<0?'baisse':d>0?'hausse':'pas de variation'}</span>`});
 }},
 // 2 — Fractions : cuve
 {titre:'Règle le découpage de la cuve et le nombre de parts remplies',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('d','Dénominateur :',2,12,1,4)}${slider('n','Numérateur :',0,12,1,3)}${slider('cap','Capacité :',100,1000,50,200,'L')}</div><div class="sim-row"><svg class="cv sim-svg sim-tank" viewBox="0 0 200 260" id="g"></svg><div class="sim-result big" id="out"></div></div>`;
  wire(el,['d','n','cap'],({d,n,cap},q)=>{if(n>d){n=d;q('n').value=d;q('nV').textContent=d}q('n').max=d;
   const H=220,y0=20;let g=`<rect x="40" y="${y0}" width="120" height="${H}" rx="8" class="cv-frame"/>`;
   if(n)g+=`<rect x="44" y="${y0+H-H*n/d+2}" width="112" height="${H*n/d-6}" rx="4" class="cv-water"/>`;
   for(let i=1;i<d;i++)g+=`<line x1="40" y1="${y0+i*H/d}" x2="160" y2="${y0+i*H/d}" class="cv-dash"/>`;
   el.querySelector('#g').innerHTML=g;
   el.querySelector('#out').innerHTML=`<div class="frac"><span>${n}</span><span>${d}</span></div><p>${nf(cap)} × ${n} ÷ ${d} = <b>${nf(cap*n/d,1)} L</b></p><p class="muted">soit ${nf(n/d*100,1)} % de la cuve</p>`});
 }},
 // 3 — Puissances de 10 : convertisseur de préfixes
 {titre:'Choisis une valeur, un préfixe de départ et un préfixe d’arrivée',mount(el){
  const P=[['G',9],['M',6],['k',3],['',0],['m',-3],['µ',-6],['n',-9]];
  el.innerHTML=`<div class="sim-ctls">${slider('v','Valeur :',1,500,1,25)}<label class="sim-ctl"><span>Unité</span><select id="u"><option value="Sv">Sv (dose)</option><option value="Bq">Bq (activité)</option><option value="W">W (puissance)</option></select></label></div>
  <div class="prefix-row" id="from"></div><div class="prefix-row to" id="to"></div><div class="sim-result" id="out"></div>`;
  let f=5,t=4;const draw=()=>{const v=+el.querySelector('#v').value,u=el.querySelector('#u').value;el.querySelector('#vV').textContent=v;
   const row=(id,sel)=>P.map((p,i)=>`<button type="button" data-i="${i}" class="${i===sel?'active':''}">${p[0]}${u}<small>10${sup(p[1])}</small></button>`).join('');
   el.querySelector('#from').innerHTML='<span>de</span>'+row('from',f);el.querySelector('#to').innerHTML='<span>vers</span>'+row('to',t);
   el.querySelectorAll('#from button').forEach(b=>b.onclick=()=>{f=+b.dataset.i;draw()});el.querySelectorAll('#to button').forEach(b=>b.onclick=()=>{t=+b.dataset.i;draw()});
   const e=P[f][1]-P[t][1],r=v*10**e,crans=Math.abs(e)/3;
   el.querySelector('#out').innerHTML=`${v} ${P[f][0]}${u} = ${v} × 10${sup(e)} ${P[t][0]}${u} = <b>${nf(r,9)} ${P[t][0]}${u}</b><br><span class="muted">${e===0?'même unité':`${crans} cran${crans>1?'s':''} → ${e>0?'× ':'÷ '}${nf(10**Math.abs(e))}`} · écriture scientifique : ${sci(r)} ${P[t][0]}${u}</span>`};
  el.querySelector('#v').oninput=draw;el.querySelector('#u').onchange=draw;draw();
 }},
 // 4 — Conversions : débit
 {titre:'Fais varier le débit de la pompe et observe les conversions',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('q','Débit :',5,300,5,30,'L/min')}${slider('V','Cuve :',1,20,1,6,'m³')}</div><div class="sim-chain" id="out"></div>`;
  wire(el,['q','V'],({q,V})=>{const t=V*1000/q;el.querySelector('#out').innerHTML=`
   <div><b>${nf(q)} L/min</b></div><i>× 60</i><div><b>${nf(q*60)} L/h</b></div><i>÷ 1 000</i><div class="hl"><b>${nf(q*60/1000)} m³/h</b></div>
   <div class="sim-chain-full">Temps pour remplir ${V} m³ = ${nf(V*1000)} L ÷ ${nf(q)} L/min = <b>${nf(t,1)} min</b> ≈ <b>${Math.floor(t/60)} h ${String(Math.round(t%60)).padStart(2,'0')} min</b></div>`});
 }},
 // 5 — Proportionnalité : dose = débit × temps
 {titre:'Règle le débit de dose et la durée : la dose suit une droite',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('k','Débit de dose :',5,100,5,40,'µSv/h')}${slider('t','Durée :',0,4,0.25,1.5,'h')}</div><svg class="cv sim-svg" viewBox="0 0 600 240" id="g"></svg><div class="sim-result" id="out"></div>`;
  wire(el,['k','t'],({k,t})=>{const X=x=>60+x*125,Y=y=>210-y*0.45;let g=arr+`<line x1="60" y1="210" x2="580" y2="210" class="cv-line" marker-end="url(#sArrI)"/><line x1="60" y1="210" x2="60" y2="15" class="cv-line" marker-end="url(#sArrI)"/>`;
   for(let x=0;x<=4;x++)g+=`<text x="${X(x)}" y="230" text-anchor="middle" class="cv-small">${x} h</text>`;for(let y=100;y<=400;y+=100)g+=`<line x1="60" y1="${Y(y)}" x2="575" y2="${Y(y)}" class="cv-grid"/><text x="52" y="${Y(y)+4}" text-anchor="end" class="cv-small">${y}</text>`;
   g+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(4)}" y2="${Y(k*4)}" class="cv-curve"/><line x1="${X(t)}" y1="210" x2="${X(t)}" y2="${Y(k*t)}" class="cv-read"/><line x1="60" y1="${Y(k*t)}" x2="${X(t)}" y2="${Y(k*t)}" class="cv-read"/><circle cx="${X(t)}" cy="${Y(k*t)}" r="7" class="cv-fill-accent"/><text x="66" y="14" class="cv-small">dose (µSv)</text>`;
   el.querySelector('#g').innerHTML=g;el.querySelector('#out').innerHTML=`Dose = ${k} µSv/h × ${nf(t)} h = <b>${nf(k*t)} µSv</b> = ${nf(k*t/1000,4)} mSv · <span class="muted">doubler la durée double la dose</span>`});
 }},
 // 6 — Pourcentages : coefficient multiplicateur
 {titre:'Choisis une valeur de départ et un pourcentage de hausse ou de baisse',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('v','Valeur de départ :',20,500,10,120)}${slider('p','Évolution :',-60,60,5,-15,'%')}</div><svg class="cv sim-svg" viewBox="0 0 600 140" id="g"></svg><div class="sim-result" id="out"></div>`;
  wire(el,['v','p'],({v,p})=>{const c=1+p/100,f=v*c,W=v=>v/1000*520;const g=`<rect x="40" y="25" width="${W(v)}" height="34" rx="6" class="cv-brand"/><text x="${44+W(v)}" y="48" class="cv-tb">${nf(v)} (100 %)</text>
   <rect x="40" y="80" width="${W(f)}" height="34" rx="6" class="${p<0?'cv-bad':'cv-ok'}"/><text x="${44+W(f)}" y="103" class="cv-tb">${nf(f,2)} (${nf(100+p)} %)</text>`;
   el.querySelector('#g').innerHTML=g;el.querySelector('#out').innerHTML=`${p>=0?'Hausse':'Baisse'} de ${Math.abs(p)} % → coefficient <b>× ${nf(c,2)}</b> · ${nf(v)} × ${nf(c,2)} = <b>${nf(f,2)}</b>`});
 }},
 // 7 — Formules : loi d'Ohm
 {titre:'Touche la grandeur à calculer, puis règle les deux autres',mount(el){
  el.innerHTML=`<div class="sim-row"><svg class="cv sim-svg sim-tri" viewBox="0 0 300 240" id="g"></svg><div class="sim-col"><div class="sim-ctls" id="ctl"></div><div class="sim-result big" id="out"></div></div></div>`;
  let cible='I';const val={U:230,R:23,I:10};
  const draw=()=>{const k=(x,cx,cy,big)=>`<g class="tri-key${cible===x?' on':''}" data-k="${x}"><circle cx="${cx}" cy="${cy}" r="34" class="tri-hit"/><text x="${cx}" y="${cy+14}" text-anchor="middle" class="cv-huge">${x}</text></g>`;
   el.querySelector('#g').innerHTML=`<path d="M150 15 L285 225 L15 225 Z" class="cv-tri"/><line x1="72" y1="135" x2="228" y2="135" class="cv-line-b"/><line x1="150" y1="135" x2="150" y2="225" class="cv-line-b"/>${k('U',150,95)}${k('R',100,190)}${k('I',200,190)}`;
   el.querySelectorAll('[data-k]').forEach(g=>g.onclick=()=>{cible=g.dataset.k;draw()});
   const C={U:['R','I'],R:['U','I'],I:['U','R']}[cible],rg={U:[1,400,1,'V'],R:[1,200,1,'Ω'],I:[0.1,20,0.1,'A']};
   el.querySelector('#ctl').innerHTML=C.map(x=>slider('s'+x,x+' =',rg[x][0],rg[x][1],rg[x][2],val[x],rg[x][3])).join('');
   const upd=()=>{C.forEach(x=>{val[x]=+el.querySelector('#s'+x).value;el.querySelector('#s'+x+'V').textContent=nf(val[x])});
    const r=cible==='U'?val.R*val.I:cible==='R'?val.U/val.I:val.U/val.R;val[cible]=r;
    const f=cible==='U'?`U = R × I = ${nf(val.R)} × ${nf(val.I)}`:cible==='R'?`R = U ÷ I = ${nf(val.U)} ÷ ${nf(val.I)}`:`I = U ÷ R = ${nf(val.U)} ÷ ${nf(val.R)}`;
    el.querySelector('#out').innerHTML=`<p>${f}</p><p><b>${cible} = ${nf(r,2)} ${rg[cible][3]}</b></p><p class="muted">P = U × I = ${nf(val.U*val.I,1)} W</p>`};
   C.forEach(x=>el.querySelector('#s'+x).oninput=upd);upd()};
  draw();
 }},
 // 8 — Équations : balance
 {titre:'Fais les mêmes opérations des deux côtés pour isoler x',mount(el){
  el.innerHTML=`<svg class="cv sim-svg" viewBox="0 0 600 200" id="g"></svg><div class="sim-actions" id="act"></div><div class="sim-result" id="out"></div>`;
  let a,b,c,x,etat;
  const neu=()=>{a=2+Math.floor(Math.random()*5);x=2+Math.floor(Math.random()*9);b=1+Math.floor(Math.random()*12);c=a*x+b;etat=0;draw()};
  const draw=()=>{const G=etat===0?`${a}x + ${b}`:etat===1?`${a}x`:etat===2?`x + ${nf(b/a,2)}`:'x';const D=etat===0?`${c}`:etat===1?`${c-b}`:etat===2?`${nf(c/a,2)}`:`${x}`;
   el.querySelector('#g').innerHTML=`<path d="M300 50 L300 175 M240 185 L360 185" class="cv-line-b"/><path d="M300 50 L285 30 L315 30 Z" class="cv-fill-ink"/><line x1="90" y1="50" x2="510" y2="50" class="cv-line-b"/><line x1="160" y1="50" x2="160" y2="80" class="cv-line"/><line x1="440" y1="50" x2="440" y2="80" class="cv-line"/>
    <rect x="70" y="80" width="180" height="60" rx="12" class="cv-brand sim-pop"/><text x="160" y="119" text-anchor="middle" class="cv-t-on cv-big">${G}</text><rect x="350" y="80" width="180" height="60" rx="12" class="cv-accent sim-pop"/><text x="440" y="119" text-anchor="middle" class="cv-t-on cv-big">${D}</text>`;
   const acts=[];if(etat===0||etat===2)acts.push(['m',`− ${etat===0?b:nf(b/a,2)} des deux côtés`]);if(etat===0||etat===1)acts.push(['d',`÷ ${a} des deux côtés`]);acts.push(['n','Nouvelle équation']);
   el.querySelector('#act').innerHTML=acts.map(([k,t])=>`<button type="button" class="btn ${k==='n'?'btn-ghost':'btn-primary'}" data-a="${k}">${t}</button>`).join('');
   el.querySelectorAll('[data-a]').forEach(bt=>bt.onclick=()=>{const k=bt.dataset.a;if(k==='n')return neu();if(k==='m')etat=etat===0?1:3;else etat=etat===0?2:3;draw()});
   el.querySelector('#out').innerHTML=etat===3?`<b>x = ${x}</b> · vérification : ${a} × ${x} + ${b} = ${a*x+b} ✔`:etat===2?'Possible, mais on obtient une fraction : retirer d’abord est souvent plus simple.':'La balance reste équilibrée à chaque étape.'};
  neu();
 }},
 // 9 — Géométrie : cylindre
 {titre:'Règle le diamètre et la hauteur de la cuve cylindrique',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('D','Diamètre D :',0.4,2.4,0.1,1.2,'m')}${slider('h','Hauteur h :',0.5,3,0.1,2,'m')}</div><div class="sim-row"><svg class="cv sim-svg sim-cyl" viewBox="0 0 260 260" id="g"></svg><div class="sim-result big" id="out"></div></div>`;
  wire(el,['D','h'],({D,h})=>{const s=70,rx=D/2*s,H=h*s,cx=130,top=245-H;el.querySelector('#g').innerHTML=`<path d="M${cx-rx} ${top} L${cx-rx} 240 A${rx} 14 0 0 0 ${cx+rx} 240 L${cx+rx} ${top}" class="cv-shape-open"/><ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="14" class="cv-shape"/><line x1="${cx}" y1="${top}" x2="${cx+rx}" y2="${top}" class="cv-line-b"/><text x="${cx+rx/2}" y="${top-6}" text-anchor="middle" class="cv-tb cv-accent-t">R</text>`;
   const R=D/2,S=Math.PI*R*R,V=S*h;el.querySelector('#out').innerHTML=`<p>R = D ÷ 2 = <b>${nf(R)} m</b></p><p>S = π × R² = <b>${nf(S)} m²</b></p><p>V = S × h = <b>${nf(V)} m³</b></p><p class="hl">= <b>${nf(V*1000,0)} L</b></p>`});
 }},
 // 10 — Trigonométrie : triangle déformable
 {titre:'Fais varier l’angle α et la longueur de l’hypoténuse',mount(el){
  el.innerHTML=`<div class="sim-ctls">${slider('a','Angle α :',5,85,1,35,'°')}${slider('c','Hypoténuse :',1,6,0.5,4,'m')}</div><div class="sim-row"><svg class="cv sim-svg" viewBox="0 0 360 240" id="g"></svg><div class="sim-result" id="out"></div></div>`;
  wire(el,['a','c'],({a,c})=>{const r=a*Math.PI/180,adj=c*Math.cos(r),opp=c*Math.sin(r),k=300/6,x0=20,y0=220;const X=x0+adj*k,Y=y0-opp*k;
   el.querySelector('#g').innerHTML=`<path d="M${x0} ${y0} L${X} ${y0} L${X} ${Y} Z" class="cv-tri"/><path d="M${X-12} ${y0} L${X-12} ${y0-12} L${X} ${y0-12}" class="cv-line"/><path d="M${x0+34} ${y0} A34 34 0 0 0 ${x0+34*Math.cos(r)} ${y0-34*Math.sin(r)}" class="cv-arrow-a"/><text x="${x0+42}" y="${y0-8}" class="cv-tb cv-accent-t">α</text><text x="${(x0+X)/2}" y="${y0+16}" text-anchor="middle" class="cv-small">adj ${nf(adj,2)}</text><text x="${X+6}" y="${(y0+Y)/2}" class="cv-small">opp ${nf(opp,2)}</text>`;
   el.querySelector('#out').innerHTML=`<p>adjacent = ${nf(c)} × cos ${a}° = <b>${nf(adj,2)} m</b></p><p>opposé = ${nf(c)} × sin ${a}° = <b>${nf(opp,2)} m</b></p><p class="muted">cos α = ${nf(Math.cos(r),3)} · sin α = ${nf(Math.sin(r),3)} · tan α = ${nf(Math.tan(r),3)}</p><p class="muted">Pythagore : ${nf(adj,2)}² + ${nf(opp,2)}² = ${nf(adj*adj+opp*opp,2)} = ${nf(c)}² ✔</p>`});
 }},
 // 11 — Lecture de données : curseur sur une courbe
 {titre:'Déplace les deux repères pour lire les valeurs et la variation moyenne',mount(el){
  const T=[0,5,10,15,20],Y=[20,32,48,61,68],f=t=>{const i=Math.min(3,Math.floor(t/5));return Y[i]+(Y[i+1]-Y[i])*(t-T[i])/5};
  el.innerHTML=`<div class="sim-ctls">${slider('t1','Repère 1 : t =',0,20,1,5,'min')}${slider('t2','Repère 2 : t =',0,20,1,15,'min')}</div><svg class="cv sim-svg" viewBox="0 0 600 252" id="g"></svg><div class="sim-result" id="out"></div>`;
  wire(el,['t1','t2'],({t1,t2})=>{const X=t=>60+t*25,Yp=v=>210-(v-10)*2.6;let g=arr+`<line x1="60" y1="210" x2="580" y2="210" class="cv-line" marker-end="url(#sArrI)"/><line x1="60" y1="210" x2="60" y2="15" class="cv-line" marker-end="url(#sArrI)"/>`;
   for(let t=0;t<=20;t+=5)g+=`<text x="${X(t)}" y="230" text-anchor="middle" class="cv-small">${t}</text>`;for(let v=20;v<=80;v+=20)g+=`<line x1="60" y1="${Yp(v)}" x2="575" y2="${Yp(v)}" class="cv-grid"/><text x="52" y="${Yp(v)+4}" text-anchor="end" class="cv-small">${v}</text>`;
   g+=`<polyline points="${T.map((t,i)=>X(t)+','+Yp(Y[i])).join(' ')}" class="cv-curve"/>`;
   [[t1,'cv-fill-brand'],[t2,'cv-fill-accent']].forEach(([t,c])=>{g+=`<line x1="${X(t)}" y1="210" x2="${X(t)}" y2="${Yp(f(t))}" class="cv-read"/><line x1="60" y1="${Yp(f(t))}" x2="${X(t)}" y2="${Yp(f(t))}" class="cv-read"/><circle cx="${X(t)}" cy="${Yp(f(t))}" r="7" class="${c}"/>`});
   g+=`<text x="580" y="246" text-anchor="end" class="cv-small">temps (min)</text><text x="66" y="14" class="cv-small">température (°C)</text>`;el.querySelector('#g').innerHTML=g;
   const d=f(t2)-f(t1);el.querySelector('#out').innerHTML=`À ${t1} min : <b>${nf(f(t1),1)} °C</b> · à ${t2} min : <b>${nf(f(t2),1)} °C</b><br>${t1===t2?'Choisis deux instants différents.':`Variation moyenne = (${nf(f(t2),1)} − ${nf(f(t1),1)}) ÷ (${t2} − ${t1}) = <b>${sg(Number((d/(t2-t1)).toFixed(2)))} °C/min</b>`}`});
 }}
 ];
 root.MathsSims=SIMS;
})(globalThis);
