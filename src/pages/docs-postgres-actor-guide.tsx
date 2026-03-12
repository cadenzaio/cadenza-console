import { DocsShell } from "@/pages/docs-shell";

export const DocsPostgresActorGuide = () => {
    return (
        <DocsShell
            title="PostgresActor Guide"
            description="Build data flows with the canonical PostgresActor API in cadenza-service."
        >
            <div className="flex flex-col gap-8 text-sm text-secondary">
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Mental model</h2>
                    <p>
                        PostgresActor is a specialized actor plugin with durable config/setup state and runtime `pg.Pool`
                        state. It auto-generates CRUD tasks and actor-scoped CRUD intents per table.
                    </p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Canonical creation API</h2>
                    <pre className="overflow-x-auto rounded-xl border border-secondary bg-primary p-4 text-xs text-tertiary">
{`Cadenza.createPostgresActor(serviceName, schema, description?, options?)
Cadenza.createMetaPostgresActor(serviceName, schema, description?, options?)`}
                    </pre>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">When to use what</h2>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Use tasks for local deterministic orchestration in one graph.</li>
                        <li>Use intents when you need request/response semantics.</li>
                        <li>Use signals for async fan-out and event choreography.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Generated operation surface</h2>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>CRUD tasks: query, insert, update, delete.</li>
                        <li>CRUD intents: `query-pg-*`, `insert-pg-*`, `update-pg-*`, `delete-pg-*`.</li>
                        <li>Macro intents: `count-pg-*`, `exists-pg-*`, `one-pg-*`, `aggregate-pg-*`, `upsert-pg-*`.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Canonical markdown sources</h2>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>`cadenza-service/docs/postgres-actor-guide.md`</li>
                        <li>`docs/postgres-actor-guide.md` (workspace mirror)</li>
                    </ul>
                </section>
            </div>
        </DocsShell>
    );
};
