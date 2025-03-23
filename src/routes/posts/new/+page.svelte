<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createPost } from '$lib/api/posts';
  import { getCurrentUser, signInWithGithub, getUserDisplayName } from '$lib/api/auth';

  let title = '';
  let content = '';
  let author = '';
  let isLoading = false;
  let error = null;
  let currentUser = null;

  onMount(async () => {
    try {
      // 사용자 인증 체크
      currentUser = await getCurrentUser();
      if (!currentUser) {
        // 현재 페이지 URL을 리디렉션 URL로 저장
        const returnUrl = '/posts/new';
        goto(`/auth/login?returnUrl=${returnUrl}`);
      } else {
        // 사용자 이름으로 작성자 필드를 자동 설정
        author = getUserDisplayName(currentUser);
      }
    } catch (e) {
      console.error('인증 에러:', e);
      goto('/auth/login?returnUrl=/posts/new');
    }
  });

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) {
      error = '제목과 내용을 모두 입력해주세요.';
      return;
    }

    try {
      isLoading = true;
      error = null;

      const newPost = {
        title,
        content,
        author,
        user_id: currentUser?.id
      };

      await createPost(newPost);
      goto('/');
    } catch (e) {
      error = '포스트 생성에 실패했습니다.';
      console.error(e);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="post-form-container">
  <h1 class="page-title">새 포스트 작성</h1>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="post-form">
    <div class="form-group">
      <label for="title">제목</label>
      <input
        id="title"
        type="text"
        bind:value={title}
        required
        disabled={isLoading}
      />
    </div>

    <div class="form-group">
      <label for="author">작성자</label>
      <input
        id="author"
        type="text"
        bind:value={author}
        placeholder="익명"
        disabled={true}
      />
      <small class="form-text">GitHub 계정 이름이 자동으로 사용됩니다.</small>
    </div>

    <div class="form-group">
      <label for="content">내용</label>
      <textarea
        id="content"
        bind:value={content}
        rows="15"
        required
        disabled={isLoading}
      ></textarea>
    </div>

    <div class="form-actions">
      <a href="/" class="cancel-button">취소</a>
      <button type="submit" class="submit-button" disabled={isLoading}>
        {#if isLoading}
          <span class="loading"></span>
        {:else}
          저장
        {/if}
      </button>
    </div>
  </form>
</div>

<style>
  .post-form-container {
    margin-top: 20px;
  }

  .page-title {
    font-size: 28px;
    margin-bottom: 24px;
  }

  .post-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-weight: 500;
  }

  .form-text {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }

  textarea {
    resize: vertical;
    min-height: 200px;
    font-family: inherit;
    line-height: 1.5;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 16px;
  }

  .cancel-button {
    display: inline-block;
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
  }

  .submit-button {
    padding: 8px 24px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style> 