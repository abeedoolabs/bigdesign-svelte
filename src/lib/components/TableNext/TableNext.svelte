<script lang="ts" module>
  export interface TableNextColumn<T> {
    header: string;
    hash: string;
    render: (row: T) => string;
    renderHtml?: (row: T) => string;
    sortKey?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    pin?: 'left' | 'right';
  }
</script>

<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import type { SortDirection } from '../Table/Table.svelte';

  interface Props {
    columns: TableNextColumn<T>[];
    items: T[];
    keyField?: string;
    stickyHeader?: boolean;
    resizableColumns?: boolean;
    sortable?: {
      columnHash: string;
      direction: SortDirection;
      onSort: (columnHash: string, direction: SortDirection) => void;
    };
    onRowClick?: (item: T) => void;
    emptyComponent?: Snippet;
    itemName?: string;
  }

  let {
    columns,
    items,
    keyField = 'id',
    stickyHeader = false,
    resizableColumns = false,
    sortable,
    onRowClick,
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

<div class="bd-table-next-wrapper">
  <table class="bd-table-next" class:bd-table-next--resizable={resizableColumns}>
    <thead class="bd-table-next__head" class:bd-table-next__head--sticky={stickyHeader}>
      <tr>
        {#each columns as col}
          <th
            class="bd-table-next__th"
            class:bd-table-next__th--sortable={sortable && col.sortKey}
            class:bd-table-next__th--pinned-left={col.pin === 'left'}
            class:bd-table-next__th--pinned-right={col.pin === 'right'}
            style:width={col.width}
            style:text-align={col.align}
            onclick={() => col.sortKey && sortable ? handleSort(col.hash) : undefined}
          >
            <span class="bd-table-next__th-content">
              {col.header}
              {#if sortable && sortable.columnHash === col.hash}
                <svg class="bd-table-next__sort-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    <tbody class="bd-table-next__body">
      {#if items.length === 0}
        <tr>
          <td colspan={columns.length} class="bd-table-next__empty">
            {#if emptyComponent}
              {@render emptyComponent()}
            {:else}
              No {itemName || 'items'} found.
            {/if}
          </td>
        </tr>
      {:else}
        {#each items as item, i (getKey(item, i))}
          <tr
            class="bd-table-next__row"
            class:bd-table-next__row--clickable={onRowClick}
            onclick={() => onRowClick?.(item)}
          >
            {#each columns as col}
              <td
                class="bd-table-next__td"
                class:bd-table-next__td--pinned-left={col.pin === 'left'}
                class:bd-table-next__td--pinned-right={col.pin === 'right'}
                style:text-align={col.align}
                style:width={col.width}
              >
                {#if col.renderHtml}
                  {@html col.renderHtml(item)}
                {:else}
                  {col.render(item)}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .bd-table-next-wrapper {
    overflow-x: auto;
    font-family: var(--bd-font-family);
  }

  .bd-table-next {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--bd-font-size-md);
  }

  .bd-table-next__head {
    border-bottom: 2px solid var(--bd-color-border);
  }

  .bd-table-next__head--sticky {
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--bd-color-white);
  }

  .bd-table-next__th {
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    text-align: left;
    font-weight: var(--bd-font-weight-semi-bold);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    white-space: nowrap;
  }

  .bd-table-next__th--sortable { cursor: pointer; user-select: none; }
  .bd-table-next__th--sortable:hover { color: var(--bd-color-primary-40); }

  .bd-table-next__th--pinned-left,
  .bd-table-next__td--pinned-left {
    position: sticky;
    left: 0;
    z-index: 1;
    background: var(--bd-color-white);
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  }

  .bd-table-next__th--pinned-right,
  .bd-table-next__td--pinned-right {
    position: sticky;
    right: 0;
    z-index: 1;
    background: var(--bd-color-white);
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05);
  }

  .bd-table-next__th-content {
    display: inline-flex;
    align-items: center;
    gap: var(--bd-spacing-xxs);
  }

  .bd-table-next__sort-icon { width: 1rem; height: 1rem; }

  .bd-table-next__row { border-bottom: 1px solid var(--bd-color-border); }
  .bd-table-next__row:hover { background: var(--bd-color-secondary-10); }
  .bd-table-next__row--clickable { cursor: pointer; }

  .bd-table-next__td {
    padding: var(--bd-spacing-sm) var(--bd-spacing-md);
    color: var(--bd-color-text);
  }

  .bd-table-next__empty {
    padding: var(--bd-spacing-xxl) var(--bd-spacing-md);
    text-align: center;
    color: var(--bd-color-text-secondary);
  }

  .bd-table-next--resizable .bd-table-next__th {
    resize: horizontal;
    overflow: hidden;
  }
</style>
