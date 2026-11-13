import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./field";

const meta = {
  title: "Forms/Field",
  component: Field,
} satisfies Meta<typeof Field>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
