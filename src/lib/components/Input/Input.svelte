<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    label?: string;
    description?: string;
    error?: string | string[];
    iconLeft?: Snippet;
    iconRight?: Snippet;
    value?: string;
  }

  let {
    label,
    description,
    error,
    iconLeft,
    iconRight,
    value = $bindable(''),
    id,
    disabled,
    ...restProps
  }: Props = $props();

  let inputId = $derived(id || `bd-input-${Math.random().toString(36).slice(2, 9)}`);
  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);
</script>

<div class="bd-input-wrapper">
  {#if label}
    <label class="bd-input__label" for={inputId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-input__description">{description}</p>
  {/if}
  <div class="bd-input__field-wrapper" class:bd-input__field-wrapper--error={hasError} class:bd-input__field-wrapper--disabled={disabled}>
    {#if iconLeft}
      <span class="bd-input__icon bd-input__icon--left">
        {@render iconLeft()}
      </span>
    {/if}
    <input
      class="bd-input"
      class:bd-input--has-icon-left={iconLeft}
      class:bd-input--has-icon-right={iconRight}
      id={inputId}
      bind:value
      {disabled}
      aria-invalid={hasError || undefined}
      aria-describedby={hasError ? `${inputId}-error` : undefined}
      {...restProps}
    />
    {#if iconRight}
      <span class="bd-input__icon bd-input__icon--right">
        {@render iconRight()}
      </span>
    {/if}
  </div>
  {#if hasError}
    <div id="{inputId}-error" class="bd-input__errors" role="alert">
      {#each errors as err}
        <p class="bd-input__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-input-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-input__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-input__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-input__field-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background-color: var(--bd-color-white);
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing),
                box-shadow var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-input__field-wrapper:focus-within {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-input__field-wrapper--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-input__field-wrapper--error:focus-within {
    border-color: var(--bd-color-danger-40);
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }

  .bd-input__field-wrapper--disabled {
    background-color: var(--bd-color-secondary-10);
    cursor: not-allowed;
  }

  .bd-input {
    flex: 1;
    width: 100%;
    height: 2.25rem;
    padding: 0 var(--bd-spacing-sm);
    border: none;
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    outline: none;
  }

  .bd-input:disabled {
    cursor: not-allowed;
    color: var(--bd-color-text-disabled);
  }

  .bd-input::placeholder {
    color: var(--bd-color-secondary-40);
  }

  .bd-input--has-icon-left {
    padding-left: var(--bd-spacing-xxs);
  }

  .bd-input--has-icon-right {
    padding-right: var(--bd-spacing-xxs);
  }

  .bd-input__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bd-color-secondary-60);
    padding: 0 var(--bd-spacing-xs);
  }

  .bd-input__icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .bd-input__errors {
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-input__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
