<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    value?: string;
    label?: string;
    onSearch?: (value: string) => void;
    onClear?: () => void;
  }

  let {
    value = $bindable(''),
    label,
    onSearch,
    onClear,
    ...restProps
  }: Props = $props();

  let inputId = `bd-search-${Math.random().toString(36).slice(2, 9)}`;

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') onSearch?.(value);
    if (e.key === 'Escape') { value = ''; onClear?.(); }
  }

  function handleClear() {
    value = '';
    onClear?.();
  }
</script>

<div class="bd-search-wrapper">
  {#if label}
    <label class="bd-search__label" for={inputId}>{label}</label>
  {/if}
  <div class="bd-search">
    <svg class="bd-search__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
    <input
      type="text"
      class="bd-search__input"
      id={inputId}
      bind:value
      onkeydown={handleKeydown}
      placeholder="Search..."
      {...restProps}
    />
    {#if value}
      <button type="button" class="bd-search__clear" onclick={handleClear} aria-label="Clear search">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    {/if}
  </div>
</div>

<style>
  .bd-search-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-search__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-search {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing),
                box-shadow var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-search:focus-within {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-search__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--bd-color-secondary-50);
    margin-left: var(--bd-spacing-sm);
    flex-shrink: 0;
  }

  .bd-search__input {
    flex: 1;
    height: 2.25rem;
    padding: 0 var(--bd-spacing-xs);
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    outline: none;
  }

  .bd-search__input::placeholder {
    color: var(--bd-color-secondary-40);
  }

  .bd-search__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: var(--bd-spacing-xs);
    padding: 0;
    border: none;
    background: transparent;
    color: var(--bd-color-secondary-50);
    cursor: pointer;
    border-radius: var(--bd-radius-circle);
  }

  .bd-search__clear:hover {
    color: var(--bd-color-text);
    background: var(--bd-color-secondary-10);
  }

  .bd-search__clear svg {
    width: 1rem;
    height: 1rem;
  }
</style>
