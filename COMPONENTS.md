# Roadmap

The components planned for the registry, in build order. Each phase only depends on earlier ones.

**Status:** ✅ done · 🟡 in progress · ⬜ to do · ⏸️ on hold

## Phases at a glance

| Phase | Name                  | Goal                                                     | Status |
| ----- | --------------------- | -------------------------------------------------------- | ------ |
| 0     | Foundations           | Docs pages, conventions and testing in place             | 🟡     |
| 1     | Core                  | The building blocks every other component uses           | 🟡     |
| 2     | Form controls         | Everything needed for a form or filter panel             | ⬜     |
| 3     | Overlays and feedback | Extra content on demand; loading, empty and error states | ⬜     |
| 4     | Navigation and layout | App structure: sidebar, tabs, page header                | ⬜     |
| 5     | Data display          | Tables, status, how fresh data is                        | ⬜     |
| 6     | Charts and filters    | Trends over time and choosing the period                 | ⬜     |
| 7     | Blocks                | Ready-made pieces apps build pages from                  | ⬜     |
| 8     | Example pages         | Full screens with a journey test each                    | ⬜     |

## Definition of done

A component is ✅ when:

- It has a named export, `@/` imports only, and uses theme tokens (no hard-coded colours)
- It has a JSDoc comment on its main export
- `<name>.stories.tsx` covers every variant and state listed below
- `<name>.mdx` documents it: when to use, when not to, accessibility
- It passes the accessibility sweep, and a keyboard-only check by hand
- It has `tests/e2e/<name>.spec.ts` if it's interactive (marked **E2E** below)
- It has a `registry.json` entry, and `npm run check` passes
- It installs cleanly into a test project

See [contributing/testing.md](contributing/testing.md) for how to write and run the tests.

---

## Phase 0: Foundations

**Goal:** documentation and conventions exist before components multiply.

| Status | Page               | Where                                               |
| ------ | ------------------ | --------------------------------------------------- |
| 🟡     | Introduction       | Storybook: Introduction                             |
| 🟡     | Installation       | Storybook: Getting Started / Installation           |
| 🟡     | Updating           | Storybook: Getting Started / Updating               |
| 🟡     | Accessibility      | Storybook: Foundations / Accessibility              |
| ⬜     | Typography         | Storybook: Foundations / Typography                 |
| ⬜     | Spacing and radius | Storybook: Foundations / Spacing                    |
| ⬜     | Icons              | Storybook: Foundations / Icons                      |
| ⏸️     | Colours            | Storybook: Foundations / Colours (waits for themes) |
| 🟡     | README             | `README.md`                                         |
| 🟡     | Contributing       | `CONTRIBUTING.md`                                   |
| 🟡     | Roadmap            | `COMPONENTS.md`                                     |
| 🟡     | Changelog          | `CHANGELOG.md`                                      |
| 🟡     | Conventions        | `contributing/conventions.md`                       |
| 🟡     | Testing            | `contributing/testing.md`                           |
| 🟡     | Releasing          | `contributing/releasing.md`                         |
| 🟡     | Decisions          | `contributing/decisions.md`                         |

---

## Phase 1: Core

**Goal:** the smallest building blocks. Almost everything else depends on these.

| Status | Component | Storybook title                    | Source | Depends on       | E2E |
| ------ | --------- | ---------------------------------- | ------ | ---------------- | --- |
| 🟡     | Button    | Components / Actions / Button      | shadcn | —                | ✓   |
| 🟡     | Label     | Components / Forms / Label         | shadcn | —                |     |
| 🟡     | Input     | Components / Forms / Input         | shadcn | —                | ✓   |
| 🟡     | Separator | Components / Layout / Separator    | shadcn | —                |     |
| 🟡     | Field     | Components / Forms / Field         | shadcn | label, separator |     |
| 🟡     | Card      | Components / Data Display / Card   | shadcn | —                |     |
| ⬜     | Badge     | Components / Data Display / Badge  | shadcn | —                |     |
| ⬜     | Tooltip   | Components / Overlays / Tooltip    | shadcn | —                | ✓   |
| ⬜     | Skeleton  | Components / Feedback / Skeleton   | shadcn | —                |     |
| ⬜     | Avatar    | Components / Data Display / Avatar | shadcn | —                |     |
| ⬜     | Kbd       | Components / Data Display / Kbd    | shadcn | —                |     |
| ⬜     | Spinner   | Components / Feedback / Spinner    | shadcn | —                |     |

