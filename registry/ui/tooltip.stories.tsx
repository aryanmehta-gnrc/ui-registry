import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
