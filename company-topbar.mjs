import {htmlElement} from './forensic-reading-content.mjs';

export function companyTopbarDocument(html,version){
 if(!html.includes('company-screen-page'))return html;
 if(html.includes('company-topbar-page'))return html;
 const oldNavigation=htmlElement(html,'<div class="detail-jumps"');
 const links=[...oldNavigation.matchAll(/<a href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(([,id,label])=>({id,label:label.replace(/<[^>]+>/g,'').trim()}));
 if(html.includes('id="detail-contact"'))links.push({id:'detail-contact',label:'상담 안내'});
 const navigation=`<div class="company-topbar" aria-label="회사 소개 목차"><div class="company-topbar-frame"><span class="company-topbar-label">ABOUT MYUNG</span><nav class="company-topbar-links" aria-label="회사 소개 페이지 내 메뉴">${links.map(({id,label},i)=>`<a href="#${id}">${id==='detail-contact'?'':`<span>${String(i+1).padStart(2,'0')}</span>`}<strong>${label}</strong></a>`).join('')}</nav><a class="company-topbar-home" href="#main" aria-label="회사 소개 첫 화면으로 이동">맨 위로 <span aria-hidden="true">↑</span></a></div></div>`;
 let result=html.replace(oldNavigation,navigation)
  .replace(/<script\b[^>]*src="assets\/(?:chapter-navigation|detail-chapters)\.js[^>]*><\/script>/g,'')
  .replace('<body class="','<body class="company-topbar-page ')
  .replace(/<section\b([^>]*class="[^"]*\b(?:company-editorial|company-network-unified|contact-with-footer)\b[^>]*?)>/g,(opening,attrs)=>attrs.includes('data-detail-chapter')?opening:`<section${attrs} data-detail-chapter>`)
  .replace('</head>',`<link rel="stylesheet" href="assets/company-topbar.css?v=${version}"><script src="assets/company-topbar.js?v=${version}" defer></script></head>`);
 // The sticky chapter bar also accompanies the shared final consultation screen.
 const contact=htmlElement(result,/<section\b[^>]*id="detail-contact"/);
 if(result.indexOf(contact)>result.indexOf('</main>')){
  result=result.replace(contact,'').replace('</main>',`${contact}</main>`);
 }
 return result;
}
