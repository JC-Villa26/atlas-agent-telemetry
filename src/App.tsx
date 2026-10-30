import { lazy, Suspense } from 'react'
import { AppShell } from './components/layout/AppShell'
import { TelemetryMetricCard } from './components/ui/TelemetryMetricCard'
import { DEMO_SNAPSHOT, demoMetrics } from './data/telemetry'

// Dev-only visual check (open /#ui-kit). `import.meta.env.DEV` is false in production
// builds, so this branch and the showcase module are removed from the bundle.
const ButtonShowcase = import.meta.env.DEV ? lazy(() => import('./dev/ButtonShowcase')) : null
const MetricsShowcase = import.meta.env.DEV ? lazy(() => import('./dev/MetricsShowcase')) : null

function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-xl border border-dashed border-atlas-border bg-atlas-surface/50 p-4 text-center text-xs text-atlas-muted ${className}`}
    >
      {label}
    </div>
  )
}

function App() {
  if (ButtonShowcase && window.location.hash === '#ui-kit') {
    return (
      <AppShell title="UI kit (dev)">
        <Suspense fallback={null}>
          <ButtonShowcase />
        </Suspense>
      </AppShell>
    )
  }

  if (MetricsShowcase && window.location.hash === '#ui-metrics') {
    return (
      <AppShell title="Metric states (dev)">
        <Suspense fallback={null}>
          <MetricsShowcase />
        </Suspense>
      </AppShell>
    )
  }

  return (
    <AppShell title="Overview">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section aria-labelledby="metrics-heading" className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 id="metrics-heading" className="text-xl font-semibold">
              Telemetry metrics
            </h2>
            <p className="text-sm text-atlas-muted">
              DEMO data — fictional figures for a demo fleet of {DEMO_SNAPSHOT.fleetSize} agents,{' '}
              {DEMO_SNAPSHOT.window}, as of{' '}
              <time dateTime={DEMO_SNAPSHOT.iso}>{DEMO_SNAPSHOT.label}</time>. Later agent and
              activity samples are a subset and are not expected to add up to these fleet figures.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
            {demoMetrics.map((metric) => (
              <TelemetryMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <section aria-labelledby="ledger-heading" className="flex flex-col gap-3">
          <h2 id="ledger-heading" className="text-sm font-semibold">
            Activity ledger
          </h2>
          <Placeholder label="Placeholder: activity ledger (coming in a later milestone)" className="min-h-64" />
        </section>
      </div>
    </AppShell>
  )
}

export default App
