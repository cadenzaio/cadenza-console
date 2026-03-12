import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { DocsIndex } from "@/pages/docs-index";
import { DocsPostgresActorGuide } from "@/pages/docs-postgres-actor-guide";
import { DocsPostgresActorReference } from "@/pages/docs-postgres-actor-reference";
import { HomeScreen } from "@/pages/home-screen";
import { NotFound } from "@/pages/not-found";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/docs" element={<DocsIndex />} />
                        <Route path="/docs/postgres-actor-guide" element={<DocsPostgresActorGuide />} />
                        <Route path="/docs/postgres-actor-reference" element={<DocsPostgresActorReference />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
