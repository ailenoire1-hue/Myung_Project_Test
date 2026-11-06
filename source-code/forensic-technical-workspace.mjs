const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const views = {
  'data-leakage': {
    title: '활동 기록 대조',
    caption: 'PC · 외부 매체 · 백업',
    mobileViewBox: '176 12 290 275',
    mobileLabel: '가상 문서 열람, 외부 매체 연결, 파일 수정 기록의 활동 시간축 확대 화면',
    short: ['생성 · 열람 · 수정의 시간 흐름', '연결 시각과 접근 기록 연결', '삭제 흔적과 이전 버전 확인', '파일 내용과 확보 출처 대조'],
    graphic: dataGraphic
  },
  'mobile-evidence': {
    title: '대화 맥락과 출처 대조',
    caption: '기기 · 대화 · 첨부 · 백업',
    mobileViewBox: '184 12 263 275',
    mobileLabel: '가상 참여자 A와 B의 앞뒤 대화 및 첨부파일 맥락 확대 화면',
    short: ['연락 상대와 기록 시각 확인', '앞뒤 대화와 첨부파일 연결', '관련 파일과 확보 상태 확인', '기기와 백업의 기록 교차 확인'],
    graphic: mobileGraphic
  },
  'media-authenticity': {
    title: '파일과 구간 비교',
    caption: '구조 · 시간 · 연속성 · 비교 자료',
    mobileViewBox: '180 130 340 155',
    mobileLabel: '가상 원본과 전달본 음성 파형의 검토 구간 확대 화면',
    short: ['형식 · 트랙 · 작성 정보 검토', '파일과 기기의 시간 정보 대조', '파형과 프레임의 흐름 검토', '전달 · 변환 경위와 차이 비교'],
    graphic: mediaGraphic
  }
};

const number = (x, y, value) => `<g class="ft-svg-marker"><rect x="${x}" y="${y}" width="24" height="22" rx="3" fill="#bf6839"/><text x="${x + 12}" y="${y + 15}" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">${value}</text></g>`;
const line = (x1, y1, x2, y2, color = '#3b5363') => `<path d="M${x1} ${y1}H${x2}" stroke="${color}"/>`;
const panel = (x, y, width, height) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="5" fill="#162b3a" stroke="#304653"/>`;
const fileIcon = (x, y, color = '#8ba5b3') => `<g transform="translate(${x} ${y})" fill="none" stroke="${color}" stroke-width="1.2"><path d="M0 0h9l4 4v13H0Z M9 0v4h4M3 8h7M3 12h5"/></g>`;
const folderIcon = (x, y) => `<path d="M${x} ${y + 3}h7l3 3h12v14h-22Z" fill="none" stroke="#8ba5b3" stroke-width="1.2"/>`;
const svg = (id, label, contents) => `<svg class="ft-analysis-svg" viewBox="0 0 640 300" role="img" aria-label="${escapeHtml(label)}"><defs><pattern id="ft-grid-${id}" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#7392a0" stroke-opacity=".055"/></pattern></defs><rect width="640" height="300" fill="#101e2b"/><rect width="640" height="300" fill="url(#ft-grid-${id})"/>${contents}</svg>`;

