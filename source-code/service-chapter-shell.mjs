import {htmlElement} from './forensic-reading-content.mjs';
import {detailContact} from './detail-contact.mjs';
import {serviceIcon} from './service-design.mjs';

const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const lines=value=>esc(String(value??'').replace(/<br\s*\/?\s*>/gi,'\n')).replace(/\n/g,'<br> ');
const openings={
 'incident-response':{className:'sc-incident',lead:'침해사고의 원인을 규명하고,\n피해 범위와 대응의 근거를 정리합니다.',description:'랜섬웨어·해킹·이메일 사고에 남은 기록을 연결합니다.\n확인된 사실과 조사 범위를 구분해 설명합니다.',icons:['storage','shield','message'],questions:['파일이 암호화되고 업무가 중단되었습니다.','비정상 접속과 의심 프로그램이 발견되었습니다.','계정 도용이나 정보 노출이 의심됩니다.'],words:['ACCESS','SYSTEM','MAIL','INCIDENT']},
 'enterprise-security':{className:'sc-enterprise',lead:'점검과 자료 관리부터,\n솔루션·스토리지·인프라 구축까지.',description:'기업의 업무 환경과 운영 목적을 먼저 살펴봅니다.\n필요한 보안과 데이터 관리 체계를 함께 구성합니다.',icons:['scan','account','network'],questions:['업무 시스템의 보안 상태를 점검하고 싶습니다.','퇴사 전후 자료 보존과 권한 정리가 필요합니다.','보안 체계와 데이터 저장 환경을 개선하고 싶습니다.'],words:['ACCOUNT','DATA','BACKUP','SECURITY']}
};

function heroArtwork(words){
 return `<div class="ft-hero-backdrop sc-hero-backdrop" aria-hidden="true"><svg viewBox="0 0 1440 900" fill="none"><g stroke="#7293a9" stroke-width="1"><path d="M760 230h190v190h220v220H950V420H760Z"/><path d="M950 130v650M670 420h610M760 230v-80h410v80M760 640v110h410V640" stroke-dasharray="5 8"/><path d="M820 290h70v70h-70ZM1010 480h90v90h-90Z"/></g><g fill="#172f43" stroke="#c38e63"><circle cx="760" cy="230" r="12"/><circle cx="950" cy="420" r="18"/><circle cx="1170" cy="640" r="12"/><circle cx="1170" cy="230" r="8"/><circle cx="760" cy="640" r="8"/></g><g fill="#8ba7b9" font-family="Arial,sans-serif" font-size="12" letter-spacing="3"><text x="710" y="202">${words[0]}</text><text x="985" y="392">${words[1]}</text><text x="1110" y="685">${words[2]}</text><text x="790" y="797">${words[3]}</text></g></svg></div>`;
}

function hero(service,content){
 const opening=openings[service.slug];
 return `<section data-fr-screen class="dp-hero fr-screen" id="service-main">${heroArtwork(opening.words)}<div class="dp-frame"><div class="dp-hero-copy"><p class="dp-kicker">${esc(service.english)}</p><h1>${esc(service.name)}</h1><p class="dp-hero-lead">${lines(opening.lead)}</p><p class="dp-hero-description">${lines(opening.description)}</p><div class="dp-hero-actions"><button type="button" data-contact>${service.slug==='incident-response'?'사고 조사 상담':'보안 관리 상담'} <span aria-hidden="true">↗</span></button><a href="#overview">서비스 알아보기 <span aria-hidden="true">↓</span></a></div></div><nav class="dp-quick dp-quick-a" aria-label="의뢰 목적별 빠른 안내">${content.groups.map((group,i)=>`<a href="#${group.id}">${serviceIcon(opening.icons[i])}<div><small>0${i+1} / QUICK GUIDE</small><strong>${esc(group.title)}</strong><span>${esc(opening.questions[i])}</span></div><b aria-hidden="true">↗</b></a>`).join('')}</nav></div></section>`;
}

function chapterGuide(content){
 const items=[['overview','서비스 개요',''],...content.groups.map(group=>[group.id,group.navTitle||group.title,group.number]),...(content.reports?[[content.reports.id,'조사 결과물','']]:[]),...(content.workflow?[['process','진행 절차','']]:[]),['questions','자주 묻는 질문',''],['contact','상담 안내','']];
 return `<div class="fr-topbar"><div class="dp-frame"><span class="fr-topbar-title">SERVICE GUIDE</span><nav class="fr-chapter-nav" aria-label="페이지 챕터 이동">${items.map(([id,title,number])=>`<a href="#${id}">${number?`<span>${esc(number)}</span>`:''}<strong>${esc(title)}</strong></a>`).join('')}</nav><a class="fr-topbar-home" href="#service-main">서비스 메인</a><div class="fr-screen-count" aria-live="off"></div></div></div>`;
}

