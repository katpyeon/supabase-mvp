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

## 디자인 시스템

이 프로젝트는 일관된 디자인 시스템을 구현하여 사용자 경험을 향상시키고 개발 생산성을 높입니다.

### 폰트 크기 시스템

상대적 단위(rem)를 사용하여 접근성과 반응형 디자인을 개선했습니다:

```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.25rem;   /* 20px */
--font-size-xl: 1.5rem;    /* 24px */
--font-size-2xl: 1.75rem;  /* 28px */
--font-size-3xl: 2rem;     /* 32px */
```

### 8포인트 그리드 시스템

일관된 간격을 위해 8포인트 그리드 시스템을 적용했습니다:

```css
--spacing-0: 0;
--spacing-1: 0.25rem;      /* 4px */
--spacing-2: 0.5rem;       /* 8px */
--spacing-3: 0.75rem;      /* 12px */
--spacing-4: 1rem;         /* 16px */
--spacing-5: 1.25rem;      /* 20px */
--spacing-6: 1.5rem;       /* 24px */
--spacing-8: 2rem;         /* 32px */
--spacing-10: 2.5rem;      /* 40px */
--spacing-12: 3rem;        /* 48px */
--spacing-16: 4rem;        /* 64px */
```

### 색상 시스템

일관된 색상 관리를 위한 CSS 변수:

```css
--background: #ffffff;
--foreground: #000000;
--accent: #333333;
--border: #e5e5e5;
```

### 반응형 디자인

기기 크기에 따라 폰트 크기 조정:

```css
/* 모바일 화면 */
@media (max-width: 768px) {
  :root {
    font-size: 14px;
  }
}

/* 대형 화면 */
@media (min-width: 1440px) {
  :root {
    font-size: 18px;
  }
}
```

### 디자인 시스템 이점

- **일관성**: 모든 UI 요소가 동일한 간격과 크기 규칙을 따릅니다
- **유지보수성**: 중앙 집중식 변수로 전체 애플리케이션의 스타일을 쉽게 수정할 수 있습니다
- **확장성**: 새로운 컴포넌트를 추가할 때 기존 디자인 패턴을 쉽게 적용할 수 있습니다
- **접근성**: 상대적 단위를 사용하여 사용자 설정에 더 잘 대응합니다
- **개발 효율성**: 개발자가 매번 값을 결정할 필요 없이 미리 정의된 값을 사용할 수 있습니다

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
