(() => {
 if(!document.body.classList.contains('sub-page'))return;
 const root=document.documentElement,header=document.querySelector('.header'),jumps=document.querySelector('.detail-jumps');
 const hero=document.querySelector('.detail-hero');
 if(!hero||!header)return;
 hero.setAttribute('data-detail-chapter','');
 document.querySelectorAll('main .detail-section:not(.forensic-analysis):not(.detail-services),main .detail-related,main .ir-results,main .ir-preparation,.contact-band').forEach(el=>el.setAttribute('data-detail-chapter',''));
 const selector=document.querySelector('.forensic-selector');
 if(selector){
  const measure=()=>selector.closest('.forensic-tabs').style.setProperty('--field-selector-height',`${selector.getBoundingClientRect().height}px`);
  measure();new ResizeObserver(measure).observe(selector);
 }
 const desktop=matchMedia('(min-width:801px) and (hover:hover) and (pointer:fine)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let animation=0,moving=false,lastWheel=0,total=0,direction=0,consumed=false,reading=false;
 const reset=()=>{lastWheel=0;total=0;direction=0;consumed=false;reading=false;};
 const cancel=()=>{cancelAnimationFrame(animation);animation=0;moving=false;reset();};
 const bounds=()=>{
  const maximum=Math.max(0,root.scrollHeight-innerHeight);
  const targets=[...document.querySelectorAll('[data-detail-chapter]')].filter(el=>el.getClientRects().length&&el.getBoundingClientRect().height>0);
  const entries=targets.map(el=>{
   const offset=0;
   const top=el.getBoundingClientRect().top+scrollY;
   return {top,start:el===hero?0:Math.max(0,Math.min(maximum,top-offset))};
  });
  return entries.map((entry,i)=>({start:entry.start,end:i===entries.length-1?maximum:Math.max(entry.start,Math.min(maximum,entries[i+1].top-innerHeight))}));
 };
 const moveTo=destination=>{
  const origin=scrollY,distance=destination-origin;
  if(Math.abs(distance)<2)return;
  const started=performance.now();moving=true;
  const step=now=>{
   const t=Math.min(1,(now-started)/720),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
   window.scrollTo({top:origin+distance*ease,behavior:'instant'});
   if(t<1)animation=requestAnimationFrame(step);else{moving=false;animation=0;}
  };
  animation=requestAnimationFrame(step);
 };
 const nestedScroll=target=>{
  for(let el=target instanceof Element?target:null;el&&el!==document.body&&el!==root;el=el.parentElement){
   if(el.matches('input,textarea,select,[contenteditable="true"],dialog,.header,.detail-jumps'))return true;
   if(el.scrollHeight>el.clientHeight+2&&/auto|scroll/.test(getComputedStyle(el).overflowY))return true;
  }
  return false;
 };
 window.addEventListener('wheel',event=>{
  if(event.defaultPrevented||!event.cancelable||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;
  if(!desktop.matches||reduced.matches||document.querySelector('dialog[open],.header.has-open-menu,.header.has-dropdown-open,.detail-jumps.is-open')||nestedScroll(event.target)){
   if(moving)cancel();return;
  }
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(!delta)return;
  const now=performance.now(),sign=Math.sign(delta);
  if(now-lastWheel>200){total=0;consumed=false;reading=false;direction=sign;}
  lastWheel=now;
  if(moving||consumed){event.preventDefault();return;}
  if(direction!==sign){total=0;direction=sign;}
  const chapters=bounds(),y=scrollY;
  let current=0;chapters.forEach((chapter,i)=>{if(chapter.start<=y+3)current=i;});
  const chapter=chapters[current];if(!chapter)return;
  if(chapter.end-chapter.start>8&&((direction>0&&y<chapter.end-2)||(direction<0&&y>chapter.start+2&&y<=chapter.end+3))){
   event.preventDefault();reading=true;
   window.scrollTo({top:Math.max(chapter.start,Math.min(chapter.end,y+delta)),behavior:'instant'});return;
  }
  if(reading){event.preventDefault();return;}
  const destination=direction>0?chapters[current+1]?.start:y>chapter.start+3?chapter.end:chapters[current-1]?.end;
  if(destination===undefined||Math.abs(destination-y)<2)return;
  event.preventDefault();total+=Math.abs(delta);
  if(total<32)return;
  consumed=true;total=0;moveTo(destination);
 },{passive:false});
 ['resize','hashchange','pageshow','blur','pointerdown','touchstart'].forEach(name=>addEventListener(name,cancel,{passive:true}));
 document.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape','Tab'].includes(event.key))cancel();});
 document.addEventListener('click',event=>{if(event.target.closest('a[href],button,summary'))cancel();});
 document.addEventListener('toggle',cancel,true);
 desktop.addEventListener('change',cancel);reduced.addEventListener('change',cancel);
})();
