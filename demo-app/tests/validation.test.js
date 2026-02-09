const request = require('supertest');
const { setupTest, getToken } = require('./setup');

let app, db;

beforeEach(() => {
  const ctx = setupTest();
  app = ctx.app;
  db = ctx.db;
});

describe('Order validation', () => {
  const token = () => getToken(1, 'testuser', 'user');

  it('rejects order with negative quantity', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token()}`)
      .send({ items: [{ product_id: 1, quantity: -1 }] });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid quantity/i);
  });

  it('rejects order with zero quantity', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token()}`)
      .send({ items: [{ product_id: 1, quantity: 0 }] });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid quantity/i);
  });

  it('rejects order without auth', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ product_id: 1, quantity: 1 }] });

    expect(res.status).toBe(401);
  });

  it('rejects order with non-integer quantity', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token()}`)
      .send({ items: [{ product_id: 1, quantity: 1.5 }] });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid quantity/i);
  });
});

describe('Review validation', () => {
  const token = () => getToken(1, 'testuser', 'user');

  it('rejects rating greater than 5', async () => {
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 6, comment: 'Too good' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/between 1 and 5/);
  });

  it('rejects rating less than 1', async () => {
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 0, comment: 'Terrible' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/between 1 and 5/);
  });

  it('rejects non-integer rating', async () => {
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 3.5, comment: 'Decent' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/between 1 and 5/);
  });
});

describe('Search', () => {
  it('returns results for a normal query', async () => {
    const res = await request(app)
      .get('/api/products/search?q=Widget');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('returns empty array for no matches', async () => {
    const res = await request(app)
      .get('/api/products/search?q=nonexistentxyz');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
