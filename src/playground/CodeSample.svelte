<script lang="ts">
  let {
    code = ''
  }: {
    code: string;
  } = $props();

  let copied = $state(false);

  function copy() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<div class="code-sample">
  <button type="button" class="code-sample__copy" onclick={copy}>
    {#if copied}
      Copied!
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      Copy
    {/if}
  </button>
  <div class="code-sample__block">
    <pre><code>{code}</code></pre>
  </div>
</div>

<style>
  .code-sample {
    position: relative;
  }

  .code-sample__copy {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: var(--bd-radius-normal);
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: 0.75rem;
    color: var(--bd-color-text-secondary);
    cursor: pointer;
    z-index: 1;
  }

  .code-sample__copy:hover {
    background: var(--bd-color-secondary-30);
    color: var(--bd-color-text);
  }

  .code-sample__block {
    background: var(--bd-color-secondary-10);
    border-radius: var(--bd-radius-normal);
    padding: 1rem 3.5rem 1rem 1rem;
    overflow-x: auto;
  }

  pre {
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.5;
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
    white-space: pre;
  }

  code {
    color: var(--bd-color-text);
  }
</style>
