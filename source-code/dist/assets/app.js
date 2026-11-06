const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const header=document.querySelector('.header');
const navItems=[...nav.querySelectorAll('.nav-item')];
const desktopNavigation=matchMedia('(min-width:1101px)');
const hoverNavigation=matchMedia('(hover:hover) and (pointer:fine)');
let suppressNavFocus=false;
function setSubmenu(item,open){
 navItems.forEach(entry=>{
  const active=entry===item&&open;
  entry.classList.toggle('is-expanded',active);
  entry.querySelectorAll('.nav-page-link,.nav-mobile-trigger').forEach(control=>control.setAttribute('aria-expanded',String(active)));
  entry.querySelector('.nav-dropdown').hidden=!active;
 });
 header.classList.toggle('has-dropdown-open',Boolean(item&&open));
}
function closeMenu(){ menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','메뉴 열기'); nav.classList.remove('is-open'); header.classList.remove('has-open-menu'); setSubmenu(null,false); }
menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true'; closeMenu(); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기'); nav.classList.toggle('is-open',open); header.classList.toggle('has-open-menu',open); });
navItems.forEach(item=>{
 const toggle=item.querySelector('.nav-mobile-trigger');
 const pageLink=item.querySelector('.nav-page-link');
 let touchOpensMenu=false;
 pageLink.addEventListener('pointerdown',event=>{touchOpensMenu=event.pointerType==='touch'&&desktopNavigation.matches&&!item.classList.contains('is-expanded');});
 pageLink.addEventListener('pointercancel',()=>{touchOpensMenu=false;});
 pageLink.addEventListener('keydown',()=>{touchOpensMenu=false;});
 pageLink.addEventListener('click',event=>{if(touchOpensMenu){touchOpensMenu=false;event.preventDefault();setSubmenu(item,true);}});
 let leaveTimer;
 item.addEventListener('pointerenter',event=>{clearTimeout(leaveTimer);if(desktopNavigation.matches&&hoverNavigation.matches&&event.pointerType!=='touch')setSubmenu(item,true);});
 item.addEventListener('pointerleave',()=>{if(desktopNavigation.matches)leaveTimer=setTimeout(()=>{if(!item.contains(document.activeElement)&&item.classList.contains('is-expanded'))setSubmenu(null,false);},140);});
 item.addEventListener('focusin',event=>{clearTimeout(leaveTimer);if(!suppressNavFocus&&desktopNavigation.matches&&event.target.matches('.nav-page-link'))setSubmenu(item,true);});
 item.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!item.contains(document.activeElement)&&item.classList.contains('is-expanded'))setSubmenu(null,false);}));
 toggle.addEventListener('click',()=>setSubmenu(item,toggle.getAttribute('aria-expanded')!=='true'));
 item.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&item.classList.contains('is-expanded')){
   event.preventDefault();event.stopPropagation();setSubmenu(null,false);suppressNavFocus=true;(getComputedStyle(pageLink).display!=='none'?pageLink:toggle).focus();suppressNavFocus=false;
  }else if(event.key==='ArrowDown'&&event.target.closest('.nav-item-heading')){
   event.preventDefault();setSubmenu(item,true);item.querySelector('.nav-dropdown a').focus();
  }
 });
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 closeMenu();
 // Re-select a forensic tab even when this page already has the same fragment.
 const destination=new URL(a.href,location.href),normalize=p=>p.replace(/\.html$/,'').replace(/\/$/,'');
 if(destination.hash&&destination.hash===location.hash&&normalize(destination.pathname)===normalize(location.pathname)){
  const panel=document.getElementById(destination.hash.slice(1));
  if(panel?.classList.contains('forensic-panel')){event.preventDefault();window.dispatchEvent(new HashChangeEvent('hashchange'));}
 }
}));
desktopNavigation.addEventListener('change',closeMenu);
hoverNavigation.addEventListener('change',closeMenu);
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(header.classList.contains('has-dropdown-open'))setSubmenu(null,false);else if(menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const dialog=document.querySelector('.contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>{closeMenu();dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});
if(document.body.matches('.home-page,.sub-page')){const updateHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>90);window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();}
