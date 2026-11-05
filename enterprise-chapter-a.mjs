import {ecIcon} from './enterprise-chapter-data.mjs';
export function enterpriseA(s){
 const overview=`<div class="ea-overview"><div class="ea-map"><span class="ec-micro">MANAGEMENT SCOPE</span><div class="ea-map-core">${ecIcon(s.icon)}<strong>${s.name}</strong><small>업무 환경에 맞춰 범위 협의</small></div><div class="ea-map-nodes">${s.subjects.map(([i,t,d])=>`<div>${ecIcon(i)}<strong>${t}</strong><span>${d}</span></div>`).join('')}</div></div><div class="ea-overview-copy"><p class="ec-micro">이럴 때 상담하세요</p><h3>${s.question}</h3><ul class="ea-signs">${s.signs.map(t=>`<li>${ecIcon('check')}<span>${t}</span></li>`).join('')}</ul><div class="ea-output"><span>서비스를 통해 받는 결과</span><strong>${s.output}</strong>${ecIcon('file')}</div></div></div>`;
 const detail=`<div class="ea-details">${s.steps.map((a,i)=>`<article><div class="ea-card-top"><span>0${i+1} / ${a.tag}</span>${ecIcon(a.icon)}</div><h3>${a.title}</h3><p>${a.description}</p><ul>${a.checks.map(t=>`<li>${ecIcon('check')}${t}</li>`).join('')}</ul><div class="ea-card-result"><small>제공 결과</small><strong>${a.result}</strong></div></article>`).join('')}</div>`;
 return {overview,detail};
}