function dataGraphic(id) {
  return svg(id, '가상 문서 목록, 활동 시간축, PC와 외부 매체 및 백업의 출처 대조 화면', `
    ${panel(22, 18, 145, 263)}${panel(182, 18, 277, 263)}${panel(474, 18, 144, 263)}
    <text x="38" y="42" class="ft-svg-heading">자료 경로</text>
    ${line(38, 54, 151, 54)}
    ${folderIcon(37, 67)}<text x="67" y="85" class="ft-svg-text">업무 PC A</text>
    <path d="M46 99v129M46 110h13M46 147h13M46 185h13M46 222h13" fill="none" stroke="#3b5363"/>
    <rect x="55" y="97" width="100" height="28" rx="3" fill="#294453"/>
    ${fileIcon(63, 103)}<text x="83" y="115" class="ft-svg-text">문서_A.docx</text>
    ${fileIcon(63, 140)}<text x="83" y="153" class="ft-svg-text">자료_B.zip</text>
    ${fileIcon(63, 178, '#68808e')}<text x="83" y="191" class="ft-svg-muted">이전 버전</text>
    <rect x="57" y="208" width="94" height="28" rx="3" fill="none" stroke="#657b88" stroke-dasharray="3 3"/>
    <text x="65" y="226" class="ft-svg-muted">잔존 자료</text>${number(129, 212, '03')}
    <text x="38" y="262" class="ft-svg-small">경로 · 흔적 · 확보 상태</text>
    <text x="198" y="42" class="ft-svg-heading">활동 시간축</text><text x="442" y="42" text-anchor="end" class="ft-svg-small">참조 시각</text>
    ${line(198, 54, 443, 54)}
    <path d="M215 78v163" stroke="#527183" stroke-width="2"/>
    <rect x="200" y="68" width="244" height="46" rx="4" fill="#203a49"/>
    ${number(204, 79, '01')}<text x="240" y="86" class="ft-svg-small">09:18</text><text x="240" y="103" class="ft-svg-event">문서 열람 기록</text>
    <text x="427" y="100" text-anchor="end" class="ft-svg-muted">PC A</text>
    <rect x="200" y="126" width="244" height="46" rx="4" fill="#203a49"/>
    ${number(204, 137, '02')}<text x="240" y="144" class="ft-svg-small">09:42</text><text x="240" y="161" class="ft-svg-event">외부 매체 연결 기록</text>
    <text x="427" y="158" text-anchor="end" class="ft-svg-muted">매체 B</text>
    <rect x="200" y="184" width="244" height="46" rx="4" fill="#1c3443"/>
    <circle cx="216" cy="207" r="4" fill="#91aebe"/><text x="240" y="202" class="ft-svg-small">10:05</text><text x="240" y="219" class="ft-svg-event">파일 수정 기록</text>
    <text x="427" y="216" text-anchor="end" class="ft-svg-muted">PC A</text>
    <path d="M204 250h13m-5-4 5 4-5 4" fill="none" stroke="#bf6839"/><text x="229" y="254" class="ft-svg-small">개별 기록을 함께 검토</text>
    <text x="490" y="42" class="ft-svg-heading">출처 대조</text>${number(578, 26, '04')}
    ${line(490, 54, 602, 54)}
    <path d="M544 98v137" stroke="#527183" stroke-width="1.5" stroke-dasharray="3 4"/>
    <rect x="490" y="70" width="112" height="43" rx="4" fill="#233d4c"/>
    <text x="502" y="87" class="ft-svg-event">업무 PC A</text><text x="502" y="103" class="ft-svg-small">파일 · 경로</text>
    <rect x="490" y="130" width="112" height="43" rx="4" fill="#233d4c"/>
    <text x="502" y="147" class="ft-svg-event">외부 매체 B</text><text x="502" y="163" class="ft-svg-small">연결 · 내용</text>
    <rect x="490" y="190" width="112" height="43" rx="4" fill="#233d4c"/>
    <text x="502" y="207" class="ft-svg-event">백업 C</text><text x="502" y="223" class="ft-svg-small">버전 · 출처</text>
    <text x="490" y="262" class="ft-svg-small">내용 · 확보 상태 비교</text>
  `);
}

