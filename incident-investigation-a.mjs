const icon = name => {
  const paths = {
    server:'<rect x="6" y="3" width="20" height="26" rx="3"/><path d="M6 12h20M6 21h20M10 7h2m-2 9h2m-2 9h2M17 7h5m-5 9h5m-5 9h5"/>',
    mail:'<rect x="3" y="7" width="26" height="19" rx="3"/><path d="m4 9 12 9L28 9M4 24l8-8m16 8-8-8"/>',
    file:'<path d="M8 3h11l7 7v19H8zM19 3v8h7M12 16h10M12 21h10"/>',
    user:'<circle cx="16" cy="10" r="5"/><path d="M5 29v-3c0-6 5-10 11-10s11 4 11 10v3"/>',
    lock:'<rect x="6" y="13" width="20" height="16" rx="3"/><path d="M10 13V9a6 6 0 0 1 12 0v4m-6 7v4"/>',
    network:'<rect x="11" y="2" width="10" height="8" rx="2"/><rect x="2" y="23" width="10" height="7" rx="2"/><rect x="20" y="23" width="10" height="7" rx="2"/><path d="M16 10v7M7 23v-6h18v6"/>',
    search:'<circle cx="14" cy="14" r="9"/><path d="m21 21 8 8M9 14h10M14 9v10"/>',
    shield:'<path d="m16 2 12 5v8c0 8-12 15-12 15S4 23 4 15V7zM10 15l4 4 8-9"/>',
    clock:'<circle cx="16" cy="16" r="13"/><path d="M16 8v9l6 3"/>',
    cloud:'<path d="M9 26h15a7 7 0 0 0 1-14 10 10 0 0 0-19 0 7 7 0 0 0 3 14Z"/><path d="M16 13v10m-4-4 4 4 4-4"/>',
    terminal:'<rect x="2" y="4" width="28" height="24" rx="3"/><path d="m7 11 5 5-5 5m9 0h9"/>'
  };
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.file}</svg>`;
};
const section = (id, modifier, eyebrow, title, lead, body, caption) => `<section class="ir-section ira-${modifier}" data-fr-screen data-fr-group="${id}" id="${id}"><div class="ir-frame"><header class="ir-heading"><p class="ir-eyebrow">${eyebrow}</p><h2>${title}</h2><p class="ir-lead">${lead}</p></header><div class="ir-content">${body}</div><footer class="ir-section-caption">${caption}</footer></div></section>`;
const points = (items, outcome) => `<aside class="ira-points" aria-label="주요 조사 항목"><p class="ira-small-label">INVESTIGATION SCOPE</p><ol>${items.map(([title,copy],i)=>`<li><span>0${i+1}</span><div><h3>${title}</h3><p>${copy}</p></div></li>`).join('')}</ol><div class="ira-outcome"><span>조사 결과</span><strong>${outcome}</strong></div></aside>`;
const stage = (number, i, title, code, copy) => `<article class="ira-stage"><span class="ira-stage-index">${number}</span><div class="ira-stage-icon">${icon(i)}</div><h3>${title}</h3><code>${code}</code><p>${copy}</p></article>`;
const example = `<span class="ira-example">분석 흐름 예시 · 가상 데이터</span>`;
const note = text => `<p class="ira-boundary">${icon('search')}<span>${text}</span></p>`;

const overview = () => section('overview','overview','THE EVIDENCE CONNECTION','사고의 시작과 영향 범위,<br>여러 기록을 연결해 확인합니다.','의심스러운 현상에서 출발해 접속·실행·자료 이용 기록을 대조하고, 확인된 사실과 추가 조사 범위를 정리합니다.',`
  <figure class="ira-overview-board" aria-label="자료 확보, 기록 연결, 판단 근거 정리의 분석 흐름">
    <div class="ira-inputs"><span class="ira-small-label">01 · COLLECT</span><h3>분산된 기록을 확보</h3>${[['user','계정·접속','인증 · VPN · 원본 메일'],['server','시스템·실행','서버 · EDR · 의심 파일'],['file','자료·전송','접근 · 다운로드 · 전송']].map(([i,t,s])=>`<div>${icon(i)}<span><strong>${t}</strong><small>${s}</small></span></div>`).join('')}</div>
    <div class="ira-correlation"><span class="ira-small-label">02 · CORRELATE</span><div class="ira-correlation-orbit"><span class="ira-orbit-dot ira-dot-one"></span><span class="ira-orbit-dot ira-dot-two"></span><span class="ira-orbit-dot ira-dot-three"></span>${icon('search')}<strong>시간 · 계정 · 기기</strong><small>기록 간 연결과 교차 검증</small></div></div>
    <div class="ira-findings"><span class="ira-small-label">03 · EXPLAIN</span><h3>판단할 수 있는 근거로</h3><dl><div><dt>유입·실행 경위</dt><dd>어디서, 어떻게 시작됐는가</dd></div><div><dt>영향받은 범위</dt><dd>어떤 시스템·자료와 관련되는가</dd></div><div><dt>대응 검토 항목</dt><dd>보완 확인과 조치가 필요한 것은 무엇인가</dd></div></dl></div>
  </figure>
  <nav class="ira-service-links" aria-label="사고 유형별 조사 안내">${[['01','ransomware','lock','랜섬웨어 사고조사','암호화 경위 · 업무 복구 조건'],['02','mail-hacking','mail','메일·해킹 조사','계정 도용 · 시스템 침입'],['03','personal-data','shield','개인정보 유출 조사','접근 · 반출 정황 · 영향 범위']].map(([n,id,i,t,d])=>`<a href="#${id}"><span>${n}</span>${icon(i)}<div><strong>${t}</strong><small>${d}</small></div><b aria-hidden="true">↗</b></a>`).join('')}</nav>
