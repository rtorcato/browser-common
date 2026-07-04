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
- `pnpm commit` — Commitizen prompt; commits must follow Conventional Commits (enforced by commitlint + semantic-release)

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
- js-tooling (`@rtorcato/js-common`'s tooling sibling) already supplies shared build/lint/release config — don't duplicate that either. See `pnpm exec js-tooling doctor` for drift.

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

- Direct commits to `main` trigger semantic-release via `.github/workflows/ci.yml`.
- Publishes to **npmjs.org** as `@rtorcato/browser-common` (public, with provenance).
- Commit messages drive the version bump — use Conventional Commits (`feat:`, `fix:`, `chore:`, etc.). `chore(release):` commits are made by the bot; don't author them by hand.
- `[ci skip]` / `[skip ci]` in a commit message suppresses CI.
- Required GitHub repo secrets: `NPM_TOKEN` (automation token from npmjs.org). `GITHUB_TOKEN` is provided automatically.
- Release config (`release.config.mjs`) re-exports the shared preset from `@rtorcato/js-tooling/semantic-release/github`.

## Repo etiquette

- Husky + lint-staged runs `biome lint` + `biome format` on `*.{js,ts,json,md}` pre-commit. Don't bypass with `--no-verify`.
- Branch flow: work lands directly on `main`. There is no PR review gate — run `pnpm check:fix && pnpm typecheck && pnpm test` (or `/verify`) before pushing, since the next push releases a version.
- Remote is GitHub (`rtorcato/browser-common`); use `gh` for issues, PRs, and CI status.
