# VibeShop Security Fix Summary

All fixes applied to the demo-app to resolve the 53 findings from vibecheck.json.

## Files Modified
- `server.js` - Backend API (bulk of fixes)
- `public/index.html` - Frontend (XSS + order auth)
- `seed.js` - Password hashing for seed data
- `package.json` - New dependencies

## Files Created
- `.env` - Environment variables (JWT_SECRET, STRIPE_SECRET_KEY, PORT)
- `.env.example` - Template with placeholder values
- `.gitignore` - Excludes .env, node_modules/, shop.db files

## New Dependencies
- `dotenv` - Load .env file
- `bcryptjs` - Password hashing
- `helmet` - Security headers
- `express-rate-limit` - Brute-force protection on auth routes

---

## Fix Details

### 1. Secrets Management (SEC-002, SEC-003, SECRET-001, SECRET-002, SECRET-010, SECRET-011)
- Moved JWT_SECRET and STRIPE_SECRET_KEY to .env, loaded via `process.env`
- Created .gitignore so .env is never committed
- Created .env.example as a template for other developers

### 2. Sensitive Data Logging (SEC-019, SEC-020, SEC-021, SECRET-006, SECRET-008, SECRET-009)
- Removed password from all console.log statements in server.js
- Removed Stripe key logging on startup
- Removed credential logging from seed.js output

### 3. SQL Injection (SEC-001)
- Replaced template literal interpolation in `/api/products/search` with parameterized query
- Before: `` db.prepare(`SELECT * FROM products WHERE name LIKE '%${q}%'...`) ``
- After: `db.prepare('SELECT * FROM products WHERE name LIKE ? OR description LIKE ?').all(...)`

### 4. Password Storage (SEC-004, AUTH-013)
- Signup now hashes passwords with `bcrypt.hashSync(password, 10)` before INSERT
- Login fetches user by username only, then uses `bcrypt.compareSync()` to verify
- Seed script hashes all seed passwords with bcrypt

### 5. Admin Route Auth (SEC-005, AUTH-001 through AUTH-004)
- Created `requireAdmin` middleware that checks `req.user.role === 'admin'`
- Applied `authenticate` + `requireAdmin` to all four admin routes:
  - GET /api/admin/users
  - POST /api/admin/products
  - DELETE /api/admin/products/:id
  - PUT /api/admin/users/:id/role

### 6. Password Leaks in API Responses (SEC-006, SEC-014, AUTH-010, AUTH-021)
- GET /api/admin/users: Changed to `SELECT id, username, email, role, created_at`
- GET /api/users/:id: Same column restriction
- Signup SELECT after insert also excludes password

### 7. Order Auth (SEC-013, AUTH-005)
- Added `authenticate` middleware to POST /api/orders
- Server derives `user_id` from `req.user.id` instead of request body
- Server looks up product prices from DB instead of trusting client-supplied prices

### 8. IDOR Fixes (SEC-010, SEC-011, SEC-012, AUTH-007, AUTH-008)
- GET /api/orders/:id: Added `order.user_id !== req.user.id && req.user.role !== 'admin'` check
- DELETE /api/orders/:id: Same ownership check (fetch order first, verify, then delete)
- GET /api/users/:userId/orders: Added `parseInt(req.params.userId) !== req.user.id` check

### 9. Mass Assignment (SEC-007, AUTH-006, AUTH-022)
- PUT /api/users/:id: Removed `role` from destructured body
- Added ownership check: `req.user.id !== parseInt(req.params.id)` returns 403
- Password update is optional (only hashed and updated if provided)

### 10. SSRF (SEC-008)
- Removed the `/api/fetch-image` endpoint entirely

### 11. JWT Expiration (SEC-015, AUTH-011)
- Added `{ expiresIn: '24h' }` to `jwt.sign()` options

### 12. Security Headers (SEC-016)
- Added `helmet` middleware: `app.use(helmet())`

### 13. CORS (SEC-017)
- Changed from `cors()` (allow all) to `cors({ origin: 'http://localhost:3000' })`

### 14. Error Handler (SEC-018)
- Removed `stack` from error response
- Returns generic `{ error: 'Internal server error' }` to clients

### 15. Input Validation (AUTH-014, AUTH-019)
- Reviews: Rating validated as integer between 1-5
- Orders: Quantity must be positive integer, prices looked up server-side
- Signup: Password minimum 8 characters

### 16. Rate Limiting (SEC-022, AUTH-016, AUTH-017)
- Added `express-rate-limit` on `/api/auth/signup` and `/api/auth/login`
- 10 requests per 15-minute window per IP

### 17. XSS (SEC-009, SEC-023)
- Added `escapeHtml()` helper in index.html
- All user-generated content (product names, descriptions, image URLs, review comments, usernames) escaped before innerHTML insertion

### 18. Frontend Order Auth (related to SEC-013)
- `addToOrder()` now requires login and sends Authorization header
- No longer sends `user_id` from client
- Shows login prompt if not authenticated

---

## Verification Results

| Test | Expected | Result |
|------|----------|--------|
| GET /api/products | 6 products | Pass |
| GET /api/admin/users | 401 Unauthorized | Pass |
| GET /api/products/search?q=keyboard | 1 result, no injection | Pass |
| POST /api/orders (no auth) | 401 Unauthorized | Pass |
| POST /api/auth/login (bcrypt) | Token with exp claim | Pass |
| GET /api/fetch-image | 404 Not Found | Pass |
