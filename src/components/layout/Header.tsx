import { ThemeToggle } from '../ui/ThemeToggle'
import { Icon } from '../ui/Icon'

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-atlas-border bg-atlas-bg/80 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="inline-flex size-9 items-center justify-center rounded-lg border border-atlas-border text-atlas-muted transition-colors hover:bg-atlas-hover hover:text-atlas-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent lg:hidden"
      >
        <Icon name="menu" />
      </button>

      <h1 className="min-w-0 truncate text-base font-semibold tracking-tight">{title}</h1>

      <span className="rounded-full border border-atlas-accent/40 bg-atlas-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-atlas-accent-text">
        Demo
      </span>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
