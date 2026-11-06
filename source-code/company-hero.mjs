import {companyFacts as facts} from './company-facts.mjs';
export function companyHero(){return `<section class="page-hero detail-hero company-hero" data-nav-theme="dark" aria-labelledby="company-hero-title">
 <div class="company-hero-art" aria-hidden="true"><img src="assets/company/hq-building.png" alt="" fetchpriority="high"></div>
 <div class="container company-hero-frame">
  <div class="detail-breadcrumb"><a href="index.html">홈</a><span>/</span><span>회사 소개</span></div>
  <div class="company-hero-copy">
   <div class="company-hero-origin"><span>SINCE ${facts.foundingYear}</span><p>국내 최초 데이터복구 서비스 도입</p></div>
   <h1 id="company-hero-title"><span>${facts.experienceYears}년간 쌓아온 경험으로,</span><span>디지털 증거에 <em>신뢰</em>를 더합니다.</span></h1>
   <p class="company-hero-description">데이터복구에서 디지털포렌식, 보안사고 조사·대응까지.<br>현장에서 축적한 기술과 경험으로 기업의 디지털 안전을 지킵니다.</p>
  </div>
  <dl class="company-hero-metrics" aria-label="명정보기술의 경험과 전국망">
   <div><dt>데이터 기술의 업력</dt><dd><strong>${facts.experienceYears}</strong><span>년</span></dd><dd class="company-metric-note">${facts.foundingYear}년 설립 · ${facts.asOfYear}년 기준</dd></div>
   <div><dt>${facts.caseLabel}</dt><dd><strong>${facts.caseCount/10000}</strong><span>만 건</span><i aria-label="이상">+</i></dd><dd class="company-metric-note">사고조사·복구 서비스 합산</dd></div>
   <div><dt>전국 직영 접수망</dt><dd><strong>${facts.networkCount}</strong><span>개</span></dd><dd class="company-metric-note">청주 본사와 ${facts.networkCount-1}개 지점</dd></div>
  </dl>
  <div class="company-hero-bottom"><a href="#information" class="detail-scroll-link"><span class="detail-scroll-track" aria-hidden="true"></span><span>명정보기술 더 알아보기</span></a><span>MYUNG INFORMATION TECHNOLOGIES</span></div>
 </div>
</section>`;}
