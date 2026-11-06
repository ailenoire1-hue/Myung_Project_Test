import {serviceCard} from '../components/card.mjs';
import {photoTrio} from '../components/visual-section.mjs';

const services = [
  ['products', '01', '제품·솔루션', 'PC, 저장장치, NAS 등 사용 목적에 맞는 제품 분류를 살펴보세요.'],
  ['repair', '02', '장비 수리', '기기의 이상 증상과 점검·접수 절차를 확인하세요.'],
  ['recovery', '03', '데이터 복구', '손상·삭제된 데이터의 진단과 복구 절차를 안내합니다.'],
  ['forensics', '04', '디지털포렌식', '디지털 기록에서 사실관계를 확인하는 분석 서비스를 안내합니다.'],
  ['security', '05', '침해사고·기업 보안', '사고 조사와 기업 운영 환경에 필요한 보안 관리를 살펴보세요.'],
  ['support', '06', '고객지원', '상담 전 준비 사항과 분야별 문의 방법을 확인하세요.'],
];

export const homePage = {
  file: 'index.html',
  title: '명정보기술 | 데이터와 기술을 잇는 통합 서비스',
  eyebrow: 'CONNECTED TECHNOLOGY · MYUNG',
  description: '제품 선택부터 수리, 데이터 복구, 디지털포렌식과 기업 보안까지. 필요한 기술을 한 곳에서 살펴보세요.',
  body: `<section class="home-hero"><div class="container hero-grid"><div><p class="eyebrow">TECHNOLOGY, WITH CONFIDENCE</p><h1>기술의 시작부터,<br>데이터의 다음까지.</h1><p class="lead">업무에 필요한 장비와 데이터,<br>그리고 디지털 신뢰를 함께 살펴봅니다.</p><div class="actions"><a class="button" href="products.html">제품 살펴보기 ↗</a><a class="button-secondary" href="support.html">상담 안내</a></div><p class="hero-caption">명정보기술 · 명디지털포렌식센터</p></div><figure class="hero-photo"><img src="../assets/company/hq-building.png" alt="명정보기술 오창 본사"><figcaption>MYUNG · 오창 본사</figcaption></figure></div></section><section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">OUR EXPERTISE</span><h2>지금 필요한 기술을 찾으세요.</h2><p class="lead">장비의 도입과 운영부터 데이터의 보존과 분석까지 연결합니다.</p></div><div class="grid grid-3">${services.map(([file, n, title, text]) => serviceCard({href: `${file}.html`, tag: `${n} / MYUNG`, title, text})).join('')}</div></div></section>${photoTrio({eyebrow: 'TECHNOLOGY · WORKPLACE · INFRASTRUCTURE', title: '기술과 업무 환경, 인프라를 함께 살펴봅니다.', lead: '아래 사진은 서비스 분야를 설명하기 위한 스톡 사진이며 명정보기술의 실제 장비·사무실·시설이 아닙니다.', items: [{photo: 'circuit', title: '기술 · 장비 점검', text: '장비 증상 확인과 점검 흐름은 수리와 데이터 복구 페이지에서 안내합니다.', href: 'repair.html', linkLabel: '장비 수리 안내'}, {photo: 'office', title: '업무 환경', text: '업무 환경에 맞는 제품과 운영 방식은 고객지원 상담으로 확인하세요.', href: 'support.html', linkLabel: '상담 안내'}, {photo: 'server', title: '인프라 · 보안', text: '서버와 저장장치 운영, 기업 보안 관리는 기업 보안 페이지를 참고하세요.', href: 'security.html', linkLabel: '기업 보안 살펴보기'}]})}<section class="section about-band"><div class="container split"><img class="about-image" src="../assets/forensics.jpg" alt="디지털 분석 분야 시안용 이미지"><div><span class="eyebrow">SINCE 1990</span><h2>기술을 이해하고,<br>신뢰를 이어갑니다.</h2><p class="lead">1990년 설립된 명정보기술. 회사와 전문 서비스 영역을 소개합니다.</p><a class="text-link" href="company.html">회사 소개 살펴보기 →</a></div></div></section>`,
};
