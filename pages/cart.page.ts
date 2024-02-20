import { type Page } from "@playwright/test";
import UploadComponent from "./components/upload.component";

class CartPage {
  private page: Page;
  private url: string;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://practice.sdetunicorns.com/cart/";
  }

  uploadComponent() {
    return new UploadComponent(this.page);
  }

  async navigate() {
    await this.page.goto(this.url);
  }
}

export default CartPage;
