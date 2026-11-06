import {htmlElement} from './forensic-reading-content.mjs';
import {serviceIcon} from './service-design.mjs';

export const incidentServiceChoices=[
 ['a','서비스 여정형','큰 그림으로 복원·조사·예방을 한눈에'],
 ['b','단계 선택형','궁금한 서비스를 선택하면 그림과 설명이 함께'],
 ['c','보안 연결도형','회사 환경과 제공 서비스를 하나의 그림으로']
];
const topics=[['ransomware','01 랜섬웨어 사고 조사'],['email-hacking','02 이메일·해킹 조사'],['security-review','03 개인정보·내부 보안점검'],['process','진행 안내'],['questions','FAQ']];
const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const section=(id,kicker,title,lead,content)=>`<section class="ir-section is-common" data-fr-screen data-fr-group="${id}" id="${id}"><div class="ir-frame"><header class="ir-heading"><p class="ir-eyebrow">${kicker}</p><h2>${title}</h2><p class="ir-lead">${lead}</p></header><div class="ir-content">${content}</div><footer class="ir-section-caption"><span>MDFC · INCIDENT RESPONSE & PREVENTION</span><span>${title}</span></footer></div></section>`;
const process=()=>section('process','HOW WE HELP','상담부터 결과 안내까지, 이렇게 진행됩니다.','현재 상황을 알려주시면 필요한 서비스와 진행 범위를 함께 정리합니다.',`<ol class="is-process">${[
 ['message','상황 상담','어떤 문제가 있나요?','발생 시점과 증상, 확인하고 싶은 내용을 듣습니다.'],
 ['account','범위 협의','무엇을 살펴볼까요?','대상 기기·계정·자료와 진행 방법을 정합니다.'],
 ['scan','복원·조사·점검','필요한 작업을 진행합니다.','의뢰한 항목에 맞춰 데이터를 살펴보고 근거를 확인합니다.'],
 ['shield','결과 안내','다음 행동을 정리합니다.','확인한 내용과 복원 결과, 보완할 항목을 설명합니다.']
 ].map(([icon,title,sub,copy],i)=>`<li><div class="is-process-art">${serviceIcon(icon)}<b>0${i+1}</b></div><h3>${title}</h3><strong>${sub}</strong><p>${copy}</p></li>`).join('')}</ol><div class="is-results"><span>의뢰 항목에 따라 제공</span><div>${serviceIcon('storage')}<strong>복원 데이터</strong><small>가능한 복원 범위와 결과</small></div><div>${serviceIcon('scan')}<strong>조사·점검 결과</strong><small>확인한 사실과 판단 근거</small></div><div>${serviceIcon('shield')}<strong>보안 개선안</strong><small>보완 우선순위와 예방 방향</small></div></div>`);
const faq=()=>section('questions','QUESTIONS & ANSWERS','이런 점이 궁금하신가요?','사고 유형이나 필요한 서비스를 정확히 몰라도 상담할 수 있습니다.',`<div class="ir-faq">${[
 ['랜섬웨어로 열리지 않는 파일도 복원할 수 있나요?','파일과 저장매체의 상태, 암호화 방식, 사용 가능한 백업 등을 확인해 복원 방법과 가능 범위를 안내합니다. 가능한 데이터 복원과 백업 복원을 지원하며, 모든 암호화 파일의 복원이 가능한 것은 아닙니다.'],
 ['이메일·해킹 조사는 무엇을 확인하나요?','누가 어떤 경로로 접근했는지, 계정이나 시스템에서 어떤 일이 있었는지 기록을 확인합니다. 의심스러운 메일과 로그인, 설정 변경 등을 함께 살펴보고 같은 문제가 반복될 위험을 줄이는 개선 방향을 정리합니다.'],
 ['사고가 발생하지 않아도 내부 보안점검을 받을 수 있나요?','가능합니다. 개인정보를 다루는 위치와 접근 권한, 자료 공유와 반출 경로, 업무 기기의 보안 설정 등을 협의한 범위에서 점검합니다. 의심스러운 흔적과 취약한 부분을 확인하고 개선 우선순위를 안내합니다.'],
 ['상담 전에 무엇을 준비해야 하나요?','발견한 증상과 발생 시점, 관련 기기·계정, 지금까지 취한 조치를 알려주세요. 보유한 파일·메일·로그·백업이 있다면 함께 안내해 주시면 됩니다. 업무 영향과 자료 보존을 고려해 확보 방법을 협의합니다.']
 ].map(([q,a])=>`<details><summary><span>Q</span><strong>${q}</strong><b aria-hidden="true">+</b></summary><p>${a}</p></details>`).join('')}</div>`);

