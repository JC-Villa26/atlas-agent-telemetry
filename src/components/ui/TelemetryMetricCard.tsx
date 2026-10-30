import { useId } from 'react'
import type { MetricIconKey, TelemetryMetric } from '../../data/telemetry'
import { Icon, type IconKey } from './Icon'
import { TrendIndicator } from './TrendIndicator'
import { cx } from '../../lib/cx'

const metricIcons: Record<MetricIconKey, IconKey> = {
  agents: 'agents',
  success: 'success',
  latency: 'latency',
  tokens: 'tokens',
}

const DEFAULT_EMPTY = 'No telemetry was recorded for the selected 24-hour period.'
const DEFAULT_ERROR = 'The metric could not be loaded. Values may be out of date.'

export interface TelemetryMetricCardProps {
  metric: TelemetryMetric
  className?: string
}

function StatusLine({
  icon,
  label,
  danger = false,
}: {
  icon: IconKey
  label: string
  danger?: boolean
}) {
  return (
    <p
      className={cx(
        'flex items-center gap-1 font-mono text-xs font-medium tracking-wider uppercase',
        danger ? 'text-atlas-danger' : 'text-atlas-muted',
      )}
    >
      <Icon name={icon} className="size-4 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]" />
      {label}
    </p>
  )
}

/**
 * Figma: 03 — TelemetryMetricCard. 20px padding, 12px radius, 12px row gaps, 1px border,
 * 221px minimum height (the card still grows with wrapped text and font scaling).
 * The card is a plain <article>, not a live region; its label is the accessible name.
 */
export function TelemetryMetricCard({ metric, className }: TelemetryMetricCardProps) {
  const labelId = useId()
  const highlighted = metric.appearance === 'highlighted'

  return (
    <article
      aria-labelledby={labelId}
      aria-busy={metric.state === 'loading' ? true : undefined}
      data-state={metric.state}
      className={cx(
        'flex min-h-[221px] min-w-0 flex-col gap-3 rounded-xl border p-5',
        metric.state === 'error'
          ? highlighted
            ? // Both themes: danger-tinted surface + a 1px inset ring on top of the 1px border
              // (= 2px danger edge), so the card's outer size is unchanged.
              'border-atlas-danger bg-atlas-danger-surface inset-ring-1 inset-ring-atlas-danger'
            : 'border-atlas-danger bg-atlas-surface'
          : highlighted
            ? // Light only: pale lavender surface + a 1px inset ring on top of the 1px border
              // (= 2px accent edge) with no change to the card's outer size. Dark keeps 1px.
              'border-atlas-accent bg-atlas-surface light:bg-atlas-highlight-surface light:inset-ring-1 light:inset-ring-atlas-accent'
            : 'border-atlas-border bg-atlas-surface',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {metric.icon ? (
            <Icon
              name={metricIcons[metric.icon]}
              className={cx(
                'size-5 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]',
                highlighted ? 'text-atlas-accent-text' : 'text-atlas-muted',
              )}
            />
          ) : null}
          <h3 id={labelId} className="min-w-0 text-sm font-normal text-atlas-muted">
            {metric.label}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-atlas-border px-2 py-1 font-mono text-xs font-medium tracking-wider text-atlas-accent-text uppercase">
          Demo
        </span>
      </header>

      {metric.state === 'normal' ? (
        <>
          <p className="flex min-w-0 flex-wrap items-end gap-x-1">
            <span className="min-w-0 text-[2rem] leading-10 font-semibold tracking-[-0.015em] break-words text-atlas-text tabular-nums">
              {metric.value}
            </span>
            {metric.unit ? (
              <span className="text-base text-atlas-muted">{metric.unit}</span>
            ) : null}
          </p>
          <div className="flex flex-col gap-1">
            <TrendIndicator {...metric.trend} />
            <p className="text-sm text-atlas-muted">{metric.comparison}</p>
          </div>
          <p className="border-t border-atlas-border pt-3 text-sm text-atlas-muted">
            {metric.context}
          </p>
        </>
      ) : null}

      {metric.state === 'loading' ? (
        <div className="flex flex-col gap-3">
          {/* Decorative skeleton: no fabricated numbers. Pulse only when motion is allowed. */}
          <div aria-hidden="true" className="flex flex-col gap-3 motion-safe:animate-pulse">
            <div className="h-8 w-28 rounded-md bg-atlas-border" />
            <div className="h-4 w-40 max-w-full rounded-md bg-atlas-border" />
            <div className="h-3 w-full rounded-md bg-atlas-border" />
          </div>
          <p className="flex items-center gap-1 font-mono text-xs font-medium tracking-wider text-atlas-muted uppercase">
            <Icon name="loading" className="size-4 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]" />
            Loading
            <span className="sr-only normal-case"> {metric.label}</span>
          </p>
        </div>
      ) : null}

      {metric.state === 'empty' ? (
        <div className="flex flex-col gap-2">
          <StatusLine icon="inbox" label="No data" />
          <p className="text-sm font-semibold text-atlas-text">No data for this period</p>
          <p className="text-sm text-atlas-muted">{metric.message ?? DEFAULT_EMPTY}</p>
        </div>
      ) : null}

      {metric.state === 'error' ? (
        <div className="flex flex-col gap-2">
          <StatusLine icon="alert" label="Error" danger />
          <p className="text-sm font-semibold text-atlas-text">Metric unavailable</p>
          <p className="text-sm text-atlas-muted">{metric.message ?? DEFAULT_ERROR}</p>
        </div>
      ) : null}
    </article>
  )
}
