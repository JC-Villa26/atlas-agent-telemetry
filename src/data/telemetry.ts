/**
 * Telemetry metric content, kept separate from how it is drawn.
 * All values below are fictional DEMO data — there is no backend.
 */

export type TrendDirection = 'up' | 'down' | 'flat'
/** Whether the change is good, bad or neutral for THIS metric. Independent of direction. */
export type TrendSentiment = 'positive' | 'negative' | 'neutral'
export type MetricAppearance = 'default' | 'highlighted'
export type MetricIconKey = 'agents' | 'success' | 'latency' | 'tokens'

export interface MetricTrend {
  direction: TrendDirection
  sentiment: TrendSentiment
  /** Signed, display-ready change, e.g. "+0.4 pts" or "−12 ms". */
  delta: string
}

interface MetricBase {
  /** Stable unique ID (also used for DOM ids). */
  id: string
  label: string
  icon?: MetricIconKey
  appearance?: MetricAppearance
}

export interface NormalMetric extends MetricBase {
  state: 'normal'
  /** Display-ready value; underlying precision is intentionally unspecified. */
  value: string
  unit?: string
  trend: MetricTrend
  /** Comparison text, e.g. "vs 98.2% · previous 24 h". */
  comparison: string
  /** Short contextual description shown under the divider. */
  context: string
}

export interface LoadingMetric extends MetricBase {
  state: 'loading'
}

export interface EmptyMetric extends MetricBase {
  state: 'empty'
  /** Overrides the default explanation. */
  message?: string
}

export interface ErrorMetric extends MetricBase {
  state: 'error'
  /** Overrides the default error message. */
  message?: string
}

export type TelemetryMetric = NormalMetric | LoadingMetric | EmptyMetric | ErrorMetric

/** Fixed demo snapshot — not "now". */
export const DEMO_SNAPSHOT = {
  iso: '2026-10-30T10:20:00Z',
  label: '2026-10-30 10:20 UTC',
  window: 'last 24 h vs previous 24 h',
  fleetSize: 24,
} as const

/** Fleet-wide demo metrics (24 agents). They are a broader scope than any later per-agent sample. */
export const demoMetrics: readonly NormalMetric[] = [
  {
    id: 'active-agents',
    state: 'normal',
    label: 'Active agents',
    icon: 'agents',
    value: '24',
    unit: 'agents',
    trend: { direction: 'up', sentiment: 'neutral', delta: '+3' },
    comparison: 'vs 21 · previous 24 h',
    context: 'Demo fleet of 24 agents; 4 are shown below.',
  },
  {
    id: 'success-rate',
    state: 'normal',
    label: 'Success rate',
    icon: 'success',
    appearance: 'highlighted',
    value: '98.6',
    unit: '%',
    trend: { direction: 'up', sentiment: 'positive', delta: '+0.4 pts' },
    comparison: 'vs 98.2% · previous 24 h',
    context: 'Fleet runs completed without errors.',
  },
  {
    id: 'average-latency',
    state: 'normal',
    label: 'Average latency',
    icon: 'latency',
    value: '128',
    unit: 'ms',
    trend: { direction: 'down', sentiment: 'positive', delta: '−12 ms' },
    comparison: 'vs 140 ms · previous 24 h',
    context: 'Mean time to first response. Lower is favorable.',
  },
  {
    id: 'tokens-consumed',
    state: 'normal',
    label: 'Tokens consumed',
    icon: 'tokens',
    value: '1.28M',
    unit: 'tokens',
    trend: { direction: 'up', sentiment: 'neutral', delta: '+18.5%' },
    comparison: 'vs 1.08M · previous 24 h',
    context: 'Input and output tokens combined.',
  },
]
