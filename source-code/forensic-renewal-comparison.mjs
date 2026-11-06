const esc = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const options = [
  {
    id: 'a',
    name: '서비스 안내서형',
    point: '서비스 내용을 차근차근 읽는 구성',
    description: '사진과 함께 분석 대상, 확인 방법, 전달 결과를 정돈해 서비스의 내용을 자세히 살펴봅니다.',
    flow: '사진 · 분석 대상 · 확인 방법 · 전달 결과'
  },
  {
    id: 'b',
    name: '분석 흐름형',
    point: '자료가 결과로 이어지는 과정',
    description: '자료에서 분석과 결과로 이어지는 도식에 설명을 더해, 각 단계에서 무엇을 확인하는지 이해합니다.',
    flow: '자료 → 분석 → 결과'
  },
  {
    id: 'c',
    name: '고객 질문형',
    point: '궁금한 질문에서 시작하는 안내',
    description: '의뢰자가 궁금해하는 질문을 중심으로 분석 기준과 설명할 수 있는 근거를 연결해 안내합니다.',
    flow: '질문 → 분석 기준 → 설명 가능한 근거'
  }
];

export function forensicRenewalComparison(version) {
  const cards = options.map(option => {
    const href = `forensic-renewal-${option.id}.html#service-overview`;
    const label = `${option.id.toUpperCase()}안 · ${option.name}`;
    return `<article class="fr-compare-card">
      <a class="fr-compare-image" href="${href}" aria-label="${label} 미리보기">
        <img src="assets/forensic-renewal/preview-${option.id}-122.png" alt="${label} 서비스 설명 화면" width="1280" height="720" loading="eager">
      </a>
      <div class="fr-compare-copy">
        <span class="fr-compare-letter" aria-hidden="true">${option.id.toUpperCase()}</span>
        <p class="fr-compare-point">${option.point}</p>
        <h2>${option.name}</h2>
        <p class="fr-compare-description">${option.description}</p>
        <p class="fr-compare-flow">${option.flow}</p>
        <a class="fr-compare-open" href="${href}" aria-label="${label} 전체 시안 보기">전체 시안 보기 <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
  }).join('');

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>디지털포렌식 서비스 설명 · 새 디자인 3안 | MDFC</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="assets/forensic-renewal.css?v=${esc(version)}">
</head>
<body class="fr-comparison">
  <main class="fr-compare">
    <header class="fr-compare-heading">
      <a class="fr-compare-brand" href="digital-forensics.html">MDFC <span>DESIGN PREVIEW</span></a>
      <p class="fr-compare-kicker">DIGITAL FORENSICS / THREE STYLES</p>
      <h1>서비스를 자세히 이해하는,<br>세 가지 새로운 디자인.</h1>
      <p class="fr-compare-intro">기존 첫 화면을 유지하고, 디지털포렌식의 분석 대상과 방법, 결과를 서로 다른 구성으로 안내합니다.</p>
      <span class="fr-compare-note">서비스 상세 페이지 디자인 미리보기</span>
    </header>
    <div class="fr-compare-grid">${cards}</div>
    <footer class="fr-compare-footer">
      <p>공통 구성 · 기존 첫 화면 → 서비스 개요 → 분석 대상·세부 분석 → 진행 절차 → 결과물 → FAQ</p>
      <a href="digital-forensics.html">현재 적용된 페이지 보기 <span aria-hidden="true">↗</span></a>
    </footer>
  </main>
</body>
</html>`;
}
