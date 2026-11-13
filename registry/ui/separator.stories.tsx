import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "Layout/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
