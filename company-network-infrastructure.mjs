import {companyBranches} from './company-data.mjs';
import {companyNetworkMap} from './company-network-map.mjs';

export function companyNetworkSection(){
 return `<section class="detail-section company-network company-network-unified" id="center" data-nav-theme="light"><span id="branches" class="company-network-anchor" aria-hidden="true"></span><div class="container">
 <header class="detail-section-heading"><span class="detail-kicker">CONNECTED NATIONWIDE</span><h2>전국 9개 직영 접수망,<br> 가까운 곳에서 상담과 의뢰를 시작하세요.</h2><p>청주 본사와 8개 지점을 연결해 접수부터 전문 분석까지 안내합니다.</p></header>
 <div class="company-network-unified-grid" id="branch-network"><div class="network-map-stage"><div class="network-map-heading"><span>NATIONWIDE NETWORK</span><strong>9<span>개 직영 접수망</span></strong></div>${companyNetworkMap()}</div><div class="company-network-directory">
 <div class="network-facilities"><figure class="network-hq"><img src="assets/company/hq-building.png" alt="명정보기술 청주 오창 본사 전경" loading="lazy"><figcaption><small>HEADQUARTERS</small><strong>전국의 접점에서, 전문 분석 현장으로.</strong><span>청주 오창 본사</span></figcaption></figure><figure class="network-lab"><img src="assets/company/video2019-cleanroom.png" alt="명정보기술 클린룸의 전문 작업 환경" loading="lazy"><figcaption>전문 분석 인프라</figcaption></figure></div>
 <div class="network-directory-heading"><h3>가까운 직영점 찾기</h3><span>지점 선택 시 주소·전화번호 표시</span></div>
 <div class="company-branches">${companyBranches.map((b,i)=>`<details class="company-branch" name="company-branch" id="branch-${b.no}"><summary><span>${String(i+1).padStart(2,'0')}</span><strong>${b.name}</strong><i aria-hidden="true">+</i></summary><div><a href="tel:${b.tel}">${b.tel}</a><p>${b.new_addr}</p></div></details>`).join('')}</div>
 <p class="company-network-visit-note">방문·장비 반입 전, 해당 지점에 접수 가능 서비스와 일정을 확인해 주세요.</p></div></div></div></section>`;
}

export function companyInfrastructureSection(){
 const features=[
  {label:'01 / ANALYSIS INFRASTRUCTURE',title:'국내 최대 규모의<br>전문 작업 인프라',copy:'전용 클린룸과 분석 시설을 갖춰 저장매체의 상태에 맞는 작업 환경을 제공합니다.',image:'video2019-cleanroom.png',alt:'명정보기술의 클린룸과 전문 분석 작업 환경',className:'company-lab-large',frameClass:'',width:1920,height:708},
  {label:'02 / ADVANCED EQUIPMENT',title:'최첨단 장비를 활용한<br>정밀 분석·복구',copy:'정밀 진단·복구 장비로 저장매체와 회로의 상태를 확인하고, 데이터 확보와 분석을 수행합니다.',image:'recovery-equipment-work.png',alt:'정밀 복구 장비를 이용한 저장매체 회로 작업',className:'',frameClass:'company-video-equipment',width:1280,height:720},
  {label:'03 / EXPERIENCED ENGINEERS',title:'평균 10년 이상 경력,<br>엔지니어의 정밀 작업',copy:'다양한 손상 유형과 복구 현장을 경험한 엔지니어가 직접 진단하고 작업 방향을 판단합니다.',image:'video2019-precision.png',alt:'숙련된 엔지니어의 현미경 아래 정밀 회로 작업',className:'',frameClass:'company-video-board',width:1920,height:708}
 ];
 return `<section class="detail-section company-capabilities company-infrastructure" id="capabilities"><div class="container"><header class="detail-section-heading"><span class="detail-kicker">INFRASTRUCTURE & EXPERTISE</span><h2>국내 최대 규모의 인프라,<br>숙련된 엔지니어의 정밀 작업.</h2><p>전문 분석 시설과 최첨단 장비, 평균 10년 이상 경력의 엔지니어가 함께합니다.</p></header><div class="company-lab-gallery">${features.map(f=>`<figure class="${f.className} company-reveal"><div class="company-video-frame ${f.frameClass}"><img src="assets/company/${f.image}" alt="${f.alt}" width="${f.width}" height="${f.height}" loading="lazy"></div><figcaption><span>${f.label}</span><h3>${f.title}</h3><p>${f.copy}</p></figcaption></figure>`).join('')}</div></div></section>`;
}
