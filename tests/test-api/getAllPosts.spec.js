const { test, expect, request } = require('@playwright/test');
const { GetAllPostsService } = require('../../services/getAllPostsService');

test.describe('GET /posts', () => {
  let apiContext;
  let service;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    service = new GetAllPostsService(apiContext);
  });

  test('should return 200 and array of posts', async () => {
    const res = await service.getAllPosts();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });
});