/* Preview navigation only. Does not collect or transmit visitor data. */
(() => {
 const toggle=document.querySelector('.mp-menu-toggle'),nav=document.querySelector('.mp-nav');
 if(toggle&&nav){
  const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click',e=>{if(e.target.closest('a,button'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 }
 const route=location.pathname.split('/').pop().replace(/\.html$/,'');
 document.querySelectorAll('.mp-preview-switch a,.mp-nav>a').forEach(a=>{
  const target=a.getAttribute('href')?.split(/[?#]/)[0].replace(/\.html$/,'');
  if(target===route)a.setAttribute('aria-current','page');
 });
})();
