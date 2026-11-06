> **경로 갱신 (2026-11-06):** 아래의 `source-code/components`, `source-code/pages`는 현재 `source-code/` 안의 `components/`, `pages/`이며 진입점 `integrated-site.mjs`, `integrated-commerce.mjs`, `integrated-expertise.mjs`, `integrated-site.js/.css`도 `source-code/`에 있다. import는 `./components/...`, `./pages/...`이다. 프로젝트 루트 탐색은 `source-code/`(`package.json`과 `content.json` 위치)에서 멈추므로 출력은 `source-code/dist/integrated/`다. 실행은 `cd source-code` 후 `node integrated-site.mjs`다.

# 통합 홈페이지 컴포넌트화 완료 기록

기준 커밋 `570ceab`(통합 시안 완성)을 `--ff-only`로 가져온 뒤 규칙 커밋 `178d227`을 cherry-pick하고 작업했다. 스타일·문구·링크·이미지 경로·DOM 클래스/ID/data 속성·파일명은 변경하지 않았다. 브랜드와 상담번호는 별도 기획 사항이라 그대로 두었다.

## 폴더 구조

```text
integrated-site.mjs            진입점: 페이지 조립, pages / writeIntegratedSite() export, 직접 실행
integrated-site.js / .css      classic defer 스크립트(초기화 함수 분리) / 스타일(변경 없음)
integrated-commerce.mjs        제품·상세·수리·복구 페이지 (공통 faq/card 사용)
integrated-expertise.mjs       회사·포렌식·보안 페이지 (공통 esc/faq 사용)
source-code/
├── components/
│   ├── utils.mjs        esc(), projectRoot, rootUrl(), loadCompany()
│   ├── routes.mjs       routes / footerRoutes (내비게이션 데이터 단일 원본)
│   ├── brand.mjs        brand()
│   ├── navigation.mjs   mainNav(currentFile), footerNav()
│   ├── header.mjs       skipLink(), topbar(), siteHeader(currentFile)
│   ├── page-hero.mjs    pageHero({eyebrow,title,description})
│   ├── cta.mjs          contactBand()
│   ├── footer.mjs       siteFooter(company, year?)
│   ├── card.mjs         articleCard(), serviceCard(), productCard()
│   ├── faq.mjs          faq(items, {cardItems, openFirst})
│   ├── inquiry-form.mjs inquiryForm()
│   ├── payment-demo.mjs paymentDemo()
│   └── document.mjs     renderDocument(page, company)
└── pages/
    ├── home.mjs         homePage
    └── support.mjs      createSupportPage(company)
```

## API

모든 컴포넌트는 HTML 문자열을 반환하는 ESM 함수다. 프레임워크나 패키지 설치는 없다.

- `pages`: `[homePage, ...expertise, ...commerce, supportPage]`, 항목은 `{file,title,eyebrow,description,body}`.
- `writeIntegratedSite()`: `dist/integrated/`에 CSS/JS를 복사하고 9개 HTML을 쓴다. `node integrated-site.mjs`로 직접 실행하거나 `build.mjs`가 호출한다.
- `renderDocument(page, company)`: head, 건너뛰기 링크, 상단바, 헤더, 페이지 히어로(홈 제외), 본문, 결제 시연(`product-detail.html`만), CTA, 푸터를 조립한다.
- 프로젝트 루트는 `utils.mjs`가 위로 올라가며 `package.json`과 `content.json`이 모두 있는 폴더로 찾는다. `content.json`과 출력 경로는 모두 이 루트 기준이며 `source-code/` 위치나 실행 디렉터리와 무관하다.

## 소비 현황

| 컴포넌트 | 사용처 |
| --- | --- |
| serviceCard | 홈 서비스 6개 |
| articleCard | 고객지원 준비 카드, 수리·복구 카드 |
| productCard | 제품 목록 6개 |
| faq | 고객지원, 제품, 제품 상세, 수리, 복구, 포렌식(cardItems+openFirst), 보안(cardItems+openFirst) |
| inquiryForm | 고객지원 |
| paymentDemo | 제품 상세(`document.mjs`) |
| esc | 모든 컴포넌트와 expertise |

회사 소개·포렌식·보안의 고유한 대형 카드/섹션은 일회성 편집 콘텐츠라 기존 본문에 남겼다.

