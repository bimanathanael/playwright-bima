
# 🎭 Playwright File Upload Test Suite

This project tests the file upload functionality at [the-internet.herokuapp.com/upload](https://the-internet.herokuapp.com/upload) using Playwright with JavaScript and the Page Object Model (POM) structure.

---

## 📦 Project Structure

```
playwright-bima/
│
├── pages/
│   └── UploadPage.js          # Page Object for Upload page
│
├── tests/
│   └── upload.spec.js         # Test cases using the POM
│
├── test-files/
│   ├── example.txt            # Valid sample file
│   ├── empty.txt              # Empty file
│   └── special@#$.txt         # Special character filename
│
├── playwright.config.js       # Playwright config file
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have **Node.js** (v16 or later) installed.

You can check your version with:
```bash
node -v
```

---

### 🧰 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/bimanathanael/playwright-bima.git
cd playwright-bima
npm init -y
npm install --save-dev playwright
npx playwright install
```

---

### 🧪 Running Tests

To run **all tests**:

```bash
npx playwright test
```

To run a **specific test file**:

```bash
npx playwright test tests/upload.spec.js
```

To run with **headed browser for debugging**:

```bash
npx playwright test --headed
```

To open the **HTML report** after tests:

```bash
npx playwright show-report
```

---

## 🧱 Writing Tests Using Page Object Model

The UploadPage class inside `pages/UploadPage.js` abstracts selectors and actions for the upload form.

Each test case uses this Page Object for clarity and reuse:
```javascript
const { UploadPage } = require('../pages/UploadPage');

const uploadPage = new UploadPage(page);
await uploadPage.goto();
await uploadPage.uploadFile('test-files/example.txt');
```

---

## 🧾 Example Test Case

```javascript
test('should upload a file and verify file name', async ({ page }) => {
  const uploadPage = new UploadPage(page);
  await uploadPage.goto();
  await uploadPage.uploadFile('test-files/example.txt');
  expect(await uploadPage.getUploadedFileName()).toBe('example.txt');
});
```

---

## 📂 Test Files

Make sure the test files exist under the `/test-files` folder. You can create them manually or use the following:

```bash
mkdir -p test-files
echo "This is a sample file." > test-files/example.txt
touch test-files/empty.txt
echo "Special chars file" > test-files/special@#$.txt
```

---

## ⚙️ Example `playwright.config.js`

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
});
```

---

## 📃 License

MIT — feel free to use and modify.

---

## 👨‍💻 Author

Built by [Your Name](mailto:your.email@example.com)
