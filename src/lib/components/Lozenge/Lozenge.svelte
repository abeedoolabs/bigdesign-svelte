<script lang="ts">
  interface Props {
    variant?: 'danger' | 'secondary' | 'success' | 'warning' | 'primary';
    label: string;
  }

  let {
    variant = 'secondary',
    label,
  }: Props = $props();
</script>

<span class="bd-lozenge bd-lozenge--{variant}">{label}</span>

<style>
  .bd-lozenge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--bd-spacing-xs);
    border-radius: 1rem;
    font-family: var(--bd-font-family);
    font-size: 0.6875rem;
    font-weight: var(--bd-font-weight-semi-bold);
    line-height: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .bd-lozenge--secondary {
    background-color: var(--bd-color-secondary-20);
    color: var(--bd-color-secondary-60);
  }

  .bd-lozenge--primary {
    background-color: var(--bd-color-primary-10);
    color: var(--bd-color-primary-60);
  }

  .bd-lozenge--success {
    background-color: var(--bd-color-success-10);
    color: var(--bd-color-success-60);
  }

  .bd-lozenge--warning {
    background-color: var(--bd-color-warning-10);
    color: var(--bd-color-warning-70);
  }

  .bd-lozenge--danger {
    background-color: var(--bd-color-danger-10);
    color: var(--bd-color-danger-60);
  }
</style>
