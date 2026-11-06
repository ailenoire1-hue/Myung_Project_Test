import {forensicFields} from './forensic-fields.mjs';
import {servicePages} from './service-details.mjs';
import {serviceIcon} from './service-design.mjs';
import {reportSamples} from './report-samples.mjs';

export const forensicRenewalOptions=[
 {id:'a',name:'서비스 안내서형'},
 {id:'b',name:'분석 흐름형'},
 {id:'c',name:'고객 질문형'}
];
const num=i=>String(i+1).padStart(2,'0');
const keys=['pc','phone','message','media'];
const names=['PC·저장매체 분석','스마트폰 분석','메신저 분석','음성·영상 분석'];
const ul=items=>`<ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const heading=(n,en,title,desc='')=>`<header class="dfx-heading"><div><span class="dfx-kicker">${n} / ${en}</span><h2>${title}</h2></div>${desc?`<p>${desc}</p>`:''}</header>`;
const chapter=(id,cls,html,dark=false)=>`<section id="${id}" class="detail-section dfx-chapter ${cls}" data-nav-theme="${dark?'dark':'light'}"><div class="dfx-frame">${html}</div></section>`;
const definition='디지털포렌식은 기기와 파일에 남은 기록을 수집·보존하고, 사건과 관련된 사실관계를 분석하는 서비스입니다.';
const uses=[['자료 사용·이동 확인','문서가 언제 사용됐는지, 외부 저장장치의 기록과 어떤 관계가 있는지 살펴봅니다.'],['대화와 자료의 관계 확인','참여자·시각·대화 맥락과 첨부파일을 연결해 관련 기록을 검토합니다.'],['파일 생성·변경 정황 검토','원본과 비교 자료, 파일 구조와 시간 정보를 대조해 확인 근거를 정리합니다.']];
const sourceNames=[['pc','PC·저장매체','파일 / 사용 이력'],['phone','스마트폰','연락 / 앱 / 백업'],['message','메신저','대화 / 첨부파일'],['media','음성·영상','원본 / 시간 기록']];
const results=['핵심 결과 요약','주요 행위 타임라인','관련 증거 목록'];
const flow=()=>`<div class="dfx-evidence-flow" aria-label="확보한 자료를 분석해 결과로 정리하는 흐름"><div class="dfx-flow-sources"><span class="dfx-small">SOURCE / 확인할 자료</span>${sourceNames.map(x=>`<div>${serviceIcon(x[0])}<span><strong>${x[1]}</strong><small>${x[2]}</small></span></div>`).join('')}</div><div class="dfx-flow-hub"><span class="dfx-small">ANALYSIS / 교차 확인</span><div class="dfx-orbit"><span>시간</span><span>행위</span><span>출처</span><span>맥락</span><strong>MDFC<small>DIGITAL FORENSICS</small></strong></div><p>수집·보존 → 분석·대조</p></div><div class="dfx-flow-results"><span class="dfx-small">RESULT / 전달할 결과</span>${results.map((x,i)=>`<div><span>${num(i)}</span><strong>${x}</strong><b aria-hidden="true">↗</b></div>`).join('')}<p>확인한 사실과 분석 의견,<br>판단 범위를 함께 설명합니다.</p></div></div>`;
function overview(id){
 if(id==='a')return chapter('service-overview','dfx-overview',`<div class="dfx-overview-editorial"><div class="dfx-overview-copy"><span class="dfx-kicker">01 / SERVICE OVERVIEW</span><h2>남아 있는 기록을 분석해,<br><em>확인할 사실을 명확하게.</em></h2><p>${definition}</p><div class="dfx-purpose-list">${uses.map((x,i)=>`<div><span>${num(i)}</span><p><strong>${x[0]}</strong><small>${x[1]}</small></p></div>`).join('')}</div></div><div class="dfx-overview-visual"><img src="assets/service-materials/pc-storage-workstation.webp" alt="명정보기술의 PC·저장매체 분석 워크스테이션"><div class="dfx-visual-caption"><span>DIGITAL FORENSICS</span><strong>자료를 확보하고,<br>기록을 연결하고,<br>근거를 설명합니다.</strong></div></div></div><div class="dfx-principle"><strong>분석의 기준</strong><span>자료의 출처와 확보 과정 기록</span><span>서로 다른 기록의 교차 확인</span><span>확인 사실과 판단 한계 구분</span></div>`);
 if(id==='b')return chapter('service-overview','dfx-overview',`${heading('01','SERVICE OVERVIEW','디지털 자료에서, 설명할 수 있는 근거로.',definition)}${flow()}<div class="dfx-overview-foot"><span>분석 활용</span><p>기업 내부 조사 · 자료 이동 정황 확인 · 대화·첨부파일 검토 · 분쟁 관련 사실 확인</p></div>`,true);
 return chapter('service-overview','dfx-overview',`${heading('01','SERVICE OVERVIEW','어떤 사실을 확인하고 싶으신가요?',definition)}<div class="dfx-question-cards">${uses.map((x,i)=>`<article><div>${serviceIcon(['pc','message','media'][i])}<span>0${i+1}</span></div><h3>${['자료가 언제,<br>어떻게 사용됐나요?','누가 나눈 대화이며,<br>어떤 파일이 연결됐나요?','원본과 다른 기록,<br>어떤 의미가 있나요?'][i]}</h3><p>${x[1]}</p><small>${['PC·저장매체','스마트폰·메신저','음성·영상'][i]}</small></article>`).join('')}</div><div class="dfx-answer-flow"><span>확인할 질문</span><b aria-hidden="true">→</b><span>관련 자료 확보·대조</span><b aria-hidden="true">→</b><strong>사실과 근거를 정리한 결과</strong></div>`);
}
const tabs=context=>`<div class="dfx-field-tabs" role="tablist" aria-label="${context==='scope'?'서비스 종류':'세부 분석 항목'}"><span class="dfx-tab-label">분석 분야</span>${forensicFields.map((f,i)=>`<button type="button" role="tab" id="dfx-${context}-tab-${i}" data-dfx-field="${i}" aria-controls="${f.id}${context==='method'?'-method':''}" aria-selected="${i===0}" tabindex="${i?-1:0}"><span>${num(i)}</span><strong>${names[i]}</strong></button>`).join('')}</div>`;
const panel=(f,i,context,html)=>`<article class="dfx-field-panel" role="tabpanel" tabindex="0" id="${f.id}${context==='method'?'-method':''}" data-dfx-panel="${i}" aria-labelledby="dfx-${context}-tab-${i}" ${i?'hidden':''}>${html}</article>`;
const fieldImage=f=>`<figure class="dfx-field-image"><img src="assets/service-materials/${f.image}" alt="${f.alt}" loading="lazy"><figcaption>${f.caption}</figcaption></figure>`;
function scope(id){
 const panels=forensicFields.map((f,i)=>{
  let html='';
  if(id==='a')html=`<div class="dfx-scope-editorial">${fieldImage(f)}<div class="dfx-scope-copy"><span class="dfx-kicker">${f.english}</span><h3>${names[i]}</h3><p>${f.description}</p><div class="dfx-targets"><span class="dfx-small">분석 대상</span>${ul(f.targets)}</div><div class="dfx-focus"><span class="dfx-small">확인할 질문</span><p>${f.questions[0]}</p></div></div></div>`;
  if(id==='b')html=`<div class="dfx-scope-title"><div>${serviceIcon(keys[i])}<h3>${names[i]}</h3></div><p>${f.description}</p></div><div class="dfx-scope-map"><div class="dfx-map-block"><span class="dfx-map-number">01</span><h4>분석할 자료</h4>${ul(f.targets)}</div><div class="dfx-map-block"><span class="dfx-map-number">02</span><h4>확인할 기록</h4>${ul(f.work.map(x=>x[0]))}</div><div class="dfx-map-block"><span class="dfx-map-number">03</span><h4>정리할 결과</h4>${ul(f.outputs)}</div></div><p class="dfx-scope-criteria">${f.note}</p>`;
  if(id==='c')html=`<div class="dfx-scope-question"><div><span class="dfx-kicker">${f.english}</span><h3>${f.questions[0]}</h3><p>${f.description}</p><div class="dfx-targets"><span class="dfx-small">이 자료를 살펴봅니다</span>${ul(f.targets)}</div><p class="dfx-second-question">함께 확인할 내용 · ${f.questions[1]}</p></div>${fieldImage(f)}</div>`;
  return panel(f,i,'scope',html);
 }).join('');
 return chapter('analysis-fields','dfx-scope',`${heading('02','SERVICE SCOPE','대상에 맞춰 분석 범위를 구성합니다.','PC·저장매체부터 스마트폰, 대화와 음성·영상까지.<br>기기 상태와 접근 조건을 확인한 뒤 필요한 자료를 정합니다.')}${tabs('scope')}${panels}<div class="dfx-section-next"><span>같은 대상도 의뢰 목적과 확보 자료에 따라 분석 범위가 달라집니다.</span><a href="#analysis-methods">세부 분석 항목 보기 <b aria-hidden="true">↓</b></a></div>`);
}
// Existing service copy, with conservative wording for audio/video comparisons.
const works=f=>f.id!=='audio-video'?f.work:[
 ['파일 형식과 내부 구조','확장자와 실제 파일 형식, 작성 도구와 내부 정보를 비교해 변환·재작성 정황을 검토합니다.'],
 ['생성·수정과 시간 정보','파일과 원본 기기에 남은 시간 기록을 대조하고, 제시된 녹음·촬영 시점과 연결되는지 살펴봅니다.'],
 ['검토 구간과 연속성','음성 파형과 녹음·촬영 구간의 시간 흐름을 검토합니다. 추가 대조가 필요한 위치와 확인 근거를 정리합니다.'],
 ['원본·전달본·비교 자료','원본 기기의 파일과 전달본, 비교 자료를 대조합니다. 저장·전송·재인코딩 과정의 차이도 함께 검토합니다.']
];
const deliverables=f=>`<div class="dfx-field-deliverables"><strong>전달하는 결과</strong>${ul(f.outputs)}</div><p class="dfx-scope-criteria"><strong>확인 범위</strong>${f.note}</p>`;
function methods(id){
 const panels=forensicFields.map((f,i)=>{
  const w=works(f);
  let body='';
  if(id==='a')body=`<div class="dfx-work-grid">${w.map((x,j)=>`<div><span>${num(j)}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>`;
  if(id==='b')body=`<div class="dfx-work-flow"><div class="dfx-work-identity">${serviceIcon(keys[i])}<strong>${f.short}</strong><span>RECORDS<br>TO EVIDENCE</span><div class="dfx-work-dots"><i></i><i></i><i></i><i></i></div></div><ol>${w.map((x,j)=>`<li><span>${num(j)}</span><h3>${x[0]}</h3><p>${x[1]}</p></li>`).join('')}</ol></div>`;
  if(id==='c')body=`<div class="dfx-question-methods">${f.questions.map((q,j)=>`<article><header><span>QUESTION ${num(j)}</span><h3>${q}</h3></header>${w.slice(j*2,j*2+2).map(x=>`<div><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</article>`).join('')}</div>`;
  return panel(f,i,'method',body+deliverables(f));
 }).join('');
 return chapter('analysis-methods','dfx-methods',`${heading('03','ANALYSIS DETAILS','기록을 대조하고, 확인 근거를 정리합니다.','분야별 세부 분석 항목과 전달 결과를 확인하세요.<br>기록이 의미하는 사실과 해석을 구분해 설명합니다.')}${tabs('method')}${panels}`,id==='b');
}
const prep=[['상황·기간','확인하고 싶은 쟁점과 관련 기간'],['기기·자료','종류·수량·현재 상태와 확보 경위'],['목적·권한','활용 목적·접근 권한·희망 일정']];
const steps=servicePages['digital-forensics'].process;
const prepBox=()=>`<div class="dfx-prep"><span class="dfx-small">상담 전 준비</span>${prep.map((x,i)=>`<div><span>${num(i)}</span><p><strong>${x[0]}</strong><small>${x[1]}</small></p></div>`).join('')}</div>`;
function process(id){
 let html='';
 if(id==='a')html=`<ol class="dfx-process-cards">${steps.map((x,i)=>`<li><div><span>${num(i)}</span>${serviceIcon(['message','storage','scan','shield'][i])}</div><h3>${x[0]}</h3><p>${x[1]}</p><small>${['목적과 범위 합의','자료와 출처 보존','시간·행위·관계 분석','결과 전달과 설명'][i]}</small></li>`).join('')}</ol>${prepBox()}`;
 if(id==='b')html=`<div class="dfx-swimlane"><div class="dfx-swimlane-head"><span>진행 단계</span>${steps.map((x,i)=>`<div><small>${num(i)}</small><strong>${x[0]}</strong></div>`).join('')}</div><div class="dfx-swimlane-client"><strong>의뢰자</strong>${['확인할 내용과<br>보유 자료 안내','협의한 자료 전달·<br>접근 조건 확인','추가 확인 사항과<br>비교 자료 협의','주요 결과 검토와<br>설명 내용 확인'].map(x=>`<p>${x}</p>`).join('')}</div><div class="dfx-swimlane-team"><strong>MDFC</strong>${steps.map(x=>`<p>${x[1]}</p>`).join('')}</div></div>${prepBox()}`;
 if(id==='c')html=`<div class="dfx-process-checklist"><div><h3>분석을 시작하기 전에,<br>함께 범위를 정합니다.</h3><p>기기를 보내기 전 상담을 통해<br>필요한 자료와 접수 방법을 안내합니다.</p>${prepBox()}<button class="dfx-contact-link" data-contact>접수 방법 상담 <span aria-hidden="true">↗</span></button></div><ol>${steps.map((x,i)=>`<li><span>${num(i)}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div></li>`).join('')}</ol></div>`;
 return chapter('process','dfx-process',`${heading('04','HOW WE WORK','상담부터 결과 설명까지, 체계적으로 연결합니다.','확인할 목적과 분석 범위를 먼저 협의하고,<br>자료 확보 과정부터 결과 설명까지 단계별로 안내합니다.')}${html}`,id==='a');
}
const faq=[...servicePages['digital-forensics'].faqs,
 ['잠기거나 파손된 스마트폰도 분석할 수 있나요?','작동·손상·잠금·암호화 상태와 접근 조건을 확인한 뒤 자료 확보 방법을 정합니다. 기기와 백업에 남은 자료에 따라 범위가 달라지며, 메모리 추출만으로 데이터 복호화가 보장되지는 않습니다.'],
 ['메신저 첨부파일 기록이 있으면 원본도 확보되나요?','메시지의 연결 정보와 실제 파일 존재 여부를 각각 확인합니다. 대화·캐시·썸네일만 남은 경우 원본 확보가 어려울 수 있습니다. PC·모바일 및 앱 버전별 분석 가능 범위를 먼저 확인합니다.'],
 ['분석 결과에는 무엇이 담기나요?','의뢰 범위에 맞춰 핵심 결과, 주요 활동의 시간 흐름, 관련 자료 목록과 분석 의견을 정리합니다. 확인된 사실과 해석, 판단하기 어려운 부분을 구분해 설명합니다.']
];
function questions(id){return chapter('questions','dfx-faq',`<div class="dfx-faq-layout"><div>${heading('06','FAQ','의뢰 전 궁금한 점을<br>확인하세요.','자료 준비, 분석 범위, 일정과 결과물.<br>상담 전 자주 묻는 내용을 정리했습니다.')}<div class="dfx-faq-contact"><span>자료를 어떻게 준비해야 할지 고민되시나요?</span><button data-contact>전문가에게 문의하기 <b aria-hidden="true">↗</b></button></div></div><div class="dfx-faq-list">${faq.map(([q,a],i)=>`<details ${i===0?'open':''}><summary><span>${num(i)}</span><strong>${q}</strong><b aria-hidden="true">+</b></summary><p>${a}</p></details>`).join('')}</div></div>`);}
function nav(){return `<div class="detail-jumps"><nav aria-label="페이지 목차">${[['service-overview','서비스 개요'],['analysis-fields','분석 대상'],['analysis-methods','세부 분석'],['process','진행 절차'],['analysis-deliverables','결과물 예시'],['questions','자주 묻는 질문']].map(([id,t])=>`<a href="#${id}">${t}</a>`).join('')}</nav></div>`;}
function switcher(id){return `<nav class="dfx-switch" aria-label="디지털포렌식 새 시안 비교"><a href="forensic-renewal-previews.html">3안 비교</a>${forensicRenewalOptions.map(o=>`<a href="forensic-renewal-${o.id}.html#service-overview" ${id===o.id?'aria-current="page"':''}>${o.id.toUpperCase()}</a>`).join('')}</nav>`;}
export function forensicRenewalDocument(base,id,version){
 const option=forensicRenewalOptions.find(x=>x.id===id);if(!option)throw Error('Unknown renewal option');
 const hero=base.match(/<main id="main">\s*(<section[\s\S]*?<\/section>)/)?.[1];
 if(!hero?.includes('service-opening'))throw Error('Existing digital forensic hero missing');
 const report=reportSamples('digital-forensics').replace('class="detail-section report-samples"','class="detail-section report-samples dfx-report"').replace('data-nav-theme="dark"',`data-nav-theme="${id==='b'?'light':'dark'}"`).replace('REPORT PREVIEW','05 / REPORT PREVIEW').replace('분석의 결론부터,<br>근거가 되는 기록까지.','어떤 결과를 받는지,<br>보고서 예시로 확인하세요.');
 const content=hero+nav()+overview(id)+scope(id)+methods(id)+process(id)+report+questions(id);
 return base.replace(/<title>.*?<\/title>/,`<title>${id.toUpperCase()}안 · ${option.name} | MDFC 디지털포렌식</title>`)
 .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/forensic-renewal.css?v=${version}"><script src="assets/forensic-renewal.js?v=${version}" defer></script></head>`)
 .replace(/<body class="([^"]*)">/,`<body class="$1 dfx dfx-${id}">`)
 .replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${content}</main>`)
 .replace('</body>',switcher(id)+'</body>');
}
