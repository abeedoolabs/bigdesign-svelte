<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    isOpen?: boolean;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    onClose?: () => void;
    trigger: Snippet;
    children: Snippet;
  }

  let {
    isOpen = $bindable(false),
    placement = 'bottom',
    onClose,
    trigger,
    children,
  }: Props = $props();

  function handleBlur(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement;
    if (target && (e.currentTarget as HTMLElement)?.contains(target)) return;
    isOpen = false;
    onClose?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { isOpen = false; onClose?.(); }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bd-popover-wrapper" onfocusout={handleBlur} onkeydown={handleKeydown}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="bd-popover__trigger" onclick={() => isOpen = !isOpen}>
    {@render trigger()}
  </div>

  {#if isOpen}
    <div class="bd-popover bd-popover--{placement}">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .bd-popover-wrapper {
    position: relative;
    display: inline-flex;
    font-family: var(--bd-font-family);
  }

  .bd-popover__trigger {
    cursor: pointer;
  }

  .bd-popover {
    position: absolute;
    padding: var(--bd-spacing-md);
    background: var(--bd-color-white);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    box-shadow: var(--bd-shadow-floating);
    z-index: var(--bd-z-popover);
    min-width: 12rem;
  }

  .bd-popover--bottom { top: calc(100% + var(--bd-spacing-xxs)); left: 0; }
  .bd-popover--top { bottom: calc(100% + var(--bd-spacing-xxs)); left: 0; }
  .bd-popover--right { left: calc(100% + var(--bd-spacing-xxs)); top: 0; }
  .bd-popover--left { right: calc(100% + var(--bd-spacing-xxs)); top: 0; }
</style>
