import {servicePages} from './service-details.mjs';

// Service scopes and examples follow the existing incident presentation and the
// supplied DDRC material. Synthetic records remain explicitly identified.
const esc=value=>String(value).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const icon=(name)=>{
 const paths={
  access:'<rect x="5" y="8" width="22" height="16" rx="2"/><path d="M11 8V5h10v3m-5 4v8m-4-4 4-4 4 4"/>',
  file:'<path d="M8 4h11l6 6v18H8zM19 4v7h6M12 16h9M12 21h7"/>',
  network:'<rect x="12" y="3" width="8" height="7" rx="1"/><rect x="3" y="23" width="8" height="6" rx="1"/><rect x="21" y="23" width="8" height="6" rx="1"/><path d="M16 10v7M7 23v-6h18v6"/>',
  shield:'<path d="m16 3 11 4v9c0 7-11 13-11 13S5 23 5 16V7zM11 16l4 4 7-8"/>',
  mail:'<rect x="3" y="7" width="26" height="19" rx="2"/><path d="m3 8 13 10L29 8"/>',
  search:'<circle cx="14" cy="14" r="9"/><path d="m21 21 8 8M10 14h8M14 10v8"/>'
 };
 return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.search}</svg>`;
};
const chips=items=>`<ul class="sci-sources" aria-label="분석 자료">${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const scopes=items=>`<ol class="sci-scope-list">${items.map(([name,copy],i)=>`<li><span>0${i+1}</span><div><h3>${name}</h3><p>${copy}</p></div></li>`).join('')}</ol>`;
const signal=(label,title,records,kind='shield')=>`<div class="sci-signal-panel"><div class="sci-panel-top"><span>${label}</span>${icon(kind)}</div><h3>${title}</h3><div class="sci-signal-records">${records.map(([a,b])=>`<div><span>${a}</span><strong>${b}</strong></div>`).join('')}</div></div>`;
const outputs=items=>`<div class="sci-output-line"><span>조사 결과</span><p>${items.join(' <b aria-hidden="true">·</b> ')}</p></div>`;
const timeline=items=>`<ol class="sci-timeline" aria-label="기록의 시간순 연결">${items.map(([time,title,type,record,copy],i)=>`<li><div class="sci-time"><span>0${i+1}</span><strong>${time}</strong></div><h3>${title}</h3><span class="sci-record-type">${type}</span><code>${esc(record)}</code><p>${copy}</p></li>`).join('')}</ol>`;
const note=copy=>`<p class="sci-note">${copy}</p>`;
const details=(title,body)=>`<details class="sci-more"><summary>${title}<span aria-hidden="true">+</span></summary><div class="sci-more-body">${body}</div></details>`;
const logs=items=>`<div class="sci-log-grid">${items.map(([title,content])=>`<article><h4>${title}</h4><pre><code>${esc(content)}</code></pre></article>`).join('')}</div>`;

const overviewBody=()=>`<div class="sci-overview-grid">
 <div class="sci-record-map"><span class="sci-panel-label">DIGITAL EVIDENCE</span><div class="sci-map-sources">${[['access','계정·접속'],['file','파일·실행'],['network','시스템·통신']].map(([i,t])=>`<div>${icon(i)}<strong>${t}</strong></div>`).join('')}</div><div class="sci-map-join" aria-hidden="true"><span></span><span></span><span></span></div><div class="sci-map-result">${icon('search')}<div><span>CORRELATION</span><strong>시간 · 계정 · 기기별 기록 연결</strong></div></div><p>하나의 탐지 결과에 여러 기록을 대조해 사고의 흐름을 살펴봅니다.</p></div>
 <div class="sci-overview-copy"><div class="sci-three-questions">${[['01','어떻게 시작됐나요?','유입 경로와 주요 행위'],['02','어디까지 영향을 받았나요?','관련 시스템·계정·자료'],['03','무엇을 먼저 확인해야 하나요?','확인된 사실과 후속 검토']].map(([n,t,c])=>`<article><span>${n}</span><div><h3>${t}</h3><p>${c}</p></div></article>`).join('')}</div><div class="sci-workflow" aria-label="진행 절차">${['상황 파악','자료 확보','사고 분석','결과 보고'].map((t,i)=>`<span><small>0${i+1}</small>${t}</span>`).join('')}</div></div>
</div>${note('발견 시점·증상과 현재까지 시행한 조치를 알려주시면, 보존 자료와 운영 영향을 고려해 조사 범위를 협의합니다.')}`;

const ransomwareBody=()=>`<div class="sci-service-grid">
 ${signal('RANSOMWARE INVESTIGATION','파일이 열리지 않고,<br>업무가 중단됐나요?',[
  ['발견 신호','파일 확장자 변경 · 랜섬 노트'],['영향 대상','PC · 업무 서버 · 공유 저장소'],['검토 자료','인증 · 실행 기록 · 변경 파일 · 백업']
 ])}
 <div>${scopes([
  ['유입·실행 경로','VPN·인증 기록과 의심 프로그램의 실행 흔적을 연결합니다.'],
  ['피해 범위','암호화된 기기·공유 저장소와 관련 계정, 확산 정황을 확인합니다.'],
  ['복구 조건','백업 상태와 복구 순서, 재감염 방지를 위해 확인할 항목을 검토합니다.']
 ])}${outputs(['사고 경위','영향 범위','복구 검토 항목'])}</div>
</div>`;

const ransomwareAnalysis=()=>`<div class="sci-example-label">분석 예시 · 가상 시나리오 <span>업무 서버의 확장자 변경과 랜섬 노트 발견</span></div>
 ${timeline([
  ['11:11:08 KST','원격 접속','Windows Security · 4624','ops_admin → APP-02','VPN 이력과 승인된 관리자 작업을 대조합니다.'],
  ['11:17:32 KST','의심 프로그램 실행','Sysmon · Process Create','services.exe → svc-update.exe','상위 프로세스와 실행 파일의 서명·해시를 확인합니다.'],
  ['11:18:09 KST','파일 변화 확인','Sysmon · File Create','spec.xlsx.locked','실제 파일 상태와 다른 서버의 동일 흔적을 검토합니다.']
 ])}
 ${note('파일 생성·확장자 변경만으로 암호화나 자료 유출을 확정하지 않습니다. 실행 기록, 실제 파일 상태와 전송 기록을 함께 확인합니다.')}
 ${details('접속·실행·파일 기록과 보고서 구성 예시',`
  <p class="sci-disclosure">설명용 합성 데이터입니다. 계정·경로·시각은 가상 예시이며 실제 사건의 원본 로그가 아닙니다.</p>
  ${logs([
   ['접속 기록',`Event ID       4624\nComputer       APP-02.example.test\nTargetUserName ops_admin\nLogonType      10\nIpAddress      10.20.1.34`],
   ['실행 기록',String.raw`Event ID       1 (Sysmon)
Image          C:\ProgramData\cache\svc-update.exe
ParentImage    C:\Windows\System32\services.exe
ProcessId      4820`],
   ['파일 활동',String.raw`Event ID       11 (Sysmon)
Image          C:\ProgramData\cache\svc-update.exe
TargetFilename D:\Share\spec.xlsx.locked
ProcessId      4820`]
  ])}
  <div class="sci-report-summary"><h4>조사 보고서에는 확인된 사실과 판단 범위를 구분합니다.</h4><dl><div><dt>확인</dt><dd>원격 로그온·프로그램 실행·표본 파일 12개의 내용 변경</dd></div><div><dt>검토</dt><dd>프로그램 실행과 파일 변경의 시간적 연관성</dd></div><div><dt>추가 확인</dt><dd>최초 침입 경로·다른 시스템의 피해·외부 자료 반출</dd></div></dl></div>
  <p>LogonType 10은 원격 대화형 로그온, Sysmon 11은 파일 생성·덮어쓰기 기록입니다. PID는 재사용될 수 있어 ProcessGuid 등으로 추가 대조합니다. 수집 기능이 활성화된 환경에서 해당 기록을 확보할 수 있습니다.</p>
 `)}`;

const malwareBody=()=>`<div class="sci-service-grid">
 ${signal('HACKING & MALWARE','탐지된 흔적을 넘어,<br>침입 경위까지 조사합니다.',[
  ['발견 신호','악성코드 탐지 · 비정상 접속'],['이상 징후','알 수 없는 계정 · 프로그램 · 서버 동작'],['검토 자료','의심 파일 · 메모리 · EDR · 네트워크 로그']
 ],'network')}
 <div>${scopes([
  ['악성 행위','파일 해시·서명과 실행 기록, 확보 가능한 메모리에서 비정상 동작을 확인합니다.'],
  ['침해 경로','계정·IP·호스트와 시각을 대조해 기기 사이의 활동을 추적합니다.'],
  ['잔존 위험','자동 실행·재접속 수단과 내부 확산, 외부 전송 정황을 살펴봅니다.']
 ])}${outputs(['침해 흔적','행위 타임라인','개선 권고안'])}</div>
</div>`;

const malwareAnalysis=()=>`<div class="sci-example-label">분석 방법 예시 <span>보안 탐지 결과와 시스템 활동을 함께 검토</span></div>
 <div class="sci-attack-map" aria-label="접근부터 영향 범위까지 분석 연결">${[
  ['ACCESS','계정 · 접속지','access','인증 · VPN · 방화벽','어떤 계정이 언제 접근했는가'],
  ['EXECUTION','파일 · 프로세스','file','서명 · 해시 · 실행 이력','어떤 실행과 변경이 있었는가'],
  ['IMPACT','자산 · 잔존 위험','shield','서비스 · 예약 작업 · 통신','다른 시스템에도 흔적이 있는가']
 ].map(([tag,t,i,records,q])=>`<article><span>${tag}</span>${icon(i)}<h3>${t}</h3><p>${q}</p><small>${records}</small></article>`).join('')}</div>
 ${note('탐지명이나 특정 파일 경로만으로 전체 공격 경위를 판단하지 않습니다. 정상 운영 기록과 비교해 확인 근거와 조사 범위를 정리합니다.')}
 ${details('분석 항목별 확인 자료 자세히 보기',`<div class="sci-detail-columns"><article><h4>파일과 실행 흔적</h4><p>생성 시점·서명·해시와 상위 프로세스, 실행 계정을 확인합니다. 확보 가능한 메모리·EDR 기록과 연결해 행위의 맥락을 검토합니다.</p></article><article><h4>통신과 내부 확산</h4><p>실행 시점의 외부 연결과 인증 기록을 비교합니다. 같은 파일·접속지·계정이 다른 기기에도 존재하는지 조사합니다.</p></article><article><h4>지속 실행·재접속</h4><p>계정·권한 변경과 서비스·예약 작업을 검토합니다. 정상 설정과 구분해 접근 제한이나 제거가 필요한 항목을 정리합니다.</p></article></div>`)}`;

const emailBody=()=>`<div class="sci-service-grid">
 ${signal('EMAIL & PERSONAL DATA','계정 도용과 자료 노출,<br>기록으로 확인합니다.',[
  ['발견 신호','의심 메일 · 로그인 알림 · 비정상 발송'],['설정 변화','외부 전달 규칙 · 권한 변경'],['검토 자료','원본 메일 · 감사 로그 · 자료 접근 기록']
 ],'mail')}
 <div>${scopes([
  ['계정 활동','메일 원문·헤더·URL과 로그인·인증 기록을 대조합니다.'],
  ['설정 변경','전달 규칙과 권한, 앱 동의 등 계정의 변화를 조사합니다.'],
  ['자료 노출 범위','조회·다운로드·전송 기록을 비교해 영향을 받은 자료를 검토합니다.']
 ])}${outputs(['주요 활동','노출 범위 검토','확인 한계'])}</div>
</div>`;

const emailAnalysis=()=>`<div class="sci-example-label">분석 예시 · 가상 시나리오 <span>위장 링크 접속 후 의심 로그인과 전달 규칙 발견</span></div>
 ${timeline([
  ['09:22:41 KST','로그인 확인','Microsoft Entra · Sign-in','finance@example.test','계정·IP·기기를 평소 사용 기록과 비교합니다.'],
  ['09:26:05 KST','전달 규칙 생성','Microsoft 365 · Audit','New-InboxRule / ForwardTo','같은 계정·IP의 설정 변경과 전달 대상을 연결합니다.'],
  ['FOLLOW-UP','실제 영향 검증','Message trace · Mailbox activity','메일 전달 · 접근 범위 대조','실제 전달 여부와 확인이 어려운 범위를 구분합니다.']
 ])}
 ${note('로그인 성공이나 전달 규칙 생성만으로 전체 메일의 열람·유출을 단정하지 않습니다. 실제 전달과 자료 접근 기록을 검증합니다.')}
 ${details('로그인·전달 기록과 개인정보 조사 범위 보기',`
  <p class="sci-disclosure">설명용 합성 데이터입니다. 아래 기록은 필드 일부를 발췌한 가상 예시입니다.</p>
  ${logs([
   ['로그인 기록',`createdDateTime    2026-06-03T00:22:41Z\nuserPrincipalName  finance@example.test\nipAddress          198.51.100.24\nstatus.errorCode   0`],
   ['사서함 감사',`CreationTime    2026-06-03T00:26:05Z\nOperation       New-InboxRule\nUserId          finance@example.test\nClientIP        198.51.100.24\nForwardTo       archive@review.example`]
  ])}
  <div class="sci-detail-columns"><article><h4>대상·권한 확인</h4><p>파일·폴더·사서함·클라우드의 접근 권한과 기간을 특정합니다.</p></article><article><h4>전송 흔적 대조</h4><p>파일 접근·압축, USB, 메일·업로드·DLP 기록을 교차 검토합니다.</p></article><article><h4>판단 근거 보완</h4><p>해시 등 내용 비교와 전송 방향, 행위자·업무상 승인 여부를 확인합니다.</p></article></div>
  <p>감사 기록은 라이선스·수집 설정·보존 기간에 따라 달라집니다. IP는 서비스 경유 주소일 수 있습니다. USB 연결이나 해시 일치만으로 무단 반출을 확정하지 않습니다.</p>
 `)}`;

const reportBody=()=>`<div class="sci-example-label">보고서 구성 예시 · 가상 데이터 <span>APP-02 · 관련 로그 · 변경 파일 표본 12개</span></div><div class="sci-report-grid">
 <article><header><span>01 · FINDINGS</span><h3>핵심 결과 요약</h3></header><dl class="sci-finding-rows"><div><dt>확인</dt><dd>원격 로그온·프로그램 실행·표본 파일의 내용 변경</dd></div><div><dt>검토</dt><dd>실행과 파일 변경의 시간적 연관성</dd></div><div><dt>미확인</dt><dd>최초 침입 경로·전체 피해·외부 반출</dd></div></dl><p>확인된 사실과 추가 검토 범위를 구분합니다.</p></article>
 <article><header><span>02 · TIMELINE</span><h3>행위 타임라인</h3></header><ol class="sci-mini-events"><li><time>11:11:08</time><span>원격 로그온 <small>E01 · 접속 기록</small></span></li><li><time>11:17:32</time><span>의심 프로그램 실행 <small>E02 · 실행 기록</small></span></li><li><time>11:18:09</time><span>변경 파일 생성 <small>E02 · 파일 기록</small></span></li></ol><p>시각·계정·기기를 연결하고 근거를 표시합니다.</p></article>
 <article><header><span>03 · EVIDENCE</span><h3>증거 목록</h3></header><dl class="sci-evidence-rows"><div><dt>E01</dt><dd>Windows Security <small>계정 · 접속지 · 로그온 유형</small></dd></div><div><dt>E02</dt><dd>Sysmon 활동 기록 <small>실행 파일 · 파일 생성</small></dd></div><div><dt>E03</dt><dd>변경 파일 · 랜섬 노트 <small>내용 · 구조 변화 · 표본 12개</small></dd></div></dl><p>자료 출처·수집 이력과 분석 근거를 정리합니다.</p></article>
 </div>${note('실제 사건 자료가 아닌 설명용 예시입니다. 표본 분석과 전체 피해 범위를 구분하며, 결과물은 확보 자료와 의뢰 범위에 따라 달라집니다.')}`;

const workflowBody=()=>`<ol class="sci-process" aria-label="침해사고 조사 진행 순서">${[
 ['access','상황 파악','발견 시점·증상과 영향받은 시스템 확인','조사 범위 · 우선순위'],
 ['file','자료 확보·조사','로그와 시스템 흔적을 보존하고 연결','보존 자료 · 사고 흐름'],
 ['shield','영향·대응 검토','침해 범위와 잔존 위험, 복구 조건 확인','조치 · 복구 검토'],
 ['search','결과 보고','사고 경위와 확인 한계, 개선 과제 설명','보고서 · 개선 권고']
 ].map(([i,t,c,o],n)=>`<li><div class="sci-process-node"><span>0${n+1}</span>${icon(i)}</div><h3>${t}</h3><p>${c}</p><small>${o}</small></li>`).join('')}</ol>
 <div class="sci-prepare"><span>상담 전 준비</span><p>발견 시점·증상 <b>·</b> 영향을 받은 업무와 대상 <b>·</b> 현재까지 시행한 조치 <b>·</b> 보유 로그·메일·백업</p></div>${note('보안 담당자·외부 운영사와 자료 제공 범위와 접근 방식, 역할을 협의합니다. 업무 영향과 증거 보존을 고려해 순서를 정합니다.')}`;

export function incidentChapterContent(){
 return {
  overview:{id:'overview',title:'침해사고 조사란?',eyebrow:'UNDERSTANDING INCIDENT INVESTIGATION',lead:'시스템·계정·로그에 남은 흔적을 분석해 사고 경위와 영향 범위를 확인하고, 대응을 검토할 근거를 정리합니다.',body:overviewBody()},
  groups:[
   {id:'ransomware',number:'01',title:'랜섬웨어 사고조사',pages:[
    {id:'ransomware',label:'서비스 개요',eyebrow:'01 · RANSOMWARE',title:'랜섬웨어 사고조사',lead:'암호화가 시작된 경위와 피해 범위를 조사하고, 업무 복구를 검토하는 데 필요한 정보를 정리합니다.',body:ransomwareBody(),overview:true},
    {id:'ransomware-analysis',label:'분석 예시',eyebrow:'01 · ANALYSIS EXAMPLE',title:'접속부터 파일 변화까지,<br>기록을 시간순으로 연결합니다.',lead:'의심 접속·프로그램 실행·파일 변화를 연결한 조사 흐름입니다.',body:ransomwareAnalysis()}
   ]},
   {id:'malware',number:'02',title:'해킹·악성코드 사고조사',pages:[
    {id:'malware',label:'서비스 개요',eyebrow:'02 · HACKING & MALWARE',title:'해킹·악성코드 사고조사',lead:'의심 파일과 시스템 활동을 함께 분석해 침입 흔적과 악성 행위, 남아 있는 위험을 확인합니다.',body:malwareBody(),overview:true},
    {id:'malware-analysis',label:'분석 예시',eyebrow:'02 · INVESTIGATION APPROACH',title:'파일·계정·통신의 연결에서,<br>침입 경로와 잔존 위험까지.',lead:'탐지된 파일의 특성에 시스템과 네트워크 활동을 연결합니다.',body:malwareAnalysis()}
   ]},
   {id:'personal-data',number:'03',title:'이메일·개인정보 사고조사',pages:[
    {id:'personal-data',label:'서비스 개요',eyebrow:'03 · EMAIL & PERSONAL DATA',title:'이메일·개인정보 사고조사',lead:'계정 활동과 자료 접근 기록을 분석해 비정상 접근의 경위와 정보 노출 가능성을 조사합니다.',body:emailBody(),overview:true},
    {id:'email-analysis',label:'분석 예시',eyebrow:'03 · ANALYSIS EXAMPLE',title:'의심 로그인 이후,<br>메일과 계정의 변화를 확인합니다.',lead:'피싱 유입부터 사서함 설정 변경, 실제 전달 여부를 대조하는 흐름입니다.',body:emailAnalysis()}
   ]}
  ],
  reports:{id:'analysis-deliverables',title:'조사 결과와 판단 근거를,<br>활용할 수 있는 보고서로.',eyebrow:'INVESTIGATION DELIVERABLES',lead:'핵심 결과 요약, 행위 타임라인과 증거 목록을 연결해 전달합니다.',body:reportBody()},
  workflow:{id:'process',title:'상황 파악부터 결과 보고까지,<br>진행 과정을 한눈에.',eyebrow:'HOW WE WORK',lead:'확보 가능한 자료와 의뢰 목적에 맞춰 조사 범위와 순서를 정합니다.',body:workflowBody()},
  faq:servicePages['incident-response'].faqs.map(([question,answer])=>({question,answer}))
 };
}
