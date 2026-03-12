import { Link } from "react-router";

export const DocsIndex = () => {
    return (
        <main className="min-h-screen bg-primary px-4 py-12 md:px-10 md:py-16">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <header className="flex flex-col gap-3">
                    <h1 className="text-display-sm font-semibold text-primary md:text-display-md">Documentation</h1>
                    <p className="max-w-3xl text-md text-tertiary md:text-lg">
                        Canonical docs for PostgresActor are split into a guide and a reference. Both pages are mirrored
                        between `cadenza-service/docs` and workspace `docs`.
                    </p>
                </header>

                <section className="grid gap-4 md:grid-cols-2">
                    <Link
                        className="rounded-2xl border border-secondary bg-secondary/30 p-6 transition hover:border-brand-secondary hover:bg-secondary/50"
                        to="/docs/postgres-actor-guide"
                    >
                        <h2 className="text-xl font-semibold text-primary">PostgresActor Guide</h2>
                        <p className="mt-2 text-sm text-tertiary">
                            End-user guide: schema design, generated operations, and when to use tasks, intents, or signals.
                        </p>
                    </Link>

                    <Link
                        className="rounded-2xl border border-secondary bg-secondary/30 p-6 transition hover:border-brand-secondary hover:bg-secondary/50"
                        to="/docs/postgres-actor-reference"
                    >
                        <h2 className="text-xl font-semibold text-primary">PostgresActor Reference</h2>
                        <p className="mt-2 text-sm text-tertiary">
                            API and contract reference: generated intent names, payload shapes, operation semantics, and safety.
                        </p>
                    </Link>
                </section>
            </div>
        </main>
    );
};
