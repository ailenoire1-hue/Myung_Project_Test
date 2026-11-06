// Integrated homepage expertise pages: company.html, forensics.html, security.html
// Based on verified facts in content.json and company-facts.mjs; unverified details are marked as placeholders.
import { companyHistory, companyBranches } from './company-data.mjs';

const esc = (v) => String(v).replace(/[&<>"']/g, (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
const historyItems = companyHistory
  .filter((h) => ['1990', '1993', '2003', '2006', '2010', '2013', '2014', '2019', '2023', '2024'].includes(h.year))
  .sort((a, b) => Number(a.year) - Number(b.year))
  .map((h) => `<li class="step"><span class="tag">${esc(h.year)}</span><h3>${esc(h.items[0])}</h3>${h.items.slice(1).map((i) => `<p>${esc(i)}</p>`).join('')}</li>`)
  .join('');
const branchRows = companyBranches
  .map((b) => `<tr><th scope="row">${esc(b.name)}</th><td>${esc(b.new_addr)}</td><td>${esc(b.tel)}</td></tr>`)
  .join('');

export const pages = [
  {
    file: 'company.html',
    title: '회사 소개 | (주)명정보기술 · 명디지털포렌식센터',
    eyebrow: 'COMPANY OVERVIEW · MYUNG INFORMATION TECHNOLOGY',
    description: '1990년 설립된 (주)명정보기술의 기업 역사와 주요 사업 분야, 오창 본사 및 9개 거점 시설, 명디지털포렌식센터 상담 창구 정보를 안내합니다.',
    body: `
<section class="section">
  <div class="container">
    <div class="split">
      <div>
        <div class="section-heading">
          <p class="eyebrow">CORPORATE PROFILE · SINCE 1990</p>
          <h2>1990년 설립 이래 데이터와 디지털 증거 기술에 집중해 온 (주)명정보기술</h2>
          <p class="lead">(주)명정보기술은 1990년 6월 20일 설립되어 2026년 기준 36년의 업력을 이어온 데이터·디지털 분석 전문 법인이며, 전문 분석·조사 창구인 명디지털포렌식센터(MYUNG DIGITAL FORENSIC CENTER)를 운영하고 있습니다.</p>
        </div>
        <div class="grid grid-2">
          <article class="card">
            <span class="tag">설립 및 업력</span>
            <h3>1990년 설립 · 36년 업력</h3>
            <p>1990. 6. 20 설립 이후 2026년 기준 36년간 축적된 현장 경험을 바탕으로 기업과 기관, 개인 고객의 데이터 및 디지털 기록 관련 업무를 수행합니다.</p>
          </article>
          <article class="card">
            <span class="tag">누적 수행 규모</span>
            <h3>누적 사고조사·복구 200,000건</h3>
            <p>2026년 기준 누적 사고조사·복구 200,000건(개별 고객 수가 아닌 사고조사 및 복구 수행 합산 기준)과 9개 거점 네트워크를 운영하고 있습니다.</p>
          </article>
        </div>
        <p class="note">안내: 본 페이지의 기업 기본 정보와 주요 지표는 확인된 자료만 반영했으며, 확인되지 않은 세부 사항은 임시 문구로 표기했습니다. 이 페이지는 시안입니다.</p>
      </div>
      <figure class="photo">
        <img src="../assets/company.jpg" alt="시안용 업무 이미지 (실제 현장 사진 아님)" />
      </figure>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">HISTORY &amp; MILESTONES</p>
      <h2>기업 역사 및 주요 연혁</h2>
      <p class="lead">1990년 창립부터 2026년 현재까지 이어온 주요 발자취와 공식 확인 지표입니다.</p>
    </div>
    <ol class="steps">${historyItems}</ol>
    <p class="note">주요 연혁 중 일부를 발췌했습니다. 2026년 기준 업력 36년, 누적 사고조사·복구 200,000건(개별 고객 수가 아닌 합산 기준), 9개 거점입니다.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">BUSINESS DOMAINS</p>
      <h2>주요 사업 분야 안내</h2>
      <p class="lead">(주)명정보기술 통합 홈페이지는 하드웨어·장비 공급과 수리, 데이터 복구부터 디지털포렌식, 침해사고 조사 및 기업 보안 관리까지 유기적으로 연결된 기술 영역을 다룹니다.</p>
    </div>
    <div class="grid grid-3">
      <article class="card">
        <span class="tag">CORE 01</span>
        <h3>디지털포렌식 서비스</h3>
        <p>PC·저장매체, 스마트폰, 메신저와 음성·영상 기록을 분석해 사건과 관련된 사실관계를 확인합니다.</p>
        <p><a class="text-link" href="forensics.html">디지털포렌식 자세히 보기</a></p>
      </article>
      <article class="card">
        <span class="tag">CORE 02</span>
        <h3>침해사고 조사 · 기업 보안 관리</h3>
        <p>랜섬웨어, 해킹·악성코드, 개인정보 사고 조사와 원격 보안 점검, 퇴사자 관리, 보안 인프라 구축을 지원합니다.</p>
        <p><a class="text-link" href="security.html">보안·침해사고 조사 보기</a></p>
      </article>
      <article class="card">
        <span class="tag">CORE 03</span>
        <h3>데이터 복구 서비스</h3>
        <p>저장매체 및 업무 시스템의 손상·삭제 상황에서 데이터 복구 가능성을 진단하고 복구 절차를 진행합니다.</p>
        <p><a class="text-link" href="recovery.html">데이터 복구 안내 보기</a></p>
      </article>
      <article class="card">
        <span class="tag">CORE 04</span>
        <h3>전문 수리 서비스</h3>
        <p>산업·기업 환경의 장비 및 부품 이상 상태를 점검하고 수리 절차를 안내합니다.</p>
        <p><a class="text-link" href="repair.html">수리 서비스 보기</a></p>
      </article>
      <article class="card">
        <span class="tag">CORE 05</span>
        <h3>제품 및 솔루션 안내</h3>
        <p>기업 운영과 데이터 관리, 분석 환경에 필요한 제품 및 장비 구성을 소개합니다.</p>
        <p><a class="text-link" href="products.html">제품 안내 보기</a></p>
      </article>
      <article class="card">
        <span class="tag">CORE 06</span>
        <h3>고객 상담 및 기술 지원</h3>
        <p>의뢰 전 준비 사항과 접수 절차, 상담 방법을 고객 지원 창구에서 안내합니다.</p>
        <p><a class="text-link" href="support.html">고객 지원 바로가기</a></p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">FACILITIES &amp; NETWORK</p>
      <h2>시설 및 9개 거점 운영 현황</h2>
      <p class="lead">충북 청주 오창 본사와 전국 거점의 주소와 전화번호를 안내합니다.</p>
    </div>
    <div class="split">
      <article class="card">
        <div class="card-media">
          <img src="../assets/company/hq-building.png" alt="충북 청주 오창 (주)명정보기술 본사 전경" />
        </div>
        <span class="tag">HEADQUARTERS</span>
        <h3>청주 오창 본사</h3>
        <p>본사는 충북 청주시 청원구 오창읍 과학산업3로 168에 있으며, 2003년 오창과학산업단지 사옥 이전과 함께 클린룸 시설을 운영해 왔습니다. 클린룸 등급과 보유 장비 등 세부 정보는 확인 중입니다.</p>
      </article>
      <div>
        <table class="specs branches">
          <caption>전국 9개 거점 (2026년 기준)</caption>
          <thead><tr><th scope="col">거점</th><th scope="col">주소</th><th scope="col">전화</th></tr></thead>
          <tbody>${branchRows}</tbody>
        </table>
        <p class="note">방문 전에는 대표 상담 창구(1577-4872)로 대상 기기와 방문 가능 여부를 먼저 확인해 주세요.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">CORPORATE REGISTRATION VS. CONSULTATION DESK</p>
      <h2>법인·본사 기본 정보와 센터 상담 연락처 구분 안내</h2>
      <p class="lead">행정·계약 기준의 법인(본사) 정보와 서비스 의뢰·상담을 위한 센터 연락처는 역할이 구분되어 있으니 용도에 맞게 확인해 주십시오.</p>
    </div>
    <div class="grid grid-2">
      <article class="card">
        <span class="tag">법인 · 본사 행정 정보</span>
        <h3>(주)명정보기술 (법인 및 본사)</h3>
        <dl class="fact-list">
          <div>
            <dt>법인명 (상호)</dt>
            <dd>(주)명정보기술</dd>
          </div>
          <div>
            <dt>대표이사</dt>
            <dd>이명재</dd>
          </div>
          <div>
            <dt>사업자등록번호</dt>
            <dd>315-81-04436</dd>
          </div>
          <div>
            <dt>설립일</dt>
            <dd>1990. 6. 20</dd>
          </div>
          <div>
            <dt>본사 주소</dt>
            <dd>충북 청주시 청원구 오창읍 과학산업3로 168</dd>
          </div>
        </dl>
      </article>
      <article class="card">
        <span class="tag">센터 상담 · 접수 창구</span>
        <h3>명디지털포렌식센터 (상담 창구)</h3>
        <dl class="fact-list">
          <div>
            <dt>센터명</dt>
            <dd>명디지털포렌식센터 (MYUNG DIGITAL FORENSIC CENTER)</dd>
          </div>
          <div>
            <dt>센터 상담 대표번호</dt>
            <dd>1577-4872</dd>
          </div>
          <div>
            <dt>상담 운영 시간</dt>
            <dd>평일 09:00 – 18:00</dd>
          </div>
          <div>
            <dt>팩스 번호</dt>
            <dd>043-218-8408</dd>
          </div>
          <div>
            <dt>온라인 상담·접수 안내</dt>
            <dd><a class="text-link" href="support.html">고객 지원 페이지에서 접수 절차 확인</a></dd>
          </div>
        </dl>
      </article>
    </div>
    <p class="note">주의: 대표자(이명재)·사업자등록번호(315-81-04436)·본사 주소(충북 청주시 청원구 오창읍 과학산업3로 168)는 (주)명정보기술 법인 및 본사 기준 정보이며, 서비스 문의 및 사건 접수 상담은 명디지털포렌식센터 대표 상담번호(1577-4872, 평일 09:00 – 18:00)로 운영됩니다.</p>
    <div>
      <a class="button" href="support.html">상담 및 접수 안내 바로가기</a>
      <a class="button-secondary" href="index.html">통합 메인으로 이동</a>
    </div>
  </div>
</section>
`
  },
  {
    file: 'forensics.html',
    title: '디지털포렌식 서비스 | 명디지털포렌식센터 · (주)명정보기술',
    eyebrow: '01 · DIGITAL FORENSICS SERVICES',
    description: 'PC·저장매체, 스마트폰, 메신저·미디어, 음성·영상 기록을 분석해 사건과 관련된 사실관계를 확인하는 디지털포렌식 대상, 절차, 결과물 및 FAQ를 안내합니다.',
    body: `
<section class="section">
  <div class="container">
    <div class="split">
      <div>
        <div class="section-heading">
          <p class="eyebrow">01 · DIGITAL FORENSICS SERVICES</p>
          <h2>기록에 남은 흔적을, 사건의 근거로 연결합니다.</h2>
          <p class="lead">PC·저장매체, 스마트폰, 메신저와 음성·영상 기록을 분석해 사건과 관련된 사실관계를 확인합니다. 확인이 필요한 상황과 대상에 맞춰 자료의 수집·보존·분석 범위를 구성합니다.</p>
        </div>
        <ul class="checklist">
          <li>대상 기기 및 저장매체의 상태 진단과 수집 과정 기록</li>
          <li>파일·시스템·메신저·미디어 기록의 시간 흐름 및 교차 확인</li>
          <li>확인된 사실관계와 분석 한계, 후속 검토 사항의 명확한 구분 안내</li>
        </ul>
        <div>
          <a class="button" href="support.html">포렌식 상담 문의 (1577-4872)</a>
          <a class="button-secondary" href="security.html">침해사고 조사·보안 서비스 보기</a>
        </div>
      </div>
      <figure class="photo">
        <img src="../assets/forensics.jpg" alt="시안용 이미지 (실제 현장 사진 아님)" />
      </figure>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">FORENSIC TARGETS &amp; SCOPE</p>
      <h2>디지털포렌식 분석 대상</h2>
      <p class="lead">의뢰 목적과 확인하려는 쟁점에 따라 PC·저장매체부터 모바일 기기, 메신저 대화, 음성·영상 자료까지 대상별 기록을 살펴봅니다.</p>
    </div>
    <div class="grid grid-2">
      <article class="card">
        <span class="tag">PC &amp; STORAGE</span>
        <h3>PC·저장매체 포렌식</h3>
        <p>파일과 사용 기록에서 자료의 생성·이동·삭제 정황을 확인합니다.</p>
        <ul class="checklist">
          <li>문서 및 업무 파일의 열람·복사·이동·삭제 관련 시스템 흔적 확인</li>
          <li>외부 저장매체(USB·외장하드 등) 연결 이력 및 시간대 대조</li>
          <li>저장매체 상태 점검 및 분석 사본 기준의 기록 검토</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">MOBILE FORENSICS</span>
        <h3>스마트폰 포렌식</h3>
        <p>기기와 백업에 남은 사용자 기록을 분석합니다.</p>
        <ul class="checklist">
          <li>통화·문자·연락처·앱 활동 등 모바일 기기 내 사용자 기록 확인</li>
          <li>기기 내부 데이터와 백업 자료 간의 기록 비교 및 시점 확인</li>
          <li>수집 시점의 기기 상태 및 수집 범위 이력 기록</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">MESSAGES &amp; MEDIA</span>
        <h3>메신저·미디어 포렌식</h3>
        <p>대화의 맥락과 첨부파일, 출처를 함께 검토합니다.</p>
        <ul class="checklist">
          <li>메신저 대화방의 송수신 흐름, 참여자 정보 및 시간 순서 정리</li>
          <li>대화 내 공유된 문서·이미지·첨부파일의 연결 관계 확인</li>
          <li>원본·백업·캐시에 남은 관련 미디어 기록 대조</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">AUDIO &amp; VIDEO</span>
        <h3>음성·영상 분석</h3>
        <p>파일 구조와 시간 흐름, 생성·편집 정황을 살펴봅니다.</p>
        <ul class="checklist">
          <li>음성·녹음 및 영상 파일의 메타데이터와 파일 구조 확인</li>
          <li>기록된 시간 흐름과 파일 생성·변형·재저장 정황 검토</li>
          <li>재생 구간별 주요 기록 정리 및 원본 대조</li>
        </ul>
      </article>
    </div>
    <p class="note">기기의 물리적 손상이나 저장매체 인식 불량이 동반된 경우에는 <a class="text-link" href="recovery.html">데이터 복구 서비스</a>와 연계하여 매체 상태를 먼저 점검할 수 있습니다.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">ANALYSIS WORKFLOW</p>
      <h2>디지털포렌식 진행 절차</h2>
      <p class="lead">의뢰 권한 확인부터 자료 보존, 교차 분석, 결과 설명까지 4단계 절차로 투명하게 진행됩니다.</p>
    </div>
    <ol class="steps">
      <li class="step">
        <span class="tag">STEP 01</span>
        <h3>상담과 범위 확인</h3>
        <p>확인할 쟁점, 대상 기기와 자료, 의뢰 권한과 일정을 협의합니다.</p>
      </li>
      <li class="step">
        <span class="tag">STEP 02</span>
        <h3>자료 수집·보존</h3>
        <p>대상 상태를 확인하고 자료의 출처와 수집 과정을 기록합니다.</p>
      </li>
      <li class="step">
        <span class="tag">STEP 03</span>
        <h3>분석과 교차 확인</h3>
        <p>파일·사용 기록·로그를 비교해 주요 행위와 시간 흐름을 확인합니다.</p>
      </li>
      <li class="step">
        <span class="tag">STEP 04</span>
        <h3>결과 설명·후속 안내</h3>
        <p>확인된 사실, 분석의 한계와 추가 검토 사항을 함께 전달합니다.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">DELIVERABLES &amp; LIMITATIONS</p>
      <h2>제공 결과물 및 유의사항</h2>
      <p class="lead">협의된 분석 범위 내에서 객관적으로 확인된 기록과 근거 자료를 정리하여 전달합니다.</p>
    </div>
    <div class="grid grid-3">
      <article class="card">
        <span class="tag">DELIVERABLE 01</span>
        <h3>디지털포렌식 분석 보고서</h3>
        <p>분석 대상 기기 정보, 수집·보존 절차, 쟁점별 분석 결과와 확인된 사실관계를 정리한 문서를 제공합니다.</p>
      </article>
      <article class="card">
        <span class="tag">DELIVERABLE 02</span>
        <h3>사건 타임라인 및 기록 목록</h3>
        <p>관심 기간 내 파일 생성·이동·삭제, 기기 연결, 메시지 송수신 등 주요 이벤트의 시간 흐름과 관련 증거 목록을 정리합니다.</p>
      </article>
      <article class="card">
        <span class="tag">DELIVERABLE 03</span>
        <h3>확보 자료 및 한계 안내</h3>
        <p>분석 과정에서 확보된 대상 파일·대화 자료 사본과 함께, 기술적 한계로 확인되지 않은 범위 및 추가 검토 필요 사항을 구분해 안내합니다.</p>
      </article>
    </div>
    <p class="note">법적 효력 및 결과 관련 고지: 디지털포렌식 분석 결과는 분석 시점의 기기·자료 상태에서 확인된 기술적 사실을 정리한 것이며, 모든 삭제 자료의 복원이나 특정 결과 도출을 보장하지 않습니다. 또한 수사·재판 등 절차에서의 법적 증거 능력이나 채택 여부는 관할 기관의 판단 사항이며 당사가 법적 효력을 보장하지 않습니다. [임시 문구: 결과 보고서의 세부 양식 샘플 및 제출용 첨부 규격 안내는 추후 확인 후 반영 예정]</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
      <h2>디지털포렌식 자주 묻는 질문 (FAQ)</h2>
      <p class="lead">상담 및 의뢰 전에 자주 문의하시는 준비 사항과 분석 범위 기준입니다.</p>
    </div>
    <div class="faq">
      <details class="card" open>
        <summary>상담 전에 어떤 정보를 준비하면 되나요?</summary>
        <p>확인하려는 사건과 기간, 대상 기기의 종류, 현재 보관 상태를 알려주세요. 이미 확보한 자료가 있다면 자료의 종류와 수집 경위를 함께 전달해 주시면 범위를 정하는 데 도움이 됩니다.</p>
      </details>
      <details class="card">
        <summary>삭제된 자료도 분석할 수 있나요?</summary>
        <p>삭제 이후의 사용 상태, 저장매체 종류, 암호화 여부에 따라 분석 가능 범위가 달라집니다. 상담과 대상 확인을 통해 수집·복구 가능성을 검토하며, 모든 자료의 복구를 보장하지는 않습니다.</p>
      </details>
      <details class="card">
        <summary>분석 기간과 비용은 어떻게 정하나요?</summary>
        <p>기기 수, 데이터 용량, 확인할 쟁점, 자료 확보 방식에 따라 달라집니다. 상담 후 분석 범위와 예상 일정, 제공할 결과물을 기준으로 안내합니다.</p>
      </details>
      <details class="card">
        <summary>해킹이나 랜섬웨어 등 기업 보안 사고와 연관된 경우도 의뢰할 수 있나요?</summary>
        <p>가능합니다. 기기 단일 분석을 넘어 서버·네트워크·계정 로그 전반의 사고 경위 파악이 필요한 경우에는 <a class="text-link" href="security.html">침해사고 조사 및 기업 보안 관리</a> 절차와 연계하여 범위를 협의합니다.</p>
      </details>
    </div>
    <div>
      <a class="button" href="support.html">디지털포렌식 상담 신청</a>
      <a class="button-secondary" href="company.html">센터 및 회사 소개 보기</a>
    </div>
  </div>
</section>
`
  },
  {
    file: 'security.html',
    title: '침해사고 조사 · 기업 보안 관리 | 명디지털포렌식센터 · (주)명정보기술',
    eyebrow: '02 & 03 · INCIDENT INVESTIGATION & ENTERPRISE SECURITY',
    description: '랜섬웨어, 해킹·악성코드, 개인정보 침해사고 조사와 원격 보안 점검, 퇴사자 관리, 보안 솔루션, 서버·NAS·백업, 보안 인프라 구축 서비스의 영역, 진행절차 및 FAQ를 안내합니다.',
    body: `
<section class="section">
  <div class="container">
    <div class="split">
      <div>
        <div class="section-heading">
          <p class="eyebrow">02 &amp; 03 · INCIDENT RESPONSE &amp; ENTERPRISE SECURITY</p>
          <h2>사고의 원인을 밝히고, 업무 환경에 필요한 보안을 갖춥니다.</h2>
          <p class="lead">디지털 증거를 바탕으로 랜섬웨어·해킹·개인정보 침해사고의 경위와 영향을 조사하고, 원격 보안 점검과 퇴사자 관리부터 보안 솔루션, 서버·NAS·백업, 보안 인프라 구축까지 기업의 운영 환경에 맞는 보호 체계를 지원합니다.</p>
        </div>
        <div class="grid grid-2">
          <article class="card">
            <span class="tag">02 · INCIDENT INVESTIGATION</span>
            <h3>침해사고 조사</h3>
            <p>랜섬웨어, 해킹과 악성코드, 개인정보 사고의 시스템·로그 흔적을 분석해 침입 경로와 영향 범위를 파악합니다.</p>
          </article>
          <article class="card">
            <span class="tag">03 · ENTERPRISE SECURITY</span>
            <h3>기업 보안 관리 서비스</h3>
            <p>원격 보안 점검, 퇴사자 관리, 보안 솔루션, 서버·NAS·백업, 보안 인프라 구축으로 예방과 운영 체계를 다집니다.</p>
          </article>
        </div>
        <div>
          <a class="button" href="support.html">보안·침해사고 상담 문의 (1577-4872)</a>
          <a class="button-secondary" href="forensics.html">디지털포렌식 서비스 보기</a>
        </div>
      </div>
      <figure class="photo">
        <img src="../assets/investigation.jpg" alt="시안용 이미지 (실제 현장 사진 아님)" />
      </figure>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">02 · INCIDENT INVESTIGATION</p>
      <h2>침해사고 조사 영역</h2>
      <p class="lead">흩어진 시스템·계정·로그 기록을 연결해 사고의 원인을 밝히고 다음 대응과 재발 방지의 근거를 마련합니다.</p>
    </div>
    <div class="grid grid-3">
      <article class="card">
        <span class="tag">RANSOMWARE INVESTIGATION</span>
        <h3>랜섬웨어 사고조사</h3>
        <p>랜섬웨어 감염과 관련된 시스템 및 로그를 분석하여 침입 경로와 사고 범위를 파악합니다.</p>
        <ul class="checklist">
          <li>감염 경위 분석: 영향받은 기기·계정·공유 저장소 식별 및 자료 보존</li>
          <li>침입 경로 확인: VPN·인증·실행 기록과 파일 변형 흔적의 흐름 분석</li>
          <li>피해 범위 조사: 추가 확산 방지 및 복구 우선순위 판단 근거 정리</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">HACKING &amp; MALWARE INVESTIGATION</span>
        <h3>해킹, 악성코드 사고조사</h3>
        <p>해킹 흔적과 악성코드의 활동을 조사하고, 시스템에서 발생한 행위와 관련된 증거를 분석합니다.</p>
        <ul class="checklist">
          <li>시스템 로그: 방화벽·인증·시스템 로그의 시각·계정·IP·호스트 연관 분석</li>
          <li>악성코드 분석: 의심 파일과 프로세스 등 확보 자료의 악성 행위 확인</li>
          <li>행위 추적: 지속성·내부 확산·외부 전송 정황과 잔존 위험 검토</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">EMAIL &amp; PERSONAL DATA INVESTIGATION</span>
        <h3>이메일 등 개인정보 사고조사</h3>
        <p>이메일 및 개인정보와 관련된 사고의 경위를 살펴보고, 유출 정황과 영향 범위를 확인합니다.</p>
        <ul class="checklist">
          <li>이메일 분석: 의심 메일 원문, 로그인·인증 기록과 전달 규칙 대조</li>
          <li>유출 정황 확인: 권한 변경, 비정상 조회·다운로드·외부 전송 기록 검토</li>
          <li>영향 범위 조사: 확인된 사실과 미확인 범위를 구분한 대응 근거 정리</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div>
        <div class="section-heading">
          <p class="eyebrow">03 · ENTERPRISE SECURITY MANAGEMENT</p>
          <h2>기업 보안 관리 서비스 영역</h2>
          <p class="lead">사람과 기기, 데이터와 시스템을 하나의 보안 관점으로 살펴보고 기업의 운영 환경에 필요한 보호 체계를 구성합니다.</p>
        </div>
        <p class="note">안내: 보안 솔루션 및 서버·NAS·인프라 검토 시 특정 임의 제품 기능을 단정하지 않으며, 기업의 실제 운영 환경과 호환 조건을 기준으로 적용 범위를 협의합니다. 하드웨어·장비 정보는 <a class="text-link" href="products.html">제품 안내</a>에서도 확인하실 수 있습니다.</p>
      </div>
      <figure class="photo">
        <img src="../assets/company.jpg" alt="시안용 업무 이미지 (실제 현장 사진 아님)" />
      </figure>
    </div>
    <div class="grid grid-3">
      <article class="card">
        <span class="tag">REMOTE SECURITY ASSESSMENT</span>
        <h3>원격 보안 점검</h3>
        <p>원격으로 기업의 시스템 보안 상태를 점검하고, 확인이 필요한 위험 요소를 살펴봅니다.</p>
        <ul class="checklist">
          <li>원격 점검: 서버·네트워크·업무 시스템 설정 및 외부 노출 상태 확인</li>
          <li>보안 상태 확인: 계정 권한, 인증 정책, 로그 보관 및 백업 체계 검토</li>
          <li>위험 요소 파악: 취약 항목과 업무 영향을 고려한 개선 우선순위 정리</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">EMPLOYEE OFFBOARDING</span>
        <h3>퇴사자 관리</h3>
        <p>퇴사 과정에서 업무용 기기와 데이터의 상태를 확인하고, 기업 정보의 반출 여부를 점검합니다.</p>
        <ul class="checklist">
          <li>업무용 기기 점검: 반환 기기·계정·공유 자료 현황 확인 및 인계 설정</li>
          <li>데이터 보존: 필요한 업무 자료의 안전한 보존 및 접근권 회수 절차 점검</li>
          <li>정보 반출 확인: 승인된 범위 내 문서 접근·압축·외부 전송 정황 대조</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">SECURITY SOLUTIONS</span>
        <h3>보안 솔루션</h3>
        <p>기업의 시스템과 데이터를 보호하기 위한 보안 솔루션의 도입 및 활용 방향을 함께 검토합니다.</p>
        <ul class="checklist">
          <li>시스템 보호: 단말·서버·계정 등 주요 보호 대상 자산과 요구사항 정리</li>
          <li>데이터 보안: 접근 통제·위협 탐지·로그 관리 기능의 적용 방향 검토</li>
          <li>운영 환경 검토: 기존 시스템과의 연계 조건 및 담당자 운영 절차 협의</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">SERVER, NAS &amp; STORAGE</span>
        <h3>서버·NAS·백업</h3>
        <p>데이터 저장과 관리를 위한 서버 및 NAS 등 스토리지 구성을 기업의 사용 목적에 맞춰 검토합니다.</p>
        <ul class="checklist">
          <li>서버: 데이터 용도와 업무 특성에 맞는 서버·스토리지 구성 방향 검토</li>
          <li>NAS: 사용자·부서별 접근 권한과 안전한 자료 공유 환경 설계</li>
          <li>데이터 저장 및 관리: 백업 대상·주기·보관 위치 분리 및 복구 점검 절차 수립</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">SECURITY INFRASTRUCTURE</span>
        <h3>보안 인프라 구축</h3>
        <p>계정·네트워크·보안 로그를 연결하는 기업의 보호 체계를 구성합니다.</p>
        <ul class="checklist">
          <li>구축 설계: 자산과 접근 경로, 계정 권한을 검토한 보호 체계 설계</li>
          <li>보안 설정: 협의된 환경의 보안 정책 설정, 로그 수집 및 백업 연계 적용</li>
          <li>운영 인계: 적용 후 동작 점검과 구성 문서 정리, 운영 담당자 인계</li>
        </ul>
      </article>
      <article class="card">
        <span class="tag">INTEGRATED LINKAGE</span>
        <h3>포렌식·복구·수리 통합 연계</h3>
        <p>점검 및 사고 조사 중 정밀 증거 분석이나 손상 매체 복구, 장비 수리가 필요한 경우 전문 부서와 연계합니다.</p>
        <ul class="checklist">
          <li>정밀 증거 분석: <a class="text-link" href="forensics.html">디지털포렌식</a> 연계</li>
          <li>저장매체 복구: <a class="text-link" href="recovery.html">데이터 복구</a> 연계</li>
          <li>장비 점검·수리: <a class="text-link" href="repair.html">전문 수리</a> 연계</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">SERVICE PROCESS</p>
      <h2>침해사고 조사 및 기업 보안 관리 진행 절차</h2>
      <p class="lead">긴급 사고 대응을 위한 조사 절차와 예방·구축 중심의 기업 보안 관리 절차를 상황에 맞게 운영합니다.</p>
    </div>
    <div class="grid grid-2">
      <article class="card">
        <span class="tag">PROCESS A · 침해사고 조사 절차</span>
        <h3>사고 원인 규명 및 대응 우선순위 정리</h3>
        <ol class="process-list">
          <li>
            <strong>01. 상황 파악·범위 협의</strong>
            <p>발견 시점과 증상, 영향받은 업무와 시스템, 보존 자료를 확인합니다.</p>
          </li>
          <li>
            <strong>02. 자료 확보·사고 조사</strong>
            <p>협의한 대상의 로그와 시스템 흔적을 수집하고 시간 흐름을 분석합니다.</p>
          </li>
          <li>
            <strong>03. 영향 분석·대응 검토</strong>
            <p>침해 범위와 잔존 위험을 확인하고 조치·복구 우선순위를 검토합니다.</p>
          </li>
          <li>
            <strong>04. 결과 보고·개선 안내</strong>
            <p>사고 경위와 확인 근거, 재발 방지를 위한 개선 과제를 정리합니다.</p>
          </li>
        </ol>
      </article>
      <article class="card">
        <span class="tag">PROCESS B · 기업 보안 관리 절차</span>
        <h3>업무 환경 점검 및 보호 체계 구축·인계</h3>
        <ol class="process-list">
          <li>
            <strong>01. 업무·환경 확인</strong>
            <p>점검·관리·도입 목적, 대상 자산과 계정, 기존 운영 체계를 확인합니다.</p>
          </li>
          <li>
            <strong>02. 위험·요구사항 검토</strong>
            <p>자료 보존과 접근 범위, 보안 기능, 시스템 연계와 운영 영향을 검토합니다.</p>
          </li>
          <li>
            <strong>03. 수행 범위 협의</strong>
            <p>점검·분석·구축 일정과 제품 구성, 결과물·교육·지원 범위를 협의합니다.</p>
          </li>
          <li>
            <strong>04. 결과·운영 인계</strong>
            <p>확인 사항과 개선 우선순위, 권한·관리·백업 등 운영 절차를 안내합니다.</p>
          </li>
        </ol>
      </article>
    </div>
    <p class="note">[임시 문구: 기업 규모별 표준 점검 소요 기간 예시 및 세부 산출물 목차 양식은 공식 확인 자료 확정 후 반영 예정입니다.]</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
      <h2>침해사고 조사 · 기업 보안 관리 자주 묻는 질문 (FAQ)</h2>
      <p class="lead">사고 발생 시 초기 대응 방법과 기업 보안 관리 서비스 의뢰 기준에 대한 주요 안내입니다.</p>
    </div>
    <div class="faq">
      <details class="card" open>
        <summary>사고가 의심되면 어떤 정보를 먼저 알려야 하나요?</summary>
        <p>발견 시점과 증상, 영향을 받은 업무, 대상 기기·시스템, 현재까지 시행한 조치를 정리해 주세요. 관련 알림이나 오류 화면, 보존 중인 로그의 유무도 조사 범위를 판단하는 데 도움이 됩니다.</p>
      </details>
      <details class="card">
        <summary>랜섬웨어 조사를 의뢰하면 복호화도 가능한가요?</summary>
        <p>사고 조사는 감염 경위와 피해 범위를 확인하는 업무입니다. 데이터 복구나 복호화 가능성은 별도로 검토하며, 암호화 방식과 저장매체·백업 상태에 따라 결과가 달라집니다. 매체 복구 상담이 필요한 경우 <a class="text-link" href="recovery.html">데이터 복구</a>와 연계하여 확인합니다.</p>
      </details>
      <details class="card">
        <summary>기존 보안 담당자나 외부 운영사와 함께 진행할 수 있나요?</summary>
        <p>담당자와 자료 제공 범위, 접근 방식, 역할과 연락 체계를 협의해 진행합니다. 운영 중인 업무의 영향과 증거 보존을 함께 고려해 조사 순서를 정합니다.</p>
      </details>
      <details class="card">
        <summary>어떤 기업 보안 서비스가 필요한지 정하지 않아도 상담할 수 있나요?</summary>
        <p>가능합니다. 현재의 불편 사항, 점검할 기기·계정 또는 보호할 자료를 알려주시면 원격 점검·퇴사자 관리·솔루션·인프라 구축 가운데 필요한 범위를 함께 정리합니다.</p>
      </details>
      <details class="card">
        <summary>퇴사자 자료 점검은 어떻게 범위를 정하나요?</summary>
        <p>업무용 기기와 계정, 확인할 기간, 자료 보존·인계 목적과 의뢰 권한을 먼저 확인합니다. 협의한 범위에서 기록을 검토하며, 상세 증거 분석이 필요한 경우 <a class="text-link" href="forensics.html">디지털포렌식</a>과 연계합니다.</p>
      </details>
      <details class="card">
        <summary>NAS나 RAID를 구성하면 별도 백업이 필요 없나요?</summary>
        <p>저장장치 구성과 백업은 목적이 다릅니다. 삭제, 랜섬웨어, 장비 장애 등에 대비하려면 별도 사본의 보관 위치와 주기, 접근 권한, 복구 점검 절차를 함께 검토해야 합니다.</p>
      </details>
    </div>
    <div>
      <a class="button" href="support.html">보안·침해사고 상담 접수</a>
      <a class="button-secondary" href="company.html">회사 및 센터 안내 보기</a>
    </div>
  </div>
</section>
`
  }
];
