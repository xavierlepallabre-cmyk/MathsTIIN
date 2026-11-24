// Maths TIIN — rangée de touches mathématiques sous les champs de réponse.
// Le clavier numérique des tablettes n'a ni « / », ni « ^ », ni « × » : ces touches les ajoutent.
(function(root){
 const KEYS=[['/','fraction','/'],['−','moins','−'],[',','virgule',','],['×10^','puissance de 10','×10^'],['^','exposant','^'],['ABC','clavier complet',null]];
 function insert(input,txt){const s=input.selectionStart??input.value.length,e=input.selectionEnd??input.value.length;input.value=input.value.slice(0,s)+txt+input.value.slice(e);const p=s+txt.length;try{input.setSelectionRange(p,p)}catch(_){}input.dispatchEvent(new Event('input',{bubbles:true}))}
 function attach(input,{after}={}){if(!input||input.dataset.keys)return;input.dataset.keys='1';
  const bar=document.createElement('div');bar.className='mathkeys';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','Touches mathématiques');
  bar.innerHTML=KEYS.map(([l,a,v])=>`<button type="button" tabindex="-1" aria-label="${a}" data-v="${v??''}"${v==null?' data-abc="1"':''}>${l}</button>`).join('');
  // pointerdown + preventDefault : le champ garde le focus, le clavier de la tablette reste ouvert
  bar.addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();
   if(b.dataset.abc){const full=input.getAttribute('inputmode')==='text';input.setAttribute('inputmode',full?'decimal':'text');b.classList.toggle('on',!full);input.blur();setTimeout(()=>input.focus(),60);return}
   insert(input,b.dataset.v);input.focus()});
  bar.addEventListener('click',e=>e.preventDefault());
  const row=!after&&input.closest('.answer-row');if(row){row.appendChild(bar);row.classList.add('has-keys')}else(after||input).insertAdjacentElement('afterend',bar)}
 root.MathKeys={attach};
})(globalThis);
