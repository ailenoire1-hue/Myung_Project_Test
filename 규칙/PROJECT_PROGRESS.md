> **경로 갱신 (2026-11-06 소스 통합):** 홈페이지 소스는 모두 `source-code/`(프로젝트 루트)로 모았다. 아래 본문의 루트 기준 경로(`*.mjs`, `dist/`, `package.json`, `content.json`, `tests/`, `.versions/`, `./source-code/components`)는 `source-code/` 기준으로 읽는다. 실행은 `cd source-code` 후 `npm run build`, `npm start`, `node integrated-site.mjs`이며 출력은 `source-code/dist/`다. 루트에는 `규칙/`, `janiter/`, `assets/`, `source-code/`, `.openai/`, `README.md`만 둔다. 아래 내용은 과거 이력을 보존한다.

# 명정보 통합 홈페이지 진행 기록

## 2026-11-06 PM 인수 및 제작 완료

아래 초기 기록은 이력으로 보존한다. 현재 PM은 `ailenoire1-hue/myung-pm-handoff`, 작업 경로는 `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-pm-handoff`다. 원본 `user4`와 미추적 사용자 파일은 변경하지 않았다.

- 문서 커밋 `9621c39`, `ce83058`, `caa6276`을 순서대로 가져와 규칙 폴더를 보존했다.
- 제출 커밋 `c4be39b`, `31400b38`을 검토·통합했다.
- 별도 Orca 워크트리 `myung-integrated-shell`의 Codex가 공통 화면을 제작(`fd6c698`), `myung-cross-review`의 Claude가 제출 모듈과 최종 화면을 교차 검토했다(`c8e5a77`, `a3b7a3d`). PM이 수정사항을 검토·통합했다. 상세 근거는 [교차 검토](CROSS_REVIEW.md)에 있다.
- `dist/integrated/`에 메인, 회사, 제품 목록·상세, 수리, 복구, 포렌식, 기업 보안, 고객지원 9개 페이지를 완성했다. 밝은 배경·남색, 기존 MDFC 로고타입, 공통 메뉴·푸터, 모바일 메뉴, 제품 필터, FAQ, 문의·결제 시연을 구현했다. 회사 연혁과 9개 거점은 저장소 `company-data.mjs`를 사용했다.

### PM 직접 검증

- Orca 내장 Node로 `integrated-site.js` 구문 검사, 통합 전용 생성 및 전체 `build.mjs` 실행 성공. 전체 빌드가 재작성한 기존 dist 파일은 원복하여 이번 통합 결과만 유지했다.
- PM 자체 서버 `http://127.0.0.1:4190`와 Orca 내장 브라우저로 확인했다. PC 1440px 및 모바일 390px의 9개 페이지 모두 가로 넘침·깨진 이미지 0건. 전체 페이지마다 h1 1개. 데스크톱·모바일 홈 스크린샷을 시각 확인했다. 크기별 전수 검사는 동일 출처 iframe을 사용했으며 실제 휴대폰 시험은 아니다.
- 9개 페이지의 중복 제거된 링크·자산 15개를 HTTP HEAD로 검사하여 오류 0건. 전화 링크와 동일 페이지 앵커는 HTTP 검사에서 제외했다.
- NAS 필터: 2개 카드 표시 및 aria-pressed 갱신. 문의: 유효 입력 후 시연 상태와 내용 초기화. 결제: dialog 열림 및 완료 상태. 브라우저 콘솔 오류 0건.
- 모바일 메뉴에서 Esc를 누르면 메뉴가 닫히고 포커스를 메뉴 버튼으로 돌려주도록 보완했다. 실제 Tab 입력으로 다음 포커스가 숨겨진 메뉴 대신 메인 제품 링크로 이동함을 확인했다.

### 로컬 실행

현재 미리보기: http://127.0.0.1:4190/integrated/index.html

일반 Node 환경에서는 `node integrated-site.mjs`로 통합 화면만 생성하고 `node preview.mjs`로 서버를 시작한 뒤 http://127.0.0.1:4173/integrated/index.html 을 연다. `npm run build`는 기존 시안까지 모두 생성한다.

현재 Windows처럼 Node가 PATH에 없다면 PowerShell에서 다음 명령을 사용한다.

```powershell
$env:ELECTRON_RUN_AS_NODE='1'
& 'C:/Users/DR_ACADEMY/AppData/Local/Programs/orca/Orca.exe' integrated-site.mjs
$env:PORT='4190'
& 'C:/Users/DR_ACADEMY/AppData/Local/Programs/orca/Orca.exe' preview.mjs
```

