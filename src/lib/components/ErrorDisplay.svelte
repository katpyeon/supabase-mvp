<script>
  export let message = '';
</script>

{#if message}
  <div class="error">{message}</div>
{/if}

<style>
  .error {
    background-color: #ffebee;
    color: #c62828;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 16px;
  }
</style> 