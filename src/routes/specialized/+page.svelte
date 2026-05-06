<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { AnchorNav, Timepicker, Tree, StatefulTree, TableNext, Worksheet, FeatureSet, Button } from '$lib/index.js';
  import type { TreeNode } from '$lib/index.js';

  let activeAnchor = $state('#overview');
  let timeVal = $state('');

  const treeNodes: TreeNode<string>[] = [
    {
      id: 'root',
      label: 'Products',
      children: [
        {
          id: 'clothing',
          label: 'Clothing',
          children: [
            { id: 'shirts', label: 'Shirts' },
            { id: 'pants', label: 'Pants' },
            { id: 'shoes', label: 'Shoes' }
          ]
        },
        {
          id: 'electronics',
          label: 'Electronics',
          children: [
            { id: 'phones', label: 'Phones' },
            { id: 'tablets', label: 'Tablets' }
          ]
        },
        { id: 'accessories', label: 'Accessories' }
      ]
    }
  ];

  let worksheetItems = $state([
    { id: 1, name: 'Widget', price: 29.99, stock: 142, active: true },
    { id: 2, name: 'Gadget', price: 49.99, stock: 38, active: true },
    { id: 3, name: 'Sprocket', price: 14.99, stock: 220, active: false },
  ]);
</script>

<h1 class="page-title">Specialized</h1>
<p class="page-description">Advanced components for navigation, data editing, trees, and feature comparison.</p>

<Demo
  title="AnchorNav"
  description="Vertical navigation for scrolling to page sections."
  code={`<AnchorNav
  items={[
    { href: '#overview', label: 'Overview' },
    { href: '#details', label: 'Details' },
    { href: '#pricing', label: 'Pricing' }
  ]}
  bind:activeHref
/>`}
  props={[
    { name: 'items', type: 'AnchorNavItem[]', description: 'Array of {href, label} items' },
    { name: 'activeHref', type: 'string', description: 'Bindable active href' }
  ]}
