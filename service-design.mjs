import {serviceDetails} from './service-details.mjs';

const symbols={
 pc:'<rect x="4" y="5" width="24" height="17" rx="2"/><path d="M11 28h10M16 22v6M8 10h10m-10 4h6"/>',
 phone:'<rect x="9" y="2" width="14" height="28" rx="3"/><path d="M13 6h6m-4 20h2"/>',
 message:'<path d="M5 5h22v17H14l-7 6v-6H5zM10 10h12m-12 5h8"/>',
 media:'<rect x="3" y="6" width="26" height="20" rx="2"/><path d="m13 11 8 5-8 5z"/>',
 scan:'<path d="M3 12V4h8m10 0h8v8m0 9v8h-8m-10 0H3v-8M8 17h5l3-8 4 15 3-7h4"/>',
 account:'<circle cx="16" cy="10" r="6"/><path d="M4 28v-4c0-8 24-8 24 0v4M24 5l3 3 5-6"/>',
 shield:'<path d="m16 3 12 5v9c0 7-12 13-12 13S4 24 4 17V8zM10 16l4 4 8-9"/>',
 storage:'<rect x="4" y="4" width="24" height="10" rx="2"/><rect x="4" y="19" width="24" height="10" rx="2"/><path d="M8 9h1m4 0h1m-6 15h1m4 0h1M21 9h3m-3 15h3"/>',
 network:'<rect x="11" y="2" width="10" height="8" rx="1"/><path d="M16 10v7M5 22v-5h22v5"/><rect x="1" y="22" width="8" height="8" rx="1"/><rect x="12" y="22" width="8" height="8" rx="1"/><rect x="23" y="22" width="8" height="8" rx="1"/>'
};
export const serviceIcon=key=>`<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[key]||symbols.shield}</svg>`;
const intros={
 'digital-forensics':{number:'01',caption:'DIGITAL EVIDENCE',image:'service-materials/pc-storage-workstation.webp',alt:'명정보기술 PC와 저장매체 분석 워크스테이션',keys:['pc','phone','message','media'],tags:['자료 확보','기록 분석','증거 보고']},
 'incident-response':{number:'02',caption:'INCIDENT INVESTIGATION',image:'service-materials/incident-home-lab.jpg',alt:'보안사고 분석과 로그 검토를 표현한 이미지',keys:['storage','shield','message'],tags:['원인 규명','피해 범위','대응 검토']},
 'enterprise-security':{number:'03',caption:'SECURITY MANAGEMENT',image:'calm-1-art.jpg',alt:'기업의 데이터와 시스템 인프라를 표현한 이미지',keys:['scan','account','shield','storage','network'],tags:['점검','자료 관리','솔루션·인프라']}
};
export function serviceOpening(service,title,description){
 const s=intros[service.slug];
 return `<section class="page-hero detail-hero detail-hero-full service-opening" data-nav-theme="dark"><div class="service-opening-photo"><img src="assets/${s.image}" alt="${s.alt}" fetchpriority="high"><span>${s.caption}</span></div><div class="container detail-hero-frame"><div class="detail-breadcrumb"><a href="index.html">홈</a><span>/</span><span>${service.name}</span></div><div class="service-opening-content"><span class="detail-kicker">OUR SERVICE <b>${s.number} / 03</b></span><p class="detail-page-label">${service.name}</p><h1>${title.replace(/\n/g,'<br>')}</h1><p class="detail-hero-description">${description}</p><div class="service-opening-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div><button class="detail-button detail-button-accent" data-contact>전문가 상담 <span aria-hidden="true">↗</span></button></div><nav class="service-opening-areas" aria-label="${service.name} 바로가기">${service.items.map((item,i)=>`<a href="#${item.id}">${serviceIcon(s.keys[i])}<span><small>0${i+1}</small><strong>${item.name}</strong></span><i aria-hidden="true">↗</i></a>`).join('')}</nav><div class="detail-hero-bottom"><a class="detail-scroll-link" href="#${service.slug==='digital-forensics'?'analysis-fields':service.items[0].id}"><span class="detail-scroll-track" aria-hidden="true"></span>서비스 자세히 보기</a><span class="detail-hero-bottom-label">MYUNG DIGITAL FORENSIC CENTER</span></div></div></section>`;
}

