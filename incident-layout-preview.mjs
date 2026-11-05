// Standalone proposal only. The approved homepage stays unchanged.
export function incidentLayoutPreview({header, dialog, version}) {
 const items = [
  {id:'ransomware',number:'01',title:'랜섬웨어 사고조사',description:'감염 경로와 암호화 피해를 분석하고, 백업·복구 조건을 검토합니다.'},
  {id:'malware',number:'02',title:'해킹·악성코드 사고조사',description:'시스템과 로그의 흔적에서 침입 경로와 악성 행위를 확인합니다.'},
  {id:'personal-data',number:'03',title:'이메일·개인정보 사고조사',description:'계정 활동과 자료 접근 기록을 연결해 유출 경위와 노출 범위를 조사합니다.'},
 ];
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>침해사고 조사 디자인 미리보기 | 명디지털포렌식센터</title><meta name="description" content="MDFC 침해사고 조사 영역의 좌우 분할 디자인 미리보기"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/header-navigation.css"><link rel="stylesheet" href="assets/incident-layout-preview.css?v=${version}"><script src="assets/app.js" defer></script><script src="assets/incident-layout-preview.js?v=${version}" defer></script></head><body class="incident-preview-page">${header}<main id="main"><section class="incident-split" aria-labelledby="incident-preview-title">
  <div class="incident-split-visual"><img class="incident-split-photo" src="assets/investigation.jpg" alt="컴퓨터와 시스템 기록을 검토하는 업무 환경 이미지" width="1920" height="700" fetchpriority="high"><div class="incident-split-shade" aria-hidden="true"></div>
   <div class="incident-split-copy"><p class="incident-split-eyebrow">OUR SERVICES</p><p class="incident-split-category">침해사고 조사</p><h1 id="incident-preview-title">사고의 흐름을<br>밝힙니다.</h1><p class="incident-split-description">디지털 증거를 연결해<br>침해 경로와 피해 범위를 확인합니다.</p><a class="incident-split-more" href="incident-response.html">침해사고 조사 자세히 보기<span aria-hidden="true">+</span></a></div>
   <div class="incident-split-index"><span>02 <i>/ 03</i></span><span>INCIDENT INVESTIGATION</span></div>
  </div>
  <div class="incident-split-services"><div class="incident-split-list-wrap"><header class="incident-split-list-heading"><h2>핵심 조사 서비스</h2><span>INVESTIGATION SERVICES</span></header><div class="incident-split-list">
   ${items.map(item=>`<a class="incident-split-service" href="incident-response.html#${item.id}"><span class="incident-split-number">${item.number}</span><div class="incident-split-service-copy"><h3>${item.title}</h3><p>${item.description}</p><span class="incident-split-service-hint">서비스 자세히 보기</span></div><span class="incident-split-open" aria-hidden="true">+</span></a>`).join('')}
   </div><div class="incident-split-list-foot"><p>기록 확보<span aria-hidden="true">/</span>사고 경위 분석<span aria-hidden="true">/</span>결과 정리</p><a href="incident-response.html#analysis-deliverables">조사 결과물 보기</a></div>
  </div></div>
 </section></main><aside class="incident-preview-note" aria-label="디자인 미리보기 안내"><span>디자인 미리보기</span><a href="index.html#home-incident-response">현재 디자인 보기</a></aside>${dialog}</body></html>`;
}
