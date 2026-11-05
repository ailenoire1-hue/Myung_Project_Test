<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "파트너";
    String PAGE_DESC = "(주)명정보기술과 함께하는 국내 및 글로벌 파트너사를 소개합니다.";
    String SECTION = "about";
    String HERO_IMG = "/resources/images/about/main_about.png", HERO_EYEBROW = "Partners";
    String HERO_SUB = "국내외 최고의 파트너와 함께 데이터 복구 기술을 선도합니다.";
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div class="section-head text-center">
      <span class="eyebrow">Global Partners</span>
      <h2 class="section-title">글로벌 파트너사</h2>
      <p class="section-desc">러시아 ACELab(PC-3000), 미국 Ontrack, 인도 Stellar 등 세계 최고 수준의 기업과 협력하고 있습니다.</p>
    </div>
    <figure class="figure figure-plain reveal"><img src="/resources/images/about/pt_g.png" alt="글로벌 파트너사 로고" loading="lazy"></figure>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head text-center">
      <span class="eyebrow">Domestic Partners</span>
      <h2 class="section-title">국내 파트너사</h2>
      <p class="section-desc">정부기관, 공공기관, 기업, 법무법인 등 다양한 고객과 함께하고 있습니다.</p>
    </div>
    <figure class="figure figure-plain reveal" style="max-width:900px;margin:0 auto"><img src="/resources/images/about/pt_k.png" alt="국내 파트너사 로고" loading="lazy"></figure>
  </div>
</section>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
