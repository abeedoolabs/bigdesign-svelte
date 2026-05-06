<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Alert, InlineMessage, Message, StatusMessage, ProgressBar, ProgressCircle } from '$lib/index.js';
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

<Demo
  title="Message"
  description="Card-style message with left border accent, icon, and optional close."
  code={`<Message variant="success" header="Order placed">Your order #1234 has been confirmed.</Message>
<Message variant="error" header="Payment failed">Please update your payment method.</Message>`}
  props={[
    { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Message type' },
    { name: 'header', type: 'string', description: 'Bold header text' },
    { name: 'onClose', type: '() => void', description: 'Shows close button when provided' },
    { name: 'actions', type: 'Snippet', description: 'Action buttons slot' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <Message variant="success" header="Order placed">Your order #1234 has been confirmed.</Message>
    <Message variant="error" header="Payment failed">Please update your payment method.</Message>
    <Message variant="info" onClose={() => {}}>This message can be dismissed.</Message>
  </div>
</Demo>

<Demo
  title="StatusMessage"
  description="Compact inline status with colored icon."
  code={`<StatusMessage variant="success">Synced</StatusMessage>
<StatusMessage variant="error">Failed</StatusMessage>`}
  props={[
    { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Status type' }
  ]}
>
  <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center">
    <StatusMessage variant="success">Synced</StatusMessage>
    <StatusMessage variant="error">Failed</StatusMessage>
    <StatusMessage variant="warning">Pending review</StatusMessage>
    <StatusMessage variant="info">Processing</StatusMessage>
  </div>
</Demo>

<Demo
  title="ProgressBar"
  description="Horizontal progress indicator, determinate or indeterminate."
  code={`<ProgressBar percent={65} />
<ProgressBar /> <!-- indeterminate -->`}
  props={[
    { name: 'percent', type: 'number', description: 'Progress 0-100 (omit for indeterminate)' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
    <div>
      <span style="font-family:var(--bd-font-family);font-size:var(--bd-font-size-sm);color:var(--bd-color-text-secondary)">65% complete</span>
      <ProgressBar percent={65} />
    </div>
    <div>
      <span style="font-family:var(--bd-font-family);font-size:var(--bd-font-size-sm);color:var(--bd-color-text-secondary)">Indeterminate</span>
      <ProgressBar />
    </div>
  </div>
</Demo>

<Demo
  title="ProgressCircle"
  description="Circular progress indicator with size variants and error/complete states."
  code={`<ProgressCircle percent={75} />
<ProgressCircle /> <!-- spinning -->
<ProgressCircle percent={100} /> <!-- success -->
<ProgressCircle error /> <!-- error -->`}
  props={[
    { name: 'percent', type: 'number', description: 'Progress 0-100 (omit for indeterminate spinner)' },
    { name: 'size', type: "'xxSmall' | 'xSmall' | 'small' | 'medium' | 'large'", default: "'medium'", description: 'Circle size' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Show error icon' }
  ]}
>
  <div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center">
    <ProgressCircle size="small" />
    <ProgressCircle percent={35} />
    <ProgressCircle percent={75} size="large" />
    <ProgressCircle percent={100} />
    <ProgressCircle error />
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
