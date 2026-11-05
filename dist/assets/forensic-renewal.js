(()=>{
 const groups=[...document.querySelectorAll('.dfx-field-tabs')];
 if(!groups.length)return;
 const fields=['pc-storage','smartphone-forensics','messenger-forensics','audio-video'];
 const activate=index=>{
  groups.forEach(group=>group.querySelectorAll('[data-dfx-field]').forEach(button=>{
   const selected=Number(button.dataset.dfxField)===index;
   button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;
  }));
  document.querySelectorAll('[data-dfx-panel]').forEach(panel=>panel.hidden=Number(panel.dataset.dfxPanel)!==index);
 };
 const select=(index,group)=>{
  const before=group.getBoundingClientRect().top;
  activate(index);
  requestAnimationFrame(()=>{
   if(matchMedia('(min-width:801px)').matches)group.closest('.dfx-chapter').scrollIntoView({behavior:'instant',block:'start'});
   else window.scrollBy({top:group.getBoundingClientRect().top-before,behavior:'instant'});
  });
 };
 groups.forEach(group=>{
  const buttons=[...group.querySelectorAll('[data-dfx-field]')];
  buttons.forEach((button,i)=>{
   button.addEventListener('click',()=>select(i,group));
   button.addEventListener('keydown',event=>{
    let next;if(event.key==='ArrowRight')next=(i+1)%buttons.length;
    if(event.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;
    if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;
    if(next===undefined)return;event.preventDefault();select(next,group);buttons[next].focus({preventScroll:true});
   });
  });
 });
 const report=document.querySelector('.dfx-report');
 const alignReport=()=>{if(matchMedia('(min-width:801px)').matches)requestAnimationFrame(()=>report.scrollIntoView({behavior:'instant',block:'start'}));};
 report?.querySelectorAll('.sample-tabs [role="tab"]').forEach(button=>{
  button.addEventListener('click',alignReport);
  button.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))alignReport();});
 });
 const followHash=()=>{
  const hash=decodeURIComponent(location.hash.slice(1));
  const index=fields.findIndex(id=>hash===id||hash===id+'-method');
  const chapterIds=['service-overview','analysis-fields','analysis-methods','process','analysis-deliverables','questions'];
  if(index<0&&!chapterIds.includes(hash))return;
  if(index>=0)activate(index);
  const target=document.getElementById(index>=0?(hash.endsWith('-method')?'analysis-methods':'analysis-fields'):hash);
  requestAnimationFrame(()=>target?.scrollIntoView({behavior:'instant',block:'start'}));
 };
 addEventListener('hashchange',followHash);
 if(document.readyState!=='complete')addEventListener('load',followHash,{once:true});
 followHash();
})();
