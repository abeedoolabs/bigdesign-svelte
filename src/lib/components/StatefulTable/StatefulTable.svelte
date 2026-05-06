<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { TableColumn, SortDirection } from '../Table/Table.svelte';

  interface Props {
    columns: TableColumn<T>[];
    items: T[];
    keyField?: string;
    stickyHeader?: boolean;
    headerless?: boolean;
    pagination?: boolean;
    itemsPerPage?: number;
    emptyComponent?: Snippet;
    itemName?: string;
    selectable?: boolean;
    onSelectionChange?: (selectedItems: T[]) => void;
    onRowClick?: (item: T) => void;
  }

  let {
    columns,
    items,
    keyField = 'id',
    stickyHeader = false,
    headerless = false,
    pagination = false,
    itemsPerPage = 25,
    emptyComponent,
    itemName,
    selectable = false,
    onSelectionChange,
    onRowClick,
  }: Props = $props();

  let sortColumnHash = $state('');
  let sortDirection = $state<SortDirection>('ASC');
  let currentPage = $state(1);
  let selectedKeys = $state<Set<string>>(new Set());

  function getKey(item: T, index: number): string {
    if (keyField && typeof item === 'object' && item !== null && keyField in item) {
      return String((item as Record<string, unknown>)[keyField]);
    }
    return String(index);
  }

  let sortedItems = $derived(() => {
    if (!sortColumnHash) return items;
    const col = columns.find((c) => c.hash === sortColumnHash);
    if (!col) return items;
    return [...items].sort((a, b) => {
      const aVal = col.render(a);
      const bVal = col.render(b);
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDirection === 'ASC' ? cmp : -cmp;
    });
  });

  let paginatedItems = $derived(() => {
    const sorted = sortedItems();
    if (!pagination) return sorted;
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  });

  let totalPages = $derived(() => {
    if (!pagination) return 1;
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  });

  function handleSort(columnHash: string, direction: SortDirection) {
    sortColumnHash = columnHash;
    sortDirection = direction;
    currentPage = 1;
  }

  function toggleSelection(item: T, index: number) {
    const key = getKey(item, index);
    const newSet = new Set(selectedKeys);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    selectedKeys = newSet;
    onSelectionChange?.(items.filter((it, i) => selectedKeys.has(getKey(it, i))));
  }

  function toggleAll() {
    if (selectedKeys.size === items.length) {
      selectedKeys = new Set();
    } else {
      selectedKeys = new Set(items.map((it, i) => getKey(it, i)));
    }
    onSelectionChange?.(items.filter((it, i) => selectedKeys.has(getKey(it, i))));
  }
</script>

