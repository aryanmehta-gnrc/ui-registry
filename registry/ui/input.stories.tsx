import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta = {
  title: "Forms/Input",
  component: Input,
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export default meta;
