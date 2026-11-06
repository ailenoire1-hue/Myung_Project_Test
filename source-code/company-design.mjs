import {companyHero} from './company-hero.mjs';
import {companyNetworkSection} from './company-network-infrastructure.mjs';
import {recoveryCases,publicActivities,legalPartners} from './company-experience.mjs';
import {companyHistoryTimeline} from './company-history-timeline.mjs';

const heading=(label,title,copy='')=>`<header class="company-editorial-heading"><div><span class="detail-kicker">${label}</span><h2>${title}</h2></div>${copy?`<p>${copy}</p>`:''}</header>`;
const chapter=(id,extra,content,theme='light')=>`<section class="detail-section company-editorial ${extra}" id="${id}" data-nav-theme="${theme}"><div class="container">${content}</div></section>`;

function overview(c){
 const facts=[['회사명',c.legalName],['대표이사',c.ceo],['설립일',c.founded],['센터 상담',`<a href="tel:${c.phone}">${c.phone}</a>`],['본사',c.address],['상담 시간',c.hours+' · 주말·공휴일 휴무']];
 return chapter('information','company-overview-editorial',`<div class="company-identity-layout"><figure class="company-identity-photo"><img src="assets/company/hq-building.png" alt="충북 청주시 오창에 위치한 명정보기술 본사 전경" width="803" height="585" loading="lazy"><div class="company-photo-label"><span>MYUNG INFORMATION TECHNOLOGIES</span><strong>기술과 경험이<br>쌓이는 곳.</strong></div><figcaption>명정보기술 청주 오창 본사</figcaption></figure><div class="company-identity-copy" id="technical-recognition"><span class="detail-kicker">ABOUT MYUNG · SINCE 1990</span><h2>현장의 경험을,<br>기업의 디지털 안전으로.</h2><p class="company-identity-lead">손상된 데이터를 되찾는 기술에서<br>디지털 증거 분석과 보안사고 대응까지.</p><p>저장매체와 데이터에 대한 이해를 바탕으로 사건의 기록을 분석하고, 기업이 필요한 판단과 대응을 할 수 있도록 지원합니다.</p><dl class="company-identity-facts">${facts.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl></div></div>`);
}

function infrastructure(){
 const panels=[
  ['01','ANALYSIS INFRASTRUCTURE','국내 최대 규모의<br>전문 작업 인프라','전용 클린룸과 분석 시설로 저장매체의 상태에 맞는 작업 환경을 제공합니다.','video2019-cleanroom.png','명정보기술 클린룸과 전문 분석 작업 환경','lab'],
  ['02','PRECISION EQUIPMENT','최첨단 장비를 활용한 정밀 작업','정밀 진단·복구 장비로 회로와 저장매체를 살펴봅니다.','recovery-equipment-work.png','장비를 이용한 저장매체 회로의 정밀 작업','equipment'],
  ['03','EXPERIENCED ENGINEERS','평균 10년 이상 경력의 엔지니어','다양한 손상 유형과 복구 현장을 경험한 엔지니어가 진단합니다.','video2019-precision.png','숙련된 엔지니어의 현미경 아래 정밀 회로 작업','engineers']
 ];
 return chapter('capabilities','company-infrastructure-editorial',`${heading('INFRASTRUCTURE & EXPERTISE','기술의 깊이는,<br>분석 환경에서 시작됩니다.','전문 시설, 정밀 장비, 숙련된 엔지니어.<br>데이터의 상태에 맞는 분석과 복구를 수행합니다.')}<div class="company-infrastructure-mosaic">${panels.map(([n,label,title,copy,img,alt,key])=>`<figure class="infrastructure-photo infrastructure-${key}"><img src="assets/company/${img}" alt="${alt}" loading="lazy"><figcaption><span>${n} <i>${label}</i></span><h3>${title}</h3><p>${copy}</p></figcaption></figure>`).join('')}</div>`,'dark');
}

