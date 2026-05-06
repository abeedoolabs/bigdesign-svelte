<script lang="ts" module>
  export interface SelectOption<T = string> {
    content: string;
    value: T;
    disabled?: boolean;
    icon?: string;
  }

  export interface SelectOptionGroup<T = string> {
    label: string;
    options: SelectOption<T>[];
  }
</script>

<script lang="ts" generics="T">
  interface Props {
    options: (SelectOption<T> | SelectOptionGroup<T>)[];
    value?: T;
    placeholder?: string;
    label?: string;
    description?: string;
    error?: string | string[];
    disabled?: boolean;
    required?: boolean;
    filterable?: boolean;
    onOptionChange?: (value: T, option: SelectOption<T>) => void;
  }

  let {
    options,
    value = $bindable() as T,
    placeholder = 'Select...',
    label,
    description,
    error,
    disabled = false,
    required = false,
    filterable = false,
    onOptionChange,
  }: Props = $props();

  let isOpen = $state(false);
  let filterText = $state('');
  let selectId = `bd-select-${Math.random().toString(36).slice(2, 9)}`;

  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);

  let flatOptions = $derived(() => {
    const flat: SelectOption<T>[] = [];
    for (const opt of options) {
      if ('options' in opt) {
        flat.push(...opt.options);
      } else {
        flat.push(opt);
      }
    }
    return flat;
  });

  let selectedOption = $derived(() => {
    return flatOptions().find((opt) => opt.value === value);
  });

  let filteredOptions = $derived(() => {
    if (!filterable || !filterText) return options;
    const lower = filterText.toLowerCase();
    return options
      .map((opt) => {
        if ('options' in opt) {
          const filtered = opt.options.filter((o) => o.content.toLowerCase().startsWith(lower));
          return filtered.length > 0 ? { ...opt, options: filtered } : null;
        }
        return opt.content.toLowerCase().startsWith(lower) ? opt : null;
      })
      .filter(Boolean) as (SelectOption<T> | SelectOptionGroup<T>)[];
  });

  let displayValue = $derived(() => {
    const sel = selectedOption();
    return sel ? sel.content : '';
  });

  function handleSelect(opt: SelectOption<T>) {
    if (opt.disabled) return;
    value = opt.value;
    isOpen = false;
    filterText = '';
    onOptionChange?.(opt.value, opt);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      isOpen = false;
      filterText = '';
    } else if (e.key === 'Enter' && !isOpen) {
      isOpen = true;
    }
  }

  function handleBlur(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement;
    if (target && (e.currentTarget as HTMLElement)?.contains(target)) return;
    isOpen = false;
    filterText = '';
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bd-select-wrapper" onkeydown={handleKeydown} onfocusout={handleBlur}>
  {#if label}
    <label class="bd-select__label" for={selectId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-select__description">{description}</p>
  {/if}

  <button
    type="button"
    class="bd-select__trigger"
    class:bd-select__trigger--error={hasError}
    class:bd-select__trigger--open={isOpen}
    class:bd-select__trigger--disabled={disabled}
    id={selectId}
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    onclick={() => { if (!disabled) isOpen = !isOpen; }}
  >
    {#if filterable && isOpen}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        class="bd-select__filter-input"
        bind:value={filterText}
        {placeholder}
        autofocus
      />
    {:else}
      <span class="bd-select__value" class:bd-select__value--placeholder={!displayValue()}>
        {displayValue() || placeholder}
      </span>
    {/if}
    <svg class="bd-select__chevron" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </button>

  {#if isOpen}
    <div class="bd-select__dropdown" role="listbox">
      {#each filteredOptions() as opt}
        {#if 'options' in opt}
          <div class="bd-select__group">
            <div class="bd-select__group-label">{opt.label}</div>
            {#each opt.options as groupOpt}
              <button
                type="button"
                class="bd-select__option"
                class:bd-select__option--selected={groupOpt.value === value}
                class:bd-select__option--disabled={groupOpt.disabled}
                disabled={groupOpt.disabled}
                role="option"
                aria-selected={groupOpt.value === value}
                onclick={() => handleSelect(groupOpt)}
              >
                {groupOpt.content}
              </button>
            {/each}
          </div>
        {:else}
          <button
            type="button"
            class="bd-select__option"
            class:bd-select__option--selected={opt.value === value}
            class:bd-select__option--disabled={opt.disabled}
            disabled={opt.disabled}
            role="option"
            aria-selected={opt.value === value}
            onclick={() => handleSelect(opt)}
          >
            {opt.content}
          </button>
        {/if}
      {/each}
    </div>
  {/if}

  {#if hasError}
    <div class="bd-select__errors" role="alert">
      {#each errors as err}
        <p class="bd-select__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-select-wrapper {
    position: relative;
    font-family: var(--bd-font-family);
  }

  .bd-select__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-select__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-select__trigger {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.25rem;
    padding: 0 var(--bd-spacing-sm);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background-color: var(--bd-color-white);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    cursor: pointer;
    outline: none;
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing),
                box-shadow var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-select__trigger:focus-visible {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-select__trigger--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-select__trigger--disabled {
    background-color: var(--bd-color-secondary-10);
    cursor: not-allowed;
    color: var(--bd-color-text-disabled);
  }

  .bd-select__value {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bd-select__value--placeholder {
    color: var(--bd-color-secondary-40);
  }

  .bd-select__filter-input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    outline: none;
    padding: 0;
  }

  .bd-select__chevron {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--bd-color-secondary-60);
    flex-shrink: 0;
    margin-left: var(--bd-spacing-xs);
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-select__trigger--open .bd-select__chevron {
    transform: rotate(180deg);
  }

  .bd-select__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: var(--bd-spacing-xxs);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background-color: var(--bd-color-white);
    box-shadow: var(--bd-shadow-floating);
    z-index: var(--bd-z-popover);
    max-height: 15rem;
    overflow-y: auto;
    padding: var(--bd-spacing-xxs) 0;
  }

  .bd-select__group-label {
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .bd-select__option {
    display: block;
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

  .bd-select__option:hover:not(:disabled) {
    background-color: var(--bd-color-primary-10);
  }

  .bd-select__option--selected {
    background-color: var(--bd-color-primary-10);
    font-weight: var(--bd-font-weight-semi-bold);
  }

  .bd-select__option--disabled {
    color: var(--bd-color-text-disabled);
    cursor: not-allowed;
  }

  .bd-select__errors {
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-select__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
