<script>
  import { onMount } from 'svelte';
  import { getPosts, searchPosts } from '$lib/api/posts';
  import { getCurrentUser } from '$lib/api/auth';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';
  import PostCard from '$lib/components/PostCard.svelte';

  let posts = [];
  let searchQuery = '';
  let isLoading = false;
  let error = '';
  let currentUser = null;

  onMount(async () => {
    try {
      // 사용자 정보 로드
      currentUser = await getCurrentUser();
      // 포스트 로드
      await loadPosts();
    } catch (e) {
      console.error('초기화 오류:', e);
    }
  });

  async function loadPosts() {
    try {
      isLoading = true;
      error = '';
      posts = await getPosts();
    } catch (e) {
      error = '포스트를 불러오는데 실패했습니다.';
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function handleSearch() {
    if (!searchQuery.trim()) {
      await loadPosts();
      return;
    }

    try {
      isLoading = true;
      error = '';
      posts = await searchPosts(searchQuery);
    } catch (e) {
      error = '검색에 실패했습니다.';
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function resetSearch() {
    searchQuery = '';
    await loadPosts();
  }
</script>

<section class="posts-section">
  <header class="posts-header">
    <h1 class="page-title">최근 포스트</h1>
    {#if currentUser}
      <a href="/posts/new" class="create-button">새 포스트 작성</a>
    {:else}
      <a href="/auth/login?returnUrl=/posts/new" class="create-button">로그인하여 글쓰기</a>
    {/if}
  </header>

  <div class="search-box">
    <input 
      type="text" 
      placeholder="포스트 제목 검색..." 
      bind:value={searchQuery}
      on:keyup={(e) => e.key === 'Enter' && handleSearch()}
    />
    <button on:click={handleSearch} class="search-button">검색</button>
    <button on:click={resetSearch} class="reset-button">목록</button>
  </div>

  <ErrorDisplay message={error} />

  {#if isLoading}
    <LoadingSpinner />
  {:else if posts.length === 0}
    <div class="empty-message">
      {searchQuery ? '검색 결과가 없습니다.' : '등록된 포스트가 없습니다.'}
    </div>
  {:else}
    <div class="posts-grid">
      {#each posts as post (post.id)}
        <PostCard {post} />
      {/each}
    </div>
  {/if}
</section>

<style>
  .posts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-5);
  }

  .create-button {
    display: inline-block;
    background-color: var(--foreground);
    color: var(--background);
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--spacing-1);
    text-decoration: none;
  }

  .search-box {
    display: flex;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-5);
  }

  .search-button {
    white-space: nowrap;
  }

  .reset-button {
    white-space: nowrap;
    background-color: var(--background);
    color: var(--foreground);
    border: 1px solid var(--border);
  }

  .reset-button:hover {
    background-color: #f5f5f5;
  }

  .posts-section {
    margin-top: var(--spacing-5);
  }

  .page-title {
    font-size: var(--font-size-2xl);
    margin: 0;
  }

  .empty-message {
    text-align: center;
    padding: var(--spacing-8);
    border: 1px solid var(--border);
    border-radius: var(--spacing-2);
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: var(--spacing-6);
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    font-size: var(--font-size-sm);
    color: #777;
    margin-bottom: var(--spacing-4);
  }
</style>
