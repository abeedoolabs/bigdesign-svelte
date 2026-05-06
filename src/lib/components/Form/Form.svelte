<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLFormAttributes } from 'svelte/elements';

  interface Props extends HTMLFormAttributes {
    fullWidth?: boolean;
    children?: Snippet;
  }

  let {
    fullWidth = false,
    children,
    ...restProps
  }: Props = $props();
</script>

<form class="bd-form" class:bd-form--full-width={fullWidth} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</form>

<style>
  .bd-form {
    font-family: var(--bd-font-family);
  }

  .bd-form :global(.bd-form-group + .bd-form-group) {
    margin-top: var(--bd-spacing-lg);
  }

  .bd-form--full-width :global(.bd-input),
  .bd-form--full-width :global(.bd-textarea),
  .bd-form--full-width :global(.bd-select) {
    width: 100%;
  }
</style>
