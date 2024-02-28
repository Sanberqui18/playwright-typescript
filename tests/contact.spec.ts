import { test, expect } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import { faker } from "@faker-js/faker";

test.describe("Contact US Page", () => {
  let contactPage: ContactPage;
  test("Fill all the Contact details and verify success message", async ({
    page
  }) => {
    await page.goto("/");

    const contactPage = page
      .locator("#zak-primary-menu > *")
      .filter({ hasText: "Contact" });

    await contactPage.click();

    await expect(page).toHaveURL(/.*contact/);

    await page.getByLabel("Name").first().fill("Test User");
    await page.getByLabel("Email").first().fill("testuser@gmail.com");
    await page.getByLabel("Phone").first().fill("123456789");
    await page.getByRole("textbox", { name: "Message" }).fill("secret");

    await expect
      .soft(page.getByRole("textbox", { name: "Message" }))
      .toHaveText("");

    await page.getByRole("button", { name: /submit/i }).click();

    expect(test.info().errors.length).toBeLessThan(1);

    const message = page.getByRole("alert");

    const trimMessage = await message.textContent();
    expect(trimMessage?.trim()).toEqual(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });

  test("Fill contact form and verify success message (Dilpreet)", async ({
    page
  }) => {
    // open contact page
    await page.goto("/contact");

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
  test("Fill contact form and verify success message with POM (Dilpreet)", async ({
    page
  }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate();

    // fill out the input fields, verify message field and submit data with faker.js
    await contactPage.submitForm(
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.lorem.paragraphs(2)
    );

    //verify there are no errors so dare in the execution
    expect(test.info().errors.length).toBeLessThan(1);
    // if this assertion fails the code below will not execute since it is not a soft assertion

    // verify success message
    await contactPage.verifyAlert(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });

  test("Verify form errors with POM (Dilpreet)", async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate();

    // submit to get errors
    contactPage.submit();

    //verify error in fields
    await expect(contactPage.nameError).toBeVisible({ timeout: 3000 });
    await expect(contactPage.nameError).toHaveText("This field is required.");

    await expect(contactPage.emailError).toBeVisible({ timeout: 3000 });
    await expect(contactPage.emailError).toHaveText(
      "Please enter a valid email address."
    );

    await expect(contactPage.phoneError).toBeVisible({ timeout: 3000 });
    await expect(contactPage.phoneError).toHaveText("This field is required.");
  });
});
