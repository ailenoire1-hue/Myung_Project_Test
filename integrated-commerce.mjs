// 명정보 통합 홈페이지 시안 - 제품/수리/복구 페이지 데이터 (시안용, 확인 전 정보 포함)
const TBD = '정보 확인 중';

import { faq } from './source-code/components/faq.mjs';
import { articleCard, productCard } from './source-code/components/card.mjs';

const products = [
  ['pc', 'PC·워크스테이션', '업무용 PC와 워크스테이션 분류입니다. 구성·모델 정보는 확인 중입니다.'],
  ['pc', '노트북·모바일 PC', '이동 업무용 장비 분류입니다. 제공 품목은 확인 중입니다.'],
  ['storage', '외장 저장장치', 'HDD·SSD 등 외장 저장장치 분류입니다. 모델·용량 정보는 확인 중입니다.'],
  ['storage', '내장 SSD·HDD', '장비 증설·교체용 저장장치 분류입니다. 취급 품목은 확인 중입니다.'],
  ['nas', '소규모 사무실 NAS', '파일 공유와 백업을 위한 NAS 분류입니다. 모델·구성은 확인 중입니다.'],
  ['nas', '백업·보관 솔루션', '데이터 보관과 백업 운영을 위한 분류입니다. 상세 구성은 확인 중입니다.'],
];
const catLabel = { pc: 'PC', storage: '저장장치', nas: 'NAS' };

const productCards = products
  .map(([c, name, desc]) =>
    productCard({
      category: c,
      categoryLabel: catLabel[c],
      name,
      description: desc,
      noteHtml: `모델·가격·사양: ${TBD}`,
      image: { src: '../assets/company.jpg', alt: '시안용 이미지 (실제 제품 사진 아님)' },
      href: 'product-detail.html',
    })
  )
  .join('');

const cards = (items) => items.map(([tag, title, text]) => articleCard({ tag, title, text })).join('\n      ');

const productsBody = `
<section class="section">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow">PRODUCT CATEGORIES</span>
      <h2>업무 환경에 맞는 제품 분류</h2>
      <p class="lead">PC, 저장장치, NAS 분류로 먼저 살펴보세요. 이 페이지는 시안이며 개별 제품 정보는 확정 전입니다.</p>
    </div>
    <div class="filters" role="group" aria-label="제품 분류 필터">
      <button class="button" type="button" data-filter="all" aria-pressed="true">전체</button>
      <button class="button-secondary" type="button" data-filter="pc" aria-pressed="false">PC</button>
      <button class="button-secondary" type="button" data-filter="storage" aria-pressed="false">저장장치</button>
      <button class="button-secondary" type="button" data-filter="nas" aria-pressed="false">NAS</button>
    </div>
    <div class="grid grid-3">${productCards}</div>
    <p class="note">카드의 이미지는 시안용 일반 이미지이며 실제 제품 사진이 아닙니다. 모델·가격·재고·사양은 확정 전입니다.</p>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <span class="eyebrow">HOW TO CHOOSE</span>
      <h2>선택 전 확인할 사항</h2>
      <ul class="checklist">
        <li>사용 목적(문서 업무, 대용량 자료 보관, 공유 등)</li>
        <li>보관할 자료의 양과 중요도</li>
        <li>백업 방식과 운영 담당자</li>
        <li>기존 장비와의 연결 환경</li>
      </ul>
      <p><a class="button" href="support.html">제품 상담 문의</a></p>
    </div>
    <div class="photo"><img src="../assets/company.jpg" alt="명정보기술 시안용 이미지"></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">FAQ</span><h2>자주 묻는 질문</h2></div>
    ${faq([
      ['제품 가격과 사양은 어디서 확인하나요?', '현재 시안에는 확정된 가격과 사양이 없습니다. 정보는 확정 전이며, 우선 <a class="text-link" href="support.html">고객지원</a>으로 문의해 주세요.'],
      ['NAS와 외장 저장장치는 어떻게 다른가요?', '일반적으로 NAS는 네트워크로 여러 사용자가 자료를 공유하는 용도, 외장 저장장치는 개인 단위 보관·이동 용도로 쓰입니다. 환경에 맞는 구성은 상담으로 확인해 주세요.'],
      ['장비에 문제가 생기면 어떻게 하나요?', '<a class="text-link" href="repair.html">장비 수리</a> 또는 <a class="text-link" href="recovery.html">데이터 복구</a> 안내를 먼저 확인해 주세요.'],
    ])}
  </div>
</section>`;

