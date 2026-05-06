<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label: string;
    description?: string;
    error?: string;
    name?: string;
    value?: string;
    indeterminate?: boolean;
    onchange?: (e: Event) => void;
    children?: Snippet;
  }

  let {
    checked = $bindable(false),
    disabled = false,
    label,
    description,
    error,
    name,
    value,
    indeterminate = false,
    onchange,
  }: Props = $props();

  let inputId = `bd-checkbox-${Math.random().toString(36).slice(2, 9)}`;
  let hasError = $derived(!!error);
</script>

<div class="bd-checkbox-wrapper">
  <label class="bd-checkbox" class:bd-checkbox--disabled={disabled} class:bd-checkbox--error={hasError}>
    <input
      type="checkbox"
      class="bd-checkbox__input"
      id={inputId}
      bind:checked
      {disabled}
      {name}
      {value}
      {indeterminate}
      {onchange}
      aria-invalid={hasError || undefined}
      aria-describedby={hasError ? `${inputId}-error` : undefined}
    />
    <span class="bd-checkbox__box">
      {#if indeterminate}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      {:else if checked}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      {/if}
    </span>
    <span class="bd-checkbox__label-text">{label}</span>
  </label>
  {#if description}
    <p class="bd-checkbox__description">{description}</p>
  {/if}
  {#if hasError}
    <p id="{inputId}-error" class="bd-checkbox__error" role="alert">{error}</p>
  {/if}
</div>

<style>
  .bd-checkbox-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: var(--bd-spacing-xs);
  }

  .bd-checkbox--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .bd-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .bd-checkbox__box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background-color: var(--bd-color-white);
    color: var(--bd-color-white);
    flex-shrink: 0;
    transition: background-color var(--bd-transition-duration) var(--bd-transition-timing),
                border-color var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-checkbox__box svg {
    width: 1rem;
    height: 1rem;
  }

  .bd-checkbox__input:checked + .bd-checkbox__box,
  .bd-checkbox__input:indeterminate + .bd-checkbox__box {
    background-color: var(--bd-color-primary-40);
    border-color: var(--bd-color-primary-40);
  }

  .bd-checkbox__input:focus-visible + .bd-checkbox__box {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-checkbox--error .bd-checkbox__box {
    border-color: var(--bd-color-danger-40);
  }

  .bd-checkbox__label-text {
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
  }

  .bd-checkbox__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: var(--bd-spacing-xxs) 0 0 1.75rem;
  }

  .bd-checkbox__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: var(--bd-spacing-xxs) 0 0 1.75rem;
  }
</style>
