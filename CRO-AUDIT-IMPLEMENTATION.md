# CRO / Copy / UX Implementation Spec
**Project:** Jonathan Zalzman Guitar Lessons (Astro 4 + Netlify)
**For:** Claude Code
**Goal:** Convert casual visitors into booked trial lessons. Ship tasks in the order listed.

---

## Ground rules (apply to every task)

1. **Zero em dashes (`—`) in any user-facing copy.** There are currently ~100 across `src/pages/*.astro`. Replace with a comma, a period, a colon, or a rewrite. Do not swap in en dashes as a loophole. Hyphens in compound words (`30-minute`, `in-person`) are fine.
2. **Do not use these phrases anywhere on the site:** "meets you where you are" / "meet you where you are", "no pressure, no commitment", "life happens", "bring the curiosity, I'll bring the roadmap", "the stuff I teach is the stuff I do" (may appear ONCE, not twice).
3. **Do not invent testimonials, names, numbers, or credentials.** Where real data is required and unavailable, leave a clearly-marked `TODO(jonathan):` comment in the source and use the existing placeholder.
4. **Color rule:** `--ember` (#FF5B2E) is the ONLY color used for clickable actions. `--neon` (#C8FF3D) is accent/status only and must never be a button background or button hover state.
5. Preserve the existing design system (Anton display / Bricolage body / JetBrains Mono, numbered "track list" sections, poster aesthetic). This spec sharpens it, it does not replace it.
6. Run `npm run build` after each task group and confirm it passes.

---

## TASK 1 — Build a real booking form (HIGHEST PRIORITY)

### Problem
Every CTA on the site says "Book a Free Trial" and links to `/lessons#book`. That anchor (`src/pages/lessons.astro`, lines ~194-227) contains only a `mailto:` card and a `tel:` card, followed by a paragraph instructing the visitor to compose an email containing their instrument, age, experience level, lesson format, and desired songs. The site promises a booking and delivers homework. `mailto:` frequently opens nothing on mobile.

### Build

Create `src/components/BookingForm.astro`. Use **Netlify Forms** (the site already deploys via Netlify; see `netlify.toml`).

Requirements:
- `<form name="trial-booking" method="POST" data-netlify="true" netlify-honeypot="bot-field">` with the required hidden `<input type="hidden" name="form-name" value="trial-booking" />` and a visually-hidden honeypot field.
- Accept an optional prop `plan?: "trial" | "monthly" | "alacarte"` (default `"trial"`) that preselects the Plan field.
- Fields:
  | Field | Type | Required | Options / notes |
  |---|---|---|---|
  | Name | text | yes | |
  | Email | email | yes | |
  | Phone | tel | no | |
  | Student age | select | yes | `Under 10`, `10-13`, `14-17`, `18+` |
  | Instrument | select | yes | `Guitar`, `Bass`, `Ukulele`, `Not sure yet` |
  | Experience level | select | yes | `Never played`, `Some basics`, `Intermediate`, `Advanced`, `Coming back after a long break` |
  | Lesson format | radio | yes | `In-person (Suwanee)`, `Online`, `Either works` |
  | Plan | select | yes | `Free trial lesson`, `Weekly lessons ($159/mo)`, `Single lesson ($40)` |
  | Best days/times | text | no | placeholder: `e.g. weekday evenings, Saturday mornings` |
  | What do you want to be able to play? | textarea | no | placeholder: `A song, a band, a style. Anything.` |
- Submit button label: **`Book My Free Lesson →`** (btn-primary, ember, full-width on mobile).
- Directly under the button, small mono text: `Free first lesson. No card required. Usually a reply within 24 hours.`
- On success, redirect to a new page `src/pages/thanks.astro` (add `action="/thanks"` to the form). The thanks page should use `BaseLayout`, match the poster aesthetic, confirm what happens next, and link back to `/` and `/teach`.
- Style the form using existing CSS variables in `src/styles/site.css`. Add a `/* ============ BOOKING FORM ============ */` block. Inputs: bone background, 2px ink border, 3px radius, mono labels uppercase with `.18em` letter-spacing, matching the existing card treatment. Ensure focus states are visible (`outline:2px solid var(--ember); outline-offset:2px`) for accessibility.
- Must be fully usable at 375px wide.

### Wire it up
- `src/pages/lessons.astro` `#book` section: put `<BookingForm />` as the primary element. Keep the email and phone cards but **demote them**: move them below the form under a small heading `// Prefer to just call or email?` and reduce their visual weight (single row, smaller type).
- Delete the "What to mention when you reach out" paragraph (lessons.astro ~line 223). The form now collects all of it.
- `src/pages/index.astro` FINAL CTA section (`#book`, ~line 482): embed `<BookingForm />` **inline** so a homepage visitor never has to navigate away to book.
- The three pricing cards on `lessons.astro` should link to `#book` and pass plan context (e.g. `href="#book?plan=monthly"` is not enough on its own; add a small client script in `public/js/site.js` that reads a `data-plan` attribute on the clicked pricing CTA, scrolls to `#book`, and sets the Plan `<select>` value accordingly).

---

## TASK 2 — Fix mobile navigation + add sticky mobile CTA

### 2a. Broken mobile nav
`src/styles/site.css` line ~82:
```css
@media (max-width:780px){
  .nav-links a:not(.nav-cta){display:none}
}
```
Below 780px, About / What I Teach / Lessons / FAQ are **all hidden with no hamburger**. Mobile visitors can reach exactly one page. This is a bug.

**Fix:** Add a hamburger button to `src/components/Nav.astro` (visible only below 780px, `aria-expanded`, `aria-controls`, `aria-label="Menu"`). It toggles a full-screen or slide-down panel containing About, What I Teach, Lessons, FAQ, plus the ember CTA. Toggle logic goes in `public/js/site.js`. Close on link click, on Escape, and on outside click. Respect `prefers-reduced-motion` (an existing block is at site.css ~line 742).

### 2b. Sticky mobile CTA bar
New component `src/components/MobileCTABar.astro`, rendered from `src/layouts/BaseLayout.astro` on every page. Below 780px only, fixed to the bottom of the viewport:
- Left: ember `Book Free Trial` button linking to `/lessons#book` (or `#book` when already on a page that has the form).
- Right: icon/short button `Call` → `tel:7708317936`.
- Add matching `padding-bottom` to `footer` so the bar never covers footer content.
- Hide the bar when the `#book` form is already in the viewport (IntersectionObserver in `site.js`).

---

## TASK 3 — Fix the pricing/offer math

### Problem
`$159/mo ÷ 4 lessons = $39.75/lesson`. À la carte is `$40/lesson`. **The monthly commitment saves the customer 25 cents.** There is no rational reason to commit to the plan the site is pushing.

### Fix
This is a business decision, so implement the default below and flag it:

- Raise à la carte from **$40 → $50 per lesson** in `src/pages/index.astro` (pricing section, ~line 349) and `src/pages/lessons.astro` (~line 63), plus the `description` meta on lessons.astro and anywhere else `$40` appears (grep for `40`).
- Add a savings line to the featured Weekly card: `Save 20% vs. single lessons.` in mono, ember.
- Leave `TODO(jonathan): confirm à la carte price increase to $50` as an HTML comment beside each change so it's easy to revert.

### Also
Delete this bullet from the À La Carte card (`lessons.astro` ~line 69): `Try-before-you-commit if free trial isn't enough.` It is an escape hatch on the card you least want chosen.

---

## TASK 4 — Testimonials

### Problem
`src/pages/index.astro` ~lines 373-398. All three testimonials are anonymous: "Parent of a 12-year-old student", "Adult Student · 2 years", "Teen Student · 16". Anonymous testimonials read as fabricated and reduce trust rather than building it.

### Fix
- Restructure the `.quote-attr` markup to support: **First name + Last initial**, town, and an optional avatar image (`src/assets/`). Add optional star-count and source (e.g. "Google Review") with a link.
- Do **not** invent names. Leave the existing quote text, replace attribution with `TODO(jonathan): real name + town, or link to the Google review` in an HTML comment, and keep the current placeholder text rendering until Jonathan supplies real data.
- If a Google Business Profile exists, add a `See all reviews on Google →` text link under the grid (leave the `href` as `TODO(jonathan)`).

---

## TASK 5 — Copy rewrites

### 5a. Hero (`src/pages/index.astro`, lines 34-58)

Keep the H1 (`Learn Guitar / From a Working / Musician.`). It works.

Replace the sub-headline (line 41) with:
> Private guitar, bass, and ukulele lessons in Suwanee, or online anywhere. Ten years on Atlanta stages, five years teaching. Tell me the song you wish you could play, and I'll build you the plan to play it.

Add a micro-trust line in mono, directly beneath the `.cta-row` (above or replacing the existing `.trust` row, your call, but keep the `Ages 6+ / In-Person & Online / All Levels` chips somewhere):
> First lesson free. No registration fee. No contract. Cancel any time.

Change the secondary hero CTA from `Meet Jonathan` (`/about`) to **`Watch Me Play →`**, opening a video. See Task 7. If no video is available yet, point it at the YouTube channel `https://www.youtube.com/@freehatmusic` with `target="_blank" rel="noopener"` and leave a `TODO(jonathan): swap for an embedded 45s teaching/playing clip`.

### 5b. Hero setlist card (lines 62-100)
- Trim the tracklist from six items to four (keep A1 Rock & Blues, A2 Funk Rhythm & Groove, A3 Lead & Improvisation, B1 Songwriting).
- Remove `$159/mo` from `.sc-foot` (line 97). Price does not belong in decorative furniture. Keep `Recorded live · Suwanee GA`.

### 5c. Section titles: break the monotony
Every section title on the site is a short punchy sentence ending in a period. The uniform rhythm is itself an "AI-written" tell. Rewrite **at least three** of these across the site so the cadence varies (use a question, a fragment, or a longer line):
- `Simple. Flexible. No Tricks.` (index, how-it-works, line 285) → e.g. `Three steps. No sign-up fee.` or a question form.
- `The FAQ.` (index, line 444) → something with more content, e.g. `Questions I Get Every Week`
- `Three Ways to Start.` (lessons.astro, line 28)
- `One Teacher. Nine Styles.` (teach.astro, line 30)

### 5d. Global phrase purge
Grep and rewrite every instance:
- `"meets you where you are"` / `"meet you where you are"` — **6 occurrences** (about.astro ×2, index.astro ×2, faq.astro ×1, teach.astro ×1). Keep at most one, rewritten.
- The line `"The stuff I teach is the stuff I do every weekend"` appears **twice on the homepage**: the divider quote (line 273) and the band section (line 418). Keep it in the divider quote only; rewrite the band paragraph.
- `"No pressure, no commitment."` (index.astro line 293)
- `"If you bring the curiosity, I'll bring the roadmap."` (index.astro line 130)
- `"Life happens"` (index.astro line 463)

### 5e. The missing audience: the parent buyer
The site is written almost entirely for a young player who wants to shred. A large share of traffic is a parent in Suwanee searching "guitar lessons near me" for a 9-year-old. She does not care about Phish tributes or jamtronica. She cares: *Is he patient? Is my kid safe? Will they stick with it? Where is it? What does it cost?*

Add **one dedicated block on the homepage** (place it between the "How It Works" and "Pricing" sections) speaking directly to parents. Cover: lessons for ages 6+, what a first month looks like for a total beginner, how progress gets communicated to parents, quarterly student performances, and where lessons happen. Keep the poster aesthetic, keep it short (a 3-column cell grid matching `.expect-grid` would work). Draft the copy in Jonathan's voice: plainspoken, no hype, no em dashes.

### 5f. Button label
`Sign Up →` on the featured pricing card (index.astro line 344, lessons.astro line 58) implies a credit card. The trial is free. Change both to **`Start Free Trial →`**.

Also change the final CTA headline (index.astro line 488) from `Let's Make Some Noise.` (a vibe, not an action) to **`Book Your Free Lesson.`**

---

## TASK 6 — CTA placement

Currently the homepage has a **five-screen dead zone**: after the hero CTA, the next clickable CTA is the pricing section. Between them sit About, credentials, nine style cards, a photo divider, and three how-it-works steps.

Add CTAs at these positions:

| Location | Type | Copy |
|---|---|---|
| After the 9-card styles grid (index.astro, after line 258) | **New inline strip** (reuse the `.inline-cta` class already in site.css ~line 1052) | `Don't see your style? Ask me. The first lesson is free.` + `Book a Free Trial →` |
| After the testimonials grid (index.astro, after line 398) | Secondary text link, ember | `See lesson plans and pricing →` → `/lessons` |
| Final CTA section (index.astro, ~482) | Primary | Inline `<BookingForm />` (Task 1) replaces the mailto/tel buttons; keep those as small secondary links below |

---

## TASK 7 — Video proof

A guitar teacher's site with no video is leaving conversion on the table. Nobody buys lessons from a person they've never heard play.

- Add a lightweight, click-to-load YouTube embed (facade pattern: a static poster image + play button that swaps in the iframe on click, so it costs nothing on initial load). Do not load the YouTube iframe on page load.
- Placement: the hero secondary CTA (`Watch Me Play →`) opens it in a modal/lightbox, and/or a dedicated block in the Band section of the homepage.
- Leave `TODO(jonathan): supply a 45-90 second clip, ideally teaching, not just performing` and default to a video from `https://www.youtube.com/@freehatmusic`.

---

## TASK 8 — Color discipline

In `src/styles/site.css`:
- `.nav-cta:hover` (line ~81) currently sets `background:var(--neon)`. **Remove.** Hover should darken/shift ember (use `--ember-deep`) and keep the existing translate + box-shadow.
- Audit every use of `--neon`. It may remain as: the "Now Booking" status dot, section eyebrow accents, and text highlights. It may **not** be a button background or button hover.
- `--haze` (#6B5BFF) is defined at line 10 and effectively unused. Either delete the variable or deploy it deliberately (e.g. as the FAQ section accent). Pick one, don't leave it dangling.

---

## TASK 9 — Verification pass

After all tasks:
1. `npm run build` passes clean.
2. `grep -rn '—' src/pages src/components` returns **zero** results in user-facing copy.
3. `grep -rni 'where you are' src/` returns at most 1 result.
4. Every `href` that says "Book" resolves to a page containing an actual form.
5. Test at 375px: nav hamburger opens and closes, sticky CTA bar is visible and doesn't overlap the footer, the booking form is fully usable.
6. Keyboard-only pass: tab through the booking form and the mobile nav. All focus states visible.
7. Submit the form on a Netlify deploy preview and confirm the submission lands in the Netlify Forms dashboard and that `/thanks` renders.
8. Confirm no invented names, quotes, or credentials were added. Every gap should be a visible `TODO(jonathan):`.
