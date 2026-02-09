# Vibe Check

**You vibed. Now ship.**

A Claude Code plugin that audits and auto-fixes vibe-coded projects. One command to find security vulnerabilities, missing auth, hardcoded secrets, and missing tests — then fix them all while preserving your code's style.

## Quick Start

```bash
# Install: copy this plugin to your project
cp -r vibe-check/.claude-plugin your-project/
cp -r vibe-check/commands your-project/.claude-plugin/
cp -r vibe-check/agents your-project/.claude-plugin/

# Audit your project (read-only)
/vibecheck

# Audit and auto-fix
/vibecheck --fix
```

## What it checks

| Category | Weight | Examples |
|----------|--------|---------|
| Security | 30% | SQL injection, XSS, SSRF, command injection |
| Auth | 25% | Missing auth middleware, broken access control, IDOR |
| Secrets | 15% | Hardcoded API keys, leaked database passwords |
| Tests | 15% | Missing test coverage on critical paths |
| Performance | 10% | N+1 queries, missing indexes |
| Accessibility | 5% | Missing labels, keyboard nav |

## The Vibe Score

Every scan produces a letter grade (A-F) per category and an overall Vibe Score.

```
═══════════════════════════════════════════
  VIBE SCORE: F → B+  (14 issues fixed)
═══════════════════════════════════════════
```

## How it works

1. Detects your framework/stack
2. Runs parallel subagents (security, auth, secrets, tests)
3. Reports findings with severity ratings
4. Optionally auto-fixes everything with `--fix`
5. Verifies your app still works after each fix
6. Generates a shareable HTML report card

## Supported stacks

- Next.js / React
- Express / Node.js
- Python / FastAPI
- Generic (basic scanning for any project)

## Design philosophy

Vibe Check is vibe coding's ally, not its critic. It hardens your code without rewriting it. Your variable names, file structure, and coding style stay exactly as they are. We fix the SQL injection, not your naming conventions.

---

Built for the [Built with Opus 4.6 hackathon](https://cerebralvalley.ai/e/claude-code-hackathon) (Feb 2026).
