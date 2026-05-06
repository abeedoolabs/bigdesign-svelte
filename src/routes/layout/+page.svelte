<script lang="ts">
  import Demo from '../../playground/Demo.svelte';
  import { Box, Flex, FlexItem, Grid, GridItem, Panel, Button, Collapse, AccordionPanel } from '$lib/index.js';
</script>

<h1 class="page-title">Layout</h1>
<p class="page-description">Primitives for structuring page layouts and content containers.</p>

<Demo
  title="Box"
  description="A generic container with style props for padding, margin, background, shadow, etc."
  code={`<Box padding="1rem" backgroundColor="var(--bd-color-primary-10)" borderRadius="var(--bd-radius-normal)">
  Content inside a Box
</Box>`}
  props={[
    { name: 'as', type: 'string', default: "'div'", description: 'HTML element to render' },
    { name: 'padding', type: 'string', description: 'CSS padding value' },
    { name: 'margin', type: 'string', description: 'CSS margin value' },
    { name: 'backgroundColor', type: 'string', description: 'CSS background-color' },
    { name: 'shadow', type: "'raised' | 'floating'", description: 'Box shadow preset' },
    { name: 'borderRadius', type: 'string', description: 'CSS border-radius' }
  ]}
>
  <Box padding="1rem" backgroundColor="var(--bd-color-primary-10)" borderRadius="var(--bd-radius-normal)">
    Content inside a Box
  </Box>
</Demo>

<Demo
  title="Flex"
  description="Flexbox container with direction, gap, alignment, and wrapping props."
  code={`<Flex gap="var(--bd-spacing-md)" alignItems="center">
  <FlexItem flexGrow={1}>
    <Box padding="0.75rem" backgroundColor="var(--bd-color-primary-20)">Item 1</Box>
  </FlexItem>
  <FlexItem flexGrow={2}>
    <Box padding="0.75rem" backgroundColor="var(--bd-color-primary-30)">Item 2 (grows 2x)</Box>
  </FlexItem>
  <FlexItem>
    <Box padding="0.75rem" backgroundColor="var(--bd-color-primary-20)">Item 3</Box>
  </FlexItem>
</Flex>`}
  props={[
    { name: 'direction', type: "'row' | 'column' | 'row-reverse' | 'column-reverse'", description: 'Flex direction' },
    { name: 'gap', type: 'string', description: 'Gap between items' },
    { name: 'alignItems', type: 'string', description: 'Align items on cross axis' },
    { name: 'justifyContent', type: 'string', description: 'Justify items on main axis' },
    { name: 'flexWrap', type: "'nowrap' | 'wrap' | 'wrap-reverse'", description: 'Wrap behavior' }
  ]}
>
  <Flex gap="var(--bd-spacing-md)" alignItems="center">
    <FlexItem flexGrow={1}>
      <Box padding="0.75rem" backgroundColor="var(--bd-color-primary-20)">Item 1</Box>
    </FlexItem>
    <FlexItem flexGrow={2}>
      <Box padding="0.75rem" backgroundColor="var(--bd-color-primary-30)">Item 2 (grows 2x)</Box>
    </FlexItem>
    <FlexItem>
      <Box padding="0.75rem" backgroundColor="var(--bd-color-primary-20)">Item 3</Box>
    </FlexItem>
  </Flex>
</Demo>

<Demo
  title="Grid"
  description="CSS Grid container with template columns, rows, gap, and area support."
  code={`<Grid columns="1fr 1fr 1fr" gap="var(--bd-spacing-md)">
  <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">1</Box></GridItem>
  <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">2</Box></GridItem>
  <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">3</Box></GridItem>
  <GridItem column="span 2"><Box padding="0.75rem" backgroundColor="var(--bd-color-success-20)">Spans 2</Box></GridItem>
  <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">5</Box></GridItem>
</Grid>`}
  props={[
    { name: 'columns', type: 'string', description: 'grid-template-columns value' },
    { name: 'rows', type: 'string', description: 'grid-template-rows value' },
    { name: 'gap', type: 'string', description: 'Grid gap' },
    { name: 'areas', type: 'string', description: 'grid-template-areas value' }
  ]}
>
  <Grid columns="1fr 1fr 1fr" gap="var(--bd-spacing-md)">
    <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">1</Box></GridItem>
    <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">2</Box></GridItem>
    <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">3</Box></GridItem>
    <GridItem column="span 2"><Box padding="0.75rem" backgroundColor="var(--bd-color-success-20)">Spans 2</Box></GridItem>
    <GridItem><Box padding="0.75rem" backgroundColor="var(--bd-color-success-10)">5</Box></GridItem>
  </Grid>
</Demo>

<Demo
  title="Panel"
  description="A card-like container with optional header, description, and action slot."
  code={`<Panel header="Panel Title" description="Optional description text">
  <p>Panel body content goes here.</p>
</Panel>`}
  props={[
    { name: 'header', type: 'string', description: 'Panel header text' },
    { name: 'description', type: 'string', description: 'Description below header' },
    { name: 'action', type: 'Snippet', description: 'Action slot (top-right)' }
  ]}
>
  <Panel header="Panel Title" description="Optional description text">
    <p style="margin:0">Panel body content goes here. Panels provide raised card styling with an optional header area.</p>
  </Panel>
</Demo>

<Demo
  title="Collapse"
  description="Expandable/collapsible content section with a trigger button."
  code={`<Collapse title="Show details">
  <p>Hidden content revealed on click.</p>
</Collapse>`}
  props={[
    { name: 'title', type: 'string', description: 'Trigger button text (required)' },
    { name: 'initiallyOpen', type: 'boolean', default: 'false', description: 'Start expanded' },
    { name: 'onCollapseChange', type: '(isOpen: boolean) => void', description: 'State change callback' }
  ]}
>
  <Collapse title="Show additional details">
    <p style="margin:0">This content is hidden by default and revealed when the trigger is clicked. Useful for progressive disclosure.</p>
  </Collapse>
  <Collapse title="Another section" initiallyOpen>
    <p style="margin:0">This section starts expanded because initiallyOpen is true.</p>
  </Collapse>
</Demo>

<Demo
  title="AccordionPanel"
  description="Multiple collapsible panels grouped together."
  code={`<AccordionPanel items={[
  { id: 'shipping', title: 'Shipping', content: 'Free shipping on orders over $50.' },
  { id: 'returns', title: 'Returns', content: '30-day return policy.' },
  { id: 'warranty', title: 'Warranty', content: '1-year manufacturer warranty.' }
]} />`}
  props={[
    { name: 'items', type: 'AccordionItem[]', description: 'Array of accordion items with id, title, content' },
    { name: 'children', type: 'Snippet<[AccordionItem]>', description: 'Custom render snippet per item' }
  ]}
>
  <AccordionPanel items={[
    { id: 'shipping', title: 'Shipping', content: 'Free standard shipping on all orders over $50. Express shipping available for $9.99.', defaultExpanded: true },
    { id: 'returns', title: 'Returns', content: '30-day hassle-free return policy. Items must be in original condition.' },
    { id: 'warranty', title: 'Warranty', content: '1-year manufacturer warranty covers defects in materials and workmanship.' }
  ]} />
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
