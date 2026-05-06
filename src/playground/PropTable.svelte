<script lang="ts">
  export interface PropDef {
    name: string;
    type: string;
    default?: string;
    description: string;
  }

  let {
    props = [] as PropDef[]
  }: {
    props: PropDef[];
  } = $props();
</script>

<div class="prop-table-wrapper">
  <table class="prop-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each props as prop}
        <tr>
          <td><code class="prop-table__name">{prop.name}</code></td>
          <td><code class="prop-table__type">{prop.type}</code></td>
          <td>
            {#if prop.default}
              <code class="prop-table__default">{prop.default}</code>
            {:else}
              <span class="prop-table__none">&mdash;</span>
            {/if}
          </td>
          <td>{prop.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .prop-table-wrapper {
    overflow-x: auto;
  }

  .prop-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--bd-font-size-sm);
  }

  .prop-table th {
    text-align: left;
    padding: 0.5rem 0.75rem;
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text-secondary);
    border-bottom: 2px solid var(--bd-color-border);
    white-space: nowrap;
  }

  .prop-table td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--bd-color-border);
    color: var(--bd-color-text);
  }

  .prop-table tr:last-child td {
    border-bottom: none;
  }

  code {
    font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
    font-size: 0.8125rem;
    padding: 0.125rem 0.25rem;
    border-radius: var(--bd-radius-normal);
  }

  .prop-table__name {
    color: var(--bd-color-primary-40);
    background: var(--bd-color-primary-10);
  }

  .prop-table__type {
    color: var(--bd-color-text-secondary);
    background: var(--bd-color-secondary-10);
  }

  .prop-table__default {
    color: var(--bd-color-text-secondary);
    background: var(--bd-color-secondary-10);
  }

  .prop-table__none {
    color: var(--bd-color-secondary-40);
  }
</style>
