(() => {
 const page=document.querySelector('.company-topbar-page');
 if(!page)return;
 const root=document.documentElement,header=page.querySelector('.header'),bar=page.querySelector('.company-topbar'),hero=page.querySelector('.company-hero'),nav=bar?.querySelector('.company-topbar-links');
 if(!header||!bar||!hero||!nav)return;
 const chapters=[hero,...page.querySelectorAll('main>.detail-section,main>.contact-band')];
 const links=[...nav.querySelectorAll('a[href^="#"]')].map(link=>({link,target:document.getElementById(link.hash.slice(1))})).filter(item=>item.target);
 const desktop=matchMedia('(min-width:1101px) and (min-height:680px) and (hover:hover) and (pointer:fine)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let headerHeight=102,barHeight=58,active=null,queued=false,frame=0,moving=false,lastWheel=0,total=0,direction=0,consumed=false,reading=false;
 const offset=()=>headerHeight+barHeight;
 const measure=()=>{headerHeight=Math.ceil(header.getBoundingClientRect().height);barHeight=Math.ceil(bar.getBoundingClientRect().height);root.style.setProperty('--ir-header-height',`${headerHeight}px`);page.style.setProperty('--ct-header-height',`${headerHeight}px`);page.style.setProperty('--ct-bar-height',`${barHeight}px`);};
 const keepActiveVisible=link=>{if(nav.scrollWidth<=nav.clientWidth)return;const a=link.getBoundingClientRect(),n=nav.getBoundingClientRect();if(a.left<n.left||a.right>n.right)nav.scrollTo({left:nav.scrollLeft+a.left-n.left-(nav.clientWidth-a.width)/2,behavior:reduced.matches?'instant':'smooth'});};
 function update(){
  queued=false;
  const isReading=hero.getBoundingClientRect().bottom<=headerHeight+1;
  page.classList.toggle('ct-is-reading',isReading);header.dataset.theme=isReading?'light':'dark';
  let current=null;
  for(const item of links)if(item.target.getBoundingClientRect().top<=offset()+26)current=item;
  if(current!==active){active=current;links.forEach(item=>{if(item===current)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');});if(current)keepActiveVisible(current.link);}
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 const reset=()=>{lastWheel=0;total=0;direction=0;consumed=false;reading=false;};
 const cancel=()=>{cancelAnimationFrame(frame);frame=0;moving=false;reset();};
 const maximum=()=>Math.max(0,root.scrollHeight-innerHeight);
 const destination=element=>element===hero||element===document.getElementById('main')?0:Math.max(0,Math.min(maximum(),scrollY+element.getBoundingClientRect().top-offset()));
 const moveTo=(target,instant=false)=>{
  cancelAnimationFrame(frame);frame=0;const origin=scrollY,distance=target-origin;
  if(Math.abs(distance)<2)return;
  if(instant||reduced.matches){window.scrollTo({top:target,behavior:'instant'});moving=false;schedule();return;}
  const start=performance.now();moving=true;
  const tick=time=>{const t=Math.min(1,(time-start)/620),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;window.scrollTo({top:origin+distance*ease,behavior:'instant'});if(t<1)frame=requestAnimationFrame(tick);else{frame=0;moving=false;schedule();}};
  frame=requestAnimationFrame(tick);
 };
 function hashTarget(){
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return null;}
  const target=document.getElementById(id);if(!target)return null;
  if(target===document.getElementById('main'))return hero;
  if(target.matches('.company-branch')&&!matchMedia('(min-width:801px)').matches)return target;
  return target.closest('main>section')||target;
 }
 const alignHash=()=>{const target=hashTarget();if(target)requestAnimationFrame(()=>{measure();moveTo(destination(target),true);});};
 const bounds=()=>chapters.filter(el=>el.getClientRects().length).map(el=>{const start=destination(el),bottom=el.getBoundingClientRect().bottom+scrollY;return {start,end:Math.max(start,Math.min(maximum(),bottom-innerHeight))};});
 const nested=target=>{for(let el=target instanceof Element?target:null;el&&el!==page&&el!==root;el=el.parentElement){if(el.matches('input,textarea,select,[contenteditable="true"],dialog,.header,.company-topbar'))return true;if(el.scrollHeight>el.clientHeight+2&&/auto|scroll/.test(getComputedStyle(el).overflowY))return true;}return false;};
 window.addEventListener('wheel',event=>{
  if(event.defaultPrevented||!event.cancelable||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;
  if(!desktop.matches||reduced.matches||document.querySelector('dialog[open],.header.has-open-menu,.header.has-dropdown-open')||nested(event.target)){if(moving)cancel();return;}
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);if(!delta)return;
  const now=performance.now(),sign=Math.sign(delta);if(now-lastWheel>200){total=0;consumed=false;reading=false;direction=sign;}lastWheel=now;
  if(moving||consumed){event.preventDefault();return;}
  if(direction!==sign){total=0;direction=sign;}
  const entries=bounds(),y=scrollY;let index=0;entries.forEach((entry,i)=>{if(entry.start<=y+3)index=i;});const entry=entries[index];if(!entry)return;
  if(entry.end-entry.start>8&&((direction>0&&y<entry.end-2)||(direction<0&&y>entry.start+2&&y<=entry.end+3))){event.preventDefault();reading=true;window.scrollTo({top:Math.max(entry.start,Math.min(entry.end,y+delta)),behavior:'instant'});return;}
  if(reading){event.preventDefault();return;}
  const target=direction>0?entries[index+1]?.start:y>entry.start+3?entry.end:entries[index-1]?.end;
  if(target===undefined||Math.abs(target-y)<2)return;
  event.preventDefault();total+=Math.abs(delta);if(total<32)return;consumed=true;total=0;moveTo(target);
 },{passive:false});
 document.addEventListener('click',event=>{
  const anchor=event.target.closest('a[href^="#"]');
  if(anchor&&!event.defaultPrevented&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){const target=document.getElementById(anchor.hash.slice(1));if(target&&page.contains(target)){event.preventDefault();cancel();history.pushState(null,'',anchor.hash);moveTo(destination(target));}}
  // Preserve the case tabs while correcting their legacy zero-offset scroll.
  if(event.target.closest('.company-recovery-tabs [role="tab"]'))requestAnimationFrame(()=>moveTo(destination(document.getElementById('national-response')),true));
 });
 document.addEventListener('keydown',event=>{
  if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape','Tab'].includes(event.key))cancel();
  if(event.target.closest('.company-recovery-tabs [role="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key))requestAnimationFrame(()=>moveTo(destination(document.getElementById('national-response')),true));
 });
 ['scroll','load'].forEach(name=>addEventListener(name,schedule,{passive:true}));
 addEventListener('resize',()=>{cancel();measure();schedule();},{passive:true});
 ['pointerdown','touchstart','blur'].forEach(name=>addEventListener(name,cancel,{passive:true}));
 addEventListener('hashchange',()=>{cancel();alignHash();});addEventListener('popstate',()=>{cancel();if(location.hash)alignHash();else moveTo(0,true);});
 document.addEventListener('toggle',()=>{cancel();schedule();},true);
 desktop.addEventListener('change',cancel);reduced.addEventListener('change',cancel);
 new ResizeObserver(()=>{measure();schedule();}).observe(header);
 measure();update();if(location.hash)alignHash();addEventListener('load',alignHash,{once:true});
})();