`,'조사 범위는 사고 상황과 확보 가능한 자료에 맞춰 협의합니다.');

const ransomware = () => section('ransomware','ransomware','01 / RANSOMWARE INVESTIGATION','랜섬웨어 사고조사','파일 암호화가 시작된 경위를 추적하고, 관련 시스템과 백업 상태를 대조해 복구 검토에 필요한 근거를 정리합니다.',`
  <div class="ira-chapter-layout"><figure class="ira-surface" aria-label="원격 접속, 의심 실행, 파일 변화를 연결하는 랜섬웨어 분석 예시"><div class="ira-surface-bar"><span>TRACE THE INCIDENT</span>${example}</div>
    <div class="ira-event-flow">${stage('11:11:08','user','원격 접속','Security · 4624','ops_admin → APP-02')}${stage('11:17:32','terminal','프로그램 실행','Sysmon · 1','services.exe → svc-update.exe')}${stage('11:18:09','lock','파일 변화','Sysmon · 11','spec.xlsx → spec.xlsx.locked')}</div>
    <div class="ira-host-strip"><span>영향 범위 대조</span><div>${icon('server')}<b>APP-02</b><small>실행 · 파일 기록</small></div><i aria-hidden="true"></i><div>${icon('network')}<b>공유 저장소</b><small>동일 변화 확인</small></div><i aria-hidden="true"></i><div>${icon('cloud')}<b>백업</b><small>시점 · 상태 확인</small></div></div>
  </figure>${points([['유입 경로와 실행 행위','접속 계정·IP와 실행 파일, 정상 관리자 작업을 대조합니다.'],['암호화·확산 정황','파일 내용 변화와 다른 기기에서 동일 흔적이 있는지 살펴봅니다.'],['업무 복구 조건','백업 시점·무결성과 우선 복구 대상을 검토합니다.']],'사고 경위 · 영향 자산 · 복구 검토 항목')}</div>
  ${note('확장자 변경이나 파일 생성 기록만으로 암호화·자료 유출을 확정하지 않습니다. 실제 파일과 다른 기록을 함께 검증합니다.')}
