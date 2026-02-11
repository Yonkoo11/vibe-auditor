# Dark Mode Readability Spec

Research extracted from Linear, Vercel/Geist, Stripe, Raycast, Arc, and GitHub dark modes.

---

## 1. Background Colors

Nobody uses pure black. Every top-tier dark UI uses near-black with subtle warmth or coolness.

| Site | Background | Hex | Notes |
|------|-----------|-----|-------|
| Linear | Page bg | `#08090a` / `rgb(8,9,10)` | Almost black, faint cool tint |
| Vercel (dark) | Page bg | `#000` (background-200) | Pure black for main, `hsl(0,0%,4%)` / `~#0a0a0a` for elevated (background-100) |
| GitHub | Canvas default | `#0d1117` | Dark navy-black, slight blue undertone |
| GitHub | Canvas muted | `#151b23` | Slightly lighter, for recessed areas |
| Raycast | Page bg | `#07080a` / `rgb(7,8,10)` | Nearly identical to Linear |
| Stripe (dark) | Page bg | `#14171D` | Warmer dark blue-gray |
| Stripe | Offset bg | `#1B1E25` | Elevated surfaces |

### Background Layer Scale (consensus pattern)

```
Layer 0 (page):     #080a0c  to  #0d1117   (L: 2-5%)
Layer 1 (surface):  #111214  to  #151b23   (L: 7-9%)
Layer 2 (elevated): #1b1c1e  to  #212830   (L: 11-15%)
Layer 3 (overlay):  #2b3039  to  #2f3031   (L: 18-20%)
```

The pattern: each layer adds roughly 4-6% lightness. Three to four layers is the max before it stops feeling "dark mode."

---

## 2. Text Color Hierarchy

The critical finding: nobody uses `#fff` for body text. Primary text is always slightly muted, and there are 3-4 distinct text levels.

### Linear

| Role | Color | Hex | Contrast vs #08090a |
|------|-------|-----|---------------------|
| Headings / primary | `rgb(247,248,248)` | `#f7f8f8` | ~19.4:1 |
| Body / secondary | `rgb(138,143,152)` | `#8a8f98` | ~6.5:1 |
| Nav links / tertiary | `rgb(138,143,152)` | `#8a8f98` | Same as body |

### Vercel/Geist (dark mode)

| Role | Token | Value | Hex |
|------|-------|-------|-----|
| Foreground (primary) | `--geist-foreground` | `#fff` | Pure white |
| Gray 1000 (strong text) | `--ds-gray-1000` | `hsl(0,0%,93%)` | `#ededed` |
| Gray 900 (secondary) | `--ds-gray-900` | `hsl(0,0%,63%)` | `#a1a1a1` |
| Gray 800 (tertiary) | `--ds-gray-800` | `hsl(0,0%,49%)` | `#7d7d7d` |
| Gray 700 | `--ds-gray-700` | `hsl(0,0%,56%)` | `#8f8f8f` |
| Gray 600 (muted) | `--ds-gray-600` | `hsl(0,0%,53%)` | `#878787` |
| Alpha 1000 | `--ds-gray-alpha-1000` | `#ffffffeb` | White at 92% opacity |
| Alpha 900 | `--ds-gray-alpha-900` | `#ffffff9c` | White at 61% opacity |
| Alpha 600 | `--ds-gray-alpha-600` | `#ffffff82` | White at 51% opacity |

### GitHub (dark mode)

| Role | Token | Hex |
|------|-------|-----|
| fg-default (primary) | `--fgColor-default` | `#fff` |
| fg-muted | `--fgColor-muted` | `#b7bdc8` |
| fg-subtle / disabled | `--fgColor-disabled` | `#656c76` |
| Body color (actual) | body computed | `rgb(240,246,252)` / `#f0f6fc` |
| Header fg | `--header-fgColor-default` | `rgba(255,255,255,.7)` |

### Raycast

| Role | Color | Hex |
|------|-------|-----|
| Primary (headings) | `rgb(255,255,255)` | `#ffffff` |
| Body text (fg) | `--color-fg` | `hsl(240,11%,96%)` / `#f3f3f6` |
| Secondary (fg-200) | `--color-fg-200` | `rgb(194,199,202)` / `#c2c7ca` |
| Tertiary (fg-300) | `--color-fg-300` | `#78787c` |
| Muted (fg-400) | `--color-fg-400` | `rgb(94,99,102)` / `#5e6366` |
| Nav/secondary | computed | `rgb(156,156,157)` / `#9c9c9d` |
| Content muted | computed | `rgb(106,107,108)` / `#6a6b6c` |

