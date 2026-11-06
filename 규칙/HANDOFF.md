# 명정보 홈페이지 PM 핸드오프

> 재개 후 상태(2026-11-06): 새 PM 브랜치 `ailenoire1-hue/myung-pm-handoff`에서 제작·교차 검토·PM 검증을 완료했다. 현재 상태와 로컬 실행법은 [진행 기록의 완료 항목](PROJECT_PROGRESS.md)에 있다. 아래 내용은 인계 시점 이력으로 보존하며 미완료 목록은 이후 작업으로 해결했다.

인계일: 2026년 11월 6일. 사용자가 현재까지의 작업을 다른 세션에 핸드오프하도록 요청했다. 수신 세션이 PM 역할을 이어받는다.

## 먼저 읽을 문서

- [작업 규칙](WEBSITE_WORK_RULES.md)
- [진행 기록](PROJECT_PROGRESS.md)

## 승인 범위

컴퓨터·IT 기기 판매와 수리, 데이터 복구, 포렌식·침해사고·기업 보안을 포함하는 통합 홈페이지다. 메인, 회사 소개, 제품 목록·상세, 수리, 복구, 포렌식, 침해사고·기업 보안, 고객 지원을 PC·모바일 브라우저 시안으로 제작한다. 밝은 배경과 남색 중심의 전문 기업형 디자인과 위 페이지 구성을 사용자가 승인했다.

확인된 정보만 사용하고 미확정 부분은 임시 문구로 표시한다. 메뉴·페이지 이동·주요 UI는 동작하도록 하되 문의·결제는 시연용이다. 무료 도구와 로컬 미리보기만 허용된다. 외부 배포와 유료 사용은 범위 밖이다.

오르카 멀티에이전트를 사용하고 작업 세션은 별도 워크트리에서 작업한다. PM이 작업별 역할을 배정하고 검토·통합한다. 교차 검토가 필요하다. 승인 범위 안에서는 자율 진행하고 사용자에게는 최종 결과 또는 판단이 필요한 경우 보고한다. 규칙과 진행 기록은 `규칙/` 폴더에서 관리한다.

## Git 상태

- 원래 PM 브랜치: `user4`
- 원래 PM 경로: `C:/Users/DR_ACADEMY/orca/Myung_Project_Test`
- 문서 커밋: `9621c39`, `ce83058`
- 문서를 제외한 새 통합 홈페이지 구현은 아직 PM 브랜치에 반영되지 않았다.
- 미추적 `.openai/site-review-20261105/`에는 기존 사이트를 확인한 브라우저 스크립트 두 개만 있다. 제품 구현에 필요하지 않으며 임의 삭제하지 않는다.
- Git 작성자 설정이 없어 문서 커밋에 한해 `Codex <codex@localhost>`를 사용했다. 전역 설정은 변경하지 않았다.

## 작업 세션 제출 결과

| 세션 | 제출 커밋 | 파일 | 작업 경로 |
| --- | --- | --- | --- |
| Claude | `c4be39b` | `integrated-commerce.mjs` | `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-commerce` |
| Antigravity | `31400b38da438291ee0d4939285d22348748ad0f` | `integrated-expertise.mjs` | `C:/Users/DR_ACADEMY/orca/workspaces/Myung_Project_Test/myung-expertise` |

양쪽 모두 완료 보고를 수신했다. PM이 코드 검토·통합하거나 직접 검증하지는 않았다. 보고된 성공을 PM 검증 완료로 간주하지 않는다.

두 모듈은 `export const pages = [...]`를 제공하며 항목 형식은 `{file,title,eyebrow,description,body}`다. body는 공통 main 내부 HTML이다. Claude는 제품 목록·상세, 수리·복구 네 페이지, Antigravity는 회사·포렌식·보안 세 페이지를 제출했다. 공통 헤더·푸터·CSS, 메인·고객 지원 페이지 및 빌드 통합은 PM이 구현해야 한다.

Claude는 구문 및 import 검증 통과를 보고했고 제품 필터의 `data-filter`와 `data-product-category`를 연결해야 한다고 했다. `.filters`와 `table.specs` 스타일도 필요하다. Antigravity는 구문 및 import 검증, 참고 자산 존재 확인을 보고했다. 양쪽은 PATH에 Node가 없어 오르카 내장 Node와 `ELECTRON_RUN_AS_NODE`를 사용했다고 보고했다.

기존 Orchestration Run은 `run_eacccd6da0c8`, Claude Dispatch는 `ctx_3333b6687d40`, Antigravity Dispatch는 `ctx_41254d7b0d3d`다. 필요하면 기존 작업의 정확한 상태를 조회하고 새 수신 세션에 귀속되지 않은 inbox를 자기 inbox로 가정하지 않는다.

## 재개 순서

1. 인계 워크트리에서 문서 커밋이 없다면 필요한 문서 커밋을 가져온다. 사용자의 기존 변경을 덮어쓰지 않는다.
2. 제출된 두 모듈을 검토하고 커밋을 통합한다.
3. 기존 소스와 자산을 확인하여 공통 디자인, 메인·고객 지원, 제품 필터와 시연 UI를 구현한다. 기존 구현과 비교 가능한 `dist/integrated/` 경로를 고려했지만 아직 확정 구현은 없다.
4. 기존 package.json은 `build: node build.mjs`, `start: node preview.mjs`다. 기존 build.mjs는 많은 시안과 dist를 생성하므로 영향 범위를 확인하고 빌드를 연결한다.
5. 작업 세션의 교차 검토와 PM 검토 후 필요한 수정을 반영한다.
6. 빌드, 링크, 주요 UI, PC·모바일 레이아웃을 검증하고 로컬 확인 경로와 미확정 정보를 보고한다.

원래 `/default/` 경로는 확인 당시 404였다. 정상 사이트는 `https://mdfc-myung.co.kr/`이며 현재 포렌식·보안 중심이다. 사용자에게 차이를 설명한 뒤 통합 홈페이지 방향을 승인받았으므로 사업 범위를 재질문할 필요는 없다.

새 사이트 등록이나 외부 공개는 하지 않는다. 기존 `.openai/hosting.json`의 존재가 배포 승인을 뜻하지 않는다.
