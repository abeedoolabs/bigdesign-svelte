<script lang="ts" generics="T">
  import type { TreeNode } from '../Tree/Tree.svelte';
  import Tree from '../Tree/Tree.svelte';

  interface Props {
    nodes: TreeNode<T>[];
    defaultExpanded?: T[];
    iconless?: boolean;
    onNodeClick?: (node: TreeNode<T>) => void;
  }

  let {
    nodes,
    defaultExpanded = [],
    iconless = false,
    onNodeClick,
  }: Props = $props();

  let _defaults = defaultExpanded;
  let expandedNodes = $state(new Set<T>(_defaults));
  let selectedNode = $state<T | undefined>(undefined);
</script>

<Tree
  {nodes}
  bind:expandedNodes
  bind:selectedNode
  {iconless}
  {onNodeClick}
/>
