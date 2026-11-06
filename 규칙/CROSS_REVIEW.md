# 교차 검토 기록: integrated-commerce / integrated-expertise

검토일: 2026-11-06. 검토 세션: Claude(별도 워크트리 `myung-cross-review`). 대상: `integrated-commerce.mjs`(Claude 제출), `integrated-expertise.mjs`(Antigravity 제출). 제출자의 완료 보고는 검증 근거로 쓰지 않고 코드와 저장소 자료를 직접 대조했다.

## 사실 대조 근거
- `content.json`: 대표번호 1577-4872, 평일 09:00–18:00, 본사 주소, 사업자등록번호 315-81-04436, 대표 이명재, 팩스 043-218-8408, 설립일 1990. 6. 20 모두 일치.
- `company-facts.mjs`: 설립 1990, 36년, 누적 사고조사·복구 200,000건, 9개 거점 일치.
- 자산: 두 모듈이 참조하는 `dist/assets/` 이미지와 사이트 내 링크 대상이 모두 존재하거나 제출 페이지 목록에 있음(스크립트로 확인). `index.html`, `support.html`은 PM이 구현할 페이지로 아직 없음.

## 발견 및 수정
| 구분 | 문제 | 조치 |
| --- | --- | --- |
| expertise | 방문자 화면에 `content.json`, `company-facts.mjs`, `networkCount: 9`, `(support.html)` 등 내부 파일명·키 노출 | 제거, 링크 문구 정리 |
| expertise | 본사 사진 자리에 업무용 일반 사진(`company.jpg`)을 "오창 본사 전경"으로 표기 | 저장소의 실제 본사 사진 `company/hq-building.png`로 교체(기존 회사 페이지가 같은 사진을 사용) |
| expertise | 일반 사진에 "업무 환경" 등 실제 현장처럼 읽히는 alt | "시안용 이미지(실제 현장 사진 아님)"로 변경 |
| expertise | 근거 없는 서술: 설립으로 "기술 서비스 기반 마련", "통합 역량 구축"(연혁), 본사의 수행 기능, 9개 거점의 업무(접수·매체 인계 등), "방문·원격 상담" | 삭제하거나 "확인 중"으로 변경 |
| expertise | 보안 페이지 프로세스 카드 안에 `ol.steps` 중첩 → 모바일에서 카드 속 카드로 밀집 | `ol.process-list`(일반 목록)로 변경 |
| expertise | 명세 `dl`이 `.specs`를 사용해 commerce의 `table.specs`와 충돌 | `dl.fact-list`로 변경 |
| expertise | `button button-secondary` 조합이 commerce의 `button-secondary` 단독 사용과 불일치 | 단독 사용으로 통일 |
| commerce | "확인되는 대로 반영됩니다" 등 향후 반영 약속 | "확정 전입니다"로 완화 |
| commerce | 필터 버튼 상태 표시 없음 | `aria-pressed` 추가(JS가 토글해야 함) |

## 검증
- Orca 내장 Node(`ELECTRON_RUN_AS_NODE`)로 두 모듈을 import하여 7개 페이지 로드 확인.
- 스크립트로 `href`/`src` 전수 검사: 깨진 자산·링크 0건(`index.html`, `support.html` 제외), 주요 태그 열림·닫힘 수 일치, 화면에 노출되는 파일명 0건.
- 브라우저 렌더링, 모바일 실측, 공통 CSS 적용 상태는 공통 shell이 없어 확인하지 못했다.

## 남은 한계 및 PM 통합 시 조치
- 공통 shell이 정의해야 할 클래스: `.filters`(+`aria-pressed`로 활성 표시), `table.specs`, `dl.fact-list`, `ol.process-list`, `.faq details`, `.button-secondary`, `.photo`, `.card-media`.
- 제품 필터는 `data-filter`와 `data-product-category`를 연결하는 JS가 필요하다.
- 제품 목록·상세의 이미지는 모두 일반 시안 이미지이며 모델·가격·사양은 "정보 확인 중"이다. 시안임을 유지했다.
- 회사 소개의 연혁, 시설·클린룸 세부, 거점별 정보는 임시 문구로 남아 있다. 전체 연혁 자료는 `company-data.mjs`에 있어 PM이 채울 수 있다.
- 포렌식·보안 페이지의 서비스 절차와 FAQ는 `content.json`의 서비스 항목을 풀어 쓴 문안이며, 세부 절차·결과물 구성이 실제 운영과 같은지는 회사 확인이 필요하다.
- `index.html`, `support.html`은 PM 구현 전까지 링크가 끊긴다.

