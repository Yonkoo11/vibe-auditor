# UX Research: Visual Hierarchy, Layout & Information Architecture

Research compiled from Steve Krug, Jakob Nielsen / NN/g, Luke Wroblewski, and Vitaly Friedman / Smashing Magazine.

---

## Steve Krug (Don't Make Me Think)

### Top 10 Actionable Rules

1. **Design for scanning, not reading.** Users don't read web pages word-by-word. They scan for relevant words, phrases, and visual anchors. Treat every page like a billboard going by at 60 mph.

2. **Create clear visual hierarchy.** Three traits of good hierarchy:
   - More important = more prominent (larger, bolder, more whitespace around it)
   - Logically related items = visually related (grouped, same style)
   - Nested items = visually contained within their parent

3. **Omit half the words, then omit half again.** Krug's Third Law of Usability: "Get rid of half the words on each page, then get rid of half of what's left." Kill all "happy talk" (intro text that says nothing). No one reads it.

4. **Make it obvious what's clickable.** Every clickable element should look clickable through color, underline, or button treatment. Don't make users guess what's interactive.

5. **Use conventions ruthlessly.** Users spend most of their time on other sites. Logos top-left. Navigation top or left. Search top-right. Don't innovate on navigation unless you have proof your way is better. Clarity trumps consistency.

6. **Three mindless clicks beat one thoughtful click.** The old "three-click rule" is wrong. Users tolerate any number of clicks as long as each is effortless, unambiguous, and confident. The pain is in thinking, not clicking.

7. **The Trunk Test for navigation.** Imagine being dropped on any random page of your site. You should immediately answer: What site is this? What page am I on? What are the major sections? What are my options at this level? Where am I in the hierarchy? How can I search?

8. **Break pages into clearly defined areas.** Users scan by zones. Use visual boundaries (whitespace, rules, background color) to chunk content into scannable regions. Each region should have an obvious purpose.

9. **Format content to support scanning.** Use headings liberally. Keep paragraphs short. Use bulleted lists. Bold key phrases. Never use a wall of text.

10. **Test with 3 users monthly.** One morning per month, three users, watching them try to use your site. This catches more problems than any amount of expert review.

### Common Mistakes / Anti-Patterns

- **Happy talk:** Intro paragraphs that welcome users but say nothing useful. "Welcome to our amazing platform that helps you..." -- delete all of it.
- **Instructions nobody reads:** If you need instructions, the design has already failed. Make it self-evident instead.
- **Overly clever naming:** Cute or branded navigation labels instead of clear ones. Call it "Jobs" not "Career Ecosystem."
- **Arguing about visual preferences in meetings.** "I like blue" debates waste time. Test with users instead.
- **Religious debates (dropdown vs. tabs, etc.).** The answer is always: test it. Don't debate, observe.

### Specific Measurements

- **Billboard rule:** If a user can't identify the page purpose in 3-5 seconds, you've failed.
- **User testing cadence:** 3 participants, 1 morning per month.
- **Word reduction target:** Cut 50% of copy, then cut 50% of what remains.

---

## Jakob Nielsen (Nielsen Norman Group)

### The 10 Usability Heuristics

1. **Visibility of system status.** Always show users what's happening. Loading indicators, progress bars, "You Are Here" markers. Feedback within 0.1s feels instant, within 1.0s keeps flow, within 10s is the limit before users bail.

2. **Match between system and real world.** Use the user's language, not system jargon. "This page doesn't exist" not "Error 404." Follow real-world conventions for order and logic.

3. **User control and freedom.** Always provide an "emergency exit." Support undo and redo. Let users back out of any action without penalty. Never trap them in a flow.

4. **Consistency and standards.** Don't make users wonder if different words or icons mean the same thing. Follow platform conventions (iOS patterns on iOS, Material on Android). Internal consistency within your product.

