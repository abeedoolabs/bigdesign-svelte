<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Input, Textarea, Select, MultiSelect, Checkbox, Radio, Switch, Toggle, Counter, Search, Datepicker, FileUploader, Fieldset, Form, FormGroup } from '$lib/index.js';

  let inputVal = $state('');
  let textareaVal = $state('');
  let selectVal = $state('');
  let checkVal = $state(false);
  let shippingMethod = $state('standard');
  let multiSelectVal = $state<string[]>([]);
  let toggleVal = $state(false);
  let counterVal = $state(5);
  let searchVal = $state('');
  let dateVal = $state('');
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
  <Radio name="shipping" label="Standard" value="standard" bind:group={selected} />
  <Radio name="shipping" label="Express" value="express" bind:group={selected} />
</Fieldset>`}
  props={[
    { name: 'label', type: 'string', description: 'Radio label (required)' },
    { name: 'group', type: 'string', description: 'Bindable group value (use bind:group)' },
    { name: 'name', type: 'string', description: 'Radio group name' },
    { name: 'value', type: 'string', description: 'Radio value' },
    { name: 'description', type: 'string', description: 'Helper text' }
  ]}
>
  <Fieldset legend="Shipping Method">
    <Radio name="demo-shipping" label="Standard (5-7 days)" value="standard" bind:group={shippingMethod} />
    <Radio name="demo-shipping" label="Express (2-3 days)" value="express" bind:group={shippingMethod} />
    <Radio name="demo-shipping" label="Overnight" value="overnight" bind:group={shippingMethod} disabled />
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

<Demo
  title="MultiSelect"
  description="Multi-select dropdown with chips, filtering, and select-all."
  code={`<MultiSelect
  label="Tags"
  options={[
    { content: 'Featured', value: 'featured' },
    { content: 'Sale', value: 'sale' },
    { content: 'New', value: 'new' }
  ]}
  bind:value={tags}
  selectAll
/>`}
  props={[
    { name: 'options', type: 'MultiSelectOption[]', description: 'Options to display' },
    { name: 'value', type: 'T[]', description: 'Bindable array of selected values' },
    { name: 'filterable', type: 'boolean', default: 'true', description: 'Enable type-to-filter' },
    { name: 'selectAll', type: 'boolean', default: 'false', description: 'Show select all checkbox' },
    { name: 'onOptionsChange', type: '(values: T[]) => void', description: 'Selection change handler' }
  ]}
>
  <div style="max-width:20rem">
    <MultiSelect
      label="Product Tags"
      placeholder="Select tags..."
      options={[
        { content: 'Featured', value: 'featured' },
        { content: 'Sale', value: 'sale' },
        { content: 'New Arrival', value: 'new' },
        { content: 'Best Seller', value: 'best' },
        { content: 'Clearance', value: 'clearance' }
      ]}
      bind:value={multiSelectVal}
      selectAll
    />
  </div>
</Demo>

<Demo
  title="Toggle"
  description="A larger toggle switch, distinct from the compact Switch."
  code={`<Toggle label="Dark mode" bind:checked={darkMode} />`}
  props={[
    { name: 'label', type: 'string', description: 'Toggle label' },
    { name: 'checked', type: 'boolean', description: 'Bindable on/off state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the toggle' }
  ]}
>
  <div style="display:flex;flex-direction:column;gap:1rem">
    <Toggle label="Enable dark mode" bind:checked={toggleVal} />
    <Toggle label="Disabled toggle" disabled />
  </div>
</Demo>

<Demo
  title="Counter"
  description="Numeric stepper with increment/decrement buttons."
  code={`<Counter label="Quantity" value={5} min={0} max={100} onCountChange={(n) => qty = n} />`}
  props={[
    { name: 'value', type: 'number', description: 'Current count (required)' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement amount' },
    { name: 'min', type: 'number', description: 'Minimum value' },
    { name: 'max', type: 'number', description: 'Maximum value' },
    { name: 'onCountChange', type: '(count: number) => void', description: 'Change handler (required)' }
  ]}
>
  <Counter label="Quantity" value={counterVal} min={0} max={20} onCountChange={(n) => counterVal = n} />
</Demo>

<Demo
  title="Search"
  description="Search input with icon, clear button, and Enter/Escape handling."
  code={`<Search bind:value={query} onSearch={(q) => console.log(q)} />`}
  props={[
    { name: 'value', type: 'string', description: 'Bindable search text' },
    { name: 'label', type: 'string', description: 'Label above input' },
    { name: 'onSearch', type: '(value: string) => void', description: 'Fired on Enter' },
    { name: 'onClear', type: '() => void', description: 'Fired on clear/Escape' }
  ]}
>
  <div style="max-width:20rem">
    <Search bind:value={searchVal} placeholder="Search products..." />
  </div>
</Demo>

<Demo
  title="Datepicker"
  description="Native date input with BigDesign styling."
  code={`<Datepicker label="Start Date" bind:value={date} />`}
  props={[
    { name: 'value', type: 'string', description: 'Bindable date string (YYYY-MM-DD)' },
    { name: 'label', type: 'string', description: 'Input label' },
    { name: 'min', type: 'string', description: 'Minimum date' },
    { name: 'max', type: 'string', description: 'Maximum date' },
    { name: 'onDateChange', type: '(date: string) => void', description: 'Change handler' }
  ]}
>
  <div style="max-width:16rem">
    <Datepicker label="Start Date" bind:value={dateVal} />
  </div>
</Demo>

<Demo
  title="FileUploader"
  description="Drag-and-drop file upload zone."
  code={`<FileUploader label="Attachments" accept="image/*" multiple onFilesChange={(files) => console.log(files)} />`}
  props={[
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'accept', type: 'string', description: 'Accepted file types' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple files' },
    { name: 'onFilesChange', type: '(files: FileList) => void', description: 'File selection handler' }
  ]}
>
  <div style="max-width:24rem">
    <FileUploader label="Product Images" description="Upload PNG or JPG files" accept="image/*" multiple />
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
