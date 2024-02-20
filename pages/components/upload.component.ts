import { type Locator, type Page } from "@playwright/test";

class UploadComponent {
  private page: Page;
  uploadInput: string;
  submitBtn: Locator;
  successTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadInput = "input#upfile_1";
    this.submitBtn = page.locator("#upload_1");
    this.successTxt = page.locator("#wfu_messageblock_header_1_1");
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles("input#upfile_1", filePath);
    await this.submitBtn.click();
  }
}

export default UploadComponent;
