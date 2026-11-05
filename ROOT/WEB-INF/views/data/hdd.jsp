<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "HDD 복구";
    String PAGE_DESC = "1993년부터 데스크톱, 노트북, 외장하드 등 모든 하드디스크(HDD)의 물리적·논리적 장애 데이터를 복구해 온 (주)명정보기술.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/hdd/main_hdd.png", HERO_EYEBROW = "Myung Data Recovery";
    String HERO_SUB = "(주)명정보기술은 모든 HDD의 데이터를 복구합니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
<%@ include file="/WEB-INF/jspf/device-tabs.jspf" %>
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">HDD Recovery</span>
        <h2 class="section-title">1993년부터 이어온<br><em>하드디스크 복구</em> 노하우</h2>
        <p class="lead">(주)명정보기술은 1993년부터 데스크톱, 노트북, 외장하드 등 소프트웨어나 하드웨어 손상이 생긴 각종 하드디스크의 데이터를 복구해 왔습니다.</p>
        <p>모든 하드 드라이브는 동일한 인증 기술로 처리되고, 엄격한 보안 절차에 따라 장애가 발생한 하드 드라이브에서 데이터를 복구합니다.</p>
      </div>
      <div class="video-box reveal">
        <video controls preload="none" playsinline poster="/resources/images/data/hdd/main_hdd.png">
          <source src="/uploadFiles/video/data/hdd.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Cause &amp; Symptom</span>
      <h2 class="section-title">HDD 고장 원인과 증상</h2>
      <p class="section-desc">모든 기계와 마찬가지로 하드 드라이브도 여러 원인으로 고장이 날 수 있으며, 오류가 발생하면 데이터가 손실될 수 있습니다.</p>
    </div>
    <h3 class="sub-title">고장 원인</h3>
    <div class="grid grid-4">
      <div class="card text-center"><div class="card-icon" style="margin:0 auto 14px"><img src="/resources/images/data/hdd/cause1.png" alt=""></div><h3>사용자 실수</h3><p>떨어뜨림, 충격</p></div>
      <div class="card text-center"><div class="card-icon" style="margin:0 auto 14px"><img src="/resources/images/data/hdd/cause2.png" alt=""></div><h3>재난</h3><p>화재, 침수, 정전</p></div>
      <div class="card text-center"><div class="card-icon" style="margin:0 auto 14px"><img src="/resources/images/data/hdd/cause3.png" alt=""></div><h3>외부 공격</h3><p>바이러스, 랜섬웨어 등 고의적 공격</p></div>
      <div class="card text-center"><div class="card-icon" style="margin:0 auto 14px"><img src="/resources/images/data/hdd/cause4.png" alt=""></div><h3>수명</h3><p>노후로 인한 내부 부품 고장</p></div>
    </div>
    <h3 class="sub-title">고장 증상</h3>
    <ol class="num-list">
      <li>컴퓨터가 자주 멈추거나, 블루스크린이 뜹니다.</li>
      <li>파일이 누락되거나, 파일이 열리지 않습니다.</li>
      <li>폴더 및 파일에 액세스하는 데 과도하게 오랜 시간이 걸립니다.</li>
      <li>틱틱거리는 소리, 갈리는 소리, 윙 소리 등 이상한 소리가 납니다.</li>
      <li>드라이브 상태를 진단했을 때 S.M.A.R.T(자체 모니터링, 분석 및 보고 기술) 상태가 좋지 않습니다.</li>
    </ol>
    <div class="warn-box mt-3"><p><strong>위와 같은 고장 징후가 보이면</strong> 데이터가 사라지기 전에 즉시 사용을 중단하고 전문가의 도움을 받으세요. 전원을 반복해서 켜거나 복구 프로그램을 실행하면 손상이 커질 수 있습니다.</p></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid-2" style="gap:48px">
      <div class="reveal">
        <h3 class="sub-title">복구 가능 운영체제</h3>
        <p>현재 모든 운영 체제에 대한 하드 드라이브 데이터 복구 서비스를 제공합니다. 운영 체제는 복구 프로세스의 논리적(비물리적) 부분에 영향을 줄 수 있으며, 숙련된 소프트웨어 기술을 바탕으로 모든 운영 체제에 대한 복구 경험을 보유하고 있습니다.</p>
        <figure class="figure figure-plain"><img src="/resources/images/data/hdd/os.png" alt="Windows, macOS, Linux, Unix 등 복구 가능 운영체제" loading="lazy"></figure>
      </div>
      <div class="reveal">
        <h3 class="sub-title">복구 가능 모델</h3>
        <p>목록에 없는 하드 드라이브 브랜드도 지원합니다. 당사의 대규모 하드웨어 라이브러리(부품 도너)를 통해 효율적이고 신뢰할 수 있는 결과를 얻을 수 있습니다.</p>
        <figure class="figure figure-plain"><img src="/resources/images/data/hdd/model.png" alt="Seagate, Western Digital, Toshiba, Samsung, HGST 등 복구 가능 제조사" loading="lazy"></figure>
      </div>
    </div>
    <h3 class="sub-title">복구 설비</h3>
    <figure class="figure reveal"><img src="/resources/images/data/hdd/fac.png" alt="클린룸 및 데이터 복구 설비" loading="lazy"><figcaption>Class 100 클린룸과 전문 복구 장비에서 작업합니다.</figcaption></figure>
    <div class="mt-4"><%@ include file="/WEB-INF/jspf/callbox.jspf" %></div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
