import { useId, type ComponentPropsWithRef } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'
import { IconButton } from './IconButton'

export interface SearchFieldProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'onChange' | 'value' | 'id'> {
  label: string
  value: string
  onValueChange: (value: string) => void
  /** Called after the clear button resets the field (e.g. to return focus to the input). */
  onClear?: () => void
}

// Figma: 05 — SearchField. Visible label, 36px field, radius lg, clear = ghost IconButton.
export function SearchField({
  label,
  value,
  onValueChange,
  onClear,
  className,
  ...rest
}: SearchFieldProps) {
  const id = useId()
  return (
    <div className={cx('flex min-w-0 flex-col gap-1', className)}>
      <label htmlFor={id} className="text-xs font-semibold text-atlas-text">
        {label}
      </label>
      <div className="flex min-h-9 items-center gap-2 rounded-lg border border-atlas-border bg-atlas-bg pr-1 pl-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-atlas-accent">
        <Icon name="search" className="size-4 shrink-0 text-atlas-muted [&_path]:[vector-effect:non-scaling-stroke]" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-atlas-text outline-none placeholder:text-atlas-muted [&::-webkit-search-cancel-button]:appearance-none"
          {...rest}
        />
        {value ? (
          <IconButton
            variant="ghost"
            size="sm"
            label="Clear search"
            icon={<Icon name="close" />}
            onClick={() => {
              onValueChange('')
              onClear?.()
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
