# 명정보 통합 홈페이지 글꼴

2026년 11월 6일 사용자가 눈누의 에스코어드림을 전체 적용하도록 선택했다.

## 적용 범위

통합 홈페이지 9페이지의 제목, 본문, 내비게이션, 버튼, 입력 폼, 표, 캡션, 문의 및 결제 시연에 `SCoreDream`을 적용한다. 기존 MDFC 마크는 로고 형태를 보존하기 위해 원래 Arial로 유지한다. 레거시 시안과 5종 폰트 비교 화면은 비교 자료이므로 변경하지 않는다.

| CSS 굵기 | 원본 파일 |
| --- | --- |
| 400 본문 | S-CoreDream-4Regular.woff |
| 500 중간 강조 | S-CoreDream-5Medium.woff |
| 600 강조 | S-CoreDream-6Bold.woff |
| 700 제목과 메뉴 | S-CoreDream-7ExtraBold.woff |
| 900 강한 강조 | S-CoreDream-9Black.woff |

굵기 매핑은 눈누의 웹폰트 안내를 따른다. 사용자에게 보여준 비교 화면의 에스코어드림 700과 같은 파일을 사용한다.

## 파일과 빌드

- 원본: `assets/fonts/s-core-dream/`
- 배포 자산: `source-code/dist/assets/fonts/s-core-dream/`
- 선언과 공통 적용: `source-code/integrated-fonts.css`
- 복사 컴포넌트: `source-code/components/site-fonts.mjs`
- 페이지 연결: `source-code/components/document.mjs`

`source-code/integrated-site.mjs` 실행 시 원본 5개와 라이선스를 복사하고 공통 CSS를 연결한다. 필요한 원본 파일이 없으면 빌드가 실패한다. 실행 위치와 관계없이 동일한 출력 경로를 사용한다. 폰트는 외부 CDN 요청 없이 로컬에서 제공하며 400과 700을 preload하고 font-display swap을 사용한다.

## 출처

- 눈누: https://noonnu.cc/font_page/223
- 제작사: https://s-core.co.kr/company/font2/
- 웹폰트 배포 경로: https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/
- 저작권 안내: `assets/fonts/s-core-dream/LICENSE.txt`, 빌드 시 함께 복사한다.

다운로드한 폰트 파일은 수정하지 않는다. 제작사는 개인·기업의 무료 사용과 재배포를 허용하며 폰트 파일 수정과 폰트 자체 판매를 금지한다.
