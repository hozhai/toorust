import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("check for metadata", () => {
  test("has title", async ({ page }) => {
    await expect(page.title).toBe("TODO");
  });
});
