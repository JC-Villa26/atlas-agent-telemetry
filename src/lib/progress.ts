export type StepProgress =
  | { valid: true; completed: number; total: number; ratio: number; percent: number }
  | { valid: false }

/**
 * Safe step maths. Returns `{ valid: false }` for anything that is not a trustworthy
 * "completed of total": non-integers, NaN, Infinity, a total of 0 or less, or a negative count.
 * A completed count above the total is clamped to the total, so ratio is always within 0..1.
 */
export function computeStepProgress(completed: number, total: number): StepProgress {
  if (!Number.isInteger(completed) || !Number.isInteger(total) || total <= 0 || completed < 0) {
    return { valid: false }
  }
  const done = Math.min(completed, total)
  const ratio = done / total
  return { valid: true, completed: done, total, ratio, percent: Math.round(ratio * 100) }
}
