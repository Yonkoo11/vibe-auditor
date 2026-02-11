# UX Research: Interaction Design & Micro-UX

Research compiled from Don Norman, Jared Spool, Lea Verou, Sara Soueidan, and Material Design 3.

---

## 1. Don Norman -- Affordances, Signifiers, Feedback, Mapping

Source: *The Design of Everyday Things* (Revised Edition, 2013)

### Core Framework: Seven Stages of Action

Norman's model splits user interaction into two gulfs:

**Gulf of Execution** (can the user figure out how to do it?):
1. Form a goal
2. Plan the action
3. Specify the action sequence
4. Execute the action

**Gulf of Evaluation** (can the user tell what happened?):
5. Perceive the state of the world
6. Interpret the perception
7. Compare outcome to goal

Every UI failure maps to one of these two gulfs. If users can't figure out what to click, that's execution. If they click and can't tell what happened, that's evaluation.

### Top 10 Actionable Rules

1. **Affordances must match capability.** A button affords pressing. A slider affords dragging. If something is clickable, it must look clickable. In dark UIs, flat design strips away affordance cues -- you must compensate with other signifiers.

2. **Signifiers > Affordances for design.** Affordances are what's possible; signifiers are what's *perceived* as possible. A door handle is an affordance; the "PUSH" label is a signifier. In UI: the cursor change to pointer, the underline on a link, the subtle shadow on a card are all signifiers. "Affordances determine what actions are possible. Signifiers communicate where the action should take place. We need both."

3. **Feedback must be immediate and informative.** Every action needs a response. No response = user repeats action or abandons. Feedback must communicate: (a) that the action was received, (b) what is happening, (c) what the result was.

4. **Mapping must be natural.** The layout of controls should mirror the layout of their effects. Left arrow moves left. Volume slider going up means louder. If your toggle is horizontal, left should be off and right should be on (in LTR languages).

5. **Constraints prevent errors.** Good design makes errors impossible rather than punishing them. Disable impossible actions. Gray out unavailable options. Don't let users submit incomplete forms.

6. **Conceptual models must be accurate.** Users form mental models of how a system works. If the model is wrong, every interaction becomes confusing. Dark mode toggle? Users expect it to switch the entire app instantly, not after a page reload.

7. **Visibility of system state is non-negotiable.** Users must always be able to tell: Where am I? What just happened? What can I do next? What is the system doing right now?

8. **Discoverability through exploration.** Users should be able to figure out what to do by looking, not by reading a manual. Every control should be visible or easily found.

9. **Perceived affordances drive behavior.** Users act on what they *think* they can do, not what they actually can do. A gray button looks disabled even if it's actually clickable. In dark mode, low-contrast elements read as disabled when they're not.

10. **Anti-affordances communicate "don't."** Grayed-out states, reduced opacity, and removed shadows all signal "this is not interactive." Use them deliberately and consistently.

### Dark Mode Mistakes (Norman's Lens)

- **Lost signifiers**: Shadows that signal elevation/clickability vanish against dark backgrounds. You lose your primary depth cue.
- **False disabled states**: Low-contrast text or buttons look inactive. If on-surface color is too close to surface color, interactive elements lose their perceived affordance.
- **Broken feedback**: Subtle color shifts (hover states, active states) that work in light mode become invisible in dark mode. The feedback loop breaks.
- **Inverted conceptual models**: Users expect dark = background, light = foreground. Breaking this (e.g., white containers on dark backgrounds with dark text inside) creates confusion.

---

## 2. Jared Spool -- Knowledge Gap, Progressive Disclosure, Cognitive Load

Source: UIE articles, conference talks, Center Centre

### Core Framework: The Magic Escalator of Acquired Knowledge

Every user sits somewhere on an escalator of knowledge about your interface:
- **Bottom**: Knows nothing about the product
- **Top**: Knows everything about the product

Two critical points on this escalator:
- **Current Knowledge**: What the user knows when they arrive
- **Target Knowledge**: What they need to know to complete their task

