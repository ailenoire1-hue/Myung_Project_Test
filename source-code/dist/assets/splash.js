const intro=document.querySelector('.site-intro');
const root=document.documentElement;
const params=new URLSearchParams(location.search);
const held=params.get('hold')==='1';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const review=intro?.dataset.splashPreview==='true';
const duration=Number(intro?.dataset.introDuration)||4000;
if(intro&&params.get('skip')!=='1'&&(review||held||params.get('intro')==='1'))root.classList.add('intro-pending');
function replay(hold=false){const url=new URL(location.href);url.searchParams.set('intro','1');url.searchParams.delete('skip');if(hold)url.searchParams.set('hold','1');else url.searchParams.delete('hold');if(url.href===location.href)location.reload();else location.assign(url.href);}
document.querySelectorAll('[data-replay]').forEach(button=>button.addEventListener('click',()=>replay()));
document.querySelectorAll('[data-hold]').forEach(button=>button.addEventListener('click',()=>replay(true)));
if(intro&&root.classList.contains('intro-pending')){
 clearTimeout(window.__mdfcIntroFailsafe);
 const background=document.querySelectorAll('.header,main,.footer,.contact-band,.preview-toolbar');
 const skip=intro.querySelector('.intro-skip');
 background.forEach(el=>el.inert=true);
 const counters=[...intro.querySelectorAll('[data-count-to]')];
 const trace=intro.querySelector('[data-intro-trace]');
 const traceHead=intro.querySelector('[data-intro-head]');
 const traceYear=intro.querySelector('[data-intro-year]');
 const currentYear=Number(intro.dataset.factYear)||new Date().getFullYear();
 const foundingYear=Number(intro.dataset.foundingYear)||1990;
 const traceLength=trace?.getTotalLength()||0;
 if(trace)trace.style.strokeDasharray=traceLength;
 let finished=false,frame;
 const complete=()=>{if(finished)return;finished=true;cancelAnimationFrame(frame);root.classList.remove('intro-pending','intro-hold');root.classList.add('intro-complete');background.forEach(el=>el.inert=false);try{sessionStorage.setItem('mdfc-intro-seen','1');}catch{}const focusWasInside=intro.contains(document.activeElement);intro.remove();if(focusWasInside)document.querySelector('.hero-actions a')?.focus({preventScroll:true});};
 const setNumbers=ratio=>counters.forEach(el=>{const target=Number(el.dataset.countTo);el.textContent=Math.round(target*ratio).toLocaleString('en-US');});
 const setTrace=ratio=>{
  if(!trace)return;
  trace.style.strokeDashoffset=traceLength*(1-ratio);
  const point=trace.getPointAtLength(traceLength*ratio);
  traceHead?.setAttribute('transform',`translate(${point.x} ${point.y})`);
  if(traceYear){
   traceYear.textContent=String(foundingYear+Math.round((currentYear-foundingYear)*ratio));
   traceYear.style.setProperty('--trace-x',`${point.x/1200*100}%`);
   traceYear.style.setProperty('--trace-y',String(point.y/60));
  }
  if(intro.dataset.evolution)intro.style.setProperty('--type-progress',String(Math.min(1,ratio*3300/2850)));
 };
 skip.addEventListener('click',complete);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')complete();});
 if(held||reduced.matches){setNumbers(1);setTrace(1);intro.classList.add('is-held');if(!held)setTimeout(complete,duration);}
 else{
  let started=false;
  const begin=()=>{
  if(started||finished||document.visibilityState==='hidden')return;
  started=true;
  setNumbers(0);
  setTrace(0);
  const start=performance.now();
  const tick=now=>{if(finished)return;const elapsed=now-start;const t=Math.min(1,Math.max(0,(elapsed-300)/2600));const progress=t*t*(3-2*t);setNumbers(progress);setTrace(Math.min(1,Math.max(0,elapsed/3300)));if(t===1)intro.classList.add('is-counted');if(elapsed<3300)frame=requestAnimationFrame(tick);};
  frame=requestAnimationFrame(tick);
  intro.classList.add('is-running');
  intro.addEventListener('animationend',e=>{if(e.target===intro&&['splash-open','b-intro-finish'].includes(e.animationName))complete();});
  setTimeout(complete,duration+50);
  };
  if(document.visibilityState==='hidden')document.addEventListener('visibilitychange',begin);
  else begin();
 }
 reduced.addEventListener('change',e=>{if(e.matches){setNumbers(1);setTrace(1);if(!held)complete();}},{once:true});
}else if(intro){intro.remove();}
