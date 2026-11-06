import {htmlElement} from './forensic-reading-content.mjs';
import {serviceIcon} from './service-design.mjs';

const choices=[['a','분석 흐름형','밝은 화면에서 기록과 사고 경위를 한눈에 연결'],['b','조사 콘솔형','로그·계정·피해 범위를 기술적인 분석 화면으로'],['c','사례 보고서형','고객의 질문부터 조사 결과까지 사례로 설명']];
const sections=[['overview','서비스 개요'],['ransomware','01 랜섬웨어'],['mail-hacking','02 메일·해킹'],['personal-data','03 개인정보 유출'],['reports','조사 결과물'],['process','진행 절차'],['questions','FAQ']];
const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function section(id,eyebrow,title,lead,body){return `<section class="ir-section ir-common" data-fr-screen data-fr-group="${id}" id="${id}"><div class="ir-frame"><header class="ir-heading"><p class="ir-eyebrow">${eyebrow}</p><h2>${title}</h2><p class="ir-lead">${lead}</p></header><div class="ir-content">${body}</div><footer class="ir-section-caption"><span>MDFC · INCIDENT INVESTIGATION</span><span>${title}</span></footer></div></section>`;}
const workflow=()=>section('process','INVESTIGATION PROCESS','상황 파악부터 결과 설명까지','담당자와 조사 범위·확보 자료·진행 순서를 먼저 협의합니다.',`<ol class="ir-process">${[
 ['message','상황 파악','발견 시점 · 주요 증상','영향받은 업무와 현재 조치를 확인합니다.'],
 ['storage','자료 확보','로그 · 시스템 · 원본 메일','운영 영향과 보존 필요성을 함께 검토합니다.'],
 ['scan','기록 분석','접속 · 실행 · 자료 이동','서로 다른 기록을 시간·계정·기기별로 대조합니다.'],
 ['report','결과 설명','사고 경위 · 범위 · 근거','확인된 사실과 추가 확인 항목을 구분합니다.']
 ].map(([icon,title,meta,copy],i)=>`<li><div class="ir-process-node"><b>0${i+1}</b>${serviceIcon(icon)}</div><h3>${title}</h3><strong>${meta}</strong><p>${copy}</p></li>`).join('')}</ol><div class="ir-preparation"><strong>상담 전 준비</strong><span>발생 시점과 증상</span><span>시스템·계정의 범위</span><span>현재 조치와 보유 자료</span></div>`);
const faq=()=>section('questions','FREQUENTLY ASKED QUESTIONS','조사 의뢰 전, 자주 묻는 질문','확보 가능한 자료와 업무 상황을 바탕으로 진행 방법을 안내합니다.',`<div class="ir-faq">${[
 ['사고 유형을 정확히 모르는데 상담할 수 있나요?','가능합니다. 파일이 열리지 않는 현상, 의심 로그인, 비정상 메일 발송 등 발견한 증상과 시점을 알려주세요. 관련 시스템과 기록을 바탕으로 조사 범위를 함께 정합니다.'],
 ['랜섬웨어 조사와 데이터 복구는 어떻게 다른가요?','사고 조사는 유입·실행 경위와 영향 범위를 확인하는 과정입니다. 데이터 복구는 파일·저장매체·백업의 상태에 따라 별도로 검토하며, 조사 결과만으로 모든 파일의 복구가 보장되지는 않습니다.'],
 ['메일 해킹과 개인정보 유출을 함께 조사할 수 있나요?','사고가 연결된 경우 계정 접근과 사서함 설정 변경부터 자료의 열람·다운로드·전달 기록까지 연계해 조사 범위를 협의할 수 있습니다. 로그인 성공이나 전달 규칙만으로 전체 자료 유출을 단정하지 않습니다.'],
 ['어떤 자료를 준비하면 되나요?','발생 시점, 영향받은 기기·계정, 주요 증상, 현재까지 시행한 조치와 보유 로그·원본 메일·백업 정보를 정리해 주세요. 자료를 일괄 삭제하거나 초기화하기 전에 담당자와 보존 범위를 협의하는 것이 좋습니다.'],
 ['조사 후 무엇을 받을 수 있나요?','의뢰 범위에 따라 핵심 결과 요약, 주요 행위 타임라인, 관련 자산·계정·자료 범위와 근거 목록 등을 정리합니다. 확보하지 못한 자료와 확인 한계도 구분해 설명합니다.']
 ].map(([q,a])=>`<details><summary><span>Q</span><strong>${q}</strong><b aria-hidden="true">+</b></summary><p>${a}</p></details>`).join('')}</div>`);

