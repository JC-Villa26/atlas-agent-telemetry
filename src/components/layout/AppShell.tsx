import { useCallback, useState, type ReactNode } from 'react'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

interface AppShellProps {
  /** Short page label shown in the sticky header. */
  title: string
  /** Make the header label the page's h1 (only for pages whose content has no h1). */
  titleAsHeading?: boolean
  children: ReactNode
}

export function AppShell({ title, titleAsHeading, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="min-h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-atlas-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-atlas-on-accent"
      >
        Skip to content
      </a>
      <Sidebar />
      <MobileNav open={mobileOpen} onClose={closeMobile} />
      <div className="flex min-h-svh min-w-0 flex-col lg:pl-64">
        <Header title={title} titleAsHeading={titleAsHeading} onMenuClick={() => setMobileOpen(true)} />
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
