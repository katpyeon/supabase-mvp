<script>
  import LoadingSpinner from './LoadingSpinner.svelte';
  import ErrorDisplay from './ErrorDisplay.svelte';
  
  // 폼 필드 데이터
  export let title = '';
  export let content = '';
  export let author = '';
  
  // 상태 관련 데이터
  export let isLoading = false;
  export let error = '';
  
  // 폼 관련 설정
  export let formTitle = '포스트';
  export let cancelUrl = '/';
  export let submitButtonText = '저장';
  export let authorMessage = 'GitHub 계정 이름이 자동으로 사용됩니다.';
  
  // 이벤트 핸들러
  export let onSubmit = () => {};
</script>

<div class="post-form-container">
  <h1 class="page-title">{formTitle}</h1>

  <ErrorDisplay message={error} />

  {#if isLoading && !title && !content}
    <LoadingSpinner />
  {:else}
    <form on:submit|preventDefault={onSubmit} class="post-form">
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
        <small class="form-text">{authorMessage}</small>
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
        <a href={cancelUrl} class="cancel-button">취소</a>
        <button type="submit" class="submit-button" disabled={isLoading}>
          {#if isLoading}
            <LoadingSpinner useContainer={false} />
          {:else}
            {submitButtonText}
          {/if}
        </button>
      </div>
    </form>
  {/if}
</div>

<style>
  .post-form-container {
    margin-top: var(--spacing-5);
  }

  .page-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-6);
  }

  .post-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-5);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .form-group label {
    font-weight: 500;
  }

  .form-text {
    font-size: var(--font-size-xs);
    color: #666;
    margin-top: var(--spacing-1);
  }

  textarea {
    resize: vertical;
    min-height: var(--spacing-16);
    font-family: inherit;
    line-height: 1.5;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }

  .cancel-button {
    display: inline-block;
    padding: var(--spacing-2) var(--spacing-4);
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
  }

  .submit-button {
    padding: var(--spacing-2) var(--spacing-6);
    min-width: 6.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style> 