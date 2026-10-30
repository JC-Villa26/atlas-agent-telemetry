/** Formats an ISO timestamp as "YYYY-MM-DD HH:MM UTC" (deterministic, no locale or local time zone). */
export function formatUtcMinute(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/** "YYYY-MM-DD" in UTC. */
export function formatUtcDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`
}

/** "HH:MM:SS UTC". */
export function formatUtcTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())} UTC`
}

/** Compact duration: "42 s", "3 m 18 s", "1 m 07 s". Unknown or still running → em dash. */
export function formatDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return '\u2014'
  const whole = Math.round(seconds)
  if (whole < 60) return `${whole} s`
  return `${Math.floor(whole / 60)} m ${pad2(whole % 60)} s`
}

/** Spoken duration for assistive technology. */
export function describeDuration(seconds: number | null, running = false): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) {
    return running ? 'still running' : 'not available'
  }
  const whole = Math.round(seconds)
  const m = Math.floor(whole / 60)
  const sec = whole % 60
  const parts = []
  if (m > 0) parts.push(`${m} ${m === 1 ? 'minute' : 'minutes'}`)
  if (sec > 0 || m === 0) parts.push(`${sec} ${sec === 1 ? 'second' : 'seconds'}`)
  return parts.join(' ')
}
