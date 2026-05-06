<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    isOpen?: boolean;
    header?: string;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    onClose?: () => void;
    actions?: Snippet;
    children?: Snippet;
  }

  let {
    isOpen = $bindable(false),
    header,
    closeOnClickOutside = true,
    closeOnEsc = true,
    onClose,
    actions,
    children,
  }: Props = $props();

  function handleClose() {
    isOpen = false;
    onClose?.();
  }

  function handleBackdropClick() {
    if (closeOnClickOutside) handleClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closeOnEsc) handleClose();
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="bd-modal-backdrop" onclick={handleBackdropClick} onkeydown={handleKeydown} role="presentation">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="bd-modal" role="dialog" aria-modal="true" aria-label={header} onclick={(e) => e.stopPropagation()} onkeydown={() => {}}>
      {#if header}
        <div class="bd-modal__header">
          <h2 class="bd-modal__title">{header}</h2>
          <button class="bd-modal__close" onclick={handleClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      {/if}

      <div class="bd-modal__body">
        {#if children}
          {@render children()}
        {/if}
      </div>

      {#if actions}
        <div class="bd-modal__actions">
          {@render actions()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .bd-modal-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(49, 52, 64, 0.5);
    z-index: var(--bd-z-modal-backdrop);
  }

  .bd-modal {
    position: relative;
    background-color: var(--bd-color-white);
    border-radius: var(--bd-radius-normal);
    box-shadow: var(--bd-shadow-floating);
    max-width: 32rem;
    width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    z-index: var(--bd-z-modal);
    font-family: var(--bd-font-family);
  }

  .bd-modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--bd-spacing-xl);
    border-bottom: 1px solid var(--bd-color-border);
  }

  .bd-modal__title {
    font-size: var(--bd-font-size-xl);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-xl);
    color: var(--bd-color-text);
    margin: 0;
  }

  .bd-modal__close {
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
  }

  .bd-modal__close:hover {
    color: var(--bd-color-text);
  }

  .bd-modal__close svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .bd-modal__body {
    padding: var(--bd-spacing-xl);
    overflow-y: auto;
    flex: 1;
  }

  .bd-modal__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--bd-spacing-xs);
    padding: var(--bd-spacing-md) var(--bd-spacing-xl);
    border-top: 1px solid var(--bd-color-border);
  }
</style>
