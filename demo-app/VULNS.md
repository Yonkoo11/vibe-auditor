# Planted Vulnerabilities — Demo App Cheat Sheet

This app has 20 deliberately planted vulnerabilities across all categories. Vibe Auditor should find and fix most of them.

## CRITICAL (5)

| # | Vuln | File | Line | Category |
|---|------|------|------|----------|
| 1 | SQL injection in product search | server.js | ~74 | Security |
| 2 | Hardcoded JWT secret | server.js | ~15 | Secrets |
| 3 | Hardcoded Stripe secret key | server.js | ~18 | Secrets |
| 4 | No auth on admin routes (users, products CRUD, role change) | server.js | ~116-136 | Auth |
| 5 | Plaintext password storage (no bcrypt) | server.js | ~47 | Security |

## HIGH (8)

| # | Vuln | File | Line | Category |
|---|------|------|------|----------|
| 6 | IDOR — any user can view/delete any order | server.js | ~93-100 | Auth |
| 7 | Negative quantity/price accepted in orders | server.js | ~83 | Auth |
| 8 | XSS — review comments rendered as raw HTML | index.html | ~174 | Security |
| 9 | Mass assignment — user can set own role to admin | server.js | ~143 | Auth |
| 10 | SSRF — arbitrary URL fetch via /api/fetch-image | server.js | ~151 | Security |
| 11 | JWT tokens have no expiration | server.js | ~22 | Auth |
| 12 | No auth on order creation | server.js | ~80 | Auth |
| 13 | User profile returns password in response | server.js | ~138 | Security |

## MEDIUM (7)

| # | Vuln | File | Line | Category |
|---|------|------|------|----------|
| 14 | Console.log leaks passwords | server.js | ~52,59 | Secrets |
| 15 | Wide-open CORS (no origin restriction) | server.js | ~11 | Security |
| 16 | Missing security headers (no helmet) | server.js | ~9 | Security |
| 17 | Stack trace leaked in error handler | server.js | ~158 | Security |
| 18 | No rate limiting on login | server.js | ~42 | Auth |
| 19 | No password strength validation | server.js | ~46 | Auth |
| 20 | No .gitignore file | root | — | Secrets |

## Expected Vibe Score: F

Every category should score D or F on first scan. After `/vibecheck --fix`, the goal is B+ or higher.
