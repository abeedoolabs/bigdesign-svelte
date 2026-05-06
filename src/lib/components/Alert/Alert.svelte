<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info';
    header?: string;
    onClose?: () => void;
    actions?: Snippet;
    children?: Snippet;
  }

  let {
    variant = 'info',
    header,
    onClose,
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

<div class="bd-alert bd-alert--{variant}" role="alert">
  <div class="bd-alert__icon">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={iconPaths[variant]} />
    </svg>
  </div>

  <div class="bd-alert__content">
    {#if header}
      <span class="bd-alert__header">{header}</span>
    {/if}
    {#if children}
      <div class="bd-alert__message">
        {@render children()}
      </div>
    {/if}
    {#if actions}
      <div class="bd-alert__actions">
        {@render actions()}
      </div>
    {/if}
  </div>

  {#if onClose}
    <button class="bd-alert__close" onclick={onClose} aria-label="Close">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  {/if}
</div>

<style>
  .bd-alert {
    display: flex;
    align-items: flex-start;
    padding: var(--bd-spacing-md);
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    line-height: var(--bd-line-height-sm);
  }

  .bd-alert--success {
    background-color: var(--bd-color-success-10);
    color: var(--bd-color-text);
  }
  .bd-alert--success .bd-alert__icon {
    color: var(--bd-color-success-40);
  }

  .bd-alert--error {
    background-color: var(--bd-color-danger-10);
    color: var(--bd-color-text);
  }
  .bd-alert--error .bd-alert__icon {
    color: var(--bd-color-danger-40);
  }

  .bd-alert--warning {
    background-color: var(--bd-color-warning-10);
    color: var(--bd-color-text);
  }
  .bd-alert--warning .bd-alert__icon {
    color: var(--bd-color-warning-40);
  }

  .bd-alert--info {
    background-color: var(--bd-color-primary-10);
    color: var(--bd-color-text);
  }
  .bd-alert--info .bd-alert__icon {
    color: var(--bd-color-primary-40);
  }

  .bd-alert__icon {
    flex-shrink: 0;
    margin-right: var(--bd-spacing-sm);
  }

  .bd-alert__icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .bd-alert__content {
    flex: 1;
    min-width: 0;
  }

  .bd-alert__header {
    font-weight: var(--bd-font-weight-semi-bold);
    display: block;
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-alert__actions {
    margin-top: var(--bd-spacing-xs);
    display: flex;
    gap: var(--bd-spacing-xs);
  }

  .bd-alert__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--bd-color-secondary-60);
    cursor: pointer;
    margin-left: var(--bd-spacing-sm);
  }

  .bd-alert__close:hover {
    color: var(--bd-color-text);
  }

  .bd-alert__close svg {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>
