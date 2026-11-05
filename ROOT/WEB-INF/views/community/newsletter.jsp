<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "뉴스레터";
    String PAGE_DESC = "전문가가 들려주는 데이터 이야기, (주)명정보기술 뉴스레터.";
    String SECTION = "community";
    String HERO_IMG = "/resources/images/community/newsletter/main_newsletter.png", HERO_EYEBROW = "Newsletter";
    String HERO_SUB = "전문가가 들려주는 데이터 이야기,<br>명정보기술 뉴스레터를 만나보세요.";
    boolean VIEW = request.getParameter("no") != null;
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container<%= VIEW ? " container-narrow" : "" %>">
<% if (VIEW) { %>
    <article data-board="view" data-src="/resources/data/newsletter.json" data-list="/community/newsletter">
      <p class="board-empty">불러오는 중입니다...</p>
    </article>
<% } else { %>
    <div data-board="list" data-src="/resources/data/newsletter.json" data-view="/community/newsletter">
      <div class="board-tools">
        <p class="board-count mb-0">전체 <b>0</b>건</p>
        <form class="board-search" role="search">
          <label class="sr-only" for="nlQ">검색어</label>
          <input type="search" id="nlQ" name="q" placeholder="제목 검색">
          <button type="submit" class="btn btn-primary btn-sm">검색</button>
        </form>
      </div>
      <ul class="board-list"><li class="board-empty">불러오는 중입니다...</li></ul>
      <div class="pagination"></div>
    </div>
<% } %>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
