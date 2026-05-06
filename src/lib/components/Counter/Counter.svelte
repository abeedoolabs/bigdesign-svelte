<script lang="ts">
  interface Props {
    value: number;
    step?: number;
    min?: number;
    max?: number;
    label?: string;
    description?: string;
    error?: string | string[];
    disabled?: boolean;
    onCountChange: (count: number) => void;
  }

  let {
    value,
    step = 1,
    min,
    max,
    label,
    description,
    error,
    disabled = false,
    onCountChange,
  }: Props = $props();

  let inputId = `bd-counter-${Math.random().toString(36).slice(2, 9)}`;
  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);

  function decrement() {
    const next = value - step;
    if (min != null && next < min) return;
    onCountChange(next);
  }

  function increment() {
    const next = value + step;
    if (max != null && next > max) return;
    onCountChange(next);
  }

  function handleInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    if (!isNaN(val)) onCountChange(val);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') { e.preventDefault(); increment(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); decrement(); }
  }
</script>

<div class="bd-counter-wrapper">
  {#if label}
    <label class="bd-counter__label" for={inputId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-counter__description">{description}</p>
  {/if}
  <div class="bd-counter" class:bd-counter--error={hasError} class:bd-counter--disabled={disabled}>
    <button type="button" class="bd-counter__btn" onclick={decrement} disabled={disabled || (min != null && value <= min)} aria-label="Decrease count">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 13H5v-2h14v2z"/></svg>
    </button>
    <input
      type="text"
      class="bd-counter__input"
      id={inputId}
      value={value}
      {disabled}
      oninput={handleInput}
      onkeydown={handleKeydown}
      aria-invalid={hasError || undefined}
      inputmode="numeric"
    />
    <button type="button" class="bd-counter__btn" onclick={increment} disabled={disabled || (max != null && value >= max)} aria-label="Increase count">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
    </button>
  </div>
  {#if hasError}
    <div class="bd-counter__errors" role="alert">
      {#each errors as err}
        <p class="bd-counter__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-counter-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-counter__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-counter__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-counter {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    overflow: hidden;
  }

  .bd-counter--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-counter--disabled {
    background: var(--bd-color-secondary-10);
    opacity: 0.7;
  }

  .bd-counter__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    background: var(--bd-color-secondary-10);
    color: var(--bd-color-text-secondary);
    cursor: pointer;
    flex-shrink: 0;
  }

  .bd-counter__btn:hover:not(:disabled) {
    background: var(--bd-color-secondary-20);
    color: var(--bd-color-text);
  }

  .bd-counter__btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .bd-counter__btn svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .bd-counter__input {
    width: 3.5rem;
    height: 2.25rem;
    border: none;
    border-left: 1px solid var(--bd-color-border);
    border-right: 1px solid var(--bd-color-border);
    text-align: center;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    outline: none;
    background: var(--bd-color-white);
  }

  .bd-counter__errors {
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-counter__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
