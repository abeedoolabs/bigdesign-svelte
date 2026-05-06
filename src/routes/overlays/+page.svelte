<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Modal, Tooltip, Popover, Button } from '$lib/index.js';

  let modalOpen = $state(false);
</script>

<h1 class="page-title">Overlays</h1>
<p class="page-description">Modals and tooltips for additional content and context.</p>

<Demo
  title="Modal"
  description="Dialog overlay with header, body, actions, and close behavior."
  code={`<Button onclick={() => modalOpen = true}>Open Modal</Button>

<Modal
  bind:isOpen={modalOpen}
  header="Confirm Action"
  onClose={() => modalOpen = false}
>
  <p>Are you sure you want to proceed?</p>

  {#snippet actions()}
    <Button variant="secondary" onclick={() => modalOpen = false}>Cancel</Button>
    <Button onclick={() => modalOpen = false}>Confirm</Button>
  {/snippet}
</Modal>`}
  props={[
    { name: 'isOpen', type: 'boolean', description: 'Bindable open state' },
    { name: 'header', type: 'string', description: 'Modal title' },
    { name: 'closeOnClickOutside', type: 'boolean', default: 'true', description: 'Close on backdrop click' },
    { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Close on Escape key' },
    { name: 'onClose', type: '() => void', description: 'Close callback' },
    { name: 'actions', type: 'Snippet', description: 'Footer action buttons' }
  ]}
>
  {#snippet modalActions()}
    <Button variant="secondary" mobileWidth="auto" onclick={() => modalOpen = false}>Cancel</Button>
    <Button mobileWidth="auto" onclick={() => modalOpen = false}>Confirm</Button>
  {/snippet}

  <Button mobileWidth="auto" onclick={() => modalOpen = true}>Open Modal</Button>

  <Modal
    bind:isOpen={modalOpen}
    header="Confirm Action"
    onClose={() => modalOpen = false}
    actions={modalActions}
  >
    <p style="margin:0">Are you sure you want to proceed with this action? This cannot be undone.</p>
  </Modal>
</Demo>

<Demo
  title="Tooltip"
  description="Hover/focus tooltip with configurable placement."
  code={`<Tooltip text="This is a tooltip" placement="top">
  <Button variant="secondary">Hover me</Button>
</Tooltip>`}
  props={[
    { name: 'text', type: 'string', description: 'Tooltip content (required)' },
    { name: 'placement', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Tooltip position' }
  ]}
>
  <div style="display:flex;gap:1rem;align-items:center;padding:2rem 0">
    <Tooltip text="Top tooltip" placement="top">
      <Button variant="secondary" mobileWidth="auto">Top</Button>
    </Tooltip>
    <Tooltip text="Right tooltip" placement="right">
      <Button variant="secondary" mobileWidth="auto">Right</Button>
    </Tooltip>
    <Tooltip text="Bottom tooltip" placement="bottom">
      <Button variant="secondary" mobileWidth="auto">Bottom</Button>
    </Tooltip>
    <Tooltip text="Left tooltip" placement="left">
      <Button variant="secondary" mobileWidth="auto">Left</Button>
    </Tooltip>
  </div>
</Demo>

<Demo
  title="Popover"
  description="Floating content panel triggered by a click, with configurable placement."
  code={`<Popover placement="bottom">
  {#snippet trigger()}
    <Button variant="secondary">Open Popover</Button>
  {/snippet}
  <p>Popover content here.</p>
</Popover>`}
  props={[
    { name: 'isOpen', type: 'boolean', description: 'Bindable open state' },
    { name: 'placement', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Popover position' },
    { name: 'onClose', type: '() => void', description: 'Close callback' },
    { name: 'trigger', type: 'Snippet', description: 'Trigger element (required)' }
  ]}
>
  {#snippet popTrigger()}
    <Button variant="secondary" mobileWidth="auto">Open Popover</Button>
  {/snippet}
  <Popover trigger={popTrigger} placement="bottom">
    <div style="font-family:var(--bd-font-family)">
      <p style="margin:0 0 0.5rem;font-weight:600">Popover Title</p>
      <p style="margin:0;font-size:0.875rem;color:var(--bd-color-text-secondary)">This is floating content that appears on click. Click outside or press Escape to dismiss.</p>
    </div>
  </Popover>
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
