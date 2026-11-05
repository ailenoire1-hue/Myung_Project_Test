<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "자료실";
    String PAGE_DESC = "(주)명정보기술 자료실 - 접수 양식 및 안내 자료.";
    String SECTION = "community";
    String HERO_IMG = "/resources/images/community/reference/main_reference.png", HERO_EYEBROW = "Reference";
    String HERO_SUB = "데이터 복구 접수에 필요한 양식과 자료를 제공합니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div class="grid grid-3">
      <a class="card is-hover" href="/resources/images/data/RecoveryAuthorizeMobile.docx" download>
        <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-1 9-4-4h3v-4h2v4h3l-4 4z"/></svg></div>
        <h3>휴대폰 복구 위임장 양식</h3><p>대리인 접수 시 필요한 위임장 양식 (Word)</p><span class="card-link">다운로드</span>
      </a>
      <a class="card is-hover" href="/resources/images/data/required_documents_popup.jpg" target="_blank" rel="noopener">
        <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></div>
        <h3>모바일 복구 필요서류 안내</h3><p>모바일 복구·포렌식 접수 시 구비서류 안내</p><span class="card-link">보기</span>
      </a>
      <a class="card is-hover" href="/community/notice">
        <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg></div>
        <h3>공지사항</h3><p>택배 접수 양식 등 최신 안내는 공지사항에서 확인하세요.</p><span class="card-link">바로가기</span>
      </a>
    </div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