**Stories**

- **Button:** Default, Variants, Sizes, WithIcon, IconOnly, Disabled, Loading, AsLink
- **Label:** Default, Required, Disabled
- **Input:** Default, Placeholder, WithLabel, Types, Disabled, Invalid
- **Separator:** Horizontal, Vertical
- **Field:** Default, WithDescription, WithError, Horizontal, Group, FieldSetWithLegend, Separator
- **Card:** Default, WithFooter, WithAction, Small, LongContent
- **Badge:** Default, Variants, WithIcon, Status
- **Tooltip:** Default, Open, Sides, OnIconButton, WithKbd
- **Skeleton:** Text, CardLoading, TableRows, WithAvatar
- **Avatar:** Image, Fallback, Sizes, WithBadge, Group
- **Kbd:** Single, Combination, InText
- **Spinner:** Default, Sizes, InButton, WithLabel

**E2E tests**

- **Button:** Tab focuses it; Enter and Space activate it; focus ring visible; disabled can't be focused
- **Input:** clicking the label focuses it; typing works; invalid sets `aria-invalid`
- **Tooltip:** appears on hover and keyboard focus; Escape hides it

**Done when:** every row is ✅ and installing `field` into a test project brings `label` and `separator` with it.

---

## Phase 2: Form controls

**Goal:** everything needed to build a form or a filter panel.

| Status | Component    | Storybook title                     | Source | Depends on                | E2E |
| ------ | ------------ | ----------------------------------- | ------ | ------------------------- | --- |
| ⬜     | Textarea     | Components / Forms / Textarea       | shadcn | —                         |     |
| ⬜     | Checkbox     | Components / Forms / Checkbox       | shadcn | —                         | ✓   |
| ⬜     | Switch       | Components / Forms / Switch         | shadcn | —                         | ✓   |
| ⬜     | Radio Group  | Components / Forms / Radio Group    | shadcn | —                         | ✓   |
| ⬜     | Select       | Components / Forms / Select         | shadcn | —                         | ✓   |
| ⬜     | Toggle       | Components / Actions / Toggle       | shadcn | —                         |     |
| ⬜     | Toggle Group | Components / Actions / Toggle Group | shadcn | toggle                    | ✓   |
| ⬜     | Popover      | Components / Overlays / Popover     | shadcn | —                         | ✓   |
| ⬜     | Calendar     | Components / Forms / Calendar       | shadcn | button                    | ✓   |
| ⬜     | Date Picker  | Components / Forms / Date Picker    | shadcn | popover, calendar, button | ✓   |
| ⬜     | Search Input | Components / Forms / Search Input   | build  | input                     |     |

**E2E tests**

- **Checkbox, Switch:** Space toggles; clicking the label toggles; checked state exposed
- **Radio Group:** arrow keys move selection; Tab enters and leaves the group as one stop
- **Select:** opens with Enter, Space or arrow keys; Enter selects; Escape closes; focus returns
- **Toggle Group:** arrow keys move between items; pressed state exposed
- **Popover:** opens on click; Escape closes; focus returns to the trigger
- **Calendar, Date Picker:** arrow keys move between days; Enter picks; disabled dates can't be picked

**Done when:** a complete form can be built from registry components alone and passes the accessibility sweep.

---

## Phase 3: Overlays and feedback

