# UX Research: Typography & Readability

Research from Oliver Reichenstein (iA), Erik Kennedy (Learn UI Design), and Butterick's Practical Typography. Focused on actionable rules with specific values.

---

## 1. Oliver Reichenstein (iA)

Source: "Web Design is 95% Typography" + iA responsive typography work

### Core Thesis

95% of the information on the web is written language. Optimizing typography IS optimizing readability, accessibility, usability, and overall graphic balance. It's not about picking great typefaces -- it's about how you use them.

### Actionable Rules

**R1. Line height: 140% as baseline, scale with column width**
- 140% of font size is a good starting benchmark for screen text
- Give screen text MORE line height than print (reading distance + pixel smear)
- Wider columns need MORE line height so the eye can jump to the next line
- Narrow columns (mobile) can use tighter line height

**R2. Font size is a function of reading distance, not taste**
- Phone (~12in away): smaller physical size OK because it's close to face
- Desktop (~24in away): needs larger size to compensate for distance
- Tablet: somewhere between
- iA Writer chose ONE optimal size per device based on average reading distance

**R3. Font weight must adjust for context (size, device, background color)**
- Dark backgrounds make white text shine brighter -- reduce weight or use font grading
- Small sizes need slightly heavier weight to maintain legibility
- High-DPI screens render thinner -- may need weight bump
- iA solves this with variable fonts that have thousands of grades

**R4. Micro typography is the atomic unit of design work**
- Correct leading (line height)
- Correct word spacing
- Correct letter spacing
- Active white space
- Dosed use of color
- These details matter more than layout tricks

**R5. Macro typography = web design**
- Page format, basic dimensions, column width = macro typography
- Visual hierarchy through headings, subheadings, spacing
- Structure for skim reading
- Macro and micro are equally important -- don't skip either

**R6. Responsive typography is about IMPRESSION, not just size**
- Goal: same reading impression regardless of device
- Adjust size, weight, spacing, and line height together as a system
- Changing just font-size is not responsive typography

### Common Mistakes (Reichenstein)
- Treating typography as decoration instead of the core interface
- Using font-size as the only responsive lever (ignoring weight, spacing, line-height)
- Not adjusting weight for dark backgrounds (text glows/blooms)
- Ignoring reading distance when choosing sizes
- Too many settings/options instead of one well-chosen default

---

## 2. Erik Kennedy (Learn UI Design)

Source: "7 Rules for Creating Gorgeous UI" (Parts 1 & 2), font size guidelines, Learn UI Design blog

### Actionable Rules

**K1. Use only ~4 font sizes per page**
- Header size (the big one)
- Default/body size (most common; body text, buttons, inputs, menus, dropdowns)
- Secondary size (~2px smaller than default; captions, supporting info, details)
- Tertiary/label size (smallest; metadata, fine print)
- Using too many font sizes is the single biggest beginner typography mistake

**K2. Body text: start at 16-17px, then adjust**
- Mobile web: 16px minimum (iOS zooms inputs below 16px)
- Desktop body: 16-18px for most UIs, up to 21px for reading-heavy pages
- Desktop pixels are ~33% smaller than mobile pixels, so desktop text should be ~33% larger than mobile for equivalent readability on reading-focused pages
- Secondary text: 13-14px

**K3. The "Up-Pop / Down-Pop" system for text hierarchy**
- **Up-pop styles**: larger, bolder, higher contrast, darker
- **Down-pop styles**: smaller, lighter weight, lower contrast, grayer
- Page titles: go all-out up-pop
- Everything else: mix BOTH up-pop and down-pop on the same element
- Example: large numbers with very light font-weight and lower-contrast color
- Example: small labels that are uppercase and very bold
- Key insight: style in CONTRASTING ways (larger but lighter, smaller but bolder)

**K4. Whitespace: double what feels natural**
- Default mental model should be "everything is whitespace until you add elements"
- Vertical space between menu items should be ~2x the text height
- Padding around 12px text: 12px above and below (equal to text height)
- Space between groups of elements: 25px+
- When in doubt, add more whitespace -- almost nobody uses too much
- Good whitespace makes messy interfaces look inviting and simple

**K5. Text over images: 5 reliable methods**
1. **Dark overlay**: translucent black over entire image. 35% opacity black is a reliable starting point. Works with any image.
2. **Floor fade**: gradient from transparent (middle) to ~20% black opacity (bottom). White text at bottom. Medium pioneered this. Subtle but effective.
3. **Scrim**: elliptical gradient from translucent black (behind text) to transparent (edges). More targeted than full overlay.
4. **Text shadow**: subtle shadow behind text for separation. Keep it tight and dark.
5. **Blur**: blur the area behind text. Often combined with slight darkening. Works well for dynamic content.

