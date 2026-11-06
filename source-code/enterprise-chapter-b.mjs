import {ecIcon} from './enterprise-chapter-data.mjs';

const esc=value=>String(value).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const activity=id=>id==='employee-offboarding'?'보존 · 검토 · 인계':id==='infrastructure'?'설계 · 구축 · 운영':'점검 · 확인 · 개선';

function overview(service){
 return `<div class="eb-overview" aria-label="상황에서 점검 범위와 결과로 이어지는 서비스 안내">
  <div class="eb-situation"><p class="eb-label">YOUR SITUATION</p><h3>${esc(service.question)}</h3><ul>${service.signs.map(t=>`<li><span aria-hidden="true"></span>${esc(t)}</li>`).join('')}</ul></div>
  <div class="eb-scope"><div class="eb-scope-heading"><span class="eb-connector" aria-hidden="true">→</span><p class="eb-label">함께 확인하는 범위</p></div><div class="eb-subjects">${service.subjects.map(([i,t,d])=>`<div>${ecIcon(i)}<span><strong>${esc(t)}</strong><small>${esc(d)}</small></span><b aria-hidden="true">✓</b></div>`).join('')}</div><div class="eb-activity"><span></span><strong>${activity(service.id)}</strong><span></span></div></div>
  <aside class="eb-outcome" aria-label="서비스 제공 결과"><span class="eb-connector" aria-hidden="true">→</span><div class="eb-outcome-heading"><p>WHAT YOU RECEIVE</p>${ecIcon('file')}</div><h3>${esc(service.output)}</h3><p class="eb-outcome-copy">확인한 내용을 정리하고,<br>다음 조치와 운영 방향을 안내합니다.</p><div class="eb-outcome-bottom"><span>서비스 결과 안내</span><span aria-hidden="true">↗</span></div></aside>
 </div><p class="eb-overview-note">${ecIcon('check')}<span>${esc(service.note)}</span></p>`;
}

function detail(service){
 return `<div class="eb-detail-grid"><div class="eb-matrix" aria-label="주요 작업과 확인 항목">${service.steps.map((step,i)=>`<article class="eb-matrix-row"><div class="eb-row-heading"><span class="eb-step-index">0${i+1}</span><div class="eb-row-icon">${ecIcon(step.icon)}</div><div><p>${esc(step.tag)}</p><h3>${esc(step.title)}</h3></div></div><div class="eb-row-scope"><p>${esc(step.description)}</p><ul aria-label="${esc(step.title)} 확인 항목">${step.checks.map(check=>`<li>${esc(check)}</li>`).join('')}</ul></div></article>`).join('')}</div><aside class="eb-deliverables" aria-label="항목별 제공 자료"><header>${ecIcon('file')}<div><p>DELIVERABLES</p><h3>이렇게 정리합니다.</h3></div></header><ol>${service.steps.map((step,i)=>`<li><span>0${i+1}</span><div><small>${esc(step.title)}</small><strong>${esc(step.result)}</strong></div></li>`).join('')}</ol><p class="eb-deliverables-note">협의한 수행 범위에 맞춰<br>결과와 활용 방법을 설명합니다.</p></aside></div>`;
}

export function enterpriseB(service){return {overview:overview(service),detail:detail(service)};}
