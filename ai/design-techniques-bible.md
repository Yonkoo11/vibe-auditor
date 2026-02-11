# Design Techniques Bible

Actionable techniques from world-class designers and design teams. No theory. Only specific, steal-able values and methods.

---

## 1. Typography

### Font Size Scale (Erik Kennedy)

Start body text at **17px** and adjust from there. This is the single best starting point.

| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero headline | 48-96px | 32-48px |
| Section headline | 36-48px | 24-36px |
| Subheading | 24-32px | 18-24px |
| Body | 16-18px | 16-17px |
| Secondary/muted | 14-15px | 14-15px |
| Captions/labels | 12-13px | 12-13px |

Desktop pixels are ~33% smaller than mobile pixels. Scale desktop text up accordingly for reading-heavy pages.

**Use at most 4 font sizes per page.** Even interaction-heavy pages rarely need more. Too many sizes is the #1 beginner typography mistake.

### Weight Pairing (Cross-source consensus)

The trick Kennedy calls "up-pop / down-pop": pair competing properties. A headline that is **large but light** (300 weight) or **small but bold** (700 weight) creates interesting tension.

| Pattern | Example |
|---------|---------|
| Large + Light | 48px / weight 300 |
| Small + Bold + Uppercase + Letter-spaced | 12px / weight 700 / uppercase / 0.1em tracking |
| Medium + Medium (boring, avoid) | 24px / weight 400 |

The "competing properties" principle: when styling any text, apply BOTH up-pop styles (big, bold, capitalized, colored) and down-pop styles (small, light, muted, less margin), but lean slightly toward one direction. This is what separates flat text from designed text.

### Line Height Rules

| Text size | Line height |
|-----------|-------------|
| Body (16-18px) | 1.5-1.65 |
| Subheading (24-32px) | 1.3-1.4 |
| Headline (36-72px) | 1.1-1.2 |
| Display (72px+) | 1.0-1.1 |

As text gets bigger, line height gets tighter. A 96px headline at 1.5 line-height looks like double-spaced homework.

### Letter Spacing

| Context | Letter spacing |
|---------|---------------|
| Body text | 0 (default) |
| Headlines 48px+ | -0.01em to -0.03em (tighten) |
| ALL CAPS labels | +0.05em to +0.15em (loosen) |
| Monospace/code | 0 (default) |

### Font Selection (Consolidated)

**Sans-serif for UI/body:** Inter, Geist Sans, SF Pro, system-ui. These all share similar DNA: neutral, geometric, legible at small sizes.

**Monospace for code:** Geist Mono, JetBrains Mono, SF Mono, Fira Code. Pair with your sans choice.

**Display/headline for personality:** One custom or distinctive font for headlines only. This is where you differentiate. Linear uses Inter everywhere (neutral brand). Stripe uses Sohne (geometric, premium). Railway uses a serif-adjacent display face (personality).

**The Rams principle applied:** Use one typeface family. Vary weight and size, not font family. Every additional font family adds cognitive load.

### Apple SF Pro Rules

SF Pro has two optical sizes:
- **SF Text** for sizes below 20pt (optimized for legibility)
- **SF Display** for sizes 20pt and above (optimized for aesthetics)

This is why Apple interfaces look "effortlessly readable." The font literally changes shape at different sizes. When using system fonts on Mac/iOS, this happens automatically. On the web, you have to choose appropriate fonts for different sizes manually.

### Vercel Geist Typography System

Geist pre-sets combinations of font-size, line-height, letter-spacing, and font-weight as atomic tokens. Every glyph sits on a consistent pixel grid. The key insight: don't set these four properties independently. Define them as bundled presets (like Tailwind's `text-sm`, `text-lg`) so they always work together.

---

## 2. Color

### The HSB Method (Erik Kennedy)

Never pick colors in RGB or hex directly. Use HSB (Hue, Saturation, Brightness).

**Darker variations:** Lower brightness + increase saturation simultaneously. Never just subtract brightness alone (that produces muddy, lifeless darks).

**Lighter variations:** Raise brightness + decrease saturation. This produces clean, airy lights instead of washed-out pastels.

**Single-hue palette generation:**
1. Pick one hue (e.g., blue at H:220)
2. For the darkest shade: S:80, B:20
3. For the lightest shade: S:10, B:95
4. For the mid-tone: S:60, B:60
5. For the accent/vibrant: S:90, B:80

This gives you darks, lights, backgrounds, and accents from a single hue without overwhelming the eye.

### Stripe's Accessible Color System (CIELAB)

