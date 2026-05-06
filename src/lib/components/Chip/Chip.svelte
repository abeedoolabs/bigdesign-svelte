<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    icon?: Snippet;
    onDelete?: () => void;
  }

  let {
    label,
    icon,
    onDelete,
  }: Props = $props();
</script>

<span class="bd-chip">
  {#if icon}
    <span class="bd-chip__icon">
      {@render icon()}
    </span>
  {/if}
  <span class="bd-chip__label">{label}</span>
  {#if onDelete}
    <button type="button" class="bd-chip__delete" onclick={onDelete} aria-label="Remove {label}">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  {/if}
</span>

<style>
  .bd-chip {
    display: inline-flex;
    align-items: center;
    padding: var(--bd-spacing-xxs) var(--bd-spacing-xs);
    background-color: var(--bd-color-secondary-30);
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    gap: var(--bd-spacing-xxs);
    margin: var(--bd-spacing-xxs);
  }

  .bd-chip__icon {
    display: flex;
    align-items: center;
  }

  .bd-chip__icon :global(svg) {
    width: 1rem;
    height: 1rem;
  }

  .bd-chip__label {
    line-height: 1;
  }

  .bd-chip__delete {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--bd-color-secondary-60);
    cursor: pointer;
    border-radius: var(--bd-radius-circle);
  }

  .bd-chip__delete:hover {
    color: var(--bd-color-text);
    background: var(--bd-color-secondary-40);
  }

  .bd-chip__delete svg {
    width: 0.875rem;
    height: 0.875rem;
  }
</style>
