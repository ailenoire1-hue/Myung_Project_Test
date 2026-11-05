<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "복구 후기";
    String PAGE_DESC = "HDD, SSD, USB, 메모리카드, CCTV, 블랙박스, 스마트폰, 서버 데이터 복구 작업 사례.";
    String SECTION = "community";
    String HERO_IMG = "/resources/images/community/faq/main_faq.png", HERO_EYEBROW = "Recovery Review";
    String HERO_SUB = "실제 데이터 복구 작업 사례를 소개합니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div data-board="review">
      <div class="tabs"></div>
      <p class="board-count">전체 <b>0</b>건</p>
      <div class="grid grid-4 review-grid"><p class="board-empty" style="grid-column:1/-1">불러오는 중입니다...</p></div>
      <div class="pagination"></div>
    </div>
  </div>
</section>

<div class="modal" id="reviewModal" role="dialog" aria-modal="true" aria-labelledby="reviewModalTitle" hidden>
  <div class="modal-dialog modal-lg">
    <button type="button" class="modal-close" data-close-modal aria-label="닫기">&times;</button>
    <h2 class="modal-title" id="reviewModalTitle">복구 사례</h2>
    <div id="reviewModalBody"></div>
  </div>
</div>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
