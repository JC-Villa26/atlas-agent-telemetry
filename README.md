# ATLAS — Autonomous Agent Telemetry Dashboard

ATLAS is a front-end dashboard concept for monitoring fleets of autonomous (AI) agents: fleet-level
telemetry metrics, per-agent execution status, and a searchable log of recent runs. It is built with
React, TypeScript and Tailwind CSS, and designed in Figma first, then implemented component by component.

**Live demo:** <https://atlas-agent-telemetry.vercel.app>

**Design system (Figma):** <https://www.figma.com/design/be6Sy8s9JVWl38trgqOfcz/ATLAS-%E2%80%94-Design-System?node-id=0-1>

> **All data is fictional.** There is no backend, API, authentication or live telemetry. Every number,
> agent and event comes from small deterministic TypeScript files in `src/data/`, anchored to a fixed
> demo snapshot (2026-10-30 10:20 UTC). The interface labels this as demo data.

## What is implemented

- **Application shell** — fixed sidebar from 1024 px; below that, a slide-in navigation drawer built on the
  native `<dialog>` element (focus trap, Escape to close, focus returned to the menu button). A skip link
  jumps to the main content. Only *Overview* is a real destination; the other navigation items are
  labelled "Soon" placeholders.
- **Dark and light themes** — follows the operating-system preference until you choose one with the
  header toggle; the choice is saved in `localStorage`. A small inline script sets the theme before first
  paint to avoid a flash.
- **Telemetry metric cards** — four fleet metrics (active agents, success rate, average latency, tokens
  consumed) with trend direction *and* a text sentiment label. Loading, empty and error card states exist
  as components but are only exercised in the development showcases.
- **Agent status and execution** — four agent cards showing current status (running, idle, completed,
  failed), a progress bar with real step counts, and the outcome of the last finished run. Progress is
  modelled truthfully: a failed run does not render as 100 %, and invalid step counts show "Progress
  unavailable" instead of an invented value.
- **Activity ledger** — seven fictional execution events with:
  - case-insensitive search across agent name, agent ID, run ID and description;
  - outcome filter chips and an agent filter;
  - sorting by newest, oldest or longest duration;
  - a real `<table>` on wide screens and stacked cards on narrower ones (one layout is rendered at a time);
  - empty-dataset and no-results states with a working "Clear filters" action;
  - a compact "Filters" disclosure on small screens.
- **Reusable UI primitives** — buttons, icon buttons, filter chips, search and select fields, and status and
  outcome badges, all driven by semantic color tokens defined in `src/styles/globals.css`.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript 5.9 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 with semantic design tokens (`--color-atlas-*`) |
| Linting | ESLint 10 with `typescript-eslint` and the React Hooks rules |
| Fonts | Inter and JetBrains Mono, loaded from Google Fonts |
| Hosting | Vercel, connected to this GitHub repository |

There are no runtime dependencies beyond React and Tailwind, and no state-management, routing or
data-fetching libraries.

## Design process

