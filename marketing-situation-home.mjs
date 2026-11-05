// Situation-led home preview; articles are editorial examples, channel entries are curated.
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=paths=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
const icons={
 search:svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>'),
 alert:svg('<path d="M10.3 4.3 2.5 18a1.5 1.5 0 0 0 1.3 2.2h16.4a1.5 1.5 0 0 0 1.3-2.2L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v5m0 3h.01"/>'),
 database:svg('<ellipse cx="10" cy="5" rx="7" ry="3"/><path d="M3 5v13c0 1.7 3.1 3 7 3m7-16v5M3 11c0 1.7 3.1 3 7 3m5 1h4l2 3-2 3h-4m4-6v6"/>'),
 shield:svg('<path d="m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
 consult:svg('<path d="M19 14a8 8 0 1 0-4 5l6 3-2-6Z"/><path d="M7 10h.01M11 10h.01M15 10h.01"/>'),
 phone:svg('<path d="M8 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 3a14 14 0 0 1-7-7l3-2Z"/>'),
 mail:svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')
};
export function renderSituationHome(data){
 const own=(topic,title,image,category,minutes)=>({type:'article',title,image,category,date:'2026.10.20 · 예시',meta:`${minutes}분 읽기`,url:'insight-article-preview.html'+(topic?'?topic='+topic:'')});
 const article={
 usb:own('','USB 연결 기록만으로 자료 유출을 확정할 수 없는 이유','assets/service-materials/pc-storage-workstation.webp','디지털포렌식',4),
 mobile:own('mobile','대화의 흔적이 남았다는 것과 내용을 확보했다는 것','assets/service-materials/mobile-acquisition-work.png','디지털포렌식',3),
 email:own('email','계정 도용이 의심된다면, 어떤 기록을 준비할까요?','assets/service-materials/incident-analysis-concept-v2.png','사고 대응',3),
 incident:own('incident','사고를 발견한 담당자가 먼저 남겨 둘 기록','assets/service-materials/incident-analysis-concept-v2.png','사고 대응',3),
 offboarding:own('offboarding','퇴사자 관리, 자료 보존과 권한 회수를 함께.','assets/service-materials/forensic-lab.png','기업 보안',3),
 backup:own('backup','NAS가 있어도 별도 백업을 살펴보는 이유','assets/service-materials/pc-storage-workstation.webp','기업 보안',3)
 };
 const blog=(index,category)=>({...data.posts[index],type:'blog',category,meta:'공식 게시물'});
 const video=(index,category)=>({...data.videos[index],type:'video',category,meta:data.videos[index].duration});
 const situations=[
 {key:'forensics',label:'자료 유출·증거가 궁금해요',short:'디지털포렌식',icon:'search',cards:[article.usb,article.mobile,video(1,'디지털포렌식')],service:'디지털포렌식',serviceLabel:'디지털포렌식 서비스 보기',serviceUrl:'digital-forensics.html'},
 {key:'incident',label:'해킹·보안사고가 의심돼요',short:'사고 대응',icon:'alert',cards:[article.email,video(0,'디지털 흔적'),blog(0,'보안 이야기')],service:'침해사고 조사',serviceLabel:'침해사고 조사 서비스 보기',serviceUrl:'incident-response.html'},
 {key:'recovery',label:'데이터가 사라졌어요',short:'데이터 복구',icon:'database',cards:[article.backup,video(2,'복구·포렌식 강의'),blog(1,'데이터 복구')],service:'데이터 복구',serviceLabel:'직영점·접수 안내',serviceUrl:'company.html#center'},
 {key:'security',label:'회사 보안을 미리 챙기고 싶어요',short:'기업 보안',icon:'shield',cards:[article.offboarding,article.backup,article.email],service:'기업 보안 관리',serviceLabel:'기업 보안 관리 서비스 보기',serviceUrl:'enterprise-security.html'}
 ];
 function card(item){
  const isVideo=item.type==='video', isBlog=item.type==='blog';
  const typeLabel=isVideo?'유튜브 명TV':isBlog?'네이버 블로그':'인사이트 · 기획 예시';
  const sourceIcon=isVideo?'▶':isBlog?'N':'M';
  const tag=isVideo?'button':'a';
  const attributes=isVideo?`type="button" data-channel-video="${esc(item.id)}" data-channel-title="${esc(item.title)}" aria-label="${esc(item.title)} 영상 재생"`:`href="${esc(item.url)}"${isBlog?' target="_blank" rel="noopener noreferrer"':''}`;
  const title=item.title.replace(/^\[[^\]]+\]\s*/,'');
  return `<${tag} class="ms-card ms-card-${item.type}" ${attributes}><span class="ms-card-image"><img src="${esc(item.image)}" alt="" loading="lazy">${isVideo?`<span class="ms-play" aria-hidden="true">▶</span><span class="ms-duration" aria-hidden="true">${esc(item.duration)}</span>`:''}</span><span class="ms-card-body"><span class="ms-card-source"><span class="ms-source-icon ms-source-${item.type}" aria-hidden="true">${sourceIcon}</span><span>${typeLabel}</span><span class="ms-card-topic">${esc(item.category)}</span></span><strong class="ms-card-title">${esc(title)}</strong><span class="ms-card-footer"><span class="ms-card-meta"><span>${esc(item.date)}</span><span>${esc(item.meta)}</span></span><span class="ms-card-action">${isVideo?'영상 보기':isBlog?'글 보기':'읽기'} <span aria-hidden="true">→</span></span></span></span></${tag}>`;
 }
 const tabs=situations.map((item,index)=>`<button class="ms-tab" type="button" role="tab" id="ms-tab-${item.key}" data-ms-tab="${item.key}" data-ms-label="${esc(item.label)}" aria-selected="${index===0}" tabindex="${index===0?'0':'-1'}" aria-controls="ms-panel-${item.key}"><span class="ms-tab-index" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="ms-tab-icon">${icons[item.icon]}</span><span class="ms-tab-copy"><strong>${esc(item.label)}</strong><small>${esc(item.short)}</small></span><span class="ms-tab-arrow" aria-hidden="true">→</span></button>`).join('');
 const panels=situations.map((item,index)=>`<section class="ms-panel" data-ms-panel="${item.key}" id="ms-panel-${item.key}" role="tabpanel" aria-labelledby="ms-tab-${item.key}"${index===0?'':' hidden'}><div class="ms-cards">${item.cards.map(card).join('')}</div><div class="ms-consult"><span class="ms-consult-icon">${icons.consult}</span><p><strong>${esc(item.service)}</strong>에 대해 직접 상담이 필요하신가요?</p><div class="ms-consult-actions"><a class="ms-service-link" href="${esc(item.serviceUrl)}">${esc(item.serviceLabel)} <span aria-hidden="true">→</span></a><a class="ms-phone" href="tel:1577-4872">${icons.phone}전화 상담</a></div></div></section>`).join('');
 return `<section class="service-chapter ms-home" id="home-insights" data-home-chapter data-nav-label="인사이트" data-nav-theme="light" data-situation-insights aria-labelledby="ms-home-title"><div class="mp-wrap"><header class="ms-heading"><p class="ms-kicker">MDFC INSIGHTS</p><h2 id="ms-home-title">지금 겪고 있는 일, 먼저 읽어 보세요.</h2><p class="ms-heading-copy">상황을 선택하면 관련 글·영상과 서비스를 함께 보여 드립니다.</p></header><div class="ms-layout"><div class="ms-intro"><div class="ms-tabs" role="tablist" aria-label="어떤 상황이신가요?" aria-orientation="vertical">${tabs}</div></div><div class="ms-results"><div class="ms-results-head"><p>상황별 추천 콘텐츠 <span>03</span></p><a class="ms-all-link" href="insights-preview.html">인사이트 전체 보기 <span aria-hidden="true">↗</span></a></div>${panels}</div></div><p class="ms-sr-only" data-ms-status role="status" aria-live="polite"></p><nav class="ms-channels" aria-label="명정보기술의 공식 콘텐츠 채널"><span class="ms-channels-label">명정보기술의 이야기, 더 살펴보기</span><a href="${esc(data.blogUrl)}" target="_blank" rel="noopener noreferrer"><span class="ms-source-icon ms-source-blog" aria-hidden="true">N</span>네이버 블로그 <span aria-hidden="true">↗</span></a><a href="${esc(data.youtubeUrl)}" target="_blank" rel="noopener noreferrer"><span class="ms-source-icon ms-source-video" aria-hidden="true">▶</span>유튜브 채널 <span aria-hidden="true">↗</span></a><a href="newsletter-preview.html">${icons.mail}월간 뉴스레터 미리보기 <span aria-hidden="true">↗</span></a></nav><p class="ms-note">원문은 기획 예시이며, 블로그·유튜브는 기존 공식 콘텐츠입니다. 상황에 맞춰 선별한 콘텐츠를 표시합니다.</p></div></section>`;
}
