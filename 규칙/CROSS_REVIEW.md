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
