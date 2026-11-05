const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>';
const youtube='<svg viewBox="0 0 24 18" aria-hidden="true"><rect width="24" height="18" rx="5" fill="currentColor"/><path d="m10 5 7 4-7 4Z" fill="#fff"/></svg>';

export function applyInsightsDesign(home,{content,version}){
 const [featured,...more]=content.videos;
 const videoButton=(video,small=false)=>`<button class="insights-video${small?' insights-video-small':' insights-video-featured'}" type="button" data-insight-video="${esc(video.id)}" data-video-title="${esc(video.title)}" aria-label="${esc(video.title)} 영상 재생"><span class="insights-video-image"><img src="${esc(video.image)}" alt="" loading="lazy"><span class="insights-play">${play}</span><span class="insights-duration">${esc(video.duration)}</span></span><span class="insights-video-caption"><strong>${esc(video.title)}</strong>${small?'':`<time datetime="${video.date.replaceAll('.','-')}">${esc(video.date)}</time>`}</span></button>`;
 const section=`<section class="service-chapter home-insights" id="home-insights" data-nav-theme="light" aria-labelledby="insights-title"><div class="container insights-frame">
 <header class="insights-heading"><div><p class="insights-kicker">MDFC INSIGHTS</p><h2 id="insights-title">기술 이야기와 <em>현장 소식</em></h2></div><p>데이터를 지키는 지식,<br>명정보기술의 경험을 나눕니다.</p></header>
 <div class="insights-columns"><div class="insights-blog"><div class="insights-channel-heading"><h3><span class="insights-channel-icon insights-naver" aria-hidden="true">N</span>BLOG</h3><a href="${esc(content.blogUrl)}" target="_blank" rel="noopener noreferrer" aria-label="명정보기술 블로그 전체보기, 새 창">전체보기</a></div>
 <div class="insights-posts">${content.posts.map((post,i)=>`<a class="insights-post" href="${esc(post.url)}" target="_blank" rel="noopener noreferrer"><span class="insights-post-image"><img src="${esc(post.image)}" alt="" loading="lazy"></span><span class="insights-post-copy"><span class="insights-post-category">${['보안 인사이트','데이터복구 가이드','저장매체 이야기'][i]}</span><h4>${esc(post.title)}</h4><time datetime="${post.date.replaceAll('.','-')}">${esc(post.date)}</time></span><span class="footer-sr-only"> (블로그 원문, 새 창)</span></a>`).join('')}</div>
 <p class="insights-blog-note">일상 속 데이터 문제부터 기업의 보안 고민까지.</p></div>
 <div class="insights-youtube"><div class="insights-channel-heading"><h3><span class="insights-channel-icon insights-youtube-icon">${youtube}</span>YOUTUBE</h3><a href="${esc(content.youtubeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="명정보기술 유튜브 채널보기, 새 창">채널보기</a></div>${videoButton(featured)}<div class="insights-more-videos">${more.map(video=>videoButton(video,true)).join('')}</div></div></div></div></section>`;
 const dialog=`<dialog class="insights-player-dialog" aria-labelledby="insights-player-title"><div class="insights-player-top"><h2 id="insights-player-title">명정보기술 영상</h2><button type="button" data-insights-close aria-label="영상 닫기">×</button></div><div class="insights-player-frame"></div><a class="insights-watch-link" target="_blank" rel="noopener noreferrer">유튜브에서 보기</a></dialog>`;
 const contact=home.match(/<section class="contact-band detail-contact[^"]*" id="home-contact"/)?.[0];
 const nav='<li><a href="#home-contact"';
 if(!contact||!home.includes(nav))throw new Error('Homepage insight insertion target missing');
 return home.replace(contact,section+contact)
  .replace(nav,'<li><a href="#home-insights"><span class="home-section-label">인사이트</span><span class="home-section-dot" aria-hidden="true"></span></a></li>'+nav)
  .replace('</head>',`<link rel="stylesheet" href="assets/home-insights.css?v=${version}"><script src="assets/home-insights.js?v=${version}" defer></script></head>`)
  .replace('</body>',dialog+'</body>');
}
