<script lang="ts">
  import '$lib/theme/tokens.css';
  import '$lib/theme/reset.css';
  import { page } from '$app/stores';

  let { children } = $props();

  let drawerOpen = $state(false);

  const nav = [
    { label: 'Overview', href: '/' },
    {
      label: 'Layout', href: '/layout',
      items: ['Box', 'Flex', 'Grid', 'Panel']
    },
    {
      label: 'Actions', href: '/actions',
      items: ['Button', 'Link', 'Dropdown']
    },
    {
      label: 'Forms', href: '/forms',
      items: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'Fieldset', 'Form']
    },
    {
      label: 'Data Display', href: '/data-display',
      items: ['Typography', 'Badge', 'Table', 'StatefulTable']
    },
    {
      label: 'Feedback', href: '/feedback',
      items: ['Alert', 'InlineMessage']
    },
    {
      label: 'Navigation', href: '/navigation',
      items: ['Tabs', 'OffsetPagination']
    },
    {
      label: 'Overlays', href: '/overlays',
      items: ['Modal', 'Tooltip']
    }
  ];

  let expanded = $state<Record<string, boolean>>({});

  $effect(() => {
    for (const section of nav) {
      if (section.href && $page.url.pathname.startsWith(section.href) && section.href !== '/') {
        expanded[section.label] = true;
      }
    }
  });

  $effect(() => {
    if ($page.url.pathname) {
      drawerOpen = false;
    }
  });

  let search = $state('');

  let filteredNav = $derived.by(() => {
    if (!search.trim()) return nav;
    const q = search.toLowerCase();
    return nav
      .map(section => {
        if (!section.items) {
          return section.label.toLowerCase().includes(q) ? section : null;
        }
        const matchedItems = section.items.filter(item => item.toLowerCase().includes(q));
        if (matchedItems.length > 0) return { ...section, items: matchedItems };
        if (section.label.toLowerCase().includes(q)) return section;
        return null;
      })
      .filter(Boolean) as typeof nav;
  });

  $effect(() => {
    if (search.trim()) {
      for (const section of filteredNav) {
        if (section.items) expanded[section.label] = true;
      }
    }
  });

  function toggleSection(label: string) {
    expanded[label] = !expanded[label];
  }

  let activeHash = $state('');

  function isActive(href: string): boolean {
    return $page.url.pathname === href;
  }

  function isSubItemActive(sectionHref: string, item: string): boolean {
    const hash = `#${item.toLowerCase().replace(/\s+/g, '-')}`;
    return $page.url.pathname === sectionHref && activeHash === hash;
  }
</script>

