# 명정보 홈페이지

홈페이지 소스코드는 모두 `source-code/`(프로젝트 루트)에 있다. 이 폴더 밖에는 작업 규칙과 보관용 폴더만 둔다.

```text
.
├── source-code/   홈페이지 프로젝트 루트 (소스, package.json, content.json, dist/, tests/, .versions/)
├── 규칙/          작업 규칙, 진행·인계 기록
├── assets/images/ 새 이미지 원본 보관 (빌드 복사 연결 전에는 웹에 표시되지 않음)
├── janiter/       정리 작업용 폴더
└── .openai/       호스팅 메타데이터 (static directory: source-code/dist)
```

## 실행 (Node.js만 필요, 패키지 설치 없음)

```powershell
cd source-code
npm run build        # 전체 시안 + 통합 화면을 dist/ 에 생성
npm start            # http://127.0.0.1:4173/ (PORT 환경변수로 포트 변경)
node integrated-site.mjs   # 통합 홈페이지 9페이지만 dist/integrated/ 에 생성
node tests/intro-boot.test.mjs   # 테스트는 파일별로 실행
```

통합 화면은 http://127.0.0.1:4173/integrated/index.html 에서 확인한다. 실행 위치와 관계없이 출력은 항상 `source-code/dist/`이다.

PATH에 Node가 없으면 [규칙/PROJECT_PROGRESS.md](규칙/PROJECT_PROGRESS.md)의 Orca 내장 런타임 방법을 참고하되, 실행 파일은 `source-code/`에서 실행한다. 컴포넌트 구조는 [규칙/COMPONENTS.md](규칙/COMPONENTS.md), 작업 규칙은 [규칙/README.md](규칙/README.md)를 본다. 기존 홈페이지 시안 설명은 `source-code/README.md`에 있다.
