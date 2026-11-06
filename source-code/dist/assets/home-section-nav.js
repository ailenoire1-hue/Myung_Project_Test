(() => {
 const nav=document.querySelector('[data-home-section-nav]');
 if(!nav)return;
 const root=document.documentElement;
 const header=document.querySelector('.header');
 const footer=document.querySelector('.footer');
 const measureChrome=()=>{
  root.style.setProperty('--home-header-height',`${header?.getBoundingClientRect().height||0}px`);
  root.style.setProperty('--home-footer-height',`${footer?.getBoundingClientRect().height||0}px`);
 };
 measureChrome();
 const chromeObserver=new ResizeObserver(measureChrome);
 if(header)chromeObserver.observe(header);
 if(footer)chromeObserver.observe(footer);
 const links=[...nav.querySelectorAll('a[href^="#"]')];
 const toggle=nav.querySelector('.home-section-nav-toggle');
 const contact=document.querySelector('.contact-band');
 if(contact)contact.id='home-contact';
 const items=links.map(link=>({link,target:document.getElementById(link.hash.slice(1))})).filter(item=>item.target);
 const videoHome=document.body.classList.contains('video-home-page');
 const stackMotion=matchMedia('(min-width:801px) and (prefers-reduced-motion: no-preference)');
 if(videoHome){
  items.forEach((item,index)=>{
   item.panel=item.link.hash==='#main'?item.target.querySelector('.calm-hero'):item.target;
   item.marker=document.createElement('span');
   item.marker.className='home-chapter-marker';
   item.marker.dataset.chapterTarget=item.link.hash.slice(1);
   item.marker.setAttribute('aria-hidden','true');
   item.target.before(item.marker);
   item.panel.dataset.homeStackPanel='';
   item.panel.style.setProperty('--home-stack-level',String(index+1));
  });
  const measurePanels=()=>{
   items.forEach(item=>item.panel.style.setProperty('--home-stack-top',`${Math.min(0,innerHeight-item.panel.getBoundingClientRect().height)}px`));
  };
  const panelObserver=new ResizeObserver(measurePanels);
  items.forEach(item=>panelObserver.observe(item.panel));
  addEventListener('resize',measurePanels,{passive:true});
  stackMotion.addEventListener('change',measurePanels);
  measurePanels();
 }
 const positionOf=item=>(item.marker||item.target).getBoundingClientRect().top+scrollY;
 const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
 nav.addEventListener('click',event=>{if(event.target.closest('a'))close();});
 document.addEventListener('click',event=>{if(!nav.contains(event.target))close();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open')){close();toggle.focus();}});
 let queued=false;
 const update=()=>{
  queued=false;
  const marker=(header?.getBoundingClientRect().height||0)+Math.min(innerHeight*.2,140);
  let active=items[0];
  for(const item of items){if(positionOf(item)-scrollY<=marker)active=item;}
  for(const item of items){if(item===active)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');}
  const visible=videoHome&&stackMotion.matches?items.filter(item=>{const rect=item.panel.getBoundingClientRect();return rect.top<=innerHeight/2&&rect.bottom>innerHeight/2;}).at(-1):active;
  const dark=(visible?.panel||visible?.target)?.dataset.navTheme==='dark'||visible?.link.hash==='#main'||visible?.link.hash==='#home-contact';
  nav.dataset.theme=dark?'dark':'light';
 };
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 addEventListener('load',schedule,{once:true});
 update();

 // Natural-flow markers keep wheel and anchor coordinates stable even while
 // the desktop video homepage holds earlier panels behind the incoming one.
 const desktopWheel=matchMedia('(min-width:801px) and (hover:hover) and (pointer:fine)');
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 let animation=0,moving=false,lastWheel=0,total=0,direction=0,consumed=false,reading=false;
 const resetGesture=()=>{lastWheel=0;total=0;direction=0;consumed=false;reading=false;};
 const cancelMove=()=>{cancelAnimationFrame(animation);animation=0;moving=false;resetGesture();};
 const bounds=()=>{
  const chrome=0;
  const viewport=Math.max(1,innerHeight-chrome);
  const maximum=Math.max(0,root.scrollHeight-innerHeight);
  const starts=items.map((item,i)=>i===0?0:Math.max(0,Math.min(maximum,positionOf(item)-chrome)));
  return starts.map((start,i)=>({start,end:i===starts.length-1?maximum:Math.max(start,starts[i+1]-viewport)}));
 };
 const moveTo=destination=>{
  const origin=scrollY,distance=destination-origin;
  if(Math.abs(distance)<2)return;
  const started=performance.now(),duration=760;
  moving=true;
  const step=now=>{
   const t=Math.min(1,(now-started)/duration);
   const ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
   window.scrollTo({top:origin+distance*ease,behavior:'instant'});
   if(t<1)animation=requestAnimationFrame(step);
   else{moving=false;animation=0;schedule();}
  };
  animation=requestAnimationFrame(step);
 };
 const hasInnerScroller=target=>{
  for(let element=target instanceof Element?target:null;element&&element!==document.body&&element!==root;element=element.parentElement){
   if(element.matches('input,textarea,select,[contenteditable="true"],dialog,.header,.home-section-nav'))return true;
   if(element.scrollHeight>element.clientHeight+2&&/auto|scroll/.test(getComputedStyle(element).overflowY))return true;
  }
  return false;
 };
 window.addEventListener('wheel',event=>{
  if(root.classList.contains('video-scroll-locked'))return;
  if(event.defaultPrevented||!event.cancelable||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;
  if(!desktopWheel.matches||reducedMotion.matches||root.classList.contains('intro-pending')||document.querySelector('dialog[open],.header.has-open-menu,.header.has-dropdown-open,.home-section-nav.is-open')||hasInnerScroller(event.target)){
   if(moving)cancelMove();
   return;
  }
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(!delta)return;
  const now=performance.now(),nextDirection=Math.sign(delta);
  if(now-lastWheel>200){total=0;consumed=false;reading=false;direction=nextDirection;}
  lastWheel=now;
  if(moving||consumed){event.preventDefault();return;}
  if(direction!==nextDirection){total=0;direction=nextDirection;}
  const chapters=bounds(),y=scrollY;
  let current=0;
  chapters.forEach((chapter,i)=>{if(chapter.start<=y+3)current=i;});
  const chapter=chapters[current];
  // Read oversized chapters before advancing. Clamp at their edge and absorb
  // the rest of that gesture, including a trackpad's momentum tail.
  const tall=chapter.end-chapter.start>8;
  if(tall&&((direction>0&&y<chapter.end-2)||(direction<0&&y>chapter.start+2&&y<=chapter.end+3))){
   event.preventDefault();reading=true;
   window.scrollTo({top:Math.max(chapter.start,Math.min(chapter.end,y+delta)),behavior:'instant'});
   return;
  }
  if(reading){event.preventDefault();return;}
  let destination;
  if(direction>0)destination=chapters[current+1]?.start;
  else if(y>chapter.start+3)destination=chapter.end;
  else destination=chapters[current-1]?.end;
  if(destination===undefined||Math.abs(destination-y)<2)return;
  event.preventDefault();total+=Math.abs(delta);
  if(total<32)return;
  consumed=true;total=0;moveTo(destination);
 },{passive:false});
 // Explicit navigation or a viewport change takes priority over an animation.
 addEventListener('resize',cancelMove,{passive:true});
 addEventListener('hashchange',cancelMove);
 addEventListener('pageshow',cancelMove);
 addEventListener('blur',cancelMove);
 addEventListener('pointerdown',cancelMove,{passive:true});
 addEventListener('touchstart',cancelMove,{passive:true});
 document.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape','Tab'].includes(event.key))cancelMove();});
 document.addEventListener('click',event=>{if(event.target.closest('a[href],button'))cancelMove();});
 if(videoHome){
  const itemForHash=hash=>items.find(item=>item.link.hash===hash)||(hash==='#services'?items.find(item=>item.link.hash==='#home-digital-forensics'):null);
  const navigate=(item,animate)=>{
   if(root.classList.contains('video-scroll-locked'))return;
   cancelMove();
   const top=Math.max(0,positionOf(item));
   if(animate&&!reducedMotion.matches)moveTo(top);
   else window.scrollTo({top,behavior:'instant'});
   schedule();
  };
  document.addEventListener('click',event=>{
   const link=event.target.closest('a[href]');
   if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||link.target==='_blank'||link.hasAttribute('download'))return;
   const url=new URL(link.href,location.href);
   if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search)return;
   const item=itemForHash(url.hash);
   if(!item)return;
   event.preventDefault();
   if(location.hash!==url.hash)history.pushState(null,'',url.hash);
   navigate(item,true);
  });
  const alignHash=()=>{const item=itemForHash(location.hash);if(item)navigate(item,false);};
  addEventListener('hashchange',alignHash);
  addEventListener('popstate',alignHash);
  addEventListener('load',()=>requestAnimationFrame(alignHash),{once:true});
  document.addEventListener('focusin',event=>{
   if(!stackMotion.matches)return;
   const index=items.findIndex(item=>item.panel.contains(event.target));
   if(index<0)return;
   const focusRect=event.target.getBoundingClientRect();
   const covered=items.slice(index+1).some(item=>{
    const rect=item.panel.getBoundingClientRect();
    return rect.top<focusRect.bottom&&rect.bottom>focusRect.top;
   });
   if(covered||positionOf(items[index])>scrollY+innerHeight-1)navigate(items[index],false);
  });
 }
 desktopWheel.addEventListener('change',cancelMove);
 reducedMotion.addEventListener('change',cancelMove);
})();
