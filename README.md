
# Playwright File Upload Tests

This is a simple Playwright test project that checks how file uploads work on [the-internet.herokuapp.com/upload](https://the-internet.herokuapp.com/upload), and [API Post behaviour](https://jsonplaceholder.typicode.com/posts)  It uses JavaScript and follows the Page Object Model (POM) for UI test and Service Object Model for API test pattern to keep things organized.

Test case list : [Google Sheet](https://docs.google.com/spreadsheets/d/1wRNNuTaorq61xP0T0E4m8DpybgUiOdYYNkOqySu_LgM/edit?usp=sharing)

---

## Project Layout

```
playwright-bima/
│
├── pages/
│   └── UploadPage.js               # Code for interacting with the upload page 
│
├── services/
│   └── getAllPostService.js        # Code for API GET method 
│   └── getPostByIdPostService.js   # Code for API GET by id method
│   └── createPostService.js        # Code for API POST method 
│   └── updatePostService.js        # Code for API PUT/PATCH method 
│   └── deletePostService.js        # Code for API DELETE method 
│
├── tests/
│   └── test-api                    # test scenarios for API
├── tests/
│   └── test-ui                     # test scenarios UI
│
├── test-files/                     # Sample file for upload, auto generated with command
│
├── playwright.config.js            # Playwright setup and settings
├── playwright-report
│   └── index.html                  # Report generated after run test 
└── README.md                       # Info file
```

---

## Before You Start

Make sure you have **Node.js** (version 16 or newer) installed.

Check by running:
```bash
node -v
```

---

## Setup

Clone the repo and install the dependencies:

```bash
git clone https://github.com/bimanathanael/playwright-bima.git
cd playwright-bima
npm init -y
npm install --save-dev playwright
npx playwright install
```

---

## Running the Tests

**First thing first** need to Generate test files:
```bash
npm run generate
```

To run **all tests**:
```bash
npm run test
```

To run debug **all tests**:
```bash
npm run test:debug
```

To check out the test results in a report:
```bash
npm run test:report
```

---

## About the Author

Created by [Bima Nathanael](mailto:bimanathanael95@gmail.com) — feel free to reach out.

