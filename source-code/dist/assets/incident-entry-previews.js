// Preserve the section being compared when changing the design alternative.
(() => {
 const links=[...document.querySelectorAll('[data-irx-variant]')];
 const sections=[...document.querySelectorAll('main>section[id]')];
 let pending=false;
 function update(){
  const offset=(document.querySelector('.header')?.getBoundingClientRect().height||94)+80;
  const current=sections.filter(el=>el.getBoundingClientRect().top<offset).at(-1);
  const hash='#'+(current?.id||'top');
  links.forEach(a=>{a.hash=hash;});
  pending=false;
 }
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});
 window.addEventListener('load',update,{once:true});
 update();
})();
