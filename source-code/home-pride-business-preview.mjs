import {milestones,panel} from './home-pride.mjs';
import {pridePreviewSwitch} from './pride-preview-switch.mjs';

export function prideBusinessPreviewDocument(home,{version}){
 const records=milestones.map((item,index)=>{
  const original=panel(item,index);
  const split=original.indexOf('<div class="national-panel-copy">');
  const photo=original.slice(original.indexOf('<div class="national-photo-group"'),split);
  const copy=original.slice(split).replace(/<\/article>$/,'');
  return {photo,copy};
 });
 const section=`<section class="national-section pride-business-preview" id="national-experience" data-nav-theme="light" aria-labelledby="pride-business-title" data-pride-business>
  <div class="pride-business-layout">
   <div class="pride-business-left">
    <header class="pride-business-heading"><p>PRIDE OF MYUNG</p><h2 id="pride-business-title">국가가 인정한 기술력,<br>현장에서 증명한 신뢰.</h2><div>재난 현장의 데이터복구부터 국가기관 기술 협력까지.<br>명정보기술이 쌓아온 기술과 경험을 소개합니다.</div></header>
    <div class="pride-business-lower">
     <nav class="pride-business-tabs" aria-label="주요 기술 성과">${milestones.map((item,i)=>`<button type="button" data-business-select="${i}" aria-pressed="${i===0}" aria-controls="business-detail-${i} business-photo-${i}"><span><small>${item.year}</small><span>${item.label}</span></span><i aria-hidden="true"></i></button>`).join('')}</nav>
     <div class="pride-business-details">${records.map(({copy},i)=>`<article id="business-detail-${i}" class="pride-business-detail"${i?' hidden':''}>${copy}</article>`).join('')}</div>
    </div>
   </div>
   <div class="pride-business-visual">${records.map(({photo},i)=>`<div id="business-photo-${i}" class="pride-business-photo${i===0?' is-active':''}" aria-hidden="${i!==0}">${photo}</div>`).join('')}</div>
  </div>
 </section>`;
 const page=home.replace(/<section\b[^>]*\bid="national-experience"[^>]*>[\s\S]*?<\/section>/,section)
  .replace(/<link\b[^>]*href="assets\/home-pride-preview\.css[^>]*>/g,'')
  .replace(/<script\b[^>]*src="assets\/home-pride-preview\.js[^>]*><\/script>/g,'')
  .replace(/<title>[^<]*<\/title>/,'<title>기술력과 신뢰 · 사업분야형 시안 | 명디지털포렌식센터</title>')
  .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/home-pride-business-preview.css?v=${version}"><script src="assets/home-pride-business-preview.js?v=${version}" defer></script></head>`);
 return pridePreviewSwitch(page,'b');
}
