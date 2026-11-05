import {serviceIcon} from './service-design.mjs';

const symbols={
 warning:'<path d="m17 3 14 26H3zM17 12v8m0 4v1"/>',
 power:'<path d="M17 3v12M9 7a13 13 0 1 0 16 0"/>',
 camera:'<path d="M4 9h7l3-5h7l3 5h6v21H4z"/><circle cx="17" cy="19" r="6"/>',
 search:'<circle cx="14" cy="14" r="10"/><path d="m21 21 10 10"/>',
 restore:'<ellipse cx="14" cy="7" rx="10" ry="4"/><path d="M4 7v17c0 2 4 4 10 4M24 7v8M4 15c0 2 4 4 10 4m5 5a7 7 0 1 0 3-6m-2-3v6h6"/>'
};
const icon=name=>symbols[name]?`<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[name]}</svg>`:serviceIcon(name);

const quickItems=[
 ['ransomware','storage','랜섬웨어 사고 조사','파일이 암호화되거나 업무가 멈췄나요?','데이터 복원 · 원인 조사 · 재발 방지'],
 ['email-hacking','message','이메일·해킹 조사','의심스러운 메일이나 접속이 있나요?','계정·시스템 조사 · 보안 개선'],
 ['privacy-audit','shield','개인정보·내부 보안점검','자료 유출이나 보안의 빈틈이 걱정되나요?','유출 가능성 확인 · 취약점 점검']
];
const aidItems=[
 ['network','네트워크 격리','영향받은 기기를 네트워크에서 분리해 추가 확산을 줄입니다.'],
 ['power','전원 조치 전 확인','재부팅·전원 차단은 자료와 업무에 영향을 줄 수 있어 담당자와 협의합니다.'],
 ['camera','화면·발생 시점 기록','경고 메시지, 발견 시점과 이미 취한 조치를 기록해 둡니다.'],
 ['message','삭제·포맷 전 상담','남은 파일과 기록을 보존하고, 필요한 자료 확보 방법을 먼저 확인합니다.']
];

export function incidentEntryC(){
 const hero=`<section class="irc-hero" id="top" aria-labelledby="irc-hero-title"><div class="irc-hero-art" aria-hidden="true"><svg viewBox="0 0 1000 700" fill="none"><g stroke="currentColor" stroke-width="1"><path d="M40 310h150l80-80h190l120 120h170M50 420h180l85-85h130l120 120h210M210 150v100l70 70v225M385 120v90l100 100v275M600 180v75l-80 80v220"/><path d="M90 500h100l140-140h280l95 95h170M135 235h150l150 150h270" stroke-dasharray="3 8"/></g><g fill="currentColor"><circle cx="270" cy="230" r="5"/><circle cx="460" cy="230" r="5"/><circle cx="315" cy="335" r="5"/><circle cx="565" cy="455" r="5"/><circle cx="210" cy="250" r="5"/><circle cx="485" cy="310" r="5"/></g></svg></div><div class="if-frame irc-hero-frame"><div class="irc-hero-copy"><p class="irc-kicker">INCIDENT INVESTIGATION</p><h1 id="irc-hero-title">침해사고 조사 서비스</h1><p class="irc-hero-lead">사고 원인 조사부터 데이터 복원,<br>재발 방지와 보안점검까지.</p><p class="irc-hero-description">남아 있는 기록에서 사고 경위와 피해 범위를 확인합니다.<br>현재 상황에 필요한 조사·복원 작업과 보안 개선 방향을 안내합니다.</p><div class="irc-hero-actions"><button type="button" data-contact>전문가 상담하기 <span aria-hidden="true">↗</span></button><a href="#ransomware">서비스 알아보기 <span aria-hidden="true">↓</span></a></div><div class="irc-scope" aria-label="주요 지원 범위">${[['search','원인 조사'],['restore','데이터 복원'],['shield','재발 방지']].map(([i,t])=>`<span>${icon(i)}${t}</span>`).join('')}</div></div><aside class="irc-guide" aria-labelledby="irc-guide-title"><header><p class="irc-kicker">QUICK GUIDE</p><h2 id="irc-guide-title">어떤 도움이<br>필요하신가요?</h2><span>상황에 맞는 서비스를 확인하세요.</span></header><nav aria-label="침해사고 조사 빠른 안내">${quickItems.map(([id,i,t,q,d],n)=>`<a href="#${id}"><span class="irc-guide-icon">${icon(i)}</span><div><small>0${n+1}</small><strong>${t}</strong><span>${q}</span><em>${d}</em></div><b aria-hidden="true">↗</b></a>`).join('')}</nav></aside><a class="irc-hero-alert" href="#first-response"><span class="irc-hero-alert-icon">${icon('warning')}</span><span><strong>사고 발생 직후라면?</strong><span>초기 대응 먼저 확인하기</span></span><b aria-hidden="true">↓</b></a></div></section>`;
 const aid=`<section class="irc-aid" id="first-response" aria-labelledby="irc-aid-title"><div class="if-frame"><div class="irc-aid-layout"><header class="irc-aid-intro"><div class="irc-aid-symbol">${icon('warning')}<span>FIRST RESPONSE</span></div><h2 id="irc-aid-title">사고를 발견했다면,<br>먼저 확인하세요.</h2><p class="irc-aid-emphasis">피해 확산은 줄이고,<br>조사할 자료는 보존하도록.</p><p>업무 영향과 시스템 상태를 고려해<br>담당자와 조치 방법을 협의하세요.</p><a href="tel:1577-4872"><span>전문가 상담</span><strong>1577-4872</strong><b aria-hidden="true">↗</b></a></header><div class="irc-aid-content"><p class="irc-aid-eyebrow">초기에 확인할 네 가지</p><ul class="irc-aid-items">${aidItems.map(([i,t,d])=>`<li><div class="irc-aid-item-icon">${icon(i)}</div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul><p class="irc-aid-note">네트워크 격리가 불가능하고 확산이 우려되는 경우에는 전원 차단을 포함한 긴급 조치를 검토합니다.</p></div></div></div></section>`;
 return {hero,aid};
}
