import {htmlElement} from './forensic-reading-content.mjs';
import {incidentEntryDocument} from './incident-entry-previews.mjs';

export const incidentAFamilyChoices=[
 ['a1','기본 정돈형','세로 퀵 가이드 · 연결형 진행 절차','기존 A안의 구도를 가장 가깝게 유지합니다. 서비스와 초기 대응을 한곳에서 찾고, 네 단계를 가로로 읽습니다.'],
 ['a2','대응 안내형','안내 목록 · 단계별 대응 보드','초기 대응과 진행 내용을 나누어 읽기 쉽게 정리합니다. 필요한 조치와 각 단계의 목적을 선명하게 보여줍니다.'],
 ['a3','시각 강조형','타일 퀵 가이드 · 원스톱 타임라인','아이콘과 짧은 문구를 중심으로 구성합니다. 첫 화면에서 상황을 선택하고, 연결된 절차를 한눈에 살펴봅니다.']
];

export function incidentAFamilyDocument({base,variant,content,version}){
 let page=incidentEntryDocument({base,variant:'a',content,version});
 const process=htmlElement(page,/<section\b[^>]*id="process"/);
 const switcher=htmlElement(page,'<nav class="irx-switch"');
 const choice=incidentAFamilyChoices.find(c=>c[0]===variant);
 page=page.replace(process,content.process)
  .replace('irx-page irx-a"',`irx-page irx-a irx-a-family irx-${variant}"`)
  .replace(/<title>[\s\S]*?<\/title>/,`<title>${variant.toUpperCase()} · ${choice[1]} | 침해사고 조사 디자인 미리보기</title>`)
  .replace(switcher,`<nav class="irx-switch ira-family-switch" aria-label="A안 스타일 미리보기 선택"><a href="incident-a-previews.html">3안 비교</a>${incidentAFamilyChoices.map(([id])=>`<a data-irx-variant href="incident-entry-${id}.html#top"${id===variant?' aria-current="page"':''}>${id.toUpperCase()}</a>`).join('')}</nav>`)
  .replace('</head>',`<link rel="stylesheet" href="assets/incident-entry-${variant}.css?v=${version}"><link rel="stylesheet" href="assets/incident-entry-fit.css?v=${version}"><link rel="stylesheet" href="assets/incident-a-family.css?v=${version}"></head>`);
 return page;
}

export function incidentAFamilyComparison(version){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>침해사고 조사 · A1 / A2 / A3 디자인 비교 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/incident-entry-previews.css?v=${version}"><link rel="stylesheet" href="assets/incident-a-family.css?v=${version}"></head><body class="irx-comparison ira-family-comparison"><header class="irx-compare-header"><a href="index.html"><b>MDFC</b><span>명디지털포렌식센터</span></a><a href="incident-entry-a.html">이전 A안 ↗</a></header><main><div class="irx-compare-intro"><p>INCIDENT INVESTIGATION · A STYLE COLLECTION</p><h1>침해사고 조사 서비스, A안 스타일 3가지.</h1><span>A안의 네이비 스타일을 유지하며 퀵 가이드와 원스톱 대응 절차를 다듬은 세 가지 미리보기입니다.</span></div><div class="ira-family-changes"><span>우측 퀵 가이드에 초기 대응 통합</span><span>챕터별 화면 높이와 여백 조정</span><span>상담 → 자료 확보 → 조사·복원 → 결과·재발 방지</span></div><nav class="ira-family-views" aria-label="비교할 화면 선택"><button type="button" data-view-button="hero" aria-pressed="true">첫 화면 · 퀵 가이드</button><button type="button" data-view-button="aid" aria-pressed="false">초기 대응 안내</button><button type="button" data-view-button="process" aria-pressed="false">원스톱 진행 절차</button></nav><div class="irx-compare-grid">${incidentAFamilyChoices.map(([id,title,caption,desc])=>`<article class="irx-choice"><header><span>${id.toUpperCase()}</span><div><h2>${title}</h2><p>${caption}</p></div></header>${[['hero','top','첫 화면 · 퀵 가이드'],['aid','first-response','사고 발견 시 초기 대응'],['process','process','신속한 원스톱 대응 절차']].map(([shot,anchor,label])=>`<a class="irx-shot" data-view="${shot}"${shot==='hero'?'':' hidden'} href="incident-entry-${id}.html#${anchor}"><img src="assets/incident-entry-${id}-${shot}.png?v=${version}" alt="${id.toUpperCase()} ${label}" loading="lazy"><span>${label} ↗</span></a>`).join('')}<p class="irx-description">${desc}</p><a class="irx-open" href="incident-entry-${id}.html">${id.toUpperCase()} 전체 보기 <span>↗</span></a></article>`).join('')}</div><p class="irx-compare-note">세 안 모두 랜섬웨어·이메일 및 해킹·개인정보 및 내부 보안점검의 상세 내용과 상담 안내를 포함합니다.</p></main><script src="assets/incident-a-family.js?v=${version}" defer></script></body></html>`;}
