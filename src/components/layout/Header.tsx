import { ThemeToggle } from '../ui/ThemeToggle'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-atlas-border bg-atlas-bg/80 px-4 backdrop-blur sm:px-6 lg:px-8">
      <IconButton
        label="Open navigation"
        icon={<Icon name="menu" />}
        onClick={onMenuClick}
        className="lg:hidden"
      />

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
