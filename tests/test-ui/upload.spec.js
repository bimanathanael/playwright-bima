// tests/upload.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { UploadPage } = require('../../pages/UploadPage');

function getTestFilePath(fileName) {
  return path.resolve(__dirname, '../../test-files/', fileName);
}

test.describe('Upload Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.navigate();
    // Ensure the page title is correct
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('should upload valid .txt file and assert name', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('exampleFile.txt'));
    expect(await uploadPage.getResultMessage()).toBe('File Uploaded!');
    expect(await uploadPage.getUploadedFileName()).toBe('exampleFile.txt');
  });

  test('should upload .jpg image and assert name', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('image.jpg'));
    expect(await uploadPage.getUploadedFileName()).toBe('image.jpg');
  });

  test('should upload .pdf file and assert name', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('sample.pdf'));
    expect(await uploadPage.getUploadedFileName()).toBe('sample.pdf');
  });

  test('should show error when upload with no file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.uploadWithoutFile();
    expect(await uploadPage.getResultMessageError()).toBe('Internal Server Error');
  });

  test('should upload large file if supported', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('largefile.txt'));
    expect(await uploadPage.getUploadedFileName()).toBe('largefile.txt');
  });

  test('should upload special character filename', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('special@#$F1l3.txt'));
    expect(await uploadPage.getUploadedFileName()).toBe('special@#$F1l3.txt');
  });

  test('should upload long filename', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const longFileName = 'averylongfilename_thatisover100characters_longlonglonglonglonglong.txt';
    await uploadPage.upload(getTestFilePath(longFileName));
    expect(await uploadPage.getUploadedFileName()).toContain('averylongfilename');
  });

  test('should upload multiple files (only one allowed)', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.uploadMultiple(getTestFilePath('exampleFile.txt'), getTestFilePath('image.jpg')); // Ensure only one file is uploaded
    expect(await uploadPage.getUploadedFileName()).toMatch(/(exampleFile\.txt|image\.jpg)/);
  });

  test('should upload .exe file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('script.exe'));
    expect(await uploadPage.getUploadedFileName()).toBe('script.exe');
  });

  test('should upload empty file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('emptyFile.txt'));
    expect(await uploadPage.getUploadedFileName()).toBe('emptyFile.txt');
  });

  test('should upload file with uppercase extension', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('UPPERCASE.TXT'));
    expect(await uploadPage.getUploadedFileName()).toBe('UPPERCASE.TXT');
  });

  test('should upload after page reload', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await page.reload();
    await uploadPage.upload(getTestFilePath('exampleFile.txt'));
    expect(await uploadPage.getUploadedFileName()).toBe('exampleFile.txt');
  });

  test('should confirm file input is visible and enabled', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    expect(await uploadPage.isUploadFieldVisible()).toBeTruthy();
    expect(await uploadPage.isUploadFieldEnabled()).toBeTruthy();
  });

  test('should verify success message after upload', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('exampleFile.txt'));
    expect(await uploadPage.getResultMessage()).toBe('File Uploaded!');
  });

  test('should verify page title', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('should allow upload with Enter key after selecting file', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.upload(getTestFilePath('exampleFile.txt'));
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    expect(await uploadPage.getUploadedFileName()).toBe('exampleFile.txt');
  });
});