const detailBody = `
<section class="section">
  <div class="container split">
    <div>
      <span class="tag">분류 확인 중</span>
      <h2>제품 상세 (시안)</h2>
      <p class="lead">개별 제품 상세 템플릿입니다. 실제 모델명, 가격, 사양은 확인되지 않아 표시하지 않았습니다.</p>
      <p><a class="button" href="support.html">이 제품 문의하기</a> <a class="button-secondary" href="products.html">목록으로</a></p>
    </div>
    <div class="photo"><img src="../assets/company.jpg" alt="시안용 이미지 (실제 제품 사진 아님)"></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">SPECIFICATIONS</span><h2>제품 정보</h2></div>
    <table class="specs">
      <tbody>
        <tr><th>모델명</th><td>${TBD}</td></tr>
        <tr><th>분류</th><td>PC / 저장장치 / NAS 중 확인 중</td></tr>
        <tr><th>주요 사양</th><td>${TBD}</td></tr>
        <tr><th>용량·성능</th><td>${TBD}</td></tr>
        <tr><th>가격</th><td>${TBD}</td></tr>
        <tr><th>재고·납기</th><td>${TBD}</td></tr>
        <tr><th>보증·지원</th><td>${TBD}</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">PURCHASE FLOW</span><h2>문의부터 도입까지</h2></div>
    <div class="steps">
      <div class="step"><h3>1. 문의</h3><p>사용 목적과 환경을 알려 주세요.</p></div>
      <div class="step"><h3>2. 확인</h3><p>필요 조건과 제공 가능 여부를 확인합니다.</p></div>
      <div class="step"><h3>3. 안내</h3><p>확인된 정보에 한해 상세 내용을 안내합니다.</p></div>
      <div class="step"><h3>4. 도입 후 지원</h3><p>운영 중 문의는 고객지원으로 연결됩니다.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">FAQ</span><h2>제품 상세 FAQ</h2></div>
    ${faq([
      ['이 페이지의 정보는 실제 제품인가요?', '아니요. 구조를 보여 주는 시안이며 확정되지 않은 항목은 "정보 확인 중"으로 표시했습니다.'],
      ['문의는 어디로 하나요?', '<a class="text-link" href="support.html">고객지원</a> 페이지에서 안내하는 방법을 이용해 주세요.'],
      ['이미 사용 중인 장비의 데이터가 걱정됩니다.', '<a class="text-link" href="recovery.html">데이터 복구</a> 안내를 확인하고, 장비 사용은 가급적 멈춘 뒤 문의해 주세요.'],
    ])}
  </div>
</section>`;

const repairBody = `
<section class="section">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow">REPAIR SERVICE</span>
      <h2>장비 증상부터 차분히 확인합니다</h2>
      <p class="lead">PC·저장장치·NAS 등 장비 문제의 접수와 점검 흐름을 안내합니다. 수리 가능 여부, 비용, 소요 기간은 장비 상태 확인 후 별도로 안내하며 이 페이지에서 확정하지 않습니다.</p>
    </div>
    <div class="grid grid-3">
      ${cards([
        ['PC', 'PC·노트북 점검', '부팅, 성능, 하드웨어 이상 증상을 점검합니다.'],
        ['저장장치', '저장장치 점검', '인식 불가, 속도 저하 등 증상을 확인합니다.'],
        ['NAS', 'NAS 점검', '접속·디스크 상태 이상 등을 확인합니다.'],
      ])}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">PROCESS</span><h2>접수에서 안내까지</h2></div>
    <div class="steps">
      <div class="step"><h3>1. 증상 접수</h3><p>증상과 사용 이력을 알려 주세요.</p></div>
      <div class="step"><h3>2. 상태 확인</h3><p>장비 상태를 점검합니다.</p></div>
      <div class="step"><h3>3. 결과 안내</h3><p>확인된 내용을 설명드립니다.</p></div>
      <div class="step"><h3>4. 진행 협의</h3><p>고객 동의 후 다음 단계를 진행합니다.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <h2>접수 전 준비</h2>
      <ul class="checklist">
        <li>증상이 나타난 시점과 상황 메모</li>
        <li>중요 자료 유무 확인</li>
        <li>가능하면 추가 사용을 중단</li>
        <li>연결 장비·어댑터 등 구성품 확인</li>
      </ul>
      <p class="note">자료가 중요하다면 수리보다 먼저 <a class="text-link" href="recovery.html">데이터 복구</a> 안내를 확인해 주세요.</p>
    </div>
    <div class="photo"><img src="../assets/company.jpg" alt="시안용 이미지"></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">FAQ</span><h2>자주 묻는 질문</h2></div>
    ${faq([
      ['수리 비용과 기간은 얼마인가요?', '장비 상태에 따라 달라지므로 이 페이지에서는 안내하지 않습니다. 확인 후 별도로 안내드립니다.'],
      ['모든 장비가 수리되나요?', '장비 상태 확인 전에는 가능 여부를 말씀드릴 수 없습니다.'],
      ['어디로 문의하나요?', '<a class="text-link" href="support.html">고객지원</a>에서 문의 방법을 확인해 주세요. 제품 정보는 <a class="text-link" href="products.html">제품</a> 페이지를 참고하세요.'],
    ])}
    <p><a class="button" href="support.html">수리 문의</a> <a class="button-secondary" href="recovery.html">데이터 복구 안내</a></p>
  </div>
</section>`;

