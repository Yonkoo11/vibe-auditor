const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createApp = require('../app');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET must be set in environment for tests');

function createTestDb() {
  const db = new Database(':memory:');
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  return db;
}

function seedTestData(db) {
  const password = bcrypt.hashSync('password123', 10);

  // Create regular user
  db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)').run(
    'testuser', 'test@example.com', password, 'user'
  );

  // Create admin user
  db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)').run(
    'admin', 'admin@example.com', password, 'admin'
  );

  // Create second regular user (for IDOR tests)
  db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)').run(
    'otheruser', 'other@example.com', password, 'user'
  );

  // Create products
  db.prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)').run(
    'Test Widget', 'A test product', 29.99, 100
  );
  db.prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)').run(
    'Another Widget', 'Another test product', 49.99, 50
  );
}

function getToken(userId, username, role) {
  return jwt.sign({ id: userId, username, role }, JWT_SECRET, { expiresIn: '24h' });
}

function getExpiredToken(userId, username, role) {
  return jwt.sign({ id: userId, username, role }, JWT_SECRET, { expiresIn: '0s' });
}

function setupTest() {
  const db = createTestDb();
  seedTestData(db);
  const app = createApp(db);
  return { app, db };
}

module.exports = { createTestDb, seedTestData, getToken, getExpiredToken, setupTest, JWT_SECRET };
