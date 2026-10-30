import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'atlas-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/**
 * Theme preference: a saved choice wins; otherwise follow the OS setting.
 * The `data-theme` attribute is also set early by an inline script in
 * index.html so the first paint has no flash.
 */
export function useTheme() {
  const [stored, setStored] = useState<Theme | null>(readStored)
  const [system, setSystem] = useState<Theme>(systemTheme)

  const theme = stored ?? system

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = () => setSystem(media.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setStored(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable (private mode etc.): the choice lasts for this session only.
    }
  }, [theme])

  return { theme, toggleTheme }
}
