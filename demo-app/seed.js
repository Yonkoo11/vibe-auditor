const db = require('./db');

// Clear existing data
db.exec('DELETE FROM reviews');
db.exec('DELETE FROM order_items');
db.exec('DELETE FROM orders');
db.exec('DELETE FROM products');
db.exec('DELETE FROM users');

// Seed users
const insertUser = db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)');
insertUser.run('admin', 'admin@vibeshop.com', 'admin123', 'admin');
insertUser.run('alice', 'alice@example.com', 'password123', 'user');
insertUser.run('bob', 'bob@example.com', 'bobpass', 'user');

// Seed products
const insertProduct = db.prepare('INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)');
insertProduct.run('Wireless Headphones', 'Noise-canceling over-ear headphones with 30hr battery', 79.99, 50, 'https://picsum.photos/seed/headphones/400/400');
insertProduct.run('Mechanical Keyboard', 'Cherry MX Blue switches, RGB backlight, full-size', 129.99, 30, 'https://picsum.photos/seed/keyboard/400/400');
insertProduct.run('USB-C Hub', '7-in-1 hub with HDMI, USB 3.0, SD card reader', 34.99, 100, 'https://picsum.photos/seed/usbhub/400/400');
insertProduct.run('Laptop Stand', 'Adjustable aluminum stand for 13-17 inch laptops', 49.99, 75, 'https://picsum.photos/seed/stand/400/400');
insertProduct.run('Webcam HD', '1080p webcam with built-in mic and privacy cover', 59.99, 40, 'https://picsum.photos/seed/webcam/400/400');
insertProduct.run('Mouse Pad XL', 'Extended desk pad, 900x400mm, anti-slip rubber base', 19.99, 200, 'https://picsum.photos/seed/mousepad/400/400');

// Seed some reviews
const insertReview = db.prepare('INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)');
insertReview.run(1, 2, 5, 'Amazing sound quality! Best headphones I have ever owned.');
insertReview.run(1, 3, 4, 'Great headphones but a bit heavy for long sessions.');
insertReview.run(2, 2, 5, 'The clicky keys are so satisfying. Build quality is top notch.');
insertReview.run(3, 3, 3, 'Works fine but gets warm after a while.');

// Seed an order
const order = db.prepare('INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)').run(2, 209.98, 'completed');
const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
insertItem.run(order.lastInsertRowid, 1, 1, 79.99);
insertItem.run(order.lastInsertRowid, 2, 1, 129.99);

console.log('Database seeded successfully!');
console.log('Users: admin/admin123, alice/password123, bob/bobpass');
