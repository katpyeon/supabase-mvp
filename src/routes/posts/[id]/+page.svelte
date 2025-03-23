<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getPost, deletePost } from '$lib/api/posts';
  import { getCurrentUser } from '$lib/api/auth';
  import { goto } from '$app/navigation';

  let post = null;
  let isLoading = true;
  let error = null;
  let currentUser = null;

  onMount(async () => {
    try {
      const id = $page.params.id;
      if (!id) {
        error = '잘못된 포스트 ID입니다.';
        return;
      }

      // 사용자 정보 로드
      currentUser = await getCurrentUser();
      
      // 포스트 로드
      post = await getPost(id);
      
      if (!post) {
        error = '포스트를 찾을 수 없습니다.';
        return;
      }
    } catch (e) {
      error = '포스트를 불러오는데 실패했습니다.';
      console.error(e);
    } finally {
      isLoading = false;
    }
  });

  async function handleDelete() {
    if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) return;

    try {
      isLoading = true;
      await deletePost(post.id);
      goto('/');
    } catch (e) {
      error = '포스트 삭제에 실패했습니다.';
      console.error(e);
      isLoading = false;
    }
  }
</script>

<div class="post-container">
  {#if error}
    <div class="error">{error}</div>
  {:else if isLoading}
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  {:else if post}
    <article class="post">
      <header class="post-header">
        <h1 class="post-title">{post.title}</h1>
        <div class="post-meta">
          <span class="post-author">작성자: {post.author || '익명'}</span>
          <span class="post-date">작성일: {new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </header>
      
      <div class="post-content">
        <p>{post.content}</p>
      </div>
      
      <div class="post-actions">
        <a href="/" class="back-button">목록으로</a>
        {#if currentUser && currentUser.id === post.user_id}
          <div class="action-buttons">
            <a href="/posts/{post.id}/edit" class="edit-button">수정</a>
            <button on:click={handleDelete} class="delete-button">삭제</button>
          </div>
        {:else if currentUser}
          <span class="not-owner-message">작성자만 수정/삭제할 수 있습니다.</span>
        {:else}
          <a href="/auth/login?returnUrl=/posts/{post.id}" class="login-button">로그인하여 더 많은 기능 사용</a>
        {/if}
      </div>
    </article>
  {/if}
</div>

<style>
  .post-container {
    margin-top: 20px;
  }

  .loading-container {
    text-align: center;
    padding: 32px;
  }

  .post {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 24px;
    background-color: var(--background);
  }

  .post-header {
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 16px;
  }

  .post-title {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 14px;
    color: #666;
  }

  .post-content {
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .post-actions {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back-button, .edit-button {
    display: inline-block;
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
  }

  .edit-button {
    background-color: var(--foreground);
    color: var(--background);
    border: none;
  }

  .delete-button {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .not-owner-message {
    font-size: 14px;
    color: #666;
    margin-left: 8px;
    align-self: center;
  }

  .login-button {
    display: inline-block;
    padding: 8px 16px;
    background-color: var(--foreground);
    color: var(--background);
    border: none;
    border-radius: 4px;
    text-decoration: none;
    margin-left: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }
</style> 