<div class="bd-stateful-table">
  <div class="bd-table-wrapper">
    <table class="bd-table">
      {#if !headerless}
        <thead class="bd-table__head" class:bd-table__head--sticky={stickyHeader}>
          <tr>
            {#if selectable}
              <th class="bd-table__th bd-table__th--checkbox">
                <input
                  type="checkbox"
                  checked={selectedKeys.size === items.length && items.length > 0}
                  indeterminate={selectedKeys.size > 0 && selectedKeys.size < items.length}
                  onchange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            {/if}
            {#each columns as col}
              <th
                class="bd-table__th"
                class:bd-table__th--sortable={col.sortKey}
                style:width={col.width}
                style:text-align={col.align}
                onclick={() => col.sortKey ? handleSort(col.hash, sortColumnHash === col.hash && sortDirection === 'ASC' ? 'DESC' : 'ASC') : undefined}
              >
                <span class="bd-table__th-content">
                  {col.header}
                  {#if sortColumnHash === col.hash}
                    <svg class="bd-table__sort-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {#if sortDirection === 'ASC'}
                        <path d="M7 14l5-5 5 5z" />
                      {:else}
                        <path d="M7 10l5 5 5-5z" />
                      {/if}
                    </svg>
                  {/if}
                </span>
              </th>
            {/each}
          </tr>
        </thead>
      {/if}
      <tbody class="bd-table__body">
        {#if paginatedItems().length === 0}
          <tr>
            <td colspan={columns.length + (selectable ? 1 : 0)} class="bd-table__empty">
              {#if emptyComponent}
                {@render emptyComponent()}
              {:else}
                No {itemName || 'items'} found.
              {/if}
            </td>
          </tr>
        {:else}
          {#each paginatedItems() as item, i (getKey(item, i))}
            <tr
              class="bd-table__row"
              class:bd-table__row--clickable={onRowClick}
              class:bd-table__row--selected={selectedKeys.has(getKey(item, i))}
              onclick={() => onRowClick?.(item)}
            >
              {#if selectable}
                <td class="bd-table__td bd-table__td--checkbox">
                  <input
                    type="checkbox"
                    checked={selectedKeys.has(getKey(item, i))}
                    onchange={() => toggleSelection(item, i)}
                    onclick={(e: MouseEvent) => e.stopPropagation()}
                    aria-label="Select row"
                  />
                </td>
              {/if}
              {#each columns as col}
                <td class="bd-table__td" style:text-align={col.align} style:width={col.width}>
                  {col.render(item)}
                </td>
              {/each}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  {#if pagination && totalPages() > 1}
    <div class="bd-table__pagination">
      <span class="bd-table__pagination-info">
        {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, items.length)} of {items.length} {itemName || 'items'}
      </span>
      <div class="bd-table__pagination-controls">
        <button
          type="button"
          class="bd-table__pagination-btn"
          disabled={currentPage <= 1}
          onclick={() => currentPage--}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button
          type="button"
          class="bd-table__pagination-btn"
          disabled={currentPage >= totalPages()}
          onclick={() => currentPage++}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .bd-stateful-table {
    font-family: var(--bd-font-family);
  }

  .bd-table-wrapper {
    overflow-x: auto;
  }

  .bd-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--bd-font-size-md);
  }

  .bd-table__head {
    border-bottom: 2px solid var(--bd-color-border);
  }

  .bd-table__head--sticky {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: var(--bd-color-white);
  }

  .bd-table__th {
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    text-align: left;
    font-weight: var(--bd-font-weight-semi-bold);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    white-space: nowrap;
  }

  .bd-table__th--checkbox {
    width: 2.5rem;
    padding-right: 0;
  }

  .bd-table__th--sortable {
    cursor: pointer;
    user-select: none;
  }

  .bd-table__th--sortable:hover {
    color: var(--bd-color-primary-40);
  }

  .bd-table__th-content {
    display: inline-flex;
    align-items: center;
    gap: var(--bd-spacing-xxs);
  }

  .bd-table__sort-icon {
    width: 1rem;
    height: 1rem;
  }

  .bd-table__row {
    border-bottom: 1px solid var(--bd-color-border);
  }

  .bd-table__row:hover {
    background-color: var(--bd-color-secondary-10);
  }

  .bd-table__row--clickable {
    cursor: pointer;
  }

  .bd-table__row--selected {
    background-color: var(--bd-color-primary-10);
  }

  .bd-table__td {
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    color: var(--bd-color-text);
  }

  .bd-table__td--checkbox {
    width: 2.5rem;
    padding-right: 0;
  }

  .bd-table__empty {
    padding: var(--bd-spacing-xxl) var(--bd-spacing-md);
    text-align: center;
    color: var(--bd-color-text-secondary);
  }

  .bd-table__pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--bd-spacing-md);
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    border-top: 1px solid var(--bd-color-border);
  }

  .bd-table__pagination-info {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
  }

  .bd-table__pagination-controls {
    display: flex;
    gap: var(--bd-spacing-xxs);
  }

  .bd-table__pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    color: var(--bd-color-secondary-60);
    cursor: pointer;
  }

  .bd-table__pagination-btn:hover:not(:disabled) {
    background-color: var(--bd-color-secondary-10);
    color: var(--bd-color-text);
  }

  .bd-table__pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .bd-table__pagination-btn svg {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>
