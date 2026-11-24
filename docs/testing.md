# Testing, Traceability & Quality (TSIS #01, Task #06)

Status: Executed 2026-11-24 against the deployed site (`https://nursultan-nurgali.onrender.com`,
live on Render) and, for the fix verification, the local dev server. "Executed" below means actually
run — via the project's `bun:test` suite or manual/browser-driven interaction with real pages — not
merely described.

## 1. Requirements traceability table

Every acceptance criterion from `docs/requirements.md` §8, mapped to the test(s) that exercise it and
the result. "Amended" means the AC's wording predates the single-page conversion
(`docs/architecture.md` Decision 4) and is reinterpreted here for the current architecture; the
underlying intent is unchanged and still verified.

| AC | Requirement (intent) | Test ID(s) | Result |
|---|---|---|---|
| AC-01 | About content visible without extra scrolling once reached *(amended: "page" → "section reached via nav", since About is no longer a separate route)* | T01 | **PASS** |
| AC-02 | Language switch: no full reload, scroll position preserved | T03, T04 | **FAIL → fixed → PASS** (see §3, defect D-01) |
| AC-03 | Selected language persists across navigation/reload within the visit | T05 | **PASS** |
| AC-04 | Mobile hamburger menu reaches all sections, no horizontal scroll | T02 | **PASS** |
| AC-05 | Achievement shows a title and date/term, in the selected language | T06 | **PASS** |
| AC-06 | Contact section shows no field marked private in content-inventory.md §3 | T07 | **PASS** |
| AC-06b | Callback-method selector adapts the value field's label/placeholder/validation | T08 | **PASS** |
| AC-07 | Informational images (portrait) have meaningful alt text | T09 | **PASS** |
| AC-08 | Unauthenticated visitor redirected away from restricted content | — | **N/A** — no restricted area exists; author decided to skip it (content-inventory.md §5, backlog item 7 never started) |

Supporting FR/NFR coverage not already implied above:

