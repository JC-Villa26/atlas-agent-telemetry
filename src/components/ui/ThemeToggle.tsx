import { useTheme } from '../../hooks/useTheme'
import { Icon } from './Icon'
import { IconButton } from './IconButton'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <IconButton
      label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      icon={<Icon name={theme === 'dark' ? 'sun' : 'moon'} />}
      onClick={toggleTheme}
    />
  )
}
