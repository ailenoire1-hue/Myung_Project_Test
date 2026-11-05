// Adapted from the supplied law proposal, slides 19, 22 and 23.
// Device/app SVG artwork follows the proposal. All message/report examples are fictional.
const phoneArtwork = kind => `<svg viewBox="0 0 180 240" aria-hidden="true" focusable="false">${kind === 'galaxy' ? `
  <rect x="20" y="10" width="140" height="220" rx="22" fill="#101e2b"/><rect x="26" y="16" width="128" height="208" rx="16" fill="#f5f7fa"/><circle cx="90" cy="28" r="4" fill="#101e2b"/>
  <g transform="translate(90,120)"><path d="m-18-42 7 12m29-12-7 12" fill="none" stroke="#3ddc84" stroke-width="2.5" stroke-linecap="round"/><path d="M-28-10a28 28 0 0 1 56 0Z" fill="#3ddc84"/><circle cx="-12" cy="-20" r="2.5" fill="#fff"/><circle cx="12" cy="-20" r="2.5" fill="#fff"/><g fill="#3ddc84"><rect x="-28" y="-6" width="56" height="40" rx="4"/><rect x="-40" y="-6" width="10" height="34" rx="5"/><rect x="30" y="-6" width="10" height="34" rx="5"/><rect x="-18" y="30" width="10" height="18" rx="5"/><rect x="8" y="30" width="10" height="18" rx="5"/></g></g>
  <rect x="65" y="210" width="50" height="3" rx="1.5" fill="#8b99ae" opacity=".5"/><g fill="#4a5a73"><rect x="18" y="70" width="3" height="24" rx="1.5"/><rect x="18" y="100" width="3" height="36" rx="1.5"/><rect x="159" y="80" width="3" height="40" rx="1.5"/></g>` : `
  <rect x="20" y="10" width="140" height="220" rx="28" fill="#dfe5ec"/><rect x="26" y="16" width="128" height="208" rx="22" fill="#101e2b"/><rect x="66" y="24" width="48" height="14" rx="7" fill="#000"/>
  <g transform="translate(90,120)" fill="#f5f7fa"><path d="M4-34q8-8 16-6-2 10-10 12-7 0-6-6Z"/><path d="M-4-26C-20-26-28-12-28 2c0 16 10 32 20 32 5 0 8-2 10-2 3 0 6 2 12 2 10 0 20-16 20-32 0-14-8-28-24-28-5 0-7 2-10 2-1 0-1-2-4-2Z"/><path d="M28-4a8 8 0 0 0 0 12q6-6 0-12Z" fill="#101e2b"/></g>
  <rect x="70" y="216" width="40" height="3" rx="1.5" fill="#8b99ae" opacity=".6"/><g fill="#8b99ae"><rect x="18" y="60" width="3" height="20" rx="1.5"/><rect x="18" y="90" width="3" height="32" rx="1.5"/><rect x="18" y="128" width="3" height="32" rx="1.5"/><rect x="159" y="90" width="3" height="48" rx="1.5"/></g>`}</svg>`;

