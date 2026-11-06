# Unsplash 이미지 배치 기록

2026-11-06. 대상은 현재 통합 홈페이지(`source-code/dist/integrated/` 9페이지)이며 레거시 시안은 수정하지 않았다. 원본은 루트 `assets/images/unsplash/`에 그대로 두고 다시 다운로드하거나 편집하지 않았다. 모든 사진은 서비스 설명용 스톡 사진이며 명정보기술의 실제 건물·사무실·장비·제품·실적이 아니다.

## 배치

| 사진 | 페이지 | 위치와 의도 |
| --- | --- | --- |
| hardware-circuit-board (Sven Alleblas) | index | 메인 서비스 영역 아래 "기술·업무 환경·인프라" 3장 중 기술·장비 점검 |
| | repair | 접수 카드 다음 `HARDWARE CHECK` 서비스 설명 이미지 |
| modern-office-interior (Deliberate Directions) | index | 3장 중 업무 환경 |
| | support | 문의 영역과 상담 준비 사이 `YOUR WORK ENVIRONMENT` |
| corporate-glass-facade (Fabian Kleiser) | company | 법인 정보 앞 `TRUSTED OPERATIONS`의 세로 보조 이미지(건물 사진처럼 보이지 않도록 캡션 명시) |
| data-center-server-rack (imgix) | index | 3장 중 인프라·보안 |
| | security | 서비스 절차 앞 `SERVER INFRASTRUCTURE` |

기존 본사 히어로 사진, 본문, 기존 시안 이미지는 유지했다. 제품 목록·상세에는 스톡 사진을 넣지 않아 실제 제품 사진으로 오인되지 않는다. forensics, recovery, products, product-detail에는 추가하지 않았다.

서버 사진에는 imgix 로고가 보이므로 캡션에 "촬영자 imgix", "명정보기술의 시설·제품·실적이 아니며 사진 속 타사 로고와 무관"을 명시했다. 로고를 강조하는 큰 이미지는 쓰지 않고 작은 3열/반폭 이미지로만 사용하며 CSS(`.stock-photo--server`)로 로고가 덜 두드러지도록 잘랐다.

## 구현

- `source-code/components/stock-photo.mjs`: 파일·캡션 문구·사용 페이지 매핑, `sources.json`의 작가·링크·alt·크기 결합, `stockPhoto(key)`(figure/img/figcaption, `width`/`height`/`loading="lazy"`/`decoding="async"`, 작가와 Unsplash 원본 링크), `copyStockPhotos()`.
- `source-code/components/visual-section.mjs`: `visualSection()`(텍스트+사진), `photoTrio()`(사진 3장).
- 텍스트는 공통 `esc()`로 이스케이프하며 `textHtml`만 신뢰된 마크업이다.
- `integrated-site.mjs`의 `writeIntegratedSite()`가 `copyStockPhotos()`로 4장과 `sources.json`을 `source-code/dist/assets/unsplash/`에 복사한다. 경로는 `import.meta.url` 기준(`utils.mjs`의 `repoAssetUrl`)이라 cwd와 무관하다. 파일이 없으면 빌드가 실패한다.
- CSS는 `integrated-site.css` 끝의 `.stock-photo*`, `.visual-section`, `.photo-trio` 규칙이다. 모바일에서는 1열, 이미지 최대 높이 제한.

## 새 사진 추가

`assets/images/`에 파일과 `sources.json` 항목을 추가하고 `stock-photo.mjs`의 `PHOTOS`에 key·file·caption note·pages를 추가한 뒤 `visualSection({photo:'key'})`로 사용한다.

## 검증

Orca 내장 Node v24.22.1과 Orca 내장 브라우저(포트 4194)로 확인했다.

- 파일 헤더 크기가 `sources.json`의 width/height와 일치(4장).
- `integrated-site.mjs`를 다른 cwd에서 실행해도 `source-code/dist/assets/unsplash`에 복사된다.
- PC 1440과 모바일 390 폭에서 9페이지 모두 가로 넘침 없음, 깨진 이미지 0, 4장 모두 로드(naturalWidth 2000), 외부 출처 링크 `target=_blank rel=noopener noreferrer`.
- 기존 동작: 메뉴 토글, 제품 필터(저장장치 2개, 상태 1개), 문의 시연(필수 검증/완료 문구), 결제 dialog 열기와 완료가 그대로 동작.
- `sources.json`의 `websiteApplied`를 true로 갱신하고 이미지별 `appliedTo`에 실제 페이지와 위치를 기록했다.

미확인: 실제 모바일 기기와 다른 브라우저 엔진, 이미지 파일 크기 최적화(원본 1.8MB 등 그대로 사용, 재가공 금지 지시에 따름), 서버 사진의 로고 노출 허용 여부에 대한 PM 최종 판단.
