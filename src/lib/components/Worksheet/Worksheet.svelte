<script lang="ts" module>
  export interface WorksheetColumn<T> {
    hash: string;
    header: string;
    type?: 'text' | 'number' | 'select' | 'checkbox';
    options?: { value: string; content: string }[];
    width?: string;
    disabled?: boolean;
    validation?: (value: unknown) => boolean;
  }
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
  interface Props {
    columns: WorksheetColumn<T>[];
    items: T[];
    keyField?: string;
    onChange?: (items: T[]) => void;
    disabledRows?: number[];
  }

  let {
    columns,
    items,
    keyField = 'id',
    onChange,
    disabledRows = [],
  }: Props = $props();

  let editingCell = $state<{ row: number; col: string } | null>(null);

  function getKey(item: T, index: number): string {
    if (keyField in item) return String(item[keyField]);
    return String(index);
  }

  function isDisabled(rowIndex: number): boolean {
    return disabledRows.includes(rowIndex);
  }

  function startEdit(row: number, col: string) {
    if (isDisabled(row)) return;
    const colDef = columns.find(c => c.hash === col);
    if (colDef?.disabled) return;
    editingCell = { row, col };
  }

  function commitEdit(row: number, col: string, value: unknown) {
    const updated = [...items];
    updated[row] = { ...updated[row], [col]: value };
    editingCell = null;
    onChange?.(updated);
  }

  function handleKeydown(e: KeyboardEvent, row: number, col: string) {
    if (e.key === 'Escape') editingCell = null;
    if (e.key === 'Enter') {
      const val = (e.target as HTMLInputElement).value;
      const colDef = columns.find(c => c.hash === col);
      commitEdit(row, col, colDef?.type === 'number' ? Number(val) : val);
    }
  }
</script>

<div class="bd-worksheet-wrapper">
  <table class="bd-worksheet">
    <thead class="bd-worksheet__head">
      <tr>
        {#each columns as col}
          <th class="bd-worksheet__th" style:width={col.width}>{col.header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="bd-worksheet__body">
      {#each items as item, rowIdx (getKey(item, rowIdx))}
        <tr class="bd-worksheet__row" class:bd-worksheet__row--disabled={isDisabled(rowIdx)}>
          {#each columns as col}
            <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
            <td
              class="bd-worksheet__td"
              class:bd-worksheet__td--editing={editingCell?.row === rowIdx && editingCell?.col === col.hash}
              class:bd-worksheet__td--disabled={col.disabled || isDisabled(rowIdx)}
              onclick={() => startEdit(rowIdx, col.hash)}
            >
              {#if editingCell?.row === rowIdx && editingCell?.col === col.hash}
                {#if col.type === 'checkbox'}
                  <input
                    type="checkbox"
                    checked={!!item[col.hash]}
                    onchange={(e) => commitEdit(rowIdx, col.hash, (e.target as HTMLInputElement).checked)}
                  />
                {:else if col.type === 'select' && col.options}
                  <select
                    class="bd-worksheet__select"
                    value={String(item[col.hash] ?? '')}
                    onchange={(e) => commitEdit(rowIdx, col.hash, (e.target as HTMLSelectElement).value)}
                  >
                    {#each col.options as opt}
                      <option value={opt.value}>{opt.content}</option>
                    {/each}
                  </select>
                {:else}
                  <!-- svelte-ignore a11y_autofocus -->
                  <input
                    class="bd-worksheet__input"
                    type={col.type === 'number' ? 'number' : 'text'}
                    value={String(item[col.hash] ?? '')}
                    onkeydown={(e) => handleKeydown(e, rowIdx, col.hash)}
                    onblur={(e) => { const val = (e.target as HTMLInputElement).value; commitEdit(rowIdx, col.hash, col.type === 'number' ? Number(val) : val); }}
                    autofocus
                  />
                {/if}
              {:else}
                <span class="bd-worksheet__cell-value">
                  {#if col.type === 'checkbox'}
                    <input type="checkbox" checked={!!item[col.hash]} disabled tabindex={-1} />
                  {:else}
                    {String(item[col.hash] ?? '')}
                  {/if}
                </span>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .bd-worksheet-wrapper {
    overflow-x: auto;
    font-family: var(--bd-font-family);
    border: 1px solid var(--bd-color-border);
    border-radius: var(--bd-radius-normal);
  }

  .bd-worksheet {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--bd-font-size-sm);
  }

  .bd-worksheet__head {
    background: var(--bd-color-secondary-10);
    border-bottom: 2px solid var(--bd-color-border);
  }

  .bd-worksheet__th {
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    text-align: left;
    font-weight: var(--bd-font-weight-semi-bold);
    color: var(--bd-color-text-secondary);
    white-space: nowrap;
    border-right: 1px solid var(--bd-color-border);
  }

  .bd-worksheet__th:last-child { border-right: none; }

  .bd-worksheet__row { border-bottom: 1px solid var(--bd-color-border); }
  .bd-worksheet__row:last-child { border-bottom: none; }
  .bd-worksheet__row--disabled { opacity: 0.5; }

  .bd-worksheet__td {
    padding: 0;
    border-right: 1px solid var(--bd-color-border);
    cursor: cell;
    height: 2.25rem;
    position: relative;
  }

  .bd-worksheet__td:last-child { border-right: none; }

  .bd-worksheet__td--editing {
    outline: 2px solid var(--bd-color-primary-40);
    outline-offset: -2px;
    padding: 0;
  }

  .bd-worksheet__td--disabled { cursor: default; background: var(--bd-color-secondary-10); }

  .bd-worksheet__cell-value {
    display: block;
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    min-height: 1.5rem;
    color: var(--bd-color-text);
  }

  .bd-worksheet__input,
  .bd-worksheet__select {
    width: 100%;
    height: 100%;
    padding: var(--bd-spacing-xs) var(--bd-spacing-sm);
    border: none;
    font-family: var(--bd-font-family);
    font-size: var(--bd-font-size-sm);
    color: var(--bd-color-text);
    outline: none;
    background: var(--bd-color-white);
    box-sizing: border-box;
  }
</style>
