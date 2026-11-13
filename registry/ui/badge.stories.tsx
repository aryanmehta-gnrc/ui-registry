import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Data Display/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
