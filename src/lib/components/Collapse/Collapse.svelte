<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    initiallyOpen?: boolean;
    onCollapseChange?: (isOpen: boolean) => void;
    children?: Snippet;
  }

  let {
    title,
    initiallyOpen = false,
    onCollapseChange,
    children,
  }: Props = $props();

  let isOpen = $state(initiallyOpen);
  let contentId = `bd-collapse-content-${Math.random().toString(36).slice(2, 9)}`;
  let triggerId = `bd-collapse-trigger-${Math.random().toString(36).slice(2, 9)}`;

  function toggle() {
    isOpen = !isOpen;
    onCollapseChange?.(isOpen);
  }
</script>

<div class="bd-collapse">
  <button
    type="button"
    class="bd-collapse__trigger"
    id={triggerId}
    aria-controls={contentId}
    aria-expanded={isOpen}
    onclick={toggle}
  >
    <span class="bd-collapse__title">{title}</span>
    <svg class="bd-collapse__icon" class:bd-collapse__icon--open={isOpen} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </button>
  <div
    class="bd-collapse__content"
    class:bd-collapse__content--open={isOpen}
    id={contentId}
    role="region"
    aria-labelledby={triggerId}
    hidden={!isOpen}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .bd-collapse {
    font-family: var(--bd-font-family);
  }

  .bd-collapse__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--bd-spacing-sm) 0;
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-primary-40);
    cursor: pointer;
    text-align: left;
  }

  .bd-collapse__trigger:hover {
    color: var(--bd-color-primary-50);
  }

  .bd-collapse__icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
    flex-shrink: 0;
  }

  .bd-collapse__icon--open {
    transform: rotate(180deg);
  }

  .bd-collapse__content {
    display: none;
    padding-bottom: var(--bd-spacing-md);
  }

  .bd-collapse__content--open {
    display: block;
  }
</style>
