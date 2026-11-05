(() => {
 const header=document.querySelector('.header');
 if(!header)return;
 const root=document.documentElement;
 const measure=()=>root.style.setProperty('--ir-header-height',`${header.getBoundingClientRect().height}px`);
 measure();new ResizeObserver(measure).observe(header);
 const rail=document.querySelector('.sub-page .detail-jumps');
 let items=[],toggle;
 if(rail){
  document.body.append(rail);
  const nav=rail.querySelector('nav');nav.id='detail-chapter-links';
  const first=document.createElement('a');first.href='#main';first.textContent='서비스 소개';
  if(document.querySelector('.company-hero'))first.textContent='회사 소개';
  nav.prepend(first);
  const contact=document.querySelector('.contact-band');
  if(contact){contact.id='detail-contact';const link=document.createElement('a');link.href='#detail-contact';link.textContent='상담 안내';nav.append(link);}
  nav.querySelectorAll('a').forEach(link=>{
   link.querySelector('.ir-jump-number')?.remove();
   const label=document.createElement('span');label.className='chapter-nav-label';label.textContent=link.textContent.trim();
   link.replaceChildren(label);
  });
  toggle=document.createElement('button');toggle.className='chapter-nav-toggle';toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',nav.id);toggle.innerHTML='페이지 목차<span aria-hidden="true">+</span>';rail.prepend(toggle);
  const close=()=>{rail.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click',()=>{const open=rail.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
  rail.addEventListener('click',event=>{if(event.target.closest('a'))close();});
  document.addEventListener('click',event=>{if(!rail.contains(event.target))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&rail.classList.contains('is-open')){close();toggle.focus();}});
  items=[...nav.querySelectorAll('a')].map(link=>({link,target:document.getElementById(link.hash.slice(1))})).filter(item=>item.target);
 }
 // Sample the actual full-width surface, independently at header and rail height.
 // Cards and photographs do not change a chapter's foreground theme.
 const surfaces=[...document.querySelectorAll('.video-hero,.detail-hero,main .detail-section,.ir-results,.ir-preparation,.service-chapter,#national-experience,.design-hero,.calm-hero,.hero,.company-network,.contact-band,.footer')];
 function themeAt(y){
  const surface=surfaces.filter(el=>{const r=el.getBoundingClientRect();return r.height>0&&r.top<=y&&r.bottom>y;}).at(-1);
  if(!surface)return scrollY<innerHeight/2?'dark':'light';
  if(surface.dataset.navTheme)return surface.dataset.navTheme;
  if(surface.matches('.detail-hero,.hero,.calm-hero,.contact-band,.footer,.company-network,.ir-results'))return 'dark';
  for(let el=surface;el;el=el.parentElement){
   const rgb=getComputedStyle(el).backgroundColor.match(/[\d.]+/g)?.map(Number);
   if(rgb?.length>=3&&(rgb.length===3||rgb[3]>.7))return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722<140?'dark':'light';
  }
  return 'light';
 }
 let queued=false;
 function update(){
  queued=false;header.dataset.theme=themeAt(header.getBoundingClientRect().height/2);
  if(rail){
   rail.dataset.theme=themeAt(innerHeight/2);
   let active=items[0],last=-Infinity;
   for(const item of items){const top=item.target.getBoundingClientRect().top;if(top<=innerHeight*.34&&top>=last){active=item;last=top;}}
   items.forEach(item=>{if(item===active)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');});
  }
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 ['scroll','resize','load','hashchange'].forEach(event=>addEventListener(event,schedule,{passive:true}));
 document.addEventListener('toggle',schedule,true);
 update();
})();
