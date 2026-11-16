# DSE UI registry

React components for DSE web applications, built on [Base UI](https://base-ui.com) and Tailwind CSS v4 and installed with the [shadcn CLI](https://ui.shadcn.com/docs/registry).

> **Status: experimental.** This is a test registry. Components, names and docs may change without notice.

## Use a component

Requirements: React 19, Tailwind CSS v4, Node.js 22.18+, and shadcn initialised with `npx shadcn@latest init -b base`.

The repository is private, so sign in first with **one** of:

```bash
gh auth login
# or a fine-grained token with Contents: Read-only on this repo
export GH_TOKEN=github_pat_xxxxxxxx
```

Then add a component:

```bash
npx shadcn@latest add aryanmehta-gnrc/ui-registry/button
```

The CLI copies the source into your project, so it doesn't update itself. The full guides (installing, updating and Next.js) are in Storybook under **Getting Started**.

Never commit a token or paste it into an issue or chat.

## Documentation

| For              | Where                                                                |
| ---------------- | -------------------------------------------------------------------- |
| Using components | Storybook: run `npm run storybook` (hosted version to follow)        |
| What's planned   | [COMPONENTS.md](COMPONENTS.md)                                       |
| What changed     | [CHANGELOG.md](CHANGELOG.md)                                         |
| Contributing     | [CONTRIBUTING.md](CONTRIBUTING.md) and [contributing/](contributing) |

## Develop

Use the Node version in `.nvmrc` (`nvm use`), then:

```bash
npm ci
npm run storybook        # docs and stories at http://localhost:6006
npm run check            # lint, types, registry validation and checks
npx playwright test      # accessibility sweep and end-to-end tests
```

## Repository layout

```
registry/
  ui/            components: <name>.tsx, <name>.stories.tsx, <name>.mdx (flat, no subfolders)
  lib/           shared helpers
  hooks/         shared hooks
  index.css      theme tokens
docs/            Storybook pages (.mdx) for people using the components
contributing/    guides for people building the components
tests/           Playwright: accessibility sweep, e2e tests, fixtures
scripts/         check-registry.ts
registry.json    the list of installable items
```