### 시안에 남긴 미확정 정보

제품 사진·모델·사양·가격·재고·납기·보증, 서비스 비용·기간·지원 조건, 시설·보유 장비 세부는 확정 전이다. 제품 이미지는 일반 시안 이미지이며 실제 제품 사진이 아니다. 세부 서비스 절차·결과물은 실제 운영 전 회사 확인이 필요하다. 문의는 무전송·무저장 화면 시연, 결제는 실제 주문·청구 없는 시연이다. 외부 배포 및 유료 사용은 하지 않았다.

기록일: 2026년 11월 5일

## 프로젝트와 현재 브랜치

- 저장소: `ailenoire1-hue/Myung_Project_Test`
- PM 브랜치: `user4`
- PM 워크트리: `C:/Users/DR_ACADEMY/orca/Myung_Project_Test`
- 공통 작업 규칙: [WEBSITE_WORK_RULES.md](WEBSITE_WORK_RULES.md)
- 문서 관리 위치: 프로젝트 최상위의 `규칙/` 폴더. 사용자의 요청에 따라 두 문서를 이 폴더로 이동했다.
- 사용자는 오르카 CLI를 통한 멀티에이전트 제작과 이번 기록의 현재 브랜치 저장을 요청했다.

## 인터뷰에서 확정한 사항

| 항목 | 확정 내용 |
| --- | --- |
| 사업 영역 | 컴퓨터·IT 기기 판매 및 수리, 데이터 복구, 포렌식, 침해사고 조사, 기업 보안 |
| 홈페이지 목적 | 제품·서비스 소개 및 판매 |
| 기존 자료 | 기존 홈페이지를 기반으로 진행 |
| 제작 범위 | 실제 공개 운영 전 단계인 브라우저용 디자인 시안 |
| 페이지 범위 | 주요 페이지 전체 |
| 개편 방식 | 로고·회사 정보를 유지하고 디자인 전면 개편 |
| 화면 대응 | PC·모바일 모두 |
| 디자인 | 밝은 배경과 짙은 남색 중심의 신뢰감 있는 전문 기업형 |
| 정보 기준 | 확인된 정보만 사용하고 부족한 정보는 임시 문구 표시 |
| 기능 범위 | 메뉴·페이지 이동·주요 UI 동작, 문의·결제는 시연용 |
| 도구와 배포 | 무료 도구와 로컬 미리보기만 사용 |
| 역할 결정 | PM이 작업마다 적합한 에이전트 선정 |
| 승인 방식 | 페이지 구성과 디자인 설명 승인 후 세부 작업 자율 진행 |
| 작업 공간 | 작업별 별도 오르카 워크트리, PM이 통합 |
| 의견 충돌 | 승인 방향 안에서 PM이 최종 결정 |
| 검토 | PM 검토와 다른 작업 세션의 교차 검토 |
| 사용자 보고 | 최종 결과 또는 사용자 판단이 필요한 경우 |
| 규칙 저장 | AGENTS.md 대신 이번 프로젝트의 별도 문서 |

## 기존 홈페이지 확인

사용자는 `https://mdfc-myung.co.kr/default/`를 개편 대상으로 확인했다. 브라우저 확인 당시 해당 경로는 404였고, `https://mdfc-myung.co.kr/`에서 명디지털포렌식센터 사이트가 정상 표시되었다.

현행 사이트의 포렌식·보안 중심 사업과 초기 인터뷰의 판매·수리·복구 영역 차이를 사용자에게 확인했다. 사용자는 두 영역을 모두 포함하는 통합 홈페이지를 선택했다.

## 승인된 페이지 구성

| 페이지 | 주요 내용 |
| --- | --- |
| 메인 | 회사 소개, 사업 영역별 진입, 대표 제품·서비스 |
| 회사 소개 | 회사 개요, 연혁, 기술력, 지점 안내 |
| 제품 소개 및 상세 | 컴퓨터·IT 기기·저장장치 분류와 제품 상세 |
| 수리 서비스 | 수리 대상, 이용 절차, 상담 안내 |
| 데이터 복구 | 저장매체별 서비스, 접수 절차, 주의사항 |
| 디지털포렌식 | 분석 대상, 서비스 범위, 진행 절차 |
| 침해사고·기업 보안 | 사고 조사, 보안 점검, 인프라 관리 |
| 고객 지원 | FAQ, 문의 시연, 연락처·방문 안내 |

