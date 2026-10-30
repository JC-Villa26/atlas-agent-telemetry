import type { ActivityEvent, ActivityOutcome } from '../data/ledger'

export type LedgerSort = 'newest' | 'oldest' | 'duration'

export interface LedgerFilters {
  query: string
  outcome: ActivityOutcome | 'all'
  agentId: string | 'all'
}

export const DEFAULT_FILTERS: LedgerFilters = { query: '', outcome: 'all', agentId: 'all' }
export const DEFAULT_SORT: LedgerSort = 'newest'

/** Lower-cases, folds compatibility characters, collapses whitespace and trims. */
export function normalizeText(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim()
}

function matchesQuery(event: ActivityEvent, terms: string[]): boolean {
  if (terms.length === 0) return true
  const haystack = normalizeText(
    [event.agentName, event.agentId, event.runId, event.description].join(' '),
  )
  // Every search word must appear somewhere in the event (order independent).
  return terms.every((term) => haystack.includes(term))
}

const time = (event: ActivityEvent) => Date.parse(event.timestamp)

function compare(sort: LedgerSort): (a: ActivityEvent, b: ActivityEvent) => number {
  // Ties are broken by runId so the order is always deterministic.
  const newest = (a: ActivityEvent, b: ActivityEvent) =>
    time(b) - time(a) || b.runId.localeCompare(a.runId)
  if (sort === 'oldest') return (a, b) => time(a) - time(b) || a.runId.localeCompare(b.runId)
  if (sort === 'duration') {
    return (a, b) => {
      // Longest first; events without a duration (running / unknown) go last.
      const da = a.durationSeconds
      const db = b.durationSeconds
      if (da === null && db === null) return newest(a, b)
      if (da === null) return 1
      if (db === null) return -1
      return db - da || newest(a, b)
    }
  }
  return newest
}

/** Returns a NEW filtered + sorted array; the source dataset is never mutated. */
export function selectEvents(
  events: readonly ActivityEvent[],
  filters: LedgerFilters,
  sort: LedgerSort,
): ActivityEvent[] {
  const terms = normalizeText(filters.query).split(' ').filter(Boolean)
  return events
    .filter((e) => filters.outcome === 'all' || e.outcome === filters.outcome)
    .filter((e) => filters.agentId === 'all' || e.agentId === filters.agentId)
    .filter((e) => matchesQuery(e, terms))
    .sort(compare(sort))
}

/** Distinct agents present in the events, sorted by name. */
export function agentsIn(events: readonly ActivityEvent[]): Array<{ id: string; name: string }> {
  const seen = new Map<string, string>()
  for (const e of events) seen.set(e.agentId, e.agentName)
  return [...seen].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
}

/** Latest finished (not running) event per agent — used to cross-check agent last-run data. */
export function latestFinishedByAgent(events: readonly ActivityEvent[]): Map<string, ActivityEvent> {
  const latest = new Map<string, ActivityEvent>()
  for (const e of events) {
    if (e.outcome === 'running') continue
    const current = latest.get(e.agentId)
    if (!current || time(e) > time(current)) latest.set(e.agentId, e)
  }
  return latest
}
