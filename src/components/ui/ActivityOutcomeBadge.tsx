import type { ActivityOutcome } from '../../data/ledger'
import { cx } from '../../lib/cx'
import { Icon, type IconKey } from './Icon'

interface OutcomeStyle {
  label: string
  icon: IconKey
  color: string
  border?: string
}

// Figma: 05 — ActivityOutcomeBadge. Squarer (radius md) than the agent-status pill on purpose:
// it describes how ONE past run ended, not what an agent is doing now.
const outcomes: Record<ActivityOutcome, OutcomeStyle> = {
  succeeded: { label: 'Succeeded', icon: 'success', color: 'text-atlas-success' },
  failed: { label: 'Failed', icon: 'xCircle', color: 'text-atlas-danger' },
  running: { label: 'Running', icon: 'loading', color: 'text-atlas-accent-text' },
  cancelled: { label: 'Cancelled', icon: 'cancelled', color: 'text-atlas-muted' },
  unknown: { label: 'Unknown', icon: 'helpCircle', color: 'text-atlas-muted', border: 'border-dashed' },
}

const sizes = {
  sm: { box: 'px-2 py-1 text-xs', icon: 'size-3.5' },
  md: { box: 'px-3 py-1 text-sm', icon: 'size-4' },
} as const

export interface ActivityOutcomeBadgeProps {
  outcome: ActivityOutcome
  size?: keyof typeof sizes
  className?: string
}

export function ActivityOutcomeBadge({ outcome, size = 'sm', className }: ActivityOutcomeBadgeProps) {
  const style = outcomes[outcome] ?? outcomes.unknown
  const s = sizes[size]
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-md border border-atlas-border font-semibold whitespace-nowrap',
        s.box,
        style.color,
        style.border,
        className,
      )}
    >
      <Icon name={style.icon} className={cx(s.icon, 'shrink-0 [&_path]:[vector-effect:non-scaling-stroke]')} />
      {style.label}
    </span>
  )
}
