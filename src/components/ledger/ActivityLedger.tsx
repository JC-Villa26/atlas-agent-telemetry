import { useId, useMemo, useRef, useState } from 'react'
import type { ActivityEvent } from '../../data/ledger'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { BREAKPOINTS } from '../../lib/breakpoints'
import {
  agentsIn,
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  selectEvents,
  type LedgerFilters,
  type LedgerSort,
} from '../../lib/ledger'
import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Icon, type IconKey } from '../ui/Icon'
import { LedgerCardList } from './LedgerCardList'
import { LedgerTable } from './LedgerTable'
import { LedgerToolbar } from './LedgerToolbar'

export type LedgerState = 'ready' | 'loading' | 'error'

export interface ActivityLedgerProps {
  events: readonly ActivityEvent[]
  /** `loading` and `error` are presentation states only (there is no backend). */
  state?: LedgerState
  className?: string
}

const crisp = '[&_path]:[vector-effect:non-scaling-stroke]'

function Message({
  icon,
  label,
  title,
  body,
  danger = false,
  children,
}: {
  icon: IconKey
  label: string
  title: string
  body: string
  danger?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-10 text-center">
      <Icon name={icon} className={cx('size-6', crisp, danger ? 'text-atlas-danger' : 'text-atlas-muted')} />
      <p className={cx('font-mono text-xs font-medium tracking-wider uppercase', danger ? 'text-atlas-danger' : 'text-atlas-muted')}>
        {label}
      </p>
      <h3 className="text-base font-semibold text-atlas-text">{title}</h3>
      <p className="max-w-[420px] text-sm text-atlas-muted">{body}</p>
      {children}
    </div>
  )
}

function Skeleton({ wide }: { wide: boolean }) {
  const bar = 'rounded-md bg-atlas-border'
  return (
    <div aria-hidden="true" className="motion-safe:animate-pulse">
      {[0, 1, 2, 3].map((i) =>
        wide ? (
          <div key={i} className="flex items-center gap-4 border-b border-atlas-border px-4 py-4 last:border-b-0">
            <div className={cx(bar, 'h-3.5 w-[140px]')} />
            <div className={cx(bar, 'h-3.5 w-[184px]')} />
            <div className={cx(bar, 'h-3.5 flex-1')} />
            <div className={cx(bar, 'h-3.5 w-[136px]')} />
            <div className={cx(bar, 'h-3.5 w-[72px]')} />
            <div className={cx(bar, 'h-3.5 w-[112px]')} />
          </div>
        ) : (
          <div key={i} className="flex flex-col gap-2 border-b border-atlas-border px-4 py-3 last:border-b-0">
            <div className={cx(bar, 'h-4 w-full')} />
            <div className={cx(bar, 'h-3 w-3/5')} />
            <div className={cx(bar, 'h-3 w-full')} />
            <div className={cx(bar, 'h-2.5 w-2/5')} />
          </div>
        ),
      )}
    </div>
  )
}

/**
 * Figma: 05 — ActivityLedger. Real client-side search, outcome + agent filters and sorting over
 * the events it is given (never mutated). One layout at a time: table from 1280px, stacked rows
 * below; full toolbar from 768px, compact "Filters" disclosure below.
 */
export function ActivityLedger({ events, state = 'ready', className }: ActivityLedgerProps) {
  const headingId = useId()
  const searchRef = useRef<HTMLInputElement>(null)
  const [filters, setFilters] = useState<LedgerFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<LedgerSort>(DEFAULT_SORT)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const wide = useMediaQuery(BREAKPOINTS.xl)
  const roomy = useMediaQuery(BREAKPOINTS.md)

  const visible = useMemo(() => selectEvents(events, filters, sort), [events, filters, sort])
  const agents = useMemo(() => agentsIn(events), [events])
  const hasActiveControls =
    filters.query.trim() !== '' || filters.outcome !== 'all' || filters.agentId !== 'all' || sort !== DEFAULT_SORT

  const clearAll = () => {
    // Move focus first: the "Clear filters" button becomes disabled once everything is reset.
    searchRef.current?.focus()
    setFilters(DEFAULT_FILTERS)
    setSort(DEFAULT_SORT)
  }

  let body: React.ReactNode
  let footer: string
  if (state === 'loading') {
    body = (
      <>
        <p className="flex items-center gap-1 px-5 py-3 text-sm text-atlas-muted">
          <Icon name="loading" className={cx('size-4 shrink-0 text-atlas-accent-text', crisp)} />
          <span className="font-mono text-xs font-medium tracking-wider text-atlas-accent-text uppercase">Loading</span>
          Loading activity records…
        </p>
        <Skeleton wide={wide} />
      </>
    )
    footer = 'Loading records…'
  } else if (state === 'error') {
    body = (
      <Message
        icon="alert"
        label="Error"
        title="Activity could not be loaded"
        body="The activity history is unavailable right now. The records shown may be missing or out of date."
        danger
      />
    )
    footer = 'Records unavailable'
  } else if (events.length === 0) {
    body = (
      <Message icon="inbox" label="No data" title="No activity recorded" body="No execution events were recorded for this period." />
    )
    footer = 'Showing 0 of 0 records'
  } else if (visible.length === 0) {
    body = (
      <Message
        icon="search"
        label="No matches"
        title="No matching activity"
        body="No records match the current filters. Remove a filter or change the search to see more activity."
      >
        <Button variant="secondary" size="sm" onClick={clearAll}>
          Clear filters
        </Button>
      </Message>
    )
    footer = `Showing 0 of ${events.length} records`
  } else {
    body = wide ? (
      <LedgerTable events={visible} sort={sort} onSortChange={setSort} />
    ) : (
      <LedgerCardList events={visible} />
    )
    footer = `Showing ${visible.length} of ${events.length} records`
  }

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={state === 'loading' ? true : undefined}
      className={cx('flex min-w-0 flex-col overflow-hidden rounded-xl border border-atlas-border bg-atlas-surface', className)}
    >
      <header className="flex flex-col gap-1 px-5 pt-5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <h2 id={headingId} className="text-xl font-semibold text-atlas-text">
            Activity ledger
          </h2>
          <span className="ml-auto shrink-0 rounded-full border border-atlas-border px-2 py-1 font-mono text-xs font-medium tracking-wider text-atlas-accent-text uppercase">
            Demo
          </span>
        </div>
        <p className="text-sm text-atlas-muted">
          Recent execution events from the 4 sample demo agents · times in UTC · demo data.
        </p>
      </header>

      <LedgerToolbar
        filters={filters}
        onFiltersChange={setFilters}
        sort={sort}
        onSortChange={setSort}
        agents={agents}
        hasActiveControls={hasActiveControls}
        onClear={clearAll}
        searchRef={searchRef}
        compact={!roomy}
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen((open) => !open)}
      />

      <div>{body}</div>

      <footer className="flex items-center justify-between gap-3 border-t border-atlas-border px-5 py-3 text-sm text-atlas-muted">
        {/* Polite status: announces the new count only when it changes (not on every keystroke). */}
        <p role="status" aria-atomic="true">
          {footer}
        </p>
        <p className="font-mono text-xs">Times in UTC</p>
      </footer>
    </section>
  )
}
