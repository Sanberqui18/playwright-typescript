import { type Page, type Locator } from "@playwright/test";

class HomePage {
  readonly page: Page;
  readonly getStartedBtn: Locator;
  readonly headingText: Locator;
  readonly homeText: Locator;
  readonly searchIcon: Locator;
  readonly headerMenuList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedBtn = page.locator("#get-started");
    this.headingText = page.locator("text=Think different. Make different.");
    this.homeText = page
      .locator("#zak-primary-menu")
      .filter({ hasText: "Home" });
    this.searchIcon = page.locator(
      '//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]'
    );
    this.headerMenuList = page.locator("#zak-primary-menu > *");
  }

  async navigate(): Promise<void> {
    await this.page.goto("https://practice.sdetunicorns.com/");
  }

  getNavLinksText() {
    return this.headerMenuList.allTextContents();
  }
}

export default HomePage;
