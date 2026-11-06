document.querySelectorAll('[data-national-gallery]').forEach(gallery=>{
 const buttons=[...gallery.querySelectorAll('[data-national-select]')];
 const panels=[...gallery.querySelectorAll('.national-panel')];
 let activeCase=0,timer;
 const records=[...gallery.querySelectorAll('[data-national-photo-group]')].map(group=>{
  const {initial,photos}=JSON.parse(group.querySelector('[data-national-photo-data]').textContent);
  const image=group.querySelector('[data-national-main-photo]');
  const incoming=group.querySelector('[data-national-next-photo]');
  const caption=group.querySelector('[data-national-photo-caption]');
  const figure=group.querySelector('figure');
  let current=initial,busy=false;
  const preload=photos.map(photo=>{const asset=new Image();asset.src='assets/'+photo.image;return asset;});
  return {async advance(){
   if(photos.length<2||busy||group.closest('.national-panel').hidden)return;
   busy=true;
   try{
    const next=(current+1)%photos.length;
    const asset=preload[next];
    await asset.decode();
    if(group.closest('.national-panel').hidden||document.hidden)return;
    const photo=photos[next];
    incoming.src=asset.src;
    figure.classList.add('is-switching');
    await new Promise(resolve=>setTimeout(resolve,matchMedia('(prefers-reduced-motion:reduce)').matches?0:600));
    image.src=asset.src;
    image.alt=photo.alt;
    caption.textContent=photo.caption;
    current=next;
    figure.classList.remove('is-switching');
   }catch{/* Retain the current photograph when an image cannot load. */}
   finally{busy=false;}
  }};
 });
 function restart(){
  clearInterval(timer);
  if(document.hidden)return;
  timer=setInterval(()=>{
   const bounds=gallery.getBoundingClientRect();
   if(bounds.bottom>0&&bounds.top<innerHeight)records[activeCase].advance();
  },4000);
 }
 buttons.forEach((button,index)=>button.addEventListener('click',()=>{
  const chapter=gallery.closest('.home-pride');
  const marker=chapter&&document.querySelector(`.home-chapter-marker[data-chapter-target="${chapter.id}"]`);
  const chapterTop=marker&&matchMedia('(min-width:801px)').matches?marker.getBoundingClientRect().top+scrollY:null;
  activeCase=index;
  buttons.forEach((item,i)=>item.setAttribute('aria-pressed',String(i===index)));
  panels[index].hidden=false;
  panels.forEach((panel,i)=>panel.hidden=i!==index);
  if(chapterTop!==null)window.scrollTo({top:chapterTop,behavior:'instant'});
  restart();
 }));
 document.addEventListener('visibilitychange',restart);
 restart();
});
