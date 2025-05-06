const { test, expect, request } = require('@playwright/test');
const { DeletePostService } = require('../../services/deletePostService');

test.describe('DELETE /posts/:id', () => {
  let apiContext;
  let service;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    service = new DeletePostService(apiContext);
  });

  test('should delete post with valid ID', async () => {
    const res = await service.deletePost(1);
    expect(res.status()).toBe(200);
  });

  test('should return 200 even if ID is non-existent', async () => {
    const res = await service.deletePost(9999);
    expect(res.status()).toBe(200);
  });

  test('should handle invalid ID format', async () => {
    const res = await service.deletePost('abc');
    expect(res.status()).toBe(200);
    const body = await res.json();
  });

  test('should handle large ID format', async () => {
    const res = await service.deletePost(999999999999999999999999999999999999999999);
    expect(res.status()).toBe(200);
  });
});
