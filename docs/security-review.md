# Security & Dependability Review (TSIS #01, Task #06)

Status: reviewed 2026-11-24 against the deployed site and the current codebase (commit `2da76b1` and
after). Findings are graded Pass / Minor (non-blocking, worth fixing) / Risk (should be addressed).

## 1. HTTPS

- **Pass.** Render auto-provisions TLS for the `onrender.com` subdomain and forces HTTPS: `curl -I`
  against the plain `http://` URL returns `301 → https://` (verified in `docs/testing.md` §4). No
  certificate warnings were seen loading the site in-browser.
- **Minor.** No `Strict-Transport-Security` (HSTS) header was observed on the HTTPS response. The
  redirect already protects every visit, so this isn't exploitable today, but adding
  `Strict-Transport-Security: max-age=31536000; includeSubDomains` (via `next.config.ts` `headers()`)
  would stop a visitor's browser from ever attempting plain HTTP again, even across future visits —
  recommended, not required for a static personal site with no login.
- No mixed content: all assets (fonts, images, scripts) are same-origin or `next/font` self-hosted,
  nothing is fetched over plain `http://`.

## 2. Input validation

- **Pass.** The only place the site accepts visitor input is the contact form, and it's validated
  **twice**: client-side via HTML5 `required`/pattern-ish placeholders (defense against accidental
  empty submits, confirmed in `docs/testing.md` T12) and, more importantly, **server-side** in
  `app/api/contact/route.ts` — every field is re-validated there regardless of what the client sent:
  - `name`/`message`: must be a non-empty string after `.trim()`.
  - `callbackMethod`: must be exactly one of the fixed enum `whatsapp | telegram | email` (checked
    against an allow-list, not a deny-list).
  - `callbackValue`: must match a format regex specific to the chosen method (phone-ish for
    WhatsApp, `@handle`-ish for Telegram, email-shaped for Email) — covered by automated tests
    (`docs/testing.md` T18).
  - A non-JSON or malformed body is rejected with `400 invalid_body` before any field is even read.
- Server-side validation is what actually matters here (client-side checks are only a UX nicety —
  anyone can bypass them with a direct `curl`), and that's exactly what's enforced: the route never
  trusts the client's own validation.

## 3. Secret handling

- **Pass.** `BOT_TOKEN` and `CHAT_ID` are read in exactly one server-only module
  (`src/lib/telegram.ts`, guarded by the `server-only` package which hard-fails the build if ever
  imported into a client bundle) and nowhere else in the codebase (re-confirmed by the project's
  code-reviewer agent in an earlier pass, and by grep in this review).
- Never logged, never echoed back in any API response (the `catch` block in the API route explicitly
  discards the upstream error detail — unit-tested in `docs/testing.md` T18 to confirm the string
  `"test-token"` never appears in a failure response).
- Never committed: `.env` is git-ignored; `.env.example` (tracked) only lists the variable *names*
  with empty placeholder values. `infra/render.yaml` declares both vars with `sync: false`, meaning
  Render stores the real values in its own dashboard, never in the repository.
- `.claude/settings.json` denies Read/Bash/PowerShell access to `.env` and its non-template variants
  for this project's AI tooling specifically — a belt-and-suspenders control on top of `.gitignore`,
  scoped narrowly enough (§ narrowed earlier this project) to not block the legitimate
  `.env.example` template.
- **Minor.** Render's `rndr-id` and `cf-cache-status`/`CF-RAY` headers (Cloudflare/Render
  infrastructure identifiers) are visible in responses — these identify the hosting platform, not
  the application; not a secret, not actionable, just noting it was checked.

## 4. Authentication

- **N/A by design.** No authentication or restricted area exists anywhere on the site — the author
  explicitly decided to skip it (logged in `docs/content-inventory.md` §5, and
  `docs/requirements.md` backlog item 7 / AC-08 were never started). NFR-05 ("any authenticated area
  shall transmit credentials only over HTTPS...") therefore has nothing to apply to; confirmed there
  is no login form, no session cookie, no password field anywhere in `src/`.
- If an authenticated area is ever added later, NFR-05 and a documented threat model (per the course
  brief) apply before it ships — this review doesn't pre-approve one.

## 5. Graceful failure

- **Pass.** Every failure path returns a generic, non-leaking response rather than a stack trace or
  raw upstream error:
  - Invalid contact-form input → `400` with a short machine-readable `error` code
    (`invalid_name`/`invalid_message`/`invalid_callback_method`/`invalid_callback_value`/
    `invalid_body`), never the validation internals.
  - Telegram API failure or missing `BOT_TOKEN`/`CHAT_ID` → generic `502 send_failed`, no upstream
    body, status, token, or chat ID ever reaches the client (unit-tested, `docs/testing.md` T18).
  - Unknown routes → a custom `404` page (`src/app/not-found.tsx`) with a working link home, not a
    blank screen or framework default error page (`docs/testing.md` T13).
  - Missing translation keys can't happen at runtime: the `Dictionary` TypeScript type makes every
    locale structurally identical at compile time (architecture.md §2), so there's no "blank
    section" failure mode to begin with (FR-07).
- CI (`.github/workflows/ci.yml`) runs lint, Biome, typecheck, the unit test suite, and a production
  build on every push/PR — a failure in any of those blocks the change from looking "done" before it
  reaches `main`, which is itself a dependability control (catches regressions like D-01 in
  `docs/testing.md` before they'd otherwise ship unnoticed, had they been unit-testable).

## 6. Backup of source files

- **Pass.** The entire project is a git repository with full history, pushed to a private GitHub
  remote (`github.com/aablty/kbtu_se_2026_tsis`) after every meaningful change this session — that
  remote **is** the backup: if the local working copy were lost, `git clone` from GitHub recovers
  everything up to the last push.
- GitHub itself provides redundant, versioned storage of every pushed commit; nothing here relies on
  a single local disk.
- **Risk — not yet addressed, flagging rather than silently assuming it's fine**: the author's local
  `.env` (real `BOT_TOKEN`/`CHAT_ID`) is **deliberately not** in that backup (it's git-ignored, by
  design — see §3). That's correct for secrecy, but it means losing the local machine without a
  separate note of those values means re-generating a bot token/chat ID from Telegram, not "restoring
  from backup." Recommend the author keep those two values in a password manager (not in the repo,
  not in plaintext anywhere) as their own out-of-band backup.
- The portrait image and favicon source are committed (binary assets are in the repo, not just
  referenced), so a fresh clone is immediately buildable without the author needing to re-supply
  anything except the two secrets above.

## 7. Summary

| Area | Verdict |
|---|---|
| HTTPS | Pass (minor: add HSTS header) |
| Input validation | Pass |
| Secret handling | Pass |
| Authentication | N/A (none exists, by documented decision) |
| Graceful failure | Pass |
| Backup of source | Pass (risk noted: secrets need the author's own out-of-band backup) |

No blocking security issue was found. The two non-blocking items (HSTS header, author backing up
their own Telegram credentials outside the repo) are recommendations, not defects.
