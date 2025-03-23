<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { signInWithGithub } from '$lib/api/auth';
  
  let isLoading = false;
  let error = '';
  let returnUrl = '/';

  onMount(() => {
    // URL에서 returnUrl 파라미터가 있으면 그 값을 사용
    const urlParams = new URLSearchParams(window.location.search);
    const paramReturnUrl = urlParams.get('returnUrl');
    if (paramReturnUrl) {
      returnUrl = paramReturnUrl;
    }
  });

  async function handleGithubLogin() {
    try {
      isLoading = true;
      error = '';
      
      // 현재 도메인과 returnUrl을 조합하여 리디렉션 URL 생성
      const redirectTo = `${window.location.origin}${returnUrl}`;
      
      await signInWithGithub(redirectTo);
      // 리디렉션이 자동으로 이루어지므로 추가 코드 불필요
    } catch (e) {
      console.error('로그인 에러:', e);
      error = '로그인에 실패했습니다. 다시 시도해주세요.';
      isLoading = false;
    }
  }
</script>

<div class="login-page">
  <div class="login-container">
    <h1 class="login-title">로그인</h1>
    
    {#if error}
      <div class="error">{error}</div>
    {/if}
    
    <div class="login-options">
      <button 
        on:click={handleGithubLogin} 
        class="github-button" 
        disabled={isLoading}
      >
        {#if isLoading}
          <span class="loading"></span>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="github-icon">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub로 로그인
        {/if}
      </button>
    </div>

    <div class="login-message">
      <p>GitHub 계정으로 쉽게 로그인하세요.</p>
    </div>
  </div>
</div>

<style>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
  }

  .login-container {
    max-width: 400px;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 32px;
    background-color: var(--background);
  }

  .login-title {
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
  }

  .login-options {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .github-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #24292e;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 12px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s;
  }

  .github-button:hover {
    background-color: #2c3137;
  }

  .github-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .github-icon {
    flex-shrink: 0;
  }

  .login-message {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
</style> 