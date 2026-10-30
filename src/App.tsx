function App() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-atlas-border bg-atlas-surface p-6 shadow-2xl shadow-black/40 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-atlas-border px-3 py-1 text-xs font-medium tracking-wide text-atlas-muted">
          <span className="size-2 rounded-full bg-atlas-accent" />
          Tailwind CSS v4 is working
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to <span className="text-atlas-accent">ATLAS</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-atlas-muted sm:text-lg">
          Autonomous Agent Telemetry Dashboard. Observe, trace, and understand
          your agents in one place.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-lg bg-atlas-accent px-5 py-2.5 text-sm font-semibold text-atlas-bg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
          >
            Get started
          </button>
          <button
            type="button"
            className="rounded-lg border border-atlas-border px-5 py-2.5 text-sm font-semibold text-atlas-text transition hover:bg-atlas-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
          >
            Documentation
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