5. **Error prevention.** Better than good error messages: prevent the error. Use constraints, defaults, confirmations for destructive actions, and smart defaults. Eliminate error-prone conditions.

6. **Recognition rather than recall.** Make options, actions, and information visible. Don't force users to memorize things from one screen to another. Show, don't ask them to remember.

7. **Flexibility and efficiency of use.** Serve both novice and expert users. Provide shortcuts (keyboard shortcuts, recent items, favorites). Let experts accelerate without burdening beginners.

8. **Aesthetic and minimalist design.** Every extra unit of information competes with the relevant information and diminishes its relative visibility. The Google homepage is the canonical example: one input, two buttons, nothing else.

9. **Help users recognize, diagnose, and recover from errors.** Error messages in plain language. State the problem clearly. Suggest a solution. Never show raw error codes.

10. **Help and documentation.** Even if the system works without documentation, provide it. Make it searchable, task-focused, concise, and close to the action.

### Nielsen's Typography & Readability Research

- **Optimal line length:** 50-75 characters per line. 66 characters is the sweet spot.
- **Line height:** 1.5x the font size (150%) as baseline. Increase for longer lines.
- **Reading speed vs. preference:** Users read faster with longer lines but prefer shorter lines. Design for comfort over speed.
- **Font size minimum:** 16px for body text on screens. Smaller causes squinting on mobile.
- **Comprehension test:** If test users score 60%+ on comprehension questions, the text is reasonably readable.

### Nielsen's F-Pattern Research (Eye-Tracking)

From NN/g's eye-tracking studies (confirmed in a follow-up study 11 years later):

- **First horizontal scan:** Users read across the top of the content area, forming the top bar of the F.
- **Second horizontal scan:** Users drop down and read a shorter horizontal line, forming the F's lower bar.
- **Vertical scan:** Users scan the left side vertically, sometimes slowly (solid stripe on heatmap), sometimes fast (spotted heatmap).
- **Left-side bias:** In LTR languages, text on the left and toward the top gets far more fixations than text on the right or bottom.
- **First words matter most:** Users fixate on the first 2-3 words of each line, especially below the first horizontal scan.

**When F-pattern applies:** Text-heavy pages, search results, content-rich pages, news articles, blog posts.

### Dark Mode Research (NN/g)

- **User split:** Roughly 1/3 use dark mode, 1/3 use light mode, 1/3 switch based on context.
- **Readability finding:** Users with normal or corrected vision read faster in light mode.
- **Astigmatism problem:** White text on black causes "halation" (glow/blur) for users with astigmatism (~33-50% of the population).
- **Exception:** Users with cataracts or cloudy ocular media may read better in dark mode.
- **Contrast is everything:** 70% of users report readability issues in dark mode due to poor contrast implementation.

### Common Mistakes / Anti-Patterns

- **Mystery meat navigation:** Icons without labels, relying on users to guess.
- **Dead-end pages:** Pages with no clear next step or way to go back.
- **Ignoring system status:** Long operations with no progress indicator.
- **Jargon in error messages:** "NullReferenceException" instead of "Something went wrong. Try again."
- **Inconsistent terminology:** Using "Cart" in one place and "Basket" in another.

---

## Luke Wroblewski (Mobile First, Web Form Design)

### Mobile-First Design Rules

1. **Start with mobile constraints.** Design for the smallest screen first. This forces you to identify what actually matters. Constraints breed clarity. Then progressively enhance for larger screens.

2. **Content first, navigation second.** On mobile, show content immediately. Navigation should be accessible but not dominating the viewport. Don't waste 50% of the screen on a nav bar.

3. **One thumb, one eyeball rule.** 75% of phone use involves thumbs. The bottom of the screen (thumb zone) is the most comfortable reach area. Primary actions belong at the bottom, content at the top.

4. **Touch targets: 44x44pt minimum.** Apple's HIG recommendation. Microsoft recommends 9mm (roughly 48px). The physical sweet spot is 7mm, but due to viewport variability, use 44-48px in practice. Minimum spacing between targets: 8px (2mm).

