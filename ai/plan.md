# Proposal-3 World-Class Upgrade Plan
Created: 2026-02-10

## Goal
Upgrade proposal-3.html from "good" to world-class, section by section.
Reference: ai/design-research.md

## Sections to implement (in order)

### 1. Hero upgrade
- Add install command `npx claude-plugins install vibecheck` with copy button, positioned below the CTA
- Add secondary CTA: "View on GitHub" (outlined button) next to "See it work"
- Reduce dead space -- tighten vertical padding slightly
- File: proposals/proposal-3.html

### 2. Social proof bar (NEW)
- Position: immediately after hero, before bento grid
- Content: "Works with Claude Code" + logo-style badges
- Stats: "53 issues found | 33 auto-fixed | 33 tests generated"
- Subtle background differentiation from hero
- Compact, single horizontal strip

### 3. Demo tile typing animation
- The terminal demo tile should auto-play a typing animation when scrolled into view
- Command types itself: `$ /vibecheck --fix`
- Output appears line by line with realistic timing (50-100ms per line)
- Grade transition F -> B+ should animate with color interpolation
- Use IntersectionObserver to trigger only once

### 4. Before/After code comparison (NEW)
- Position: after bento grid, before install section
- Split view: left = red (vulnerable code), right = green (fixed code)
- Show a real example: SQL injection `db.query(\`SELECT * FROM users WHERE id = ${id}\`)` -> parameterized query
- Maybe 2-3 examples that cycle or stack vertically
- This is "the money shot" for a security tool

### 5. Install section expansion
- Headline: "Get started in 10 seconds"
- Large prominent code block with copy button
- 3-step quickstart below: install -> cd project -> /vibecheck
- Prerequisite badges: "Requires Claude Code" | "Node.js" | "Open Source"

### 6. Footer (NEW)
- Left: Vibe Auditor logo + "Built for Claude Code Hackathon, Feb 2026"
- Center: GitHub | Docs | Plugin Directory | Report Issues
- Right: "Made by @yonko"
- Bottom line: "Open source. MIT licensed. Powered by Claude Opus 4.6"

### 7. Kill parallax
- Research says parallax is dated. Remove the hero parallax and atmospheric orb parallax
- Keep: scroll progress bar, nav tracking, tile stagger fade-in
- Replace parallax with simple scroll-triggered fade-ups

## Implementation approach
- One section per background agent
- Screenshot before/after each section
- Compact between major sections if needed
- Update progress.md after each section completes

## Design constraints (from research)
- NO parallax (dated)
- NO bounce animations
- Scroll-triggered fade-up only
- Max 2 CTAs per section
- Monochrome + one accent (green)
- 120-200px gaps between sections
- Body text: light gray, not pure white
