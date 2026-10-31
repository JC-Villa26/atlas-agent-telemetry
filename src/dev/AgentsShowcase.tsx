import { AgentCard } from '../components/ui/AgentCard'
import { AgentStatusBadge } from '../components/ui/AgentStatusBadge'
import { ExecutionProgress } from '../components/ui/ExecutionProgress'
import { demoAgents, type Agent, type AgentProgress, type AgentStatus } from '../data/agents'

const statuses: AgentStatus[] = ['running', 'idle', 'completed', 'failed', 'paused', 'unknown']

const progressCases: Array<{ label: string; progress: AgentProgress; note?: string }> = [
  { label: 'Determinate 4 of 6 (≈67 %)', progress: { mode: 'determinate', completedSteps: 4, totalSteps: 6 }, note: 'Retrieving source documents' },
  { label: 'Determinate 0 of 6', progress: { mode: 'determinate', completedSteps: 0, totalSteps: 6 } },
  { label: 'Determinate 6 of 6 (still “in progress”)', progress: { mode: 'determinate', completedSteps: 6, totalSteps: 6 } },
  { label: 'Indeterminate (no percentage)', progress: { mode: 'indeterminate' }, note: 'Waiting for the agent to report steps' },
  { label: 'Completed 6 of 6', progress: { mode: 'completed', completedSteps: 6, totalSteps: 6 }, note: 'All checks passed' },
  { label: 'Failed 4 of 6 (not 100 %)', progress: { mode: 'failed', completedSteps: 4, totalSteps: 6 }, note: 'Dependency check timed out at step 4.' },
  { label: 'Edge: 7 of 6 → clamped', progress: { mode: 'determinate', completedSteps: 7, totalSteps: 6 } },
  { label: 'Edge: −1 of 6 → unavailable', progress: { mode: 'determinate', completedSteps: -1, totalSteps: 6 } },
  { label: 'Edge: 0 of 0 → unavailable', progress: { mode: 'determinate', completedSteps: 0, totalSteps: 0 } },
  { label: 'Edge: NaN of 6 → unavailable', progress: { mode: 'determinate', completedSteps: Number.NaN, totalSteps: 6 } },
  { label: 'Edge: 3 of Infinity → unavailable', progress: { mode: 'determinate', completedSteps: 3, totalSteps: Number.POSITIVE_INFINITY } },
  { label: 'Edge: 2.5 of 6 → unavailable', progress: { mode: 'determinate', completedSteps: 2.5, totalSteps: 6 } },
  { label: 'Edge: failed 0 of 0 → empty bar', progress: { mode: 'failed', completedSteps: 0, totalSteps: 0 } },
  { label: 'Edge: completed, no totals → full bar', progress: { mode: 'completed', completedSteps: 0, totalSteps: 0 } },
]

const stress: Agent = {
  id: 'agent_research_pipeline_staging_eu_west_01',
  name: 'Research Agent 01 — Quarterly Review Pipeline for the European Region',
  status: 'running',
  task: 'Retrieving and de-duplicating source documents from the shared knowledge base for the quarterly review before ranking',
  progress: { mode: 'determinate', completedSteps: 4, totalSteps: 6 },
  progressNote: 'A deliberately long supporting note to check that wrapping grows the card instead of clipping.',
  lastRun: { outcome: 'succeeded', at: '2026-10-30T09:03:40Z' },
}

// Status and last-run outcome are independent: this idle agent's last run failed.
const idleAfterFailure: Agent = {
  id: 'agent_plan_05',
  name: 'Planning Agent 05',
  status: 'idle',
  task: 'Waiting for the next task',
  lastRun: { outcome: 'failed', at: '2026-10-30T07:12:00Z' },
}

const noHistory: Agent = {
  id: 'agent_new_06',
  name: 'New Agent 06',
  status: 'paused',
  task: 'Paused by an operator before its first run',
}

/** Development-only: open /#ui-agents to inspect badges, progress edge cases and cards. */
export default function AgentsShowcase() {
  return (
    <div className="flex flex-col gap-8" data-testid="agents-kit">
      <p className="text-sm text-atlas-muted">
        Dev-only. Toggle the theme in the header to check both themes.
      </p>

      <section aria-labelledby="k-badges" className="flex flex-col gap-3">
        <h2 id="k-badges" className="text-xl font-semibold">AgentStatusBadge</h2>
        <div className="flex flex-wrap items-center gap-3" data-testid="badges-md">
          {statuses.map((s) => <AgentStatusBadge key={s} status={s} />)}
        </div>
        <div className="flex flex-wrap items-center gap-3" data-testid="badges-sm">
          {statuses.map((s) => <AgentStatusBadge key={s} status={s} size="sm" />)}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {statuses.map((s) => <AgentStatusBadge key={s} status={s} showIcon={false} />)}
          {/* Bad runtime data: must fall back to the neutral Unknown look. */}
          <AgentStatusBadge status={'exploded' as unknown as AgentStatus} />
        </div>
      </section>

      <section aria-labelledby="k-progress" className="flex flex-col gap-3">
        <h2 id="k-progress" className="text-xl font-semibold">ExecutionProgress</h2>
        <div className="grid grid-cols-1 gap-4 min-[30rem]:grid-cols-2 xl:grid-cols-3">
          {progressCases.map((c) => (
            <div key={c.label} className="flex min-w-0 flex-col gap-3 rounded-xl border border-atlas-border bg-atlas-surface p-4">
              <p className="font-mono text-xs text-atlas-muted">{c.label}</p>
              <ExecutionProgress progress={c.progress} description={c.note} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="k-compact" className="flex flex-col gap-3">
        <h2 id="k-compact" className="text-xl font-semibold">AgentCard · compact</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...demoAgents, stress, idleAfterFailure, noHistory].map((a) => (
            <AgentCard key={a.id} agent={a} density="compact" />
          ))}
        </div>
      </section>

      <section aria-labelledby="k-expanded" className="flex flex-col gap-3">
        <h2 id="k-expanded" className="text-xl font-semibold">AgentCard · expanded</h2>
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {[...demoAgents, stress, idleAfterFailure, noHistory].map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      </section>
    </div>
  )
}
