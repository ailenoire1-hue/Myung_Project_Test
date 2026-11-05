import {htmlElement} from './forensic-reading-content.mjs';
import {ecIcon} from './enterprise-chapter-data.mjs';

export const enterpriseStyleChoices = [
  ['a', '화이트 기본형', '기존 사이트와 가장 자연스럽게 이어지는 구성', '밝은 배경과 정돈된 선으로 원본 일러스트와 서비스 내용을 또렷하게 보여줍니다.'],
  ['b', '일러스트 패널형', '큰 그림에 시선이 모이는 차분한 포인트', '원본 소개 그림에 연한 패널을 더하고, 카드의 핵심 내용과 결과물을 구분합니다.'],
  ['c', '네이비 대비형', '서비스 소개와 상세 범위를 명확하게 구분', '소개 화면은 딥 네이비, 상세 화면은 화이트로 구성해 읽는 흐름에 대비를 줍니다.']
];

const services = [
  {id:'remote-security', number:'01', title:'원격 보안 점검', color:'orange', english:'REMOTE SECURITY ASSESSMENT'},
  {id:'employee-offboarding', number:'02', title:'퇴사자 관리', color:'blue', english:'EMPLOYEE OFFBOARDING'},
  {id:'infrastructure', number:'03', title:'솔루션·스토리지·인프라', color:'green', english:'SOLUTIONS · STORAGE · INFRASTRUCTURE'}
];
const screenIds = ['top','security-basics',...services.flatMap(({id})=>[id,`${id}-scope`]),'trust','contact'];
const escape = value => String(value).replace(/[&<>\"]/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
const section = (reference,id) => htmlElement(reference,new RegExp(`<section\\b[^>]*id="${id}"`));
const inner = html => html.replace(/^<[^>]+>/,'').replace(/<\/[^>]+>$/,'');

function screenFooter(id,label,part){
  const index=screenIds.indexOf(id), previous=screenIds[index-1], next=screenIds[index+1];
  return `<footer class="es-screen-footer"><p><strong>${label}</strong><span>${part}</span></p><nav aria-label="이전 다음 화면">${previous?`<a href="#${previous}" aria-label="이전 화면"><span aria-hidden="true">←</span></a>`:''}<span>${String(index+1).padStart(2,'0')} / ${String(screenIds.length).padStart(2,'0')}</span>${next?`<a href="#${next}" aria-label="다음 화면"><span aria-hidden="true">→</span></a>`:''}</nav></footer>`;
}

function chapterNav(reference){
  let nav=htmlElement(reference,'<nav class="ip-subnav"');
  nav=nav.replace('<ul>','<ul><li><a href="#security-basics">보안 기본 수칙</a></li>');
  nav=nav.replace('<li><a href="#trust">왜 MDFC</a></li><li><a href="#process">진행 절차</a></li>','<li><a href="#trust">왜 MDFC · 진행 절차</a></li>');
  nav=nav.replace(/<a href="#([^"]+)"/g,(_,id)=>`<a href="#${id}" data-es-group="${id}"`);
  return nav;
}

function securityBasics(reference){
  const original=htmlElement(reference,'<section class="ip-aid"');
  const head=htmlElement(original,'<div class="ip-aid__head"');
  let list=htmlElement(original,'<ol class="ip-aid__list"');
  const additions=[
    ['lock','최소 권한 적용','업무에 필요한 사람에게만 권한 부여'],
    ['network','외부 접속 관리','원격 접속 경로와 노출 서비스 확인'],
    ['shield','기기 보호 확인','PC·서버 보안 프로그램 정상 작동'],
    ['file','로그·이상 징후 확인','접속 기록 보관과 의심 활동 점검']
  ].map(([icon,title,description],i)=>`<li><span class="ip-aid__icon">${ecIcon(icon)}</span><b>0${i+5}</b><strong>${title}</strong><small>${description}</small></li>`).join('');
  list=list.replace(/<\/ol>$/,`${additions}</ol>`);
  return `<section class="ip-aid es-screen es-basics" id="security-basics" aria-labelledby="ip-aid-title"><div class="ip-wrap es-frame">${head}${list}${screenFooter('security-basics','SECURITY BASICS','8가지 보안 기본 수칙')}</div></section>`;
}

function serviceScreens(reference,service){
  const original=section(reference,service.id);
  const top=htmlElement(original,'<div class="pa-ch__top');
  const cards=htmlElement(original,'<ul class="pa-cards"');
  // Keep the original scene, alternating layout, all card copy, mini steps and results intact.
  const overview=`<section class="pa-ch pa-ch--${service.color} es-screen es-overview" id="${service.id}" aria-labelledby="${service.id}-t"><div class="ip-wrap es-frame">${top}${screenFooter(service.id,`${service.number} ${service.title}`,'01 / 02 · 서비스 소개')}</div></section>`;
  const detail=`<section class="pa-ch pa-ch--${service.color} es-screen es-detail" id="${service.id}-scope" data-es-parent="${service.id}" aria-labelledby="${service.id}-scope-t"><div class="ip-wrap es-frame"><header class="es-detail-heading"><p class="pa-ch__no"><b>${service.number}</b>${service.english}</p><h2 id="${service.id}-scope-t">${service.title}, 이렇게 도와드립니다</h2></header>${cards}${screenFooter(`${service.id}-scope`,`${service.number} ${service.title}`,'02 / 02 · 수행 범위와 결과')}</div></section>`;
  return overview+detail;
}

function workflow(reference){
  const trust=section(reference,'trust'), process=section(reference,'process');
  const trustHead=htmlElement(trust,'<div class="ip-trust__head"');
  const trustList=htmlElement(trust,'<ol class="ip-trust__list"');
  const processWrap=htmlElement(process,'<div class="ip-wrap"');
  return `<section class="ip-trust es-workflow es-screen" id="trust" aria-labelledby="ip-trust-title"><div class="ip-wrap es-frame">${trustHead}${trustList}<div class="ip-process es-process-block" aria-labelledby="ip-process-title">${inner(processWrap)}</div>${screenFooter('trust','WHY MDFC · HOW WE WORK','경험과 기술 · 점검부터 운영까지')}</div></section>`;
}

export function enterpriseStylePreview({base,reference,variant,version}){
  const choice=enterpriseStyleChoices.find(([key])=>key===variant);
  if(!choice)throw new Error(`Unknown enterprise style preview: ${variant}`);
  const header=htmlElement(base,'<header class="header"');
  const dialog=htmlElement(base,'<dialog class="contact-dialog"');
  const contact=section(base,'contact')
    .replace(/<span class="(?:sc-anchor-alias|ir-live-anchor)"[^>]*><\/span>/g,'')
    .replace('href="#service-main">맨 위로','href="#top">맨 위로')
    .replace(/\sdata-fr-screen(?:="[^"]*")?/g,'');
  const hero=section(reference,'top');
  const styles=['style.css','header-navigation.css','forensic-purpose.css','forensic-reading.css','forensic-reading-a1.css','enterprise-plan-base.css','enterprise-plan-cards.css','detail-contact.css','layout-refinement.css','forensic-shared-contact.css','enterprise-plan-preview.css','enterprise-style.css','enterprise-style-finishes.css'];
  const content=hero+chapterNav(reference)+securityBasics(reference)+services.map(service=>serviceScreens(reference,service)).join('')+workflow(reference);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${variant.toUpperCase()} · ${choice[1]} | 기업 보안 관리 서비스 미리보기</title><meta name="description" content="원격 보안 점검, 퇴사자 관리, 솔루션·스토리지·인프라 서비스의 원본 내용과 그림을 유지한 디자인 미리보기입니다."><link rel="icon" href="assets/favicon.svg" type="image/svg+xml">${styles.map(file=>`<link rel="stylesheet" href="assets/${file}?v=${escape(version)}">`).join('')}<script src="assets/app.js" defer></script><script src="assets/forensic-purpose.js?v=${escape(version)}" defer></script><script src="assets/enterprise-style.js?v=${escape(version)}" defer></script></head><body class="dp-page fr-page fr-a1 ip-page es-page es-restyle es-style-${variant}"><a class="skip" href="#main">본문 바로가기</a>${header}<main class="es-main" id="main"><div class="ip-main es-content">${content}</div>${contact}</main>${dialog}<nav class="es-style-switch" aria-label="스타일 미리보기 선택"><a href="enterprise-style-previews.html">3안 비교</a>${enterpriseStyleChoices.map(([key])=>`<a href="enterprise-style-${key}.html#top" data-es-variant${key===variant?' aria-current="page"':''}>${key.toUpperCase()}<span class="sr-only">안</span></a>`).join('')}</nav></body></html>`;
}

export function enterpriseStyleComparison(version){
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>기업 보안 관리 서비스 · 스타일 3안 비교 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/enterprise-style.css?v=${escape(version)}"></head><body class="es-style-compare"><header><a href="index.html">MDFC <span>명디지털포렌식센터</span></a><a href="enterprise-plan-preview.html">기존 미리보기와 비교 <span aria-hidden="true">↗</span></a></header><main><p class="ip-kicker">ENTERPRISE SECURITY · STYLE PREVIEWS</p><h1>그림과 내용은 그대로,<br>사이트와 어울리는 세 가지 스타일.</h1><p class="es-style-compare-lead">큰 일러스트와 좌우 교차 소개, 서비스별 3개 카드를 유지했습니다.<br>소개와 상세 내용을 각각 한 화면에 담고, 색상과 표면 표현만 다르게 정리했습니다.</p><div class="es-style-structure"><span>보안 기본 수칙 <b>8항목 · 1화면</b></span><span>서비스 소개 + 상세 <b>서비스별 2화면</b></span><span>강점 + 진행 절차 <b>1화면</b></span></div><div class="es-style-options">${enterpriseStyleChoices.map(([key,title,summary,description])=>`<article><header><span>${key.toUpperCase()}</span><div><h2>${title}</h2><p>${summary}</p></div></header><a class="es-style-shot" href="enterprise-style-${key}.html#remote-security"><img src="assets/enterprise-style-${key}-shot.png?v=${escape(version)}" width="1440" height="900" alt="${key.toUpperCase()}안 ${title} 원격 보안 점검 화면" loading="lazy"></a><p>${description}</p><div class="es-style-links"><a href="enterprise-style-${key}.html#remote-security">서비스 화면 보기 <span aria-hidden="true">↗</span></a><a href="enterprise-style-${key}.html">첫 화면부터 보기</a></div></article>`).join('')}</div></main></body></html>`;
}
