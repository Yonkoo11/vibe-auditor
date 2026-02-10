# Vibe Check - Landing Page Design Research

**Date:** 2026-02-10
**Scope:** 8 competitor landing pages + broader SaaS/devtool trends research
**Purpose:** Inform the final landing page design for the Claude Code Hackathon submission

---

## 1. Individual Site Analyses

### Linear (linear.app) - The Gold Standard

**Hero:** Centered layout. Large white sans-serif headline: "Linear is a purpose-built tool for planning and building products." Subtext in muted gray below. Two CTAs: "Start building" (filled) + "New: Linear Reviews (Beta)" (text link with arrow). Below the fold: a large product screenshot showing the actual UI (inbox, issues, code review), slightly rotated/overlapping to create depth.

**What makes it world-class:**
- The product screenshot in the hero IS the visual. No abstract illustrations. You see exactly what you're getting.
- Social proof immediately after hero: "Powering the world's best product teams" with OpenAI, Cash App, Scale, Ramp, Vercel, Coinbase, Cursor logos. Two rows of 4. Clean, white logos on dark bg.
- Feature section uses a 3-column card layout with perspective-shifted screenshots inside each card. Headers like "Made for modern product teams" with body text alongside.
- Color: Pure black (#000) background, white text, minimal accent color. Gradients are extremely subtle (slight purple/blue glow behind some elements).
- Typography: Inter (or similar grotesque sans). Headlines ~48-72px, bold. Body ~16px, light gray (#999). Massive whitespace between sections.
- Animations: Smooth scroll reveals. Elements fade up as they enter viewport. No bouncing, no parallax gimmicks. Everything is restrained.

**Steal:** The "product screenshot as hero visual" approach. The logo bar placement. The extreme restraint in color (essentially monochrome + one accent).

---

### Cursor (cursor.com) - Direct Competitor Space

*(Site loaded slowly/timed out during research, so analysis is based on known design + search data)*

**Hero:** Dark background with colorful neon accents. Centered headline about AI-first code editing. Product preview showing the editor with AI inline suggestions. Download buttons prominent.

**What makes it stand out:**
- Neon accent colors (purple, blue, pink gradients) against dark bg create energy without being loud
- Product-first: the hero visual IS the editor, showing real AI completions in action
- "Tab" as the core interaction is shown visually, not described
- Social proof via GitHub stars and download counts
- Pricing comparison section (vs Copilot) directly on the landing page

**Steal:** The energy of neon accents. Showing the actual AI interaction (not a static screenshot but a representation of the workflow).

---

### Vercel (vercel.com) - Iconic Developer Platform

**Hero:** Centered text: "Build and deploy on the AI Cloud." White text on light/white background (interesting: they went LIGHT mode, not dark). Below: "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web." Two CTAs side by side: "Start Deploying" (black filled) + "Get a Demo" (outlined). Visual below: an abstract geometric gradient (warm oranges, pinks, teals) with Vercel triangle logo overlaid.

**What makes it world-class:**
- The page is surprisingly SHORT. Hero + a brief middle section + footer. No scrolling feature carousel. Confidence in brevity.
- Abstract art as hero visual instead of product screenshots. This works because Vercel is already well-known. We can't do this.
- Light mode is unexpected for a dev tool and makes Vercel stand out from the sea of dark-mode pages.
- Footer is massive and well-organized: Products, Resources, Company, Social columns.
- Grid overlay visible in the hero (faint lines), giving it a "blueprint" feel.

**Steal:** The confidence of brevity. The dual CTA pattern (action + secondary). The structured footer.

---

### Snyk (snyk.io) - Closest to Our Use Case

**Hero:** Dark background with animated particle/wave visualization (purple dots forming a wave pattern). Banner at top: "This Just In: Snyk 'ToxicSkills' Research Exposes Critical Flaws" (news/PR hook). Main headline: "Introducing the AI Security Fabric" with subhead "Unleash AI Innovators Securely." Body text about "autonomous defense architecture designed for an era where code creation has accelerated beyond human capacity." CTA: "Explore the platform" (text link with arrow).

**What makes it stand out:**
- Fear-based messaging works for security: "48% of AI-gen code is insecure", "Time-to-exploit is shrinking fast", "Your AI features are now attack vectors." Three cards below hero with these stats.
- They lead with the PROBLEM, not the solution. Three problem cards with code snippets showing real vulnerabilities.
- New product launch event promoted inline (video embed with launch event details).
- Enterprise-oriented: "Book a live demo" as primary CTA, "Sign up" as secondary. They're selling to security teams, not individual devs.

**What's wrong with it:**
- The "AI Security Fabric" headline is vague and corporate. Nobody knows what that means.
- Too much content. The page feels like it was designed by committee.
- The cookie consent banner is enormous and blocks the bottom 30% of the viewport.

**Steal:** The problem-first messaging structure. The stat cards with real vulnerability code snippets. The "news banner" at the top for social proof/timeliness.

---

### Socket.dev - Supply Chain Security

*(Blocked by Cloudflare challenge. Analysis from prior knowledge.)*

**Key design patterns:**
- Clean, minimal design with white/light background
- Focus on package analysis results shown inline
- "Before/after" pattern: what a malicious package looks like vs clean
- GitHub integration screenshots as social proof
- Developer-first language, not enterprise

**Steal:** The idea of showing actual detection results inline on the landing page.

---

### Warp (warp.dev) - Best Terminal Design

**Hero:** Split layout. Left side: huge stacked text "The best terminal for building with agents" in white. Below: "Run a team of agents - from Warp's SOTA agent to Claude Code, Codex, and Gemini CLI - all from the terminal." Two install options: "Download for Mac" button + `brew install --cask warp` code snippet. Right side: full product screenshot showing the terminal with an active agent session (file tree, tasks list with checkmarks, AI output). Below: tabbed UI showing use cases: "Build features", "Fix bugs", "Debug prod", "Understand your codebase."

**What makes it world-class:**
- The hero screenshot is ALIVE. It shows an actual agent session with completed tasks, file trees, and AI reasoning. You instantly understand the product.
- "Ranked #1 Terminal-Bench" and "Ranked #5 SWE-bench Verified" badges with laurel icons. Quantitative proof.
- Logo bar: "Trusted by over half a million engineers at leading companies" + Amazon, Docker, GitHub, Ramp, Asana, DoorDash, Retool logos.
- Below: "State of the art agent, Oz" section with specific benchmark rankings.
- The `brew install` command IS a CTA. Devs can copy-paste immediately.

**Steal:** The brew/npx install command as a first-class CTA element. The benchmark/ranking badges. The live agent session screenshot showing completed work.

---

### Railway (railway.app) - Clean Deployment

**Hero:** Centered: "Ship software peacefully" in large white serif-ish font. Subtitle: "With the all-in-one intelligent cloud provider." Two CTAs: "Deploy" (purple gradient, filled) + "Demo" (outlined). Background: illustrated sky scene with clouds and a train passing through (the Railway brand metaphor). Below: tabbed product demo showing Architecture, Observability, Logs, Settings views.

**What makes it world-class:**
- THEMED ILLUSTRATION as hero background. The sky/clouds/train is custom art that matches the brand (Railway = train). This gives it personality no one else has.
- Interactive product demo right below the hero. Tabs let you switch between different views of the dashboard.
- Top banner: "Railway raises $100M Series B to unburden the builders. View details" - social proof through funding.
- Logo bar with Tripadvisor, Cognizant, Mercado Libre, etc.
- Features use a timeline/stepper layout with icons, not a grid.

**Steal:** The themed illustration concept (we could do a "vibe" visual metaphor). The interactive tabbed demo. The funding/milestone banner for credibility.

---

### Raycast (raycast.com) - Excellent Landing Page

**Hero:** Full-viewport. Abstract red/pink light beams on dark background (dramatic, almost cinematic). Centered: "Your shortcut to everything." Below: "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable." CTA at bottom of viewport: "Download for Mac" + "Download for Windows (beta)" with version number and system requirements shown.

**What makes it world-class:**
- The abstract visual is BOLD. Red light beams slashing across a dark background. It's art, not UI.
- After hero: "Take shortcuts, not detours. One interface, everything you need." Then a full product demo showing the Raycast UI inside a macOS frame, with clipboard history, search, and context menu visible.
- Below demo: two stat cards: "Native. Pure performance." and "Reliable. 99.8% crash-free rate." Short, punchy, quantified.
- Extension marketplace section: "There's an extension for that." with tabbed categories (Productivity, Engineering, Design, Writing) and actual extension cards (Linear, Google Translate, Spotify).
- They show the ECOSYSTEM, not just the product.

**Steal:** The bold abstract visual. The stat cards with single-word descriptors. The ecosystem/extensions showcase.

---

## 2. Common Patterns Across World-Class Dev Tool Sites

Based on all 8 sites + the Evil Martians study of 100+ devtool landing pages:

### Layout
- **Centered hero** is the dominant pattern (7/8 sites). Only Warp uses a split layout.
- **Max-width container** everywhere: ~1200-1400px. Never full-bleed text.
- **Vertical rhythm**: massive spacing between sections. 120-200px gaps are normal.
- **One main CTA per section.** Never more than two buttons side by side.

### Color & Theme
- **Dark mode is default** for dev tools. 7/8 sites use dark backgrounds. Only Vercel went light.
- **Monochrome + one accent.** Linear = white + subtle purple. Warp = white + amber/green. Railway = white + purple.
- **Gradients are SUBTLE.** Soft glows behind elements, not on text. Never a full-page gradient.

### Typography
- **Sans-serif dominates.** Inter, system fonts, or custom grotesques. Only Railway uses a serif-adjacent display font.
- **Hero headlines: 48-96px, bold/black weight.** Always the largest element on the page.
- **Body text: 16-18px, light gray (#999 to #aaa).** Never pure white for body copy.
- **Monospace for code/terminal elements only.** Never as body text.

### Social Proof
- **Logo bar appears immediately after hero** in 6/8 sites. "Trusted by..." or "Powering..." with 6-12 logos.
- **Curated testimonials** styled as tweets or quotes, but manually selected (not API-pulled).
- **Quantitative stats** over qualitative praise: "500K engineers", "99.8% crash-free", "#1 on Terminal-Bench."

### Demo/Product Section
- **Product screenshot/video in the hero** or immediately below. Never delayed past the second scroll.
- **Interactive demos > static screenshots.** Tabbed views, typing animations, before/after comparisons.
- **The product IS the design.** If the tool looks good, show it. If it's a CLI, show the terminal output.

### Animations
- **Scroll-triggered fade-up** is the only animation that appears across all sites.
- **No parallax.** It's considered dated.
- **Typing animations** for terminal/code tools.
- **Subtle hover states** on cards and buttons (slight scale, glow, or color shift).
- **prefers-reduced-motion respected** by the best sites.

### CTA Patterns
- **Primary: action verb** ("Start building", "Deploy", "Download for Mac")
- **Secondary: informational** ("Get a demo", "Learn more", "View docs")
- **Code snippet as CTA** for developer tools: `npx create-...` or `brew install ...`
- **Install command is always copy-pastable** with a click-to-copy button.

---

## 3. What Our Current Proposals Are Missing

Looking at our Proposal 1 ("Terminal Noir") against these patterns:

### What we DO well:
- Dark mode, monospace terminal aesthetic fits the dev tool pattern
- "You vibed. Now ship." is a killer headline. Short, punchy, memorable.
- The typing terminal demo showing `/vibecheck --fix` output is strong
- Problem stats (~50%, $5-15K) are well-placed
- Pull-quote "Vibe coding cleanup is now a $5-15K consulting service. Or one command." is excellent copy

### What we're MISSING:

1. **No social proof / logo bar.** Every top site has one. We need something. Options:
   - "Built for the Anthropic Hackathon" badge
   - GitHub stars counter (even if low, it shows activity)
   - "Works with" logos: Claude Code, Cursor, Bolt, Lovable
   - Stats: "X issues found", "X fixes applied" from our demo runs

2. **No "Install" CTA above the fold.** The install command (`npx claude-plugins install vibecheck`) should be visible in the hero or immediately after, not buried at the bottom. Copy-paste is the dev's CTA.

3. **No interactive/animated demo.** Our terminal is static HTML. The best sites show the product WORKING. We need:
   - Typing animation that plays automatically
   - The F -> C+ grade transformation should animate (color shift from red to green)
   - Progress bars or step indicators for the scanning phases

4. **No bento grid / feature cards.** We go straight from problem to demo to install. We need a section that shows WHAT the tool does in scannable cards:
   - Security audit (shield icon)
   - Auto-fix (wrench icon)
   - Test generation (checkmark icon)
   - Score tracking (chart icon)

5. **Missing the "How it works" clarity.** Best sites have a numbered 3-step flow. Ours should be:
   - Step 1: `/vibecheck` - Scan your project
   - Step 2: Review the report (F grade, 53 issues)
   - Step 3: `/vibecheck --fix` - Auto-fix everything
   - Result: C+ grade, 33 fixes applied, 33 tests generated

6. **No before/after comparison.** Snyk shows vulnerability code. We should show a split: code BEFORE (with red highlighted vulns) vs code AFTER (green, fixed). This is the money shot for a security tool.

7. **Footer is too minimal.** Need: GitHub link, docs link, Claude Code plugin directory link, hackathon badge, "Built with Claude Opus 4.6" credit.

8. **No video/GIF of actual usage.** A 15-second GIF of running `/vibecheck` in a real Claude Code session would be more convincing than any amount of HTML animation.

---

## 4. Specific Actionable Recommendations by Section

### Hero Section
**Current:** Asymmetric layout, huge serif headline, subtle green glow, typing subtext.
**Recommended changes:**
- Keep "You vibed. Now ship." headline. It's our best asset.
- ADD the install command directly in the hero: `npx claude-plugins install vibecheck` with a copy button
- ADD a secondary CTA: "View on GitHub" (outlined button)
- REDUCE the empty space. The hero takes up a full viewport with mostly black. Show more, faster.
- Consider adding a small animated terminal preview in the hero right side (like Warp's split layout) showing the scan running

**Reference:** Warp's hero (split: headline left, product right) or Linear's hero (headline above, product screenshot below)

### Problem/Stats Section
**Current:** ~50% stat + $5-15K stat + pull-quote. Good content, decent layout.
**Recommended changes:**
- Make it a 3-card layout instead of split: "50% of AI code is insecure" | "$5-15K manual cleanup cost" | "30% more defects with AI" (from CodeScene)
- Each card gets an icon and a 1-line source citation
- Background: very subtle gradient or glow to differentiate from the hero black

**Reference:** Snyk's three problem cards with code snippets

### Demo Section
**Current:** Static terminal HTML showing output of `/vibecheck --fix`.
**Recommended changes:**
- ADD typing animation. The command should type itself, then output should appear line-by-line with realistic timing.
- The grade transformation (F -> C+) should be the climax. Big animated grade letters with color shift.
- ADD a tabbed view: "Audit" tab (shows the scan output) | "Fix" tab (shows the fixes being applied) | "Report" tab (shows the final score)
- Consider a side-by-side: left shows terminal, right shows the actual code being fixed in real-time

**Reference:** Warp's interactive terminal demo, Railway's tabbed product view

### Features / Bento Section
**Current:** Missing. We go from demo straight to install.
**Recommended addition:** A 2x2 or 2x3 bento grid:

| Card | Title | Description |
|------|-------|-------------|
| Large (spans 2 cols) | "4 AI Agents, One Command" | security-auditor, auth-checker, secret-hunter, test-generator. Show the agent icons/badges. |
| Medium | "Find" | "53 security issues detected across SQL injection, XSS, SSRF, hardcoded secrets" |
| Medium | "Fix" | "33 issues auto-fixed. Zero breaking changes. Your code, but safe." |
| Medium | "Test" | "33 tests auto-generated. Every fix is verified." |
| Medium | "Score" | "F -> C+. Track your vibe code's health over time." |

Each card should have a subtle background (slightly lighter than the page bg), rounded corners, and a small illustration or icon.

**Reference:** Linear's feature cards, Raycast's extension grid

### Install Section
**Current:** Code block at the bottom.
**Recommended changes:**
- Make it a full-width section with generous padding
- Centered layout: headline "Get started in 10 seconds"
- The install command in a large, prominent code block with copy button
- Below: 3 prerequisite badges: "Requires Claude Code v2.0.12+" | "Works with Node.js" | "Open Source"
- Optional: show a 3-step quickstart (install -> cd into project -> /vibecheck)

**Reference:** Warp's brew install as a first-class element

### Footer
**Current:** Minimal or missing.
**Recommended addition:**
- Left: Vibe Check logo + "Built for the Claude Code Hackathon, Feb 2026" + "Powered by Claude Opus 4.6"
- Center: Links (GitHub, Docs, Plugin Directory, Report Issues)
- Right: "Made by @yonko" + social links
- Status line at very bottom: "Open source. MIT licensed."

**Reference:** Vercel's structured footer, Linear's clean footer

---

## 5. Design System Recommendations

### Color Palette
Keep the dark terminal aesthetic but add warmth:
- **Background:** #0a0a0f (near-black, slightly blue)
- **Surface:** #141420 (cards, elevated elements)
- **Border:** #222233 (subtle, barely visible)
- **Text primary:** #e0e0e0 (not pure white, easier on eyes)
- **Text muted:** #666680
- **Accent primary:** #00FF41 (terminal green, our brand)
- **Accent secondary:** #ff3366 (coral/red for "before" / vulnerabilities)
- **Accent tertiary:** #00e5a0 (softer green for success states)
- **Grade colors:** F=#ff3366, D=#ff6633, C=#ffaa00, B=#66cc00, A=#00ff41

### Typography
- **Display/Headlines:** DM Serif Display or a similar high-contrast serif. This differentiates us from the Inter/sans crowd.
- **Body/UI:** JetBrains Mono or similar monospace. Fits the terminal brand.
- **Scale:** Hero: 72-96px. Section heads: 36-48px. Body: 16px. Small/labels: 12-14px.

### Animations (keep it tight)
- Scroll-triggered fade-up for sections (IntersectionObserver, 0.3s ease-out)
- Terminal typing effect for the demo (typewriter with cursor blink)
- Grade counter animation (F ticks up to C+ with color interpolation)
- Hover glow on cards (box-shadow transition, 0.2s)
- Copy button: "Copied!" feedback with checkmark animation
- NO parallax, NO bouncing, NO page-load sequences longer than 1s

---

## 6. Top 5 Things to Steal and Adapt

1. **From Warp:** The split hero (headline left + live product right) + brew/npx install as a first-class CTA + benchmark badges. Adapt: show our terminal output on the right, put `/vibecheck` install command prominently.

2. **From Linear:** The product screenshot AS the visual + immediate logo bar social proof + extreme vertical spacing. Adapt: our terminal demo IS our product visual. Add "Works with: Claude Code, Cursor, Bolt" logos.

3. **From Snyk:** Problem-first messaging with three stat cards showing real vulnerability code. Adapt: our three cards are the AI code insecurity stats we already have, but formatted as proper cards with source citations.

4. **From Raycast:** Bold abstract hero visual + quantified stat cards ("Native. Pure performance." pattern) + ecosystem showcase. Adapt: use bold green glow/gradient art + "4 Agents. One command." + "53 issues. 33 fixes. 33 tests."

5. **From Railway:** Interactive tabbed product demo + themed brand illustration + milestone banner. Adapt: tabbed demo showing Audit/Fix/Test/Score views + "Built for Claude Code Hackathon" banner at top.

---

## 7. Key Insight from Evil Martians Study

The Evil Martians study of 100+ devtool landing pages found that the most effective pages share these traits:

- **Centered layout** with max-width container. Simple, readable, fast to build.
- **Logo bar immediately after hero.** Fastest credibility signal.
- **Curated testimonials**, not auto-pulled. Manually selected, clean formatting.
- **For individual-dev tools** (like us): use big numbers instead of logos. GitHub stars, usage stats, issues found.
- **The hero IS the product.** If you have a beautiful UI, screenshot it. If it's CLI, show terminal output.

Source: [Evil Martians - We studied 100 dev tool landing pages](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)

---

## 8. Claude Code Plugin Landscape

Relevant context for positioning:

- **16,400+ Claude Code plugins** exist on claude-plugins.dev marketplace
- No prominent plugins have dedicated landing pages with the polish we're targeting
- Most plugin "pages" are GitHub READMEs or marketplace listings
- The official Anthropic plugin directory (github.com/anthropics/claude-plugins-official) is a simple repo
- **Opportunity:** A well-designed landing page would immediately differentiate us from 16K+ plugins that have none

This means our landing page doesn't just sell the product. It's the primary competitive advantage for discoverability and trust in a sea of README-only plugins.

---

## Sources

- [Evil Martians - 100 Dev Tool Landing Pages Study](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)
- [SaaSFrame - 10 SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)
- [SaaSFrame - The Bento Layout Trend](https://www.saasframe.io/blog/the-bento-layout-trend)
- [Landdding - UI Design Trends 2026](https://landdding.com/blog/ui-design-trends-2026)
- [Medium - The Rise of Linear Style Design](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)
- [LogRocket - Linear Design SaaS Trend](https://blog.logrocket.com/ux-design/linear-design/)
- [Claude Code Plugins Directory](https://claude-plugins.dev/)
- [Lapa.ninja - Dev Tool Landing Pages](https://www.lapa.ninja/category/development-tools/)
