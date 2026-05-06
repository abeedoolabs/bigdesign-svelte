<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Input, Textarea, Select, Checkbox, Radio, Switch, Fieldset, Form, FormGroup } from '$lib/index.js';

  let inputVal = $state('');
  let textareaVal = $state('');
  let selectVal = $state('');
  let checkVal = $state(false);
  let radioVal = $state(false);
  let switchVal = $state(true);
</script>

<h1 class="page-title">Forms</h1>
<p class="page-description">Form controls for user input with labels, descriptions, and validation.</p>

<Demo
  title="Input"
  description="Text input with label, description, error states, and icon support."
  code={`<Input label="Email" placeholder="you@example.com" description="We'll never share your email." />
<Input label="Invalid" error="This field is required" />`}
  props={[
    { name: 'label', type: 'string', description: 'Input label' },
    { name: 'description', type: 'string', description: 'Helper text below label' },
    { name: 'error', type: 'string | string[]', description: 'Error message(s)' },
    { name: 'value', type: 'string', description: 'Bindable value' },
    { name: 'iconLeft', type: 'Snippet', description: 'Icon on left side' },
    { name: 'iconRight', type: 'Snippet', description: 'Icon on right side' }
  ]}
>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:36rem">
    <Input label="Email" placeholder="you@example.com" description="We'll never share your email." bind:value={inputVal} />
    <Input label="Invalid Field" error="This field is required" value="" />
  </div>
</Demo>

<Demo
  title="Textarea"
  description="Multi-line text input with label and error support."
  code={`<Textarea label="Description" placeholder="Enter a description..." rows={4} />`}
  props={[
    { name: 'label', type: 'string', description: 'Textarea label' },
    { name: 'description', type: 'string', description: 'Helper text' },
    { name: 'error', type: 'string | string[]', description: 'Error message(s)' },
    { name: 'value', type: 'string', description: 'Bindable value' },
    { name: 'resize', type: 'boolean', default: 'true', description: 'Allow resize' }
  ]}
>
  <div style="max-width:24rem">
    <Textarea label="Description" placeholder="Enter a description..." rows={4} bind:value={textareaVal} />
  </div>
</Demo>

<Demo
  title="Select"
  description="Single-select dropdown with option groups and filtering."
  code={`<Select
  label="Country"
  placeholder="Choose a country..."
  options={[
    { content: 'United States', value: 'us' },
    { content: 'Canada', value: 'ca' },
    { content: 'United Kingdom', value: 'uk' }
  ]}
  bind:value={selected}
/>`}
  props={[
    { name: 'options', type: 'SelectOption[] | SelectOptionGroup[]', description: 'Options to display' },
    { name: 'value', type: 'T', description: 'Bindable selected value' },
    { name: 'label', type: 'string', description: 'Select label' },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text' },
    { name: 'filterable', type: 'boolean', default: 'false', description: 'Enable type-to-filter' },
    { name: 'onOptionChange', type: '(value, option) => void', description: 'Selection handler' }
  ]}
>
  <div style="max-width:18rem">
    <Select
      label="Country"
      placeholder="Choose a country..."
      options={[
        { content: 'United States', value: 'us' },
        { content: 'Canada', value: 'ca' },
        { content: 'United Kingdom', value: 'uk' },
        { content: 'Australia', value: 'au' }
      ]}
      bind:value={selectVal}
    />
  </div>
</Demo>

<Demo
  title="Checkbox"
  description="Checkbox with label, description, and indeterminate state."
  code={`<Checkbox label="Accept terms and conditions" bind:checked={accepted} />
<Checkbox label="Indeterminate" indeterminate />`}
  props={[
    { name: 'label', type: 'string', description: 'Checkbox label (required)' },
    { name: 'checked', type: 'boolean', description: 'Bindable checked state' },
    { name: 'description', type: 'string', description: 'Helper text' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show indeterminate state' },
    { name: 'error', type: 'string', description: 'Error message' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <Checkbox label="Accept terms and conditions" bind:checked={checkVal} />
    <Checkbox label="With description" description="This option has a helper description below it." checked={true} />
    <Checkbox label="Disabled" disabled checked={true} />
  </div>
</Demo>

<Demo
  title="Radio"
  description="Radio button with label and description."
  code={`<Fieldset legend="Shipping Method">
  <Radio name="shipping" label="Standard" value="standard" />
  <Radio name="shipping" label="Express" value="express" />
</Fieldset>`}
  props={[
    { name: 'label', type: 'string', description: 'Radio label (required)' },
    { name: 'checked', type: 'boolean', description: 'Bindable checked state' },
    { name: 'name', type: 'string', description: 'Radio group name' },
    { name: 'value', type: 'string', description: 'Radio value' },
    { name: 'description', type: 'string', description: 'Helper text' }
  ]}
>
  <Fieldset legend="Shipping Method">
    <Radio name="demo-shipping" label="Standard (5-7 days)" value="standard" checked={true} />
    <Radio name="demo-shipping" label="Express (2-3 days)" value="express" />
    <Radio name="demo-shipping" label="Overnight" value="overnight" disabled />
  </Fieldset>
</Demo>

<Demo
  title="Switch"
  description="Toggle switch with label."
  code={`<Switch label="Enable notifications" bind:checked={enabled} />`}
  props={[
    { name: 'label', type: 'string', description: 'Switch label' },
    { name: 'checked', type: 'boolean', description: 'Bindable on/off state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:1rem">
    <Switch label="Enable notifications" bind:checked={switchVal} />
    <Switch label="Disabled switch" disabled />
  </div>
</Demo>

<Demo
  title="Fieldset"
  description="Groups related form fields with a legend."
  code={`<Fieldset legend="Contact Info" description="Your contact details">
  <Input label="Name" />
  <Input label="Email" />
</Fieldset>`}
  props={[
    { name: 'legend', type: 'string', description: 'Fieldset legend text' },
    { name: 'description', type: 'string', description: 'Description text' }
  ]}
>
  <Fieldset legend="Contact Info" description="How should we reach you?">
    <Input label="Name" placeholder="Jane Doe" />
    <Input label="Email" placeholder="jane@example.com" />
  </Fieldset>
</Demo>

<Demo
  title="Form"
  description="Form wrapper with optional full-width mode."
  code={`<Form fullWidth>
  <FormGroup>
    <Input label="First Name" />
  </FormGroup>
  <FormGroup>
    <Input label="Last Name" />
  </FormGroup>
</Form>`}
  props={[
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Make all inputs full width' }
  ]}
>
  <Form>
    <FormGroup>
      <Input label="First Name" placeholder="Jane" />
    </FormGroup>
    <FormGroup>
      <Input label="Last Name" placeholder="Doe" />
    </FormGroup>
  </Form>
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
