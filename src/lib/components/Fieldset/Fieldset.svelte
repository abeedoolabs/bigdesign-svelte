<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    legend?: string;
    description?: string;
    children?: Snippet;
  }

  let {
    legend,
    description,
    children,
  }: Props = $props();
</script>

<fieldset class="bd-fieldset">
  {#if legend}
    <legend class="bd-fieldset__legend">{legend}</legend>
  {/if}
  {#if description}
    <p class="bd-fieldset__description">{description}</p>
  {/if}
  {#if children}
    <div class="bd-fieldset__content">
      {@render children()}
    </div>
  {/if}
</fieldset>

<style>
  .bd-fieldset {
    border: none;
    padding: 0;
    margin: 0;
    font-family: var(--bd-font-family);
  }

  .bd-fieldset__legend {
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xs);
    padding: 0;
  }

  .bd-fieldset__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xs);
  }

  .bd-fieldset__content {
    display: flex;
    flex-direction: column;
    gap: var(--bd-spacing-xs);
  }
</style>
