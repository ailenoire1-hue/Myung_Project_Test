const esc = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const options = [
  {
    id: 'a',
    name: '의뢰 목적별 안내',
    point: '확인하고 싶은 상황에서 시작합니다',
    description: '의뢰 상황과 확인 항목, 필요한 자료와 전달 결과를 정돈해 목적에 맞는 서비스를 차근차근 살펴봅니다.',
    flow: '상황 · 확인 항목 · 준비 자료 · 전달 결과'
  },
  {
    id: 'b',
    name: '서비스 매거진',
    point: '넓은 본문으로 읽는 서비스 이야기',
    description: '큰 사진과 넓은 본문으로 서비스를 설명하고, 준비 자료와 참고 사항은 보조 정보로 나눠 읽기 쉽게 안내합니다.',
    flow: '큰 사진 · 상세 설명 · 별도 참고 정보'
  },
  {
    id: 'c',
    name: '결과물 중심 설명',
    point: '어떤 결과를 받는지 먼저 살펴봅니다',
    description: '보고서와 자료 목록, 타임라인 예시를 중심으로 분석팀의 수행 내용과 결과에 담기는 근거를 설명합니다.',
    flow: '보고서 · 자료 목록 · 타임라인 예시'
  }
];

export function forensicPurposeComparison(version) {
  const cards = options.map(option => {
    const href = `forensic-purpose-${option.id}.html`;
    const label = `${option.id.toUpperCase()}안 · ${option.name}`;
    return `<article class="fp-compare-card">
      <a class="fp-compare-image" href="${href}" aria-label="${label} 미리보기">
        <img src="assets/forensic-purpose/preview-${option.id}-123.png" alt="${label} 상세 페이지 화면" width="1280" height="720" loading="eager">
      </a>
      <div class="fp-compare-copy">
        <span class="fp-compare-letter" aria-hidden="true">${option.id.toUpperCase()}</span>
        <p class="fp-compare-point">${option.point}</p>
        <h2>${option.name}</h2>
        <p class="fp-compare-description">${option.description}</p>
        <p class="fp-compare-flow">${option.flow}</p>
        <a class="fp-compare-open" href="${href}" aria-label="${label} 전체 시안 보기">전체 시안 보기 <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
  }).join('');

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>의뢰 목적 중심 디지털포렌식 · 디자인 3안 | MDFC</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="assets/forensic-purpose.css?v=${esc(version)}">
</head>
<body class="fp-comparison">
  <main class="fp-compare">
    <header class="fp-compare-heading">
      <a class="fp-compare-brand" href="digital-forensics.html">MDFC <span>DESIGN PREVIEW</span></a>
      <p class="fp-compare-kicker">DIGITAL FORENSICS / THREE STYLES</p>
      <h1>의뢰 목적에 맞춰 살펴보는,<br>세 가지 상세 페이지.</h1>
      <p class="fp-compare-intro">자료유출 조사, 스마트폰 민형사 관련 분석, 음성·영상 위변조 검토를 중심으로 서비스 내용을 안내합니다. 세 안 모두 일반 스크롤로 읽을 수 있습니다.</p>
      <span class="fp-compare-note">일반 스크롤 미리보기 · 현재 상세 페이지 유지</span>
    </header>
    <div class="fp-compare-grid">${cards}</div>
    <footer class="fp-compare-footer">
      <p>공통 구성 · 첫 화면과 의뢰 목적 3개 바로가기 → 포렌식이란 → 왜 MDFC → 자료유출 조사 · 스마트폰 민형사 관련 분석 · 음성·영상 위변조 검토 → FAQ</p>
      <a href="digital-forensics.html">현재 적용된 페이지 보기 <span aria-hidden="true">↗</span></a>
    </footer>
  </main>
</body>
</html>`;
}
