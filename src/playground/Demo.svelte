<script lang="ts">
  import type { Snippet } from 'svelte';
  import CodeSample from './CodeSample.svelte';
  import PropTable, { type PropDef } from './PropTable.svelte';

  let {
    title = '',
    description = '',
    code = '',
    props = [] as PropDef[],
    children
  }: {
    title: string;
    description?: string;
    code?: string;
    props?: PropDef[];
    children: Snippet;
  } = $props();

  let showUsage = $state(false);
  let activeTab = $state<'code' | 'props'>('code');

  const hasUsage = $derived(!!code || props.length > 0);
</script>

<div class="demo" id={title.toLowerCase().replace(/\s+/g, '-')}>
  <h3 class="demo__title">{title}</h3>
  {#if description}
    <p class="demo__description">{description}</p>
  {/if}
  <div class="demo__container">
    <div class="demo__preview">
      {@render children()}
    </div>
    {#if hasUsage}
      <div class="demo__usage-toggle-bar">
        <button
          type="button"
          class="demo__usage-toggle"
          onclick={() => showUsage = !showUsage}
        >
          {showUsage ? 'Hide' : 'Show'} Usage
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="demo__chevron" class:demo__chevron--open={showUsage}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {#if showUsage}
          <div class="demo__usage">
            {#if code && props.length > 0}
              <div class="demo__tabs">
                <button
                  type="button"
                  class="demo__tab"
                  class:demo__tab--active={activeTab === 'code'}
                  onclick={() => activeTab = 'code'}
                >
                  Code
                </button>
                <button
                  type="button"
                  class="demo__tab"
                  class:demo__tab--active={activeTab === 'props'}
                  onclick={() => activeTab = 'props'}
                >
                  Props
                </button>
              </div>
            {/if}

            {#if (!props.length || activeTab === 'code') && code}
              <div class="demo__code-area">
                <CodeSample {code} />
              </div>
            {:else if props.length > 0}
              <div class="demo__props-area">
                <PropTable {props} />
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .demo {
    margin-bottom: 2rem;
  }

  .demo__title {
    font-size: var(--bd-font-size-lg);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin: 0 0 0.25rem;
  }

  .demo__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 0.75rem;
  }

  .demo__container {
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    overflow: hidden;
  }

  .demo__preview {
    padding: 1.5rem;
  }

  .demo__usage-toggle-bar {
    border-top: 1px solid var(--bd-color-border);
  }

  .demo__usage-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 100%;
    padding: 0.5rem;
    border: none;
    background: var(--bd-color-secondary-10);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    cursor: pointer;
  }

  .demo__usage-toggle:hover {
    background: var(--bd-color-secondary-20);
  }

  .demo__chevron {
    transition: transform 150ms ease;
  }

  .demo__chevron--open {
    transform: rotate(180deg);
  }

  .demo__usage {
    border-top: 1px solid var(--bd-color-border);
  }

  .demo__tabs {
    display: flex;
    border-bottom: 1px solid var(--bd-color-border);
    background: var(--bd-color-secondary-10);
  }

  .demo__tab {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-regular);
    color: var(--bd-color-text-secondary);
    cursor: pointer;
  }

  .demo__tab--active {
    color: var(--bd-color-primary-40);
    border-bottom: 2px solid var(--bd-color-primary-40);
    font-weight: var(--bd-font-weight-semi-bold);
  }

  .demo__code-area {
    padding: 0.75rem;
  }

  .demo__props-area {
    padding: 0.5rem 0.75rem;
  }
</style>
