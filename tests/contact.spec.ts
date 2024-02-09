import { test, expect } from "@playwright/test";

test.describe("Contact US Page", () => {
  test("Fill all the Contact details and verify success message", async ({
    page,
  }) => {
    await page.goto("https://practice.sdetunicorns.com/");

    const contactPage = page
      .locator("#zak-primary-menu > *")
      .filter({ hasText: "Contact" });

    await contactPage.click();

    await expect(page).toHaveURL(/.*contact/);

    await page.getByLabel("Name").first().fill("Test User");
    await page.getByLabel("Email").first().fill("testuser@gmail.com");
    await page.getByLabel("Phone").first().fill("123456789");
    await page.getByLabel("Message").first().fill("secret");

    await expect.soft(page.getByLabel("Message")).toHaveText("");

    await page.getByRole("button", { name: /submit/i }).click();

    expect(test.info().errors.length).toBeLessThan(1);

    const message = page.getByRole("alert");

    const trimMessage = await message.textContent();
    expect(trimMessage?.trim()).toEqual(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });

  test("Fill contact form and verify success message (Dilpreet)", async ({
    page,
  }) => {
    // open contact page
    await page.goto("https://practice.sdetunicorns.com//contact");

    //  fill out the input fields
    await page.locator(".contact-name input").fill("Test Name");
    await page.locator(".contact-email input").fill("test@mail.com");
    await page.locator(".contact-phone input").fill("134567864");
    await page
      .locator(".contact-message textarea")
      .fill("This is a test message");

    // add a soft assertion
    await expect.soft(page.locator(".contact-message textarea")).toHaveText("");

    // click submit
    await page.locator("button[type=submit]").click();

    //verify there are no errors so dare in the execution
    expect(test.info().errors.length).toBeLessThan(1);
    // if this assertion fails the code below will not execute since it is not a soft assertion

    // verify success message
    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
