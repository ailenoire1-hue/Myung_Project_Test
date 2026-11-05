<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%!
    static final String[][] AWARDS = {
        {"/resources/images/intro/main_3.png", "제55호 기능한국인 선정", "고용노동부 · 한국산업인력공단"},
        {"/resources/images/intro/main_6.png", "인적자원개발 우수기관 인정", ""},
        {"/resources/images/intro/main_7.png", "가족친화 기업 선정", ""},
        {"/resources/images/intro/main_6.jpg", "글로벌강소기업 선정", "중소기업청"},
        {"/resources/images/about/cer/001.png", "기업부설연구소 인증", ""},
        {"/resources/images/about/cer/002.png", "수출유망중소기업 지정", "중소벤처기업부"},
        {"/resources/images/about/cer/01.png", "MK Best Venture Awards 수상", "2001 매경우수벤처"},
        {"/resources/images/about/cer/02.png", "Young Frontier Awards 수상", "2002"},
        {"/resources/images/about/cer/03.png", "고객만족 서비스 대상", "데이터복구 부문"},
        {"/resources/images/about/cer/04.png", "디지털 이노베이션 大賞", "2004 데이터복구 부문"},
        {"/resources/images/about/cer/05.png", "정보화 유공 국무총리상 수상", ""},
        {"/resources/images/about/cer/05.png", "무역의 날 충북도지사 표창", ""}
    };
    static final String[][] PATENTS = {
        {"10-0770732", "플래쉬 메모리를 이용한 IDE 및 SCSI 방식의 데이터 저장장치"},
        {"10-0779114", "스카시 인터페이스 변환 기술을 적용한 하드디스크 다중 테스트 장치"},
        {"10-0933286", "데이터복구를 위한 단일 하드디스크의 스핀들 모터 교체 장치"},
        {"10-0933787", "하드디스크 포렌식용 쓰기 방지 장치"},
        {"10-0933788", "하드디스크 포렌식용 쓰기 방지장치에서의 명령어 및 데이터처리방법"},
        {"10-0957224", "솔리드 스테이트 디스크에서 다중 데이터 채널을 이용한 플래시 메모리의 제어 방법 및 제어 시스템"},
        {"10-0978110", "하드디스크 포렌식용 쓰기방지장치에서의 히든영역 확인 및 표시 방법"},
        {"10-0982440", "단일 플래시 메모리의 데이터 관리 시스템"},
        {"10-1549615", "시간기반 영상 인덱스와 영상 데이터의 매칭 스캔 방식을 이용한 디지털 비디오 레코더의 CCTV 영상 데이터 복구 방법"},
        {"10-1568780", "SATA 인터페이스 저장장치의 정상 유무를 확인하는 휴대용장치"},
        {"10-1685043", "영상 포렌식 중 덮어쓰기된 CCTV 영상 데이터에서 과거 영상 데이터의 존재 유무 확인 방법 및 획득 방법"},
        {"10-1850205", "비할당 영역에서 저장된 CCTV 데이터 추출 방법"},
        {"10-2056284", "블랙박스 영상 데이터 복구를 위한 할당 영역과 비할당 영역 식별 및 영상 데이터 재구성 방법"},
        {"10-2079519", "블랙박스 영상 데이터 복구를 위한 FAT 파일 시스템 식별 및 영상 저장 영역 확인 방법"},
        {"10-2146459", "비정형 XFS 파일 시스템 기반의 비할당 영역에서의 CCTV 영상 데이터 추출 방법 및 그 장치"}
    };
%><%
    String PAGE_TITLE = "수상 및 인증";
    String PAGE_DESC = "(주)명정보기술의 수상 내역, 인증 및 데이터 복구·포렌식 관련 특허(산업재산권) 현황입니다.";
    String SECTION = "about";
    String HERO_IMG = "/resources/images/about/main_about.png", HERO_EYEBROW = "Awards & Certification";
    String HERO_SUB = "기술력으로 인정받은 수상 내역과 특허를 소개합니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div class="tabs" data-tabs="aw" role="tablist">
      <button type="button" role="tab" data-tab="awards" class="is-active" aria-selected="true">수상내역 및 인증</button>
      <button type="button" role="tab" data-tab="patents" aria-selected="false">산업재산권 (특허)</button>
    </div>

    <div data-panel-group="aw" data-panel="awards">
      <div class="cert-grid">
<% for (String[] a : AWARDS) { %>
        <div class="cert reveal">
          <div class="cert-img"><img src="<%= a[0] %>" alt="<%= h(a[1]) %>" loading="lazy"></div>
          <p><%= h(a[1]) %></p>
<%   if (a[2].length() > 0) { %><span class="text-muted" style="font-size:13.5px"><%= h(a[2]) %></span><% } %>
        </div>
<% } %>
      </div>
    </div>

    <div data-panel-group="aw" data-panel="patents" hidden>
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th style="width:80px">No.</th><th style="width:180px">등록번호</th><th>명칭</th></tr></thead>
          <tbody>
<% for (int i = 0; i < PATENTS.length; i++) { %>
            <tr><td><%= i + 1 %></td><td>제 <%= PATENTS[i][0] %> 호</td><td class="text-left"><%= h(PATENTS[i][1]) %></td></tr>
<% } %>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
