import { DemoTag } from '../ui/DemoTag'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'

interface HeaderProps {
  title: string
  /** Render the label as the page's h1. Leave off when the page content provides its own h1. */
  titleAsHeading?: boolean
  onMenuClick: () => void
}

export function Header({ title, titleAsHeading = false, onMenuClick }: HeaderProps) {
  const Title = titleAsHeading ? 'h1' : 'p'
  return (
    <header className="@container sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-atlas-border bg-atlas-bg/80 px-4 backdrop-blur sm:px-6 lg:px-8">
      <IconButton
        label="Open navigation"
        icon={<Icon name="menu" />}
        onClick={onMenuClick}
        className="lg:hidden"
      />

      <Title className="min-w-0 truncate text-base font-semibold tracking-tight">{title}</Title>

      {/* Dropped only when the header is too narrow to hold it (huge font on a tiny screen); the intro below still says "Demo". */}
      <DemoTag className="@max-[9.5rem]:hidden" />

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
