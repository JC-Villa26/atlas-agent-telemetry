import { useId, type Ref } from 'react'
import type { ActivityOutcome } from '../../data/ledger'
import type { LedgerFilters, LedgerSort } from '../../lib/ledger'
import { Button } from '../ui/Button'
import { FilterChip } from '../ui/FilterChip'
import { Icon } from '../ui/Icon'
import { SearchField } from '../ui/SearchField'
import { SelectField } from '../ui/SelectField'

const OUTCOME_OPTIONS: Array<{ value: ActivityOutcome | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'failed', label: 'Failed' },
  { value: 'running', label: 'Running' },
  { value: 'cancelled', label: 'Cancelled' },
]

export interface LedgerToolbarProps {
  filters: LedgerFilters
  onFiltersChange: (next: LedgerFilters) => void
  sort: LedgerSort
  onSortChange: (next: LedgerSort) => void
  agents: Array<{ id: string; name: string }>
  hasActiveControls: boolean
  onClear: () => void
  searchRef: Ref<HTMLInputElement>
  /** Narrow layout: search + a "Filters" disclosure instead of every control at once. */
  compact: boolean
  filtersOpen: boolean
  onToggleFilters: () => void
}

/** Figma: 05 — ActivityLedgerToolbar (Desktop) and the compact mobile disclosure from 06. */
export function LedgerToolbar({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  agents,
  hasActiveControls,
  onClear,
  searchRef,
  compact,
  filtersOpen,
  onToggleFilters,
}: LedgerToolbarProps) {
  const outcomeLabelId = useId()
  const panelId = useId()
  const activeCount = (filters.outcome !== 'all' ? 1 : 0) + (filters.agentId !== 'all' ? 1 : 0) + (sort !== 'newest' ? 1 : 0)

  const search = (
    <SearchField
      ref={searchRef}
      label="Search"
      value={filters.query}
      onValueChange={(query) => onFiltersChange({ ...filters, query })}
      onClear={() => {
        if (searchRef && typeof searchRef === 'object') searchRef.current?.focus()
      }}
      aria-label="Search activity ledger by agent, run ID or event"
      placeholder={compact ? 'Agent, run ID or event' : 'Agent ID, run ID or event'}
      className={compact ? undefined : 'flex-1'}
    />
  )

  const agentSelect = (
    <SelectField
      label="Agent"
      value={filters.agentId}
      onValueChange={(agentId) => onFiltersChange({ ...filters, agentId })}
      className={compact ? undefined : 'w-[200px] shrink-0'}
    >
      <option value="all">All agents</option>
      {agents.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      ))}
    </SelectField>
  )

  const sortSelect = (
    <SelectField
      label="Sort by"
      value={sort}
      onValueChange={(v) => onSortChange(v as LedgerSort)}
      className={compact ? undefined : 'w-[200px] shrink-0'}
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
      <option value="duration">Duration (longest)</option>
    </SelectField>
  )

  const chips = (
    <div role="group" aria-labelledby={outcomeLabelId} className="flex flex-wrap items-center gap-2">
      <span id={outcomeLabelId} className="text-xs font-semibold text-atlas-text">
        Outcome
      </span>
      {OUTCOME_OPTIONS.map((o) => (
        <FilterChip
          key={o.value}
          selected={filters.outcome === o.value}
          onClick={() => onFiltersChange({ ...filters, outcome: o.value })}
        >
          {o.label}
        </FilterChip>
      ))}
    </div>
  )

  const clear = (
    <Button variant="ghost" size="sm" disabled={!hasActiveControls} onClick={onClear}>
      Clear filters
    </Button>
  )

  if (compact) {
    return (
      <div className="flex flex-col gap-3 px-5 py-4">
        {search}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            icon={<Icon name="filters" />}
            aria-expanded={filtersOpen}
            aria-controls={panelId}
            onClick={onToggleFilters}
          >
            Filters{activeCount > 0 ? ` · ${activeCount}` : ''}
          </Button>
        </div>
        <div
          id={panelId}
          hidden={!filtersOpen}
          className="flex flex-col gap-3 border-t border-atlas-border pt-3"
        >
          {agentSelect}
          {sortSelect}
          {chips}
          <div>{clear}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="flex items-end gap-3">
        {search}
        {agentSelect}
        {sortSelect}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {chips}
        {clear}
      </div>
    </div>
  )
}
