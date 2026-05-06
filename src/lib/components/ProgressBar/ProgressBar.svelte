<script lang="ts">
  interface Props {
    percent?: number;
  }

  let { percent }: Props = $props();
</script>

<div
  class="bd-progress-bar"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={percent}
>
  <div
    class="bd-progress-bar__filler"
    class:bd-progress-bar__filler--indeterminate={percent == null}
    style:width={percent != null ? `${Math.min(100, Math.max(0, percent))}%` : undefined}
  ></div>
</div>

<style>
  .bd-progress-bar {
    width: 100%;
    height: 0.5rem;
    background-color: var(--bd-color-secondary-20);
    border-radius: var(--bd-radius-normal);
    overflow: hidden;
  }

  .bd-progress-bar__filler {
    height: 100%;
    background-color: var(--bd-color-primary-40);
    border-radius: var(--bd-radius-normal);
    transition: width 300ms ease;
  }

  .bd-progress-bar__filler--indeterminate {
    width: 30%;
    animation: bd-progress-indeterminate 1.5s ease-in-out infinite;
  }

  @keyframes bd-progress-indeterminate {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
</style>
