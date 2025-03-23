<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getCurrentUser, signOut } from '$lib/api/auth';

  let currentUser = null;
  let isLoading = true;

  onMount(async () => {
    try {
      currentUser = await getCurrentUser();
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
        <div class="loading"></div>
      {:else if currentUser}
        <span class="user-email">{currentUser.email}</span>
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
    padding: 16px 20px;
  }

  .logo a {
    font-size: 24px;
    font-weight: bold;
    color: var(--foreground);
    text-decoration: none;
  }

  .nav-buttons {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .user-email {
    font-size: 14px;
  }
</style> 