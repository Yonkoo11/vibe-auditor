require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

function createApp(db) {
  const app = express();

  app.use(helmet());

  app.use(cors({ origin: 'http://localhost:3000' }));

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  const JWT_SECRET = process.env.JWT_SECRET || 'fallback-dev-secret';

  // Helper to create JWT
  function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
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

  // Admin middleware
  function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
  }

  // Rate limiting for auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many attempts, please try again later' }
  });

  // ==================== AUTH ROUTES ====================

  app.post('/api/auth/signup', authLimiter, (req, res) => {
    const { username, email, password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db.prepare(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
      ).run(username, email, hashedPassword);
      const user = db.prepare('SELECT id, username, email, role FROM users WHERE id = ?').get(result.lastInsertRowid);
      console.log('New user registered:', user.username);
      const token = generateToken(user);
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      res.status(400).json({ error: 'Username or email already exists' });
    }
  });

  app.post('/api/auth/login', authLimiter, (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
    console.log('User logged in:', user.username);
    const token = generateToken(user);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  });

  // ==================== PRODUCT ROUTES ====================

  app.get('/api/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  });

  app.get('/api/products/search', (req, res) => {
    const { q } = req.query;
    const products = db.prepare('SELECT * FROM products WHERE name LIKE ? OR description LIKE ?').all(`%${q}%`, `%${q}%`);
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

  app.post('/api/orders', authenticate, (req, res) => {
    const { items } = req.body;
    const user_id = req.user.id;
    let total = 0;
    for (const item of items) {
      if (!item.quantity || item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }
      const product = db.prepare('SELECT price FROM products WHERE id = ?').get(item.product_id);
      if (!product) return res.status(400).json({ error: `Product ${item.product_id} not found` });
      if (product.price < 0) return res.status(400).json({ error: 'Invalid product price' });
      item.price = product.price;
      total += item.price * item.quantity;
    }

    const order = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)').run(user_id, total);

    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    for (const item of items) {
      insertItem.run(order.lastInsertRowid, item.product_id, item.quantity, item.price);
    }

    res.json({ id: order.lastInsertRowid, total, status: 'pending' });
  });

  app.get('/api/orders/:id', authenticate, (req, res) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.user_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const items = db.prepare('SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?').all(req.params.id);
    res.json({ ...order, items });
  });

  app.delete('/api/orders/:id', authenticate, (req, res) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.user_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    db.prepare('DELETE FROM order_items WHERE order_id = ?').run(req.params.id);
    db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
    res.json({ message: 'Order deleted' });
  });

  app.get('/api/users/:userId/orders', authenticate, (req, res) => {
    if (parseInt(req.params.userId) !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const orders = db.prepare('SELECT * FROM orders WHERE user_id = ?').all(req.params.userId);
    res.json(orders);
  });

  // ==================== REVIEW ROUTES ====================

  app.post('/api/products/:id/reviews', authenticate, (req, res) => {
    const { rating, comment } = req.body;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be an integer between 1 and 5' });
    }
    db.prepare('INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)').run(
      req.params.id, req.user.id, rating, comment
    );
    res.json({ message: 'Review added' });
  });

  // ==================== ADMIN ROUTES ====================

  app.get('/api/admin/users', authenticate, requireAdmin, (req, res) => {
    const users = db.prepare('SELECT id, username, email, role, created_at FROM users').all();
    res.json(users);
  });

  app.post('/api/admin/products', authenticate, requireAdmin, (req, res) => {
    const { name, description, price, stock, image_url } = req.body;
    const result = db.prepare(
      'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)'
    ).run(name, description, price, stock, image_url);
    res.json({ id: result.lastInsertRowid, name, price });
  });

  app.delete('/api/admin/products/:id', authenticate, requireAdmin, (req, res) => {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deleted' });
  });

  app.put('/api/admin/users/:id/role', authenticate, requireAdmin, (req, res) => {
    const { role } = req.body;
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id);
    res.json({ message: 'Role updated' });
  });

  // ==================== USER PROFILE ====================

  app.get('/api/users/:id', authenticate, (req, res) => {
    const user = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });

  app.put('/api/users/:id', authenticate, (req, res) => {
    if (req.user.id !== parseInt(req.params.id)) return res.status(403).json({ error: 'Forbidden' });
    const { username, email, password } = req.body;
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.prepare('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?').run(
        username, email, hashedPassword, req.params.id
      );
    } else {
      db.prepare('UPDATE users SET username = ?, email = ? WHERE id = ?').run(
        username, email, req.params.id
      );
    }
    res.json({ message: 'Profile updated' });
  });

  // ==================== MISC ====================

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = createApp;