**The Knowledge Gap** = Target Knowledge - Current Knowledge

Design happens entirely in this gap. Your job is to shrink it from both sides:
- Move current knowledge UP (train/guide the user)
- Move target knowledge DOWN (simplify the interface)

A design is **intuitive** when the gap is effectively zero.

### Top 8 Actionable Rules

1. **Design for the knowledge gap, not for yourself.** You know the interface; your users don't. Every label, every interaction, every flow needs to be tested against "would someone with [X] current knowledge understand this?"

2. **Progressive disclosure shrinks target knowledge.** Don't show everything at once. Show what's needed for the current step. Advanced options stay hidden until relevant. This directly reduces cognitive load.

3. **Content IS the user experience.** Spool's research showed that the #1 driver of user satisfaction was content quality and findability, not visual design or interaction patterns. Labels, microcopy, error messages, and help text are UX work.

4. **Reduce, don't just organize.** Adding categories to a cluttered interface doesn't fix it. Removing unnecessary options does. Every additional choice increases cognitive load.

5. **Microinteractions train current knowledge.** Well-designed hover states, transitions, and feedback loops teach users what's interactive and what's not. Each micro-interaction is a tiny lesson that moves current knowledge upward.

6. **The "trunk test" for navigation.** Drop a user on any page. Can they answer: Where am I? Where can I go? How do I get back? If not, your navigation has a knowledge gap problem.

7. **Error messages are training opportunities.** Bad: "Error 422." Good: "That email is already registered. Want to sign in instead?" Every error message should move the user's current knowledge closer to target knowledge.

8. **Complexity hides behind simplicity.** The best interfaces handle complex workflows by breaking them into simple, sequential steps. Each step has minimal cognitive load. The wizard pattern works because it converts simultaneous decisions into sequential ones.

### Dark Mode Mistakes (Spool's Lens)

- **Broken progressive disclosure**: If your "show more" or expandable sections use color changes for signaling, dark mode can break the hierarchy. The subtle background-color shift that signals "this section is expanded" might become invisible.
- **Content readability degrades**: Body text in dark mode has higher halation risk. If the content IS the UX, unreadable content destroys the experience.
- **Visual hierarchy collapses**: The knowledge gap widens when users can't visually parse what's primary vs. secondary vs. tertiary. Dark mode color palettes need explicit, wider separation between hierarchy levels.

---

## 3. Lea Verou -- CSS Color Science, APCA, Accessible UX

Source: lea.verou.me, Color.js, W3C CSS Working Group contributions

### APCA vs WCAG 2.1: The Contrast Showdown

