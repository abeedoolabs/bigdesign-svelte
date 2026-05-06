<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    header?: string;
    description?: string;
    action?: Snippet;
    children?: Snippet;
  }

  let {
    header,
    description,
    action,
    children,
  }: Props = $props();
</script>

<div class="bd-panel">
  {#if header || action}
    <div class="bd-panel__header">
      <div class="bd-panel__header-text">
        {#if header}
          <h2 class="bd-panel__title">{header}</h2>
        {/if}
        {#if description}
          <p class="bd-panel__description">{description}</p>
        {/if}
      </div>
      {#if action}
        <div class="bd-panel__action">
          {@render action()}
        </div>
      {/if}
    </div>
  {/if}
  <div class="bd-panel__body">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .bd-panel {
    background-color: var(--bd-color-white);
    border-radius: var(--bd-radius-normal);
    box-shadow: var(--bd-shadow-raised);
    padding: var(--bd-spacing-xl);
    font-family: var(--bd-font-family);
  }

  .bd-panel__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: var(--bd-spacing-xl);
  }

  .bd-panel__title {
    font-size: var(--bd-font-size-xl);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-xl);
    color: var(--bd-color-text);
    margin: 0;
  }

  .bd-panel__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: var(--bd-spacing-xxs) 0 0;
  }

  .bd-panel__action {
    flex-shrink: 0;
    margin-left: var(--bd-spacing-md);
  }

  .bd-panel__body {
    color: var(--bd-color-text);
  }
</style>