const appArtwork = type => {
  const art = {
    kakao: '<rect width="48" height="48" rx="12" fill="#fee500"/><path d="M24 13c-7.2 0-13 4.5-13 10.1 0 3.6 2.3 6.8 5.8 8.6l-1.3 4.7c-.1.4.3.7.7.5l5.5-3.6c.7.1 1.5.2 2.3.2 7.2 0 13-4.5 13-10.1S31.2 13 24 13Z" fill="#3c1e1e"/>',
    telegram: '<rect width="48" height="48" rx="12" fill="#229ed9"/><path d="m36.5 14.2-3.8 18.8c-.3 1.3-1 1.6-2.1 1l-5.8-4.3-2.8 2.7c-.3.3-.6.6-1.2.6l.4-5.9 10.9-9.8c.5-.4-.1-.7-.8-.3l-13.4 8.4-5.8-1.8c-1.3-.4-1.3-1.3.3-1.9l22.3-9.2c1.1-.4 2 .3 1.8 1.7Z" fill="#fff"/>',
    facebook: '<rect width="48" height="48" rx="12" fill="#1877f2"/><path d="M28.3 25.5h3.9l.7-5h-4.6v-3.2c0-1.5.5-2.5 2.6-2.5h2.2v-4.4c-.4 0-1.7-.2-3.3-.2-4.4 0-7.4 2.6-7.4 7.4v3h-4.3v5h4.3V38h6V25.5Z" fill="#fff"/>',
    instagram: '<defs><linearGradient id="lpm-instagram-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f58529"/><stop offset=".5" stop-color="#dd2a7b"/><stop offset="1" stop-color="#8134af"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#lpm-instagram-gradient)"/><rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="24" cy="24" r="6" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="31.5" cy="16.5" r="1.8" fill="#fff"/>',
    line: '<rect width="48" height="48" rx="12" fill="#06c755"/><path d="M24 12c-8.3 0-15 5.2-15 11.7 0 5.8 5.3 10.7 12.5 11.6.5.1 1.1.3 1.3.7.2.4.1 1-.1 1.4l-.2 1.2c-.1.4-.3 1.4 1.2.8 1.5-.6 8.2-4.9 11.2-8.3 2-2.3 3-4.6 3-7.4C39 17.2 32.3 12 24 12Z" fill="#fff"/><text x="24" y="27" fill="#06c755" font-size="9" font-weight="800" text-anchor="middle" font-family="Arial,sans-serif">LINE</text>',
    whatsapp: '<rect width="48" height="48" rx="12" fill="#25d366"/><path d="M24 10c-7.7 0-14 6.3-14 14 0 2.5.7 4.9 1.9 7L10 38l7.2-1.9c2 1.1 4.3 1.7 6.7 1.7h.1c7.7 0 14-6.3 14-14S31.7 10 24 10Zm8.2 20c-.3.9-1.7 1.7-2.4 1.8-.6.1-1.4.1-2.3-.1-.5-.2-1.2-.4-2.1-.8-3.7-1.6-6.1-5.4-6.3-5.6-.2-.2-1.5-2-1.5-3.8s1-2.7 1.3-3.1c.3-.4.7-.5.9-.5h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.7.1.2.1.4 0 .6-.1.2-.2.4-.3.5-.2.2-.3.4-.5.6-.2.2-.3.4-.2.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.2.5.1.7-.1.2-.2.8-.9 1-1.3.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.2.6.3.1.1.1 1-.2 2Z" fill="#fff"/>'
  };
  return `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">${art[type]}</svg>`;
};

const lineIcon = type => {
  const paths = {
    call: '<path d="m7 3 4 5-3 4c2 4 4 6 8 8l4-3 5 4c-1 5-5 6-10 3C8 21 3 16 2 9c-1-3 1-6 5-6Z"/>',
    chat: '<path d="M3 4h22v16H12l-6 5v-5H3Z M8 9h12M8 14h8"/>',
    pin: '<path d="M14 27S5 18 5 11a9 9 0 0 1 18 0c0 7-9 16-9 16Z"/><circle cx="14" cy="11" r="3"/>',
    media: '<rect x="3" y="4" width="22" height="20" rx="2"/><circle cx="10" cy="10" r="2"/><path d="m4 22 7-7 5 4 5-8 4 10"/>',
    deleted: '<path d="M5 6h18M11 3h6M7 6l1 19h12l1-19M11 11v9M17 11v9"/>',
    log: '<path d="M6 3h16v23H6ZM10 8h8M10 13h8M10 18h5"/>',
    chip: '<rect x="7" y="7" width="14" height="14" rx="2"/><path d="M11 2v5M17 2v5M11 21v5M17 21v5M2 11h5M2 17h5M21 11h5M21 17h5M11 11h6v6h-6Z"/>',
    link: '<path d="m11 18 7-8M10 8l3-3a6 6 0 0 1 8 8l-3 3M18 20l-3 3a6 6 0 0 1-8-8l3-3"/>',
    user: '<circle cx="14" cy="8" r="4"/><path d="M5 25v-3a9 9 0 0 1 18 0v3"/>',
    time: '<circle cx="14" cy="14" r="11"/><path d="M14 7v8l5 3"/>',
    file: '<path d="M6 2h11l6 6v18H6ZM17 2v7h6M10 14h9M10 19h6"/>',
    login: '<path d="M13 4h12v20H13M2 14h16m-5-5 5 5-5 5"/>'
  };
  return `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[type]}</svg>`;
};

const scope = items => `<ul class="lpm-scope">${items.map(([icon, label]) => `<li>${lineIcon(icon)}<span>${label}</span></li>`).join('')}</ul>`;
const apps = (items, modifier = '') => `<ul class="lpm-apps ${modifier}">${items.map(([icon, name]) => `<li>${appArtwork(icon)}<span>${name}</span></li>`).join('')}</ul>`;

