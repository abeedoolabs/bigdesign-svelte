<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    ordered?: boolean;
    children: Snippet;
  }

  let {
    ordered = false,
    children,
  }: Props = $props();
</script>

{#if ordered}
  <ol class="bd-list bd-list--ordered">
    {@render children()}
  </ol>
{:else}
  <ul class="bd-list bd-list--unordered">
    {@render children()}
  </ul>
{/if}

<style>
  .bd-list {
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    margin: 0 0 var(--bd-spacing-md);
    padding-left: var(--bd-spacing-xl);
  }

  .bd-list--unordered {
    list-style-type: disc;
  }

  .bd-list--ordered {
    list-style-type: decimal;
  }

  .bd-list :global(li) {
    margin-bottom: var(--bd-spacing-xxs);
    line-height: var(--bd-line-height-md);
  }
</style>
