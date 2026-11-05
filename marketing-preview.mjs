// Separate marketing proposals. Existing approved routes are read only.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {renderChannelHome} from './marketing-channel-home.mjs';
import {renderSituationHome} from './marketing-situation-home.mjs';
import {renderMagazineHome} from './marketing-magazine-home.mjs';
const read=path=>readFile(new URL(path,import.meta.url),'utf8');
const write=(path,text)=>writeFile(new URL(path,import.meta.url),text,'utf8');
const canonical=['index.html','company.html','digital-forensics.html','incident-response.html','enterprise-security.html'];
const before=await Promise.all(canonical.map(async path=>[path,createHash('sha256').update(await read('dist/'+path)).digest('hex')]));
const version='20261020-channel-outlines';
const brand=`<span class="mp-brand-mark">MDFC</span><span class="mp-brand-name">명디지털포렌식센터<small>MYUNG DIGITAL FORENSIC CENTER</small></span>`;
const header=`<a class="mp-skip" href="#main">본문 바로가기</a><header class="mp-header"><div class="mp-wrap mp-header-inner"><a class="mp-brand" href="home-marketing-preview.html?skip=1#main" aria-label="명디지털포렌식센터 메인 미리보기">${brand}</a><button class="mp-menu-toggle" type="button" aria-expanded="false" aria-controls="mp-navigation">메뉴</button><nav class="mp-nav" id="mp-navigation" aria-label="주 메뉴"><a href="company.html">회사 소개</a><a href="digital-forensics.html">디지털포렌식 서비스</a><a href="incident-response.html">침해사고 조사</a><a href="enterprise-security.html">기업 보안 관리</a><a href="insights-preview.html">인사이트</a><button class="mp-btn mp-btn-dark" type="button" data-open-quote>견적·의뢰 가이드 <span aria-hidden="true">↗</span></button></nav></div></header>`;
const footer=`<footer class="mp-footer"><div class="mp-wrap"><div class="mp-footer-upper"><a class="mp-brand" href="home-marketing-preview.html?skip=1#main">${brand}</a><div class="mp-footer-links"><a href="insights-preview.html">인사이트</a><a href="newsletter-preview.html">월간 뉴스레터</a><button class="mp-btn mp-btn-orange" type="button" data-open-quote>견적·의뢰 가이드 ↗</button></div></div><div class="mp-footer-meta"><p>(주)명정보기술 · 대표이사 이명재<br>본사 충북 청주시 청원구 오창읍 과학산업3로 168 · 대표번호 <a href="tel:1577-4872">1577-4872</a><br>평일 09:00–18:00 · 토·일·공휴일 휴무</p><p>© 2026 MYUNG Information Technologies.<br>기획 미리보기 · 실제 상담 접수와 뉴스레터 가입은 이루어지지 않습니다.</p></div></div></footer>`;
const switcher=`<nav class="mp-preview-switch" aria-label="마케팅 기획 미리보기"><span>디자인 미리보기</span><a href="home-marketing-preview.html?skip=1#main">홈 배치·견적</a><a href="insights-preview.html">인사이트</a><a href="insight-article-preview.html">원문 페이지</a><a href="newsletter-preview.html">뉴스레터</a></nav>`;
function block(html,key,body){
 const start=`<!--MP_${key}_START-->`,end=`<!--MP_${key}_END-->`;
 const value=start+body+end;
 if(html.includes(`<!--${key==='HEADER'?'MARKETING_HEADER':key==='FOOTER'?'MARKETING_FOOTER':'QUOTE_MODAL'}-->`))return html.replace(`<!--${key==='HEADER'?'MARKETING_HEADER':key==='FOOTER'?'MARKETING_FOOTER':'QUOTE_MODAL'}-->`,value);
 return html.replace(new RegExp(`${start}[\\s\\S]*?${end}`),value);
}
const quote=await read('marketing-quote-snippet.html');
const channelPlayer=await read('marketing-channel-player.html');
const channelAssets=`<link rel="stylesheet" href="assets/marketing-channels.css?v=${version}"><script src="assets/marketing-channels.js?v=${version}" defer></script>`;
const quoteStyles=`<link rel="stylesheet" href="assets/marketing-quote.css?v=${version}">`;
const quoteScript=`<script src="assets/marketing-quote.js?v=${version}" defer></script>`;
for(const page of ['insights-preview.html','insight-article-preview.html','newsletter-preview.html']){
 let html=await read('dist/'+page);
 if(page==='insights-preview.html'&&html.includes('data-approved-story-hub'))continue;
 html=block(html,'HEADER',header);html=block(html,'FOOTER',footer);html=block(html,'QUOTE',quote);
 if(!html.includes('assets/marketing-quote.css'))html=html.replace('</head>',quoteStyles+quoteScript+'</head>');
 if(!html.includes('assets/marketing-channels.css'))html=html.replace('</head>',channelAssets+'</head>');
 const playerBlock='<!--MP_CHANNELS_START-->'+channelPlayer+'<!--MP_CHANNELS_END-->';
 if(html.includes('<!--MP_CHANNELS_START-->'))html=html.replace(/<!--MP_CHANNELS_START-->[\s\S]*?<!--MP_CHANNELS_END-->/,playerBlock);
 else html=html.replace('</body>',playerBlock+'</body>');
 html=html.replace(/(assets\/marketing-(?:insights|preview|channels|quote)\.(?:css|js))(?:\?v=[^"']*)?/g,'$1?v='+version);
 if(!html.includes('class="mp-preview-switch"'))html=html.replace('</body>',switcher+'</body>');
 await write('dist/'+page,html);
}
let home=await read('dist/index.html');
// Keep the earlier comparison pages independent of the approved home chapter.
home=home.replace(/<!--APPROVED_STORY_(ASSETS|PLAYER|NAV)_START-->[\s\S]*?<!--APPROVED_STORY_\1_END-->/g,'');
home=home.replace(/<title>[^<]*<\/title>/,'<title>견적·인사이트 확장 미리보기 | MDFC</title>');
home=home.replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/marketing-preview.css?v=${version}"><link rel="stylesheet" href="assets/marketing-insights.css?v=${version}">${channelAssets}${quoteStyles}<script defer src="assets/marketing-preview.js?v=${version}"></script><script defer src="assets/marketing-insights.js?v=${version}"></script>${quoteScript}</head>`);
home=home.replace('<body class="','<body class="mp-home-preview ');
home=home.replace(/<button class="button nav-contact" data-contact>상담 안내<\/button>/,'<a class="mp-nav-insights" href="insights-preview.html">인사이트</a><button class="button nav-contact" data-open-quote>견적·의뢰 가이드</button>');
home=home.replace('<button data-contact>','<button data-open-quote>');
home=home.replace('<span>전문가 상담</span></button><a href="#services">','<span>견적·의뢰 가이드</span></button><a href="#services">');
home=home.replace(/<button class="consult-info" type="button" data-contact>상담 안내<\/button>/g,'<button class="consult-info" type="button" data-open-quote>상담 요청 미리보기</button>');
const homeInsights=renderChannelHome(JSON.parse(await read('insights-content.json')));
await write('marketing-insights-home-snippet.html',homeInsights);
const start=home.lastIndexOf('<section',home.indexOf('id="home-insights"'));
const end=home.indexOf('<section class="contact-band',start);
if(start<0||end<start)throw new Error('Home insight section not found');
home=home.slice(0,start)+homeInsights+home.slice(end);
home=home.replace('</body>',quote+channelPlayer+switcher+'</body>');
await write('dist/home-marketing-preview.html',home);
const situationSection=renderSituationHome(JSON.parse(await read('insights-content.json')));
let situationHome=home.replace(homeInsights,situationSection);
situationHome=situationHome.replace(/<title>[^<]*<\/title>/,'<title>상황별 인사이트 미리보기 | MDFC</title>');
situationHome=situationHome.replace('</head>','<link rel="stylesheet" href="assets/marketing-situation.css?v=20261020-situation-centered"><script defer src="assets/marketing-situation.js?v=20261020-situation-centered"></script></head>');
await write('dist/home-insights-situation-preview.html',situationHome);
let magazineHome=home.replace(homeInsights,renderMagazineHome(JSON.parse(await read('insights-content.json'))));
magazineHome=magazineHome.replace(/<title>[^<]*<\/title>/,'<title>매거진형 인사이트 미리보기 | MDFC</title>');
magazineHome=magazineHome.replace('</head>','<link rel="stylesheet" href="assets/marketing-magazine.css?v=20261020-magazine"><script defer src="assets/marketing-magazine.js?v=20261020-magazine"></script></head>');
await write('dist/home-insights-magazine-preview.html',magazineHome);
for(const [path,hash] of before){if(createHash('sha256').update(await read('dist/'+path)).digest('hex')!==hash)throw new Error('Canonical changed: '+path);}
console.log('Created 3 home previews and integrated 3 content previews. All 5 canonical pages unchanged.');
