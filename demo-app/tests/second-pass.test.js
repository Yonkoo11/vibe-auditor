const request = require('supertest');
const { setupTest, getToken } = require('./setup');

let app, db;

beforeEach(() => {
  const ctx = setupTest();
  app = ctx.app;
  db = ctx.db;
});

describe('Admin product creation validation', () => {
  const adminToken = () => getToken(2, 'admin', 'admin');

  it('rejects empty name', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: '', price: 10, stock: 5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it('rejects missing name', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ price: 10, stock: 5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it('rejects negative price', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'Bad Product', price: -5, stock: 10 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/price/i);
  });

  it('rejects zero price', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'Free Product', price: 0, stock: 10 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/price/i);
  });

  it('rejects negative stock', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'Widget', price: 10, stock: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/stock/i);
  });

  it('accepts valid product', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'Good Widget', price: 19.99, stock: 50 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Good Widget');
  });
});

describe('Admin role change validation', () => {
  const adminToken = () => getToken(2, 'admin', 'admin');

  it('rejects invalid role value', async () => {
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ role: 'superadmin' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/role/i);
  });

  it('rejects empty role', async () => {
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ role: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/role/i);
  });

  it('accepts valid role "user"', async () => {
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ role: 'user' });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/updated/i);
  });

  it('accepts valid role "admin"', async () => {
    const res = await request(app)
      .put('/api/admin/users/1/role')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ role: 'admin' });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/updated/i);
  });
});

describe('User profile access restriction', () => {
  it('user cannot view another user\'s profile', async () => {
    const token = getToken(3, 'otheruser', 'user');
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('user can view their own profile', async () => {
    const token = getToken(1, 'testuser', 'user');
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('testuser');
  });

  it('admin can view any user profile', async () => {
    const token = getToken(2, 'admin', 'admin');
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('testuser');
  });
});

describe('Review comment validation', () => {
  const token = () => getToken(1, 'testuser', 'user');

  it('rejects empty comment', async () => {
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 4, comment: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/comment/i);
  });

  it('rejects missing comment', async () => {
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 4 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/comment/i);
  });

  it('rejects comment over 1000 characters', async () => {
    const longComment = 'a'.repeat(1001);
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 4, comment: longComment });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/1000/);
  });

  it('accepts comment at exactly 1000 characters', async () => {
    const exactComment = 'a'.repeat(1000);
    const res = await request(app)
      .post('/api/products/1/reviews')
      .set('Authorization', `Bearer ${token()}`)
      .send({ rating: 4, comment: exactComment });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/added/i);
  });
});
