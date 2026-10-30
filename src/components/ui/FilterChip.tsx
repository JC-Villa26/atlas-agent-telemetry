import type { ComponentPropsWithRef } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

export interface FilterChipProps extends Omit<ComponentPropsWithRef<'button'>, 'aria-pressed'> {
  /** Whether this option is the active one. Shown with a check icon, border and text — not colour alone. */
  selected: boolean
}

// Figma: 05 — FilterChip. 32px min height, 12px padding, radius lg, 12px semibold label.
export function FilterChip({ selected, className, children, type = 'button', ...rest }: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx(
        'inline-flex min-h-8 items-center justify-center gap-1 rounded-lg border px-3 text-xs font-semibold whitespace-nowrap',
        'transition-colors motion-reduce:transition-none hover:bg-atlas-hover hover:text-atlas-text',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent',
        selected
          ? 'border-atlas-accent bg-atlas-hover text-atlas-text'
          : 'border-atlas-border bg-transparent text-atlas-muted',
        className,
      )}
      {...rest}
    >
      {selected ? (
        <Icon name="check" className="size-3.5 shrink-0 text-atlas-accent-text [&_path]:[vector-effect:non-scaling-stroke]" />
      ) : null}
      {children}
    </button>
  )
}
