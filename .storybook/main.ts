import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../docs/*.mdx",
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
    "../registry/**/*.mdx",
    "../registry/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["./public"],
};

export default config;
