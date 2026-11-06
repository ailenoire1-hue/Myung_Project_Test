document.querySelectorAll('[data-resource-tabs]').forEach(group=>{
 const tabs=[...group.querySelectorAll('[role="tab"]')];
 const sampleTabs=group.querySelector('.sample-tabs');
 if(sampleTabs){
  const smallScreen=matchMedia('(max-width:800px)');
  const orientation=()=>sampleTabs.setAttribute('aria-orientation',smallScreen.matches?'horizontal':'vertical');
  orientation();smallScreen.addEventListener('change',orientation);
 }
 function select(tab,focus=false){
  const historyScroll=group.classList.contains('company-history-browser')
   ?window.scrollY+(matchMedia('(min-width:801px)').matches?group.closest('.detail-section').getBoundingClientRect().top:0):null;
  const forensicScroll=group.matches('.forensic-tabs')
   ?window.scrollY+(matchMedia('(min-width:801px)').matches?group.getBoundingClientRect().top:0):null;
  const companyCaseScroll=group.classList.contains('company-recovery-tabs')
   ?window.scrollY+(matchMedia('(min-width:801px)').matches?group.closest('.detail-section').getBoundingClientRect().top:0):null;
  tabs.forEach(item=>{
   const active=item===tab;
   item.setAttribute('aria-selected',String(active));
   item.tabIndex=active?0:-1;
   document.getElementById(item.getAttribute('aria-controls')).hidden=!active;
  });
  if(focus)tab.focus({preventScroll:true});
  if(historyScroll!==null)window.scrollTo({top:historyScroll,behavior:'instant'});
  if(forensicScroll!==null)requestAnimationFrame(()=>window.scrollTo({top:forensicScroll,behavior:'instant'}));
  if(companyCaseScroll!==null)requestAnimationFrame(()=>window.scrollTo({top:companyCaseScroll,behavior:'instant'}));
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>{
   select(tab);
   if(group.hasAttribute('data-linked-tabs'))history.replaceState(null,'','#'+tab.getAttribute('aria-controls'));
  });
  tab.addEventListener('keydown',event=>{
   let next;
   const vertical=tab.closest('[role="tablist"]')?.getAttribute('aria-orientation')==='vertical';
   if(event.key===(vertical?'ArrowDown':'ArrowRight'))next=(i+1)%tabs.length;
   if(event.key===(vertical?'ArrowUp':'ArrowLeft'))next=(i-1+tabs.length)%tabs.length;
   if(event.key==='Home')next=0;
   if(event.key==='End')next=tabs.length-1;
   if(next!==undefined){event.preventDefault();select(tabs[next],true);}
  });
 });
 if(group.hasAttribute('data-linked-tabs')){
  const tablist=group.querySelector('[role="tablist"]');
  const measureTabs=()=>group.style.setProperty('--forensic-panel-offset',`${tablist.getBoundingClientRect().height+parseFloat(getComputedStyle(tablist).marginBottom)}px`);
  measureTabs();new ResizeObserver(measureTabs).observe(tablist);
  function selectHash(){
   const target=document.getElementById(location.hash.slice(1));
   const tab=tabs.find(t=>{const panel=document.getElementById(t.getAttribute('aria-controls'));return target&&(panel===target||panel.contains(target));});
   if(tab){select(tab);requestAnimationFrame(()=>{
    tab.focus({preventScroll:true});
    const destination=target.id===tab.getAttribute('aria-controls')?group:target;
    window.scrollTo({top:window.scrollY+destination.getBoundingClientRect().top,behavior:'instant'});
   });}
  }
  selectHash();
  if(document.readyState!=='complete')window.addEventListener('load',selectHash,{once:true});
  window.addEventListener('hashchange',selectHash);
 }
});
if(document.querySelector('.company-reveal')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
 document.body.classList.add('company-motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.company-reveal').forEach(el=>observer.observe(el));
}

// Connect nationwide map labels to the existing address and phone disclosures.
(() => {
 const map=document.querySelector('.company-network-map');
 if(!map)return;
 const links=[...map.querySelectorAll('[data-branch-link]')];
 const branches=[...document.querySelectorAll('.company-branch')];
 const emphasize=id=>{
  map.querySelectorAll('[data-map-point]').forEach(point=>point.classList.toggle('is-active',point.dataset.mapPoint===id));
  links.forEach(link=>link.classList.toggle('is-active',link.dataset.branchLink===id));
 };
 const openBranch=(id,scroll=false)=>{
  const branch=document.getElementById('branch-'+id);
  if(!branch)return;
  branches.forEach(item=>{item.open=item===branch;});
  branches.forEach(item=>item.classList.toggle('is-selected',item===branch));
  emphasize(id);
  if(scroll){
   branch.style.scrollMarginTop='calc(var(--ir-header-height,103px) + 20px)';
   branch.querySelector('summary').focus({preventScroll:true});
   const target=matchMedia('(min-width:801px)').matches?branch.closest('.company-network-unified')||branch:branch;
   target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
 };
 links.forEach(link=>{
  link.addEventListener('pointerenter',()=>emphasize(link.dataset.branchLink));
  link.addEventListener('focus',()=>emphasize(link.dataset.branchLink));
  link.addEventListener('click',event=>{
   if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();
   history.replaceState(null,'',link.hash);
   openBranch(link.dataset.branchLink,true);
  });
 });
 branches.forEach(branch=>branch.addEventListener('toggle',()=>{
  if(branch.open){
   branches.forEach(item=>{if(item!==branch)item.open=false;item.classList.toggle('is-selected',item===branch);});
   emphasize(branch.id.replace('branch-',''));
  }else if(!branches.some(item=>item.open)){
   branches.forEach(item=>item.classList.remove('is-selected'));emphasize('');
  }
 }));
 const readHash=()=>{const match=location.hash.match(/^#branch-([1-9])$/);if(match)openBranch(match[1],true);};
 window.addEventListener('hashchange',readHash);
 if(document.readyState==='complete')readHash();else window.addEventListener('load',readHash,{once:true});
})();