**Goal:** showing extra content on demand, and telling users what happened.

| Status | Component     | Storybook title                       | Source | Depends on       | E2E |
| ------ | ------------- | ------------------------------------- | ------ | ---------------- | --- |
| ⬜     | Dialog        | Components / Overlays / Dialog        | shadcn | button           | ✓   |
| ⬜     | Alert Dialog  | Components / Overlays / Alert Dialog  | shadcn | button           | ✓   |
| ⬜     | Sheet         | Components / Overlays / Sheet         | shadcn | —                | ✓   |
| ⬜     | Hover Card    | Components / Overlays / Hover Card    | shadcn | —                |     |
| ⬜     | Dropdown Menu | Components / Overlays / Dropdown Menu | shadcn | —                | ✓   |
| ⬜     | Command       | Components / Navigation / Command     | shadcn | dialog           | ✓   |
| ⬜     | Combobox      | Components / Forms / Combobox         | shadcn | popover, command | ✓   |
| ⬜     | Alert         | Components / Feedback / Alert         | shadcn | —                |     |
| ⬜     | Toast         | Components / Feedback / Toast         | shadcn | —                | ✓   |
| ⬜     | Progress      | Components / Feedback / Progress      | shadcn | —                |     |
| ⬜     | Empty         | Components / Feedback / Empty         | shadcn | —                |     |
| ⬜     | Error State   | Components / Feedback / Error State   | build  | empty, button    |     |

**E2E tests**

- **Dialog, Alert Dialog, Sheet:** focus moves inside on open; Tab stays inside; Escape closes; focus returns to the trigger
- **Dropdown Menu:** arrow keys move; Enter activates; Escape closes; typing jumps to items
- **Command, Combobox:** typing filters; arrow keys move; Enter selects; empty state when nothing matches
- **Toast:** announced to screen readers; its action is reachable by keyboard

**Done when:** every overlay passes the focus tests, and loading, empty, error and success states are all covered.

---

## Phase 4: Navigation and layout

**Goal:** the structure of an app.

| Status | Item              | Storybook title                      | Source | Depends on                                                     | E2E |
| ------ | ----------------- | ------------------------------------ | ------ | -------------------------------------------------------------- | --- |
| ⬜     | use-mobile (hook) | — (unit test)                        | shadcn | —                                                              |     |
| ⬜     | Scroll Area       | Components / Layout / Scroll Area    | shadcn | —                                                              |     |
| ⬜     | Collapsible       | Components / Layout / Collapsible    | shadcn | —                                                              | ✓   |
| ⬜     | Resizable         | Components / Layout / Resizable      | shadcn | —                                                              | ✓   |
| ⬜     | Tabs              | Components / Navigation / Tabs       | shadcn | —                                                              | ✓   |
| 🟡     | Breadcrumb        | Components / Navigation / Breadcrumb | shadcn | —                                                              |     |
| ⬜     | Sidebar           | Components / Navigation / Sidebar    | shadcn | use-mobile, sheet, tooltip, separator, skeleton, input, button | ✓   |
| ⬜     | Page Header       | Components / Layout / Page Header    | build  | breadcrumb, button                                             |     |

**Done when:** an empty app layout (sidebar, page header, tabbed content) can be built from registry components and works at phone width.

---

## Phase 5: Data display

**Goal:** showing records, values and how fresh they are.

| Status | Item             | Storybook title                              | Source                 | Depends on                                        | E2E |
| ------ | ---------------- | -------------------------------------------- | ---------------------- | ------------------------------------------------- | --- |
| ⬜     | format (helpers) | — (unit test)                                | build                  | —                                                 |     |
| ⬜     | Status Indicator | Components / Data Display / Status Indicator | build                  | —                                                 |     |
| ⬜     | Description List | Components / Data Display / Description List | build                  | —                                                 |     |
| ⬜     | Table            | Components / Data Display / Table            | shadcn                 | —                                                 |     |
| ⬜     | Pagination       | Components / Navigation / Pagination         | shadcn                 | button                                            | ✓   |
| ⬜     | Data Table       | Components / Data Display / Data Table       | build (TanStack Table) | table, pagination, dropdown-menu, checkbox, input | ✓   |
| ⬜     | Last Updated     | Components / Feedback / Last Updated         | build                  | format                                            |     |

