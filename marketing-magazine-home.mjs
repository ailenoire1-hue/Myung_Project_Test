// Separate magazine proposal using existing editorial examples and curated channels.
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=paths=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
const icons={
 search:svg('<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>'),
 alert:svg('<path d="m12 3 10 18H2Z"/><path d="M12 9v5m0 3h.01"/>'),
 storage:svg('<ellipse cx="10" cy="5" rx="7" ry="3"/><path d="M3 5v13c0 1.7 3.1 3 7 3m7-16v5M3 11c0 1.7 3.1 3 7 3m5 1h4l2 3-2 3h-4m4-6v6"/>'),
 shield:svg('<path d="m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
 account:svg('<circle cx="12" cy="7" r="3.5"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>'),
 backup:svg('<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="10" r="4"/><path d="M12 10v4m-3 5h6"/>'),
 mail:svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')
};
export function renderMagazineHome(data){
 const own=(topic,title,category,image,deck,illustration)=>({type:'article',title,category,image,deck,illustration,date:'2026.10.20 · 예시',meta:topic?'약 3분 읽기':'약 4분 읽기',url:'insight-article-preview.html'+(topic?'?topic='+topic:'')});
 const article={
 usb:own('','USB 연결 기록만으로 자료 유출을 확정할 수 없는 이유','디지털포렌식','assets/service-materials/pc-storage-workstation.webp','기록이 말해 주는 것과 아직 말해 주지 않는 것을 나눠 봅니다.'),
 mobile:own('mobile','대화의 흔적이 남았다는 것과 내용을 확보했다는 것','디지털포렌식','assets/service-materials/mobile-acquisition-work.png','기록의 존재와 실제 내용 확보를 구분해 설명하는 이유.'),
 email:own('email','계정 도용이 의심된다면, 어떤 기록을 준비할까요?','사고 대응',null,'로그인·메일·설정 변경 기록을 함께 살펴봅니다.','account'),
 incident:own('incident','사고를 발견한 담당자가 먼저 남겨 둘 기록','사고 대응','assets/service-materials/incident-analysis-concept-v2.png','화면과 발생 시점, 증상과 업무 영향을 정리하는 시작점.'),
 offboarding:own('offboarding','퇴사자 관리, 자료 보존과 권한 회수를 함께.','기업 보안','assets/service-materials/forensic-lab.png','업무 자료 인계와 접근 권한 정리를 함께 확인합니다.'),
 backup:own('backup','NAS가 있어도 별도 백업을 살펴보는 이유','기업 보안',null,'저장하는 일과 복구를 준비하는 일의 서로 다른 역할.','backup')
 };
 const blog=(i)=>({...data.posts[i],type:'blog',category:i?'데이터 복구':'사고 대응',meta:'공식 게시물',deck:i?'저장매체 문제와 데이터 복구를 살펴보는 공식 블로그 글입니다.':'스미싱 링크 클릭 뒤 확인할 내용을 다루는 공식 블로그 글입니다.'});
 const video=(i)=>({...data.videos[i],type:'video',category:i===2?'데이터 복구':'디지털포렌식',meta:data.videos[i].duration,deck:'디지털 자료를 바라보는 관점을 공식 영상으로 살펴보세요.'});
 const groups=[
 {key:'all',label:'전체',hero:article.usb,list:[article.email,article.offboarding,article.backup]},
 {key:'forensics',label:'디지털포렌식',hero:article.usb,list:[article.mobile,video(1),video(0)]},
 {key:'incident',label:'사고 대응',hero:article.email,list:[article.incident,blog(0),article.usb]},
 {key:'recovery',label:'데이터 복구',hero:blog(1),list:[blog(2),article.backup,video(2)]},
 {key:'security',label:'기업 보안',hero:article.offboarding,list:[article.backup,article.email,article.incident]}
 ];
 const media=item=>item.illustration?`<span class="mm-illustration mm-illustration-${item.illustration}"><span class="mm-illustration-symbol">${icons[item.illustration]}</span><span class="mm-illustration-caption">${item.illustration==='account'?'ACCOUNT ACCESS':'DATA & BACKUP'}<strong>${item.illustration==='account'?'계정의 흔적을,<br>기록으로 확인합니다.':'저장부터 복원까지,<br>한 흐름으로 살펴봅니다.'}</strong></span></span>`:`<img src="${esc(item.image)}" alt="" loading="lazy">`;
 function card(item,feature=false){
  const isVideo=item.type==='video',isBlog=item.type==='blog',tag=isVideo?'button':'a';
  const attributes=isVideo?`type="button" data-channel-video="${esc(item.id)}" data-channel-title="${esc(item.title)}" aria-label="${esc(item.title)} 영상 재생"`:`href="${esc(item.url)}"${isBlog?' target="_blank" rel="noopener noreferrer"':''}`;
  const source=isVideo?'공식 유튜브':isBlog?'공식 블로그':'원문 · 기획 예시';
  return `<${tag} class="${feature?'mm-feature':'mm-story'} mm-type-${item.type}" ${attributes}><span class="mm-media">${media(item)}${isVideo?`<span class="mm-play" aria-hidden="true">▶</span><span class="mm-duration" aria-hidden="true">${esc(item.duration)}</span>`:''}</span><span class="mm-copy"><span class="mm-source"><span class="mm-source-icon mm-source-${item.type}" aria-hidden="true">${isVideo?'▶':isBlog?'N':'M'}</span><span>${source}</span><span class="mm-category">${esc(item.category)}</span></span><strong class="mm-title">${esc(item.title.replace(/^\[[^\]]+\]\s*/,''))}</strong>${feature?`<span class="mm-deck">${esc(item.deck)}</span>`:''}<span class="mm-meta"><span class="mm-meta-detail"><span>${esc(item.date)}</span><span>${esc(item.meta)}</span></span>${feature?`<span class="mm-read">${isVideo?'영상 보기':isBlog?'글 보기':'읽기'} <span aria-hidden="true">→</span></span>`:''}</span></span></${tag}>`;
 }
 const filters=[['all','전체',''],['forensics','디지털포렌식','search'],['incident','사고 대응','alert'],['recovery','데이터 복구','storage'],['security','기업 보안','shield']].map(([key,label,icon])=>`<button type="button" data-mm-filter="${key}" data-mm-label="${label}" aria-pressed="${key==='all'}">${icon?icons[icon]:''}${label}</button>`).join('');
 const editions=groups.map(group=>`<section class="mm-edition" data-mm-group="${group.key}" aria-label="${group.label} 매거진 읽을거리"${group.key==='all'?'':' hidden'}>${card(group.hero,true)}<div class="mm-stories">${group.list.map(item=>card(item)).join('')}</div></section>`).join('');
 return `<section class="service-chapter mm-home" id="home-insights" data-home-chapter data-nav-label="인사이트" data-nav-theme="light" data-magazine-browser aria-labelledby="mm-home-title"><div class="mp-wrap"><header class="mm-heading"><div><p class="mm-kicker">MDFC INSIGHTS</p><h2 id="mm-home-title">알아 두면 힘이 되는<br class="mm-mobile-break"> 데이터·보안 이야기</h2></div><a class="mm-all" href="insights-preview.html">인사이트 전체 보기 <span aria-hidden="true">→</span></a></header><div class="mm-filters" role="group" aria-label="인사이트 주제">${filters}</div>${editions}<p class="mm-sr-only" data-mm-status role="status" aria-live="polite"></p><div class="mm-bottom"><a class="mm-monthly" href="newsletter-preview.html"><span class="mm-monthly-icon">${icons.mail}</span><span class="mm-monthly-copy"><small>MDFC MONTHLY</small><strong>한 달에 한 번, 꼭 필요한 데이터·보안 이야기</strong><span>월간 뉴스레터 예시호와 구독 안내를 살펴보세요.</span></span><span class="mm-monthly-action">예시호·구독 안내 <span aria-hidden="true">→</span></span></a><nav class="mm-channels" aria-label="명정보기술 공식 콘텐츠 채널"><a href="${esc(data.blogUrl)}" target="_blank" rel="noopener noreferrer"><span class="mm-source-icon mm-source-blog" aria-hidden="true">N</span>네이버 블로그 <span aria-hidden="true">↗</span></a><a href="${esc(data.youtubeUrl)}" target="_blank" rel="noopener noreferrer"><span class="mm-source-icon mm-source-video" aria-hidden="true">▶</span>유튜브 채널 <span aria-hidden="true">↗</span></a></nav></div><p class="mm-note">원문과 뉴스레터는 기획 예시이며, 블로그·유튜브는 기존 공식 콘텐츠입니다.</p></div></section>`;
}
