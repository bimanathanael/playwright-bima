// tests/upload.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { UploadPage } = require('../pages/UploadPage');

function file(fileName) {
  return path.resolve(__dirname, '../test-files/', fileName);
}

test.describe('Upload Page Tests', () => {
  test('should upload valid file and assert name', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    await expect(page).toHaveTitle(/The Internet/);
    
    await uploadPage.uploadFile(file('example.txt'));
    expect(await uploadPage.getHeaderText()).toBe('File Uploaded!');
    expect(await uploadPage.getUploadedFileName()).toBe('example.txt');
  });

  test('should show error when upload with no file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    await uploadPage.submitButton.click();
    expect(await uploadPage.getHeaderText()).toBe('Internal Server Error');
  });

  test('should upload special character filename', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    await uploadPage.uploadFile(file('special@#$.txt'));
    expect(await uploadPage.getUploadedFileName()).toBe('special@#$.txt');
  });

  test('should allow uploading empty file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    await uploadPage.uploadFile(file('empty.txt'));
    expect(await uploadPage.getUploadedFileName()).toBe('empty.txt');
  });

  test('should confirm file input is visible and enabled', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    expect(await uploadPage.isFileInputVisible()).toBeTruthy();
    expect(await uploadPage.isFileInputEnabled()).toBeTruthy();
  });

});
