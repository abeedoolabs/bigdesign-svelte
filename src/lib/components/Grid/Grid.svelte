<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    as?: string;
    columns?: string;
    rows?: string;
    areas?: string;
    gap?: string;
    columnGap?: string;
    rowGap?: string;
    alignContent?: string;
    alignItems?: string;
    justifyContent?: string;
    justifyItems?: string;
    padding?: string;
    margin?: string;
    children?: Snippet;
  }

  let {
    as = 'div',
    columns,
    rows,
    areas,
    gap,
    columnGap,
    rowGap,
    alignContent,
    alignItems,
    justifyContent,
    justifyItems,
    padding,
    margin,
    children,
    style,
    ...restProps
  }: Props = $props();

  let computedStyle = $derived(() => {
    const parts: string[] = ['display:grid'];
    if (columns) parts.push(`grid-template-columns:${columns}`);
    if (rows) parts.push(`grid-template-rows:${rows}`);
    if (areas) parts.push(`grid-template-areas:${areas}`);
    if (gap) parts.push(`gap:${gap}`);
    if (columnGap) parts.push(`column-gap:${columnGap}`);
    if (rowGap) parts.push(`row-gap:${rowGap}`);
    if (alignContent) parts.push(`align-content:${alignContent}`);
    if (alignItems) parts.push(`align-items:${alignItems}`);
    if (justifyContent) parts.push(`justify-content:${justifyContent}`);
    if (justifyItems) parts.push(`justify-items:${justifyItems}`);
    if (padding) parts.push(`padding:${padding}`);
    if (margin) parts.push(`margin:${margin}`);
    if (style) parts.push(typeof style === 'string' ? style : '');
    return parts.join(';');
  });
</script>

<svelte:element this={as} class="bd-grid" style={computedStyle()} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
  .bd-grid {
    font-family: var(--bd-font-family);
  }
</style>
