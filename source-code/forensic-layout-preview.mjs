import {htmlElement} from './forensic-reading-content.mjs';

const legalUses=[
 ['civil','민사 소송 증거자료','계약·손해배상 등 분쟁에서 주장과 사실관계를 뒷받침하는 기록을 확인합니다.'],
 ['criminal','형사 사건 증거자료','자료 유출·사기 등 사건과 관련된 기록을 분석하고 조사에 필요한 근거를 정리합니다.'],
 ['internal','기업 내부 조사','업무자료의 이동·사용·삭제 기록을 대조해 의심 정황과 관련 행위를 살펴봅니다.']
];
function evidenceIcon(kind){
 const art={civil:'<path d="M16 4v24M6 10h20M9 10 4 20h10ZM23 10l-5 10h10ZM9 28h14"/>',criminal:'<path d="m16 3 11 4v10c0 6-6 10-11 13C11 27 5 23 5 17V7Z"/><path d="m10 16 4 4 8-9"/>',internal:'<rect x="5" y="4" width="20" height="24" rx="2"/><path d="M10 10h10M10 16h7M10 22h5"/>'};
 return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art[kind]}</svg>`;
}
function legalDefinition(existing){
 const flow=htmlElement(existing,'<div class="dp-definition-flow"');
 return `<section data-fr-screen class="dp-definition dp-block fr-screen fr-definition-refined" id="overview"><div class="dp-frame">
  <header class="fr-definition-heading"><p class="dp-kicker">WHAT IS DIGITAL FORENSICS?</p><h2>디지털포렌식이란?</h2></header>
  <div class="fr-definition-body"><div class="dp-definition-copy"><p class="dp-lead">디지털 기록을 분석해,<br>사실관계와 법적 증빙의 근거를 확인합니다.</p><p>컴퓨터·스마트폰·저장매체에 남은 기록을 수집·복구·분석하는 전문 조사입니다. 문서·대화·사진·접속 기록의 출처와 시간, 앞뒤 맥락을 대조합니다.</p><p>확인한 자료와 분석 과정을 보고서로 정리하여 <strong>법적 증빙 및 민·형사 소송의 증거자료 검토·제출 준비</strong>를 지원합니다.</p></div>${flow}</div>
  <div class="fr-legal-uses" aria-label="디지털포렌식 자료 활용 목적">${legalUses.map(([kind,title,copy])=>`<article>${evidenceIcon(kind)}<div><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div>
  <p class="fr-legal-note"><strong>증거의 출처와 무결성</strong>자료의 확보·보관·분석 과정을 기록하고, 확인된 사실과 해석을 구분합니다. 증거 채택과 판단은 사건별 요건과 법원의 판단에 따릅니다.</p>
 </div></section>`;
}
export function forensicLayoutPreview(document,version){
 const oldDefinition=htmlElement(document,/<section\b[^>]*id="overview"/);
 let html=document.replace(oldDefinition,legalDefinition(oldDefinition))
  .replace('class="dp-page dp-a ft-page ft-a1 lp-page fr-page fr-a1"','class="dp-page dp-a ft-page ft-a1 lp-page fr-page fr-a1 fr-overview-refined"')
  .replace(/<title>[^<]*<\/title>/,'<title>디지털포렌식 개요 배치 개선 미리보기 | MDFC</title>')
  .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/forensic-layout-preview.css?v=${version}"></head>`)
  .replaceAll('href="digital-forensics.html','href="digital-forensics-layout-preview.html');
 for(const id of ['data-leakage','mobile-evidence','media-authenticity']){
  const section=htmlElement(html,new RegExp(`<section\\b[^>]*id="${id}"`));
  html=html.replace(section,section.replace('class="fr-screen lp-service','class="fr-screen fr-service-overview lp-service'));
 }
 return html;
}
