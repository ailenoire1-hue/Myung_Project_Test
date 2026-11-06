import {htmlElement} from './forensic-reading-content.mjs';

export function enterprisePlanPreview(base,reference,version){
 const header=htmlElement(base,'<header class="header"');
 const dialog=htmlElement(base,'<dialog class="contact-dialog"');
 const contact=htmlElement(base,/<section\b[^>]*id="contact"/)
  .replace(/<span class="sc-anchor-alias"[^>]*><\/span>/g,'')
  .replace('href="#service-main">맨 위로','href="#top">맨 위로')
  .replace('data-fr-screen ','');
 const styles=['style.css','header-navigation.css','forensic-purpose.css','forensic-reading.css','forensic-reading-a1.css','enterprise-plan-base.css','enterprise-plan-cards.css','detail-contact.css','layout-refinement.css','forensic-shared-contact.css','enterprise-plan-preview.css'];
 const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>기업 보안 관리 서비스 · 디자인 미리보기 | 명디지털포렌식센터</title><meta name="description" content="원격 보안 점검, 퇴사자 관리, 보안 솔루션·스토리지·인프라 구축을 소개하는 기업 보안 관리 서비스 미리보기입니다."><meta name="robots" content="noindex,nofollow"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml">${styles.map(file=>`<link rel="stylesheet" href="assets/${file}?v=${version}">`).join('')}<script src="assets/app.js" defer></script><script src="assets/forensic-purpose.js?v=${version}" defer></script><script src="assets/enterprise-plan-preview.js?v=${version}" defer></script>`;
 return `<!doctype html><html lang="ko"><head>${head}</head><body class="dp-page fr-page fr-a1 ip-page es-page"><a class="skip" href="#main">본문 바로가기</a>${header}<main class="es-main" id="main"><div class="ip-main es-content">${reference}</div>${contact}</main>${dialog}<a class="es-preview-label" href="enterprise-security.html"><span>DESIGN PREVIEW</span>현재 페이지와 비교 <b aria-hidden="true">↗</b></a></body></html>`;
}
