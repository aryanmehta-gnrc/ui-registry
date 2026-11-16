# Contributing

How to add or change a component. Read [contributing/conventions.md](contributing/conventions.md) before writing code; the import rules there are easy to get wrong and break installs.

## Adding a component

1. **Pick it from the roadmap.** Take the next item in [COMPONENTS.md](COMPONENTS.md); each phase only depends on earlier ones. Set its status to 🟡.
2. **Create a branch.**

   ```bash
   git switch -c feature/<name>
   ```

3. **Add the files** in `registry/ui/` (flat, no subfolders):

   | File                 | What it is                                    |
   | -------------------- | --------------------------------------------- |
   | `<name>.tsx`         | The component, with JSDoc on its main export  |
   | `<name>.stories.tsx` | Every variant and state listed in the roadmap |
   | `<name>.mdx`         | Its Docs page                                 |

   For a shadcn component, start from the shadcn source for the `base-nova` style, then apply the conventions.

4. **Add an e2e test** in `tests/e2e/<name>.spec.ts` if it's interactive. See [contributing/testing.md](contributing/testing.md).
5. **Add it to `registry.json`**, with `"meta": { "interactive": true }` if it has an e2e test.
6. **Check it.**

   ```bash
   npm run check
   npx playwright test -g "<Storybook title>"
   ```

7. **Try installing it** into a test project from your branch:

   ```bash
   npx shadcn@latest add aryanmehta-gnrc/ui-registry/<name>#feature/<name>
   ```

8. **Open a pull request** and add a line under `Unreleased` in [CHANGELOG.md](CHANGELOG.md).

## Pull request checklist

- [ ] Files follow [conventions.md](contributing/conventions.md): flat `registry/ui`, `@/` imports only, theme tokens only
- [ ] Stories cover every variant and state
- [ ] Docs page: when to use, when not to, accessibility
- [ ] Keyboard-only check done by hand
- [ ] `npm run check` passes
- [ ] Accessibility sweep and e2e tests pass
- [ ] Installs cleanly into a test project
- [ ] `CHANGELOG.md` updated
- [ ] Roadmap status updated

## Changing an existing component

Installed components are copies in other projects, so think about the people updating:

- Renaming or removing a prop, variant or export is a **breaking change**. Say so in the changelog and explain how to update.
- Prefer adding a variant or prop over changing a default.
- Changing a token in `registry/index.css` only affects the Storybook showcase theme, but run the full accessibility sweep anyway.

## Recording decisions

If you make a choice future contributors would otherwise question (a folder rule, a dependency, a pattern), add it to [contributing/decisions.md](contributing/decisions.md).
