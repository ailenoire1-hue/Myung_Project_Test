const offerings=[
 {title:'점검·자료 관리',english:'CHECK & MANAGE',image:'company.jpg',width:768,height:500,
  copy:'보안 설정과 업무 자료를 체계적으로 관리합니다.',
  links:[['remote-security','원격 보안 점검'],['employee-offboarding','퇴사자 관리']]},
 {title:'보안 솔루션',english:'PROTECT',image:'calm-2-art.jpg',width:1672,height:941,
  copy:'접근 통제부터 위협 탐지·로그 관리까지.',
  links:[['security-solutions','보안 솔루션 도입']]},
 {title:'인프라·저장 환경',english:'BUILD & BACK UP',image:'calm-3-art.jpg',width:1672,height:941,
  copy:'안전한 운영을 위한 서버·스토리지·백업.',
  links:[['security-infrastructure','보안 인프라 구축'],['server-nas','서버·NAS·백업']]}
];

export function enterpriseCardsChapter(){return `<section id="home-enterprise-security" class="service-chapter home-enterprise-cards" aria-labelledby="home-enterprise-security-title" data-home-chapter data-nav-label="기업 보안 관리" data-nav-theme="light">
 <div class="container enterprise-cards-layout">
  <header class="enterprise-cards-intro">
   <p class="home-offering-kicker">OUR SERVICE<span>03 / 03</span></p>
   <h2 id="home-enterprise-security-title">기업 <br><em>보안 관리</em><br> 서비스</h2>
   <p class="enterprise-cards-description">보안 점검과 자료 관리부터<br>안전한 운영 환경 구축까지.</p>
   <a class="enterprise-cards-more" href="enterprise-security.html">서비스 전체 보기<span aria-hidden="true">↗</span></a>
  </header>
  <div class="enterprise-cards-grid">
   ${offerings.map((item,index)=>`<article class="enterprise-photo-card" data-enterprise-card="${index+1}">
    <img class="enterprise-card-image" src="assets/${item.image}" width="${item.width}" height="${item.height}" alt="" loading="lazy">
    <span class="enterprise-card-number" aria-hidden="true">0${index+1}</span>
    <div class="enterprise-card-copy"><span class="enterprise-card-category" lang="en">${item.english}</span><h3>${item.title}</h3><p>${item.copy}</p>
     <div class="enterprise-card-links">${item.links.map(([id,label])=>`<a href="enterprise-security.html#${id}">${label}<span aria-hidden="true">↗</span></a>`).join('')}</div>
    </div>
   </article>`).join('')}
  </div>
 </div>
</section>`;}
