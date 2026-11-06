const fields=[
 {id:'pc-storage',target:'data-leakage',title:'PC 저장매체 분석',english:'PC & Storage',copy:'파일 작업·삭제와 외장매체 연결 기록'},
 {id:'smartphone-forensics',target:'mobile-evidence',title:'스마트폰 분석',english:'Smartphone',copy:'통화·문자·앱과 백업 기록'},
 {id:'messenger-forensics',target:'messenger-analysis',title:'메신저 분석',english:'Messenger',copy:'대화의 맥락과 첨부파일'},
 {id:'audio-video',target:'media-authenticity',title:'음성,영상 분석',english:'Audio & Video',copy:'파일 구조와 생성·편집 정황'}
];

export function serviceChapterHeading({number,description,title,id}){return `<div class="home-offering-heading"><p class="home-offering-kicker">OUR SERVICE<span>${number} / 03</span></p><p class="home-offering-description">${description}</p><h2 id="${id}">${title}</h2></div>`;}

export function variedForensicsChapter(){return `<section id="home-digital-forensics" class="service-chapter home-forensics-portraits" aria-labelledby="home-forensics-gallery-title" data-home-chapter data-nav-label="디지털포렌식 서비스" data-nav-theme="light"><div class="container">
 <header class="forensics-portraits-heading">${serviceChapterHeading({number:'01',description:'디지털 증거 확보부터 정밀 분석까지',title:'<em>디지털포렌식</em> 서비스',id:'home-forensics-gallery-title'})}</header>
 <div class="forensics-portraits-grid">${fields.map((field,index)=>`<a class="forensics-portrait-card" data-field="${field.id}" href="digital-forensics.html#${field.target}" aria-label="${field.title} 자세히 보기"><div class="forensics-portrait-image" aria-hidden="true"><div class="forensics-portrait-crop"><img class="portrait-quadrant-${index}" src="assets/service-materials/service-field-photos-v1.png" alt="" width="1536" height="1024" loading="lazy"></div></div><div class="forensics-portrait-title"><span lang="en">${field.english}</span><h3>${field.title}</h3></div><div class="forensics-portrait-action"><p>${field.copy}</p><span class="forensics-portrait-arrow" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M4 14h19m-7-7 7 7-7 7"/></svg></span></div></a>`).join('')}</div>
 </div></section>`;}

const securityIcons={
 review:'<rect x="5" y="4" width="22" height="28" rx="2"/><path d="M11 11h10M11 17h7"/><circle cx="27" cy="27" r="7"/><path d="m32 32 5 5"/>',
 protection:'<path d="m20 3 14 6v10c0 9-8 15-14 18-6-3-14-9-14-18V9z"/><path d="m13 20 5 5 10-11"/>',
 infrastructure:'<rect x="4" y="5" width="32" height="12" rx="2"/><rect x="4" y="23" width="32" height="12" rx="2"/><path d="M10 11h1M16 11h1M27 11h3M10 29h1M16 29h1M27 29h3"/>'
};
const securityGroups=[
 {title:'점검·자료 관리',copy:'보안 설정과 업무 자료 관리',icon:'review',links:[['remote-security','원격 보안 점검'],['employee-offboarding','퇴사자 관리']]},
 {title:'보안 솔루션',copy:'접근 통제·위협 탐지·로그 관리',icon:'protection',links:[['security-solutions','보안 솔루션 도입']]},
 {title:'인프라·저장 환경',copy:'안전한 저장·백업·운영 환경',icon:'infrastructure',links:[['security-infrastructure','보안 인프라 구축'],['server-nas','서버·NAS·백업']]}
];

export function variedEnterpriseChapter(){return `<section id="home-enterprise-security" class="service-chapter home-security-selection" aria-labelledby="home-security-selection-title" data-home-chapter data-nav-label="기업 보안 관리" data-nav-theme="light"><div class="container">
 <header class="security-selection-heading">${serviceChapterHeading({number:'03',description:'보안 점검과 자료 관리부터 안전한 운영 환경 구축까지.',title:'기업 <em>보안 관리</em> 서비스',id:'home-security-selection-title'})}<a class="security-selection-more" href="enterprise-security.html">서비스 자세히 보기<span aria-hidden="true">+</span></a></header>
 <div class="security-selection-groups">${securityGroups.map((group,index)=>`<article class="security-selection-group"><div class="security-selection-symbol"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${securityIcons[group.icon]}</svg><span>${String(index+1).padStart(2,'0')}</span></div><div class="security-selection-copy"><h3>${group.title}</h3><p>${group.copy}</p></div><div class="security-selection-links">${group.links.map(([id,title])=>`<a href="enterprise-security.html#${id}">${title}<span aria-hidden="true">+</span></a>`).join('')}</div></article>`).join('')}</div>
 </div></section>`;}