5. **Reduce to the minimum.** Mobile forces you to ask: "Is this absolutely necessary?" If you can't justify an element on a 320px screen, question whether it belongs on desktop either.

### Form UX Rules

6. **Single-column layouts only.** Multi-column form layouts cause users to miss fields. One column, top to bottom. No exceptions for forms.

7. **Top-aligned labels for speed.** Labels above inputs produce the fastest completion times. Use left-aligned labels only when the data is unfamiliar and users need to scan the label column.

8. **Bold labels, regular inputs.** Make labels visually heavier than placeholder text. Never use placeholder text as the only label (it disappears on focus).

9. **Show only required fields.** If most fields are required, mark the optional ones. If most are optional, mark the required ones. Never mark both. Reduce total fields ruthlessly.

10. **Inline validation, done right.** Validate after the user leaves a field (on blur), not while they're still typing. Show success states too, not just errors. Wroblewski's own research showed inline validation reduces errors by 22% and increases completion rates by 22%.

### Touch & Interaction Rules

- **Thumb zone mapping:**
  - Easy reach (green): Bottom center of screen
  - OK reach (yellow): Middle and bottom edges
  - Hard reach (red): Top of screen, far corners
  - Place primary actions in the green zone

- **Vertical scrolling is natural.** Users scroll. Long pages are fine. Horizontal scrolling is not natural and should be avoided except for deliberate carousels.

- **Progressive disclosure for forms.** Break long forms into steps. Show only what's relevant now. Reveal complexity gradually.

### Common Mistakes / Anti-Patterns

- **Desktop-first then shrink:** Leads to cramped, unusable mobile experiences. Always design mobile-first.
- **Placeholder-only labels:** Labels disappear on input focus, forcing users to clear the field to remember what goes there.
- **Multi-column forms:** Eye tracking shows users miss the right column entirely.
- **Disabling the submit button:** Users don't know why they can't proceed. Show what's wrong instead.
- **Too many fields:** Every additional field reduces conversion rate. Expedia removed one field and gained $12M in revenue.
- **Tiny touch targets on mobile:** Links and buttons below 44px cause fat-finger errors and frustration.

### Specific Measurements

| Element | Minimum Size | Recommended |
|---------|-------------|-------------|
| Touch target | 44x44pt | 48x48pt |
| Target spacing | 2mm (8px) | 4mm (16px) |
| Minimum text input height | 44px | 48-56px |
| Form field width | Match expected input length | Full width on mobile |

---

## Vitaly Friedman (Smashing Magazine)

### Design Systems & Component Rules

1. **Use an 8pt grid system.** All spacing values based on multiples of 8: 8, 16, 24, 32, 40, 48, 56, 64px. Use 4pt half-steps for tight spaces (icon padding, small text offsets). This divides cleanly across all screen densities.

2. **Internal spacing <= External spacing.** The space inside a component (padding) must be less than or equal to the space between components (margin/gap). This ensures elements group visually and don't float ambiguously.

3. **Line heights follow the grid.** Font sizes can be any value, but line-heights must snap to multiples of 8 (or 4 at minimum). Example: 15px font with 24px line-height. This keeps baselines aligned across columns.

4. **Rem-based spacing for consistency.** Set root to 16px, then use 0.5rem increments (8px steps). Spacing scale: 0.25rem (4px), 0.5rem (8px), 1rem (16px), 1.5rem (24px), 2rem (32px), 3rem (48px), 4rem (64px).

5. **Mega-dropdown timing: 300ms max.** Fade-in/fade-out transitions on mega-dropdowns should never exceed 300ms. Longer feels sluggish.

### Component-Specific Guidelines

6. **Accordions: max 4 visible items.** Each accordion section should never show more than 4 navigation items at a time. Both the icon and the category title should trigger expansion.

