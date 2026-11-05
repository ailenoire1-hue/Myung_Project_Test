<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "디지털 포렌식 비용";
    String PAGE_DESC = "모바일 포렌식 작업비, 원본 데이터 수령, 감정서 발급 비용 및 PC·노트북 디지털 포렌식 견적 안내.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/cost/main_cost.jpg", HERO_EYEBROW = "Recovery Cost";
    String HERO_SUB = "모바일 · PC 디지털 포렌식 비용 안내입니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/cost-tabs.jspf" %>

    <h2 class="sub-title">포렌식 - 모바일</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>작업비</th><th>원본 데이터 수령</th><th>감정서</th></tr></thead>
        <tbody><tr><td class="price">50,000원</td><td class="price">300,000원</td><td class="price">1,500,000원</td></tr></tbody>
      </table>
    </div>
    <ul class="tbl-note"><li>※ 포렌식-모바일 작업비 및 감정서 발급 비용은 선청구 후 작업이 진행됩니다.</li></ul>

    <h2 class="sub-title">포렌식 - PC / 노트북 및 기타</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>구분</th><th>비용</th></tr></thead>
        <tbody><tr><th>디지털 포렌식</th><td>상담 후 견적</td></tr></tbody>
      </table>
    </div>

    <div class="grid grid-2 mt-4">
      <a class="card is-hover" href="/forensic/myung"><h3>명디지털 포렌식 서비스</h3><p>기술·영업비밀 유출, 내부 비리, 침해사고 분석 등 서비스 안내</p><span class="card-link">자세히 보기</span></a>
      <a class="card is-hover" href="http://mdfc-myung.co.kr" target="_blank" rel="noopener"><h3>명디지털포렌식센터</h3><p>디지털 포렌식 전문 홈페이지에서 더 많은 정보를 확인하세요.</p><span class="card-link">바로가기</span></a>
    </div>

    <div class="mt-5"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
