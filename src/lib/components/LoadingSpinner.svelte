<script lang="ts">
  // 컨테이너 사용 여부 (기본값: false)
  export let useContainer: boolean = false;
</script>

{#if useContainer}
  <div class="loading-container">
    <div class="loading"></div>
  </div>
{:else}
  <div class="loading"></div>
{/if}

<style>
  .loading-container {
    text-align: center;
    padding: 32px;
  }

  .loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: var(--foreground);
    animation: spin 1s ease-in-out infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style> 