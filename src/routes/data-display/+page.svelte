<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Typography, HR, Badge } from '$lib/index.js';
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
