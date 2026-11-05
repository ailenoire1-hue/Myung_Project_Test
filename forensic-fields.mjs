import {serviceIcon} from './service-design.mjs';
export const forensicFields=[
 {id:'pc-storage',name:'PC·저장매체 포렌식',short:'PC·저장매체',english:'PC & STORAGE',tabCopy:'파일·삭제·외부 매체 기록',
 title:'파일의 흔적을 연결해,<br>사용자의 행위를 살펴봅니다.',
 description:'PC와 저장매체에 남은 파일·사용 기록을 분석해 자료의 생성, 이동, 삭제 정황을 살펴봅니다. 여러 기록을 시간순으로 대조해 사실관계를 정리합니다.',
 targets:['노트북·데스크톱, 서버와 내부 HDD·SSD','USB·외장 저장장치와 확보된 저장매체 사본','문서·파일 시스템·운영체제 사용 기록'],
 questions:['중요한 자료는 언제 생성·변경·삭제되었나요?','외부 저장장치 연결과 자료 이동 사이에 관련성이 있나요?'],
 work:[['문서 작업과 사용 이력','문서의 생성·수정·열람 기록과 최근 사용 파일, 실행 흔적을 대조해 조사 기간의 주요 작업을 정리합니다.'],['삭제 흔적과 잔존 자료','휴지통과 파일시스템 기록에서 파일명·경로·시각을 확인합니다. 실제 내용을 확보한 파일과 목록만 남은 항목을 구분합니다.'],['USB·외장매체와 파일의 관계','외부 장치의 연결 시각·식별 정보와 문서 접근·압축 기록을 연결합니다. 확보한 매체의 파일과 함께 자료 이동 정황을 검토합니다.'],['이전 버전과 사본 비교','보존된 이전 버전·백업·잔존 데이터를 살펴보고 같은 문서의 사본을 대조합니다. 시간 흐름과 자료 출처를 연결해 확인 근거를 정리합니다.']],
 outputs:['생성·접근·압축·삭제 등 주요 행위 타임라인','원래 경로·출처·확보 상태를 구분한 관련 파일 목록','외부 매체·문서 사본의 대조 결과와 분석 보고서'],
 note:'삭제 자료의 확인 가능성은 덮어쓰기·TRIM·암호화·매체 상태에 따라 달라집니다. 장치 연결 흔적만으로 자료 반출을 단정하지 않습니다.',
 image:'pc-storage-workstation.webp',imageClass:'resource-field-photo resource-pc-photo',alt:'저장매체 분석 화면과 장비가 배치된 명정보기술의 분석 워크스테이션',caption:'PC·저장매체 분석 워크스테이션'},
 {id:'smartphone-forensics',name:'스마트폰 포렌식',short:'스마트폰',english:'MOBILE FORENSICS',tabCopy:'연락·앱·기기·백업 기록',
 title:'기기의 상태부터 살펴,<br>확보 가능한 기록을 분석합니다.',
 description:'스마트폰의 상태와 접근 조건을 확인하고 통화·문자·앱 기록 등 확보 가능한 데이터를 분석합니다. 기기와 백업에 남은 활동을 사건의 흐름으로 정리합니다.',
 targets:['Android 스마트폰·태블릿, iPhone·iPad','연락처·통화·문자·메모·일정·앱 사용 기록','접근 가능한 기기 데이터와 지원되는 백업·파일시스템 사본'],
 questions:['특정 기간에 기기에서 어떤 연락과 활동이 있었나요?','기기와 기존 백업에서 추가로 확인할 수 있는 자료는 무엇인가요?'],
 work:[['통화·문자와 연락 기록','확보된 연락처, 통화 이력과 문자에서 상대방·시각·내용을 검토합니다. 사건과 관련된 기간의 연락 흐름을 정리합니다.'],['메모·일정과 웹 활동','기기·백업에 포함된 메모·캘린더, 브라우저 방문·검색·다운로드 기록을 확인해 관련 활동과 시점을 대조합니다.'],['앱과 기기 사용 흔적','설치 앱과 확보 가능한 앱 데이터, 기기 설정·연결 흔적을 검토합니다. 항목별 원본 경로와 확인 가능한 범위를 기록합니다.'],['기기·백업의 교차 확인','현재 기기와 기존 백업에서 확인된 데이터를 비교합니다. 작동·손상·잠금·암호화 상태에 맞춰 자료 확보 방법과 분석 범위를 정합니다.']],
 outputs:['연락·메모·일정·웹 활동을 정리한 검토 자료','기기·백업의 출처를 연결한 주요 활동 타임라인','분석한 앱·데이터 범위와 수집·분석 내역 보고서'],
 note:'기기·운영체제·암호화·접근 권한과 사본에 포함된 자료에 따라 범위가 달라집니다. 파손 기기의 메모리 추출만으로 복호화가 보장되지는 않습니다.',
 image:'mobile-acquisition-work.png',imageClass:'resource-field-photo resource-phone-photo',alt:'휴대전화와 데이터 추출 장비가 함께 배치된 작업 환경',caption:'휴대전화·데이터 추출 장비와 작업 환경'},
 {id:'messenger-forensics',name:'메신저·미디어 포렌식',short:'메신저·미디어',english:'MESSAGES & MEDIA',tabCopy:'대화·첨부파일·원본 연결',
 title:'대화의 맥락과,<br>연결된 파일을 함께 확인합니다.',
 description:'PC·모바일 메신저의 대화와 첨부파일을 연결해 내용과 맥락을 살펴봅니다. 사진·동영상의 원본과 잔존 흔적을 구분하고 관련 출처를 함께 정리합니다.',
 targets:['PC·모바일 메신저의 대화방·참여자·메시지','사진·동영상·음성·문서 등 첨부파일','기존 백업·과거 사용 PC·앱 캐시·썸네일'],
 questions:['누가, 언제 나눈 대화이며 어떤 파일이 연결되어 있나요?','다른 기기·백업·캐시에 관련 기록이 남아 있나요?'],
 work:[['대화 맥락과 참여자 확인','대화방·발신자·시각·본문을 연결하고 기간·상대방·검색어로 관련 기록을 선별합니다. 앞뒤 대화와 첨부파일을 함께 검토합니다.'],['첨부파일과 출처 추적','메시지의 식별 정보와 데이터베이스 경로, 첨부파일의 연결 정보를 대조해 대화와 자료가 어디에서 확인됐는지 정리합니다.'],['원본·캐시·썸네일 구분','갤러리 원본, 휴지통 항목, 앱 캐시와 썸네일을 구분합니다. 실제 파일 확보 여부와 기록만 남은 상태를 각각 표시합니다.'],['다른 기기·백업의 기록 대조','과거 사용 PC·기기 백업과 확보된 클라우드 앱의 잔존 흔적을 검토합니다. 서로 다른 출처의 대화와 미디어가 연결되는지 확인합니다.']],
 outputs:['발신자·시간·출처를 연결한 대화 검토 자료','대화방별 미디어·첨부파일 목록과 실제 확보 파일','원본·캐시·목록 등 자료 상태를 구분한 분석 결과'],
 note:'앱 버전·암호화·백업 정책에 따라 확인 항목이 달라집니다. 메시지나 썸네일 기록이 있어도 해당 원본 파일이 남아 있지 않을 수 있습니다.',
 image:'kakao-redacted-preview.png',imageClass:'resource-field-photo resource-chat-photo',alt:'이름과 대화 내용을 비식별 처리한 카카오톡 대화 화면 예시',caption:'카카오톡 대화 화면 · 개인정보 비식별 처리 예시'},
 {id:'audio-video',name:'음성·영상 분석',short:'음성·영상',english:'AUDIO & VIDEO',tabCopy:'파일 구조·생성·편집 정황',
 title:'생성과 편집의 정황을,<br>여러 근거로 검토합니다.',
 description:'녹음·영상 파일의 내부 구조와 시간 정보, 구간의 연속성을 분석합니다. 원본 매체와 비교 자료를 대조해 생성·편집 정황과 확인 가능한 범위를 설명합니다.',
 targets:['통화 녹음·음성메모·녹음기 파일','스마트폰 촬영 영상·CCTV·블랙박스 기록','원본 녹음·촬영 기기와 비교용 파일'],
 questions:['재인코딩이나 편집을 검토할 만한 흔적이 있나요?','녹음·촬영 구간과 시간 흐름이 원본 매체의 기록과 일치하나요?'],
 work:[['파일 형식과 내부 구조','확장자와 실제 컨테이너·코덱을 비교하고, 내부 구성·인코더·작성 도구 정보를 확인해 변환·재작성 정황을 검토합니다.'],['생성·수정과 시간 정보','파일과 원본 기기에 남은 생성·수정 관련 기록을 대조합니다. 제시된 녹음·촬영 시점과 연결되는지 살펴봅니다.'],['검토 구간과 연속성','음성 파형·스펙트럼, 녹음·촬영 구간의 시간 흐름을 검토합니다. 추가 대조가 필요한 위치와 그 근거를 정리합니다.'],['원본·전달본·비교 자료 대조','원본 기기의 파일, 제출된 전달본과 같은 환경에서 만든 비교 자료를 대조합니다. 저장·전송·재인코딩 과정의 차이도 함께 검토합니다.']],
 outputs:['파일 형식·작성 정보·시간 정보를 담은 비교표','주요 검토 구간의 위치와 확인 근거를 연결한 자료','생성·변환·편집 정황과 판단 한계를 설명한 의견 보고서'],
 note:'구조나 파형의 차이만으로 조작을 단정하지 않습니다. 원본·비교 자료 확보 여부와 재인코딩 이력에 따라 판단 범위가 달라집니다.',
 image:'media-analysis.webp',imageClass:'resource-media',alt:'파일 구조와 합성 파형으로 설명한 음성 영상 분석 항목',caption:'음성·영상 분석 항목 구성 예시 · 합성 파형'}
];

