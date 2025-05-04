// example.spec.js
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
//   // Wait for 5 seconds (5000 milliseconds)
//   await page.waitForTimeout(5000);
  await expect(page).toHaveTitle(/The Internet/);
  
});
