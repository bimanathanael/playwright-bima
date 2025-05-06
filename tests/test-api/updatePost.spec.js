const { test, expect, request } = require('@playwright/test');
const { UpdatePostService } = require('../../services/updatePostService');
const { GetPostByIdService } = require('../../services/getPostByIdService');

test.describe('PUT/PATCH /posts/:id', () => {
  let apiContext;
  let service;
  let serviceGet;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    service = new UpdatePostService(apiContext);
    serviceGet = new GetPostByIdService(apiContext);

  });

  test('should return 200 and success for fully update post using PUT', async () => {
    const res = await service.putPost(1, { id: 1, title: 'updated', body: 'updated', userId: 1 });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('updated');
    expect(body.body).toBe('updated');
    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
  });

  test('should return 200 and success partially update post using PATCH', async () => {
    // get by id action first to assert soon unchanged data
    const resGet = await serviceGet.getPostById(1);
    expect(resGet.status()).toBe(200);
    const bodyGet = await resGet.json();
    
    // patch action
    const res = await service.patchPost(1, { title: 'patched' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('patched');

    // other than title, still same data value
    expect(body.body).toBe(bodyGet.body);
    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
  });

  test('should return 200 while send only userId without title/body', async () => {
    const res = await service.putPost(1, { userId: 909 });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.userId).toBe(909);
    expect(body.id).toBe(1);
  });

//   unstable return api status code, sometimes 404 sometimes 500
  test('should return 500/404 update with non-existing ID', async () => {
    const res = await service.putPost(9999, { title: 'x', body: 'y', userId: 1 });
    expect([404, 500]).toContain(res.status()); // 
  });
});