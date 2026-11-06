(() => {
 const comparison=document.body.classList.contains('qm-comparison');
 document.querySelectorAll('[data-quick-menu]').forEach(menu=>{
  const toggle=menu.querySelector('.qm-toggle');
  const panel=menu.querySelector('.qm-panel');
  const mobile=matchMedia('(max-width:800px)');
  const setOpen=(open,focus=false)=>{
   menu.classList.toggle('is-open',open);
   toggle.setAttribute('aria-expanded',String(open));
   if(focus)toggle.focus();
  };
  if(mobile.matches&&!comparison)setOpen(false);
  toggle.addEventListener('click',()=>setOpen(!menu.classList.contains('is-open')));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.contains(document.activeElement))setOpen(false,true);});
  document.addEventListener('click',event=>{
   if(!menu.contains(event.target)&&menu.classList.contains('is-open')&&mobile.matches)setOpen(false);
  });
  panel.addEventListener('wheel',event=>event.stopPropagation(),{passive:true});
  if(menu.hasAttribute('data-after-video')){
   // The opening film stays sticky behind later chapters. Its normal-flow
   // successor marker, rather than the film's rectangle, defines visibility.
   let queued=false;
   const updateVisibility=()=>{
    queued=false;
    const start=document.querySelector('[data-chapter-target="main"]');
    const show=Boolean(start&&start.getBoundingClientRect().top<=8);
    menu.hidden=!show;
    if(!show)setOpen(false);
   };
   const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(updateVisibility);}};
   addEventListener('scroll',schedule,{passive:true});
   addEventListener('resize',schedule,{passive:true});
   addEventListener('pageshow',schedule);
   addEventListener('hashchange',schedule);
   addEventListener('load',schedule,{once:true});
   updateVisibility();
  }
  if(comparison){
   menu.querySelector('[data-contact]').addEventListener('click',()=>location.href='index.html#home-contact');
   menu.querySelector('.qm-top')?.addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
  }
 });
 // Keep the same chapter selected when switching among preview designs.
 document.querySelectorAll('.qm-preview-tools a').forEach(link=>{
  if(!link.getAttribute('href').startsWith('quick-menu-')||link.getAttribute('href').includes('previews'))return;
  const update=()=>{
   const current=document.querySelector('[data-home-section-nav] a[aria-current]')?.hash||'#main';
   const destination=new URL(link.href);destination.hash=current;link.href=destination.href;
  };
  link.addEventListener('pointerdown',update);
  link.addEventListener('focus',update);
 });
})();
