# Requirements Baseline & Agile Plan — Personal Website (TSIS #01)

Status: Iteration 1 baseline. Updated after each teacher supervision checkpoint (see §8).

## 1. Target audience

- **Primary**: admissions staff, professors, potential employers/recruiters, and KBTU peers who want a quick, truthful picture of the author (education, major, interests, achievements, activities, future plans).
- **Secondary**: the author themself, as a living record to update each term.
- Visitors may read in Kazakh, Russian, or English, on desktop or mobile, and may have low vision or use a screen reader.

## 2. User goals

- A visitor can learn, within a couple of minutes, who the author is, what they study, what they've done, and how to reach them (if contact info is published).
- A visitor can switch the page to their preferred language without losing their place.
- The author can keep the content accurate over time without redesigning the site.

## 3. Project scope

**In scope**
- Static personal website: home/about, education, achievements/activities, future plans, (optional) contact section.
- Kazakh, Russian, English content, fully parallel; one additional language optional.
- Responsive layout (desktop + mobile), basic accessibility, client-side language switch.
- Deployment to InfinityFree free hosting on a free subdomain.

**Out of scope (see also §5 Exclusions)**
- Any server-side app logic beyond static hosting, unless an authenticated area is explicitly built with a real threat model.
- Payment, e-commerce, or user-generated content from other people.
- Native mobile apps.

## 4. Constraints

- C-01: Hosting is InfinityFree free tier; no paid hosting or domain purchase.
- C-02: Must support kk, ru, en; author's own non-KBTU-standard mother tongue may replace kk/ru only if neither is native (per course rule).
- C-03: Must render correctly on both desktop and mobile viewports.
- C-04: Individual work only; no shared code/content with another student's submission.
- C-05: Any CSS framework is allowed, but only on the InfinityFree-hosted site.
- C-06: Build/hosting budget is zero — no paid APIs, fonts, or services that require a credit card.

## 5. Risks and exclusions

