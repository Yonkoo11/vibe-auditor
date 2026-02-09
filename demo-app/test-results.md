# Test Results - VibeShop API

**Framework:** vitest v3.2.4 + supertest
**Run date:** 2026-02-09
**Result:** 33/33 passed (4 test files)

## Summary

| File | Tests | Status |
|------|-------|--------|
| tests/auth.test.js | 10 | PASS |
| tests/authorization.test.js | 9 | PASS |
| tests/validation.test.js | 9 | PASS |
| tests/core.test.js | 5 | PASS |

## Test Details

### auth.test.js (10 tests) - P0: Auth and Security
- Login with valid credentials returns token
- Login with wrong password returns 401
- Login with nonexistent user returns 401
- Signup rejects password shorter than 8 characters
- Signup rejects empty password
- Signup creates user with valid data
- Signup rejects duplicate username
- Expired JWT token is rejected
- Malformed JWT token is rejected
- Rate limiter blocks after 10 login attempts (429)

### authorization.test.js (9 tests) - P0: Authorization / IDOR
- Admin route returns 401 without token
- Admin route returns 403 for non-admin user
- Admin route allows admin access
- User cannot view another user's order (403)
- User cannot delete another user's order (403)
- User cannot view another user's order history (403)
- Owner can view their own order
- User cannot update another user's profile (403)
- Profile update cannot set role (mass assignment blocked)

### validation.test.js (9 tests) - P1: Input Validation
- Order with negative quantity is rejected
- Order with zero quantity is rejected
- Order without auth is rejected (401)
- Order with non-integer quantity is rejected
- Review with rating > 5 is rejected
- Review with rating < 1 is rejected
- Review with non-integer rating is rejected
- Search returns results for normal query
- Search returns empty array for no matches

### core.test.js (5 tests) - P1: Core Functionality
- GET /api/products returns product list
- GET /api/products/:id returns product with reviews
- GET /api/products/:id returns 404 for nonexistent product
- Authenticated user can create an order (with correct total)
- Authenticated user can post a review

## Architecture Changes

To enable testing with supertest (which needs the Express app without calling `.listen()`), `server.js` was split into:

- **app.js** - `createApp(db)` factory function that builds and returns the Express app
- **server.js** - imports app.js + db.js, calls `app.listen()`

Tests use in-memory SQLite databases (`:memory:`) so they run fast and don't touch the real `shop.db`.

## Security Findings from Tests

All security checks PASS, meaning the app correctly:
1. Validates JWT tokens and rejects expired/malformed ones
2. Enforces ownership checks on orders and profiles (no IDOR)
3. Blocks non-admin users from admin routes
4. Rate-limits auth endpoints
5. Validates input (quantities, ratings, password length)
6. Ignores `role` field in profile updates (mass assignment protection)
