import { test, expect } from "@playwright/test";
import CartPage from "../pages/cart.page";
import path from "path";

test.describe("Upload File", () => {
  let cartPage: CartPage;
  test.use({ storageState: "notLoggedInState.json" });

  const fileNames: string[] = ["image.png", "image2.png"];

  for (const name of fileNames) {
    test(`Should Upload File ${name} using Parametrized test`, async ({
      page
    }) => {
      cartPage = new CartPage(page);

      //open url
      await cartPage.navigate();

      //provide file test path
      const filePath: string = path.join(__dirname, `../data/${name}`);

      //upload test file and click on the submit button
      cartPage.uploadComponent().uploadFile(filePath);

      await expect(cartPage.uploadComponent().successTxt).toContainText(
        "uploaded successfully",
        { timeout: 20000 }
      );
    });
  }
  test("Should upload a test file", async ({ page }) => {
    await page.goto("/");

    const cartIcon = page.getByTitle("View your shopping cart").first();

    await cartIcon.click();

    await page.waitForURL(/.*cart/); // Solve adding the harcoded wait
    //await page.waitForLoadState();
    await expect(page).toHaveURL(/.*cart/);

    //await page.waitForTimeout(3000); //Otherwise it will not find the input element

    const filePath: string = path.join(__dirname, "../data/image.png");

    await page.locator('input[type="file"]').setInputFiles(filePath);

    await page.locator("#upload_1").click();

    //await page.locator("#wfu_messageblock_header_1_label_1").isVisible();

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 20000 }
    );
  });

  test("Should upload a test file with wait assertion (Dilpreet)", async ({
    page
  }) => {
    //open url
    await page.goto("/cart/");

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
      { timeout: 20000 }
    );
  });

  test("Should upload a test file on a hidden input field (Dilpreet)", async ({
    page
  }) => {
    //open url
    await page.goto("/cart/");

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
      { timeout: 20000 }
    );
  });

  test("Should upload a test file with hardcoded wait (Dilpreet)", async ({
    page
  }) => {
    //open url
    await page.goto("/cart/");

    //provide file test path
    const filePath: string = path.join(__dirname, "../data/3mb-file.png");

    //upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click on the submit button
    await page.locator("#upload_1").click();

    //harcoded sleep - WRONG WAY
    await page.waitForTimeout(20000);

    //assesrtion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "not uploaded",
      { timeout: 15000 }
    );
  });

  test("Should upload a test file with wait for state timeout", async ({
    page
  }) => {
    await page.goto("/");

    const cartIcon = page.getByTitle("View your shopping cart").first();

    await cartIcon.click();

    await page.waitForURL(/.*cart/); // Solve adding the harcoded wait
    //await page.waitForLoadState();
    await expect(page).toHaveURL(/.*cart/);

    //await page.waitForTimeout(3000); //Otherwise it will not find the input element

    const filePath: string = path.join(__dirname, "../data/image.png");

    await page.locator('input[type="file"]').setInputFiles(filePath);

    await page.locator("#upload_1").click({ force: true });

    // expect(
    //   await page.locator("#wfu_messageblock_header_1_label_1").waitFor()
    // ).toBeFalsy();

    await page.locator("#wfu_messageblock_header_1_label_1").waitFor();

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully"
    );
  });

  test("Should upload a test file with wait assertion POM with Component (Dilpreet)", async ({
    page
  }) => {
    cartPage = new CartPage(page);

    //open url
    await cartPage.navigate();

    //provide file test path
    const filePath: string = path.join(__dirname, "../data/image.png");

    //upload test file and click on the submit button
    cartPage.uploadComponent().uploadFile(filePath);

    await expect(cartPage.uploadComponent().successTxt).toContainText(
      "uploaded successfully",
      { timeout: 20000 }
    );
  });
});
