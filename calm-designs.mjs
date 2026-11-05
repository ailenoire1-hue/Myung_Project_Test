export const calmDesigns = [
 {id:'1',name:'차분한 여백',summary:'인트로와 같은 짙은 배경, 밝은 글자와 주황색 포인트를 사용합니다. 디지털 증거 이미지는 오른쪽에 은은하게 남겼습니다.'},
 {id:'2',name:'정돈된 균형',summary:'중앙에 문구를 모아 인트로의 균형을 이어갑니다. 네트워크 이미지는 가장자리에서 차분하게 드러납니다.'},
 {id:'3',name:'절제된 기술',summary:'데이터 인프라 이미지를 작은 패널로 배치해, 화면의 대부분을 문구와 여백에 사용했습니다.'}
];
export function calmDesignMarkup(id,services,{footerMarkup}={}) {
 const headline=id==='1'?'<span class="calm-topic">기업 내 보안사고, <span class="calm-trace">데이터 흔적으로</span></span><span class="calm-scope"><em>사건의 진실</em>을 찾습니다.</span>':'<span class="calm-topic">기업 보안사고 </span><span class="calm-scope"><em>조사·예방·대응</em>까지,</span>';
 const company=id==='1'?'':'<p class="calm-company">(주)명정보기술 디지털포렌식센터가 함께합니다.</p>';
 const description=id==='1'?'<p class="calm-description"><span>디지털포렌식부터 침해사고 조사, 기업 보안 관리까지</span><span>(주)명정보기술 디지털포렌식센터가 기업의 데이터를 책임집니다.</span></p>':'';
 const consultationIcon=id==='1'?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4l4 3v-3h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/><path d="M7 9h10M7 13h6"/></svg>':'';
 const lowerContent=footerMarkup??`<nav class="calm-services" aria-label="주요 서비스">${services.map(s=>`<a href="${s.slug}.html">${s.name}</a>`).join('')}</nav>`;
 return `<section class="calm-hero calm-hero-${id}"><div class="calm-art" aria-hidden="true"><img src="assets/calm-${id}-art.jpg" alt="" width="1672" height="941"></div><div class="calm-copy"><h1>${headline}</h1>${company}${description}<div class="calm-actions"><button data-contact>${consultationIcon}<span>전문가 상담</span></button><a href="#services">서비스 살펴보기</a></div></div>${lowerContent}</section>`;
}
export function calmDesignTools(id) {
 return `<nav class="main-design-tools" aria-label="C안 디자인 개선안"><span>MAIN DESIGN</span>${calmDesigns.map(v=>`<a href="calm-${v.id}.html?skip=1" ${id===v.id?'aria-current="page"':''}>C-${v.id}</a>`).join('')}<a class="all-designs" href="calm-previews.html">3안 비교</a></nav>`;
}
export function calmComparisonPage() {
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>C안 디자인 개선 3안 | 명디지털포렌식센터</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/main-designs.css"><script src="assets/main-designs.js" defer></script></head><body class="main-comparison-page"><main class="main-comparison"><header class="main-comparison-heading"><a class="comparison-brand" href="index.html">MDFC<span>명디지털포렌식센터</span></a><span class="comparison-label">C DIRECTION · 3 REFINED DESIGNS</span><h1>인트로의 차분함을 메인까지.</h1><p>두 줄 문구와 절제된 색상, 은은한 디지털 이미지로 구성한 C안 개선 시안입니다.</p></header><div class="main-comparison-grid">${calmDesigns.map(v=>`<article class="main-option"><div class="main-option-heading"><span>OPTION C-${v.id}</span><i style="background:#0c1623" aria-hidden="true"></i></div><div class="main-option-frame"><iframe src="calm-${v.id}.html?skip=1&gallery=1" title="C-${v.id} 메인 시안" tabindex="-1" loading="eager"></iframe></div><div class="main-option-copy"><h2>${v.name}</h2><p>${v.summary}</p><div class="main-option-links"><a class="main-option-open" href="calm-${v.id}.html?skip=1">C-${v.id} 전체 화면</a><a href="calm-${v.id}.html?intro=1">인트로부터 보기</a></div></div></article>`).join('')}</div><p class="comparison-footnote">C-1은 인트로와 색상을 맞추고, 조사부터 예방·대응까지 이어지는 서비스를 두 줄 문구로 소개합니다.</p></main></body></html>`;
}
