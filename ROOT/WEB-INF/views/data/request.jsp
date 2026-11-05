<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "복구 문의";
    String PAGE_DESC = "데이터 복구 온라인 접수. 남겨주신 연락처로 담당자가 빠르게 연락드립니다. 고객센터 1577-1377.";
    String SECTION = "data";
    String HERO_IMG = "/resources/images/data/request/main_request.png", HERO_EYEBROW = "Online Request";
    String HERO_SUB = "문의해 주신 내용은 확인 후 남겨주신 연락처로<br>담당자가 연락드리겠습니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div class="grid" style="grid-template-columns:minmax(0,1fr) 340px;gap:40px;align-items:start" id="requestLayout">
      <div class="form-card">
        <h2 class="h3">복구 문의하기</h2>
        <p class="text-muted"><em class="req">*</em> 표시는 필수 입력 항목입니다.</p>
        <form class="form" data-inquiry="request" data-replace-on-success novalidate>
          <input type="hidden" name="type" value="request">
          <div class="hp-field" aria-hidden="true"><label>웹사이트<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <div class="form-row">
            <label class="field"><span class="field-label">성명 <em class="req">*</em></span>
              <input type="text" name="name" maxlength="30" autocomplete="name" required></label>
            <label class="field"><span class="field-label">연락처 <em class="req">*</em></span>
              <input type="tel" name="phone" maxlength="20" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></label>
          </div>
          <label class="field"><span class="field-label">이메일</span>
            <input type="email" name="email" maxlength="100" autocomplete="email" placeholder="example@email.com"></label>
          <div class="form-row form-row-3">
            <label class="field"><span class="field-label">저장장치 종류</span>
              <select name="device">
                <option value="">선택해 주세요</option>
                <option>HDD (하드디스크)</option><option>외장하드</option><option>SSD</option><option>USB · 메모리카드</option>
                <option>스마트폰 · 태블릿</option><option>서버 · RAID · NAS</option><option>CCTV · DVR</option><option>블랙박스</option><option>기타</option>
              </select></label>
            <label class="field"><span class="field-label">증상 유형</span>
              <select name="symptom">
                <option value="">선택해 주세요</option>
                <option>잘 모르겠습니다</option><option>인식이 안 됩니다</option><option>딸깍 소리가 납니다</option>
                <option>정상 작동합니다 (삭제/포맷)</option><option>침수 · 화재</option><option>랜섬웨어 감염</option><option>기타</option>
              </select></label>
            <label class="field"><span class="field-label">접수 예정 지점</span>
              <select name="branch">
                <option value="">선택해 주세요</option>
                <option>청주본사</option><option>강남지점</option><option>구로지점</option><option>용산지점</option><option>수원지점</option>
                <option>대전지점</option><option>대구지점</option><option>부산지점</option><option>광주지점</option><option>택배 접수</option>
              </select></label>
          </div>
          <fieldset class="fieldset">
            <legend>알게 된 경로 (복수 선택)</legend>
            <div class="check-chips">
<% String[] routes = {"기존 고객", "라벨", "서비스센터 소개", "지인 소개", "검색 광고", "블로그", "지식인", "SNS", "기타"};
   for (String r : routes) { %>
              <label><input type="checkbox" name="route" value="<%= r %>"><span><%= r %></span></label>
<% } %>
            </div>
          </fieldset>
          <label class="field"><span class="field-label">데이터 손실 원인 및 증상</span>
            <textarea name="content" rows="6" maxlength="4000" placeholder="예) 외장하드를 떨어뜨린 후 인식이 안 됩니다. 사진 폴더 복구가 필요합니다."></textarea></label>
<%@ include file="/WEB-INF/jspf/consent.jspf" %>
          <div class="form-msg" role="status" aria-live="polite"></div>
          <button type="submit" class="btn btn-primary btn-lg btn-block">복구 접수하기</button>
        </form>
      </div>

      <aside class="grid" style="gap:16px">
        <div class="card card-soft">
          <h3>전화 상담</h3>
          <p class="mb-0"><a href="tel:<%= CS_TEL %>" class="text-primary" style="font-size:28px;font-weight:800"><%= CS_TEL %></a></p>
          <p class="text-muted mb-0">평일 24시간 · 주말 09:00~17:00</p>
        </div>
        <div class="card card-soft">
          <h3>카카오톡 상담</h3>
          <p class="text-muted">사진을 보내주시면 더 정확한 상담이 가능합니다.</p>
          <a class="btn btn-kakao btn-block" href="<%= KAKAO_URL %>" target="_blank" rel="noopener">카카오톡 상담하기</a>
        </div>
        <div class="card card-soft">
          <h3>접수 전 확인하세요</h3>
          <ul class="dot-list" style="font-size:15px">
            <li>장애가 의심되면 즉시 전원을 끄고 사용을 중단하세요.</li>
            <li>복구 프로그램 실행·포맷·재설치는 피해 주세요.</li>
            <li>침수된 장치는 말리지 말고 비닐봉지에 담아 가져오세요.</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>
<style>@media (max-width:1024px){#requestLayout{grid-template-columns:1fr!important}}</style>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
