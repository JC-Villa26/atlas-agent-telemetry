import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import {
  baseClasses,
  variantClasses,
  type ButtonSize,
  type ButtonVariant,
} from './buttonStyles'

// Figma heights 32 / 40 / 48 (min-h), padding X 12 / 20 / 24, icon gap 4 / 8 / 8,
// radius md / lg / lg, label 12/16 · 14/20 · 16/24 semibold.
// Small and medium are below the 44px touch minimum, so on touch pointers the
// invisible ::before hit area grows to 44px tall without changing the layout.
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-8 gap-1 rounded-md px-3 py-1 text-xs pointer-coarse:before:min-h-11',
  md: 'min-h-10 gap-2 rounded-lg px-5 py-1 text-sm pointer-coarse:before:min-h-11',
  lg: 'min-h-12 gap-2 rounded-lg px-6 py-1 text-base',
}

const iconClasses: Record<ButtonSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Decorative leading icon (hidden from assistive technology). */
  icon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {icon ? (
        <span aria-hidden="true" className={cx('inline-flex shrink-0 *:size-full', iconClasses[size])}>
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  )
}
