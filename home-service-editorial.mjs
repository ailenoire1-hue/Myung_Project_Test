import {variedForensicsChapter,serviceChapterHeading} from './home-service-varied.mjs';
import {enterpriseCardsChapter} from './home-enterprise-cards.mjs';
const row = ({id,title,copy,links}) => links
 ? `<div class="home-service-row"><h3>${title}</h3><p>${copy}</p><div class="home-service-sub-links">${links.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}</div></div>`
 : `<a class="home-service-row" href="${id}"><h3>${title}</h3><p>${copy}</p></a>`;

export function editorialServiceChapter({id,label,title,description,number,image,alt,width,height,href,rows,kind,mirrored=false}){
 return `<section id="${id}" class="service-chapter home-service-editorial${mirrored?' home-service-mirrored':''}" data-service="${kind}" aria-labelledby="${id}-title" data-home-chapter data-nav-label="${label}" data-nav-theme="${mirrored?'dark':'light'}">
 <div class="home-service-photo"><img src="${image}" alt="${alt}" width="${width}" height="${height}" loading="lazy"><div class="home-service-shade" aria-hidden="true"></div>
  <div class="home-service-title">${serviceChapterHeading({number,description,title,id:`${id}-title`})}</div><a class="home-service-more" href="${href}">서비스 자세히 보기<span aria-hidden="true">+</span><span class="visually-hidden">${label}</span></a>
 </div><div class="home-service-content"><div class="home-service-list">${rows.map(row).join('')}</div></div>
 </section>`;
}

export const approvedIncidentChapter=editorialServiceChapter({
 id:'home-incident-response',label:'침해사고 조사',kind:'incident',title:'<em>침해사고</em> 조사',description:'침해 흔적을 추적해 사고 원인과 피해 범위를 확인합니다.',number:'02',
 image:'assets/service-materials/incident-analysis-concept-v2.png',alt:'로그와 네트워크 흔적을 분석하는 침해사고 조사 작업 환경을 표현한 이미지',width:1024,height:1536,href:'incident-response.html',
 rows:[
  {id:'incident-response.html#ransomware',title:'랜섬웨어 사고 조사',copy:'데이터 복원부터 사고 원인 조사와 재발 방지까지 지원합니다.'},
  {id:'incident-response.html#email-hacking',title:'이메일·해킹 조사',copy:'메일과 계정·시스템의 침해 경위를 확인하고 보안 개선안을 제시합니다.'},
  {id:'incident-response.html#privacy-audit',title:'개인정보 및 내부 보안점검',copy:'사고 가능성과 보안 취약점을 살펴보고 개선 우선순위를 안내합니다.'}
 ]
});

export const approvedEnterpriseChapter=enterpriseCardsChapter();

export function replaceServiceChapter(html,id,section){
 const match=new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<\\/section>`);
 if(!match.test(html))throw new Error(`Missing homepage service chapter: ${id}`);
 return html.replace(match,section);
}

export function applyApprovedIncidentDesign(home,{version}){
 const page=replaceServiceChapter(home,'home-incident-response',approvedIncidentChapter);
 if(page.includes('assets/home-service-editorial.css'))return page;
 return page.replace('</head>',`<link rel="stylesheet" href="assets/home-service-editorial.css?v=${version}"><script src="assets/home-service-editorial.js?v=${version}" defer></script></head>`);
}

export function applyApprovedServiceDesign(home,{version}){
 const page=replaceServiceChapter(replaceServiceChapter(home,'home-digital-forensics',variedForensicsChapter()),'home-enterprise-security',approvedEnterpriseChapter);
 if(page.includes('assets/home-service-varied.css'))return page;
 return page.replace('</head>',`<link rel="stylesheet" href="assets/home-service-varied.css?v=${version}"></head>`);
}

export function serviceEditorialPreviewDocument(home,{version}){
 return applyApprovedServiceDesign(home,{version})
  .replace(/<title>[^<]*<\/title>/,'<title>메인 서비스 디자인 개선안 | 명디지털포렌식센터</title>')
  .replace('</head>','<meta name="robots" content="noindex,nofollow"></head>')
  .replace(/<body class="([^"]*)">/,'<body class="$1 service-editorial-preview-page">');
}
