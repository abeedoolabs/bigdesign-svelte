<script lang="ts">
  interface Props {
    label?: string;
    description?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    error?: string | string[];
    onFilesChange?: (files: FileList) => void;
  }

  let {
    label,
    description,
    accept,
    multiple = false,
    disabled = false,
    error,
    onFilesChange,
  }: Props = $props();

  let inputId = `bd-file-${Math.random().toString(36).slice(2, 9)}`;
  let errors = $derived(error ? (Array.isArray(error) ? error : [error]) : []);
  let hasError = $derived(errors.length > 0);
  let isDragging = $state(false);
  let fileNames = $state<string[]>([]);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    fileNames = Array.from(files).map(f => f.name);
    onFilesChange?.(files);
  }

  function handleChange(e: Event) {
    handleFiles((e.target as HTMLInputElement).files);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (!disabled && e.dataTransfer?.files) handleFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!disabled) isDragging = true;
  }

  function handleDragLeave() {
    isDragging = false;
  }
</script>

<div class="bd-file-uploader-wrapper">
  {#if label}
    <label class="bd-file-uploader__label" for={inputId}>{label}</label>
  {/if}
  {#if description}
    <p class="bd-file-uploader__description">{description}</p>
  {/if}

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="bd-file-uploader"
    class:bd-file-uploader--dragging={isDragging}
    class:bd-file-uploader--error={hasError}
    class:bd-file-uploader--disabled={disabled}
    ondrop={handleDrop}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
  >
    <svg class="bd-file-uploader__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
    </svg>
    <p class="bd-file-uploader__text">
      {#if fileNames.length > 0}
        {fileNames.join(', ')}
      {:else}
        Drag files here or <span class="bd-file-uploader__browse">browse</span>
      {/if}
    </p>
    <input
      type="file"
      class="bd-file-uploader__input"
      id={inputId}
      {accept}
      {multiple}
      {disabled}
      onchange={handleChange}
    />
  </div>

  {#if hasError}
    <div class="bd-file-uploader__errors" role="alert">
      {#each errors as err}
        <p class="bd-file-uploader__error">{err}</p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bd-file-uploader-wrapper {
    font-family: var(--bd-font-family);
  }

  .bd-file-uploader__label {
    display: block;
    font-size: var(--bd-font-size-md);
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text);
    margin-bottom: var(--bd-spacing-xxs);
  }

  .bd-file-uploader__description {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0 0 var(--bd-spacing-xxs);
  }

  .bd-file-uploader {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--bd-spacing-xl);
    border: 2px dashed var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
    background: var(--bd-color-white);
    cursor: pointer;
    transition: border-color var(--bd-transition-duration) var(--bd-transition-timing),
                background-color var(--bd-transition-duration) var(--bd-transition-timing);
  }

  .bd-file-uploader:hover:not(.bd-file-uploader--disabled) {
    border-color: var(--bd-color-primary-40);
    background: var(--bd-color-primary-10);
  }

  .bd-file-uploader--dragging {
    border-color: var(--bd-color-primary-40);
    background: var(--bd-color-primary-10);
  }

  .bd-file-uploader--error {
    border-color: var(--bd-color-danger-40);
  }

  .bd-file-uploader--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .bd-file-uploader__icon {
    width: 2rem;
    height: 2rem;
    color: var(--bd-color-secondary-50);
    margin-bottom: var(--bd-spacing-xs);
  }

  .bd-file-uploader__text {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text-secondary);
    margin: 0;
    text-align: center;
  }

  .bd-file-uploader__browse {
    color: var(--bd-color-primary-40);
    text-decoration: underline;
  }

  .bd-file-uploader__input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .bd-file-uploader--disabled .bd-file-uploader__input {
    cursor: not-allowed;
  }

  .bd-file-uploader__errors {
    margin-top: var(--bd-spacing-xxs);
  }

  .bd-file-uploader__error {
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-danger-40);
    margin: 0;
  }
</style>
