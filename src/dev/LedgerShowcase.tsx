import { ActivityLedger } from '../components/ledger/ActivityLedger'
import { ActivityOutcomeBadge } from '../components/ui/ActivityOutcomeBadge'
import { demoAgents } from '../data/agents'
import { demoEvents, type ActivityEvent, type ActivityOutcome } from '../data/ledger'
import { latestFinishedByAgent } from '../lib/ledger'

const outcomes: ActivityOutcome[] = ['succeeded', 'failed', 'running', 'cancelled', 'unknown']

const stress: ActivityEvent[] = [
  {
    runId: 'run_20261030_0008_retry_attempt_03_with_a_very_long_suffix',
    timestamp: '2026-10-30T09:48:31Z',
    agentId: 'agent_research_pipeline_staging_eu_west_01',
    agentName: 'Research Agent 01 — Quarterly Review Pipeline for the European Region',
    description:
      'Data export workflow stopped after repeated dependency check timeouts while waiting for the upstream document index to finish rebuilding, so the remaining steps were skipped',
    durationSeconds: 760,
    outcome: 'failed',
  },
  // Same timestamp as an existing event: ordering must stay deterministic.
  { ...demoEvents[1], runId: 'run_20261030_0002b', description: 'Same-timestamp tie-break example' },
]

// Cross-check: each agent's lastRun must match its latest finished ledger event.
function consistency() {
  const latest = latestFinishedByAgent(demoEvents)
  return demoAgents.map((a) => {
    const e = latest.get(a.id)
    const ok = !!e && !!a.lastRun && Date.parse(e.timestamp) === Date.parse(a.lastRun.at) && e.outcome === a.lastRun.outcome
    return { id: a.id, status: a.status, ledger: e ? `${e.runId} ${e.outcome} ${e.timestamp}` : 'none', agent: a.lastRun ? `${a.lastRun.outcome} ${a.lastRun.at}` : 'none', ok }
  })
}

/** Development-only: open /#ui-ledger to inspect every ledger state, long text and data consistency. */
export default function LedgerShowcase() {
  const rows = consistency()
  return (
    <div className="flex flex-col gap-8" data-testid="ledger-kit">
      <p className="text-sm text-atlas-muted">Dev-only. Loading, error and empty states are presentation only.</p>

      <section aria-labelledby="l-badges" className="flex flex-col gap-3">
        <h2 id="l-badges" className="text-xl font-semibold">ActivityOutcomeBadge</h2>
        <div className="flex flex-wrap gap-3" data-testid="outcome-badges">
          {outcomes.map((o) => <ActivityOutcomeBadge key={o} outcome={o} />)}
          {outcomes.map((o) => <ActivityOutcomeBadge key={o + 'md'} outcome={o} size="md" />)}
        </div>
      </section>

      <section aria-labelledby="l-consistency" className="flex flex-col gap-3" data-testid="consistency">
        <h2 id="l-consistency" className="text-xl font-semibold">Agent ↔ ledger consistency</h2>
        <ul className="flex flex-col gap-1 font-mono text-xs text-atlas-muted">
          {rows.map((r) => (
            <li key={r.id} data-ok={r.ok}>
              {r.ok ? 'PASS' : 'FAIL'} · {r.id} (status {r.status}) · agent lastRun {r.agent} · ledger {r.ledger}
            </li>
          ))}
        </ul>
      </section>

      <div data-testid="ledger-ready"><ActivityLedger events={demoEvents} /></div>
      <div data-testid="ledger-stress"><ActivityLedger events={[...demoEvents, ...stress]} /></div>
      <div data-testid="ledger-loading"><ActivityLedger events={demoEvents} state="loading" /></div>
      <div data-testid="ledger-error"><ActivityLedger events={demoEvents} state="error" /></div>
      <div data-testid="ledger-empty"><ActivityLedger events={[]} /></div>
    </div>
  )
}