function mobileGraphic(id) {
  return svg(id, '가상 통화와 대화 자료 목록, 참여자 A와 B의 대화 및 첨부파일, 기기와 백업 대조 화면', `
    ${panel(22, 18, 153, 263)}${panel(190, 18, 251, 263)}${panel(456, 18, 162, 263)}
    <text x="38" y="42" class="ft-svg-heading">자료 목록</text>${line(38, 54, 159, 54)}
    <rect x="34" y="68" width="129" height="41" rx="4" fill="#203a49"/>${number(42, 78, '01')}<text x="75" y="94" class="ft-svg-event">통화 · 문자</text>
    <rect x="34" y="124" width="129" height="41" rx="4" fill="#294453"/>${number(42, 134, '02')}<text x="75" y="150" class="ft-svg-event">메신저 대화</text>
    <rect x="34" y="180" width="129" height="41" rx="4" fill="#203a49"/>${number(42, 190, '03')}<text x="75" y="206" class="ft-svg-event">미디어 자료</text>
    <text x="38" y="247" class="ft-svg-small">참여자 · 시각 · 경로</text><text x="38" y="263" class="ft-svg-small">기록과 실제 파일 구분</text>
    <text x="206" y="42" class="ft-svg-heading">대화와 첨부 맥락</text><text x="425" y="42" text-anchor="end" class="ft-svg-small">참여자 A · B</text>
    ${line(206, 54, 425, 54)}
    <circle cx="218" cy="85" r="12" fill="#294453"/><text x="218" y="89" text-anchor="middle" class="ft-svg-text">A</text>
    <rect x="240" y="72" width="181" height="39" rx="5" fill="#284352"/>
    <text x="252" y="89" class="ft-svg-event">검토 자료를 보냅니다.</text><text x="252" y="104" class="ft-svg-small">09:20 · 가상 대화</text>
    <rect x="240" y="120" width="181" height="50" rx="5" fill="#203a49"/>
    <rect x="251" y="130" width="29" height="29" rx="3" fill="#354f5d"/>
    <path d="m255 153 7-9 5 4 6-7 4 12M273 136h.01" fill="none" stroke="#9bb4c1" stroke-width="1.5"/>
    <text x="289" y="142" class="ft-svg-text">첨부_A.jpg</text><text x="289" y="157" class="ft-svg-small">대화 연결 · 파일 확인</text>
    <circle cx="413" cy="200" r="12" fill="#4e443d"/><text x="413" y="204" text-anchor="middle" class="ft-svg-text">B</text>
    <rect x="208" y="185" width="183" height="40" rx="5" fill="#3b3933"/>
    <text x="220" y="202" class="ft-svg-event">첨부파일 확인했습니다.</text><text x="220" y="217" class="ft-svg-small">09:24 · 가상 대화</text>
    <path d="M208 250h13m-5-4 5 4-5 4" fill="none" stroke="#bf6839"/><text x="232" y="254" class="ft-svg-small">앞뒤 대화와 자료를 연결</text>
    <text x="472" y="42" class="ft-svg-heading">기기 · 백업 대조</text>${number(578, 26, '04')}
    ${line(472, 54, 602, 54)}
    <rect x="475" y="72" width="124" height="58" rx="4" fill="#233d4c"/>
    <rect x="486" y="83" width="16" height="32" rx="3" fill="none" stroke="#9ab2bf" stroke-width="1.2"/><path d="M490 111h8" stroke="#9ab2bf"/>
    <text x="512" y="94" class="ft-svg-event">기기 A</text><text x="512" y="111" class="ft-svg-small">기록 · 파일</text>
    <path d="M513 141v19m-4-5 4 5 4-5M558 160v-19m-4 5 4-5 4 5" fill="none" stroke="#bf6839" stroke-width="1.3"/>
    <rect x="475" y="170" width="124" height="58" rx="4" fill="#233d4c"/>
    <path d="M485 184h19v26h-19ZM489 189h11M489 195h11M489 201h7" fill="none" stroke="#9ab2bf" stroke-width="1.2"/>
    <text x="512" y="193" class="ft-svg-event">백업 B</text><text x="512" y="210" class="ft-svg-small">출처 · 버전</text>
    <text x="474" y="250" class="ft-svg-small">기록상 존재와</text><text x="474" y="265" class="ft-svg-small">실제 확보 여부 대조</text>
  `);
}

function waveform(y, tone, phase = 0) {
  return Array.from({ length: 93 }, (_, i) => {
    const x = 109 + i * 5.15;
    const height = 3 + Math.abs(Math.sin(i * .68 + phase) * Math.cos(i * .19 + phase)) * 27;
    return `<path d="M${x.toFixed(2)} ${(y - height).toFixed(2)}v${(height * 2).toFixed(2)}" stroke="${tone}" stroke-width="1.6" stroke-linecap="round"/>`;
  }).join('');
}

function mediaGraphic(id) {
  return svg(id, '가상 파일 구조와 시간 정보, 원본과 전달본 비교 목록 및 두 음성 파형의 검토 구간 화면', `
    ${panel(22, 18, 186, 101)}${panel(224, 18, 184, 101)}${panel(424, 18, 194, 101)}${panel(22, 134, 596, 148)}
    ${number(34, 29, '01')}<text x="69" y="45" class="ft-svg-heading">파일 구조</text>
    <path d="M40 64v37m0-30h12m-12 24h12" fill="none" stroke="#607b8b"/>
    <text x="60" y="72" class="ft-svg-text">컨테이너 / 트랙</text><text x="60" y="96" class="ft-svg-small">형식 · 인코더 · 작성 정보</text>
    ${number(236, 29, '02')}<text x="271" y="45" class="ft-svg-heading">시간 정보</text>
    <text x="240" y="72" class="ft-svg-small">생성 시각</text><path d="M303 68h86" stroke="#69828f"/>
    <text x="240" y="96" class="ft-svg-small">수정 시각</text><path d="M303 92h61" stroke="#69828f"/>
    ${number(436, 29, '04')}<text x="471" y="45" class="ft-svg-heading">비교 자료</text>
    ${fileIcon(440, 60)}<text x="461" y="72" class="ft-svg-text">원본_A.mp4</text>
    ${fileIcon(440, 84)}<text x="461" y="96" class="ft-svg-text">전달본_B.mp4</text>
    <path d="M580 62v34m-4-29 4-5 4 5m-8 24 4 5 4-5" fill="none" stroke="#bf6839" stroke-width="1.2"/>
    ${number(34, 145, '03')}<text x="69" y="161" class="ft-svg-heading">구간의 연속성</text><text x="600" y="161" text-anchor="end" class="ft-svg-small">파형 · 프레임 흐름</text>
    <path d="M104 201h491M104 246h491" stroke="#3b5363"/>
    <text x="39" y="205" class="ft-svg-text">원본</text><text x="39" y="250" class="ft-svg-text">전달본</text>
    ${waveform(201, '#94b2c1')}${waveform(246, '#bd9c83', .04)}
    <rect x="344" y="174" width="85" height="91" fill="#bf6839" fill-opacity=".1" stroke="#bf6839" stroke-dasharray="4 3"/>
    <text x="351" y="184" fill="#e6ad88" font-size="9">검토 구간</text>
    <text x="109" y="275" class="ft-svg-axis">00:00</text><text x="270" y="275" class="ft-svg-axis">00:10</text><text x="431" y="275" class="ft-svg-axis">00:20</text><text x="573" y="275" class="ft-svg-axis">00:30</text>
  `);
}

