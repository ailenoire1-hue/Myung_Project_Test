(() => {
 const nav=document.querySelector('.ec-topbar');if(!nav)return;
 const links=[...nav.querySelectorAll('a[href^="#"]')],sections=[...document.querySelectorAll('main>section[id]')];
 let queued=false;
 function update(){const line=(document.querySelector('.header')?.getBoundingClientRect().height||94)+nav.getBoundingClientRect().height+24;const active=sections.filter(s=>s.getBoundingClientRect().top<=line).at(-1);const group=active?.dataset.ecParent||active?.id;links.forEach(a=>a.dataset.ecGroup===group?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));document.querySelectorAll('[data-ec-variant]').forEach(a=>{a.hash=active?'#'+active.id:'#top';});queued=false;}
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update,{passive:true});addEventListener('load',update,{once:true});update();
 const checks=[...document.querySelectorAll('[data-ec-check]')],count=document.querySelector('[data-ec-check-count]');
 const refresh=()=>{count.textContent=`확인 ${checks.filter(x=>x.checked).length} / ${checks.length}`;};
 checks.forEach(x=>x.addEventListener('change',refresh));document.querySelector('[data-ec-reset]')?.addEventListener('click',()=>{checks.forEach(x=>{x.checked=false;});refresh();});
})();
