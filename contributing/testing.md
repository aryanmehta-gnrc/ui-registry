# Testing

Every component is tested in four ways. Stories are the starting point: they're the examples in the docs **and** the test cases.

| Test                    | Tool                  | Where                                   | Checks                                                                   |
| ----------------------- | --------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| **Story tests**         | Storybook + Vitest    | next to each component, `*.stories.tsx` | Every story renders; accessibility checks pass; `play` interactions work |
| **Accessibility sweep** | Playwright + axe-core | `tests/accessibility/stories.spec.ts`   | WCAG 2.2 AA automated checks on every story                              |
| **End-to-end tests**    | Playwright            | `tests/e2e/<component>.spec.ts`         | Keyboard use, focus, accessible names, behaviour a user relies on        |
| **Registry checks**     | Node script           | `scripts/check-registry.ts`             | Dependencies match imports; stories, docs, JSDoc and e2e tests exist     |

## Commands

| Command                   | Runs                                                      |
| ------------------------- | --------------------------------------------------------- |
| `npm run test:stories`    | Story tests (Vitest)                                      |
| `npm run test:a11y`       | Accessibility sweep, every story                          |
| `npm run test:e2e`        | End-to-end tests                                          |
| `npm run test:playwright` | Accessibility sweep and end-to-end tests together         |
| `npm run registry:check`  | Registry checks (strict)                                  |
| `npm run check`           | Lint, type-check, registry validation and registry checks |

Playwright starts Storybook by itself, or reuses one already running on port 6007.

## Testing one component

`-g` matches the Storybook title:

```bash
npx playwright test -g "Components/Actions/Button"   # its accessibility sweep and e2e tests
npx playwright test -g "Button › IconOnly"           # one story
```

Faster still: open the component in Storybook. The **Accessibility** panel updates as you edit, and the test widget in the sidebar runs its story tests.

## Writing an end-to-end test

Add one for every **interactive** component, and mark it `"meta": { "interactive": true }` in `registry.json` so the registry check requires it.

```ts
// tests/e2e/dialog.spec.ts
import { expect, test } from "@playwright/test";

import { gotoStory, storyId } from "../fixtures/storybook";

const story = (name: string) => storyId("Components/Overlays/Dialog", name);

test.describe("Dialog", () => {
  test("opens, keeps focus inside, and closes with Escape", async ({
    page,
  }) => {
    await gotoStory(page, story("Default"));
    const trigger = page.getByRole("button", { name: "Open" });

    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
```

**Guidelines**

- **Find elements the way users do:** `getByRole`, `getByLabel`, `getByText`. Never by CSS class. If you can't find an element by role or label, that's usually an accessibility bug.
- **Test the keyboard path:** Tab to it, activate with Enter or Space, move with arrow keys, close with Escape, check where focus goes.
- **One behaviour per test**, named as a sentence: "a disabled button can't be focused".
- **Use stories as fixtures.** If a test needs a particular state, add a story for it; that state then gets documented and swept for accessibility too.

## The accessibility sweep

The sweep reads every `*.stories.tsx` file and runs axe-core on each story, so new stories are covered without writing anything.

To skip a story (for example one that deliberately shows a broken state), tag it:

```tsx
export const BrokenExample: Story = {
  tags: ["skip-a11y"],
};
```

Skipping should be rare. Explain why in a comment above the story.

## Manual checks

Automated tools find roughly a third of accessibility problems. Before a pull request, also:

- use the component with the **keyboard only**;
- try it with a **screen reader** (NVDA on Windows, VoiceOver on macOS);
- check it at **200% zoom** and at **phone width**.

## Before opening a pull request

```bash
npm run check
npx playwright test -g "<Storybook title>"
```

CI runs everything (`npm run check`, `npm run test:stories` and `npx playwright test`) across all components, so a change to something shared can't break another component unnoticed.

## When a test fails

| Failure                                    | Usually means                                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Sweep: `color-contrast`                    | A colour pair is below 4.5:1 (text) or 3:1 (non-text). Fix the token or the class, not the test. |
| Sweep: `button-name`, `label`, `link-name` | A control has no accessible name. Add a label or `aria-label`.                                   |
| E2E: element not found                     | The role or name changed, or the story ID changed (titles are part of the ID).                   |
| E2E: `toBeFocused` fails                   | Focus went somewhere unexpected; check the component's focus management.                         |
| Story test fails but the sweep passes      | A `play` function or a render error; open the story in Storybook to see it.                      |
