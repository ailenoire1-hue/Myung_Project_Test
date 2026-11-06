const esc=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>';
const icon=type=>type==='blog'?'<span class="ic-channel-icon ic-naver" aria-hidden="true">N</span>':`<span class="ic-channel-icon ic-youtube" aria-hidden="true">${play}</span>`;
const topics={blog:['모바일 보안','저장매체 복구','SSD·데이터복구'],video:['스마트폰 포렌식','디지털 증거','컨퍼런스 강의']};
function card(item,type,index){
 const body=`<span class="ic-thumb ic-thumb-${type}"><img src="${esc(item.image)}" alt="" loading="lazy">${type==='video'?`<span class="ic-play">${play}</span><span class="ic-duration">${esc(item.duration)}</span>`:''}</span><span class="ic-copy"><span class="ic-topic">${topics[type][index]}</span><strong>${esc(item.title)}</strong><span class="ic-meta"><time datetime="${esc(item.date.replaceAll('.','-'))}">${esc(item.date)}</time><span class="ic-action">${type==='blog'?'글 읽기':'영상 보기'} ${type==='blog'?arrow:play}</span></span></span>`;
 return type==='blog'?`<a class="ic-content-card" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.title)} (블로그 원문, 새 창)">${body}</a>`:`<button type="button" class="ic-content-card" data-insight-video="${esc(item.id)}" data-video-title="${esc(item.title)}" aria-label="${esc(item.title)} 영상 재생">${body}</button>`;
}
function channel(type,items,url){return `<section class="ic-channel ic-channel-${type}" aria-labelledby="ic-${type}-title"><header class="ic-channel-heading"><h3 id="ic-${type}-title">${icon(type)}${type==='blog'?'블로그':'유튜브'}<small>${String(items.length).padStart(2,'0')}</small></h3><a href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="명정보기술 ${type==='blog'?'블로그 전체보기':'유튜브 채널보기'}, 새 창">${type==='blog'?'전체 글 보기':'채널 보기'}<span aria-hidden="true">↗</span></a></header><div class="ic-content-list">${items.map((item,i)=>card(item,type,i)).join('')}</div></section>`;}
export function cleanInsightsPreview(home,content,version){
 const source=/<section class="service-chapter ip-chapter ip-c ip-six"[\s\S]*?<\/section>/;
 if(!source.test(home))throw new Error('Approved six-item insight chapter missing');
 const chapter=`<section class="service-chapter ic-chapter" id="home-insights" data-nav-theme="light" aria-labelledby="insights-title"><div class="container ic-frame"><header class="ic-heading"><div><p class="ic-eyebrow">MDFC INSIGHTS</p><h2 id="insights-title">기술 이야기와 <em>현장 소식</em></h2></div><p>데이터·보안 지식과 디지털포렌식 현장을<br>블로그와 영상으로 만나보세요.</p></header><div class="ic-channels">${channel('blog',content.posts,content.blogUrl)}${channel('video',content.videos,content.youtubeUrl)}</div></div></section>`;
 const toolbar='<nav class="ic-preview-tools" aria-label="인사이트 개선안 비교"><span>인사이트 개선안</span><a href="index.html?skip=1#home-insights">현재 디자인 비교 ↗</a></nav>';
 return home.replace(source,chapter).replace(/<title>.*?<\/title>/,'<title>인사이트 · 콘텐츠 중심 개선안 | MDFC 미리보기</title>').replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/insights-clean-preview.css?v=${version}"></head>`).replace('</body>',toolbar+'</body>');
}
