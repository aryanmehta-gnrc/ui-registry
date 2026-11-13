# ui-registry

A [shadcn registry](https://ui.shadcn.com/docs/registry) of React components built on Base UI and Tailwind CSS v4. The shadcn CLI copies a component's source into your project.

> **Status:** experimental.

## Using a component

**Requirements**

- A React project with Tailwind CSS v4 and shadcn initialised (`npx shadcn@latest init -b base`).
- Read access to this repository.
- Node.js 26 (see `.nvmrc`). Minimum 22.18.

**1. Sign in.** This repository is private. Use either of these:

- **A token:** create a fine-grained token with access to this repository only and **Contents: Read-only**, then:
  ```bash
  export GH_TOKEN=github_pat_xxxxxxxx
  ```
- **The GitHub CLI:**
  ```bash
  gh auth login
  ```

**2. Install a component:**

```bash
npx shadcn@latest add aryanmehta-gnrc/ui-registry/button
```

**3. Pin a version** (optional):

```bash
npx shadcn@latest add aryanmehta-gnrc/ui-registry/button#v0.1.0
```

**Updating:** installed components are copies, so they don't update themselves. Re-run `add` with `--diff` to compare with your copy, or with `--overwrite` to replace it (local edits are lost).

## Symfony

Components run as React islands inside Twig pages, using [Symfony UX React](https://symfony.com/bundles/ux-react) and a Node build such as [Symfony Reprise](https://symfony.com/bundles/reprise/current/index.html).

- Create `components.json` by hand (shadcn has no Symfony template), with `"rsc": false` and aliases pointing at `assets/react/`.
- Wrap each component in a default-export controller in `assets/react/controllers/`, then mount it from Twig:
  ```twig
  <div {{ react_component('SaveButton', { label: 'Save' }) }}></div>
  ```
- Each island is a separate React app and can't share providers with other islands.

## Developing

```bash
npm install
npm run dev                  # builds the registry and starts Vite
npm run storybook            # http://localhost:6006
npm run registry:validate    # checks registry.json
```

### Adding a component

1. Add the file to `src/components/ui/`, starting from shadcn's version if there is one: `npx shadcn@latest add <component>`.
2. Put `"use client"` on the first line if the component is interactive.
3. Add a story next to it (`<component>.stories.tsx`).
4. Add an entry to `registry.json`:
   ```json
   {
     "name": "button",
     "type": "registry:ui",
     "dependencies": ["@base-ui/react", "class-variance-authority"],
     "registryDependencies": ["utils"],
     "files": [
       { "path": "src/components/ui/button.tsx", "type": "registry:ui" }
     ]
   }
   ```

   - **`dependencies`:** list every npm package the file imports.
   - **`registryDependencies`:** refer to this registry's own items in full, e.g. `aryanmehta-gnrc/ui-registry/input`.
5. Run `npm run registry:validate`, then push. Tag releases as `vX.Y.Z`.

### Rules for components

- One component per file, with named exports only.
- Import only from npm packages, `@/lib/utils` and `@/components/ui/*`.
- Use theme tokens (`bg-primary`, `border-input`), never hard-coded colours.
- No framework-specific imports (`next/link` and similar) and no fonts.
