import { expect, type Locator, type Page } from "@playwright/test";

class ContactPage {
  private page: Page;
  private url: string;
  nameField: Locator;
  emailField: Locator;
  phoneFileld: Locator;
  messageField: Locator;
  submitBtn: Locator;
  successAlert: Locator;
  nameError: Locator;
  emailError: Locator;
  phoneError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://practice.sdetunicorns.com/contact";
    this.nameField = page.locator(".contact-name input");
    this.emailField = page.locator(".contact-email input");
    this.phoneFileld = page.locator(".contact-phone input");
    this.messageField = page.locator(".contact-message textarea");
    this.submitBtn = page.locator("button[type=submit]");
    this.successAlert = page.locator('div[role="alert"]');
    this.nameError = page.locator(".contact-name .evf-error").nth(1);
    this.emailError = page.locator(".contact-email .evf-error").nth(1);
    this.phoneError = page.locator(".contact-phone .evf-error").nth(1);
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async fillName(name: string) {
    await this.nameField.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPhone(phone: string) {
    await this.phoneFileld.fill(phone);
  }

  async fillMessage(message: string) {
    await this.messageField.fill(message);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async submitForm(
    name: string,
    email: string,
    phone: string,
    message: string
  ) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPhone(phone);

    await expect.soft(this.messageField).toHaveText("");
    await this.fillMessage(message);

    await this.submit();
  }

  async verifyAlert(message: string) {
    await expect(this.successAlert).toHaveText(message);
  }
}

export default ContactPage;
