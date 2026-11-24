// Maths TIIN — clavier de calcul intégré.
// Sur écran tactile, le clavier du téléphone (pavé numérique sans « / », « ^ », « × ») est remplacé
// par un pavé de calcul complet. Le bouton ABC rappelle le clavier du téléphone si besoin.
// À la souris (ordinateur), une simple rangée de touches complète le clavier physique.
(function(root){
 const touch=()=>matchMedia('(pointer:coarse)').matches||('ontouchstart' in window&&navigator.maxTouchPoints>0);
 const PAD=[['7'],['8'],['9'],['/','fraction'],['4'],['5'],['6'],['−','moins'],['1'],['2'],['3'],['×10^','puissance de 10'],['0'],[',','virgule'],['^','exposant'],['⌫','effacer','back'],['ABC','clavier du téléphone','abc'],['OK','valider','ok']];
 const ROW=[['/','fraction'],['−','moins'],[',','virgule'],['×10^','puissance de 10'],['^','exposant']];
 function insert(input,txt){const s=input.selectionStart??input.value.length,e=input.selectionEnd??input.value.length;input.value=input.value.slice(0,s)+txt+input.value.slice(e);const p=s+txt.length;try{input.setSelectionRange(p,p)}catch(_){}input.dispatchEvent(new Event('input',{bubbles:true}))}
 function back(input){let s=input.selectionStart??input.value.length,e=input.selectionEnd??input.value.length;if(s===e){if(!s)return;const n=input.value.slice(0,s).endsWith('×10^')?4:1;s-=n}input.value=input.value.slice(0,s)+input.value.slice(e);try{input.setSelectionRange(s,s)}catch(_){}input.dispatchEvent(new Event('input',{bubbles:true}))}
 function attach(input,{after,submit=true}={}){if(!input||input.dataset.keys)return;input.dataset.keys='1';
  const isTouch=touch(),keys=isTouch?PAD:ROW;
  const bar=document.createElement('div');bar.className=isTouch?'mathpad':'mathkeys';bar.setAttribute('role','group');bar.setAttribute('aria-label','Clavier de calcul');
  bar.innerHTML=keys.map(([l,a,k])=>`<button type="button" tabindex="-1" aria-label="${a||l}" data-k="${k||''}" data-v="${k?'':l}" class="${k?'k-'+k:/\d/.test(l)?'k-num':'k-op'}">${l}</button>`).join('');
  if(isTouch){input.setAttribute('inputmode','none');input.setAttribute('autocomplete','off')}
  const form=input.form,canSubmit=submit&&form;if(isTouch&&!canSubmit){const ok=bar.querySelector('.k-ok');if(ok)ok.remove();bar.classList.add('no-ok')}
  let lastTouch=0;
  const act=b=>{if(!b||!bar.contains(b))return;b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),140);const k=b.dataset.k;
   if(k==='abc'){const sys=input.getAttribute('inputmode')!=='none';input.setAttribute('inputmode',sys?'none':'text');b.classList.toggle('on',!sys);bar.classList.toggle('sys',!sys);input.blur();setTimeout(()=>input.focus(),80);return}
   if(k==='ok'){if(form.requestSubmit)form.requestSubmit();else form.dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));return}
   if(document.activeElement!==input){const n=input.value.length;input.focus({preventScroll:true});try{input.setSelectionRange(n,n)}catch(_){}}
   if(k==='back')back(input);else insert(input,b.dataset.v)};
  bar.addEventListener('touchstart',e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();lastTouch=Date.now();act(b)},{passive:false});
  bar.addEventListener('mousedown',e=>{if(e.target.closest('button'))e.preventDefault()});
  bar.addEventListener('click',e=>{e.preventDefault();if(Date.now()-lastTouch<700)return;act(e.target.closest('button'))});
  const row=!after&&input.closest('.answer-row');if(row){row.appendChild(bar);row.classList.add('has-keys')}else(after||input).insertAdjacentElement('afterend',bar)}
 root.MathKeys={attach};
})(globalThis);