사용자는 위 페이지 구성과 밝은 배경·남색 중심 디자인을 승인했다. 제품은 사진과 사양으로, 전문 서비스는 대상·절차·결과물로 설명하며 모바일에서는 사업 영역과 상담 메뉴 접근성을 우선한다. 확인되지 않은 제품 사진·사양·가격을 실제 정보처럼 사용하지 않는다.

## 오르카 작업 배정

현재 Codex 세션이 PM이다. 기존 Claude와 Antigravity 탭에 응답 확인 메시지를 보내 양쪽의 수신 응답을 확인했고, 이후 작업 세션 역할을 전달했다. 실제 제작은 다음 별도 워크트리의 오르카 작업 세션에 배정했다.

| 담당 | 배정 범위 | 작업 워크트리 | 산출물 |
| --- | --- | --- | --- |
| Claude | 제품 목록·상세, 수리, 데이터 복구 | `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-commerce` | `integrated-commerce.mjs` |
| Antigravity | 회사 소개, 포렌식, 침해사고·기업 보안 | `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-expertise` | `integrated-expertise.mjs` |
| Codex PM | 공통 디자인, 메인, 고객 지원, 통합·최종 검토 | 현재 PM 워크트리 | 공통 화면 및 통합 결과 |

### 재개에 필요한 오르카 식별자

- Run: `run_eacccd6da0c8`
- Claude Task: `task_8f6d2d636224`
- Claude Dispatch: `ctx_3333b6687d40`
- Antigravity Task: `task_1e377f388fbf`
- Antigravity Dispatch: `ctx_41254d7b0d3d`

두 작업 시작 명령은 성공했고 `state=ready`를 반환했다. 이후 Claude의 완료 보고를 수신했다. `integrated-commerce.mjs`를 커밋 `c4be39b`로 제출했으며, 구문 검사와 import 검증 통과, 네 페이지 및 필터 데이터 구성을 보고했다. PM의 코드 검토·통합·브라우저 검증은 아직 진행하지 않았다. Antigravity의 완료 보고는 아직 수신하지 않았다.

Claude는 작업 환경의 PATH에 Node가 없어 오르카에 포함된 Node v24를 `ELECTRON_RUN_AS_NODE`로 사용했다고 보고했다. 제품 필터 동작과 `.filters` 및 `table.specs` 스타일은 PM 통합 시 연결해야 한다.

Antigravity의 완료 보고도 수신했다. 커밋 `31400b38da438291ee0d4939285d22348748ad0f`로 `integrated-expertise.mjs`를 제출했고 회사 소개·포렌식·보안의 세 페이지에 대해 구문 및 ESM import 검증 통과를 보고했다. 두 작업 모두 PM의 검토와 통합은 아직 완료하지 않았다.

### 작업 세션의 산출물 계약

- 각 작업 세션은 배정된 모듈 한 개만 수정하고 커밋한다.
- 모듈은 `export const pages = [...]`를 제공한다.
- 각 페이지는 `{file, title, eyebrow, description, body}` 형식이며 `body`는 공통 main 내부 HTML이다.
- 공통 헤더·푸터·전체 HTML·CSS는 PM이 담당한다.
- Claude 페이지: `products.html`, `product-detail.html`, `repair.html`, `recovery.html`.
- Antigravity 페이지: `company.html`, `forensics.html`, `security.html`.
- 모듈 구문 및 import 검증 후 커밋 해시, 검증 결과, 차단 사항을 PM에게 보고한다.
- 제품 모델·가격·사양·서비스 보장·실적을 임의로 만들지 않는다. 미확정 정보는 명확히 표시한다.

## 남은 작업

1. Claude 제출 커밋 `c4be39b`와 Antigravity 제출 커밋 `31400b3`를 검토한다.
2. PM이 공통 디자인과 메인·고객 지원 화면을 구현한다.
3. 산출물을 검토하고 현재 브랜치에 통합한다.
4. 다른 작업 세션의 교차 검토를 수행하고 발견 사항을 수정한다.
5. 빌드, 페이지 이동, 주요 UI, PC·모바일 화면을 검증한다.
6. 로컬 미리보기 경로, 검증 결과 및 남은 임시 항목을 사용자에게 보고한다.

외부 배포는 승인 범위에 포함되지 않는다. 이 문서는 저장 시점의 진행 기록이며 최종 구현 완료 보고가 아니다.
