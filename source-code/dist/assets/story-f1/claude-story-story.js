/* MDFC STORY 목록 페이지 스타일 3안 — data-sh="a|b|c" */
(() => {
 const v = document.documentElement.dataset.sh; if (!v) return;
 const hub = document.querySelector('.mi-hub'); if (!hub) return;
 const title = hub.querySelector('.story-title'), ch = hub.querySelector('.mi-channel-controls'), browse = hub.querySelector('.mi-browse'), meta = hub.querySelector('.mi-results-meta'), groups = hub.querySelector('.mi-hub-groups');
 const desc = title.querySelector('.story-description');
 title.querySelector('span').textContent = 'MDFC STORY';
 title.querySelector('h1').innerHTML = '현장에서 쌓은 경험,<br>꼭 필요한 정보로 전합니다.';
 desc.textContent = '36년간 데이터 현장의 노하우를 원문·블로그·영상·뉴스레터로 전합니다.';
 // 그룹 머리말에 번호
 hub.querySelectorAll('.mi-hub-group-heading').forEach((h, i) => { const n = document.createElement('span'); n.className = 'sh-no'; n.textContent = String(i + 1).padStart(2, '0'); (h.firstElementChild || h).prepend(n); });
 // 뉴스레터: 넓은 배너 + 안내
 const nl = hub.querySelector('.mi-hub-newsletter-card');
 if (nl) nl.insertAdjacentHTML('beforeend', '<span class="sh-nl-cta">예시호 살펴보기 <b aria-hidden="true">→</b></span>');

 if (v === 'a') { // 매거진 히어로
  const hero = document.createElement('section'); hero.className = 'sh-hero';
  hero.innerHTML = '<img src="assets/service-materials/forensic-lab.png" alt=""><div class="sh-hero-shade"></div>';
  title.before(hero); hero.append(title);
  const bar = document.createElement('div'); bar.className = 'sh-bar'; hero.after(bar); bar.append(ch, browse);
 }
 if (v === 'b') { // 채널 사이드바
  const lay = document.createElement('div'); lay.className = 'sh-layout';
  const side = document.createElement('aside'); side.className = 'sh-side'; side.setAttribute('aria-label', '콘텐츠 찾기');
  const body = document.createElement('div'); body.className = 'sh-body';
  title.after(lay); lay.append(side, body);
  side.innerHTML = '<p class="sh-side-label">CHANNEL</p>'; side.append(ch);
  side.insertAdjacentHTML('beforeend', '<p class="sh-side-label">TOPIC</p>'); side.append(browse);
  side.insertAdjacentHTML('beforeend', '<a class="sh-side-cta" href="#consultation" data-open-quote><small>상담이 필요하신가요?</small><strong>견적·의뢰 가이드 →</strong></a>');
  body.append(meta, groups);
 }
 if (v === 'c') { // 큐레이션 보드
  const pics = ['assets/service-materials/pc-storage-workstation.webp', 'assets/insights/blog-2.png', 'assets/insights/youtube-1y__SccDxAs.jpg'];
  const wrap = document.createElement('div'); wrap.className = 'sh-split';
  title.before(wrap); wrap.append(title);
  wrap.insertAdjacentHTML('beforeend', `<div class="sh-collage" aria-hidden="true">${pics.map(p => `<img src="${p}" alt="">`).join('')}<span class="sh-badge"><b>13</b>편의 이야기</span></div>`);
  const info = {all: '모든 채널의 최신 이야기', article: '홈페이지에서 읽는 칼럼', blog: '생활 속 데이터 문제', video: '영상으로 쉽게 보기', newsletter: '한 달의 이야기 모음'};
  ch.querySelectorAll('button').forEach(b => b.insertAdjacentHTML('beforeend', `<em>${info[b.dataset.insightChannelFilter] || ''}</em>`));
 }
})();
/* D·E·F안 추가 구조 */
(() => {
 const v = document.documentElement.dataset.sh; if (!['d', 'e', 'f'].includes(v)) return;
 const hub = document.querySelector('.mi-hub'); if (!hub) return;
 const title = hub.querySelector('.story-title');
 if (v === 'e') { // 사진 오버레이 카드: 이미지 외 내용을 한 덩어리로 묶음
  hub.querySelectorAll('.mi-card:not(.mi-hub-newsletter-card)').forEach(c => {
   const host = c.querySelector('.mi-channel-video-button') || c;
   const img = host.querySelector(':scope > .mi-card-image'); if (!img) return;
   const ov = document.createElement('div'); ov.className = 'sh-ov';
   [...host.children].filter(x => x !== img).forEach(x => ov.append(x));
   if (host !== c) c.querySelectorAll(':scope > .mi-card-meta').forEach(m => ov.append(m));
   host.append(ov); c.classList.add('sh-photo');
  });
 }
 if (v === 'f') { // 숫자 요약 + 채널별 좌우 분할
  const n = k => hub.querySelectorAll(`[data-insight-card][data-insight-channel="${k}"]`).length;
  title.insertAdjacentHTML('beforeend', `<dl class="sh-stats">${[['MDFC 원문', 'article'], ['네이버 블로그', 'blog'], ['유튜브', 'video'], ['뉴스레터', 'newsletter']].map(([t, k]) => `<div><dt>${t}</dt><dd>${String(n(k)).padStart(2, '0')}</dd></div>`).join('')}</dl>`);
  const links = {blog: ['https://blog.naver.com/myungit2', '블로그 바로가기'], video: ['https://www.youtube.com/channel/UC7P1LyBxStJkKxAb_yx5DKw', '유튜브 채널 바로가기'], newsletter: ['newsletter-preview.html', '뉴스레터 보기']};
  hub.querySelectorAll('.mi-hub-group').forEach(g => {
   const [h, t] = links[g.dataset.insightGroup] || [];
   if (h) g.querySelector('.mi-hub-group-intro').insertAdjacentHTML('beforeend', `<a class="sh-go" href="${h}"${h.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${t} <b aria-hidden="true">→</b></a>`);
  });
 }
})();
/* F-1 + 채널 사이드바 (data-side) */
(() => {
 if (!document.documentElement.dataset.side) return;
 const hub = document.querySelector('.mi-hub'); if (!hub) return;
 const title = hub.querySelector('.story-title'), ch = hub.querySelector('.mi-channel-controls'), browse = hub.querySelector('.mi-browse'), meta = hub.querySelector('.mi-results-meta'), groups = hub.querySelector('.mi-hub-groups');
 const lay = document.createElement('div'); lay.className = 'sh-layout';
 const side = document.createElement('aside'); side.className = 'sh-side'; side.setAttribute('aria-label', '콘텐츠 찾기');
 const body = document.createElement('div'); body.className = 'sh-body';
 title.after(lay); lay.append(side, body);
 side.innerHTML = '<p class="sh-side-label">CHANNEL</p>'; side.append(ch);
 side.insertAdjacentHTML('beforeend', '<p class="sh-side-label">TOPIC</p>'); side.append(browse);
 side.insertAdjacentHTML('beforeend', '<a class="sh-side-cta" href="#consultation" data-open-quote><small>상담이 필요하신가요?</small><strong>견적·의뢰 가이드 →</strong></a>');
 body.append(meta, groups);
})();
/* 더 보기 + 뉴스레터 썸네일 */
(() => {
 document.querySelectorAll('[data-sh-more]').forEach(b => {
  const g = b.closest('.mi-hub-group'); g.classList.add('sh-collapsed');
  b.addEventListener('click', () => { g.classList.remove('sh-collapsed'); b.remove(); });
 });
 const tile = document.querySelector('.mi-hub-newsletter-card .mi-news-tile');
 if (tile) tile.outerHTML = `<div class="sh-nl-tile"><div class="sh-nl-top"><span>MDFC MONTHLY</span><span>VOL. 01</span></div><div class="sh-nl-date"><strong>10</strong><span>2026<br>OCTOBER</span></div><ul><li><b>01</b>USB 연결 기록만으로 유출을 확정할 수 없는 이유</li><li><b>02</b>계정 도용이 의심될 때 준비할 기록</li><li><b>03</b>NAS가 있어도 별도 백업이 필요한 이유</li></ul><div class="sh-nl-foot"><span>이번 달의 데이터·보안 이야기</span><i aria-hidden="true">✉</i></div></div>`;
})();
