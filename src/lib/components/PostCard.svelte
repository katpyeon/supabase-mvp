<script>
  export let post = {
    id: '',
    title: '',
    content: '',
    author: '',
    created_at: new Date().toISOString()
  };
  
  // 내용 미리보기 길이
  export let excerptLength = 100;
</script>

<article class="post-card">
  <h2 class="post-title">
    <a href="/posts/{post.id}">{post.title}</a>
  </h2>
  <p class="post-excerpt">{post.content?.substring(0, excerptLength)}...</p>
  <div class="post-meta">
    <span class="post-author">작성자: {post.author || '익명'}</span>
    <span class="post-date">작성일: {new Date(post.created_at).toLocaleDateString()}</span>
  </div>
</article>

<style>
  .post-card {
    border: 1px solid var(--border);
    border-radius: var(--spacing-2);
    padding: var(--spacing-5);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .post-card:hover {
    transform: translateY(calc(-1 * var(--spacing-1)));
    box-shadow: 0 var(--spacing-1) var(--spacing-3) rgba(0, 0, 0, 0.05);
  }

  .post-title {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-2);
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
    margin-bottom: var(--spacing-4);
    line-height: 1.5;
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    font-size: var(--font-size-sm);
    color: #777;
  }
</style> 