| FR/NFR | Test ID(s) | Result |
|---|---|---|
| FR-07 (no blank/broken sections if a translation is missing) | T06 | **PASS** (kk/ru/en type-level parity enforced at compile time, confirmed no `as any` — see architecture.md §2; nothing to render blank) |
| FR-08 (contact without exposing omitted fields) | T07, T11, T18 | **PASS** |
| FR-10 (deployable, reachable at its own domain) | T14, T15 | **PASS** |
| NFR-01 (responsive 360–1920px) | T02, T10 | **PASS** |
| NFR-03 (WCAG AA alt text, landmarks, focus visibility) | T09, T17 | **PASS** |
| NFR-05 (HTTPS for anything credential-like — reinterpreted as "the whole site" since there's no auth) | T14 | **PASS** |
| NFR-08 (renders correctly across browsers) | T16 | **PARTIAL** — see limitation noted in T16 |

## 2. Test log (18 executed tests across all 9 required categories)

| ID | Category | Steps | Expected | Actual | Result |
|---|---|---|---|---|---|
| T01 | Navigation | On the live site, clicked each header nav link (Home/About/Interests/Future/Contact) in turn | Each click smooth-scrolls to the matching `#id` section, sticky header stays visible, URL hash updates | Confirmed for all 5 links; URL hash matched the clicked section each time | **PASS** |
| T02 | Navigation + Responsive | Resized to 375×812 (mobile), opened the hamburger menu, clicked "Contact" | Menu opens with all 5 links, closes on click, scrolls to `#contact`, no horizontal scroll at any point | Observed exactly this (screenshots taken); no horizontal scrollbar at 375px | **PASS** |
| T03 | Three-language switching | Scrolled to `#about`, clicked RU | Visible text switches to Russian; scroll position preserved (AC-02) | Text switched correctly, **but scroll jumped to top** | **FAIL** — defect D-01 (§3) |
| T04 | Three-language switching (re-test after fix) | Same steps as T03, against the fixed build locally; repeated once more switching EN→KK while scrolled to `#interests` | Scroll position preserved after the locale refresh | `window.scrollY` saved/restored correctly (console-verified); visually confirmed scrolled position retained in both EN→RU and EN→KK runs | **PASS** (post-fix) |
| T05 | Three-language switching (persistence) | Switched to KK, then reloaded the page (`navigate` to the same URL) | The reloaded page still renders in Kazakh (cookie-based persistence, FR-05/AC-03) | Reload preserved KK | **PASS** |
| T06 | Content / i18n | Read the About and Achievements sections in EN, RU, and KK via `get_page_text` | Achievement shows title ("'Altyn Belgi' gold medal" / translated equivalents) + year (2024) in the active language; no blank sections in any language | Confirmed in all three languages | **PASS** |
| T07 | Links | Inspected the Contact section and footer via the accessibility tree | Shows `contact@aablty.one` and `@aablty` only — no phone number, no employer names, no high-school name (content-inventory.md §3) | Exactly those two channels present, nothing else; footer mirrors them | **PASS** |
| T08 | Forms | In the live contact form, changed the callback-method `<select>` from WhatsApp → Email | Value field's placeholder/label switches from "+1 234 567 8900" to "you@example.com" (AC-06b) | Confirmed via the accessibility tree before/after | **PASS** |
| T09 | Accessibility | Read the page's accessibility tree | Portrait `<img>` exposes an accessible name ("Portrait photo of Nursultan Nurgali"); Lucide icons do not appear in the tree (correctly `aria-hidden`); `banner`/`main`/`contentinfo`/`navigation` landmarks present; a "Skip to content" link exists | All of the above confirmed in one `read_page` pass | **PASS** |
| T10 | Responsive layouts | Compared the 1024px desktop screenshot and the 375px mobile screenshot of the same page | Card grids reflow to single-column on mobile, hero stacks vertically, no overlapping text at either width | Confirmed in both screenshots (§ earlier in this session) | **PASS** |
| T11 | Links (SEO files) | Fetched `/robots.txt` and `/sitemap.xml` directly | `robots.txt` allows all + points to the sitemap; `sitemap.xml` lists the one canonical URL with a recent `lastmod` | Both served correctly with the expected content | **PASS** |
| T12 | Forms / error handling | Clicked "Send" on the live contact form with every field empty | Browser-native HTML5 validation blocks submission with a visible "Please fill out this field" prompt; no network request is sent | Confirmed via screenshot; no `POST /api/contact` appeared in the network log for that click | **PASS** |
| T13 | Error handling | Navigated to `/this-page-does-not-exist` on the live site | Custom 404 page renders ("404" + a Home link), HTTP status is 404 (not a generic framework error or a silent redirect) | Page served with HTTP 404 and the expected content | **PASS** |
| T14 | Deployed-site checks / Security | `curl -I` against `http://…` and `https://…` for the live domain | Plain HTTP returns a `301` to the HTTPS URL; HTTPS responds `200` with no certificate warnings in the browser | Confirmed both — see §4 for the full header review | **PASS** |
| T15 | Deployed-site checks | Loaded the live homepage fresh (no local cache) and compared its rendered content/favicon against the latest commit | Live site matches the latest pushed build (portrait, favicon, Telegram-based copy, single-page sections) | Matched exactly | **PASS** |
| T16 | Browser compatibility | Rendered the site in the available automated browser (a Chromium-based engine, desktop and mobile emulation) | Renders correctly | Renders correctly in Chromium at both sizes | **PARTIAL** — Firefox and Safari were **not** independently tested in this session (no such engine available here). Risk is judged low: every CSS/JS feature used (CSS custom properties, `position: sticky`, `IntersectionObserver`, `scroll-behavior: smooth`, `<dialog>`-free native `<select>`) has had broad support in Firefox/Safari for several years, and NFR-08 names exactly those three engines — recommend the author do a real one-time check in Firefox and Safari (including iOS Safari for the mobile breakpoints) before final submission. |
| T17 | Accessibility (keyboard) | Clicked into the page then pressed `Tab` once | Focus moves to the first form field with a visible `2px solid` accent focus ring (design-tokens.md §6) | Ring clearly visible in the screenshot | **PASS** |
| T18 | Forms / security / error handling (automated) | `bun test` — 9 cases in `src/app/api/contact/route.test.ts`: empty name, empty message, unknown callback method, malformed WhatsApp number, malformed email, valid submission (asserts the exact Telegram request shape), Telegram-failure path (asserts no upstream detail or token leaks into the client response), unconfigured-secrets path (asserts `fetch` is never called), non-JSON body | All 9 pass | `9 pass / 0 fail / 24 expect() calls` (real `bun test` output, reproduced in CI) | **PASS** |

## 3. Defect found during testing

**D-01 — Language switch reset scroll position to the top (violated AC-02).**
Found executing T03 against the live site: switching language while scrolled to a lower section
(e.g. `#about`) correctly updated the text but visually jumped back to the top of the page, even
though `router.refresh()` is not a full browser reload. Root cause: `router.refresh()`'s own scroll
handling isn't sufficient to preserve position across the Server Component re-fetch it triggers in
this app. Fix: `LanguageProvider` now saves `window.scrollY` immediately before calling
`router.refresh()` (wrapped in `useTransition`) and restores it in a `useEffect` keyed on
`isPending` going `false` — i.e. the exact moment React reports the refresh has committed, rather
than a timer guess. Re-tested as T04: fixed, confirmed on two separate language pairs
(EN→RU and EN→KK). Shipped in commit `2da76b1`, along with the regression's unit-test-free root cause
meaning it could only be caught by this kind of interactive test — noted in §5 as a coverage gap.

## 4. HTTPS / header review (feeds into §6 security review)

```
$ curl -sI http://nursultan-nurgali.onrender.com/
HTTP/1.1 301 Moved Permanently
Location: https://nursultan-nurgali.onrender.com/

$ curl -sI https://nursultan-nurgali.onrender.com/
HTTP/1.1 200 OK
Server: cloudflare
...
```

Plain HTTP is force-redirected to HTTPS (Render's platform default, fronted by Cloudflare). No
`Strict-Transport-Security` header was observed on the response, which is a minor hardening gap (see
security review §6.1) — not a functional defect, since the redirect already pushes every visitor to
HTTPS, but an `HSTS` header would stop a future visitor's *browser* from ever trying plain HTTP again
even once.

## 5. Known coverage gaps (honest limitations, not silently skipped)

- **Cross-browser**: see T16 — only Chromium verified interactively in this session.
- **Real Telegram delivery**: T18's unit tests mock `fetch`, by design (no network/secrets in CI).
  Nobody in this session triggered a real `sendMessage` call against the author's live bot/chat —
  that would send the author an actual Telegram message outside a context they asked for, so it was
  deliberately not done. If the author wants that end-to-end check, run the contact form locally
  with real `BOT_TOKEN`/`CHAT_ID` in `.env` and submit once with an obviously-marked test message.
- **Automated accessibility audit**: checks here were the accessibility tree + one keyboard-focus
  check, not a full axe-core/Lighthouse pass. The color-contrast numbers in
  `docs/design-tokens.md` §6 are still the designer's manual sRGB estimates, flagged there as
  needing a real contrast-checker pass — unchanged by this testing round.
- **Load/performance testing**: NFR-06 (first contentful paint under 3s on simulated 3G) was not
  measured this round; the site is a small static-leaning Next.js app with no heavy client bundles,
  so risk is judged low, but it's unverified.
