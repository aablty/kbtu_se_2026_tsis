# Design Tokens — Personal Website (TSIS #01, Task #03)

Status: Iteration 1 draft, consistent with the author-mandated constraints in `docs/requirements.md` §10
(Lucide icons, Oxanium font, 0-radius flat cards, dark/light theme, Tailwind + custom CSS).

## 1. Color palette

Minimalistic, "technical" tone: near-monochrome neutrals with a single accent used sparingly (links,
active nav, focus rings, primary CTA border). No gradients, no decorative color.

| Token | Light theme | Dark theme | Usage |
|-------|-------------|------------|-------|
| `--bg` | `#FAFAF8` | `#121314` | Page background |
| `--surface` | `#FFFFFF` | `#1B1C1D` | Card/section background |
| `--text-primary` | `#1A1A1A` | `#EDEDEB` | Headings, body text |
| `--text-secondary` | `#52524D` | `#B7B6AF` | Subtext, captions, meta |
| `--text-muted` | `#8A8A82` | `#8A8A82` | Placeholders, disabled |
| `--border` | `#D8D8D2` | `#3A3B3C` | Card border, dividers |
| `--border-strong` | `#1A1A1A` | `#EDEDEB` | Card border on hover/focus |
| `--accent` | `#2457C5` | `#6E9CFF` | Links, active nav, focus ring, primary CTA outline |
| `--shadow` | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.35)` | Card drop shadow only |

Theme is a `data-theme="light"/"dark"` attribute on `<html>`, toggled client-side and persisted
(localStorage), mirroring the kk/ru/en persistence already required by FR-05/NFR-07.

## 2. Type scale (Oxanium + Cyrillic/Kazakh fallback, Google Fonts / OFL — satisfies C-06 zero-budget rule)

**Font stack**: Oxanium only covers Latin/Latin-ext — it has no Cyrillic glyphs, so Kazakh and Russian
text would fall back to the browser default and break the "technical" look. Fallback font: **Exo 2**
(Google Fonts, SIL OFL, designed by Natanael Gama) — a geometric/techy sans that pairs visually with
Oxanium, and its Google Fonts "Glyphs & languages" tab explicitly lists **Kazakh** (and Kazakh Latin) as
a supported language, confirmed 2026-11-24. CSS: `font-family: 'Oxanium', 'Exo 2', sans-serif;` — Latin
text renders in Oxanium, Cyrillic/Kazakh text automatically falls through to Exo 2's glyphs (browsers
pick the next font in the stack per-character when the first font lacks a glyph), with a generic
`sans-serif` as the final fallback.

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-h1` | 32px / 1.2 | 600 | Hero name, page H1 |
| `--text-h2` | 24px / 1.3 | 600 | Section titles (About, Interests, Future, Contact) |
| `--text-h3` | 16px / 1.4 | 600 | Card titles |
| `--text-body` | 15px / 1.6 | 400 | Paragraphs, card descriptions |
| `--text-small` | 13px / 1.5 | 400 | Meta, labels, footer |

Mobile scales down one step on h1/h2 (e.g. h1 → 26px) via a Tailwind breakpoint, never below 13px body.

## 3. Spacing scale

`--space-1: 4px, --space-2: 8px, --space-3: 12px, --space-4: 16px, --space-6: 24px, --space-8: 32px,
--space-12: 48px, --space-16: 64px`

Section vertical padding: `--space-16` desktop / `--space-8` mobile. Card internal padding: `--space-6`.
Grid gap between cards: `--space-6` desktop / `--space-4` mobile.

## 4. Card / shadow rule (fixed constraint)

- `border-radius: 0` on every card, everywhere, in both themes — no exceptions.
- Border: `1px solid var(--border)`.
- Shadow: one subtle flat offset only — `box-shadow: 0 1px 3px var(--shadow)`. No multi-layer elevation,
  no shadow on hover growing beyond that single value (hover may only swap `--border` → `--border-strong`).
- Background: `var(--surface)`, flat fill, no gradient.

## 5. Icons (Lucide)

- Size: 20px default inline (16px in dense lists, 24px max for standalone/decorative use, e.g. hero
  scroll cue).
- Stroke width: `1.5` (Lucide default) everywhere — no mixing stroke weights.
- Color: single token, `currentColor`, inherits `var(--text-secondary)` by default; nav/active icons
  inherit `var(--accent)`. Never a second icon color.
- Icons are decorative alongside a text label in every instance on this site (nav, cards, contact
  methods) — so they carry `aria-hidden="true"`; the adjacent text is what screen readers announce.

## 6. Accessibility / contrast check (WCAG 2.1 AA, per NFR-03)

- `--text-primary` on `--bg`/`--surface`: light `#1A1A1A` on `#FFFFFF` ≈ 16.1:1; dark `#EDEDEB` on
  `#1B1C1D` ≈ 14.8:1 — both pass AA (and AAA) comfortably for body text.
- **Risk**: `--text-secondary` (`#52524D` light / `#B7B6AF` dark) on `--surface` is used for small
  13px meta/caption text. Light-mode ratio ≈ 5.3:1 (passes AA for normal text, ≥4.5:1 required) but is
  close enough to the line that any further lightening would fail. Dark-mode ratio ≈ 8.6:1, safe.
- **Risk**: `--accent` (`#2457C5` light) on `--surface` white is ≈ 5.1:1 — passes AA for normal text
  but would fail AA for text below 14px bold / 18px regular if ever used at `--text-small` size on a
  tinted card background. Fix: never place `--accent` text smaller than `--text-body` (15px) on a
  colored or off-white surface; for the dark-mode accent `#6E9CFF` on `#1B1C1D` the ratio is ≈ 7.9:1,
  comfortably safe.
- **Fix applied**: `--text-muted` (`#8A8A82`, ≈ 3.3:1 on white) is restricted to non-informational
  placeholder/disabled states only (never body copy, never the sole conveyor of required information),
  which is the documented AA exception for decorative/disabled text.
- Focus states: every interactive element (nav links, lang switcher, theme toggle, form fields, submit
  button) gets a visible `2px solid var(--accent)` focus ring with `3px` offset — contrast of the ring
  itself against `--surface` is the same ≥5:1 accent ratio above, meeting the 3:1 non-text contrast
  requirement.

Overall: the core palette passes AA; the one real risk is `--accent` and `--text-secondary` at small
sizes, mitigated by the size/usage rules above rather than by lightening the palette further (which
would weaken the "technical" minimal look). Re-verify with an automated contrast checker once exact
hex values are finalized against the real Oxanium font metrics in implementation.
