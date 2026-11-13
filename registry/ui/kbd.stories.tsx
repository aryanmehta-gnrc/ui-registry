import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "./kbd";

const meta = {
  title: "Data Display/Kbd",
  component: Kbd,
} satisfies Meta<typeof Kbd>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
