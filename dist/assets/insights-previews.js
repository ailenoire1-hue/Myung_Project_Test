(()=>{
 const browser=document.querySelector('[data-ip-browser]');
 if(!browser)return;
 const cards=[...browser.querySelectorAll('[data-ip-channel]')];
 const filters=[...browser.querySelectorAll('[data-ip-filter]')];
 const prev=browser.querySelector('[data-ip-prev]');
 const next=browser.querySelector('[data-ip-next]');
 const count=browser.querySelector('[data-ip-count]');
 const mobile=matchMedia('(max-width:800px)');
 const pageSize=Number(browser.dataset.ipPageSize)||3;
 let channel='all',page=0;
 const render=()=>{
  const selected=cards.filter(card=>channel==='all'||card.dataset.ipChannel===channel);
  const size=mobile.matches?selected.length:pageSize;
  const pages=Math.max(1,Math.ceil(selected.length/size));
  page=Math.min(page,pages-1);
  cards.forEach(card=>{const index=selected.indexOf(card);card.hidden=index<page*size||index>=(page+1)*size;});
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.ipFilter===channel)));
  count.textContent=`${String(page+1).padStart(2,'0')} / ${String(pages).padStart(2,'0')}`;
  prev.disabled=page===0;next.disabled=page===pages-1;
 };
 filters.forEach(button=>button.addEventListener('click',()=>{channel=button.dataset.ipFilter;page=0;render();}));
 prev.addEventListener('click',()=>{page--;render();});next.addEventListener('click',()=>{page++;render();});
 mobile.addEventListener('change',()=>{page=0;render();});render();
})();
