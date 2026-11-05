(() => {
 const section=document.querySelector('[data-pride-business]');
 if(!section)return;
 const buttons=[...section.querySelectorAll('[data-business-select]')];
 const photos=[...section.querySelectorAll('.pride-business-photo')];
 const details=[...section.querySelectorAll('.pride-business-detail')];
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let active=0,elapsed=0,last=performance.now();
 function select(index){
  const previous=active;active=index;elapsed=0;
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
  details.forEach((detail,i)=>detail.hidden=i!==active);
  photos.forEach((photo,i)=>{photo.classList.toggle('is-active',i===active);photo.classList.toggle('is-leaving',i===previous&&i!==active);photo.setAttribute('aria-hidden',String(i!==active));});
 }
 buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
 // Keep automatic case browsing consistent with the other preview.
 function tick(now){
  const delta=Math.min(now-last,100);last=now;
  const bounds=section.getBoundingClientRect();
  const selected=document.querySelector('[data-home-section-nav] a[aria-current]');
  if(!document.hidden&&!reduced.matches&&!section.querySelector(':focus-visible')&&(!selected||selected.hash==='#national-experience')&&bounds.top<innerHeight*.5&&bounds.bottom>innerHeight*.5){
   elapsed+=delta;if(elapsed>=6500)select((active+1)%buttons.length);
  }
  requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
})();
