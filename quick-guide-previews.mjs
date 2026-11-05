import { contentDirectionMarkup } from './content-directions.mjs';

export const quickGuideOptions = [
 {id:'a',name:'밝은 안내 패널',note:'밝은 배경 대비로 안내 영역을 가장 선명하게 구분합니다.',tag:'가시성 중심'},
 {id:'b',name:'오렌지 포인트 바',note:'브랜드 컬러의 안내 블록과 간결한 서비스 메뉴를 연결합니다.',tag:'컴팩트한 구성'},
 {id:'c',name:'독립 네이비 카드',note:'세 상황을 각각의 카드로 구분해 클릭할 영역을 분명하게 보여줍니다.',tag:'기존 디자인과 조화'}
];
const icons={search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM9 12l2 2 4-4"/>',server:'<rect x="4" y="3" width="16" height="8" rx="2"/><rect x="4" y="13" width="16" height="8" rx="2"/><path d="M8 7h.01M8 17h.01M13 7h4M13 17h4"/>'};
const icon=kind=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[kind]}</svg>`;
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const destinations=[
 ['search','기업 정보 유출이 의심되나요?','퇴사자 관리 · 업무 자료 점검','enterprise-security.html#employee-offboarding'],
 ['shield','랜섬웨어 사고가 발생했나요?','감염 경위 · 사고 범위 조사','incident-response.html#ransomware'],
 ['server','보안·인프라 개선이 필요한가요?','보안 점검 · 보호 체계 · 데이터 저장','enterprise-security.html']
];
export function quickGuideMarkup(id){
 return `<section class="qg-panel qg-${id}" aria-label="상황별 빠른 안내"><div class="qg-heading"><span>QUICK GUIDE</span><h2>지금 어떤 도움이<br class="qg-heading-break"> 필요하신가요?</h2></div><div class="qg-grid">${destinations.map(v=>`<a class="qg-item" href="${v[3]}"><span class="qg-icon">${icon(v[0])}</span><span class="qg-copy"><strong>${v[1]}</strong><small>${v[2]}</small></span><span class="qg-arrow">${arrow}</span></a>`).join('')}</div></section>`;
}
export function applyApprovedQuickGuide(home,version){
 const original=contentDirectionMarkup('guide');
 if(!home.includes(original))throw new Error('Selected homepage Quick Guide not found');
 return home.replace(original,quickGuideMarkup('c'))
  .replace('<body class="','<body class="home-quick-guide ')
  .replace('</head>',`<link rel="stylesheet" href="assets/home-quick-guide.css?v=${version}"></head>`);
}
const previewHref=id=>`quick-guide-${id}.html?skip=1#main`;
function previewTools(id){return `<nav class="qg-preview-tools" aria-label="퀵가이드 시안 선택"><span>퀵가이드 시안</span>${quickGuideOptions.map(v=>`<a href="${previewHref(v.id)}" ${v.id===id?'aria-current="page"':''}>${v.id.toUpperCase()}안</a>`).join('')}<a class="qg-compare-link" href="quick-guide-previews.html">3안 비교 ↗</a></nav>`;}
export function quickGuidePreviewDocument(home,id,version){
 const original=contentDirectionMarkup('guide');
 if(!home.includes(original))throw new Error('Selected homepage Quick Guide not found');
 const option=quickGuideOptions.find(v=>v.id===id);
 return home.replace(/<title>.*?<\/title>/,`<title>${id.toUpperCase()}안 · ${option.name} | MDFC 퀵가이드 미리보기</title>`)
  .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/quick-guide-previews.css?v=${version}"></head>`)
  .replace('<body class="','<body class="qg-preview-page ')
  .replace(original,quickGuideMarkup(id))
  .replace('</body>',`${previewTools(id)}</body>`);
}
export function quickGuideComparison(version){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>퀵가이드 디자인 3안 | MDFC</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/quick-guide-previews.css?v=${version}"></head><body class="qg-comparison-page"><main class="qg-comparison"><header class="qg-comparison-heading"><div><a class="qg-brand" href="index.html?skip=1#main">MDFC <span>DESIGN PREVIEW</span></a><h1>퀵가이드, 더 명확하게.</h1><p>같은 내용, 세 가지 디자인. 각 시안의 ‘메인에서 보기’를 누르면 전체 화면에서 비교할 수 있습니다.</p></div><span class="qg-preview-label">C안 선택 · 메인 반영</span></header>${quickGuideOptions.map(v=>`<article class="qg-option"><header><div><span class="qg-option-letter">${v.id.toUpperCase()}</span><h2>${v.name}</h2><span class="qg-option-tag">${v.tag}</span></div><a href="${previewHref(v.id)}">메인에서 보기 ${arrow}</a></header><div class="qg-stage">${quickGuideMarkup(v.id)}</div><p class="qg-option-note">${v.note}</p></article>`).join('')}<footer class="qg-comparison-footer"><span>상황별 서비스로 바로 연결되는 안내 영역입니다.</span><a href="index.html?skip=1#main">현재 메인 화면 보기 ↗</a></footer></main></body></html>`;}
