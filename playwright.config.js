// playwright.config.js
module.exports = {
    reporter: [['html', { open: 'never' }]], // or 'always' to auto-open after test
    timeout: 30000,
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 }
    }
  };
  