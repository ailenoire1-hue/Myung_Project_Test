import {htmlElement} from './forensic-reading-content.mjs';
import {detailContact} from './detail-contact.mjs';

// Publish the approved A1 chapter design at the canonical service route.
export function approvedForensicDocument(preview,sharedHeader,version,company,contactVersion,layoutVersion){
 const oldHeader=htmlElement(preview,'<header class="header"');
 const header=htmlElement(sharedHeader,'<header class="header"');
 let html=preview.replace(oldHeader,`<a class="skip" href="#main">본문 바로가기</a>${header}`);
 const oldContact=htmlElement(html,/<section\b[^>]*id="contact"/);
 const sharedContact=detailContact(company,{id:'contact',integratedFooter:true})
  .replaceAll('contact-title','forensic-contact-title')
  .replace('class="contact-band detail-contact','data-fr-screen class="fr-screen fr-shared-contact contact-band detail-contact')
  .replace('href="#main">맨 위로','href="#service-main">맨 위로');
 html=html.replace(oldContact,sharedContact);
 html=html.replace(/<nav class="fr-preview-switch"[\s\S]*?<\/nav>/,'')
  .replace(/<meta name="robots"[^>]*>/g,'')
  .replace(/<title>[\s\S]*?<\/title>/,'<title>디지털포렌식 서비스 | 명디지털포렌식센터</title>')
  .replace(/<meta name="description"[^>]*>/,'<meta name="description" content="노트북·데스크탑·서버의 자료 유출 조사, 스마트폰 민·형사 증거 확보, 음성·영상 위변조 분석. 명디지털포렌식센터의 분석 서비스와 사례를 확인하세요.">')
  .replace(/<script src="assets\/route-compat\.js(?:\?[^\"]*)?" defer><\/script>/,`<script src="assets/forensic-approved-route.js?v=${version}" defer></script>`)
  .replace('</head>',`<meta property="og:title" content="디지털포렌식 서비스 | 명디지털포렌식센터"><meta property="og:type" content="website"><meta property="og:description" content="자료 유출 조사부터 스마트폰 증거 확보, 음성·영상 위변조 분석까지."><link rel="stylesheet" href="assets/detail-contact.css?v=${contactVersion}"><link rel="stylesheet" href="assets/layout-refinement.css?v=${contactVersion}"><link rel="stylesheet" href="assets/forensic-shared-contact.css?v=${contactVersion}"></head>`);
 if(html.includes('fr-preview-switch')||html.includes('forensic-chapter-a1.html'))throw Error('Preview controls or routes remain on the approved service page.');
 return html.replace('</head>',`<link rel="stylesheet" href="assets/forensic-service-layout.css?v=${layoutVersion}"></head>`);
}
