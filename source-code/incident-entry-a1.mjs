import {incidentEntryA} from './incident-entry-a.mjs';
import {htmlElement} from './forensic-reading-content.mjs';

const icon=name=>`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
 chat:'<path d="M7 8h34v25H20L9 41v-8H7zM15 17h18M15 24h12"/>',
 collect:'<rect x="6" y="7" width="23" height="31" rx="3"/><path d="M12 14h11M12 20h7M12 31h4M35 8v17m-6-6 6 6 6-6"/><path d="M25 32h17v10H25z"/>',
 restore:'<circle cx="19" cy="20" r="12"/><path d="m28 29 12 12M14 20h10m-5-5v10M32 9a13 13 0 0 1 8 12m-5-4 5 4 4-5"/>',
 report:'<path d="M7 5h23l7 7v12M30 5v8h7M7 5v38h17M14 20h16M14 27h8M14 34h7"/><path d="m35 26 9 4v7c0 6-9 10-9 10s-9-4-9-10v-7zM30 36l4 4 6-8"/>'
}[name]}</svg>`;

const steps=[
 ['chat','상담','상황을 듣고, 방향을 정합니다.','발생 시점과 증상, 업무 영향을 확인하고 우선 조치를 안내합니다.','사고 상황 · 의뢰 범위'],
 ['collect','즉시 자료 확보','조사에 필요한 기록부터.','담당자와 협의해 로그·기기·계정 자료를 우선 확보하고 보존합니다.','기록 보존 · 자료 확보'],
 ['restore','조사 및 복원','원인을 찾고, 복원을 검토합니다.','사고 경위와 피해 범위를 분석하며, 데이터 상태에 맞춰 복원을 진행합니다.','원인 분석 · 데이터 복원'],
 ['report','결과 리포트 &<br>재발 방지 컨설팅','확인한 결과를 다음 조치로.','조사·복원 결과를 설명하고, 재발 방지를 위한 보안 개선 방향을 제안합니다.','결과 안내 · 개선 방향']
];

const process=()=>`<section class="ira1-process" id="process" aria-labelledby="ira1-process-title"><div class="if-frame"><header class="ira1-process-heading"><div><p class="ira-aid-kicker">FAST RESPONSE · ONE-STOP SERVICE</p><h2 id="ira1-process-title">신속한 대응,<br><em>원스톱으로 이어지는 사고 조사.</em></h2></div><p>침해사고 대응은 빠른 자료 확보와 끊김 없는 진행이 중요합니다.<br>상담부터 조사·복원, 재발 방지까지 하나의 흐름으로 안내합니다.</p></header><ol class="ira1-process-track">${steps.map(([i,t,s,d,tag],n)=>`<li><div class="ira1-process-node"><span>0${n+1}</span>${icon(i)}</div><div class="ira1-process-copy"><h3>${t}</h3><strong>${s}</strong><p>${d}</p><small>${tag}</small></div></li>`).join('')}</ol><div class="ira1-process-end"><p><strong>자료 확보부터 재발 방지까지</strong><span>사고 상황·시스템 접근 여건·데이터 상태에 따라 작업 범위와 일정을 협의합니다.</span></p><button type="button" data-contact>전문가 상담 <span aria-hidden="true">↗</span></button></div></div></section>`;

export function incidentEntryA1(){
 const content=incidentEntryA();
 const old=htmlElement(content.hero,'<a class="ira-entry-first-response"');
 const quick=`<a class="ira1-response-link" href="#first-response"><svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m21 4 18 32H3zM21 15v10m0 6v1"/></svg><div><small>FIRST RESPONSE / 먼저 확인하세요</small><strong>사고를 발견했다면?</strong><span>확산을 줄이고, 조사할 자료를 보존하는 초기 대응</span></div><b aria-hidden="true">↓</b></a>`;
 return {hero:content.hero.replace(old,'').replace('</nav>',quick+'</nav>'),aid:content.aid,process:process()};
}
