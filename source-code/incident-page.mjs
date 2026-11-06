import {incidentScope} from './service-design.mjs';
import {reportSamples} from './report-samples.mjs';
// Incident service presentation: distinct investigation scopes, shared outputs once.
import {incidentCaseChapter} from './detail-case-chapters.mjs';
import {processFlow} from './detail-process.mjs';
const fields = [
 {id:'ransomware',name:'랜섬웨어 사고조사',tag:'RANSOMWARE',signal:'파일 암호화 · 공유 폴더 접근 불가 · 업무 시스템 중단',description:'암호화가 시작된 경위와 피해 범위를 조사하고, 업무 복구를 검토하는 데 필요한 정보를 정리합니다.',scope:[['유입·실행 경로','접속·인증 기록과 의심 프로그램의 실행 흔적을 연결합니다.'],['피해 범위','암호화된 기기와 공유 저장소, 관련 계정과 확산 정황을 확인합니다.'],['복구 조건','백업 상태와 복구 순서, 재감염 방지를 위해 확인할 사항을 검토합니다.']]},
 {id:'malware',name:'해킹·악성코드 사고조사',tag:'HACKING & MALWARE',signal:'악성코드 탐지 · 비정상 접속 · 알 수 없는 계정이나 프로그램',description:'의심 파일과 시스템 활동을 분석해 침입 흔적, 공격 행위와 남아 있는 위험을 확인합니다.',scope:[['악성 행위','확보된 의심 파일과 실행 기록에서 비정상 동작을 분석합니다.'],['침해 경로','시스템·보안 장비 로그를 대조해 계정과 기기 사이의 활동을 추적합니다.'],['잔존 위험','재접속 수단, 내부 확산과 외부 전송 정황을 살펴봅니다.']]},
 {id:'personal-data',name:'이메일·개인정보 사고조사',tag:'EMAIL & PERSONAL DATA',signal:'계정 도용 · 비정상 메일 발송 · 개인정보 무단 접근 의심',description:'계정 활동과 자료 접근 기록을 분석해 비정상 접근의 경위와 정보 노출 가능성을 조사합니다.',scope:[['계정 활동','의심 메일 원문과 로그인 기록에서 비정상 접근을 확인합니다.'],['설정 변경','메일 전달 규칙과 권한 변경 등 계정에 남은 변화를 조사합니다.'],['자료 노출 범위','조회·다운로드·전송 기록을 대조해 영향을 받은 자료를 검토합니다.']]}
];
const results = [
 ['사고 경위와 시간 흐름','주요 활동과 발생 시점을 연결하고, 판단의 근거가 된 기록을 정리합니다.'],
 ['영향 범위와 확인 근거','관련 시스템·계정·자료를 정리하고, 확보 자료로 확인하기 어려운 범위도 함께 설명합니다.'],
 ['후속 대응과 개선 과제','조치·복구 검토 항목과 재발 방지를 위한 개선 우선순위를 안내합니다.']
];
const preparation = [
 ['발견 시점과 증상','처음 이상을 확인한 시간과 알림·오류 화면'],
 ['영향을 받은 업무와 대상','중단된 업무, 관련 기기·서버·계정·저장소'],
 ['현재까지 시행한 조치','접속 차단, 계정 변경, 복구 등 조치 내용과 시점'],
 ['보유 자료와 협업 담당자','로그·메일·백업의 유무와 보안 담당자·운영사']
];
const sectionHeading=(label,title,copy)=>`<header class="ir-heading"><span class="detail-kicker">${label}</span><h2>${title}</h2><p>${copy}</p></header>`;

export function incidentPage({service,page,pageHero,services}){
 return `<div class="incident-page">${pageHero(service.name,page.title,page.summary,service.image)}
 <div class="detail-jumps ir-jumps"><nav class="container" aria-label="페이지 내 메뉴">${[['ransomware','랜섬웨어'],['malware','해킹·악성코드'],['personal-data','이메일·개인정보'],['analysis-deliverables','조사 결과물'],['process','진행 절차'],['investigation-method','상담 전 안내']].map(([id,label],i)=>`<a href="#${id}">${i<3?`<span class="ir-jump-number">0${i+1}</span>`:''}${label}</a>`).join('')}</nav></div>
 <section class="ir-section ir-services" id="overview"><div class="container">

  <div class="ir-service-list">${fields.map((field,i)=>`<article class="ir-service">${incidentScope(field,i)}${incidentCaseChapter(field.id)}</article>`).join('')}</div>

 </div></section>
 ${reportSamples('incident-response')}
 ${processFlow(service.slug)}
 <section class="ir-section ir-preparation" id="investigation-method"><div class="container"><div class="ir-preparation-layout"><header><span class="detail-kicker">LET’S START WITH YOUR SITUATION</span><h2>상담은,<br>현재 상황을 정리하는 것부터.</h2><p>확인하신 내용을 알려주시면<br>필요한 조사 범위를 함께 정리합니다.</p><button class="detail-button detail-button-accent" data-contact>전문가와 상담하기 <span aria-hidden="true">↗</span></button></header><ol class="ir-preparation-list">${preparation.map(([title,copy],i)=>`<li><span>0${i+1}</span><h3>${title}</h3><p>${copy}</p></li>`).join('')}</ol></div>
 <div class="ir-faq" id="questions"><h2>자주 묻는 질문</h2><div class="detail-faq">${page.faqs.slice(1).map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></div>
 </div></section>
 </div>`;
}
