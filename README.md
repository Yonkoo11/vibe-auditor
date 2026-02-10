# Vibe Check

**You vibed. Now ship.**

A Claude Code plugin that audits vibe-coded projects and auto-fixes them. One command finds security vulnerabilities, missing auth, hardcoded secrets, and missing tests -- then fixes them all while preserving your code's style.

```
/vibecheck --fix

═══════════════════════════════════════════
  VIBE SCORE: F → B+  (39 issues fixed)
═══════════════════════════════════════════

  Security:      F → A   (5 critical fixed)
  Auth:          D → A   (2 missing guards added)
  Secrets:       F → A   (API keys moved to .env)
  Tests:         F → B   (50 tests generated)
═══════════════════════════════════════════
```

## The Problem

Vibe coding is exploding. Cursor, Bolt, Lovable, Replit Agent -- everyone builds apps by talking to AI. The results work... until they don't.

- **45% of AI-generated code has security flaws** (Veracode 2025)
- AI picks the insecure path ~50% of the time
- "Vibe coding cleanup specialist" is now a real job ($5-15K per engagement)
- Code health drops 30%+ in AI-assisted projects (CodeScene)

**No tool exists that audits AND fixes vibe-coded projects inside Claude Code.** Until now.

## How It Works

```
/vibecheck              # Audit only (read-only scan)
/vibecheck --fix        # Audit + auto-fix everything
/vibecheck --score-only # Just the Vibe Score
```

### Pipeline

1. **Snapshot** -- Record git state for rollback, detect your framework
2. **Parallel Audit** -- 3 specialized agents scan simultaneously:
   - Security Auditor (OWASP Top 10: SQLi, XSS, SSRF, command injection)
   - Auth Checker (missing guards, IDOR, privilege escalation, negative values)
   - Secret Hunter (hardcoded keys, leaked credentials, .env issues)
3. **Vibe Score** -- Letter grades per category, weighted overall score
4. **Auto-Fix** -- Surgical edits that preserve your code's style
5. **Test Generation** -- Tests for every fix to prove they work
6. **Report** -- Terminal output + shareable HTML report card

### Vibe Preservation

Vibe Check is vibe coding's ally, not its critic. It fixes the SQL injection, not your naming conventions.

- Variable names stay exactly as they are (even `yolo` and `doTheThing`)
- File structure unchanged
- UI/UX behavior identical
- Only security-critical code gets touched

## Demo: VibeShop

Included demo app with **20 planted vulnerabilities** across all severity levels.

### Before (`master` branch)
- 5 critical vulns (SQL injection, hardcoded secrets, no auth on admin routes)
- 8 high severity (IDOR, XSS, mass assignment, SSRF, no JWT expiry)
- 7 medium (open CORS, stack trace leaks, no rate limiting)
- Zero tests
- **Vibe Score: F**

### After (`vibecheck-fixed` branch)
- 39 vulnerabilities fixed across 2 passes
- 50 tests generated and passing (auth, authorization, validation, core, second-pass)
- bcrypt password hashing, parameterized queries, ownership checks
- Secrets moved to .env (no fallback), security headers, rate limiting, input validation
- Profile access control, admin input validation, review length limits
- **Vibe Score: B+**

## Architecture

```
vibe-check/
├── .claude-plugin/
│   ├── plugin.json           # Plugin manifest
│   └── hooks/
│       └── pre-edit.sh       # Guardian: blocks hardcoded secrets
├── commands/
│   └── vibecheck.md          # /vibecheck slash command
├── agents/
│   ├── security-auditor.md   # OWASP Top 10 scanner
│   ├── auth-checker.md       # Authorization logic auditor
│   ├── secret-hunter.md      # Credential detector
│   └── test-generator.md     # Test scaffolding generator
├── skills/
│   └── vibecheck/SKILL.md    # Auto-activation triggers
├── templates/
│   └── report.html           # HTML report card template
└── demo-app/                 # VibeShop (20 planted vulns)
```

### Agents

Each agent runs as a parallel subagent via Claude Code's Task tool:

| Agent | Checks | Findings Format |
|-------|--------|-----------------|
| Security Auditor | SQLi, XSS, SSRF, command injection, path traversal, deserialization, prototype pollution, CSRF | JSON with severity, file, line, fix description |
| Auth Checker | Missing auth middleware, IDOR, privilege escalation, mass assignment, negative values, JWT issues | JSON with route mapping |
| Secret Hunter | API keys (AWS, Stripe, OpenAI), DB passwords, JWT secrets, private keys, OAuth secrets | JSON with redacted values |
| Test Generator | Auth flows, security fixes, CRUD operations, input validation, edge cases | Test files written to disk |

### Guardian Hooks

Pre-edit hook that blocks Claude from writing hardcoded secrets into code. Catches AWS keys, Stripe secrets, database passwords, and private keys before they hit the file.

### Scoring

| Category | Weight | Grading |
|----------|--------|---------|
| Security | 30% | A=0 issues, B=1-2 low, C=3-5 or 1 high, D=1-2 critical, F=3+ critical |
| Auth | 25% | Same rubric |
| Secrets | 15% | F if any hardcoded secret found |
| Tests | 15% | Based on coverage of critical paths |
| Performance | 10% | N+1 queries, missing indexes |
| Accessibility | 5% | WCAG basics |

## Supported Stacks

| Stack | Coverage |
|-------|----------|
| Express / Node.js | Full (all agents + framework-specific patterns) |
| Next.js / React | Full |
| Python / FastAPI | Full |
| Generic | Basic scan (secrets, obvious injection, missing tests) |

## Install

```bash
# Clone the plugin into your project
git clone https://github.com/yonkoo11/vibe-check.git
cp -r vibe-check/.claude-plugin your-project/
cp -r vibe-check/commands your-project/.claude-plugin/
cp -r vibe-check/agents your-project/.claude-plugin/

# Then in Claude Code:
/vibecheck --fix
```

## Why This Exists

Every vibe-coded app ships with the same bugs: hardcoded Stripe keys, SQL injection in search, admin routes without auth, zero tests. Developers pay $5-15K to have humans clean this up manually.

Vibe Check automates 80% of that cleanup in seconds, inside the tool people are already using to vibe code. The remaining 20% (architecture, business logic) benefits from the report.

---

Built for the [Built with Opus 4.6 Hackathon](https://cerebralvalley.ai/e/claude-code-hackathon) (Feb 10-16, 2026).
