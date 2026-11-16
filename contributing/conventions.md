# Conventions

Rules every component follows. Several of these exist because breaking them silently breaks installs in other projects; [decisions.md](decisions.md) explains why.

## Files and names

- Components live in `registry/ui/`, **flat: no subfolders.** Nested folders break the shadcn CLI's import rewriting (decision 2).
- File names are kebab-case: `radio-group.tsx`, `radio-group.stories.tsx`, `radio-group.mdx`.
- Exports are named, PascalCase: `export { RadioGroup, RadioGroupItem }`. No default exports.
- Shared helpers go in `registry/lib/`, hooks in `registry/hooks/`.

## Imports

| Importing         | Write                                   | Never                         |
| ----------------- | --------------------------------------- | ----------------------------- |
| Another component | `@/registry/ui/button`                  | `./button`, `../ui/button`    |
| A helper          | `@/lib/format`                          | `@/registry/lib/format`       |
| A hook            | `@/hooks/use-mobile`                    | `@/registry/hooks/use-mobile` |
| `cn`              | `import { cn } from "cn"` (npm package) | a local `utils` file          |

Relative imports and `@/registry/lib` or `@/registry/hooks` are rewritten wrongly on install (decision 3). `npm run check` catches them.

## Components

- Built on **Base UI**, in shadcn's `base-nova` style.
- Interactive components start with `"use client"`.
- **Theme tokens only**: `bg-primary`, `text-muted-foreground`, `ring-ring`. No hard-coded colours.
- Focus rings at full strength: `focus-visible:ring-ring`, not `ring-ring/50`.
- Variants use `class-variance-authority`. Export the variants function (for example `buttonVariants`) when it's useful on other elements, and add its name to `allowExportNames` in the ESLint config.
- Keep shadcn's `data-slot` attributes.
- JSDoc on the main export: one line on what it is, plus anything non-obvious.
- For links styled as buttons, use `buttonVariants` on an `<a>`, not `render={<a />}`; Base UI would add `role="button"` (decision 4).

## Stories

- Title: `Components/<Category>/<Name>`. Categories: Actions, Forms, Data Display, Feedback, Overlays, Navigation, Layout, Charts. Blocks use `Blocks/<Name>`; example pages use `Pages/<Name>`.
- No `autodocs` tag; the `.mdx` file is the Docs page.
- One story per variant or state, named in PascalCase: `Default`, `Disabled`, `WithIcon`.
- Every story must pass the accessibility sweep. `skip-a11y` is for deliberate broken examples only, with a comment saying why.

## Docs pages (`<name>.mdx`)

```mdx
import { Canvas, Controls, Meta } from "@storybook/addon-docs/blocks";
import * as ButtonStories from "./button.stories";

<Meta of={ButtonStories} name="Docs" />
```

Then, in order: title and one-line summary, a canvas, install command, controls, variants, **When to use**, **When not to use**, **Accessibility**, **Related**, then the stories.

MDX isn't GitHub Markdown:

- Write tables as HTML (`<table>`, `<th>`, `<td>`), not `|` rows.
- Inside a table cell, use `<strong>`, `<code>` and `<a href>`; Markdown doesn't work there.
- Outside code, write `<`, `>`, `{` and `}` as `&lt;`, `&gt;`, `&#123;` and `&#125;`.
- No `<!-- -->` comments; use `{/* */}`.

## `registry.json` entry

```json
{
  "name": "field",
  "type": "registry:ui",
  "title": "Field",
  "description": "Label, control, description and error message as one unit.",
  "dependencies": ["@base-ui/react", "cn"],
  "registryDependencies": [
    "aryanmehta-gnrc/ui-registry/label",
    "aryanmehta-gnrc/ui-registry/separator"
  ],
  "files": [{ "path": "registry/ui/field.tsx", "type": "registry:ui" }],
  "meta": { "interactive": false }
}
```

- `registryDependencies` use the **full address** for our components.
- `dependencies` lists every npm package the file imports; `npm run check` compares the two.
