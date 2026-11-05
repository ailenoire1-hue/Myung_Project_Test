const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function sourceIcon(type) {
  const icons = {
    mic: '<rect x="56" y="28" width="28" height="54" rx="14" fill="#101e2b"/><path d="M44 70Q44 96 70 96T96 70M70 96v16M56 112h28" stroke="#101e2b" stroke-width="4" stroke-linecap="round"/><circle cx="112" cy="32" r="5" fill="#bf6839"/>',
    recorder: '<rect x="28" y="32" width="84" height="76" rx="8" fill="#fff" stroke="#101e2b" stroke-width="2.5"/><rect x="38" y="42" width="64" height="20" rx="4" fill="#101e2b"/><circle cx="48" cy="52" r="3" fill="#5b8fb5"/><rect x="58" y="49.5" width="38" height="5" rx="1" fill="#2563eb" opacity=".5"/><circle cx="48" cy="86" r="10" fill="#bf6839"/><rect x="66" y="80" width="14" height="12" rx="2" fill="#101e2b"/><rect x="86" y="80" width="14" height="12" rx="2" fill="#101e2b" opacity=".4"/>',
    wave: [22,40,60,34,72,50,84,42,56,28].map((height, i) => `<rect x="${22 + i * 10}" y="${70 - height / 2}" width="6" height="${height}" rx="3" fill="${i === 6 ? '#2563eb' : '#101e2b'}" opacity="${i === 6 ? 1 : .75}"/>`).join(''),
    phone: '<rect x="46" y="26" width="48" height="88" rx="10" fill="#fff" stroke="#101e2b" stroke-width="2.5"/><rect x="52" y="34" width="36" height="60" rx="2" fill="#101e2b"/><circle cx="70" cy="104" r="3.5" fill="#101e2b"/><path d="M60 52Q70 48 80 52M58 60Q70 54 82 60M56 68Q70 60 84 68" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/><circle cx="114" cy="30" r="8" fill="#bf6839"/>'
  };
  return `<svg viewBox="0 0 140 140" fill="none" aria-hidden="true"><rect x="10" y="10" width="120" height="120" rx="20" fill="#f3f6f9"/>${icons[type]}</svg>`;
}

const methods = [
  ['메타데이터 분석', '작성 · 시간 · 인코더 정보'],
  ['파일 구조 비교', '녹음 매체별 내부 구성'],
  ['레퍼런스 데이터셋 대조', '같은 조건의 비교 자료'],
  ['편집 프로그램 흔적 검토', '프로그램 문자열과 재작성 단서'],
  ['파형(Waveform) 검토', '구간의 흐름과 연속성'],
  ['해시 무결성 확인', '확보 · 전달 파일의 동일성']
];

const reviewTree = [
  ['ftyp', 0, 'common'],
  ['moov', 0, 'diff'],
  ['mvhd · creation_time', 1, ''],
  ['trak · (audio)', 1, ''],
  ['udta › meta › ilst', 1, 'diff'],
  ['©too → "WavePad 12.6"', 2, 'diff'],
  ['free (padding)', 0, 'diff'],
  ['mdat · sample data', 0, '']
];
const referenceTree = [
  ['ftyp', 0, 'common'],
  ['moov', 0, 'common'],
  ['mvhd · creation_time', 1, ''],
  ['trak · (audio)', 1, ''],
  ['udta › meta › ilst', 1, 'common'],
  ['©too → "com.apple.coreaudio"', 2, 'common'],
  ['mdat · sample data', 0, '']
];

function atomTree(nodes, label) {
  return `<ol class="lp-audio-tree" aria-label="${escapeHtml(label)}">${nodes.map(([text, depth, state]) => `<li class="lp-audio-node lp-audio-depth-${depth}${state ? ` lp-audio-node-${state}` : ''}"><span class="lp-audio-node-dot" aria-hidden="true"></span><code>${escapeHtml(text)}</code>${state ? `<small>${state === 'diff' ? '차이' : '대조'}</small>` : ''}</li>`).join('')}</ol>`;
}

function comparisonTree() {
  return `<div class="lp-audio-case-heading"><p>01 / FILE STRUCTURE</p><h3>같은 확장자 안에서도,<br><em>파일 내부의 구조는 다를 수 있습니다.</em></h3><div>M4A Atom의 구성과 작성 정보를 레퍼런스와 나란히 대조합니다.</div></div>
    <div class="lp-audio-example-label">구조·파형 비교 예시</div>
    <div class="lp-audio-structures">
      <article class="lp-audio-structure lp-audio-structure-review"><header><span aria-hidden="true"></span><div><p>REVIEW FILE</p><h4>검토 파일 A</h4><code>example_A.m4a</code></div></header>${atomTree(reviewTree, '검토 파일 A의 M4A Atom 구조 예시')}<div class="lp-audio-tree-note"><strong>free atom · ©too 작성 정보</strong><p>프로그램 문자열과 내부 구성을 확인하고 재저장·변환 경위를 함께 검토합니다.</p></div></article>
      <article class="lp-audio-structure lp-audio-structure-reference"><header><span aria-hidden="true"></span><div><p>REFERENCE FILE</p><h4>비교 자료 B</h4><code>reference_B.m4a</code></div></header>${atomTree(referenceTree, '비교 자료 B의 M4A Atom 구조 예시')}<div class="lp-audio-tree-note"><strong>녹음 매체의 레퍼런스와 대조</strong><p>같은 기기·앱·설정에서 생성된 자료의 Atom 순서와 작성 정보를 비교합니다.</p></div></article>
    </div>
    <div class="lp-audio-reading"><span>검토 포인트</span><p>파일의 구조와 프로그램 문자열을 녹음 기기·레퍼런스·전달 경위와 함께 대조합니다.</p></div>`;
}

