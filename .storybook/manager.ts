import { addons } from "storybook/manager-api";

import { dseManagerTheme } from "./dse-theme";

addons.setConfig({
  theme: dseManagerTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [
      "getting-started",
      "foundations",
      "components",
      "blocks",
      "patterns",
      "pages",
    ],
  },
  panelPosition: "bottom",
});
