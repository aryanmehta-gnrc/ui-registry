import { expect, test } from "@playwright/test";

import { gotoStory, storyId } from "../fixtures/storybook";

const story = (name: string) => storyId("Actions/Button", name);

test.describe("Button", () => {
  test("can be focused and activated with Enter and Space", async ({
    page,
  }) => {
    await gotoStory(page, story("Default"));
    const button = page.getByRole("button", { name: "Button" });

    let clicks = 0;
    await page.exposeFunction("countClick", () => clicks++);
    await button.evaluate((el) =>
      el.addEventListener("click", () =>
        (window as unknown as { countClick: () => void }).countClick(),
      ),
    );

    await page.locator("body").click();
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();

    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");
    await expect.poll(() => clicks).toBe(2);
  });

  test("shows a visible focus ring when focused by keyboard", async ({
    page,
  }) => {
    await gotoStory(page, story("Default"));
    const button = page.getByRole("button", { name: "Button" });

    const before = await button.evaluate(
      (el) => getComputedStyle(el).boxShadow,
    );
    await page.locator("body").click();
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();
    const after = await button.evaluate((el) => getComputedStyle(el).boxShadow);

    expect(after).not.toBe("none");
    expect(after).not.toBe(before);
  });

  test("a disabled button can't be focused", async ({ page }) => {
    await gotoStory(page, story("Disabled"));
    const button = page.getByRole("button", { name: "Button" });

    await expect(button).toBeDisabled();
    await page.locator("body").click();
    await page.keyboard.press("Tab");
    await expect(button).not.toBeFocused();
  });

  test("icon-only buttons have an accessible name", async ({ page }) => {
    await gotoStory(page, story("IconOnly"));
    const buttons = page.getByRole("button", { name: "Refresh data" });
    await expect(buttons).toHaveCount(4);
  });

  test("AsLink renders a real link", async ({ page }) => {
    await gotoStory(page, story("AsLink"));
    const link = page.getByRole("link", { name: "Open dashboard" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "#");
    await expect(
      page.getByRole("button", { name: "Open dashboard" }),
    ).toHaveCount(0);
  });

  test("Loading story is disabled and announces its label", async ({
    page,
  }) => {
    await gotoStory(page, story("Loading"));
    const button = page.getByRole("button", { name: "Saving…" });
    await expect(button).toBeDisabled();
  });
});
