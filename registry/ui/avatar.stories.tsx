import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
