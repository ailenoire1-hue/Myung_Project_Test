# 컴포넌트화 교차 검토

검토일: 2026-11-06. 판정: 현재 정적 9페이지의 일반 사용에서는 회귀를 찾지 못했으나, 초기화 재호출 시 중복 이벤트와 상태 영역 생성 문제(P3)를 확인했다. 무조건 통과로 처리하지 않으며 PM이 아래 재초기화 제약을 수용하거나 수정 여부를 결정해야 한다. 구현 파일은 수정하지 않았다.

## 기준과 재현환경

- 작업 경로: `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-component-review`.
- 브랜치: `ailenoire1-hue/myung-component-review`. 시작 HEAD `a5305d0`, 깨끗한 상태에서 `git merge --ff-only c81b4c1` 성공. `git merge-base --is-ancestor c81b4c1 HEAD` 성공.
- 구현 검토 범위: `570ceab..c81b4c1`; 중간 `91b3802`는 규칙 동기화 커밋이고 실제 구현 변경은 `c81b4c1e884aa5f5cf8ca4d618fc371df8da6573`이다.
- README, BOOTSTRAP, WEBSITE_WORK_RULES, WORKTREE_STRUCTURE, HANDOFF, PROJECT_PROGRESS, COMPONENTS를 읽었다.
- PATH에 node 없음. 기록의 실행 파일을 실제 실행해 Orca 내장 Node `v24.22.1` 확인: `C:/Users/DR_ACADEMY/AppData/Local/Programs/orca/Orca.exe`. PowerShell에서 세션 범위 `ELECTRON_RUN_AS_NODE=1`로 실행하고 기존 환경을 복원했다. 의존성 설치 없음.
- ego-browser 폴더 항목은 보였지만 해당 SKILL.md를 읽을 수 없어 설치된 스킬로 사용할 수 없었다. orca-cli 및 orchestration 스킬과 `orca skills get orca-cli --reference references/browser.md`를 읽고 내장 브라우저 사용.
- 먼저 `orca ports --all --json`으로 기존 4187/4190과 미사용 4191 확인. 자체 워크트리에서 `PORT=4191`, `ELECTRON_RUN_AS_NODE=1`, `Orca.exe preview.mjs` 실행. 서버 터미널 `term_1a214f9f-e9f6-490f-90eb-c385c4e02f95`, 출력은 `Local: http://127.0.0.1:4191`이며 프롬프트 경로는 위 리뷰 워크트리다.
- 검증 URL `http://127.0.0.1:4191/integrated/index.html`; 브라우저 페이지 `8e2b1bf5-8ce3-40e4-9d6a-245917e8ecb0`. HTTP JS 응답에 `function initMenu()` 포함 확인. 구버전 4190 서버를 사용하지 않았다. 외부 배포나 유료 서비스 사용 없음.

## 소스 구조와 호환성

