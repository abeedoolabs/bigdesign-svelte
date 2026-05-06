<script lang="ts">
  interface Props {
    percent?: number;
    size?: 'xxSmall' | 'xSmall' | 'small' | 'medium' | 'large';
    error?: boolean;
  }

  let {
    percent,
    size = 'medium',
    error = false,
  }: Props = $props();

  const sizeMap: Record<string, number> = {
    xxSmall: 16,
    xSmall: 20,
    small: 24,
    medium: 36,
    large: 48,
  };

  let dim = $derived(sizeMap[size] || 36);
  let strokeWidth = $derived(size === 'xxSmall' || size === 'xSmall' ? 2 : 3);
  let radius = $derived((dim - strokeWidth) / 2);
  let circumference = $derived(2 * Math.PI * radius);
  let offset = $derived(percent != null ? circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference : 0);
  let isComplete = $derived(percent != null && percent >= 100 && !error);
</script>

<div
  class="bd-progress-circle"
  class:bd-progress-circle--indeterminate={percent == null && !error}
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={percent}
  style:width="{dim}px"
  style:height="{dim}px"
>
  {#if error}
    <svg viewBox="0 0 24 24" fill="var(--bd-color-danger-40)" width={dim * 0.6} height={dim * 0.6}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  {:else if isComplete}
    <svg viewBox="0 0 24 24" fill="var(--bd-color-success-40)" width={dim * 0.6} height={dim * 0.6}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  {:else}
    <svg width={dim} height={dim}>
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={radius}
        fill="none"
        stroke="var(--bd-color-secondary-20)"
        stroke-width={strokeWidth}
      />
      <circle
        class="bd-progress-circle__ring"
        cx={dim / 2}
        cy={dim / 2}
        r={radius}
        fill="none"
        stroke="var(--bd-color-primary-40)"
        stroke-width={strokeWidth}
        stroke-dasharray={circumference}
        stroke-dashoffset={percent != null ? offset : circumference * 0.75}
        stroke-linecap="round"
        transform="rotate(-90 {dim / 2} {dim / 2})"
      />
    </svg>
  {/if}
</div>

<style>
  .bd-progress-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .bd-progress-circle--indeterminate {
    animation: bd-spin 0.8s linear infinite;
  }

  .bd-progress-circle__ring {
    transition: stroke-dashoffset 300ms ease;
  }

  @keyframes bd-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
