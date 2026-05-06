<script lang="ts" module>
  export interface TreeNode<T = string> {
    id: T;
    label: string;
    children?: TreeNode<T>[];
    icon?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props {
    nodes: TreeNode<T>[];
    expandedNodes?: Set<T>;
    selectedNode?: T;
    iconless?: boolean;
    onNodeClick?: (node: TreeNode<T>) => void;
    onExpand?: (nodeId: T, expanded: boolean) => void;
    renderLabel?: Snippet<[TreeNode<T>]>;
  }

  let {
    nodes,
    expandedNodes = $bindable(new Set<T>()),
    selectedNode = $bindable() as T,
    iconless = false,
    onNodeClick,
    onExpand,
    renderLabel,
  }: Props = $props();

  function toggleExpand(nodeId: T) {
    const next = new Set(expandedNodes);
    const wasExpanded = next.has(nodeId);
    if (wasExpanded) next.delete(nodeId);
    else next.add(nodeId);
    expandedNodes = next;
    onExpand?.(nodeId, !wasExpanded);
  }

  function handleNodeClick(node: TreeNode<T>) {
    if (node.disabled) return;
    selectedNode = node.id;
    onNodeClick?.(node);
  }
</script>

{#snippet renderNodes(nodeList: TreeNode<T>[], depth: number)}
  <ul class="bd-tree__list" class:bd-tree__list--root={depth === 0} role={depth === 0 ? 'tree' : 'group'}>
    {#each nodeList as node}
      <li class="bd-tree__item" role="treeitem" aria-selected={selectedNode === node.id} aria-expanded={node.children ? expandedNodes.has(node.id) : undefined}>
        <div
          class="bd-tree__node"
          class:bd-tree__node--selected={selectedNode === node.id}
          class:bd-tree__node--disabled={node.disabled}
          style:padding-left="{depth * 1.5 + 0.5}rem"
        >
          {#if node.children && node.children.length > 0}
            <button type="button" class="bd-tree__toggle" onclick={() => toggleExpand(node.id)} aria-label={expandedNodes.has(node.id) ? 'Collapse' : 'Expand'}>
              <svg class="bd-tree__toggle-icon" class:bd-tree__toggle-icon--open={expandedNodes.has(node.id)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          {:else}
            <span class="bd-tree__toggle-spacer"></span>
          {/if}

          {#if !iconless}
            <svg class="bd-tree__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {#if node.children}
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
              {:else}
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              {/if}
            </svg>
          {/if}

          <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
          <span class="bd-tree__label" onclick={() => handleNodeClick(node)}>
            {#if renderLabel}
              {@render renderLabel(node)}
            {:else}
              {node.label}
            {/if}
          </span>
        </div>

        {#if node.children && expandedNodes.has(node.id)}
          {@render renderNodes(node.children, depth + 1)}
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

{@render renderNodes(nodes, 0)}

<style>
  .bd-tree__list {
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: var(--bd-font-family);
  }

  .bd-tree__item {
    margin: 0;
  }

  .bd-tree__node {
    display: flex;
    align-items: center;
    gap: var(--bd-spacing-xxs);
    padding: var(--bd-spacing-xxs) var(--bd-spacing-xs);
    cursor: default;
    border-radius: var(--bd-radius-normal);
  }

  .bd-tree__node--selected {
    background: var(--bd-color-primary-10);
  }

  .bd-tree__node--disabled {
    opacity: 0.5;
  }

  .bd-tree__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--bd-color-secondary-60);
    cursor: pointer;
    flex-shrink: 0;
  }

  .bd-tree__toggle:hover {
    color: var(--bd-color-text);
  }

  .bd-tree__toggle-icon {
    width: 1rem;
    height: 1rem;
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-tree__toggle-icon--open {
    transform: rotate(90deg);
  }

  .bd-tree__toggle-spacer {
    width: 1.25rem;
    flex-shrink: 0;
  }

  .bd-tree__icon {
    width: 1.125rem;
    height: 1.125rem;
    color: var(--bd-color-secondary-50);
    flex-shrink: 0;
  }

  .bd-tree__label {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    cursor: pointer;
    flex: 1;
    padding: 0.125rem 0;
  }

  .bd-tree__label:hover {
    color: var(--bd-color-primary-40);
  }

  .bd-tree__node--selected .bd-tree__label {
    color: var(--bd-color-primary-40);
    font-weight: var(--bd-font-weight-semi-bold);
  }
</style>