7. **Interactive trigger areas: 50x50px minimum.** For icons that trigger dropdowns or expandable sections, make the tap/click area at least 50x50px. Use chevrons to indicate expandability.

8. **Tables: row hover states + sticky headers.** For data tables, always provide row hover highlighting, sticky column headers, and horizontal scroll indicators when content overflows.

### Spacing System Implementation

```
Spacing scale (8pt grid):
--space-xxs:  4px   (0.25rem)  -- icon padding, tight gaps
--space-xs:   8px   (0.5rem)   -- inline element gaps
--space-sm:   16px  (1rem)     -- default component padding
--space-md:   24px  (1.5rem)   -- between related components
--space-lg:   32px  (2rem)     -- section padding
--space-xl:   48px  (3rem)     -- between sections
--space-xxl:  64px  (4rem)     -- major section breaks
--space-xxxl: 96px  (6rem)     -- hero/page-level spacing
```

### Grid & Layout Rules

9. **Content-driven breakpoints.** Don't use device-specific breakpoints. Resize your layout and add a breakpoint wherever it breaks. This future-proofs against new devices.

10. **Fluid spacing with clamp().** Use CSS `clamp()` for spacing and type that scales smoothly between breakpoints: `clamp(min, preferred, max)`. Example: `font-size: clamp(1rem, 2.5vw, 2rem)`.

### Common Mistakes / Anti-Patterns

- **Fixed spacing values that don't scale.** Use fluid spacing (clamp, calc) not hardcoded px.
- **Inconsistent spacing tokens.** Using 12px here, 15px there, 18px elsewhere. Pick a scale and stick to it.
- **Hover-only interactions.** Mega-dropdowns that only open on hover break on touch devices. Support click/tap too.
- **Ignoring the internal < external rule.** When padding inside a card equals the gap between cards, users can't tell where one card ends and another begins.
- **No spacing between icon and label.** Icons next to text need 8px minimum gap. Cramped icon+text feels broken.

---

## Cross-Expert Focus Areas

### Visual Hierarchy: Size Ratios Between Heading Levels

Use a typographic scale with a consistent ratio multiplier from a base size.

**Recommended scales (base = 16px body):**

| Ratio | Name | H6 | H5 | H4 | H3 | H2 | H1 |
|-------|------|-----|-----|-----|-----|-----|-----|
| 1.200 | Minor Third | 16px | 19px | 23px | 28px | 33px | 40px |
| 1.250 | Major Third | 16px | 20px | 25px | 31px | 39px | 49px |
| 1.333 | Perfect Fourth | 16px | 21px | 28px | 38px | 50px | 67px |
| 1.500 | Perfect Fifth | 16px | 24px | 36px | 54px | 81px | 122px |
| 1.618 | Golden Ratio | 16px | 26px | 42px | 68px | 109px | 176px |

**Practical guidance:**
- **Major Third (1.250)** is the sweet spot for most web apps. Readable hierarchy without extreme jumps.
- **Perfect Fourth (1.333)** works for editorial/content-heavy sites that need stronger heading presence.
- **Golden Ratio (1.618)** is dramatic, best for landing pages and hero sections, not body content.
- On **mobile**, use a tighter ratio (1.200-1.250). On **desktop**, use a wider ratio (1.250-1.333).
- Minimum contrast between adjacent heading levels: visible difference should be at least 20-25% in size.

### Information Density vs. Whitespace Balance

**Core principles from all four experts:**

1. **Whitespace is not wasted space.** Proper spacing between content blocks improves comprehension by up to 20% (research-backed).

2. **Two types of whitespace:**
   - **Micro whitespace:** Between lines, paragraphs, list items, grid items. Controls readability.
   - **Macro whitespace:** Between sections, around content blocks, page margins. Controls structure and breathing room.

