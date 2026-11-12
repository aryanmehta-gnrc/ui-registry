import type { Meta, StoryObj } from "@storybook/react-vite"

import { AuthCard } from "./auth-card"

// Stand-in brand mark; projects pass their own logo.
const logo = (
  <span className="text-4xl font-medium tracking-tight text-muted-foreground">
    DSE<span className="text-primary">iD</span>
  </span>
)

const meta = {
  title: "Blocks/Auth Card",
  component: AuthCard,
  args: {
    // A function action keeps Storybook from navigating away on submit
    action: () => {},
    logo,
    title: "Welcome",
    description: "Log in to Deep Sea Electronics to continue to All Applications.",
    forgotHref: "#",
    signUpHref: "#",
    passkeyHref: "#",
  },
  argTypes: {
    action: { control: false },
    logo: { control: false },
  },
} satisfies Meta<typeof AuthCard>

export default meta
type Story = StoryObj<typeof meta>

/** Matches the design: all links and the passkey option shown. */
export const Default: Story = {}

/** After a failed attempt: username kept, error announced to screen readers. */
export const WithError: Story = {
  args: {
    defaultUsername: "123456789",
    error: "We couldn't find an account with that username.",
  },
}

/** Only the required parts: no links, no passkey. */
export const Minimal: Story = {
  args: {
    forgotHref: undefined,
    signUpHref: undefined,
    passkeyHref: undefined,
  },
}

/** Passkey handled in JavaScript (React apps) rather than by a link. */
export const PasskeyHandler: Story = {
  args: {
    passkeyHref: undefined,
    onPasskey: () => {},
  },
}