`,'활용 자료: VPN·인증 로그 / Windows·EDR 기록 / 의심 파일·랜섬 노트 / 백업');

const mail = () => section('mail-hacking','mail','02 / EMAIL & HACKING INVESTIGATION','메일·해킹 조사','피싱·계정 도용부터 시스템 침입까지. 접근 경로와 비정상 행위, 재접속 수단이 남아 있는지 조사합니다.',`
  <div class="ira-chapter-layout"><figure class="ira-surface ira-tabbed" aria-label="메일·계정과 시스템 침입의 조사 흐름 예시" data-ir-tabs>
    <div class="ira-surface-bar"><div class="ira-tabs" role="tablist" aria-label="분석 예시 선택"><button type="button" role="tab" id="ira-mail-tab" data-ir-tab="ira-mail-case" aria-controls="ira-mail-case" aria-selected="true">메일·계정</button><button type="button" role="tab" id="ira-server-tab" data-ir-tab="ira-server-case" aria-controls="ira-server-case" aria-selected="false" tabindex="-1">시스템 침입</button></div>${example}</div>
    <div role="tabpanel" id="ira-mail-case" aria-labelledby="ira-mail-tab" data-ir-panel="ira-mail-case">
      <div class="ira-event-flow">${stage('01 · ENTRY','mail','의심 메일 확인','Original email · Header','발신 정보 · 링크 · 첨부파일')}${stage('02 · ACCESS','user','계정 활동 대조','Sign-in · 09:22:41','finance@example.test')}${stage('03 · CHANGE','network','설정 변경 확인','Audit · 09:26:05','New-InboxRule / ForwardTo')}</div>
      <div class="ira-mail-record"><span>감사 기록 발췌</span><code>Operation: <b>New-InboxRule</b><br>ForwardTo: archive@review.example</code><p>메일 추적 기록과 대조해<br><strong>실제 전달 여부를 확인</strong></p></div>
    </div>
    <div role="tabpanel" id="ira-server-case" aria-labelledby="ira-server-tab" data-ir-panel="ira-server-case" hidden>
      <div class="ira-event-flow">${stage('01 · ACCESS','network','외부 접근','Web · WAF · VPN','접속지 · 요청 · 인증 이력')}${stage('02 · EXECUTION','terminal','비정상 실행','Process · EDR','상위 프로세스 · 계정 · 파일')}${stage('03 · PERSISTENCE','server','잔존 흔적','Service · Scheduled task','서비스 · 예약 작업 · 권한')}</div>
      <div class="ira-mail-record"><span>기록 연결 기준</span><code>Account + Host + Timestamp<br>실행 · 통신 · 설정 변경</code><p>정상 운영 작업과 대조해<br><strong>침입과 지속 실행을 검토</strong></p></div>
    </div>
  </figure>${points([['유입·접근 경위','원본 메일·URL, 인증 로그와 외부 접근 기록을 연결합니다.'],['계정·시스템 변경','전달 규칙, 권한·앱 동의와 파일·프로세스 변화를 확인합니다.'],['잔존 위험','자동 실행과 외부 연결, 재접속 수단을 살펴봅니다.']],'접근 경로 · 비정상 행위 · 개선 검토 항목')}</div>
  ${note('로그인 성공이나 전달 규칙만으로 전체 메일의 유출을 단정하지 않습니다. 실제 전달·활동 기록을 추가 대조합니다.')}
`,'활용 자료: 원본 메일·헤더 / 로그인·사서함 감사 / 웹·WAF·EDR / 시스템·네트워크 기록');

const personal = () => section('personal-data','personal','03 / PERSONAL DATA INVESTIGATION','개인정보 유출 조사','접근할 수 있었던 자료와 실제 이용·전송 흔적을 구분해, 영향을 받은 대상과 확인 가능한 범위를 정리합니다.',`
  <div class="ira-chapter-layout"><figure class="ira-surface ira-scope-surface" aria-label="자료별 접근, 다운로드, 외부 전송의 근거 확보 상태를 대조하는 예시"><div class="ira-surface-bar"><span>DEFINE THE AFFECTED SCOPE</span>${example}</div>
    <table class="ira-scope-matrix"><caption class="ira-visually-hidden">자료 이용 단계별 기록 대조 예시</caption><thead><tr><th scope="col">조사 대상 자료</th><th scope="col">접근·열람</th><th scope="col">다운로드</th><th scope="col">외부 전송</th></tr></thead><tbody>
      <tr><th scope="row">고객 자료 폴더<small>파일 서버</small></th><td><span class="ira-status ira-record">기록 확보</span></td><td><span class="ira-status ira-record">기록 확보</span></td><td><span class="ira-status ira-review">추가 대조</span></td></tr>
      <tr><th scope="row">협업 문서<small>클라우드 저장소</small></th><td><span class="ira-status ira-record">기록 확보</span></td><td><span class="ira-status ira-review">추가 대조</span></td><td><span class="ira-status ira-unavailable">자료 미확보</span></td></tr>
      <tr><th scope="row">업무 PC 자료<small>로컬 저장장치</small></th><td><span class="ira-status ira-review">추가 대조</span></td><td><span class="ira-status ira-unavailable">해당 없음</span></td><td><span class="ira-status ira-review">추가 대조</span></td></tr>
    </tbody></table><div class="ira-scope-key"><span>${icon('user')} 계정 · 권한</span><span>${icon('file')} 자료 · 내용</span><span>${icon('clock')} 기간 · 행위</span><strong>서로 다른 기록을 교차 검증</strong></div>
  </figure>${points([['대상과 기간 특정','개인정보가 포함된 자료, 접근 계정·권한과 관련 기간을 확인합니다.'],['이용·반출 정황 검토','열람·다운로드·압축·메일·업로드·USB 기록을 비교합니다.'],['영향 범위와 근거 정리','확인된 대상, 추가 확인이 필요한 범위와 자료 한계를 구분합니다.']],'대상 자료 · 이용·전송 흔적 · 영향 범위')}</div>
  ${note('자료 미확보는 행위가 없었다는 의미가 아닙니다. USB 연결이나 해시 일치만으로 무단 반출을 확정하지 않습니다.')}
