import { useId, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

export interface SelectFieldProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  /** <option> elements. */
  children: ReactNode
  className?: string
}

// Figma: 05 — SelectField. A native <select> (keyboard + screen-reader support for free),
// restyled: 36px, radius lg, bg + control-border tokens, chevron icon.
export function SelectField({ label, value, onValueChange, children, className }: SelectFieldProps) {
  const id = useId()
  return (
    <div className={cx('flex min-w-0 flex-col gap-1', className)}>
      <label htmlFor={id} className="text-xs font-semibold text-atlas-text">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className="min-h-9 w-full appearance-none rounded-lg border border-atlas-control-border bg-atlas-bg py-1.5 pr-9 pl-3 text-sm text-atlas-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
        >
          {children}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-atlas-muted [&_path]:[vector-effect:non-scaling-stroke]"
        />
      </div>
    </div>
  )
}
