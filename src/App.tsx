import { lazy, Suspense } from 'react'
import { AppShell } from './components/layout/AppShell'
import { ActivityLedger } from './components/ledger/ActivityLedger'
import { AgentCard } from './components/ui/AgentCard'
import { TelemetryMetricCard } from './components/ui/TelemetryMetricCard'
import { demoAgents } from './data/agents'
import { demoEvents } from './data/ledger'
import { DEMO_SNAPSHOT, demoMetrics } from './data/telemetry'

// Dev-only visual check (open /#ui-kit). `import.meta.env.DEV` is false in production
// builds, so this branch and the showcase module are removed from the bundle.
const ButtonShowcase = import.meta.env.DEV ? lazy(() => import('./dev/ButtonShowcase')) : null
const MetricsShowcase = import.meta.env.DEV ? lazy(() => import('./dev/MetricsShowcase')) : null
const AgentsShowcase = import.meta.env.DEV ? lazy(() => import('./dev/AgentsShowcase')) : null
const LedgerShowcase = import.meta.env.DEV ? lazy(() => import('./dev/LedgerShowcase')) : null

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

  if (AgentsShowcase && window.location.hash === '#ui-agents') {
    return (
      <AppShell title="Agent UI (dev)">
        <Suspense fallback={null}>
          <AgentsShowcase />
        </Suspense>
      </AppShell>
    )
  }

  if (LedgerShowcase && window.location.hash === '#ui-ledger') {
    return (
      <AppShell title="Ledger UI (dev)">
        <Suspense fallback={null}>
          <LedgerShowcase />
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

        <section aria-labelledby="agents-heading" className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 id="agents-heading" className="text-xl font-semibold">
              Agent execution
            </h2>
            <p className="text-sm text-atlas-muted">
              DEMO data — a sample of 4 of the {DEMO_SNAPSHOT.fleetSize} demo agents. The badge shows
              what each agent is doing now; “Last run” shows how its most recent finished execution
              ended (UTC).
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
            {demoAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>

        <ActivityLedger events={demoEvents} />
      </div>
    </AppShell>
  )
}

export default App