export function incidentInvestigationPreview({base,variant,content,version}){
 let head=base.slice(base.indexOf('<head>')+6,base.indexOf('</head>'))
  .replace(/<title>[\s\S]*?<\/title>/,`<title>${variant.toUpperCase()}안 · 침해사고 조사 ${esc(content.name)} | MDFC</title>`)
  .replace(/<link[^>]*href="assets\/service-chapter[^>]*>/g,'');
 head+=`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/incident-investigation-previews.css?v=${version}"><link rel="stylesheet" href="assets/incident-investigation-${variant}.css?v=${version}"><script src="assets/incident-investigation-previews.js?v=${version}" defer></script>`;
 const header=htmlElement(base,'<header class="header"');
 const dialog=htmlElement(base,'<dialog class="contact-dialog"');
 const contact=htmlElement(base,/<section\b[^>]*id="contact"/);
 const script=base.match(/<script src="assets\/forensic-reading-a1\.js[^>]*><\/script>/)?.[0]||'';
 const hero=`<section class="dp-hero ir-hero" data-fr-screen id="service-main"><div class="ir-hero-art" aria-hidden="true">${content.heroGraphic||''}</div><div class="dp-frame"><div class="dp-hero-copy"><p class="dp-kicker">INCIDENT INVESTIGATION</p><h1>침해사고 조사</h1><p class="dp-hero-lead">사고의 원인을 규명하고,<br>피해 범위를 확인합니다.</p><p class="dp-hero-description">랜섬웨어, 메일·해킹, 개인정보 유출.<br>시스템과 계정에 남은 기록을 연결해 대응에 필요한 근거를 정리합니다.</p><div class="dp-hero-actions"><button type="button" data-contact>사고 조사 상담 <span aria-hidden="true">↗</span></button><a href="#overview">조사 서비스 알아보기 <span aria-hidden="true">↓</span></a></div></div><nav class="dp-quick ir-quick" aria-label="사고 유형별 빠른 안내">${[
 ['ransomware','shield','랜섬웨어 사고조사','파일 암호화 · 업무 중단'],['mail-hacking','message','메일·해킹 조사','계정 도용 · 시스템 침입'],['personal-data','storage','개인정보 유출 조사','자료 접근 · 다운로드 · 외부 전송']
 ].map(([id,icon,t,sub],i)=>`<a href="#${id}">${serviceIcon(icon)}<div><small>0${i+1} / QUICK GUIDE</small><strong>${t}</strong><span>${sub}</span></div><b aria-hidden="true">↗</b></a>`).join('')}</nav></div></section>`;
 const guide=`<div class="fr-topbar"><div class="dp-frame"><span class="fr-topbar-title">INVESTIGATION</span><nav class="fr-chapter-nav" aria-label="침해사고 조사 항목">${sections.map(([id,t])=>`<a href="#${id}"><strong>${t}</strong></a>`).join('')}</nav><a class="fr-topbar-home" href="#contact">상담 안내 ↗</a><div class="fr-screen-count"></div></div></div>`;
 const switcher=`<nav class="ir-preview-switch" aria-label="미리보기 디자인 선택"><a href="incident-investigation-previews.html">3안 비교</a>${choices.map(([id])=>`<a data-ir-variant="${id}" href="incident-investigation-${id}.html#overview" ${id===variant?'aria-current="page"':''}>${id.toUpperCase()}안</a>`).join('')}</nav>`;
 return `<!doctype html><html lang="ko"><head>${head}</head><body class="dp-page dp-a ft-page ft-a1 fr-page fr-a1 ir-page ir-${variant}"><a class="skip" href="#main">본문 바로가기</a>${header}<main class="fr-main" id="main">${hero}${guide}${content.body}${workflow()}${faq()}${contact}</main>${dialog}${switcher}${script}</body></html>`;
}

export function incidentInvestigationComparison(version){
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>침해사고 조사 · 디자인 3안 비교 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/incident-investigation-previews.css?v=${version}"></head><body class="ir-comparison"><header><a href="index.html" class="ir-comparison-brand">MDFC<span>명디지털포렌식센터</span></a><a href="incident-response.html">현재 홈페이지 보기 ↗</a></header><main><p class="ir-eyebrow">INCIDENT INVESTIGATION · DESIGN PREVIEW</p><h1>같은 세 가지 서비스,<br>서로 다른 설명 방식.</h1><p class="ir-comparison-intro">랜섬웨어 / 메일·해킹 / 개인정보 유출<br>실제 서비스 내용과 시각화 자료를 함께 살펴보세요.</p><div class="ir-comparison-grid">${choices.map(([id,t,copy])=>`<a class="ir-choice" href="incident-investigation-${id}.html#ransomware"><div class="ir-choice-preview"><img src="assets/incident-investigation-proof-${id}.png?v=${version}" alt="${id.toUpperCase()}안 ${t} 실제 미리보기" loading="lazy"></div><div class="ir-choice-title"><b>${id.toUpperCase()}</b><h2>${t}</h2><span>↗</span></div><p>${copy}</p><span class="ir-choice-link">전체 페이지 살펴보기 →</span></a>`).join('')}</div><p class="ir-comparison-note">각 시안은 서비스 개요 · 세 가지 조사 분야 · 결과물 · 진행 절차 · FAQ · 상담으로 구성했습니다.<br>로그·화면·사례는 설명을 위한 예시이며 실제 고객의 사건 자료가 아닙니다.</p></main></body></html>`;
}
