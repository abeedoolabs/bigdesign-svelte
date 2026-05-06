<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Alert, InlineMessage } from '$lib/index.js';
</script>

<h1 class="page-title">Feedback</h1>
<p class="page-description">Alerts and messages for communicating status to users.</p>

<Demo
  title="Alert"
  description="Prominent alert banners with icon, header, and optional close/actions."
  code={`<Alert variant="success" header="Success!">Your changes have been saved.</Alert>
<Alert variant="error" header="Error">Something went wrong.</Alert>
<Alert variant="warning">Check your input before continuing.</Alert>
<Alert variant="info" onClose={() => {}}>Informational message with close.</Alert>`}
  props={[
    { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Alert type' },
    { name: 'header', type: 'string', description: 'Bold header text' },
    { name: 'onClose', type: '() => void', description: 'Shows close button when provided' },
    { name: 'actions', type: 'Snippet', description: 'Action buttons slot' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <Alert variant="success" header="Success!">Your changes have been saved successfully.</Alert>
    <Alert variant="error" header="Error">Something went wrong. Please try again.</Alert>
    <Alert variant="warning">Please review your input before continuing.</Alert>
    <Alert variant="info" onClose={() => {}}>This is an informational message that can be dismissed.</Alert>
  </div>
</Demo>

<Demo
  title="InlineMessage"
  description="Compact inline status messages with icon."
  code={`<InlineMessage variant="success">Changes saved.</InlineMessage>
<InlineMessage variant="error">Invalid email address.</InlineMessage>
<InlineMessage variant="warning">Low stock warning.</InlineMessage>
<InlineMessage variant="info">3 items selected.</InlineMessage>`}
  props={[
    { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Message type' },
    { name: 'actions', type: 'Snippet', description: 'Action slot' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <InlineMessage variant="success">Changes saved successfully.</InlineMessage>
    <InlineMessage variant="error">Invalid email address.</InlineMessage>
    <InlineMessage variant="warning">Low stock warning.</InlineMessage>
    <InlineMessage variant="info">3 items selected.</InlineMessage>
  </div>
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
