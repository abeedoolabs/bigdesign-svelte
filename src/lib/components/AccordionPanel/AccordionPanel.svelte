<script lang="ts" module>
  export interface AccordionItem {
    id: string;
    title: string;
    content?: string;
    defaultExpanded?: boolean;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    items: AccordionItem[];
    children?: Snippet<[AccordionItem]>;
  }

  let { items, children }: Props = $props();

  let _items = items;
  let expanded = $state<Set<string>>(new Set(
    _items.filter(i => i.defaultExpanded).map(i => i.id)
  ));

  function toggle(id: string) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    expanded = next;
  }
</script>

<div class="bd-accordion">
  {#each items as item}
    <div class="bd-accordion__item">
      <button
        type="button"
        class="bd-accordion__trigger"
        class:bd-accordion__trigger--open={expanded.has(item.id)}
        aria-expanded={expanded.has(item.id)}
        onclick={() => toggle(item.id)}
      >
        <span class="bd-accordion__title">{item.title}</span>
        <svg class="bd-accordion__chevron" class:bd-accordion__chevron--open={expanded.has(item.id)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {#if expanded.has(item.id)}
        <div class="bd-accordion__content" role="region">
          {#if children}
            {@render children(item)}
          {:else if item.content}
            <p>{item.content}</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .bd-accordion {
    font-family: var(--bd-font-family);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    overflow: hidden;
  }

  .bd-accordion__item + .bd-accordion__item {
    border-top: 1px solid var(--bd-color-border);
  }

  .bd-accordion__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--bd-spacing-md);
    border: none;
    background: var(--bd-color-white);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    cursor: pointer;
    text-align: left;
  }

  .bd-accordion__trigger:hover {
    background: var(--bd-color-secondary-10);
  }

  .bd-accordion__trigger--open {
    background: var(--bd-color-secondary-10);
  }

  .bd-accordion__chevron {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--bd-color-secondary-60);
    flex-shrink: 0;
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-accordion__chevron--open {
    transform: rotate(180deg);
  }

  .bd-accordion__content {
    padding: 0 var(--bd-spacing-md) var(--bd-spacing-md);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    background: var(--bd-color-white);
  }

  .bd-accordion__content p {
    margin: 0;
  }
</style>
