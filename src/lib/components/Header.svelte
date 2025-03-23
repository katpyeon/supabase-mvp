<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getCurrentUser, signOut, getUserDisplayName } from '$lib/api/auth';
  import LoadingSpinner from './LoadingSpinner.svelte';

  let currentUser = null;
  let isLoading = true;
  let userName = '';

  onMount(async () => {
    try {
      currentUser = await getCurrentUser();
      if (currentUser) {
        userName = getUserDisplayName(currentUser);
      }
    } catch (e) {
      console.error('사용자 정보 로드 에러:', e);
    } finally {
      isLoading = false;
    }
  });

  function goToLogin() {
    goto('/auth/login');
  }

  async function handleSignOut() {
    try {
      await signOut();
      currentUser = null;
      goto('/');
    } catch (e) {
      console.error('로그아웃 에러:', e);
    }
  }
</script>

<header class="header">
  <div class="header-container">
    <div class="logo">
      <a href="/">Blog</a>
    </div>
    <div class="nav-buttons">
      {#if isLoading}
        <LoadingSpinner useContainer={false} />
      {:else if currentUser}
        <span class="user-name">{userName}</span>
        <button on:click={handleSignOut}>로그아웃</button>
      {:else}
        <button on:click={goToLogin}>로그인</button>
      {/if}
    </div>
  </div>
</header>

<style>
  .header {
    background-color: var(--background);
    color: var(--foreground);
    border-bottom: 1px solid var(--border);
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-4) var(--spacing-5);
  }

  .logo a {
    font-size: var(--font-size-xl);
    font-weight: bold;
    color: var(--foreground);
    text-decoration: none;
  }

  .nav-buttons {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  .user-name {
    font-size: var(--font-size-sm);
    font-weight: 500;
  }
</style> 