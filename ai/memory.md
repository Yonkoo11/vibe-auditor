# Vibe Check - Memory (Persistent Context)

## Project
- **What:** Landing page for "vibe check" - a security audit CLI tool
- **URL:** https://yonkoo11.github.io/vibe-check/
- **Repo:** github.com/Yonkoo11/vibe-check, branch `vibecheck-fixed`
- **File:** `proposals/proposal-3.html` (single-file landing page, also copied to `docs/index.html` for GitHub Pages)
- **Dev server:** `python3 -m http.server 8080` from project root

## Design System
- **Base:** Dark (#060612), glass panels, green (#00E5A0) primary, purple (#7C5CFC) secondary
- **Fonts:** display (Space Grotesk), body (Inter), mono (JetBrains Mono)
- **Background:** 5 animated morphing blobs (450-700px, blur 120px, rgba 0.2-0.4)
  - NO mix-blend-mode: screen (causes whiteout)
  - Section atmospheres dialed to 0.10-0.18 (complement blobs, don't compete)
- **Glass:** rgba(12,12,22, 0.55-0.75), backdrop-filter blur(20px) saturate(1.3)
- **Type scale:** CSS vars --text-xs through --text-hero
- **Border radius:** 8px (small), 16px (cards), 50% (circles)

## Architecture
- Single HTML file with inline CSS + JS
- Sections: hero (score card) -> social proof -> bento grid -> before/after code -> install -> footer
- Scroll features: progress bar, fade-up animations, nav tracking
- Score card: animated arc, grade transition F->B+, bloom behind card

## Active Issues
- Score card bloom still too subtle (was iterating on opacity/size when context hit)
- User wants to study https://wrapped.abs.xyz/ design for inspiration
- User wants design lessons taught during build (file: ai/design-lessons.md)

## Deploy Flow
```bash
cp proposals/proposal-3.html docs/index.html
git add proposals/proposal-3.html docs/index.html
git commit -m "message" && git push
# Wait 30s for GitHub Pages rebuild
```

## User Preferences
- Wants to LEARN frontend design principles while building
- Hates "AI slop" - generic, basic-looking output
- References: Linear, Stripe, Vercel, wrapped.abs.xyz
- Wants things to feel "alive" - animation, color, movement
- Gets frustrated by context limits - COMPACT AGGRESSIVELY

## Design Identity (Critical Context)
- Feedback from Abstract Wrapped team: dev portfolio "feels disconnected" from marketing portfolio/CV
- Marketing portfolio + CV = more personality, more memorable
- Dev portfolio = technically clean but could be anyone's work
- **Goal going forward:** Find and own a personal style. Opinionated > correct. Character > polish.
- This applies to vibe-check landing page too - it should feel like HIS work, not "nice dark template"
