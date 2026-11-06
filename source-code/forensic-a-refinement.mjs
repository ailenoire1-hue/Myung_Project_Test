import {forensicPurposeDocument,forensicPurposeServices as services,forensicPurposeIcon as icon} from './forensic-purpose.mjs';
import {technicalServiceVisual,technicalInfrastructure,technicalHeroBackdrop} from './forensic-technical-visuals.mjs';
import {technicalLog} from './forensic-technical-log.mjs';
import {technicalMap} from './forensic-technical-map.mjs';
import {technicalWorkspace} from './forensic-technical-workspace.mjs';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const forensicARefinementOptions=[
 {id:'1',component:'log',name:'분석 로그형',description:'기록별 대조표와 로그 예시로 확인 항목을 보여줍니다.',render:technicalLog},
 {id:'2',component:'map',name:'증거 연결형',description:'아이콘과 관계도를 통해 자료를 함께 검토하는 방식을 보여줍니다.',render:technicalMap},
 {id:'3',component:'workspace',name:'분석 워크스페이스형',description:'시간축·대화·파형 뷰와 주석으로 전문적인 분석 과정을 보여줍니다.',render:technicalWorkspace}
];
const frame=html=>`<div class="dp-frame">${html}</div>`;
function practical(s){
 return `<div class="ft-practical"><div>${icon('record')}<section><h3>상담 전 준비 자료</h3><ul>${s.prep.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section></div><div>${icon('report')}<section><h3>전달하는 결과</h3><ul>${s.outputs.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section></div></div>`;
}
function service(s,option){
 return `<section class="dp-service dp-block ft-service" id="${s.id}">${frame(`<div class="dp-service-top"><div class="dp-service-heading"><p class="dp-kicker">${s.num} / ${s.english}</p><h2>${s.name}</h2><p class="dp-service-question">${s.question}</p><div class="dp-targets">${s.target.split(' · ').map(t=>`<span>${esc(t)}</span>`).join('')}</div><a class="ft-analysis-link" href="#${s.id}-analysis">분석 항목 살펴보기 <span aria-hidden="true">↓</span></a></div>${technicalServiceVisual(s.id)}</div><p class="dp-service-intro">${s.intro}</p><div class="ft-analysis" id="${s.id}-analysis">${option.render(s)}</div>${practical(s)}<p class="dp-scope-note"><strong>확인 범위 안내</strong>${s.note}</p>`)}</section>`;
}
function closing(c){
 return `<section class="ft-closing" id="contact"><div class="ft-contact-main">${frame(`<div class="ft-contact-copy"><p class="dp-kicker">CONTACT MDFC</p><h2>확인하고 싶은<br>사실이 있나요?</h2><p>대상 기기와 자료, 의뢰 목적을 알려 주세요.<br>필요한 분석과 진행 방법을 함께 정리해 드립니다.</p><div class="ft-contact-prep" aria-label="상담 전 알려 주실 내용">${[['data','대상 자료','기기 · 파일 · 백업'],['record','의뢰 목적','확인하고 싶은 쟁점'],['analysis','관련 기간','사건 · 기록의 시점']].map(([ic,t,d])=>`<div>${icon(ic)}<span><strong>${t}</strong><small>${d}</small></span></div>`).join('')}</div></div><div class="ft-contact-panel"><p>디지털포렌식 분석 상담</p><a class="ft-contact-phone" href="tel:${c.phone}">${c.phone}</a><span>${c.hours}</span><button type="button" data-contact>전문가 상담하기 <span aria-hidden="true">↗</span></button><div class="ft-contact-summary"><span>자료 유출 조사</span><span>스마트폰 증거 확보</span><span>음성·영상 위변조 분석</span></div></div>`)}</div><footer class="ft-footer">${frame(`<div class="ft-footer-top"><a class="dp-footer-brand" href="index.html">MDFC <span>명디지털포렌식센터</span></a><nav aria-label="하단 메뉴"><a href="company.html">회사 소개</a><a href="#service-main">서비스 처음으로 ↑</a></nav></div><div class="ft-footer-bottom"><p>${c.legalName} · 대표이사 ${c.ceo} · 사업자등록번호 ${c.registration}<br>${c.address} · FAX ${c.fax}</p><small>© MYUNG DIGITAL FORENSIC CENTER.</small></div>`)}</footer></section>`;
}
export function forensicARefinementDocument(base,id,{baseVersion,version},company){
 const option=forensicARefinementOptions.find(o=>o.id===id);
 if(!option)throw Error(`Unknown A refinement: ${id}`);
 let html=forensicPurposeDocument(base,'a',baseVersion,company);
 html=html.replace('<title>A안 · 의뢰 목적별 안내 | 디지털포렌식 서비스</title>',`<title>A${id}안 · ${option.name} | 디지털포렌식 서비스</title>`)
 .replace('class="dp-page dp-a"',`class="dp-page dp-a ft-page ft-a${id}"`)
 .replace('</head>',`<link rel="stylesheet" href="assets/forensic-technical-${option.component}.css?v=${version}"><link rel="stylesheet" href="assets/forensic-a-refinement.css?v=${version}"></head>`)
 .replaceAll('forensic-purpose-a.html',`forensic-a${id}.html`);
 html=html.replace(/(<section class="dp-hero" id="service-main">)/,`$1${technicalHeroBackdrop()}`);
 html=html.replace(/<figure class="dp-why-photo">[\s\S]*?<\/figure>/,technicalInfrastructure());
 for(const s of services){const pattern=new RegExp(`<section class="dp-service dp-block" id="${s.id}">[\\s\\S]*?<\\/section>`);html=html.replace(pattern,service(s,option));}
 html=html.replace(/<section class="dp-contact">[\s\S]*?<\/section><footer class="dp-footer">[\s\S]*?<\/footer>/,closing(company));
 html=html.replace(/<nav class="dp-preview-nav"[\s\S]*?<\/nav>/,`<nav class="dp-preview-nav ft-preview-nav" aria-label="A안 개선 시안 선택"><a href="forensic-a-refinement-previews.html">3안 비교</a>${forensicARefinementOptions.map(o=>`<a href="forensic-a${o.id}.html"${id===o.id?' aria-current="page"':''}>A${o.id}안</a>`).join('')}</nav>`);
 return html;
}
export function forensicARefinementComparison(version){
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>A안 기반 디지털포렌식 · 시각화 3안 | MDFC</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/forensic-purpose.css?v=${version}"><link rel="stylesheet" href="assets/forensic-a-refinement.css?v=${version}"></head><body class="fp-comparison ft-comparison"><main class="fp-compare"><header class="fp-compare-heading"><a class="fp-compare-brand" href="forensic-purpose-a.html">MDFC <span>A DESIGN / REFINEMENT</span></a><p class="fp-compare-kicker">TECHNICAL VISUALS / THREE OPTIONS</p><h1>A안의 스타일에,<br>분석을 보여주는 세 가지 방법.</h1><p class="fp-compare-intro">첫 화면과 상담·푸터는 화면을 채우고, 모든 서비스 이미지를 기술 그래픽으로 교체했습니다. 본문은 일반 스크롤이며 분석 항목을 서로 다른 방식으로 시각화했습니다.</p><span class="fp-compare-note">A안 기반 미리보기 · 가상 로그 및 설명용 그래픽 사용</span></header><div class="fp-compare-grid">${forensicARefinementOptions.map(o=>`<article class="fp-compare-card"><a class="fp-compare-image" href="forensic-a${o.id}.html" aria-label="A${o.id}안 ${o.name} 전체 미리보기"><img src="assets/forensic-a-refinement/preview-a${o.id}-${o.id==='1'?'125':'124'}.png" alt="A${o.id}안 ${o.name} 분석 항목 시각화 화면" width="1280" height="720" loading="eager"></a><div class="fp-compare-copy"><span class="fp-compare-letter">A${o.id}</span><p class="fp-compare-point">${o.id==='1'?'기록을 직접 살펴보는 구성':o.id==='2'?'증거의 관계를 한눈에':'분석 뷰와 검토 관점을 함께'}</p><h2>${o.name}</h2><p class="fp-compare-description">${o.description}</p><p class="fp-compare-flow">${o.id==='1'?'가상 기록 · 대조표 · 분석 항목':o.id==='2'?'중앙 허브 · 증거 노드 · 연결선':'시간축 · 대화 · 파형 · 주석'}</p><a class="fp-compare-open" href="forensic-a${o.id}.html">전체 시안 보기 <span aria-hidden="true">↗</span></a><a class="ft-compare-jump" href="forensic-a${o.id}.html#data-leakage-analysis">시각화 영역 바로 보기 ↓</a></div></article>`).join('')}</div><footer class="fp-compare-footer"><p>공통 흐름 · 첫 화면과 퀵 가이드 → 포렌식 소개 → 서비스 3종과 분석 시각화 → 진행 절차·FAQ → 상담과 통합 푸터</p><a href="forensic-purpose-a.html">기존 A안 보기 ↗</a></footer></main></body></html>`;
}
