<script lang="ts" module>
  export type TypographyVariant = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'small';
  export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLElement> {
    as?: HeadingTag | 'p' | 'span';
    variant?: TypographyVariant;
    color?: string;
    ellipsis?: boolean;
    children?: Snippet;
  }

  const defaultTags: Record<TypographyVariant, string> = {
    h0: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    text: 'p',
    small: 'p',
  };

  let {
    as,
    variant = 'text',
    color,
    ellipsis = false,
    children,
    style,
    ...restProps
  }: Props = $props();

  let tag = $derived(as || defaultTags[variant]);

  let computedStyle = $derived(() => {
    const parts: string[] = [];
    if (color) parts.push(`color:${color}`);
    if (style) parts.push(typeof style === 'string' ? style : '');
    return parts.join(';') || undefined;
  });
</script>

<svelte:element
  this={tag}
  class="bd-typography bd-typography--{variant}"
  class:bd-typography--ellipsis={ellipsis}
  style={computedStyle()}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
  .bd-typography {
    font-family: var(--bd-font-family);
    color: var(--bd-color-text);
    margin: 0;
  }

  .bd-typography--h0 {
    font-size: var(--bd-font-size-xxxl);
    font-weight: var(--bd-font-weight-extra-light);
    line-height: var(--bd-line-height-xxxl);
    margin-bottom: var(--bd-spacing-xl);
  }

  .bd-typography--h1 {
    font-size: var(--bd-font-size-xxl);
    font-weight: var(--bd-font-weight-light);
    line-height: var(--bd-line-height-xxl);
    margin-bottom: var(--bd-spacing-xl);
  }

  .bd-typography--h2 {
    font-size: var(--bd-font-size-xl);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-xl);
    margin-bottom: var(--bd-spacing-md);
  }

  .bd-typography--h3 {
    font-size: var(--bd-font-size-lg);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-lg);
    margin-bottom: var(--bd-spacing-sm);
  }

  .bd-typography--h4 {
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    line-height: var(--bd-line-height-md);
    margin-bottom: var(--bd-spacing-xs);
  }

  .bd-typography--text {
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-md);
    margin-bottom: var(--bd-spacing-md);
  }

  .bd-typography--text:last-child {
    margin-bottom: 0;
  }

  .bd-typography--small {
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-regular);
    line-height: var(--bd-line-height-sm);
    color: var(--bd-color-text-secondary);
    margin-bottom: var(--bd-spacing-sm);
  }

  .bd-typography--small:last-child {
    margin-bottom: 0;
  }

  .bd-typography--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
