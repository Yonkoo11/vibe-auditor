# Vibe Auditor — Product Requirements Document

**One-liner:** A Claude Code plugin that audits and auto-fixes vibe-coded projects, turning prototypes into production-ready software with a single command.

**Hackathon:** Built with Opus 4.6 (Feb 10-16, 2026)
**Team size:** 1 (solo)
**Tagline:** "You vibed. Now ship."

---

## The Problem

Vibe coding is exploding. Cursor, Bolt, Lovable, Replit Agent — everyone's building apps by talking to AI. The results work... until they don't.

The numbers:
- **45% of AI-generated code contains security flaws** (Veracode 2025)
- AI chooses the insecure solution path ~50% of the time
- "Vibe coding cleanup specialist" is now a real job title — humans manually fixing AI code
- Companies like SoftTeco, Redwerk, Geniusee charge $5-15K+ per cleanup engagement
- CodeScene found AI assistants increase defect risk by 30%+ in projects with poor code health

The gap: **No automated tool exists that audits AND fixes vibe-coded projects natively within Claude Code.** Current solutions are either manual (hire a dev), static-only (linters report but don't fix), or external (not integrated into the agentic coding workflow).

---

## Design Principles

1. **Fix, don't rewrite. (Vibe Preservation)** Vibe Auditor is vibe coding's ally, not its critic. We harden code without changing its character. The user should look at the diff and recognize their own code.

   **Preserve:**
   - Variable/function names (even quirky ones like `yolo` or `doTheThing`)
   - File structure and component organization
   - Formatting style, indentation preferences
   - Comments and documentation tone
   - Framework patterns the user chose (even if unconventional)
   - UI/UX behavior — zero visual changes

   **Change only:**
   - Security vulnerabilities (injection, XSS, SSRF)
   - Missing auth/authorization guards
   - Hardcoded secrets (move to .env, keep the same variable reference)
   - Missing error handling on critical paths
   - Add tests — never modify existing passing tests

   Every subagent prompt must include: *"Preserve the original code's style, naming conventions, and structure. Make the minimum change needed to fix the issue. Do not refactor, rename, or reorganize."*

2. **Always leave the app working.** Every fix is verified. If something breaks, roll back that specific change. The app after `/vibecheck` must behave identically to before — just without the vulnerabilities.

3. **Show, don't tell.** Don't just list problems. Fix them, prove they're fixed, and show the receipts (scores, diffs, screenshots when available).

4. **Audit by default, fix on demand.** Default mode is `--audit-only` (report findings). Pass `--fix` to auto-apply fixes. Builds trust — users see what will change before it changes.

---

## Supported Stacks (MVP)

Focus on the 3 most commonly vibe-coded stacks:

| Stack | Priority | Why |
|-------|----------|-----|
| **Next.js / React** | P0 | Most vibe-coded apps are React-based (Bolt, Lovable, v0) |
| **Express / Node API** | P0 | Common backend for vibe-coded fullstack apps |
| **Python / FastAPI** | P1 | Secondary but growing fast with Replit Agent |

Everything else gets a **generic scan** (secrets, obvious injection, missing tests) — no framework-specific checks.

---

## The Solution

**Vibe Auditor** is a Claude Code plugin with two modes:

### Mode 1: `/vibecheck` (Ship Mode)
Run once when you're ready to ship. Full autonomous audit + fix pipeline.

```
> /vibecheck

Vibe Auditor v1.0 — Scanning your project...

[Security]     ████████████ Scanning for vulns...
[Tests]        ████████████ Generating test coverage...
[Auth]         ████████████ Checking authorization logic...
[Secrets]      ████████████ Hunting hardcoded credentials...
[Performance]  ████████████ Spotting N+1s and bottlenecks...
[Accessibility]████████████ Checking a11y compliance...

═══════════════════════════════════════════
  VIBE SCORE: D+ → B+  (14 issues fixed)
═══════════════════════════════════════════

  Security:      F → A  (3 critical, 2 high fixed)
  Tests:         F → B  (47 tests generated, 89% pass)
  Auth:          D → A  (2 missing auth guards added)
  Secrets:       F → A  (1 hardcoded API key moved to .env)
  Performance:   C → B+ (1 N+1 query fixed)
  Accessibility: C → B  (5 missing labels added)

  Full report: ./vibecheck-report.html
  Screenshots: before/ and after/ verified ✓
═══════════════════════════════════════════
```

### Flags

| Flag | Behavior |
|------|----------|
| `/vibecheck` | Audit only — report findings, don't touch code (default) |
| `/vibecheck --fix` | Audit + auto-fix all issues |
| `/vibecheck --fix --category security` | Fix only security issues |
| `/vibecheck --score-only` | Just calculate and show the Vibe Score |

### Mode 2: Guardian Hooks (Watch Mode)
Runs passively during development via Claude Code hooks. Catches critical issues in real-time without breaking your vibe.

- Pre-commit hook: blocks hardcoded secrets, SQL injection, obvious auth bypasses
- Post-edit hook: warns about missing error boundaries, unvalidated inputs
- Lightweight — only flags CRITICAL issues to avoid nagging

### Output Files

| File | Purpose |
|------|---------|
| `vibecheck-report.html` | Beautiful shareable report card |
| `vibecheck.json` | Machine-readable results (for CI/CD, comparing runs) |
| `vibecheck-screenshots/` | Before/after screenshots (when available) |

---

## Why This Wins the Hackathon

### 1. Platform-native
Built as a Claude Code plugin (skills + hooks + subagents), not a Streamlit wrapper. The judges built this plugin system. They want to see it used creatively.

### 2. Culturally perfect timing
Vibe coding is THE discourse in Feb 2026. Headlines: "Vibe Coding Is Killing Open Source" (Hackaday), "Catastrophic Explosions in 2026" (The New Stack), "45% of AI Code Has Security Flaws" (Veracode). This tool is the answer to the biggest conversation in tech right now.

### 3. Demo sells itself
Before: broken, insecure vibe-coded app. Run `/vibecheck`. After: production-hardened app with test suite. 2-minute demo, maximum jaw drop. The Vibe Score going from D+ to B+ is visual, shareable, memorable.

### 4. Personal edge
Builder has professional smart contract security audit experience. The security scanning isn't superficial pattern matching — it catches real authorization logic flaws, business logic bugs, and vulnerability patterns that generic tools miss.

### 5. Real impact
Companies are paying $5-15K for manual vibe code cleanup. This automates 80% of it for free, inside the tool people are already using to vibe code.

---

## Architecture

### Plugin Structure
```
vibe-auditor/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── commands/
│   └── vibecheck.md         # Main /vibecheck slash command
├── agents/
│   ├── security-auditor.md  # Security scanning subagent
│   ├── test-generator.md    # Test generation subagent
│   ├── auth-checker.md      # Authorization logic checker
│   ├── secret-hunter.md     # Credential/secret detector
│   ├── perf-analyzer.md     # Performance issue spotter
│   └── a11y-checker.md      # Accessibility auditor
├── hooks/
│   ├── pre-commit.sh        # Block secrets + critical vulns
│   └── post-edit.sh         # Lightweight warnings
├── skills/
│   └── vibecheck/
│       └── SKILL.md         # Auto-trigger context
├── templates/
│   └── report.html          # Beautiful HTML report card
└── README.md
```

### Execution Flow

```
/vibecheck
    │
    ├── Phase 1: Snapshot
    │   ├── Record git state (for rollback)
    │   ├── Detect framework/stack
    │   └── Screenshot app via Puppeteer (optional — skips if no dev server)
    │
    ├── Phase 2: Parallel Audit (Agent Teams)
    │   ├── Security Agent ──→ vulns, injection, SSRF
    │   ├── Auth Agent ──────→ missing guards, broken access control
    │   ├── Secret Agent ────→ hardcoded keys, leaked credentials
    │   ├── Test Agent ──────→ missing coverage, edge cases
    │   ├── Perf Agent ──────→ N+1, missing indexes, bundle size
    │   └── A11y Agent ──────→ missing labels, contrast, keyboard nav
    │   (All run in parallel via Claude Code Agent Teams / Task tool)
    │
    ├── Phase 3: Triage + Fix
    │   ├── Merge findings, deduplicate
    │   ├── Prioritize: Critical → High → Medium → Low
    │   ├── Auto-fix each issue (edit files directly)
    │   ├── Run existing tests after each fix (if any)
    │   └── Verify app still works (Puppeteer screenshot if available, else test suite)
    │
    ├── Phase 4: Generate Missing Tests
    │   ├── Write unit tests for fixed code
    │   ├── Write integration tests for auth flows
    │   └── Run test suite, report coverage
    │
    └── Phase 5: Report
        ├── Calculate Vibe Score (A-F per category)
        ├── Generate HTML report card
        ├── Visual diff (before/after screenshots)
        └── Summary in terminal
```

### The Vibe Score

Letter grade per category, weighted overall score:

| Category | Weight | What it checks |
|----------|--------|----------------|
| Security | 30% | OWASP Top 10, injection, SSRF, XSS |
| Auth | 25% | Missing guards, broken access control, privilege escalation |
| Secrets | 15% | Hardcoded keys, .env leaks, credential exposure |
| Tests | 15% | Coverage %, test quality, edge cases |
| Performance | 10% | N+1 queries, missing indexes, obvious bottlenecks |
| Accessibility | 5% | WCAG basics, labels, keyboard nav |

### Scoring Rubric

Each category scores based on severity-weighted issue count:

| Grade | Criteria |
|-------|----------|
| **A** | 0 issues |
| **B** | 1-2 low/medium issues only |
| **C** | 3-5 issues, or 1 high severity |
| **D** | 1-2 critical issues |
| **F** | 3+ critical issues, or any hardcoded secrets |

The overall Vibe Score is the weighted average across categories.

The score is the **social hook**. People will screenshot their Vibe Scores and share them. "My side project went from D+ to A-" is a tweet that writes itself.

---

## Specific Vulnerability Patterns to Detect

Based on real-world vibe coding failure data:

### Critical (auto-fix immediately)
1. **Hardcoded secrets** — API keys, database passwords, JWT secrets in source
2. **SQL injection** — String concatenation in queries instead of parameterized
3. **Missing authentication** — API routes without auth middleware
4. **Missing authorization** — Authenticated but no role/ownership checks
5. **XSS** — Unescaped user input rendered in HTML/JSX

### High (auto-fix with verification)
6. **Negative quantity/price bugs** — Business logic allowing negative values (the #1 vibe coding bug per research)
7. **SSRF** — User-controlled URLs passed to server-side fetch
8. **Insecure file handling** — Path traversal, unrestricted uploads
9. **Missing rate limiting** — Auth endpoints without throttling
10. **Hallucinated dependencies** — npm/pip packages that don't exist or are typosquatted

### Medium (fix + report)
11. **Missing error boundaries** — Uncaught exceptions crash the app
12. **No input validation** — Forms accept anything
13. **Missing CORS config** — Wide-open or missing headers
14. **Console.log with sensitive data** — Logging tokens/passwords
15. **Missing security headers** — No CSP, HSTS, X-Frame-Options

---

## Key Differentiators

### vs. ESLint/SonarQube/Semgrep
Those tools **report**. Vibe Auditor **fixes**. And it understands context — it knows why the code was written this way because it can reason about intent, not just pattern match.

### vs. Human cleanup services ($5-15K)
Vibe Auditor runs in seconds, costs nothing, and handles the 80% of issues that are mechanical. The remaining 20% (architecture, business logic) still benefits from the report.

### vs. GitHub Copilot code review
Copilot reviews PRs. Vibe Auditor audits entire projects holistically, generates tests, and auto-fixes. Different scope entirely.

### vs. Cursor's built-in linting
Cursor helps you write code. Vibe Auditor helps you ship code. Different phase of the lifecycle.

---

## Build Plan (6 Days) — Tiered Scope

### MUST SHIP (Days 1-4) — The core that wins
Without these, there's no demo. Everything else is bonus.

**Day 1 (Mon Feb 10): Foundation + Demo App**
- [ ] Set up plugin structure (plugin.json, commands/, agents/)
- [ ] Build `/vibecheck` slash command that orchestrates the flow
- [ ] Implement framework/stack detection (Next.js, Express, FastAPI)
- [ ] Build or fork a deliberately flawed demo app (vibe-coded todo/e-commerce with planted vulns — SQL injection, hardcoded keys, missing auth). This is your controlled demo target.

**Day 2 (Tue Feb 11): Core Agents**
- [ ] Security auditor subagent (OWASP Top 10 patterns)
- [ ] Auth checker subagent (missing guards, broken access control)
- [ ] Secret hunter subagent (hardcoded credentials, .env leaks)
- [ ] Wire up parallel execution via Task tool
- [ ] Test all 3 agents against the demo app

**Day 3 (Wed Feb 12): Fix Pipeline + Scoring**
- [ ] Auto-fix engine (edit files directly)
- [ ] Rollback mechanism (git stash/branch-based)
- [ ] Vibe Score calculation (rubric-based grading)
- [ ] `vibecheck.json` machine-readable output
- [ ] Terminal output formatting (the pretty score display)

**Day 4 (Thu Feb 13): End-to-End Integration**
- [ ] Full `/vibecheck` and `/vibecheck --fix` flow working end-to-end
- [ ] Test on 2-3 real vibe-coded repos from GitHub (not just demo app)
- [ ] Fix orchestration bugs, handle edge cases (empty projects, no package.json, etc.)
- [ ] Verify vibe preservation — diffs should be surgical, not rewrites

### SHOULD SHIP (Day 5) — Makes it polished

**Day 5 (Fri Feb 14): Report + Tests**
- [ ] HTML report card template (beautiful, shareable)
- [ ] Test generator subagent (unit tests for critical paths)
- [ ] Puppeteer before/after screenshots (optional, skip if no dev server)
- [ ] Test on 2 more diverse projects

### NICE TO HAVE (Day 6 morning) — Cherry on top

**Day 6 (Sat Feb 15): Polish + Demo**
- [ ] Guardian hooks (pre-commit secret blocking)
- [ ] Performance analyzer subagent
- [ ] Accessibility checker subagent
- [ ] Record demo video
- [ ] Write README
- [ ] Submit

### Demo Prep (Sat afternoon)
- [ ] Rehearse demo 3x with timer
- [ ] Have backup recording in case live demo fails
- [ ] Prepare 1-slide summary if needed

---

## Demo Script (2 minutes)

**Demo app:** Pre-built flawed e-commerce/todo app with planted vulns (hardcoded Stripe key, SQL injection in search, missing auth on admin routes, zero tests). Built beforehand — never rely on finding a good repo during the demo.

1. **Open** (10s): "Everyone's vibe coding. But 45% of that code has security flaws. Meet Vibe Auditor."

2. **Before** (20s): Show the app running in browser. "Looks fine, right?" Quick flash of the code — hardcoded API key visible in source.

3. **Audit** (20s): Type `/vibecheck` in Claude Code. Agents scan in parallel. Vibe Score appears: **F**. Walk through findings: "3 critical vulns, hardcoded Stripe key, 2 unprotected admin routes, zero tests."

4. **Fix** (20s): Type `/vibecheck --fix`. Watch it fix each issue. Terminal shows progress.

5. **After** (30s): New Vibe Score: **B+**. Show the diff — surgical changes, code still looks like theirs. App still works. Open the HTML report card.

6. **Close** (10s): "Vibe code fast. Ship with confidence. Vibe Auditor — a Claude Code plugin."

---

## Success Metrics (for hackathon)

**Must hit:**
- [ ] `/vibecheck` runs clean on 5+ different vibe-coded projects
- [ ] `/vibecheck --fix` successfully fixes critical vulns without breaking the app
- [ ] Vibe Score displays correctly with before/after grades
- [ ] Demo runs clean in under 2 minutes
- [ ] Plugin installs and works for anyone with Claude Code

**Stretch:**
- [ ] HTML report card renders and is shareable
- [ ] Generated test scaffolding covers critical auth/security paths
- [ ] Before/after Puppeteer screenshots work for web apps
- [ ] Guardian hook blocks a hardcoded secret in a live demo

---

## Post-Hackathon Vision (if we win $100K credits)

1. **Open source the plugin** — Make it the standard vibe coding safety net
2. **Framework-specific modules** — Deep patterns for Next.js, Django, Rails, FastAPI, SvelteKit
3. **CI/CD integration** — Run Vibe Auditor on every PR via GitHub Actions
4. **Vibe Score badge** — Embeddable badge for READMEs (like code coverage badges)
5. **Leaderboard** — Anonymous aggregate scores showing the state of vibe-coded software
6. **IDE extension** — VS Code extension that shows Vibe Score in the status bar
