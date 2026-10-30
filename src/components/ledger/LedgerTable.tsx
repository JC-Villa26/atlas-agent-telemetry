import type { ActivityEvent } from '../../data/ledger'
import { cx } from '../../lib/cx'
import { describeDuration, formatDuration, formatUtcDate, formatUtcTime } from '../../lib/format'
import type { LedgerSort } from '../../lib/ledger'
import { ActivityOutcomeBadge } from '../ui/ActivityOutcomeBadge'
import { Icon, type IconKey } from '../ui/Icon'

type AriaSort = 'ascending' | 'descending' | 'none'

const headCell = 'py-2 pl-4 text-left align-middle text-xs font-medium tracking-wider uppercase'

export interface LedgerTableProps {
  events: readonly ActivityEvent[]
  sort: LedgerSort
  onSortChange: (next: LedgerSort) => void
}

function SortHeader({
  label,
  ariaSort,
  icon,
  active,
  onClick,
  className,
}: {
  label: string
  ariaSort: AriaSort
  icon: IconKey
  active: boolean
  onClick: () => void
  className?: string
}) {
  return (
    <th scope="col" aria-sort={ariaSort} className={cx(headCell, active ? 'text-atlas-text' : 'text-atlas-muted', className)}>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1 rounded-sm uppercase hover:text-atlas-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
      >
        {label}
        <Icon name={icon} className="size-3.5 [&_path]:[vector-effect:non-scaling-stroke]" />
      </button>
    </th>
  )
}

/**
 * Desktop ledger (Figma: 05 — ActivityLedgerHeader + ActivityLedgerRow, Layout = Desktop).
 * A real <table>: column headers, the time cell is the row header, aria-sort on sorted columns.
 * Column x-positions match Figma (16px cell padding + 140 / 184 / fill / 136 / 72 / 112 content).
 */
export function LedgerTable({ events, sort, onSortChange }: LedgerTableProps) {
  const timeSort: AriaSort = sort === 'newest' ? 'descending' : sort === 'oldest' ? 'ascending' : 'none'
  const durationSort: AriaSort = sort === 'duration' ? 'descending' : 'none'
  const timeIcon: IconKey = sort === 'newest' ? 'arrowDown' : sort === 'oldest' ? 'arrowUp' : 'arrowUpDown'

  return (
    <table className="w-full table-fixed text-left">
      <caption className="sr-only">Execution events, with time in UTC</caption>
      <colgroup>
        <col className="w-[156px]" />
        <col className="w-[200px]" />
        <col />
        <col className="w-[152px]" />
        <col className="w-[88px]" />
        <col className="w-[144px]" />
      </colgroup>
      <thead>
        <tr className="border-y border-atlas-border bg-atlas-hover">
          <SortHeader
            label="Time"
            ariaSort={timeSort}
            icon={timeIcon}
            active={sort !== 'duration'}
            onClick={() => onSortChange(sort === 'newest' ? 'oldest' : 'newest')}
          />
          <th scope="col" className={cx(headCell, 'text-atlas-muted')}>Agent</th>
          <th scope="col" className={cx(headCell, 'text-atlas-muted')}>Event</th>
          <th scope="col" className={cx(headCell, 'text-atlas-muted')}>Run ID</th>
          <SortHeader
            label="Duration"
            ariaSort={durationSort}
            icon={sort === 'duration' ? 'arrowDown' : 'arrowUpDown'}
            active={sort === 'duration'}
            onClick={() => onSortChange('duration')}
          />
          <th scope="col" className={cx(headCell, 'pr-4 text-atlas-muted')}>Outcome</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e) => (
          <tr key={e.runId} className="border-b border-atlas-border last:border-b-0">
            <th scope="row" className="py-3 pl-4 text-left align-top font-normal">
              <time dateTime={e.timestamp} className="block">
                <span className="block text-sm text-atlas-text">{formatUtcDate(e.timestamp)}</span>{' '}
                <span className="block font-mono text-xs text-atlas-muted">{formatUtcTime(e.timestamp)}</span>
              </time>
            </th>
            <td className="py-3 pl-4 align-top">
              <div className="flex items-start gap-2">
                <Icon name="agents" className="mt-0.5 size-4 shrink-0 text-atlas-accent-text [&_path]:[vector-effect:non-scaling-stroke]" />
                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold break-words text-atlas-text">{e.agentName}</span>
                  <code className="font-mono text-xs break-all text-atlas-muted">{e.agentId}</code>
                </div>
              </div>
            </td>
            <td className="py-3 pl-4 align-top text-sm break-words text-atlas-text">{e.description}</td>
            <td className="py-3 pl-4 align-top">
              <code className="font-mono text-xs break-all text-atlas-muted">{e.runId}</code>
            </td>
            <td className="py-3 pl-4 align-top">
              <span aria-hidden="true" className="font-mono text-xs text-atlas-text">
                {formatDuration(e.durationSeconds)}
              </span>
              <span className="sr-only">{describeDuration(e.durationSeconds, e.outcome === 'running')}</span>
            </td>
            <td className="py-3 pr-4 pl-4 align-top">
              <ActivityOutcomeBadge outcome={e.outcome} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
