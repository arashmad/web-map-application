import { test, expect } from "@playwright/test";

test("Navigate from landing page to signin page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await expect(page.locator("h1")).toHaveText("This is landing page.");
  await expect(page.locator("text=signin")).toBeVisible();
  // await page.click("text=Signin");
  await page.getByText("signin").click({ force: true });
  await expect(page).toHaveURL("/signin");
});

/**
 * As `/map` is a protected route, user can't access it
 * They will be redirected to `/signin`
 * */
test("Unauthorized user should be redirect to the /signin page.", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByText("map").click({ force: true });
  await expect(page).toHaveURL("http://localhost:3000/signin");
});
