# Copy Rewrite Spec: Plain Language Pass
**Project:** Jonathan Zalzman Guitar Lessons (Astro 4 + Netlify)
**For:** Claude Code
**Round 2.** Round 1 (booking form, mobile nav, sticky CTA, pricing math, em dash purge) is **done and live.** Do not redo it.

---

## The one job

**Every headline on this site is a poem. None of them are sentences.**

`Pay for the Lesson. Not the Frills.` is the pricing page H1. It is meaningless. What are "the frills"? Nobody knows. It reads like it was written to sound like something rather than to say something.

The whole site does this. `The Long Way Around a Guitar.` `A Guitar Lesson From the Stage.` `From the Folks Who Showed Up.` `Everything You're About to Ask Me.` `Bring Your Sound. I'll Help You Find It.` These are moods, not information. A parent in Suwanee googling "guitar lessons near me" reads them and learns nothing.

**Rewrite every one so it says a literal, true, useful thing.**

### Rules

1. **A headline must survive the "so what does that mean" test.** If a reader can ask "...meaning what?" the headline failed. `Pay for the Lesson. Not the Frills.` fails. `$159/month. No registration fee, no contract.` passes.
2. **No metaphors, no wordplay, no abstractions.** Delete anything that gestures at a feeling instead of stating a fact. No "the spark," no "the chase," no "the roadmap," no "the pocket," no "the language of the greats."
3. **No fake-punchy fragments.** The site's tic is `Two Words. Two More Words.` It appears in nearly every section title. Kill the pattern. Write real sentences, or plain noun phrases. Vary the length so it doesn't sound machine-generated.
4. **State the concrete noun.** Prices, minutes, ages, towns, instruments, days. Specifics build trust; vibes do not.
5. **No em dashes.** Still zero. Do not reintroduce them.
6. **Keep the visual design exactly as it is.** Anton display type, the poster layout, the numbered sections, the ember/bone/ink palette, the `// mono` eyebrows, the vinyl "Side A" card. **This is a copy pass only.** Do not touch the CSS except where a rewrite needs a longer or shorter line to fit.
7. **Do not invent facts.** If a rewrite needs a number you don't have, leave `TODO(jonathan):`.
8. Where an H1 uses `<em>` and `<span class="accent">` for emphasis, keep those spans and re-apply them to the new words. Don't strip the styling hooks.

---

## TASK 1: Homepage (`src/pages/index.astro`)

| Line | Element | Current | Replace with |
|---|---|---|---|
| 36-40 | **H1** | Learn Guitar / From a Working / Musician. | **Keep it.** It is the one headline on the site that states a real, specific claim. Leave the `.l1/.l2/.l3` spans intact. |
| 42-44 | Hero sub | "...Tell me the song you wish you could play, and I'll build you the plan to play it." | Cut the last clause, it's the poetic one. Replace whole paragraph: `Private guitar, bass, and ukulele lessons for ages 6 and up. In person in Suwanee, or online anywhere. I've played Atlanta stages for ten years and taught for five. First lesson is free.` |
| 86-87 | Setlist card label / title | `// Side A · Now Teaching` / `Tonight's Setlist` | Keep `// Side A · Now Teaching` (it's a design element, and it's honest). Change `Tonight's Setlist` to **`What Students Are Learning`**. |
| 120 | Section 01 title | A Guitar Lesson From the Stage. | **`I Teach What I Actually Play.`** |
| 152 | Bio sidebar h3 | `// Credentials & Cred` | **`// Background`** ("Cred" is filler.) |
| 201 | Section 02 title | Bring Your Sound. I'll Help You Find It. | **`Nine Styles. Pick One or Mix Them.`** |
| 264 | Inline CTA h2 | Don't See Your Style? Ask Me. | Keep. It's plain and it's a real question. |
| 282-283 | Divider quote | "The stuff I teach is the stuff I do every weekend on stage." | Keep. It's literal and it's the best line on the site. |
| 295 | Section 03 title | Three Steps. No Sign-Up Fee. | **`How to Start Lessons`** |
| 325 | Parents section title | Thinking About Lessons for Your Kid? | Keep. Plain question, right audience. |
| 355 | Section 04 title | **Pay for the Lesson. Not the Frills.** | **`Pricing`** as the title, and put the substance in the deck below it: `$159 a month for a weekly lesson. No registration fee, no contract, no annual charge. Cancel any time.` |
| 411 | Section 05 title | From the Folks Who Showed Up. | **`What Students Say`** |
| 486 | Band section h2 | I Don't Just *Teach* Guitar. I Play It For a Living. | **`I Play Guitar for a Living.`** Keep the `<em>` hook on "Play". The "I don't just X, I Y" construction is the single most overused AI sentence shape. Kill it. |
| 487 | Band paragraph | "Want to know what your teacher actually sounds like? ..." | Drop the rhetorical question opener. Start with the fact: `I lead Free Hat, an Atlanta band with three releases on Spotify and a decade of live shows. When I demo a technique in a lesson, it's one I use on stage.` |
| 513 | Section 06 title | Questions I Get Every Week | Keep. |
| 555 | Final CTA eyebrow | Ready When You Are | **`Get Started`** |
| 557 | Final CTA h2 | Book Your *Free* Lesson. | Keep. It is an instruction, which is what a CTA should be. |

