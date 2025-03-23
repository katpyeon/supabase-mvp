<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getPost, updatePost } from '$lib/api/posts';
  import { getCurrentUser, signInWithGithub, getUserDisplayName } from '$lib/api/auth';

  let post = null;
  let title = '';
  let content = '';
  let author = '';
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

      // 사용자 인증 체크
      currentUser = await getCurrentUser();
      if (!currentUser) {
        const returnUrl = `/posts/${id}/edit`;
        goto(`/auth/login?returnUrl=${returnUrl}`);
        return;
      }
      
      // 포스트 로드
      post = await getPost(id);
      
      if (!post) {
        error = '포스트를 찾을 수 없습니다.';
        return;
      }

      // 권한 체크 (포스트 작성자만 수정 가능)
      if (post.user_id && post.user_id !== currentUser.id) {
        error = '이 포스트를 수정할 권한이 없습니다.';
        return;
      }

      // 폼에 데이터 설정
      title = post.title;
      content = post.content;
      author = post.author || '';
    } catch (e) {
      error = '포스트를 불러오는데 실패했습니다.';
      console.error(e);
    } finally {
      isLoading = false;
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

      const updates = {
        title,
        content,
        author
      };

      await updatePost(post.id, updates);
      goto(`/posts/${post.id}`);
    } catch (e) {
      error = '포스트 수정에 실패했습니다.';
      console.error(e);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="post-form-container">
  <h1 class="page-title">포스트 수정</h1>

  {#if error}
    <div class="error">{error}</div>
  {:else if isLoading}
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  {:else}
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
        <small class="form-text">작성자 이름은 변경할 수 없습니다.</small>
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
        <a href="/posts/{post.id}" class="cancel-button">취소</a>
        <button type="submit" class="submit-button" disabled={isLoading}>
          {#if isLoading}
            <span class="loading"></span>
          {:else}
            저장
          {/if}
        </button>
      </div>
    </form>
  {/if}
</div>

<style>
  .post-form-container {
    margin-top: 20px;
  }

  .page-title {
    font-size: 28px;
    margin-bottom: 24px;
  }

  .loading-container {
    text-align: center;
    padding: 32px;
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