- `integrated-site.mjs:6`부터 홈/고객지원 페이지 모듈을 import하며 공통 document 컴포넌트로 조립한다. 단순 파일 분할에 그치지 않고 실제 소비됨을 확인했다.
- `source-code/components/document.mjs`가 모든 페이지의 헤더/메뉴/히어로/CTA/푸터와 상세페이지 결제 UI를 조립한다. `brand`는 헤더와 푸터에서, `articleCard`는 고객지원·수리·복구에서, `faq`는 고객지원·커머스·포렌식·보안에서 재사용된다. serviceCard/productCard도 각각 홈 6개/목록 6개에 사용된다.
- 텍스트는 `esc()`에서 &, <, >, 따옴표를 처리하고 HTML 본문·FAQ 답변·noteHtml만 신뢰된 개발자 마크업으로 삽입한다. 현재 소비부에서 외부 회사 데이터가 raw HTML에 직접 섞이는 사례는 찾지 못했다. content.json 회사 정보와 company-data 이력/지점은 escape를 거친다. FAQ 답변에는 보안·복구·포렌식 링크가 있어 raw 경계 자체는 필요하다. 이 API는 HTML sanitizer나 URL scheme 검증기가 아니며 신뢰된 인자를 받는 현재 계약으로 평가했다.
- `utils.mjs`는 import.meta.url에서 package.json/content.json이 있는 루트까지 탐색한다. 상대 import는 호출 cwd 기준이 아니다. 13개 공통 컴포넌트 import 및 홈/고객지원 포함 전체 진입점 import 성공.
- 기존 `pages` export는 9개, `writeIntegratedSite`는 함수임을 실제 import로 확인. 함수 호출 및 루트에서 직접 실행, `source-code/`에서 `../integrated-site.mjs` 직접 실행 성공. import 후 cwd를 OS 임시 폴더로 바꿔 함수 호출해도 원래 루트 dist/integrated에 9페이지 생성 성공.
- `build.mjs`의 writeIntegratedSite 호출 연결 보존. build.mjs와 integrated-site.js 구문 검사 성공. 전체 레거시 시안까지 다시 생성하는 전체 빌드는 이번 리뷰에서 실행하지 않았다.
- classic defer 스크립트 1회 로드와 네 initializer 각 1회 호출 확인. 해당 DOM 없는 페이지에서 초기화 오류 없음. FAQ는 native details/summary로 별도 initializer가 필요하지 않다.

## 생성 결과와 경로 보존

실제 writeIntegratedSite 실행 결과와 `git show 570ceab:dist/integrated/<파일>`을 Node에서 비교했다. Git의 Windows 줄바꿈 설정 때문에 CRLF/LF만 정규화했다.

| 페이지 | 결과 |
| --- | --- |
| index, company, products, product-detail, repair, recovery, support | 줄바꿈 정규화 후 완전 동일 |
| forensics, security | FAQ 태그 사이 개행·들여쓰기만 차이; `/>\s+</`를 `><`로 정규화하면 동일 |

따라서 기존 링크, 클래스, ID, data 속성, aria/접근성 속성, 문구, 이미지 경로의 의미 변경은 발견하지 못했다. CSS는 기준 대비 변경 없음. JS diff는 기존 동작을 네 함수로 옮기고 호출한 변경이며 일반 초기화에서 누락된 핸들러는 찾지 못했다. 재생성으로 생긴 작업 사본의 줄바꿈 변경은 검증 후 `git restore --worktree -- dist/integrated`로 원복했고 보고서만 커밋한다.

9페이지에서 href/src 수집 후 동일 출처 중복 제거 15개 URL을 HTTP HEAD 검사하여 모두 200, 동일 페이지 앵커 누락 0개였다. 브라우저의 실제 이미지 로드 결과도 아래와 같다.

## 실제 브라우저 검증

Orca 내장 브라우저의 실제 렌더러를 사용했다. 전수 측정과 반복 상호작용은 같은 출처 iframe을 1440×900 및 390×900으로 만들어 실제 DOM/기본 브라우저 동작을 실행했다. 별도로 최상위 홈을 1440×900과 모바일 390×844로 설정하고 화면과 실제 키 입력을 검증했다. 모의 DOM 시험이나 실제 휴대폰 시험으로 혼동하지 않는다.

| 항목 | PC 1440 | 모바일 390 |
| --- | --- | --- |
| 9페이지 가로 넘침 / 깨진 이미지 | 0 / 0 | 0 / 0 |
| 9페이지 h1 / JS 로드 | 각각 1개 / 1회 | 각각 1개 / 1회 |
| 메뉴 | 전체 메뉴 표시, 토글은 CSS로 숨김 | 토글 표시, 열기 true/닫기 false, Escape로 닫힘 |
| Escape 포커스 | 숨겨진 토글에 포커스를 강제하지 않음 | 메뉴 링크에서 버튼으로 복원 |
| 제품 필터 | 전체 6, PC 2, 저장장치 2, NAS 2 | 동일 |
| 필터 aria-pressed/상태 영역 | 선택 버튼 true, 상태 1개 및 문구 갱신 | 동일 |
| FAQ | products/support/product-detail summary 클릭 시 false→true | 동일 |
| 문의 필수입력 | 빈 메시지/동의 미체크는 valueMissing, 완료문구 없음 | 동일 |
| 문의 유효 입력 | 완료문구 표시, 메시지 빈 문자열/동의 false로 초기화 | 동일 |
| 문의 내용 지우기 | 상태 문구 초기화 | 동일 |
| 결제 | dialog 열기 true, 완료 버튼 disabled+상태 표시, 닫기 false | 동일 |
| 결제 재열기 | 완료 disabled 해제/상태 빈 문자열 | 동일 |