Also on this page: audit the **nine style-card descriptions** (lines ~205-260). Several are poetry. Rewrite these specifically:
- Jazz & Fusion: `...the language of the greats, without the gatekeeping.` → say what you actually teach: chord melody, soloing over changes, modal playing.
- Funk & Groove: `...finding the pocket.` → `...playing tight rhythm parts that lock in with a drummer.`
- Improvisation: `Soloing as a language, not a shape.` → this is the "not X, but Y" tic again. Replace with a literal description of what an improv lesson covers.
- Prog & Shred: `The technique to play anything you imagine.` → overpromise + vague. State the techniques.
- Theory: `Build the kind of ear that lets you learn songs by feel.` → `Learn to figure out songs by ear instead of hunting for tabs.`

---

## TASK 2: Lessons page (`src/pages/lessons.astro`)

| Line | Element | Current | Replace with |
|---|---|---|---|
| 7 | `<title>` | Lessons & Pricing: ... | Keep. |
| 21 | **H1** | **Pay for the *Lesson.* Not the *Frills.*** | **`Lessons and Pricing`** as the H1. If that feels too bare for the poster layout, use **`$159 a Month. Free First Lesson.`** and put the emphasis spans on `Free`. Either is fine; both say a real thing. Pick the second one. |
| 22 | Page lede | Simple monthly pricing. Free trial. No registration fees... | `Weekly 30-minute lessons for $159 a month. Your first lesson is free. No registration fee, no contract. Miss a lesson? Reschedule free with 24 hours notice. In person in Suwanee or online.` |
| 30 | Section 01 title | Pick How You Start. | **`Three Plans`** |
| 89 | Section 02 title | Inside a Lesson. | **`What a Lesson Looks Like`** |
| 118 | h3 | `// Between Lessons` | Keep. |
| 135 | Split h2 | Suwanee, GA & Surrounding Areas. | **`In-Person Lessons in Suwanee`** |
| 141 | Split h2 | **Anywhere With a Camera.** | **`Online Lessons Anywhere`** |
| 153 | Section 03 title | What You'll Need. | **`What You'll Need Before Lesson One`** |
| 189 | Gear item h3 | **Patience & 15 Minutes a Day** | This one's fine, but the body copy under it is a sermon. Trim to the fact: `Fifteen minutes a day beats two hours on Sunday. Consistency is what actually moves students forward.` |
| 200 | Section 04 title | Book Your Free Lesson. | Keep. |

---

## TASK 3: About page (`src/pages/about.astro`)

| Line | Element | Current | Replace with |
|---|---|---|---|
| 21 | **H1** | **The Long Way *Around* a Guitar.** | **`About Jonathan`** is too bare for a hero. Use **`Ten Years on Stage. Five Years Teaching.`** Put the accent span on `Five Years Teaching`. It's specific, true, and tells a parent exactly what they want to know. |
| 22 | Page lede | "...The short version is on the homepage. Here's the long one." | Cut the cute meta-framing. `I'm a working guitarist in Atlanta and a private teacher in Suwanee. Here's how I got here and how I teach.` |
| 57 | Section title | **The Path Here.** | **`Timeline`** |
| 64 | Timeline h3 | **The Spark** | **`Started Playing at 13`** (state the fact; the Buckethead story is in the body copy and that's where it belongs) |
| 72 | Timeline h3 | The Atlanta Years | Fine, but make it concrete if a date range exists: `Playing Atlanta Venues` |
| 141 | Section title | How I Teach. | Keep. It's plain. |
| 177 | Split h2 | **The Players Behind My Playing.** | **`Guitarists Who Influenced Me`** |
| 199 | Split h2 | **The Tools of the Trade.** | **`My Gear`** |
| 223 | Inline CTA h2 | **That's My Story. What's Yours?** | This is a greeting card. Replace: **`Want to Start Lessons?`** with the body copy stating the free first lesson. |

Also: the About body copy is the most poetic on the site. Go through it and cut these specifically:
- `"I picked up a guitar at thirteen, the night I saw Buckethead at the Masquerade in Atlanta, and I haven't put it down since."` — the "haven't put it down since" is a cliché. The Buckethead detail is great and true; keep the fact, drop the flourish.
- `"The years since have been a chase: shred, funk, jazz fusion..."` — "have been a chase" is poetry. Say: `Since then I've studied shred, funk, jazz fusion, progressive rock, and metal.`
- `"What I want most is to pass on the spark"` — cut entirely. Replace with something literal about what he wants students to be able to do.