function national(){
 return chapter('national-response','company-recovery-editorial',`${heading('NATIONAL DISASTER RESPONSE','국가적 디지털 재난에<br>명정보기술의 기술이 함께했습니다.','침수된 저장매체의 CCTV부터 손상된 업무 시스템까지.<br>중요한 순간에 필요한 기록을 되찾았습니다.')}<div class="company-recovery-tabs" data-resource-tabs><div class="company-recovery-tablist" role="tablist" aria-label="국가 재난 대응 사례">${recoveryCases.map((c,i)=>`<button type="button" role="tab" id="company-case-tab-${i}" aria-controls="company-case-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><span>${c.year}</span><strong>${c.name}</strong></button>`).join('')}</div>${recoveryCases.map((c,i)=>`<article class="company-recovery-panel" role="tabpanel" id="company-case-panel-${i}" aria-labelledby="company-case-tab-${i}" ${i?'hidden':''}><figure class="company-recovery-photo case-photo-${i}"><img src="assets/${c.image}" alt="${c.alt}" loading="lazy"></figure><div class="company-recovery-copy"><span class="company-recovery-year">${c.year}</span><h3>${c.name}</h3><strong>${c.scope}</strong><p>${c.body}</p><div class="company-recovery-method"><span>복구 대상</span><b>${['침수·부식된 CCTV 저장매체','방송사·금융권 피해 시스템','침수된 CCTV 저장매체','손상된 블랙박스'][i]}</b><span>기술 지원</span><b>${['CCTV 영상 데이터 복원','데이터 확보 · 업무 복구 지원','사고 관련 CCTV 영상 복원','사고 관련 기록 복원'][i]}</b></div></div></article>`).join('')}</div>`);
}

function education(){
 return chapter('education-support','company-education-editorial',`<div class="company-education-layout"><div class="company-education-visual">${heading('KNOWLEDGE IN PRACTICE','현장의 기술을,<br>교육과 기술지원으로.')}<p class="company-education-intro">자료 확보와 디지털 증거 분석의 경험을<br>전문 교육과 기술 협력으로 나눕니다.</p><div class="company-training-gallery"><figure class="company-training-main"><img src="assets/company/training-chungbuk-2023.png" alt="충북지방변호사회 전문연수에서 강의하는 강사와 수강생" loading="lazy"><figcaption>충북지방변호사회 전문연수 · 2023.06</figcaption></figure><figure class="company-training-sub"><img src="assets/company/training-forensics-practice.png" alt="모바일 데이터 확보와 칩오프 방법을 설명하는 디지털포렌식 실무 교육" loading="lazy"><figcaption>디지털포렌식 실무 교육</figcaption></figure></div></div><div class="company-education-records"><div class="company-records-caption"><span>TECHNICAL EDUCATION & SUPPORT</span><h3>전문 역량을 연결하는 기술 교류</h3></div><ol>${publicActivities.map(([date,title,copy])=>`<li><span class="education-record-date">${date}</span><div><h4>${title}</h4><p>${copy}</p></div></li>`).join('')}</ol></div></div>`);
}

function partnerships(){
 return chapter('partnerships','company-partners-editorial',`${heading('PARTNERSHIPS','법률 전문성과 분석 기술,<br>신뢰할 수 있는 협력으로.','지방변호사회·법무법인과의 협력을 통해<br>디지털 증거 분석과 법률 검토의 접점을 넓힙니다.')}<div class="company-partners-layout"><div class="company-partner-roster"><span class="company-roster-label">함께하는 법률 전문가</span><ul>${legalPartners.map(([name,copy])=>`<li><strong>${name}</strong><span>${copy}</span></li>`).join('')}</ul></div><div class="company-agreements" aria-label="업무협약 현장 사진"><figure><img src="assets/company/chungbuk-bar-mou-2023.png" alt="2023년 명정보기술과 충북지방변호사회 업무협약식" width="580" height="300" loading="lazy"><figcaption><span>2023</span><strong>충북지방변호사회 업무협약</strong></figcaption></figure><figure><img src="assets/company/jeju-bar-mou-wide-2024.png" alt="2024년 명정보기술과 제주지방변호사회 업무협약식" width="829" height="482" loading="lazy"><figcaption><span>2024</span><strong>제주지방변호사회 업무협약</strong></figcaption></figure></div></div>`);
}

function history(){
 return chapter('history','company-history-editorial',`${heading('OUR JOURNEY','1990년부터 이어온<br>기술의 발자취.','복구 인프라 구축에서 국가적 사고 대응,<br>전문 기술과 법률 협력으로 이어온 기록입니다.')}<div class="company-history-era-labels" aria-hidden="true"><span>기술 기반과 분석 인프라</span><span>국가적 사고 대응</span><span>기술 고도화와 전문 협력</span></div>${companyHistoryTimeline()}`,'dark');
}

export function companyEditorialPage({company:c}){
 const navigation=[['information','회사 개요'],['center','센터·전국망'],['capabilities','분석 역량'],['national-response','국가 재난 대응'],['education-support','교육·기술지원'],['partnerships','파트너십'],['history','주요 연혁']];
 return `${companyHero()}<div class="detail-jumps"><nav class="container" aria-label="페이지 내 메뉴">${navigation.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav></div>${overview(c)}${companyNetworkSection()}${infrastructure()}${national()}${education()}${partnerships()}${history()}`;
}
