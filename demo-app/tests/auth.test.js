const request = require('supertest');
const { setupTest, getToken, getExpiredToken } = require('./setup');

let app, db;

beforeEach(() => {
  const ctx = setupTest();
  app = ctx.app;
  db = ctx.db;
});

describe('POST /api/auth/login', () => {
  it('returns token with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe('testuser');
  });

  it('returns 401 with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('returns 401 for nonexistent user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'password123' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});

describe('POST /api/auth/signup', () => {
  it('rejects password shorter than 8 characters', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'newuser', email: 'new@example.com', password: 'short' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/at least 8 characters/);
  });

  it('rejects empty password', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'newuser', email: 'new@example.com', password: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/at least 8 characters/);
  });

  it('creates user with valid data', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'newuser', email: 'new@example.com', password: 'validpass123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe('newuser');
  });

  it('rejects duplicate username', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', email: 'unique@example.com', password: 'validpass123' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already exists/);
  });
});

describe('JWT token validation', () => {
  it('rejects expired token', async () => {
    const token = getExpiredToken(1, 'testuser', 'user');
    // Small delay to ensure token is expired
    await new Promise(resolve => setTimeout(resolve, 1100));

    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid token');
  });

  it('rejects malformed token', async () => {
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', 'Bearer not-a-real-token');

    expect(res.status).toBe(401);
  });
});

describe('Rate limiting', () => {
  it('blocks after 10 login attempts', { timeout: 30000 }, async () => {
    // Send 10 requests in parallel to exhaust the rate limit faster
    const attempts = Array.from({ length: 10 }, () =>
      request(app)
        .post('/api/auth/login')
        .send({ username: 'nobody', password: 'x' })
    );
    await Promise.all(attempts);

    // 11th request should be rate limited
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'x' });

    expect(res.status).toBe(429);
    expect(res.body.error).toMatch(/too many/i);
  });
});