Stripe uses the CIELAB (Lab) color space instead of HSL/HSB for generating color scales. The "L" in Lab represents perceptual lightness, meaning equal numerical steps produce equal perceived brightness changes.

**The technique:**
1. Define your desired hues (blue, green, red, yellow, etc.)
2. Translate each hue into Lab color space
3. Create a lightness curve that all hues follow identically
4. At any given step in the scale, every color has the same perceptual contrast against white/black

**Why this matters:** In HSL, `hsl(60, 100%, 50%)` (yellow) looks way brighter than `hsl(240, 100%, 50%)` (blue) even though they're at the same "lightness." Lab fixes this. Your yellow-500 and blue-500 actually look the same weight.

**Practical shortcut if you don't want to do Lab math:** Use OKLCH in CSS. `oklch(65% 0.2 250)` gives you perceptually uniform colors natively in modern browsers.

### Vercel Geist Color Architecture

10 color scales. P3 colors on supported displays. The system uses semantic layers:

| Layer | Purpose | Count |
|-------|---------|-------|
| Background | Page backgrounds | 2 values (primary + subtle) |
| Component BG | UI element fills | 3 values (default, hover, active) |
| Border | UI element borders | 3 values (subtle, default, strong) |
| High Contrast BG | Buttons, badges | 2 values |

Key rule: Background 1 is your default. Background 2 is only for subtle differentiation. Component colors step through default -> hover -> active. This prevents the common mistake of having 47 slightly different grays with no logic.

### Color Hierarchy (Tobias van Schneider)

Maximum 2-3 colors in any design:
- **One subtle background color** (the majority of pixels)
- **One highlight** (used sparingly for interactive elements)
- **One high-contrast color** (used for the most important element on screen)

Don't overthink color theory. If it feels right, it is right. Get inspired by photography, nature, fashion, and architecture rather than color wheel generators.

### Dark Mode Color Rules (Linear + Apple)

Linear generates its entire theme from just 3 variables: base color, accent color, and contrast level. Everything else derives from those three.

