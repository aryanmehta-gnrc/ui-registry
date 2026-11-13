import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
