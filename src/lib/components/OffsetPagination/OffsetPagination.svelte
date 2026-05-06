<script lang="ts">
  interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    itemsPerPageOptions?: number[];
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    label?: string;
  }

  let {
    currentPage,
    totalItems,
    itemsPerPage,
    itemsPerPageOptions,
    onPageChange,
    onItemsPerPageChange,
    label = 'items',
  }: Props = $props();

  let totalPages = $derived(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
  let rangeStart = $derived((currentPage - 1) * itemsPerPage + 1);
  let rangeEnd = $derived(Math.min(currentPage * itemsPerPage, totalItems));
</script>

<div class="bd-pagination">
  {#if itemsPerPageOptions && onItemsPerPageChange}
    <div class="bd-pagination__per-page">
      <label class="bd-pagination__per-page-label">
        Items per page:
        <select
          class="bd-pagination__per-page-select"
          value={itemsPerPage}
          onchange={(e) => {
            const val = Number((e.target as HTMLSelectElement).value);
            onItemsPerPageChange?.(val);
          }}
        >
          {#each itemsPerPageOptions as opt}
            <option value={opt} selected={opt === itemsPerPage}>{opt}</option>
          {/each}
        </select>
      </label>
    </div>
  {/if}

  <span class="bd-pagination__info">
    {rangeStart}-{rangeEnd} of {totalItems} {label}
  </span>

  <div class="bd-pagination__controls">
    <button
      type="button"
      class="bd-pagination__btn"
      disabled={currentPage <= 1}
      onclick={() => onPageChange(currentPage - 1)}
      aria-label="Previous page"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </button>
    <button
      type="button"
      class="bd-pagination__btn"
      disabled={currentPage >= totalPages}
      onclick={() => onPageChange(currentPage + 1)}
      aria-label="Next page"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </button>
  </div>
</div>

<style>
  .bd-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--bd-spacing-md);
    padding: var(--bd-spacing-sm) 0;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
  }

  .bd-pagination__per-page {
    display: flex;
    align-items: center;
  }

  .bd-pagination__per-page-label {
    display: flex;
    align-items: center;
    gap: var(--bd-spacing-xs);
    color: var(--bd-color-text-secondary);
  }

  .bd-pagination__per-page-select {
    padding: var(--bd-spacing-xxs) var(--bd-spacing-xs);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    background: var(--bd-color-white);
    cursor: pointer;
  }

  .bd-pagination__info {
    color: var(--bd-color-text-secondary);
  }

  .bd-pagination__controls {
    display: flex;
    gap: var(--bd-spacing-xxs);
  }

  .bd-pagination__btn {
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

  .bd-pagination__btn:hover:not(:disabled) {
    background-color: var(--bd-color-secondary-10);
    color: var(--bd-color-text);
  }

  .bd-pagination__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .bd-pagination__btn svg {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>
