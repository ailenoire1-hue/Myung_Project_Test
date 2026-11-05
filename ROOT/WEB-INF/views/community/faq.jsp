<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "FAQ";
    String PAGE_DESC = "데이터 복구 비용, 기간, 증상별 자주 묻는 질문과 답변.";
    String SECTION = "community";
    String HERO_IMG = "/resources/images/community/faq/main_faq.png", HERO_EYEBROW = "FAQ";
    String HERO_SUB = "자주 하는 질문들을 확인해 보세요.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container container-narrow">
    <div data-board="faq">
      <div class="tabs"></div>
      <div class="acc"><p class="board-empty">불러오는 중입니다...</p></div>
    </div>
    <div class="notice-box mt-4">
      <p>원하시는 답변을 찾지 못하셨나요? 고객센터 <a href="tel:<%= CS_TEL %>" class="text-primary"><strong><%= CS_TEL %></strong></a> 또는
        <button type="button" class="linklike text-primary" style="text-decoration:underline" data-open-modal="callModal">상담 요청</button>을 이용해 주세요.</p>
    </div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
