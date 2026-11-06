import {companyHistoryTimeline} from './company-history-timeline.mjs';

const heading=(k,t,p='')=>`<header class="detail-section-heading"><span class="detail-kicker">${k}</span><h2>${t}</h2>${p?`<p>${p}</p>`:''}</header>`;
const open=(id,classes)=>`<section class="detail-section ${classes}" id="${id}"><div class="container">`;
const close='</div></section>';

function historyScreen(){
 return open('history','company-history-section company-journey-section')+heading('OUR JOURNEY','1990년부터 이어온 기술의 발자취','복구 인프라 구축부터 국가적 사고 대응, 전문기관 협력까지.')+companyHistoryTimeline()+close;
}

export function companyScreenLayout(html){
 // Education and the timeline remain independent chapters; the network is unified.
 html=html.replace(/<div class="company-capability-lines">[\s\S]*?<\/div>/,'');
 html=html.replace('<div class="company-public-support" id="education-support">',close+open('education-support','company-national company-education')+'<div class="company-public-support">');
 html=html.slice(0,html.indexOf('<section class="detail-section company-history-section"'))+historyScreen();
 html=html.replace('<a href="#national-response">국가 재난 대응</a>','<a href="#national-response">국가 재난 대응</a><a href="#education-support">교육·기술지원</a>');
 return html;
}
