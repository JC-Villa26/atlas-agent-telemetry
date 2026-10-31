import { useId } from 'react'
import type { AgentProgress } from '../../data/agents'
import { computeStepProgress } from '../../lib/progress'
import { cx } from '../../lib/cx'
import { Icon, type IconKey } from './Icon'

interface ModeStyle {
  word: string
  icon: IconKey
  color: string
  bar: string
}

// Figma: 04 — ExecutionProgress. 6px track, status word + icon + steps, optional percentage.
const modes: Record<AgentProgress['mode'], ModeStyle> = {
  determinate: { word: 'In progress', icon: 'loading', color: 'text-atlas-accent-text', bar: 'bg-atlas-accent' },
  indeterminate: { word: 'Working', icon: 'loading', color: 'text-atlas-accent-text', bar: 'bg-atlas-accent' },
  completed: { word: 'Complete', icon: 'success', color: 'text-atlas-success', bar: 'bg-atlas-success' },
  failed: { word: 'Failed', icon: 'xCircle', color: 'text-atlas-danger', bar: 'bg-atlas-danger' },
}

export interface ExecutionProgressProps {
  progress: AgentProgress
  /** Short supporting line under the bar (e.g. current step or failure context). */
  description?: string
  /** Determinate only: show the rounded percentage (e.g. "67%"). Turn off when steps are not comparable. */
  showPercentage?: boolean
  /** What the progress belongs to (e.g. the agent name). Prefixes the progressbar's accessible name. */
  label?: string
  className?: string
}

/**
 * Truthful progress:
 * - determinate: fill = completed / total (clamped 0–100 %), exposed as role="progressbar" with values
 * - indeterminate: a labelled moving segment, never a percentage, no aria-valuenow
 * - completed: full bar (an execution that completed is 100 % by definition)
 * - failed: bar stops where it failed — it is NOT shown as 100 % complete
 * Invalid step counts (NaN, Infinity, total ≤ 0, negatives, non-integers) show an empty track and
 * "Progress unavailable" instead of a made-up value.
 */
export function ExecutionProgress({
  progress,
  description,
  showPercentage = true,
  label,
  className,
}: ExecutionProgressProps) {
  const headerId = useId()
  const style = modes[progress.mode]

  const steps =
    progress.mode === 'indeterminate'
      ? ({ valid: false } as const)
      : computeStepProgress(progress.completedSteps, progress.totalSteps)

  const stepsText = steps.valid ? `${steps.completed} of ${steps.total} steps` : null
  const unavailable = progress.mode !== 'indeterminate' && !steps.valid && progress.mode !== 'completed'

  // Fill width in %, always within 0–100.
  let fill = 0
  if (progress.mode === 'completed') fill = 100
  else if (steps.valid) fill = steps.ratio * 100

  // ARIA: values only when they are real.
  let aria: Record<string, string | number> | null = null
  if (progress.mode === 'indeterminate') {
    aria = { 'aria-valuetext': 'In progress, steps unknown' }
  } else if (progress.mode === 'completed') {
    aria = steps.valid
      ? { 'aria-valuemin': 0, 'aria-valuemax': steps.total, 'aria-valuenow': steps.total, 'aria-valuetext': `Complete, ${steps.total} of ${steps.total} steps` }
      : { 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': 100, 'aria-valuetext': 'Complete' }
  } else if (steps.valid) {
    aria = {
      'aria-valuemin': 0,
      'aria-valuemax': steps.total,
      'aria-valuenow': steps.completed,
      'aria-valuetext':
        progress.mode === 'failed'
          ? `Failed after ${steps.completed} of ${steps.total} steps`
          : `${steps.completed} of ${steps.total} steps, ${steps.percent} percent`,
    }
  }

  const showPct = progress.mode === 'determinate' && steps.valid && showPercentage

  // With a label: "Research Agent 01, In progress, 4 of 6 steps". Only facts already shown on screen
  // (status word + real step counts); indeterminate or invalid progress never gets invented numbers.
  const barName = label ? [label, style.word, stepsText].filter(Boolean).join(', ') : undefined

  return (
    <div className={cx('flex min-w-0 flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <p id={headerId} className="flex min-w-0 flex-wrap items-center gap-x-1">
          <span className={cx('inline-flex items-center gap-1 font-semibold', style.color)}>
            <Icon name={style.icon} className="size-4 shrink-0 [&_path]:[vector-effect:non-scaling-stroke]" />
            {style.word}
          </span>
          {stepsText ? <span className="text-atlas-muted">{stepsText}</span> : null}
          {unavailable ? <span className="text-atlas-muted">Progress unavailable</span> : null}
        </p>
        {showPct ? <span className="shrink-0 font-semibold text-atlas-text">{steps.percent}%</span> : null}
      </div>

      <div
        {...(aria
          ? { role: 'progressbar', ...(barName ? { 'aria-label': barName } : { 'aria-labelledby': headerId }), ...aria }
          : { 'aria-hidden': true })}
        className="h-1.5 w-full overflow-hidden rounded-full bg-atlas-border"
      >
        <div
          className={cx(
            'h-full rounded-full',
            style.bar,
            progress.mode === 'indeterminate' ? 'atlas-indeterminate w-[30%]' : null,
          )}
          style={progress.mode === 'indeterminate' ? undefined : { width: `${fill}%` }}
        />
      </div>

      {description ? <p className="text-sm text-atlas-muted">{description}</p> : null}
    </div>
  )
}