**Done when:** a list of units can be shown as a sortable, filterable, paginated table with status, loading and empty states.

---

## Phase 6: Charts and filters

**Goal:** trends over time, and choosing which period and data to show.

| Status | Component         | Storybook title                        | Source            | Depends on                                      | E2E |
| ------ | ----------------- | -------------------------------------- | ----------------- | ----------------------------------------------- | --- |
| ⬜     | Chart             | Components / Charts / Chart            | shadcn (Recharts) | —                                               |     |
| ⬜     | Sparkline         | Components / Charts / Sparkline        | build             | chart                                           |     |
| ⬜     | Line Chart        | Components / Charts / Line Chart       | build             | chart                                           |     |
| ⬜     | Area Chart        | Components / Charts / Area Chart       | build             | chart                                           |     |
| ⬜     | Bar Chart         | Components / Charts / Bar Chart        | build             | chart                                           |     |
| ⬜     | Stat Tile         | Components / Data Display / Stat Tile  | build             | card, sparkline, format                         |     |
| ⬜     | Date Range Picker | Components / Forms / Date Range Picker | build             | popover, calendar, toggle-group, button         | ✓   |
| ⬜     | Filter Bar        | Components / Forms / Filter Bar        | build             | search-input, select, date-range-picker, button | ✓   |

**Chart rules:** chart colour tokens only, in order; a legend for two or more series; one y-axis per chart; a table or text alternative for every chart.

---

## Phase 7: Blocks

**Goal:** ready-made pieces apps assemble pages from, built only from earlier components.

| Status | Block      | Storybook title     | Built from                                                       | E2E |
| ------ | ---------- | ------------------- | ---------------------------------------------------------------- | --- |
| ⬜     | User Menu  | Blocks / User Menu  | dropdown-menu, avatar                                            | ✓   |
| ⬜     | App Shell  | Blocks / App Shell  | sidebar, page-header, user-menu                                  | ✓   |
| ⬜     | KPI Row    | Blocks / KPI Row    | stat-tile                                                        |     |
| ⬜     | Chart Card | Blocks / Chart Card | card, chart, toggle-group, date-range-picker, empty, error-state | ✓   |
| ⬜     | Alarm List | Blocks / Alarm List | table, badge, status-indicator, button, empty                    | ✓   |
| ⬜     | Unit Card  | Blocks / Unit Card  | card, status-indicator, description-list, sparkline              |     |
| ⬜     | Live Value | Blocks / Live Value | stat-tile, last-updated                                          |     |

**Done when:** each block installs into a test project with all its dependencies and works from props alone (no data fetching inside).

---

## Phase 8: Example pages

**Goal:** full screens showing the registry working as a whole. Storybook only; not installable.

| Status | Page        | Storybook title     | Uses                                                    |
| ------ | ----------- | ------------------- | ------------------------------------------------------- |
| ⬜     | Dashboard   | Pages / Dashboard   | app shell, KPI row, chart cards, alarm list             |
| ⬜     | Unit Detail | Pages / Unit Detail | page header, tabs, description list, charts, data table |
| ⬜     | Alarms      | Pages / Alarms      | filter bar, data table, sheet                           |
| ⬜     | Settings    | Pages / Settings    | fields, switches, dialogs                               |

**Done when:** each page passes the accessibility sweep and a keyboard-only journey test at desktop and phone width.

---

## On hold: themes

Brand themes, the extra status tokens (`success`, `warning`, `info`, `link`) and the Colours page are on hold. Until they return, components use shadcn's standard tokens only.
