// User-requested playback only. Curated channel entries do not fetch a live feed.
(() => {
 const dialog=document.querySelector('#mc-player');
 if(!dialog)return;
 const frame=dialog.querySelector('.mc-player-frame');
 const title=dialog.querySelector('#mc-player-title');
 const watch=dialog.querySelector('[data-channel-watch]');
 let trigger=null,previousOverflow='';
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-channel-video]');
  if(!button)return;
  const id=button.dataset.channelVideo;
  if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
  event.preventDefault();trigger=button;
  title.textContent=button.dataset.channelTitle||'명정보기술 포렌식 영상';
  watch.href=`https://www.youtube.com/watch?v=${id}`;
  const iframe=document.createElement('iframe');
  iframe.title=title.textContent;
  iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';
  frame.replaceChildren(iframe);
  previousOverflow=document.documentElement.style.overflow;
  document.documentElement.style.overflow='hidden';
  dialog.showModal();
 });
 dialog.querySelector('[data-channel-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
 dialog.addEventListener('close',()=>{
  frame.replaceChildren();document.documentElement.style.overflow=previousOverflow;
  trigger?.focus({preventScroll:true});
 });
})();
