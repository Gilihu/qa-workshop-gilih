import { test, expect } from "@playwright/test";

test.describe("Todo App", () => {
  test("renders todo items from the API", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("todo-list")).toBeVisible();

    const items = page.getByTestId("todo-list").locator("li");
    await expect(items).toHaveCount(10);
  });

  test("displays at least one checkbox", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("todo-list")).toBeVisible();

    const firstCheckbox = page.getByTestId("todo-checkbox-1");
    await expect(firstCheckbox).toBeVisible();
  });
});
