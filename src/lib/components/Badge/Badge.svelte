<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'danger' | 'secondary' | 'success' | 'warning' | 'primary';
    label: string;
    children?: Snippet;
  }

  let {
    variant = 'secondary',
    label,
    children,
  }: Props = $props();
</script>

<span class="bd-badge bd-badge--{variant}" role="status" aria-label={label}>
  {#if children}
    {@render children()}
  {:else}
    {label}
  {/if}
</span>

<style>
  .bd-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--bd-spacing-xxs) var(--bd-spacing-xs);
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-semi-bold);
    line-height: 1;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .bd-badge--secondary {
    background-color: var(--bd-color-secondary-20);
    color: var(--bd-color-secondary-60);
  }

  .bd-badge--primary {
    background-color: var(--bd-color-primary-10);
    color: var(--bd-color-primary-60);
  }

  .bd-badge--success {
    background-color: var(--bd-color-success-10);
    color: var(--bd-color-success-60);
  }

  .bd-badge--warning {
    background-color: var(--bd-color-warning-10);
    color: var(--bd-color-warning-70);
  }

  .bd-badge--danger {
    background-color: var(--bd-color-danger-10);
    color: var(--bd-color-danger-60);
  }
</style>
