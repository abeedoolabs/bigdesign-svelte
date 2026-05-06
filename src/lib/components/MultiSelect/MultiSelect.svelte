<script lang="ts" module>
  export interface MultiSelectOption<T = string> {
    content: string;
    value: T;
    disabled?: boolean;
  }
</script>

<script lang="ts" generics="T">
  interface Props {
    options: MultiSelectOption<T>[];
    value?: T[];
    placeholder?: string;
    label?: string;
    description?: string;
    error?: string | string[];
    disabled?: boolean;
    filterable?: boolean;
    selectAll?: boolean;
    onOptionsChange?: (values: T[]) => void;
  }

  let {
    options,
    value = $bindable([]) as T[],
    placeholder = 'Select...',
    label,
    description,
    error,
    disabled = false,
    filterable = true,
    selectAll = false,
    onOptionsChange,
  }: Props = $props();

  let isOpen = $state(false);
  let filterText = $state('');
  let selectId = `bd-multiselect-${Math.random().toString(36).slice(2, 9)}`;

  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);

  let filteredOptions = $derived(() => {
    if (!filterable || !filterText) return options;
    const lower = filterText.toLowerCase();
    return options.filter(o => o.content.toLowerCase().includes(lower));
  });

  let selectedOptions = $derived(() =>
    options.filter(o => value.includes(o.value))
  );

  function isSelected(opt: MultiSelectOption<T>) {
    return value.includes(opt.value);
  }

  function toggleOption(opt: MultiSelectOption<T>) {
    if (opt.disabled) return;
    const next = isSelected(opt) ? value.filter(v => v !== opt.value) : [...value, opt.value];
    value = next;
    onOptionsChange?.(next);
  }

  function removeItem(opt: MultiSelectOption<T>) {
    const next = value.filter(v => v !== opt.value);
    value = next;
    onOptionsChange?.(next);
  }

  function toggleAll() {
    const enabledValues = options.filter(o => !o.disabled).map(o => o.value);
    const allSelected = enabledValues.every(v => value.includes(v));
    const next = allSelected ? [] : enabledValues;
    value = next;
    onOptionsChange?.(next);
  }

  function handleBlur(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement;
    if (target && (e.currentTarget as HTMLElement)?.contains(target)) return;
    isOpen = false;
    filterText = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { isOpen = false; filterText = ''; }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bd-multiselect-wrapper" onfocusout={handleBlur} onkeydown={handleKeydown}>
  {#if label}
    <label class="bd-multiselect__label" for={selectId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-multiselect__description">{description}</p>
  {/if}

  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="bd-multiselect__trigger"
    class:bd-multiselect__trigger--error={hasError}
    class:bd-multiselect__trigger--disabled={disabled}
    id={selectId}
    role="combobox"
    tabindex={disabled ? -1 : 0}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-controls="{selectId}-dropdown"
    onclick={() => { if (!disabled) isOpen = !isOpen; }}
  >
    <div class="bd-multiselect__chips">
      {#if selectedOptions().length === 0}
        <span class="bd-multiselect__placeholder">{placeholder}</span>
      {:else}
        {#each selectedOptions() as opt}
          <span class="bd-multiselect__chip">
            {opt.content}
            {#if !disabled}
              <button type="button" class="bd-multiselect__chip-remove" onclick={(e) => { e.stopPropagation(); removeItem(opt); }} aria-label="Remove {opt.content}">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            {/if}
          </span>
        {/each}
      {/if}
    </div>
    <svg class="bd-multiselect__chevron" class:bd-multiselect__chevron--open={isOpen} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </div>

  {#if isOpen}
    <div class="bd-multiselect__dropdown" id="{selectId}-dropdown" role="listbox" aria-multiselectable="true">
      {#if filterable}
        <div class="bd-multiselect__filter">
          <input
            type="text"
            class="bd-multiselect__filter-input"
            placeholder="Filter..."
            bind:value={filterText}
          />
        </div>
      {/if}
      {#if selectAll}
        <button type="button" class="bd-multiselect__option bd-multiselect__option--select-all" onclick={toggleAll}>
          <input type="checkbox" checked={options.filter(o => !o.disabled).every(o => value.includes(o.value))} tabindex={-1} />
          Select All
        </button>
      {/if}
      {#each filteredOptions() as opt}
        <button
          type="button"
          class="bd-multiselect__option"
          class:bd-multiselect__option--selected={isSelected(opt)}
          class:bd-multiselect__option--disabled={opt.disabled}
          disabled={opt.disabled}
          role="option"
          aria-selected={isSelected(opt)}
          onclick={() => toggleOption(opt)}
        >
          <input type="checkbox" checked={isSelected(opt)} tabindex={-1} disabled={opt.disabled} />
          {opt.content}
        </button>
      {/each}
    </div>
  {/if}

  {#if hasError}
    <div class="bd-multiselect__errors" role="alert">
      {#each errors as err}
        <p class="bd-multiselect__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-multiselect-wrapper {
    position: relative;
    font-family: var(--bd-font-family);
  }

  .bd-multiselect__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-multiselect__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-multiselect__trigger {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2.25rem;
    padding: var(--bd-spacing-xxs) var(--bd-spacing-sm);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    cursor: pointer;
    text-align: left;
    font-family: var(--bd-font-family);
    outline: none;
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-multiselect__trigger:focus-visible {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-multiselect__trigger--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-multiselect__trigger--disabled {
    background: var(--bd-color-secondary-10);
    cursor: not-allowed;
  }

  .bd-multiselect__chips {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: var(--bd-spacing-xxs);
    align-items: center;
  }

  .bd-multiselect__placeholder {
    color: var(--bd-color-secondary-40);
    font-size: var(--bd-font-size-md);
  }

  .bd-multiselect__chip {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
    padding: 0.0625rem var(--bd-spacing-xxs);
    background: var(--bd-color-secondary-20);
    border-radius: var(--bd-radius-normal);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
  }

  .bd-multiselect__chip-remove {
    display: flex;
    align-items: center;
    width: 0.875rem;
    height: 0.875rem;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--bd-color-secondary-60);
    cursor: pointer;
  }

  .bd-multiselect__chip-remove:hover {
    color: var(--bd-color-text);
  }

  .bd-multiselect__chip-remove svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  .bd-multiselect__chevron {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--bd-color-secondary-60);
    flex-shrink: 0;
    margin-left: var(--bd-spacing-xs);
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-multiselect__chevron--open {
    transform: rotate(180deg);
  }

  .bd-multiselect__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: var(--bd-spacing-xxs);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    box-shadow: var(--bd-shadow-floating);
    z-index: var(--bd-z-popover);
    max-height: 15rem;
    overflow-y: auto;
  }

  .bd-multiselect__filter {
    padding: var(--bd-spacing-xs);
    border-bottom: 1px solid var(--bd-color-border);
  }

  .bd-multiselect__filter-input {
    width: 100%;
    padding: var(--bd-spacing-xxs) var(--bd-spacing-xs);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    outline: none;
    box-sizing: border-box;
  }

  .bd-multiselect__filter-input:focus {
    border-color: var(--bd-color-primary-40);
  }

  .bd-multiselect__option {
    display: flex;
    align-items: center;
    gap: var(--bd-spacing-xs);
    width: 100%;
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    cursor: pointer;
    text-align: left;
  }

  .bd-multiselect__option:hover:not(:disabled) {
    background: var(--bd-color-primary-10);
  }

  .bd-multiselect__option--selected {
    background: var(--bd-color-primary-10);
  }

  .bd-multiselect__option--disabled {
    color: var(--bd-color-text-disabled);
    cursor: not-allowed;
  }

  .bd-multiselect__option--select-all {
    border-bottom: 1px solid var(--bd-color-border);
    font-weight: var(--bd-font-weight-semi-bold);
  }

  .bd-multiselect__option input[type="checkbox"] {
    pointer-events: none;
  }

  .bd-multiselect__errors {
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-multiselect__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
