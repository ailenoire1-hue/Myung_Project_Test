const icon=name=>{
 const paths={
  search:'<circle cx="14" cy="14" r="9"/><path d="m21 21 9 9M10 14h8M14 10v8"/>',
  restore:'<ellipse cx="13" cy="7" rx="9" ry="4"/><path d="M4 7v16c0 2 4 4 9 4M22 7v7M4 14c0 2 4 4 9 4m7 6a7 7 0 1 0 2-6m-1-4v6h6"/>',
  shield:'<path d="m17 3 12 4v10c0 8-12 14-12 14S5 25 5 17V7zM11 17l4 4 8-9"/>',
  check:'<path d="M7 3h15l6 6v23H7zM22 3v7h6m-16 6 2 2 4-5m3 3h3m-12 9 2 2 4-5m3 3h3"/>',
  network:'<rect x="12" y="2" width="10" height="8" rx="1"/><rect x="2" y="24" width="10" height="8" rx="1"/><rect x="22" y="24" width="10" height="8" rx="1"/><path d="M17 10v7M7 24v-7h20v7M13 14l8 8m0-8-8 8"/>',
  power:'<path d="M17 3v13M9 7a13 13 0 1 0 16 0"/>',
  camera:'<path d="M3 10h8l3-5h6l3 5h8v21H3z"/><circle cx="17" cy="20" r="6"/>',
  chat:'<path d="M4 5h26v19H16l-8 7v-7H4zM10 12h14M10 17h9"/>',
  mail:'<rect x="3" y="6" width="28" height="22" rx="2"/><path d="m4 8 13 11L30 8M4 27l8-9m18 9-8-9"/>',
  lock:'<rect x="6" y="14" width="22" height="17" rx="2"/><path d="M11 14V9a6 6 0 0 1 12 0v5m-6 7v4"/>',
  warning:'<path d="m17 3 14 27H3zM17 12v8m0 5v1"/>',
  phone:'<path d="m9 3 5 8-4 3a22 22 0 0 0 10 10l3-4 8 5-1 5c-1 2-3 2-5 2C12 30 4 22 2 9c0-2 0-4 2-5z"/>'
 };
 return `<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.shield}</svg>`;
};
const serviceDiagram=()=>`<div class="irb-support-map" aria-label="상황에 맞춰 연결하는 네 가지 지원 영역"><div class="irb-map-label"><span>CONNECTING EXPERTISE</span><i aria-hidden="true"></i></div><svg class="irb-map-links" viewBox="0 0 480 270" fill="none" aria-hidden="true"><path d="M124 81h232v117H124zM124 81l232 117M356 81 124 198" stroke="#bfcfd8" stroke-width="1.1"/><circle cx="240" cy="140" r="33" fill="#f2f5f6" stroke="#cdd9df"/><path d="m231 140 6 6 12-14" stroke="#b67850" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="irb-map-nodes">${[
 ['search','원인 조사','경위·피해 범위'],['restore','데이터 복원','가능한 자료 복원'],['shield','재발 방지','접근·운영 개선'],['check','보안 점검','위험 설정 확인']
 ].map(([i,t,s])=>`<div class="irb-map-node">${icon(i)}<strong>${t}</strong><small>${s}</small></div>`).join('')}</div><p>사고 상황에 맞춰 필요한 지원을 연결합니다.</p></div>`;

const hero=()=>`<section class="irb-entry" id="top" aria-labelledby="irb-entry-title"><div class="if-frame"><div class="irb-entry-top"><div class="irb-entry-copy"><p class="irb-eyebrow">INCIDENT INVESTIGATION SERVICE</p><h1 id="irb-entry-title">침해사고 조사 서비스</h1><p class="irb-entry-lead">사고 원인 조사부터 데이터 복원,<br>재발 방지와 보안점검까지.</p><p class="irb-entry-description">랜섬웨어, 이메일·해킹, 개인정보 사고.<br>현재 상황을 확인하고 필요한 조사와 개선 방향을 안내합니다.</p><button class="irb-consult" type="button" data-contact>${icon('chat')}<span>전문가 상담</span><b aria-hidden="true">↗</b></button></div>${serviceDiagram()}</div>
 <a class="irb-first-response-link" href="#first-response"><span class="irb-alert-symbol">${icon('warning')}</span><strong>사고를 발견했다면?</strong><span>초기 대응 먼저 확인하기</span><b aria-hidden="true">↗</b></a>
 <nav class="irb-entry-guides" aria-label="침해사고 조사 분야별 빠른 안내">${[
  ['ransomware','lock','랜섬웨어 사고 조사','파일이 열리지 않고 업무가 멈췄나요?'],
  ['email-hacking','mail','이메일·해킹 조사','의심 메일이나 접속이 발견됐나요?'],
  ['privacy-audit','shield','개인정보·내부 보안점검','자료 유출과 보안 상태가 걱정되나요?']
 ].map(([id,i,t,q],n)=>`<a href="#${id}"><div class="irb-guide-icon">${icon(i)}</div><div><small>0${n+1} / QUICK GUIDE</small><strong>${t}</strong><span>${q}</span></div><b aria-hidden="true">↗</b></a>`).join('')}</nav>
 </div></section>`;

const aid=()=>`<section class="irb-first-response" id="first-response" aria-labelledby="irb-aid-title"><div class="if-frame"><div class="irb-aid-heading"><div><p class="irb-eyebrow">FIRST RESPONSE</p><h2 id="irb-aid-title">사고를 발견했다면,<br><em>확산을 줄이고 기록을 보존하세요.</em></h2></div><p>업무 영향과 시스템 상태에 맞춰<br>담당자와 필요한 조치부터 협의하세요.</p></div><ul class="irb-aid-map" aria-label="상황에 맞춰 확인할 초기 대응 항목">${[
 ['network','네트워크 격리','영향받은 기기를 네트워크에서 분리해 추가 확산을 줄입니다.'],
 ['power','전원 조치 전 확인','재부팅·전원 차단은 자료와 업무에 영향을 줄 수 있어 담당자와 협의합니다.'],
 ['camera','화면·발생 시점 기록','경고 메시지, 발견 시점과 이미 취한 조치를 기록해 둡니다.'],
 ['chat','삭제·포맷 전 상담','남은 파일과 기록을 보존하고 필요한 자료 확보 방법을 확인합니다.']
 ].map(([i,t,d])=>`<li><div class="irb-aid-node">${icon(i)}</div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul><div class="irb-aid-bottom"><div class="irb-aid-context">${icon('warning')}<p>네트워크 격리가 불가능하고 확산이 우려되는 경우에는<br>전원 차단을 포함한 긴급 조치를 검토합니다.</p></div><a class="irb-aid-phone" href="tel:1577-4872"><span>전문가와 조치 방법 상담</span><strong>1577-4872</strong><b aria-hidden="true">↗</b></a></div></div></section>`;

export function incidentEntryB(){return {hero:hero(),aid:aid()};}
