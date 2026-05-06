<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLHRElement> {}

  let { ...restProps }: Props = $props();
</script>

<hr class="bd-hr" {...restProps} />

<style>
  .bd-hr {
    border: none;
    border-top: 1px solid var(--bd-color-border);
    margin: var(--bd-spacing-md) 0;
  }
</style>
