import { test, expect, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import apiController from "../controller/api.controller";

test.describe("Contact US Page", () => {
  let contactPage: ContactPage;
  let randomPerson: APIResponse;
  let randomComment: APIResponse;

  test.beforeAll(async () => {
    await apiController.init();
    randomPerson = await apiController.getUsers();
    randomComment = await apiController.createUserToDo();
  });

  test("Fill contact form using API data and verify success message with POM (Dilpreet)", async ({
    page
  }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate();

    // fill out the input fields, verify message field and submit data with API response data
    await contactPage.submitForm(
      randomPerson["name"],
      randomPerson["email"],
      randomPerson["phone"],
      randomComment["title"]
    );

    //verify there are no errors so dare in the execution
    expect(test.info().errors.length).toBeLessThan(1);
    // if this assertion fails the code below will not execute since it is not a soft assertion

    // verify success message
    await contactPage.verifyAlert(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