/** A conceptual analysis workspace. Every illustrated record is fictional. */
export function technicalWorkspace(s) {
  if (!s || !views[s.id]) throw new Error('technicalWorkspace requires a supported service id.');
  if (!Array.isArray(s.checks) || s.checks.length !== 4) throw new Error('technicalWorkspace requires four check items.');
  const id = s.id;
  const view = views[id];
  const titleId = `${id}-workspace-title`;
  const desktopView = view.graphic(id).replace('class="ft-analysis-svg"', 'class="ft-analysis-svg ft-analysis-svg-desktop"');
  const mobileView = view.graphic(`${id}-mobile`)
    .replace('class="ft-analysis-svg"', 'class="ft-analysis-svg ft-analysis-svg-mobile"')
    .replace('viewBox="0 0 640 300"', `viewBox="${view.mobileViewBox}"`)
    .replace(/aria-label="[^"]*"/, `aria-label="${escapeHtml(view.mobileLabel)}"`);
  const cards = s.checks.map(([title], index) => `<article class="ft-workspace-note ft-workspace-note-${index + 1}"><span class="ft-note-number">0${index + 1}</span><div><h4>${escapeHtml(title)}</h4><p>${escapeHtml(view.short[index])}</p></div><span class="ft-note-rule" aria-hidden="true"></span></article>`);
  return `<section class="ft-workspace ft-workspace--${id}" aria-labelledby="${titleId}">
    <div class="ft-workspace-heading"><div><p class="ft-workspace-kicker">ANALYSIS WORKSPACE</p><h3 id="${titleId}">기록을 연결해 확인합니다</h3></div><p class="ft-workspace-sample"><span aria-hidden="true"></span>가상 자료 · 분석 화면 구성 예시</p></div>
    <div class="ft-workspace-board">
      <svg class="ft-workspace-connectors" viewBox="0 0 1100 390" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M181 91H222L248 117H286M181 299H222L248 273H286M919 91H878L852 117H814M919 299H878L852 273H814"/><circle cx="181" cy="91" r="3"/><circle cx="181" cy="299" r="3"/><circle cx="919" cy="91" r="3"/><circle cx="919" cy="299" r="3"/></svg>
      ${cards[0]}${cards[1]}
      <div class="ft-console"><header class="ft-console-top"><span class="ft-console-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${escapeHtml(view.title)}</span><small>CASE / DEMO</small></header><div class="ft-console-meta"><div><span>RECORD VIEW</span><strong>${escapeHtml(view.caption)}</strong></div><span class="ft-console-focus">4 검토 지점</span></div><div class="ft-console-canvas"><span class="ft-mobile-zoom-label">분석 화면 확대 보기</span>${desktopView}${mobileView}</div><footer class="ft-console-bottom"><span><i aria-hidden="true"></i>가상 자료셋</span><span>출처 · 시간 · 맥락</span></footer></div>
      ${cards[2]}${cards[3]}
    </div>
    <details class="ft-workspace-details"><summary>항목별 검토 내용 보기 <span aria-hidden="true">+</span></summary><div class="ft-workspace-detail-grid">${s.checks.map(([title, description], index) => `<div><span>0${index + 1}</span><h4>${escapeHtml(title)}</h4><p>${escapeHtml(description)}</p></div>`).join('')}</div></details>
  </section>`;
}
