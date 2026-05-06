<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  interface Props extends HTMLAnchorAttributes {
    external?: boolean;
    children?: Snippet;
  }

  let {
    external = false,
    children,
    ...restProps
  }: Props = $props();
</script>

<a
  class="bd-link"
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
  {#if external}
    <svg class="bd-link__external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  {/if}
</a>

<style>
  .bd-link {
    color: var(--bd-color-primary-40);
    font-family: var(--bd-font-family);
    text-decoration: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--bd-spacing-xxs);
  }

  .bd-link:hover {
    text-decoration: underline;
    color: var(--bd-color-primary-50);
  }

  .bd-link:active {
    color: var(--bd-color-primary-60);
  }

  .bd-link:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px var(--bd-color-primary-20);
    border-radius: var(--bd-radius-normal);
  }

  .bd-link__external-icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
</style>
