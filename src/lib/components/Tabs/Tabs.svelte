<script lang="ts" module>
  export interface Tab {
    id: string;
    title: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    tabs: Tab[];
    activeTab?: string;
    onTabClick?: (tabId: string) => void;
    children?: Snippet;
  }

  let {
    tabs,
    activeTab = $bindable(tabs[0]?.id ?? ''),
    onTabClick,
    children,
  }: Props = $props();

  function handleTabClick(tabId: string) {
    activeTab = tabId;
    onTabClick?.(tabId);
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (newIndex !== index && !tabs[newIndex].disabled) {
      handleTabClick(tabs[newIndex].id);
      const tabEl = (e.currentTarget as HTMLElement)?.parentElement?.children[newIndex] as HTMLElement;
      tabEl?.focus();
    }
  }
</script>

<div class="bd-tabs">
  <div class="bd-tabs__list" role="tablist">
    {#each tabs as tab, i}
      <button
        type="button"
        class="bd-tabs__tab"
        class:bd-tabs__tab--active={activeTab === tab.id}
        role="tab"
        id="tab-{tab.id}"
        aria-selected={activeTab === tab.id}
        aria-controls="tabpanel-{tab.id}"
        tabindex={activeTab === tab.id ? 0 : -1}
        disabled={tab.disabled}
        onclick={() => handleTabClick(tab.id)}
        onkeydown={(e) => handleKeydown(e, i)}
      >
        {tab.title}
      </button>
    {/each}
  </div>
  <div
    class="bd-tabs__panel"
    role="tabpanel"
    id="tabpanel-{activeTab}"
    aria-labelledby="tab-{activeTab}"
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .bd-tabs {
    font-family: var(--bd-font-family);
  }

  .bd-tabs__list {
    display: flex;
    border-bottom: 1px solid var(--bd-color-border);
    gap: 0;
  }

  .bd-tabs__tab {
    position: relative;
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-regular);
    color: var(--bd-color-text-secondary);
    cursor: pointer;
    outline: none;
    transition: color var(--bd-transition-duration) var(--bd-transition-timing);
    white-space: nowrap;
  }

  .bd-tabs__tab::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
    transition: background-color var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-tabs__tab:hover:not(:disabled) {
    color: var(--bd-color-primary-40);
  }

  .bd-tabs__tab--active {
    color: var(--bd-color-primary-40);
    font-weight: var(--bd-font-weight-semi-bold);
  }

  .bd-tabs__tab--active::after {
    background-color: var(--bd-color-primary-40);
  }

  .bd-tabs__tab:focus-visible {
    box-shadow: inset 0 0 0 4px var(--bd-color-primary-20);
    border-radius: var(--bd-radius-normal) var(--bd-radius-normal) 0 0;
  }

  .bd-tabs__tab:disabled {
    color: var(--bd-color-text-disabled);
    cursor: not-allowed;
  }

  .bd-tabs__panel {
    padding: var(--bd-spacing-md) 0;
  }
</style>
