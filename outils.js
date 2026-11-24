// Maths TIIN — défis (calcul mental 60 s, échauffement), boîte à outils (conversions, formules), mode tableau.
(function(){
 const {THEMES,generate,check}=MathsExercises,progress=MathsProgress,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const nf=(x,d=4)=>Number.isFinite(x)?x.toLocaleString('fr-FR',{maximumFractionDigits:d}):'—';
 const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

 // ================= DÉFIS =================
 const dlg=$('#challengeDialog'),body=$('#challengeBody');let timer=null;
 function open(title){$('#challengeTitle').textContent=title;dlg.hidden=false}
 function close(){dlg.hidden=true;clearInterval(timer);body.innerHTML=''}
 $('#closeChallenge').onclick=close;dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
 function renderRecord(){const r=store.get('maths-tiin-record',0);const el=$('#mentalRecord');if(el)el.textContent=r?`Record sur cet appareil : ${r}`:'Pas encore de record';}

 // Calcul mental : tables, ×/÷ 10-100-1000, pourcentages simples, relatifs, conversions
 function mentalQ(){const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,k=r(0,6);
  if(k===0){const a=r(2,9),b=r(2,9);return [`${a} × ${b}`,a*b]}
  if(k===1){const a=r(2,9),b=r(2,9);return [`${a*b} ÷ ${a}`,b]}
  if(k===2){const a=r(2,95),p=[10,100,1000][r(0,2)];return Math.random()<.5?[`${a} × ${p.toLocaleString('fr-FR')}`,a*p]:[`${a} ÷ ${p.toLocaleString('fr-FR')}`,a/p]}
  if(k===3){const p=[10,25,50][r(0,2)],n=r(2,20)*(p===25?4:10);return [`${p} % de ${n}`,n*p/100]}
  if(k===4){const a=-r(2,15),b=r(2,15);return Math.random()<.5?[`${'−'+(-a)} + ${b}`,a+b]:[`${b} − (${'−'+(-a)})`,b-a]}
  if(k===5){const v=r(1,9)*[1,10][r(0,1)];return Math.random()<.5?[`${v} m = ? cm`,v*100]:[`${v*1000} mL = ? L`,v]}
  const a=r(11,49),b=r(11,49);return [`${a} + ${b}`,a+b]}
 function startMental(){open('Calcul mental · 60 secondes');let left=60,score=0,errs=0,q;
  body.innerHTML=`<div class="mental-top"><div class="mental-time"><i id="mBar"></i></div><b id="mLeft">60 s</b><span id="mScore">0 point</span></div><div class="mental-q" id="mQ"></div><form id="mForm" class="answer-row"><input id="mIn" inputmode="decimal" autocomplete="off" aria-label="Réponse"><button class="btn btn-primary">OK</button></form><p class="muted" id="mFb">Réponds le plus vite possible. Une erreur ne fait pas perdre de point.</p>`;
  MathKeys.attach($('#mIn'));const next=()=>{q=mentalQ();$('#mQ').textContent=q[0];$('#mIn').value='';$('#mIn').focus()};
  $('#mForm').onsubmit=e=>{e.preventDefault();const r=check({answer:q[1],exact:Number.isInteger(q[1])},$('#mIn').value);if(r.input)return;if(r.ok){score++;$('#mFb').textContent='✔ Juste';$('#mQ').classList.remove('shake');}else{errs++;$('#mFb').textContent=`✘ ${q[0]} = ${nf(q[1])}`;$('#mQ').classList.add('shake')}$('#mScore').textContent=`${score} point${score>1?'s':''}`;next()};
  next();timer=setInterval(()=>{left--;$('#mLeft').textContent=left+' s';$('#mBar').style.width=(left/60*100)+'%';if(left<=0){clearInterval(timer);endMental(score,errs)}},1000)}
 function endMental(score,errs){const rec=store.get('maths-tiin-record',0),best=score>rec;if(best)store.set('maths-tiin-record',score);renderRecord();
  body.innerHTML=`<div class="diag-result-score">${score}</div><p>bonne${score>1?'s':''} réponse${score>1?'s':''} en 60 s · ${errs} erreur${errs>1?'s':''}</p>${best?'<p class="feedback ok">Nouveau record sur cette tablette !</p>':`<p class="muted">Record : ${rec}</p>`}<div class="sim-actions"><button class="btn btn-primary" id="mAgain">Rejouer</button><button class="btn btn-ghost" id="mClose">Fermer</button></div>`;
  $('#mAgain').onclick=startMental;$('#mClose').onclick=close}

 // Échauffement : 5 exercices de thèmes différents (niveaux 1-2), avec correction immédiate
 function startWarmup(){open('Échauffement · 5 exercices');const themes=THEMES.map((_,i)=>i).sort(()=>Math.random()-.5).slice(0,5);const list=themes.map((t,i)=>generate(t,i<3?1:2));let i=0,score=0;
  const show=()=>{const e=list[i];body.innerHTML=`<div class="diag-progress"><span>${i+1} / 5</span><div><i style="width:${i/5*100}%"></i></div></div><h3>${THEMES[e.theme].name}</h3>${e.visual||''}<p class="question">${e.question}</p><form id="wForm"><div class="answer-row"><input id="wIn" inputmode="decimal" autocomplete="off" aria-label="Réponse"><span class="unit">${e.unit}</span><button class="btn btn-primary">Valider</button></div></form><div id="wFb"></div>`;MathKeys.attach($('#wIn'));$('#wIn').focus();
   $('#wForm').onsubmit=ev=>{ev.preventDefault();const r=check(e,$('#wIn').value);if(r.input){$('#wFb').innerHTML=`<p class="feedback bad">${r.message}</p>`;return}if(r.ok)score++;progress.record(e.theme,e.level,r.ok);
    $('#wFb').innerHTML=`<div class="feedback ${r.ok?'ok':'bad'}">${r.ok?'Juste !':'Pas tout à fait.'} <small>${e.correction}</small></div><button class="btn btn-primary" id="wNext" style="margin-top:12px">${i<4?'Suivant':'Voir le bilan'}</button>`;$('#wForm').querySelector('button').disabled=true;$('#wNext').focus();
    $('#wNext').onclick=()=>{i++;if(i<5)show();else{body.innerHTML=`<div class="diag-result-score">${score} / 5</div><p>${score===5?'Parfait, tu es prêt pour la séance.':score>=3?'Bon échauffement. Reprends les thèmes manqués.':'Revois les fiches de cours des thèmes manqués.'}</p><div class="sim-actions"><button class="btn btn-primary" id="wAgain">Recommencer</button><button class="btn btn-ghost" id="wClose">Fermer</button></div>`;$('#wAgain').onclick=startWarmup;$('#wClose').onclick=close}}}};
  show()}
 $('#startMental').onclick=startMental;$('#startWarmup').onclick=startWarmup;renderRecord();

 // ================= BOÎTE À OUTILS =================
 const CONV={
  'Longueur':{u:{km:1e3,m:1,dm:.1,cm:.01,mm:.001,'µm':1e-6},d:['m','mm']},
  'Surface':{u:{'m²':1,'dm²':.01,'cm²':1e-4,'mm²':1e-6},d:['m²','cm²']},
  'Volume':{u:{'m³':1,L:.001,dL:1e-4,cL:1e-5,mL:1e-6,'dm³':.001,'cm³':1e-6},d:['m³','L']},
  'Débit':{u:{'m³/h':1/3600,'L/min':.001/60,'L/h':.001/3600,'L/s':.001,'m³/s':1},d:['L/min','m³/h']},
  'Temps':{u:{h:3600,min:60,s:1,j:86400},d:['h','min']},
  'Dose':{u:{Sv:1,mSv:1e-3,'µSv':1e-6},d:['µSv','mSv']},
  'Débit de dose':{u:{'mSv/h':1e-3,'µSv/h':1e-6,'µSv/min':1e-6/60*3600},d:['µSv/h','mSv/h']},
  'Activité':{u:{GBq:1e9,MBq:1e6,kBq:1e3,Bq:1,Ci:3.7e10},d:['MBq','Bq']},
  'Puissance':{u:{MW:1e6,kW:1e3,W:1},d:['kW','W']},
  'Pression':{u:{bar:1e5,Pa:1,hPa:100,kPa:1e3,MPa:1e6},d:['bar','Pa']}
 };
 const FORM=[
  {n:'Puissance électrique',f:'P = U × I',v:{P:['W'],U:['V'],I:['A']},s:{P:x=>x.U*x.I,U:x=>x.P/x.I,I:x=>x.P/x.U}},
  {n:'Loi d’Ohm',f:'U = R × I',v:{U:['V'],R:['Ω'],I:['A']},s:{U:x=>x.R*x.I,R:x=>x.U/x.I,I:x=>x.U/x.R}},
  {n:'Dose reçue',f:'Dose = Ḋ × t',v:{Dose:['µSv'],'Ḋ':['µSv/h'],t:['h']},s:{Dose:x=>x['Ḋ']*x.t,'Ḋ':x=>x.Dose/x.t,t:x=>x.Dose/x['Ḋ']}},
  {n:'Débit',f:'Q = V ÷ t',v:{Q:['L/min'],V:['L'],t:['min']},s:{Q:x=>x.V/x.t,V:x=>x.Q*x.t,t:x=>x.V/x.Q}},
  {n:'Vitesse',f:'v = d ÷ t',v:{v:['m/s'],d:['m'],t:['s']},s:{v:x=>x.d/x.t,d:x=>x.v*x.t,t:x=>x.d/x.v}},
  {n:'Cuve cylindrique',f:'V = π × (D ÷ 2)² × h',v:{V:['m³'],D:['m'],h:['m']},s:{V:x=>Math.PI*(x.D/2)**2*x.h,D:x=>2*Math.sqrt(x.V/(Math.PI*x.h)),h:x=>x.V/(Math.PI*(x.D/2)**2)}},
  {n:'Pythagore',f:'c² = a² + b²',v:{c:['m'],a:['m'],b:['m']},s:{c:x=>Math.hypot(x.a,x.b),a:x=>Math.sqrt(x.c**2-x.b**2),b:x=>Math.sqrt(x.c**2-x.a**2)}},
  {n:'Pourcentage d’évolution',f:'t = (Vf − Vi) ÷ Vi × 100',v:{t:['%'],Vi:[''],Vf:['']},s:{t:x=>(x.Vf-x.Vi)/x.Vi*100,Vi:x=>x.Vf/(1+x.t/100),Vf:x=>x.Vi*(1+x.t/100)}}
 ];
 const drawer=$('#toolsDrawer');let toolTab='conv',fi=0,cible=null;
 const parse=v=>MathsExercises.parse(v);
 function renderTools(){$$('#toolsTabs button').forEach(b=>b.classList.toggle('active',b.dataset.t===toolTab));const box=$('#toolsBody');
  if(toolTab==='conv'){const g=$('#convG')?.value||'Volume';
   box.innerHTML=`<label class="sim-ctl"><span>Grandeur</span><select id="convG">${Object.keys(CONV).map(k=>`<option ${k===g?'selected':''}>${k}</option>`).join('')}</select></label>
   <div class="conv-row"><input id="convV" inputmode="decimal" value="${$('#convV')?.value||'1'}" aria-label="Valeur"><select id="convA">${Object.keys(CONV[g].u).map(u=>`<option ${u===CONV[g].d[0]?'selected':''}>${u}</option>`).join('')}</select></div>
   <div class="conv-arrow">↓</div><div class="conv-row"><output id="convR"></output><select id="convB">${Object.keys(CONV[g].u).map(u=>`<option ${u===CONV[g].d[1]?'selected':''}>${u}</option>`).join('')}</select></div><p class="muted" id="convS"></p>`;
   const upd=()=>{const G=CONV[$('#convG').value],v=parse($('#convV').value),a=$('#convA').value,b=$('#convB').value,r=v*G.u[a]/G.u[b];$('#convR').textContent=Number.isFinite(r)?nf(r,6):'—';
    const f=G.u[a]/G.u[b];$('#convS').textContent=Number.isFinite(r)?`1 ${a} = ${nf(f,9)} ${b}`:'Saisis une valeur (ex. 2,5 ou 3e-3).'};
   $('#convG').onchange=()=>{$('#convV').value='1';renderTools()};['convV','convA','convB'].forEach(id=>$('#'+id).addEventListener('input',upd));MathKeys.attach($('#convV'),{after:$('#convV').closest('.conv-row')});upd()}
  else{const F=FORM[fi],keys=Object.keys(F.v);if(!cible||!keys.includes(cible))cible=keys[0];
   box.innerHTML=`<label class="sim-ctl"><span>Formule</span><select id="formSel">${FORM.map((f,i)=>`<option value="${i}" ${i===fi?'selected':''}>${f.n} · ${f.f}</option>`).join('')}</select></label>
   <p class="muted">Je cherche :</p><div class="sim-toggle">${keys.map(k=>`<button type="button" data-k="${k}" class="${k===cible?'active':''}">${k}</button>`).join('')}</div>
   ${keys.filter(k=>k!==cible).map(k=>`<label class="form-in"><span>${k}</span><input data-in="${k}" inputmode="decimal" placeholder="valeur"><em>${F.v[k][0]}</em></label>`).join('')}
   <div class="tool-result" id="formR">—</div>`;
   $('#formSel').onchange=e=>{fi=+e.target.value;cible=null;renderTools()};$$('#toolsBody [data-k]').forEach(b=>b.onclick=()=>{cible=b.dataset.k;renderTools()});
   const upd=()=>{const x={};let okAll=true;$$('#toolsBody [data-in]').forEach(i=>{const v=parse(i.value);x[i.dataset.in]=v;if(!Number.isFinite(v))okAll=false});const r=okAll?F.s[cible](x):NaN;$('#formR').innerHTML=Number.isFinite(r)?`${cible} = <b>${nf(r,4)}</b> ${F.v[cible][0]}`:'Remplis les deux valeurs connues.'};
   $$('#toolsBody [data-in]').forEach(i=>{i.addEventListener('input',upd);MathKeys.attach(i,{after:i.closest('.form-in')})});upd()}}
 $('#toolsBtn').onclick=()=>{drawer.hidden=!drawer.hidden;$('#toolsBtn').setAttribute('aria-expanded',String(!drawer.hidden));if(!drawer.hidden)renderTools()};
 $('#closeTools').onclick=()=>{drawer.hidden=true;$('#toolsBtn').setAttribute('aria-expanded','false')};
 $$('#toolsTabs button').forEach(b=>b.onclick=()=>{toolTab=b.dataset.t;renderTools()});

 // ================= MODE TABLEAU =================
 $('#boardBtn').onclick=()=>{const on=document.documentElement.classList.toggle('board');$('#boardBtn').setAttribute('aria-pressed',String(on));
  try{if(on&&document.documentElement.requestFullscreen&&!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});if(!on&&document.fullscreenElement)document.exitFullscreen()}catch(e){}};
 document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&document.documentElement.classList.contains('board')){document.documentElement.classList.remove('board');$('#boardBtn').setAttribute('aria-pressed','false')}});
})();
