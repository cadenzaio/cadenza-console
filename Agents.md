# Repo-Specific Agent Rules

This document defines repository-level execution rules.

Global workflow governance (WIP limits, clarification protocol,
assumptions policy, complexity gate, contract governance)
is defined in the workspace root AGENTS.md.

If conflict exists:
- Root AGENTS.md governs workflow and process.
- This file governs tooling, commands, and repo-specific constraints.

---

# 1. Repository Overview

Name: cadenza-ui
Purpose: UI/prototype surface for exploring and visualizing Cadenza concepts.
Owner Domain: Frontend UI experimentation (non-authority for core/service/db contracts).

Boundaries:
- Do NOT modify other repos from here.
- Cross-repo changes must follow workspace multi-repo discipline.
- This repo should not redefine backend or DB authority contracts.

---

# 2. Local Development Commands

Use these canonical commands. Do not invent alternatives.

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Test

Not configured in this repo right now (no test script).

## Typecheck

```bash
npx tsc -b
```

## Format

```bash
npx prettier --check .
```

If CI uses a specific command, prefer that command.

# 3. Pre-PR Checklist (Repo-Specific)

## Before opening PR:

- [ ] Install succeeds
- [ ] Typecheck passes
- [ ] Build passes
- [ ] No console logs left
- [ ] No commented-out code
- [ ] No debug artifacts

If this repo exposes contracts:

- [ ] Contract changes propagated per workspace rules

# 4. Environment & Configuration

Required environment variables:

- None required by current source for standard local dev.

Local dev setup notes:

- Start locally with `npm run dev`.
- This repository currently behaves as a UI/prototype surface and may contain experimental/outdated areas.

Never hardcode secrets.

Never commit .env files.

# 5. Testing Rules

Test expectations:

- If new logic is stable and not throwaway prototype code, add tests before merge.
- Regression tests required for bug fixes when test harness is introduced/available.
- Snapshot updates must be intentional.

# 6. Contract Responsibilities

This repo is not a contract authority for core primitives, service sync payloads, or DB schema.

- If UI changes require contract updates, open linked issues/PRs in authority repos.

# 7. Logging & Observability

- Avoid logging sensitive data.
- Remove temporary debug logs before merge.

# 8. Performance & Safety Constraints

- Keep bundle growth controlled.
- Avoid long synchronous work in render paths.
- Validate external data before rendering.

# 9. Repo-Specific Anti-Patterns

Do NOT:

- Treat this repo as source of truth for backend contracts.
- Introduce heavy dependencies without clear UI need.
- Disable checks to force builds.

# 10. Documentation Discipline

If you modify:

- Build system
- Public UI architecture
- Integration assumptions with service/db

Update:

- README.md
- This Agents.md (if command/process changes)
- Relevant UI docs

# 11. Execution Principle

Within this repo:

- Prefer small, incremental changes.
- Mark prototype-only behavior clearly.
- If uncertain, trigger clarification per root policy.

When in doubt: stop and ask.

# Agents Notes: cadenza-ui

## What I have learned

- This repo is currently a UI-focused project with prototype characteristics.
- It is not currently the authority for Cadenza runtime or schema contracts.
- Build path is Vite + TypeScript (`npm run build` runs `tsc -b && vite build`).

## Current status assumptions

- Parts of this repo may be outdated while workspace restructuring continues.
- Treat changes here as UI-layer only unless explicitly coordinated with authority repos.

## What I will keep learning in this discussion

- Which UI surfaces are still active vs deprecated.
- Which API/metadata views should be considered authoritative integrations.
- How UI automation should consume cross-repo contract maps from workspace root.
