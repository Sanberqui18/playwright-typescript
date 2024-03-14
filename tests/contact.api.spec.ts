import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page";

test.describe("Contact US Page", () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;
  let randomComment: string;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/"
    });

    const response = await fakerApi.get("users");
    const responseBody = await response.json();
    randomPerson = responseBody[0];

    const postResponse = await fakerApi.post("users/1/todos", {
      data: {
        title: "Learn Playwirght",
        completed: false
      }
    });
    const postResponseBody = await postResponse.json();
    randomComment = postResponseBody["title"];
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
      randomComment
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
