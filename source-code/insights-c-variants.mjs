const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>';
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const icon=t=>t==='blog'?'<span class="iv-naver" aria-hidden="true">N</span>':`<span class="iv-youtube" aria-hidden="true">${play}</span>`;
const date=x=>`<time datetime="${x.date.replaceAll('.','-')}">${esc(x.date)}</time>`;
const title=x=>esc(x.title.replace(/^\[[^\]]+\]\s*/,''));
export const insightCVariants=[
 {id:'1',name:'채널별 편집형',point:'유튜브와 블로그를 좌우로 분리',description:'왼쪽에는 대표 영상과 추가 영상, 오른쪽에는 블로그 글을 모아 채널별로 탐색합니다.'},
 {id:'2',name:'가로 매거진형',point:'영상 위, 읽을거리 아래',description:'상단 영상 쇼케이스와 하단 블로그 카드로 나눠, 가로 흐름으로 콘텐츠를 살펴봅니다.'},
 {id:'3',name:'중앙 포커스형',point:'대표 영상이 중심이 되는 구성',description:'중앙의 큰 대표 영상과 양쪽의 블로그·추가 영상으로 잡지처럼 편집합니다.'}
];
const href=id=>`insights-c${id}.html?skip=1#home-insights`;
const toolbar=id=>`<nav class="iv-switch" aria-label="C 스타일 시안 선택"><span>C 스타일</span>${insightCVariants.map(o=>`<a href="${href(o.id)}" ${o.id===id?'aria-current="page"':''}>C${o.id}</a>`).join('')}<a href="insights-c-variants.html">3안 비교 ↗</a></nav>`;
const thumb=(x,t)=>`<span class="iv-thumb iv-thumb-${t}"><img src="${esc(x.image)}" alt="" loading="lazy">${t==='video'?`<span class="iv-play">${play}</span><span class="iv-duration">${esc(x.duration)}</span>`:''}</span>`;
const video=(x,cls,body)=>`<button type="button" class="${cls}" data-insight-video="${esc(x.id)}" data-video-title="${esc(x.title)}" aria-label="${esc(x.title)} 영상 재생">${body}</button>`;
const feature=x=>video(x,'iv-feature',`${thumb(x,'video')}<span class="iv-feature-copy"><span class="iv-feature-tag">대표 영상 · 스마트폰 포렌식</span><strong>${title(x)}</strong><span class="iv-meta">${date(x)}<span class="iv-action">영상 보기 ${play}</span></span></span>`);
const mini=x=>video(x,'iv-mini-video',`${thumb(x,'video')}<span class="iv-mini-copy"><strong>${title(x)}</strong><span class="iv-meta">${date(x)}<span class="iv-action">영상 보기 ${play}</span></span></span>`);
const blog=x=>`<a class="iv-blog-card" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(x.title)} (블로그 원문, 새 창)">${thumb(x,'blog')}<span class="iv-blog-copy"><strong>${esc(x.title)}</strong><span class="iv-meta">${date(x)}<span class="iv-action">글 읽기 ${arrow}</span></span></span></a>`;
const channel=(type,id,label,url)=>`<header class="iv-channel-heading"><h3 id="${id}">${icon(type)}${label}</h3><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${type==='blog'?'전체 글 보기':'채널 보기'}<span aria-hidden="true">↗</span></a></header>`;
const mainHeading=()=>`<header class="iv-heading"><div><p>MDFC INSIGHTS</p><h2 id="insights-title">기술 이야기와 현장 소식</h2></div><p>블로그로 읽고, 영상으로 살펴보는<br>데이터·보안 이야기.</p></header>`;
function chapter(id,c){
 const videos=feature(c.videos[0])+`<div class="iv-more-videos">${c.videos.slice(1).map(mini).join('')}</div>`;
 const blogs=`<div class="iv-blog-list">${c.posts.map(blog).join('')}</div>`;
 let layout='';
 if(id==='1')layout=`<div class="iv-channel-split"><section class="iv-video-section" aria-labelledby="iv-video-title">${channel('video','iv-video-title','유튜브',c.youtubeUrl)}<div class="iv-video-content">${videos}</div></section><section class="iv-blog-section" aria-labelledby="iv-blog-title">${channel('blog','iv-blog-title','블로그',c.blogUrl)}${blogs}</section></div>`;
 if(id==='2')layout=`<div class="iv-horizontal"><section class="iv-video-section" aria-labelledby="iv-video-title">${channel('video','iv-video-title','유튜브',c.youtubeUrl)}<div class="iv-video-content">${videos}</div></section><section class="iv-blog-section" aria-labelledby="iv-blog-title">${channel('blog','iv-blog-title','블로그',c.blogUrl)}${blogs}</section></div>`;
 if(id==='3')layout=`<div class="iv-focus-layout"><section class="iv-blog-section" aria-labelledby="iv-blog-title">${channel('blog','iv-blog-title','블로그',c.blogUrl)}${blogs}</section><section class="iv-video-section iv-focus-feature" aria-labelledby="iv-video-title">${channel('video','iv-video-title','유튜브',c.youtubeUrl)}${feature(c.videos[0])}</section><section class="iv-focus-more" aria-labelledby="iv-more-title">${channel('video','iv-more-title','영상 더 보기',c.youtubeUrl)}<div class="iv-more-videos">${c.videos.slice(1).map(mini).join('')}</div></section></div>`;
 return `<section class="service-chapter iv-chapter iv-c${id}" id="home-insights" data-nav-theme="light" aria-labelledby="insights-title"><div class="container iv-frame">${mainHeading()}${layout}</div></section>`;
}
export function applyApprovedInsightC1(home,c,version){
 const source=/<section class="service-chapter ip-chapter ip-c ip-six"[\s\S]*?<\/section>/;
 if(!source.test(home))throw new Error('Existing six-item insight chapter missing');
 return home.replace(source,chapter('1',c)).replace('</head>',`<link rel="stylesheet" href="assets/insights-c-variants.css?v=${version}"></head>`);
}
export function insightCVariantDocument(home,id,c,version){
 if(!/<section class="service-chapter ip-chapter ip-c ip-six"/.test(home))throw new Error('Approved insight chapter missing');
 const option=insightCVariants.find(o=>o.id===id);
 return home.replace(/<section class="service-chapter ip-chapter ip-c ip-six"[\s\S]*?<\/section>/,chapter(id,c)).replace(/<title>.*?<\/title>/,`<title>C${id} · ${option.name} | MDFC 인사이트 미리보기</title>`).replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/insights-c-variants.css?v=${version}"></head>`).replace('</body>',toolbar(id)+'</body>');
}
export function insightCVariantComparison(version){return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>C 스타일 인사이트 디자인 3안 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/insights-c-variants.css?v=${version}"></head><body class="iv-comparison-page"><main class="iv-comparison"><header><a class="iv-brand" href="insights-refresh-c.html?skip=1#home-insights">MDFC <span>DESIGN PREVIEW</span></a><p class="iv-kicker">INSIGHTS / C STYLE VARIATIONS</p><h1>C 스타일을 바탕으로,<br>세 가지 새로운 배치.</h1><p>대표 영상과 명확한 채널 구분을 유지하며, 콘텐츠의 배치와 비율을 달리했습니다.</p></header><div class="iv-option-grid">${insightCVariants.map(o=>`<article><a class="iv-preview-image" href="${href(o.id)}"><img src="assets/insights/c${o.id}-${o.id==='1'?'120':'119'}.png" alt="C${o.id} ${o.name} 실제 화면" width="1280" height="720"></a><div class="iv-option-copy"><span>C${o.id}</span><p>${o.point}</p><h2>${o.name}</h2><p>${o.description}</p><a href="${href(o.id)}">전체 화면 보기 ${arrow}</a></div></article>`).join('')}</div><footer><span>블로그 3개 · 유튜브 3개</span><a href="insights-refresh-c.html?skip=1#home-insights">기존 C안 보기 ↗</a></footer></main></body></html>`;}