3. **The density spectrum:**
   - **Low density** (lots of whitespace): Marketing pages, landing pages, portfolios. ~30-40% content to space.
   - **Medium density:** SaaS dashboards, e-commerce listings, documentation. ~50-60% content to space.
   - **High density:** Data tables, trading platforms, dev tools. ~60-75% content to space.

4. **Nielsen's rule:** Every extra piece of information competes with every other piece. When everything is emphasized, nothing is.

5. **Krug's rule:** When in doubt, remove. Then remove more.

6. **Friedman's rule:** Use the 8pt grid to enforce consistent density. If spacing feels off, check that internal padding < external gaps.

### F-Pattern and Z-Pattern: When Each Applies

| Pattern | Best For | Content Type | User Goal |
|---------|----------|-------------|-----------|
| **F-Pattern** | Text-heavy pages | Blog posts, articles, search results, documentation, news | Scanning for specific info |
| **Z-Pattern** | Visual/minimal pages | Landing pages, hero sections, product launches, onboarding | Guided toward a single action |

**F-Pattern design tactics:**
- Front-load important words in headings and first sentences
- Use descriptive subheadings as scanning anchors
- Bold key terms within paragraphs
- Left-align text (don't center body copy)
- Put the most important content in the first two paragraphs

**Z-Pattern design tactics:**
- Top-left: Logo/brand mark
- Top-right: CTA or navigation
- Center: Hero image or key message
- Bottom-left: Supporting info
- Bottom-right: Primary CTA button

**The Gutenberg Diagram (related):**
For evenly distributed content, attention flows: top-left (primary focus) -> top-right (strong follow-up) -> bottom-left (weak area, often ignored) -> bottom-right (terminal area, where CTAs should go).

### Fitts's Law: Practical Applications

**The formula:** Movement time = a + b * log2(Distance / Size + 1)

Translation: **Bigger targets that are closer to the cursor are faster to click.**

**Practical rules:**

1. **Primary buttons: 44-48px tall minimum.** On desktop, minimum 36px. On mobile, minimum 44px (Apple) to 48px (Material).

2. **Distance matters as much as size.** A "Save" button should be near the form it saves, not at the top of the page.

3. **Edge and corner targeting.** Screen edges act as infinite targets (cursor can't overshoot). Place key navigation at screen edges. This is why OS menus work at the top edge (Mac) or bottom edge (Windows taskbar).

4. **Destructive actions: make them smaller and further away.** "Delete Account" should be small, away from common actions. This is intentional friction.

5. **The size/distance relationship:**
   - If you double the distance, double the target size to maintain the same ease of use
   - Minimum padding between clickable elements: 8px (prevents misclicks)
   - Touch targets need more padding than mouse targets (fingers are ~7mm vs. 1px cursor)

6. **Practical button sizing:**

| Context | Min Height | Min Width | Recommended |
|---------|-----------|-----------|-------------|
| Desktop primary button | 36px | 80px | 40-48px tall |
| Desktop secondary button | 32px | 64px | 36-40px tall |
| Mobile primary button | 44px | 120px | 48-56px tall |
| Mobile icon button | 44x44px | -- | 48x48px |
| Nav link (desktop) | 32px | -- | 40px hit area |
| Nav link (mobile) | 44px | -- | 48px hit area |

### Dark Mode Readability

**What the top sites and design systems do:**

**Background colors:**
- Apple (iOS): Pure black `#000000` (OLED optimization)
- Material Design (Google): Dark gray `#121212` (reduces halation, better shadow depth)
- GitHub: `#0d1117`
- VS Code: `#1e1e1e`
- Twitter/X: Offers both `#000000` (AMOLED) and `#15202b` (dim)

**Recommendation:** Use `#121212` to `#1a1a2e` range. Avoid pure black unless targeting OLED battery savings.

**Text colors (on dark backgrounds):**
- Primary text: White at 87% opacity (`rgba(255,255,255,0.87)`) or `#e0e0e0` to `#ebebeb`
- Secondary text: White at 60% opacity (`rgba(255,255,255,0.60)`) or `#9e9e9e` to `#a0a0a0`
- Disabled text: White at 38% opacity (`rgba(255,255,255,0.38)`)

**Never use pure white `#FFFFFF` on pure black `#000000`.** The contrast ratio is 21:1, which causes eye strain and halation. Target 15.8:1 to 18:1 instead.

**WCAG contrast requirements (apply to dark mode too):**
- Normal text (< 18px): Minimum 4.5:1 contrast ratio (AA), 7:1 (AAA)
- Large text (>= 18px or >= 14px bold): Minimum 3:1 (AA), 4.5:1 (AAA)
- UI components and graphical objects: Minimum 3:1

**Color treatment in dark mode:**
- Desaturate brand colors. Saturated colors on dark backgrounds cause visual vibration.
- Use pastel/light variants of your color palette for dark mode.
- Test every text color against its actual background, not just theoretically.

### Responsive Breakpoint Best Practices

**The modern approach (2024-2025):**

Content-driven breakpoints > device-specific breakpoints. Resize your browser slowly and note where your layout breaks. Those are your breakpoints.

**That said, common practical breakpoints:**

```
--bp-mobile:    480px   (small phones -> large phones)
--bp-tablet:    768px   (phones -> tablets)
--bp-laptop:    1024px  (tablets -> small laptops)
--bp-desktop:   1280px  (laptops -> desktop monitors)
--bp-wide:      1440px  (desktop -> wide monitors)
--bp-ultrawide: 1920px  (wide -> ultrawide/TV)
```

**Key rules:**

1. **Mobile-first is the standard.** Write base CSS for mobile, use `min-width` media queries to add complexity for larger screens. Not the reverse.

2. **Max content width: 1200-1440px.** Beyond this, line lengths become unreadable and layouts feel sparse. Center content and add side margins.

3. **Fluid over fixed.** Use `clamp()`, `min()`, `max()`, relative units (`rem`, `%`, `vw`) instead of fixed `px` wherever possible. Example: `width: clamp(320px, 90vw, 1200px)`.

4. **3 breakpoints minimum, 5 maximum.** More than 5 breakpoints means your layout isn't flexible enough. Fewer than 3 means you're ignoring entire device categories.

5. **Test at breakpoint edges.** The worst UX happens at exactly 768px or 1024px where layouts transition. Test at these widths explicitly.

6. **Typography should scale.** Don't use the same 48px H1 on mobile and desktop. Use fluid type: `font-size: clamp(1.75rem, 4vw, 3rem)`.

7. **Touch vs. pointer.** Use `@media (hover: hover)` and `@media (pointer: fine)` to detect actual input capability, not just screen width. A 1024px tablet has touch input. A 1024px laptop has a mouse.

---

## Quick Reference: Combined Rules

### The Non-Negotiables (all experts agree)

1. Design for scanning, not reading
2. Clear visual hierarchy through size, weight, and spacing
3. Touch targets >= 44px on mobile
4. Conventions over innovation (unless you can prove it's better)
5. Single-column forms, top-aligned labels
6. 8pt spacing grid for consistency
7. 50-75 characters per line for body text
8. Mobile-first responsive design
9. 4.5:1 minimum contrast ratio for text
10. Test with real users, not opinions

### The Numbers That Matter

| Metric | Value |
|--------|-------|
| Body text size | 16px minimum |
| Line height | 1.5x font size (150%) |
| Line length | 50-75 characters (66 ideal) |
| Touch target | 44-48px minimum |
| Touch target spacing | 8px minimum |
| Spacing grid base | 8px |
| Heading scale ratio | 1.250 (app) to 1.333 (editorial) |
| Transition duration max | 300ms |
| Dark mode background | #121212 (not pure black) |
| Dark mode text | 87% white opacity for primary |
| WCAG AA contrast (normal text) | 4.5:1 |
| WCAG AA contrast (large text) | 3:1 |
| Max content width | 1200-1440px |
| F-pattern: words scanned per line | First 2-3 words get most fixation |
| Optimal breakpoint count | 3-5 |
| User test participants | 3 per round |

---

## Sources

- [Steve Krug - Don't Make Me Think (IxDF Summary)](https://www.interaction-design.org/literature/article/don-t-make-me-think-key-learning-points-for-ux-design-for-the-web)
- [Steve Krug - 6 Guiding Principles (Medium)](https://medium.com/@yashu02raghuwanshi/6-guiding-principles-from-the-dont-make-me-think-by-steve-krug-8dde3797abe6)
- [Steve Krug - 20 Thoughts on Usability (Tubik Studio)](https://blog.tubikstudio.com/dont-make-me-think-20-thoughts-on-usability-by-steve-krug/)
- [Jakob Nielsen - 10 Usability Heuristics (NN/g)](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [NN/g - F-Shaped Pattern for Reading (Original Study)](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/)
- [NN/g - F-Shaped Pattern Still Relevant on Mobile](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [NN/g - Text Scanning Patterns Eye-Tracking](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- [NN/g - Legibility, Readability, and Comprehension](https://www.nngroup.com/articles/legibility-readability-comprehension/)
- [NN/g - Golden Ratio and UI Design](https://www.nngroup.com/articles/golden-ratio-ui-design/)
- [NN/g - Fitts's Law Applications in UX](https://www.nngroup.com/articles/fitts-law/)
- [Luke Wroblewski - Mobile First (A Book Apart)](https://abookapart.com/products/mobile-first)
- [Luke Wroblewski - Web Form Design (Rosenfeld Media)](https://rosenfeldmedia.com/books/web-form-design/)
- [Luke Wroblewski - Touch Targets for Application Design](https://www.lukew.com/ff/entry.asp?1609)
- [Luke Wroblewski - Designing for Touch](https://www.lukew.com/ff/entry.asp?1699=)
- [Luke Wroblewski - Best Practices for Form Design (PDF)](https://static.lukew.com/webforms_lukew.pdf)
- [Vitaly Friedman - Smart Interface Design Patterns](https://smart-interface-design-patterns.com/)
- [Vitaly Friedman - Designing the Perfect Accordion (Smashing Magazine)](https://www.smashingmagazine.com/2017/06/designing-perfect-accordion-checklist/)
- [Vitaly Friedman - Complex UI Masterclass](https://smashingconf.com/online-workshops/workshops/complex-ui-vitaly-friedman/)
- [Smashing Magazine - Fitts' Law in the Touch Era](https://www.smashingmagazine.com/2022/02/fitts-law-touch-era/)
- [Smashing Magazine - Designing with Grid-Based Approach](https://www.smashingmagazine.com/2007/04/designing-with-grid-based-approach/)
- [8pt Grid Spacing System (Spec.fm)](https://spec.fm/specifics/8-pt-grid)
- [Spacing Best Practices - 8pt Grid (Cieden)](https://cieden.com/book/sub-atomic/spacing/spacing-best-practices)
- [BrowserStack - Responsive Design Breakpoints 2025](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Fitts's Law - Laws of UX](https://lawsofux.com/fittss-law/)
- [WCAG 2.1 - Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Dark Mode Accessibility Best Practices (DubBot)](https://dubbot.com/dubblog/2023/dark-mode-a11y.html)
- [12 Principles of Dark Mode Design (Uxcel)](https://uxcel.com/blog/12-principles-of-dark-mode-design-627)
- [Z-Pattern vs F-Pattern (Landing Page Flow)](https://www.landingpageflow.com/post/z-pattern-vs-f-pattern)
- [Typographic Scale Calculator (Elementor)](https://elementor.com/tools/typography-scale-calculator/)
- [Type Scale Ratio Guide (Art Attackk)](https://artattackk.com/blogs/ui-ux/type-scale-ratio/)
