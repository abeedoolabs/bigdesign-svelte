<script lang="ts" module>
  export interface Step {
    label: string;
    description?: string;
  }
</script>

<script lang="ts">
  interface Props {
    steps: Step[];
    currentStep: number;
  }

  let {
    steps,
    currentStep,
  }: Props = $props();
</script>

<div class="bd-stepper" role="list">
  {#each steps as step, i}
    <div class="bd-stepper__step" class:bd-stepper__step--active={i === currentStep} class:bd-stepper__step--completed={i < currentStep} role="listitem">
      <div class="bd-stepper__indicator">
        {#if i < currentStep}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        {:else}
          <span>{i + 1}</span>
        {/if}
      </div>
      <div class="bd-stepper__label">
        <span class="bd-stepper__label-text">{step.label}</span>
        {#if step.description}
          <span class="bd-stepper__description">{step.description}</span>
        {/if}
      </div>
      {#if i < steps.length - 1}
        <div class="bd-stepper__connector" class:bd-stepper__connector--completed={i < currentStep}></div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .bd-stepper {
    display: flex;
    align-items: flex-start;
    font-family: var(--bd-font-family);
  }

  .bd-stepper__step {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
  }

  .bd-stepper__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--bd-radius-circle);
    border: 2px solid var(--bd-color-secondary-30);
    background: var(--bd-color-white);
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text-secondary);
    flex-shrink: 0;
  }

  .bd-stepper__indicator svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  .bd-stepper__step--active .bd-stepper__indicator {
    border-color: var(--bd-color-primary-40);
    background: var(--bd-color-primary-40);
    color: var(--bd-color-white);
  }

  .bd-stepper__step--completed .bd-stepper__indicator {
    border-color: var(--bd-color-success-40);
    background: var(--bd-color-success-40);
    color: var(--bd-color-white);
  }

  .bd-stepper__label {
    display: flex;
    flex-direction: column;
    margin-left: var(--bd-spacing-xs);
    margin-right: var(--bd-spacing-md);
  }

  .bd-stepper__label-text {
    font-size: var(--bd-font-size-sm);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text-secondary);
    white-space: nowrap;
  }

  .bd-stepper__step--active .bd-stepper__label-text {
    color: var(--bd-color-text);
  }

  .bd-stepper__step--completed .bd-stepper__label-text {
    color: var(--bd-color-text);
  }

  .bd-stepper__description {
    font-size: 0.75rem;
    color: var(--bd-color-text-secondary);
  }

  .bd-stepper__connector {
    flex: 1;
    height: 2px;
    background: var(--bd-color-secondary-30);
    margin-right: var(--bd-spacing-md);
  }

  .bd-stepper__connector--completed {
    background: var(--bd-color-success-40);
  }
</style>
