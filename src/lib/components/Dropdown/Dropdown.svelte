<script lang="ts" module>
  export interface DropdownItem {
    content: string;
    value: string;
    disabled?: boolean;
    icon?: string;
    type?: 'link';
    url?: string;
  }

  export interface DropdownItemGroup {
    label?: string;
    separated?: boolean;
    items: DropdownItem[];
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    items?: DropdownItem[];
    groups?: DropdownItemGroup[];
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    onItemClick?: (value: string) => void;
    trigger: Snippet;
  }

  let {
    items = [],
    groups = [],
    placement = 'bottom-start',
    onItemClick,
    trigger,
  }: Props = $props();

  let isOpen = $state(false);

  function handleItemClick(item: DropdownItem) {
    if (item.disabled) return;
    isOpen = false;
    onItemClick?.(item.value);
  }

  function handleBlur(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement;
    if (target && (e.currentTarget as HTMLElement)?.contains(target)) return;
    isOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') isOpen = false;
  }

  let allItems = $derived(() => {
    if (groups.length > 0) return groups;
    return items;
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bd-dropdown" onfocusout={handleBlur} onkeydown={handleKeydown}>
  <div class="bd-dropdown__trigger" onclick={() => isOpen = !isOpen}>
    {@render trigger()}
  </div>

  {#if isOpen}
    <div class="bd-dropdown__menu bd-dropdown__menu--{placement}" role="menu">
      {#if groups.length > 0}
        {#each groups as group, gi}
          {#if group.separated && gi > 0}
            <div class="bd-dropdown__separator"></div>
          {/if}
          {#if group.label}
            <div class="bd-dropdown__group-label">{group.label}</div>
          {/if}
          {#each group.items as item}
            <button
              type="button"
              class="bd-dropdown__item"
              class:bd-dropdown__item--disabled={item.disabled}
              disabled={item.disabled}
              role="menuitem"
              onclick={() => handleItemClick(item)}
            >
              {item.content}
            </button>
          {/each}
        {/each}
      {:else}
        {#each items as item}
          <button
            type="button"
            class="bd-dropdown__item"
            class:bd-dropdown__item--disabled={item.disabled}
            disabled={item.disabled}
            role="menuitem"
            onclick={() => handleItemClick(item)}
          >
            {item.content}
          </button>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .bd-dropdown {
    position: relative;
    display: inline-flex;
    font-family: var(--bd-font-family);
  }

  .bd-dropdown__trigger {
    cursor: pointer;
  }

  .bd-dropdown__menu {
    position: absolute;
    min-width: 10rem;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background-color: var(--bd-color-white);
    box-shadow: var(--bd-shadow-floating);
    z-index: var(--bd-z-popover);
    padding: var(--bd-spacing-xxs) 0;
    max-height: 20rem;
    overflow-y: auto;
  }

  .bd-dropdown__menu--bottom-start {
    top: 100%;
    left: 0;
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-dropdown__menu--bottom-end {
    top: 100%;
    right: 0;
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-dropdown__menu--top-start {
    bottom: 100%;
    left: 0;
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-dropdown__menu--top-end {
    bottom: 100%;
    right: 0;
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-dropdown__group-label {
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .bd-dropdown__separator {
    height: 1px;
    background-color: var(--bd-color-border);
    margin: var(--bd-spacing-xxs) 0;
  }

  .bd-dropdown__item {
    display: block;
    width: 100%;
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    cursor: pointer;
    text-align: left;
  }

  .bd-dropdown__item:hover:not(:disabled) {
    background-color: var(--bd-color-primary-10);
  }

  .bd-dropdown__item--disabled {
    color: var(--bd-color-text-disabled);
    cursor: not-allowed;
  }
</style>