function screen(page,{group,groupTitle,number,index=1,total=1,aliases=[]}={}){
 const label=page.label||({'analysis-deliverables':'조사 결과물',process:'진행 절차'}[page.id])||'서비스 개요';
 return `<section class="fr-screen sc-screen${page.overview?' sc-overview':''}" data-fr-screen data-fr-group="${esc(group||page.id)}" data-fr-label="${esc(label)}" id="${esc(page.id)}">${aliases.map(id=>`<span class="sc-anchor-alias" id="${esc(id)}" aria-hidden="true"></span>`).join('')}<div class="dp-frame"><div class="fr-screen-body sc-body"><header class="sc-heading"><p class="sc-eyebrow">${esc(page.eyebrow||'SERVICE GUIDE')}</p><h2>${lines(page.title)}</h2>${page.lead?`<p class="sc-lead">${lines(page.lead)}</p>`:''}</header><div class="sc-content"><div class="sc-content-inner">${page.body}</div></div></div><div class="fr-page-caption"><strong>${esc(number||'MDFC')} <span>${esc(groupTitle||label)}</span></strong><span>${String(index).padStart(2,'0')} / ${String(total).padStart(2,'0')} · ${esc(label)}</span></div></div></section>`;
}

function faq(content){
 return {id:'questions',eyebrow:'FREQUENTLY ASKED QUESTIONS',title:'자주 묻는 질문',lead:'상담 전에 궁금한 내용을 확인하세요.',label:'자주 묻는 질문',body:`<div class="sc-faq-list">${content.faq.map(item=>`<details><summary><span>Q</span><strong>${esc(item.question)}</strong><b aria-hidden="true">+</b></summary><p>${esc(item.answer)}</p></details>`).join('')}</div>`};
}

export function serviceChapterDocument({base,sharedHeader,service,company,content,version}){
 const opening=openings[service.slug];
 if(!opening)throw Error('Unsupported service chapter route');
 let head=base.slice(base.indexOf('<head>')+6,base.indexOf('</head>'))
  .replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(service.name)} | 명디지털포렌식센터</title>`)
  .replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${esc(service.description)}">`)
  .replace(/<meta property="og:title"[^>]*>/,`<meta property="og:title" content="${esc(service.name)} | 명디지털포렌식센터">`)
  .replace(/<meta property="og:description"[^>]*>/,`<meta property="og:description" content="${esc(service.description)}">`)
  .replace(/<script[^>]*src="assets\/forensic-approved-route\.js[^>]*><\/script>/,'')
  .replace(/<link[^>]*href="assets\/forensic-service-layout\.css[^>]*>/,'');
 head+=`<link rel="stylesheet" href="assets/service-chapters.css?v=${version}"><link rel="stylesheet" href="assets/service-chapter-${service.slug==='incident-response'?'incident':'enterprise'}.css?v=${version}">`;
 const header=htmlElement(sharedHeader,'<header class="header"');
 const dialog=htmlElement(base,'<dialog class="contact-dialog"');
 const pages=[content.overview,...content.groups.flatMap(group=>group.pages),...(content.reports?[content.reports]:[]),...(content.workflow?[content.workflow]:[]),faq(content)];
 const known=new Set(pages.map(page=>page.id));
 const aliases={'detail-contact':'contact','investigation-method':'contact','analysis-process':content.workflow?'process':'contact','analysis-deliverables':content.reports?.id||content.groups[0].pages[1]?.id||content.groups[0].id};
 const forPage=id=>Object.entries(aliases).filter(([alias,target])=>target===id&&!known.has(alias)).map(([alias])=>alias);
 let chapters=screen(content.overview,{aliases:forPage(content.overview.id)});
 for(const group of content.groups)chapters+=group.pages.map((page,i)=>screen(page,{group:group.id,groupTitle:group.title,number:group.number,index:i+1,total:group.pages.length,aliases:forPage(page.id)})).join('');
 if(content.reports)chapters+=screen(content.reports,{aliases:forPage(content.reports.id)});
 if(content.workflow)chapters+=screen(content.workflow,{aliases:forPage(content.workflow.id)});
 chapters+=screen(faq(content),{aliases:forPage('questions')});
 const contact=detailContact(company,{id:'contact',integratedFooter:true})
  .replaceAll('contact-title',`${service.slug}-contact-title`)
  .replace('class="contact-band detail-contact','data-fr-screen class="fr-screen fr-shared-contact contact-band detail-contact')
  .replace(/(<section[^>]*>)/,`$1${forPage('contact').map(id=>`<span class="sc-anchor-alias" id="${id}" aria-hidden="true"></span>`).join('')}`)
  .replace('href="#main">맨 위로','href="#service-main">맨 위로');
 const script=base.match(/<script src="assets\/forensic-reading-a1\.js[^>]*><\/script>/)?.[0];
 if(!script)throw Error('Missing chapter controller');
 return `<!doctype html><html lang="ko"><head>${head}</head><body class="dp-page dp-a ft-page ft-a1 fr-page fr-a1 sc-page ${opening.className}"><a class="skip" href="#main">본문 바로가기</a>${header}<main class="fr-main" id="main">${hero(service,content)}${chapterGuide(content)}${chapters}${contact}</main>${dialog}${script}</body></html>`;
}
