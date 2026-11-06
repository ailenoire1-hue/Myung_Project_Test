// Investigation desk preview. Every displayed record is synthetic and explicitly labelled.
const icon=(name)=>{
 const paths={
  server:'<rect x="5" y="3" width="22" height="10" rx="2"/><rect x="5" y="19" width="22" height="10" rx="2"/><path d="M10 8h1m5 0h7M10 24h1m5 0h7M16 13v6"/>',
  mail:'<rect x="3" y="6" width="26" height="20" rx="2"/><path d="m4 8 12 10L28 8M4 25l8-9m16 9-8-9"/>',
  file:'<path d="M8 3h11l6 6v20H8zM19 3v7h6M12 16h9m-9 5h9"/>',
  shield:'<path d="m16 3 11 4v9c0 7-11 13-11 13S5 23 5 16V7zM11 16l4 4 7-8"/>',
  search:'<circle cx="14" cy="14" r="9"/><path d="m21 21 8 8M10 14h8m-4-4v8"/>',
  link:'<path d="m13 19 6-6m-7 10-3 3a6 6 0 0 1-8-8l6-6a6 6 0 0 1 8 0m2 8a6 6 0 0 0 8 0l6-6a6 6 0 0 0-8-8l-3 3"/>',
  lock:'<rect x="6" y="13" width="20" height="16" rx="2"/><path d="M10 13V8a6 6 0 0 1 12 0v5m-6 6v4"/>',
  account:'<circle cx="16" cy="10" r="6"/><path d="M5 29v-4a11 11 0 0 1 22 0v4"/>'
 };
 return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.file}</svg>`;
};
const section=(id,eyebrow,title,lead,body,caption)=>`<section class="ir-section irb-${id}" data-fr-screen data-fr-group="${id}" id="${id}"><div class="ir-frame"><header class="ir-heading"><p class="ir-eyebrow">${eyebrow}</p><h2>${title}</h2><p class="ir-lead">${lead}</p></header><div class="ir-content">${body}</div><footer class="ir-section-caption">${caption}</footer></div></section>`;
const badge=()=>'<span class="irb-example">분석 화면 예시 · 가상 데이터</span>';
const sources=items=>`<ul class="irb-sources" aria-label="주요 분석 자료">${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const scopes=items=>`<ol class="irb-scopes">${items.map(([t,c],i)=>`<li><span>0${i+1}</span><div><h3>${t}</h3><p>${c}</p></div></li>`).join('')}</ol>`;
const consoleTop=(label,right)=>`<div class="irb-console-top"><span><i aria-hidden="true"></i>${label}</span>${right||badge()}</div>`;
const note=copy=>`<p class="irb-boundary">${icon('search')}<span>${copy}</span></p>`;

const overview=()=>section('overview','INVESTIGATION DESK','사고의 원인과 범위, 기록을 연결해 확인합니다.','랜섬웨어 피해부터 계정 침해와 개인정보 유출까지. 사고 유형에 맞는 자료를 모아 분석 근거를 정리합니다.',`
 <div class="irb-overview-desk">
  <div class="irb-desk-map">${consoleTop('EVIDENCE CORRELATION','<span class="irb-method-label">조사 흐름</span>')}
   <div class="irb-map-body"><div class="irb-inputs">${[['server','시스템·실행'],['account','계정·접속'],['file','파일·전송']].map(([i,t])=>`<div>${icon(i)}<strong>${t}</strong></div>`).join('')}</div>
   <div class="irb-map-connector" aria-hidden="true"><span></span><span></span><span></span></div>
   <div class="irb-correlation">${icon('search')}<span>시간 · 계정 · 기기</span><strong>교차 분석</strong><small>여러 기록을 함께 대조</small></div>
   <div class="irb-map-output"><span>조사 결과</span><strong>사고 경위</strong><strong>영향 범위</strong><strong>확인 한계</strong></div></div>
  </div>
  <div class="irb-service-index">${[
   ['01','lock','랜섬웨어 사고조사','유입·실행 · 암호화 피해 · 복구 조건','#ransomware'],
   ['02','mail','메일·해킹 조사','계정 도용 · 사서함 변경 · 시스템 침입','#mail-hacking'],
   ['03','shield','개인정보 유출 조사','접근 · 다운로드 · 실제 반출 범위','#personal-data']
  ].map(([n,i,t,c,url])=>`<a href="${url}"><span class="irb-service-number">${n}</span>${icon(i)}<div><h3>${t}</h3><p>${c}</p></div><span class="irb-index-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
 </div>`, '발견된 증상에서 시작해, 검증 가능한 기록으로 조사합니다.');

const ransomware=()=>section('ransomware','01 / RANSOMWARE INVESTIGATION','랜섬웨어 사고조사','파일이 암호화된 경위와 영향받은 시스템을 조사하고, 업무 복구를 검토할 자료를 정리합니다.',`
 <div class="irb-analysis-grid">
  <div class="irb-console irb-ransom-console">${consoleTop('APP-02 / EVENT CORRELATION')}
   <div class="irb-event-head"><span>시각 · KST</span><span>확인 기록</span><span>연결 대상</span></div>
   <ol class="irb-event-rows">${[
    ['11:11:08','원격 로그온','Windows Security · 4624','ops_admin → APP-02','account'],
    ['11:17:32','의심 프로그램 실행','Sysmon · Process Create','services.exe → svc-update.exe','server'],
    ['11:18:09','변경 파일 생성','Sysmon · File Create','spec.xlsx.locked','lock']
   ].map(([time,t,log,record,i])=>`<li><time>${time}</time><div>${icon(i)}<span><strong>${t}</strong><small>${log}</small></span></div><code>${record}</code></li>`).join('')}</ol>
   <div class="irb-console-bottom"><span>다음 확인</span><p>실제 파일 상태 <b>＋</b> 다른 서버의 동일 흔적 <b>＋</b> 백업 상태</p></div>
  </div>
  <div class="irb-side-scope">${scopes([
   ['어디에서 시작됐는가','인증·VPN·실행 이력을 연결해 유입과 실행 경위를 검토합니다.'],
   ['어디까지 영향을 받았는가','기기·계정·공유 저장소의 동일 흔적을 대조합니다.'],
   ['복구에 무엇이 필요한가','백업 상태와 복구 순서, 재감염 위험을 검토합니다.']
  ])}${sources(['인증·VPN','실행·파일 기록','백업'])}</div>
 </div>${note('확장자 변경만으로 암호화나 자료 유출을 단정하지 않습니다. 실제 파일 상태와 전송 기록을 함께 확인합니다.')}`, '접속 → 실행 → 파일 변화. 서로 다른 기록을 하나의 사고 흐름으로 연결합니다.');

const mail=()=>section('mail-hacking','02 / EMAIL & HACKING INVESTIGATION','메일·해킹 조사','의심 메일·계정 도용과 시스템 침입을 조사합니다. 접근 경위부터 설정 변경, 남은 위험까지 함께 확인합니다.',`
 <div class="irb-investigation-tabs" data-ir-tabs>
  <div class="irb-tab-head"><div role="tablist" aria-label="메일·해킹 조사 분야"><button type="button" data-ir-tab="irb-mail-records" role="tab" aria-selected="true" aria-controls="irb-mail-records">${icon('mail')}메일·계정 침해</button><button type="button" data-ir-tab="irb-server-records" role="tab" aria-selected="false" aria-controls="irb-server-records">${icon('server')}시스템·서버 침입</button></div>${badge()}</div>
  <div id="irb-mail-records" data-ir-panel="irb-mail-records" role="tabpanel">
   <div class="irb-mail-grid"><div class="irb-mail-log"><span class="irb-small-label">ACCOUNT / finance@example.test</span><div class="irb-mail-chain">${[
    ['09:22:41','로그인 성공','Sign-in','계정 · IP · 접속 기기'],
    ['09:26:05','전달 규칙 생성','New-InboxRule','규칙 · 변경 계정 · 전달 대상'],
    ['후속 확인','실제 전달 검증','Message trace','전달 결과 · 대상 메일']
   ].map(([time,t,log,c],i)=>`<article><span class="irb-chain-n">0${i+1}</span><time>${time}</time><h3>${t}</h3><code>${log}</code><small>${c}</small></article>`).join('')}</div></div>
   <aside class="irb-side-checks"><span>함께 확인하는 자료</span><p>${icon('mail')}원본 메일·헤더·링크</p><p>${icon('account')}로그인·사서함 감사</p><p>${icon('shield')}권한·앱 동의 변경</p><strong>규칙 생성과 실제 메일 전달을 구분합니다.</strong></aside></div>
  </div>
  <div id="irb-server-records" data-ir-panel="irb-server-records" role="tabpanel" hidden>
   <div class="irb-server-chain">${[
    ['ACCESS','계정·접속','account','인증 · VPN · 방화벽','의심 접속과 정상 작업 대조'],
    ['EXECUTION','파일·실행','server','EDR · 실행 이력 · 메모리','상위 프로세스와 실행 행위 연결'],
    ['PERSISTENCE','지속 실행·재접속','shield','서비스 · 예약 작업 · 권한','다른 기기의 동일 흔적 확인']
   ].map(([tag,t,i,log,c])=>`<article><span>${tag}</span>${icon(i)}<h3>${t}</h3><code>${log}</code><p>${c}</p></article>`).join('')}</div>
  </div>
 </div>${note('로그인 성공이나 전달 규칙만으로 전체 메일 유출을 판단하지 않습니다. 시스템 침입도 탐지 기록과 정상 운영 활동을 대조합니다.')}`, '메일·계정과 시스템을 함께 살펴 침해 경위와 잔존 위험을 조사합니다.');

const personal=()=>section('personal-data','03 / PERSONAL DATA INVESTIGATION','개인정보 유출 조사','접근할 수 있었던 자료와 실제 조회·다운로드·전송 흔적을 구분해, 영향받은 정보와 확인 범위를 정리합니다.',`
 <div class="irb-privacy-grid"><div class="irb-console irb-privacy-console">${consoleTop('DATA ACCESS / EXPOSURE REVIEW')}
  <div class="irb-data-route">${[['account','접근 권한','계정·기간'],['file','조회·다운로드','감사 기록'],['link','외부 전송','메일·업로드']].map(([i,t,c],n)=>`<div><span class="irb-route-n">0${n+1}</span>${icon(i)}<strong>${t}</strong><small>${c}</small></div>`).join('')}</div>
  <div class="irb-scope-matrix"><div class="irb-matrix-heading"><span>검토 항목</span><span>예시 자료</span><span>판단 단계</span></div><div><strong>자료 접근</strong><code>customer_sample.csv</code><span class="irb-status">접근 기록 확보</span></div><div><strong>다운로드</strong><code>Download / user-01</code><span class="irb-status">내용 대조</span></div><div><strong>외부 반출</strong><code>Transfer / destination</code><span class="irb-status irb-status-review">추가 검증</span></div></div>
 </div><div class="irb-side-scope">${scopes([
  ['대상 자료를 특정합니다','파일·사서함·클라우드의 권한, 접근 기간과 자료를 확인합니다.'],
  ['기록과 내용을 대조합니다','조회·다운로드·압축·전송과 확보된 사본을 함께 검토합니다.'],
  ['확인된 범위를 구분합니다','실제 반출, 노출 가능성과 기록 부족 구간을 나눠 정리합니다.']
 ])}${sources(['접근·감사','DLP·전송','파일·사본'])}</div></div>
 ${note('USB 연결이나 파일 해시 일치만으로 무단 반출을 확정하지 않습니다. 행위자·전송 방향·업무상 승인 여부를 함께 확인합니다.')}`, '접근 가능성, 자료 이용, 실제 반출은 서로 다른 확인 항목입니다.');

const reports=()=>section('reports','INVESTIGATION DELIVERABLES','판단 근거가 보이는 조사 보고서','핵심 결과와 사건의 흐름, 근거 자료를 연결합니다. 확인된 사실과 추가 검토 범위를 명확히 구분해 설명합니다.',`
 <div class="irb-report-desk">${consoleTop('INVESTIGATION REPORT / PREVIEW')}
  <div class="irb-report-pages">
   <article class="irb-report-page"><header><span>01 / FINDINGS</span><h3>핵심 결과 요약</h3></header><dl class="irb-findings"><div><dt>확인</dt><dd>원격 로그온·프로그램 실행<br>표본 파일의 내용 변경</dd></div><div><dt>검토</dt><dd>실행과 파일 변화의<br>시간적 연관성</dd></div><div><dt>미확인</dt><dd>최초 침입 경로·전체 피해<br>외부 자료 반출</dd></div></dl></article>
   <article class="irb-report-page"><header><span>02 / TIMELINE</span><h3>행위 타임라인</h3></header><ol class="irb-report-timeline"><li><time>11:11:08</time><div><strong>원격 로그온</strong><small>E01 / 인증 기록</small></div></li><li><time>11:17:32</time><div><strong>의심 프로그램 실행</strong><small>E02 / 실행 기록</small></div></li><li><time>11:18:09</time><div><strong>변경 파일 생성</strong><small>E03 / 파일 기록</small></div></li></ol></article>
   <article class="irb-report-page"><header><span>03 / EVIDENCE</span><h3>분석 근거 목록</h3></header><ul class="irb-evidence-list"><li>${icon('account')}<div><strong>E01 · 접속 기록</strong><small>계정 · 접속지 · 로그온 유형</small></div></li><li>${icon('server')}<div><strong>E02 · 실행 기록</strong><small>상위 프로세스 · 실행 시각</small></div></li><li>${icon('file')}<div><strong>E03 · 변경 파일</strong><small>파일 상태 · 분석 표본</small></div></li></ul></article>
  </div>
 </div>${note('화면은 실제 사건 자료가 아닌 설명용 예시입니다. 보고서 범위와 결론은 확보 자료·의뢰 목적에 따라 달라집니다.')}`, '결과 요약 · 행위 타임라인 · 분석 근거. 보고서와 함께 결과를 설명합니다.');

export function incidentPreviewB(){
 return {name:'B · 조사 콘솔',description:'로그와 연결도를 중심으로 사고 분석 과정을 보여주는 네이비 조사 데스크',heroGraphic:`<svg viewBox="0 0 900 720" fill="none" aria-hidden="true"><g stroke="#59b4c7" stroke-width="1" opacity=".5"><rect x="130" y="80" width="640" height="480" rx="4"/><path d="M130 130h640M330 130v430M130 440h640M180 180h100m-100 30h80m-80 30h120m-120 30h90m-90 30h110M390 350l80-80 110 45 115-125"/><circle cx="470" cy="270" r="7"/><circle cx="580" cy="315" r="7"/><circle cx="695" cy="190" r="7"/><path d="M390 400h310M390 475h200m-200 30h285m-285 30h180"/><rect x="440" y="600" width="280" height="45"/><path d="M580 560v40M130 645h260V560"/></g><g fill="#c88a62"><circle cx="155" cy="105" r="4"/><circle cx="470" cy="270" r="3"/><circle cx="695" cy="190" r="3"/></g></svg>`,body:[overview(),ransomware(),mail(),personal(),reports()].join('\n')};
}
