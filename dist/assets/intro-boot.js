(function(){
 const root=document.documentElement;
 const params=new URLSearchParams(location.search);
 const page=location.pathname.split('/').filter(Boolean).pop()||'';
 const review=['splash-a','splash-b','splash-c','splash-a.html','splash-b.html','splash-c.html','history-1','history-2','history-3','history-1.html','history-2.html','history-3.html'].includes(page);
 const hold=params.get('hold')==='1';
 const forced=params.get('intro')==='1';
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let seen=false;
 try{seen=sessionStorage.getItem('mdfc-intro-seen')==='1';}catch{}
 if(params.get('embed')==='1')root.classList.add('splash-embed');
 if(hold)root.classList.add('intro-hold');
 if(params.get('skip')!=='1'&&(hold||review||forced||(!reduce&&!seen))){
  root.classList.add('intro-pending');
  if(!hold)window.__mdfcIntroFailsafe=setTimeout(()=>root.classList.remove('intro-pending'),15000);
 }
})();
