<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "서버 · RAID 복구";
    String PAGE_DESC = "RAID, NAS, SAN 등 모든 서버·스토리지 데이터 복구. 데이터베이스, 회계 시스템, 메일 서버 복구 경험 다수.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/raid/main_raid.png", HERO_EYEBROW = "Myung Data Recovery";
    String HERO_SUB = "어떤 저장장치도 완전무결하지 않습니다.<br>RAID 장애, 전문가에게 맡기십시오.";
    String[] HW = { "손상된 RAID 구성", "번개, 홍수 또는<br>화재 피해", "RAID 하드디스크<br>드라이브(HDD) 과열", "간헐적인<br>드라이브 오류", "오염된 미디어 표면", "다중 드라이브 오류",
                    "전원 공급 장치<br>소손 또는 고장", "RAID 컨트롤러 오류", "RAID 손상", "RAID 드라이브<br>비호환성", "RAID 어레이 실패", "전원 회로 오작동" };
    String[] SW = { "백업 실패", "컴퓨터 바이러스 또는 웜", "파일/데이터 손상", "폴더 손상", "디렉토리 손상", "펌웨어 손상", "서버 레지스트리<br>구성 오류", "파티션 누락", "RAID 구성 오류", "재포맷" };
    String[] DONT = { "RAID 리셋(reset) 시도", "checkdisk 또는 fsck를 실행하여<br>파일 시스템 복구 시도", "SMART 에러 또는 불량 섹터가 있는<br>드라이브를 읽기 시도", "소프트웨어 기반<br>복구 프로그램 실행" };
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/device-tabs.jspf" %>
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">Server · RAID Recovery</span>
        <h2 class="section-title">모든 RAID 장치에 대한<br><em>최고의 복구 서비스</em></h2>
        <p class="lead">모든 기기가 그렇듯 RAID 시스템에도 장애가 발생할 수 있습니다. 동일한 데이터를 여러 곳에 저장하는 것은 좋은 보호 방법이지만, 어떤 저장장치도 완전무결하지는 않습니다.</p>
        <p>RAID는 드라이브 하나에 장애가 발생해도 계속 작동하도록 구성할 수 있지만, 여러 드라이브가 동시에 고장 나 시스템 장애로 이어지는 경우가 자주 발생합니다.</p>
      </div>
      <div class="video-box reveal">
        <video controls preload="none" playsinline poster="/resources/images/data/raid/main_raid.png"><source src="/uploadFiles/video/data/raid.mp4" type="video/mp4"></video>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <h2 class="sub-title">신뢰할 수 있는 전문가</h2>
        <p>당사의 서버 RAID 데이터 복구 엔지니어는 다년간의 복구 경험으로 누적된 지식과 전문 기술을 보유하고 있어 최고의 성공률을 보장합니다.</p>
        <p>RAID, NAS, SAN과 모든 유형의 고용량 장치의 데이터를 복구하며, 모든 규모의 조직의 손실된 데이터베이스, 회계 시스템, 메일 서버 및 기타 중요 데이터를 복구해 왔습니다.</p>
      </div>
      <div class="text-center reveal"><img src="/resources/images/data/raid/raid_system.png" alt="랙 서버와 타워형 RAID 서버 시스템" loading="lazy"></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Why RAID Fails</span>
      <h2 class="section-title">RAID가 실패하는 이유</h2>
      <p class="section-desc">장애에는 하드웨어 장애, 인적 오류, 소프트웨어 장애, 애플리케이션 장애의 네 가지 일반적인 범주가 있습니다. (주)명정보기술은 RAID 어레이와 RAID 드라이브 데이터 복구를 모두 제공합니다.</p>
    </div>
    <h3 class="h4 mb-2">1) RAID 하드웨어 오류</h3>
    <ul class="icards cols-4 mb-4">
<% for (int i = 0; i < HW.length; i++) { %><li class="icard"><img src="/resources/images/data/raid/fail/1_<%= String.format("%02d", i + 1) %>.png" alt=""><span><%= HW[i] %></span></li><% } %>
    </ul>
    <h3 class="h4 mb-2">2) RAID 소프트웨어 문제</h3>
    <ul class="icards cols-5 mb-4">
<% for (int i = 0; i < SW.length; i++) { %><li class="icard"><img src="/resources/images/data/raid/fail/2_<%= String.format("%02d", i + 1) %>.png" alt=""><span><%= SW[i] %></span></li><% } %>
    </ul>
    <h3 class="h4 mb-2">3) Application Failure</h3>
    <ul class="icards cols-4">
      <li class="icard">파일을 실행하거나<br>로드할 수 없습니다</li><li class="icard">손상된 데이터베이스 데이터<br>또는 기타 파일</li>
      <li class="icard">액세스를 방지하는<br>잠긴 데이터베이스</li><li class="icard">삭제된 테이블</li>
    </ul>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Supported Systems</span>
      <h2 class="section-title">모든 RAID 서버 및 구성 지원</h2>
    </div>
    <h3 class="h4 mb-2">RAID 레벨</h3>
    <div class="chips mb-4">
<% for (String lv : new String[]{"RAID 0", "RAID 0+1", "RAID 1", "RAID 1E", "RAID 3", "RAID 4", "RAID 5", "RAID 5E", "RAID 6", "RAID 10", "RAID 50", "RAID 51", "RAID 60", "RAID ADG", "ZFS", "RAID-Z", "RAID-Z2", "RAID-Z3"}) { %><span class="chip"><%= lv %></span><% } %>
    </div>
    <h3 class="h4 mb-2">RAID 서버 제조사 및 미디어</h3>
    <ul class="check-list" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
      <li>모든 HP ProLiant, LeftHand 및 3PAR 시리즈</li>
      <li>모든 Dell PowerEdge, PowerVault, EqualLogic 및 Compellent 시리즈</li>
      <li>IBM xSeries, Power Series (AIX, Linux) 및 스토리지 하위 시스템</li>
      <li>슈퍼마이크로 서버 및 스토리지 서브시스템</li>
      <li>모든 Intel 및 AMD 제품 라인</li>
      <li>SAN 및 NAS 기반 RAID</li>
      <li>독립형 스토리지 시스템</li>
      <li>EMC 및 NetApp 제품 라인</li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Caution</span>
      <h2 class="section-title">RAID 손상 시 하지 말아야 할 것</h2>
      <p class="section-desc">RAID 장애가 발생하면 즉시 시스템을 종료하고 전문가에게 문의하십시오. 아래와 같은 조치는 데이터, 파일 시스템, 드라이브 손상으로 이어져 복구에 실패할 수 있습니다.</p>
    </div>
    <ul class="icards cols-4">
<% for (int i = 0; i < DONT.length; i++) { %><li class="icard" style="background:#fff4f2"><span class="n" style="background:var(--danger)"><%= i + 1 %></span><img src="/resources/images/data/raid/fail/3_0<%= i + 1 %>.png" alt=""><span><%= DONT[i] %></span></li><% } %>
    </ul>
    <div class="mt-4"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