const management={
 'remote-security':{label:'CHECK',icon:'scan',headline:'보안의 빈틈을 찾아,<br>개선의 순서를 정합니다.',copy:'시스템 설정과 접근 권한, 로그·백업 상태를 점검해 우선 개선할 항목을 정리합니다.',focus:['시스템 설정','계정·접근 권한','로그·백업'],nodes:['업무 시스템','계정·인증','원격 접속','기록·백업'],hub:'보안 점검',output:'점검 결과 · 개선 우선순위'},
 'employee-offboarding':{label:'MANAGE',icon:'account',headline:'퇴사 전후의 업무 자료,<br>확인과 인계를 체계적으로.',copy:'업무용 기기와 계정을 점검하고, 자료 보존·인계와 접근 권한 회수를 지원합니다.',focus:['자료 보존','사용 흔적 확인','권한 회수·인계'],nodes:['기기·계정 확인','자료 보존','활동 검토','권한 회수·인계'],hub:'퇴사자 관리',output:'점검표 · 주요 활동 검토 자료'},
 'security-solutions':{label:'PROTECT',icon:'shield',headline:'기업의 운영 환경에 맞는<br>보안 체계를 구성합니다.',copy:'보호할 자산과 필요한 기능을 먼저 확인하고, 기존 환경에 맞는 보안 솔루션 도입을 검토합니다.',focus:['보호 대상','필요 기능','운영 연계'],nodes:['접근 통제','위협 탐지','로그 관리','대응 절차'],hub:'보호 체계',output:'구성 제안 · 운영 체크리스트'},
 'server-nas':{label:'STORE',icon:'storage',headline:'데이터가 쌓이는 공간부터,<br>복구 가능한 운영까지.',copy:'업무량과 데이터 증가에 맞춰 서버·스토리지, 접근 권한과 백업·복구 구성을 함께 검토합니다.',focus:['용량·성능','접근 권한','백업·복구'],nodes:['업무 데이터','서버·NAS','별도 백업','복구 확인'],hub:'데이터 운영',output:'서버·스토리지 구성 · 백업·복구 계획'},
 'security-infrastructure':{label:'CONNECT',icon:'network',headline:'각각의 보안 요소를,<br>하나의 운영 체계로.',copy:'계정·네트워크·로그·백업을 연결하고, 구축 이후 운영자가 관리할 수 있는 환경을 마련합니다.',focus:['구조 설계','구축·설정','검증·인계'],nodes:['계정·권한','네트워크','보안 로그','백업 환경'],hub:'통합 운영',output:'구성도 · 검증 내역 · 운영 자료'}
};
function managementVisual(id,m){
 return `<div class="management-visual management-visual-${id}" aria-label="${m.hub} 주요 구성"><div class="management-visual-top"><span>${m.label} / WORKFLOW</span><small>주요 관리 영역</small></div>${id==='employee-offboarding'||id==='server-nas'?`<ol class="management-route">${m.nodes.map((n,i)=>`<li><span>0${i+1}</span>${serviceIcon(i===0?m.icon:i===3?'shield':'storage')}<strong>${n}</strong></li>`).join('')}</ol>`:`<div class="management-orbit"><div class="management-hub">${serviceIcon(m.icon)}<strong>${m.hub}</strong></div>${m.nodes.map((n,i)=>`<div class="management-node node-${i}"><span>0${i+1}</span>${n}</div>`).join('')}</div>`}<div class="management-visual-result"><span>DELIVERABLE</span><strong>${m.output}</strong></div></div>`;
}
export function enterpriseChapters(service){
 return `<div class="management-services" id="overview">${service.items.map((item,i)=>{const m=management[item.id],d=serviceDetails[item.id];return `<section class="management-chapter detail-section" data-detail-chapter id="${item.id}"><div class="container"><div class="management-heading"><div><span class="detail-kicker">${m.label} <b>0${i+1} / 05</b></span><h2>${item.name}</h2></div><p>${m.headline}</p></div><div class="management-layout">${managementVisual(item.id,m)}<div class="management-copy"><p class="management-lead">${m.copy}</p><ol class="management-scope">${d.scope.map((copy,j)=>`<li><span>0${j+1}</span><div><h3>${m.focus[j]}</h3><p>${copy}</p></div></li>`).join('')}</ol><details class="chapter-more"><summary>적용 상황과 제공 자료<span aria-hidden="true">+</span></summary><div class="management-extra"><h4>이런 상황에 필요합니다</h4><ul>${d.situations.map(x=>`<li>${x}</li>`).join('')}</ul><h4>제공 자료</h4><ul>${d.outputs.map(x=>`<li>${x}</li>`).join('')}</ul></div></details><button class="detail-button management-consult" data-contact>${i<2?'점검·관리 상담':'도입·구축 상담'} <span aria-hidden="true">↗</span></button></div></div></div></section>`;}).join('')}</div>`;
}

const incidentSources={ransomware:['접속·인증 로그','암호화·실행 흔적','백업·저장소'],malware:['의심 파일','시스템·보안 로그','외부 통신 기록'],'personal-data':['메일 원문','로그인·권한 기록','조회·전송 기록']};
export function incidentScope(field,i){
 const sources=incidentSources[field.id];
 return `<div class="ir-service-screen investigation-screen" data-detail-chapter id="${field.id}" aria-labelledby="title-${field.id}"><div class="investigation-heading"><div class="investigation-number">0${i+1}<span>INVESTIGATION</span></div><div><span class="detail-kicker">${field.tag}</span><h2 id="title-${field.id}">${field.name}</h2><p>${field.description}</p></div></div><div class="investigation-layout"><div class="investigation-evidence"><span class="investigation-panel-label">RECORDS TO REVIEW</span><h3>조사의 출발점은<br>남아 있는 기록입니다.</h3><div class="investigation-sources">${sources.map((s,j)=>`<div>${serviceIcon(['storage','scan','network'][j])}<span>${s}</span></div>`).join('')}</div><div class="investigation-signal"><small>이런 징후가 있다면</small><p>${field.signal}</p></div></div><ol class="investigation-scope">${field.scope.map(([title,copy],j)=>`<li><span>0${j+1}</span><div><h3>${title}</h3><p>${copy}</p></div></li>`).join('')}</ol></div><div class="investigation-bottom"><span>확보된 기록을 교차 확인해 사고 경위와 영향 범위를 정리합니다.</span><a href="#${{'ransomware':'ransomware-analysis','malware':'malware-analysis','personal-data':'email-analysis'}[field.id]}">분석 예시 살펴보기 <span aria-hidden="true">↓</span></a></div></div>`;
}
