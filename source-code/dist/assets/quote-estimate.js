// Every amount below is fictitious UI demonstration data, not an MDFC rate.
(() => {
 'use strict';
 const dialog=document.querySelector('#qe-dialog');if(!dialog)return;
 const svg=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
 const icons={
  search:svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M8 10.5h5m-2.5-2.5v5"/>'),
  shield:svg('<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="M12 7v6m0 3h.01"/>'),
  server:svg('<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5"/>'),
  check:svg('<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>'),
  pc:svg('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M6 8h7"/>'),
  mobile:svg('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4m-3 14h2"/>'),
  drive:svg('<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="11" r="5"/><path d="m12 11 5 4M7 18h.01"/>'),
  mail:svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  globe:svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>'),
  media:svg('<rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-3v10l-4-3M7 9h.01M7 13h6"/>'),
  cloud:svg('<path d="M6 19a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11Z"/><path d="m9 13 3-3 3 3m-3-3v7"/>'),
  copy:svg('<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H3v13h5"/>'),
  tick:svg('<path d="m5 12 4 4L19 6"/>')
 };
 // Prices use 만원 and are deliberately stored separately from the UI labels.
 const services={
  forensics:{name:'디지털포렌식',icon:'search',desc:'자료 유출 · 디지털 증거 분석',unit:'회',kind:'일회성 분석',targets:[['pc','PC · 노트북','업무용 컴퓨터','pc',35,70,'대'],['mobile','스마트폰','대화 · 사진 · 앱 기록','mobile',50,100,'대'],['drive','저장매체','HDD · SSD · USB','drive',25,60,'개'],['server','서버 · 시스템','서버에 남은 업무 기록','server',70,150,'대'],['media','음성 · 영상','녹음 · 영상 파일','media',40,90,'건'],['nas','NAS · CCTV','공유 저장소 · 영상 장비','server',50,110,'대']],plans:[['basic','필요한 기록 확인','자료 확보 + 기본 분석',1],['detail','분석 + 결과 보고서','정밀 분석 + 결과 설명',1.4],['custom','범위부터 상담','무엇을 확인할지 함께 정리',null]],includes:{basic:['대상·분석 범위 확인','자료 확보 가능성 검토','주요 기록 기본 분석'],detail:['대상·분석 범위 확인','자료 확보·정밀 분석','결과 보고서 및 설명']},prep:'분석할 기기와 확인하고 싶은 사실을 준비해 주세요.'},
  incident:{name:'침해사고 조사',icon:'shield',desc:'랜섬웨어 · 해킹 · 정보유출 조사',unit:'회',kind:'일회성 조사',targets:[['pc','PC · 노트북','의심 기기 · 감염 단말','pc',60,120,'대'],['server','서버 · 시스템','업무 · 파일 서버','server',120,250,'대'],['mail','이메일 · 계정','로그인 · 메일 활동','mail',50,100,'개'],['web','웹서비스','홈페이지 · 업무 웹','globe',100,200,'개'],['nas','NAS · 저장소','공유 파일 · 백업 환경','drive',80,160,'대'],['cloud','클라우드','클라우드 계정 · 활동','cloud',100,200,'개']],plans:[['basic','원인 · 피해 범위 조사','자료 확보 + 침해 흔적 분석',1],['detail','조사 + 복원·예방 검토','복원 가능성 + 재발 방지 안내',1.5],['custom','긴급 범위 상담','사고 상황을 먼저 확인',null]],includes:{basic:['확보할 로그·자료 정리','사고 원인·범위 조사','핵심 조사 결과 안내'],detail:['사고 원인·범위 조사','데이터 복원 가능성 검토','결과 보고·재발 방지 안내']},prep:'발견 시각과 증상을 메모하고, 자료 초기화·삭제 전 상담해 주세요.'},
  solutions:{name:'솔루션 & 스토리지',icon:'server',desc:'보안 솔루션 · 저장·백업 환경 도입',unit:'식',kind:'도입 예산',targets:[['nas','NAS · 스토리지','파일 공유 · 데이터 저장','drive',80,160,'식'],['server','서버','업무 시스템 운영','server',180,350,'식'],['backup','백업 솔루션','사본 보관 · 복원 환경','cloud',80,180,'식'],['security','보안 솔루션','접근 통제 · 위협 탐지','shield',60,150,'식']],plans:[['basic','제품 도입','장비·라이선스 구성 예시',1],['detail','도입 + 구축 지원','초기 설정·구성 지원 포함',1.25],['custom','맞춤 구성 상담','용량·사용자 수부터 협의',null]],includes:{basic:['요구사항 정리','제품·구성 선정','도입 범위 협의'],detail:['요구사항·제품 선정','초기 구성·설정 지원','운영 방법 안내']},prep:'현재 장비와 필요한 용량·사용 인원·예산을 알려주시면 좋습니다.'},
  recurring:{name:'정기 보안 서비스',icon:'check',desc:'정기 점검 · 계정·단말 보안 관리',unit:'월',kind:'월 관리 비용',targets:[['pc','PC · 노트북','사용 중인 업무 단말','pc',1.5,3,'대'],['server','서버','서버 보안 설정 점검','server',8,15,'대'],['mail','이메일 · 계정','계정·권한 관리 점검','mail',1,2,'개'],['nas','NAS · 저장소','공유·백업 설정 점검','drive',5,10,'대']],plans:[['basic','정기 점검','설정 점검 + 개선 항목 안내',1],['detail','점검 + 관리 지원','정기 점검 + 개선 지원',1.5],['custom','맞춤 운영 상담','관리 범위·주기부터 협의',null]],includes:{basic:['정기 보안 설정 점검','계정·권한 확인','개선 항목 요약'],detail:['정기 설정·권한 점검','개선 작업 범위 협의','점검 결과·운영 안내']},prep:'관리할 단말·서버 수와 현재 보안 관리 방식을 정리해 주세요.'}
 };
 const situationOptions={
  forensics:[['leak','자료유출 여부 조사','파일 반출 · 외부 전송 흔적','search'],['departure','퇴사자 사용 컴퓨터 점검','업무 자료 · 삭제 · 사용 기록','pc'],['fraud','내부 횡령·배임 관련 조사','관련 파일 · 대화 · 업무 기록','shield'],['deleted-mobile','스마트폰 삭제된 데이터 확인','삭제된 대화 · 사진 등 확인 가능성','mobile'],['messenger','메신저 대화·증거 확보','민·형사 사건 관련 디지털 자료','mail'],['media-check','음성·영상 위변조 분석','녹음 · 영상의 편집 흔적','media']],
  incident:[['ransomware','랜섬웨어 감염이 의심돼요','암호화된 파일 · 복원 가능성','drive'],['account','이메일·계정 도용이 의심돼요','의심 로그인 · 메일 발송 기록','mail'],['hacking','PC·서버 해킹이 의심돼요','비정상 접속 · 침입 흔적','server'],['privacy','개인정보 유출이 의심돼요','자료 노출 가능성 · 영향 범위','shield'],['malware','악성코드가 의심돼요','알 수 없는 프로그램 · 이상 동작','search'],['cause','사고 원인·피해 범위 확인','흩어진 로그 · 사고 경위 조사','globe']],
  solutions:[['capacity','저장공간을 확장하고 싶어요','NAS · 스토리지 도입','drive'],['backup','자료 백업이 필요해요','백업 구성 · 복원 환경 마련','cloud'],['replacement','오래된 서버·NAS 교체','기존 환경 점검 · 이전 계획','server'],['access','자료 접근을 관리하고 싶어요','파일 공유 · 계정 · 권한 관리','shield'],['security','보안 솔루션을 도입해요','단말 보호 · 접근 통제','check'],['new-office','새 업무 환경을 구축해요','사무실 · 업무 시스템 구성','pc']],
  recurring:[['staff','보안 관리 인력이 부족해요','정기 점검 · 운영 지원','check'],['inspection','PC·서버를 정기 점검해요','보안 설정 · 업데이트 확인','pc'],['accounts','입사·퇴사자 계정 관리','계정 · 권한 · 업무 자료 점검','mail'],['remote','원격근무 보안이 걱정돼요','외부 접속 · 원격 사용 환경','globe'],['backup-check','백업·권한 설정을 확인해요','자료 보관 · 공유 설정 점검','cloud'],['overall','현재 보안 상태를 알고 싶어요','취약한 설정 · 개선 항목 정리','search']]
 };
 const titles=['어떤 도움이 필요하신가요?','어떤 문제가 발생했나요?','어떤 대상을 확인할까요?','어느 범위까지 필요하신가요?','선택하신 조건의 예상안입니다.'];
 const descriptions=['가장 가까운 서비스를 하나 선택해 주세요.','현재 상황과 의뢰 목적에 맞는 항목을 모두 선택해 주세요.','여러 종류를 함께 선택할 수 있습니다.','필요한 범위와 희망 일정을 골라 주세요.','상담 전에 비용의 구성과 의뢰 범위를 살펴보세요.'];
 const content=dialog.querySelector('#qe-content'),next=dialog.querySelector('#qe-next'),back=dialog.querySelector('#qe-back');
 let step=0,furthest=0,service='',situations=[],targets={},unknown=false,plan='',timing='normal',vat=false,trigger=null,previousOverflow='',previousScroll={x:0,y:0};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const current=()=>services[service];
 const money=n=>Number(n.toFixed(1)).toLocaleString('ko-KR');
 const range=(a,b)=>`${money(a)}<span>~</span>${money(b)}<small>만원</small>`;
 const card=(id,title,desc,icon,selected,group)=>`<button class="qe-option${selected?' is-selected':''}" type="button" data-qe-choice="${group}" data-qe-value="${id}" aria-pressed="${selected}">${icon?`<span class="qe-option-icon">${icons[icon]}</span>`:''}<span class="qe-option-copy"><strong>${esc(title)}</strong><small>${esc(desc)}</small></span><span class="qe-choice-mark" aria-hidden="true">${selected?icons.tick:''}</span></button>`;
 const situationLabels=()=>situations.includes('other')?['기타 · 상담하며 정하기']:(situationOptions[service]||[]).filter(s=>situations.includes(s[0])).map(s=>s[1]);
 function valid(){return [!!service,situations.length>0,unknown||Object.keys(targets).length>0,!!plan,true][step];}
 function estimate(){
  const svc=current(),choice=svc.plans.find(x=>x[0]===plan),factor=choice?.[3];
  if(situations.includes('other')||unknown||!Object.keys(targets).length||factor==null)return null;
  const rows=svc.targets.filter(t=>targets[t[0]]).map(t=>({name:t[1],qty:targets[t[0]],unit:t[6],low:Math.round(t[4]*targets[t[0]]*factor*10)/10,high:Math.round(t[5]*targets[t[0]]*factor*10)/10}));
  if(service==='recurring')rows.unshift({name:'기본 운영 범위',qty:null,low:20*factor,high:35*factor});
  const low=rows.reduce((a,t)=>a+t.low,0),high=rows.reduce((a,t)=>a+t.high,0);
  return{rows,low,high,totalLow:low*(vat?1.1:1),totalHigh:high*(vat?1.1:1)};
 }
 function summaryText(){
  const svc=current(),e=estimate(),choice=svc.plans.find(x=>x[0]===plan);
  return ['[MDFC 서비스 예상 견적 · 디자인용 가상 예시]',`서비스: ${svc.name}`,`상황·의뢰 목적: ${situationLabels().join(', ')}`,`대상: ${unknown?'대상 확인 필요':svc.targets.filter(t=>targets[t[0]]).map(t=>`${t[1]} ${targets[t[0]]}${t[6]}`).join(', ')}`,`범위: ${choice?.[1]}`,`일정: ${timing==='urgent'?'빠른 상담 희망':'상담 후 일정 협의'}`,`예시 금액: ${e?money(e.totalLow)+'~'+money(e.totalHigh)+'만원'+(service==='recurring'?' / 월':'')+(vat?' (VAT 포함)':' (VAT 별도)'):'상담 후 산정'}`,'실제 요금·계약 견적이 아닙니다. 장비 상태와 의뢰 범위 확인 후 별도 안내합니다.'].join('\n');
 }
 function render(){
  dialog.querySelector('#qe-title').textContent=step===1&&['solutions','recurring'].includes(service)?'현재 상황과 도입 목적은 무엇인가요?':titles[step];dialog.querySelector('#qe-description').textContent=descriptions[step];
  dialog.querySelector('#qe-page-count').textContent=`0${step+1} / 05`;
  dialog.querySelectorAll('[data-qe-step]').forEach(b=>{const n=Number(b.dataset.qeStep);b.disabled=n>furthest;b.toggleAttribute('data-complete',n<step);if(n===step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  back.hidden=step===0;next.disabled=!valid();next.innerHTML=step===4?'닫기':step===3?'예상 견적 보기 <span aria-hidden="true">→</span>':'다음 <span aria-hidden="true">→</span>';
  dialog.querySelector('#qe-footer-hint').textContent=step===4?'실제 견적은 상담 후 안내합니다.':'개인정보 입력 없이 확인할 수 있어요.';
  if(step===0){
   content.innerHTML=`<div class="qe-service-grid">${Object.entries(services).map(([id,s])=>card(id,s.name,s.desc,s.icon,id===service,'service')).join('')}</div><div class="qe-light-note">${icons.check}<span>선택한 서비스에 맞춰 필요한 항목만 안내합니다.</span></div>`;
  }else if(step===1){
   const svc=current();content.innerHTML=`<div class="qe-section-label"><span>${esc(svc.name)}</span><small>복수 선택 가능</small></div><div class="qe-situation-grid">${situationOptions[service].map(s=>card(s[0],s[1],s[2],s[3],situations.includes(s[0]),'situation')).join('')}</div><button class="qe-unknown${situations.includes('other')?' is-selected':''}" type="button" data-qe-choice="situation" data-qe-value="other" aria-pressed="${situations.includes('other')}"><span>?</span> 기타 · 상담하며 정하기 ${situations.includes('other')?'✓':''}</button><div class="qe-light-note">${icons.check}<span>정확한 원인을 몰라도 괜찮습니다. 현재 상황에 가까운 항목을 골라 주세요.</span></div>`;
  }else if(step===2){
   const svc=current();content.innerHTML=`<div class="qe-section-label"><span>${esc(svc.name)}</span><small>복수 선택 가능</small></div><div class="qe-target-grid">${svc.targets.map(t=>card(t[0],t[1],t[2],t[3],!!targets[t[0]],'target')).join('')}</div><button class="qe-unknown${unknown?' is-selected':''}" type="button" data-qe-unknown aria-pressed="${unknown}"><span>?</span> 대상을 잘 모르겠어요 ${unknown?'✓':''}</button>${Object.keys(targets).length?`<div class="qe-quantities"><h3>선택한 대상의 수량</h3>${svc.targets.filter(t=>targets[t[0]]).map(t=>`<div class="qe-quantity"><span>${esc(t[1])}</span><div><button type="button" data-qe-quantity="${t[0]}" data-delta="-1" aria-label="${esc(t[1])} 수량 줄이기"${targets[t[0]]<=1?' disabled':''}>−</button><strong>${targets[t[0]]}<small>${t[6]}</small></strong><button type="button" data-qe-quantity="${t[0]}" data-delta="1" aria-label="${esc(t[1])} 수량 늘리기"${targets[t[0]]>=99?' disabled':''}>+</button></div></div>`).join('')}</div>`:''}`;
  }else if(step===3){
   const svc=current();content.innerHTML=`<fieldset class="qe-fieldset"><legend>필요한 서비스 범위 <small>하나 선택</small></legend><div class="qe-plan-grid">${svc.plans.map(p=>card(p[0],p[1],p[2],null,p[0]===plan,'plan')).join('')}</div></fieldset><fieldset class="qe-fieldset"><legend>희망 일정</legend><div class="qe-timing">${card('normal','상담 후 일정 협의','자료와 범위를 먼저 확인',null,timing==='normal','timing')}${card('urgent','빠른 상담이 필요해요','진행 가능 일정 우선 확인',null,timing==='urgent','timing')}</div></fieldset><div class="qe-light-note${service==='incident'?' qe-incident-note':''}">${icons[service==='incident'?'shield':'check']}<span>${service==='incident'?'사고 기록이 남아 있다면 초기화·삭제 전 먼저 상담해 주세요.':'원격·방문·장비 접수 가능 여부는 상담에서 확인합니다.'}</span></div>`;
  }else renderResult();
 }
 function renderResult(){
  const svc=current(),e=estimate(),choice=svc.plans.find(x=>x[0]===plan),includes=svc.includes[plan]||['의뢰 목적·대상 확인','필요한 자료·범위 정리','담당자와 견적 조건 협의'];
  content.innerHTML=`<div class="qe-result-chips"><span>${esc(svc.name)}</span><span>${unknown?'대상 확인 필요':Object.values(targets).reduce((a,n)=>a+n,0)+'개 대상'}</span><span>${esc(choice[1])}</span></div><div class="qe-result-grid"><section class="qe-price-card"><div class="qe-price-top"><span>디자인 확인용 가상 견적</span><small>${esc(svc.kind)}</small></div><h3>${e?`<span class="qe-price">${range(e.totalLow,e.totalHigh)}</span>${service==='recurring'?'<span class="qe-per-month">/ 월</span>':''}`:'<span class="qe-no-price">상담 후 산정</span>'}</h3><p>${e?(vat?'VAT 포함':'VAT 별도')+' · 실제 서비스 요금이 아닙니다.':'대상·범위를 함께 확인한 뒤 금액을 안내합니다.'}</p>${e?`<label class="qe-vat"><input type="checkbox" id="qe-vat"${vat?' checked':''}> 부가세 포함해서 보기</label><details class="qe-breakdown"><summary>예시 금액 구성 보기 <span aria-hidden="true">＋</span></summary><dl>${e.rows.map(r=>`<div><dt>${esc(r.name)}${r.qty?' · '+r.qty+r.unit:''}</dt><dd>${money(r.low)}~${money(r.high)}만원</dd></div>`).join('')}${vat?`<div><dt>부가세 10%</dt><dd>${money(e.low*.1)}~${money(e.high*.1)}만원</dd></div>`:''}</dl></details>`:''}</section><section class="qe-includes"><span class="qe-section-label">선택하신 범위</span><ul>${includes.map(x=>`<li>${icons.tick}<span>${esc(x)}</span></li>`).join('')}</ul><p>${service==='solutions'?'용량·성능·사용자 수·라이선스에 따라 달라집니다.':service==='recurring'?'초기 구축·장애 대응·추가 작업 비용은 별도 협의합니다.':'대상 상태·자료량·분석 범위에 따라 달라집니다.'}</p></section></div><div class="qe-result-notes"><span>상담 전 준비하면 좋아요</span><p>${esc(svc.prep)}</p>${timing==='urgent'?'<p class="qe-urgent-text">빠른 상담 희망 · 긴급 진행 가능 여부와 추가 비용은 별도 확인합니다.</p>':''}</div><div class="qe-result-actions"><button type="button" data-qe-copy>${icons.copy} 선택 내용 복사</button><button type="button" data-qe-edit>선택 수정</button><a href="tel:1577-4872">전화 상담 <strong>1577-4872</strong> <span aria-hidden="true">↗</span></a></div><p class="qe-copy-status" role="status" id="qe-copy-status"></p><div class="qe-copy-fallback" hidden><label for="qe-copy-text">아래 내용을 선택해 복사해 주세요.</label><textarea id="qe-copy-text" readonly rows="6"></textarea></div><button class="qe-restart" type="button" data-qe-restart>처음부터 다시 선택하기 ↺</button>`;
  const purpose=document.createElement('section');purpose.className='qe-request-summary';purpose.innerHTML=`<span>선택하신 상황 · 의뢰 목적</span><p>${situationLabels().map(esc).join('<span aria-hidden="true"> / </span>')}</p>`;content.querySelector('.qe-result-grid').before(purpose);
 }
 function go(n){step=n;furthest=Math.max(furthest,n);render();content.scrollTop=0;dialog.querySelector('#qe-title').focus({preventScroll:true});}
 function open(button){trigger=button||document.querySelector('[data-qe-open]');if(typeof window.closeMenu==='function')window.closeMenu();previousScroll={x:scrollX,y:scrollY};previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';dialog.showModal();render();dialog.querySelector('#qe-title').focus({preventScroll:true});window.scrollTo({left:previousScroll.x,top:previousScroll.y,behavior:'instant'});}
 document.addEventListener('click',event=>{const b=event.target.closest('[data-qe-open]');if(b){event.preventDefault();if(!dialog.open)open(b);}});
 dialog.querySelector('[data-qe-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{const position={...previousScroll};document.documentElement.style.overflow=previousOverflow;const fallback=trigger?.closest('[data-quick-menu]')?.querySelector('.qm-toggle')||document.querySelector('.menu-toggle');(trigger?.getClientRects().length?trigger:fallback)?.focus({preventScroll:true});const restore=()=>window.scrollTo({left:position.x,top:position.y,behavior:'instant'});restore();requestAnimationFrame(()=>{if(!dialog.open)restore();});});
 dialog.addEventListener('click',async event=>{
  const choice=event.target.closest('[data-qe-choice]');
  if(choice){
   const value=choice.dataset.qeValue,group=choice.dataset.qeChoice;
   if(group==='service'&&service!==value){service=value;situations=[];targets={};unknown=false;plan='';timing='normal';vat=false;furthest=0;}
   else if(group==='situation'){
    if(value==='other')situations=situations.includes('other')?[]:['other'];
    else{situations=situations.filter(s=>s!=='other');situations=situations.includes(value)?situations.filter(s=>s!==value):[...situations,value];}
    furthest=Math.min(furthest,1);
   }else if(group==='target'){unknown=false;if(targets[value])delete targets[value];else targets[value]=1;furthest=Math.min(furthest,2);}
   else if(group==='plan'){plan=value;furthest=Math.min(furthest,3);}
   else if(group==='timing')timing=value;
   render();content.querySelector(`[data-qe-choice="${group}"][data-qe-value="${value}"]`)?.focus({preventScroll:true});
  }
  const quantity=event.target.closest('[data-qe-quantity]');if(quantity){const key=quantity.dataset.qeQuantity;targets[key]=Math.max(1,Math.min(99,targets[key]+Number(quantity.dataset.delta)));render();const selected=content.querySelector(`[data-qe-quantity="${key}"][data-delta="${quantity.dataset.delta}"]`);(selected?.disabled?content.querySelector(`[data-qe-quantity="${key}"]:not(:disabled)`):selected)?.focus({preventScroll:true});}
  if(event.target.closest('[data-qe-unknown]')){unknown=!unknown;targets={};furthest=Math.min(furthest,2);render();content.querySelector('[data-qe-unknown]').focus({preventScroll:true});}
  const stepButton=event.target.closest('[data-qe-step]');if(stepButton&&!stepButton.disabled)go(Number(stepButton.dataset.qeStep));
  if(event.target.closest('[data-qe-edit]'))go(1);
  if(event.target.closest('[data-qe-restart]')){service='';situations=[];targets={};unknown=false;plan='';timing='normal';vat=false;furthest=0;go(0);}
  if(event.target.closest('[data-qe-copy]')){const text=summaryText();try{await navigator.clipboard.writeText(text);content.querySelector('#qe-copy-status').textContent='선택 내용을 복사했습니다. 상담하실 때 활용하세요.';}catch{content.querySelector('.qe-copy-fallback').hidden=false;const area=content.querySelector('#qe-copy-text');area.value=text;area.focus();area.select();}}
 });
 dialog.addEventListener('change',event=>{if(event.target.id==='qe-vat'){vat=event.target.checked;const top=content.scrollTop;renderResult();content.scrollTop=top;content.querySelector('#qe-vat').focus({preventScroll:true});}});
 next.addEventListener('click',()=>{if(step===4)dialog.close();else if(valid())go(step+1);});back.addEventListener('click',()=>go(Math.max(0,step-1)));
 const auto=new URLSearchParams(location.search).get('estimate');if(auto==='1'||(dialog.hasAttribute('data-qe-autostart')&&auto!=='0'))open();
})();
