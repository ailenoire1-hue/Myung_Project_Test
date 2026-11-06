(() => {
 const header=document.querySelector('.header');
 const chapters=[...document.querySelectorAll('.home-service-editorial')];
 if(!header||!chapters.length)return;
 const navigation=[...header.querySelectorAll('.nav-page-link,.nav-mobile-trigger,.nav-contact')];
 let queued=false;
 function update(){
  queued=false;
  const sample=Math.max(1,Math.min(header.getBoundingClientRect().bottom-1,60));
  const panels=[...document.querySelectorAll('[data-home-stack-panel]')];
  const surfaces=panels.length?panels:[...document.querySelectorAll('.service-chapter,#national-experience,.calm-hero,.contact-band,.footer')];
  const upper=surfaces.filter(panel=>{const rect=panel.getBoundingClientRect();return rect.top<=sample&&rect.bottom>sample;}).at(-1);
  const photo=upper?.querySelector('.home-service-photo');
  const rect=photo?.getBoundingClientRect();
  const active=Boolean(chapters.includes(upper)&&rect&&rect.top<=sample&&rect.bottom>sample);
  const mirrored=active&&upper.classList.contains('home-service-mirrored');
  header.classList.toggle('is-service-editorial',active);
  header.classList.toggle('is-service-editorial-reversed',mirrored);
  navigation.forEach(link=>{
   const bounds=link.getBoundingClientRect();
   const split=mirrored&&innerWidth>1100&&bounds.left<rect.left&&bounds.right>rect.left;
   link.classList.toggle('has-editorial-split-ink',Boolean(split));
   link.style.setProperty('--editorial-item-ink',mirrored&&bounds.left+bounds.width/2>=rect.left?'#fff':'#202830');
   if(split)link.style.setProperty('--editorial-ink-split',`${rect.left-bounds.left}px`);
  });
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 ['scroll','resize','load','hashchange'].forEach(event=>addEventListener(event,schedule,{passive:true}));
 update();
})();
