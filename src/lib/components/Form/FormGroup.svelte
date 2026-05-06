<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="bd-form-group">
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .bd-form-group {
    display: flex;
    flex-direction: column;
    gap: var(--bd-spacing-xs);
  }
</style>
