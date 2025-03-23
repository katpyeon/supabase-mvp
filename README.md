# Supabase MVP

SvelteKit과 Supabase를 사용한 포스트 관리 애플리케이션입니다. 깃허브 OAuth 로그인을 통해 사용자 인증을 처리합니다.

## 주요 기능

- 포스트 목록 조회
- 포스트 상세 보기
- 포스트 작성/수정/삭제 (인증된 사용자만)
- 포스트 검색
- GitHub OAuth 로그인

## 기술 스택

- **프론트엔드**: SvelteKit 5
- **백엔드**: Supabase
- **인증**: Supabase Auth (GitHub OAuth)
- **스타일링**: 순수 CSS (Tailwind CSS 제거됨)
- **언어**: TypeScript

## 설치 및 실행

### 사전 요구사항

- Node.js (최신 LTS 버전 권장)
- yarn 또는 npm
- Supabase 계정 및 프로젝트

### 환경 설정

1. 이 저장소를 클론합니다:

```bash
git clone <repository-url>
cd supabase-mvp
```

2. 의존성을 설치합니다:

```bash
npm install
# 또는
yarn
```

3. `.env` 파일을 생성하고 다음 변수를 설정합니다:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. GitHub OAuth 설정:
   - Supabase 대시보드에서 Authentication > Providers로 이동
   - GitHub provider 활성화
   - GitHub 개발자 설정에서 OAuth 앱 등록
   - 리디렉션 URL 설정 (Supabase에서 제공하는 URL 사용)
   - Client ID와 Client Secret을 Supabase 설정에 입력

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:5173`에 접속하여 애플리케이션을 확인할 수 있습니다.

## 빌드 및 배포

프로덕션 빌드를 생성하려면:

```bash
npm run build
# 또는
yarn build
```

빌드 미리보기:

```bash
npm run preview
# 또는
yarn preview
```

## 테스트

유닛 테스트 실행:

```bash
npm run test
# 또는
yarn test
```
