<script lang="ts" module>
  export interface TableColumn<T> {
    header: string;
    hash: string;
    render: (row: T) => string;
    sortKey?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    withPadding?: boolean;
  }

  export type SortDirection = 'ASC' | 'DESC';

  export interface TableSortable<T> {
    columnHash: string;
    direction: SortDirection;
    onSort: (columnHash: string, direction: SortDirection) => void;
  }
</script>

<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props {
    columns: TableColumn<T>[];
    items: T[];
    keyField?: string;
    sortable?: TableSortable<T>;
    stickyHeader?: boolean;
    headerless?: boolean;
    emptyComponent?: Snippet;
    itemName?: string;
  }

  let {
    columns,
    items,
    keyField = 'id',
    sortable,
    stickyHeader = false,
    headerless = false,
    emptyComponent,
    itemName,
  }: Props = $props();

  function getKey(item: T, index: number): string {
    if (keyField && typeof item === 'object' && item !== null && keyField in item) {
      return String((item as Record<string, unknown>)[keyField]);
    }
    return String(index);
  }

  function handleSort(columnHash: string) {
    if (!sortable) return;
    const newDirection: SortDirection =
      sortable.columnHash === columnHash && sortable.direction === 'ASC' ? 'DESC' : 'ASC';
    sortable.onSort(columnHash, newDirection);
  }
</script>

<div class="bd-table-wrapper">
  <table class="bd-table">
    {#if !headerless}
      <thead class="bd-table__head" class:bd-table__head--sticky={stickyHeader}>
        <tr>
          {#each columns as col}
            <th
              class="bd-table__th"
              class:bd-table__th--sortable={sortable && col.sortKey}
              style:width={col.width}
              style:text-align={col.align}
              onclick={() => col.sortKey && sortable ? handleSort(col.hash) : undefined}
            >
              <span class="bd-table__th-content">
                {col.header}
                {#if sortable && sortable.columnHash === col.hash}
                  <svg class="bd-table__sort-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {#if sortable.direction === 'ASC'}
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
      {#if items.length === 0}
        <tr>
          <td colspan={columns.length} class="bd-table__empty">
            {#if emptyComponent}
              {@render emptyComponent()}
            {:else}
              No {itemName || 'items'} found.
            {/if}
          </td>
        </tr>
      {:else}
        {#each items as item, i (getKey(item, i))}
          <tr class="bd-table__row">
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

<style>
  .bd-table-wrapper {
    overflow-x: auto;
    font-family: var(--bd-font-family);
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

  .bd-table__td {
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    color: var(--bd-color-text);
  }

  .bd-table__empty {
    padding: var(--bd-spacing-xxl) var(--bd-spacing-md);
    text-align: center;
    color: var(--bd-color-text-secondary);
  }
</style>
