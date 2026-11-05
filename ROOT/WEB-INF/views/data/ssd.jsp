<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "SSD 복구";
    String PAGE_DESC = "국내 최초 SSD 개발 기술로 모든 제조사 SSD의 물리적·논리적 장애 및 암호화 SSD 데이터를 복구합니다.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/ssd/main_ssd.png", HERO_EYEBROW = "Myung Data Recovery";
    String HERO_SUB = "국내 최초 SSD 개발, 관련 SSD 기술로 데이터 복구를 선도합니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/device-tabs.jspf" %>
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">SSD Recovery</span>
        <h2 class="section-title">풍부한 경험의<br><em>SSD 데이터 복구</em></h2>
        <p class="lead">(주)명정보기술은 SSD 데이터 복구 경험이 풍부합니다. 특정 도구와 기술을 사용하여 SSD에 저장되어 있는 수많은 유형의 데이터가 손실되었을 때 이를 복구해 왔습니다.</p>
        <p>세계 최대 R&amp;D 엔지니어링 팀과 결합된 주요 제조업체와의 긴밀한 협력을 통해 개별 드라이브에서 엔터프라이즈 스토리지 시스템에 이르는 SSD 데이터 복구 솔루션을 제공합니다.</p>
      </div>
      <div class="video-box reveal">
        <video controls preload="none" playsinline poster="/resources/images/data/ssd/main_ssd.png"><source src="/uploadFiles/video/data/ssd.mp4" type="video/mp4"></video>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="split">
      <div>
        <h2 class="sub-title">SSD 복구 모델</h2>
        <p>모든 제조업체, 모델 또는 브랜드의 SSD에서 데이터를 복구합니다.</p>
        <ul class="logo-grid">
          <li>Samsung</li><li>Intel</li><li>SanDisk</li><li>Western Digital</li><li>Micron</li><li>Crucial</li><li>Kingston</li><li>Seagate</li>
          <li>Toshiba</li><li>Transcend</li><li>OCZ</li><li>PNY</li><li>Patriot Memory</li><li>STEC</li><li>Other</li>
        </ul>
      </div>
      <div class="text-center"><img src="/resources/images/data/ssd/ssd.png" alt="다양한 용량의 SSD" loading="lazy"></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Common Causes</span>
      <h2 class="section-title">데이터 손실의 일반적인 원인</h2>
      <p class="section-desc">플래시 칩의 물리적 손상이나 논리적 문제로 SSD의 데이터가 손실될 수 있습니다. 당사의 SSD 복구 전문가는 복잡한 SSD 데이터 구조 디코딩, 특수 컨트롤러 칩 등 SSD 및 플래시 고유의 기술적 문제를 극복할 수 있습니다.</p>
    </div>
    <h3 class="h4 mb-2">1) 기계적 고장</h3>
    <ul class="icards cols-3 mb-4">
      <li class="icard">전자 부품 고장</li><li class="icard">컨트롤러 칩 오류</li><li class="icard">장기간 사용으로<br>플래시 셀 마모</li>
      <li class="icard">인쇄 회로 기판 손상</li><li class="icard">커넥터 손상</li><li class="icard">펌웨어 업데이트 후<br>데이터 손상</li>
    </ul>
    <div class="grid grid-2" style="gap:32px">
      <div>
        <h3 class="h4 mb-2">2) 외부적 고장</h3>
        <ul class="icards cols-4"><li class="icard">정전</li><li class="icard">침수</li><li class="icard">화재</li><li class="icard">바이러스 /<br>랜섬웨어</li></ul>
      </div>
      <div>
        <h3 class="h4 mb-2">3) Human Error</h3>
        <ul class="icards cols-2"><li class="icard">실수로 삭제</li><li class="icard">덮어쓰기</li></ul>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Warning Signs</span>
      <h2 class="section-title">SSD 손상 지표</h2>
      <p class="section-desc">SSD가 읽기/쓰기 주기의 한계에 도달했거나 물리적 문제가 발생했음을 나타내는 가장 일반적인 지표입니다.</p>
    </div>
    <div class="grid grid-2">
      <div class="card"><img src="/resources/images/data/ssd/damage/1.png" alt="" width="64" height="64" class="mb-2"><h3>① 불량 블록(Bad Blocks) 증상</h3>
        <ul class="dot-list"><li>파일 저장, 읽기 및 이동에 실패합니다.</li><li>응용 프로그램이 느리게 작동하거나 자주 충돌합니다.</li><li>파일 시스템을 복구하라는 메시지가 뜹니다.</li><li>대용량 파일을 처리할 때 성능이 저하됩니다.</li></ul></div>
      <div class="card"><img src="/resources/images/data/ssd/damage/2.png" alt="" width="64" height="64" class="mb-2"><h3>② 인식 불가</h3>
        <ul class="dot-list"><li>SATA 케이블이 손상된 경우 BIOS가 SSD를 감지하지 못합니다. 외부는 정상으로 보여도 내부 와이어가 손상되었을 수 있으니 케이블을 교체해 보세요.</li><li>케이블에 이상이 없는데도 BIOS에 표시되지 않으면 공장 결함이나 물리적 손상 가능성이 큽니다. 이 경우 전문가의 도움을 받으세요.</li></ul></div>
      <div class="card"><img src="/resources/images/data/ssd/damage/3.png" alt="" width="64" height="64" class="mb-2"><h3>③ 충돌</h3>
        <p>부팅 중 충돌하지만 여러 번 재부팅한 후에는 정상 작동하는 것 같다면 SSD에 오류가 있는 것일 수 있습니다.</p></div>
      <div class="card"><img src="/resources/images/data/ssd/damage/4.png" alt="" width="64" height="64" class="mb-2"><h3>④ 읽기 전용 모드</h3>
        <p>흔하지는 않지만 SSD가 읽기 전용 모드로만 동작할 수 있습니다. 이 경우 드라이브가 손상되었을 가능성이 크므로 먼저 중요한 데이터를 백업하세요.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <h2 class="sub-title">SSD 데이터 암호화</h2>
        <p>보안은 개인과 기업의 주요 관심사입니다. 이에 따라 많은 SSD가 하드웨어나 소프트웨어 기반으로 암호화되어 있습니다.</p>
        <p>(주)명정보기술은 '암호 해독' 프로세스를 적용하여 데이터를 복구하며, 복구 시간을 단축합니다. 데이터 해독에는 사용자 키, 암호, 암호 문구 또는 암호화 소프트웨어 키 파일과 같은 암호화 관련 정보가 필요합니다.</p>
      </div>
      <div class="text-center reveal"><img src="/resources/images/data/ssd/lock.png" alt="SSD 암호화" class="circle-img" style="width:240px;height:240px" loading="lazy"></div>
    </div>
    <div class="mt-4"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
