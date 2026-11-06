import {htmlElement} from './forensic-reading-content.mjs';
import {serviceIcon} from './service-design.mjs';
import {incidentFlowContent} from './incident-flow-content.mjs';

const extraIcons={
 warning:'<path d="m17 3 14 26H3zM17 12v8m0 4v1"/>',
 search:'<circle cx="14" cy="14" r="10"/><path d="m21 21 10 10"/>',
 restore:'<ellipse cx="14" cy="7" rx="10" ry="4"/><path d="M4 7v17c0 2 4 4 10 4M24 7v8M4 15c0 2 4 4 10 4m5 5a7 7 0 1 0 3-6m-2-3v6h6"/>',
 camera:'<path d="M4 9h7l3-5h7l3 5h6v21H4z"/><circle cx="17" cy="19" r="6"/>',
 power:'<path d="M17 3v12M9 7a13 13 0 1 0 16 0"/>',
 report:'<path d="M7 3h14l6 6v22H7zM21 3v7h6M12 16h10m-10 5h10m-10 5h6"/>'
};
const icon=name=>extraIcons[name]?`<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${extraIcons[name]}</svg>`:serviceIcon(name);
const journey=()=>`<ol class="if-journey" aria-label="사고 대응의 주요 과정">${[['warning','사고 발생','현재 상황 확인'],['search','원인 조사','경위·피해 범위 확인'],['restore','데이터 복원','가능한 자료 복원'],['shield','재발 방지','보안 개선 방향 정리']].map(([i,t,s],n)=>`<li><div class="if-journey-icon">${icon(i)}</div><span>0${n+1}</span><strong>${t}</strong><small>${s}</small></li>`).join('')}</ol>`;
const hero=()=>`<section class="if-hero" id="top"><div class="if-frame"><p class="if-kicker">INCIDENT INVESTIGATION · 침해사고 조사 서비스</p><h1>보안사고, 원인부터 <em>복원·예방</em>까지<br>한 번에 도와드립니다.</h1><p class="if-hero-lead">랜섬웨어, 이메일·해킹, 개인정보 사고.<br class="if-mobile-break"> 무슨 일이 있었는지 확인하고,<br>가능한 데이터를 복원하며 같은 사고의 위험을 줄입니다.</p><div class="if-hero-actions"><a class="if-primary" href="tel:1577-4872">전화 상담 <strong>1577-4872</strong><span aria-hidden="true">↗</span></a><button type="button" data-contact>상담 안내 <span aria-hidden="true">↗</span></button></div>${journey()}<a class="if-scroll" href="#ransomware">서비스 자세히 보기 <span aria-hidden="true">↓</span></a></div></section>`;
const nav=()=>`<div class="fr-topbar if-topbar"><div class="if-frame"><span class="fr-topbar-title">SERVICE GUIDE</span><nav class="fr-chapter-nav" aria-label="침해사고 조사 페이지 메뉴">${[['ransomware','01','랜섬웨어 사고 조사'],['email-hacking','02','이메일·해킹 조사'],['privacy-audit','03','개인정보·내부 보안점검'],['first-response','','초기 대응'],['process','','진행 절차'],['contact','','상담 안내']].map(([id,n,t])=>`<a href="#${id}">${n?`<span>${n}</span>`:''}<strong>${t}</strong></a>`).join('')}</nav></div></div>`;
const firstResponse=()=>`<section class="if-aid" id="first-response"><div class="if-frame"><header><p class="if-kicker">FIRST RESPONSE</p><h2>사고를 발견했다면,<br>먼저 확인하세요.</h2><p>피해 확산을 줄이고 조사할 자료를 보존하는 것이 중요합니다. 업무 영향과 시스템 상태를 고려해 담당자와 조치 방법을 협의하세요.</p><a href="tel:1577-4872">전문가 상담 <strong>1577-4872</strong><span aria-hidden="true">↗</span></a></header><ol class="if-aid-list">${[
 ['network','네트워크 격리','영향받은 기기를 네트워크에서 분리해 추가 확산을 줄입니다.'],
 ['power','전원 조치 전 확인','재부팅·전원 차단은 자료와 업무에 영향을 줄 수 있어 담당자와 협의합니다.'],
 ['camera','화면·발생 시점 기록','경고 메시지, 발견 시점과 이미 취한 조치를 기록해 둡니다.'],
 ['message','삭제·포맷 전 상담','남은 파일과 기록을 보존하고, 필요한 자료 확보 방법을 먼저 확인합니다.']
 ].map(([i,t,d],n)=>`<li>${icon(i)}<div><span>0${n+1}</span><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol><p class="if-aid-note">네트워크 격리가 불가능하고 확산이 우려되는 경우에는 전원 차단을 포함한 긴급 조치를 검토합니다.</p></div></section>`;
const process=()=>`<section class="if-process" id="process"><div class="if-frame"><header class="if-section-heading"><p class="if-kicker">HOW WE WORK</p><h2>상담부터 결과 안내까지,<br>이렇게 진행됩니다.</h2><p>사고 상황과 의뢰 목적에 맞춰<br>필요한 작업과 조사·복원 순서를 협의합니다.</p></header><ol class="if-process-list">${[
 ['message','상담','현재 상황을 듣습니다.','발생 시점·주요 증상과 확인하고 싶은 내용을 정리합니다.'],
 ['storage','자료 확보','기기와 기록을 보존합니다.','대상과 접근 권한을 협의하고 필요한 자료를 확보합니다.'],
 ['search','조사·복원','원인과 복원 방법을 확인합니다.','기록을 분석하고, 상태와 의뢰 범위에 맞춰 복원을 진행합니다.'],
 ['report','결과 보고','다음 조치를 안내합니다.','확인한 사실과 복원 결과, 보안 개선 방향을 설명합니다.']
 ].map(([i,t,s,d],n)=>`<li><div class="if-process-top"><span>STEP 0${n+1}</span>${icon(i)}</div><h3>${t}</h3><strong>${s}</strong><p>${d}</p></li>`).join('')}</ol><div class="if-process-note"><span>진행 전 함께 정합니다</span><p>대상 기기·계정 <i>·</i> 자료 확보 방법 <i>·</i> 분석·복원 범위 <i>·</i> 일정과 제공 결과물</p><button type="button" data-contact>상담 안내 <span aria-hidden="true">↗</span></button></div></div></section>`;

export function incidentFlowPreview(base,version){
 let head=base.slice(base.indexOf('<head>')+6,base.indexOf('</head>'))
  .replace(/<title>[\s\S]*?<\/title>/,'<title>침해사고 조사 · 흐름형 미리보기 | 명디지털포렌식센터</title>')
  .replace(/<link[^>]*href="assets\/incident-[^>]*>/g,'')
  .replace(/<link[^>]*href="assets\/forensic-proposal-[^>]*>/g,'')
  .replace(/<meta name="robots"[^>]*>/g,'');
 head+=`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/incident-flow-preview.css?v=${version}"><link rel="stylesheet" href="assets/incident-flow-content.css?v=${version}"><script src="assets/incident-flow-preview.js?v=${version}" defer></script>`;
 const header=htmlElement(base,'<header class="header"'),dialog=htmlElement(base,'<dialog class="contact-dialog"');
 const contact=htmlElement(base,/<section\b[^>]*id="contact"/).replace(/<span class="ir-anchor-alias"[^>]*><\/span>/g,'').replace('href="#service-main">맨 위로','href="#top">맨 위로');
 return `<!doctype html><html lang="ko"><head>${head}</head><body class="dp-page fr-page fr-a1 if-page"><a class="skip" href="#main">본문 바로가기</a>${header}<main id="main">${hero()}${nav()}${incidentFlowContent()}${firstResponse()}${process()}${contact}</main>${dialog}<a class="if-preview-link" href="incident-response.html">현재 페이지와 비교 <span aria-hidden="true">↗</span></a></body></html>`;
}
