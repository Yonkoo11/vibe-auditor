# Design Lessons (Learned While Building)

## 1. Blobs > Gradients for "Alive" Backgrounds

CSS `radial-gradient` is computed once and feels static/mathematical. Blobs are actual DOM elements that move and morph in real-time.

**The technique:**
- Large div (500-800px) with asymmetric `border-radius` like `60% 40% 30% 70% / 60% 30% 70% 40%`
- `filter: blur(120px)` dissolves hard edges into soft light pools
- Animate `border-radius` between organic shapes over 15-30s
- Each blob gets its own timing so they never sync up (organic feel)
- `rgba` colors at 0.2-0.4 opacity - visible but not overwhelming

**Why it works:** The browser composites blobs in real-time. When they overlap, colors naturally blend through alpha compositing, creating shifting, evolving light. Gradients can't do this.

**Who does this:** Linear, Stripe, Vercel, Raycast. Standard technique for premium dark-mode sites.

**The whiteout lesson:** `mix-blend-mode: screen` makes colors lighter where they overlap (like projecting spotlights on a wall). Stack too many layers and everything blows to white. Natural `rgba` transparency is safer and usually enough. Only use blend modes when you control exactly how many layers can overlap.

---

## 2. Glass Needs Something Behind It

`backdrop-filter: blur()` (glassmorphism) only looks good when there's visible color behind the glass. On a flat black background, glass just looks like a slightly lighter rectangle. The blobs give the glass panels something to refract.

---

## 3. Terminal Chrome Makes Code Look Professional

Two code panels side by side = generic tutorial. Add macOS-style window chrome (traffic light dots, filename tab, status badge) and suddenly it looks like a real product screenshot. Details that signal "this is a real tool":
- Traffic light dots (red/yellow/green circles)
- Filename in the title bar
- Line numbers starting at a realistic number (12, not 1)
- Status badges ("VULNERABLE" / "SECURE")
- Syntax highlighting with distinct token colors

---

## 4. Opacity Is the #1 Mistake in Dark UI

Most AI-generated dark themes use opacity values of 0.04-0.12 for decorative elements. This is invisible. The human eye needs at least 0.15-0.20 to register color on a dark background. For background effects that should be clearly visible, 0.25-0.40 is the sweet spot. Below 0.10 is basically invisible.

---

## 5. Animation Timing Creates Organic Feel

If two elements animate at the same speed, the brain reads it as mechanical. Give each animated element a unique duration:
- Blob 1: 20s, Blob 2: 25s, Blob 3: 22s, Blob 4: 30s, Blob 5: 18s
- The prime-ish numbers mean they rarely sync up
- This creates the "breathing" quality that premium sites have

---

## 6. Section Color Identity

Each section of a long page should have its own color atmosphere. This creates a sense of journey as you scroll:
- Hero: green + purple (brand colors)
- Features: purple + cyan (technical feel)
- Comparison: amber + orange (warmth, before/after contrast)
- Install: green + cyan (fresh, action-oriented)

Without this, scrolling feels like moving through one uniform dark tube.

---

*More lessons added as we build.*
