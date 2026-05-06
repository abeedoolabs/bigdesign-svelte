<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    as?: string;
    alignContent?: string;
    alignItems?: string;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: string;
    justifyContent?: string;
    padding?: string;
    margin?: string;
    children?: Snippet;
  }

  let {
    as = 'div',
    alignContent,
    alignItems,
    direction,
    flexWrap,
    gap,
    justifyContent,
    padding,
    margin,
    children,
    style,
    ...restProps
  }: Props = $props();

  let computedStyle = $derived(() => {
    const parts: string[] = ['display:flex'];
    if (alignContent) parts.push(`align-content:${alignContent}`);
    if (alignItems) parts.push(`align-items:${alignItems}`);
    if (direction) parts.push(`flex-direction:${direction}`);
    if (flexWrap) parts.push(`flex-wrap:${flexWrap}`);
    if (gap) parts.push(`gap:${gap}`);
    if (justifyContent) parts.push(`justify-content:${justifyContent}`);
    if (padding) parts.push(`padding:${padding}`);
    if (margin) parts.push(`margin:${margin}`);
    if (style) parts.push(typeof style === 'string' ? style : '');
    return parts.join(';');
  });
</script>

<svelte:element this={as} class="bd-flex" style={computedStyle()} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
  .bd-flex {
    font-family: var(--bd-font-family);
  }
</style>
