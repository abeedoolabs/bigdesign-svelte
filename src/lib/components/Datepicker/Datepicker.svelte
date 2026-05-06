<script lang="ts">
  interface Props {
    value?: string;
    label?: string;
    description?: string;
    error?: string | string[];
    min?: string;
    max?: string;
    disabled?: boolean;
    required?: boolean;
    onDateChange?: (date: string) => void;
  }

  let {
    value = $bindable(''),
    label,
    description,
    error,
    min,
    max,
    disabled = false,
    required = false,
    onDateChange,
  }: Props = $props();

  let inputId = `bd-datepicker-${Math.random().toString(36).slice(2, 9)}`;
  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);

  function handleInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    value = val;
    onDateChange?.(val);
  }
</script>

<div class="bd-datepicker-wrapper">
  {#if label}
    <label class="bd-datepicker__label" for={inputId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-datepicker__description">{description}</p>
  {/if}
  <input
    type="date"
    class="bd-datepicker"
    class:bd-datepicker--error={hasError}
    id={inputId}
    {value}
    {min}
    {max}
    {disabled}
    {required}
    oninput={handleInput}
    aria-invalid={hasError || undefined}
  />
  {#if hasError}
    <div class="bd-datepicker__errors" role="alert">
      {#each errors as err}
        <p class="bd-datepicker__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-datepicker-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-datepicker__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-datepicker__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-datepicker {
    width: 100%;
    height: 2.25rem;
    padding: 0 var(--bd-spacing-sm);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    outline: none;
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing),
                box-shadow var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-datepicker:focus {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-datepicker--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-datepicker--error:focus {
    border-color: var(--bd-color-danger-40);
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }

  .bd-datepicker:disabled {
    background: var(--bd-color-secondary-10);
    cursor: not-allowed;
    color: var(--bd-color-text-disabled);
  }

  .bd-datepicker__errors { margin-top: var(--bd-spacing-xxs); }

  .bd-datepicker__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