모바일 최상위 홈에서 실제 `click @e43 → Tab → Escape` 후 activeElement가 menu-toggle이고 aria-expanded=false임을 확인했다. 다음 실제 Tab은 숨겨진 내비게이션을 건너뛰어 제품 살펴보기 링크로 이동했다. PC에서는 토글이 보이지 않으므로 PC 메뉴 열기/닫기 사용자 조작은 적용 대상이 아니다. iframe에서의 강제 click 결과를 PC 사용자 조작 통과로 계산하지 않았다.

PC/모바일 홈 스크린샷을 실제 열어 로고·헤더·히어로·CTA·이미지 배치 확인. 임시 캡처는 Orca가 만료시키므로 영구 증거 파일로 보장하지 않는다: 모바일 `e3c32573-72d4-4bb2-85b7-92d4a98023e9-screenshot.png`, PC `dd30cbfc-4e02-4615-959b-56be895d1995-screenshot.png` (OS Temp/orca-browser-screenshots). 내장 브라우저 console 조회 entries=[]였다.

## 심각도별 발견사항과 수정 제안

### P0/P1/P2

현재 1회 초기화하는 정적 사이트 사용 흐름에서 해당 심각도 문제를 발견하지 못했다.

### P3: initializer 재호출이 안전하지 않음

- 위치: `integrated-site.js:2`, `:26`, `:46`, `:60`; 정상 자동 호출은 `:74`부터.
- 재현: products.html 로드를 기다린 뒤 `window.initMenu(); window.initProductFilters();`를 다시 실행하고 메뉴 버튼 한 번 클릭. 실제 브라우저 결과 `expandedAfterOneClick="false"`, `.filter-status` 개수 `2`.
- 원인: 새 전역 함수들이 실행 여부를 확인하지 않고 리스너와 상태 요소를 추가한다. 메뉴 클릭 리스너 두 개가 연속 토글하여 열리지 않는다. 필터는 live 상태 영역을 중복 생성한다. 문의·결제도 재호출 시 리스너가 추가되는 구조다.
- 영향/범위: 현재 HTML은 defer script 1개와 각 함수 1회 호출이므로 일반 9페이지 동작에서 재현되지 않는다. 새로 분리된 initializer를 향후 부분 페이지 갱신 등에서 다시 호출하면 발생한다. 현재 정상 경로의 회귀로 단정하지 않는다.
- 제안: 각 대상에 초기화 여부를 기록해 재호출을 no-op 처리하거나, 리스너 수명/상태 노드 재사용을 관리한다. 재초기화를 지원하지 않을 계획이면 전역 함수를 감추고 COMPONENTS.md에 1회 실행 계약을 명시한다. 구현 수정은 이번 허용 범위 밖이므로 수행하지 않았다.

## 남은 제한과 PM 전달

브라우저 검증 차단은 없었다. 모든 입력 이벤트를 실제 키 입력으로 전수 반복한 것은 아니며, 제품 필터/FAQ/문의/결제의 두 크기 반복 시험은 실제 브라우저 DOM click/value 설정과 브라우저 reportValidity/showModal/default action을 사용했다. 실제 모바일 기기, 모든 페이지의 개별 전체 스크린샷, 전체 레거시 build는 검증 범위에 포함하지 않았다. 위 P3를 PM에 전달하며 수정 또는 명시적 단일 초기화 계약 판단이 남는다. 자체 4191 서버는 PM 재현을 위해 유지하고 기존 서버는 건드리지 않았다.
