import type { Preview } from "@storybook/react-vite";

import "../registry/index.css";

import { dseDocsTheme } from "./dse-theme";

const preview: Preview = {
  parameters: {
    /* Layout ------------------------------------------------------------ */
    // Space around every story. Full-page stories set layout: "fullscreen".
    layout: "padded",

    /* Sidebar ----------------------------------------------------------- */
    // Top-level groups come from the first part of each story's title
    // ("Forms/Input" → Forms). Nested arrays order pages inside a group.
    // Must stay inline: Storybook reads it without running this file.
    options: {
      storySort: {
        order: [
          // Docs pages (docs/)
          "Introduction",
          "Getting Started",
          ["Installation", "Updating"],
          "Foundations",
          ["Typography", "Spacing", "Icons", "Accessibility", "Colours"],

          // For contributors
          "Engineering",

          "Patterns",

          // Components (registry/ui/)
          "Actions",
          "Forms",
          "Data Display",
          "Feedback",
          "Overlays",
          "Navigation",
          "Layout",
          "Charts",

          // Composed pieces and full screens
          "Blocks",
          "Pages",

          "*",
        ],
      },
    },

    /* Docs pages -------------------------------------------------------- */
    docs: {
      theme: dseDocsTheme,
    },

    /* Controls panel ---------------------------------------------------- */
    // Colour picker for props ending in "color"/"background",
    // date picker for props ending in "Date".
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /* Accessibility (addon-a11y) ---------------------------------------- */
    // "error": violations fail the story's test (Storybook test panel and Vitest)
    // "todo":  violations are shown but don't fail
    // "off":   no checks
    // Override per story with: parameters: { a11y: { test: "todo" } }
    a11y: {
      test: "error",
    },
  },
};

export default preview;
