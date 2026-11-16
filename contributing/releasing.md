# Releasing

The whole registry is versioned together with Git tags. Projects install the latest `main` by default, or pin a tag:

```bash
npx shadcn@latest add aryanmehta-gnrc/ui-registry/button#v0.2.0
```

> This is the process for the test registry. Before product teams depend on it, agree a release process with the team that owns it.

## Choosing the version

Versions are `vMAJOR.MINOR.PATCH`. While below `v1.0.0`, anything may change; from `v1.0.0`:

| Change                                                                                | Version   |
| ------------------------------------------------------------------------------------- | --------- |
| Renamed or removed prop, variant or export; changed default; token renamed or removed | **Major** |
| New component, variant, prop or token                                                 | **Minor** |
| Bug fix, style fix, docs                                                              | **Patch** |

## Steps

1. **Check `main` is ready.**

   ```bash
   git switch main && git pull
   npm ci
   npm run check
   npx playwright test
   ```

2. **Try an install** of the changed components into a test project from `main`.
3. **Update `CHANGELOG.md`.** Rename `Unreleased` to the version and date, and start a new empty `Unreleased` section:

   ```md
   ## Unreleased

   ## v0.2.0 (16 November 2026)
   ```

   For breaking changes, say how to update.

4. **Commit, tag and push.**

   ```bash
   git commit -am "Release v0.2.0"
   git tag -a v0.2.0 -m "v0.2.0"
   git push origin main v0.2.0
   ```

5. **Create a GitHub release** from the tag, with the changelog section as its notes.
6. **Update the roadmap** statuses in `COMPONENTS.md` if anything changed.

## Fixing a mistake

Tags are never moved or reused: projects may have pinned them. Fix forward with a new patch version, and note the problem in the changelog entry for the bad version.
