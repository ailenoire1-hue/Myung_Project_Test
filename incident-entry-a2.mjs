import {incidentEntryA} from './incident-entry-a.mjs';
import {htmlElement} from './forensic-reading-content.mjs';

const icon=name=>{
 const paths={
  network:'<path d="M4 4l34 34M3 14a28 28 0 0 1 9-5m6-2a28 28 0 0 1 21 7M8 22a20 20 0 0 1 11-5m7 1a20 20 0 0 1 8 4M14 29a10 10 0 0 1 11-2M21 36h.1"/>',
  power:'<path d="M21 4v17M12 10a15 15 0 1 0 18 0"/>',
  camera:'<path d="M6 12h7l3-5h10l3 5h7a3 3 0 0 1 3 3v20H3V15a3 3 0 0 1 3-3Z"/><circle cx="21" cy="23" r="7"/>',
  phone:'<path d="m9 4 6 10-5 4a27 27 0 0 0 14 14l4-5 10 6-1 5a4 4 0 0 1-4 2C17 38 5 26 3 10a4 4 0 0 1 2-4Z"/>',
  warning:'<path d="m21 4 18 32H3zM21 15v10m0 6v1"/>',
  collect:'<path d="M8 5h18l8 8v24H8zM26 5v9h8M14 21h13m-13 7h10"/><path d="M3 13v20m0-1 4-4m-4 4-2-4"/>',
  scan:'<circle cx="18" cy="18" r="12"/><path d="m27 27 12 12M10 18h5l3-6 4 12 3-6h3"/>',
  report:'<path d="M7 4h21l7 8v26H7zM28 4v9h7M13 21h16m-16 6h11"/><path d="m22 34 4 4 9-10"/>'
 };
 return `<svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.report}</svg>`;
};

const hero=()=>{
 let h=incidentEntryA().hero;
 h=h.replace(htmlElement(h,'<a class="ira-entry-first-response"'),'');
 h=h.replace('class="ira-entry-hero"','class="ira-entry-hero ira2-entry-hero"');
 const urgent=`<a href="#first-response" class="ira2-urgent-guide">${icon('warning')}<div><small>FIRST RESPONSE</small><strong>사고를 발견했다면?</strong><span>초기 대응 먼저 확인하기</span></div><b aria-hidden="true">↓</b></a>`;
 return h.replace('</nav>',urgent+'</nav>');
};

const aid=()=>`<section class="ira2-aid ira2-screen" id="first-response" aria-labelledby="ira2-aid-title"><div class="if-frame"><header class="ira2-heading"><p class="ira2-kicker">FIRST RESPONSE GUIDE</p><h2 id="ira2-aid-title">사고를 발견했다면, <em>먼저 확인하세요.</em></h2><p class="ira2-lead">피해 확산을 줄이고 조사할 자료를 보존할 수 있도록, 현재 상황에서 필요한 조치를 확인합니다.</p></header><ol class="ira2-aid-list" aria-label="사고 직후 확인할 항목">${[
 ['network','네트워크 격리','영향받은 기기의 연결을 분리해 추가 확산을 줄입니다. 운영 영향과 격리 방법은 담당자와 확인하세요.'],
 ['power','전원 조치 전 확인','재부팅·전원 차단은 조사 자료와 업무에 영향을 줄 수 있습니다. 시스템 상태를 확인하고 담당자와 협의하세요.'],
 ['camera','화면·발생 시점 기록','경고 화면과 발견 시각, 관련 기기·증상을 기록하세요. 지금까지 취한 조치도 함께 정리합니다.'],
 ['phone','삭제·포맷 전 상담','삭제·포맷·재설치 전에 상담하세요. 복원 가능성과 자료 보존을 고려해 다음 조치를 안내합니다.']
 ].map(([i,t,d],n)=>`<li><div class="ira2-aid-icon">${icon(i)}<span>0${n+1}</span></div><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol><div class="ira2-aid-bottom"><div><p><strong>고정된 조치 순서는 아닙니다.</strong> 업무 영향과 시스템 상태에 따라 대응 방법을 협의하세요.</p><p>격리가 불가능하고 확산이 우려되는 경우에는 전원 차단을 포함한 긴급 조치를 검토합니다.</p></div><a href="tel:1577-4872" class="ira2-phone">${icon('phone')}<span><small>판단이 어렵다면, 전문가 상담</small><strong>1577-4872</strong></span><b aria-hidden="true">↗</b></a></div></div></section>`;

const process=()=>`<section class="ira2-process ira2-screen" id="process" aria-labelledby="ira2-process-title"><div class="if-frame"><header class="ira2-heading"><p class="ira2-kicker">ONE-STOP INCIDENT RESPONSE</p><h2 id="ira2-process-title">신속한 대응, 하나로 이어지는 <em>원스톱 조사</em></h2><p class="ira2-lead">한 번의 상담에서 자료 확보와 조사·복원, 결과 설명과 재발 방지 방향까지 연결합니다.</p></header><ol class="ira2-process-line" aria-label="원스톱 조사 진행 과정">${[
 ['phone','상담','발생 시점과 증상, 업무 영향을 듣고 필요한 지원과 우선순위를 정합니다.','상황 파악 · 범위 협의'],
 ['collect','즉시 자료 확보','담당자와 협의해 필요한 기기와 기록을 신속하게 보존하고, 확보 방법을 안내합니다.','기기 · 메일 · 접속 기록'],
 ['scan','조사 및 복원','사고 원인과 영향 범위를 확인하고, 데이터 상태에 따라 가능한 복원을 진행합니다.','원인 조사 · 데이터 복원'],
 ['report','결과 리포트 · 재발 방지 컨설팅','확인된 사실과 복원 결과를 설명하고, 개선 우선순위와 예방 방향을 제안합니다.','분석 결과 · 보안 개선안']
 ].map(([i,t,d,out],n)=>`<li><header class="ira2-process-band"><div class="ira2-process-node"><span>0${n+1}</span>${icon(i)}</div><h3>${t}</h3></header><div class="ira2-process-copy"><p>${d}</p><small>${out}</small></div></li>`).join('')}</ol><div class="ira2-process-footer"><strong>업무 영향과 자료 보존을 함께 고려합니다.</strong><p>사고 상황과 확보 조건에 따라 자료 확보·조사·복원을 병행할 수 있으며, 범위와 일정을 협의합니다.</p></div></div></section>`;

export function incidentEntryA2(){return {hero:hero(),aid:aid(),process:process()};}
