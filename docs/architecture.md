# Architecture — Personal Website (TSIS #01, Task #03)

Status: Iteration 1 design. Builds on `docs/requirements.md` (FR/NFR, §10 tech stack) and
`docs/content-inventory.md` (content, assets, contact method). Pseudo-level only — no component
props, no CSS, no business logic; that belongs to the implementer.

## 1. Sitemap / information architecture

Diagram source: `docs/diagrams/sitemap.mmd`.

Five real routes, one shared layout, no auth:

| Route | Page | Content (from content-inventory §1) |
|---|---|---|
| `/` | Home | Hero/intro, short summary, nav into the rest of the site |
| `/about` | About & Education | KBTU, major, class years, previous-school note (no school name), gold medal |
| `/interests` | Interests & Activities | Interests, activities, completed subjects |
| `/future-plans` | Future Plans | Detail-free future-plans summary |
| `/contact` | Contact | Email, Telegram, contact form sent via Telegram Bot API |

A single root layout wraps every route with a `Header` (nav + `LanguageSwitcher` + `ThemeToggle`)
and a `Footer` (email, Telegram, Lucide attribution), so the language switch and theme toggle are
reachable from any page — satisfying FR-04 and keeping About/Contact within 2 clicks of Home
(NFR-02). There is no authenticated/restricted area (author decision, logged in content-inventory
§5); FR-09/NFR-05/US-07 therefore do not apply to this iteration.

## 2. Page/component structure

Diagram source: `docs/diagrams/component-structure.mmd`.

- **Pages** (`app/*/page.tsx`) are Server Components. They read the active locale (see §3) and pull
  copy from static dictionaries, then render shared presentation components (`Card`,
  `SectionHeading`, `Icon`).
- **Client-only components** (`LanguageSwitcher`, `ThemeToggle`, `ContactForm`) are the only
  `'use client'` boundaries — kept as low in the tree as the Next.js routing skill recommends, each
  backed by its own context provider (`LanguageProvider`, `ThemeProvider`).
- **Server boundary**: `app/api/contact/route.ts` plus a server-only Telegram client helper module are
  the one place that touches `BOT_TOKEN` / `CHAT_ID`. Nothing in the pages or client components
  imports that module.

## 3. Navigation

