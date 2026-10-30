import type { TrendDirection, TrendSentiment } from '../../data/telemetry'
import { Icon, type IconKey } from './Icon'
import { cx } from '../../lib/cx'

const directionIcon: Record<TrendDirection, IconKey> = {
  up: 'arrowUp',
  down: 'arrowDown',
  flat: 'minus',
}

// Read by screen readers only: the arrow is decorative, so direction needs text.
const directionText: Record<TrendDirection, string> = {
  up: 'Up',
  down: 'Down',
  flat: 'Unchanged',
}

// Colour reinforces — never replaces — the arrow shape and the sentiment word.
const sentimentColor: Record<TrendSentiment, string> = {
  positive: 'text-atlas-success',
  negative: 'text-atlas-danger',
  neutral: 'text-atlas-muted',
}

const sentimentWord: Record<TrendSentiment, string> = {
  positive: 'Favorable',
  negative: 'Unfavorable',
  neutral: 'Neutral',
}

export interface TrendIndicatorProps {
  direction: TrendDirection
  sentiment: TrendSentiment
  /** Signed, display-ready delta such as "+0.4 pts". */
  delta: string
  className?: string
}

/** Figma: 03 — TrendIndicator (arrow 16px · delta 14/20 semibold · sentiment mono label, gap 8). */
export function TrendIndicator({ direction, sentiment, delta, className }: TrendIndicatorProps) {
  return (
    <span
      className={cx(
        'inline-flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5',
        sentimentColor[sentiment],
        className,
      )}
    >
      <Icon name={directionIcon[direction]} className="size-4 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]" />
      <span className="sr-only">{directionText[direction]} </span>
      <span className="text-sm font-semibold">{delta}</span>
      <span className="font-mono text-xs font-medium tracking-wider uppercase">
        {sentimentWord[sentiment]}
      </span>
    </span>
  )
}
