<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'success' | 'error' | 'warning' | 'info';
    children?: Snippet;
  }

  let {
    variant = 'info',
    children,
  }: Props = $props();

  const iconPaths: Record<string, string> = {
    success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  };
</script>

<div class="bd-status-message bd-status-message--{variant}" role="status">
  <svg class="bd-status-message__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={iconPaths[variant]} />
  </svg>
  {#if children}
    <span class="bd-status-message__text">{@render children()}</span>
  {/if}
</div>

<style>
  .bd-status-message {
    display: inline-flex;
    align-items: center;
    gap: var(--bd-spacing-xxs);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
  }

  .bd-status-message__icon { width: 1.125rem; height: 1.125rem; flex-shrink: 0; }

  .bd-status-message--success .bd-status-message__icon { color: var(--bd-color-success-40); }
  .bd-status-message--error .bd-status-message__icon { color: var(--bd-color-danger-40); }
  .bd-status-message--warning .bd-status-message__icon { color: var(--bd-color-warning-40); }
  .bd-status-message--info .bd-status-message__icon { color: var(--bd-color-primary-40); }
</style>