const list=items=>`<ul class="detail-clean-list">${items.map(t=>`<li>${t}</li>`).join('')}</ul>`;
const quickWork={
 'pc-storage':['문서 생성·열람·실행 이력','휴지통·파일시스템의 잔존 기록','장치 연결과 자료 이동 시점','원본·백업·이전 버전 비교'],
 'smartphone-forensics':['상대방·연락 시각·대화 내용','메모·일정·검색과 방문 이력','앱 데이터와 기기 연결 기록','현재 기기와 기존 백업 비교'],
 'messenger-forensics':['참여자·시간·앞뒤 대화','메시지와 첨부파일의 출처','실제 파일과 잔존 흔적 구분','다른 기기에 남은 기록 비교'],
 'audio-video':['컨테이너·코덱·작성 도구','기기·파일의 시간 기록','파형·검토 구간의 연속성','원본과 전달본의 차이 확인']
};
export function forensicAnalysis(){return `<section class="detail-section forensic-analysis" id="analysis-fields" data-detail-chapter><div class="container"><div class="resource-tabs forensic-tabs" data-resource-tabs data-linked-tabs><div class="forensic-selector"><header class="detail-chapter-heading"><span class="detail-kicker">ANALYSIS FIELDS</span><h2>어떤 기록을 확인해야 하나요?</h2></header><div class="resource-tablist" role="tablist" aria-label="디지털포렌식 서비스 분석 분야">${forensicFields.map((f,i)=>`<button type="button" role="tab" id="field-tab-${i}" aria-controls="${f.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><span class="forensic-tab-number" aria-hidden="true">0${i+1}</span>${serviceIcon(['pc','phone','message','media'][i])}<strong>${f.short}</strong><small>${f.tabCopy}</small></button>`).join('')}</div></div>${forensicFields.map((f,i)=>`<article class="resource-panel forensic-panel" role="tabpanel" id="${f.id}" aria-labelledby="field-tab-${i}" tabindex="0" ${i?'hidden':''}><div class="forensic-field-overview"><figure class="resource-figure ${f.imageClass}"><div><img src="assets/service-materials/${f.image}" alt="${f.alt}" loading="lazy" decoding="async"></div><figcaption>${f.caption}</figcaption></figure><div class="resource-copy"><span class="forensic-field-name">${f.name}</span><span class="detail-kicker">${f.english}</span><h3>${f.title}</h3><p>${f.description.split('. ')[0]}.</p><ul class="forensic-targets">${f.targets.map(t=>`<li>${t}</li>`).join('')}</ul><a class="forensic-method-link" href="#${f.id}-approach">분석 항목과 결과 보기 <span aria-hidden="true">↓</span></a></div></div><section class="forensic-field-depth" id="${f.id}-approach" data-detail-chapter><header class="detail-chapter-heading"><span class="detail-kicker">${f.english} · ANALYSIS</span><h2>${f.short}, 이렇게 분석합니다.</h2></header><ol class="forensic-analysis-map">${f.work.map((t,j)=>`<li><span>0${j+1}</span><h3>${t[0]}</h3><p>${quickWork[f.id][j]}</p></li>`).join('')}</ol><div class="forensic-result-line"><strong>전달하는 결과</strong>${list(f.outputs)}</div><details class="chapter-more"><summary>세부 분석 항목과 확인 범위<span aria-hidden="true">+</span></summary><div class="forensic-expanded"><div class="forensic-expanded-questions">${f.questions.map(t=>`<p>${t}</p>`).join('')}</div><div class="forensic-expanded-work">${f.work.map(t=>`<div><h4>${t[0]}</h4><p>${t[1]}</p></div>`).join('')}</div></div></details><p class="forensic-limit">${f.note}</p></section></article>`).join('')}</div></div></section>`;}
