<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'subtle' | 'utility';
    actionType?: 'normal' | 'destructive';
    isLoading?: boolean;
    iconLeft?: Snippet;
    iconRight?: Snippet;
    iconOnly?: Snippet;
    mobileWidth?: 'auto' | '100%';
    children?: Snippet;
  }

  let {
    variant = 'primary',
    actionType = 'normal',
    isLoading = false,
    iconLeft,
    iconRight,
    iconOnly,
    mobileWidth = '100%',
    disabled,
    children,
    ...restProps
  }: Props = $props();

  let isDisabled = $derived(disabled || isLoading);
</script>

<button
  class="bd-button bd-button--{variant} bd-button--{actionType}"
  class:bd-button--loading={isLoading}
  class:bd-button--icon-only={iconOnly}
  class:bd-button--mobile-auto={mobileWidth === 'auto'}
  disabled={isDisabled}
  {...restProps}
>
  {#if isLoading}
    <span class="bd-button__spinner">
      <svg class="bd-button__spinner-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="31.4 31.4" stroke-linecap="round" />
      </svg>
    </span>
  {/if}

  {#if iconOnly}
    <span class="bd-button__content" class:bd-button__content--hidden={isLoading}>
      {@render iconOnly()}
    </span>
  {:else}
    <span class="bd-button__content" class:bd-button__content--hidden={isLoading}>
      {#if iconLeft}
        <span class="bd-button__icon bd-button__icon--left">
          {@render iconLeft()}
        </span>
      {/if}
      {#if children}
        {@render children()}
      {/if}
      {#if iconRight}
        <span class="bd-button__icon bd-button__icon--right">
          {@render iconRight()}
        </span>
      {/if}
    </span>
  {/if}
</button>

<style>
  .bd-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    padding: 0 var(--bd-spacing-md);
    border: 1px solid transparent;
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-md);
    cursor: pointer;
    outline: none;
    text-decoration: none;
    transition: background-color var(--bd-transition-duration) var(--bd-transition-timing),
                border-color var(--bd-transition-duration) var(--bd-transition-timing),
                box-shadow var(--bd-transition-duration) var(--bd-transition-timing),
                color var(--bd-transition-duration) var(--bd-transition-timing);
    width: 100%;
  }

  @media (min-width: 720px) {
    .bd-button {
      width: auto;
    }
  }

  .bd-button--mobile-auto {
    width: auto;
  }

  .bd-button:disabled {
    cursor: not-allowed;
  }

  /* Primary - Normal */
  .bd-button--primary.bd-button--normal {
    background-color: var(--bd-color-primary-40);
    border-color: var(--bd-color-primary-40);
    color: var(--bd-color-white);
    font-weight: var(--bd-font-weight-semi-bold);
  }
  .bd-button--primary.bd-button--normal:hover:not(:disabled) {
    background-color: var(--bd-color-primary-50);
    border-color: var(--bd-color-primary-50);
  }
  .bd-button--primary.bd-button--normal:active:not(:disabled) {
    background-color: var(--bd-color-primary-60);
    border-color: var(--bd-color-primary-60);
  }
  .bd-button--primary.bd-button--normal:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }
  .bd-button--primary.bd-button--normal:disabled {
    background-color: var(--bd-color-secondary-30);
    border-color: var(--bd-color-secondary-30);
  }

  /* Primary - Destructive */
  .bd-button--primary.bd-button--destructive {
    background-color: var(--bd-color-danger-40);
    border-color: var(--bd-color-danger-40);
    color: var(--bd-color-white);
    font-weight: var(--bd-font-weight-semi-bold);
  }
  .bd-button--primary.bd-button--destructive:hover:not(:disabled) {
    background-color: var(--bd-color-danger-50);
    border-color: var(--bd-color-danger-50);
  }
  .bd-button--primary.bd-button--destructive:active:not(:disabled) {
    background-color: var(--bd-color-danger-60);
    border-color: var(--bd-color-danger-60);
  }
  .bd-button--primary.bd-button--destructive:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }
  .bd-button--primary.bd-button--destructive:disabled {
    background-color: var(--bd-color-secondary-30);
    border-color: var(--bd-color-secondary-30);
  }

  /* Secondary - Normal */
  .bd-button--secondary.bd-button--normal {
    background-color: transparent;
    border-color: var(--bd-color-primary-40);
    color: var(--bd-color-primary-40);
  }
  .bd-button--secondary.bd-button--normal:hover:not(:disabled) {
    background-color: var(--bd-color-primary-10);
  }
  .bd-button--secondary.bd-button--normal:active:not(:disabled) {
    background-color: var(--bd-color-primary-20);
  }
  .bd-button--secondary.bd-button--normal:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }
  .bd-button--secondary.bd-button--normal:disabled {
    border-color: var(--bd-color-secondary-30);
    color: var(--bd-color-secondary-40);
  }

  /* Secondary - Destructive */
  .bd-button--secondary.bd-button--destructive {
    background-color: transparent;
    border-color: var(--bd-color-danger-40);
    color: var(--bd-color-danger-40);
  }
  .bd-button--secondary.bd-button--destructive:hover:not(:disabled) {
    background-color: var(--bd-color-danger-10);
  }
  .bd-button--secondary.bd-button--destructive:active:not(:disabled) {
    background-color: var(--bd-color-danger-20);
  }
  .bd-button--secondary.bd-button--destructive:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }
  .bd-button--secondary.bd-button--destructive:disabled {
    border-color: var(--bd-color-secondary-30);
    color: var(--bd-color-secondary-40);
  }

  /* Subtle - Normal */
  .bd-button--subtle.bd-button--normal {
    background-color: transparent;
    border-color: transparent;
    color: var(--bd-color-primary-40);
  }
  .bd-button--subtle.bd-button--normal:hover:not(:disabled) {
    background-color: var(--bd-color-primary-10);
  }
  .bd-button--subtle.bd-button--normal:active:not(:disabled) {
    background-color: var(--bd-color-primary-20);
  }
  .bd-button--subtle.bd-button--normal:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }
  .bd-button--subtle.bd-button--normal:disabled {
    color: var(--bd-color-secondary-40);
  }

  /* Subtle - Destructive */
  .bd-button--subtle.bd-button--destructive {
    background-color: transparent;
    border-color: transparent;
    color: var(--bd-color-danger-40);
  }
  .bd-button--subtle.bd-button--destructive:hover:not(:disabled) {
    background-color: var(--bd-color-danger-10);
  }
  .bd-button--subtle.bd-button--destructive:active:not(:disabled) {
    background-color: var(--bd-color-danger-20);
  }
  .bd-button--subtle.bd-button--destructive:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }
  .bd-button--subtle.bd-button--destructive:disabled {
    color: var(--bd-color-secondary-40);
  }

  /* Utility - Normal */
  .bd-button--utility.bd-button--normal {
    background-color: transparent;
    border-color: transparent;
    color: var(--bd-color-secondary-60);
  }
  .bd-button--utility.bd-button--normal:hover:not(:disabled) {
    background-color: var(--bd-color-primary-10);
    color: var(--bd-color-primary-40);
  }
  .bd-button--utility.bd-button--normal:active:not(:disabled) {
    background-color: var(--bd-color-primary-20);
    color: var(--bd-color-primary-40);
  }
  .bd-button--utility.bd-button--normal:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
  }
  .bd-button--utility.bd-button--normal:disabled {
    color: var(--bd-color-secondary-40);
  }

  /* Utility - Destructive */
  .bd-button--utility.bd-button--destructive {
    background-color: transparent;
    border-color: transparent;
    color: var(--bd-color-secondary-60);
  }
  .bd-button--utility.bd-button--destructive:hover:not(:disabled) {
    background-color: var(--bd-color-danger-10);
    color: var(--bd-color-danger-40);
  }
  .bd-button--utility.bd-button--destructive:active:not(:disabled) {
    background-color: var(--bd-color-danger-20);
    color: var(--bd-color-danger-40);
  }
  .bd-button--utility.bd-button--destructive:focus-visible {
    box-shadow: 0 0 0 4px var(--bd-color-danger-20);
  }
  .bd-button--utility.bd-button--destructive:disabled {
    color: var(--bd-color-secondary-40);
  }

  /* Icon Only */
  .bd-button--icon-only {
    padding: 0;
    min-width: 2.25rem;
  }

  /* Loading */
  .bd-button__spinner {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bd-button__spinner-svg {
    width: 1.25rem;
    height: 1.25rem;
    animation: bd-spin 0.8s linear infinite;
  }

  @keyframes bd-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .bd-button__content {
    display: inline-flex;
    align-items: center;
    gap: var(--bd-spacing-xs);
  }

  .bd-button__content--hidden {
    visibility: hidden;
  }

  .bd-button__icon {
    display: inline-flex;
    align-items: center;
  }
</style>
