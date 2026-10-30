import { ACTIVE_NAV_ID, navigation } from '../../data/navigation'
import { Icon } from '../ui/Icon'

const base =
  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent'

interface NavListProps {
  /** Called after the active link is chosen (lets the mobile drawer close itself). */
  onNavigate?: () => void
}

export function NavList({ onNavigate }: NavListProps) {
  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col gap-1">
        {navigation.map((item) => (
          <li key={item.id}>
            {item.id === ACTIVE_NAV_ID && item.href ? (
              <a
                href={item.href}
                aria-current="page"
                onClick={onNavigate}
                className={`${base} bg-atlas-accent/15 text-atlas-text`}
              >
                <Icon name={item.icon} className="size-5 text-atlas-accent" />
                {item.label}
              </a>
            ) : (
              <button
                type="button"
                aria-disabled="true"
                title="Coming soon"
                className={`${base} cursor-not-allowed text-atlas-muted/70`}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <span className="ml-auto rounded border border-atlas-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                  Soon
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
