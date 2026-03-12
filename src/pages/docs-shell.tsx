import type { PropsWithChildren } from "react";
import { Link } from "react-router";

type DocsShellProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

export const DocsShell = ({ title, description, children }: DocsShellProps) => {
    return (
        <main className="min-h-screen bg-primary px-4 py-12 md:px-10 md:py-16">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <header className="flex flex-col gap-4">
                    <Link className="text-sm font-medium text-brand-secondary hover:text-brand-primary" to="/docs">
                        Documentation
                    </Link>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-display-sm font-semibold text-primary md:text-display-md">{title}</h1>
                        <p className="max-w-3xl text-md text-tertiary md:text-lg">{description}</p>
                    </div>
                </header>
                <section className="rounded-2xl border border-secondary bg-secondary/30 p-6 md:p-8">{children}</section>
            </div>
        </main>
    );
};
