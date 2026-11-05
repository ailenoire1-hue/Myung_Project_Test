<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = null;
    String PAGE_DESC = "1990년 설립, 국내 최초 데이터 복구 전문기업 (주)명정보기술. 하드디스크·SSD·USB·메모리·휴대폰·서버(RAID)·CCTV 데이터 복구와 디지털 포렌식. 전국 9개 지점, 고객센터 1577-1377.";
    String SECTION = "";
    String HERO_IMG = null, HERO_EYEBROW = null, HERO_SUB = null;
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="hero">
  <div class="container hero-inner">
    <div>
      <p class="hero-eyebrow">국내 최초 데이터 복구 · 1990년 설립</p>
      <h1 class="hero-title">사라진 데이터,<br><em>명정보기술</em>이<br class="br-mo"> 되살립니다</h1>
      <p class="hero-desc">하드디스크, SSD, 메모리, 스마트폰, 서버, CCTV까지.<br class="br-pc">
        누적 650,000건 이상의 복구 경험과 Class 100 클린룸에서 소중한 데이터를 안전하게 복구합니다.</p>
      <div class="hero-actions">
        <a class="btn btn-white btn-lg" href="/data/request">온라인 복구 접수</a>
        <a class="btn btn-outline-white btn-lg" href="/data/cost/common">복구 비용 안내</a>
      </div>
    </div>
    <aside class="hero-card" aria-label="고객센터">
      <p class="hero-card-label">고객센터 · 무료 상담</p>
      <a class="hero-card-tel" href="tel:<%= CS_TEL %>"><%= CS_TEL %></a>
      <ul class="hero-card-hours">
        <li><b>평일</b>24시간 상담 가능</li>
        <li><b>주말</b>09:00 ~ 17:00</li>
      </ul>
      <button type="button" class="btn btn-primary" data-open-modal="callModal">빠른 상담 요청</button>
      <a class="btn btn-kakao" href="<%= KAKAO_URL %>" target="_blank" rel="noopener">카카오톡 상담</a>
    </aside>
  </div>
</section>

<section class="quick" aria-label="주요 서비스 바로가기">
  <div class="container">
    <div class="quick-grid">
      <a class="quick-item" href="/data/hdd"><img src="/resources/images/intro/data-storage.png" alt="">데이터 복구</a>
      <a class="quick-item" href="/special/business"><img src="/resources/images/intro/remote-access.png" alt="">출장 복구</a>
      <a class="quick-item" href="/forensic/myung"><img src="/resources/images/intro/forensic.png" alt="">디지털 포렌식</a>
      <a class="quick-item" href="/data/cost/common"><img src="/resources/images/intro/premium-icon-coin-6229889.png" alt="">복구 비용</a>
      <a class="quick-item" href="/community/review"><img src="/resources/images/intro/free-icon-data-copy-6733633.png" alt="">복구 후기</a>
      <a class="quick-item" href="/about/contact"><img src="/resources/images/intro/main.png" alt="">지점 안내</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">Why Myung</span>
        <h2 class="section-title">(주)명정보기술을 선택하는<br><em>7가지 이유</em></h2>
        <p class="section-desc">1993년 국내 최초로 데이터 복구 사업을 시작해 대한민국 데이터 복구의 표준을 만들어 왔습니다.</p>
        <a class="btn btn-outline mt-3" href="/about/awards">수상 및 인증 보기</a>
      </div>
      <ol class="reasons reveal" style="grid-template-columns:1fr">
        <li>국내 최초 데이터 복구 사업 시작 및 대한민국 데이터 복구 표준 정립</li>
        <li>국가 재난 책임 대응 (천안함, 세월호, 3.20 전산대란 등)</li>
        <li>누적 복구 처리 수량 650,000건 이상</li>
        <li>기술 수출 (일본, 말레이시아 등 7개국)</li>
        <li>해외 최고 복구 기술 협력 : 러시아, 미국</li>
        <li>고객과의 약속 최우선 서비스</li>
        <li>국내 유일 Class 100 클린룸 &amp; 복구 전용 Clean Desk</li>
      </ol>
    </div>
  </div>
</section>

