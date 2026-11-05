# 마케팅 기능 기획 미리보기 — 2026-10-20

기존 확정 홈페이지와 별도인 검토용 경로입니다. 운영용 index/company/digital-forensics/incident-response/enterprise-security HTML은 변경하지 않습니다.

- `dist/home-marketing-preview.html?skip=1#main`: 기존 메인 맥락에서 견적 가이드 버튼 및 새로운 인사이트 요약 배치.
- `dist/home-marketing-preview.html?skip=1&quote=1#main`: 견적·의뢰 가이드 모달을 직접 엽니다.
- `dist/insights-preview.html`: 매거진형 목록, 카테고리·키워드 검색.
- `dist/insight-article-preview.html`: 가상 USB 분석 타임라인을 포함한 원문 화면. `?topic=email|offboarding|backup|mobile|incident`로 주제별 짧은 원문.
- `dist/newsletter-preview.html`: 2026년 8~10월 예시호 전환과 이메일 구독 양식의 미리보기.

## 기능 범위

견적 가이드는 세 서비스 분야 및 아홉 주제, 의뢰 조건 선택, 맞춤 준비 안내, 상담 양식 예시로 구성합니다. 가격 정책이 제공되지 않아 임의 금액을 표시하지 않습니다. 상담·구독은 모두 브라우저 내 동작 예시이며 서버 전송, 브라우저 저장 및 실제 접수·구독을 수행하지 않습니다. 전화 링크는 기존 대표번호로 연결됩니다. 콘텐츠·발행호는 예시로 명시했습니다.

정식 적용 시 상담/구독 API, 개인정보 처리 문구와 보관 정책, 관리자 발행 절차, 가격 정책을 별도 확정해야 합니다. 이 미리보기에 자동 검사·파일 업로드·메일 발송 서비스는 없습니다.

## 생성·수정

`node marketing-preview.mjs`가 기존 index를 읽어 별도 홈 미리보기를 만들고, 세 콘텐츠 페이지의 공통 header/footer와 견적 모달을 갱신합니다. 운영 파일은 읽기만 하며 실행 전후 해시를 비교합니다.

- 모달: `marketing-quote-snippet.html`, `dist/assets/marketing-quote.css`, `dist/assets/marketing-quote.js`
- 인사이트: 세 콘텐츠 HTML, `marketing-insights-home-snippet.html`, `dist/assets/marketing-insights.css`, `dist/assets/marketing-insights.js`
- 공통·연결: `marketing-preview.mjs`, `dist/assets/marketing-preview.css`, `dist/assets/marketing-preview.js`

## 공식 블로그·유튜브 포함 보완

인사이트 허브에 홈페이지 원문 예시 6개, 기존 공식 네이버 블로그 글 3개, 기존 포렌식 유튜브 영상 3개, 뉴스레터 예시 1개를 표시합니다. 콘텐츠 유형·주제·검색을 함께 사용할 수 있고 `?channel=article|blog|video|newsletter`로 유형을 선택한 상태로 열 수 있습니다. 공식 채널 게시물의 발행일과 제목은 `insights-content.json`에 보관한 값이며 자동 RSS/API 갱신은 하지 않습니다.

홈 미리보기는 `marketing-channel-home.mjs`가 같은 JSON을 읽어 원문·네이버 블로그·유튜브 3열과 뉴스레터 안내를 생성합니다. 블로그는 새 창에서 원문을 열고, 유튜브는 사용자 클릭 후에만 개인정보 보호 강화 모드 플레이어를 생성합니다. 닫으면 iframe을 제거합니다. 재생 불가 시 유튜브 원문으로 이동할 수 있습니다.

- 공식 채널 홈 구성: `marketing-channel-home.mjs`, `marketing-insights-home-snippet.html`
- 공통 영상 플레이어: `marketing-channel-player.html`, `dist/assets/marketing-channels.css`, `dist/assets/marketing-channels.js`

원문·목록·뉴스레터 HTML의 `MP_HEADER/FOOTER/QUOTE` 주석 경계는 공통 요소 갱신에 사용합니다. 페이지 단독 수정 후 생성 스크립트를 다시 실행할 수 있습니다.

## 인사이트 구분 디자인 보완

홈에는 원문(네이비)·블로그(화이트/그린)·유튜브(슬레이트) 독립 패널을 배치하고 큰 채널 제목을 표시합니다. 허브 상단의 공식 채널 바로가기 박스는 제거하고 원문·블로그·영상·뉴스레터를 독립된 배경과 제목의 그룹으로 묶었습니다. 기능성 유형 탭과 주제·검색은 유지하고, 검색 결과가 없는 그룹은 제목까지 숨깁니다. 허브 소개 영역 높이를 줄여 실제 콘텐츠를 더 빨리 볼 수 있도록 조정했습니다.

홈 인사이트 요약은 넓은 왼쪽 원문 패널과 오른쪽 블로그·영상 두 줄 구조입니다. 원문은 흰 배경, 블로그는 옅은 그린, 영상은 옅은 회색을 사용하며 모바일에서는 한 열로 이어집니다.

최종 조정: 최초 3열 구성을 기준으로 원문을 약 40%로 넓히고 박스를 제거했습니다. 블로그·유튜브는 각각 약30%의 작은 초록·빨강 패널로 구분합니다.

