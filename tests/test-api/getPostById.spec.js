const { test, expect, request } = require('@playwright/test');
const { GetPostByIdService } = require('../../services/getPostByIdService');

test.describe('GET /posts/:id', () => {
  let apiContext;
  let service;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    service = new GetPostByIdService(apiContext);
  });

  test('should return 200 and valid post for existing ID', async () => {
    const res = await service.getPostById(1);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
  });

//   unstable return api status code, sometimes 404 sometimes 500 
  test('should return 500/404 with empty object for non-existing ID', async () => {
    const res = await service.getPostById(9999);
    expect([404, 500]).toContain(res.status()); // 
    const body = await res.json();
    expect(body).toEqual({});
  });

  test('should error 404 with handle invalid ID', async () => {
    const res = await service.getPostById('invalid');
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body).toEqual({});
  });

  test('should return 404 for ID 0', async () => {
    const res = await service.getPostById(0);
    expect(res.status()).toBe(404);
    const body = await res.json();
  });

  test('should return 404 for special character ID with empty object', async () => {
    const res = await service.getPostById('!');
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body).toEqual({});
  });

  test('should return 404 for boolean ID with empty object', async () => {
    const res = await service.getPostById('false');
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body).toEqual({});
  });
});
