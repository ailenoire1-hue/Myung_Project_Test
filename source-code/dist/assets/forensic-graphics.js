document.querySelectorAll('[data-gx-tabs]').forEach(group=>{
 const tabs=[...group.querySelectorAll('[role="tab"]')];
 const select=(tab,focus=false)=>{
  const chapter=group.closest('.dfv-chapter');
  const top=window.innerWidth>800&&chapter?window.scrollY+chapter.getBoundingClientRect().top:window.scrollY;
  tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});
  if(focus)tab.focus({preventScroll:true});
  requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'}));
 };
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(tab));
  tab.addEventListener('keydown',e=>{
   let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;
   if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;
   if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
   if(next!==undefined){e.preventDefault();select(tabs[next],true);}
  });
 });
});
