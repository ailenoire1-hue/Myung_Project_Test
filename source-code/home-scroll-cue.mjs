/** Adds a next-chapter cue without changing the existing homepage scroll engine. */
export function homeScrollCueDocument(html,version){
 if(!html.includes('video-home-page')||!html.includes('data-home-section-nav')||html.includes('data-home-scroll-cue'))return html;
 const cue=`<a class="home-scroll-cue" data-home-scroll-cue href="#national-experience" aria-label="다음 내용: 국가 재난 대응" hidden><span class="home-scroll-cue-mouse" aria-hidden="true"><i></i></span><span class="home-scroll-cue-label" aria-hidden="true">SCROLL</span><svg class="home-scroll-cue-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v15m-5-5 5 5 5-5"/></svg></a>`;
 return html.replace('</head>',`<link rel="stylesheet" href="assets/home-scroll-cue.css?v=${version}"><script src="assets/home-scroll-cue.js?v=${version}" defer></script></head>`)
  .replace('</body>',`${cue}</body>`);
}
