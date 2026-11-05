(() => {
 const slider=document.querySelector('[data-pride-slider]');
 if(!slider)return;
 const chapter=slider.closest('section'),track=slider.querySelector('.pride-slide-track');
 const buttons=[...slider.querySelectorAll('[data-national-select]')],panels=[...slider.querySelectorAll('.national-panel')];
 const counter=slider.querySelector('[data-pride-count]');
 const duration=3000,reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let active=0,elapsed=0,last=performance.now(),resetTimer=0,wrapping=false;
 panels[0].classList.add('pride-cheonan');
 // Keep the next card populated while the carousel wraps back to the first.
 const clonePanel=panel=>{const copy=panel.cloneNode(true);copy.removeAttribute('id');copy.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));copy.classList.remove('is-current');copy.setAttribute('aria-hidden','true');return copy;};
 const clone=clonePanel(panels[0]);track.append(clone,clonePanel(panels[1]));
 const records=panels.map(panel=>{
  const group=panel.querySelector('[data-national-photo-group]');
  const data=JSON.parse(group.querySelector('[data-national-photo-data]').textContent);
  return {...data,group,current:data.initial||0,busy:false};
 });
 function align(){const target=wrapping?clone:panels[active];track.style.transform=`translate3d(${-target.offsetLeft+panels[0].offsetLeft}px,0,0)`;}
 function select(index,automatic=false){
  clearTimeout(resetTimer);wrapping=automatic&&index===panels.length;
  active=(index+panels.length)%panels.length;elapsed=0;last=performance.now();
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
  panels.forEach((panel,i)=>{panel.classList.toggle('is-current',i===active);panel.setAttribute('aria-hidden',String(i!==active));});
  clone.classList.toggle('is-current',wrapping);
  counter.textContent=String(active+1).padStart(2,'0');slider.style.setProperty('--pride-progress','0%');
  const record=records[active];record.current=record.initial||0;
  const photo=record.photos[record.current],img=record.group.querySelector('[data-national-main-photo]');img.src='assets/'+photo.image;img.alt=photo.alt;
  align();
  if(wrapping)resetTimer=setTimeout(()=>{
   track.style.transition='none';wrapping=false;align();clone.classList.remove('is-current');
   requestAnimationFrame(()=>requestAnimationFrame(()=>track.style.transition=''));
  },reduced.matches?0:780);
 }
 buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
 slider.querySelector('[data-pride-prev]').addEventListener('click',()=>select(active-1));
 slider.querySelector('[data-pride-next]').addEventListener('click',()=>select(active+1,true));
 const observer=new ResizeObserver(align);observer.observe(slider);
 const visible=()=>{
  if(document.hidden||reduced.matches||slider.querySelector(':focus-visible'))return false;
  const current=document.querySelector('[data-home-section-nav] a[aria-current]');
  if(current&&current.hash!=='#national-experience')return false;
  const bounds=chapter.getBoundingClientRect();return bounds.top<innerHeight*.6&&bounds.bottom>innerHeight*.4;
 };
 // Alternate photos only for records that contain more than one image.
 async function secondPhoto(){
  const record=records[active];if(record.photos.length<2||record.busy)return;
  const next=((record.initial||0)+1)%record.photos.length;if(record.current===next)return;
  record.busy=true;
  const image=record.group.querySelector('[data-national-main-photo]'),photo=record.photos[next];
  const incoming=record.group.querySelector('[data-national-next-photo]');
  try{incoming.src='assets/'+photo.image;await incoming.decode();record.group.querySelector('figure').classList.add('is-switching');
   setTimeout(()=>{image.src=incoming.src;image.alt=photo.alt;record.current=next;record.group.querySelector('figure').classList.remove('is-switching');record.busy=false;},600);
  }catch{record.busy=false;}
 }
 function tick(now){
  const delta=Math.min(now-last,100);last=now;
  if(visible()){
   elapsed+=delta;slider.style.setProperty('--pride-progress',`${Math.min(100,elapsed/duration*100)}%`);
   if(elapsed>=2300)secondPhoto();
   if(elapsed>=duration)select(active+1,true);
  }
  requestAnimationFrame(tick);
 }
 select(0);requestAnimationFrame(tick);
})();