| ID | Risk | Mitigation |
|----|------|------------|
| R-01 | Publishing private data (home address, phone, grades, documents) by accident | Content classified public/private/omitted in content inventory (Task #02) before publishing |
| R-02 | Cosmetic "login" implies security it doesn't have | If auth is built, document threat model; otherwise, no login UI at all |
| R-03 | Free hosting downtime/limits | Keep a static export of the site as backup; note hosting is best-effort |
| R-04 | Translation drift (one language falls behind after edits) | Content inventory tracked per language; update checklist before each release |
| R-05 | Using photos/assets without rights to publish | Source/owner recorded per asset in content inventory; permission obtained for photos of other people |

**Exclusions**: real user accounts for the public, payments, analytics requiring consent flows beyond a simple notice, server-rendered backend.

## 6. Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | The site shall present the author's KBTU education, major, and previous high school. |
| FR-02 | The site shall list the author's interests, achievements, and completed subjects. |
| FR-03 | The site shall list the author's extracurricular activities and future plans. |
| FR-04 | The site shall let a visitor switch the displayed language among Kazakh, Russian, and English from any page. |
| FR-05 | The site shall persist the visitor's last-selected language across page navigation within the same visit. |
| FR-06 | The site shall render a mobile-friendly navigation menu on small viewports. |
| FR-07 | The site shall display a content section only after its text exists in the currently selected language (no blank/broken sections). |
| FR-08 | The site shall provide a way to contact the author (e.g., email link or form) without exposing private identifiers the author chose to omit. |
| FR-09 | If an authenticated/restricted area is implemented, the site shall require successful authentication before serving any restricted content. |
| FR-10 | The site shall be deployable as static files to an InfinityFree hosting account and load at the assigned subdomain. |

## 7. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Responsiveness | The layout shall remain usable (no horizontal scroll, no overlapping text) at viewport widths from 360px to 1920px. |
| NFR-02 | Usability | A first-time visitor shall be able to find the About and Contact sections within 2 clicks from the home page. |
| NFR-03 | Accessibility | All pages shall meet WCAG 2.1 AA for color contrast and provide alt text for informational images. |
| NFR-04 | Privacy | The site shall contain no home address, phone number, national ID, grades, or private documents in published content. |
| NFR-05 | Security | Any authenticated area shall transmit credentials only over HTTPS and never store passwords in plain text or client-side code. |
| NFR-06 | Performance | The home page shall reach first contentful paint in under 3 seconds on a simulated 3G connection on InfinityFree hosting. |
| NFR-07 | Maintainability | Translated strings shall be stored separately from markup/layout so a new language can be added without editing page structure. |
| NFR-08 | Compatibility | The site shall render correctly on the latest two versions of Chrome, Firefox, and Safari (desktop and mobile). |

## 8. User Stories & Acceptance Criteria

### US-01 — View education background
As a **visitor**, I want to **see the author's KBTU education and major**, so that **I understand their academic background**.
- **AC-01**: Given the visitor is on the About page, when the page loads, then KBTU, the major, and previous high school are visible without scrolling past the fold on desktop.

### US-02 — Switch language
As a **visitor**, I want to **switch the site language to kk/ru/en**, so that **I can read in my preferred language**.
- **AC-02**: Given any page is open in English, when the visitor selects "Қазақша", then all visible text on that page switches to Kazakh without a full page reload losing scroll position.
- **AC-03**: Given a language has been selected, when the visitor navigates to another page on the site, then the new page loads in the previously selected language.

### US-03 — Browse on mobile
As a **mobile visitor**, I want to **browse the site on my phone**, so that **I don't need a desktop to learn about the author**.
- **AC-04**: Given the viewport is 375px wide, when the visitor opens the navigation menu, then all sections are reachable via a collapsed/hamburger menu with no horizontal scrolling.

### US-04 — Find achievements and activities
As a **recruiter**, I want to **see a list of achievements and extracurricular activities**, so that **I can evaluate the author quickly**.
- **AC-05**: Given the visitor is on the Achievements section, when the page renders, then each achievement shows a title and date/term, in the selected language.

### US-05 — Contact the author
As a **visitor**, I want to **find a way to contact the author**, so that **I can follow up**.
- **AC-06**: Given the visitor is on the Contact section, when they view it, then a contact method is shown that does not include any field the author marked private in the content inventory.
- **AC-06b**: Given the visitor opens the contact form, when they pick a callback method from the selector (WhatsApp/phone, Telegram, or Email), then the value field's label and validation adapt to that choice, so the visitor isn't forced to give a phone number if they'd rather be reached another way.

### US-06 — Accessible reading experience
As a **visitor using a screen reader**, I want to **navigate headings and images with alt text**, so that **I can access all content non-visually**.
- **AC-07**: Given a screen reader is active, when it reads an image used for information (e.g., a certificate scan), then it announces meaningful alt text instead of the filename or nothing.

### US-07 — Restricted content (optional)
As the **author**, I want **private photos behind authentication**, so that **casual visitors can't see them**.
- **AC-08**: Given restricted content exists, when an unauthenticated visitor requests that page directly by URL, then they are redirected to a login prompt and see no restricted content.

## 9. Prioritized Backlog (2 iterations)

| Priority | Item | Iteration |
|----------|------|-----------|
| 1 | FR-01, FR-02, FR-03 — core About/education/achievements content (kk/ru/en) | Iteration 1 |
| 2 | FR-06, NFR-01 — responsive layout & mobile nav | Iteration 1 |
| 3 | FR-04, FR-05, NFR-07 — language switch + persistence | Iteration 1 |
| 4 | NFR-03, US-06 — accessibility pass (alt text, contrast) | Iteration 1 |
| 5 | FR-10 — deploy static build to InfinityFree | Iteration 1 |
| 6 | FR-08 — contact section | Iteration 2 |
| 7 | FR-09, NFR-05, US-07 — optional authenticated/restricted area | Iteration 2 |
| 8 | NFR-06 — performance tuning (image sizes, asset count) | Iteration 2 |
| 9 | FR-07 — graceful handling of missing translations | Iteration 2 |
| 10 | NFR-08 — cross-browser check | Iteration 2 |

## 10. Technical stack & infrastructure decisions (author-mandated, 2026-11-24)

These are fixed constraints for the design (Task #03) and implementation tasks, not open choices:

- **Framework**: Next.js, with SEO/GEO support (sitemap.xml, robots.txt, structured metadata).
- **Styling**: Tailwind CSS as the base layer, with custom CSS for a hand-built UI kit on top.
- **Design system**: Lucide icons (already logged in content-inventory.md §2), Oxanium font with **Exo 2**
  as a Cyrillic/Kazakh fallback (Oxanium is Latin-only; Exo 2's Google Fonts language list confirms Kazakh
  support — see content-inventory.md §2 and design-tokens.md §2), 0 border-radius on cards, minimal/flat
  cards with subtle shadows, dark/light theme support, minimalistic "technical" visual tone.
- **Contact form**: server-side integration with the Telegram Bot API, using `BOT_TOKEN` and `CHAT_ID`
  env vars — sends the contact message (name, chosen callback method/value, message) to the author's
  Telegram chat rather than email. Replaces the earlier WAHA/WhatsApp integration (the author checks
  Telegram more regularly) and supersedes the "TBD" note on the contact form in content-inventory.md §4.
- **Deployment**: Render.com via an Infrastructure-as-Code blueprint at `infra/render.yaml` — Frankfurt
  region, service name `nursultan-nurgali`. Replaces the earlier InfinityFree-only assumption in §4
  (C-01); InfinityFree remains an allowed fallback per the course brief, but Render.com is the author's
  chosen target.

## 11. Teacher Supervision Checkpoint Log

| Date | Checkpoint | Change made |
|------|------------|-------------|
| 2026-11-24 | Baseline drafted | Initial FR/NFR/user stories/backlog created from TSIS #01 brief (Task #01: Requirements baseline and Agile plan) |
| 2026-11-24 | Tech stack decided | Author specified Next.js, Tailwind+custom UI kit, Lucide/Oxanium design system, WAHA-based contact form, Render.com deployment blueprint (§10) ahead of Task #03 design |
| 2026-11-24 | Contact-form transport swapped | Author replaced the WAHA/WhatsApp integration with the Telegram Bot API (`BOT_TOKEN`, `CHAT_ID`) — checks Telegram more regularly than WhatsApp. Updated §10, architecture.md, the sequence/component diagrams, content-inventory.md §4, wireframes, and lib/telegram.ts |
| 2026-11-24 | Contact-form correction | Author asked that the contact form not assume phone as the only callback channel; added a callback-method selector (WhatsApp/Telegram/Email) with AC-06b, updated architecture.md, the sequence diagram, both contact wireframes, and content-inventory.md §4 |
| 2026-11-24 | Font fallback added | Oxanium has no Cyrillic glyphs; verified via Google Fonts' own Glyphs & languages tool that Exo 2 (OFL) explicitly supports Kazakh, and added it as the kk/ru fallback across design-tokens.md, content-inventory.md §2, architecture.md §7, and CLAUDE.md |