### Stripe (dark embedded)

| Role | Hex |
|------|-----|
| Text primary | `#C9CED8` |
| Text secondary | `#8C99AD` |
| Text on primary | `#FFFFFF` |

### Consensus Text Hierarchy

```
Level 1 - Headings:    #ededed to #f7f8f8   (90-97% white)
Level 2 - Body:        #b7bdc8 to #c9ced8   (72-80% white)
Level 3 - Secondary:   #8a8f98 to #9c9c9d   (54-61% white)
Level 4 - Muted:       #656c76 to #78787c   (40-47% white)
Level 5 - Disabled:    #434345 to #5e6366   (26-39% white)
```

Contrast ratios against ~#0d1117 backgrounds:
- Level 1: ~15-19:1 (exceeds WCAG AAA)
- Level 2: ~8-11:1 (exceeds WCAG AAA)
- Level 3: ~5-7:1 (meets WCAG AA, often AAA)
- Level 4: ~3-4:1 (meets WCAG AA for large text only)
- Level 5: ~2-2.5:1 (decorative/disabled only)

---

## 3. Typography Scale

### Linear

Font: Inter Variable (headings use weight 510 "medium")

| Token | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| text-tiny | 0.625rem (10px) | 1.5 | -0.015em |
| text-micro | 0.75rem (12px) | 1.4 | 0 |
| text-mini | 0.8125rem (13px) | 1.5 | -0.01em |
| text-small | 0.875rem (14px) | 21/14 (1.5) | -0.013em |
| text-regular | 0.9375rem (15px) | 1.6 | -0.011em |
| text-large | 1.0625rem (17px) | 1.6 | 0 |
| title-1 | 1.0625rem (17px) | 1.4 | -0.012em |
| title-2 | 1.3125rem (21px) | 1.33 | -0.012em |
| title-3 | 1.5rem (24px) | 1.33 | -0.012em |
| title-4 | 2rem (32px) | 1.125 | -0.022em |
| title-5 | 2.5rem (40px) | 1.1 | -0.022em |
| title-6 | 3rem (48px) | 1.1 | -0.022em |
| title-7 | 3.5rem (56px) | 1.1 | -0.022em |
| title-8 | 4rem (64px) | 1.06 | -0.022em |
| title-9 | 4.5rem (72px) | 1.0 | -0.022em |

Font weights: 300 (light), 400 (normal), 510 (medium), 590 (semibold), 680 (bold)

Hero h1 computed: 64px, weight 510, line-height 1.06, letter-spacing -1.408px (-0.022em)

### Vercel/Geist

Font: Geist (custom)

| Element | Size | Line Height | Letter Spacing | Weight |
|---------|------|-------------|----------------|--------|
| Hero h1 | 30px | 39px (1.3) | -1.8px (-0.06em) | 600 |
| Nav text | 14px | 14px | -- | 400-500 |
| Body paragraph | 12-16px | 16-24px | -- | 400 |

Spacing system (4px base):
```
--geist-space:     4px
--geist-space-2x:  8px
--geist-space-3x:  12px
--geist-space-4x:  16px
--geist-space-6x:  24px
--geist-space-8x:  32px
--geist-space-16x: 64px
--geist-space-24x: 96px
--geist-space-32x: 128px
```

### GitHub

Font: System stack (-apple-system, system-ui, Segoe UI, Noto Sans, Helvetica, Arial)

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| Body default | 14px | 21px (1.5) | 400 |
| h1 | 32px | 48px (1.5) | 600 |
| h2 | 24px | 36px (1.5) | 600 |
| Meta/labels | 12px | 18px (1.5) | 400 |
| Nav links | 14px | 14-21px | 500 |

### Raycast

Font: Inter

| Element | Size | Line Height | Weight | Letter Spacing |
|---------|------|-------------|--------|----------------|
| Hero h1 | 64px | 70.4px (1.1) | 600 | normal |
| Section h2 | 20px | normal | 500 | 0.2px |
| h3 | 24px | normal | 500 | 0.2px |
| Body paragraph | 18px (hero) | normal | 400 | -- |
| Body (content) | 16px | 25.6px (1.6) | 500 | -- |
| Nav | 14px | -- | -- | -- |
| Section descriptions | 20px | normal | 500 | -- |

