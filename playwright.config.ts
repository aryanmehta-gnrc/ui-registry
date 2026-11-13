import { defineConfig, devices } from "@playwright/test";

const PORT = 6007;

export default defineConfig({
  testDir: "./tests",
  // Only *.spec.ts: the theme contrast test (*.test.ts) runs in Vitest
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  // Starts Storybook for the tests, or reuses one already running
  webServer: {
    command: `npx storybook dev -p ${PORT} --ci --no-open`,
    url: `http://localhost:${PORT}/index.json`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      // Node 26 warns that module.register() is deprecated (DEP0205). The warning comes
      // from a Storybook dependency, not our code. Remove once Storybook updates.
      NODE_OPTIONS: "--disable-warning=DEP0205",
    },
  },
});
