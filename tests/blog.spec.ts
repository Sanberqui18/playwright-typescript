import { test, expect } from "@playwright/test";

test.describe("Blog Page ", () => {
  test("Verify Recent Post count and length of each item", async ({ page }) => {
    await page.goto("https://practice.sdetunicorns.com/");

    const contactPage = page
      .locator("#zak-primary-menu > *")
      .filter({ hasText: "Blog" });

    await contactPage.click();

    await expect(page).toHaveURL(/.*blog/);
    await expect(page).toHaveTitle("Blog – Practice E-Commerce Site");

    const postList = page.locator("#recent-posts-3 ul li");
    await expect(postList).toHaveCount(5);

    for (let el of await postList.allTextContents()) {
      expect(el.trim().length).toBeGreaterThan(10);
    }
  });

  test("Verify Recent Posts count and verify the length of each list item (Dilpreet)", async ({
    page,
  }) => {
    // open blog page
    await page.goto("https://practice.sdetunicorns.com/blog");

    // get the recent post list elements
    const recentPostsList = page.locator("#recent-posts-3 ul li");

    // loop through the list and assert the char length > 10
    for (const el of await recentPostsList.elementHandles()) {
      expect((await el?.textContent())?.trim().length).toBeGreaterThan(10);
    }

    // assert the total length = 5
    expect(await recentPostsList.count()).toEqual(5);
  });
});
