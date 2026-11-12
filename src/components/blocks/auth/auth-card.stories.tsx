import type { Meta, StoryObj } from "@storybook/react-vite"

import { AuthCard } from "./auth-card"


const meta = {
  title: "Blocks/Auth Card",
  component: AuthCard,
} satisfies Meta<typeof AuthCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}