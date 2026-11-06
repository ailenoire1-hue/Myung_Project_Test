import {servicePages} from './service-details.mjs';

const paths={
 shield:'<path d="m16 3 11 4v9c0 7-11 13-11 13S5 23 5 16V7zM11 15l4 4 7-8"/>',
 monitor:'<rect x="3" y="4" width="26" height="19" rx="2"/><path d="M10 29h12M16 23v6M8 11h8m-8 5h13"/>',
 account:'<circle cx="13" cy="10" r="5"/><path d="M3 27v-4c0-7 20-7 20 0v4M24 7l3 3 4-6"/>',
 lock:'<rect x="6" y="13" width="20" height="16" rx="2"/><path d="M10 13V9a6 6 0 0 1 12 0v4M16 19v5"/>',
 network:'<rect x="11" y="2" width="10" height="7" rx="1"/><path d="M16 9v8M5 22v-5h22v5"/><rect x="1" y="22" width="8" height="8" rx="1"/><rect x="12" y="22" width="8" height="8" rx="1"/><rect x="23" y="22" width="8" height="8" rx="1"/>',
 file:'<path d="M7 3h13l5 5v21H7zM20 3v6h5M11 14h10m-10 5h10m-10 5h6"/>',
 storage:'<rect x="3" y="3" width="26" height="11" rx="2"/><rect x="3" y="19" width="26" height="11" rx="2"/><path d="M8 8h2m4 0h2m7 0h1M8 24h2m4 0h2m7 0h1"/>',
 backup:'<path d="M7 10a11 11 0 1 1-2 13M7 3v8H0M16 10v7l5 3"/>',
 scan:'<path d="M3 11V3h8m10 0h8v8m0 10v8h-8m-10 0H3v-8M8 17h5l3-7 4 14 3-7h4"/>',
 check:'<circle cx="16" cy="16" r="13"/><path d="m9 16 5 5 10-11"/>',
 key:'<circle cx="9" cy="11" r="6"/><path d="m13 15 15 14m-9-9 4-4m1 9 4-4"/>'
};
const icon=(key)=>`<svg class="sce-icon" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[key]||paths.shield}</svg>`;
const scopes=(items)=>`<ol class="sce-scope">${items.map(([key,title,copy],i)=>`<li><span class="sce-scope-icon">${icon(key)}</span><div><span class="sce-micro">0${i+1} CHECKPOINT</span><h3>${title}</h3><p>${copy}</p></div></li>`).join('')}</ol>`;
const result=(label,copy)=>`<div class="sce-result"><span>${label}</span><strong>${copy}</strong></div>`;
const hub=(label,nodes,centerIcon='shield')=>`<div class="sce-map"><span class="sce-panel-label">MANAGEMENT AREAS</span><div class="sce-map-grid">${nodes.slice(0,2).map(([key,title,copy])=>`<div class="sce-map-node">${icon(key)}<strong>${title}</strong><small>${copy}</small></div>`).join('')}<div class="sce-map-center">${icon(centerIcon)}<strong>${label}</strong><span>대상과 범위를 협의해 진행</span></div>${nodes.slice(2).map(([key,title,copy])=>`<div class="sce-map-node">${icon(key)}<strong>${title}</strong><small>${copy}</small></div>`).join('')}</div></div>`;

