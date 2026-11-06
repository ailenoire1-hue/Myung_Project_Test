(() => {
 const hero=document.querySelector('.video-hero');
 if(!hero)return;
 const film=hero.querySelector('video');
 if(!film)return;
 const root=document.documentElement;
 // Keep the opening video in view for four seconds after entry, then remove
 // every guard. The head timer also releases the CSS lock if this script fails.
 const deadline=window.mdfcVideoScrollDeadline||0;
 if(root.classList.contains('video-scroll-locked')&&performance.now()<deadline){
  const controller=new AbortController();
  const options={capture:true,passive:false,signal:controller.signal};
  const locked=()=>root.classList.contains('video-scroll-locked')&&performance.now()<deadline;
  const release=()=>{root.classList.remove('video-scroll-locked');controller.abort();clearTimeout(window.mdfcVideoScrollFallback);clearTimeout(timer);};
  const stop=event=>{event.preventDefault();event.stopImmediatePropagation();};
  const inDialog=event=>event.target instanceof Element&&event.target.closest('dialog[open]');
  addEventListener('wheel',event=>{if(locked()&&!event.ctrlKey&&!event.metaKey&&!inDialog(event))stop(event);},options);
  addEventListener('touchmove',event=>{if(locked()&&event.touches.length===1&&!inDialog(event))stop(event);},options);
  addEventListener('keydown',event=>{
   if(!locked()||event.ctrlKey||event.metaKey||event.altKey||inDialog(event))return;
   if(event.target instanceof Element&&event.target.closest('input,textarea,select,[contenteditable="true"],button'))return;
   if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))stop(event);
  },options);
  addEventListener('click',event=>{
   if(!locked()||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   const link=event.target instanceof Element?event.target.closest('a[href]'):null;
   if(!link||link.target==='_blank')return;
   const url=new URL(link.href,location.href);
   if(url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search&&url.hash)stop(event);
  },options);
  addEventListener('scroll',()=>{if(locked()&&scrollY!==0)scrollTo({top:0,behavior:'instant'});},{passive:true,signal:controller.signal});
  addEventListener('pagehide',release,{once:true,signal:controller.signal});
  const timer=setTimeout(release,Math.max(0,deadline-performance.now()));
 }
 const copy=hero.querySelector('.video-welcome-copy');
 const cue=hero.querySelector('.video-hero-bottom');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=true,queued=false,revealFrame=0,copyShown=false,cueShown=false;
 clearTimeout(window.mdfcVideoEntryFallback);
 root.classList.add('video-entry-pending');
 [copy,cue].forEach(el=>{el.inert=true;el.setAttribute('aria-hidden','true');});
 const revealCopy=()=>{copyShown=true;copy.inert=false;copy.removeAttribute('aria-hidden');hero.classList.add('is-copy-visible');};
 const revealCue=()=>{cueShown=true;cue.inert=false;cue.removeAttribute('aria-hidden');hero.classList.add('is-scroll-visible');};
 const revealAll=()=>{
  revealCopy();revealCue();root.classList.remove('video-entry-pending');
  cancelAnimationFrame(revealFrame);revealFrame=0;clearTimeout(fallback);
 };
 // Reveal by actual video time, once per page visit. Buffering, tab changes
 // and automatic pauses do not consume the opening sequence.
 const tick=()=>{
  revealFrame=0;
  if(!copyShown&&film.currentTime>=2.5)revealCopy();
  if(!cueShown&&film.currentTime>=4.5)revealCue();
  if(copyShown&&cueShown){root.classList.remove('video-entry-pending');return;}
  if(!film.paused&&!document.hidden)revealFrame=requestAnimationFrame(tick);
 };
 const watch=()=>{if(!revealFrame&&!(copyShown&&cueShown))revealFrame=requestAnimationFrame(tick);};
 const fallback=setTimeout(revealAll,10000);
 film.muted=true;
 const play=()=>{
  if(visible&&!reduced.matches&&!document.hidden)film.play().catch(error=>{
   if(error.name!=='AbortError'&&visible&&!document.hidden)revealAll();
  });
 };
 film.addEventListener('playing',()=>{clearTimeout(fallback);watch();});
 film.addEventListener('timeupdate',watch);
 film.addEventListener('error',revealAll);
 film.querySelectorAll('source').forEach(source=>source.addEventListener('error',revealAll));
 const stackMotion=matchMedia('(min-width:801px) and (prefers-reduced-motion: no-preference)');
 document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();else play();});
 reduced.addEventListener('change',()=>{update();if(reduced.matches){film.pause();revealAll();}else play();});
 function update(){
  queued=false;
  const marker=document.querySelector('[data-chapter-target="main"]');
  const rect=hero.getBoundingClientRect();
  const nextVisible=stackMotion.matches&&marker?marker.getBoundingClientRect().top>8:rect.bottom>8&&rect.top<innerHeight;
  if(nextVisible!==visible){visible=nextVisible;if(visible)play();else film.pause();}
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});stackMotion.addEventListener('change',schedule);
 if(reduced.matches||film.error){film.pause();revealAll();}else{if(film.currentTime>0)clearTimeout(fallback);play();watch();}update();
})();
