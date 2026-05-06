<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    text: string;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    children: Snippet;
  }

  let {
    text,
    placement = 'top',
    children,
  }: Props = $props();

  let isVisible = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  class="bd-tooltip-wrapper"
  role="none"
  onmouseenter={() => isVisible = true}
  onmouseleave={() => isVisible = false}
  onfocus={() => isVisible = true}
  onblur={() => isVisible = false}
>
  {@render children()}
  {#if isVisible}
    <span class="bd-tooltip bd-tooltip--{placement}" role="tooltip">
      {text}
      <span class="bd-tooltip__arrow"></span>
    </span>
  {/if}
</span>

<style>
  .bd-tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .bd-tooltip {
    position: absolute;
    padding: var(--bd-spacing-xxs) var(--bd-spacing-xs);
    background-color: var(--bd-color-secondary-70);
    color: var(--bd-color-white);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    line-height: var(--bd-line-height-sm);
    border-radius: var(--bd-radius-normal);
    white-space: nowrap;
    z-index: var(--bd-z-tooltip);
    pointer-events: none;
  }

  .bd-tooltip__arrow {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--bd-color-secondary-70);
    transform: rotate(45deg);
  }

  .bd-tooltip--top {
    bottom: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
  }
  .bd-tooltip--top .bd-tooltip__arrow {
    bottom: -0.25rem;
    left: 50%;
    margin-left: -0.25rem;
  }

  .bd-tooltip--bottom {
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
  }
  .bd-tooltip--bottom .bd-tooltip__arrow {
    top: -0.25rem;
    left: 50%;
    margin-left: -0.25rem;
  }

  .bd-tooltip--left {
    right: calc(100% + 0.5rem);
    top: 50%;
    transform: translateY(-50%);
  }
  .bd-tooltip--left .bd-tooltip__arrow {
    right: -0.25rem;
    top: 50%;
    margin-top: -0.25rem;
  }

  .bd-tooltip--right {
    left: calc(100% + 0.5rem);
    top: 50%;
    transform: translateY(-50%);
  }
  .bd-tooltip--right .bd-tooltip__arrow {
    left: -0.25rem;
    top: 50%;
    margin-top: -0.25rem;
  }
</style>
