import {homeChapterNavigation} from './home-service-overview.mjs';

const videoEntryBoot=`<script>(()=>{
 const root=document.documentElement;
 root.classList.add('video-entry-pending');
 window.mdfcVideoEntryFallback=setTimeout(()=>root.classList.remove('video-entry-pending'),10000);
 const startsAtVideo=!location.hash||location.hash==='#home-video';
 const skip=new URLSearchParams(location.search).get('skip')==='1';
 const returning=performance.getEntriesByType('navigation')[0]?.type==='back_forward';
 if(startsAtVideo&&!skip&&!returning){
  window.mdfcVideoScrollDeadline=performance.now()+4000;
  root.classList.add('video-scroll-locked');
  window.mdfcVideoScrollFallback=setTimeout(()=>root.classList.remove('video-scroll-locked'),4000);
 }
})();</script>`;

export const videoHomeMarkup = `<section class="video-hero" id="home-video" data-home-chapter data-nav-theme="dark" aria-labelledby="video-welcome-title">
 <div class="video-hero-media"><video class="video-hero-film" autoplay muted loop playsinline preload="auto" poster="assets/video/mdfc-lab-first-modern-poster.jpg" aria-label="분석실과 작업환경으로 시작해 복구 실적을 초반에 안내하고 정밀 작업과 본사 전경으로 이어지는 51초 명정보기술 홍보영상"><source src="assets/video/mdfc-lab-first-modern-captions-5s.mp4" type="video/mp4"></video></div>
 <div class="video-hero-shade" aria-hidden="true"></div>
 <div class="container video-welcome-copy"><h2 id="video-welcome-title"><span class="video-title-context">1990년부터 쌓아온 경험과 국내 최대 분석 인프라로,</span><span class="video-title-main">디지털 증거의 가치를 찾습니다.</span></h2><p class="video-welcome-specialty">디지털포렌식 및 침해사고 전문 기업</p><p class="video-welcome-brand">명정보기술 디지털포렌식센터</p></div>
 <div class="container video-hero-bottom"><a class="video-explore" href="#main"><span class="video-scroll-symbol" aria-hidden="true"><i></i></span><span><small>SCROLL TO EXPLORE</small>홈페이지 살펴보기</span></a></div>
</section>`;

// Keep the approved intro document intact and derive the new video entrance.
export function videoHomeDocument(html,{intro,boot}){
 return html.replace(boot,'').replace(intro,'')
  .replace('<script src="assets/splash.js" defer></script>','')
  .replace('</head>',videoEntryBoot+'<link rel="stylesheet" href="assets/video-home.css"><script src="assets/video-home.js" defer></script></head>')
  .replace(/<body class="([^"]*)">/,'<body class="$1 video-home-page">')
  .replace('<main id="main">',videoHomeMarkup+'<main id="main">')
  .replace('class="home-footer-top" href="#main"','class="home-footer-top" href="#home-video"')
  .replace(homeChapterNavigation(),homeChapterNavigation().replace('<ol id="home-section-links">','<ol id="home-section-links"><li><a href="#home-video" aria-current="location"><span class="home-section-label">MDFC 영상</span><span class="home-section-dot" aria-hidden="true"></span></a></li>').replace('<a href="#main" aria-current="location">','<a href="#main">'));
}
