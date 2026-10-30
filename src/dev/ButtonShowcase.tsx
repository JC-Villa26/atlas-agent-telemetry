import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { IconButton } from '../components/ui/IconButton'
import type { ButtonSize, ButtonVariant } from '../components/ui/buttonStyles'

const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']

/**
 * Development-only visual check for Button and IconButton.
 * Open the dev server at /#ui-kit. It is excluded from production builds
 * (see App.tsx: import.meta.env.DEV).
 */
export default function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-8" data-testid="ui-kit">
      <p className="text-sm text-atlas-muted">
        Dev-only. Hover, press and Tab to see the states; the disabled row is static.
      </p>
      {variants.map((variant) => (
        <section key={variant} className="flex flex-col gap-3" aria-label={`${variant} buttons`}>
          <h2 className="text-sm font-semibold">Button · {variant}</h2>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                Button {size}
              </Button>
            ))}
            {sizes.map((size) => (
              <Button
                key={`icon-${size}`}
                variant={variant}
                size={size}
                icon={<Icon name="refresh" />}
              >
                Refresh
              </Button>
            ))}
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </div>
        </section>
      ))}
      {variants.map((variant) => (
        <section key={variant} className="flex flex-col gap-3" aria-label={`${variant} icon buttons`}>
          <h2 className="text-sm font-semibold">IconButton · {variant}</h2>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map((size) => (
              <IconButton
                key={size}
                variant={variant}
                size={size}
                label={`Refresh telemetry (${size})`}
                icon={<Icon name="refresh" />}
              />
            ))}
            <IconButton variant={variant} label="Open navigation (disabled)" icon={<Icon name="menu" />} disabled />
          </div>
        </section>
      ))}
      <section className="flex flex-col gap-3" aria-label="Status token check">
        <h2 className="text-sm font-semibold">Status tokens</h2>
        <p className="flex flex-wrap gap-4 font-mono text-sm">
          <span className="text-atlas-success">success</span>
          <span className="text-atlas-danger">danger</span>
          <span className="text-atlas-warning">warning</span>
        </p>
      </section>
    </div>
  )
}