const recoveryBody = `
<section class="section">
  <div class="container">
    <div class="section-heading">
      <span class="eyebrow">DATA RECOVERY</span>
      <h2>소중한 자료, 먼저 멈추고 상담하세요</h2>
      <p class="lead">저장장치·PC·NAS의 데이터 접근 문제에 대한 접수 흐름을 안내합니다. 복구 가능 여부, 범위, 비용, 소요 기간은 장비 상태 확인 후 안내하며 결과를 사전에 보장하지 않습니다.</p>
    </div>
    <div class="grid grid-3">
      ${cards([
        ['저장장치', '외장·내장 저장장치', '인식 불가, 접근 오류 등 증상을 확인합니다.'],
        ['PC', 'PC·노트북', '부팅되지 않는 장비의 자료 접근 문제를 살펴봅니다.'],
        ['NAS', 'NAS·다중 디스크', '디스크 구성과 오류 상태를 확인합니다.'],
      ])}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">PROCESS</span><h2>접수 흐름</h2></div>
    <div class="steps">
      <div class="step"><h3>1. 사용 중단</h3><p>추가 쓰기·재설치·초기화를 피해 주세요.</p></div>
      <div class="step"><h3>2. 상담 접수</h3><p>증상과 필요한 자료를 알려 주세요.</p></div>
      <div class="step"><h3>3. 상태 확인</h3><p>장비 상태를 점검합니다.</p></div>
      <div class="step"><h3>4. 결과 안내</h3><p>확인된 내용에 따라 진행 여부를 협의합니다.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <h2>꼭 기억해 주세요</h2>
      <ul class="checklist">
        <li>이상 증상 후 전원을 반복해서 켜고 끄지 않기</li>
        <li>장비를 임의로 분해하지 않기</li>
        <li>복구 대상 자료의 종류와 중요도 정리</li>
      </ul>
      <p class="note">자료의 법적 증거 보전이 필요한 경우에는 <a class="text-link" href="forensics.html">디지털포렌식</a> 안내를 먼저 확인해 주세요.</p>
    </div>
    <div class="photo"><img src="../assets/forensics.jpg" alt="디지털포렌식 관련 시안용 이미지"></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading"><span class="eyebrow">FAQ</span><h2>자주 묻는 질문</h2></div>
    ${faq([
      ['복구가 반드시 되나요?', '장비와 자료의 상태에 따라 달라지며, 사전에 결과를 보장할 수 없습니다. 상태 확인 후 확인된 내용을 안내드립니다.'],
      ['비용은 어떻게 되나요?', '이 페이지에서는 비용을 안내하지 않습니다. 상태 확인 후 별도로 안내드립니다.'],
      ['먼저 무엇을 해야 하나요?', '장비 사용을 멈추고 <a class="text-link" href="support.html">고객지원</a>으로 문의해 주세요. 장비 고장 점검은 <a class="text-link" href="repair.html">수리</a> 안내를 참고하세요.'],
    ])}
    <p><a class="button" href="support.html">복구 상담 문의</a> <a class="button-secondary" href="products.html">백업용 제품 보기</a></p>
  </div>
</section>`;

export const pages = [
  { file: 'products.html', title: '제품', eyebrow: 'PRODUCTS', description: 'PC, 저장장치, NAS 분류별 제품 안내 시안입니다. 개별 정보는 확인 중입니다.', body: productsBody },
  { file: 'product-detail.html', title: '제품 상세', eyebrow: 'PRODUCT DETAIL', description: '제품 상세 페이지 시안입니다. 모델·가격·사양은 정보 확인 중입니다.', body: detailBody },
  { file: 'repair.html', title: '장비 수리', eyebrow: 'REPAIR', description: 'PC·저장장치·NAS 장비 점검 및 접수 흐름을 안내합니다.', body: repairBody },
  { file: 'recovery.html', title: '데이터 복구', eyebrow: 'RECOVERY', description: '데이터 접근 문제 상담 접수 흐름을 안내합니다. 결과는 보장하지 않습니다.', body: recoveryBody },
];
