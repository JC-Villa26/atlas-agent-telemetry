import { AppShell } from './components/layout/AppShell'

const metricSlots = ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4']

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
  return (
    <AppShell title="Overview">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className="sr-only">
            Telemetry metrics
          </h2>
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
            {metricSlots.map((slot) => (
              <Placeholder
                key={slot}
                label={`Placeholder: telemetry metric (${slot})`}
                className="min-h-28"
              />
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