export function enterpriseChapterContent(){
 return {
  overview:{
   id:'overview',eyebrow:'ENTERPRISE SECURITY MANAGEMENT',title:'점검과 자료 관리부터,\n보안 환경 구축까지.',
   lead:'기업의 기기·계정·데이터를 살피고, 운영 환경에 맞는 보호 체계를 구성합니다.',
   body:`<div class="sce-overview-grid">${[
    ['01','scan','원격 보안 점검','remote-security','설정과 접근 권한, 로그·백업 상태를 확인합니다.','점검 보고서 · 개선 우선순위'],
    ['02','account','퇴사자 관리','employee-offboarding','업무 자료를 보존하고, 활동 기록과 인계 절차를 점검합니다.','자료 보존 · 활동 검토 · 인계'],
    ['03','network','솔루션·스토리지·인프라','security-solutions','보호 기능과 저장 환경, 구축·운영 조건을 검토합니다.','구성 제안 · 구축 검증 · 운영 인계']
   ].map(([num,key,title,id,copy,out])=>`<a class="sce-overview-card" href="#${id}"><div class="sce-card-top"><span>${num}</span>${icon(key)}</div><h3>${title}</h3><p>${copy}</p><div class="sce-card-bottom"><span>${out}</span><b aria-hidden="true">↗</b></div></a>`).join('')}</div><div class="sce-context"><span>서비스 범위</span><p>대상 자산과 접근 권한, 기존 운영 체계를 확인한 뒤 점검·관리·구축 범위를 협의합니다.</p></div>`
  },
  groups:[
   {id:'remote-security',number:'01',title:'원격 보안 점검',pages:[
    {id:'remote-security',label:'서비스 개요',overview:true,eyebrow:'01 / REMOTE SECURITY ASSESSMENT',title:'원격 보안 점검',lead:'원격 접속과 주요 시스템의 보안 상태를 확인하고, 개선해야 할 항목을 정리합니다.',
     body:`<div class="sce-two-col">${hub('원격 보안 점검',[
      ['monitor','시스템 설정','패치 · 외부 노출'],['lock','계정·접근 권한','다중 인증 · 자료 접근'],['network','원격 접속','접속 정책 · 접근 경로'],['backup','로그·백업','보관 · 분리 · 복원']
     ],'scan')}${scopes([
      ['monitor','설정·노출 상태','서버·네트워크·업무 시스템의 설정과 패치, 외부 접속 상태를 점검합니다.'],
      ['account','인증·접근 정책','계정 권한과 다중 인증, 원격 접속 및 주요 자료 접근 정책을 검토합니다.'],
      ['backup','기록·복구 체계','로그 수집·보관, 백업 분리와 복원 점검 등 관리 상태를 확인합니다.']
     ])}</div>`},
    {id:'remote-security-analysis',label:'점검 결과',eyebrow:'01 / ASSESSMENT RESULTS',title:'점검 결과를,\n실행할 개선 항목으로 정리합니다.',lead:'확인 근거와 업무 영향을 함께 검토해 조치 우선순위와 후속 점검 항목을 안내합니다.',
     body:`<div class="sce-two-col sce-report-layout"><div class="sce-report"><div class="sce-report-head">${icon('file')}<div><span>점검표 구성 예시</span><strong>기업 보안 점검 결과</strong></div><small>실제 결과 아님</small></div><div class="sce-report-table" role="table" aria-label="점검 결과 보고서 구성 예시"><div role="row" class="sce-table-head"><span role="columnheader">점검 영역</span><span role="columnheader">확인 근거</span><span role="columnheader">조치 방향</span></div>${[
      ['시스템 설정','설정 · 패치 상태','보완 항목 정리'],['계정·인증','권한 · 인증 정책','접근 정책 검토'],['원격 접속','접속 경로 · 정책','허용 범위 점검'],['로그·백업','보관 · 복원 절차','운영 기준 검토']
     ].map(row=>`<div role="row">${row.map(x=>`<span role="cell">${x}</span>`).join('')}</div>`).join('')}</div></div><div class="sce-report-outputs"><span class="sce-panel-label">PROVIDED DOCUMENTS</span><div>${icon('file')}<h3>보안 점검 보고서</h3><p>점검 대상 · 확인 근거 · 취약 항목 · 업무 영향</p></div><div>${icon('check')}<h3>개선·이행 점검 항목</h3><p>조치 우선순위 · 담당 · 일정 · 후속 확인 항목</p></div><p class="sce-note">업무 영향을 고려해 실행 방향을 협의합니다.</p></div></div>`}
   ]},
   {id:'employee-offboarding',number:'02',title:'퇴사자 관리',pages:[
    {id:'employee-offboarding',label:'서비스 개요',overview:true,eyebrow:'02 / EMPLOYEE OFFBOARDING',title:'퇴사자 관리',lead:'업무용 기기와 계정의 상태를 확인하고, 자료 보존과 접근 권한 회수·인계를 지원합니다.',
     body:`<div class="sce-two-col"><div class="sce-route-panel"><span class="sce-panel-label">DEVICE · ACCOUNT · DATA</span><ol class="sce-route">${[
      ['monitor','기기·계정 확인','업무용 대상과 현재 상태'],['file','업무 자료 보존','인계·보관할 자료 설정'],['scan','활동 기록 검토','접근·복사·전송·삭제 정황'],['key','권한 회수·인계','계정과 자료의 관리 절차']
     ].map(([key,title,copy],i)=>`<li><span>0${i+1}</span>${icon(key)}<div><strong>${title}</strong><small>${copy}</small></div></li>`).join('')}</ol></div>${scopes([
      ['file','인계·보존 대상 설정','업무용 기기·계정·공유 자료를 확인하고 필요한 자료의 보존 범위를 정합니다.'],
      ['scan','반출 의심 정황 확인','문서 접근·압축·삭제, USB 연결과 이메일·클라우드 전송 기록을 대조합니다.'],
      ['key','접근권 회수·인계','퇴사 시점의 접근권 회수와 자료 보관·인계 절차를 점검합니다.']
     ])}</div>`},
    {id:'employee-offboarding-analysis',label:'검토·인계 자료',eyebrow:'02 / RECORD REVIEW & HANDOVER',title:'자료의 이동 흔적과,\n퇴사 시점의 상태를 함께 살펴봅니다.',lead:'승인된 기기와 기간의 기록을 대조해 확인 가능한 사실과 추가 검토 사항을 구분합니다.',
     body:`<div class="sce-two-col"><div class="sce-evidence"><span class="sce-panel-label">기록 교차 확인 · 검토 구조</span><div class="sce-evidence-focus">${icon('file')}<div><strong>관심 업무 자료</strong><span>파일 · 문서 · 공유 자료</span></div></div><div class="sce-evidence-grid">${[
      ['scan','활동 시점','접근 · 압축 · 삭제'],['storage','연결 이력','USB 등 외부 저장장치'],['network','전송 정황','이메일 · 클라우드'],['file','보관 자료 대조','원본 · 사본 · 인계 자료']
     ].map(([key,title,copy])=>`<div>${icon(key)}<strong>${title}</strong><span>${copy}</span></div>`).join('')}</div></div><div class="sce-report-outputs"><span class="sce-panel-label">HANDOVER DOCUMENTS</span><div>${icon('check')}<h3>업무 자료 인계 체크리스트</h3><p>기기 · 계정 · 보존 자료 · 권한 회수 · 인계 상태</p></div><div>${icon('file')}<h3>주요 활동 검토 자료</h3><p>관심 기간의 기록 · 확인 근거 · 추가 확인 사항</p></div><p class="sce-note">상세 증거 분석이 필요한 경우 디지털포렌식과 연계합니다.</p></div></div>`}
   ]},
   {id:'security-solutions',number:'03',title:'솔루션·스토리지·인프라',pages:[
    {id:'security-solutions',label:'보안 솔루션',overview:true,eyebrow:'03 / SECURITY SOLUTIONS',title:'보안 솔루션 도입',lead:'보호할 자산과 필요한 기능을 먼저 확인하고, 기존 시스템에 맞는 적용 범위를 검토합니다.',
     body:`<div class="sce-solution-grid">${[
      ['lock','접근 통제','사용자·계정의 접근 범위와 인증 조건을 정리합니다.','계정 · 권한 · 접근 정책'],
      ['shield','위협 탐지','단말·서버 등 주요 자산의 탐지·보호 기능을 검토합니다.','보호 대상 · 탐지 범위'],
      ['network','로그·운영 연계','기존 시스템과의 연계, 알림과 대응 절차를 설계합니다.','로그 관리 · 알림 · 대응']
     ].map(([key,title,copy,tag])=>`<div class="sce-solution-card">${icon(key)}<h3>${title}</h3><p>${copy}</p><span>${tag}</span></div>`).join('')}</div>${result('구성 제안','기능별 도입 우선순위 · 적용 범위 · 운영 점검 항목')}<p class="sce-note">제품별 지원 기능과 운영 환경에 따라 실제 적용 범위를 협의합니다.</p>`},
    {id:'server-nas',label:'서버·NAS·백업',eyebrow:'03 / SERVER, NAS & BACKUP',title:'서버·NAS·백업 구성',lead:'저장 용량과 성능뿐 아니라 접근 권한, 별도 백업과 장애 시 복구 절차를 함께 검토합니다.',
     body:`<div class="sce-two-col"><div class="sce-storage-plan"><span class="sce-panel-label">저장·백업 구성 개념도</span><div class="sce-storage-source">${icon('account')}<div><strong>업무 데이터</strong><span>사용자 · 부서 · 업무 시스템</span></div></div><div class="sce-storage-link" aria-hidden="true">↓</div><div class="sce-storage-pair"><div>${icon('storage')}<strong>서버·NAS</strong><span>자료 저장 · 권한 관리</span></div><span aria-hidden="true">→</span><div>${icon('backup')}<strong>별도 백업</strong><span>분리 보관 · 복원 점검</span></div></div><div class="sce-storage-check">${icon('check')}<span>보관 주기 · 접근 권한 · 복구 절차를 함께 설계</span></div></div>${scopes([
      ['storage','용량·성능','데이터 사용량과 증가 추세, 접속 방식에 맞춰 구성을 검토합니다.'],
      ['lock','공유·접근 권한','사용자·부서별 접근 권한과 자료 공유 정책을 설계합니다.'],
      ['backup','백업·복구 계획','대상·주기·보관 위치와 복구 점검 절차를 수립합니다.']
     ])}</div><p class="sce-note">NAS·RAID 구성과 별도 백업은 목적이 다릅니다. 삭제·랜섬웨어·장비 장애에 대비한 사본 관리가 필요합니다.</p>`},
    {id:'security-infrastructure',label:'보안 인프라 구축',eyebrow:'03 / SECURITY INFRASTRUCTURE',title:'보안 인프라 구축',lead:'계정·네트워크·로그·백업을 연결하고, 담당자가 운영할 수 있는 보호 체계를 구성합니다.',
     body:`<div class="sce-two-col">${hub('통합 운영',[
      ['account','계정·권한','인증 · 접근 통제'],['network','네트워크','자산 · 접근 경로'],['file','보안 로그','수집 · 보관 · 확인'],['backup','백업 환경','분리 · 복원 점검']
     ],'network')}${scopes([
      ['network','구조 설계','자산과 접근 경로, 계정 권한을 검토한 구축 구성을 설계합니다.'],
      ['shield','구축·설정','보안 설정과 로그 수집, 백업 연계 등 협의한 환경을 적용합니다.'],
      ['check','검증·운영 인계','동작·정책을 점검하고 구성도, 설정 내역과 운영 자료를 전달합니다.']
     ])}</div>`}
   ]}
  ],
  workflow:{id:'process',eyebrow:'HOW WE WORK',title:'환경 확인부터 운영 인계까지,\n진행 과정을 한눈에.',lead:'대상과 접근 권한, 운영 영향을 확인하고 수행 범위와 일정을 협의합니다.',
   body:`<ol class="sce-workflow">${[
    ['monitor','업무·환경 확인','목적 · 자산 · 계정 · 기존 운영 체계','관리 목적과 대상'],
    ['scan','요구사항 검토','자료 보존 · 보안 기능 · 시스템 연계','위험과 도입 조건'],
    ['network','범위 협의·수행','일정 · 점검 · 분석 · 구축 · 지원','협의한 범위 수행'],
    ['file','결과·운영 인계','결과 설명 · 권한 · 관리 · 백업 절차','운영 자료와 관리 계획']
   ].map(([key,title,copy,out],i)=>`<li><div class="sce-workflow-step"><span>0${i+1}</span>${icon(key)}</div><h3>${title}</h3><p>${copy}</p><strong>${out}</strong></li>`).join('')}</ol>`},
  faq:servicePages['enterprise-security'].faqs.map(([question,answer])=>({question,answer}))
 };
}
