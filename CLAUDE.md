# BigDesign Svelte — Claude Code Instructions

**Read this at the start of EVERY session.**

---

## What Is This Project

A **Svelte 5 port of BigCommerce's [BigDesign](https://github.com/bigcommerce/big-design) React component library**. The goal is pixel-accurate components that look native inside BigCommerce admin panels, usable in any SvelteKit app.

**Package:** `@abeedoo/bigdesign-svelte`
**Registry:** `gitlab.mini1.abeedoo.com` (Abeedoo npm registry)

### Who Uses This

- **Radish Care** (`/Projects/radish-care`) — embedded BC app panel for support chat
- **CommerceHub** (`/Projects/CommerceHub`) — BigCommerce product management app
- **Future Abeedoo BC integrations** — any app that needs native BC admin styling

---

## Reference Source

The React components live at:
```
https://github.com/bigcommerce/big-design/tree/main/packages/big-design/src/components
```

The theme/tokens live at:
```
https://github.com/bigcommerce/big-design/tree/main/packages/big-design-theme/src
```

When building a component, **always reference the React source** for:
- Props interface (map to Svelte `$props`)
- Visual appearance and behavior
- Variants, states, and edge cases
- Accessibility attributes

---

## Architecture

### Stack
- **Svelte 5** with runes (`$props`, `$state`, `$derived`, `$bindable`)
- **SvelteKit** in library mode (`svelte-package` for building)
- **CSS custom properties** for theming — NO runtime CSS-in-JS
- **TypeScript** throughout

### Component Pattern

Every component follows this structure:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    children: Snippet;
    // Match BigDesign's React props exactly
  }

  let { variant = 'primary', disabled = false, children }: Props = $props();
</script>

<element class="bd-componentname bd-componentname--{variant}" {disabled}>
  {@render children()}
</element>

<style>
  .bd-componentname {
    font-family: var(--bd-font-family);
    /* Use --bd-* CSS variables for all design tokens */
  }
</style>
```

### Key Rules

1. **Match BigDesign names exactly** — `Button`, `StatefulTable`, `OffsetPagination`, etc.
2. **Use `--bd-*` CSS variables** for all colors, spacing, typography, shadows, radii
3. **Scoped `<style>` blocks** — no global CSS in components
4. **BEM-like class names** — `.bd-button`, `.bd-button--primary`, `.bd-button__icon`
5. **Svelte 5 runes only** — `$props()`, `$state()`, `$derived()`, `$bindable()`, `$effect()`
6. **Snippets for slots** — use `Snippet` type, render with `{@render children()}`
7. **No external dependencies** — pure Svelte + CSS. No Tailwind, no styled-components
8. **Accessibility** — match BigDesign's ARIA attributes and keyboard handling

### File Structure

```
src/lib/
├── index.ts                    # Re-exports everything
├── theme/
│   ├── tokens.css              # :root CSS custom properties
│   ├── reset.css               # Normalize/reset
│   └── theme.ts                # Token values as JS constants
├── components/
│   ├── Button/
│   │   ├── Button.svelte       # Component
│   │   └── index.ts            # export { default as Button } from './Button.svelte'
│   ├── Input/
│   │   ├── Input.svelte
│   │   └── index.ts
│   └── .../
└── utils/                      # Shared helpers (classnames, etc.)
```

### CSS Variable Prefix

All design tokens use `--bd-` prefix:
- Colors: `--bd-color-primary`, `--bd-color-danger`, `--bd-color-text`
- Spacing: `--bd-spacing-xs`, `--bd-spacing-md`, `--bd-spacing-xl`
- Typography: `--bd-font-family`, `--bd-font-size-md`
- Borders: `--bd-radius-sm`, `--bd-color-border`
- Shadows: `--bd-shadow-raised`, `--bd-shadow-floating`
- Z-index: `--bd-z-modal`, `--bd-z-tooltip`

---

## Commands

```bash
npm run dev          # Start dev server with playground
npm run build        # Build app + package library
npm run package      # Build library only (to dist/)
npm run check        # TypeScript check
npm run preview      # Preview built app
```

---

## 53 Components (by Priority)

### P0 — Core Essentials (~20)
Box, Flex, Grid, Panel, Tabs, Button, Checkbox, Fieldset, Form, Input, Radio, Select, Switch, Textarea, Badge, StatefulTable, Table, Typography, Alert, InlineMessage, Dropdown, Modal, Tooltip, Link, OffsetPagination, GlobalStyles

### P1 — Enhanced UX (~18)
Collapse, PillTabs, Stepper, ButtonGroup, Counter, Datepicker, FileUploader, MultiSelect, Search, Toggle, Chip, List, Lozenge, AccordionPanel, Message, ProgressBar, ProgressCircle, StatusMessage, Popover, StatelessPagination

### P2 — Specialized (~15)
AnchorNav, Timepicker, TableNext, Tree, StatefulTree, Worksheet, FeatureSet

### Implementation Order
Build P0 first, then P1, then P2. Within each priority, start with layout primitives (Box, Flex, Grid), then forms, then data display, then overlays.

---

## Publishing

```bash
npm run package
npm publish
```

Published to the Abeedoo npm registry. Consumed in projects as:
```bash
npm install @abeedoo/bigdesign-svelte
```

---

## DO NOT

- Do not add Tailwind or any CSS framework
- Do not use `styled-components` or CSS-in-JS
- Do not invent new component names — match BigDesign exactly
- Do not add runtime dependencies (keep peerDependencies to just `svelte`)
- Do not skip accessibility attributes from the React source
