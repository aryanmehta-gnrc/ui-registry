import type { Meta, StoryObj } from "@storybook/react-vite";
import { DSEiDAuthCard } from "./dseid-auth-card";

const meta = {
  title: "Blocks/Auth Card",
  component: DSEiDAuthCard,
} satisfies Meta<typeof DSEiDAuthCard>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export default meta;
