export function headerNavigation(routes,services,current){
 const company=[['information','회사 개요'],['center','센터·전국망'],['capabilities','분석 역량'],['national-response','국가 재난 대응'],['partnerships','파트너십'],['history','주요 연혁']];
 const extras={
  'digital-forensics':[['overview','디지털포렌식이란?'],['questions','자주 묻는 질문']],
  'incident-response':[['first-response','초기 대응'],['process','진행 절차'],['contact','상담 안내']],
  'enterprise-security':[['security-basics','보안 기본 수칙'],['trust','강점·진행 절차'],['contact','상담 안내']]
 };
 return routes.slice(1).map(route=>{
  const slug=route.file.replace('.html','');
  const service=services.find(s=>s.slug===slug);
  const primary=slug==='digital-forensics'?[['data-leakage','자료 유출 조사'],['mobile-evidence','스마트폰 민·형사 증거 확보'],['media-authenticity','음성·영상 위변조 분석']]:slug==='incident-response'?[['ransomware','랜섬웨어 사고 조사'],['email-hacking','이메일·해킹 조사'],['privacy-audit','개인정보 및 내부 보안점검']]:slug==='enterprise-security'?[['remote-security','원격 보안 점검'],['employee-offboarding','퇴사자 관리'],['infrastructure','솔루션 &amp; 스토리지']]:service?service.items.map(item=>[item.id,item.name.replace('해킹, 악성코드','해킹·악성코드').replace('이메일 등 개인정보','이메일·개인정보')]):company;
  const secondary=extras[slug]||[];
  const links=items=>items.map(([id,label])=>`<li><a href="${route.file}#${id}">${label}</a></li>`).join('');
  return `<div class="nav-item"><div class="nav-item-heading"><a class="nav-page-link" href="${route.file}" aria-expanded="false" aria-controls="nav-${slug}" ${current===route.file?'aria-current="page"':''}>${route.name}</a><button class="nav-mobile-trigger" type="button" aria-expanded="false" aria-controls="nav-${slug}" ${current===route.file?'aria-current="page"':''}>${route.name}</button></div><div class="nav-dropdown" id="nav-${slug}" hidden><div class="container nav-dropdown-inner"><div class="nav-dropdown-intro"><strong>${route.name}</strong><a class="nav-overview-link" href="${route.file}">전체 보기</a></div><div class="nav-dropdown-links"><ul class="nav-dropdown-primary">${links(primary)}</ul>${secondary.length?`<ul class="nav-dropdown-secondary">${links(secondary)}</ul>`:''}</div></div></div></div>`;
 }).join('');
}
