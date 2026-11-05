const esc=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>';
const channelIcon=type=>type==='blog'?'<span class="ip-naver" aria-hidden="true">N</span>':'<span class="ip-youtube" aria-hidden="true">'+play+'</span>';
const date=item=>`<time datetime="${esc(item.date.replaceAll('.','-'))}">${esc(item.date)}</time>`;
const categories=['보안 인사이트','데이터복구 가이드','저장매체 이야기'];
export const insightOptions=[
 {id:'a',name:'채널별 매거진',tag:'한눈에 보는 블로그와 영상',description:'블로그 3개와 영상 3개를 두 줄로 펼쳐, 한 화면에서 관심 있는 콘텐츠를 바로 고릅니다.',theme:'light'},
 {id:'b',name:'영상 중심 쇼케이스',tag:'영상에 시선이 머무는 구성',description:'큰 대표 영상과 밝은 블로그 패널을 대비시켜, 기술 영상과 읽을거리를 분명하게 구분합니다.',theme:'dark'},
 {id:'c',name:'채널 선택형 갤러리',tag:'필요한 콘텐츠만 가볍게 탐색',description:'큰 타이틀 옆에 콘텐츠 카드를 배치하고, 전체·블로그·유튜브를 선택하며 살펴봅니다.',theme:'light'}
];
const thumb=(item,type)=>`<span class="ip-thumb ip-thumb-${type}"><img src="${esc(item.image)}" alt="" loading="lazy">${type==='video'?`<span class="ip-play">${play}</span><span class="ip-duration">${esc(item.duration)}</span>`:''}</span>`;
const post=(item,i,extra='')=>`<a class="ip-post ${extra}" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.title)} (블로그 원문, 새 창)">${thumb(item,'blog')}<span class="ip-item-copy"><span class="ip-category">${categories[i]}</span><strong>${esc(item.title)}</strong><span class="ip-item-bottom">${date(item)}<span aria-hidden="true">↗</span></span></span></a>`;
const video=(item,extra='')=>`<button class="ip-video ${extra}" type="button" data-insight-video="${esc(item.id)}" data-video-title="${esc(item.title)}" aria-label="${esc(item.title)} 영상 재생">${thumb(item,'video')}<span class="ip-item-copy"><strong>${esc(item.title)}</strong>${date(item)}</span></button>`;
const channelHead=(type,url)=>`<header class="ip-channel-head"><h3>${channelIcon(type)}${type==='blog'?'블로그':'디지털포렌식 영상'}</h3><a href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${type==='blog'?'명정보기술 블로그':'명정보기술 유튜브 채널'} 전체보기, 새 창">${type==='blog'?'블로그 전체보기':'유튜브 채널보기'} <span aria-hidden="true">↗</span></a></header>`;
const title=(id)=>`<header class="ip-heading"><div><p class="ip-kicker">MDFC INSIGHTS</p><h2 id="insights-title">기술을 읽고,<br class="ip-title-break"> 현장을 만나다.</h2></div><p>데이터를 지키는 지식과 경험,<br>블로그와 영상으로 전합니다.</p></header>`;
function galleryCard(item,type,index){
 const label=type==='blog'?'BLOG':'YOUTUBE';
 const content=`${thumb(item,type)}<span class="ip-card-body"><span class="ip-card-meta">${channelIcon(type)}${label}<span>${type==='blog'?categories[index]:'디지털포렌식'}</span></span><strong>${esc(item.title)}</strong><span class="ip-card-bottom">${date(item)}<span class="ip-card-arrow">${type==='blog'?arrow:play}</span></span></span>`;
 return type==='blog'?`<a class="ip-gallery-card" data-ip-channel="blog" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.title)} (블로그 원문, 새 창)">${content}</a>`:`<button class="ip-gallery-card" data-ip-channel="video" data-insight-video="${esc(item.id)}" data-video-title="${esc(item.title)}" type="button" aria-label="${esc(item.title)} 영상 재생">${content}</button>`;
}
export function insightChapter(id,content){
 let body='';
 if(id==='a')body=`${title(id)}<div class="ip-shelves"><div class="ip-blog-shelf">${channelHead('blog',content.blogUrl)}<div class="ip-three-posts">${content.posts.map((p,i)=>post(p,i)).join('')}</div></div><div class="ip-video-shelf">${channelHead('video',content.youtubeUrl)}<div class="ip-three-videos">${content.videos.map(v=>video(v)).join('')}</div></div></div>`;
 if(id==='b')body=`${title(id)}<div class="ip-feature-layout"><div class="ip-feature-video">${channelHead('video',content.youtubeUrl)}${video(content.videos[0],'ip-featured')}<div class="ip-secondary-videos">${content.videos.slice(1).map(v=>video(v,'ip-small-video')).join('')}</div></div><div class="ip-blog-panel"><p class="ip-panel-kicker">READ THE INSIGHT</p>${channelHead('blog',content.blogUrl)}<p class="ip-panel-description">현장의 경험을 담은 <br>데이터·보안 이야기</p><div class="ip-panel-posts">${content.posts.map((p,i)=>post(p,i)).join('')}</div></div></div>`;
 if(id==='c')body=`<div class="ip-gallery-layout"><div class="ip-gallery-intro">${title(id)}<div class="ip-channel-buttons"><a href="${esc(content.blogUrl)}" target="_blank" rel="noopener noreferrer">${channelIcon('blog')}블로그 바로가기 <span aria-hidden="true">↗</span></a><a href="${esc(content.youtubeUrl)}" target="_blank" rel="noopener noreferrer">${channelIcon('video')}유튜브 바로가기 <span aria-hidden="true">↗</span></a></div></div><div class="ip-gallery-browser" data-ip-browser><nav class="ip-filters" aria-label="인사이트 채널 선택"><button type="button" data-ip-filter="all" aria-pressed="true">전체 <small>06</small></button><button type="button" data-ip-filter="blog" aria-pressed="false">블로그 <small>03</small></button><button type="button" data-ip-filter="video" aria-pressed="false">유튜브 <small>03</small></button></nav><div class="ip-gallery-cards">${content.posts.map((p,i)=>galleryCard(p,'blog',i)+galleryCard(content.videos[i],'video',i)).join('')}</div><div class="ip-gallery-bottom"><p>지금 필요한 이야기를 찾아보세요.</p><div class="ip-paging"><button type="button" data-ip-prev aria-label="이전 콘텐츠">←</button><span data-ip-count role="status" aria-live="polite">01 / 02</span><button type="button" data-ip-next aria-label="다음 콘텐츠">→</button></div></div></div></div>`;
 const option=insightOptions.find(o=>o.id===id);
 return `<section class="service-chapter ip-chapter ip-${id}" id="home-insights" data-nav-theme="${option.theme}" aria-labelledby="insights-title"><div class="container ip-frame">${body}</div></section>`;
}
const previewHref=id=>`insights-${id}.html?skip=1#home-insights`;
export function insightPreviewDocument(home,id,content,version){
 const source=/<section class="service-chapter home-insights"[\s\S]*?<\/section>/;
 if(!source.test(home))throw new Error('Existing insight chapter missing');
 const option=insightOptions.find(o=>o.id===id);
 const toolbar=`<nav class="ip-preview-tools" aria-label="인사이트 디자인 시안 선택"><span>인사이트 시안</span>${insightOptions.map(v=>`<a href="${previewHref(v.id)}" ${v.id===id?'aria-current="page"':''}>${v.id.toUpperCase()}안</a>`).join('')}<a href="insights-previews.html">3안 비교 ↗</a></nav>`;
 return home.replace(source,insightChapter(id,content)).replace(/<title>.*?<\/title>/,`<title>${id.toUpperCase()}안 · ${option.name} | MDFC 인사이트 미리보기</title>`)
  .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/insights-previews.css?v=${version}"><script src="assets/insights-previews.js?v=${version}" defer></script></head>`)
  .replace('</body>',toolbar+'</body>');
}
function insightSixChapter(content){
 const cards=content.posts.map((item,i)=>galleryCard(item,'blog',i)).join('')+content.videos.map((item,i)=>galleryCard(item,'video',i)).join('');
 return insightChapter('c',content)
  .replace('ip-chapter ip-c"','ip-chapter ip-c ip-six"')
  .replace('data-ip-browser>','data-ip-browser data-ip-page-size="6">')
  .replace(/<div class="ip-gallery-cards">[\s\S]*?<\/div><div class="ip-gallery-bottom">/,`<div class="ip-gallery-cards">${cards}</div><div class="ip-gallery-bottom">`);
}
export function applyApprovedInsights(home,content,version){
 const source=/<section class="service-chapter home-insights"[\s\S]*?<\/section>/;
 if(!source.test(home))throw new Error('Existing insight chapter missing');
 return home.replace(source,insightSixChapter(content))
  .replace('</head>',`<link rel="stylesheet" href="assets/insights-previews.css?v=${version}"><script src="assets/insights-previews.js?v=${version}" defer></script></head>`);
}
export function insightSixPreviewDocument(home,content,version){
 const toolbar='<nav class="ip-preview-tools" aria-label="인사이트 디자인 시안 선택"><span>C안 · 콘텐츠 6개</span><a href="insights-c.html?skip=1#home-insights">기존 3개 보기</a><a href="insights-previews.html">3안 비교 ↗</a></nav>';
 return insightPreviewDocument(home,'c',content,version)
  .replace(/<section class="service-chapter ip-chapter ip-c"[\s\S]*?<\/section>/,insightSixChapter(content))
  .replace(/<nav class="ip-preview-tools"[\s\S]*?<\/nav>/,toolbar)
  .replace('<title>C안 ·','<title>C안 · 6개 모아보기 ·');
}
export function insightComparison(version){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>인사이트 디자인 3안 | MDFC</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/insights-previews.css?v=${version}"></head><body class="ip-comparison-page"><main class="ip-comparison"><header class="ip-comparison-heading"><a href="index.html#home-insights" class="ip-comparison-brand">MDFC <span>DESIGN PREVIEW</span></a><p class="ip-kicker">INSIGHTS · THREE DIRECTIONS</p><h1>같은 콘텐츠,<br>세 가지 새로운 경험.</h1><p>블로그와 포렌식 영상에 시선이 머무는 인사이트 디자인을 비교해 보세요.</p><span class="ip-unchanged">디자인 미리보기 · 현재 메인 유지</span></header><div class="ip-options">${insightOptions.map(v=>`<article class="ip-option"><a class="ip-option-image" href="${previewHref(v.id)}" aria-label="${v.id.toUpperCase()}안 ${v.name} 전체 화면 보기"><img src="assets/insights/preview-${v.id}-104.png" alt="${v.name} 메인 화면 배치" width="1440" height="900"></a><div class="ip-option-content"><span class="ip-option-letter">${v.id.toUpperCase()}</span><p class="ip-option-tag">${v.tag}</p><h2>${v.name}</h2><p>${v.description}</p><a class="ip-option-open" href="${previewHref(v.id)}">전체 화면 보기 ${arrow}</a></div></article>`).join('')}</div><footer class="ip-comparison-footer"><span>실제 블로그 글 3개 · 디지털포렌식 영상 3개</span><a href="index.html#home-insights">현재 인사이트 보기 ↗</a></footer></main></body></html>`;}
