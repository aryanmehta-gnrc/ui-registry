import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../docs/*.mdx", // single *: only files directly in docs/
    {
      directory: "../docs/getting-started",
      files: "**/*.mdx",
      titlePrefix: "Getting Started",
    },
    {
      directory: "../docs/foundations",
      files: "**/*.mdx",
      titlePrefix: "Foundations",
    },
    {
      directory: "../docs/patterns",
      files: "**/*.mdx",
      titlePrefix: "Patterns",
    },
    {
      directory: "../docs/engineering",
      files: "**/*.mdx",
      titlePrefix: "Engineering",
    },
    "../docs/examples/**/*.stories.@(ts|tsx)",
    "../registry/**/*.mdx",
    "../registry/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["./public"],
};
export default config;
