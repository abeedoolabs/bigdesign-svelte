<script lang="ts" module>
  export interface PillTab {
    id: string;
    title: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    tabs: PillTab[];
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

  function handleClick(tabId: string) {
    activeTab = tabId;
    onTabClick?.(tabId);
  }
</script>

<div class="bd-pill-tabs">
  <div class="bd-pill-tabs__list" role="tablist">
    {#each tabs as tab}
      <button
        type="button"
        class="bd-pill-tabs__tab"
        class:bd-pill-tabs__tab--active={activeTab === tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        tabindex={activeTab === tab.id ? 0 : -1}
        disabled={tab.disabled}
        onclick={() => handleClick(tab.id)}
      >
        {tab.title}
      </button>
    {/each}
  </div>
  {#if children}
    <div class="bd-pill-tabs__panel" role="tabpanel">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .bd-pill-tabs {
    font-family: var(--bd-font-family);
  }

  .bd-pill-tabs__list {
    display: flex;
    gap: var(--bd-spacing-xxs);
    flex-wrap: wrap;
  }

  .bd-pill-tabs__tab {
    padding: var(--bd-spacing-xxs) var(--bd-spacing-sm);
    border: 1px solid var(--bd-color-border);
    border-radius: 1rem;
    background: var(--bd-color-white);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    cursor: pointer;
    transition: all var(--bd-transition-duration) var(--bd-transition-timing);
    white-space: nowrap;
  }

  .bd-pill-tabs__tab:hover:not(:disabled) {
    border-color: var(--bd-color-primary-40);
    color: var(--bd-color-primary-40);
  }

  .bd-pill-tabs__tab--active {
    background: var(--bd-color-primary-40);
    border-color: var(--bd-color-primary-40);
    color: var(--bd-color-white);
    font-weight: var(--bd-font-weight-semi-bold);
  }

  .bd-pill-tabs__tab--active:hover:not(:disabled) {
    background: var(--bd-color-primary-50);
    border-color: var(--bd-color-primary-50);
    color: var(--bd-color-white);
  }

  .bd-pill-tabs__tab:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .bd-pill-tabs__tab:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-pill-tabs__panel {
    padding: var(--bd-spacing-md) 0;
  }
</style>
