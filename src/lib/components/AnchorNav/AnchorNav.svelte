<script lang="ts" module>
  export interface AnchorNavItem {
    href: string;
    label: string;
  }
</script>

<script lang="ts">
  interface Props {
    items: AnchorNavItem[];
    activeHref?: string;
  }

  let {
    items,
    activeHref = $bindable(''),
  }: Props = $props();

  function handleClick(href: string) {
    activeHref = href;
  }
</script>

<nav class="bd-anchor-nav" aria-label="Page navigation">
  <ul class="bd-anchor-nav__list">
    {#each items as item}
      <li class="bd-anchor-nav__item">
        <a
          href={item.href}
          class="bd-anchor-nav__link"
          class:bd-anchor-nav__link--active={activeHref === item.href}
          onclick={() => handleClick(item.href)}
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .bd-anchor-nav {
    font-family: var(--bd-font-family);
  }

  .bd-anchor-nav__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-left: 2px solid var(--bd-color-border);
  }

  .bd-anchor-nav__item {
    margin: 0;
  }

  .bd-anchor-nav__link {
    display: block;
    padding: var(--bd-spacing-xs) var(--bd-spacing-md);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    text-decoration: none;
    border-left: 2px solid transparent;
    margin-left: -2px;
    transition: all var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-anchor-nav__link:hover {
    color: var(--bd-color-primary-40);
    text-decoration: none;
  }

  .bd-anchor-nav__link--active {
    color: var(--bd-color-primary-40);
    font-weight: var(--bd-font-weight-semi-bold);
    border-left-color: var(--bd-color-primary-40);
  }
</style>
