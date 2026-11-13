import type { Page } from "@playwright/test";

/** ("Actions/Button", "Default") → "actions-button--default" */
export function storyId(title: string, exportName: string): string {
  const slug = (s: string) =>
    s
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  return `${slug(title)}--${slug(exportName)}`;
}

/** Opens one story without the Storybook interface and waits for it to render. */
export async function gotoStory(page: Page, id: string) {
  const params = new URLSearchParams({ id, viewMode: "story" });
  await page.goto(`/iframe.html?${params}`);
  await page.locator("#storybook-root > *").first().waitFor();
}

export interface StoryIndexEntry {
  id: string;
  title: string;
  name: string;
  type: "story" | "docs";
  tags?: string[];
}

/** Every story Storybook knows about, read from its index. */
export async function listStories(baseURL: string): Promise<StoryIndexEntry[]> {
  const res = await fetch(`${baseURL}/index.json`);
  const index = (await res.json()) as {
    entries: Record<string, StoryIndexEntry>;
  };
  return Object.values(index.entries).filter((e) => e.type === "story");
}
