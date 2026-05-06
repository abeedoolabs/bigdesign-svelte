<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    alignSelf?: string;
    flexBasis?: string;
    flexGrow?: number;
    flexOrder?: number;
    flexShrink?: number;
    children?: Snippet;
  }

  let {
    alignSelf,
    flexBasis,
    flexGrow,
    flexOrder,
    flexShrink,
    children,
    style,
    ...restProps
  }: Props = $props();

  let computedStyle = $derived(() => {
    const parts: string[] = [];
    if (alignSelf) parts.push(`align-self:${alignSelf}`);
    if (flexBasis) parts.push(`flex-basis:${flexBasis}`);
    if (flexGrow != null) parts.push(`flex-grow:${flexGrow}`);
    if (flexOrder != null) parts.push(`order:${flexOrder}`);
    if (flexShrink != null) parts.push(`flex-shrink:${flexShrink}`);
    if (style) parts.push(typeof style === 'string' ? style : '');
    return parts.join(';');
  });
</script>

<div class="bd-flex-item" style={computedStyle()} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