<section class="section section-navy">
  <div class="container">
    <div class="stats">
      <div class="stat"><span class="stat-num"><span data-count="<%= currentYear() - RECOVERY_START_YEAR %>"><%= currentYear() - RECOVERY_START_YEAR %></span><small>년</small></span><span class="stat-label">데이터 복구 경력</span></div>
      <div class="stat"><span class="stat-num"><span data-count="650000">650,000</span><small>건+</small></span><span class="stat-label">누적 복구 수량</span></div>
      <div class="stat"><span class="stat-num"><span data-count="9">9</span><small>개</small></span><span class="stat-label">전국 지점</span></div>
      <div class="stat"><span class="stat-num"><span data-count="29">29</span><small>개</small></span><span class="stat-label">보유 인증</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head text-center">
      <span class="eyebrow">Data Recovery</span>
      <h2 class="section-title">모든 저장장치의 데이터를 복구합니다</h2>
      <p class="section-desc">장치별 전문 엔지니어와 자체 개발 솔루션으로 최고의 복구율을 제공합니다.</p>
    </div>
    <div class="grid grid-3">
      <a class="service-card reveal" href="/data/hdd"><img src="/resources/images/data/hdd/main_hdd.png" alt="" loading="lazy" style="object-position:80% center"><div class="service-card-body"><h3>HDD 복구</h3><p>데스크톱·노트북·외장하드 물리/논리 장애</p></div></a>
      <a class="service-card reveal" href="/data/ssd"><img src="/resources/images/data/ssd/main_ssd.png" alt="" loading="lazy" style="object-position:80% center"><div class="service-card-body"><h3>SSD 복구</h3><p>컨트롤러·플래시 손상, 암호화 SSD</p></div></a>
      <a class="service-card reveal" href="/data/mobile"><img src="/resources/images/data/mobile/main_mobile.png" alt="" loading="lazy" style="object-position:80% center"><div class="service-card-body"><h3>모바일 복구</h3><p>아이폰·안드로이드 파손/침수/삭제</p></div></a>
      <a class="service-card reveal" href="/data/raid"><img src="/resources/images/data/raid/main_raid.png" alt="" loading="lazy" style="object-position:80% center"><div class="service-card-body"><h3>서버 · RAID 복구</h3><p>RAID, NAS, SAN, 가상화 서버</p></div></a>
      <a class="service-card reveal" href="/data/cctv"><img src="/resources/images/data/cctv/main_cctv.png" alt="" loading="lazy" style="object-position:80% center"><div class="service-card-body"><h3>CCTV · 블랙박스 복구</h3><p>특허 기반 영상 복구 솔루션 보유</p></div></a>
      <a class="service-card reveal" href="/forensic/myung"><img src="/resources/images/forensic/main_df.png" alt="" loading="lazy" style="object-position:80% center"><div class="service-card-body"><h3>디지털 포렌식</h3><p>기술유출·내부 비리·모바일 포렌식</p></div></a>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head text-center">
      <span class="eyebrow">How to Request</span>
      <h2 class="section-title">편리한 <em>복구 접수 방법</em></h2>
      <p class="section-desc">가장 편한 방법으로 접수하세요. 상담은 무료입니다.</p>
    </div>
    <div class="grid grid-4">
      <a class="card channel-card is-hover reveal" href="/about/contact">
        <img src="/resources/images/intro/main_icon_1.png" alt="">
        <h3>방문 접수</h3>
        <p>전국 9개 지점 중 가까운 지점을 방문하시면 상담과 복구 서비스가 가능합니다.</p>
        <span class="card-link">지점 안내</span>
      </a>
      <a class="card channel-card is-hover reveal" href="/data/request">
        <img src="/resources/images/intro/main_icon_2.png" alt="">
        <h3>온라인 접수</h3>
        <p>지점 방문이 어려운 경우 온라인으로 접수하시면 담당자가 연락드립니다.</p>
        <span class="card-link">온라인 접수하기</span>
      </a>
      <a class="card channel-card is-hover reveal" href="tel:<%= CS_TEL %>">
        <img src="/resources/images/intro/main_icon_3.png" alt="">
        <h3>전화 접수</h3>
        <p>전화로 보다 자세한 상담 안내를 받으실 수 있으며 접수도 가능합니다.</p>
        <span class="card-link"><%= CS_TEL %></span>
      </a>
      <a class="card channel-card is-hover reveal" href="<%= KAKAO_URL %>" target="_blank" rel="noopener">
        <img src="/resources/images/intro/main_icon_4.png" alt="">
        <h3>카카오톡 접수</h3>
        <p>카카오톡으로 전문 상담원과 상담하고 접수까지 진행할 수 있습니다.</p>
        <span class="card-link">카카오톡 상담</span>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid-2" style="gap:56px">
      <div>
        <div class="head-row"><h2 class="h3">공지사항</h2><a class="more-link" href="/community/notice">더보기 +</a></div>
        <ul class="board-mini" data-board="homeNotice"><li><a href="/community/notice"><span class="t">공지사항을 불러오는 중입니다...</span></a></li></ul>
      </div>
      <div>
        <div class="head-row"><h2 class="h3">찾아오시는 길</h2><a class="more-link" href="/about/contact">전체 지점 +</a></div>
        <ul class="board-mini">
          <li><a href="/about/contact?branch=1"><span class="t">청주본사 · 충북 청주시 청원구 오창읍 과학산업3로 168</span><span class="d">043-218-8400</span></a></li>
          <li><a href="/about/contact?branch=2"><span class="t">강남지점 · 서울 강남구 테헤란로 83길 32</span><span class="d">02-561-1664</span></a></li>
          <li><a href="/about/contact?branch=3"><span class="t">구로지점 · 서울 구로구 디지털로 273</span><span class="d">02-2109-5830</span></a></li>
          <li><a href="/about/contact?branch=4"><span class="t">용산지점 · 서울 용산구 청파로 74</span><span class="d">02-703-8500</span></a></li>
          <li><a href="/about/contact"><span class="t">수원 · 대전 · 대구 · 부산 · 광주 지점</span><span class="d">바로가기</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="head-row">
      <div><span class="eyebrow">Recovery Review</span><h2 class="section-title mb-0">최근 복구 사례</h2></div>
      <a class="more-link" href="/community/review">전체 보기 +</a>
    </div>
    <div class="grid grid-4" data-board="homeReview"></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
