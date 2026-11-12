# ui-registry

A test [shadcn registry](https://ui.shadcn.com/docs/registry) of React components built on [Base UI](https://base-ui.com) and Tailwind CSS v4. Projects install components with the shadcn CLI, which copies the source into the project.

> **Status:** experimental. Components and item names may change without notice.

## Contents

- [Framework support](#framework-support)
- [Using components in a project](#using-components-in-a-project)
- [Using components in Symfony](#using-components-in-symfony)
- [Developing the registry](#developing-the-registry)
- [Adding a component](#adding-a-component)
- [Component conventions](#component-conventions)
- [Testing](#testing)
- [Versioning](#versioning)
- [Limitations](#limitations)

---

## Framework support

These are React components. They work wherever React and Tailwind CSS v4 run.

| Project | Supported | Notes |
|---|---|---|
| **Symfony (Twig)** | **Yes, as React islands** | Components are mounted into Twig pages with Symfony UX React. Needs a Node build (Symfony Reprise recommended). See [Using components in Symfony](#using-components-in-symfony). Not yet tested end to end. |
| Symfony as an API + separate React front end | Yes | The front end is an ordinary React project (Vite or Next.js). Follow [Using components in a project](#using-components-in-a-project). |
| Vite + React | Yes | The reference setup for this repository. |
| Next.js | Yes | Interactive components start with `"use client"`, which Next.js needs on server-rendered pages. The CLI keeps the line for projects with `rsc: true` in `components.json` and removes it for all others. |
| Twig-only pages (no React) | Styling only | The Tailwind classes and theme tokens work in Twig templates. The component behaviour does not. |

---

## Using components in a project

### Prerequisites

- A React project with Tailwind CSS v4, initialised with shadcn. These components use Base UI, so initialise with the Base UI base:

  ```bash
  npx shadcn@latest init -b base
  ```

  When asked, choose your framework template (for example Vite or Next.js). Symfony has no shadcn template; see [Using components in Symfony](#using-components-in-symfony).

- Read access to this repository, and the GitHub CLI signed in:

  ```bash
  gh auth login
  ```

### Install a component

```bash
npx shadcn@latest add <owner>/<repo>/button
```

The CLI does the following:
- copies the component into your project's `ui` folder;
- rewrites its imports to match your `components.json` aliases;
- installs the npm packages it needs;
- adds any registry items it depends on.

### Pin a version

Add a tag, branch or commit after `#`:

```bash
npx shadcn@latest add <owner>/<repo>/button#v0.1.0
```

A pin applies only to the item you name. Its dependencies install from the default branch unless they are pinned separately.

### Update a component

Installed code belongs to your project and doesn't update itself. To see what has changed, or to replace your copy:

```bash
npx shadcn@latest add <owner>/<repo>/button --diff        # compare with your copy
npx shadcn@latest add <owner>/<repo>/button --overwrite   # replace it (local edits are lost)
```

Check [CHANGELOG.md](CHANGELOG.md) for what changed in each item.

---

## Using components in Symfony

Symfony renders pages with Twig, so these components are used as **React islands**. Each one is a small React app mounted into part of a Twig page by [Symfony UX React](https://symfony.com/bundles/ux-react). The rest of the page stays Twig.

> This setup follows the Symfony and shadcn documentation but has **not yet been tested end to end**. Treat it as a starting point and update this section once it has been tried in a real project.

### One-time project setup

1. **Add a Node-based front-end build.**

   The components are TypeScript and JSX, which need compiling. Symfony's docs recommend [Symfony Reprise](https://symfony.com/bundles/reprise/current/index.html), its Vite and Rsbuild integration, for React:

   ```bash
   composer require symfony/reprise
   npm install @symfony/reprise --save-dev
   ```

   Symfony UX React supports Reprise from `symfony/ux-react` 3.4 and `symfony/reprise` 0.4. Reprise is still at version 0.x.

   Alternatives:
   - **Webpack Encore:** in low-maintenance mode, so not recommended for new projects.
   - **[pentatrion/vite-bundle](https://symfony-vite.pentatrion.com):** a long-standing community Vite integration.

   AssetMapper alone isn't suitable, because it needs a separate Babel step to compile JSX.

2. **Install Symfony UX React:**

   ```bash
   composer require symfony/ux-react
   ```

3. **Install React, TypeScript and Tailwind CSS v4:**

   ```bash
   npm install react react-dom
   npm install -D typescript @types/react @types/react-dom tailwindcss @tailwindcss/vite
   ```

   Add the `@tailwindcss/vite` plugin to the Vite configuration that Reprise uses.

4. **Add the `@/` path alias** in `tsconfig.json`, pointing at the React folder. Add the same alias to the Vite config.

   ```jsonc
   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "paths": { "@/*": ["./assets/react/*"] }
     }
   }
   ```

5. **Set up the stylesheet**, for example `assets/styles/app.css`:

   ```css
   @import "tailwindcss";

   /* Tailwind must also scan Twig templates */
   @source "../../templates";

   /* Then paste the :root, .dark and @theme inline token blocks from
      this repository's src/index.css */
   ```

6. **Create `components.json` by hand** in the project root. shadcn has no Symfony template, so `shadcn init` doesn't apply.

   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "<copy the value from this repository's components.json>",
     "rsc": false,
     "tsx": true,
     "tailwind": {
       "config": "",
       "css": "assets/styles/app.css",
       "baseColor": "neutral",
       "cssVariables": true,
       "prefix": ""
     },
     "iconLibrary": "lucide",
     "aliases": {
       "components": "@/components",
       "ui": "@/components/ui",
       "utils": "@/lib/utils",
       "lib": "@/lib",
       "hooks": "@/hooks"
     }
   }
   ```

   Components then install into `assets/react/components/ui/`.

### Installing and using a component

1. **Install it:**

   ```bash
   npx shadcn@latest add <owner>/<repo>/button
   ```

2. **Create a controller component** in `assets/react/controllers/`. Symfony UX React can only mount files in that folder, and each one needs a **default export**. Registry components use named exports, so wrap them:

   ```tsx
   // assets/react/controllers/SaveButton.tsx
   import { Button } from '@/components/ui/button';

   export default function SaveButton({ label }: { label: string }) {
     return <Button onClick={() => console.log('saved')}>{label}</Button>;
   }
   ```

3. **Mount it from Twig:**

   ```twig
   <div {{ react_component('SaveButton', { label: 'Save' }) }}></div>
   ```

   Props come from Twig, so they must be plain data such as strings, numbers, arrays and objects, not functions.

### Things to know in Symfony

- **Each island is a separate React app.** Islands can't share React context. A component that needs a provider, such as a toast or tooltip provider, needs it inside every island that uses it. Alternatively, group related UI into one larger island.
- **Islands render after the JavaScript loads.** The Symfony UX React docs don't mention server-side rendering, so assume the area is empty until the script runs. Avoid using islands for content that must appear immediately.
- **All controllers are bundled up front.** Symfony UX React needs controllers registered with `eager: true`, so every controller adds to the page's JavaScript. Keep controllers few and purposeful.
- **The project needs Node.js** for the shadcn CLI and the front-end build, alongside PHP.
- **Twig-only pages** can still match the look by using the same Tailwind classes and theme tokens, but they don't get component behaviour such as keyboard handling, focus management or ARIA.

---

## Developing the registry

### Requirements

- Node.js 22 LTS (recommended)
- npm
- Chromium for Playwright, which the Storybook tests use:

  ```bash
  npx playwright install chromium
  ```

### Getting started

```bash
npm install
npm run dev          # builds the registry, then starts Vite
npm run storybook    # component workshop at http://localhost:6006
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Builds the registry into `public/r/` and starts the Vite dev server |
| `npm run build` | Type-checks and builds the Vite app |
| `npm run lint` | Runs ESLint |
| `npm run registry:build` | Builds `registry.json` into one JSON file per item in `public/r/` |
| `npm run registry:validate` | Checks `registry.json` and that every referenced file exists |
| `npm run storybook` | Starts Storybook on port 6006 |
| `npm run build-storybook` | Builds a static Storybook into `storybook-static/` |
| `npm test` | Runs the Storybook stories as tests (Vitest, browser mode) |

### Project structure

```
registry.json              # catalogue of registry items (the source of truth)
src/
  components/ui/           # one component per file, with its stories alongside
    button.tsx
    button.stories.tsx
  lib/utils.ts             # cn() helper
  index.css                # Tailwind and theme tokens
.storybook/                # Storybook config
public/r/                  # built registry output (generated, not committed)
```

### Testing an install locally

You don't need to push to GitHub to test a change. With `npm run dev` running, install from the local build in a separate test project:

```bash
npx shadcn@latest add http://localhost:5173/r/button.json
```

---

## Adding a component

1. **Start from shadcn's version** if one exists. It copies the component into `src/components/ui/`, where you then adapt it:

   ```bash
   npx shadcn@latest add <component>
   ```

2. **Add `"use client"`** as the first line if the component uses state, effects, event handlers or interactive Base UI parts. Vite doesn't need it, so a missing directive won't show up here, but it breaks the component on server-rendered Next.js pages.

   This repository's `components.json` sets `"rsc": true`, so the CLI keeps the directive on components pulled from shadcn. With `"rsc": false` the CLI strips it.

3. **Write a story** next to it (`<component>.stories.tsx`) that covers each variant and state.

4. **Add an item to `registry.json`:**

   ```json
   {
     "name": "button",
     "type": "registry:ui",
     "title": "Button",
     "description": "Short description shown by the CLI.",
     "dependencies": ["@base-ui/react", "class-variance-authority"],
     "registryDependencies": ["utils"],
     "files": [{ "path": "src/components/ui/button.tsx", "type": "registry:ui" }]
   }
   ```

   - **`dependencies`:** every npm package the file imports. They aren't detected automatically.
   - **`registryDependencies`:** shadcn's built-in items by name (e.g. `utils`), and this registry's own items as `<owner>/<repo>/<item>`.
   - **Files:** list only the component itself. Stories and tests stay out of the registry.

5. **Validate and build:**

   ```bash
   npm run registry:validate
   npm run registry:build
   ```

6. **Test the install** in a separate project (see [Testing an install locally](#testing-an-install-locally)). Check that the component works as a Symfony UX React island: wrapped in a default-export controller, with props passed as plain data. If Next.js projects use the registry too, test there as well.

7. **Update [CHANGELOG.md](CHANGELOG.md)** under the item's name.

---

## Component conventions

These keep components portable, so they can later move into an npm package unchanged.

- **One component per file** in `src/components/ui/`, with named exports only (`export { Button, buttonVariants }`).
- **Imports only from three places:** npm packages, `@/lib/utils`, and other `@/components/ui/*` files. No routing, data fetching, global state or environment variables.
- **No framework-specific imports.** Never import `next/link`, `next/image`, `next/font` or similar. For components that can render as a link, use Base UI's `render` prop, so the project passes in its own router link.
- **No fonts.** Fonts are set by the project (for example `next/font` in Next.js). Components inherit them.
- **`"use client"` on interactive components** (see [Adding a component](#adding-a-component)).
- **Theme tokens only** (`bg-primary`, `border-input`, `ring-ring`), never hard-coded colours, so components follow the installing project's theme.
- **Pass through `className`, `ref` and remaining props**, so callers can extend components without editing them.
- **Accessible states:**
  - Focus rings at full strength. Avoid `ring-ring/50`.
  - Checked and selected states must be distinguishable at 3:1 contrast.

---

## Testing

- **Storybook stories are the test cases.** `@storybook/addon-vitest` runs every story in a real browser through Vitest and Playwright. Add `play` functions for interaction tests.
- **Accessibility:** `@storybook/addon-a11y` runs axe checks on each story. Automated checks only catch part of WCAG, so keyboard use, focus order and screen reader output still need checking by hand.
- **CI** (`.github/workflows/ci.yml`) runs type-checking, lint, registry validation, the registry build and the Storybook build on every push and pull request.

---

## Versioning

- Releases are git tags in the form `vMAJOR.MINOR.PATCH`. Projects pin to them with `#vX.Y.Z`.
- Each release has entries in [CHANGELOG.md](CHANGELOG.md), grouped by item, so projects can see which copied components to update.

---

## Limitations

- **Updates aren't automatic.** Installed components are copies, so projects must re-install to pick up fixes.
- **Pins aren't passed to dependencies.** Each dependency needs its own `#ref`.
- **Unclear errors for private repos.** "Not found" can also mean "no access". If an install fails, run `gh auth status` first.
- **React only.** In Symfony, components run as React islands inside Twig pages, not as Twig components. See [Using components in Symfony](#using-components-in-symfony).
- **github.com only.** GitHub Enterprise hosts aren't supported for installing directly from a repository.
- **Installs from CI** need `GH_TOKEN` set to a fine-grained token with read-only Contents access to this repository.