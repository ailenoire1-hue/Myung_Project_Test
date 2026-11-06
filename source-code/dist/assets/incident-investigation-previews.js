(() => {
 if(!document.body.classList.contains('ir-page'))return;
 const links=[...document.querySelectorAll('[data-ir-variant]')];
 const updateLinks=()=>{const current=document.querySelector('.fr-main .is-fr-active')?.id;links.forEach(a=>{a.href=`incident-investigation-${a.dataset.irVariant}.html${current?'#'+current:location.hash||'#overview'}`;});};
 window.addEventListener('hashchange',updateLinks);updateLinks();
 const main=document.querySelector('.fr-main');
 if(main)new MutationObserver(updateLinks).observe(main,{subtree:true,attributes:true,attributeFilter:['class']});
 document.querySelectorAll('[data-ir-tabs]').forEach(group=>{
  const tabs=[...group.querySelectorAll('[data-ir-tab]')];
  const panels=[...group.querySelectorAll('[data-ir-panel]')];
  const activate=tab=>{
   tabs.forEach(item=>{const on=item===tab;item.setAttribute('aria-selected',String(on));item.tabIndex=on?0:-1;});
   panels.forEach(panel=>{panel.hidden=panel.dataset.irPanel!==tab.dataset.irTab;});
   window.dispatchEvent(new Event('resize'));
  };
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{
   let index;if(event.key==='ArrowRight')index=(i+1)%tabs.length;else if(event.key==='ArrowLeft')index=(i-1+tabs.length)%tabs.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=tabs.length-1;else return;
   event.preventDefault();activate(tabs[index]);tabs[index].focus();
  });});
  if(tabs.length)activate(tabs.find(tab=>tab.getAttribute('aria-selected')==='true')||tabs[0]);
 });
})();
