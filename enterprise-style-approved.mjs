import {htmlElement} from './forensic-reading-content.mjs';
import {ecIcon} from './enterprise-chapter-data.mjs';

export function approvedEnterpriseC(preview,version){
 const switcher=htmlElement(preview,'<nav class="es-style-switch"');
 const oldHero=htmlElement(preview,/<section\b[^>]*id="top"/);
 if(!switcher||!oldHero)throw new Error('Selected enterprise C preview is incomplete.');
 const quick=[
  ['remote-security','scan','원격 보안 점검','PC·서버·계정의 보안 상태를 확인합니다.'],
  ['employee-offboarding','account','퇴사자 관리','업무 자료 보존부터 접근 권한 정리까지.'],
  ['infrastructure','storage','솔루션 &amp; 스토리지','보안 솔루션과 저장·백업 환경을 구축합니다.']
 ];
 const hero=`<section class="pa-hero es-live-hero" id="top" aria-labelledby="es-live-title"><div class="es-hero-backdrop" aria-hidden="true"><svg viewBox="0 0 720 720" fill="none"><g stroke="currentColor"><path d="m360 95 215 90v173c0 130-215 269-215 269S145 488 145 358V185zM360 142l170 71v145c0 101-170 215-170 215S190 459 190 358V213z"/><path d="M360 45v630M70 360h580M111 190h498M111 530h498" stroke-dasharray="4 10"/><path d="m280 360 58 58 116-126"/></g><g fill="#bd9270"><circle cx="360" cy="95" r="5"/><circle cx="145" cy="358" r="5"/><circle cx="575" cy="358" r="5"/><circle cx="360" cy="627" r="5"/></g></svg></div><div class="ip-wrap pa-hero__grid"><div class="es-hero-copy"><p class="ip-kicker">ENTERPRISE SECURITY MANAGEMENT</p><h1 id="es-live-title">기업 보안 관리 서비스</h1><p class="es-hero-lead">사고가 나기 전에,<br>회사의 보안을 미리 챙깁니다.</p><p class="es-hero-description">원격 보안 점검과 퇴사자 관리부터 솔루션·스토리지 구축까지.<br>업무 환경에 맞는 보호 체계를 함께 만듭니다.</p><div class="dp-hero-actions"><button type="button" data-contact>전문가와 상담하기 <span aria-hidden="true">↗</span></button><a href="#security-basics">서비스 살펴보기 <span aria-hidden="true">↓</span></a></div></div><nav class="dp-quick dp-quick-a es-hero-quick" aria-label="기업 보안 관리 퀵가이드">${quick.map(([id,icon,title,description],i)=>`<a href="#${id}">${ecIcon(icon)}<div><small>0${i+1} / QUICK GUIDE</small><strong>${title}</strong><span>${description}</span></div><b aria-hidden="true">↗</b></a>`).join('')}</nav></div></section>`;
 let page=preview.replace(switcher,'').replace(oldHero,hero)
  .replace(/<meta name="robots"[^>]*>/g,'')
  .replace(/<title>[\s\S]*?<\/title>/,'<title>기업 보안 관리 서비스 | 명디지털포렌식센터</title>')
  .replace(/<meta name="description"[^>]*>/,'<meta name="description" content="원격 보안 점검, 퇴사자 관리, 보안 솔루션과 스토리지 구축. 명정보기술의 복구·조사 경험을 바탕으로 기업의 디지털 안전을 지원합니다.">')
  .replace('es-style-c"','es-style-c es-live-c"')
  .replace('</head>',`<link rel="stylesheet" href="assets/enterprise-style-approved.css?v=${version}"></head>`);
 const aliases={top:['service-main','overview'],'remote-security-scope':['remote-security-analysis','analysis-deliverables'],'employee-offboarding-scope':['employee-offboarding-analysis'],infrastructure:['security-solutions','storage','solutions-storage'],'infrastructure-scope':['server-nas','security-infrastructure'],trust:['process','analysis-process'],contact:['questions','detail-contact','investigation-method']};
 for(const [target,ids]of Object.entries(aliases)){
  const start=new RegExp(`(<section\\b[^>]*\\bid="${target}"[^>]*>)`);
  if(!start.test(page))throw new Error(`Missing enterprise chapter: ${target}`);
  page=page.replace(start,`$1${ids.map(id=>`<span class="es-live-anchor" id="${id}" aria-hidden="true"></span>`).join('')}`);
 }
 if(/미리보기|es-style-switch|noindex/.test(page))throw new Error('Enterprise preview controls remain on the live page.');
 return page;
}
