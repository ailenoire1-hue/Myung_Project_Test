<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "복구 비용";
    String PAGE_DESC = "HDD·SSD 논리/물리 장애, 메모리, 모바일 데이터 복구 비용 안내 (부가세 별도).";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/cost/main_cost.jpg", HERO_EYEBROW = "Recovery Cost";
    String HERO_SUB = "투명한 비용 기준으로 안내해 드립니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/cost-tabs.jspf" %>

    <h2 class="sub-title">논리적 증상</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead>
          <tr><th colspan="3">HDD, SSD 논리적 증상 (3TB 이하 적용)</th></tr>
          <tr><th>WINDOWS 계열</th><th colspan="2">Other FileSystem</th></tr>
        </thead>
        <tbody>
          <tr><td rowspan="2" class="price">200,000원</td><td>MAC / Linux</td><td class="price">400,000원</td></tr>
          <tr><td>Oracle Solaris, Other UNIX</td><td class="price">800,000원</td></tr>
          <tr><td colspan="3">4TB 이상은 구간당(2TB) 추가 5만원</td></tr>
        </tbody>
      </table>
    </div>
    <ul class="tbl-note"><li>※ 헬륨 드라이브 작업비 10만원 선청구</li></ul>

    <h2 class="sub-title">물리적 증상</h2>
    <div class="grid grid-2">
      <div class="table-wrap">
        <table class="tbl tbl-compact">
          <thead>
            <tr><th colspan="4">SATA 물리적 증상 (2.5" / 3.5" 무관)</th></tr>
            <tr><th>용량</th><th>WINDOWS</th><th>MAC / Linux</th><th>Solaris / UNIX</th></tr>
          </thead>
          <tbody>
            <tr><th>500GB 이하</th><td class="price">350,000원</td><td class="price">450,000원</td><td class="price">500,000원</td></tr>
            <tr><th>2TB 이하</th><td class="price">400,000원</td><td class="price">500,000원</td><td class="price">550,000원</td></tr>
            <tr><th>4TB 이하</th><td class="price">450,000원</td><td class="price">550,000원</td><td class="price">600,000원</td></tr>
            <tr><th>6TB 이하</th><td class="price">600,000원</td><td class="price">700,000원</td><td class="price">750,000원</td></tr>
            <tr><th>8TB 이하</th><td class="price">800,000원</td><td class="price">900,000원</td><td class="price">950,000원</td></tr>
            <tr><th>8TB 초과</th><td colspan="3">상담 후 견적</td></tr>
          </tbody>
        </table>
      </div>
      <div class="table-wrap">
        <table class="tbl tbl-compact">
          <thead>
            <tr><th colspan="4">SSD 물리적 증상</th></tr>
            <tr><th>용량</th><th>WINDOWS</th><th>MAC / Linux</th><th>Solaris / UNIX</th></tr>
          </thead>
          <tbody>
            <tr><th>128GB 이하</th><td class="price">400,000원</td><td class="price">500,000원</td><td class="price">600,000원</td></tr>
            <tr><th>256GB 이하</th><td class="price">500,000원</td><td class="price">600,000원</td><td class="price">700,000원</td></tr>
            <tr><th>512GB 이하</th><td class="price">600,000원</td><td class="price">700,000원</td><td class="price">800,000원</td></tr>
            <tr><th>1TB 이하</th><td class="price">700,000원</td><td class="price">800,000원</td><td class="price">900,000원</td></tr>
            <tr><th>2TB 이하</th><td class="price">800,000원</td><td class="price">900,000원</td><td class="price">1,000,000원</td></tr>
            <tr><th>2TB 초과</th><td colspan="3">상담 후 견적</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <h2 class="sub-title">메모리 복구</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead>
          <tr><th rowspan="2">용량</th><th colspan="2">물리적 증상</th><th>논리적 증상 (윈도우 기준)</th></tr>
          <tr><th>TSOP/TLGA CF - 일반메모리, 보이스레코더</th><th>SD, Micro SD, COB (일체형)</th><th>모든 메모리</th></tr>
        </thead>
        <tbody>
          <tr><th>32GB 이하</th><td class="price">250,000원</td><td class="price">450,000원</td><td rowspan="2" class="price">150,000원</td></tr>
          <tr><th>64GB 이하</th><td class="price">350,000원</td><td class="price">550,000원</td></tr>
          <tr><th>128GB 이하</th><td class="price">400,000원</td><td class="price">650,000원</td><td rowspan="3" class="price">200,000원</td></tr>
          <tr><th>256GB 이하</th><td class="price">500,000원</td><td class="price">750,000원</td></tr>
          <tr><th>256GB 초과</th><td colspan="2">상담 후 견적</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="sub-title">모바일 물리 복구</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>아이폰</th><th>삼성, LG 스마트폰</th><th>가격 (VAT 별도)</th></tr></thead>
        <tbody>
          <tr><td>아이폰 11 이하</td><td>LG, S9 이하, A / J 시리즈 / 폴드 1,2,3 / 플립 1,2,3</td><td class="price">600,000원</td></tr>
          <tr><td>아이폰 12, 13</td><td>S10~S21 / 플립 4,5 / 폴드 4,5</td><td class="price">700,000원</td></tr>
          <tr><td>아이폰 14, 15</td><td>S22~S23 / 플립 6 / 폴드 6</td><td class="price">800,000원</td></tr>
          <tr><td>아이폰 16, 17</td><td>S24~S25 / 플립 7 / 폴드 7</td><td class="price">900,000원</td></tr>
        </tbody>
      </table>
    </div>
    <div class="map-links mt-2">
      <a class="btn btn-outline btn-sm" href="/resources/images/data/required_documents_popup.jpg" target="_blank" rel="noopener">모바일 복구 필요서류 안내</a>
      <a class="btn btn-outline btn-sm" href="/resources/images/data/RecoveryAuthorizeMobile.docx" download>위임장 양식 다운로드 (.docx)</a>
    </div>

    <div class="mt-5"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
