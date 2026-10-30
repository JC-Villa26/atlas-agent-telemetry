import { useId } from 'react'
import type { Agent } from '../../data/agents'
import { cx } from '../../lib/cx'
import { formatUtcMinute } from '../../lib/format'
import { AgentStatusBadge } from './AgentStatusBadge'
import { ExecutionProgress } from './ExecutionProgress'
import { Icon } from './Icon'

type Density = 'compact' | 'expanded'

// Figma: 04 — AgentCard. Compact = 16px padding / 8px radius / 32px avatar;
// Expanded = 20px padding / 12px radius / 40px avatar + progress and last-run footer.
const densityClasses: Record<Density, { card: string; avatar: string; icon: string; name: string }> = {
  compact: { card: 'gap-2 rounded-lg p-4', avatar: 'size-8', icon: 'size-4', name: 'text-sm' },
  expanded: { card: 'gap-3 rounded-xl p-5', avatar: 'size-10', icon: 'size-5', name: 'text-base' },
}

const outcomeStyle = {
  succeeded: { label: 'Succeeded', icon: 'success', color: 'text-atlas-success' },
  failed: { label: 'Failed', icon: 'xCircle', color: 'text-atlas-danger' },
} as const

export interface AgentCardProps {
  agent: Agent
  density?: Density
  /** Show the DEMO tag (expanded only). */
  demo?: boolean
  className?: string
}

/**
 * Non-interactive summary of one agent. Status (what it is doing now) and last-run outcome
 * (how its latest finished run ended) are separate elements with separate labels.
 */
export function AgentCard({ agent, density = 'expanded', demo = true, className }: AgentCardProps) {
  const nameId = useId()
  const d = densityClasses[density]
  const expanded = density === 'expanded'
  const last = agent.lastRun ? outcomeStyle[agent.lastRun.outcome] : null

  return (
    <article
      aria-labelledby={nameId}
      className={cx(
        'flex min-w-0 flex-col border border-atlas-border bg-atlas-surface',
        d.card,
        className,
      )}
    >
      {/* Wraps when the badge no longer fits (large browser font size); the badge stays right-aligned. */}
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex min-w-[min(8rem,100%)] flex-1 items-center gap-3">
          <span
            aria-hidden="true"
            className={cx(
              'grid shrink-0 place-items-center rounded-lg border border-atlas-border bg-atlas-hover text-atlas-accent-text',
              d.avatar,
            )}
          >
            <Icon name="agents" className={cx(d.icon, '[&_path]:[vector-effect:non-scaling-stroke]')} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h3 id={nameId} className={cx('min-w-0 font-semibold break-words text-atlas-text', d.name)}>
              {agent.name}
            </h3>
            <code className="block min-w-0 truncate font-mono text-xs text-atlas-muted" title={agent.id}>
              {agent.id}
            </code>
          </div>
        </div>
        <div className="ml-auto max-w-full shrink-0">
          <span className="sr-only">Status: </span>
          {/* flex-wrap / max-w-full only matter when the pill is wider than the card (huge font on a tiny screen). */}
          <AgentStatusBadge status={agent.status} size="sm" className="max-w-full flex-wrap" />
        </div>
      </header>

      <p className="text-sm text-atlas-text">{agent.task}</p>

      {expanded && agent.progress ? (
        <ExecutionProgress progress={agent.progress} description={agent.progressNote} label={agent.name} />
      ) : null}

      {expanded && (last || demo) ? (
        <footer className="flex flex-col gap-2 border-t border-atlas-border pt-3">
          {last && agent.lastRun ? (
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm">
              <p className="flex flex-wrap items-center gap-1">
                <Icon name={last.icon} className={cx('size-4 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]', last.color)} />
                <span className="text-atlas-muted">Last run:</span>
                <span className={cx('font-semibold', last.color)}>{last.label}</span>
              </p>
              <p className="flex items-center gap-1 text-atlas-muted">
                <Icon name="clock" className="size-4 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]" />
                <time dateTime={agent.lastRun.at}>{formatUtcMinute(agent.lastRun.at)}</time>
              </p>
            </div>
          ) : null}
          {demo ? (
            <span className="w-fit rounded-full border border-atlas-border px-2 py-1 font-mono text-xs font-medium tracking-wider text-atlas-accent-text uppercase">
              Demo
            </span>
          ) : null}
        </footer>
      ) : null}
    </article>
  )
}
