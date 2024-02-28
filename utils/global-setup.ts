import { type FullConfig, chromium } from "@playwright/test";

//https://playwright.dev/docs/test-global-setup-teardown#option-2-configure-globalsetup-and-globalteardown
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalSetup(config: FullConfig) {
  //parameter used to access the config file and get baseURL, storageState, etc (const { baseURL, storageState } = config.projects[0].use;)
  const browser = await chromium.launch(); // as it is not in a test block, we should create the browser instance from scratch
  const page = await browser.newPage();
  await page.goto("https://practice.sdetunicorns.com/my-account");
  await page.context().storageState({ path: "notLoggedInState.json" });

  //login
  await page.locator("#username").fill("practiceuser1");
  await page.locator("#password").fill("PracticePass1!");
  await page.locator('[value="Log in"]').click();

  //save signed-in state to 'loggedInState.json'
  await page.context().storageState({ path: "loggedInState.json" });
  await browser.close();
}

export default globalSetup;
