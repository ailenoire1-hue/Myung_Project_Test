(()=>{
 const dialog=document.querySelector('.insights-player-dialog');
 if(!dialog)return;
 const frame=dialog.querySelector('.insights-player-frame');
 const title=dialog.querySelector('#insights-player-title');
 const watch=dialog.querySelector('.insights-watch-link');
 let trigger=null;
 document.querySelectorAll('[data-insight-video]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.insightVideo;
  if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
  trigger=button;title.textContent=button.dataset.videoTitle;
  watch.href=`https://www.youtube.com/watch?v=${id}`;
  const iframe=document.createElement('iframe');
  iframe.title=button.dataset.videoTitle;
  iframe.src=`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';
  frame.replaceChildren(iframe);dialog.showModal();
 }));
 dialog.querySelector('[data-insights-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{frame.replaceChildren();trigger?.focus({preventScroll:true});});
})();
