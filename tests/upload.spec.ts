import { test, expect } from "@playwright/test";
const path = require("path");

test.describe("Upload File", () => {
  test("Should upload a test file", async ({ page }) => {
    await page.goto("https://practice.sdetunicorns.com/");

    const cartIcon = page.getByTitle("View your shopping cart").first();

    await cartIcon.click();

    await expect(page).toHaveURL(/.*cart/);

    await page.waitForTimeout(3000); //Otherwise it will not fin the input element

    const filePath: string = path.join(__dirname, "../data/image.png");

    await page.locator('input[type="file"]').setInputFiles(filePath);

    await page.locator("#upload_1").click({ force: true });

    await page.locator("#wfu_messageblock_header_1_label_1").isVisible();

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 10000 }
    );
  });

  test("Should upload a test file (Dilpreet)", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide file test path
    const filePath: string = path.join(__dirname, "../data/image.png");

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);
    //await page.locator('input[type="file"]').setInputFiles(filePath);

    //click on the submit button
    await page.locator("#upload_1").click();
    //await page.locator("#wfu_messageblock_header_1_1").isVisible();

    //assesrtion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 10000 }
    );
  });

  test("Should upload a test file on a hidden input field (Dilpreet)", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide file test path
    const filePath: string = path.join(__dirname, "../data/image.png");

    //DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);
    //await page.locator('input[type="file"]').setInputFiles(filePath);

    //click on the submit button
    await page.locator("#upload_1").click();
    //await page.locator("#wfu_messageblock_header_1_1").isVisible();

    //assesrtion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 10000 }
    );
  });
});
