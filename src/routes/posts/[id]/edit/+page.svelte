<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getPost, updatePost } from '$lib/api/posts';
  import { getCurrentUser } from '$lib/api/auth';
  import PostForm from '$lib/components/PostForm.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';

  let post = null;
  let title = '';
  let content = '';
  let author = '';
  let isLoading = true;
  let error = '';
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
      error = '';

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

<div class="edit-page">
  {#if error && isLoading}
    <ErrorDisplay message={error} />
  {:else if isLoading && !post}
    <LoadingSpinner />
  {:else if error && !post}
    <ErrorDisplay message={error} />
  {:else}
    <PostForm
      bind:title
      bind:content
      bind:author
      {isLoading}
      {error}
      formTitle="포스트 수정"
      cancelUrl="/posts/{post.id}"
      submitButtonText="저장"
      authorMessage="작성자 이름은 변경할 수 없습니다."
      onSubmit={handleSubmit}
    />
  {/if}
</div> 