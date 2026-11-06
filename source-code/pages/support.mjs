import {esc} from '../components/utils.mjs';
import {articleCard} from '../components/card.mjs';
import {faq} from '../components/faq.mjs';
import {inquiryForm} from '../components/inquiry-form.mjs';

const preparation = [
  {tag: '01 · 장비', title: '제품과 증상', text: '사용 중인 기기 종류와 이상이 발생한 시점, 시행한 조치를 정리해 주세요.'},
  {tag: '02 · 데이터', title: '현재 보관 상태', text: '복구·분석 대상의 상태와 보존 중인 자료의 종류를 확인해 주세요.'},
  {tag: '03 · 범위', title: '확인하려는 목적', text: '희망하는 지원 범위와 일정을 정리하면 상담에 도움이 됩니다.'},
];

const questions = [
  ['온라인 문의가 실제로 접수되나요?', '이 페이지는 시안입니다. 입력 내용은 네트워크 전송이나 저장 없이 화면에서만 확인합니다. 실제 상담은 대표번호를 이용해 주세요.'],
  ['가격과 운영 조건은 확정되어 있나요?', '제품 모델·가격·재고, 서비스별 비용·기간·보증 조건은 확인 중입니다.'],
];

// company comes from content.json (see loadCompany in components/utils.mjs).
export const createSupportPage = (company) => ({
  file: 'support.html',
  title: '고객지원 | 명정보기술',
  eyebrow: 'HERE TO HELP',
  description: '필요한 분야와 현재 상황을 정리해 주세요. 상담 창구와 의뢰 전 준비 사항을 안내합니다.',
  body: `<section class="section"><div class="container split support-grid"><div><span class="eyebrow">CONTACT MYUNG</span><h2>무엇을 도와드릴까요?</h2><p class="lead">실제 상담은 아래 대표번호로 문의해 주세요.</p><a class="phone" href="tel:${esc(company.phone)}">${esc(company.phone)}</a><p>${esc(company.hours)}</p><dl class="fact-list"><div><dt>본사</dt><dd>${esc(company.address)}</dd></div><div><dt>방문 안내</dt><dd>담당 부서와 접수 가능 장소를 전화로 먼저 확인해 주세요.</dd></div></dl><p class="note">비용·기간·지원 조건은 대상과 범위 확인 후 안내합니다.</p></div>${inquiryForm()}</div></section><section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">BEFORE YOU CONTACT US</span><h2>상담 전, 이렇게 준비하세요.</h2></div><div class="grid grid-3">${preparation.map(articleCard).join('')}</div>${faq(questions)}</div></section>`,
});
