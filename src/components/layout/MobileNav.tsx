import { useEffect, useRef } from 'react'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'
import { Brand } from './Brand'
import { NavList } from './NavList'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

/**
 * Slide-in drawer built on the native <dialog> element. showModal() gives us
 * the focus trap, Escape-to-close, inert page behind it, and focus return to
 * the opener for free.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // If the window grows to desktop width, the drawer has no reason to stay open.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => media.matches && onClose()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      aria-label="Main navigation"
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the backdrop land on the <dialog> itself, not its children.
        if (event.target === event.currentTarget) onClose()
      }}
      className="atlas-drawer m-0 h-full max-h-none w-72 max-w-[85vw] border-r border-atlas-border bg-atlas-surface p-0 text-atlas-text backdrop:bg-black/60 lg:hidden"
    >
      <div className="flex h-full flex-col gap-6 p-4">
        <div className="flex h-10 items-center justify-between px-2">
          <Brand />
          <IconButton
            variant="ghost"
            label="Close navigation"
            icon={<Icon name="close" />}
            onClick={onClose}
          />
        </div>
        <NavList onNavigate={onClose} />
      </div>
    </dialog>
  )
}
