(() => {
 const cue=document.querySelector('[data-home-scroll-cue]');
 const navigation=document.querySelector('[data-home-section-nav]');
 if(!cue||!navigation)return;
 let queued=false;
 const update=()=>{
  queued=false;
  const links=[...navigation.querySelectorAll('a[href^="#"]')].filter(link=>document.getElementById(link.hash.slice(1)));
  const current=links.findIndex(link=>link.hasAttribute('aria-current'));
  const next=links[current+1];
  // Layered panels remain sticky behind later chapters: read the normal-flow
  // marker, as the approved quick menu does, instead of the video rectangle.
  const firstContent=document.querySelector('[data-chapter-target="main"]')||document.getElementById('main');
  const afterVideo=firstContent&&firstContent.getBoundingClientRect().top<=8;
  const visible=Boolean(afterVideo&&current>=0&&links[current].hash!=='#home-video'&&links[current].hash!=='#home-contact'&&next);
  cue.hidden=!visible;
  if(!visible)return;
  const chapter=links[current].hash;
  const label=next.querySelector('.home-section-label')?.textContent.trim()||next.textContent.trim();
  cue.setAttribute('href',next.hash);
  cue.setAttribute('aria-label',`다음 내용: ${label}`);
  cue.setAttribute('title',`다음: ${label}`);
  cue.dataset.currentChapter=chapter.slice(1);
  // The incident section has a dark photo on its left, although its main
  // navigation theme follows the light content area on the right.
  cue.dataset.theme=chapter==='#main'||chapter==='#home-incident-response'?'dark':navigation.dataset.theme||'light';
 };
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 new MutationObserver(schedule).observe(navigation,{subtree:true,attributes:true,attributeFilter:['aria-current','data-theme']});
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 addEventListener('hashchange',schedule);
 addEventListener('load',schedule,{once:true});
 // The ordinary fragment link is deliberately handled by home-section-nav.js:
 // this preserves its layered transition, history, and reduced-motion behavior.
 update();
})();
