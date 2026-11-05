<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "공지사항";
    String PAGE_DESC = "(주)명정보기술의 새로운 소식과 공지사항을 확인하세요.";
    String SECTION = "community";
    String HERO_IMG = "/resources/images/community/notice/main_notice.png", HERO_EYEBROW = "Notice";
    String HERO_SUB = "명정보기술의 새로운 소식을 전해드립니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div data-board="list" data-src="/resources/data/notice.json" data-view="/community/notice/view">
      <div class="board-tools">
        <p class="board-count mb-0">전체 <b>0</b>건</p>
        <form class="board-search" role="search">
          <label class="sr-only" for="noticeQ">검색어</label>
          <input type="search" id="noticeQ" name="q" placeholder="제목 검색">
          <button type="submit" class="btn btn-primary btn-sm">검색</button>
        </form>
      </div>
      <ul class="board-list"><li class="board-empty">불러오는 중입니다...</li></ul>
      <div class="pagination"></div>
    </div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