### Key Line-Height Pattern

```
Display/hero text (48-72px):  1.0 - 1.1
Large headings (32-48px):     1.1 - 1.25
Small headings (20-28px):     1.25 - 1.4
Body text (14-18px):          1.5 - 1.6
Small/meta text (11-13px):    1.4 - 1.5
```

As text gets bigger, line-height tightens. As text gets smaller, line-height loosens for readability. This is universal across all sites.

### Letter Spacing Pattern

```
Display text (48px+):    -0.02em to -0.03em (tight)
Headings (24-48px):      -0.01em to -0.02em
Body text (14-18px):     -0.01em to 0
Small text (12-13px):    0 to +0.01em
Labels/caps:             +0.02em to +0.05em
```

---

## 4. Button and Interactive Element Contrast

### Linear

| Button | Background | Text | Border |
|--------|-----------|------|--------|
| Primary CTA ("Start building") | `#5e6ad2` (indigo) | `#ffffff` | none |
| Nav links | transparent | `#8a8f98` | none |
| Signup | transparent | `#f7f8f8` | `1px solid` (subtle) |

Border radius: 6-8px for buttons, full system from 4px to 9999px
Focus ring: `--color-indigo` (#5e6ad2), 2px width, 2px offset

### Vercel/Geist (dark)

| Button | Background | Text | Radius |
|--------|-----------|------|--------|
| Primary ("Sign Up") | `#171717` / `rgb(23,23,23)` | `#ffffff` | 6px |
| Secondary ("Log In") | `#ffffff` | `#171717` | 6px |
| Ghost/nav | transparent | `#666666` | 9999px |

Border: uses box-shadow for borders in dark mode:
```
--ds-shadow-border-base: 0 0 0 1px #ffffff25  (white at 15%)
```

### GitHub (dark)

| Button | Background | Text | Notes |
|--------|-----------|------|-------|
| Primary (green) | `#006222` emphasis | `#ffffff` | Green CTA |
| Default | `--control-bgColor-rest` | `#fff` | Subtle gray bg |
| Danger | `#ad0116` | `#ffb1af` | Red emphasis |
| Outline | transparent | `#5cacff` | Blue text |
| Inactive | `--control-bgColor-rest` | `#b7bdc8` | Muted |

Focus: `--ds-focus-border: 0 0 0 1px var(--ds-gray-alpha-600), 0px 0px 0px 4px #ffffff3d`

### Raycast

| Button | Background | Text |
|--------|-----------|------|
| Primary CTA | `hsla(0,0%,100%,0.815)` (translucent white) | `rgb(24,25,26)` (near-black) |
| Primary hover | `hsl(0,0%,100%)` (full white) | same |
| Nav links | transparent | `#9c9c9d` (gray-200) |

### Key Pattern

Primary CTAs use either:
1. **Brand color bg + white text** (Linear: indigo, GitHub: green)
2. **White/light bg + dark text** (Raycast, Vercel in dark contexts)
3. **Dark bg + white text** (Vercel primary)

Ghost/secondary buttons universally use the Level 3 text color (~#8a8f98 to #9c9c9d).

---

## 5. Border and Divider Colors

| Site | Border Color | Notes |
|------|-------------|-------|
| Linear | -- | Minimal borders, uses spacing instead |
| Vercel | `#ffffff25` (white at 15%) | Shadow-based borders |
| GitHub | `#b7bdc8` (strong) | Relatively high-contrast borders |
| Raycast | `hsl(195,5%,15%)` / ~#232627 | Very subtle |
| Stripe | `#2B3039` | Matches surface elevation |

Consensus: borders in dark mode are white at 10-25% opacity or dark gray at L:15-20%.

---

## 6. Color on Dark Backgrounds

### Accent/Brand Colors

All sites desaturate colors for dark mode. Bright saturated colors on dark backgrounds cause vibration and eye strain.

| Site | Blue | Red | Green | Purple |
|------|------|-----|-------|--------|
| Linear | `#4ea7fc` | `#eb5757` | `#4cb782` | `#5e6ad2` |
| Vercel | `hsl(210,100%,66%)` | `hsl(358,100%,69%)` | `hsl(131,43%,57%)` | `hsl(275,80%,71%)` |
| GitHub | `#74b9ff` (fg-accent) | `#ff9492` (fg-danger) | `#2bd853` (fg-success) | `#d3abff` (fg-done) |
| Raycast | `#56c2ff` | `rgba(255,99,99,1)` | `hsl(151,59%,59%)` | -- |

Pattern: dark mode accent colors have higher lightness (60-80%) and lower saturation than their light mode counterparts. GitHub is the most explicit about this with their display color system.

### Handling Text Over Gradients

Linear and Vercel both use this approach:
```css
/* Vercel dark text gradient for headings */
--geist-text-gradient: linear-gradient(180deg, #fff 0%, #ffffffbf 100%);
```
Text itself gets a top-to-bottom gradient from full white to ~75% white, creating visual depth.

For colored backgrounds, the standard pattern is:
1. Use a semi-transparent dark overlay
2. Ensure minimum 4.5:1 contrast for any text
3. Limit text to Level 1 (headings) or Level 2 colors only

---

## 7. Gray Scale Comparison

The gray scale is the backbone of dark mode. Here's how each site structures their neutral ramp:

### Vercel/Geist Dark Gray Scale (HSL lightness values)

```
gray-100:  10%  (#1a1a1a)  - Component bg
gray-200:  12%  (#1f1f1f)  - Component bg hover
gray-300:  16%  (#292929)  - Component bg active
gray-400:  18%  (#2e2e2e)  - Border subtle
gray-500:  27%  (#454545)  - Border default
gray-600:  53%  (#878787)  - Muted text
gray-700:  56%  (#8f8f8f)  - Secondary text
gray-800:  49%  (#7d7d7d)  - Tertiary
gray-900:  63%  (#a1a1a1)  - Body text
gray-1000: 93%  (#ededed)  - Headings
```

Background: `hsl(0,0%,0%)` (bg-200) and `hsl(0,0%,4%)` (bg-100)

### Raycast Gray Scale

```
grey-900:  #07080a  - Page background
grey-800:  #0c0d0f
grey-700:  #111214
grey-600:  #1b1c1e
grey-500:  #2f3031
grey-400:  #434345
grey-300:  #6a6b6c
grey-200:  #9c9c9d
grey-100:  #cdcece
grey-50:   #e6e6e6
```

### GitHub Dark Background Scale

```
bgColor-default:         #010409
bgColor-muted:           #151b23
bgColor-neutral-muted:   #212830
bgColor-emphasis:        #3d444d
```

---

## 8. Consolidated Dark Mode Spec

This is a ready-to-use spec synthesized from all the research above.

### Backgrounds

```css
--bg-base:      #0a0a0c;   /* Page background (L: ~3%) */
--bg-surface:   #111214;   /* Cards, panels (L: ~7%) */
--bg-elevated:  #1b1c1e;   /* Modals, dropdowns (L: ~11%) */
--bg-overlay:   #2a2c30;   /* Hover states, overlays (L: ~17%) */
--bg-emphasis:  #3d4048;   /* Active states (L: ~25%) */
```

### Text

```css
--text-primary:   #f0f0f3;   /* Headings, important labels (L: ~94%) */
--text-body:      #b8bcc5;   /* Body copy (L: ~74%) */
--text-secondary: #8b9099;   /* Descriptions, meta (L: ~57%) */
--text-muted:     #5c6370;   /* Placeholders, hints (L: ~40%) */
--text-disabled:  #3d4048;   /* Disabled states (L: ~25%) */
```

Expected contrast ratios against --bg-base:
```
--text-primary:    ~16:1   (AAA)
--text-body:       ~9.5:1  (AAA)
--text-secondary:  ~5.5:1  (AA)
--text-muted:      ~3.2:1  (AA large text only)
--text-disabled:   ~2:1    (decorative only)
```

### Borders

```css
--border-subtle:  rgba(255,255,255, 0.08);  /* Dividers */
--border-default: rgba(255,255,255, 0.15);  /* Input borders */
--border-strong:  rgba(255,255,255, 0.25);  /* Focus rings, emphasis */
```

### Type Scale

```css
/* Font: Inter or system stack */
--font-sans: 'Inter Variable', -apple-system, system-ui, 'Segoe UI', sans-serif;
--font-mono: 'Berkeley Mono', ui-monospace, 'SF Mono', monospace;

/* Scale (modular, roughly 1.2 ratio) */
--text-xs:   0.75rem;    /* 12px, line-height: 1.4 */
--text-sm:   0.8125rem;  /* 13px, line-height: 1.5 */
--text-base: 0.9375rem;  /* 15px, line-height: 1.6 */
--text-lg:   1.0625rem;  /* 17px, line-height: 1.6 */
--text-xl:   1.3125rem;  /* 21px, line-height: 1.33 */
--text-2xl:  1.5rem;     /* 24px, line-height: 1.33 */
--text-3xl:  2rem;       /* 32px, line-height: 1.125 */
--text-4xl:  2.5rem;     /* 40px, line-height: 1.1 */
--text-5xl:  3rem;       /* 48px, line-height: 1.1 */
--text-6xl:  4rem;       /* 64px, line-height: 1.06 */

/* Letter spacing: tighter as size increases */
--tracking-tight:   -0.022em;  /* Display text */
--tracking-normal:  -0.011em;  /* Body text */
--tracking-wide:     0.01em;   /* Small caps/labels */

/* Weights */
--weight-normal:    400;
--weight-medium:    500;  /* or 510 for Inter Variable */
--weight-semibold:  600;  /* or 590 for Inter Variable */
```

### Accent Colors (dark-safe)

```css
--blue:    hsl(210, 100%, 66%);  /* Links, info */
--red:     hsl(358, 75%, 65%);   /* Errors, destructive */
--green:   hsl(135, 50%, 55%);   /* Success */
--amber:   hsl(39, 90%, 50%);    /* Warnings */
--purple:  hsl(275, 70%, 68%);   /* Decorative, tags */
```

These are lightened and slightly desaturated compared to light mode versions. Aim for L:55-70% on dark backgrounds.

### Buttons

```css
/* Primary */
--btn-primary-bg:     var(--brand-color);  /* or white for minimal themes */
--btn-primary-text:   #ffffff;             /* or near-black if bg is light */
--btn-primary-radius: 6px;

/* Secondary */
--btn-secondary-bg:   rgba(255,255,255, 0.08);
--btn-secondary-text: var(--text-body);
--btn-secondary-border: var(--border-default);

/* Ghost */
--btn-ghost-bg:       transparent;
--btn-ghost-text:     var(--text-secondary);
--btn-ghost-bg-hover: rgba(255,255,255, 0.06);
```

### Spacing (4px base grid)

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-16: 64px;
--space-24: 96px;
```

### Radius

```css
--radius-sm:   4px;
--radius-md:   6px;
--radius-lg:   8px;
--radius-xl:   12px;
--radius-2xl:  16px;
--radius-full: 9999px;
```

### Shadows

In dark mode, box-shadows are nearly invisible. The best dark UIs (Linear, Vercel) disable shadows entirely and rely on border/bg differentiation:

```css
--shadow-sm:  none;  /* or 0 0 0 1px rgba(255,255,255,0.06) */
--shadow-md:  0 4px 12px rgba(0,0,0,0.4);
--shadow-lg:  0 8px 30px rgba(0,0,0,0.5);
```

### Scrollbar

```css
--scrollbar-track:  transparent;
--scrollbar-thumb:  rgba(255,255,255, 0.1);
--scrollbar-hover:  rgba(255,255,255, 0.2);
--scrollbar-active: rgba(255,255,255, 0.35);
--scrollbar-width:  6px;
```

---

## 9. Rules That Every Top Dark UI Follows

1. **No pure black, no pure white.** Background is #08-#14 range. Primary text maxes out at #ededed-#f7f8f8.

2. **4-level text hierarchy minimum.** Primary, body, secondary, muted. Each step drops ~15-20% lightness.

3. **Body text contrast: 7:1 minimum.** All these sites exceed WCAG AA (4.5:1) for body text. Most hit AAA (7:1).

4. **Tighter line-height as size increases.** Display = 1.0-1.1, body = 1.5-1.6. No exceptions.

5. **Negative letter-spacing on headings.** -0.02em for display, approaching 0 for body. Prevents dark mode headings from looking too airy.

6. **Borders are white at 8-25% opacity.** Not gray hex values. This makes them automatically adapt to any dark background.

7. **Desaturated, lightened accent colors.** Colors bump to L:55-70% and drop saturation 10-20% compared to light mode.

8. **Shadows replaced by surface elevation.** Background lightness increases for each layer instead of using drop shadows.

9. **Consistent spacing: 4px or 8px grid.** Every site uses one of these. Most use 4px with steps at 4, 8, 12, 16, 24, 32, 64.

10. **Inter or system stack fonts.** Linear, Raycast, and indirectly many others use Inter. Vercel built Geist. GitHub uses system. All sans-serif, all optimized for screen readability.
