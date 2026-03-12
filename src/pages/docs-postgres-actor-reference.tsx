import { DocsShell } from "@/pages/docs-shell";

export const DocsPostgresActorReference = () => {
    return (
        <DocsShell
            title="PostgresActor Reference"
            description="Canonical API, generated artifacts, payload contracts, and safety behavior."
        >
            <div className="flex flex-col gap-8 text-sm text-secondary">
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Generated artifacts per table</h2>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Tasks: `Query`, `Insert`, `Update`, `Delete`.</li>
                        <li>
                            CRUD intents: <code>query-pg-{"{actor}"}-{"{table}"}</code>, <code>insert-pg-*</code>,{" "}
                            <code>update-pg-*</code>, <code>delete-pg-*</code>.
                        </li>
                        <li>Macros: `count-pg-*`, `exists-pg-*`, `one-pg-*`, `aggregate-pg-*`, `upsert-pg-*`.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Core payloads</h2>
                    <pre className="overflow-x-auto rounded-xl border border-secondary bg-primary p-4 text-xs text-tertiary">
{`query:    { queryData: { filter?, select?, sort?, limit?, offset?, joins?, queryMode? } }
insert:   { queryData: { data } }
update:   { queryData: { data, filter? } }
delete:   { queryData: { filter? } }
count:    { queryData: { filter? } }
exists:   { queryData: { filter? } }
one:      { queryData: { filter?, sort? } }
aggregate:{ queryData: { filter?, groupBy?, aggregates, sort?, limit?, offset? } }
upsert:   { queryData: { data, conflictTargets, updateColumns? } }`}
                    </pre>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Safety defaults</h2>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Identifier allowlists from schema for table/field/order/join keys.</li>
                        <li>Parameterized SQL only for values (no raw value interpolation).</li>
                        <li>Transaction begin/commit/rollback safety for multi-step paths.</li>
                        <li>Bounded retry and timeout handling for transient DB failures.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-primary">Canonical markdown sources</h2>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>`cadenza-service/docs/postgres-actor-reference.md`</li>
                        <li>`docs/postgres-actor-reference.md` (workspace mirror)</li>
                    </ul>
                </section>
            </div>
        </DocsShell>
    );
};
