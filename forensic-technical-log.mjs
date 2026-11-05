const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

const iconPaths = {
  document: '<path d="M7 3h10l6 6v20H7zM17 3v7h6M11 15h8M11 20h8M11 25h5"/>',
  computer: '<rect x="3" y="5" width="26" height="18" rx="2"/><path d="M12 23v5M20 23v5M8 28h16M7 19h18"/>',
  drive: '<rect x="5" y="4" width="22" height="25" rx="3"/><path d="M5 21h22M10 25h1M16 25h6M10 10h12M10 15h7"/>',
  phone: '<rect x="9" y="2" width="15" height="28" rx="3"/><path d="M13 6h7M14 26h5M13 12h7M13 17h5"/>',
  message: '<path d="M4 5h24v18H13l-7 6v-6H4zM9 11h14M9 17h9"/>',
  image: '<rect x="4" y="4" width="24" height="24" rx="2"/><circle cx="11" cy="11" r="2"/><path d="m5 24 8-8 5 5 4-6 6 9"/>',
  clock: '<circle cx="16" cy="16" r="12"/><path d="M16 8v9l6 4"/>',
  link: '<path d="m13 11 4-4a6 6 0 0 1 9 8l-5 5M19 21l-4 4a6 6 0 0 1-9-8l5-5M10 22l12-12"/>',
  layers: '<path d="m16 3 13 7-13 7L3 10zM4 16l12 7 12-7M4 22l12 7 12-7"/>',
  waveform: '<path d="M2 16h4l3-8 4 17 4-22 4 25 4-18 3 6h3"/>',
  scan: '<path d="M3 11V4h7M22 4h7v7M29 22v7h-7M10 29H3v-7M3 16h26M10 10h12M10 22h12"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.document}</svg>`;
}

const configurations = {
  'data-leakage': {
    type: 'RECORD CORRELATION',
    title: '흩어진 사용 기록을 시간과 출처로 연결합니다.',
    source: 'PC · 노트북 · 서버',
    sourceCopy: '업무 기록과 외부 매체의 관계',
    sourceIcon: 'computer',
    sources: [['document','문서·사용 기록'],['drive','외부 매체·백업']],
    columns: ['시각·단계 예시','기록 예시','함께 대조할 자료'],
    rows: [
      ['09:12','문서 사용 관련 흔적','문서 경로 · 사용 시각'],
      ['09:20','외부 저장장치 연결 기록','장치 식별 정보 · 접근 기록'],
      ['09:36','삭제 관련 기록','파일 목록 · 잔존 자료'],
      ['사본 비교','서로 다른 위치의 문서','PC · 외부 매체 · 백업']
    ],
    icons: ['document','drive','scan','link'],
    labels: ['문서 경로·열람·수정 기록','장치 정보·연결 시각·파일','삭제 흔적·잔존 자료 확인','원본·사본의 출처·내용 비교'],
    note: '각 기록은 대조할 항목을 보여주는 예시입니다. 연결 순서만으로 자료 유출을 판단하지 않습니다.'
  },
  'mobile-evidence': {
    type: 'MOBILE RECORD REVIEW',
    title: '대화의 맥락과 실제 확보한 자료를 구분합니다.',
    source: '스마트폰 · 기기 백업',
    sourceCopy: '연락 기록에서 연결된 파일까지',
    sourceIcon: 'phone',
    sources: [['message','대화·참여자·시각'],['image','첨부파일·출처']],
    columns: ['자료 유형','기록 예시','함께 대조할 자료'],
    rows: [
      ['통화·문자','참여자 A · 예시 연락 기록','상대방 · 연락 시각'],
      ['메신저','참여자 A·B · 앞뒤 메시지','대화방 · 첨부 연결'],
      ['미디어','attachment_01.jpg','원본 · 캐시 · 파일 존재'],
      ['기기·백업','동일 대화의 기록 위치','자료 출처 · 확보 상태']
    ],
    icons: ['phone','message','image','layers'],
    labels: ['연락 상대방·발생 시각','참여자·앞뒤 대화·첨부','사진·영상·녹음의 확보 상태','기기·백업 기록의 출처 대조'],
    note: '참여자와 파일명은 모두 가상입니다. 메시지에 첨부 기록이 있어도 원본 파일이 남아 있지 않을 수 있습니다.'
  },
  'media-authenticity': {
    type: 'MEDIA STRUCTURE REVIEW',
    title: '파일 구조와 검토 구간을 비교 자료와 대조합니다.',
    source: '음성 · 영상 파일',
    sourceCopy: '원본과 전달 과정의 차이 검토',
    sourceIcon: 'waveform',
    sources: [['document','원본·전달본'],['layers','동일 환경의 비교 자료']],
    columns: ['검토 축','기록 예시','함께 대조할 자료'],
    rows: [
      ['파일 구조','컨테이너 · 코덱 · 작성 정보','파일 형식 · 인코더 정보'],
      ['시간 정보','생성·수정 관련 기록','기기 시각 · 전달 경위'],
      ['구간 검토','00:18–00:24 / 가상 구간','파형 · 시간 흐름 · 연속성'],
      ['자료 비교','original / received','원본 · 전달본 · 비교 파일']
    ],
    icons: ['document','clock','waveform','layers'],
    labels: ['파일 형식·구조·인코더','기기·파일의 시간 정보 대조','검토 구간·시간 흐름·연속성','원본·전달본·비교 자료 대조'],
    note: '구간과 파형은 설명용 합성 예시입니다. 구조나 파형의 차이만으로 위·변조를 단정하지 않습니다.'
  }
};