function waveform(type) {
  const reference = type === 'reference';
  const bars = Array.from({ length: 180 }, (_, index) => {
    const cut = !reference && index >= 88 && index <= 104;
    const base = reference
      ? 14 + Math.abs(Math.sin(index * .38 + 1.4) * 32) + Math.abs(Math.cos(index * .22 + .8) * 20)
      : 14 + Math.abs(Math.sin(index * .42) * 34) + Math.abs(Math.cos(index * .18) * 18);
    const height = cut ? 4 : base + (!reference && index > 120 && index < 140 ? 12 : 0);
    const fill = reference ? '#6b9ffc' : cut ? '#e6ab76' : '#c1d0dd';
    return `<rect x="${index * 10}" y="${(55 - height / 2).toFixed(2)}" width="6" height="${height.toFixed(2)}" fill="${fill}" rx="1"/>`;
  }).join('');
  return `<svg class="lp-audio-wave" viewBox="0 0 1800 110" preserveAspectRatio="none" role="img" aria-label="${reference ? '비교 자료 B의 음성 파형 구성 예시' : '검토 파일 A의 음성 파형과 검토 위치 구성 예시'}"><path d="M0 55h1800" stroke="#ffffff0d"/>${bars}${reference ? '' : '<path d="M960 6v98" stroke="#e6ab76" stroke-width="2" stroke-dasharray="4 4"/><circle cx="960" cy="6" r="5" fill="#e6ab76"/>'}</svg>`;
}

function waveformComparison() {
  return `<div class="lp-audio-case-heading"><p>02 / WAVEFORM COMPARISON</p><h3>구조 비교에 이어,<br><em>음성 파형의 흐름을 살펴봅니다.</em></h3><div>검토 구간을 표시하고 작성 정보와 파형의 차이를 연결해 확인합니다.</div></div>
    <div class="lp-audio-waveboard">
      <div class="lp-audio-waveboard-heading"><span>WAVEFORM / SOURCE COMPARISON</span><small>파형 비교 예시</small></div>
      <div class="lp-audio-wave-row lp-audio-wave-row-review"><div class="lp-audio-wave-source"><span>REVIEW FILE</span><h4>검토 파일 A</h4><code>example_A.m4a</code></div>${waveform('review')}<div class="lp-audio-encoder"><small>작성 정보 예시 / ©too</small><strong>WavePad</strong><span>프로그램 문자열</span></div></div>
      <div class="lp-audio-wave-divider"><span>검토 위치 예시 · 03:42</span></div>
      <div class="lp-audio-wave-row lp-audio-wave-row-reference"><div class="lp-audio-wave-source"><span>REFERENCE FILE</span><h4>비교 자료 B</h4><code>reference_B.m4a</code></div>${waveform('reference')}<div class="lp-audio-encoder"><small>작성 정보 예시 / ©too</small><strong>com.apple.coreaudio</strong><span>녹음 앱의 레퍼런스</span></div></div>
      <div class="lp-audio-wave-axis" aria-hidden="true"><span>00:00</span><span>01:40</span><span>03:20</span><span>05:00</span><span>06:40</span><span>08:14</span></div>
      <p class="lp-audio-wave-disclaimer">두 파형과 표시 시각은 분석 방법을 설명하기 위한 구성 예시입니다.</p>
    </div>
    <div class="lp-audio-findings"><article><p>파일 구조</p><h4>Atom 구성 대조</h4><span>구조 · 순서 · 내부 정보</span></article><article><p>작성 정보</p><h4>인코더 문자열 확인</h4><span>생성 · 변환 · 재저장 단서</span></article><article><p>검토 의견</p><h4>근거와 판단 범위 정리</h4><span>관련 기록을 함께 검토한 의견</span></article></div>`;
}

export function proposalAudioSection() {
  return `<section class="lp-service lp-audio" id="media-authenticity"><div class="dp-frame">
    <div class="lp-audio-heading"><p class="lp-audio-kicker">03 / AUDIO FORENSICS</p><h2>음성·녹음 포렌식</h2><p class="lp-audio-question">녹음 파일의 생성·편집 정황을 확인하고 싶습니다.</p></div>
    <div class="lp-audio-intro"><div class="lp-audio-intro-copy"><p>음성·녹음 파일의 <strong>메타데이터와 내부 구조, 파형</strong>을 대조해 생성·변환·편집 정황을 검토합니다. 녹음 기기와 비교 자료의 확보 상태를 확인하고, 분석 근거와 감정 의견의 범위를 설명합니다.</p><div class="lp-audio-sources"><figure>${sourceIcon('mic')}<figcaption>Microphone</figcaption></figure><figure>${sourceIcon('recorder')}<figcaption>Voice Recorder</figcaption></figure><div class="lp-audio-formats"><span>SOURCE / FORMAT</span><div><p>${sourceIcon('wave')}<strong>Waveform</strong></p><p>${sourceIcon('phone')}<strong>통화 녹음</strong></p><code>.m4a</code><code>.mp3 / .wav</code></div></div></div></div><div class="lp-audio-methods">${methods.map(([title, description], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${description}</p></article>`).join('')}</div></div>
    <article class="lp-audio-case lp-audio-case-structure" id="media-authenticity-analysis">${comparisonTree()}</article>
    <div class="lp-audio-case lp-audio-case-waveform">${waveformComparison()}</div>
    <p class="lp-audio-scope"><strong>확인 범위 안내</strong>원본·녹음 기기·비교 자료의 확보 상태와 전달 경위를 함께 검토해 생성·편집 정황과 판단 범위를 설명합니다.</p>
  </div></section>`;
}
