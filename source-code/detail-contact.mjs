const phoneIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 3 5-2.5 2a16 16 0 0 0 6.5 6.5L16 14l5 3-.6 3a2 2 0 0 1-2.2 1C10.5 20 4 13.5 3 5.8A2 2 0 0 1 4 3.6Z"/></svg>';

export function detailContact(company,{id='detail-contact',integratedFooter=false}={}){
 return `<section class="contact-band detail-contact${integratedFooter?' contact-with-footer':''}" id="${id}" aria-labelledby="${id}-title">
  <div class="container detail-contact-frame">
   <div class="detail-contact-main">
    <div class="detail-contact-copy">
     <span class="detail-contact-kicker">CONTACT MDFC</span>
     <h2 id="${id}-title"><span>보안사고 조사와</span> <span>디지털 증거 분석,</span><br><em>전문가와 상담하세요.</em></h2>
     <p class="detail-contact-lead">현재 상황과 확인하고 싶은 내용을 알려주세요.<br>필요한 자료와 분석 범위, 진행 방향을 함께 정리합니다.</p>
     <div class="consult-preparation"><h3>상담 전, 이 세 가지를 알려주세요.</h3>
      <ul><li><span>01</span><div><strong>발생 상황</strong><p>발생 시점과 주요 증상</p></div></li><li><span>02</span><div><strong>분석 대상</strong><p>기기·저장매체·계정</p></div></li><li><span>03</span><div><strong>확인할 내용</strong><p>조사 목적과 보유 자료</p></div></li></ul>
     </div>
    </div>
    <div class="detail-contact-channel"><span class="detail-contact-label">전문가 상담 대표번호</span>
     <a class="detail-contact-number" href="tel:${company.phone}" aria-label="대표번호 ${company.phone} 전화 연결">${company.phone}</a>
     <p class="detail-contact-hours">${company.hours}<br><span>토·일·공휴일 휴무</span></p>
     <div class="detail-contact-buttons"><a class="consult-call" href="tel:${company.phone}">${phoneIcon}<span>전화 상담</span></a><button class="consult-info" type="button" data-contact>상담 안내</button></div>
     <p class="detail-contact-note">자료 확보 방법부터 상담하실 수 있습니다.</p>
    </div>
   </div>
   <div class="consult-channels"><div class="consult-channels-heading"><span>더 가까이 만나는 명정보기술</span><p>기술 이야기와 현장 소식을 공식 채널에서 확인하세요.</p></div>
    <nav class="consult-social" aria-label="명정보기술 공식 채널">
     <a href="https://blog.naver.com/myungit2" target="_blank" rel="noopener noreferrer"><span class="consult-social-icon consult-naver" aria-hidden="true">N</span><span><strong>네이버 블로그</strong><small>기술 이야기 · 기업 소식</small></span><span class="consult-new-window">새 창</span></a>
     <a href="https://www.youtube.com/channel/UC7P1LyBxStJkKxAb_yx5DKw" target="_blank" rel="noopener noreferrer"><span class="consult-social-icon consult-youtube"><svg viewBox="0 0 24 18" aria-hidden="true"><rect width="24" height="18" rx="5" fill="currentColor"/><path d="m10 5 7 4-7 4Z" fill="#111d2b"/></svg></span><span><strong>유튜브</strong><small>영상으로 만나는 명정보기술</small></span><span class="consult-new-window">새 창</span></a>
    </nav>
   </div>
   ${integratedFooter?`<footer class="consult-footer"><div class="consult-footer-top"><strong>${company.legalName}</strong><nav aria-label="하단 메뉴"><a href="company.html">회사 소개</a><a href="digital-forensics.html">디지털포렌식 서비스</a><a href="incident-response.html">침해사고 조사</a><a href="enterprise-security.html">기업 보안 관리</a><a href="https://myung.co.kr/" target="_blank" rel="noopener noreferrer">명정보기술 홈페이지</a></nav></div><dl><div><dt>대표이사</dt><dd>${company.ceo}</dd></div><div><dt>사업자등록번호</dt><dd>${company.registration}</dd></div><div><dt>본사</dt><dd>${company.address}</dd></div><div><dt>FAX</dt><dd>${company.fax}</dd></div></dl><div class="consult-footer-bottom"><small>© ${new Date().getFullYear()} MYUNG Information Technologies. All rights reserved.</small><a href="#main">맨 위로</a></div></footer>`:''}
  </div>
 </section>`;
}
