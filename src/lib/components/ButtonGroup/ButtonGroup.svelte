<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="bd-button-group" role="group">
  {@render children()}
</div>

<style>
  .bd-button-group {
    display: inline-flex;
    font-family: var(--bd-font-family);
  }

  .bd-button-group :global(.bd-button) {
    border-radius: 0;
    margin-left: -1px;
    width: auto;
  }

  .bd-button-group :global(.bd-button:first-child) {
    border-radius: var(--bd-radius-normal) 0 0 var(--bd-radius-normal);
    margin-left: 0;
  }

  .bd-button-group :global(.bd-button:last-child) {
    border-radius: 0 var(--bd-radius-normal) var(--bd-radius-normal) 0;
  }

  .bd-button-group :global(.bd-button:only-child) {
    border-radius: var(--bd-radius-normal);
  }
</style>
