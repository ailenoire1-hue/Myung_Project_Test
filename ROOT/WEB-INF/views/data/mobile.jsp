<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "모바일 복구";
    String PAGE_DESC = "아이폰·안드로이드 스마트폰과 태블릿의 파손, 침수, 삭제 데이터 복구. Chip-off, JTAG 등 전문 복구 기술 보유.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/mobile/main_mobile.png", HERO_EYEBROW = "Myung Data Recovery";
    String HERO_SUB = "(주)명정보기술은 모든 스마트 기기 복구에 특화되어 있습니다.";
    String[][] DAMAGE = { {"루팅 (Rooting)", "제조사가 걸어 놓은 제약을 해제하여 최상위 권한을 얻는 행위"}, {"인간 오류", "실수로 삭제, 떨어뜨리거나 찌그러뜨림"}, {"바이러스 / 해킹 공격", ""},
                          {"자연 재해", "화재, 침수"}, {"물리적 손상", "장치 오류"}, {"시스템 및 파일 손상", "루트 테이블 손상 등 구조적 손상"} };
    String[] DATA = { "전화번호부<br><small>Phone book</small>", "문자 메시지<br><small>SMS</small>", "멀티미디어 메시지<br><small>MMS</small>", "통화 내역<br><small>Call history</small>", "사진<br><small>Picture</small>",
                      "동영상<br><small>Video</small>", "음성 / MP3<br><small>Voice</small>", "카카오톡 등 메신저<br><small>SNS</small>", "메모장<br><small>Memo</small>" };
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/device-tabs.jspf" %>
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">Mobile Recovery</span>
        <h2 class="section-title">치명적인 데이터 손실도<br><em>스마트폰 복구 전문가</em>에게</h2>
        <p class="lead">(주)명정보기술 데이터 복구 엔지니어는 치명적인 데이터 손실을 겪은 스마트 기기에서 데이터 복구를 수행한 광범위한 경험을 가지고 있습니다.</p>
        <p>문자, 음성 메시지, 연락처부터 사진, 동영상까지 점점 더 많은 데이터를 휴대전화에 저장합니다. 휴대하기 위해 작게 만들어진 모바일 기기는 분실·도난·낙하·침수의 위험이 크며, 실수로 가족사진이나 중요한 메시지를 삭제하는 경우도 많습니다.</p>
      </div>
      <div class="video-box reveal">
        <video controls preload="none" playsinline poster="/resources/images/data/mobile/main_mobile.png"><source src="/uploadFiles/video/data/mobile.mp4" type="video/mp4"></video>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <h2 class="sub-title">손상 원인</h2>
    <ul class="icards cols-3">
<% for (int i = 0; i < DAMAGE.length; i++) { %>
      <li class="icard"><img src="/resources/images/data/mobile/damage/<%= i + 1 %>.png" alt=""><span><%= DAMAGE[i][0] %><% if (DAMAGE[i][1].length() > 0) { %><small><%= DAMAGE[i][1] %></small><% } %></span></li>
<% } %>
    </ul>

    <h2 class="sub-title">데이터 손실 후 주의사항</h2>
    <p>스마트 기기에 저장된 데이터는 손상, 삭제, 복구 시도 등 다양한 이유로 복구율이 달라집니다. 정확한 원인 분석과 정밀한 복구 절차를 통해 최상의 복구가 가능합니다.</p>
    <ol class="num-list">
      <li>데이터 손실 후 추가로 사용하지 않습니다.</li>
      <li>당황하지 말고 휴대폰 전원을 끕니다.</li>
      <li>휴대폰 전원이 들어오지 않는 경우 더 이상 전원을 공급하지 않습니다.</li>
      <li>침수된 휴대폰은 말리지 말고, 비닐봉지에 담아서 복구 업체에 맡깁니다.</li>
      <li>스스로 조치하려 하지 말고, 전문가의 의견에 따라 행동합니다.</li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="sub-title">복구 가능 데이터</h2>
    <p>명정보기술은 스마트폰이나 태블릿에서 손실된 모든 유형의 미디어 파일과 텍스트 콘텐츠를 복구합니다.</p>
    <ul class="icards icards-row cols-3">
