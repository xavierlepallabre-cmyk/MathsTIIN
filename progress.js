(function(root){
 const KEY='maths-tiin-progress-v1';
 const count=12;
 function blank(){return {version:1,themes:Array.from({length:count},()=>({attempts:0,correct:0,mastery:0,levels:[0,0,0]})),diagnostics:[]}}
 function sanitize(v){const out=blank();if(!v||typeof v!=='object')return out;(v.themes||[]).slice(0,count).forEach((t,i)=>{if(!t)return;out.themes[i].attempts=Math.max(0,Number(t.attempts)||0);out.themes[i].correct=Math.max(0,Number(t.correct)||0);out.themes[i].mastery=Math.max(0,Math.min(100,Number(t.mastery)||0));out.themes[i].levels=[0,1,2].map(j=>Math.max(0,Number(t.levels&&t.levels[j])||0))});if(Array.isArray(v.diagnostics))out.diagnostics=v.diagnostics.slice(-5);return out}
 let state=blank();try{const raw=localStorage.getItem(KEY);if(raw)state=sanitize(JSON.parse(raw))}catch(e){}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
 function record(theme,level,ok,quality=1){const t=state.themes[theme];t.attempts++;if(ok){t.correct++;t.levels[level-1]++;const q=Math.max(.25,Math.min(1,Number(quality)||1));t.mastery=Math.min(100,t.mastery+(100-t.mastery)*(level===3?.16:level===2?.14:.12)*q)}else t.mastery=Math.max(0,t.mastery-t.mastery*.055);save();return t}
 function diagnostic(result){state.diagnostics.push({date:new Date().toISOString(),score:result.score,total:result.total,byTheme:result.byTheme});state.diagnostics=state.diagnostics.slice(-5);save()}
 function reset(){state=blank();save()}
 function theme(i){return state.themes[i]}
 function all(){return JSON.parse(JSON.stringify(state))}
 function global(){const used=state.themes.filter(t=>t.attempts>0);return used.length?Math.round(used.reduce((s,t)=>s+t.mastery,0)/used.length):0}
 function attempts(){return state.themes.reduce((s,t)=>s+t.attempts,0)}
 root.MathsProgress={record,diagnostic,reset,theme,all,global,attempts,KEY};
})(globalThis);
