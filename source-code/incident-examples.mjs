// Detailed investigation examples adapted from the supplied DDRC introduction.
// Its case narratives and log records are explicitly fictional/synthetic.
const escapeHtml=value=>String(value).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const timeline=items=>`<ol class="ir-evidence-timeline">${items.map(([time,title,record,analysis],i)=>`<li><span class="ir-evidence-step">0${i+1}</span><span class="ir-evidence-time">${time}</span><h4>${title}</h4><div class="ir-evidence-record">${record}</div><p>${analysis}</p></li>`).join('')}</ol>`;
const chips=items=>`<ul class="ir-evidence-sources" aria-label="분석에 활용하는 자료">${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const logDetails=(title,items,note)=>`<details class="ir-log-details"><summary>${title}<span aria-hidden="true">+</span></summary><div class="ir-log-content"><p class="ir-example-disclosure">설명용 합성 데이터 · 시각·계정·경로는 예시이며 실제 사건의 원본 로그가 아닙니다.</p><div class="ir-log-grid">${items.map(([name,log])=>`<div><h4>${name}</h4><pre><code>${escapeHtml(log)}</code></pre></div>`).join('')}</div><p class="ir-log-note">${note}</p></div></details>`;

export function incidentExample(id){
 if(id==='ransomware')return `<div class="ir-example" id="ransomware-analysis" aria-labelledby="ransomware-example-title">
  <header class="ir-example-heading"><div><span class="ir-example-kicker">ANALYSIS EXAMPLE 01</span><h3 id="ransomware-example-title">열리지 않는 업무 파일,<br>어디서 시작됐고 어디까지 영향을 받았을까요?</h3></div><span class="ir-example-badge">분석 예시 · 가상 시나리오</span></header>
  <p class="ir-example-context">제조기업의 업무 서버와 공유 폴더에서 파일 확장자가 바뀌고 랜섬 노트가 발견된 상황입니다. 원격 접속부터 프로그램 실행, 파일 변화까지 시간순으로 연결해 조사합니다.</p>
  ${chips(['VPN·인증 기록','Windows·EDR 로그','의심 파일·변형 파일','공유 저장소·백업'])}
  ${timeline([
   ['11:11:08 <small>KST</small>','원격 접속의 시작','<span>Windows Security · 4624</span><strong>ops_admin → APP-02</strong>','원격 로그온 계정과 접속지를 확인하고, VPN 이력·승인된 관리자 작업과 대조합니다.'],
   ['11:17:32 <small>KST</small>','의심 프로그램 실행','<span>Sysmon · Process Create</span><strong>services.exe → svc-update.exe</strong>','상위 프로세스와 실행 파일의 서명·해시를 확인해 정상 작업인지 분석합니다.'],
   ['11:18:09 <small>KST</small>','파일 변화와의 연결','<span>Sysmon · File Create</span><strong>spec.xlsx.locked</strong>','같은 실행 파일의 활동과 파일 변형을 연결하고, 다른 서버의 동일 흔적도 살펴봅니다.']
  ])}
  <p class="ir-analysis-boundary"><strong>분석 포인트</strong> 확장자 변경이나 파일 생성 기록만으로 암호화·자료 유출을 확정하지 않습니다. 실제 파일 상태와 전송 기록을 함께 확인합니다.</p>
  ${logDetails('접속·실행·파일 변화의 로그 예시 보기',[
   ['01 · 원격 로그온',String.raw`Event ID       4624
TimeCreated    2026-05-14T02:11:08Z
Computer       APP-02.example.test
TargetUserName ops_admin
LogonType      10
IpAddress      10.20.1.34`],
   ['02 · 프로세스 실행',String.raw`Event ID       1 (Sysmon)
UtcTime        2026-05-14 02:17:32.081
ProcessId      4820
Image          C:\ProgramData\cache\svc-update.exe
ParentImage    C:\Windows\System32\services.exe`],
   ['03 · 파일 생성',String.raw`Event ID       11 (Sysmon)
UtcTime        2026-05-14 02:18:09.420
ProcessId      4820
Image          C:\ProgramData\cache\svc-update.exe
TargetFilename D:\Share\spec.xlsx.locked`]
  ],'로그 시각은 UTC, 위 타임라인은 한국 시간(KST)입니다. LogonType 10은 원격 대화형 로그온이며, Sysmon 11은 파일 생성·덮어쓰기 기록입니다. PID는 재사용될 수 있어 ProcessGuid 등으로 추가 대조합니다. Sysmon 기록은 해당 수집 기능이 활성화된 환경에서 확보할 수 있습니다.')}
 </div>`;
 if(id==='malware')return `<div class="ir-example ir-example-method" id="malware-analysis" aria-labelledby="malware-example-title">
  <header class="ir-example-heading"><div><span class="ir-example-kicker">INVESTIGATION APPROACH</span><h3 id="malware-example-title">악성코드 탐지 이후,<br>침입 경로와 남아 있는 위험까지 확인합니다.</h3></div><span class="ir-example-badge">분석 방법 예시</span></header>
  <p class="ir-example-context">보안 제품에서 의심 파일을 탐지했거나 서버에 알 수 없는 접속·실행 흔적이 발견된 경우, 파일 자체의 특성과 시스템에서 일어난 활동을 함께 분석합니다.</p>
  ${chips(['PC·서버·메모리','의심 파일·프로세스','VPN·방화벽·EDR','계정·인증 로그'])}
  <div class="ir-investigation-map" aria-label="분석 연결 흐름"><div><span>ACCESS</span><strong>계정 · 접속지</strong><small>언제, 어떤 경로로 접근했는가</small></div><span class="ir-map-arrow" aria-hidden="true">→</span><div><span>EXECUTION</span><strong>실행 파일 · 프로세스</strong><small>어떤 행위와 변경이 있었는가</small></div><span class="ir-map-arrow" aria-hidden="true">→</span><div><span>IMPACT</span><strong>연결된 자산 · 자료</strong><small>다른 시스템에도 흔적이 있는가</small></div></div>
  <div class="ir-investigation-checks">
   <div><span>01</span><h4>파일과 실행 흔적 대조</h4><p>파일 해시·서명·생성 시점과 상위 프로세스, 실행 계정을 확인합니다. 확보 가능한 메모리·EDR 기록과 연결해 의심 행위의 맥락을 살펴봅니다.</p><small>확인 자료: 파일 정보 · 실행 이력 · 프로세스 관계</small></div>
   <div><span>02</span><h4>통신과 내부 확산 검토</h4><p>실행 시점의 외부 연결과 인증 기록을 비교하고, 같은 파일·접속지·계정의 흔적이 다른 기기에도 존재하는지 조사합니다.</p><small>확인 자료: 방화벽 · VPN · 네트워크 · 인증 기록</small></div>
   <div><span>03</span><h4>재접속과 지속 실행 흔적 확인</h4><p>계정·권한 변경과 서비스·예약 작업 등 자동 실행 항목을 검토합니다. 정상 운영 설정과 구분해 제거·접근 제한이 필요한 항목을 정리합니다.</p><small>확인 자료: 서비스 · 예약 작업 · 계정·권한 변경</small></div>
  </div>
  <p class="ir-analysis-boundary"><strong>분석 포인트</strong> 탐지명이나 특정 파일 경로만으로 공격 경위 전체를 판단하지 않습니다. 계정·호스트·시각을 연결하고, 정상 운영 기록과 비교해 조사 범위를 좁힙니다.</p>
 </div>`;
 return `<div class="ir-example" id="email-analysis" aria-labelledby="email-example-title">
  <header class="ir-example-heading"><div><span class="ir-example-kicker">ANALYSIS EXAMPLE 02</span><h3 id="email-example-title">거래처를 사칭한 메일 이후,<br>계정과 업무메일에 어떤 변화가 생겼을까요?</h3></div><span class="ir-example-badge">분석 예시 · 가상 시나리오</span></header>
  <p class="ir-example-context">재무 담당자가 공유 문서로 위장한 링크에서 로그인을 시도한 뒤, 비정상 로그인 알림과 외부 자동 전달 규칙을 발견한 상황입니다. 피싱 유입부터 사서함 변경, 실제 전달 여부를 확인합니다.</p>
  ${chips(['원본 메일·헤더·URL','브라우저 방문 기록','로그인·사서함 감사','메일 추적·자료 접근'])}
  ${timeline([
   ['09:22:41 <small>KST</small>','계정 로그인 확인','<span>Microsoft Entra · Sign-in</span><strong>finance@example.test</strong>','로그인 계정·IP·기기를 평소 사용 기록과 비교하고, 사용자에게 승인된 접속인지 확인합니다.'],
   ['09:26:05 <small>KST</small>','외부 전달 규칙 생성','<span>Microsoft 365 · Audit</span><strong>New-InboxRule / ForwardTo</strong>','같은 계정·IP의 규칙 생성과 전달 대상을 연결하고, 권한·앱 동의 등 다른 변경도 확인합니다.'],
   ['후속 검증','메일 영향 범위 조사','<span>Message trace · Mailbox activity</span><strong>실제 전달 · 접근 범위 확인</strong>','메일 추적과 확보 가능한 사서함 활동을 대조해 영향을 받은 메일과 확인이 어려운 범위를 정리합니다.']
  ])}
  <p class="ir-analysis-boundary"><strong>분석 포인트</strong> 로그인 성공이나 전달 규칙 생성만으로 전체 메일의 열람·유출을 단정하지 않습니다. 원본 메일·링크 방문·인증 시점을 함께 확인하고 실제 전달 기록을 검증합니다.</p>
  ${logDetails('로그인·전달 규칙의 기록 예시 보기',[
   ['01 · 로그인 기록 발췌',`{
  "createdDateTime": "2026-06-03T00:22:41Z",
  "userPrincipalName": "finance@example.test",
  "ipAddress": "198.51.100.24",
  "status": { "errorCode": 0 }
}`],
   ['02 · 사서함 감사 기록 발췌',`{
  "CreationTime": "2026-06-03T00:26:05Z",
  "Operation": "New-InboxRule",
  "UserId": "finance@example.test",
  "ClientIP": "198.51.100.24",
  "ResultStatus": "True",
  "Parameters": [{ "Name": "ForwardTo",
    "Value": "archive@review.example" }]
}`]
  ],'필드 일부를 발췌한 설명용 데이터입니다. 감사 기록은 서비스의 라이선스·수집 설정·보존 기간에 따라 달라지며, IP는 서비스 경유 주소일 수 있어 실제 사용자를 확인하는 데 다른 기록도 필요합니다.')}
  <details class="ir-log-details ir-data-scope"><summary>개인정보·업무자료의 유출 범위는 어떻게 확인하나요?<span aria-hidden="true">+</span></summary><div class="ir-data-content"><p>의심 계정이 접근할 수 있었던 자료를 특정하고, 열람·다운로드·전송 기록을 대조합니다. 자료 접근 가능성과 실제 반출 여부를 구분해 설명합니다.</p><dl><div><dt>대상 자료와 접근 권한</dt><dd>관련 파일·폴더·사서함·클라우드의 권한과 접근 기간을 확인합니다.</dd></div><div><dt>파일과 전송 흔적</dt><dd>파일 접근·압축 흔적, USB 연결, 메일·업로드·DLP 기록을 교차 검토합니다.</dd></div><div><dt>내용 대조와 판단 근거</dt><dd>확보된 사본과 원본의 해시 등을 비교하고, 전송 방향·행위자·업무상 승인 여부를 보완 확인합니다.</dd></div></dl><p class="ir-log-note">USB 연결이나 파일 해시 일치만으로 무단 반출을 확정하지 않습니다. 확보 가능한 자료와 조사 목적에 따라 분석 범위를 정합니다.</p></div></details>
 </div>`;
}
