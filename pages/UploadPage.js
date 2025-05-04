// pages/UploadPage.js
class UploadPage {
    constructor(page) {
      this.page = page;
      this.fileInput = page.locator('input[id="file-upload"]');
      this.submitButton = page.locator('#file-submit');
      this.header = page.locator('h3');
      this.uploadedFileName = page.locator('#uploaded-files');
    }
  
    async goto() {
      await this.page.goto('https://the-internet.herokuapp.com/upload');
    }
  
    async uploadFile(filePath) {
      await this.fileInput.setInputFiles(filePath);
      await this.submitButton.click();
    }
  
    async getUploadedFileName() {
      return (await this.uploadedFileName.textContent()).trim();
    }
  
    async getHeaderText() {
      return await this.header.textContent();
    }
  
    async isFileInputVisible() {
      return await this.fileInput.isVisible();
    }
  
    async isFileInputEnabled() {
      return await this.fileInput.isEnabled();
    }
  }
  
  module.exports = { UploadPage };