추가 조정: 왼쪽은 원문 3개(작은 대표 사진 1개와 추가 글 2개), 오른쪽은 옅은 배경의 블로그·영상 두 단으로 구성합니다. 모든 원문은 기존 기획 예시 페이지로 연결됩니다.

채널 배경을 흰색으로 통일하고 원문 네이비·블로그 초록·유튜브 빨강 2px 테두리와 제목 SVG 아이콘으로 구분합니다. 원문 3개와 오른쪽 채널 두 단 배치는 유지합니다.

## 상황별 인사이트 미리보기

`dist/home-insights-situation-preview.html?skip=1#home-insights`는 기존 테두리형 홈과 별도의 제안입니다. 왼쪽 네 상황(자료 유출·증거, 해킹·사고, 데이터 복구, 기업 보안)을 선택하면 오른쪽 관련 콘텐츠 3개와 서비스 안내가 바뀝니다. 원문은 기존 기획 예시, 채널 게시물은 기존 JSON의 공식 콘텐츠를 사용합니다. `?situation=forensics|incident|recovery|security`로 초기 선택할 수 있습니다. 자동 수집·실제 구독 기능을 추가하지 않습니다.

구성: `marketing-situation-home.mjs`, `dist/assets/marketing-situation.css`, `dist/assets/marketing-situation.js`. 클릭·방향키·Home/End, ARIA 탭 상태를 지원합니다. 본래 홈 미리보기와 운영 HTML은 유지합니다.

상황별 제안은 서비스 섹션의 gutter/quick-menu 여백을 사용합니다. 제목·상황목록을 왼쪽 약36%로 키우고, 오른쪽은 외곽 박스 없이 사진과 제목 중심으로 구성합니다. 버튼형 채널 링크와 상담 박스도 구분선·텍스트 링크로 정리했습니다.

## 매거진형 인사이트 추가 미리보기

`dist/home-insights-magazine-preview.html?skip=1#home-insights`는 대표 글 1개와 오른쪽 글 3개, 주제 필터, 하단 뉴스레터 안내 및 공식 채널 링크로 구성합니다. 기존 상황별 안과 별도로 비교할 수 있습니다. `?topic=all|forensics|incident|recovery|security`로 초기 주제를 선택할 수 있으며, 필터 버튼은 키보드와 선택 상태 안내를 지원합니다.

홈페이지 원문은 기획 예시로 표시하고, 공식 블로그·영상의 제목·날짜·주소는 기존 JSON을 재사용합니다. 영상은 기존 공통 플레이어를 사용하며, 뉴스레터는 예시호·구독 화면으로 안내합니다. 실제 구독·서버 전송 기능을 추가하지 않습니다.

구성: `marketing-magazine-home.mjs`, `dist/assets/marketing-magazine.css`, `dist/assets/marketing-magazine.js`. `node marketing-preview.mjs`로 기존 안들과 함께 생성합니다.

상황별 시안 정렬 보완: 타이틀을 공통 헤더의 한 줄로 표시하고 좌우 간격을 확대했습니다. 추천 카드 높이를 통일하고 상담 행을 왼쪽 마지막 목록 행과 정렬합니다. 모바일은 자연스러운 줄바꿈과 세로 배치를 유지합니다. 매거진형은 기존 미리보기 상태로 보류합니다.

상황별 목록 추가 조정: 데스크톱의 왼쪽 네 항목을 오른쪽 추천 카드 블록 높이에 맞춰 줄이고 상담 안내는 그 아래에 둡니다. 해킹·보안사고 및 데이터 복구는 인사이트 예시, 기존 공식 유튜브 영상, 네이버 블로그를 하나씩 표시합니다. 채널 이름도 카드에서 명확히 구분합니다.

상황별 시안 중심 정렬: 왼쪽 목록 행의 높이를 조금 늘리고 추천 영역 전체(소제목·카드·상담)의 세로 중앙에 맞춥니다. 데스크톱의 상단 여백은 12px 늘리고 하단 여백은 같은 만큼 줄여 한 줄 타이틀을 조금 아래에 둡니다. 기존 채널별 콘텐츠 구성은 유지합니다.

## MDFC STORY 2안 메인 적용

사용자가 선택한 `http://127.0.0.1:4192/home-insights-situation-plan2.html`의 인사이트 구성만 메인 `dist/index.html#home-insights`에 적용했습니다. 제목 옆 네 채널 링크, 상황 선택 강조, 추천 배지, 상황명·추천 스토리 표시와 상담 박스를 유지합니다. 기존 네 상세 페이지 및 비교 시안은 변경하지 않습니다. 원문은 기획 예시이며 실제 구독 서버는 추가하지 않습니다.

`node home-insights-story-approved.mjs`로 승인된 홈 챕터만 갱신할 수 있고, `build.mjs` 마지막에도 같은 적용 단계를 둡니다. 원본 스냅숏의 실행 상태, 외부 base, 검증 스크립트, 별도 기업 보안 관리 변경은 포함하지 않습니다. 작은 화면에서는 채널 2열·축소된 목록 문구·세로 상담 버튼으로 가로 넘침을 방지합니다.

구성: `home-insights-story-approved.mjs`, `dist/assets/home-insights-story.css`, `dist/assets/home-insights-story.js`, 기존 공통 채널 플레이어. `APPROVED_STORY_*` 경계는 갱신과 비교 시안 분리를 위해 사용합니다.