{#snippet sidebarContent()}
  <a href="/" class="sidebar__brand">
    <svg viewBox="0 0 32 32" class="sidebar__logo">
      <rect width="32" height="32" rx="4" fill="var(--bd-color-primary-40)"/>
      <text x="16" y="23" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="white">B</text>
    </svg>
    <div>
      <div class="sidebar__brand-name">BigDesign</div>
      <div class="sidebar__brand-sub">Svelte Components</div>
    </div>
  </a>

  <div class="sidebar__search">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar__search-icon">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <input
      type="text"
      placeholder="Search components..."
      class="sidebar__search-input"
      bind:value={search}
    />
    {#if search}
      <button type="button" class="sidebar__search-clear" onclick={() => search = ''} aria-label="Clear search">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    {/if}
  </div>

  <nav class="sidebar__nav">
    {#each filteredNav as section}
      {#if !section.items}
        <a href={section.href} class="sidebar__link" class:sidebar__link--active={isActive(section.href)}>
          {section.label}
        </a>
      {:else}
        <div>
          <button
            type="button"
            class="sidebar__section-btn"
            class:sidebar__section-btn--active={isActive(section.href)}
            onclick={() => toggleSection(section.label)}
          >
            <a href={section.href} class="sidebar__section-link" onclick={(e: MouseEvent) => e.stopPropagation()}>
              {section.label}
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="sidebar__section-chevron" class:sidebar__section-chevron--open={expanded[section.label]}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {#if expanded[section.label]}
            <div class="sidebar__sub-items">
              {#each section.items as item}
                <a
                  href="{section.href}#{item.toLowerCase().replace(/\s+/g, '-')}"
                  class="sidebar__sub-link"
                  class:sidebar__sub-link--active={isSubItemActive(section.href, item)}
                >
                  {item}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}
  </nav>

  <div class="sidebar__footer">
    Svelte 5 + CSS Custom Properties
  </div>
{/snippet}

<div class="app">
  <!-- Desktop sidebar -->
  <aside class="sidebar sidebar--desktop">
    {@render sidebarContent()}
  </aside>

  <!-- Mobile drawer -->
  {#if drawerOpen}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="drawer-backdrop" onclick={() => drawerOpen = false} onkeydown={(e) => { if (e.key === 'Escape') drawerOpen = false; }}></div>
    <aside class="sidebar sidebar--mobile">
      <button type="button" class="sidebar__close" onclick={() => drawerOpen = false} aria-label="Close menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      {@render sidebarContent()}
    </aside>
  {/if}

  <div class="main-area">
    <!-- Top bar -->
    <div class="topbar">
      <button type="button" class="topbar__hamburger" onclick={() => drawerOpen = true} aria-label="Open menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <a href="/" class="topbar__brand-mobile">
        <svg viewBox="0 0 32 32" class="topbar__logo">
          <rect width="32" height="32" rx="4" fill="var(--bd-color-primary-40)"/>
          <text x="16" y="23" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="white">B</text>
        </svg>
        <span class="topbar__brand-text">BigDesign Svelte</span>
      </a>
      <div class="topbar__spacer"></div>
      <a href="https://github.com/bigcommerce/big-design" target="_blank" rel="noopener" class="topbar__gh-link">
        React Source
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>

    <main class="content">
      {@render children()}
    </main>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    background: var(--bd-color-secondary-10);
  }

  .app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* Sidebar */
  .sidebar {
    width: 16rem;
    background: var(--bd-color-white);
    border-right: 1px solid var(--bd-color-border);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    flex-shrink: 0;
    font-family: var(--bd-font-family);
  }

  .sidebar--desktop {
    display: none;
  }

  @media (min-width: 1024px) {
    .sidebar--desktop {
      display: flex;
    }
  }

  .sidebar--mobile {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 50;
    width: 18rem;
    box-shadow: var(--bd-shadow-floating);
  }

  .sidebar__close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: transparent;
    color: var(--bd-color-text-secondary);
    cursor: pointer;
    border-radius: var(--bd-radius-normal);
  }

  .sidebar__close:hover {
    background: var(--bd-color-secondary-10);
  }

  .drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(49, 52, 64, 0.5);
  }

  @media (min-width: 1024px) {
    .drawer-backdrop {
      display: none;
    }
  }

  .sidebar__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    margin-bottom: 1.5rem;
  }

  .sidebar__logo {
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
  }

  .sidebar__brand-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--bd-color-primary-40);
    line-height: 1.2;
  }

  .sidebar__brand-sub {
    font-size: 0.75rem;
    color: var(--bd-color-text-secondary);
  }

  .sidebar__search {
    position: relative;
    margin-bottom: 0.75rem;
  }

  .sidebar__search-icon {
    position: absolute;
    left: 0.625rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.4;
  }

  .sidebar__search-input {
    width: 100%;
    padding: 0.375rem 0.5rem 0.375rem 2rem;
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    outline: none;
    background: var(--bd-color-white);
    box-sizing: border-box;
  }

  .sidebar__search-input:focus {
    border-color: var(--bd-color-primary-40);
    box-shadow: 0 0 0 3px var(--bd-color-primary-20);
  }

  .sidebar__search-clear {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border: none;
    background: transparent;
    color: var(--bd-color-text-secondary);
    cursor: pointer;
    border-radius: var(--bd-radius-circle);
  }

  .sidebar__search-clear:hover {
    background: var(--bd-color-secondary-20);
  }

  .sidebar__nav {
    flex: 1;
    overflow-y: auto;
  }

  .sidebar__link {
    display: block;
    padding: 0.5rem 0.75rem;
    border-radius: var(--bd-radius-normal);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    text-decoration: none;
    transition: background-color 150ms ease;
  }

  .sidebar__link:hover {
    background: var(--bd-color-secondary-10);
    text-decoration: none;
  }

  .sidebar__link--active {
    background: var(--bd-color-primary-40);
    color: var(--bd-color-white);
    font-weight: 600;
  }

  .sidebar__section-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: var(--bd-radius-normal);
    background: transparent;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    cursor: pointer;
    transition: background-color 150ms ease;
  }

  .sidebar__section-btn:hover {
    background: var(--bd-color-secondary-10);
  }

  .sidebar__section-btn--active {
    background: var(--bd-color-primary-40);
    color: var(--bd-color-white);
    font-weight: 600;
  }

  .sidebar__section-link {
    flex: 1;
    text-align: left;
    color: inherit;
    text-decoration: none;
  }

  .sidebar__section-chevron {
    opacity: 0.4;
    transition: transform 150ms ease;
  }

  .sidebar__section-chevron--open {
    transform: rotate(180deg);
  }

  .sidebar__sub-items {
    margin-left: 0.75rem;
    padding-left: 0.75rem;
    border-left: 1px solid var(--bd-color-border);
    margin-top: 0.125rem;
  }

  .sidebar__sub-link {
    display: block;
    padding: 0.25rem 0.5rem;
    border-radius: var(--bd-radius-normal);
    font-size: 0.75rem;
    color: var(--bd-color-text-secondary);
    text-decoration: none;
    transition: all 150ms ease;
  }

  .sidebar__sub-link:hover {
    color: var(--bd-color-text);
    background: var(--bd-color-secondary-10);
    text-decoration: none;
  }

  .sidebar__sub-link--active {
    color: var(--bd-color-primary-40);
    font-weight: 600;
    background: var(--bd-color-primary-10);
  }

  .sidebar__footer {
    font-size: 0.75rem;
    color: var(--bd-color-text-disabled);
    margin-top: 1rem;
  }

  /* Main area */
  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .topbar {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--bd-color-border);
    background: var(--bd-color-white);
    gap: 0.75rem;
    flex-shrink: 0;
    font-family: var(--bd-font-family);
  }

  .topbar__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: transparent;
    color: var(--bd-color-text-secondary);
    cursor: pointer;
    border-radius: var(--bd-radius-normal);
  }

  .topbar__hamburger:hover {
    background: var(--bd-color-secondary-10);
  }

  @media (min-width: 1024px) {
    .topbar__hamburger {
      display: none;
    }
  }

  .topbar__brand-mobile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  @media (min-width: 1024px) {
    .topbar__brand-mobile {
      display: none;
    }
  }

  .topbar__logo {
    width: 1.75rem;
    height: 1.75rem;
  }

  .topbar__brand-text {
    font-size: var(--bd-font-size-sm);
    font-weight: 600;
    color: var(--bd-color-primary-40);
  }

  .topbar__spacer {
    flex: 1;
  }

  .topbar__gh-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    text-decoration: none;
  }

  .topbar__gh-link:hover {
    color: var(--bd-color-primary-40);
    text-decoration: none;
  }

  .content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }

  @media (min-width: 1024px) {
    .content {
      padding: 2rem;
    }
  }
</style>
