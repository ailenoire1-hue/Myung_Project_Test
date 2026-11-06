(() => {
 const header=document.querySelector('.header'),nav=document.querySelector('.ip-subnav');if(!nav)return;
 const links=[...nav.querySelectorAll('a[href^="#"]')],sections=[...document.querySelectorAll('.es-content>section[id],main>section#contact')];
 let queued=false;
 const update=()=>{const line=header.getBoundingClientRect().height+nav.getBoundingClientRect().height+24;const active=sections.filter(s=>s.getBoundingClientRect().top<=line).at(-1);const group=active?.dataset.esParent||active?.id;links.forEach(a=>(a.dataset.esGroup||a.hash.slice(1))===group?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));document.querySelectorAll('[data-es-variant]').forEach(a=>{a.hash=active?'#'+active.id:'#top'});queued=false;};
 function measure(){document.documentElement.style.setProperty('--ip-header',Math.ceil(header.getBoundingClientRect().height)+'px');document.documentElement.style.setProperty('--es-nav-height',Math.ceil(nav.getBoundingClientRect().height)+'px');update();}
 new ResizeObserver(measure).observe(header);new ResizeObserver(measure).observe(nav);
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});addEventListener('load',measure,{once:true});measure();
})();