>
  <AnchorNav
    items={[
      { href: '#overview', label: 'Overview' },
      { href: '#details', label: 'Details' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#reviews', label: 'Reviews' }
    ]}
    bind:activeHref={activeAnchor}
  />
</Demo>

<Demo
  title="Timepicker"
  description="Native time input styled with BigDesign tokens."
  code={`<Timepicker label="Start Time" bind:value={time} />`}
  props={[
    { name: 'value', type: 'string', description: 'Bindable time string (HH:MM)' },
    { name: 'label', type: 'string', description: 'Input label' },
    { name: 'error', type: 'string | string[]', description: 'Error message(s)' },
    { name: 'onTimeChange', type: '(time: string) => void', description: 'Change handler' }
  ]}
>
  <div style="max-width:12rem">
    <Timepicker label="Start Time" bind:value={timeVal} />
  </div>
</Demo>

<Demo
  title="Tree"
  description="Hierarchical tree view with expandable nodes, icons, and selection."
  code={`<Tree
  nodes={[
    { id: 'root', label: 'Products', children: [
      { id: 'shirts', label: 'Shirts' },
      { id: 'pants', label: 'Pants' }
    ]}
  ]}
/>`}
  props={[
    { name: 'nodes', type: 'TreeNode<T>[]', description: 'Tree data (id, label, children)' },
    { name: 'expandedNodes', type: 'Set<T>', description: 'Bindable set of expanded node IDs' },
    { name: 'selectedNode', type: 'T', description: 'Bindable selected node ID' },
    { name: 'iconless', type: 'boolean', default: 'false', description: 'Hide folder/file icons' },
    { name: 'onNodeClick', type: '(node: TreeNode<T>) => void', description: 'Node click handler' },
    { name: 'renderLabel', type: 'Snippet<[TreeNode<T>]>', description: 'Custom label rendering' }
  ]}
>
  <div style="max-width:16rem">
    <StatefulTree nodes={treeNodes} defaultExpanded={['root', 'clothing']} />
  </div>
</Demo>

<Demo
  title="TableNext"
  description="Enhanced table with pinned columns, HTML rendering, and resizable columns."
  code={`<TableNext
  columns={[
    { header: 'Name', hash: 'name', render: (r) => r.name, pin: 'left' },
    { header: 'Price', hash: 'price', render: (r) => '$' + r.price, align: 'right' }
  ]}
  items={products}
/>`}
  props={[
    { name: 'columns', type: 'TableNextColumn<T>[]', description: 'Column definitions with pin, renderHtml support' },
    { name: 'items', type: 'T[]', description: 'Row data' },
    { name: 'resizableColumns', type: 'boolean', default: 'false', description: 'Allow column resize via drag' },
    { name: 'sortable', type: 'object', description: 'Controlled sort state' },
    { name: 'onRowClick', type: '(item: T) => void', description: 'Row click handler' }
  ]}
>
  <TableNext
    columns={[
      { header: 'Name', hash: 'name', render: (r: typeof worksheetItems[0]) => r.name, pin: 'left' },
      { header: 'Price', hash: 'price', render: (r: typeof worksheetItems[0]) => `$${r.price}`, align: 'right' },
      { header: 'Stock', hash: 'stock', render: (r: typeof worksheetItems[0]) => String(r.stock), align: 'right' },
      { header: 'Active', hash: 'active', render: (r: typeof worksheetItems[0]) => r.active ? 'Yes' : 'No' }
    ]}
    items={worksheetItems}
    keyField="id"
    resizableColumns
  />
</Demo>

<Demo
  title="Worksheet"
  description="Editable spreadsheet-like grid. Click a cell to edit inline."
  code={`<Worksheet
  columns={[
    { hash: 'name', header: 'Name' },
    { hash: 'price', header: 'Price', type: 'number' },
    { hash: 'active', header: 'Active', type: 'checkbox' }
  ]}
  items={products}
  onChange={(updated) => products = updated}
/>`}
  props={[
    { name: 'columns', type: 'WorksheetColumn<T>[]', description: 'Column definitions with type (text, number, select, checkbox)' },
    { name: 'items', type: 'T[]', description: 'Row data (must extend Record<string, unknown>)' },
    { name: 'onChange', type: '(items: T[]) => void', description: 'Fired when cells are edited' },
    { name: 'disabledRows', type: 'number[]', description: 'Row indices that cannot be edited' }
  ]}
>
  <Worksheet
    columns={[
      { hash: 'name', header: 'Product Name' },
      { hash: 'price', header: 'Price', type: 'number', width: '6rem' },
      { hash: 'stock', header: 'Stock', type: 'number', width: '5rem' },
      { hash: 'active', header: 'Active', type: 'checkbox', width: '4rem' }
    ]}
    items={worksheetItems}
    keyField="id"
    onChange={(updated) => worksheetItems = updated}
  />
</Demo>

<Demo
  title="FeatureSet"
  description="Feature comparison list with included/excluded indicators."
  code={`<FeatureSet
  features={[
    { label: 'Unlimited products', included: true },
    { label: 'Custom domain', included: true },
    { label: 'API access', included: false }
  ]}
  columns={2}
/>`}
  props={[
    { name: 'features', type: 'Feature[]', description: 'Array of {label, description?, included}' },
    { name: 'columns', type: '1 | 2 | 3', default: '1', description: 'Grid columns' }
  ]}
>
  <FeatureSet
    features={[
      { label: 'Unlimited products', description: 'No cap on catalog size', included: true },
      { label: 'Custom domain', description: 'Use your own domain name', included: true },
      { label: 'Priority support', description: '24/7 phone and email', included: true },
      { label: 'API access', description: 'REST and GraphQL endpoints', included: false },
      { label: 'White-label', description: 'Remove branding', included: false },
      { label: 'SSO integration', description: 'SAML and OIDC', included: false }
    ]}
    columns={2}
  />
</Demo>

<style>
  .page-title {
    font-family: var(--bd-font-family);
    font-size: 2rem;
    font-weight: var(--bd-font-weight-light);
    color: var(--bd-color-text);
    margin: 0 0 0.25rem;
  }

  .page-description {
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text-secondary);
    margin: 0 0 2rem;
  }
</style>
