const serviceLink = (href,title,description,number) => `<a class="service-entry" href="${href}"><span class="service-entry-number">${number}</span><div><h3>${title}</h3><p>${description}</p></div><span class="service-entry-open" aria-hidden="true">+</span></a>`;
const heading = (number,title,description) => `<header class="service-chapter-heading"><span class="service-chapter-kicker"><span>OUR SERVICES</span><b>${number} / 03</b></span><h2>${title}</h2><p>${description}</p></header>`;

export function selectedServiceOverview(){return `<div id="services" class="home-service-overview">
 <section id="home-digital-forensics" class="service-chapter service-chapter-forensics" aria-labelledby="home-forensics-title" data-home-chapter data-nav-label="디지털포렌식 서비스" data-nav-theme="light"><div class="container">
  ${heading('01','<span id="home-forensics-title">디지털포렌식 서비스</span>','기기에 남은 기록을, 사건의 근거로 연결합니다.')}
  <div class="service-chapter-grid"><div class="service-evidence-visual"><figure class="home-lab-photo"><img src="assets/service-materials/forensic-lab.png" alt="클린룸에서 저장매체를 분석하는 명정보기술의 정밀 작업 환경" width="464" height="585" loading="lazy"></figure><div class="service-evidence-note"><span>RECORDS & EVIDENCE</span><p>원본 보존부터 분석과 교차 검토까지.<br>결론을 뒷받침하는 기록을 함께 확인합니다.</p><ol><li>수집·보존</li><li>기록 분석</li><li>근거 정리</li></ol></div></div>
   <div class="service-chapter-content"><p class="service-chapter-lead">PC·저장매체, 스마트폰, 대화와 미디어에 남은 기록을 분석해 주요 행위와 사건의 시간 흐름을 확인합니다.</p><div class="service-analysis-grid">
    ${serviceLink('digital-forensics.html#pc-storage','PC·저장매체','파일 작업과 외장매체 연결 기록','01')}
    ${serviceLink('digital-forensics.html#smartphone-forensics','스마트폰','통화·문자·앱과 백업 기록','02')}
    ${serviceLink('digital-forensics.html#messenger-forensics','메신저·미디어','대화의 맥락과 첨부파일','03')}
    ${serviceLink('digital-forensics.html#audio-video','음성·영상','파일 구조와 생성·편집 정황','04')}
   </div><div class="service-results"><span>분석 결과물</span><p>주요 행위 타임라인 · 증거 목록 · 분석 보고서</p></div><div class="service-chapter-actions"><a class="service-chapter-button" href="digital-forensics.html">디지털포렌식 서비스 자세히 보기</a></div></div>
  </div>
 </div></section>
 <section id="home-incident-response" class="service-chapter service-chapter-incident" aria-labelledby="home-incident-title" data-home-chapter data-nav-label="침해사고 조사" data-nav-theme="dark"><div class="container">
  ${heading('02','<span id="home-incident-title">침해사고 조사</span>','사고의 흐름을 밝히고, 대응의 우선순위를 정합니다.')}
  <div class="service-chapter-grid"><div class="service-chapter-content"><p class="service-chapter-lead">시스템·계정·로그에 남은 흔적을 연결해 사고의 발생 경위, 영향받은 범위와 후속 대응에 필요한 근거를 조사합니다.</p><div class="service-incident-list">
   ${serviceLink('incident-response.html#ransomware','랜섬웨어 사고조사','유입 경로, 암호화 피해와 백업·복구 조건을 검토합니다.','01')}
   ${serviceLink('incident-response.html#malware','해킹·악성코드 사고조사','의심 파일과 시스템·네트워크 기록에서 침해 흔적을 확인합니다.','02')}
   ${serviceLink('incident-response.html#personal-data','이메일·개인정보 사고조사','계정 활동, 권한 변경과 자료 노출 가능성을 조사합니다.','03')}
  </div><a class="service-chapter-button" href="incident-response.html">침해사고 조사 자세히 보기</a></div>
  <div class="service-investigation-visual"><figure><img src="assets/investigation.jpg" alt="시스템과 디지털 기록을 검토하는 업무 환경 이미지" width="1920" height="700" loading="lazy"></figure><div class="service-investigation-flow"><span>조사의 흐름</span><ol><li><b>01</b><div><h3>기록 확보</h3><p>시스템 · 인증 · 네트워크 로그</p></div></li><li><b>02</b><div><h3>사고 경위 분석</h3><p>시간 · 계정 · 자산별 흔적 연결</p></div></li><li><b>03</b><div><h3>대응안 정리</h3><p>영향 범위 · 복구 검토 · 개선 과제</p></div></li></ol><a href="incident-response.html#analysis-deliverables">조사 결과물 살펴보기</a></div></div></div>
 </div></section>
 <section id="home-enterprise-security" class="service-chapter service-chapter-enterprise" aria-labelledby="home-enterprise-title" data-home-chapter data-nav-label="기업 보안 관리" data-nav-theme="light"><div class="container">
  ${heading('03','<span id="home-enterprise-title">기업 보안 관리 서비스</span>','점검과 자료 관리부터, 안전한 운영 환경 구축까지.')}
  <div class="service-enterprise-layout"><div class="service-enterprise-intro"><figure><img src="assets/company.jpg" alt="업무용 기기와 시스템을 점검하는 작업 환경" width="768" height="500" loading="lazy"></figure><h3>기업의 일상에 맞춘<br>보안 관리와 인프라.</h3><p>보안 설정과 업무 자료를 살피고, 필요한 솔루션과 저장 환경을 연결합니다. 점검 결과부터 구축 후 운영 안내까지 기업의 환경에 맞춰 지원합니다.</p><a class="service-chapter-button" href="enterprise-security.html">기업 보안 관리 자세히 보기</a></div>
   <div class="service-management-list"><div class="service-management-group"><span class="service-management-label">점검 · 자료 관리</span>
    ${serviceLink('enterprise-security.html#remote-security','원격 보안 점검','보안 설정·패치·외부 노출과 계정·로그·백업 운영 점검','01')}
    ${serviceLink('enterprise-security.html#employee-offboarding','퇴사자 관리 서비스','업무용 기기·계정·자료 보존과 인계, 정보 반출 정황 확인','02')}
   </div><div class="service-management-group"><span class="service-management-label">솔루션 · 인프라 구축</span>
    ${serviceLink('enterprise-security.html#security-solutions','보안 솔루션','접근 통제·위협 탐지·로그 관리의 도입 범위 검토','03')}
    ${serviceLink('enterprise-security.html#server-nas','서버·NAS·백업','저장 용량·권한과 백업·복구 운영 계획 구성','04')}
    ${serviceLink('enterprise-security.html#security-infrastructure','보안 인프라 구축','계정·네트워크·로그·백업 연결과 담당자 운영 안내','05')}
   </div></div>
  </div><div class="service-management-delivery"><span>기업 환경에 맞는 결과물</span><p>보안 점검 보고서</p><p>자료 인계 체크리스트</p><p>인프라 구성·운영 계획</p></div>
 </div></section></div>`;}

export function homeChapterNavigation(){return `<nav class="home-section-nav" aria-label="메인 페이지 바로가기" data-home-section-nav><button class="home-section-nav-toggle" type="button" aria-expanded="false" aria-controls="home-section-links">페이지 목차<span aria-hidden="true">+</span></button><ol id="home-section-links">${[['main','메인'],['national-experience','국가 재난 대응'],['home-digital-forensics','디지털포렌식 서비스'],['home-incident-response','침해사고 조사'],['home-enterprise-security','기업 보안 관리'],['home-contact','상담 안내']].map(([id,label],i)=>`<li><a href="#${id}" ${i===0?'aria-current="location"':''}><span class="home-section-label">${label}</span><span class="home-section-dot" aria-hidden="true"></span></a></li>`).join('')}</ol></nav>`;}