ATLAS was designed in Figma before it was built, and the [Figma design system](https://www.figma.com/design/be6Sy8s9JVWl38trgqOfcz/ATLAS-%E2%80%94-Design-System?node-id=0-1)
remains the reference for the interface.

- **Figma first.** Each milestone started as a design: foundations, then reusable components, then
  full dashboard screens.
- **Reusable components.** Buttons and controls, telemetry metric cards, agent status and execution
  components, and the activity ledger are built as component sets with variants and states.
- **Semantic color tokens.** Colors are Figma variables with semantic names (for example `color/border`
  and `color/text-muted`), alongside spacing, radius and layout variables. Their code syntax maps to the
  CSS custom properties in `src/styles/globals.css` (`--color-atlas-border`, `--color-atlas-muted`, ...), so
  design and code share one vocabulary.
- **Dark and light themes.** Every color variable has Dark and Light values. The React app swaps those
  values at the token level, so components never hard-code a theme.
- **Responsive layouts.** The Dashboard Overview is designed at 1440 px (desktop), 768 px (tablet) and
  375 px (mobile), in both themes.
- **From specification to code.** Components are implemented in React and TypeScript and styled with
  Tailwind CSS using those tokens. Spacing, typography, breakpoints and states are taken from the Figma
  specifications, and the Figma file and the code are kept in step when either changes.

## Getting started

Requires Node.js `^20.19.0` or `>=22.12.0` (Vite 8's minimum) and npm.

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check (tsc -b) and produce a production build in dist/
npm run lint     # run ESLint
npm run preview  # serve the production build locally
```

The development server also exposes component showcases that are **not** included in production builds
(they are behind `import.meta.env.DEV`): `/#ui-kit` (buttons and controls), `/#ui-metrics` (metric card
states), `/#ui-agents` (agent and progress edge cases) and `/#ui-ledger` (ledger states and stress data).

## Responsive design

Layouts use Tailwind's rem-based breakpoints, and the few JavaScript media queries use the same rem values
(`src/lib/breakpoints.ts`), so layouts switch together and scale with the browser's default font size
rather than only with viewport width.

| Breakpoint | Behaviour |
| --- | --- |
| below 30 rem (480 px at the default font size) | single-column metric cards |
| from 48 rem (768 px) | two-column agent cards; full ledger toolbar instead of the compact "Filters" disclosure |
| from 64 rem (1024 px) | fixed sidebar replaces the navigation drawer |
| from 80 rem (1280 px) | ledger table replaces stacked rows; four-column metric grid |

## Accessibility approach

Accessibility was designed in from the start, not retrofitted. This is a description of the approach and
what has been checked, **not a claim of WCAG conformance**.

- Semantic structure: one `h1`, ordered headings, labelled landmarks and regions, a skip link, and a
  `<table>` with caption, header scopes, row headers and `aria-sort`.
- Keyboard: all controls are reachable in a logical order with a visible 2 px focus outline; the navigation
  drawer uses the native modal `<dialog>`.
- Status is never conveyed by color alone — every status, outcome and trend pairs color with an icon and a
  text label.
- Progress bars expose real values and descriptive text (including the agent name); indeterminate progress
  never reports a percentage.
- The ledger record count is a polite live region.
- Colors are semantic tokens with contrast checked in both themes; animations respect
  `prefers-reduced-motion`; layouts were checked at enlarged browser default font sizes.
- Verified so far with Lighthouse and axe-core (automated) and manual keyboard checks in Chrome. **No
  screen-reader testing has been done.**

## Development workflow

Work is organised in small milestones, each designed in Figma and then built component by component.
The first milestones were committed directly to `main`; from the Activity Ledger onward, each milestone is
developed on a `feature/*` branch and merged into `main` through a GitHub pull request. Vercel is connected
to the GitHub repository and builds the site from it, so the production demo follows `main`.
A `vercel.json` configures basic security headers (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`) and long-term caching for fingerprinted assets under `/assets/`; no
Content Security Policy is set yet.

## Current limitations

- Demo data only: no backend, live telemetry, authentication or persistence beyond the theme preference.
- Only the Overview page exists; the other navigation entries are placeholders, and there is no router.
- TypeScript's `strict` mode is not enabled yet (only unused-symbol checks are), and there is no automated
  test suite in the repository. Responsive, accessibility and interaction checks have
  so far been run by scripts and manual review outside it.
- Browser testing has been done in Chrome only; Safari and Firefox are untested.
- Fonts are loaded from Google Fonts (a render-blocking third-party request) rather than self-hosted.
- The browser-tab `theme-color` follows the operating-system color scheme, not the in-app theme toggle.
- No license file has been added yet.

## Possible future directions

These are plans, not existing features:

- Replace the demo data with a typed API layer and a real or simulated data source.
- Add routing and the remaining pages (agents, telemetry, activity, settings).
- Add automated unit, end-to-end and accessibility checks to CI.
- Self-host fonts and introduce a Content Security Policy, starting with report-only validation.
- Broaden browser and assistive-technology testing.
