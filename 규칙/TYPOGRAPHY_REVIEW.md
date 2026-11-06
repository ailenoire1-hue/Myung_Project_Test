# 에스코어드림 적용 교차 검토

2026-11-06, 기준 `420855f08a3554c46a7917dec5cea85c6092c747`. 판정: 폰트 변경 범위에서 수정이 필요한 문제를 발견하지 못했다.

## 환경과 범위

리뷰 워크트리 `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-component-review`는 시작 시 clean이었다. 기존 브랜치의 리뷰 커밋 `1fa37d1` 때문에 처음 ff-only가 거부되어 해당 브랜치와 커밋은 보존하고, 공통 기준 c81b4c1에서 로컬 리뷰 브랜치 `review/typography-420855f`를 생성한 뒤 `git merge --ff-only 420855f`로 동기화했다. 기준 포함 확인 성공. 검토 diff는 `420855f^..420855f`의 폰트 관련 파일로 한정했다.

`규칙/TYPOGRAPHY.md`와 기존에 읽은 Orca 브라우저 가이드를 따라 PM의 최신 `http://127.0.0.1:4193`을 읽기 전용으로 사용했다. 서버 중단·빌드 재실행·외부 배포·설치·다른 세션 파일 수정 없음. PM이 수행한 9페이지×2크기 검증은 반복하지 않았다.

## 확인 결과

- `source-code/integrated-fonts.css`: 400/500/600/700/900에 로컬 WOFF 5종 매핑, font-display swap과 한글 대체 폰트 지정. 기존 CSS 다음에 로드되어 root 및 body, button, input, select, textarea, dialog 상속을 적용한다.
- `source-code/components/document.mjs`: 공통 document에서 CSS를 연결하므로 통합 9페이지에 적용된다. 400/700 preload 경로와 crossorigin 속성이 실제 font-face URL과 일치한다.
- `source-code/components/site-fonts.mjs`: rootUrl 기준 원본 `../assets/fonts/s-core-dream/`에서 출력 `dist/assets/fonts/s-core-dream/`으로 5종과 LICENSE.txt를 명시적으로 복사한다. source-code가 루트인 utils의 탐색 방식과 맞고 cwd 의존 경로를 도입하지 않았다. 누락 파일은 copyFile 오류로 빌드 실패한다.
- `source-code/integrated-site.mjs`: 기존 빌드 경로에 copySiteFonts와 integrated-fonts.css 복사를 연결했다. PM의 빌드 성공 결과와 일치한다.
- 원본/배포 디렉터리의 WOFF 5종 및 LICENSE.txt 총 6개를 SHA-256으로 비교해 모두 동일했다. 라이선스 안내에는 저작권자, 공식 출처, 무료 사용/재배포 및 수정·폰트 자체 판매 금지 안내가 포함되어 있고 출력에도 동봉된다. 이번 검토는 파일 동봉과 복사 무결성을 확인했으며 외부 원본 바이너리의 별도 재다운로드 검증은 하지 않았다.
- 로고 컴포넌트는 폰트 커밋에서 변경되지 않았다. `.brand-mark`는 Arial 예외가 유지되고 실제 computed style도 `Arial, sans-serif`였다.
- 실제 내장 브라우저 고객지원 대표 페이지에서 body와 모든 button/select/textarea/input의 computed font-family가 `SCoreDream, "Malgun Gothic", sans-serif`임을 확인했다. font resource 요청은 모두 4193의 로컬 경로였다.
- 고객지원 PC 1440×900 및 모바일 390×844 캡처를 직접 열어 제목·본문·메뉴·로고 및 모바일 문의 폼/동의문/버튼 가독성을 확인했다. 잘림이나 겹침을 발견하지 못했다. 모바일 document.fonts.ready 후 400/700 check=true, 가로넘침=false도 확인했다.

## 발견사항과 제한

심각도별 보고할 폰트 결함 없음. PM의 전수 18뷰 검증에 대표 페이지와 폼 상속 확인을 보완했으며, 이번 검토에서 전수 기능·실기기 검증이나 폰트 라이선스 법률 판단을 수행한 것으로 해석하지 않는다. 임시 스크린샷은 Orca 만료 파일이며 보고서에 바이너리를 추가하지 않았다. 남은 차단사항 없음.