`,'활용 자료: 파일·DB 접근 기록 / 클라우드 감사 / 메일·DLP·전송 기록 / 저장장치 흔적');

const reports = () => section('reports','reports','FROM EVIDENCE TO FINDINGS','분석 결과와 판단 근거를,<br>한눈에 이해할 수 있는 보고서로.','사고 흐름, 확인된 사실과 분석 한계를 연결해 설명합니다. 확보 자료와 의뢰 범위에 맞춰 결과물을 구성합니다.',`
  <div class="ira-report-grid" aria-label="조사 보고서 구성 예시 · 가상 데이터">
    <article class="ira-report"><header><span>MDFC / 01</span>${icon('search')}</header><h3>핵심 결과 요약</h3><p class="ira-report-sub">사고 개요와 판단 범위</p><dl class="ira-finding-list"><div><dt>확인</dt><dd>원격 로그온·프로그램 실행·표본 파일 변화</dd></div><div><dt>검토</dt><dd>프로그램 실행과 파일 변화의 연관성</dd></div><div><dt>추가 확인</dt><dd>최초 침입 경로·전체 피해·외부 반출</dd></div></dl><footer>확인된 사실과 추정·미확인 구분</footer></article>
    <article class="ira-report"><header><span>MDFC / 02</span>${icon('clock')}</header><h3>행위 타임라인</h3><p class="ira-report-sub">시간·계정·기기별 기록 연결</p><ol class="ira-report-timeline"><li><time>11:11:08</time><div><strong>원격 로그온</strong><small>E01 · APP-02 / ops_admin</small></div></li><li><time>11:17:32</time><div><strong>의심 프로그램 실행</strong><small>E02 · 프로세스 활동</small></div></li><li><time>11:18:09</time><div><strong>변경 파일 생성</strong><small>E02 · 파일 활동</small></div></li></ol><footer>행위별 근거 자료를 함께 표시</footer></article>
    <article class="ira-report"><header><span>MDFC / 03</span>${icon('file')}</header><h3>증거 목록·검토 항목</h3><p class="ira-report-sub">분석 근거와 후속 확인 과제</p><div class="ira-evidence-list"><div><span>E01</span><strong>Windows Security<small>계정 · 접속지 · 로그온 유형</small></strong></div><div><span>E02</span><strong>Sysmon 활동 기록<small>프로그램 실행 · 파일 생성</small></strong></div><div><span>E03</span><strong>변경 파일·랜섬 노트<small>표본 파일의 내용 · 구조 비교</small></strong></div></div><footer>수집 이력과 분석 범위 정리</footer></article>
  </div><div class="ira-report-bottom"><span>보고서 구성 예시 · 가상 데이터</span><ol aria-label="진행 절차"><li><b>01</b> 상황 파악</li><li><b>02</b> 자료 확보</li><li><b>03</b> 분석·검증</li><li><b>04</b> 결과 설명</li></ol></div>
`,'분석 결과는 확보 가능한 로그·자료, 수집 설정과 보존 기간에 따라 달라집니다.');

export function incidentPreviewA(){
  return {
    name:'A · 증거 연결형',
    description:'밝은 배경에서 사고 유형별 기록과 분석 흐름을 도식화합니다. 핵심 조사 범위와 결과물을 나란히 보여주는 기술 중심 구성입니다.',
    heroGraphic:'<svg viewBox="0 0 700 700" fill="none" aria-hidden="true"><g stroke="currentColor" opacity=".3"><circle cx="350" cy="350" r="225"/><circle cx="350" cy="350" r="155" stroke-dasharray="3 13"/><path d="M350 25v650M25 350h650M120 120l460 460M120 580l460-460"/><rect x="290" y="290" width="120" height="120" rx="20"/><path d="m325 350 18 18 35-42" stroke-width="3"/></g><g fill="currentColor"><circle cx="350" cy="125" r="7"/><circle cx="125" cy="350" r="7"/><circle cx="509" cy="509" r="7"/><circle cx="575" cy="350" r="4"/></g></svg>',
    body:overview()+ransomware()+mail()+personal()+reports()
  };
}
