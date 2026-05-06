<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  interface Props extends HTMLTextareaAttributes {
    label?: string;
    description?: string;
    error?: string | string[];
    value?: string;
    resize?: boolean;
  }

  let {
    label,
    description,
    error,
    value = $bindable(''),
    resize = true,
    id,
    disabled,
    ...restProps
  }: Props = $props();

  let textareaId = $derived(id || `bd-textarea-${Math.random().toString(36).slice(2, 9)}`);
  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);
</script>

<div class="bd-textarea-wrapper">
  {#if label}
    <label class="bd-textarea__label" for={textareaId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-textarea__description">{description}</p>
  {/if}
  <textarea
    class="bd-textarea"
    class:bd-textarea--error={hasError}
    class:bd-textarea--no-resize={!resize}
    id={textareaId}
    bind:value
    {disabled}
    aria-invalid={hasError || undefined}
    aria-describedby={hasError ? `${textareaId}-error` : undefined}
    {...restProps}
  ></textarea>
  {#if hasError}
    <div id="{textareaId}-error" class="bd-textarea__errors" role="alert">
      {#each errors as err}
        <p class="bd-textarea__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-textarea-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-textarea__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-textarea__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-textarea {
    width: 100%;
    min-height: 5rem;
    padding: var(--bd-spacing-sm);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background-color: var(--bd-color-white);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
    outline: none;
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing),
                box-shadow var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-textarea:focus {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-textarea--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-textarea--error:focus {
    border-color: var(--bd-color-danger-40);
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }

  .bd-textarea:disabled {
    background-color: var(--bd-color-secondary-10);
    cursor: not-allowed;
    color: var(--bd-color-text-disabled);
  }

  .bd-textarea::placeholder {
    color: var(--bd-color-secondary-40);
  }

  .bd-textarea--no-resize {
    resize: none;
  }

  .bd-textarea__errors {
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-textarea__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
