const fieldIds=['pc-storage','smartphone-forensics','messenger-forensics','audio-video'];
const desktop=()=>matchMedia('(min-width:801px)').matches;
const align=section=>requestAnimationFrame(()=>window.scrollTo({top:window.scrollY+section.getBoundingClientRect().top,behavior:'instant'}));
document.querySelectorAll('[data-dfv-tabs]').forEach(group=>{
 const tabs=[...group.querySelectorAll('[role="tab"]')];
 const select=(tab,focus=false)=>{
  const top=window.scrollY,section=group.closest('.dfv-chapter');
  tabs.forEach(t=>{const yes=t===tab;t.setAttribute('aria-selected',String(yes));t.tabIndex=yes?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!yes;});
  if(focus)tab.focus({preventScroll:true});
  if(desktop())align(section);else requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'}));
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
 group.selectField=id=>{const tab=tabs.find(t=>t.getAttribute('aria-controls')===id);if(tab)select(tab);};
});
// Preserve the original opening's four field destinations in all preview layouts.
const syncAnchor=()=>{
 const id=decodeURIComponent(location.hash.slice(1));
 if(fieldIds.includes(id)){
  document.querySelector('[data-dfv-tabs]')?.selectField(id);
  const target=document.getElementById(id);
  if(desktop())align(document.getElementById('analysis-fields'));else if(target)align(target);
  return;
 }
 const target=document.getElementById(id);
 if(desktop()&&target?.matches('.dfv-chapter,.dfv-report'))align(target);
};
window.addEventListener('load',syncAnchor);
window.addEventListener('hashchange',syncAnchor);
document.fonts.ready.then(syncAnchor);
document.querySelectorAll('.service-opening a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
 const id=link.getAttribute('href').slice(1);if(!fieldIds.includes(id))return;
 document.querySelector('[data-dfv-tabs]')?.selectField(id);
}));
document.querySelectorAll('.dfv-report [role="tab"]').forEach(tab=>tab.addEventListener('click',()=>{
 const top=window.scrollY,section=tab.closest('.dfv-report');
 if(desktop())align(section);else requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'}));
}));
// Keep FAQ answers readable without stretching a desktop chapter unnecessarily.
document.querySelectorAll('.dfv-faq-list details').forEach(item=>item.addEventListener('toggle',()=>{
 if(item.open)document.querySelectorAll('.dfv-faq-list details').forEach(other=>{if(other!==item)other.open=false;});
}));
