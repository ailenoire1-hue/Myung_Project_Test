<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "프리미엄 복구 비용";
    String PAGE_DESC = "특수 복구(가상화 서버, DB, 암호화, CCTV), 기타 스토리지, 시스템 복구, 긴급 대응, 침수·화재, 서버·NAS, SAS 복구 비용 안내.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/cost/main_cost.jpg", HERO_EYEBROW = "Recovery Cost";
    String HERO_SUB = "서버·DB·암호화·CCTV 등 특수 복구와 긴급 대응 비용 안내입니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/cost-tabs.jspf" %>

    <h2 class="sub-title">특수 복구</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr><th>특수 복구</th><th>복구 비용</th><th>작업 비용</th></tr></thead>
        <tbody>
          <tr><th>타업체 복구 불가건</th><td>정상가의 100% 할증</td><td class="price">100,000원</td></tr>
          <tr><th>가상화 서버 (논리적 증상)</th><td>볼륨 파일 개수당 1,000,000원</td><td class="price">300,000원</td></tr>
          <tr><th>메일 (Outlook, Notes)</th><td class="price">300,000원</td><td class="price">50,000원</td></tr>
          <tr><th>DB (MSSQL, MySQL, Oracle 등) / 회계 데이터</th><td class="price">1,200,000원</td><td class="price">300,000원</td></tr>
          <tr><th>파일시스템 암호화<br>(Symantec PGP, Safe Boot, BitLocker 등)</th><td class="price">1,000,000원</td><td class="price">200,000원</td></tr>
          <tr><th>FILE PASSWORD</th><td rowspan="2" class="price">200,000원</td><td rowspan="2" class="price">50,000원</td></tr>
          <tr><th>계정 암호</th></tr>
          <tr><th>블랙박스</th><td class="price">200,000원</td><td class="price">50,000원</td></tr>
          <tr><th>일반 영상</th><td>파일 개수당 150,000원</td><td class="price">30,000원</td></tr>
          <tr><th rowspan="2">CCTV / DVR</th><td>1TB 이하 1,000,000원 (단일 하드 기준)</td><td rowspan="2" class="price">300,000원</td></tr>
          <tr><td>1TB 초과는 구간당(1TB) 추가 10만원</td></tr>
        </tbody>
      </table>
    </div>

    <div class="grid grid-2 mt-3" style="gap:32px">
      <div>
        <h2 class="sub-title">기타 스토리지</h2>
        <div class="table-wrap">
          <table class="tbl tbl-compact">
            <thead><tr><th>매체</th><th>비용</th></tr></thead>
            <tbody>
              <tr><th>ZIP, Other Media</th><td class="price">400,000원</td></tr>
              <tr><th>TAPE</th><td>500,000원부터 (상담)</td></tr>
              <tr><th>ODD, FDD</th><td class="price">150,000원</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 class="sub-title">SYSTEM Recovery</h2>
        <div class="table-wrap">
          <table class="tbl tbl-compact">
            <thead><tr><th>운영체제</th><th>복구 성공</th><th>복구 실패</th></tr></thead>
            <tbody>
              <tr><th>DOS, Windows, Linux 계열</th><td class="price">2,000,000원</td><td rowspan="2">복구 성공 금액의 30%</td></tr>
              <tr><th>Unix, 임베디드 방식</th><td>상담 후 견적</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 class="sub-title">긴급 대응 비용</h2>
        <div class="table-wrap">
          <table class="tbl tbl-compact">
            <thead><tr><th>수주 금액</th><th>복구 성공</th><th>복구 실패</th></tr></thead>
            <tbody>
              <tr><th>60만원 미만</th><td>수주 금액 + 30만원</td><td class="price">30만원</td></tr>
              <tr><th>60만원 이상</th><td>수주 금액 50% 할증</td><td>복구 성공 금액의 30%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 class="sub-title">침수 · 화재 / 서버 · NAS</h2>
        <div class="table-wrap">
          <table class="tbl tbl-compact">
            <thead><tr><th>구분</th><th>복구 성공</th><th>복구 실패</th></tr></thead>
            <tbody>
              <tr><th>침수, 화재</th><td>인터페이스별 물리 복구 비용 + 침수·화재 작업비 40만원</td><td>복구 성공 금액의 30%</td></tr>
              <tr><th>서버, NAS 복구</th><td>인터페이스별 물리 복구 비용 × 디스크 개수</td><td>복구 성공 금액의 30%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <h2 class="sub-title">Special HDD</h2>
    <div class="table-wrap">
      <table class="tbl">
        <thead>
          <tr><th colspan="4">SAS 물리적 증상 (2.5" / 3.5" 무관)</th></tr>
          <tr><th>용량</th><th>WINDOWS</th><th>MAC / Linux</th><th>Solaris / Other UNIX</th></tr>
        </thead>
        <tbody>
          <tr><th>500GB 이하</th><td class="price">600,000원</td><td class="price">650,000원</td><td class="price">700,000원</td></tr>
          <tr><th>600GB 이하</th><td class="price">700,000원</td><td class="price">750,000원</td><td class="price">800,000원</td></tr>
          <tr><th>2TB 이하</th><td class="price">800,000원</td><td class="price">900,000원</td><td class="price">1,000,000원</td></tr>
          <tr><th>4TB 이하</th><td class="price">1,000,000원</td><td class="price">1,100,000원</td><td class="price">1,200,000원</td></tr>
          <tr><th>비고</th><td colspan="3">이 외 용량 및 SSD, 특수 시스템 사용 시 엔지니어 상담 후 견적<br>(Dell EMC, NetApp 등 Custom Sector Size는 복구 비용 3배 / 작업 비용 50% 부과)</td></tr>
        </tbody>
      </table>
    </div>
    <ul class="tbl-note"><li>※ PATA, SCSI, FC HDD 물리적 증상 (2.5" / 3.5" 무관) : 상담 후 견적</li></ul>

    <div class="mt-5"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
