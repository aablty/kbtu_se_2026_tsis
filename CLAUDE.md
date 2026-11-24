# Project: Nursultan Nurgali — Personal Website (TSIS #01)

Software Engineering TSIS coursework: a vibe-coded personal portfolio site, built and documented as a
traceable engineering process (requirements → design → implementation → testing → launch). Read
`docs/requirements.md` first for the full FR/NFR/user-story baseline — this file is a condensed index,
not a replacement for it.

## Tech stack (fixed, author-mandated — see requirements.md §10)

- **Framework**: Next.js (App Router), with SEO/GEO support (sitemap.xml, robots.txt, structured metadata).
- **Styling**: Tailwind CSS as the base layer + custom CSS for a hand-built UI kit on top.
- **Languages**: Kazakh, Russian, English — client-side switch via a `LanguageProvider` context
  (not localized routes), persisted for the visit. See `docs/architecture.md` §4.
- **Contact form**: server-side only, via the author's self-hosted WAHA (WhatsApp HTTP API) instance.
  Env vars `WAHA_API_KEY`, `WAHA_API_URL`, `WAHA_SESSION_NAME` are read **only** inside
  `app/api/contact/route.ts` — never in client components, never logged, never committed. The form has
  a callback-method selector (WhatsApp/Telegram/Email), not a hard-coded phone field — see
  `docs/content-inventory.md` §4 and `docs/architecture.md` §5.
- **Deployment**: Render.com via `infra/render.yaml` (Frankfurt region, service name `nursultan-nurgali`).
- **No authentication/restricted area** in this project (author decision).

## Design system (full detail in `docs/design-tokens.md`)

- Icons: **Lucide** (ISC), 20px default, stroke width 1.5, `currentColor`, `aria-hidden` (always paired
  with a text label).
- Font: **Oxanium** (Google Fonts, OFL) for Latin headings/display — it has no Cyrillic glyphs, so the
  stack falls back to **Exo 2** (Google Fonts, OFL, confirmed Kazakh support) for kk/ru text:
  `font-family: 'Oxanium', 'Exo 2', sans-serif;`.
- Cards: **`border-radius: 0` everywhere, no exceptions.** Flat fill, single subtle shadow
  (`0 1px 3px var(--shadow)`), no multi-layer elevation.
- Dark + light themes via CSS custom properties + `data-theme` attribute, near-monochrome palette with
  one accent used sparingly. Tone: minimalistic, "technical".
- Accessibility: WCAG 2.1 AA is a hard requirement (NFR-03). `docs/design-tokens.md` §6 flags the two
  close-to-the-line color pairs and their usage restrictions — don't relitigate those without re-running
  a real contrast check.

## Privacy & content rules (do not relax without the author's explicit say-so)

- `docs/content-inventory.md` §3 is the source of truth for what may be published. Anything classified
  **Private** or **Omitted** there (phone number, employer names, high-school name, the CV's personal
  email, etc.) must never appear in rendered output, source, comments, or the client bundle.
- `.env` files are deny-listed in `.claude/settings.json` for Read/Bash/PowerShell — don't try to read
  secrets around that restriction via another tool or shell trick.
- Every non-original asset (icon set, font, image) needs a logged source + license in
  `docs/content-inventory.md` §2 before it's used in code.

## Project structure / where things live

- `docs/requirements.md` — FR/NFR, user stories + AC, backlog, teacher-checkpoint log.
- `docs/content-inventory.md` — content per language, asset register, privacy classification, ethics
  review, contact method.
- `docs/architecture.md` + `docs/diagrams/*.mmd` — sitemap, sequence/component diagrams, design
  decisions & trade-offs.
- `docs/design-tokens.md` + `docs/wireframes/*.svg` — design system and low-fi wireframes.
- `.claude/agents/{architect,designer,implementer,code-reviewer}.md` — role definitions for this
  project's agent harness; each names the skills it should invoke and the guardrails above.
- `infra/render.yaml` — Render.com deployment blueprint (to be added at implementation time).

## Working conventions

- This is coursework: every non-trivial decision should be traceable to a doc above, and the
  "Teacher Supervision Checkpoint Log" in requirements.md gets a new row after each supervised change.
- Don't invent biographical content — everything about the author comes from what's already recorded in
  content-inventory.md or from the author directly.
- Git: conventional commits, pushed to `main` on `github.com/aablty/kbtu_se_2026_tsis` (private repo).