**WCAG 2.1 (current legal standard)**:
- Uses a simple luminance ratio
- AA: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)
- AAA: 7:1 for normal text, 4.5:1 for large text
- Known problems: Too many false negatives with light text on medium backgrounds. Treats dark-on-light the same as light-on-dark (human vision doesn't).

**APCA (proposed for WCAG 3.0)**:
- Uses perceptual lightness contrast (Lc values, scale of 0 to ~106)
- Accounts for polarity (dark-on-light vs light-on-dark)
- Font size AND weight factor into the minimum
- More accurate for real-world readability

### APCA Lc Lookup Table (Reference Font: Helvetica)

| Use Case | Min Lc | Font Size / Weight Minimums |
|---|---|---|
| Body text (preferred) | Lc 90 | 14px/400, 18px/300, or 12px/400 for non-body |
| Body text (minimum) | Lc 75 | 18px/400, 16px/500, 14px/700, 24px/300 |
| Content text (non-body) | Lc 60 | 24px/400, 18px/600, 16px/700, 36px/300 |
| Large/headline text | Lc 45 | 36px/400, 24px/700 |
| Sub-text, placeholders | Lc 30 | Absolute minimum for any readable text |
| Invisibility threshold | Lc 15 | Many users cannot perceive contrast below this |

Key insight from Verou: WCAG 2.1 places its lightness threshold much lower than APCA, resulting in false negatives -- color pairs that pass WCAG but are actually hard to read, especially white text on medium-dark backgrounds.

### Top 7 Actionable Rules

1. **Use OKLCh for color manipulation.** It's the most perceptually uniform polar color space CSS supports. When you adjust lightness in OKLCh, it actually looks like the same amount of change across different hues. HSL lies to you about this.

2. **Don't assume L difference = contrast.** Perceptual lightness (L in OKLCh) and contrast are different things. Contrast depends on polarity, adaptation, spatial frequency (text size), and more. Use APCA or at minimum WCAG 2.1 formulas, not eyeballing.

3. **Relative Color Syntax for dark mode palettes.** Verou designed CSS Relative Color Syntax (RCS), which lets you derive colors mathematically from a base. Example: `oklch(from var(--brand) calc(l * 0.7) c h)` to darken by 30% perceptually.

4. **Dark-on-light needs less contrast than light-on-dark.** APCA accounts for this asymmetry. White text on a dark background needs roughly 15-20% more Lc than the same text reversed. This is why dark mode is harder to get right.

5. **Test contrast with the actual font, not just color values.** A thin 300-weight font at 14px needs dramatically more contrast than a bold 700-weight at 24px. APCA's lookup table encodes this; WCAG 2.1 only has two buckets (normal/large).

6. **For auto-generated text colors on arbitrary backgrounds**, the CSS `contrast-color()` function (in development) aims to solve this. Until then, use APCA's Lc threshold: if background Lc > 60, use dark text; if < 40, use light text; between 40-60, check both.

7. **Desaturate colors for dark mode.** Saturated colors on dark backgrounds cause visual vibration and eye strain. In OKLCh, reduce chroma (C) by 20-30% when switching to dark mode while keeping hue (H) constant.

### Dark Mode Mistakes (Verou's Lens)

- **Inverting colors instead of re-deriving them**: `filter: invert(1)` or swapping foreground/background breaks contrast relationships. Dark mode needs its own derived palette.
- **Ignoring polarity**: The same Lc value is not equally readable in both polarities. Light-on-dark text needs higher contrast.
- **Over-saturated brand colors**: Brand blue at full saturation on #121212 causes halation and visual vibration. Reduce chroma.
- **Using HSL for color math**: HSL's lightness is not perceptually uniform. A 50% lightness in yellow looks nothing like 50% lightness in blue. Use OKLCh.

---

## 4. Sara Soueidan -- Accessibility, ARIA, Focus Indicators

Source: sarasoueidan.com, Practical Accessibility course, Smashing workshops

### Focus Indicator Design

#### The "Oreo Focus" Technique

Soueidan's signature approach creates a focus indicator visible on ANY background:

```css
:focus-visible {
  outline: 3px solid black;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px white;
}
```

Structure: Black outline (outer) > White gap (middle via box-shadow) > Black outline (inner from element border)

Like an Oreo cookie: dark-light-dark layering.

For dark mode, flip the order:
```css
/* Dark theme */
:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px black;
}

/* Or: use a two-color approach that works everywhere */
:focus-visible {
  outline: 3px solid transparent; /* Visible in Windows High Contrast Mode */
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px #000;
}
```

Why this works: As long as the two indicator colors have at least 9:1 contrast with each other, one of them will always be visible against any background.

#### WCAG Focus Requirements

| Criterion | Level | Requirement |
|---|---|---|
| 2.4.7 Focus Visible | AA | Keyboard focus indicator must be visible |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Focus indicator not entirely hidden by author-created content |
| 2.4.13 Focus Appearance | AAA | Min 2px border thickness, 3:1 contrast between focused/unfocused states |

For 2.4.13: Dotted/dashed outlines render half the area, so they need 4px minimum width to equal a 2px solid outline.

### Top 8 Actionable Rules

1. **Never remove focus outlines without replacement.** `outline: none` is accessibility destruction unless you provide a custom focus indicator that meets WCAG 2.4.7 at minimum.

2. **Use `outline`, not just `box-shadow`, for focus.** Windows High Contrast Mode overrides box-shadows but preserves outlines. If you must use box-shadow for styling, add `outline: 3px solid transparent` so WHCM users still see the focus ring.

3. **`:focus-visible` over `:focus`.** Modern browsers show `:focus-visible` only for keyboard navigation, not mouse clicks. This gives you keyboard accessibility without visual noise for mouse users.

4. **Use semantic HTML landmarks before ARIA.** `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>` (with accessible name) already have landmark roles. ARIA should fill gaps, not duplicate native semantics.

5. **ARIA is powerful but dangerous.** "No ARIA is better than bad ARIA." Misused ARIA attributes create worse experiences than no ARIA at all. Common mistake: `role="button"` on a `<div>` without keyboard handling (Enter + Space).

6. **Every landmark needs a unique label if duplicated.** Multiple `<nav>` elements? Each needs an `aria-label`: `<nav aria-label="Main">`, `<nav aria-label="Footer">`. Screen readers list landmarks by role + label.

7. **ARIA live regions for dynamic content.** Toast notifications, form validation, real-time updates: use `aria-live="polite"` (waits for idle) or `aria-live="assertive"` (interrupts). Put the live region in DOM first, then inject content.

8. **Skip-to-content is still required.** Even with landmarks, a skip link is the fastest way for keyboard users to bypass navigation. Pattern: visually hidden link that becomes visible on focus, jumps to `<main>`.

### Skip-to-Content Pattern

```html
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <header>...</header>
  <nav>...</nav>
  <main id="main-content" tabindex="-1">
    ...
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  color: var(--color-on-surface);
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 8px 0;
}

.skip-link:focus {
  top: 0;
}
```

The `tabindex="-1"` on `<main>` ensures it receives focus when the skip link is activated, even though it's not normally focusable.

### Required ARIA Landmark Structure

```html
<body>
  <header>           <!-- banner role (auto) -->
    <nav aria-label="Main">  <!-- navigation role -->
    </nav>
  </header>
  <main>             <!-- main role (auto, only ONE per page) -->
    <section aria-label="Featured">  <!-- region role (needs label) -->
    </section>
  </main>
  <aside>            <!-- complementary role (auto) -->
  </aside>
  <footer>           <!-- contentinfo role (auto) -->
  </footer>
</body>
```

### Dark Mode Mistakes (Soueidan's Lens)

- **Focus indicators disappear**: Default browser focus outlines are often blue or black -- both invisible on dark backgrounds. Always provide custom focus indicators.
- **Losing outline in WHCM**: Using only `box-shadow` for focus means Windows High Contrast Mode users see nothing. Always pair with `outline`.
- **Low-contrast disabled states**: Dark mode disabled elements are often so low-contrast they're invisible, meaning screen reader users who can see partially get no visual cue.
- **`aria-label` on landmarks gets lost**: If your dark mode toggle changes the whole page structure (re-renders), live regions may not announce changes properly.

---

## 5. Material Design 3 -- Elevation, State Layers, Motion

Source: m3.material.io, material-foundation/material-tokens

### Elevation System

| Level | dp Value | Usage | CSS Shadow (approximate) |
|---|---|---|---|
| Level 0 | 0dp | Flat surfaces, filled buttons | `none` |
| Level 1 | 1dp | Elevated cards, bottom sheets | `0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)` |
| Level 2 | 3dp | Navigation bar, menus | `0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)` |
| Level 3 | 6dp | FABs, dialogs | `0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)` |
| Level 4 | 8dp | Hover state elevation (cards) | `0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)` |
| Level 5 | 12dp | Highest elevation (rare) | `0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)` |

**Critical for dark mode**: M3 uses **tonal elevation** instead of shadows in dark themes. Each elevation level adds a semi-transparent primary color overlay to the surface. Shadows are nearly invisible against dark backgrounds, so tonal color does the hierarchy work instead.

### State Layer System

State layers are semi-transparent overlays using the content color (e.g., on-primary for a primary button).

| State | Opacity | When Applied |
|---|---|---|
| Enabled | 0% | Default state, no overlay |
| Hover | 8% | Cursor over element |
| Focus | 12% | Keyboard focus on element |
| Pressed/Active | 12% | During press/tap |
| Dragged | 16% | During drag operation |
| Disabled (container) | 12% | Element is disabled |
| Disabled (content) | 38% | Text/icon within disabled element |

**Only one state layer at a time.** If an element is focused and then hovered, show hover (8%), not focus+hover (20%). When hover ends, return to focus (12%).

Implementation pattern:
```css
.button {
  position: relative;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transition: opacity 150ms ease;
  pointer-events: none;
}

.button:hover::before { opacity: 0.08; }
.button:focus-visible::before { opacity: 0.12; }
.button:active::before { opacity: 0.12; }
.button:disabled { opacity: 0.38; }
.button:disabled::before { opacity: 0; }
```

### Motion System: Duration Tokens

| Token | Duration | Usage |
|---|---|---|
| short1 | 50ms | Micro-feedback (ripple start, checkbox tick) |
| short2 | 100ms | Small state changes (color shifts, opacity) |
| short3 | 150ms | Hover states, simple transitions |
| short4 | 200ms | Button press, small element transitions |
| medium1 | 250ms | Dropdown open, card elevation change |
| medium2 | 300ms | Modal entry, page element transitions |
| medium3 | 350ms | Navigation transitions |
| medium4 | 400ms | Large element transitions |
| long1 | 450ms | Complex multi-element transitions |
| long2 | 500ms | Full-page transitions |
| long3 | 550ms | Complex exit animations |
| long4 | 600ms | Major layout shifts |
| extra-long1 | 700ms | Dramatic reveals |
| extra-long2 | 800ms | Extended sequences |
| extra-long3 | 900ms | Very large transitions |
| extra-long4 | 1000ms | Largest transitions (rare) |

**Rule of thumb**: Desktop animations should use 150-200ms. Mobile can go up to 300ms. Anything over 400ms feels sluggish for direct manipulation.

### Motion System: Easing Curves

| Token | Cubic-bezier | Usage |
|---|---|---|
| Emphasized (standard) | Two-phase: accel `(0.3, 0, 0.8, 0.15)` + decel `(0.05, 0.7, 0.1, 1)` | Default M3 motion for elements starting and ending on screen |
| Emphasized Decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Elements entering the screen |
| Emphasized Accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Elements leaving the screen |
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Simple transitions (color, opacity) |
| Standard Decelerate | `cubic-bezier(0, 0, 0, 1)` | Elements entering with simple motion |
| Standard Accelerate | `cubic-bezier(0.3, 0, 1, 1)` | Elements leaving with simple motion |
| Legacy (M2) | `cubic-bezier(0.4, 0, 0.2, 1)` | Backward-compatible with Material 2 |

The **emphasized** easing is a two-phase curve. For CSS, use the decelerate variant for enter and the accelerate variant for exit. For persistent on-screen transitions, the standard easing is cleaner.

### Dark Mode Mistakes (Material Design's Lens)

- **Using shadows for hierarchy in dark mode**: Shadows on dark backgrounds are nearly invisible. Switch to tonal elevation (surface tint overlays using primary color).
- **Pure black (#000000) backgrounds**: M3 recommends #121212 or similar dark gray. Pure black causes halation with white text and makes tonal elevation invisible.
- **Same state layer opacities**: The 8%/12%/16% system was designed for both light and dark. Don't change the percentages -- the `currentColor` approach handles the visual difference automatically since the content color changes.
- **Disabled states at wrong opacity**: 38% opacity on content in dark mode can make text unreadable if the base contrast wasn't high enough. Verify Lc > 30 (APCA) for disabled text.

---

## 6. Cross-Cutting Reference: State Feedback

### Minimum Visual Change by State

| State | Minimum Change | M3 Value | Notes |
|---|---|---|---|
| Hover | Perceivable lightness shift | 8% state layer | Must be noticeable within 50ms. If only color changes, needs 3:1 contrast with default state per WCAG 1.4.11. |
| Active/Pressed | Distinct from hover | 12% state layer | Should feel "pushed." Scale down (98-99%), darken, or both. Feedback within 100ms. |
| Focus | 2px+ outline, 3:1 contrast | 12% state layer + focus ring | Must be visible on ALL backgrounds. Use two-color technique. |
| Disabled | Reduced opacity, no interaction | 38% content opacity | Must look distinct from default. Remove pointer cursor. APCA Lc > 30 for text. |
| Selected | Persistent visual marker | Tonal fill change | Check mark, background fill, or border change. Must survive loss of color perception. |
| Loading | Progress indication | Indeterminate/determinate | Never leave users wondering. Show skeleton, spinner, or progress bar within 1 second. |

### Animation Timing for Responsiveness

Based on Jakob Nielsen's response time research and M3 tokens:

| Threshold | Perception | Use For |
|---|---|---|
| < 100ms | Feels instantaneous | Button state changes, hover effects, toggles |
| 100-200ms | Fast, acknowledges input | Small transitions, dropdown opens, tooltip appears |
| 200-300ms | Smooth, perceivable | Modal entry, navigation transitions, card expansion |
| 300-500ms | Deliberate motion | Page transitions, complex layout changes, accordions |
| > 500ms | Feels slow | Only for dramatic reveals or loading states with progress |
| > 1000ms | Requires progress indicator | Any operation this long needs a spinner or progress bar |

### Making Clickable Elements Obvious

1. **Cursor change**: `cursor: pointer` for all clickable non-button elements (links, cards, custom controls)
2. **Hover state**: 8% state layer minimum, visible within 150ms
3. **Elevation/shadow**: Even 1dp of shadow signals "this lifts off the surface, therefore it's interactive"
4. **Color differentiation**: Interactive elements should use a distinct color from static text. In dark mode, this means your primary/accent color, not just white.
5. **Consistent patterns**: If cards are clickable, ALL cards should look the same. One clickable card among non-clickable ones violates affordance expectations.
6. **Underlines for text links**: In body text, underlines remain the strongest affordance for links. `text-decoration: underline` with `text-underline-offset: 3px` for readability.
7. **Size and touch targets**: Minimum 44x44px for touch, 24x24px for mouse. M3 uses 48x48dp touch targets.

---

## 7. Cross-Cutting Reference: Dark Mode Pitfalls

### The Big Five Dark Mode Mistakes

1. **Pure black backgrounds (#000000)**
   - Causes halation (bright text creates halo/blur effect)
   - ~47% of people have some degree of astigmatism -- halation hits them harder
   - Fix: Use #121212 (Material), #1C1C1E (Apple), or similar dark gray
   - The darker the background, the more desaturated your colors need to be

2. **Oversaturated colors**
   - Saturated colors on dark backgrounds visually vibrate
   - Causes eye strain and reduces readability
   - Fix: Reduce chroma by 20-30% in OKLCh. Keep hue constant, reduce C value.
   - Test: If a color "glows" or pulses when you stare at it, it's too saturated

3. **Simply inverting the light theme**
   - Contrast relationships are asymmetric (light-on-dark != dark-on-light)
   - Inverted shadows look wrong (they suggest light from below)
   - Fix: Design dark mode as its own system. Re-derive every color from a shared source using perceptual color math.

4. **Lost visual hierarchy**
   - Light mode uses shadows, background shifts, and borders for depth
   - Dark mode shadows are invisible; subtle background shifts compress
   - Fix: Use tonal elevation (lighter surface tints for higher elements). Increase the gap between hierarchy levels.

5. **Invisible focus/state indicators**
   - Blue focus rings vanish on dark blue backgrounds
   - Subtle hover states in light mode become imperceptible
   - Fix: Two-color focus indicators (Soueidan's Oreo technique). Verify all state layers are perceivable with dark mode contrast.

### Dark Mode Color Guidelines

| Element | Light Mode | Dark Mode | Notes |
|---|---|---|---|
| Background (base) | #FFFFFF | #121212 | Not pure black |
| Surface (elevated) | #F5F5F5 | #1E1E1E to #2C2C2C | Use tonal elevation |
| Primary text | #1A1A1A (87% black) | #E0E0E0 (88% white) | Not pure white |
| Secondary text | #666666 | #A0A0A0 | Check APCA Lc > 60 |
| Disabled text | #9E9E9E | #6B6B6B | APCA Lc > 30 |
| Borders/dividers | rgba(0,0,0,0.12) | rgba(255,255,255,0.12) | Subtle separation |
| Brand/accent | Full saturation OK | Reduce chroma 20-30% | Test for vibration |

---

## 8. Cross-Cutting Reference: Accessibility Minimums

### WCAG 2.1 AA (Legal Standard)

| Element | Minimum Ratio | Criterion |
|---|---|---|
| Normal text (<18pt / <14pt bold) | 4.5:1 | 1.4.3 Contrast (Minimum) |
| Large text (>=18pt / >=14pt bold) | 3:1 | 1.4.3 Contrast (Minimum) |
| UI components & graphical objects | 3:1 | 1.4.11 Non-text Contrast |
| Focus indicator vs adjacent | 3:1 | 1.4.11 Non-text Contrast |
| State change (hover vs default) | 3:1 | 1.4.11 Non-text Contrast |
| Focus visible | Must exist | 2.4.7 Focus Visible |

### WCAG 2.1 AAA (Recommended)

| Element | Minimum Ratio | Criterion |
|---|---|---|
| Normal text | 7:1 | 1.4.6 Contrast (Enhanced) |
| Large text | 4.5:1 | 1.4.6 Contrast (Enhanced) |
| Focus indicator area | >= 2px perimeter | 2.4.13 Focus Appearance |
| Focus indicator contrast | 3:1 focused vs unfocused | 2.4.13 Focus Appearance |

### APCA Targets (Future WCAG 3.0)

| Use Case | Min Lc Value | Equivalent Quality |
|---|---|---|
| Body text columns | Lc 75 (min), Lc 90 (preferred) | Fluent reading |
| Non-body content text | Lc 60 | Comfortable reading |
| Headlines, large text | Lc 45 | Readable at glance |
| Placeholder, disabled | Lc 30 | Minimum perceivable |
| Decorative, invisible | < Lc 15 | Below perception threshold |

### Screen Reader Patterns Checklist

- [ ] Skip-to-content link as first focusable element
- [ ] Single `<main>` landmark per page
- [ ] All content contained within landmarks
- [ ] Unique `aria-label` on duplicate landmark types
- [ ] `aria-live="polite"` regions for dynamic content (toasts, validation)
- [ ] `aria-live="assertive"` only for critical alerts
- [ ] Live region element exists in DOM before content injection
- [ ] All images have `alt` text (empty `alt=""` for decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages linked to inputs via `aria-describedby`
- [ ] Modal dialogs trap focus and return focus on close
- [ ] Custom controls have appropriate `role`, `aria-*` states, and keyboard handling

---

## Quick Reference: Implementation Priorities

### If you only do 5 things:

1. **Focus indicators**: Two-color (Oreo) technique, visible in both light/dark mode, minimum 2px solid outline with 3:1 contrast.

2. **State feedback**: 8% overlay on hover, 12% on focus/press, using `currentColor` so it adapts to any theme automatically.

3. **Animation timing**: 100-200ms for micro-interactions, 200-300ms for transitions, ease-out for entering, ease-in for leaving. Never exceed 400ms for direct manipulation.

4. **Dark mode base**: #121212 background (not #000), #E0E0E0 text (not #FFF), desaturated accent colors, tonal elevation instead of shadows.

5. **Semantic HTML + skip link**: Use native landmark elements, one `<main>`, skip-to-content as first focusable element, `aria-live` regions for dynamic updates.
