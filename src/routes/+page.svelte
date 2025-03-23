<script>
  import { onMount } from 'svelte';
  import { getPosts, searchPosts } from '$lib/api/posts';
  import { getCurrentUser } from '$lib/api/auth';

  let posts = [];
  let searchQuery = '';
  let isLoading = false;
  let error = null;
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
      error = null;
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
      error = null;
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

  {#if error}
    <div class="error">{error}</div>
  {/if}

  {#if isLoading}
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  {:else if posts.length === 0}
    <div class="empty-message">
      {searchQuery ? '검색 결과가 없습니다.' : '등록된 포스트가 없습니다.'}
    </div>
  {:else}
    <div class="posts-grid">
      {#each posts as post (post.id)}
        <article class="post-card">
          <h2 class="post-title">
            <a href="/posts/{post.id}">{post.title}</a>
          </h2>
          <p class="post-excerpt">{post.content?.substring(0, 100)}...</p>
          <div class="post-meta">
            <span class="post-author">작성자: {post.author || '익명'}</span>
            <span class="post-date">작성일: {new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .posts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .create-button {
    display: inline-block;
    background-color: var(--foreground);
    color: var(--background);
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
  }

  .search-box {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
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

  .loading-container {
    text-align: center;
    padding: 32px;
  }

  .posts-section {
    margin-top: 20px;
  }

  .page-title {
    font-size: 28px;
    margin: 0;
  }

  .empty-message {
    text-align: center;
    padding: 32px;
    border: 1px solid var(--border);
    border-radius: 8px;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .post-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .post-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .post-title a {
    color: var(--foreground);
    text-decoration: none;
  }

  .post-title a:hover {
    text-decoration: underline;
  }

  .post-excerpt {
    color: #555;
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 14px;
    color: #777;
    margin-bottom: 16px;
  }
</style>
