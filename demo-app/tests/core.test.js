const request = require('supertest');
const { setupTest, getToken } = require('./setup');

let app, db;

beforeEach(() => {
  const ctx = setupTest();
  app = ctx.app;
  db = ctx.db;
});

describe('GET /api/products', () => {
  it('returns product list', async () => {
    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });
});

describe('GET /api/products/:id', () => {
  it('returns product with reviews', async () => {
    // Add a review first
    const token = getToken(1, 'testuser', 'user');
    await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 4, comment: 'Great product' });

    const res = await request(app).get('/api/products/1');

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Widget');
    expect(res.body.reviews).toBeDefined();
    expect(res.body.reviews.length).toBe(1);
    expect(res.body.reviews[0].rating).toBe(4);
  });

  it('returns 404 for nonexistent product', async () => {
    const res = await request(app).get('/api/products/9999');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Product not found');
  });
});

describe('POST /api/orders', () => {
  it('authenticated user can create an order', async () => {
    const token = getToken(1, 'testuser', 'user');
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ product_id: 1, quantity: 2 }] });

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.total).toBe(59.98); // 29.99 * 2
    expect(res.body.status).toBe('pending');
  });
});

describe('POST /api/products/:id/reviews', () => {
  it('authenticated user can post a review', async () => {
    const token = getToken(1, 'testuser', 'user');
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 5, comment: 'Excellent!' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Review added');

    // Verify review was stored
    const product = await request(app).get('/api/products/1');
    expect(product.body.reviews.length).toBe(1);
    expect(product.body.reviews[0].comment).toBe('Excellent!');
  });
});
