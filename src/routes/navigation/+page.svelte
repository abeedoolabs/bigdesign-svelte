<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Tabs, OffsetPagination } from '$lib/index.js';

  let activeTab = $state('general');
  let currentPage = $state(1);
  let itemsPerPage = $state(25);
</script>

<h1 class="page-title">Navigation</h1>
<p class="page-description">Tabs and pagination for navigating content.</p>

<Demo
  title="Tabs"
  description="Tab navigation with keyboard support and ARIA attributes."
  code={`<Tabs
  tabs={[
    { id: 'general', title: 'General' },
    { id: 'shipping', title: 'Shipping' },
    { id: 'tax', title: 'Tax' },
    { id: 'disabled', title: 'Disabled', disabled: true }
  ]}
  bind:activeTab
>
  {#if activeTab === 'general'}
    <p>General settings content.</p>
  {:else if activeTab === 'shipping'}
    <p>Shipping settings content.</p>
  {/if}
</Tabs>`}
  props={[
    { name: 'tabs', type: 'Tab[]', description: 'Array of tab definitions' },
    { name: 'activeTab', type: 'string', description: 'Bindable active tab ID' },
    { name: 'onTabClick', type: '(tabId: string) => void', description: 'Tab click handler' }
  ]}
>
  <Tabs
    tabs={[
      { id: 'general', title: 'General' },
      { id: 'shipping', title: 'Shipping' },
      { id: 'tax', title: 'Tax' },
      { id: 'disabled', title: 'Disabled', disabled: true }
    ]}
    bind:activeTab
  >
    {#if activeTab === 'general'}
      <p style="margin:0">General settings content goes here.</p>
    {:else if activeTab === 'shipping'}
      <p style="margin:0">Shipping configuration and rules.</p>
    {:else if activeTab === 'tax'}
      <p style="margin:0">Tax rates and tax class settings.</p>
    {/if}
  </Tabs>
</Demo>

<Demo
  title="OffsetPagination"
  description="Pagination controls with items-per-page selector."
  code={`<OffsetPagination
  currentPage={1}
  totalItems={150}
  itemsPerPage={25}
  itemsPerPageOptions={[10, 25, 50]}
  onPageChange={(page) => currentPage = page}
  onItemsPerPageChange={(n) => itemsPerPage = n}
/>`}
  props={[
    { name: 'currentPage', type: 'number', description: 'Current page number' },
    { name: 'totalItems', type: 'number', description: 'Total item count' },
    { name: 'itemsPerPage', type: 'number', description: 'Items shown per page' },
    { name: 'itemsPerPageOptions', type: 'number[]', description: 'Dropdown options for items per page' },
    { name: 'onPageChange', type: '(page: number) => void', description: 'Page change handler' },
    { name: 'onItemsPerPageChange', type: '(n: number) => void', description: 'Items per page change handler' },
    { name: 'label', type: 'string', default: "'items'", description: 'Label for items' }
  ]}
>
  <OffsetPagination
    {currentPage}
    totalItems={150}
    {itemsPerPage}
    itemsPerPageOptions={[10, 25, 50]}
    onPageChange={(page) => currentPage = page}
    onItemsPerPageChange={(n) => { itemsPerPage = n; currentPage = 1; }}
    label="products"
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
