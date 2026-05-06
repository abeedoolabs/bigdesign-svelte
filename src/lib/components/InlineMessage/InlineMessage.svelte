<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info';
    actions?: Snippet;
    children?: Snippet;
  }

  let {
    variant = 'info',
    actions,
    children,
  }: Props = $props();

  const iconPaths: Record<string, string> = {
    success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  };
</script>

<div class="bd-inline-message bd-inline-message--{variant}" role="status">
  <div class="bd-inline-message__icon">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={iconPaths[variant]} />
    </svg>
  </div>

  <div class="bd-inline-message__content">
    {#if children}
      {@render children()}
    {/if}
    {#if actions}
      <div class="bd-inline-message__actions">
        {@render actions()}
      </div>
    {/if}
  </div>
</div>

<style>
  .bd-inline-message {
    display: flex;
    align-items: flex-start;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    line-height: var(--bd-line-height-sm);
    color: var(--bd-color-text);
  }

  .bd-inline-message__icon {
    flex-shrink: 0;
    margin-right: var(--bd-spacing-xs);
  }

  .bd-inline-message__icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .bd-inline-message--success .bd-inline-message__icon {
    color: var(--bd-color-success-40);
  }

  .bd-inline-message--error .bd-inline-message__icon {
    color: var(--bd-color-danger-40);
  }

  .bd-inline-message--warning .bd-inline-message__icon {
    color: var(--bd-color-warning-40);
  }

  .bd-inline-message--info .bd-inline-message__icon {
    color: var(--bd-color-primary-40);
  }

  .bd-inline-message__content {
    flex: 1;
    min-width: 0;
  }

  .bd-inline-message__actions {
    margin-top: var(--bd-spacing-xxs);
  }
</style>
