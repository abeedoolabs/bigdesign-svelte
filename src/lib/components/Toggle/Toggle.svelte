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

  let inputId = `bd-toggle-${Math.random().toString(36).slice(2, 9)}`;
</script>

<label class="bd-toggle" class:bd-toggle--disabled={disabled}>
  <input
    type="checkbox"
    class="bd-toggle__input"
    id={inputId}
    bind:checked
    {disabled}
    {onchange}
    role="switch"
    aria-checked={checked}
  />
  <span class="bd-toggle__track">
    <span class="bd-toggle__thumb"></span>
  </span>
  {#if label}
    <span class="bd-toggle__label">{label}</span>
  {/if}
</label>

<style>
  .bd-toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: var(--bd-spacing-xs);
    font-family: var(--bd-font-family);
  }

  .bd-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .bd-toggle__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .bd-toggle__track {
    position: relative;
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    background-color: var(--bd-color-secondary-40);
    transition: background-color var(--bd-transition-duration) var(--bd-transition-timing);
    flex-shrink: 0;
  }

  .bd-toggle__thumb {
    position: absolute;
    top: 0.1875rem;
    left: 0.1875rem;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: var(--bd-radius-circle);
    background-color: var(--bd-color-white);
    transition: transform var(--bd-transition-duration) var(--bd-transition-timing);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .bd-toggle__input:checked + .bd-toggle__track {
    background-color: var(--bd-color-primary-40);
  }

  .bd-toggle__input:checked + .bd-toggle__track .bd-toggle__thumb {
    transform: translateX(1.25rem);
  }

  .bd-toggle__input:focus-visible + .bd-toggle__track {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }

  .bd-toggle__label {
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
  }
</style>
