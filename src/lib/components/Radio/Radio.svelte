<script lang="ts">
  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label: string;
    description?: string;
    name?: string;
    value?: string;
    group?: string;
    onchange?: (e: Event) => void;
  }

  let {
    checked = false,
    disabled = false,
    label,
    description,
    name,
    value,
    group = $bindable(''),
    onchange,
  }: Props = $props();

  let inputId = `bd-radio-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class="bd-radio-wrapper">
  <label class="bd-radio" class:bd-radio--disabled={disabled}>
    <input
      type="radio"
      class="bd-radio__input"
      id={inputId}
      bind:group
      {checked}
      {disabled}
      {name}
      {value}
      {onchange}
    />
    <span class="bd-radio__circle"></span>
    <span class="bd-radio__label-text">{label}</span>
  </label>
  {#if description}
    <p class="bd-radio__description">{description}</p>
  {/if}
</div>

<style>
  .bd-radio-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-radio {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: var(--bd-spacing-xs);
  }

  .bd-radio--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .bd-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .bd-radio__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-circle);
    background-color: var(--bd-color-white);
    flex-shrink: 0;
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-radio__circle::after {
    content: '';
    width: 0.625rem;
    height: 0.625rem;
    border-radius: var(--bd-radius-circle);
    background-color: transparent;
    transition: background-color var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-radio__input:checked + .bd-radio__circle {
    border-color: var(--bd-color-primary-40);
  }

  .bd-radio__input:checked + .bd-radio__circle::after {
    background-color: var(--bd-color-primary-40);
  }

  .bd-radio__input:focus-visible + .bd-radio__circle {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-radio__label-text {
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
  }

  .bd-radio__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: var(--bd-spacing-xxs) 0 0 1.75rem;
  }
</style>
