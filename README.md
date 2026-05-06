# BigDesign Svelte

**Unofficial** Svelte 5 port of BigCommerce's [BigDesign](https://github.com/bigcommerce/big-design) React component library.

> **Disclaimer:** This project is not affiliated with, endorsed by, or maintained by BigCommerce. BigDesign is a trademark of BigCommerce. This is an independent, community-driven port created to bring BigDesign's design language to the Svelte ecosystem.

## What is this?

BigDesign is BigCommerce's open-source design system for building apps that integrate with the BigCommerce admin panel. The original library is built in React. This project ports those components to Svelte 5, matching the same visual appearance, props API, and accessibility behavior using modern Svelte patterns (runes, snippets, scoped CSS).

### Original BigDesign Resources

- [BigDesign Documentation](https://developer.bigcommerce.com/big-design) - Official docs
- [BigDesign Storybook](https://bigcommerce.github.io/big-design/) - React component playground
- [BigDesign GitHub](https://github.com/bigcommerce/big-design) - React source code
- [BigDesign Theme](https://github.com/bigcommerce/big-design/tree/main/packages/big-design-theme) - Design tokens

## Installation

```bash
npm install @abeedoo/bigdesign-svelte
```

## Usage

```svelte
<script>
  import '@abeedoo/bigdesign-svelte/theme';
  import { Button, Input, Panel } from '@abeedoo/bigdesign-svelte';
</script>

<Panel header="My Panel">
  <Input label="Name" placeholder="Enter your name" />
  <Button variant="primary">Submit</Button>
</Panel>
```

Import the theme CSS once in your root layout to load the design tokens (colors, spacing, typography, etc.) as CSS custom properties.

## Components

### Layout
Box, Flex, FlexItem, Grid, GridItem, Panel

### Actions
Button, Link, Dropdown

### Forms
Form, FormGroup, Input, Textarea, Select, Checkbox, Radio, Switch, Fieldset

### Data Display
Typography (H0-H4, Text, Small), HR, Badge, Table, StatefulTable

### Feedback
Alert, InlineMessage

### Navigation
Tabs, OffsetPagination

### Overlays
Modal, Tooltip

### Utilities
GlobalStyles

## Key Differences from React BigDesign

| | React BigDesign | BigDesign Svelte |
|---|---|---|
| **Framework** | React 18+ | Svelte 5 |
| **Styling** | styled-components (CSS-in-JS) | Scoped CSS with `--bd-*` custom properties |
| **Slots** | `children` / render props | Svelte snippets |
| **State** | `useState` / `useRef` | `$state` / `$bindable` runes |
| **Types** | TypeScript interfaces | TypeScript interfaces |

## Development

```bash
npm install
npm run dev          # Dev server with interactive playground
npm run build        # Build the playground site
npm run package      # Build library to dist/
npm run check        # TypeScript check
```

The dev server runs an interactive playground site where you can browse and test all components with live demos.

## Playground Site

The project includes a standalone playground site for browsing components. It builds as a static SPA and can be deployed via Docker:

```bash
docker build -t bigdesign-svelte .
docker run -p 8080:80 bigdesign-svelte
```

## Publishing

```bash
npm run package
npm publish
```

## License

MIT

---

Built and maintained by [Abeedoo Labs](https://github.com/abeedoolabs). Not affiliated with BigCommerce.
