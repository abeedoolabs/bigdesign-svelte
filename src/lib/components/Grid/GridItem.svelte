<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    area?: string;
    column?: string;
    row?: string;
    children?: Snippet;
  }

  let {
    area,
    column,
    row,
    children,
    style,
    ...restProps
  }: Props = $props();

  let computedStyle = $derived(() => {
    const parts: string[] = [];
    if (area) parts.push(`grid-area:${area}`);
    if (column) parts.push(`grid-column:${column}`);
    if (row) parts.push(`grid-row:${row}`);
    if (style) parts.push(typeof style === 'string' ? style : '');
    return parts.join(';');
  });
</script>

<div class="bd-grid-item" style={computedStyle()} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
