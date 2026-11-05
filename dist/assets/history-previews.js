const historyFrames=[...document.querySelectorAll('.compare-frame iframe')];
let historyReplay=0;
const playHistory=frame=>{
 const url=new URL(frame.src);
 url.searchParams.delete('hold');
 url.searchParams.set('intro','1');
 url.searchParams.set('replay',String(++historyReplay));
 frame.src=url.href;
};
document.querySelector('[data-play-all]')?.addEventListener('click',()=>historyFrames.forEach(playHistory));
document.querySelectorAll('[data-play-history]').forEach(button=>button.addEventListener('click',()=>playHistory(button.closest('.compare-card').querySelector('iframe'))));
