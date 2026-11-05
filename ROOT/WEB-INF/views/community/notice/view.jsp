<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "공지사항";
    String PAGE_DESC = "(주)명정보기술 공지사항";
    String SECTION = "community";
    String HERO_IMG = "/resources/images/community/notice/main_notice.png", HERO_EYEBROW = "Notice";
    String HERO_SUB = null;
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container container-narrow">
    <article data-board="view" data-src="/resources/data/notice.json" data-list="/community/notice">
      <p class="board-empty">불러오는 중입니다...</p>
    </article>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
