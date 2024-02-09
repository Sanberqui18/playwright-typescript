import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("Open HomePage and verify title", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //verify title
    await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
  });

  test("Open About Page and verify title", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/about/");

    //verify title
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Click get started button using CSS Selector", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //negative assertion
    await expect(page).not.toHaveURL(/.*#get-started/);

    //click the get started button
    await page.locator("#get-started").click();

    //verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible using text selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //find the heading text
    const headingText = page.locator("text=Think different. Make different.");

    //verify the heading text is visible
    await expect(headingText).not.toBeHidden();
    await expect(headingText).toBeVisible();
  });

  test("Verfiy the home link is enabled using text and css selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //find the home text
    const homeText = page
      .locator("#zak-primary-menu")
      .filter({ hasText: "Home" });

    //const homeText = await page.locator("#zak-primary-menu:has-text("Home")")
    //const homeText = await page.locator("#zak-primary-menu >> text=Home")

    //verify the heading text is enabled
    await expect(homeText).toBeEnabled();
  });

  test("Verfiy the search icon is visible using xpath selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //find the home text
    const searchIcon = page.locator(
      '//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]'
    );

    //verify the heading text is enabled
    await expect(searchIcon).toBeVisible();
  });

  test("Verfiy the text of all header menu links", async ({ page }) => {
    const expectedLinks: string[] = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    //find the header menu
    const headerMenuList = page.locator("#zak-primary-menu > *");
    const hearderTextBlog = page.locator("#zak-primary-menu > *").nth(3);

    //verify the heading texts
    expect(await headerMenuList.allTextContents()).toEqual(expectedLinks);
    //expect(await headerMenuList.allInnerTexts()).toEqual(expectedLinks);

    expect(await hearderTextBlog.textContent()).toEqual(expectedLinks[3]);

    //Print out all the options and assert
    for (const el of await headerMenuList.allTextContents()) {
      console.log(el);
      expect(el).toEqual(expectedLinks[expectedLinks.indexOf(el)]);
    }
  });
});
