<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "출장 복구";
    String PAGE_DESC = "보안상 데이터 반출이 어렵거나 긴급 대응이 필요한 기업·기관을 위한 RAID·서버 현장 출장 데이터 복구 서비스.";
    String SECTION = "special";
    String HERO_IMG = "/resources/images/special/business/main_business.png", HERO_EYEBROW = "Special Recovery";
    String HERO_SUB = "데이터 반출이 어려운 현장으로<br>명정보기술 엔지니어가 직접 찾아갑니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div class="section-head text-center">
      <span class="eyebrow">On-site Recovery</span>
      <h2 class="section-title">출장 복구가 필요한 경우</h2>
    </div>
    <ul class="icards cols-4">
      <li class="icard">보다 높은 차원의<br>보안 유지가 필요한 경우</li>
      <li class="icard">회사 내 데이터 반출이<br>어려운 경우</li>
      <li class="icard">현장에서 긴급하게<br>대응해야 하는 경우</li>
      <li class="icard">현장 설비가 특수하여<br>장비 이동이 불가한 경우</li>
    </ul>

    <h2 class="sub-title">출장 복구 진행 절차</h2>
    <ol class="flow">
      <li><strong>상담</strong><p>장애 증상 및 복구 대상 장치 정보를 확인 후 대표전화 <a class="text-primary" href="tel:<%= CS_TEL %>"><b><%= CS_TEL %></b></a>로 상담해 주세요.</p></li>
      <li><strong>출장 비용 결제</strong><p>안내받은 출장 비용 결제가 완료되면 출장에 필요한 장비를 준비합니다.</p>
        <p class="flow-note"><b>비용 책정 기준</b><br>출장 비용은 위치, 작업 난이도, 복구 기간 등에 따라 책정됩니다.</p></li>
      <li><strong>출장지 방문</strong><p>복구에 필요한 장비를 준비한 후 지정한 장소로 엔지니어가 방문합니다.</p>
        <p class="flow-note"><b>안내</b><br>진단을 위해 당사 장비를 세팅할 수 있는 공간을 미리 확보해 주세요.</p></li>
      <li><strong>진단 및 복구 시작</strong><p>의뢰받은 저장장치에 대해 1:1 이미지 취득 후 분석 및 복구를 진행합니다.</p>
        <p class="flow-note"><b>안내</b><br>물리 장애가 심해 현장 복구가 불가한 경우, 고객 동의하에 반출하여 당사 LAB에서 복구할 수 있습니다.</p></li>
      <li><strong>데이터 확인 및 결제</strong><p>복구된 데이터를 확인하고 결제하시면 지정한 저장매체로 백업해 드립니다.</p>
        <p class="flow-note"><b>기타</b><br>복구가 되지 않은 경우 복구 비용은 청구되지 않습니다.</p></li>
    </ol>

    <div class="warn-box mt-4">
      <p><strong>출장 서비스 신청 전 주의사항</strong></p>
      <ul class="dot-list">
        <li>장비와 작업 난이도에 따라 출장이 아닌 당사에서 직접 작업해야 할 수 있습니다. (RAID 구성 디스크 중 물리 장애가 심한 경우, 타사 복구 시도 후 실패, 데이터 덮어쓰기 등)</li>
        <li>출장 서비스는 출장 비용이 청구됩니다. (디스크 수량, 파일시스템, 장애 증상, 작업 예상 시간에 따라 책정)</li>
      </ul>
    </div>
  </div>
</section>

<section class="section section-soft" id="apply">
  <div class="container container-narrow">
    <div class="form-card">
      <h2 class="h3">출장 복구 접수하기</h2>
      <p class="text-muted">접수 후 담당 엔지니어가 연락드려 일정과 비용을 안내해 드립니다. <em class="req">*</em> 필수 항목</p>
      <form class="form" data-inquiry="business" data-replace-on-success novalidate>
        <input type="hidden" name="type" value="business">
        <div class="hp-field" aria-hidden="true"><label>웹사이트<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="form-row">
          <label class="field"><span class="field-label">성명 (회사명) <em class="req">*</em></span>
            <input type="text" name="name" maxlength="30" autocomplete="name" required></label>
          <label class="field"><span class="field-label">연락처 <em class="req">*</em></span>
            <input type="tel" name="phone" maxlength="20" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></label>
        </div>
        <div class="form-row">
          <label class="field"><span class="field-label">이메일</span>
            <input type="email" name="email" maxlength="100" autocomplete="email"></label>
          <label class="field"><span class="field-label">증상 유형</span>
            <select name="symptom">
              <option value="">선택해 주세요</option>
              <option>잘 모르겠습니다</option><option>인식이 안 됩니다</option><option>딸깍 소리가 납니다</option><option>정상 작동합니다 (삭제/포맷)</option><option>RAID 구성 오류</option><option>기타</option>
            </select></label>
        </div>
        <label class="field"><span class="field-label">장비 및 장애 내용</span>
          <textarea name="content" rows="6" maxlength="4000" placeholder="서버/스토리지 모델, 디스크 수량, RAID 레벨, 장애 증상, 방문 희망 지역 등을 적어주세요."></textarea></label>
<%@ include file="/WEB-INF/jspf/consent.jspf" %>
        <div class="form-msg" role="status" aria-live="polite"></div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">출장 복구 접수하기</button>
      </form>
    </div>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