function resultExample() {
  return `<article class="lpm-results" id="mobile-evidence-analysis">
    <header class="lpm-subheading"><div><p class="lpm-kicker">MOBILE ANALYSIS / RESULT</p><h3>화면에서 사라진 대화,<br>남아 있는 기록을 확인합니다.</h3></div><p>삭제 흔적과 실제 확보한 내용을 구분하고,<br>대화의 출처·시각·맥락을 함께 정리합니다.</p></header>
    <div class="lpm-result-layout">
      <div class="lpm-report" aria-label="스마트폰 분석 결과물 구성 예시">
        <div class="lpm-report-bar"><strong><i aria-hidden="true"></i> 모바일 분석 리포트</strong><span>분석 결과물 예시 · 가상자료</span></div>
        <div class="lpm-report-summary"><div><small>PHOTOS</small><strong>사진·영상</strong><span>파일 · 촬영 정보</span></div><div><small>CHATS</small><strong>대화 기록</strong><span>참여자 · 작성 시각</span></div><div><small>HASH</small><strong>무결성 확인</strong><span>해시값 · 확보 이력</span></div></div>
        <table class="lpm-record-table"><caption>결과물에 담는 정보</caption><thead><tr><th scope="col">자료 항목</th><th scope="col">확인 내용</th><th scope="col">구분</th></tr></thead><tbody><tr><th scope="row">대화 기록</th><td>참여자 · 시각 · 앞뒤 맥락</td><td><span>검토</span></td></tr><tr><th scope="row">첨부 파일</th><td>대화 연결 · 파일 경로</td><td><span>대조</span></td></tr><tr><th scope="row">삭제 흔적</th><td>남은 기록 · 파일 존재 여부</td><td><span>확인 범위</span></td></tr><tr><th scope="row">기기·백업</th><td>기록의 출처 · 확보 상태</td><td><span>구분</span></td></tr></tbody></table>
        <p class="lpm-report-foot">기록상 존재와 실제 파일 확보 여부를 나눠 설명합니다.</p>
      </div>
      <figure class="lpm-chat-comparison">
        <div class="lpm-chat-pair">
          <div class="lpm-chat-shot lpm-chat-before"><div class="lpm-shot-label"><span>BEFORE</span><strong>기기 화면</strong></div><div class="lpm-chat-screen"><div class="lpm-chat-top"><span aria-hidden="true">‹</span><strong>대화 참여자 A · B</strong><span aria-hidden="true">⋯</span></div><p class="lpm-chat-date">대화 화면 예시</p><div class="lpm-bubble">회의 자료를 전달드립니다.</div><div class="lpm-bubble lpm-bubble-sent">자료.pdf <span aria-hidden="true">↗</span></div><div class="lpm-bubble lpm-bubble-deleted">삭제된 메시지입니다.</div><p class="lpm-chat-bottom">화면에서 내용을<br>확인하기 어려운 상태</p></div></div>
          <div class="lpm-chat-shot lpm-chat-after"><div class="lpm-shot-label"><span>AFTER</span><strong>기록 분석</strong></div><div class="lpm-chat-screen"><div class="lpm-chat-top"><span aria-hidden="true">‹</span><strong>대화 참여자 A · B</strong><span aria-hidden="true">⋯</span></div><p class="lpm-chat-date">잔존 기록을 확인한 경우</p><div class="lpm-bubble">회의 자료를 전달드립니다.</div><div class="lpm-bubble lpm-bubble-sent">자료.pdf <span aria-hidden="true">↗</span></div><div class="lpm-bubble lpm-bubble-found"><small>잔존 기록 확인 예시</small>자료는 확인했습니다.</div><p class="lpm-chat-bottom">출처·시각과 함께<br>확인 내용을 정리</p></div></div>
        </div>
        <figcaption>개인정보를 포함하지 않은 가상 화면입니다. 삭제된 대화의 확인 가능 여부는 기기·앱·백업 상태에 따라 달라집니다.</figcaption>
      </figure>
    </div>
  </article>`;
}

