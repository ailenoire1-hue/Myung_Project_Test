import {serviceChapterHeading} from './home-service-varied.mjs';
import {replaceServiceChapter} from './home-service-editorial.mjs';

const fields=[
 {id:'pc-storage',title:'PC·저장매체',label:'COMPUTER & STORAGE',copy:'파일의 생성과 삭제, 외장매체 연결 기록을 분석해\n자료의 이동과 사용 흔적을 확인합니다.',tags:['파일·문서','삭제 기록','USB 연결'],alt:'하드디스크와 SSD, USB 저장매체'},
 {id:'smartphone-forensics',title:'스마트폰',label:'MOBILE FORENSICS',copy:'통화·문자·앱과 백업 기록을 분석해\n사건과 관련된 사용 내역을 살펴봅니다.',tags:['통화·문자','앱 사용 기록','백업 데이터'],alt:'스마트폰과 데이터 확보용 연결 환경'},
 {id:'messenger-forensics',title:'메신저·미디어',label:'MESSENGER & MEDIA',copy:'대화와 첨부파일을 함께 살펴\n주고받은 기록의 맥락을 정리합니다.',tags:['대화 기록','첨부파일','사진·미디어'],alt:'개인정보를 읽을 수 없게 처리한 메신저와 미디어 화면'},
 {id:'audio-video',title:'음성·영상',label:'AUDIO & VIDEO',copy:'파일 구조와 생성·편집 흔적을 분석해\n녹음·녹화 자료의 확인에 필요한 근거를 정리합니다.',tags:['파일 구조','생성·편집 흔적','녹음·녹화 자료'],alt:'파형과 영상 기록을 살펴보는 분석 환경'}
];

function forensicsFocusChapter(){return `<section id="home-digital-forensics" class="service-chapter home-forensics-focus" aria-labelledby="forensics-focus-title" data-home-chapter data-nav-label="디지털포렌식 서비스" data-nav-theme="light"><div class="container">
 <header class="forensics-focus-heading">${serviceChapterHeading({number:'01',description:'디지털 기록의 확보부터 사건과 연결되는 증거 분석까지.',title:'<em>디지털포렌식</em> 서비스',id:'forensics-focus-title'})}<a class="varied-service-more" href="index.html#home-digital-forensics">기존 배치 보기<span aria-hidden="true">↗</span></a></header>
 <div class="forensics-focus-viewer" data-forensics-focus>
  <div class="forensics-focus-tabs" role="tablist" aria-label="분석 대상 선택">${fields.map((f,i)=>`<button type="button" role="tab" id="focus-tab-${i}" aria-controls="focus-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}"><span>${String(i+1).padStart(2,'0')}</span>${f.title}<i aria-hidden="true">↗</i></button>`).join('')}</div>
  ${fields.map((f,i)=>`<div class="forensics-focus-panel" id="focus-panel-${i}" role="tabpanel" aria-labelledby="focus-tab-${i}" tabindex="0" ${i?'hidden':''}><div class="forensics-focus-copy"><p class="forensics-focus-label">${f.label}</p><h3>${f.title} 분석</h3><p class="forensics-focus-summary">${f.copy.replace('\n','<br>')}</p><ul class="forensics-focus-tags">${f.tags.map(t=>`<li>${t}</li>`).join('')}</ul><a href="digital-forensics.html#${f.id}">${f.title} 분석 자세히 보기<span aria-hidden="true">→</span></a></div><figure class="forensics-focus-photo"><img class="focus-quadrant-${i}" src="assets/service-materials/service-field-photos-v1.png" width="1536" height="1024" alt="${f.alt}" loading="lazy"></figure></div>`).join('')}
 </div>
 </div></section>`;}

export function forensicsFocusPreviewDocument(home,{version}){
 return replaceServiceChapter(home,'home-digital-forensics',forensicsFocusChapter())
 .replace(/<title>[^<]*<\/title>/,'<title>디지털포렌식 · 분석 대상 선택형 시안 | 명디지털포렌식센터</title>')
 .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/home-forensics-focus.css?v=${version}"><script src="assets/home-forensics-focus.js?v=${version}" defer></script></head>`);
}
