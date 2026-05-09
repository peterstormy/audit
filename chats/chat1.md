# Hero URL Input

_Started 2026-05-09 05:41 UTC_

---

## User



## Assistant

_[tool: update_todos]_

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Built **Stormy Guard.html** — a dark navy + electric blue landing page with:

- **Sticky pill navbar** with ⚡ logo and free-scan CTA
- **Hero** with subtle animated storm/lightning radial-gradient bg, italic *lawsuit* accent in the headline, Framer Motion fade-ups on each block
- **Mock audit report card** — frosted glass, scan-sweep effect, red 67/100 SVG ring, 4 violation rows with WCAG codes, severity pills
- **Stat strip** (4 stats), **How it works** (3 cards w/ lucide icons), **Pricing** (3 tiers, Most Popular border-accent), **Why Us** (4 reasons + overlay-trap call-out card with 983 lawsuits stat), **Final CTA**, footer
- All CTAs `mailto:contact@stormyguard.com`, smooth-scroll anchors, fully responsive

## User

Add the inline URL input to the hero. Single biggest conversion lever.
Fix the factual errors (50 → 55 WCAG criteria, the accessiBe phrasing, the "DOJ-recognized threshold" line, the body-text contrast). These are the things a smart prospect or a competitor's lawyer will catch and either bounce or screenshot.

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

Done. Hero now leads with a prominent URL input + Scan Free button (validates/normalizes the host, transitions through `Scanning… → Queued ✓`, dispatches a `sg:scan` event you can wire to `/api/scan` later). Microcopy and a small "See pricing ↓" link sit underneath; the old dual CTA row is gone.

Factual fixes:
- Mock report subtitle → "Below WCAG 2.2 AA conformance — 22 actionable issues found"
- "50 WCAG criteria" → **55** in both How It Works and Why Us
- accessiBe sentence rewritten to the safer phrasing: 2023 FTC settlement over deceptive marketing claims, overlays framed as "documented litigation magnet — not a defense"
- Body-text contrast bumped: `--muted-foreground` from `215 20% 55%` (~#7A8AA8, ~3.4:1) to `213 27% 84%` (~#CBD5E1, ~10:1 on the navy)

The bigger rebuild list (trust row, sample report, FAQ, founder, pricing restructure, citations) is untouched — say the word when you want me to tackle it.

## User



## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Hero form rebuilt as a three-state flow: URL entry → details (email + optional notes, with `Esc` to edit) → green-tinted confirmation card with Calendly CTA. Container styling stays consistent across states; transitions respect `prefers-reduced-motion`; live regions announce step changes; focus moves to the email input on State 2 and the Calendly link on State 3. Microcopy under the form now reads "**Manual** audit by certified auditors · Delivered within 24 hours · No credit card required". Submission posts through a `postAuditRequest()` stub that logs the payload and resolves `{ ok: true, queuePosition: null }` — swap that for the real `/api/audit-request` later. Calendly URL is `{{TODO: calendly-url}}`.

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

_[tool: snip]_

Verifier passed all three states. Fixed the cosmetic nit — removed `truncate` from the domain pill so short hosts like `amazon.com` render in full, and replaced it with `whitespace-nowrap` so long domains still don't break the layout.

## User



## Assistant

_[tool: snip]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: snip]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

All v3 fixes applied:

**Legal/factual**
- Pricing: "Compliance certificate" → "**Conformance attestation**"
- Hero microcopy: "certified auditors" → "**accessibility specialists**"
- Why-us pillar grammar fixed: "The benchmark **that** courts and the DOJ point to…"
- Stat strip pruned to 3 sourced stats — 3,948 lawsuits [UsableNet], 96% homepages with WCAG failures [WebAIM Million], $10K–$75K typical settlement range [UsableNet]. The unsourced 46% repeat-targeting stat is **removed** from the strip.
- Dashboard reconciled: "**22 critical issues shown · 47 total in full report**"

**CTA consistency**
- Nav, hero confirmation flow, and footer all say **"Request Free Audit"**
- Nav button demoted to ghost (transparent + thin border)
- Hero "See pricing ↓" rebuilt as a ghost button with chevron

**Hero headline**
- "Your site is one *audit* away from compliance" — same serif + italic-blue treatment, just on "audit"

**Mock dashboard reframe**
- Eyebrow "SAMPLE AUDIT REPORT" above the card
- File-text icon + "audit-sample.pdf" replace the URL bar
- Status reads "Audit Complete · Anonymized client"
- Button is "See sample report →" → `{{TODO: sample-pdf-url}}`

**Footer rebuild**
- Headline "Audit-ready in *14 days*."
- Subhead: "Manual WCAG 2.2 AA audit. Code-level fixes. Attorney-ready documentation. Flat fee, no surprises."
- Two CTAs side-by-side: "Request Free Audit" (scrolls to `#sg-url`) + "Book a 15-min call →" (`{{TODO: calendly-url}}`)
- Microcopy with emphasized **Manual**

Backlog (trust row, sample report section, founder, FAQ, pricing restructure) untouched per your scope.

## User



## Assistant

_[tool: snip]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

v5 upgrade applied — page now reads as a premium professional service:

**Surface & color**
- Background dropped to near-black w/ subtle blue undertone (#07090E base, #0C0F15 section variation)
- Grid pattern reduced to ~3% opacity, storm flash + secondary radials removed
- Cards on elevated `surface` (~#11141A) — no visible borders, shadow-only depth
- Electric blue now appears only on: H1 *audit*, primary CTAs, "14 days" italic in final CTA

**Typography**
- Fraunces (opsz 96, weight 400) replaces Instrument Serif for display
- Body 17px / 1.65, eyebrows 11px / 0.15em / gray-400
- H1 bumped to clamp(3rem, 6.5vw + 1rem, 5.5rem) at lh 1.0

**Hero**
- Eyebrow: Apple-keynote-style hairline-text-hairline (no ⚡ emoji)
- Spacing: eyebrow→H1 mt-11, H1→sub mt-8, sub→form mt-14
- Form: surface-color pill, no border, no glow, white/10 focus ring

**Stat strip rebuild**
- 3 stats, off-white numbers (#F5F5F7), gray-400 labels, 8% white hairline dividers
- Single italic source footnote below

**Pricing**
- Featured: bigger card (p-10), 3rem price, white-border MOST POPULAR pill, solid-blue button
- Others: surface card, ghost button, gray-500 checkmarks (no blue)

**Sample report**
- Muted coral dots (#D26A56), muted amber (#C99A66), score ring desaturated, ghost "See sample report"

**Why us**
- *widget* italic in pure white (no blue), 983 lawsuits in off-white, gray "INDUSTRY ALERT" eyebrow

**Buttons**
- All blue glow shadows removed, hover = opacity 0.9 only, nav CTA stays ghost

**Other**
- Footer headline → "Compliant in 14 days." (with blue *14 days* accent)
- ⚡ removed from nav and footer wordmarks
- Section padding bumped to py-32, hero pb-36
- prefers-reduced-motion media query disables all animations

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: done]_

Fixed — navbar wordmark now has `whitespace-nowrap` and the anchor has `shrink-0`, so "Stormy Guard" stays on one line at all viewport widths.

## User



## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: str_replace_edit]_

