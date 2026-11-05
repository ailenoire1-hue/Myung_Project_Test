document.querySelectorAll('[data-forensics-focus]').forEach(viewer=>{
 const tabs=[...viewer.querySelectorAll('[role="tab"]')];
 const panels=[...viewer.querySelectorAll('[role="tabpanel"]')];
 const activate=index=>{
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  panels.forEach((panel,i)=>{panel.hidden=i!==index;});
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activate(index));
  tab.addEventListener('keydown',event=>{
   let next=index;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();event.stopPropagation();activate(next);tabs[next].focus({preventScroll:true});
  });
 });
});
