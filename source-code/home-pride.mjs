import {nationalRecoveryPanel} from './national-cases.mjs';
import {replaceServiceChapter} from './home-service-editorial.mjs';

// Source: company history and official HRDK profile.
// Recognition belongs to CEO Lee Myung-jae; it is not a 대한민국명장 designation.
export const milestones=[
 {year:'2010',label:'천안함 CCTV 영상 복원',legacy:0},
 {year:'2011',label:'제55호 기능한국인 선정',name:'제55호 기능한국인',category:'공식 기술인 선정',outcome:'이명재 대표이사 · 2011년 7월 선정',detail:'고용노동부와 한국산업인력공단의 제55호 이달의 기능한국인으로 선정됐습니다.',image:'company/ceo-skilled-technician-2011.jpeg',alt:'2011년 7월 이명재 대표이사에게 수여된 제55호 기능한국인 상패',caption:'제55호 기능한국인 상패 · 고용노동부·한국산업인력공단',contain:true},
 {year:'2013',label:'3·20 전산대란 복구 지원',name:'3·20 전산대란',category:'기술 지원 성과',outcome:'100명 투입 · 피해 시스템 복구 완료',detail:'손상된 데이터 구조를 분석하고, 방송사·금융권의 피해 시스템 복구를 지원했습니다.',image:'national-320-concept-v1.png',alt:'서버 장애와 디지털 사고 대응 환경을 표현한 AI 생성 콘셉트 이미지. 실제 3·20 전산대란 현장 사진이 아닙니다.',caption:'서버 장애·디지털 사고 대응 콘셉트',concept:true},
 {year:'2014',label:'세월호 CCTV 영상 복원',legacy:2},
 {year:'2019',label:'말레이시아 CSM 기술 협력',name:'말레이시아 CSM',category:'국가기관 기술 협력',outcome:'보안관제·디지털복구·포렌식센터 구축',detail:'말레이시아 사이버보안청(CSM)의 보안관제 및 디지털복구·포렌식센터 구축에 참여했습니다.',image:'company/csm-cooperation-ceremony.png',alt:'명정보기술과 말레이시아 CSM의 보안관제 및 디지털포렌식 협력 서명 현장',caption:'말레이시아 CSM 기술 협력 현장'},
];

export function panel(item,index){
 const id=`pride-case-${index}`;
 if(item.legacy!==undefined)return nationalRecoveryPanel(item.legacy,'pride-recovery')
  .replace(`id="pride-recovery-${item.legacy}"`,`id="${id}"`)
  .replace(/<article([^>]*)>/,(_,attributes)=>`<article${attributes.replace(/\s+hidden\b/g,'')}${index?' hidden':''}>`);
 const photo={image:item.image,caption:item.caption,alt:item.alt};
 const conceptLabel=item.concept?'<span class="pride-concept-label">AI 생성 · 사건 이해를 위한 연출 이미지</span>':'';
 return `<article class="national-panel national-recovery-panel" id="${id}" hidden><div class="national-photo-group" data-national-photo-group><script type="application/json" data-national-photo-data>${JSON.stringify({initial:0,photos:[photo]}).replace(/</g,'\\u003c')}</script><figure class="national-recovery-photo${item.contain?' pride-photo-contain':''}"><div class="national-photo-window"><img src="assets/${item.image}" alt="${item.alt}" loading="lazy" data-national-main-photo><img class="national-next-photo" alt="" aria-hidden="true" data-national-next-photo>${conceptLabel}</div><figcaption data-national-photo-caption>${item.caption}</figcaption></figure></div><div class="national-panel-copy"><div><span class="national-year">${item.year}</span><h3>${item.name}</h3></div><div class="national-recovery-result"><span>${item.category}</span><strong>${item.outcome}</strong><p>${item.detail}</p></div></div></article>`;
}

function prideSection(){return `<section class="national-section home-pride" id="national-experience" aria-labelledby="home-pride-title" data-nav-theme="light"><div class="container pride-layout" data-national-gallery>
 <div class="pride-overview"><header class="pride-heading"><p class="pride-kicker">PRIDE OF MYUNG</p><h2 id="home-pride-title">국가가 인정한 기술력,<br><em>현장에서 증명한 신뢰.</em></h2><p class="pride-description">재난 현장의 데이터복구부터 국가기관 기술 협력까지.<br>명정보기술이 쌓아온 기술과 경험을 소개합니다.</p></header>
 <nav class="pride-milestones" aria-label="연도별 주요 업적">${milestones.map((item,i)=>`<button type="button" data-national-select="${i}" aria-controls="pride-case-${i}" aria-pressed="${i===0}"><span class="pride-milestone-year">${item.year}</span><span class="pride-milestone-label">${item.label}</span><span class="pride-milestone-arrow" aria-hidden="true">→</span></button>`).join('')}</nav>
 <a class="pride-company-link" href="company.html#national-response">회사 더 알아보기<span aria-hidden="true">↗</span></a></div>
 <div class="pride-gallery">${milestones.map(panel).join('')}</div>
 </div></section>`;}

export function applyPrideDesign(home,{version}){
 return replaceServiceChapter(home,'national-experience',prideSection())
 .replace('</head>',`<link rel="stylesheet" href="assets/home-pride.css?v=${version}"></head>`);
}