function messengerVisual() {
  return `<figure class="lpm-messenger-visual"><div class="lpm-device-scene" aria-hidden="true">
    <div class="lpm-desktop"><div class="lpm-desktop-bar"><span><i></i><i></i><i></i></span><b>PC MESSENGER</b><span>— □</span></div><div class="lpm-desktop-body"><div class="lpm-room-list"><strong>대화 목록</strong><div class="lpm-room active"><i>A</i><span>대화방 A<small>관련 기록 확인</small></span></div><div class="lpm-room"><i>B</i><span>대화방 B<small>첨부 자료 검토</small></span></div><div class="lpm-room"><i>C</i><span>대화방 C<small>기간별 기록</small></span></div></div><div class="lpm-desktop-chat"><div class="lpm-desktop-title">대화방 A <span>참여자 2명</span></div><div class="lpm-chat-lines"><span></span><span class="own"></span><span></span></div><div class="lpm-file-card">${lineIcon('file')}<span>첨부 자료<small>파일 경로 · 연결 정보</small></span></div><div class="lpm-input-line"></div></div></div></div>
    <div class="lpm-scene-phone"><div class="lpm-phone-speaker"></div><div class="lpm-scene-phone-title">MOBILE</div><div class="lpm-scene-phone-avatar">A · B</div><div class="lpm-chat-lines"><span></span><span class="own"></span><span></span></div><div class="lpm-scene-phone-file">첨부 파일</div><div class="lpm-phone-home"></div></div>
    <div class="lpm-device-link">${lineIcon('link')}<span>기록 대조</span></div>
  </div><figcaption>PC와 모바일에 남은 대화·첨부 자료를 연결하는 설명용 화면</figcaption></figure>`;
}

export function proposalMobileSection() {
  return `<section class="lp-service lp-mobile" id="mobile-evidence"><div class="dp-frame">
    <header class="lpm-heading"><span class="lpm-section-tag">02 / MOBILE FORENSICS</span><h2>스마트폰 포렌식</h2><p class="lpm-service-subtitle">민·형사 분쟁 관련 자료 확보·분석</p></header>
    <div class="lpm-intro-grid"><div class="lpm-intro-copy"><p class="lpm-lead">스마트폰과 태블릿에 남은<br><strong>연락·대화·활동 기록을 살펴봅니다.</strong></p><p>갤럭시·아이폰·갤럭시탭·아이패드 등 스마트기기와 백업의 데이터를 분석하고, 쟁점과 관련된 기록의 출처와 시간, 앞뒤 맥락을 정리합니다.</p><div class="lpm-device-family"><div class="lpm-devices"><div>${phoneArtwork('galaxy')}<strong>Samsung Galaxy</strong></div><div>${phoneArtwork('apple')}<strong>Apple iPhone</strong></div></div><div class="lpm-social-panel"><span>MESSENGER / SNS</span>${apps([['kakao','카카오톡'],['telegram','텔레그램'],['facebook','페이스북'],['instagram','인스타그램']])}</div></div></div><div class="lpm-range-panel"><div class="lpm-range-heading"><h3>주요 분석 범위</h3><span>기기·백업 상태에 따라 검토</span></div>${scope([['call','통화 기록'],['chat','문자 메시지'],['chat','메신저 대화'],['pin','위치 정보'],['media','사진·동영상'],['deleted','삭제 데이터'],['log','캐시·로그'],['chip','파손 기기·칩오프 검토']])}<p class="lpm-scope-note"><strong>파손되거나 전원이 켜지지 않는 기기도 상담할 수 있습니다.</strong> 메모리 상태와 암호화·접근 조건을 먼저 확인하고, 자료 확보 가능 범위와 방법을 안내합니다.</p></div></div>
    ${resultExample()}
    <div class="lpm-messenger"><header class="lpm-subheading"><div><p class="lpm-kicker">PC & MOBILE / MESSENGER FORENSICS</p><h3>PC와 모바일,<br>대화의 맥락을 함께 봅니다.</h3></div><p>대화 내용뿐 아니라 참여자·일시·첨부 파일을 연결해<br>어떤 기록이 어디에 남아 있는지 확인합니다.</p></header><div class="lpm-messenger-grid"><div>${messengerVisual()}${apps([['kakao','카카오톡'],['telegram','텔레그램'],['line','라인'],['whatsapp','왓츠앱'],['facebook','메신저']], 'lpm-messenger-apps')}</div><div class="lpm-messenger-copy"><p class="lpm-lead">메신저 대화와 첨부 자료,<br><strong>확보된 출처에서 교차 확인합니다.</strong></p><p>PC 메신저, 스마트폰과 보유한 백업에 남은 데이터를 대조합니다. 삭제 메시지와 첨부 파일은 실제 내용의 확보 여부를 구분해 안내합니다.</p>${scope([['chat','채팅방 이름'],['user','참여자 목록'],['chat','대화 내역'],['file','첨부 파일'],['time','대화 일시'],['deleted','삭제 메시지'],['user','계정 정보'],['login','로그인 기록']])}<p class="lpm-version-note">메신저 버전·업데이트·암호화·백업 상태와 접근 권한에 따라 분석 가능한 항목이 달라집니다.</p></div></div></div>
  </div></section>`;
}
