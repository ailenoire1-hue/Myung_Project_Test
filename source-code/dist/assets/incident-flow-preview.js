// Continuous reading with a compact, persistent chapter guide.
(() => {
 if(!document.body.classList.contains('if-page'))return;
 const nav=document.querySelector('.if-topbar'),links=[...nav.querySelectorAll('a[href^="#"]')];
 const targets=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);
 let ticking=false;
 function update(){
  const offset=(document.querySelector('.header')?.getBoundingClientRect().height||94)+nav.getBoundingClientRect().height+24;
  const target=targets.filter(s=>s.getBoundingClientRect().top<=offset).at(-1);
  links.forEach(a=>{if(target&&a.hash==='#'+target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  ticking=false;
 }
 window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
 window.addEventListener('resize',update,{passive:true});
 window.addEventListener('load',update,{once:true});
 update();
})();
