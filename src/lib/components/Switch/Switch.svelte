<script lang="ts">
  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    onchange?: (e: Event) => void;
  }

  let {
    checked = $bindable(false),
    disabled = false,
    label,
    onchange,
  }: Props = $props();

  let inputId = `bd-switch-${Math.random().toString(36).slice(2, 9)}`;
</script>

<label class="bd-switch" class:bd-switch--disabled={disabled}>
  <input
    type="checkbox"
    class="bd-switch__input"
    id={inputId}
    bind:checked
    {disabled}
    {onchange}
    role="switch"
    aria-checked={checked}
  />
  <span class="bd-switch__track">
    <span class="bd-switch__thumb"></span>
  </span>
  {#if label}
    <span class="bd-switch__label">{label}</span>
  {/if}
</label>

<style>
  .bd-switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: var(--bd-spacing-xs);
    font-family: var(--bd-font-family);
  }

  .bd-switch--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .bd-switch__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .bd-switch__track {
    position: relative;
    width: 2.5rem;
    height: 1.25rem;
    border-radius: 0.625rem;
    background-color: var(--bd-color-secondary-40);
    transition: background-color var(--bd-transition-duration) var(--bd-transition-timing);
    flex-shrink: 0;
  }

  .bd-switch__thumb {
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1rem;
    height: 1rem;
    border-radius: var(--bd-radius-circle);
    background-color: var(--bd-color-white);
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .bd-switch__input:checked + .bd-switch__track {
    background-color: var(--bd-color-primary-40);
  }

  .bd-switch__input:checked + .bd-switch__track .bd-switch__thumb {
    transform: translateX(1.25rem);
  }

  .bd-switch__input:focus-visible + .bd-switch__track {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-switch__label {
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
  }
</style>
