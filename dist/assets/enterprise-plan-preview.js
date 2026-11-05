// Natural scrolling; only keep the chapter guide and fixed-header offsets in sync.
(() => {
 const root=document.documentElement,header=document.querySelector('.header'),nav=document.querySelector('.ip-subnav');
 if(!nav)return;
 const links=[...nav.querySelectorAll('a[href^="#"]')];
 const chapters=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
 function update(){
  const line=header.getBoundingClientRect().height+nav.getBoundingClientRect().height+30;
  const active=chapters.filter(s=>s.getBoundingClientRect().top<=line).at(-1);
  links.forEach(a=>active&&a.hash==='#'+active.id?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));
 }
 function measure(){
  root.style.setProperty('--ip-header',Math.ceil(header.getBoundingClientRect().height)+'px');
  root.style.setProperty('--es-nav-height',Math.ceil(nav.getBoundingClientRect().height)+'px');
  update();
 }
 new ResizeObserver(measure).observe(header);
 new ResizeObserver(measure).observe(nav);
 let queued=false;
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;update();});}},{passive:true});
 addEventListener('load',measure,{once:true});
 measure();
})();
