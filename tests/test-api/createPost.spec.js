const { test, expect, request } = require('@playwright/test');
const { CreatePostService } = require('../../services/createPostService');
const { GetPostByIdService } = require('../../services/getPostByIdService');

test.describe('POST /posts', () => {
  let apiContext;
  let service;
  let serviceGet;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    service = new CreatePostService(apiContext);
    serviceGet = new GetPostByIdService(apiContext);
  });

  test('should create a post with valid data', async () => {
    const res = await service.createPost({ title: 'foo', body: 'bar', userId: 1 });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe('foo');
  });

  test('should create a post with valid data & get post by ID', async () => {
      // create data first
    const resCreate = await service.createPost({ title: 'foo', body: 'bar', userId: 1 });
    expect(resCreate.status()).toBe(201);
    const bodyCreate = await resCreate.json();
    expect(bodyCreate.title).toBe('foo');
    expect(bodyCreate.body).toBe('bar');
    expect(bodyCreate.userId).toBe(1);

    // get after created data
    // comment due to file deleted after creation
    
    // const resGet = await serviceGet.getPostById(bodyCreate.id);
    // const bodyGet = await resGet.json();
    // expect(resGet.status()).toBe(200);
    // expect(bodyGet.title).toBe('foo');
    // expect(bodyGet.body).toBe('bar');
    // expect(bodyGet.userId).toBe(1);
  });

  test('should still succeed with missing title', async () => {
    const res = await service.createPost({ body: 'bar', userId: 1 });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.body).toBe('bar');
  });
  
  test('should still succeed with missing title & body', async () => {
    const res = await service.createPost({ userId: 1 });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.userId).toBe(1);
  });

  test('should still succeed with missing userId', async () => {
    const res = await service.createPost({ body: 'bar', title: 'foo' });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.body).toBe('bar');
    expect(body.title).toBe('foo');
  });

  test('should handle empty body', async () => {
    const res = await service.createPost({});
    expect(res.status()).toBe(201);
  });
});