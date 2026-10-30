import { TelemetryMetricCard } from '../components/ui/TelemetryMetricCard'
import { demoMetrics, type TelemetryMetric } from '../data/telemetry'

const states: TelemetryMetric[] = [
  { id: 's-loading', state: 'loading', label: 'Success rate', icon: 'success' },
  { id: 's-empty', state: 'empty', label: 'Average latency', icon: 'latency' },
  { id: 's-error', state: 'error', label: 'Tokens consumed', icon: 'tokens' },
  { id: 's-error-hl', state: 'error', label: 'Success rate', icon: 'success', appearance: 'highlighted' },
  { id: 's-loading-hl', state: 'loading', label: 'Success rate', icon: 'success', appearance: 'highlighted' },
  {
    id: 's-long',
    state: 'normal',
    label: 'Average end-to-end response latency across all regions',
    icon: 'latency',
    value: '1,284,550.75',
    unit: 'milliseconds',
    trend: { direction: 'down', sentiment: 'negative', delta: '−12,345.5 ms' },
    comparison: 'vs 1,296,896.25 ms · previous 24-hour period',
    context:
      'A deliberately long description to check wrapping: the card grows vertically instead of clipping.',
  },
  { id: 's-neg', state: 'normal', label: 'P95 latency', icon: 'latency', value: '212', unit: 'ms', trend: { direction: 'up', sentiment: 'negative', delta: '+24 ms' }, comparison: 'vs 188 ms · previous 24 h', context: 'Slowest 5% of responses.' },
  { id: 's-flat', state: 'normal', label: 'Open incidents', value: '0', trend: { direction: 'flat', sentiment: 'neutral', delta: '0' }, comparison: 'vs 0 · previous 24 h', context: 'Zero is meaningful here.' },
]

/** Development-only: open /#ui-metrics to inspect every card state and long-text behaviour. */
export default function MetricsShowcase() {
  return (
    <div className="flex flex-col gap-6" data-testid="metrics-kit">
      <p className="text-sm text-atlas-muted">Dev-only. Loading, empty, error and stress cases.</p>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {[...demoMetrics.slice(0, 1), ...states].map((m) => (
          <TelemetryMetricCard key={m.id} metric={m} />
        ))}
      </div>
    </div>
  )
}
