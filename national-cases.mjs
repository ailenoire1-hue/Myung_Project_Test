import {companyFacts as facts} from './company-facts.mjs';
export const nationalDesigns = [
 {id:'a',name:'기술 지원 사례',summary:'밝은 배경에 세 가지 사례를 나란히 배치합니다. 사진과 기술 지원 내용이 한눈에 들어오는 구성입니다.'},
 {id:'b',name:'현장 중심 갤러리',summary:'천안함·세월호는 합본 이미지 한 장으로, 전산대란은 MBC·KBS 복구 현장 사진 두 장을 자동으로 번갈아 보여줍니다.'},
 {id:'c',name:'기술의 기록',summary:'메인과 이어지는 어두운 배경에 연도와 사례를 간결하게 정리합니다. 축적된 경험을 차분하게 보여주는 구성입니다.'}
];
const cases = [
 {year:'2010',name:'천안함',role:'CCTV 영상 복원 및 포렌식 검증',description:'침수·부식된 저장매체의 CCTV 영상 복원과 포렌식 검증을 지원했습니다.',image:'national-cheonan.jpeg',alt:'천안함 CCTV 저장매체 분리, 세척 및 영상 복원 과정 자료',caption:'CCTV 복원 과정 자료'},
 {year:'2013',name:'3·20 전산대란',role:'피해 시스템 데이터 복구',description:'방송사·금융권의 전산 피해에 대응해 손상된 시스템의 데이터 복구를 지원했습니다.',image:'national-320.png',alt:'3·20 전산대란 당시 복구 작업 현장과 피해 PC 자료',caption:'피해 시스템 복구 작업 현장'},
 {year:'2014',name:'세월호',role:'CCTV 영상 복원 및 포렌식 검증',description:'장기간 침수된 저장매체의 데이터와 CCTV 영상 복원, 포렌식 검증을 지원했습니다.',image:'national-sewol.jpeg',alt:'세월호 복구 작업에 사용된 침수 저장매체 사진',caption:'침수 저장매체 자료'}
];
const photograph=(item)=>`<img src="assets/${item.image}" alt="${item.alt}" loading="lazy">`;
const heading=`<span class="national-eyebrow">EXPERIENCE & TECHNOLOGY</span><h2>국가적 디지털 재난 현장에,<br><em>명정보기술의 기술</em>이 함께했습니다.</h2>`;
const recoveryRecords=[
 {outcome:'침수·부식 저장매체의 CCTV 영상 복원',detail:'저장매체 분리·세척부터 영상 복원, 포렌식 검증까지 수행했습니다.',initial:0,fit:'wide',photos:[
  {image:'national-cheonan-recovery.png',label:'침수 저장장치 복구',caption:'천안함 CCTV 침수 저장장치 복구 자료',alt:'침수된 천안함 CCTV 저장장치 회로와 영상 복원을 소개한 사진'}
 ]},
 {outcome:'100명 투입 · 피해 시스템 복구 완료',detail:'손상된 데이터 구조를 분석하고, 방송사·금융권의 피해 시스템 복구를 지원했습니다.',initial:0,fit:'cover',photos:[
  {image:'national-320-kbs.png',label:'KBS 복구 현장',caption:'KBS 피해 PC 복구 작업 현장',alt:'3·20 전산대란 당시 KBS 현장에서 피해 PC 복구를 진행하는 작업자들'},
  {image:'national-320.png',label:'MBC 복구 현장',caption:'MBC 피해 PC 복구 작업 현장',alt:'3·20 전산대란 당시 MBC PC를 복구하는 작업자들과 복구 대상 PC'}
 ]},
 {outcome:'55일간 복구 작업 · CCTV 영상 복원 완료',detail:'장기간 침수된 저장매체에서 CCTV 영상을 복원하고 포렌식 검증 후 원본을 봉인·인계했습니다.',initial:0,fit:'wide',crop:'sewol',photos:[
  {image:'national-sewol-cctv.jpeg',label:'복원된 CCTV',caption:'복원된 세월호 CCTV 영상 화면 자료',alt:'세월호 CCTV 복원 결과를 여러 카메라의 녹화 화면으로 정리한 사진'}
 ]}

];
function recoveryGallery(item,index,prefix){
 const record=recoveryRecords[index];const active=record.photos[record.initial];
 const photoData=JSON.stringify({initial:record.initial,photos:record.photos}).replace(/</g,'\\u003c');
 return `<article class="national-panel national-recovery-panel" id="${prefix}-${index}" ${index?'hidden':''}><div class="national-photo-group" data-national-photo-group><script type="application/json" data-national-photo-data>${photoData}</script><figure class="national-recovery-photo${record.fit?' photo-fill':''}${record.fit==='wide'?' photo-wide':''}${record.crop==='sewol'?' photo-sewol-crop':''}" ><div class="national-photo-window"><img src="assets/${active.image}" alt="${active.alt}" loading="lazy" data-national-main-photo><img class="national-next-photo" alt="" aria-hidden="true" data-national-next-photo></div><figcaption data-national-photo-caption>${active.caption}</figcaption></figure></div><div class="national-panel-copy"><div><span class="national-year">${item.year}</span><h3>${item.name}</h3></div><div class="national-recovery-result"><span>기술 지원 성과</span><strong>${record.outcome}</strong><p>${record.detail}</p></div></div></article>`;
}
export function nationalRecoveryPanel(index,prefix){return recoveryGallery(cases[index],index,prefix);}
export function nationalShowcaseSection(){
 const prefix='national-showcase';
 return `<section class="national-section national-b national-showcase" id="national-experience" aria-labelledby="national-showcase-title" data-nav-theme="light"><div class="container"><header class="national-showcase-heading"><div><p class="national-showcase-kicker">WHY MDFC</p><h2 id="national-showcase-title">국가적 디지털 재난 현장에,<br><em>명정보기술의 기술</em>이 함께했습니다.</h2></div><div class="national-showcase-intro"><p><strong>${facts.experienceYears}년간 축적한 복구·검증 역량.</strong><br>현장의 경험을 기업의 디지털 증거 분석과<br> 보안사고 조사·대응으로 이어갑니다.</p><a href="company.html">회사 더 알아보기<span aria-hidden="true">+</span></a></div></header><div class="national-gallery national-showcase-gallery" data-national-gallery>${cases.map((item,i)=>recoveryGallery(item,i,prefix)).join('')}<div class="national-case-select" aria-label="기술 지원 사례 선택">${cases.map((item,i)=>`<button type="button" data-national-select="${i}" aria-controls="${prefix}-${i}" aria-pressed="${i===0}"><span>${item.year}</span><strong>${item.name}</strong></button>`).join('')}</div></div></div></section>`;
}
export function nationalSection(id, context='page') {
 const prefix=`national-${context}-${id}`;
 let body='';
 if(id==='a') body=`<header class="national-heading">${heading}<p>천안함, 3·20 전산대란, 세월호.<br>중요한 순간의 데이터 복구와 검증을 기술로 지원했습니다.</p></header><div class="national-card-grid">${cases.map(item=>`<article class="national-card"><figure>${photograph(item)}<figcaption>${item.caption}</figcaption></figure><div class="national-card-copy"><span class="national-year">${item.year}</span><h3>${item.name}</h3><p>${item.role}</p></div></article>`).join('')}</div><div class="national-closing"><span>현장에서 축적한 기술과 경험</span><p>기업의 디지털 증거 분석과 보안사고 조사·대응으로 이어갑니다.</p></div>`;
 if(id==='b') body=`<div class="national-gallery-layout"><header class="national-heading">${heading.replace("EXPERIENCE & TECHNOLOGY","WHY MDFC")}<p class="national-intro-copy">국가적 디지털 재난 현장에서 축적한 경험,<br>기업의 디지털 안전을 지키는 기술로</p><p class="national-service-copy">명정보기술은 <strong>${facts.experienceYears}년간</strong> 현장에서 축적한 복구·검증 역량을 바탕으로<br>기업의 디지털 증거 분석과 보안사고 조사·대응을 지원합니다.</p><a class="national-company-link" href="company.html">회사 더 알아보기</a></header><div class="national-gallery" data-national-gallery>${cases.map((item,i)=>recoveryGallery(item,i,prefix)).join('')}<div class="national-case-select" aria-label="기술 지원 사례 선택">${cases.map((item,i)=>`<button type="button" data-national-select="${i}" aria-controls="${prefix}-${i}" aria-pressed="${i===0}"><span>${item.year}</span>${item.name}</button>`).join('')}</div></div></div>`;
 if(id==='c') body=`<div class="national-record-layout"><header class="national-heading">${heading}<p>국가적 중대사건의 데이터 복구와 검증.<br>그 현장에 명정보기술이 함께했습니다.</p><div class="national-record-foot">현장의 경험을 기업의<br>디지털 사고 대응으로 연결합니다.</div></header><div class="national-record-list">${cases.map(item=>`<article class="national-record"><span class="national-year">${item.year}</span><figure>${photograph(item)}</figure><div><h3>${item.name}</h3><p>${item.role}</p></div></article>`).join('')}</div></div>`;
 return `<section class="national-section national-${id}" id="${context==='page'?'national-experience':prefix}" aria-label="국가적 중대사건 기술 지원 사례"><div class="container">${body}</div></section>`;
}
export function nationalTools(id) {return `<nav class="national-preview-nav" aria-label="국가적 재난 대응 영역 시안 비교"><a href="national-previews.html">3가지 시안 비교</a>${nationalDesigns.map(v=>`<a href="national-${v.id}.html?intro=1" ${v.id===id?'aria-current="page"':''}>${v.id.toUpperCase()}안 · ${v.name}</a>`).join('')}<a href="index.html?intro=1">현재 메인</a></nav>`;}
export function nationalComparison(){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>국가적 재난 대응 사례 · 3가지 시안 | MDFC</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/national-cases.css"><script src="assets/national-cases.js" defer></script></head><body class="national-comparison"><main><header class="national-comparison-heading container"><a href="index.html?intro=1" class="national-comparison-brand">MDFC <span>명디지털포렌식센터</span></a><span class="national-eyebrow">SECTION DESIGN · 3 OPTIONS</span><h1>중요한 순간을 함께한 기술.</h1><p>선택한 인트로와 메인은 유지하고, 바로 아래 기술 지원 사례 영역을 비교합니다.<br></p></header>${nationalDesigns.map(v=>`<article class="national-option"><header class="national-option-heading container"><div><span>${v.id.toUpperCase()}안</span><h2>${v.name}</h2></div><p>${v.summary}</p></header>${nationalSection(v.id,'compare')}<div class="national-option-actions container"><a href="national-${v.id}.html?intro=1">인트로부터 전체 화면 보기 <span aria-hidden="true">↗</span></a><a href="national-${v.id}.html?skip=1#national-experience">해당 영역 바로 보기 <span aria-hidden="true">↓</span></a></div></article>`).join('')}<footer class="national-comparison-footer container"><a href="index.html?intro=1">현재 선택된 메인으로 돌아가기</a></footer></main></body></html>`;}
