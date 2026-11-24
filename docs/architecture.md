# Architecture — Personal Website (TSIS #01, Task #03)

Status: Iteration 1 design. Builds on `docs/requirements.md` (FR/NFR, §10 tech stack) and
`docs/content-inventory.md` (content, assets, contact method). Pseudo-level only — no component
props, no CSS, no business logic; that belongs to the implementer.

## 1. Sitemap / information architecture

Diagram source: `docs/diagrams/sitemap.mmd`.

**Single page, five in-page sections, no auth.** Originally designed as five separate routes (see
Decision 4 below for why that changed); the content per section is unchanged from the original
wireframes in `docs/wireframes/*.svg` — only the container changed from a route to an anchored
`<section id="…">` on one page:

| Section (anchor) | Content (from content-inventory §1) |
|---|---|
| `#home` | Hero/intro, portrait, short summary, nav into the rest of the page |
| `#about` | KBTU, major, class years, previous-school note (no school name), gold medal |
| `#interests` | Interests, activities, completed subjects |
| `#future-plans` | Detail-free future-plans summary |
| `#contact` | Email, Telegram, contact form sent via Telegram Bot API |

A single root layout wraps the page with a sticky `Header` (nav + `LanguageSwitcher` + `ThemeToggle`)
and a `Footer` (email, Telegram, Lucide attribution), so the language switch and theme toggle are
reachable while scrolling anywhere on the page — satisfying FR-04. Every section is one click/tap
away via the nav, which trivially keeps About/Contact within 2 clicks of Home (NFR-02). There is no
authenticated/restricted area (author decision, logged in content-inventory §5); FR-09/NFR-05/US-07
therefore do not apply to this iteration.

## 2. Page/component structure

Diagram source: `docs/diagrams/component-structure.mmd`.

- **The page** (`app/page.tsx`) is a Server Component. It reads the active locale (see §3) and pulls
  copy from static dictionaries, then renders the five sections in order, each wrapped in `Reveal`
  (except `#home`, which is above the fold and must render fully visible with no JS/scroll
  dependency) and built from shared presentation components (`Card`, `SectionHeading`, `Icon`).
- **Client-only components** (`LanguageSwitcher`, `ThemeToggle`, `ContactForm`, `MobileNav`, `Reveal`)
  are the only `'use client'` boundaries — kept as low in the tree as the Next.js routing skill
  recommends. `LanguageSwitcher`/`ThemeToggle` are backed by their own context providers
  (`LanguageProvider`, `ThemeProvider`); `Reveal` only touches the DOM (IntersectionObserver), no
  shared state.
- **Server boundary**: `app/api/contact/route.ts` plus a server-only Telegram client helper module are
  the one place that touches `BOT_TOKEN` / `CHAT_ID`. Nothing in the pages or client components
  imports that module.

## 3. Navigation

In-page hash-anchor navigation: `Header`/`MobileNav` link to `#home`/`#about`/`#interests`/
`#future-plans`/`#contact` with plain `<a href="#…">` (not `next/link` — there is no route to
navigate to, just a same-page scroll). `html { scroll-behavior: smooth }` animates the jump;
`section[id] { scroll-margin-top: … }` offsets every anchored section so the sticky header never
covers it. The browser's native hash handling means deep-linking to e.g. `/#contact` still works
(shareable section links), and back/forward navigates between visited anchors.

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

**Decision 4 — Single page with hash-anchor sections vs. five separate routes.**
Chosen: one route (`/`) holding all five sections, navigated by in-page anchors. Trade-off: gives up
per-section URLs as distinct pages for crawlers/analytics (now one `sitemap.xml` entry instead of
five, and `generateMetadata` can only describe the whole page, not each section individually) and
loses the "pages are independent Server Components" simplicity — all dictionary fields now load on
every view instead of per-route. In exchange it matches how the author wants the site to feel (one
continuous scroll, not a multi-page site) and removes the four now-redundant per-route
`generateMetadata` exports and dictionary `meta.*` entries (collapsed to a single `meta.home`,
reused as the whole page's title/description). AC-02/AC-03 (no full reload / no lost scroll on
language switch) still hold: `LanguageProvider.setLocale` still only calls `router.refresh()`, which
re-fetches the single page's RSC payload in place.

## 7. Animation & motion

- Sections below the fold (`#about`, `#interests`, `#future-plans`, `#contact`) fade + slide in via
  `Reveal` (IntersectionObserver, `threshold: 0.15`) — see `docs/design-tokens.md` §7 for the exact
  timing. `#home` is deliberately excluded: it's the first thing painted and must not depend on JS
  or scrolling to become visible.
- `prefers-reduced-motion: reduce` is handled once, globally, in `globals.css` (every
  transition/animation duration collapses to ~0 and `scroll-behavior` reverts to `auto`) rather than
  branching in every component — simpler to audit and impossible to miss in a new component.
- The header is `position: sticky` (new, see Decision 4) so the nav/language/theme controls stay
  reachable while scrolling the now-much-longer single page.

## 8. Reuse & licensing note

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
| Biome (lint/format tooling) | MIT | New: dev-only tooling, not shipped to the browser — see content-inventory §2 |
| Favicon logo mark ("N" monogram) | Original work, no external license | New: hand-drawn by the project (`scripts/generate-favicon.mjs`), not a reused asset |

No other third-party UI libraries, stock images, or icon sets are proposed; stock/hero imagery
remains a TODO per content-inventory §2 until the author names a specific, licensed image.
