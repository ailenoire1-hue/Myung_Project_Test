import {cleanInsightsPreview} from './insights-clean-preview.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>';
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const icon=t=>t==='blog'?'<span class="ix-naver" aria-hidden="true">N</span>':`<span class="ix-youtube" aria-hidden="true">${play}</span>`;
const date=x=>`<time datetime="${x.date.replaceAll('.','-')}">${esc(x.date)}</time>`;
const topics={blog:['모바일 보안','저장매체 복구','SSD·데이터복구'],video:['스마트폰 포렌식','디지털 증거','컨퍼런스 강의']};
export const insightRefreshOptions=[
 {id:'a',name:'채널별 목록형',description:'블로그와 유튜브를 두 열로 나누고, 썸네일 옆에서 전체 제목을 읽습니다.',point:'제목과 내용 탐색에 집중'},
 {id:'b',name:'콘텐츠 매거진형',description:'넓은 화면에 여섯 카드를 펼쳐, 이미지와 제목을 한눈에 살펴봅니다.',point:'썸네일과 콘텐츠를 균형 있게'},
 {id:'c',name:'대표 영상 편집형',description:'대표 영상을 크게 보여주고, 블로그 글과 추가 영상을 채널별로 나눠 살펴봅니다.',point:'블로그와 유튜브를 분리한 구성'}
];
const href=id=>`insights-refresh-${id}.html?skip=1#home-insights`;
const switcher=id=>`<nav class="ix-switch" aria-label="인사이트 개선안 선택"><span>인사이트 시안</span>${insightRefreshOptions.map(o=>`<a href="${href(o.id)}" ${id===o.id?'aria-current="page"':''}>${o.id.toUpperCase()}안</a>`).join('')}<a href="insights-refresh-previews.html">3안 비교 ↗</a></nav>`;
const thumb=(x,t)=>`<span class="ix-thumb ix-thumb-${t}"><img src="${esc(x.image)}" alt="" loading="lazy">${t==='video'?`<span class="ix-play">${play}</span><span class="ix-duration">${esc(x.duration)}</span>`:''}</span>`;
const wrapper=(x,t,cls,body)=>t==='blog'?`<a class="${cls}" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(x.title)} (블로그 원문, 새 창)">${body}</a>`:`<button type="button" class="${cls}" data-insight-video="${esc(x.id)}" data-video-title="${esc(x.title)}" aria-label="${esc(x.title)} 영상 재생">${body}</button>`;
const channelLinks=c=>`<nav class="ix-channel-links" aria-label="공식 콘텐츠 채널"><a href="${esc(c.blogUrl)}" target="_blank" rel="noopener noreferrer">${icon('blog')}블로그 <span aria-hidden="true">↗</span></a><a href="${esc(c.youtubeUrl)}" target="_blank" rel="noopener noreferrer">${icon('video')}유튜브 <span aria-hidden="true">↗</span></a></nav>`;
const heading=c=>`<header class="ix-heading"><div><p class="ix-eyebrow">MDFC INSIGHTS</p><h2 id="insights-title">기술 이야기와 현장 소식</h2></div>${channelLinks(c)}</header>`;
function magazineCard(x,t,i){return wrapper(x,t,'ix-magazine-card',`${thumb(x,t)}<span class="ix-card-copy"><span class="ix-card-label">${icon(t)}${t==='blog'?'BLOG':'YOUTUBE'}<span>${topics[t][i]}</span></span><strong>${esc(x.title)}</strong><span class="ix-card-meta">${date(x)}<span>${t==='blog'?'글 읽기':'영상 보기'} ${t==='blog'?arrow:play}</span></span></span>`);}
function row(x,t,i){return wrapper(x,t,'ix-editorial-row',`${thumb(x,t)}<span class="ix-row-copy"><span class="ix-row-label">${icon(t)}${topics[t][i]}</span><strong>${esc(x.title)}</strong>${date(x)}</span><span class="ix-row-arrow">${t==='blog'?arrow:play}</span>`);}
const displayVideoTitle=x=>esc(x.title.replace(/^\[[^\]]+\]\s*/,''));
const groupHeading=(id,type,title,url,link)=>`<header class="ix-c-channel-heading"><h3 id="${id}">${icon(type)}${title}</h3><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${link}<span aria-hidden="true">↗</span></a></header>`;
function blogRow(x){return wrapper(x,'blog','ix-c-blog-row',`${thumb(x,'blog')}<span class="ix-c-blog-copy"><strong>${esc(x.title)}</strong><span>${date(x)}<span class="ix-c-read">글 읽기 ${arrow}</span></span></span>`);}
function extraVideo(x){return wrapper(x,'video','ix-c-extra-video',`${thumb(x,'video')}<span class="ix-c-video-copy"><strong>${displayVideoTitle(x)}</strong><span>영상 보기 ${play}</span></span>`);}
function chapter(id,c){
 let content='';
 if(id==='b')content=`${heading(c)}<div class="ix-magazine-grid">${c.posts.map((x,i)=>magazineCard(x,'blog',i)).join('')}${c.videos.map((x,i)=>magazineCard(x,'video',i)).join('')}</div>`;
 else {const x=c.videos[0];content=`<header class="ix-heading"><div><p class="ix-eyebrow">MDFC INSIGHTS</p><h2 id="insights-title">기술 이야기와 현장 소식</h2></div><p>블로그로 읽고, 영상으로 살펴보는<br>데이터·보안 이야기.</p></header><div class="ix-editorial-layout">${wrapper(x,'video','ix-feature',`<span class="ix-feature-label">${icon('video')}<span>유튜브 <b>대표 영상</b></span></span>${thumb(x,'video')}<span class="ix-feature-copy"><strong>${displayVideoTitle(x)}</strong><span class="ix-feature-meta">${date(x)}<span>영상 재생 ${play}</span></span></span>`)}<div class="ix-c-side"><section class="ix-c-reading" aria-labelledby="ix-c-blog-title">${groupHeading('ix-c-blog-title','blog','블로그',c.blogUrl,'전체 글 보기')}<div class="ix-c-blog-list">${c.posts.map(blogRow).join('')}</div></section><section class="ix-c-watching" aria-labelledby="ix-c-video-title">${groupHeading('ix-c-video-title','video','유튜브 더 보기',c.youtubeUrl,'채널 보기')}<div class="ix-c-extra-videos">${c.videos.slice(1).map(extraVideo).join('')}</div></section></div></div>`;}
 return `<section class="service-chapter ix-chapter ix-${id}" id="home-insights" data-nav-theme="light" aria-labelledby="insights-title"><div class="container ix-frame">${content}</div></section>`;
}
export function insightRefreshDocument(home,id,c,{cleanVersion,version}){
 const o=insightRefreshOptions.find(x=>x.id===id);
 let doc=id==='a'?cleanInsightsPreview(home,c,cleanVersion).replace(/<nav class="ic-preview-tools"[\s\S]*?<\/nav>/,''):home.replace(/<section class="service-chapter ip-chapter ip-c ip-six"[\s\S]*?<\/section>/,chapter(id,c));
 doc=doc.replace(/<title>.*?<\/title>/,`<title>${id.toUpperCase()}안 · ${o.name} | MDFC 인사이트 미리보기</title>`).replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/insights-refresh-previews.css?v=${version}"></head>`).replace('</body>',switcher(id)+'</body>');
 return doc;
}
export function insightRefreshComparison(version){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>인사이트 개선안 3가지 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/insights-refresh-previews.css?v=${version}"></head><body class="ix-comparison-page"><main class="ix-comparison"><header><a class="ix-brand" href="index.html?skip=1#home-insights">MDFC <span>DESIGN PREVIEW</span></a><p class="ix-eyebrow">INSIGHTS / THREE STYLES</p><h1>콘텐츠가 잘 보이는,<br>세 가지 인사이트 디자인.</h1><p>블로그 3개와 유튜브 3개를 서로 다른 배치로 비교해 보세요.</p></header><div class="ix-comparison-grid">${insightRefreshOptions.map(o=>`<article><a class="ix-preview-image" href="${href(o.id)}"><img src="assets/insights/refresh-${o.id}-${o.id==='c'?'118':'117'}.png" alt="${o.name} 실제 화면 미리보기" width="1280" height="720"></a><div class="ix-option-copy"><span>${o.id.toUpperCase()}</span><p>${o.point}</p><h2>${o.name}</h2><p>${o.description}</p><a href="${href(o.id)}">전체 화면 보기 ${arrow}</a></div></article>`).join('')}</div><footer><span>디자인 미리보기</span><a href="index.html?skip=1#home-insights">현재 디자인 보기 ↗</a></footer></main></body></html>`;}
