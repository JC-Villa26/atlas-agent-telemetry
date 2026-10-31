import { cx } from '../../lib/cx'

/** Figma: "Demo tag" / "Demo indicator" — 12px mono label, border token, no fill. */
export function DemoTag({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        'shrink-0 rounded-full border border-atlas-border px-2 py-1 font-mono text-xs font-medium tracking-wider text-atlas-accent-text uppercase',
        className,
      )}
    >
      Demo
    </span>
  )
}
