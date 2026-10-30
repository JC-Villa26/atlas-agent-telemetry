import type { ComponentPropsWithRef, ReactNode } from 'react'
import {
  baseClasses,
  cx,
  variantClasses,
  type ButtonSize,
  type ButtonVariant,
} from './buttonStyles'

// Figma visible sizes: 32 / 36 / 44, icons 16 / 20 / 24, radius md / lg / lg.
// Small and medium grow an invisible 44×44 hit area on touch pointers only.
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'size-8 rounded-md pointer-coarse:before:min-h-11 pointer-coarse:before:min-w-11',
  md: 'size-9 rounded-lg pointer-coarse:before:min-h-11 pointer-coarse:before:min-w-11',
  lg: 'size-11 rounded-lg',
}

const iconClasses: Record<ButtonSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export interface IconButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'children' | 'aria-label' | 'aria-labelledby'> {
  /** Required accessible name (rendered as aria-label). */
  label: string
  /** Decorative icon; it is hidden from assistive technology. */
  icon: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

export function IconButton({
  label,
  icon,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      <span aria-hidden="true" className={cx('inline-flex *:size-full', iconClasses[size])}>
        {icon}
      </span>
    </button>
  )
}
