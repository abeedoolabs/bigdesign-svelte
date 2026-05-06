<script lang="ts">
  interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

  let {
    currentPage,
    totalPages,
    onPageChange,
  }: Props = $props();
</script>

<div class="bd-stateless-pagination">
  <button
    type="button"
    class="bd-stateless-pagination__btn"
    disabled={currentPage <= 1}
    onclick={() => onPageChange(currentPage - 1)}
    aria-label="Previous page"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </button>
  <span class="bd-stateless-pagination__info">
    {currentPage} of {totalPages}
  </span>
  <button
    type="button"
    class="bd-stateless-pagination__btn"
    disabled={currentPage >= totalPages}
    onclick={() => onPageChange(currentPage + 1)}
    aria-label="Next page"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </button>
</div>

<style>
  .bd-stateless-pagination {
    display: inline-flex;
    align-items: center;
    gap: var(--bd-spacing-xs);
    font-family: var(--bd-font-family);
  }

  .bd-stateless-pagination__info {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    min-width: 3rem;
    text-align: center;
  }

  .bd-stateless-pagination__btn {
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

  .bd-stateless-pagination__btn:hover:not(:disabled) {
    background: var(--bd-color-secondary-10);
    color: var(--bd-color-text);
  }

  .bd-stateless-pagination__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .bd-stateless-pagination__btn svg {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>