function sourceVisual(configuration, serviceId) {
  const signal = serviceId === 'media-authenticity'
    ? '<div class="ft-log-signal"><svg viewBox="0 0 230 46" fill="none" aria-hidden="true" focusable="false"><path d="M0 23h230" class="ft-log-signal-baseline"/><path d="M2 23h10l4-7 4 17 4-29 4 35 4-23 4 15 4-9h12l4-5 4 11 4-21 4 31 4-21 4 9h16l4-13 4 28 4-36 4 39 4-21 4 6h18l4-8 4 15 4-28 4 35 4-22 4 9h14l4-5 4 13 4-26 4 31 4-15h14l4-10 4 21 4-13h16"/><rect x="98" y="3" width="37" height="40"/></svg><span>합성 파형 · 설명용</span></div>'
    : `<div class="ft-log-source-symbol">${icon(configuration.sourceIcon)}<span class="ft-log-source-line" aria-hidden="true"></span><span class="ft-log-source-mini">${icon('layers')}</span></div>`;
  return `<div class="ft-log-source"><span class="ft-log-overline">분석 대상</span>${signal}<strong>${escapeHtml(configuration.source)}</strong><p>${escapeHtml(configuration.sourceCopy)}</p><div class="ft-log-source-labels">${configuration.sources.map(([symbol,text]) => `<span>${icon(symbol)}${escapeHtml(text)}</span>`).join('')}</div></div>`;
}

function records(configuration, serviceId) {
  return `<div class="ft-log-records"><div class="ft-log-records-heading"><span>${icon('layers')}기록별 대조 관점</span><small>가상 기록</small></div><table aria-label="${escapeHtml(configuration.source)}의 분석 항목을 설명하는 가상 기록"><caption class="ft-log-sr-only">가상 로그 · 분석 항목 설명용 예시. 실제 사건 자료나 분석 결과가 아닙니다.</caption><thead><tr>${configuration.columns.map(column => `<th scope="col">${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${configuration.rows.map((row,index) => `<tr><th scope="row"><span class="ft-log-record-index" aria-hidden="true">${String(index+1).padStart(2,'0')}</span>${escapeHtml(row[0])}</th><td>${escapeHtml(row[1])}</td><td><span class="ft-log-review-label">${escapeHtml(row[2])}</span></td></tr>`).join('')}</tbody></table><div class="ft-log-record-key"><span>${icon('link')}출처 연결</span><span>${icon('clock')}시간 대조</span><span>${icon('scan')}확인 범위 구분</span></div></div>`;
}

/** A static illustration of analysis topics; it does not represent a software product. */
export function technicalLog(service) {
  const configuration = configurations[service?.id];
  if (!configuration) throw new Error(`Unknown forensic service: ${service?.id}`);
  if (!Array.isArray(service.checks) || service.checks.length !== 4) throw new Error('technicalLog requires four analysis checks.');
  const titleId = `ft-log-heading-${service.id}`;
  return `<section class="ft-log ft-log-${escapeHtml(service.id)}" aria-labelledby="${titleId}"><header class="ft-log-header"><div><span class="ft-log-overline">${configuration.type}</span><h3 id="${titleId}">무엇을 확인하나요?</h3></div><div class="ft-log-disclosure"><span>가상 로그 · 분석 항목 설명용 예시</span><p>서비스 이해를 위한 도식이며, 실제 분석 소프트웨어 화면이 아닙니다.</p></div></header><p class="ft-log-intro">${escapeHtml(configuration.title)}</p><div class="ft-log-stage">${sourceVisual(configuration,service.id)}${records(configuration,service.id)}</div><ol class="ft-log-checks">${service.checks.map(([title],index) => `<li><div class="ft-log-check-heading"><span class="ft-log-check-icon">${icon(configuration.icons[index])}</span><span class="ft-log-check-number">${String(index+1).padStart(2,'0')}</span></div><h4>${escapeHtml(title)}</h4><p>${escapeHtml(configuration.labels[index])}</p></li>`).join('')}</ol><details class="ft-log-details"><summary>분석 항목 자세히 읽기<span aria-hidden="true">+</span></summary><div class="ft-log-detail-grid">${service.checks.map(([title,description]) => `<div><h4>${escapeHtml(title)}</h4><p>${escapeHtml(description)}</p></div>`).join('')}</div></details><p class="ft-log-note">${icon('document')}<span>${escapeHtml(configuration.note)}</span></p></section>`;
}
