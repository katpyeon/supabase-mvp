<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createPost } from '$lib/api/posts';
  import { getCurrentUser, getUserDisplayName } from '$lib/api/auth';
  import PostForm from '$lib/components/PostForm.svelte';

  let title = '';
  let content = '';
  let author = '';
  let isLoading = false;
  let error = '';
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
      error = '';

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

<PostForm
  bind:title
  bind:content
  bind:author
  {isLoading}
  {error}
  formTitle="새 포스트 작성"
  cancelUrl="/"
  submitButtonText="저장"
  authorMessage="GitHub 계정 이름이 자동으로 사용됩니다."
  onSubmit={handleSubmit}
/> 