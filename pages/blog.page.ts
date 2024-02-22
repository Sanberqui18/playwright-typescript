import { type Locator, type Page } from "@playwright/test";

class BlogPage {
  private page: Page;
  private url: string;
  postList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "/blog";
    this.postList = page.locator("#recent-posts-3 ul li");
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  getBlogsQty() {
    return this.postList.count();
  }

  getBlogsList() {
    return this.postList.allTextContents();
  }
}

export default BlogPage;
