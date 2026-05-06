<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Typography, HR, Badge, Table, StatefulTable } from '$lib/index.js';
  import type { TableColumn } from '$lib/index.js';

  interface Product {
    id: number;
    name: string;
    sku: string;
    price: string;
    stock: number;
  }

  const sampleProducts: Product[] = [
    { id: 1, name: 'Widget Pro', sku: 'WP-001', price: '$29.99', stock: 142 },
    { id: 2, name: 'Gadget Max', sku: 'GM-002', price: '$49.99', stock: 38 },
    { id: 3, name: 'Thingamajig', sku: 'TM-003', price: '$9.99', stock: 500 },
    { id: 4, name: 'Doohickey XL', sku: 'DH-004', price: '$79.99', stock: 12 },
    { id: 5, name: 'Sprocket Mini', sku: 'SM-005', price: '$14.99', stock: 220 },
  ];

  const columns: TableColumn<Product>[] = [
    { header: 'Name', hash: 'name', render: (row) => row.name, sortKey: 'name' },
    { header: 'SKU', hash: 'sku', render: (row) => row.sku },
    { header: 'Price', hash: 'price', render: (row) => row.price, align: 'right', sortKey: 'price' },
    { header: 'Stock', hash: 'stock', render: (row) => String(row.stock), align: 'right', sortKey: 'stock' },
  ];
</script>

<h1 class="page-title">Data Display</h1>
<p class="page-description">Typography, badges, and tables for presenting data.</p>

<Demo
  title="Typography"
  description="Heading levels H0-H4, body text, and small text."
  code={`<Typography variant="h0">Heading 0</Typography>
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="text">Body text</Typography>
<Typography variant="small">Small text</Typography>
<HR />`}
  props={[
    { name: 'variant', type: "'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'small'", default: "'text'", description: 'Typography variant' },
    { name: 'as', type: 'string', description: 'Override HTML element' },
    { name: 'color', type: 'string', description: 'Text color' },
    { name: 'ellipsis', type: 'boolean', default: 'false', description: 'Truncate with ellipsis' }
  ]}
>
  <Typography variant="h0">Heading 0 (xxxLarge / extraLight)</Typography>
  <Typography variant="h1">Heading 1 (xxLarge / light)</Typography>
  <Typography variant="h2">Heading 2 (xLarge / regular)</Typography>
  <Typography variant="h3">Heading 3 (large / regular)</Typography>
  <Typography variant="h4">Heading 4 (medium / semiBold)</Typography>
  <Typography variant="text">Body text paragraph. This is the default text style used for content.</Typography>
  <Typography variant="small">Small text for captions and secondary information.</Typography>
  <HR />
  <Typography variant="text">Content after a horizontal rule.</Typography>
</Demo>

<Demo
  title="Badge"
  description="Status indicators in multiple color variants."
  code={`<Badge label="Active" variant="success" />
<Badge label="Pending" variant="warning" />
<Badge label="Error" variant="danger" />
<Badge label="Info" variant="primary" />
<Badge label="Draft" variant="secondary" />`}
  props={[
    { name: 'label', type: 'string', description: 'Badge text (required)' },
    { name: 'variant', type: "'success' | 'warning' | 'danger' | 'primary' | 'secondary'", default: "'secondary'", description: 'Color variant' }
  ]}
>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
    <Badge label="Active" variant="success" />
    <Badge label="Pending" variant="warning" />
    <Badge label="Error" variant="danger" />
    <Badge label="Info" variant="primary" />
    <Badge label="Draft" variant="secondary" />
  </div>
</Demo>

<Demo
  title="Table"
  description="Basic data table with sortable columns and custom rendering."
  code={`<Table
  columns={[
    { header: 'Name', hash: 'name', render: (row) => row.name, sortKey: 'name' },
    { header: 'SKU', hash: 'sku', render: (row) => row.sku },
    { header: 'Price', hash: 'price', render: (row) => row.price, align: 'right' },
  ]}
  items={products}
  keyField="id"
/>`}
  props={[
    { name: 'columns', type: 'TableColumn<T>[]', description: 'Column definitions with header, hash, render function' },
    { name: 'items', type: 'T[]', description: 'Array of row data' },
    { name: 'keyField', type: 'string', default: "'id'", description: 'Unique key property on each item' },
    { name: 'sortable', type: 'TableSortable<T>', description: 'Controlled sort state and handler' },
    { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Stick header on scroll' },
    { name: 'headerless', type: 'boolean', default: 'false', description: 'Hide the header row' },
    { name: 'itemName', type: 'string', description: 'Label for empty state (e.g. "products")' }
  ]}
>
  <Table {columns} items={sampleProducts} keyField="id" />
</Demo>

<Demo
  title="StatefulTable"
  description="Table with built-in sorting, pagination, and row selection."
  code={`<StatefulTable
  columns={columns}
  items={products}
  pagination
  itemsPerPage={10}
  selectable
  onSelectionChange={(selected) => console.log(selected)}
/>`}
  props={[
    { name: 'columns', type: 'TableColumn<T>[]', description: 'Column definitions' },
    { name: 'items', type: 'T[]', description: 'Array of row data' },
    { name: 'pagination', type: 'boolean', default: 'false', description: 'Enable built-in pagination' },
    { name: 'itemsPerPage', type: 'number', default: '25', description: 'Rows per page' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row checkboxes' },
    { name: 'onSelectionChange', type: '(items: T[]) => void', description: 'Selection change handler' },
    { name: 'onRowClick', type: '(item: T) => void', description: 'Row click handler' }
  ]}
>
  <StatefulTable {columns} items={sampleProducts} keyField="id" pagination itemsPerPage={3} selectable />
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
