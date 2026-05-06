<script lang="ts">
  const categories: Record<string, string[]> = {
    'Layout': ['Box', 'Flex', 'Grid', 'Panel'],
    'Actions': ['Button', 'Link', 'Dropdown'],
    'Forms': ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'Fieldset', 'Form'],
    'Data Display': ['Typography', 'Badge', 'Table', 'StatefulTable'],
    'Feedback': ['Alert', 'InlineMessage'],
    'Navigation': ['Tabs', 'OffsetPagination'],
    'Overlays': ['Modal', 'Tooltip']
  };

  const total = Object.values(categories).flat().length;
</script>

<div class="overview">
  <h1 class="overview__title"><span class="overview__accent">BigDesign</span> Svelte</h1>
  <p class="overview__subtitle">
    {total} Svelte 5 components porting BigCommerce's BigDesign React library. Built with runes, snippets, and CSS custom properties.
  </p>

  <div class="overview__grid">
    {#each Object.entries(categories) as [category, items]}
      <div class="overview__card">
        <div class="overview__card-header">
          <h2 class="overview__card-title">{category}</h2>
          <span class="overview__card-count">{items.length}</span>
        </div>
        <div class="overview__card-items">
          {#each items as item}
            <span class="overview__badge">{item}</span>
          {/each}
        </div>
        <div class="overview__card-footer">
          <a href="/{category.toLowerCase().replace(' ', '-')}" class="overview__browse-btn">
            Browse
          </a>
        </div>
      </div>
    {/each}
  </div>

  <div class="overview__install">
    <h2 class="overview__install-title">Installation</h2>
    <pre class="overview__code"><code>npm install @radish/bigdesign-svelte</code></pre>

    <h3 class="overview__usage-title">Quick Start</h3>
    <pre class="overview__code"><code>{`<!-- Import theme CSS in your root layout -->
<script>
  import '@radish/bigdesign-svelte/theme';
  import { Button, Input, Panel } from '@radish/bigdesign-svelte';
</script>

<Panel header="My Panel">
  <Input label="Name" placeholder="Enter your name" />
  <Button variant="primary">Submit</Button>
</Panel>`}</code></pre>
  </div>
</div>

<style>
  .overview {
    max-width: 56rem;
    font-family: var(--bd-font-family);
  }

  .overview__title {
    font-size: 2.5rem;
    font-weight: var(--bd-font-weight-light);
    margin: 0 0 0.5rem;
    color: var(--bd-color-text);
  }

  .overview__accent {
    color: var(--bd-color-primary-40);
    font-weight: var(--bd-font-weight-semi-bold);
  }

  .overview__subtitle {
    font-size: var(--bd-font-size-lg);
    color: var(--bd-color-text-secondary);
    margin: 0 0 2rem;
  }

  .overview__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .overview__card {
    background: var(--bd-color-white);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    padding: 1.25rem;
    box-shadow: var(--bd-shadow-raised);
  }

  .overview__card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .overview__card-title {
    font-size: var(--bd-font-size-lg);
    font-weight: var(--bd-font-weight-semi-bold);
    margin: 0;
    color: var(--bd-color-text);
  }

  .overview__card-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.375rem;
    border-radius: 0.75rem;
    background: var(--bd-color-secondary-20);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--bd-color-text-secondary);
  }

  .overview__card-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 1rem;
  }

  .overview__badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    font-size: 0.75rem;
    color: var(--bd-color-text-secondary);
  }

  .overview__card-footer {
    display: flex;
    justify-content: flex-end;
  }

  .overview__browse-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--bd-color-primary-40);
    border-radius: var(--bd-radius-normal);
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-primary-40);
    text-decoration: none;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .overview__browse-btn:hover {
    background: var(--bd-color-primary-10);
    text-decoration: none;
  }

  .overview__install {
    background: var(--bd-color-white);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    padding: 1.5rem;
    box-shadow: var(--bd-shadow-raised);
  }

  .overview__install-title {
    font-size: var(--bd-font-size-xl);
    font-weight: var(--bd-font-weight-regular);
    margin: 0 0 1rem;
    color: var(--bd-color-text);
  }

  .overview__usage-title {
    font-size: var(--bd-font-size-lg);
    font-weight: var(--bd-font-weight-semi-bold);
    margin: 1.5rem 0 0.75rem;
    color: var(--bd-color-text);
  }

  .overview__code {
    background: var(--bd-color-secondary-10);
    border-radius: var(--bd-radius-normal);
    padding: 1rem;
    overflow-x: auto;
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.5;
    font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
  }

  .overview__code code {
    color: var(--bd-color-text);
  }
</style>
