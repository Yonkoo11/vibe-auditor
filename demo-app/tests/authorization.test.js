const request = require('supertest');
const { setupTest, getToken } = require('./setup');

let app, db;

beforeEach(() => {
  const ctx = setupTest();
  app = ctx.app;
  db = ctx.db;
});

describe('Admin route protection', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/api/admin/users');
    expect(res.status).toBe(401);
  });

  it('returns 403 for non-admin user', async () => {
    const token = getToken(1, 'testuser', 'user');
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('allows admin access', async () => {
    const token = getToken(2, 'admin', 'admin');
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('IDOR: Order access', () => {
  let userToken, otherUserToken, orderId;

  beforeEach(async () => {
    userToken = getToken(1, 'testuser', 'user');
    otherUserToken = getToken(3, 'otheruser', 'user');

    // Create an order for user 1
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ items: [{ product_id: 1, quantity: 1 }] });

    orderId = res.body.id;
  });

  it('user cannot view another user\'s order', async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${otherUserToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('user cannot delete another user\'s order', async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${otherUserToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('user cannot view another user\'s order history', async () => {
    const res = await request(app)
      .get('/api/users/1/orders')
      .set('Authorization', `Bearer ${otherUserToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('owner can view their own order', async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(orderId);
  });
});

describe('IDOR: Profile update', () => {
  it('user cannot update another user\'s profile', async () => {
    const token = getToken(3, 'otheruser', 'user');
    const res = await request(app)
      .put('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'hacked', email: 'hacked@example.com' });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('profile update cannot set role (mass assignment)', async () => {
    const token = getToken(1, 'testuser', 'user');
    const res = await request(app)
      .put('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'testuser', email: 'test@example.com', role: 'admin' });

    expect(res.status).toBe(200);

    // Verify role was NOT changed
    const user = db.prepare('SELECT role FROM users WHERE id = 1').get();
    expect(user.role).toBe('user');
  });
});
