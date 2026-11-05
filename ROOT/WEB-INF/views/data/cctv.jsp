<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "CCTV · DVR 복구";
    String PAGE_DESC = "삭제·포맷·훼손된 CCTV/DVR 영상 데이터 복구. 천안함·세월호 영상 복구 경험, 특허 기반 DVR Explorer 솔루션 보유.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/cctv/main_cctv.png", HERO_EYEBROW = "Myung Data Recovery";
    String HERO_SUB = "(주)명정보기술은 CCTV / DVR 데이터 복구에 특화되어 있습니다.";
    String[] ADV = { "범죄 탐지", "기록 유지", "직원 보호", "소송 증거 수집" };
    String[] DIS = { "항상 작동하지는 않음", "개인 정보 보호 문제", "초기 구축 비용", "CCTV에서 보여줄 수<br>있는 것 제한", "영상 재료의 품질" };
    String[] NEED = { "사건사고 발생 (절도, 폭행 등)<br>증거 수집", "증거인멸 시도로<br>영상이 훼손", "물리적 손상으로 기기의<br>데이터를 읽을 수 없음" };
    String[] CAUSE = { "전원 문제", "파일 전송 오류", "펌웨어 손상", "삭제", "침수", "화재", "하드디스크 고장", "기기 고장" };
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/device-tabs.jspf" %>
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">CCTV · DVR Recovery</span>
        <h2 class="section-title">사라진 영상,<br><em>증거를 되살립니다</em></h2>
        <p class="lead">CCTV에 저장된 영상 데이터가 논리적 문제(삭제, 포맷, 파일시스템 문제 등)나 하드웨어 문제(기기 고장, 저장매체 고장)로 접근할 수 없을 때 데이터를 복구합니다.</p>
      </div>
      <div class="video-box reveal">
        <video controls preload="none" playsinline poster="/resources/images/data/cctv/main_cctv.png"><source src="/uploadFiles/video/data/cctv.mp4" type="video/mp4"></video>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="grid grid-2">
      <div class="card">
        <img src="/resources/images/data/cctv/camera.png" alt="CCTV 카메라" style="height:120px;width:auto" class="mb-2">
        <h3>CCTV (Closed-Circuit Television)</h3>
        <ul class="dot-list">
          <li>카메라와 카메라가 찍는 영상을 녹화하는 DVR(Digital Video Recorder)로 구성됩니다.</li>
          <li>비디오 카메라로 특정 장소의 신호를 DVR로 전송하여 저장합니다.</li>
          <li>은행, 공항, 상업지역 등 보안이 필요한 곳의 감시용으로 많이 사용됩니다.</li>
          <li>신호가 공개적으로 전송되지 않는다는 점에서 방송 텔레비전과 다릅니다.</li>
        </ul>
      </div>
      <div class="card">
        <img src="/resources/images/data/cctv/dvr.png" alt="CCTV 녹화기(DVR)" style="height:120px;width:auto;object-fit:contain" class="mb-2">
        <h3>DVR (Digital Video Recorder)</h3>
        <p>아날로그 카메라의 영상을 캡처 보드에서 디지털 이미지로 변환하여, 보통 MPEG 표준으로 압축해 장시간 녹화·재생하는 시스템입니다.</p>
        <ul class="dot-list">
          <li>녹화뿐 아니라 Motion Detection, 센서 연동 녹화, Pan/Tilt/Zoom 제어, 화상 확대·편집 기능</li>
          <li>데이터를 HDD, DAT 등에 반영구적으로 보관하는 기능</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid-2" style="gap:40px">
      <div>
        <h2 class="sub-title">CCTV의 장점</h2>
        <p>CCTV는 일상생활에서 보안과 안전을 위해 중요한 역할을 합니다.</p>
        <ul class="icards cols-2"><% for (int i = 0; i < ADV.length; i++) { %><li class="icard"><img src="/resources/images/data/cctv/advantages/<%= String.format("%02d", i + 1) %>.png" alt=""><span><%= ADV[i] %></span></li><% } %></ul>
      </div>
      <div>
        <h2 class="sub-title">CCTV의 단점</h2>
        <p>CCTV가 항상 원하는 결과를 보장하지는 않습니다.</p>
        <ul class="icards cols-2"><% for (int i = 0; i < DIS.length; i++) { %><li class="icard" style="background:var(--bg-soft)"><img src="/resources/images/data/cctv/advantages/<%= String.format("%02d", i + 5) %>.png" alt=""><span><%= DIS[i] %></span></li><% } %></ul>
      </div>
    </div>

    <h2 class="sub-title">CCTV / DVR 복구 필요성</h2>
    <ul class="icards cols-3"><% for (int i = 0; i < NEED.length; i++) { %><li class="icard"><img src="/resources/images/data/cctv/advantages/<%= i + 10 %>.png" alt=""><span><%= NEED[i] %></span></li><% } %></ul>
  </div>