Standard Next.js App Router `<Link>` navigation between the five routes listed above, all nested
under the shared root layout so `Header`/`Footer` persist across navigation without re-mounting
(per the routing skill: layouts don't re-render on route change). No route groups or dynamic
segments are needed — the page set is fixed and small.

## 4. Language-switching mechanism

Decision: **client-side language switch over a shared `LanguageProvider` context**, not localized
routes (`/en`, `/ru`, `/kk`). `LanguageSwitcher` writes the chosen locale (`kk`/`ru`/`en`) into the
context, which persists it to `localStorage` (and a cookie, so the first server render of the next
navigation already has it) — this is what satisfies FR-05 (persist across navigation in the same
visit) without a full reload or lost scroll position (AC-02/AC-03). Pages read the current locale
from the provider/cookie and select the matching dictionary; if a key is missing for a locale, the
page falls back to omitting that section rather than rendering blank/broken content (FR-07).

## 5. Storage approach

- **Static**: all page copy lives in static per-language dictionaries, one JSON (or MDX-style)
  file set per locale under something like `content/{kk,ru,en}/*.json`, imported at build/request
  time by the Server Component pages. This is the bulk of the site (NFR-07: translated strings
  separate from markup). Portrait photo and any future stock image are static assets per
  content-inventory §2.
- **Server-side/dynamic (the one exception)**: the contact-form submission, sent via the Telegram Bot
  API. The `ContactForm` client component only ever calls the app's own `/api/contact` Next.js API
  route over HTTPS; the API route is the sole place that reads `BOT_TOKEN` and `CHAT_ID` from server
  environment variables and calls `https://api.telegram.org/bot{BOT_TOKEN}/sendMessage`. These env
  vars are never exposed to the client bundle (no `NEXT_PUBLIC_` prefix, never passed as props/JSON to
  the browser), so the contact flow is the only place secrets or server-only logic exist. (Switched
  from the author's self-hosted WAHA/WhatsApp instance to the Telegram Bot API — the author checks
  Telegram more regularly than WhatsApp.)
- **Contact-form callback method**: the form does not hard-code "phone" as the only way back. It has a
  `callbackMethod` selector (`whatsapp` | `telegram` | `email`) plus one `callbackValue` field whose
  label/placeholder and format validation adapt to the chosen method. The API route validates
  `callbackMethod` against that fixed enum and includes the visitor's chosen method + value in the
  Telegram message it sends to the author — Telegram remains the one notification transport (the
  author's own chat), the selector only changes how the author is told to call the visitor back.

## 6. Design decisions & trade-offs

**Decision 1 — Static JSON content files vs. a CMS.**
Chosen: static per-language JSON/MDX-style files committed to the repo. Trade-off: the author must
edit and redeploy to update copy (no live editing UI, no non-technical-editor workflow), but this
matches the zero-budget constraint (C-06), needs no new service or API key, and keeps NFR-07
(translated strings separate from markup) trivially true. A CMS would make content easier to update
without a deploy, at the cost of a new external dependency, possible cost, and another thing to keep
in sync with the content inventory's privacy classification.

**Decision 2 — API route vs. server action for the Telegram call.**
Chosen: a Next.js **API route** (`app/api/contact/route.ts`) rather than a React Server Action.
Trade-off: an API route needs its own fetch call from the client and its own request/response
typing, slightly more boilerplate than a server action invoked directly from the form. In exchange,
it gives a stable, explicit HTTP contract (method, status codes, JSON body) that's easy to reason
about for a security-sensitive, third-party-calling endpoint, and it keeps the Telegram client helper
unambiguously server-only (a server action is also server-only, but the route makes the trust
boundary visible in the URL/network tab, which matters here since the form also collects a
visitor-chosen callback value — a phone number, Telegram handle, or email address).

**Decision 3 — Client-side language switch vs. localized routes (`/en`, `/ru`, `/kk`).**
Chosen: client-side switch via `LanguageProvider`, no locale-prefixed routes. Trade-off: this gives
up locale-specific URLs (less ideal for SEO/sharing a specific-language link, and no
automatic `Accept-Language`-based routing) but matches AC-02's requirement that switching language
not cause a full reload or lose scroll position, and keeps the sitemap/routing simple for a five-page
site where SEO per-locale URL is not a stated requirement. Localized routes would improve
shareability and SEO per language at the cost of duplicating the route tree three times and added
middleware complexity.

## 7. Reuse & licensing note

Cross-checked against `docs/content-inventory.md` §2 (existing register) — no duplicate entries
added; only new items proposed by this design are listed below:

| Item | License | Status |
|---|---|---|
| Lucide icon set | ISC | Already logged in content-inventory §2 — reused as-is for `Icon` wrapper component |
| Google Fonts — Oxanium (per requirements §10) | SIL Open Font License (OFL) | Logged in content-inventory §2 — Latin/Latin-ext only |
| Google Fonts — Exo 2 (Cyrillic/Kazakh fallback for Oxanium) | SIL Open Font License (OFL) | Logged in content-inventory §2 — confirmed Kazakh support via Google Fonts' Glyphs & languages list |
| Next.js (framework) | MIT | New: core framework, free, no credit-card requirement, satisfies C-06 |
| React (via Next.js) | MIT | New: required peer of Next.js |
| Tailwind CSS | MIT | New: base styling layer per requirements §10 |

No other third-party UI libraries, stock images, or icon sets are proposed; stock/hero imagery
remains a TODO per content-inventory §2 until the author names a specific, licensed image.