---

## TASK 4: What I Teach page (`src/pages/teach.astro`)

| Line | Element | Current | Replace with |
|---|---|---|---|
| 19 | **H1** | **Bring Your *Sound.* I'll Help You *Find It.*** | **`What I Teach`** is accurate but flat for a hero. Use **`Nine Styles. One Plan Built Around You.`** Accent span on `One Plan Built Around You`. |
| 20 | Page lede | "...Here's the full menu, pick one, pick a few, or come in unsure..." | `Rock, blues, funk, jazz, fusion, prog, shred, metal, theory, bass, ukulele, songwriting, and improvisation. Students range from age 6 to 60, and from total beginners to advanced players. Not sure what you want? That's normal. We'll figure it out in the first lesson.` |
| 30 | Section h2 | Nine Styles, One Plan Per Student. | Redundant with the new H1. Change to **`How the Plan Gets Built`** and let the body explain it. |
| 180 | Inline CTA h3 | Don't See Your Thing? Just Ask. | Keep. |

The nine long style descriptions on this page have the same poetry problem as the homepage cards. Pass through all of them: every description should name **specific techniques, specific songs, or specific bands.** Cut any sentence that describes a feeling.

---

## TASK 5: FAQ page (`src/pages/faq.astro`)

| Line | Element | Current | Replace with |
|---|---|---|---|
| 19 | **H1** | **Everything *You're* About to *Ask Me.*** | **`Frequently Asked Questions`** is fine and honest, but for the hero use **`Questions I Get Every Week`** and accent `Every Week`. (Match the homepage FAQ section title.) |
| 20 | Page lede | "Six categories. Thirty-ish questions. If yours isn't here, just email or call, I answer either fast." | `Pricing, scheduling, gear, what to expect, and what I teach. If your question isn't answered here, email or call me and I'll get back to you the same day.` **TODO(jonathan): confirm "same day" is true. If not, use "within 24 hours."** |
| 205 | Inline CTA h3 | Still Got Questions? | Keep. |

Then read every FAQ answer. They're mostly good (they're literal by nature) but strip any remaining flourishes.

---

## TASK 6: Thanks page (`src/pages/thanks.astro`)

| Line | Element | Current | Replace with |
|---|---|---|---|
| 18 | **H1** | **Got It. Talk *Soon.*** | **`Request Received`** with accent on `Received`. |
| 19 | Page lede | "Thanks for reaching out. Your request is in, and I read every one myself. Here's what happens next." | `Thanks for reaching out. I read every message myself. Here's what happens next.` (Cut "Your request is in" — redundant with the H1.) |
| 26 | Section title | Three Quick Steps. | **`What Happens Next`** (the eyebrow already says this; change the eyebrow to `// 01` and let the H2 carry it, or just retitle to **`Next Steps`**) |
| 31 | Step h3 | I Reply | Make it specific: **`I Email You Back`** and state the window in the body. **TODO(jonathan): within 24 hours?** |

---

## TASK 7: Nav, footer, small strings

- `src/components/Footer.astro`, bottom bar: `Site built with care · Strings sold separately`. Cute, and it's the only place cute is allowed. **Keep it.**
- `src/components/Footer.astro`: everything else is already literal. No changes.
- Check the `MobileCTABar` and `BookingForm` button labels are plain instructions (`Book Free Trial`, `Book My Free Lesson →`). They are. No changes.

---

## TASK 8: Leftover bug from round 1

`src/pages/index.astro` line ~459 ships this to production inside `dist/index.html`:

```html
<p class="quotes-google" hidden>
  <a href="TODO(jonathan): Google reviews URL" ...>See all reviews on Google →</a>
</p>
```

It's behind `hidden` so no user sees it, but a placeholder string is in the shipped HTML. **Remove the `href` attribute entirely** (or comment out the whole `<p>`) until a real URL exists. Same for the commented-out `href="TODO(jonathan): Google review URL"` on line ~426.

---

## TASK 9: Verification

1. `npm run build` passes.
2. `grep -rn '—' src/` returns zero.
3. `grep -rn 'href="TODO' src/ dist/` returns zero.
4. **Read every `<h1>`, `<h2>`, and `<h3>` on the site out loud and ask "so what does that mean?"** If the answer isn't immediately obvious from the words alone, it isn't done.
5. Confirm no `Two Words. Two More Words.` fragment headlines remain outside the ones explicitly kept in this spec.
6. Confirm no new facts, names, numbers, or claims were invented. Any gap is a visible `TODO(jonathan):`.
