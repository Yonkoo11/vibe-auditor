const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

// [VULN: Missing security headers - no helmet, no CSP, no HSTS]

// [VULN: Wide-open CORS]
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// [VULN: Hardcoded JWT secret]
const JWT_SECRET = 'supersecretkey123';

// [VULN: Hardcoded Stripe key]
const STRIPE_SECRET_KEY = 'FAKE_STRIPE_KEY_FOR_DEMO';

// Helper to create JWT
function generateToken(user) {
  // [VULN: No token expiration]
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
}

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ==================== AUTH ROUTES ====================

// [VULN: No rate limiting on login]
app.post('/api/auth/signup', (req, res) => {
  const { username, email, password } = req.body;
  // [VULN: No password strength validation]
  // [VULN: Storing password in plaintext - no bcrypt]
  try {
    const result = db.prepare(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    ).run(username, email, password);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    // [VULN: Console.log with sensitive data]
    console.log('New user registered:', user.username, 'password:', user.password);
    const token = generateToken(user);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: 'Username or email already exists' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  console.log('User logged in:', user.username, 'with password:', user.password);
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

// ==================== PRODUCT ROUTES ====================

app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

// [VULN: SQL injection in search]
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  const products = db.prepare(`SELECT * FROM products WHERE name LIKE '%${q}%' OR description LIKE '%${q}%'`).all();
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  // Get reviews for this product
  const reviews = db.prepare('SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ?').all(req.params.id);
  res.json({ ...product, reviews });
});

// ==================== ORDER ROUTES ====================

// [VULN: No auth required to create orders]
app.post('/api/orders', (req, res) => {
  const { user_id, items } = req.body;
  // [VULN: No validation - negative quantities and prices accepted]
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }

  const order = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)').run(user_id, total);

  const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
  for (const item of items) {
    insertItem.run(order.lastInsertRowid, item.product_id, item.quantity, item.price);
  }

  res.json({ id: order.lastInsertRowid, total, status: 'pending' });
});

// [VULN: IDOR - any user can view any order, no ownership check]
app.get('/api/orders/:id', authenticate, (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const items = db.prepare('SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?').all(req.params.id);
  res.json({ ...order, items });
});

// [VULN: IDOR - any authenticated user can delete any order]
app.delete('/api/orders/:id', authenticate, (req, res) => {
  db.prepare('DELETE FROM order_items WHERE order_id = ?').run(req.params.id);
  db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
  res.json({ message: 'Order deleted' });
});

app.get('/api/users/:userId/orders', authenticate, (req, res) => {
  // [VULN: No check that req.user.id matches userId - can view other users' orders]
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ?').all(req.params.userId);
  res.json(orders);
});

// ==================== REVIEW ROUTES ====================

app.post('/api/products/:id/reviews', authenticate, (req, res) => {
  const { rating, comment } = req.body;
  // [VULN: No input validation on rating - could be 999 or -1]
  // [VULN: XSS - comment stored and rendered without sanitization]
  db.prepare('INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)').run(
    req.params.id, req.user.id, rating, comment
  );
  res.json({ message: 'Review added' });
});

// ==================== ADMIN ROUTES ====================

// [VULN: No auth or role check on admin routes]
app.get('/api/admin/users', (req, res) => {
  // [VULN: Returns full user objects including passwords]
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

app.post('/api/admin/products', (req, res) => {
  const { name, description, price, stock, image_url } = req.body;
  // [VULN: No auth required to create products]
  const result = db.prepare(
    'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)'
  ).run(name, description, price, stock, image_url);
  res.json({ id: result.lastInsertRowid, name, price });
});

app.delete('/api/admin/products/:id', (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ message: 'Product deleted' });
});

// [VULN: Admin can change any user's role - no auth check]
app.put('/api/admin/users/:id/role', (req, res) => {
  const { role } = req.body;
  db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id);
  res.json({ message: 'Role updated' });
});

// ==================== USER PROFILE ====================

app.get('/api/users/:id', authenticate, (req, res) => {
  // [VULN: Returns password in response]
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// [VULN: Mass assignment - user can set their own role to admin]
app.put('/api/users/:id', authenticate, (req, res) => {
  const { username, email, password, role } = req.body;
  db.prepare('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?').run(
    username, email, password, role, req.params.id
  );
  res.json({ message: 'Profile updated' });
});

// ==================== MISC ====================

// [VULN: SSRF - fetches arbitrary URL]
app.get('/api/fetch-image', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    res.set('Content-Type', response.headers.get('content-type'));
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch image' });
  }
});

// [VULN: Stack trace leaked in error handler]
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message, stack: err.stack });
});

app.listen(PORT, () => {
  console.log(`VibeShop API running on http://localhost:${PORT}`);
  console.log(`Stripe key configured: ${STRIPE_SECRET_KEY}`);
});
