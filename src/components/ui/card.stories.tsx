import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"

const meta = {
  title: "Components/Card",
  component: Card,
  args: { size: "default" },
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Header and content only. */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Generator 1</CardTitle>
        <CardDescription>Last updated 2 minutes ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Running normally. Load is 42% of rated output.</p>
      </CardContent>
    </Card>
  ),
}

/** Footer: the card removes its bottom padding and the footer gets a muted band. */
export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Scheduled maintenance</CardTitle>
        <CardDescription>Due in 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Oil and filter change, battery check and load bank test.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Postpone</Button>
        <Button>Book now</Button>
      </CardFooter>
    </Card>
  ),
}

/** Action: placed top-right, spanning the title and description rows. */
export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Site overview</CardTitle>
        <CardDescription>3 generators, 1 transfer switch</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>All units reporting.</p>
      </CardContent>
    </Card>
  ),
}

/** Small size: tighter spacing and a smaller title. */
export const Small: Story = {
  args: { size: "sm" },
  render: WithFooter.render,
}

/** Divider under the header, using the `.border-b` hook in CardHeader. */
export const WithHeaderDivider: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader className="border-b">
        <CardTitle>Alarms</CardTitle>
        <CardDescription>Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <p>No active alarms.</p>
      </CardContent>
    </Card>
  ),
}

/** Long text: checks wrapping and that the action stays aligned. */
export const LongContent: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>
          A deliberately long card title that wraps onto a second line to test layout
        </CardTitle>
        <CardDescription>
          A longer description that also wraps, to check spacing between the title and description rows.
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          Body text long enough to wrap several times inside the card, so you can check line length,
          padding at both sizes, and that nothing overflows the rounded corners.
        </p>
      </CardContent>
    </Card>
  ),
}