import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
