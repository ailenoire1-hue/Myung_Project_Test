import {serviceOpening} from './service-design.mjs';
import {forensicPreviewDocument,forensicPreviewComparison,forensicPreviewOptions} from './forensic-preview.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { homeSections } from './home-sections.mjs';
import { homeChapterNavigation } from './home-service-overview.mjs';
import { homeFooter } from './home-footer.mjs';
import { detailContact } from './detail-contact.mjs';
import { headerNavigation } from './header-navigation.mjs';
import {companyEditorialPage} from './company-design.mjs';
import { companyPage, serviceShell } from './company-page.mjs';
import { introMarkup, introBoot, splashMarkup, variants, comparisonPage, heroMarkup } from './intro.mjs';
import { mainDesigns, mainDesignMarkup, mainDesignTools, mainComparisonPage } from './main-designs.mjs';
import { calmDesigns, calmDesignMarkup, calmDesignTools, calmComparisonPage } from './calm-designs.mjs';
import { historyDesigns, historyIntroMarkup, historyDesignTools, historyComparisonPage } from './history-intro.mjs';
import { contentDirections, contentDirectionMarkup, contentDirectionTools, contentDirectionComparison, contentSampleDialog } from './content-directions.mjs';
import { nationalDesigns, nationalSection, nationalTools, nationalComparison } from './national-cases.mjs';
import {videoHomeDocument} from './video-home.mjs';
import {homeIncidentPreviewDocument} from './home-incident-preview.mjs';
import {applyApprovedIncidentDesign,applyApprovedServiceDesign,serviceEditorialPreviewDocument} from './home-service-editorial.mjs';
import {forensicsFocusPreviewDocument} from './home-forensics-focus.mjs';
import {applyPrideDesign} from './home-pride.mjs';
import {applyPrideSliderDesign,pridePreviewDocument} from './home-pride-preview.mjs';
import {prideBusinessPreviewDocument} from './home-pride-business-preview.mjs';
import {applyInsightsDesign} from './home-insights.mjs';
const insightsContent=JSON.parse(await readFile(new URL('./insights-content.json',import.meta.url),'utf8'));
const insightsVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/home-insights.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const prideVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/home-pride.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
const pridePreviewVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/home-pride-preview.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const serviceEditorialVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/home-service-editorial.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const variedServiceVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/home-service-varied.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
const forensicsFocusVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/home-forensics-focus.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const assetFiles=['layout-refinement.css','report-samples.css','company-hero.css','chapter-layout.css','chapter-navigation.js','detail-contact.css','detail-chapters.css','detail-chapters.js','detail-hero.css','header-navigation.css','style.css','intro.css','intro-boot.js','app.js','splash.js','compare.js','home-sections.css','cohesive.css','m-hero.js','main-designs.css','main-designs.js','calm-main.css','history-intro.css','history-previews.js','content-directions.css','content-directions.js','national-cases.css','national-cases.js','site-refinement.css','detail-pages.css','service-resources.css','service-resources.js','company-profile.css','route-compat.js','home-service-overview.css','home-section-nav.js','incident-page.css','home-footer.css'];
assetFiles.push('video-home.css','video-home.js','detail-redesign.css','company-editorial.css');
const assetVersion=createHash('sha256').update((await Promise.all(assetFiles.map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const versionAssets=html=>html.replace(/(src|href)="(assets\/[^"?]+\.(?:css|js))"/g,(_,attr,file)=>`${attr}="${file}?v=${assetVersion}"`);
const data = JSON.parse(await readFile(new URL('./content.json', import.meta.url), 'utf8'));
const {company:c, services} = data;
const esc = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const lines = s => esc(s).replace(/\n/g,'<br>');
const routes = [{file:'index.html',name:'홈',calmDesign:'1',historyDesign:'1',contentDirection:'guide',selectedContent:true,nationalDesign:'b'}, {file:'company.html',name:'회사 소개'}, ...services.map(s=>({file:s.slug+'.html',name:s.name}))];
const logo = `<a class="brand" href="index.html" aria-label="${c.name} 홈"><span class="brand-mark">M<span>DFC</span><i></i></span><span class="brand-name">${c.name}<small>${c.english}</small></span></a>`;
const header = file => `<a class="skip" href="#main">본문 바로가기</a><div class="topbar"><div class="container"><span>${c.english}</span><span>기업의 데이터, 신뢰할 수 있는 증거로.</span></div></div><header class="header"><div class="container header-inner">${logo}<button class="menu-toggle" aria-label="메뉴 열기" aria-expanded="false" aria-controls="navigation"><span></span><span></span></button><nav id="navigation" aria-label="주 메뉴">${headerNavigation(routes,services,file)}<button class="button nav-contact" data-contact>상담 안내</button></nav></div></header>`;
const footer = `<section class="contact-band"><div class="container"><div><span class="eyebrow">LET’S TALK</span><h2>확인이 필요한 순간,<br>함께 살펴보겠습니다.</h2></div><div class="contact-actions"><a class="contact-phone" href="tel:${c.phone}">${c.phone}</a><p>${c.hours} · 토·일·공휴일 휴무</p><button class="button light" data-contact>상담 안내</button></div></div></section><footer class="footer"><div class="container"><div class="footer-top">${logo}<div class="footer-links"><a href="company.html">회사 소개</a><a href="https://myung.co.kr/" target="_blank" rel="noopener noreferrer">명정보기술</a><a href="https://mdfc-myung.co.kr/default/" target="_blank" rel="noopener noreferrer">기존 홈페이지</a></div></div><p>${c.legalName} <span>대표이사 ${c.ceo}</span> <span>사업자등록번호 ${c.registration}</span></p><p>${c.address} <span>대표번호 ${c.phone}</span> <span>FAX ${c.fax}</span></p><div class="footer-bottom"><span>© ${new Date().getFullYear()} MYUNG Information Technologies. All rights reserved.</span><a href="#main">맨 위로</a></div></div></footer><dialog class="contact-dialog" aria-labelledby="contact-title"><button class="dialog-close" aria-label="상담 안내 닫기">×</button><span class="eyebrow">CONTACT MDFC</span><h2 id="contact-title">전문가와 상담하세요.</h2><p>문의하실 서비스와 현재 상황을 알려주시면<br>상담을 통해 진행 방향을 안내해 드립니다.</p><a class="dialog-phone" href="tel:${c.phone}">${c.phone}</a><dl><div><dt>상담 시간</dt><dd>${c.hours}<small>토·일·공휴일 휴무</small></dd></div><div><dt>본사</dt><dd>${c.address}</dd></div></dl><a class="button" href="tel:${c.phone}">전화 상담</a></dialog>`;
const icon = type => { const paths = {forensics:'<rect x="5" y="3" width="20" height="26" rx="2"/><path d="M10 9h10M10 14h7"/><circle cx="23" cy="23" r="6"/><path d="m27 27 4 4"/>',incident:'<path d="m16 3 12 5v9c0 7-12 13-12 13S4 24 4 17V8Z"/><path d="M16 10v9m0 4v1"/>',storage:'<rect x="3" y="4" width="26" height="10" rx="2"/><rect x="3" y="19" width="26" height="10" rx="2"/><path d="M8 9h1m4 0h1m-6 15h1m4 0h1M21 9h3m-3 15h3"/>'}; return `<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type]}</svg>`; };
const cards = `<div class="service-grid">${services.map((s,i)=>`<article class="service-card"><div class="card-top"><span class="card-number">${s.number}</span>${icon(['forensics','incident','storage'][i])}</div><span class="eyebrow">${s.english}</span><h3><a href="${s.slug}.html">${s.name}</a></h3><p>${s.description}</p><ul>${s.items.map(t=>`<li><a href="${s.slug}.html#${t.id}">${t.name}</a></li>`).join('')}</ul><a class="text-link" href="${s.slug}.html">서비스 자세히 보기 <span aria-hidden="true">+</span></a></article>`).join('')}</div>`;
const home = id => heroMarkup(id) + homeSections({services, company:c, icon, lines});
function process(){return `<ol class="process-grid">${[['상담 및 범위 확인','사건의 상황과 분석 목적을 확인합니다.'],['데이터 수집 및 보존','대상과 환경에 맞게 데이터를 확보합니다.'],['조사 및 분석','관련 흔적을 살펴보고 사실관계를 분석합니다.'],['결과 전달','확인한 내용과 분석 결과를 전달합니다.']].map((t,i)=>`<li><span class="eyebrow">STEP 0${i+1}</span><h3>${t[0]}</h3><p>${t[1]}</p></li>`).join('')}</ol>`;}
const pageHero = (label,title,desc,image) => {
 const service=services.find(s=>s.name===label);
 if(service)return serviceOpening(service,title,desc);
 const navigation=service?service.items.map(t=>[t.id,t.name]):[['information','회사 개요'],['center','센터·전국망'],['capabilities','분석 역량'],['national-response','국가 재난 대응'],['partnerships','파트너십'],['history','주요 연혁']];
 const firstSection=service?(service.slug==='digital-forensics'?'analysis-fields':'overview'):'information';
 const heroImage=service?({'digital-forensics':'company/video2019-precision.png','incident-response':'investigation.jpg','enterprise-security':'calm-1-art.jpg'}[service.slug]||image):'company/hq-building.png';
 return `<section class="page-hero detail-hero detail-hero-full"><div class="detail-hero-visual" aria-hidden="true"><img src="assets/${heroImage}" alt="" fetchpriority="high"></div><div class="container detail-hero-frame"><div class="detail-breadcrumb"><a href="index.html">홈</a><span>/</span><span>${label}</span></div><div class="detail-hero-layout"><div class="detail-hero-copy"><span class="detail-kicker">${service?service.english:'ABOUT MDFC'}</span><p class="detail-page-label">${label}</p><h1>${lines(title)}</h1><p class="detail-hero-description">${desc}</p><button class="detail-button detail-button-accent" data-contact>전문가 상담</button></div><nav class="detail-hero-index" aria-label="${label} 바로가기"><span>${service?'SERVICE AREAS':'ABOUT MYUNG'}</span>${navigation.map((t,i)=>`<a href="#${t[0]}"><small>0${i+1}</small><span>${t[1]}</span></a>`).join('')}</nav></div><div class="detail-hero-bottom"><a href="#${firstSection}" class="detail-scroll-link"><span class="detail-scroll-track" aria-hidden="true"></span><span>${service?'서비스 자세히 보기':'회사 자세히 보기'}</span></a><span class="detail-hero-bottom-label">MYUNG DIGITAL FORENSIC CENTER</span></div></div></section>`;
};
const servicePage = s => serviceShell({service:s,pageHero,services});
const company = companyEditorialPage({company:c});
for (const r of [...routes,...nationalDesigns.map(v=>({file:'national-'+v.id+'.html',name:'국가적 재난 대응 '+v.id.toUpperCase()+'안',calmDesign:'1',historyDesign:'1',contentDirection:'guide',selectedContent:true,nationalDesign:v.id})),...variants.map(v=>({file:'splash-'+v.id+'.html',name:'스플래시 '+v.id.toUpperCase()+'안',variant:v.id})),...mainDesigns.map(v=>({file:'main-'+v.id+'.html',name:'메인 디자인 '+v.id.toUpperCase()+'안',mainDesign:v.id})),...calmDesigns.map(v=>({file:'calm-'+v.id+'.html',name:'C-'+v.id+' 디자인 개선안',calmDesign:v.id})),...historyDesigns.map(v=>({file:'history-'+v.id+'.html',name:'인트로 '+v.id+'안 · '+v.name,calmDesign:'1',historyDesign:v.id})),...contentDirections.map(v=>({file:'content-'+v.id+'.html',name:'메인 하단 · '+v.name,calmDesign:'1',historyDesign:'1',contentDirection:v.id}))]){
 const isHome=r.file==='index.html'||Boolean(r.variant)||Boolean(r.mainDesign)||Boolean(r.calmDesign);
 const direction=r.calmDesign?'calm-'+r.calmDesign:r.mainDesign?'concept-'+r.mainDesign:r.variant||'b';
 const body = r.calmDesign?calmDesignMarkup(r.calmDesign,services,{footerMarkup:r.contentDirection?contentDirectionMarkup(r.contentDirection):undefined})+(r.contentDirection&&!r.selectedContent?contentDirectionTools(r.contentDirection):'')+homeSections({services,company:c,icon,lines,openingMarkup:r.nationalDesign?nationalSection(r.nationalDesign):'',compact:r.file==='index.html'||r.nationalDesign==='b'})+(r.nationalDesign&&r.file!=='index.html'?nationalTools(r.nationalDesign):''):r.mainDesign?mainDesignMarkup(r.mainDesign,services)+homeSections({services,company:c,icon,lines}):isHome?home(direction):r.file==='company.html'?company:servicePage(services.find(s=>s.slug+'.html'===r.file));
 const contentAssets=r.contentDirection?'<link rel="stylesheet" href="assets/content-directions.css"><script src="assets/content-directions.js" defer></script>':'';
 const extraHead=(r.calmDesign?'<link rel="stylesheet" href="assets/main-designs.css"><link rel="stylesheet" href="assets/calm-main.css"><link rel="stylesheet" href="assets/history-intro.css"><script src="assets/main-designs.js" defer></script>':r.mainDesign?'<link rel="stylesheet" href="assets/main-designs.css"><script src="assets/main-designs.js" defer></script>':'')+contentAssets+(r.nationalDesign?'<link rel="stylesheet" href="assets/national-cases.css"><script src="assets/national-cases.js" defer></script>':'');
 const bodyClass=(r.calmDesign?'home-page main-design-page calm-main-page calm-'+r.calmDesign:r.mainDesign?'home-page main-design-page main-design-'+r.mainDesign:isHome?'home-page direction-'+direction:'sub-page'+(r.file==='company.html'?' company-screen-page':' service-redesign service-'+r.file.replace('.html','')))+(r.contentDirection?' content-direction-page content-direction-'+r.contentDirection:'');
 const previewTools=r.selectedContent?'':r.contentDirection?contentSampleDialog():r.file==='index.html'?'':r.historyDesign?historyDesignTools(r.historyDesign):r.calmDesign?calmDesignTools(r.calmDesign):r.mainDesign?mainDesignTools(r.mainDesign):isHome?'<nav class="preview-toolbar" aria-label="스플래시 미리보기"><a href="splash-previews.html">스플래시 3안 비교</a><button data-replay>인트로 다시 재생</button><button data-hold>화면 유지</button></nav>':'';
 const renderedFooter=r.file==='index.html'?homeFooter({company:c,logo,services})+footer.slice(footer.indexOf('<dialog')):!isHome?detailContact(c,{integratedFooter:true})+footer.slice(footer.indexOf('<dialog')):footer.replace('확인이 필요한 순간,<br>함께 살펴보겠습니다.','보안사고 조사와 디지털 증거 분석,<br>전문가와 상담하세요.');
 const html = `<!doctype html><html lang="ko"${r.file==='index.html'?' class="has-home-chapters"':''}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${r.name==='홈'?c.name:r.name+' | '+c.name}</title><meta name="description" content="${esc(isHome?'명디지털포렌식센터의 디지털포렌식, 침해사고 조사, 기업 보안 관리 서비스를 소개합니다.':r.file==='company.html'?'명정보기술의 데이터 기술을 바탕으로 디지털 증거를 수집하고 분석하는 명디지털포렌식센터입니다.':services.find(s=>s.slug+'.html'===r.file).name.replace(/ 서비스$/,'')+' 서비스 안내입니다.')}"><meta name="theme-color" content="#0b182c"><meta property="og:title" content="${r.name} | ${c.name}"><meta property="og:type" content="website"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml">${isHome?introBoot:''}<link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/intro.css">${isHome?'<link rel="stylesheet" href="assets/home-sections.css"><link rel="stylesheet" href="assets/cohesive.css">':''}<link rel="stylesheet" href="assets/site-refinement.css">${!isHome?'<link rel="stylesheet" href="assets/detail-pages.css"><link rel="stylesheet" href="assets/service-resources.css"><link rel="stylesheet" href="assets/company-profile.css"><script src="assets/service-resources.js" defer></script>':''}<script src="assets/route-compat.js" defer></script><script src="assets/app.js" defer></script>${isHome?'<script src="assets/splash.js" defer></script>':''}${isHome&&direction==='b'?'<script type="module" src="assets/m-hero.js"></script>':''}${extraHead}${r.file==='incident-response.html'?'<link rel="stylesheet" href="assets/incident-page.css">':''}${r.file==='index.html'||r.nationalDesign==='b'?'<link rel="stylesheet" href="assets/home-service-overview.css">':''}${r.file==='index.html'?'<link rel="stylesheet" href="assets/home-footer.css"><script src="assets/home-section-nav.js" defer></script>':''}<link rel="stylesheet" href="assets/header-navigation.css"><link rel="stylesheet" href="assets/detail-hero.css"><link rel="stylesheet" href="assets/detail-chapters.css"><script src="assets/detail-chapters.js" defer></script>${!isHome||r.file==='index.html'?'<link rel="stylesheet" href="assets/detail-contact.css">':''}<link rel="stylesheet" href="assets/chapter-layout.css">${r.file==='company.html'?'<link rel="stylesheet" href="assets/company-hero.css">':''}${r.file==='digital-forensics.html'||r.file==='incident-response.html'?'<link rel="stylesheet" href="assets/report-samples.css">':''}<script src="assets/chapter-navigation.js" defer></script><link rel="stylesheet" href="assets/layout-refinement.css">${!isHome?'<link rel="stylesheet" href="assets/detail-redesign.css">':''}${r.file==='company.html'?'<link rel="stylesheet" href="assets/company-editorial.css">':''}</head><body class="${bodyClass}">${isHome?(r.historyDesign?historyIntroMarkup(r.historyDesign,{preview:r.file!=='index.html'}):r.variant?splashMarkup(r.variant,true):introMarkup):''}${header(r.file)}<main id="main">${body}</main>${renderedFooter}${r.file==='index.html'?homeChapterNavigation():''}${previewTools}</body></html>`;
 await mkdir(new URL('./dist/',import.meta.url),{recursive:true});
 if(r.file==='index.html'){
  const preserved=html.replace(`<title>${c.name}</title>`,`<title>인트로 홈페이지 | ${c.name}</title>`);
  await writeFile(new URL('./dist/intro-home.html',import.meta.url),versionAssets(preserved));
  const videoHtml=applyPrideSliderDesign(applyPrideDesign(applyApprovedServiceDesign(applyApprovedIncidentDesign(videoHomeDocument(html,{intro:historyIntroMarkup('1',{preview:false}),boot:introBoot}),{version:serviceEditorialVersion}),{version:variedServiceVersion}),{version:prideVersion}),{version:pridePreviewVersion});
  await writeFile(new URL('./dist/index.html',import.meta.url),versionAssets(applyInsightsDesign(videoHtml,{content:insightsContent,version:insightsVersion})));
 }else await writeFile(new URL('./dist/'+r.file,import.meta.url),versionAssets(html));
}
await writeFile(new URL('./dist/splash-previews.html',import.meta.url),versionAssets(comparisonPage()));
await writeFile(new URL('./dist/main-previews.html',import.meta.url),versionAssets(mainComparisonPage()));
await writeFile(new URL('./dist/calm-previews.html',import.meta.url),versionAssets(calmComparisonPage()));
await writeFile(new URL('./dist/history-previews.html',import.meta.url),versionAssets(historyComparisonPage()));
await writeFile(new URL('./dist/content-previews.html',import.meta.url),versionAssets(contentDirectionComparison()));
await writeFile(new URL('./dist/national-previews.html',import.meta.url),versionAssets(nationalComparison()));
await writeFile(new URL('./dist/incident-layout-preview.html',import.meta.url),'<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=home-incident-preview.html#home-incident-response"><title>메인 챕터 디자인 미리보기</title></head><body><a href="home-incident-preview.html#home-incident-response">새 메인 침해사고 조사 시안 보기</a></body></html>');
const homeIncidentPreviewVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/home-incident-preview.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/home-incident-preview.html',import.meta.url),homeIncidentPreviewDocument(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),{version:homeIncidentPreviewVersion}));
await writeFile(new URL('./dist/solutions-storage.html',import.meta.url),versionAssets('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>기업 보안 관리 서비스 | 명디지털포렌식센터</title><link rel="canonical" href="enterprise-security.html"><script src="assets/route-compat.js" defer></script></head><body><p>서비스 분류가 변경되었습니다.</p><a href="enterprise-security.html">기업 보안 관리 서비스 보기</a></body></html>'));
console.log('Built all site pages, splash variants, main designs, and C refinements.');

await writeFile(new URL('./dist/home-service-preview.html',import.meta.url),serviceEditorialPreviewDocument(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),{version:variedServiceVersion}));
await writeFile(new URL('./dist/home-forensics-preview.html',import.meta.url),forensicsFocusPreviewDocument(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),{version:forensicsFocusVersion}));
await writeFile(new URL('./dist/home-pride-preview.html',import.meta.url),pridePreviewDocument(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),{version:pridePreviewVersion}));
const prideBusinessVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/home-pride-business-preview.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/home-pride-business-preview.html',import.meta.url),prideBusinessPreviewDocument(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),{version:prideBusinessVersion}));