---

# 최종 교차 검토 (공통 화면 fd6c698 반영)

검토일: 2026-11-06. `fd6c698`을 이 워크트리에 cherry-pick(`82c8748`)하고 기존 `c8e5a77`을 유지한 채 검토했다. 자체 로컬 서버(포트 4391, `dist/` 정적 제공)와 Orca 내장 브라우저를 사용했고 다른 작업자의 4187 서버 결과에는 의존하지 않았다. 빌드는 `node integrated-site.mjs`(Orca 내장 Node)로 `dist/integrated/`만 재생성했다. 전체 `build.mjs`는 dist를 광범위하게 다시 쓰므로 실행하지 않았고 구문 검사(`--check`)만 했다.

## 직접 확인한 항목
- **링크·자산**: `dist/integrated/*.html` 9개의 모든 `href`/`src`/앵커를 스크립트로 전수 검사해 깨진 항목 0건. 브라우저에서 9개 페이지 모두 깨진 이미지 0건, 중복 id 0건, h1 1개.
- **PC(너비 약 1289px)**: 가로 넘침 없음. 홈 화면 스크린샷으로 로고(MDFC 로고타입 마크업·스타일을 기존 사이트와 동일하게 유지)·메뉴·히어로 확인.
- **모바일(390px, 같은 출처 iframe)**: 9개 페이지 모두 가로 넘침·화면 밖 요소 없음. 메뉴 토글 열기·닫기(`aria-expanded`), Esc 닫힘 동작 확인. 회사 소개·보안 페이지 스크린샷 확인. Orca의 기기 에뮬레이션은 `innerWidth`를 바꾸지 않아 iframe 방식을 썼다. 실제 터치 기기 검증은 아니다.
- **제품 필터**: NAS 선택 시 NAS 카드 2개만 표시, 상태 문구와 `aria-pressed` 갱신 확인.
- **문의 시연**: 필수 항목 미충족 시 접수 문구가 나오지 않고, 충족 시 "실제 접수 아님" 문구와 입력 초기화 확인. 전송 요청 없음.
- **결제 시연**: 제품 상세에서 `dialog`가 열리고 시연 완료 문구에 "실제 결제 없음"이 표시됨. 결제정보 입력란 없음.
- **사실 근거**: 푸터와 고객지원의 대표번호·시간·주소·사업자번호·대표자·팩스는 `content.json`과 일치.

## 수정
| 파일 | 문제 | 조치 |
| --- | --- | --- |
| `integrated-site.mjs` | 고객지원에 근거 없는 "토·일·공휴일 휴무" | 삭제(자료에는 "평일 09:00 – 18:00"만 있음) |
| `integrated-expertise.mjs` | 회사 소개의 연혁·거점이 임시 문구 | `company-data.mjs`의 공식 연혁(1990·1993·2003·2006·2010·2013·2014·2019·2023·2024 발췌)과 9개 거점 주소·전화 표로 대체. 클린룸 등급·장비 세부만 "확인 중"으로 유지 |
| `integrated-expertise.mjs`, `integrated-site.css` | 거점 표가 모바일에서 주소·전화가 한두 글자씩 줄바꿈됨 | 640px 이하에서 행을 세로 카드형으로 전환(`table.branches`) |

## 남은 한계
- 키보드는 메뉴 토글·Esc·네이티브 `dialog`·`details`·폼 컨트롤의 표준 동작에 의존한다. 탭 순서를 하나씩 사람이 직접 따라가는 검증은 하지 않았다. Esc로 메뉴를 닫을 때 포커스를 토글로 되돌리지 않는다.
- 제품 목록·상세는 시안용 일반 이미지와 "정보 확인 중" 템플릿 그대로이며 모델·가격·재고는 없다. 포렌식·보안 서비스 문안은 `content.json`의 서비스 항목을 풀어 쓴 것이라 실제 운영 절차와의 일치는 회사 확인이 필요하다.
- 홈의 `forensics.jpg`·`company.jpg`는 시안용 일반 이미지다. 연혁 이미지(`history_img_*`)는 이번에 쓰지 않았다.
- 전체 `node build.mjs`는 실행하지 않았다. 통합 빌드 연결(마지막 줄 `writeIntegratedSite()`)은 구문만 확인했다.
