const icon = name => {
 const servicePaths={leak:'<path d="M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l5 5v3M14 3v5h5M7 8h3M7 12h4"/><circle cx="16" cy="16" r="4"/><path d="m19 19 3 3"/>',ransomware:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><rect x="8" y="10" width="8" height="6" rx="1"/><path d="M10 10V8a2 2 0 0 1 4 0v2"/>',storage:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5"/>'};
 const paths={chat:'<path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h6"/>',video:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',top:'<path d="m6 14 6-6 6 6M12 8v12M5 3h14"/>',plus:'<path d="M12 5v14M5 12h14"/>'};
 return name==='blog'?'<span class="qm-naver" aria-hidden="true">N</span>':`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||servicePaths[name]}</svg>`;
};
export const quickMenuOptions=[
 {id:'a',name:'슬림 도크형',description:'작은 면적으로 필요한 기능을 모아두는 구성. 현재 홈페이지와 가장 자연스럽게 어울립니다.',tag:'추천'},
 {id:'b',name:'라벨 카드형',description:'상담 안내, 정보유출 조사, 랜섬웨어 조사, 스토리지 도입을 한곳에서 바로 연결합니다.',tag:'서비스 바로가기'},
 {id:'c',name:'확장 패널형',description:'평소에는 작은 버튼으로, 필요할 때만 펼쳐서 사용하는 구성입니다.',tag:'콘텐츠 집중'}
];
const links=()=>`<button type="button" class="qm-action qm-contact" data-contact>${icon('chat')}<span>상담 안내</span></button><a class="qm-action qm-blog" href="https://blog.naver.com/myungit2" target="_blank" rel="noopener noreferrer" aria-label="명정보기술 네이버 블로그, 새 창">${icon('blog')}<span>블로그</span></a><a class="qm-action qm-video" href="https://www.youtube.com/channel/UC7P1LyBxStJkKxAb_yx5DKw" target="_blank" rel="noopener noreferrer" aria-label="명정보기술 유튜브, 새 창">${icon('video')}<span>유튜브</span></a>`;
const serviceLinks=()=>`<button type="button" class="qm-action qm-contact" data-contact>${icon('chat')}<span>상담 안내</span></button><a class="qm-action" href="incident-response.html#personal-data">${icon('leak')}<span>정보유출 조사</span></a><a class="qm-action" href="incident-response.html#ransomware">${icon('ransomware')}<span>랜섬웨어 조사</span></a><a class="qm-action" href="enterprise-security.html#server-nas">${icon('storage')}<span>스토리지 도입</span></a>`;
export function quickMenuMarkup(id,{demo=false}={}){
 return `<aside class="qm-widget qm-${id}${id==='b'?' qm-services':''}${id==='c'?' is-open':''}${demo?' qm-demo':''}" data-quick-menu aria-label="퀵메뉴"><div class="qm-panel" id="qm-panel-${id}">${id==='b'?'<span class="qm-caption">QUICK MENU</span>':''}${id==='c'?`<div class="qm-panel-heading"><span>CONTACT & INSIGHTS</span><strong>어떤 도움이<br>필요하신가요?</strong><p>전문가 상담과 기술 소식을<br>가까이에서 만나보세요.</p></div>`:''}<nav aria-label="${id==='b'?'상담 및 서비스 바로가기':'상담 및 소셜 채널'}">${id==='b'?serviceLinks():links()}</nav>${id==='c'?'':`<a class="qm-top" href="#home-video" aria-label="페이지 맨 위로">${icon('top')}<span>TOP</span></a>`}</div><button class="qm-toggle" type="button" aria-expanded="${id==='c'}" aria-controls="qm-panel-${id}"><span class="qm-toggle-icon">${icon(id==='c'?'plus':'chat')}</span><span class="qm-toggle-label">${id==='c'?'퀵메뉴':'바로가기'}</span></button></aside>`;
}
export function quickMenuPreview(home,id,version){
 const option=quickMenuOptions.find(o=>o.id===id);
 const toolbar=`<nav class="qm-preview-tools" aria-label="퀵메뉴 디자인 선택"><span>QUICK MENU</span>${quickMenuOptions.map(o=>`<a href="quick-menu-${o.id}.html?skip=1#main" ${o.id===id?'aria-current="page"':''}>${o.id.toUpperCase()}안</a>`).join('')}<a href="quick-menu-previews.html">3안 비교</a></nav>`;
 return home.replace(/<title>[^<]*<\/title>/,`<title>${id.toUpperCase()}안 ${option.name} | MDFC 퀵메뉴 미리보기</title>`)
 .replace('</head>',`<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="assets/quick-menu-previews.css?v=${version}"><script src="assets/quick-menu-previews.js?v=${version}" defer></script></head>`)
 .replace('<body class="',`<body class="qm-preview qm-preview-${id} `)
 .replace('</body>',`${quickMenuMarkup(id)}${toolbar}</body>`);
}
export function applyApprovedQuickMenu(home,version){
 const menu=quickMenuMarkup('b').replace('data-quick-menu aria-label','data-quick-menu data-after-video hidden aria-label');
 return home.replace('</head>',`<link rel="stylesheet" href="assets/quick-menu-previews.css?v=${version}"><script src="assets/quick-menu-previews.js?v=${version}" defer></script></head>`)
 .replace('<body class="','<body class="qm-enabled qm-enabled-b ')
 .replace('</body>',`${menu}</body>`);
}
export function quickMenuComparison(version){
 return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>퀵메뉴 디자인 3안 | MDFC</title><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/quick-menu-previews.css?v=${version}"></head><body class="qm-comparison"><header class="qm-comparison-header"><a href="index.html" class="qm-wordmark">MDFC<span></span></a><span>QUICK MENU · DESIGN PREVIEW</span><a href="index.html">현재 홈페이지</a></header><main class="qm-comparison-main"><div class="qm-comparison-intro"><p>상담과 콘텐츠를 더 가까이</p><h1>퀵메뉴 디자인 3가지</h1><span>좌측은 페이지 이동, 우측은 상담·블로그·유튜브. 실제 홈페이지에서 비교해 보세요.</span></div><div class="qm-option-grid">${quickMenuOptions.map(o=>`<article class="qm-option"><div class="qm-option-visual"><div class="qm-mini-brand">MDFC<i></i></div><span class="qm-mini-kicker">MYUNG DIGITAL<br>FORENSIC CENTER</span><div class="qm-mini-nav" aria-hidden="true"><i></i><i class="is-current"></i><i></i><i></i><i></i></div>${quickMenuMarkup(o.id,{demo:true})}</div><div class="qm-option-copy"><div><span class="qm-option-id">${o.id.toUpperCase()}</span><h2>${o.name}</h2><span class="qm-option-tag">${o.tag}</span></div><p>${o.description}</p><a class="qm-option-open" href="quick-menu-${o.id}.html?skip=1#main">${o.id.toUpperCase()}안 홈페이지에서 보기</a></div></article>`).join('')}</div><p class="qm-comparison-note">미리보기 전용 디자인입니다. 현재 메인페이지에는 적용되지 않았습니다.</p></main><script src="assets/quick-menu-previews.js?v=${version}"></script></body></html>`;
}