// Preserve the original alternatives for comparison, then apply the selected C design.
const {quickGuideOptions,quickGuidePreviewDocument,quickGuideComparison,applyApprovedQuickGuide}=await import('./quick-guide-previews.mjs');
const quickGuideVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/quick-guide-previews.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
const quickGuideHome=await readFile(new URL('./dist/index.html',import.meta.url),'utf8');
for(const option of quickGuideOptions)await writeFile(new URL(`./dist/quick-guide-${option.id}.html`,import.meta.url),quickGuidePreviewDocument(quickGuideHome,option.id,quickGuideVersion));
await writeFile(new URL('./dist/quick-guide-previews.html',import.meta.url),quickGuideComparison(quickGuideVersion));
const approvedQuickGuideVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/home-quick-guide.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/index.html',import.meta.url),applyApprovedQuickGuide(quickGuideHome,approvedQuickGuideVersion));

// Keep comparison routes, then apply the selected six-card gallery to the home.
const {insightOptions,insightPreviewDocument,insightSixPreviewDocument,insightComparison,applyApprovedInsights}=await import('./insights-previews.mjs');
const insightPreviewVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/insights-previews.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const insightPreviewHome=await readFile(new URL('./dist/index.html',import.meta.url),'utf8');
for(const option of insightOptions)await writeFile(new URL(`./dist/insights-${option.id}.html`,import.meta.url),insightPreviewDocument(insightPreviewHome,option.id,insightsContent,insightPreviewVersion));
await writeFile(new URL('./dist/insights-previews.html',import.meta.url),insightComparison(insightPreviewVersion));
await writeFile(new URL('./dist/insights-c-six.html',import.meta.url),insightSixPreviewDocument(insightPreviewHome,insightsContent,insightPreviewVersion));
await writeFile(new URL('./dist/index.html',import.meta.url),applyApprovedInsights(insightPreviewHome,insightsContent,insightPreviewVersion));

