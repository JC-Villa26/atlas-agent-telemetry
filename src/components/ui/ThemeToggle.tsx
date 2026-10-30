import { useTheme } from '../../hooks/useTheme'
import { Icon } from './Icon'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-atlas-border text-atlas-muted transition-colors hover:bg-atlas-hover hover:text-atlas-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}
