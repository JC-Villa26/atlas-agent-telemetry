import type { ActivityEvent } from '../../data/ledger'
import { describeDuration, formatDuration, formatUtcDate, formatUtcTime } from '../../lib/format'
import { ActivityOutcomeBadge } from '../ui/ActivityOutcomeBadge'
import { Icon } from '../ui/Icon'

const crisp = '[&_path]:[vector-effect:non-scaling-stroke]'

/**
 * Stacked ledger rows (Figma: 05 — ActivityLedgerRow, Layout = Mobile; also used on tablet).
 * Same facts as the table — full UTC time, IDs, outcome, duration — and rendered INSTEAD of it,
 * never alongside it, so a screen reader never meets a record twice.
 */
export function LedgerCardList({ events }: { events: readonly ActivityEvent[] }) {
  return (
    <ul aria-label="Execution events" className="m-0 list-none p-0">
      {events.map((e) => (
        <li key={e.runId} className="flex flex-col gap-2 border-b border-atlas-border px-4 py-3 last:border-b-0">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-2">
            <div className="flex min-w-[min(8rem,100%)] flex-1 items-start gap-2">
              <Icon name="agents" className={`mt-0.5 size-4 shrink-0 text-atlas-accent-text ${crisp}`} />
              <p className="min-w-0 flex-1 text-sm font-semibold break-words text-atlas-text">{e.agentName}</p>
            </div>
            <ActivityOutcomeBadge outcome={e.outcome} className="ml-auto shrink-0" />
          </div>
          <code className="font-mono text-xs break-all text-atlas-muted">{e.agentId}</code>
          <p className="text-sm break-words text-atlas-text">{e.description}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-atlas-muted">
            <time dateTime={e.timestamp} className="inline-flex items-center gap-1">
              <Icon name="clock" className={`size-3.5 shrink-0 ${crisp}`} />
              {formatUtcDate(e.timestamp)} {formatUtcTime(e.timestamp)}
            </time>
            <span className="min-w-0 break-all">
              <span className="sr-only">Run ID </span>
              {e.runId}
            </span>
            <span className="inline-flex items-center gap-1 text-atlas-text">
              <Icon name="latency" className={`size-3.5 shrink-0 ${crisp}`} />
              <span aria-hidden="true">{formatDuration(e.durationSeconds)}</span>
              <span className="sr-only">Duration {describeDuration(e.durationSeconds, e.outcome === 'running')}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