</section>

<section class="section section-navy">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" style="color:#9ec0ff">Why Myung</span>
      <h2 class="section-title">왜 명정보기술인가</h2>
    </div>
    <div class="grid grid-2" style="gap:40px;align-items:center">
      <ul class="check-list" style="font-size:17px;color:#fff">
        <li>천안함, 세월호 같은 국가 재난 시기에 불가능해 보이던 영상 데이터를 성공적으로 복구했습니다.</li>
        <li>독자적인 특허 기술로 개발한 CCTV 전용 복구 솔루션 <strong>DVR Explorer</strong>를 보유하고 있습니다.</li>
        <li>CLASS 100 클린룸 통제 환경에서 복구 작업을 수행합니다.</li>
        <li>개인정보 보호와 기밀 작업에 대한 엄격한 규정을 준수합니다.</li>
      </ul>
      <div class="grid grid-2" style="gap:12px">
        <figure class="figure"><img src="/resources/images/data/cctv/myung_1.png" alt="CCTV 4분할 화면 중 한 채널이 No Signal로 훼손된 모습" loading="lazy"><figcaption style="color:rgba(255,255,255,.7)">영상 삭제 · 훼손</figcaption></figure>
        <figure class="figure"><img src="/resources/images/data/cctv/myung_2.png" alt="훼손된 CCTV 채널 영상이 복구된 화면" loading="lazy"><figcaption style="color:rgba(255,255,255,.7)">영상 복구 완료</figcaption></figure>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div>
        <h2 class="sub-title">Myung CCTV / DVR Explorer</h2>
        <p>독자적인 특허 기술로 개발한 CCTV 전용 영상 복구 솔루션입니다. 저장장치의 섹터 데이터를 직접 분석하여 손상된 영상 데이터를 복구합니다.</p>
        <p><a class="text-primary" href="/about/awards">CCTV · 블랙박스 영상 복구 관련 특허 보기 →</a></p>
      </div>
      <figure class="figure"><img src="/resources/images/data/cctv/explorer.png" alt="DVR Explorer 프로그램의 HEX Viewer 분석 화면" loading="lazy"><figcaption>영상 복구 솔루션 일부 화면</figcaption></figure>
    </div>

    <h2 class="sub-title">CCTV / DVR 고장 원인</h2>
    <ul class="icards cols-4"><% for (int i = 0; i < CAUSE.length; i++) { %><li class="icard"><img src="/resources/images/data/cctv/cause/0<%= i + 1 %>.png" alt=""><span><%= CAUSE[i] %></span></li><% } %></ul>

    <h2 class="sub-title">CCTV 복구 절차</h2>
    <ol class="flow">
      <li><strong>CCTV 입고</strong></li><li><strong>복구 장비 연결 점검</strong></li><li><strong>Copy</strong><p>소프트웨어 손상</p></li>
      <li><strong>부품 교체</strong><p>하드웨어 손상</p></li><li><strong>내부 스토리지 데이터 저장</strong></li><li><strong>결과 정리 및 검수</strong></li>
      <li><strong>복원 데이터 확인</strong></li><li><strong>결제 후 데이터 반출</strong></li><li><strong>복제 및 데이터 파기</strong><p>2일 이내</p></li>
    </ol>

    <h2 class="sub-title">복구 가능 브랜드</h2>
    <p>국내외 다양한 CCTV를 수년간 복구하며 축적된 경험으로 대부분의 제조사 영상 데이터 복구가 가능합니다. 새로운 제품은 기술연구소의 CCTV 영상 분석 전문 인력이 연구를 통해 해결 방안을 제시합니다.</p>
    <ul class="logo-grid">
      <li>Hanwha<small>한화</small></li><li>SAMSUNG<small>삼성</small></li><li>IDIS<small>아이디스</small></li><li>HIKVISION<small>하이크비젼</small></li><li>Dahua<small>다후아</small></li>
      <li>FOCUS H&amp;S<small>포커스 H&amp;S</small></li><li>JWC<small>JWC</small></li><li>EGPIS<small>이지피스</small></li><li>human<small>휴먼</small></li><li>AURA<small>아우라</small></li>
    </ul>
    <div class="mt-4"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
