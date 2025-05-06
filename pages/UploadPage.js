// pages/UploadPage.js

class UploadPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            fileInput: page.locator('#file-upload'),
            uploadButton: page.locator('#file-submit'),
            resultHeader: page.locator('h3'),
            errorHeader: page.locator('h1'),
            uploadedFile: page.locator('#uploaded-files'),
        };
    }
  
    async navigate() {
        await this.page.goto('https://the-internet.herokuapp.com/upload');
    }
  
    async upload(filePath) {
        await this.selectors.fileInput.setInputFiles(filePath);
        await this.selectors.uploadButton.click();
    }
  
    async uploadMultiple(filePath1, filePath2) {
        await this.selectors.fileInput.setInputFiles(filePath1, filePath2);
        await this.selectors.uploadButton.click();
    }
  
    async uploadWithoutFile() {
        await this.selectors.uploadButton.click();
    }
  
    async getResultMessage() {
        const headerText = await this.selectors.resultHeader.textContent();
        return headerText?.trim();
    }
  
    async getResultMessageError() {
        const headerText = await this.selectors.errorHeader.textContent();
        return headerText?.trim();
    }
  
    async getUploadedFileName() {
        const fileText = await this.selectors.uploadedFile.textContent();
        return fileText?.trim();
    }
  
    async isUploadFieldVisible() {
        return this.selectors.fileInput.isVisible();
    }
  
    async isUploadFieldEnabled() {
        return this.selectors.fileInput.isEnabled();
    }
  
    async clearFile() {
        await this.selectors.fileInput.setInputFiles([]); // Reset file input
    }
  }
  
  module.exports = { UploadPage };
  