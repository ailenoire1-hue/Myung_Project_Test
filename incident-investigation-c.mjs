// C: an editorial investigation casebook. All illustrated records are synthetic.
const icon = name => {
 const paths={
  lock:'<rect x="7" y="13" width="18" height="15" rx="2"/><path d="M11 13V9a5 5 0 0 1 10 0v4m-5 6v4"/>',
  mail:'<rect x="3" y="7" width="26" height="19" rx="2"/><path d="m4 9 12 9L28 9"/>',
  data:'<ellipse cx="16" cy="7" rx="10" ry="4"/><path d="M6 7v18c0 5 20 5 20 0V7M6 16c0 5 20 5 20 0"/>',
  file:'<path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6"/>',
  key:'<circle cx="11" cy="12" r="7"/><path d="m16 17 12 12m-7-7 4-4m-8 0 4-4"/>',
  network:'<rect x="11" y="3" width="10" height="8" rx="1"/><rect x="2" y="23" width="10" height="7" rx="1"/><rect x="20" y="23" width="10" height="7" rx="1"/><path d="M16 11v6M7 23v-6h18v6"/>',
  report:'<path d="M6 3h20v26H6zM11 9h10M11 14h10M11 19h5M11 24h10"/>'
 };
 return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.file}</svg>`;
};
const section=(id,kicker,title,lead,body,caption)=>`<section class="ir-section irc-${id}" data-fr-screen data-fr-group="${id}" id="${id}"><div class="ir-frame"><header class="ir-heading"><p class="ir-eyebrow">${kicker}</p><h2>${title}</h2><p class="ir-lead">${lead}</p></header><div class="ir-content">${body}</div><footer class="ir-section-caption">${caption}</footer></div></section>`;
const scopes=rows=>`<ol class="irc-scope">${rows.map(([title,copy],i)=>`<li><span>0${i+1}</span><div><h4>${title}</h4><p>${copy}</p></div></li>`).join('')}</ol>`;
const question=(n,title,rows,result)=>`<aside class="irc-question"><div class="irc-question-label"><span>CASE ${n}</span><i aria-hidden="true"></i>고객의 질문</div><h3>${title}</h3>${scopes(rows)}<div class="irc-output"><span>제공 결과</span><strong>${result}</strong></div></aside>`;
const paperHead=(number,title)=>`<header class="irc-paper-head"><div><span>INVESTIGATION FILE ${number}</span><h3>${title}</h3></div><span class="irc-paper-stamp">예시</span></header><p class="irc-example">조사 사례 설명용 · 가상 시나리오</p>`;
const smallNote=copy=>`<p class="irc-paper-note">${copy}</p>`;

const overview=()=>section('overview','INVESTIGATION CASEBOOK','사고 유형은 달라도, 확인할 근거는 구체적으로.','랜섬웨어 피해, 메일·시스템 침입, 개인정보 노출을 나누어 조사합니다.',`
 <div class="irc-index-grid">
 ${[
  ['01','lock','랜섬웨어 사고조사','열리지 않는 파일.<br>멈춰 버린 업무.','암호화 경위와 피해 범위를 조사합니다.',['원격 접속','악성 실행','파일 변화'],'ransomware'],
  ['02','mail','메일·해킹 조사','낯선 로그인.<br>알 수 없는 시스템 활동.','계정 도용과 침입 흔적을 연결합니다.',['메일 원문','계정 감사','서버·통신'],'mail-hacking'],
  ['03','data','개인정보 유출 조사','외부로 나간 자료.<br>어디까지 확인할 수 있을까.','접근 기록과 실제 전송을 구분합니다.',['열람·조회','다운로드','전송 기록'],'personal-data']
 ].map(([n,i,t,q,c,tags,id])=>`<a class="irc-index-card" href="#${id}"><header><span>${n}</span>${icon(i)}</header><p class="irc-index-question">${q}</p><h3>${t}</h3><p class="irc-index-copy">${c}</p><div class="irc-index-sources">${tags.map(x=>`<span>${x}</span>`).join('')}</div><footer><span>조사 내용 살펴보기</span><b aria-hidden="true">↗</b></footer></a>`).join('')}
 </div>`, '확보 가능한 기록과 의뢰 목적을 바탕으로 조사 범위를 함께 정합니다.');

const ransomware=()=>section('ransomware','01 / RANSOMWARE','랜섬웨어 사고조사','유입·실행 경로와 암호화 피해를 조사하고, 업무 복구에 필요한 확인 사항을 정리합니다.',`
 <div class="irc-layout">
 ${question('01','암호화는 어디서 시작되고,<br>어디까지 영향을 줬을까요?',[
  ['유입·실행 경로','인증·VPN 기록과 프로그램 실행 흔적 대조'],
  ['영향받은 시스템','변형 파일·공유 폴더·관련 계정 확인'],
  ['복구 검토','백업 상태·잔존 위험·업무 우선순위 정리']
 ],'사고 타임라인 · 피해 범위 · 복구 검토 항목')}
 <article class="irc-paper irc-ransom-paper">
  ${paperHead('01','원격 접속부터 파일 변형까지')}
  <div class="irc-ransom-evidence"><div class="irc-chronology">
   <div><time>11:11:08</time><span class="irc-event-dot"></span><section><h4>원격 로그온</h4><code>ops_admin → APP-02</code><small>인증 로그 · 4624</small></section></div>
   <div><time>11:17:32</time><span class="irc-event-dot"></span><section><h4>의심 프로그램 실행</h4><code>svc-update.exe</code><small>프로세스 생성 기록</small></section></div>
   <div><time>11:18:09</time><span class="irc-event-dot"></span><section><h4>파일 변화 확인</h4><code>spec.xlsx.locked</code><small>파일 기록 + 실제 내용 대조</small></section></div>
  </div><div class="irc-file-samples"><span>파일 표본 확인</span><div class="irc-file-grid">${['SPEC','PLAN','ORDER','STOCK','REPORT','IMAGE'].map((name,i)=>`<div class="${i<4?'irc-altered':''}">${icon('file')}<small>${name}</small><b>${i<4?'변형':'대조'}</b></div>`).join('')}</div><p><i></i>변형 파일과 비교 자료를 구분</p></div></div>
  ${smallNote('파일 확장자 변경만으로 암호화나 유출을 단정하지 않고 실제 파일·실행·전송 기록을 함께 검토합니다.')}
 </article></div>`, '분석 자료: 인증·VPN · Windows·EDR · 변경 파일·랜섬 노트 · 백업');

const mail=()=>section('mail-hacking','02 / EMAIL & HACKING','메일·해킹 조사','피싱 메일과 계정 도용부터 서버 침입·악성 실행까지, 관련 기록을 연결해 사고 경위를 확인합니다.',`
 <div class="irc-layout">
 ${question('02','계정에 접근한 뒤,<br>어떤 변경과 실행이 있었을까요?',[
  ['메일 유입·계정 도용','원본 헤더·URL과 로그인·인증 기록 연결'],
  ['설정 변경·서버 침입','메일 전달 규칙·권한·프로세스·통신 확인'],
  ['실제 영향·잔존 흔적','메일 전송·내부 확산·지속 실행 항목 검토']
 ],'침입 경위 · 계정 활동 · 영향 범위')}
 <article class="irc-paper irc-mail-paper">
  ${paperHead('02','메일과 계정 활동의 교차 확인')}
  <div class="irc-message"><div class="irc-message-icon">${icon('mail')}</div><dl><div><dt>From</dt><dd>문서 검토 &lt;notice@review.example&gt;</dd></div><div><dt>Subject</dt><dd>공유 문서를 확인해 주세요</dd></div><div><dt>URL</dt><dd>signin.review.example/document</dd></div></dl><span>원문 보존</span></div>
  <div class="irc-account-flow">
   <section>${icon('key')}<span>09:22:41</span><h4>계정 로그인</h4><code>198.51.100.24</code><p>평소 접속·기기와 대조</p></section><b aria-hidden="true">→</b>
   <section>${icon('mail')}<span>09:26:05</span><h4>외부 전달 규칙</h4><code>New-InboxRule</code><p>전달 대상·생성 계정 확인</p></section><b aria-hidden="true">→</b>
   <section>${icon('network')}<span>후속 검증</span><h4>영향 범위 확인</h4><code>Message trace</code><p>실제 전송·접근 기록 검토</p></section>
  </div>
  ${smallNote('로그인이나 전달 규칙 생성만으로 전체 메일 유출을 확정하지 않습니다. 서버 침입은 실행·통신·계정 기록을 별도로 대조합니다.')}
 </article></div>`, '분석 자료: 원본 메일·헤더 · 인증·감사 로그 · 서버·EDR · 네트워크');

const personal=()=>section('personal-data','03 / PERSONAL DATA','개인정보 유출 조사','누가 어떤 자료에 접근했고, 실제로 외부로 전달됐는지 근거별로 범위를 확인합니다.',`
 <div class="irc-layout">
 ${question('03','접근 가능한 자료와,<br>실제 반출된 자료는 다릅니다.',[
  ['대상·접근 범위','자료 유형·권한·관련 계정·조회 기간 특정'],
  ['반출 행위 대조','조회·다운로드·압축·전송 기록 연결'],
  ['확인된 범위 정리','기록으로 확인된 사실과 미확인 영역 구분']
 ],'관련 자료 목록 · 행위 근거 · 확인 한계')}
 <article class="irc-paper irc-data-paper">
  ${paperHead('03','노출 범위를 근거별로 분리합니다')}
  <div class="irc-evidence-table" role="table" aria-label="가상 자료별 확인 기록"><div role="row" class="irc-table-head"><span role="columnheader">대상 자료</span><span role="columnheader">조회</span><span role="columnheader">다운로드</span><span role="columnheader">외부 전송</span></div>
   ${[['고객 명단.csv','확인','확인','검토'],['상담 기록.xlsx','확인','미확인','미확인'],['계약 문서.zip','확인','확인','확인']].map(([n,...states])=>`<div role="row"><span role="cell">${icon('file')}${n}</span>${states.map(s=>`<span role="cell"><b class="irc-state irc-state-${s==='확인'?'yes':s==='검토'?'review':'unknown'}">${s}</b></span>`).join('')}</div>`).join('')}
  </div>
  <div class="irc-evidence-keys"><section><span>E01</span><div><h4>접근 근거</h4><p>DB·파일 접근 기록</p></div></section><section><span>E02</span><div><h4>반출 근거</h4><p>DLP·메일·업로드</p></div></section><section><span>E03</span><div><h4>내용 대조</h4><p>확보 자료·해시 비교</p></div></section></div>
  ${smallNote('미확인은 해당 기록만으로 판단하기 어렵다는 뜻입니다. USB 연결이나 자료 접근 권한만으로 무단 반출을 확정하지 않습니다.')}
 </article></div>`, '분석 자료: DB·파일 접근 · 다운로드·메일 · DLP·클라우드 · 관련 자료 사본');

const reports=()=>section('reports','DELIVERABLES / 결과물','판단에 필요한 내용을, 읽을 수 있는 보고서로.','핵심 결과·행위 타임라인·증거 목록이 하나의 근거 체계로 연결됩니다.',`
 <div class="irc-report-gallery">
  <article class="irc-report-sheet"><header><span>MDFC / INVESTIGATION</span><b>01</b></header><h3>핵심 결과 요약</h3><p class="irc-report-subtitle">Executive findings</p><div class="irc-finding"><span>확인된 사실</span><strong>원격 접속 · 프로그램 실행<br>파일 표본의 내용 변경</strong></div><div class="irc-finding"><span>분석 판단</span><strong>동일 계정·시각·시스템의<br>활동 연관성 검토</strong></div><div class="irc-finding irc-unconfirmed"><span>추가 확인</span><strong>최초 침입 · 전체 피해 범위</strong></div><footer>사실 · 해석 · 미확인 항목 구분</footer></article>
  <article class="irc-report-sheet"><header><span>MDFC / INVESTIGATION</span><b>02</b></header><h3>행위 타임라인</h3><p class="irc-report-subtitle">Incident chronology</p><ol class="irc-report-events"><li><time>11:11:08</time><div><strong>원격 접속</strong><small>E01 · 계정·접속지</small></div></li><li><time>11:17:32</time><div><strong>의심 프로그램 실행</strong><small>E02 · 실행·상위 프로세스</small></div></li><li><time>11:18:09</time><div><strong>파일 변화 확인</strong><small>E03 · 변경 파일 표본</small></div></li></ol><footer>사건의 순서와 분석 근거 연결</footer></article>
  <article class="irc-report-sheet"><header><span>MDFC / INVESTIGATION</span><b>03</b></header><h3>증거 목록</h3><p class="irc-report-subtitle">Evidence register</p><div class="irc-register">${[['E01','인증 기록','계정 · 시각 · 접속 정보'],['E02','실행 기록','파일 · 프로세스 관계'],['E03','변경 파일','수집 이력 · 해시 · 내용']].map(([n,t,c])=>`<div>${icon('report')}<span><b>${n} / ${t}</b><small>${c}</small></span></div>`).join('')}</div><footer>수집 자료와 결과의 추적 가능성</footer></article>
 </div><p class="irc-report-disclosure">보고서 구성 예시 · 가상 데이터 / 실제 결과물은 확보 자료와 의뢰 범위에 따라 달라집니다.</p>`, '설명 가능한 결과와 함께, 후속 조치에 필요한 검토 사항을 정리합니다.');

const heroGraphic=`<svg viewBox="0 0 620 510" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"><defs><linearGradient id="ircHeroSheet" x1="120" y1="70" x2="580" y2="480" gradientUnits="userSpaceOnUse"><stop stop-color="#d6e0e9" stop-opacity=".15"/><stop offset="1" stop-color="#879aa9" stop-opacity=".02"/></linearGradient></defs><path d="M88 420H576M88 70V420" stroke="#c5d1de" stroke-opacity=".12"/><rect x="150" y="85" width="326" height="364" rx="3" transform="rotate(-8 150 85)" fill="url(#ircHeroSheet)" stroke="#b5c4d1" stroke-opacity=".16"/><rect x="217" y="91" width="326" height="364" rx="3" fill="#11202d" stroke="#8294a5" stroke-opacity=".4"/><path d="M247 128H341" stroke="#fb934a" stroke-width="3"/><path d="M247 157H421M247 171H373M247 207H506" stroke="#a9bac9" stroke-opacity=".4"/><circle cx="262" cy="249" r="12" stroke="#e79151"/><circle cx="262" cy="312" r="12" stroke="#7d95ab"/><circle cx="262" cy="375" r="12" stroke="#7d95ab"/><path d="M262 261V300M262 324V363" stroke="#72899b" stroke-opacity=".6"/><path d="M293 243H462M293 256H400M293 306H462M293 319H423M293 369H462M293 382H395" stroke="#9db0c1" stroke-opacity=".65" stroke-width="3"/><path d="M247 416H506" stroke="#7d95ab" stroke-opacity=".3"/><rect x="98" y="256" width="84" height="99" rx="4" fill="#142635" stroke="#fb934a" stroke-opacity=".7"/><path d="M119 277H147L162 292V334H119V277Z M147 277V292H162 M128 306H152 M128 317H146" stroke="#d6e0e9" stroke-opacity=".85"/><path d="M182 307H202L217 292" stroke="#fb934a" stroke-dasharray="4 4"/><circle cx="527" cy="91" r="25" fill="#fb934a" fill-opacity=".13" stroke="#fb934a" stroke-opacity=".5"/><path d="m516 91 7 7 15-16" stroke="#fb934a" stroke-width="2"/></svg>`;

export function incidentPreviewC(){
 return {name:'C · 조사 케이스북',description:'사고별 질문과 증거 문서를 나란히 배치한 편집형 디자인. 차분한 아이보리 배경에서 실제 분석 자료의 읽는 순서를 보여줍니다.',heroGraphic,body:overview()+ransomware()+mail()+personal()+reports()};
}
