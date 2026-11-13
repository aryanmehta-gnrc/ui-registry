import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRightIcon, DownloadIcon, RefreshCwIcon } from "lucide-react";

import { Button, buttonVariants } from "./button";
import { Spinner } from "./spinner";

const meta = {
  title: "Actions/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
      description:
        "Visual style. Use one `default` button per area for the main action.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: [
        "xs",
        "sm",
        "default",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
      description:
        "Height and padding. The `icon` sizes are square, for icon-only buttons.",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: { control: "boolean", description: "Prevents interaction." },
    children: { control: "text", description: "Button label." },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The primary button. Use the controls to try every variant and size. */
export const Default: Story = {};

/** All six variants side by side. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

/** Sizes from `xs` to `lg`. Prefer `default`; use `sm` and `xs` in dense areas such as table rows. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} size="xs">
        Extra small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

/** An icon before or after the label. The icon is decorative; the text is the label. */
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args}>
        <DownloadIcon aria-hidden="true" />
        Export CSV
      </Button>
      <Button {...args} variant="outline">
        View details
        <ArrowRightIcon aria-hidden="true" />
      </Button>
    </div>
  ),
};

/** Icon-only buttons in each size. Each needs an `aria-label`, and ideally a tooltip showing the same text. */
export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
        <Button
          key={size}
          {...args}
          size={size}
          variant="outline"
          aria-label="Refresh data"
        >
          <RefreshCwIcon aria-hidden="true" />
        </Button>
      ))}
    </div>
  ),
};

/** Disabled buttons can't be focused or clicked. Where possible, explain why the action is unavailable. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** While an action runs: disable the button, show a spinner and change the label. */
export const Loading: Story = {
  render: (args) => (
    <Button {...args} disabled>
      <Spinner aria-hidden="true" />
      Saving…
    </Button>
  ),
};

/**
 * A link styled as a button, for navigation. Use `buttonVariants` on a plain `<a>` (or your router's link),
 * so screen readers announce it as a link. Don't use `<Button render={<a />}>`: Base UI adds `role="button"`.
 */
export const AsLink: Story = {
  render: () => (
    <a href="#" className={buttonVariants({ variant: "default" })}>
      Open dashboard
    </a>
  ),
};
