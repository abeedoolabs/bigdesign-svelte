<script lang="ts">
  interface Props {
    value?: string;
    label?: string;
    description?: string;
    error?: string | string[];
    disabled?: boolean;
    required?: boolean;
    onTimeChange?: (time: string) => void;
  }

  let {
    value = $bindable(''),
    label,
    description,
    error,
    disabled = false,
    required = false,
    onTimeChange,
  }: Props = $props();

  let inputId = `bd-timepicker-${Math.random().toString(36).slice(2, 9)}`;
  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);

  function handleInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    value = val;
    onTimeChange?.(val);
  }
</script>

<div class="bd-timepicker-wrapper">
  {#if label}
    <label class="bd-timepicker__label" for={inputId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-timepicker__description">{description}</p>
  {/if}
  <input
    type="time"
    class="bd-timepicker"
    class:bd-timepicker--error={hasError}
    id={inputId}
    {value}
    {disabled}
    {required}
    oninput={handleInput}
    aria-invalid={hasError || undefined}
  />
  {#if hasError}
    <div class="bd-timepicker__errors" role="alert">
      {#each errors as err}
        <p class="bd-timepicker__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-timepicker-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-timepicker__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-timepicker__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-timepicker {
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

  .bd-timepicker:focus {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-timepicker--error { border-color: var(--bd-color-danger-40); }
  .bd-timepicker--error:focus { border-color: var(--bd-color-danger-40); box-shadow: 0 0 0 4px var(--bd-color-danger-20); }

  .bd-timepicker:disabled {
    background: var(--bd-color-secondary-10);
    cursor: not-allowed;
    color: var(--bd-color-text-disabled);
  }

  .bd-timepicker__errors { margin-top: var(--bd-spacing-xxs); }
  .bd-timepicker__error { font-size: var(--bd-font-size-sm); color: var(--bd-color-danger-40); margin: 0; }
</style>