// Keep the alternatives, then apply the approved B menu to the homepage.
const {quickMenuOptions,quickMenuPreview,quickMenuComparison,applyApprovedQuickMenu}=await import('./quick-menu-previews.mjs');
const quickMenuVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/quick-menu-previews.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const quickMenuHome=await readFile(new URL('./dist/index.html',import.meta.url),'utf8');
for(const option of quickMenuOptions)await writeFile(new URL(`./dist/quick-menu-${option.id}.html`,import.meta.url),quickMenuPreview(quickMenuHome,option.id,quickMenuVersion));
await writeFile(new URL('./dist/quick-menu-previews.html',import.meta.url),quickMenuComparison(quickMenuVersion));
await writeFile(new URL('./dist/index.html',import.meta.url),applyApprovedQuickMenu(quickMenuHome,quickMenuVersion));
const forensicPreviewVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/forensic-preview.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const forensicPreviewBase=await readFile(new URL('./dist/digital-forensics.html',import.meta.url),'utf8');
for(const option of forensicPreviewOptions)await writeFile(new URL(`./dist/forensic-${option.id}.html`,import.meta.url),forensicPreviewDocument(forensicPreviewBase,option.id,forensicPreviewVersion));
await writeFile(new URL('./dist/forensic-previews.html',import.meta.url),forensicPreviewComparison(forensicPreviewVersion));

