# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@rtorcato/browser-common` — TypeScript library of small wrappers around browser Web APIs (clipboard, geolocation, mediadevices, etc.). ESM-only, no runtime framework. Each Web API lives in its own folder under `src/<name>/` and is published as a subpath export (e.g., `@rtorcato/browser-common/clipboard`).

## Package manager & scripts

Use **pnpm** — not npm or yarn. Non-obvious scripts:

- `pnpm check` — Biome lint + format check (read-only)
- `pnpm check:fix` — Biome auto-fix (use this after edits, not `lint`/`format` separately)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm build-prod` — `rimraf dist` + esbuild via `build.mjs` + `tsc --emitDeclarationOnly --project tsconfig.build.json`
- `pnpm commit` — Commitizen prompt; commits must follow Conventional Commits (enforced by commitlint)
- `pnpm changeset` — add a changeset (bump type + summary) for any user-facing change

## Code style (Biome — `biome.jsonc`)

- **Tabs** for indentation (2-space for JSON)
- 100-char line width
- **Single quotes**, **no semicolons**, ES5 trailing commas
- Import organization on
- Lint preset: `recommended`, with `noInferrableTypes` and `useLiteralKeys` disabled

## Dependencies & DRY

Prefer reusing the sibling package **`@rtorcato/js-common`** over re-implementing general-purpose logic. This repo owns **browser Web API wrappers only** (things that touch `window`/`navigator`/`document`); any universal JS/TS utility — string/number/array formatting, `Result`-style error handling (`@rtorcato/js-common/try`), validation, uuid, dates, etc. — should come from js-common instead of being hand-rolled here.

- Import via subpath (e.g. `@rtorcato/js-common/try`) so tree-shaking keeps the bundle minimal — this library ships zero required runtime deps today, so only pull js-common in where a real need exists, never speculatively.
- Browser-specific detection (`isBrowser`, `isMobile`, feature-detect `'X' in window`) stays here in `src/common/` — js-common is Node/universal and does **not** cover it.
- repo-tooling (`@rtorcato/js-common`'s tooling sibling) already supplies shared build/lint/release config — don't duplicate that either. See `pnpm exec repo-tooling doctor` for drift.

## Adding a new module

Three steps — all three are required, or the export won't resolve:

1. Create `src/<name>/index.ts` (and any sibling files the module needs).
2. Add a corresponding entry to the `exports` field in `package.json`:
   ```json
   "./<name>": {
     "import": "./dist/<name>/index.js",
     "types": "./dist/<name>/index.d.ts"
   }
   ```
3. Add a test under `src/tests/`.

`build.mjs` uses `getEntrypointFolders('src')` to pick up new folders automatically, but the `package.json` `exports` map is **not** auto-generated.

## Release process

- Releases use **Changesets**, batched. A PR that changes the published package adds a changeset (`pnpm changeset`). Each push to `main` opens or updates the "Version Packages" PR, which bumps `package.json`'s `version` and writes `CHANGELOG.md`; merging it is the release. Its `publish` job in `.github/workflows/release.yml` waits for one approval in the `release` GitHub environment, because npm's trusted publisher is pinned to `release.yml` + `release`: rename either and publishing fails with `404 package not found`. A manual dispatch (`gh workflow run release.yml`) retries a failed publish.
- Publishes to **npmjs.org** as `@rtorcato/browser-common` (public, with provenance), then tags it and creates the GitHub Release. The docs changelog page is built from the Releases API by `scripts/sync-changelog.mjs`; `release.yml` dispatches `docs.yml` after a publish to rebuild it.
- `pnpm-workspace.yaml` lists `.` so Changesets sees the root package; drop it and every changeset fails with "not in the workspace".
- `[ci skip]` / `[skip ci]` in a commit message suppresses CI.
- Publishing uses npm OIDC trusted publishing — no `NPM_TOKEN` needed. `GITHUB_TOKEN` is provided automatically.

## Repo etiquette

- Husky + lint-staged runs `biome lint` + `biome format` on `*.{js,ts,json,md}` pre-commit. Don't bypass with `--no-verify`.
- Branch flow: work lands directly on `main`. There is no PR review gate — run `pnpm check:fix && pnpm typecheck && pnpm test` (or `/verify`) before pushing. A push to `main` never publishes; merging the Version Packages PR does, after one approval.
- Remote is GitHub (`rtorcato/browser-common`); use `gh` for issues, PRs, and CI status.
