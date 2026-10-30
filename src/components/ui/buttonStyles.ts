export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Shared by Button and IconButton (Figma: 02 — Buttons & Controls).
 * Every class string is written out in full so Tailwind can detect it.
 *
 * Interaction states map to Figma variants:
 *   hover: → State=Hover · active: → State=Pressed
 *   focus-visible: → State=Focus (2px accent ring, 2px offset)
 *   disabled: → State=Disabled (dashed border, no fill, muted text — not opacity alone)
 * `disabled:` utilities are emitted after hover:/active:, so they win.
 */
export const baseClasses =
  'relative inline-flex shrink-0 items-center justify-center border border-transparent font-semibold whitespace-nowrap ' +
  'transition-[background-color,border-color,color,opacity] motion-reduce:transition-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent ' +
  'disabled:cursor-not-allowed disabled:border-dashed disabled:border-atlas-muted disabled:bg-transparent disabled:text-atlas-muted disabled:opacity-100 ' +
  // Invisible hit area: sized per component below, only enlarged on touch (coarse) pointers.
  'before:absolute before:top-1/2 before:left-1/2 before:size-full before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]'

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-atlas-accent text-atlas-on-accent hover:bg-atlas-accent-text active:bg-atlas-accent active:opacity-90',
  secondary:
    'border-atlas-border bg-atlas-hover text-atlas-text hover:bg-atlas-border active:bg-atlas-bg',
  outline:
    'border-atlas-accent bg-transparent text-atlas-accent-text hover:bg-atlas-hover active:bg-atlas-border',
  ghost:
    'bg-transparent text-atlas-muted hover:bg-atlas-hover hover:text-atlas-text active:bg-atlas-border active:text-atlas-text',
}
