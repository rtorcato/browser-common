---
name: verify
description: Pre-push sanity check — runs Biome auto-fix, TypeScript typecheck, and Vitest. Use before pushing to `main`, since a push triggers semantic-release. Invoke when the user says "verify", "check before push", or "ready to release".
---

# verify

Direct push to `main` triggers semantic-release on GitLab CI, so there is no PR review gate. Run this before pushing.

## Steps

Run these in sequence. Stop on the first failure and report what broke.

1. `pnpm check:fix` — Biome lint + format with auto-fix. If it modifies files, surface them so the user knows what changed.
2. `pnpm typecheck` — `tsc --noEmit`. Type errors must be fixed, not suppressed.
3. `pnpm test` — Vitest (runs once; not watch mode).

## Reporting

- All three pass: report "Verified. Safe to push." with a one-line summary of any files Biome auto-fixed in step 1.
- Any failure: report which step failed and the relevant error output. Do **not** offer to push or commit.

## Do not

- Do not run `pnpm build-prod` — CI does that.
- Do not commit or push on the user's behalf.
- Do not use `--no-verify` to bypass the husky pre-commit hook.
