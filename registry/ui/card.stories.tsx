import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";

const meta = {
  title: "Data Display/Card",
  component: Card,
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export default meta;