export function incidentServiceDocument({base,variant,content,version}){
 let head=base.slice(base.indexOf('<head>')+6,base.indexOf('</head>'))
 .replace(/<title>[\s\S]*?<\/title>/,`<title>${variant.toUpperCase()}안 · ${esc(content.name)} | 침해사고 조사 미리보기</title>`)
 .replace(/<link[^>]*href="assets\/service-chapter[^>]*>/g,'')
 .replace(/<meta name="description"[^>]*>/,'<meta name="description" content="랜섬웨어 데이터 복원·원인 조사·재발 방지, 이메일·해킹 조사, 개인정보 및 내부 보안점검을 소개합니다.">');
 head+=`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/incident-investigation-previews.css?v=${version}"><link rel="stylesheet" href="assets/incident-service-previews.css?v=${version}"><link rel="stylesheet" href="assets/incident-service-${variant}.css?v=${version}"><script src="assets/incident-service-previews.js?v=${version}" defer></script>`;
 const header=htmlElement(base,'<header class="header"'),dialog=htmlElement(base,'<dialog class="contact-dialog"'),contact=htmlElement(base,/<section\b[^>]*id="contact"/);
 const script=base.match(/<script src="assets\/forensic-reading-a1\.js[^>]*><\/script>/)?.[0]||'';
 const hero=`<section class="dp-hero ir-hero is-hero" data-fr-screen id="service-main"><div class="ir-hero-art" aria-hidden="true">${content.heroGraphic||''}</div><div class="dp-frame"><div class="dp-hero-copy"><p class="dp-kicker">RECOVER · INVESTIGATE · PREVENT</p><h1>침해사고 조사</h1><p class="dp-hero-lead">데이터 복원부터 원인 조사,<br>재발 방지와 보안 점검까지.</p><p class="dp-hero-description">멈춘 업무를 다시 이어가고, 같은 사고의 위험을 줄일 수 있도록.<br>현재 상황에 맞는 복원·조사·점검 서비스를 안내합니다.</p><div class="dp-hero-actions"><button type="button" data-contact>전문가와 상담하기 <span aria-hidden="true">↗</span></button><a href="#ransomware">어떤 서비스를 제공하나요? <span aria-hidden="true">↓</span></a></div></div><nav class="dp-quick ir-quick is-quick" aria-label="서비스 분야 선택">${[
 ['ransomware','storage','랜섬웨어 사고 조사','데이터 복원 · 원인 조사 · 재발 방지'],['email-hacking','message','이메일·해킹 조사','사고 원인 조사 · 재발 방지 및 예방'],['security-review','shield','개인정보 및 내부 보안점검','사고 가능성 조사 · 취약점 점검 및 컨설팅']
 ].map(([id,icon,t,s],i)=>`<a href="#${id}">${serviceIcon(icon)}<div><small>0${i+1} / SERVICE</small><strong>${t}</strong><span>${s}</span></div><b aria-hidden="true">↗</b></a>`).join('')}</nav></div></section>`;
 const guide=`<div class="fr-topbar"><div class="dp-frame"><span class="fr-topbar-title">SERVICE GUIDE</span><nav class="fr-chapter-nav" aria-label="침해사고 조사 서비스 챕터">${topics.map(([id,t])=>`<a href="#${id}"><strong>${t}</strong></a>`).join('')}</nav><a class="fr-topbar-home" href="#contact">상담 안내 ↗</a><div class="fr-screen-count"></div></div></div>`;
 const switcher=`<nav class="ir-preview-switch" aria-label="새 서비스 미리보기 선택"><a href="incident-service-previews.html">3안 비교</a>${incidentServiceChoices.map(([id])=>`<a data-is-variant="${id}" href="incident-service-${id}.html#ransomware" ${id===variant?'aria-current="page"':''}>${id.toUpperCase()}안</a>`).join('')}</nav>`;
 return `<!doctype html><html lang="ko"><head>${head}</head><body class="dp-page dp-a ft-page ft-a1 fr-page fr-a1 ir-page ir-service-page is-${variant}"><a class="skip" href="#main">본문 바로가기</a>${header}<main class="fr-main" id="main">${hero}${guide}${content.body}${process()}${faq()}${contact}</main>${dialog}${switcher}${script}</body></html>`;
}

export function incidentServiceComparison(version){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>침해사고 조사 · 서비스 중심 3안 미리보기 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/incident-investigation-previews.css?v=${version}"><link rel="stylesheet" href="assets/incident-service-previews.css?v=${version}"></head><body class="ir-comparison is-comparison"><header><a href="index.html" class="ir-comparison-brand">MDFC<span>명디지털포렌식센터</span></a><a href="incident-response.html">현재 홈페이지 보기 ↗</a></header><main><p class="ir-eyebrow">SERVICE DESIGN PREVIEW · 3 OPTIONS</p><h1>어떤 도움을 받는지,<br>그림으로 쉽게 이해하는 서비스.</h1><p class="ir-comparison-intro">랜섬웨어 사고 조사 / 이메일·해킹 조사 / 개인정보 및 내부 보안점검</p><div class="ir-comparison-grid">${incidentServiceChoices.map(([id,t,desc])=>`<a class="ir-choice" href="incident-service-${id}.html#ransomware"><div class="ir-choice-preview"><img src="assets/incident-service-proof-${id}.png?v=${version}" alt="${id.toUpperCase()}안 ${t} 화면 미리보기"></div><div class="ir-choice-title"><b>${id.toUpperCase()}</b><h2>${t}</h2><span>↗</span></div><p>${desc}</p><span class="ir-choice-link">세 가지 서비스 모두 살펴보기 →</span></a>`).join('')}</div><p class="ir-comparison-note">서비스별로 제공하는 작업과 결과를 큰 그림으로 정리했습니다. 각 시안의 상단 메뉴에서 챕터를 이동할 수 있습니다.</p></main></body></html>`;}
