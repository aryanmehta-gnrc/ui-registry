# Decisions

Choices future contributors might otherwise question or undo, and why they were made. Add new decisions at the end. Don't delete old ones: if a decision changes, mark it superseded and add a new one.

| No. | Decision                                                   | Status   |
| --- | ---------------------------------------------------------- | -------- |
| 1   | Distribute with the shadcn CLI from a private GitHub repo  | Accepted |
| 2   | Keep `registry/ui` flat                                    | Accepted |
| 3   | Import aliases that survive install                        | Accepted |
| 4   | Base UI and the `base-nova` style                          | Accepted |
| 5   | Docs pages next to each component                          | Accepted |
| 6   | Storybook uses a showcase theme; projects own their tokens | Accepted |
| 7   | Storybook for users, repo for contributors                 | Accepted |

Decisions 1 to 6 were written up on 16 November 2026 for choices made earlier.

---

## 1. Distribute with the shadcn CLI from a private GitHub repo

**Status:** Accepted · **Date:** 16 November 2026

**Context.** Components need to reach React apps built with Vite or Next.js. The options were an npm package (public or private registry) or shadcn's copy-the-source model.

**Decision.** Publish a shadcn registry (`registry.json`) from this private GitHub repository. Projects install with `npx shadcn@latest add aryanmehta-gnrc/ui-registry/<name>`, authenticated by `gh` or a read-only `GH_TOKEN`.

**Consequences.**

- Projects own their copy and can read and adapt it; no package hosting is needed.
- Updates aren't automatic. Projects re-install with `--diff` or `--overwrite`, so breaking changes must be clearly recorded.
- Pins (`#v0.2.0`) apply per component; dependencies come from the latest version unless pinned too.
- Everyone installing needs read access to the repository.

---

## 2. Keep `registry/ui` flat

**Status:** Accepted · **Date:** 16 November 2026

**Context.** With many components, grouping them in subfolders (`ui/forms/`, `ui/overlays/`) looked tidier.

**Decision.** `registry/ui/` stays flat. Grouping happens in Storybook titles (`Components/Forms/Input`) instead.

**Consequences.**

- Tested: with nested folders, the shadcn CLI rewrote imports between components wrongly in the installed project.
- Each component's files sit side by side: `<name>.tsx`, `<name>.stories.tsx`, `<name>.mdx`.

---

## 3. Import aliases that survive install

**Status:** Accepted · **Date:** 16 November 2026

**Context.** The CLI rewrites imports to match each project's `components.json` aliases. Some import forms are rewritten correctly and others aren't.

**Decision.**

- Components: `@/registry/ui/<name>`
- Helpers: `@/lib/<name>`; hooks: `@/hooks/<name>`
- `cn` from the `cn` npm package
- No relative imports; never `@/registry/lib` or `@/registry/hooks`

`tsconfig` paths and the Vite aliases map these to `registry/`.

**Consequences.**

- Installed files import correctly in Vite and Next.js projects.
- `scripts/check-registry.ts` flags the forbidden forms.

---

## 4. Base UI and the `base-nova` style

**Status:** Accepted · **Date:** 16 November 2026

**Context.** shadcn components can be built on Radix or Base UI.

**Decision.** Use Base UI, with shadcn's `base-nova` style, React 19 and Tailwind CSS v4.

**Consequences.**

- Projects initialise shadcn with `npx shadcn@latest init -b base`.
- Base UI's `render` prop replaces Radix's `asChild`. Rendering a Button as an `<a>` gives it `role="button"`, so screen readers announce a link as a button. Links use `buttonVariants` on an `<a>` (or Next.js `Link`) instead.

---

## 5. Docs pages next to each component

**Status:** Accepted · **Date:** 16 November 2026

**Context.** Storybook can generate a Docs page from stories (`autodocs`) or use a hand-written MDX page. Docs kept in a separate folder drift from the code.

**Decision.** Each component has `registry/ui/<name>.mdx`, attached with `<Meta of={Stories} name="Docs" />`, and no `autodocs` tag.

**Consequences.**

- Usage and accessibility guidance change in the same pull request as the code.
- The registry check requires the page.
- MDX isn't GitHub Markdown: tables are written as HTML (see [conventions.md](conventions.md)).

---

## 6. Storybook uses a showcase theme; projects own their tokens

**Status:** Accepted · **Date:** 16 November 2026

**Context.** Components use theme tokens (`--primary`, `--muted-foreground`, `--ring` and so on) and never hard-code colours. Each project that installs them has its own theme, so the token values used in Storybook don't travel with the components.

Storybook still needs values to show the components and run the accessibility sweep. With shadcn's default neutral theme, the sweep failed contrast on three light-mode tokens.

**Decision.**

- `registry/index.css` is a **showcase theme for Storybook only**. It isn't part of any registry item and isn't installed into projects.
- It's shadcn's neutral theme, with these light-mode changes so the sweep tests the components rather than failing on the default palette:

  | Token                | Value                     | Reason                                     |
  | -------------------- | ------------------------- | ------------------------------------------ |
  | `--ring`             | `oklch(0.556 0 0)`        | Default focus ring was 2.59:1 on white     |
  | `--muted-foreground` | `oklch(0.53 0 0)`         | Default was 4.34:1 on muted backgrounds    |
  | `--destructive`      | `oklch(0.51 0.21 27.325)` | Default was 4.05:1 on the destructive tint |

- Component code does change one thing, whatever the theme: focus rings use `ring-ring` at full strength, not `ring-ring/50`.

**Consequences.**

- Whether text and controls meet contrast in a product depends on that product's theme. The Accessibility page in Storybook lists the token pairs projects must check.
- A passing sweep in Storybook shows the components work with