## 데이터/HTML 이스케이프 경계

- 일반 텍스트 인자(`title`, `text`, `tag`, `question`, `label`, 회사 정보 등)는 컴포넌트 안에서 `esc()`로 이스케이프한다.
- 이름이 `Html`로 끝나는 인자(`answerHtml`, `noteHtml`)와 FAQ의 답변, 페이지 `body`는 개발자가 작성한 신뢰된 마크업이며 이스케이프하지 않는다. 여기에 사용자 입력이나 외부 데이터를 넣지 않는다.
- 외부 데이터(`content.json`, `company-data.mjs`)는 반드시 `esc()`를 거친 뒤 `body`에 넣는다.

## 새 페이지/컴포넌트 추가

1. 컴포넌트: `source-code/components/<name>.mjs`에 문자열 반환 함수를 export하고, 텍스트는 `esc()`로 감싼다. 한두 줄짜리 파일을 늘리지 말고 실제로 두 곳 이상 쓰이거나 의미 있는 UI 단위일 때만 분리한다.
2. 페이지: `source-code/pages/<name>.mjs`(또는 기존 `integrated-*.mjs`)에서 `{file,title,eyebrow,description,body}`를 export한다. 회사 정보가 필요하면 `createXxxPage(company)` 형태로 만든다.
3. 등록: `integrated-site.mjs`의 `pages` 배열에 추가한다. 메뉴에 노출하려면 `routes.mjs`에 `[file,label]`을 추가한다(헤더/푸터가 함께 갱신된다).
4. 상호작용이 필요하면 `integrated-site.js`에 `initXxx()`를 만들고 맨 아래에서 호출한다. 요소가 없으면 즉시 return한다.
5. `node integrated-site.mjs` 후 생성물을 확인하고 이 문서를 갱신한다.

## JS 초기화

`integrated-site.js`는 classic `defer`로 로드하며 `initMenu()`, `initProductFilters()`, `initInquiryDemo()`, `initPaymentDemo()`를 차례로 호출한다. 각 함수는 해당 요소가 없으면 아무 일도 하지 않는다. 동작(메뉴 토글·Escape 포커스 복원, 필터 `aria-pressed`와 상태 문구, 문의 유효성/초기화, 결제 `dialog` 시연)은 기존과 같다.

## 검증 결과

실행 환경은 PATH에 Node가 없어 Orca 내장 Node v24.22.1(`ELECTRON_RUN_AS_NODE=1`)을 사용했다.

- 리팩터 전 `node integrated-site.mjs` 결과 9개 HTML과 CSS를 임시 위치에 보관한 뒤 리팩터 빌드와 비교했다.
  - 7개 HTML(`index`, `company`, `products`, `product-detail`, `repair`, `recovery`, `support`)과 CSS는 바이트 단위로 동일하다.
  - `forensics.html`과 `security.html`은 FAQ를 공통 `faq()`로 옮기며 태그 사이 줄바꿈·들여쓰기만 달라졌다. 태그 사이 공백을 제거해 비교하면 동일하다(렌더링 영향 없음).
- 15개 `source-code/**/*.mjs` 모듈 import 성공, `pages` 9개 확인.
- `integrated-site.js`는 모의 DOM으로 (a) 요소가 없는 페이지에서 오류 없음, (b) 메뉴 토글(`aria-expanded` true, 텍스트 `닫기`, 버튼 표시), (c) 제품 필터(PC 선택 시 NAS 카드 숨김)를 확인했다. 실제 브라우저 상호작용 검증은 하지 않았다.
- `source-code/`에서 `../integrated-site.mjs`를 실행해도 출력은 프로젝트 루트의 `dist/integrated/`에 생성된다.
- `build.mjs` 전체 빌드가 성공했다. 전체 빌드가 다시 쓴 통합 외 기존 dist 파일은 원복했다.

## 남은 사항

- 실제 브라우저(PC/모바일) 상호작용 검증은 PM 통합 검증에서 수행해야 한다.
- `dist/integrated/*.html`은 이전 커밋의 줄바꿈 형태와 달라 줄바꿈 차이가 diff에 보일 수 있다. 내용은 위 비교대로 동일하다.
- 상담번호 `1577-4872`는 JS의 시연 문구에 남아 있다. 브랜드/상담번호는 별도 기획 사항이므로 변경하지 않았다.
