import { Brand } from './Brand'
import { NavList } from './NavList'

/** Fixed 256px sidebar, only shown from the `lg` (1024px) breakpoint up. */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-6 border-r border-atlas-border bg-atlas-surface p-4 lg:flex">
      <div className="flex h-10 items-center px-2">
        <Brand />
      </div>
      <NavList />
    </aside>
  )
}
