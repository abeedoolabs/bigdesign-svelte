<script lang="ts" module>
  export interface Feature {
    label: string;
    description?: string;
    included: boolean;
  }
</script>

<script lang="ts">
  interface Props {
    features: Feature[];
    columns?: 1 | 2 | 3;
  }

  let {
    features,
    columns = 1,
  }: Props = $props();
</script>

<div class="bd-feature-set" style:grid-template-columns="repeat({columns}, 1fr)">
  {#each features as feature}
    <div class="bd-feature-set__item" class:bd-feature-set__item--excluded={!feature.included}>
      <svg class="bd-feature-set__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {#if feature.included}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        {:else}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
        {/if}
      </svg>
      <div class="bd-feature-set__content">
        <span class="bd-feature-set__label">{feature.label}</span>
        {#if feature.description}
          <span class="bd-feature-set__description">{feature.description}</span>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .bd-feature-set {
    display: grid;
    gap: var(--bd-spacing-sm);
    font-family: var(--bd-font-family);
  }

  .bd-feature-set__item {
    display: flex;
    align-items: flex-start;
    gap: var(--bd-spacing-xs);
  }

  .bd-feature-set__icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    margin-top: 0.0625rem;
    color: var(--bd-color-success-40);
  }

  .bd-feature-set__item--excluded .bd-feature-set__icon {
    color: var(--bd-color-secondary-40);
  }

  .bd-feature-set__content {
    display: flex;
    flex-direction: column;
  }

  .bd-feature-set__label {
    font-size: var(--bd-font-size-md);
    color: var(--bd-color-text);
  }

  .bd-feature-set__item--excluded .bd-feature-set__label {
    color: var(--bd-color-text-secondary);
  }

  .bd-feature-set__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
  }
</style>