Apple's dark mode principles:
- Never use pure black (#000000) for backgrounds. Use near-blacks with slight color (#0a0a0f, #111111)
- Text on dark backgrounds should be off-white (#e0e0e0 to #f0f0f0), not pure white (#ffffff)
- Reduce saturation of colors in dark mode by 10-20% compared to light mode
- Borders should be barely visible (rgba(255,255,255,0.08) to rgba(255,255,255,0.12))

---

## 3. Spacing

### The 8px Grid (Industry Standard)

Everything aligns to multiples of 8px. Use 4px only for tight adjustments (icon padding, small gaps).

| Token | Value | Use for |
|-------|-------|---------|
| xs | 4px | Icon gaps, tight padding |
| sm | 8px | Inline spacing, small gaps |
| md | 16px | Standard padding, element gaps |
| lg | 24px | Section padding, card padding |
| xl | 32px | Major element gaps |
| 2xl | 48px | Section gaps |
| 3xl | 64px | Major section separation |
| 4xl | 96px | Hero padding |
| 5xl | 128-200px | Between page sections |

### The "Double Your Whitespace" Rule (Erik Kennedy)

Whatever whitespace you think looks right, double it. Kennedy's specific example: a music player with 12px font should have 12px padding above AND below each menu item (equal to the font height itself). Beginners consistently under-space.

The hierarchy: space between **lines** < space between **elements** < space between **groups of elements**. If your line spacing is 8px, your element spacing should be 16-24px, and your group spacing should be 32-48px+.

### Apple HIG Spacing

| Context | Value |
|---------|-------|
| Minimum touch target | 44x44 points |
| Root view margins (sides) | 16pt |
| Root view margin (top) | 20pt |
| Non-root view margins | 8pt all sides |
| Between major sections | 16-24pt |
| Between list items | 8-12pt |
| Card spacing | 16-24pt |
| Tab bar height | 50pt |
| Minimum font size | 11pt |

### Vertical Rhythm Between Page Sections

From the competitor research: world-class sites use 120-200px gaps between major page sections. This feels like "too much" when you're building, but it's the breathing room that makes pages feel premium vs. cramped.

---

## 4. Shadows and Depth

### The Layered Shadow Technique (Josh Comeau / Material Design)

Never use a single box-shadow. Layer 3-6 shadows with different offsets and blur radii.

**Low elevation (cards, subtle lift):**
```css
box-shadow:
  0.3px 0.5px 0.7px rgba(0,0,0,0.1),
  0.4px 0.8px 1px -1.2px rgba(0,0,0,0.1),
  1px 2px 2.5px -2.5px rgba(0,0,0,0.1);
```

**Medium elevation (dropdowns, popovers):**
```css
box-shadow:
  0.3px 0.5px 0.7px rgba(0,0,0,0.07),
  0.8px 1.6px 2px -0.8px rgba(0,0,0,0.07),
  2.1px 4.1px 5.2px -1.7px rgba(0,0,0,0.07),
  5px 10px 12.6px -2.5px rgba(0,0,0,0.07);
```

**High elevation (modals, dialogs):**
```css
box-shadow:
  0.3px 0.5px 0.7px rgba(0,0,0,0.05),
  1.5px 2.9px 3.7px -0.4px rgba(0,0,0,0.05),
  2.7px 5.4px 6.8px -0.7px rgba(0,0,0,0.05),
  4.5px 8.9px 11.2px -1.1px rgba(0,0,0,0.05),
  7.1px 14.3px 18px -1.4px rgba(0,0,0,0.05),
  11.2px 22.3px 28.1px -1.8px rgba(0,0,0,0.05),
  17px 34px 42.8px -2.1px rgba(0,0,0,0.05),
  25px 50px 62.9px -2.5px rgba(0,0,0,0.05);
```

### Material Design Elevation Scale

| Level | Shadow | Use for |
|-------|--------|---------|
| Z1 | `0 1px 4px 0 rgba(0,0,0,0.37)` | Cards at rest |
| Z2 | `0 2px 2px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.3)` | Raised cards, buttons |
| Z3 | `0 11px 7px 0 rgba(0,0,0,0.19), 0 13px 25px 0 rgba(0,0,0,0.3)` | FABs, nav bars |
| Z4 | `0 14px 12px 0 rgba(0,0,0,0.17), 0 20px 40px 0 rgba(0,0,0,0.3)` | Menus, side sheets |
| Z5 | `0 17px 17px 0 rgba(0,0,0,0.15), 0 27px 55px 0 rgba(0,0,0,0.3)` | Modals, dialogs |

### The "Light Comes From the Sky" Rule (Erik Kennedy)

The top of elements should be lighter, the bottom darker. This creates natural-feeling depth:
- Top border/highlight: `1px solid rgba(255,255,255,0.05)` on dark mode elements
- Bottom shadow: the box-shadow values above
- Inner elements: slight top highlight with `inset 0 1px 0 rgba(255,255,255,0.05)`

Inverted elements (inset fields, wells) get the opposite: darker top edge, lighter bottom.

### Glassmorphism Values (Linear-style)

```css
.glass {
  background: rgba(255, 255, 255, 0.05-0.15);
  backdrop-filter: blur(10px-20px);
  -webkit-backdrop-filter: blur(10px-20px);
  border: 1px solid rgba(255, 255, 255, 0.08-0.15);
  border-radius: 12px-20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1-0.3);
}
```

Critical: glass only works if there's visible color behind it (blobs, gradients, images). On flat black, glass just looks like a slightly lighter rectangle.

---

## 5. Motion and Animation

### Vercel Web Interface Guidelines

**Core principles:**
- Animations must be **interruptible** (cancelable by user input)
- Animations must be **input-driven** (respond to actions, never autoplay decoratively)
- Easing should fit the subject: pick based on what changes (size, distance, trigger)

**Timing values:**
- Loading indicator show-delay: **150-300ms** (avoids flicker on fast responses)
- Minimum visible time for skeletons: **300-500ms** (prevents jarring flash)

### Animation Duration Guidelines (Cross-source)

| Action | Duration | Easing |
|--------|----------|--------|
| Micro-interaction (button, toggle) | 100-200ms | ease-out |
| Element enter/exit | 200-300ms | ease-out |
| Page transition | 300-500ms | ease-in-out |
| Complex reveal | 400-700ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Background blob drift | 15-30s | linear or ease-in-out |
| Color/opacity crossfade | any | linear (perceptually even blend) |

### Linear's Motion Philosophy

Animations are "soft and timely, flow like water." Practical translation:
- Use spring-based easing for interactive elements (buttons, panels)
- Use linear easing for color and opacity changes (perceptually smooth)
- Short, fast timing for frequent actions (toggles, checkboxes)
- Longer, slower timing for rare/complex animations (modals, page transitions)

### The Organic Feel Technique

Give each animated element a unique, prime-ish duration:
- Element 1: 20s, Element 2: 25s, Element 3: 22s, Element 4: 30s, Element 5: 18s
- They rarely sync up, creating a "breathing" quality
- Same easing everywhere. Variety in duration, consistency in personality.

### Scroll Animations (Industry Standard)

The only universally used scroll animation: **fade-up on viewport enter.** IntersectionObserver fires, element transitions from `opacity: 0; transform: translateY(20px)` to `opacity: 1; transform: translateY(0)` over 300ms with ease-out.

Stagger child elements by 50-100ms each for a cascade effect.

No parallax. It's dated. No bounce. It's cheap. No auto-playing carousels. They're hostile.

Always respect `prefers-reduced-motion`.

---

## 6. Layout

### Container and Grid

- **Max-width:** 1200-1400px for content containers
- **Centered layout** is the dominant pattern for dev tool / SaaS landing pages (7/8 top sites use it)
- Never full-bleed text. Always constrain to a readable line length (~65-75 characters)
- CSS Grid for complex layouts: Stripe uses `display: grid; grid: repeat(5, 200px) / repeat(10, 1fr)` for flexible section layouts

### Visual Hierarchy (Apple HIG + Erik Kennedy)

People scan top-to-bottom, leading-to-trailing. Put the most important information at the top and leading side.

**Hierarchy tools (in order of strength):**
1. Size (biggest = most important)
2. Weight (boldest = most important)
3. Color/contrast (highest contrast = most important)
4. Position (top/center = most important)
5. Whitespace (more space around = more important)
6. Typography style (different font = attention-grabbing)

Use 2-3 of these simultaneously. Using all 6 on one element is visual shouting.

### One CTA Per Section

Never more than two buttons side by side. Primary CTA uses a filled/solid style. Secondary uses an outlined or text style. The primary always uses an action verb ("Start building", "Deploy", "Download").

### The Bento Grid Pattern

For feature showcases, use an asymmetric grid where cards have different sizes:
- One large card spanning 2 columns (hero feature)
- 2-4 medium cards (supporting features)
- Optional small cards for tertiary info

This creates visual interest without the monotony of equal-sized cards.

---

## 7. The "Good to World-Class" Gap

### Dieter Rams' Principles Translated to Digital

"As little design as possible" does NOT mean minimalism for its own sake. It means every element must justify its existence.

**The test for each UI element:**
1. Does removing it hurt the user's ability to complete their task?
2. If no, remove it.
3. If yes, can it be simplified?

Instagram's hidden gesture navigation is a misapplication: it reduced visual complexity but increased cognitive load. Rams would call that bad design. The correct application: remove decorative elements, keep functional ones obvious.

**Honest design:** Don't make a UI element appear to do more than it does. No fake 3D effects that suggest interactivity where there is none. No animations that imply loading when nothing is loading.

### What Separates Linear from Generic SaaS

1. **Keyboard-first architecture.** Every action has a shortcut. Cmd+K opens a global command palette. This isn't just a feature, it's a design philosophy that says "we respect your time."

2. **Information density without clutter.** Small indicators in filter rows provide all necessary info. Every aspect modifiable in place. No modals for simple edits.

3. **Theme as a system, not a palette.** 3 variables (base, accent, contrast) generate the entire visual identity. This is the Rams principle of systematic design applied to color.

4. **Font as brand signal.** Inter at weight 600 for headers, 400 for body, on a dark background that mirrors code editors. The audience (engineers) immediately feels "this was built for me."

### Stripe's Website Excellence

1. **WebGL gradients.** The animated mesh gradient uses ~800 lines of code in a 10kb file. Fractal Brownian Motion layers Simplex noise octaves. The canvas is transformed with `skewY(-12deg)` and `overflow: hidden` for the signature diagonal edges. This is a GPU-rendered effect that runs smoother than any CSS animation could.

2. **Perceptually uniform colors.** Every color in their system passes WCAG 2.0 contrast thresholds against both light and dark backgrounds. This isn't just accessibility compliance. It's why their UI feels "clean" even with many colors present: they all have equal visual weight.

3. **Typography:** Sohne (Klim Type Foundry), system-ui, sans-serif. Font weight 500 as the "normal" weight (slightly heavier than default, more confident). 14px base for dense UI. 8px border-radius on components.

### Tobias van Schneider's Unconventional Rules

1. **Trust intuition over information.** "Information often fails us, but intuition almost never does." In practice: if you've been staring at two layout options for 10 minutes and can't decide, go with your first instinct. Analysis paralysis produces mediocre compromises.

2. **Side projects should be "stupid."** The best design work comes from removing expectations. No client brief, no KPIs, no audience research. Just make something because it interests you. These projects produce the most distinctive visual language because there's nothing to conform to.

3. **Color Claim method:** Pick 2-3 colors maximum. One subtle background, one highlight, one high-contrast. Don't study color theory. Collect colors from photography, architecture, fashion. Build a personal color library from the real world.

4. **The portfolio principle applied to all design:** Your work should be recognizable without your name attached. If someone could swap your name for any other designer's and nobody would notice, your design lacks character. Opinionated choices (unexpected color, unusual layout, breaking a "rule") create recognition.

---

## 8. Specific Recipes

### Recipe: Premium Dark Card

```css
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 32px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 16px 32px rgba(0, 0, 0, 0.15);
}
```

### Recipe: Text Hierarchy on Dark Background

```css
.headline    { color: #ffffff; font-weight: 700; }
.subheading  { color: #e0e0e0; font-weight: 500; }
.body        { color: #a0a0a0; font-weight: 400; }
.muted       { color: #666666; font-weight: 400; }
.label       { color: #888888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; }
```

### Recipe: Animated Background Blobs

```css
.blob {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  filter: blur(120px);
  opacity: 0.25;
  animation: morph 20s ease-in-out infinite alternate;
}
.blob-1 { background: rgba(0, 255, 65, 0.3); animation-duration: 20s; }
.blob-2 { background: rgba(100, 50, 255, 0.3); animation-duration: 25s; }
.blob-3 { background: rgba(0, 200, 255, 0.3); animation-duration: 22s; }

@keyframes morph {
  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 40% 60% 60% 40% / 40% 70% 30% 60%; }
}
```

### Recipe: Scroll Fade-Up

```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children */
.fade-up:nth-child(1) { transition-delay: 0ms; }
.fade-up:nth-child(2) { transition-delay: 80ms; }
.fade-up:nth-child(3) { transition-delay: 160ms; }
.fade-up:nth-child(4) { transition-delay: 240ms; }
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

### Recipe: Stripe-Style Diagonal Section

```css
.diagonal-section {
  position: relative;
  overflow: hidden;
  transform: skewY(-6deg);
  padding: 120px 0;
}
.diagonal-section > * {
  transform: skewY(6deg); /* counter-skew content */
}
```

---

## Sources

- [Erik Kennedy - 7 Rules for Creating Gorgeous UI Part 1](https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html)
- [Erik Kennedy - 7 Rules for Creating Gorgeous UI Part 2](https://medium.com/@erikdkennedy/7-rules-for-creating-gorgeous-ui-part-2-430de537ba96)
- [Erik Kennedy - Color in UI Design: A Practical Framework](https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html)
- [Erik Kennedy - The HSB Color System: A Practitioner's Primer](https://www.learnui.design/blog/the-hsb-color-system-practicioners-primer.html)
- [Erik Kennedy - Font Size Guidelines for Responsive Websites](https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html)
- [Dieter Rams 10 Principles - IxDF](https://www.interaction-design.org/literature/article/dieter-rams-10-timeless-commandments-for-good-design)
- [Beyond Minimalism: Misinterpreting Dieter Rams in UX](https://medium.com/design-bootcamp/beyond-minimalism-why-weve-misinterpreted-dieter-rams-design-principles-in-modern-ux-44b729078aae)
- [Linear - How We Redesigned the UI](https://linear.app/now/how-we-redesigned-the-linear-ui)
- [The Rise of Linear Style Design](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)
- [Linear Style Theme System](https://linear.style/)
- [Vercel Geist Typography](https://vercel.com/geist/typography)
- [Vercel Geist Colors](https://vercel.com/geist/colors)
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Stripe - Designing Accessible Color Systems](https://stripe.com/blog/accessible-color-systems)
- [Stripe - Connect Behind the Front-End Experience](https://stripe.com/blog/connect-front-end-experience)
- [Stripe Website Fonts In Use (2020)](https://fontsinuse.com/uses/35338/stripe-website-2020)
- [Apple HIG - Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Apple HIG - Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Tobias van Schneider - Color Claim / ColorClaim](https://vanschneider.com/colors)
- [Tobias van Schneider - Why Side Projects Should Be Stupid](https://review.firstround.com/spotifys-design-lead-on-why-side-projects-should-be-stupid/)
- [Josh Comeau - Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/)
- [Josh Comeau - Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/)
- [Material Design 3 - Elevation](https://m3.material.io/styles/elevation/applying-elevation)
- [Material Design 3 Box-Shadow CSS Values](https://studioncreations.com/blog/material-design-3-box-shadow-css-values/)
- [Stripe Mesh Gradient WebGL](https://gist.github.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d)
- [How to Recreate Stripe's Gradient - Codrops](https://tympanus.net/codrops/2022/09/26/how-to-recreate-stripes-lava-lamp-gradient-with-three-js/)
