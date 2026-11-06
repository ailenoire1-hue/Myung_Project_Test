import {htmlElement} from './forensic-reading-content.mjs';

export const incidentEntryChoices = [
 ['a','기존 페이지 통일형','좌측 소개 + 우측 세로 퀵 가이드','디지털포렌식 서비스와 같은 구도에, 초기 대응을 밝은 강조 영역으로 연결합니다.'],
 ['b','밝은 안내형','기술 흐름도 + 가로 퀵 가이드','밝은 첫 화면과 세 개의 서비스 카드를 배치하고, 초기 대응은 네이비로 강조합니다.'],
 ['c','분할 선택형','네이비 소개 + 흰색 선택 패널','소개와 서비스 선택을 구분하고, 초기 대응은 오렌지 안내판과 조치 카드로 보여줍니다.']
];

export function incidentEntryDocument({base,variant,content,version}){
 const choice=incidentEntryChoices.find(x=>x[0]===variant);
 const oldHero=htmlElement(base,/<section\b[^>]*id="top"/);
 const oldAid=htmlElement(base,/<section\b[^>]*id="first-response"/);
 const oldBar=htmlElement(base,'<div class="fr-topbar if-topbar"');
 const menu=[['first-response','초기 대응'],['ransomware','01 랜섬웨어 사고 조사'],['email-hacking','02 이메일·해킹 조사'],['privacy-audit','03 개인정보·내부 보안점검'],['process','진행 절차'],['contact','상담 안내']];
 const bar=`<div class="fr-topbar if-topbar"><div class="if-frame"><span class="fr-topbar-title">SERVICE GUIDE</span><nav class="fr-chapter-nav" aria-label="침해사고 조사 페이지 메뉴">${menu.map(([id,t])=>`<a href="#${id}"${id==='first-response'?' class="irx-aid-nav"':''}><strong>${t}</strong></a>`).join('')}</nav></div></div>`;
 const switcher=`<nav class="irx-switch" aria-label="침해사고 디자인 미리보기 선택"><a href="incident-entry-previews.html">3안 비교</a>${incidentEntryChoices.map(([id])=>`<a data-irx-variant href="incident-entry-${id}.html#top"${id===variant?' aria-current="page"':''}>${id.toUpperCase()}안</a>`).join('')}</nav>`;
 return base.replace(oldAid,'').replace(oldHero,content.hero).replace(oldBar,bar+content.aid)
  .replace('class="dp-page fr-page fr-a1 if-page"',`class="dp-page fr-page fr-a1 if-page irx-page irx-${variant}"`)
  .replace(/<title>[\s\S]*?<\/title>/,`<title>${variant.toUpperCase()}안 · ${choice[1]} | 침해사고 조사 미리보기</title>`)
  .replace(/<a class="if-preview-link"[\s\S]*?<\/a>/,switcher)
  .replace('</head>',`<link rel="stylesheet" href="assets/incident-entry-previews.css?v=${version}"><link rel="stylesheet" href="assets/incident-entry-${variant}.css?v=${version}"><script src="assets/incident-entry-previews.js?v=${version}" defer></script></head>`);
}

export function incidentEntryComparison(version){
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>침해사고 조사 · 첫 화면과 초기 대응 3안 비교 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/incident-entry-previews.css?v=${version}"></head><body class="irx-comparison"><header class="irx-compare-header"><a href="index.html"><b>MDFC</b><span>명디지털포렌식센터</span></a><a href="incident-flow-preview.html">이전 미리보기 ↗</a></header><main><div class="irx-compare-intro"><p>INCIDENT INVESTIGATION · DESIGN PREVIEW</p><h1>서비스는 쉽게 찾고,<br>초기 대응은 놓치지 않도록.</h1><span>첫 화면의 퀵 가이드와 초기 대응 안내를 다르게 구성한 세 가지 디자인입니다.</span></div><div class="irx-compare-grid">${incidentEntryChoices.map(([id,title,caption,description])=>`<article class="irx-choice"><header><span>${id.toUpperCase()}</span><div><h2>${title}</h2><p>${caption}</p></div></header><a class="irx-shot" href="incident-entry-${id}.html#top"><img src="assets/incident-entry-${id}-hero.png?v=${version}" alt="${id.toUpperCase()}안 첫 화면 미리보기"><span>첫 화면 · 퀵 가이드 ↗</span></a><a class="irx-shot irx-shot-aid" href="incident-entry-${id}.html#first-response"><img src="assets/incident-entry-${id}-aid.png?v=${version}" alt="${id.toUpperCase()}안 초기 대응 안내 미리보기"><span>강조한 초기 대응 안내 ↗</span></a><p class="irx-description">${description}</p><a class="irx-open" href="incident-entry-${id}.html#top">${id.toUpperCase()}안 전체 보기 <span>↗</span></a></article>`).join('')}</div><p class="irx-compare-note">세 안 모두 기존 미리보기의 서비스별 상세 내용·진행 절차·상담 안내를 포함합니다.</p></main></body></html>`;
}
