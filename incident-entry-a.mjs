const icon=name=>{
 const paths={
  restore:'<ellipse cx="18" cy="10" rx="11" ry="5"/><path d="M7 10v20c0 3 5 5 11 5m11-25v10M7 20c0 3 5 5 11 5"/><path d="M27 33a8 8 0 1 0 3-11m-1-6v7h7"/>',
  mail:'<rect x="4" y="8" width="34" height="26" rx="3"/><path d="m5 10 16 13 16-13M5 32l11-12m21 12L26 20"/>',
  shield:'<path d="m21 3 15 6v12c0 10-15 18-15 18S6 31 6 21V9zM14 21l5 5 10-12"/>',
  network:'<path d="M5 7l32 30M4 15a26 26 0 0 1 8-5m6-2a26 26 0 0 1 20 7M9 22a18 18 0 0 1 10-5m7 1a18 18 0 0 1 7 4M15 29a9 9 0 0 1 10-2M21 36h.1"/>',
  power:'<path d="M21 4v17M12 10a15 15 0 1 0 18 0"/>',
  camera:'<path d="M6 12h7l3-5h10l3 5h7a3 3 0 0 1 3 3v20H3V15a3 3 0 0 1 3-3Z"/><circle cx="21" cy="23" r="7"/>',
  phone:'<path d="m9 4 6 10-5 4a27 27 0 0 0 14 14l4-5 10 6-1 5a4 4 0 0 1-4 2C17 38 5 26 3 10a4 4 0 0 1 2-4Z"/>',
  warning:'<path d="m21 4 18 32H3zM21 15v10m0 6v1"/>'
 };
 return `<svg viewBox="0 0 42 42" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.shield}</svg>`;
};

const background=`<svg viewBox="0 0 1440 900" fill="none" aria-hidden="true"><g stroke="#6b8a9f" stroke-width="1"><path d="M968 68v141l-207 120v181l207 121v205M968 209l227 130v199l-227 93M761 329l207 132 227-122M968 461v170M1023 109v74l225 129v279M706 353v187l210 123v175M650 386v194l260 151"/><path d="M922 155v538M1010 355h250M779 498h399" stroke-dasharray="4 9"/></g><g fill="#152b3d" stroke="#c39a74"><circle cx="968" cy="209" r="9"/><circle cx="761" cy="329" r="8"/><circle cx="1195" cy="339" r="8"/><circle cx="968" cy="461" r="11"/><circle cx="761" cy="510" r="8"/><circle cx="1195" cy="538" r="8"/><circle cx="968" cy="631" r="9"/></g></svg>`;

const hero=()=>`<section class="ira-entry-hero" id="top" aria-labelledby="ira-entry-title"><div class="ira-entry-backdrop" aria-hidden="true">${background}</div><div class="if-frame"><div class="ira-entry-copy"><p class="ira-entry-kicker">INCIDENT INVESTIGATION SERVICES</p><h1 id="ira-entry-title">침해사고 조사 서비스</h1><p class="ira-entry-lead">사고 원인 조사부터 데이터 복원,<br>재발 방지와 보안점검까지.</p><p class="ira-entry-description">랜섬웨어, 이메일·해킹, 개인정보 사고.<br>현재 상황을 확인하고, 필요한 조사와 개선 방향을 안내합니다.</p><div class="ira-entry-actions"><button type="button" data-contact>전문가와 상담하기<span aria-hidden="true">↗</span></button><a href="#ransomware">서비스 살펴보기<span aria-hidden="true">↓</span></a></div></div><nav class="ira-entry-quick" aria-label="필요한 침해사고 조사 선택">${[
 ['ransomware','restore','랜섬웨어 사고 조사','파일이 열리지 않거나, 업무가 멈췄나요?'],
 ['email-hacking','mail','이메일·해킹 조사','의심 메일이나 알 수 없는 접속이 있나요?'],
 ['privacy-audit','shield','개인정보 및 내부 보안점검','자료 유출이 의심되거나 보안점검이 필요한가요?']
 ].map(([id,i,t,q],n)=>`<a href="#${id}">${icon(i)}<div><small>0${n+1} / QUICK GUIDE</small><strong>${t}</strong><span>${q}</span></div><b aria-hidden="true">↗</b></a>`).join('')}</nav><a class="ira-entry-first-response" href="#first-response"><span class="ira-entry-alert-icon">${icon('warning')}</span><span><small>FIRST RESPONSE</small><strong>사고를 발견했다면?<em>초기 대응 먼저 확인하기</em></strong></span><b aria-hidden="true">↓</b></a></div></section>`;

const aid=()=>`<section class="ira-entry-aid" id="first-response" aria-labelledby="ira-aid-title"><div class="if-frame"><header class="ira-aid-heading"><div><p class="ira-aid-kicker">FIRST RESPONSE GUIDE</p><h2 id="ira-aid-title">사고를 발견했다면,<br><em>먼저 확인하세요.</em></h2></div><p>피해 확산을 줄이고, 조사할 자료를 보존하는 것이 중요합니다.<br>업무 영향과 시스템 상태를 고려해 조치 방법을 협의하세요.</p></header><ol class="ira-aid-cards" aria-label="사고 직후 확인할 네 가지 항목">${[
 ['network','네트워크 격리','영향받은 기기의 네트워크를 분리해 추가 확산을 줄입니다. 운영 영향과 분리 방법은 담당자와 확인하세요.'],
 ['power','전원 조치 전 확인','재부팅·전원 차단은 조사 자료와 업무에 영향을 줄 수 있으므로, 시스템 상태를 확인하고 담당자와 협의하세요.'],
 ['camera','화면·발생 시점 기록','경고 메시지와 발생 시각, 관련 기기와 증상을 기록해 두세요. 지금까지 취한 조치도 함께 정리합니다.'],
 ['phone','삭제·포맷 전 상담','파일 삭제·포맷·재설치 전에 상담하세요. 복원 가능성과 자료 보존을 고려해 다음 조치를 안내합니다.']
 ].map(([i,t,d],n)=>`<li><div class="ira-aid-card-top"><span>0${n+1}</span>${icon(i)}</div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol><div class="ira-aid-footer"><div class="ira-aid-notes"><p><strong>상황에 따라 조치가 달라집니다.</strong> 위 번호는 확인 항목이며, 고정된 조치 순서는 아닙니다.</p><p>네트워크 격리가 불가능하고 확산이 우려되는 경우에는 전원 차단을 포함한 긴급 조치를 검토합니다.</p></div><a class="ira-aid-phone" href="tel:1577-4872">${icon('phone')}<span><small>판단이 어렵다면, 전문가 상담</small><strong>1577-4872</strong></span><b aria-hidden="true">↗</b></a></div></div></section>`;

export function incidentEntryA(){return {hero:hero(),aid:aid()};}