**K6. Contrast rules for text color**
- Body text on light bg: use dark gray, not pure black (less harsh)
- Body text on dark bg: use off-white, not pure #FFFFFF (reduces halation)
- Secondary text: lower contrast than primary, but still meets WCAG 4.5:1
- Disabled text: even lower contrast, ~38% opacity of text color
- Gray is the "classiest" color -- use liberally for secondary content

### Common Mistakes (Kennedy)
- Using too many font sizes (the #1 beginner error)
- Not enough whitespace (the #2 beginner error)
- Making everything high-emphasis (if everything is bold, nothing is bold)
- Pure black text on pure white (too harsh, use dark grays)
- Pure white text on pure black (causes halation/glow effect)
- Putting text on images without any contrast treatment
- Trying to emphasize elements with ONLY up-pop (no contrasting down-pop)

---

## 3. Butterick's Practical Typography

Source: practicaltypography.com -- Summary of Key Rules, Typography in Ten Minutes

### Actionable Rules

**B1. The Big Four of body text**
These four things matter more than anything else:
- **Point size**: 15-25px on web (10-12pt in print)
- **Line spacing**: 120-145% of font size
- **Line length**: 45-90 characters per line (including spaces)
- **Font**: use a professional font (not system defaults)

**B2. Specific CSS values for the Big Four**
```css
/* Butterick's ranges translated to CSS */
body {
  font-size: 18px;           /* 15-25px range; 18px is a solid default */
  line-height: 1.3;          /* 120-145% = 1.2-1.45; 1.3 is middle ground */
  max-width: 33em;           /* ~45-90 chars depending on font */
}
```

**B3. Bold vs. Italic: choose one, use sparingly**
- Bold and italic are mutually exclusive -- don't stack them
- Use as little as possible (if everything is emphasized, nothing is)
- Serif fonts: italic for gentle emphasis, bold for heavy emphasis
- Sans-serif fonts: skip italic entirely, use bold only (sans italic barely registers)
- Never underline (except links)

**B4. Letterspacing rules**
- ALL CAPS or SMALL CAPS: add 5-12% extra letterspacing (caps are designed to sit next to lowercase, so they look too tight together)
- Lowercase body text: never adjust letterspacing
- The smaller the all-caps text, the more letterspacing it needs
- Always enable kerning

**B5. Paragraph spacing: indent OR space, never both**
- First-line indent: 1-4x the font size (e.g., 12pt text = 12-48pt indent)
- OR space between paragraphs: 4-10pt
- Using both is a common amateur mistake

**B6. Page margins create line length**
- At 12pt, left/right margins of 1.5-2.0 inches give comfortable line length
- On web: use max-width on content container instead of page margins
- Don't let text span the full viewport width

**B7. Headings: space is the best emphasis**
- Best heading emphasis: generous space above and below
- Don't use all-caps for headings (if heading is a full sentence, it's too long for caps)
- Bold > italic for headings
- All-caps works for SHORT labels: table of contents, headers, footers, captions

**B8. Curly quotes, one space after periods**
- Use curly quotes (" ") not straight quotes (" ")
- One space between sentences, never two
- Use real em dashes, en dashes, and ellipses

### Common Mistakes (Butterick)
- Using system fonts (Times New Roman, Arial) -- the single easiest upgrade is a professional font
- Body text too small (below 15px on web)
- Lines too long (over 90 characters -- the most common web typography failure)
- Lines too short (below 45 characters -- cramped and choppy)
- Line spacing too tight (below 120%)
- Using both paragraph indent AND paragraph spacing
- All-caps paragraphs (extremely hard to read)
- Not adding letterspacing to all-caps text
- Underlining for emphasis
- Stacking bold and italic together

---

## Cross-Expert Consensus: The Rules That All Three Agree On

These principles appear across all three experts:

| Rule | Reichenstein | Kennedy | Butterick |
|------|-------------|---------|-----------|
| Line height 120-145% | 140% baseline | implicit | 120-145% explicit |
| Line length 45-90 chars | yes | yes | yes (the most critical) |
| Font size 16-20px body | device-dependent | 16-17px start | 15-25px range |
| Whitespace is paramount | "active white space" | "double what feels natural" | "space is the best emphasis" |
| Don't over-emphasize | "dosed use of color" | "up-pop + down-pop balance" | "if everything is bold, nothing is" |
| Weight adjusts for context | dark bg = lighter weight | lighter weight = down-pop | bold OR italic, not both |

---

## Specific Values Reference Card

### Font Sizes
| Context | Size | Source |
|---------|------|--------|
| Mobile body text | 16px minimum | Kennedy |
| Desktop body text | 16-21px | Kennedy + Butterick |
| Reading-focused desktop | 18-25px | Butterick |
| Secondary/caption text | 13-14px | Kennedy |
| All sizes per page | ~4 total | Kennedy |

### Line Height
| Context | Value | Source |
|---------|-------|--------|
| Default body | 1.4 (140%) | Reichenstein |
| Acceptable range | 1.2-1.45 | Butterick |
| Wide columns | higher end (1.4-1.5) | Reichenstein |
| Narrow columns (mobile) | lower end (1.2-1.3) | Reichenstein |
| Headings (large text) | 1.1-1.2 | common practice |

### Line Length
| Context | Value | Source |
|---------|-------|--------|
| Optimal range | 45-90 chars | Butterick (all three agree) |
| Ideal sweet spot | 65-75 chars | industry consensus |
| CSS approximation | max-width: 33em | Butterick |

### Letterspacing
| Context | Value | Source |
|---------|-------|--------|
| ALL CAPS / SMALL CAPS | +5-12% (letter-spacing: 0.05-0.12em) | Butterick |
| Smaller all-caps text | more spacing needed | Butterick |
| Body text (lowercase) | 0 (never adjust) | Butterick |

### Whitespace / Spacing
| Context | Value | Source |
|---------|-------|--------|
| Menu item padding | 2x text height | Kennedy |
| Space between groups | 25px+ | Kennedy |
| Paragraph spacing | 4-10pt OR first-line indent 1-4x font size | Butterick |
| Heading breathing room | generous space above/below | Butterick |

---

## Dark Mode & Complex Background Specific Rules

### Contrast Ratios (WCAG + Expert Guidance)

| Context | Minimum Ratio | Target | Source |
|---------|--------------|--------|--------|
| Body text (AA) | 4.5:1 | 7:1 | WCAG 2.1 |
| Large text 18px+ (AA) | 3:1 | 4.5:1 | WCAG 2.1 |
| Large text 14px bold+ (AA) | 3:1 | 4.5:1 | WCAG 2.1 |
| Body text (AAA) | 7:1 | -- | WCAG 2.1 |
| Large text (AAA) | 4.5:1 | -- | WCAG 2.1 |

### Dark Mode Typography

**Color choices:**
- Background: #121212 (Material Design baseline), NOT pure #000000
- Primary text: ~87% opacity white (roughly #DEDEDE on #121212)
- Secondary text: ~60% opacity white (roughly #9E9E9E)
- Disabled text: ~38% opacity white
- Never use pure #FFFFFF on pure #000000 (causes halation -- white text appears to bleed/glow)
- Preferred text colors: #E0E0E0 or #CCCCCC for body on dark backgrounds

**Font weight adjustments for dark mode:**
- Light mode "regular" (400) may need to become "medium" (500) in dark mode
- Light mode "light" (300) should become "regular" (400)
- Thin fonts (100-200) should be avoided entirely in dark mode
- Dark backgrounds make light text appear to glow/bloom, increasing perceived weight
- Variable fonts with grades are the ideal solution (Reichenstein's approach)

**Halation prevention:**
- Halation = light text bleeding into dark background, creating a halo effect
- Increase letterspacing slightly for white-on-dark text
- Use off-white instead of pure white
- Slightly heavier font weight compensates for perceived thinning

### Text Legibility Over Complex Backgrounds

For bloom effects, gradients, particles, or dynamic content behind text:

**Method 1: Dark overlay (simplest, most reliable)**
```css
.overlay {
  background: rgba(0, 0, 0, 0.35); /* 35% black -- Kennedy's baseline */
  /* Increase to 0.5-0.6 for busy backgrounds */
}
```

**Method 2: Floor fade (elegant, subtle)**
```css
.floor-fade {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,      /* transparent at middle */
    rgba(0, 0, 0, 0.2) 100%    /* ~20% black at bottom */
  );
  /* Place white text at the bottom */
}
```

**Method 3: Scrim behind text**
```css
.scrim {
  /* Elliptical gradient centered behind text */
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}
```

**Method 4: Backdrop blur + darken**
```css
.text-container {
  backdrop-filter: blur(8px) brightness(0.7);
  -webkit-backdrop-filter: blur(8px) brightness(0.7);
  /* Blur AND darken the area behind text */
}
```

**Method 5: Text shadow for separation**
```css
.text-over-chaos {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6),
               0 0 8px rgba(0, 0, 0, 0.3);
  /* Tight dark shadow + wider soft shadow */
  /* Good for text over particle effects or animated backgrounds */
}
```

**Method 6: Solid pill/badge behind text**
```css
.text-badge {
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 12px;
  border-radius: 4px;
  /* Nuclear option: guarantees legibility over anything */
}
```

**Choosing the right method:**
| Background type | Best method | Why |
|----------------|-------------|-----|
| Static image | Floor fade or overlay | Predictable, elegant |
| Dynamic/animated | Backdrop blur + darken | Adapts to changing content |
| Particles/bloom | Text shadow + slight darken | Lightweight, doesn't obscure effects |
| Gradient bg | Solid pill or text shadow | Gradient-on-gradient looks muddy |
| Video | Overlay at 40-50% | Needs heavier treatment than static |

---

## Touch Targets

| Standard | Minimum | Recommended | Source |
|----------|---------|-------------|--------|
| WCAG 2.2 (AA) | 24x24 CSS px | 44x44 CSS px | W3C |
| WCAG 2.1 (AAA) | 44x44 CSS px | -- | W3C |
| Apple iOS | 44x44 pt | -- | Apple HIG |
| Google Material | 48x48 dp | -- | Material Design |
| Safe universal | 44x44 px | 48x48 px | consensus |

**Rules:**
- Interactive elements: minimum 44x44px touch target even if visually smaller (use padding)
- Spacing between adjacent targets: at least 8px gap to prevent mis-taps
- Inline text links: ensure the tappable area extends with line-height padding
- Icon buttons: the icon can be 24px but the tap target should be 44-48px

---

## Quick Implementation Checklist

For any new UI, verify these in order:

1. [ ] Body text 16-20px
2. [ ] Line height 1.3-1.45 on body text
3. [ ] Max line length 45-90 characters (max-width on container)
4. [ ] Only 3-5 font sizes on the page
5. [ ] WCAG AA contrast ratio 4.5:1 on all body text
6. [ ] WCAG AA contrast ratio 3:1 on all large text (18px+ or 14px bold+)
7. [ ] Dark mode: no pure white on pure black
8. [ ] Dark mode: bump font weight one step heavier
9. [ ] All-caps text has +5-12% letterspacing
10. [ ] Touch targets 44px minimum
11. [ ] Text over images/gradients has contrast treatment (overlay, blur, shadow, or scrim)
12. [ ] Whitespace between groups > whitespace within groups (law of proximity)
13. [ ] Heading emphasis via space above/below, not just size/bold
14. [ ] Secondary text uses down-pop (smaller, lighter, less contrast) but still meets WCAG

---

## Sources

- [Oliver Reichenstein - Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period)
- [Oliver Reichenstein - Part 2: Reactions](https://ia.net/topics/webdesign-is-95-typography-partii)
- [iA - Responsive Typography: The Basics](https://ia.net/topics/responsive-typography-the-basics)
- [Erik Kennedy - 7 Rules for Creating Gorgeous UI Part 1](https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html)
- [Erik Kennedy - 7 Rules for Creating Gorgeous UI Part 2](https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-2.html)
- [Erik Kennedy - Font Size Guidelines](https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html)
- [Erik Kennedy - Font Sizes: The Complete Guide](https://www.learnui.design/blog/ultimate-guide-font-sizes-ui-design.html)
- [Butterick's Practical Typography - Summary of Key Rules](https://practicaltypography.com/summary-of-key-rules.html)
- [Butterick's Practical Typography - Typography in Ten Minutes](https://practicaltypography.com/typography-in-ten-minutes.html)
- [Butterick - Line Spacing](https://practicaltypography.com/line-spacing.html)
- [Butterick - Line Length](https://practicaltypography.com/line-length.html)
- [Butterick - Letterspacing](https://practicaltypography.com/letterspacing.html)
- [Butterick - All Caps](https://practicaltypography.com/all-caps.html)
- [WCAG 2.1 - Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 2.2 - Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [Smashing Magazine - Accessible Text Over Images](https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/)
- [Ahmad Shadeed - Handling Text Over Images in CSS](https://ishadeed.com/article/handling-text-over-image-css/)
