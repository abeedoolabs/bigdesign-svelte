<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    as?: string;
    padding?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    margin?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    backgroundColor?: string;
    border?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderRadius?: string;
    shadow?: 'raised' | 'floating';
    display?: string;
    overflow?: string;
    zIndex?: string | number;
    children?: Snippet;
  }

  let {
    as = 'div',
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    backgroundColor,
    border,
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    borderRadius,
    shadow,
    display,
    overflow,
    zIndex,
    children,
    style,
    ...restProps
  }: Props = $props();

  const shadowMap = {
    raised: 'var(--bd-shadow-raised)',
    floating: 'var(--bd-shadow-floating)',
  };

  let computedStyle = $derived(() => {
    const parts: string[] = [];
    if (padding) parts.push(`padding:${padding}`);
    if (paddingTop) parts.push(`padding-top:${paddingTop}`);
    if (paddingRight) parts.push(`padding-right:${paddingRight}`);
    if (paddingBottom) parts.push(`padding-bottom:${paddingBottom}`);
    if (paddingLeft) parts.push(`padding-left:${paddingLeft}`);
    if (margin) parts.push(`margin:${margin}`);
    if (marginTop) parts.push(`margin-top:${marginTop}`);
    if (marginRight) parts.push(`margin-right:${marginRight}`);
    if (marginBottom) parts.push(`margin-bottom:${marginBottom}`);
    if (marginLeft) parts.push(`margin-left:${marginLeft}`);
    if (backgroundColor) parts.push(`background-color:${backgroundColor}`);
    if (border) parts.push(`border:${border}`);
    if (borderBottom) parts.push(`border-bottom:${borderBottom}`);
    if (borderLeft) parts.push(`border-left:${borderLeft}`);
    if (borderRight) parts.push(`border-right:${borderRight}`);
    if (borderTop) parts.push(`border-top:${borderTop}`);
    if (borderRadius) parts.push(`border-radius:${borderRadius}`);
    if (shadow) parts.push(`box-shadow:${shadowMap[shadow]}`);
    if (display) parts.push(`display:${display}`);
    if (overflow) parts.push(`overflow:${overflow}`);
    if (zIndex != null) parts.push(`z-index:${zIndex}`);
    if (style) parts.push(typeof style === 'string' ? style : '');
    return parts.join(';');
  });
</script>

<svelte:element this={as} class="bd-box" style={computedStyle()} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
  .bd-box {
    font-family: var(--bd-font-family);
  }
</style>