<% for (int i = 0; i < DATA.length; i++) { %>
      <li class="icard"><img src="/resources/images/data/mobile/data/<%= i + 1 %>.png" alt=""><span><%= DATA[i] %></span></li>
<% } %>
    </ul>

    <h2 class="sub-title">복구 가능 제품</h2>
    <p>명정보기술의 스마트폰 복구 전문가들은 시장에 나와 있는 다양한 휴대폰을 다룰 수 있는 데이터 복구와 포렌식 노하우를 가지고 있습니다. 기존 휴대폰뿐만 아니라 아이폰, 안드로이드폰 등을 처리합니다.</p>
    <div class="grid grid-2">
      <div class="card" style="display:flex;gap:20px;align-items:flex-start"><img src="/resources/images/data/mobile/android.png" alt="Android" width="64" height="64">
        <div><h3>안드로이드 데이터 복구</h3><p>많은 스마트폰은 Google의 Android 운영 체제를 사용합니다. Android는 오픈소스 Linux 파일 시스템을 사용하며 장치별 변형이 많습니다. 당사는 스마트폰 및 태블릿을 포함한 Android 장치에서 데이터를 복구하는 신뢰할 수 있는 업체입니다.</p></div></div>
      <div class="card" style="display:flex;gap:20px;align-items:flex-start"><img src="/resources/images/data/mobile/apple.png" alt="Apple" width="64" height="64">
        <div><h3>아이폰 데이터 복구</h3><p>iPhone은 iOS 운영 체제를 사용합니다. 기술 자체는 Android와 크게 다르지 않지만 파일 시스템 아키텍처는 매우 다릅니다. 당사의 엔지니어는 Apple 장치에서 손실, 삭제 또는 손상된 데이터를 복구하는 데 능숙합니다.</p></div></div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Recovery Method</span>
      <h2 class="section-title">스마트폰 데이터 복구 방법</h2>
    </div>
    <h3 class="h4">1) 스마트폰의 데이터가 저장되어 있는 곳 : eMMC · eMCP 칩</h3>
    <p>USB 드라이브나 SSD 내부에는 NAND 칩과 컨트롤러 칩이 있으며, 데이터는 NAND 칩에 있지만 컨트롤러를 통과해야 이해할 수 있는 형태로 구성됩니다. 휴대전화 내부에는 두 가지 유형의 NAND 플래시 메모리 칩이 있습니다.</p>
    <div class="grid grid-2 mb-4">
      <div class="card"><img src="/resources/images/data/mobile/memory/1.png" alt="eMMC 칩" width="90" class="mb-2"><h3>eMMC <small class="text-muted" style="font-size:14px">Embedded Multi-Media Card</small></h3>
        <p>컨트롤러가 통합된 칩으로 일반 NAND 칩보다 느리지만, 생산 비용이 저렴하고 크기가 작아 전화 및 태블릿에 널리 사용됩니다.</p></div>
      <div class="card"><img src="/resources/images/data/mobile/memory/2.png" alt="eMCP 칩" width="90" class="mb-2"><h3>eMCP <small class="text-muted" style="font-size:14px">Embedded Multi-Chip Package</small></h3>
        <p>두 개 이상의 반도체 칩과 컨트롤러를 하나의 패키지로 묶은 단일 칩입니다. RAM과 컨트롤러가 통합되어 eMMC보다 성능이 향상되어 있습니다.</p></div>
    </div>
    <h3 class="h4">2) 스마트폰 데이터 복구 방법</h3>
    <div class="grid grid-2 mb-4">
      <div class="card"><img src="/resources/images/data/mobile/memory/3.png" alt="" class="circle-img mb-2" style="width:96px;height:96px"><h3>메모리를 분리할 수 있는 경우 (Chip-off)</h3>
        <p>스마트폰을 완전히 분해한 후 전문 엔지니어가 칩을 제거하고, 칩 판독기에 넣어 이미지를 생성합니다. 최근 칩에는 컨트롤러가 통합되어 있어 전문가의 경험과 전문 도구 없이는 데이터를 읽고 분석하기 어렵습니다.</p></div>
      <div class="card"><img src="/resources/images/data/mobile/memory/4.png" alt="" class="circle-img mb-2" style="width:96px;height:96px"><h3>메모리를 분리할 수 없는 경우 (JTAG)</h3>
        <p>칩을 제거할 수 없으면 JTAG 데이터 추출 방법을 사용합니다. 마더보드의 특정 접점에 와이어를 연결해 칩을 제거하지 않고도 메모리 칩의 데이터를 읽을 수 있습니다.</p></div>
    </div>
    <h3 class="h4">3) 데이터 복구 난제</h3>
    <div class="grid grid-2">
      <div class="card"><img src="/resources/images/data/mobile/memory/5.png" alt="" width="64" class="mb-2"><h3>암호화</h3>
        <p>일부 Android 모델과 최신 iPhone(iPhone 4s 이상)은 기본적으로 자체 암호화되어 있어, 사용자의 고유 인증 정보가 필요합니다. 따라서 스마트폰 데이터 복구에는 사용자의 사전 동의와 협력이 필요합니다.</p></div>
      <div class="card"><img src="/resources/images/data/mobile/memory/6.png" alt="" width="64" class="mb-2"><h3>자체 파일 시스템과 운영 체제</h3>
        <p>모델마다 제작·프로그래밍 방식과 파일 시스템이 달라 복구가 까다롭습니다. 당사 엔지니어는 "더미" 모델로 복구 방법을 테스트하고 협력업체와 유기적으로 협력하여 고객 데이터를 복구합니다.</p></div>
    </div>
    <div class="mt-4"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
