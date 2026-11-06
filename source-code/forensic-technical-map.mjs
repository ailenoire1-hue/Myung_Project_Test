const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const paths = {
  document: '<path d="M8 3h11l6 6v20H8Z M19 3v7h6M12 15h9M12 20h9M12 25h5"/>',
  device: '<rect x="8" y="11" width="16" height="18" rx="3"/><path d="M12 11V3h8v8M15 6h2M12 23h8"/>',
  archive: '<rect x="4" y="5" width="24" height="7" rx="2"/><path d="M6 12v15h20V12M12 17h8M16 20v4"/>',
  sources: '<path d="M3 5h9v12H3ZM20 15h9v12h-9M12 11h5a7 7 0 0 1 7 7M17 22h-2a7 7 0 0 1-7-7M21 15l3 3 3-3"/>',
  phone: '<rect x="8" y="2" width="16" height="28" rx="3"/><path d="M13 6h6M14 25h4M12 12h8M12 17h5"/>',
  message: '<path d="M4 5h21v15H13l-6 5v-5H4ZM9 10h11M9 15h7M27 11h2v16h-5l-4 3v-3h-6v-3"/>',
  media: '<rect x="3" y="5" width="26" height="22" rx="2"/><circle cx="10" cy="12" r="2"/><path d="m5 24 7-7 5 5 5-9 5 11"/>',
  backup: '<rect x="3" y="3" width="13" height="23" rx="2"/><path d="M8 7h3M7 22h5M21 9h8v18H18v-8M18 14h8m-4-4 4 4-4 4"/>',
  structure: '<rect x="4" y="3" width="24" height="26" rx="2"/><path d="M4 10h24M12 10v19M8 6h1M17 15h6M17 20h6M17 25h3"/>',
  clock: '<circle cx="16" cy="16" r="12"/><path d="M16 8v9l6 4M16 2v2M30 16h-2M16 30v-2M2 16h2"/>',
  waveform: '<path d="M2 16h3l3-7 4 17 4-23 4 25 4-18 3 6h3"/>',
  compare: '<path d="M3 4h9v24H3ZM20 4h9v24h-9M12 12h8m-3-3 3 3-3 3M20 21h-8m3-3-3 3 3 3"/>',
  hub: '<circle cx="14" cy="14" r="9"/><path d="m21 21 8 8M9 15l4-5 6 7M9 10v9h10"/>'
};

const icon = name => `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.document}</svg>`;

const maps = {
  'data-leakage': {
    hub: '자료 이동 정황',
    guide: '문서·장치·잔존 자료의 기록을 함께 대조합니다.',
    nodes: [
      ['document', '문서 사용', '생성·열람·수정 흔적에서 자료가 사용된 시점을 살펴봅니다.'],
      ['device', '외부 매체·접근', '장치 연결과 접근 기록을 관련 파일의 시각과 맞춰봅니다.'],
      ['archive', '삭제·잔존 자료', '삭제 흔적과 남은 파일을 구분해 확보 상태를 확인합니다.'],
      ['sources', '파일·출처 대조', 'PC·회수 매체·백업의 파일과 출처를 비교합니다.']
    ]
  },
  'mobile-evidence': {
    hub: '연락·대화 맥락',
    guide: '관련 기록과 실제 확보한 파일을 연결해 살펴봅니다.',
    nodes: [
      ['phone', '통화·문자', '상대방과 연락 시각을 사건의 기간에 맞춰 확인합니다.'],
      ['message', '메신저 맥락', '참여자·앞뒤 대화·첨부파일을 함께 살펴봅니다.'],
      ['media', '사진·영상·녹음', '관련 미디어의 출처와 실제 파일 확보 여부를 정리합니다.'],
      ['backup', '기기·백업 대조', '기기와 백업에 남은 기록의 공통점과 차이를 비교합니다.']
    ]
  },
  'media-authenticity': {
    hub: '생성·편집 정황',
    guide: '파일의 차이를 원본과 전달·변환 경위에 비춰 검토합니다.',
    nodes: [
      ['structure', '파일 구조', '형식·인코더·작성 정보에서 생성과 변환 흔적을 살펴봅니다.'],
      ['clock', '시간 정보', '파일과 기기의 생성·수정 시각, 전달 경위를 대조합니다.'],
      ['waveform', '구간 연속성', '검토 구간의 파형과 시간 흐름을 확인합니다.'],
      ['compare', '원본·전달본', '파일 간 차이와 재저장·재인코딩 경위를 함께 살펴봅니다.']
    ]
  }
};

const lines = `<svg class="ft-map-lines" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  <circle class="ft-map-orbit" cx="500" cy="150" r="112"/>
  <path d="M310 65H377Q413 65 435 103L462 150H500"/>
  <path d="M690 65H623Q587 65 565 103L538 150H500"/>
  <path d="M310 235H377Q413 235 435 197L462 150H500"/>
  <path d="M690 235H623Q587 235 565 197L538 150H500"/>
  <circle class="ft-map-junction" cx="409" cy="79" r="3"/>
  <circle class="ft-map-junction" cx="591" cy="79" r="3"/>
  <circle class="ft-map-junction" cx="409" cy="221" r="3"/>
  <circle class="ft-map-junction" cx="591" cy="221" r="3"/>
</svg>`;

export function technicalMap(s) {
  const map = maps[s?.id];
  if (!map) throw new Error(`Unsupported technical map service: ${s?.id}`);
  const nodes = map.nodes.map(([symbol, label, description], index) => `<article class="ft-map-node ft-map-node-${index + 1}">
    <div class="ft-map-node-top"><span class="ft-map-icon">${icon(symbol)}</span><h4>${label}</h4><span class="ft-map-index" aria-hidden="true">0${index + 1}</span></div>
    <p>${description}</p>
  </article>`).join('');
  const explanations = Array.isArray(s.checks) && s.checks.length
    ? `<details class="ft-map-details"><summary>분석 항목 자세히 읽기 <span aria-hidden="true">+</span></summary><dl>${s.checks.map(([label, description]) => `<div><dt>${esc(label)}</dt><dd>${esc(description)}</dd></div>`).join('')}</dl></details>`
    : '';

  return `<section class="ft-map" data-ft-map="${esc(s.id)}" aria-label="${esc(s.name)} 증거 관계도">
    <header class="ft-map-heading"><div><p class="ft-map-kicker">EVIDENCE IN CONTEXT</p><h3>기록을 연결해 확인합니다.</h3></div><p class="ft-map-guide">${map.guide}</p></header>
    <div class="ft-map-stage">
      ${lines}
      <div class="ft-map-hub"><span class="ft-map-hub-icon">${icon('hub')}</span><span class="ft-map-hub-label">확인할 쟁점</span><strong>${map.hub}</strong><span class="ft-map-hub-meta">출처 · 시각 · 내용 대조</span></div>
      ${nodes}
    </div>
    <p class="ft-map-caption"><span>가상 자료 · 설명용 그래픽</span><span>연결선은 함께 검토하는 관계를 나타냅니다.</span></p>
    ${explanations}
  </section>`;
}
