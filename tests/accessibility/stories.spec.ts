import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { gotoStory, storyId } from "../fixtures/storybook";

/*
 * One axe test per story, grouped by component. Stories are found by reading
 * the *.stories.tsx files, so new stories are covered automatically.
 *
 *   npx playwright test tests/accessibility                     every component
 *   npx playwright test tests/accessibility -g "Actions/Button"  one component
 *   npx playwright test tests/accessibility -g "Button › IconOnly"  one story
 *
 * Skip a story by adding the tag "skip-a11y":
 *   export const Broken: Story = { tags: ["skip-a11y"], … }
 */
const STORY_FOLDERS = ["registry", "docs"];
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

interface StoryFile {
  title: string;
  stories: string[];
}

function findStoryFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return findStoryFiles(path);
    return name.endsWith(".stories.tsx") ? [path] : [];
  });
}

function readStoryFile(path: string): StoryFile | undefined {
  const source = readFileSync(path, "utf8");
  const title = source.match(/\btitle:\s*["'`]([^"'`]+)["'`]/)?.[1];
  if (!title) return undefined;

  // Split at each `export const Name` so tags can be checked per story
  const parts = source.split(/(?=^export const \w+\s*[:=])/m).slice(1);
  const stories = parts
    .filter((part) => !/tags:\s*\[[^\]]*["']skip-a11y["']/.test(part))
    .map((part) => part.match(/^export const (\w+)/)![1]);

  return { title, stories };
}

const storyFiles = STORY_FOLDERS.flatMap(findStoryFiles)
  .map(readStoryFile)
  .filter((f): f is StoryFile => !!f && f.stories.length > 0);

for (const { title, stories } of storyFiles) {
  test.describe(title, () => {
    for (const exportName of stories) {
      test(`${title.split("/").pop()} › ${exportName}`, async ({ page }) => {
        await gotoStory(page, storyId(title, exportName));

        const results = await new AxeBuilder({ page })
          .include("#storybook-root")
          .withTags(WCAG_TAGS)
          .analyze();

        const summary = results.violations.map(
          (v) =>
            `${v.id} (${v.impact}): ${v.help} → ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
        );
        expect(summary).toEqual([]);
      });
    }
  });
}
