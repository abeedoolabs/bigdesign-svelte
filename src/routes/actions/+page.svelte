<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Button, Link, Dropdown } from '$lib/index.js';
</script>

<h1 class="page-title">Actions</h1>
<p class="page-description">Buttons, links, and dropdowns for user interaction.</p>

<Demo
  title="Button"
  description="Primary, secondary, subtle, and utility variants with loading and icon support."
  code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="subtle">Subtle</Button>
<Button variant="utility">Utility</Button>

<!-- Destructive -->
<Button variant="primary" actionType="destructive">Delete</Button>

<!-- Loading -->
<Button isLoading>Saving...</Button>

<!-- Disabled -->
<Button disabled>Disabled</Button>`}
  props={[
    { name: 'variant', type: "'primary' | 'secondary' | 'subtle' | 'utility'", default: "'primary'", description: 'Visual style' },
    { name: 'actionType', type: "'normal' | 'destructive'", default: "'normal'", description: 'Action intent' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
    { name: 'iconLeft', type: 'Snippet', description: 'Icon before text' },
    { name: 'iconRight', type: 'Snippet', description: 'Icon after text' },
    { name: 'iconOnly', type: 'Snippet', description: 'Icon-only mode' },
    { name: 'mobileWidth', type: "'auto' | '100%'", default: "'100%'", description: 'Width on mobile' }
  ]}
>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
    <Button variant="primary" mobileWidth="auto">Primary</Button>
    <Button variant="secondary" mobileWidth="auto">Secondary</Button>
    <Button variant="subtle" mobileWidth="auto">Subtle</Button>
    <Button variant="utility" mobileWidth="auto">Utility</Button>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;margin-top:1rem">
    <Button variant="primary" actionType="destructive" mobileWidth="auto">Delete</Button>
    <Button variant="secondary" actionType="destructive" mobileWidth="auto">Remove</Button>
    <Button isLoading mobileWidth="auto">Saving...</Button>
    <Button disabled mobileWidth="auto">Disabled</Button>
  </div>
</Demo>

<Demo
  title="Link"
  description="Styled anchor with optional external link indicator."
  code={`<Link href="/layout">Internal link</Link>
<Link href="https://bigcommerce.com" external>External link</Link>`}
  props={[
    { name: 'href', type: 'string', description: 'Link URL' },
    { name: 'external', type: 'boolean', default: 'false', description: 'Opens in new tab with external icon' }
  ]}
>
  <div style="display:flex;gap:1.5rem;align-items:center">
    <Link href="/layout">Internal link</Link>
    <Link href="https://developer.bigcommerce.com" external>BigCommerce Docs</Link>
  </div>
</Demo>

<Demo
  title="Dropdown"
  description="Contextual menu triggered by any element."
  code={`<Dropdown
  items={[
    { content: 'Edit', value: 'edit' },
    { content: 'Duplicate', value: 'duplicate' },
    { content: 'Delete', value: 'delete', disabled: true }
  ]}
  onItemClick={(value) => console.log(value)}
>
  {#snippet trigger()}
    <Button variant="secondary">Actions</Button>
  {/snippet}
</Dropdown>`}
  props={[
    { name: 'items', type: 'DropdownItem[]', description: 'Flat list of items' },
    { name: 'groups', type: 'DropdownItemGroup[]', description: 'Grouped items with labels' },
    { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Menu position' },
    { name: 'onItemClick', type: '(value: string) => void', description: 'Click handler' },
    { name: 'trigger', type: 'Snippet', description: 'Trigger element (required)' }
  ]}
>
  {#snippet dropTrigger()}
    <Button variant="secondary" mobileWidth="auto">Actions Menu</Button>
  {/snippet}
  <Dropdown
    items={[
      { content: 'Edit', value: 'edit' },
      { content: 'Duplicate', value: 'duplicate' },
      { content: 'Delete', value: 'delete' }
    ]}
    trigger={dropTrigger}
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
