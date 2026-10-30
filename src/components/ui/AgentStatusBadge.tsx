import type { AgentStatus } from '../../data/agents'
import { cx } from '../../lib/cx'
import { Icon, type IconKey } from './Icon'

type BadgeSize = 'sm' | 'md'

interface StatusStyle {
  label: string
  icon: IconKey
  /** Text + icon colour (semantic tokens only). */
  color: string
  /** Extra border treatment; "unknown" is dashed so it never reads as a real state. */
  border?: string
}

// Figma: 04 — AgentStatusBadge. Colour reinforces the icon shape and the visible word.
const statuses: Record<AgentStatus, StatusStyle> = {
  running: { label: 'Running', icon: 'loading', color: 'text-atlas-accent-text' },
  idle: { label: 'Idle', icon: 'idleCircle', color: 'text-atlas-muted' },
  completed: { label: 'Completed', icon: 'success', color: 'text-atlas-success' },
  failed: { label: 'Failed', icon: 'xCircle', color: 'text-atlas-danger' },
  paused: { label: 'Paused', icon: 'pauseCircle', color: 'text-atlas-warning' },
  unknown: { label: 'Unknown', icon: 'helpCircle', color: 'text-atlas-muted', border: 'border-dashed' },
}

// Figma: Small = padding 8×4, 12/16, icon 14 · Medium = padding 12×4, 14/20, icon 16.
const sizeClasses: Record<BadgeSize, { box: string; icon: string }> = {
  sm: { box: 'px-2 py-1 text-xs', icon: 'size-3.5' },
  md: { box: 'px-3 py-1 text-sm', icon: 'size-4' },
}

export interface AgentStatusBadgeProps {
  status: AgentStatus
  size?: BadgeSize
  showIcon?: boolean
  className?: string
}

export function AgentStatusBadge({
  status,
  size = 'md',
  showIcon = true,
  className,
}: AgentStatusBadgeProps) {
  // Anything outside the known set (bad data at runtime) falls back to the neutral "Unknown" look,
  // never to a success- or failure-styled badge.
  const style = statuses[status] ?? statuses.unknown
  const sizes = sizeClasses[size]

  return (
    <span
      className={cx(
        'inline-flex items-center justify-center gap-1 rounded-full border border-atlas-border font-semibold whitespace-nowrap',
        sizes.box,
        style.color,
        style.border,
        className,
      )}
    >
      {showIcon ? (
        <Icon
          name={style.icon}
          className={cx(sizes.icon, 'shrink-0 [&_path]:[vector-effect:non-scaling-stroke]')}
        />
      ) : null}
      {style.label}
    </span>
  )
}