// Graphic-led previews preserve the approved digital-forensics opening.
const {forensicGraphicOptions,forensicGraphicDocument,forensicGraphicComparison}=await import('./forensic-graphics.mjs');
const forensicGraphicVersion=createHash('sha256').update((await Promise.all(['forensic-preview.css','forensic-preview.js','forensic-graphics.css','forensic-graphics.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
for(const option of forensicGraphicOptions)await writeFile(new URL(`./dist/forensic-${option.id}.html`,import.meta.url),forensicGraphicDocument(forensicPreviewBase,option.id,forensicGraphicVersion));
await writeFile(new URL('./dist/forensic-graphic-previews.html',import.meta.url),forensicGraphicComparison(forensicGraphicVersion));

// Isolated content-first insight preview keeps the approved homepage intact.
const {cleanInsightsPreview}=await import('./insights-clean-preview.mjs');
const cleanInsightVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/insights-clean-preview.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/insights-clean-preview.html',import.meta.url),cleanInsightsPreview(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),insightsContent,cleanInsightVersion));

const {insightRefreshOptions,insightRefreshDocument,insightRefreshComparison}=await import('./insights-refresh-previews.mjs');
const insightRefreshVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/insights-refresh-previews.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
const insightRefreshHome=await readFile(new URL('./dist/index.html',import.meta.url),'utf8');
for(const option of insightRefreshOptions)await writeFile(new URL(`./dist/insights-refresh-${option.id}.html`,import.meta.url),insightRefreshDocument(insightRefreshHome,option.id,insightsContent,{cleanVersion:cleanInsightVersion,version:insightRefreshVersion}));
await writeFile(new URL('./dist/insights-refresh-previews.html',import.meta.url),insightRefreshComparison(insightRefreshVersion));

const {insightCVariants,insightCVariantDocument,insightCVariantComparison,applyApprovedInsightC1}=await import('./insights-c-variants.mjs');
const insightCVariantVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/insights-c-variants.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
for(const option of insightCVariants)await writeFile(new URL(`./dist/insights-c${option.id}.html`,import.meta.url),insightCVariantDocument(insightRefreshHome,option.id,insightsContent,insightCVariantVersion));
await writeFile(new URL('./dist/insights-c-variants.html',import.meta.url),insightCVariantComparison(insightCVariantVersion));

// Apply the selected C1 layout after retaining all insight comparison routes.
await writeFile(new URL('./dist/index.html',import.meta.url),applyApprovedInsightC1(insightRefreshHome,insightsContent,insightCVariantVersion));

// New content-rich service previews retain the approved hero and live detail page.
const {forensicRenewalOptions,forensicRenewalDocument}=await import('./forensic-renewal.mjs');
const {forensicRenewalComparison}=await import('./forensic-renewal-comparison.mjs');
const forensicRenewalVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/forensic-renewal.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
for(const option of forensicRenewalOptions)await writeFile(new URL(`./dist/forensic-renewal-${option.id}.html`,import.meta.url),forensicRenewalDocument(forensicPreviewBase,option.id,forensicRenewalVersion));
await writeFile(new URL('./dist/forensic-renewal-previews.html',import.meta.url),forensicRenewalComparison(forensicRenewalVersion));

// Purpose-first alternatives use continuous native page scrolling.
const {forensicPurposeOptions,forensicPurposeDocument}=await import('./forensic-purpose.mjs');
const {forensicPurposeComparison}=await import('./forensic-purpose-comparison.mjs');
const forensicPurposeVersion=createHash('sha256').update((await Promise.all(['css','js'].map(ext=>readFile(new URL(`./dist/assets/forensic-purpose.${ext}`,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
for(const option of forensicPurposeOptions)await writeFile(new URL(`./dist/forensic-purpose-${option.id}.html`,import.meta.url),forensicPurposeDocument(forensicPreviewBase,option.id,forensicPurposeVersion,c));
await writeFile(new URL('./dist/forensic-purpose-previews.html',import.meta.url),forensicPurposeComparison(forensicPurposeVersion));

// A-style visual refinements keep all approved pages and prior comparisons intact.
const {forensicARefinementOptions,forensicARefinementDocument,forensicARefinementComparison}=await import('./forensic-a-refinement.mjs');
const forensicARefinementVersion=createHash('sha256').update((await Promise.all(['forensic-a-refinement.css','forensic-technical-log.css','forensic-technical-map.css','forensic-technical-workspace.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
for(const option of forensicARefinementOptions)await writeFile(new URL(`./dist/forensic-a${option.id}.html`,import.meta.url),forensicARefinementDocument(forensicPreviewBase,option.id,{baseVersion:forensicPurposeVersion,version:forensicARefinementVersion},c));
await writeFile(new URL('./dist/forensic-a-refinement-previews.html',import.meta.url),forensicARefinementComparison(forensicARefinementVersion));

// The selected A1 preview uses the user's proposal illustrations and cases.
const {applyLawProposalA1}=await import('./forensic-proposal-page.mjs');
const forensicProposalVersion=createHash('sha256').update((await Promise.all(['forensic-proposal-page.css','forensic-proposal-storage.css','forensic-proposal-mobile.css','forensic-proposal-audio.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/forensic-a1.html',import.meta.url),applyLawProposalA1(await readFile(new URL('./dist/forensic-a1.html',import.meta.url),'utf8'),forensicProposalVersion));

// Three reading-layout previews reuse the approved A1 proposal content.
const {readingGroups,readingFragments,readingShell,readingSequential}=await import('./forensic-reading-content.mjs');
const {readingSeparatePages}=await import('./forensic-reading-a2.mjs');
const {readingTabbedGuide}=await import('./forensic-reading-a3.mjs');
const {readingComparison}=await import('./forensic-reading-comparison.mjs');
const forensicReadingVersion=createHash('sha256').update((await Promise.all(['forensic-reading.css','forensic-reading-a1.css','forensic-reading-a1-spacing.css','forensic-reading-a1.js','forensic-reading-a2.css','forensic-reading-a3.css','forensic-reading-a3.js','forensic-reading-comparison.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const forensicReadingBase=await readFile(new URL('./dist/forensic-a1.html',import.meta.url),'utf8');
const forensicReadingContext={shell:readingShell(forensicReadingBase,forensicReadingVersion),groups:readingGroups(),...readingFragments(forensicReadingBase),version:forensicReadingVersion};
for(const result of [readingSequential(forensicReadingContext),...readingSeparatePages(forensicReadingContext),readingTabbedGuide(forensicReadingContext)])await writeFile(new URL('./dist/'+result.path,import.meta.url),result.html);
await writeFile(new URL('./dist/forensic-chapter-previews.html',import.meta.url),readingComparison(forensicReadingVersion));

// Apply the selected A1 design after retaining the earlier preview routes.
const {approvedForensicDocument}=await import('./forensic-approved.mjs');
const forensicApprovedVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/forensic-approved-route.js',import.meta.url),'utf8')).digest('hex').slice(0,12);
const forensicSharedContactVersion=createHash('sha256').update((await Promise.all(['detail-contact.css','layout-refinement.css','forensic-shared-contact.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const forensicServiceLayoutVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/forensic-service-layout.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/digital-forensics.html',import.meta.url),approvedForensicDocument(readingSequential(forensicReadingContext).html,header('digital-forensics.html'),forensicApprovedVersion,c,forensicSharedContactVersion,forensicServiceLayoutVersion));

// Review a bounded overview revision without changing the selected service page.
const {forensicLayoutPreview}=await import('./forensic-layout-preview.mjs');
const forensicLayoutVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/forensic-layout-preview.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/digital-forensics-layout-preview.html',import.meta.url),forensicLayoutPreview(await readFile(new URL('./dist/digital-forensics.html',import.meta.url),'utf8'),forensicLayoutVersion));

// Extend the selected reading structure to the other two service detail routes.
const {serviceChapterDocument}=await import('./service-chapter-shell.mjs');
const {incidentChapterContent}=await import('./service-chapter-incident.mjs');
const {enterpriseChapterContent}=await import('./service-chapter-enterprise.mjs');
const serviceChapterVersion=createHash('sha256').update((await Promise.all(['service-chapters.css','service-chapter-incident.css','service-chapter-enterprise.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const serviceChapterBase=await readFile(new URL('./dist/digital-forensics.html',import.meta.url),'utf8');
for(const [slug,content] of [['incident-response',incidentChapterContent()],['enterprise-security',enterpriseChapterContent()]]){
 const service=services.find(item=>item.slug===slug);
 await writeFile(new URL('./dist/'+slug+'.html',import.meta.url),serviceChapterDocument({base:serviceChapterBase,sharedHeader:header(slug+'.html'),service,company:c,content,version:serviceChapterVersion}));
}

// Incident investigation design alternatives stay on dedicated preview routes.
const {incidentInvestigationPreview,incidentInvestigationComparison}=await import('./incident-investigation-previews.mjs');
const {incidentPreviewA}=await import('./incident-investigation-a.mjs');
const {incidentPreviewB}=await import('./incident-investigation-b.mjs');
const {incidentPreviewC}=await import('./incident-investigation-c.mjs');
const incidentInvestigationVersion=createHash('sha256').update((await Promise.all(['incident-investigation-previews.css','incident-investigation-previews.js','incident-investigation-a.css','incident-investigation-b.css','incident-investigation-c.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const incidentInvestigationBase=await readFile(new URL('./dist/incident-response.html',import.meta.url),'utf8');
for(const [variant,create] of [['a',incidentPreviewA],['b',incidentPreviewB],['c',incidentPreviewC]])await writeFile(new URL(`./dist/incident-investigation-${variant}.html`,import.meta.url),incidentInvestigationPreview({base:incidentInvestigationBase,variant,content:create(),version:incidentInvestigationVersion}));
await writeFile(new URL('./dist/incident-investigation-previews.html',import.meta.url),incidentInvestigationComparison(incidentInvestigationVersion));

// Benefit-led incident service alternatives: retain the prior investigation previews.
const {incidentServiceDocument,incidentServiceComparison}=await import('./incident-service-previews.mjs');
const {incidentServiceA}=await import('./incident-service-a.mjs');
const {incidentServiceB}=await import('./incident-service-b.mjs');
const {incidentServiceC}=await import('./incident-service-c.mjs');
const incidentServiceVersion=createHash('sha256').update((await Promise.all(['incident-service-previews.css','incident-service-previews.js','incident-service-a.css','incident-service-b.css','incident-service-c.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
for(const [variant,create] of [['a',incidentServiceA],['b',incidentServiceB],['c',incidentServiceC]])await writeFile(new URL(`./dist/incident-service-${variant}.html`,import.meta.url),incidentServiceDocument({base:incidentInvestigationBase,variant,content:create(),version:incidentServiceVersion}));
await writeFile(new URL('./dist/incident-service-previews.html',import.meta.url),incidentServiceComparison(incidentServiceVersion));

// Publish the chosen service journey at the existing incident investigation URL.
const {approvedIncidentService}=await import('./incident-service-approved.mjs');
const incidentApprovedVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/incident-service-approved.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/incident-response.html',import.meta.url),approvedIncidentService(await readFile(new URL('./dist/incident-service-a.html',import.meta.url),'utf8'),incidentApprovedVersion));

// Reference-B service flows, adapted as an isolated preview of the MDFC design.
const {incidentFlowPreview}=await import('./incident-flow-preview.mjs');
const incidentFlowVersion=createHash('sha256').update((await Promise.all(['incident-flow-preview.css','incident-flow-preview.js','incident-flow-content.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/incident-flow-preview.html',import.meta.url),incidentFlowPreview(await readFile(new URL('./dist/incident-response.html',import.meta.url),'utf8'),incidentFlowVersion));

// Compare three brand-aligned entry points and prominent initial-response guides.
const {incidentEntryDocument,incidentEntryComparison}=await import('./incident-entry-previews.mjs');
const {incidentEntryA}=await import('./incident-entry-a.mjs');
const {incidentEntryB}=await import('./incident-entry-b.mjs');
const {incidentEntryC}=await import('./incident-entry-c.mjs');
const incidentEntryVersion=createHash('sha256').update((await Promise.all(['incident-entry-previews.css','incident-entry-previews.js','incident-entry-a.css','incident-entry-b.css','incident-entry-c.css'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const incidentEntryBase=await readFile(new URL('./dist/incident-flow-preview.html',import.meta.url),'utf8');
for(const [variant,create] of [['a',incidentEntryA],['b',incidentEntryB],['c',incidentEntryC]])await writeFile(new URL(`./dist/incident-entry-${variant}.html`,import.meta.url),incidentEntryDocument({base:incidentEntryBase,variant,content:create(),version:incidentEntryVersion}));
await writeFile(new URL('./dist/incident-entry-previews.html',import.meta.url),incidentEntryComparison(incidentEntryVersion));

// Three focused refinements of the selected navy entry style, for review only.
const {incidentAFamilyDocument,incidentAFamilyComparison}=await import('./incident-a-family.mjs');
const {incidentEntryA1}=await import('./incident-entry-a1.mjs');
const {incidentEntryA2}=await import('./incident-entry-a2.mjs');
const {incidentEntryA3}=await import('./incident-entry-a3.mjs');
const incidentAFamilyVersion=createHash('sha256').update((await Promise.all(['incident-entry-a1.css','incident-entry-a2.css','incident-entry-a3.css','incident-entry-fit.css','incident-a-family.css','incident-a-family.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
for(const [variant,create] of [['a1',incidentEntryA1],['a2',incidentEntryA2],['a3',incidentEntryA3]])await writeFile(new URL(`./dist/incident-entry-${variant}.html`,import.meta.url),incidentAFamilyDocument({base:incidentEntryBase,variant,content:create(),version:incidentAFamilyVersion}));
await writeFile(new URL('./dist/incident-a-previews.html',import.meta.url),incidentAFamilyComparison(incidentAFamilyVersion));

// Final A2 preview places the initial-response guide first, with the A3 accent.
const {incidentA2Final}=await import('./incident-a2-final.mjs');
const incidentA2FinalVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/incident-a2-final.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/incident-a2-final.html',import.meta.url),incidentA2Final(await readFile(new URL('./dist/incident-entry-a2.html',import.meta.url),'utf8'),incidentA2FinalVersion));

// Publish the approved final A2 at the existing service address.
const {approvedIncidentA2}=await import('./incident-a2-approved.mjs');
const approvedIncidentA2Version=createHash('sha256').update(await readFile(new URL('./dist/assets/incident-a2-approved.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/incident-response.html',import.meta.url),approvedIncidentA2(await readFile(new URL('./dist/incident-a2-final.html',import.meta.url),'utf8'),approvedIncidentA2Version));

// Enterprise reference-A preview: retain the supplied service content and illustrated layout.
const {enterprisePlanPreview}=await import('./enterprise-plan-preview.mjs');
const enterprisePlanVersion=createHash('sha256').update((await Promise.all(['enterprise-plan-base.css','enterprise-plan-cards.css','enterprise-plan-preview.css','enterprise-plan-preview.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/enterprise-plan-preview.html',import.meta.url),enterprisePlanPreview(await readFile(new URL('./dist/enterprise-security.html',import.meta.url),'utf8'),await readFile(new URL('./enterprise-plan-reference.html',import.meta.url),'utf8'),enterprisePlanVersion));

// Brand-aligned enterprise chapter previews; keep the selected service pages unchanged.
const {enterpriseChapterPreview,enterpriseChapterComparison}=await import('./enterprise-chapter-previews.mjs');
const {enterpriseA}=await import('./enterprise-chapter-a.mjs');
const {enterpriseB}=await import('./enterprise-chapter-b.mjs');
const {enterpriseC}=await import('./enterprise-chapter-c.mjs');
const enterpriseChapterVersion=createHash('sha256').update((await Promise.all(['enterprise-chapter-common.css','enterprise-chapter-a.css','enterprise-chapter-b.css','enterprise-chapter-c.css','enterprise-chapter.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const enterpriseChapterBase=await readFile(new URL('./dist/enterprise-security.html',import.meta.url),'utf8');
for(const [variant,render] of [['a',enterpriseA],['b',enterpriseB],['c',enterpriseC]])await writeFile(new URL(`./dist/enterprise-chapter-${variant}.html`,import.meta.url),enterpriseChapterPreview({base:enterpriseChapterBase,variant,render,version:enterpriseChapterVersion}));
await writeFile(new URL('./dist/enterprise-chapter-previews.html',import.meta.url),enterpriseChapterComparison(enterpriseChapterVersion));

// Preserve the supplied enterprise illustrations and layouts; compare visual finishes only.
const {enterpriseStylePreview,enterpriseStyleComparison}=await import('./enterprise-style-previews.mjs');
const enterpriseStyleVersion=createHash('sha256').update((await Promise.all(['enterprise-style.css','enterprise-style-finishes.css','enterprise-style.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
const enterpriseStyleReference=await readFile(new URL('./enterprise-plan-reference.html',import.meta.url),'utf8');
for(const variant of ['a','b','c'])await writeFile(new URL(`./dist/enterprise-style-${variant}.html`,import.meta.url),enterpriseStylePreview({base:enterpriseChapterBase,reference:enterpriseStyleReference,variant,version:enterpriseStyleVersion}));
await writeFile(new URL('./dist/enterprise-style-previews.html',import.meta.url),enterpriseStyleComparison(enterpriseStyleVersion));

// Publish the selected C composition and align the service entry with the other detail pages.
const {approvedEnterpriseC}=await import('./enterprise-style-approved.mjs');
const enterpriseApprovedVersion=createHash('sha256').update(await readFile(new URL('./dist/assets/enterprise-style-approved.css',import.meta.url),'utf8')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/enterprise-security.html',import.meta.url),approvedEnterpriseC(await readFile(new URL('./dist/enterprise-style-c.html',import.meta.url),'utf8'),enterpriseApprovedVersion));

const {companyTopbarDocument}=await import('./company-topbar.mjs');
const companyTopbarVersion=createHash('sha256').update((await Promise.all(['company-topbar.css','company-topbar.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/company.html',import.meta.url),companyTopbarDocument(await readFile(new URL('./dist/company.html',import.meta.url),'utf8'),companyTopbarVersion));

const {homeScrollCueDocument}=await import('./home-scroll-cue.mjs');
const homeScrollCueVersion=createHash('sha256').update((await Promise.all(['home-scroll-cue.css','home-scroll-cue.js'].map(file=>readFile(new URL('./dist/assets/'+file,import.meta.url),'utf8')))).join('')).digest('hex').slice(0,12);
await writeFile(new URL('./dist/index.html',import.meta.url),homeScrollCueDocument(await readFile(new URL('./dist/index.html',import.meta.url),'utf8'),homeScrollCueVersion));

// Retain the user's selected situation-led MDFC STORY chapter on future builds.
const {writeApprovedStoryHome}=await import('./home-insights-story-approved.mjs');
await writeApprovedStoryHome();

await (await import('./integrated-site.mjs')).writeIntegratedSite();
