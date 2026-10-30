/**
 * Fictional agent data (DEMO). Deterministic: fixed ISO timestamps, no randomness, no backend.
 * Agent status (what the agent is doing NOW) and last-run outcome (how its most recent FINISHED
 * run ended) are separate concepts and are modelled separately.
 */

export type AgentStatus = 'running' | 'idle' | 'completed' | 'failed' | 'paused' | 'unknown'
export type RunOutcome = 'succeeded' | 'failed'

export type AgentProgress =
  | { mode: 'determinate'; completedSteps: number; totalSteps: number }
  | { mode: 'indeterminate' }
  | { mode: 'completed'; completedSteps: number; totalSteps: number }
  | { mode: 'failed'; completedSteps: number; totalSteps: number }

export interface LastRun {
  outcome: RunOutcome
  /** ISO 8601, UTC. */
  at: string
}

export interface Agent {
  /** Technical identifier, also used as the unique key. */
  id: string
  name: string
  status: AgentStatus
  /** Current task or state description. */
  task: string
  /** Present while an execution is running, finished or failed. */
  progress?: AgentProgress
  /** Short supporting line shown under the progress bar. */
  progressNote?: string
  lastRun?: LastRun
}

/**
 * A sample of the demo fleet. The Overview metrics describe a broader fleet of 24 agents;
 * these four are a subset and are not expected to add up to those figures.
 */
export const demoAgents: readonly Agent[] = [
  {
    id: 'agent_research_01',
    name: 'Research Agent 01',
    status: 'running',
    task: 'Retrieving source documents',
    progress: { mode: 'determinate', completedSteps: 4, totalSteps: 6 },
    // Its previous finished run (run_20261030_0002).
    lastRun: { outcome: 'succeeded', at: '2026-10-30T09:03:40Z' },
  },
  {
    id: 'agent_plan_02',
    name: 'Planning Agent 02',
    status: 'idle',
    task: 'Waiting for the next task',
    lastRun: { outcome: 'succeeded', at: '2026-10-30T08:58:12Z' },
  },
  {
    id: 'agent_check_03',
    name: 'Validation Agent 03',
    status: 'completed',
    task: 'Validated 128 of 128 records',
    progress: { mode: 'completed', completedSteps: 6, totalSteps: 6 },
    progressNote: 'All checks passed',
    lastRun: { outcome: 'succeeded', at: '2026-10-30T09:21:05Z' },
  },
  {
    id: 'agent_flow_04',
    name: 'Workflow Agent 04',
    status: 'failed',
    task: 'Execution stopped before the final step',
    progress: { mode: 'failed', completedSteps: 4, totalSteps: 6 },
    progressNote: 'Dependency check timed out at step 4.',
    lastRun: { outcome: 'failed', at: '2026-10-30T10:03:51Z' },
  },
]
