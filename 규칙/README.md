> **경로 갱신 (2026-11-06 소스 통합):** 홈페이지 소스는 모두 `source-code/`(프로젝트 루트)로 모았다. 아래 본문의 루트 기준 경로(`*.mjs`, `dist/`, `package.json`, `content.json`, `tests/`, `.versions/`, `./source-code/components`)는 `source-code/` 기준으로 읽는다. 실행은 `cd source-code` 후 `npm run build`, `npm start`, `node integrated-site.mjs`이며 출력은 `source-code/dist/`다. 루트에는 `규칙/`, `janiter/`, `assets/`, `source-code/`, `.openai/`, `README.md`만 둔다. 아래 내용은 과거 이력을 보존한다.

# 명정보 홈페이지 작업 시작 안내

새 PM과 작업 세션은 작업 지시문에서 이 문서를 명시적으로 전달받고 아래 순서대로 읽는다. `규칙/`의 문서는 자동으로 로드되지 않으므로 세션 시작 프롬프트에 읽을 문서와 역할을 포함한다.

1. [부트스트랩 규칙](BOOTSTRAP.md)
2. [공통 작업 규칙](WEBSITE_WORK_RULES.md)
3. [워크트리 구조](WORKTREE_STRUCTURE.md)
4. [진행 기록](PROJECT_PROGRESS.md)과 [인계 기록](HANDOFF.md)
5. 해당 작업의 [작업 배정 양식](TASK_TEMPLATE.md)

진행 기록과 인계 기록은 과거 시점의 내용이 포함된다. 현재 브랜치·커밋·실제 파일·오르카 상태와 대조하여 최신 상태를 판단한다. 새로운 사용자 지시가 기존 문서보다 우선한다.

## 새 세션 시작 프롬프트

```text
명정보 홈페이지 작업을 시작한다. 먼저 규칙/README.md와 연결된 BOOTSTRAP.md,
WEBSITE_WORK_RULES.md, WORKTREE_STRUCTURE.md를 읽어라.
역할, 작업 워크트리, 기준 커밋, 허용 파일, 완료 기준은 이번 작업 배정을 따른다.
현재 경로·브랜치·변경 상태와 기준 커밋 포함 여부를 확인한 뒤 배정 범위에서 작업하라.
무료 도구와 로컬 미리보기만 사용하며 결과·커밋·검증·미확정 사항을 PM에게 보고하라.
```

현재 `user4`에 없는 최신 구현이나 규칙은 PM이 지정한 커밋에서 전달받는다. 다른 워크트리의 미커밋 파일을 그대로 덮어써서 동기화하지 않는다.
