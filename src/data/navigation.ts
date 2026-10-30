export type IconName = 'overview' | 'agents' | 'telemetry' | 'activity' | 'settings'

export interface NavItem {
  id: string
  label: string
  icon: IconName
  /** Real route target. Items without one are placeholders for later milestones. */
  href?: string
}

export const ACTIVE_NAV_ID = 'overview'

export const navigation: readonly NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'overview', href: '#overview' },
  { id: 'agents', label: 'Agents', icon: 'agents' },
  { id: 'telemetry', label: 'Telemetry', icon: 'telemetry' },
  { id: 'activity', label: 'Activity', icon: 'activity' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]
