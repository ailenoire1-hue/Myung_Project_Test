import {incidentEntryA} from './incident-entry-a.mjs';

const paths={
 restore:'<ellipse cx="18" cy="10" rx="11" ry="5"/><path d="M7 10v20c0 3 5 5 11 5m11-25v10M7 20c0 3 5 5 11 5M27 33a8 8 0 1 0 3-11m-1-6v7h7"/>',
 mail:'<rect x="4" y="8" width="34" height="26" rx="3"/><path d="m5 10 16 13 16-13M5 32l11-12m21 12L26 20"/>',
 shield:'<path d="m21 3 15 6v12c0 10-15 18-15 18S6 31 6 21V9zM14 21l5 5 10-12"/>',
 warning:'<path d="m21 4 18 32H3zM21 15v10m0 6v1"/>',
 network:'<path d="M5 7l32 30M4 15a26 26 0 0 1 8-5m6-2a26 26 0 0 1 20 7M9 22a18 18 0 0 1 10-5m7 1a18 18 0 0 1 7 4M15 29a9 9 0 0 1 10-2M21 36h.1"/>',
 power:'<path d="M21 4v17M12 10a15 15 0 1 0 18 0"/>',
 camera:'<path d="M6 12h7l3-5h10l3 5h7a3 3 0 0 1 3 3v20H3V15a3 3 0 0 1 3-3Z"/><circle cx="21" cy="23" r="7"/>',
 phone:'<path d="m9 4 6 10-5 4a27 27 0 0 0 14 14l4-5 10 6-1 5a4 4 0 0 1-4 2C17 38 5 26 3 10a4 4 0 0 1 2-4Z"/>',
 collect:'<rect x="6" y="6" width="30" height="30" rx="3"/><path d="M13 13h16M13 20h9M21 24v9m-4-4 4 4 4-4"/>',
 search:'<circle cx="18" cy="18" r="12"/><path d="m27 27 12 12M11 18h4l3-6 4 12 3-6"/>',
 report:'<path d="M9 3h17l8 8v28H9zM26 3v9h8M15 19h13M15 26h13M15 32h8"/>'
};
const icon=n=>`<svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[n]||paths.shield}</svg>`;

const quick=()=>`<nav class="ia3-quick" aria-label="침해사고 서비스와 초기 대응 빠른 안내">${[
 ['ransomware','restore','01 / QUICK GUIDE','랜섬웨어 사고 조사','데이터 복원부터 원인 조사와 재발 방지까지'],
 ['email-hacking','mail','02 / QUICK GUIDE','이메일·해킹 조사','의심 메일과 비정상 접속, 사고 경위 확인'],
 ['privacy-audit','shield','03 / QUICK GUIDE','개인정보·내부 보안점검','자료 유출 가능성과 보안의 빈틈 점검'],
 ['first-response','warning','FIRST RESPONSE','사고를 발견했다면?','초기 대응 먼저 확인하기']
 ].map(([id,i,k,t,d],n)=>`<a href="#${id}"${n===3?' class="ia3-quick-alert"':''}><div class="ia3-quick-top">${icon(i)}<b aria-hidden="true">${n===3?'↓':'↗'}</b></div><small>${k}</small><strong>${t}</strong><span>${d}</span></a>`).join('')}</nav>`;

const aid=()=>`<section class="ia3-aid" id="first-response" aria-labelledby="ia3-aid-title"><div class="if-frame"><header class="ia3-section-heading"><div><p class="ia3-kicker">FIRST RESPONSE GUIDE</p><h2 id="ia3-aid-title">사고를 발견했다면,<br><em>먼저 확인하세요.</em></h2></div><p>피해 확산을 줄이고 조사할 자료를 보존하도록.<br>업무 영향과 시스템 상태를 고려해 조치 방법을 협의하세요.</p></header><ul class="ia3-aid-checks" aria-label="초기 대응 확인 항목">${[
 ['network','네트워크 격리','영향받은 기기를 네트워크에서 분리해 추가 확산을 줄입니다.'],
 ['power','전원 조치 전 확인','재부팅·전원 차단 전, 자료와 업무에 미칠 영향을 담당자와 확인합니다.'],
 ['camera','화면·발생 시점 기록','경고 메시지와 발견 시점, 이미 취한 조치를 기록해 둡니다.'],
 ['phone','삭제·포맷 전 상담','남은 파일과 기록을 보존하고 자료 확보 방법부터 확인합니다.']
 ].map(([i,t,d],n)=>`<li><div class="ia3-check-mark">${icon(i)}<span>CHECK 0${n+1}</span></div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul><div class="ia3-aid-foot"><div><p><strong>조치 순서는 상황에 따라 달라집니다.</strong> 담당자와 현재 상태를 먼저 확인하세요.</p><p>네트워크 격리가 불가능하고 확산이 우려되면 전원 차단을 포함한 긴급 조치를 검토합니다.</p></div><a href="tel:1577-4872"><span>판단이 어렵다면, 전문가 상담</span><strong>1577-4872 <b aria-hidden="true">↗</b></strong></a></div></div></section>`;

const process=()=>`<section class="ia3-process" id="process" aria-labelledby="ia3-process-title"><div class="if-frame"><header class="ia3-section-heading"><div><p class="ia3-kicker">ONE-STOP INCIDENT RESPONSE</p><h2 id="ia3-process-title">침해사고 대응은<br><em>신속하고 원스톱으로.</em></h2></div><p>초기 대응부터 조사·복원과 재발 방지까지.<br>사고 상황에 필요한 작업을 하나의 흐름으로 연결합니다.</p></header><ol class="ia3-process-flow" aria-label="침해사고 대응 진행 절차">${[
 ['phone','상담','현재 상황과 피해 범위, 우선 대응할 사항을 확인합니다.'],
 ['collect','즉시 자료 확보','접근 권한과 확보 방법을 협의하고 기기·로그·파일을 보존합니다.'],
 ['search','조사 및 복원','사고 경위를 분석하고 자료 상태에 맞춰 복원을 진행합니다.'],
 ['report','결과 리포트 ·<br>재발 방지 컨설팅','확인한 사실과 복원 결과, 보안 개선 방향을 안내합니다.']
 ].map(([i,t,d],n)=>`<li><div class="ia3-process-node">${icon(i)}<span>0${n+1}</span></div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol><div class="ia3-process-bottom"><p><strong>한 번의 상담으로 필요한 대응부터.</strong><span>작업 순서와 일정, 조사·복원 범위는 실제 사고 상황과 자료 상태에 맞춰 협의합니다.</span></p><button type="button" data-contact>대응 범위 상담하기 <span aria-hidden="true">↗</span></button></div></div></section>`;

export function incidentEntryA3(){
 let hero=incidentEntryA().hero
  .replace(/<nav class="ira-entry-quick"[\s\S]*?<\/nav>/,quick())
  .replace(/<a class="ira-entry-first-response"[\s\S]*?<\/a>/,'');
 return {hero,aid:aid(),process:process()};
}
