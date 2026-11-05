import {ecIcon} from './enterprise-chapter-data.mjs';

const activity={
 'remote-security':['승인된 원격 접속','설정 · 권한 · 복구 대비 상태 검토'],
 'employee-offboarding':['보존과 검토를 함께','업무 자료 보존 · 사용 흔적 확인 · 권한 정리'],
 infrastructure:['운영 환경에 맞춘 구성','요구사항 검토 · 설계 · 구축 · 운영 인계']
};

export function enterpriseC(service){
 const [hub,sub]=activity[service.id]||['환경과 목적 확인','대상 확인 · 수행 범위 협의 · 결과 안내'];
 const overview=`<div class="ecv-overview"><div class="ecv-system" role="group" aria-label="${service.name}의 대상과 제공 결과"><div class="ecv-system-heading"><span>SERVICE STRUCTURE</span><span>${service.number} / ${service.english}</span></div><div class="ecv-subjects">${service.subjects.map(([i,t,d])=>`<div class="ecv-subject">${ecIcon(i)}<div><strong>${t}</strong><span>${d}</span></div></div>`).join('')}</div><div class="ecv-input-lines" aria-hidden="true"><i></i><i></i><i></i></div><div class="ecv-hub">${ecIcon(service.icon)}<div><strong>${hub}</strong><span>${sub}</span></div></div><div class="ecv-output-line" aria-hidden="true"><span>↓</span></div><div class="ecv-system-output"><span>제공 결과</span><strong>${service.output}</strong></div></div><aside class="ecv-context"><p class="ecv-context-kicker">이런 상황에 살펴보세요</p><ul class="ecv-signs">${service.signs.map((s,n)=>`<li><span>0${n+1}</span><strong>${s}</strong></li>`).join('')}</ul><div class="ecv-scope-note">${ecIcon('check')}<p>${service.note}</p></div></aside></div>`;
 const detail=`<div class="ecv-detail" role="group" aria-label="${service.name}의 수행 내용과 결과물">${service.steps.map((step,n)=>`<article class="ecv-operation"><header class="ecv-operation-head"><div class="ecv-operation-symbol">${ecIcon(step.icon)}</div><div><span>0${n+1} / ${step.tag}</span><h3>${step.title}</h3></div></header><div class="ecv-operation-body"><p>${step.description}</p><ul aria-label="${step.title} 주요 확인 항목">${step.checks.map(c=>`<li>${c}</li>`).join('')}</ul></div><div class="ecv-operation-output"><div><span>제공 결과</span><b aria-hidden="true">↓</b></div><strong>${step.result}</strong></div></article>`).join('')}</div>`;
 return {overview,detail};
}
