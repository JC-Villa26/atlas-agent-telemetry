/**
 * Fictional activity-ledger events (DEMO). Deterministic: fixed ISO timestamps, no randomness,
 * no backend. An event outcome describes how ONE past execution ended; it is not the agent's
 * current status (see src/data/agents.ts).
 */
import { demoAgents } from './agents'

export type ActivityOutcome = 'succeeded' | 'failed' | 'running' | 'cancelled' | 'unknown'

export interface ActivityEvent {
  /** Unique run identifier (also the unique key). */
  runId: string
  /** ISO 8601, UTC. */
  timestamp: string
  /** References Agent.id in src/data/agents.ts. */
  agentId: string
  agentName: string
  description: string
  /** Whole seconds; null while running or when unknown. */
  durationSeconds: number | null
  outcome: ActivityOutcome
}

const agentNames = new Map(demoAgents.map((agent) => [agent.id, agent.name]))

function event(
  runId: string,
  timestamp: string,
  agentId: string,
  description: string,
  durationSeconds: number | null,
  outcome: ActivityOutcome,
): ActivityEvent {
  return {
    runId,
    timestamp,
    agentId,
    agentName: agentNames.get(agentId) ?? agentId,
    description,
    durationSeconds,
    outcome,
  }
}

/** Seven sample events, oldest first (the UI sorts them; this array is never mutated). */
export const demoEvents: readonly ActivityEvent[] = [
  event('run_20261030_0001', '2026-10-30T08:58:12Z', 'agent_plan_02', 'Generated execution plan for the weekly report', 42, 'succeeded'),
  event('run_20261030_0002', '2026-10-30T09:03:40Z', 'agent_research_01', 'Retrieved 18 source documents', 198, 'succeeded'),
  event('run_20261030_0003', '2026-10-30T09:12:30Z', 'agent_check_03', 'Cancelled by operator during record sampling', 54, 'cancelled'),
  event('run_20261030_0004', '2026-10-30T09:21:05Z', 'agent_check_03', 'Validated 128 of 128 records', 67, 'succeeded'),
  event('run_20261030_0005', '2026-10-30T09:41:19Z', 'agent_flow_04', 'Completed data export workflow', 276, 'succeeded'),
  event('run_20261030_0006', '2026-10-30T10:03:51Z', 'agent_flow_04', 'Data export workflow stopped: dependency check timed out at step 4', 171, 'failed'),
  event('run_20261030_0007', '2026-10-30T10:14:50Z', 'agent_research_01', 'Retrieving source documents for the quarterly review', null, 'running'),
]
