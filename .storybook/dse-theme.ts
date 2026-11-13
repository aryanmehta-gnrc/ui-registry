import { create } from "storybook/theming";

// Storybook interface: dark, so the white logo shows
export const dseManagerTheme = create({
  base: "dark",
  brandTitle: "DSE UI",
  brandUrl: "https://github.com/aryanmehta-gnrc/ui-registry",
  brandTarget: "_blank",
  brandImage: "/brand/logo-white.svg",

  colorPrimary: "#fafafa",
  colorSecondary: "#fafafa",

  appBg: "#262626",
  appContentBg: "#171717",
  appPreviewBg: "#ffffff",
  appHoverBg: "#333333",
  appBorderColor: "#404040",
  appBorderRadius: 8,

  fontBase: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',

  textColor: "#fafafa",
  textInverseColor: "#262626",
  textMutedColor: "#a1a1a1",

  barBg: "#262626",
  barTextColor: "#a1a1a1",
  barHoverColor: "#fafafa",
  barSelectedColor: "#fafafa",

  buttonBg: "#262626",
  buttonBorder: "#525252",
  booleanBg: "#171717",
  booleanSelectedBg: "#404040",
  inputBg: "#171717",
  inputBorder: "#8c8c8c",
  inputTextColor: "#fafafa",
  inputBorderRadius: 6,
});

// Docs pages: light, matching the components
export const dseDocsTheme = create({
  base: "light",
  colorPrimary: "#262626",
  colorSecondary: "#262626",
  appBg: "#fafafa",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  appBorderRadius: 8,
  fontBase: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
  textColor: "#262626",
  textInverseColor: "#ffffff",
  textMutedColor: "#525252",
});
