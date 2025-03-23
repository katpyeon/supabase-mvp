# Supabase MVP

SvelteKit과 Supabase를 사용한 블로그 MVP 애플리케이션입니다. 깃허브 OAuth 로그인을 통해 사용자 인증을 처리하며, 일관된 디자인 시스템을 구현하여 사용자 경험을 향상시켰습니다.

## 프로젝트 설명

이 프로젝트는 현대적인 웹 기술을 활용한 블로그 MVP(Minimum Viable Product)입니다. 백엔드는 Supabase를 사용하여 데이터베이스, 인증, 저장소 기능을 구현했으며, 프론트엔드는 SvelteKit을 활용하여 빠르고 효율적인 사용자 인터페이스를 구현했습니다.

### 주요 기능

- 포스트 목록 조회 및 검색
- 포스트 상세 보기
- 포스트 작성/수정/삭제 (인증된 사용자만)
- GitHub OAuth 로그인
- 실시간 글자수 체크 (제목 최대 100자, 본문 최대 10,000자)

### 기술 스택

- **프론트엔드**: SvelteKit 5
- **백엔드**: Supabase
- **인증**: Supabase Auth (GitHub OAuth)
- **스타일링**: 순수 CSS + 디자인 시스템
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

## Supabase 설정

### 데이터베이스 스키마

프로젝트는 다음과 같은 데이터베이스 스키마를 사용합니다:

```typescript
// post.ts
export interface Post {
  id: string;        // 포스트 고유 ID
  title: string;     // 포스트 제목 (최대 100자)
  content: string;   // 포스트 본문 (최대 10,000자)
  author?: string;   // 작성자 이름
  created_at: string; // 생성 날짜/시간
  user_id?: string;  // 작성자 사용자 ID (GitHub 사용자 ID)
}
```

### SQL 테이블 생성

Supabase에서 다음 SQL을 실행하여 posts 테이블을 생성합니다:

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL CHECK (char_length(title) <= 100),
  content TEXT NOT NULL CHECK (char_length(content) <= 10000),
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  CONSTRAINT title_length CHECK (char_length(title) <= 100),
  CONSTRAINT content_length CHECK (char_length(content) <= 10000)
);
```

### Row Level Security (RLS) 설정

Supabase에서 다음과 같은 RLS 정책을 설정하여 보안을 구현합니다:

1. **읽기 권한 (모든 사용자)**
```sql
CREATE POLICY "모든 사용자가 포스트를 읽을 수 있음" ON posts
  FOR SELECT USING (true);
```

2. **쓰기 권한 (인증된 사용자만)**
```sql
CREATE POLICY "인증된 사용자만 포스트를 생성할 수 있음" ON posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

3. **수정 권한 (본인 포스트만)**
```sql
CREATE POLICY "사용자는 자신의 포스트만 수정할 수 있음" ON posts
  FOR UPDATE USING (auth.uid() = user_id);
```

4. **삭제 권한 (본인 포스트만)**
```sql
CREATE POLICY "사용자는 자신의 포스트만 삭제할 수 있음" ON posts
  FOR DELETE USING (auth.uid() = user_id);
```

### GitHub OAuth 인증 설정

1. GitHub 개발자 설정에서 OAuth 앱 등록:
   - Settings > Developer settings > OAuth Apps > New OAuth App
   - Application name: Supabase MVP Blog
   - Homepage URL: 배포된 사이트 URL 또는 로컬 개발 URL
   - Authorization callback URL: `https://<project-ref>.supabase.co/auth/v1/callback`

2. Supabase 인증 설정:
   - Supabase 대시보드에서 Authentication > Providers로 이동
   - GitHub provider 활성화
   - Client ID와 Client Secret 입력 (GitHub에서 생성한 값)
   - Site URL과 Redirect URL 설정

## SvelteKit 프로젝트 생성

### 프로젝트 초기화

```bash
# SvelteKit 프로젝트 생성
npm create svelte@latest supabase-mvp

# 프로젝트 디렉토리로 이동
cd supabase-mvp

# 의존성 설치
npm install

# Supabase 클라이언트 설치
npm install @supabase/supabase-js
```

### 환경 변수 설정

`.env` 파일 생성:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase 클라이언트 설정

`src/lib/supabase.ts` 파일 생성:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

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

3. `.env` 파일을 생성하고 Supabase 정보를 설정합니다.

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
