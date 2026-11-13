import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Forms/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Site name" },
  argTypes: {
    children: { control: "text", description: "Label text." },
    htmlFor: {
      control: "text",
      description: "The `id` of the control this label names.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Names a form control. Clicking the label focuses the control.

\`\`\`bash
npx shadcn@latest add aryanmehta-gnrc/ui-registry/label
\`\`\`
\`\`\`tsx
import { Label } from "@/components/ui/label"
\`\`\`

**When to use**
- Every input, select, checkbox and switch needs a visible label. Placeholders are not labels.
- Inside forms, prefer **Field** with \`FieldLabel\`, which also handles descriptions and errors.

**Accessibility**
- Link the label to its control with \`htmlFor\` matching the control's \`id\`.
- Mark required fields with \`required\` on the control. A visual asterisk alone isn't announced.
`,
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A label linked to an input with `htmlFor`. Click the label to focus the input. */
export const Default: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} htmlFor="site-name" />
      <Input id="site-name" />
    </div>
  ),
};

/** The asterisk is hidden from screen readers; `required` on the input announces it instead. */
export const Required: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} htmlFor="serial">
        Serial number
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </Label>
      <Input id="serial" required />
    </div>
  ),
};

/** The label dims when its input is disabled. */
export const Disabled: Story = {
  render: (args) => (
    <div className="group grid w-72 gap-2" data-disabled="true">
      <Label {...args} htmlFor="firmware">
        Firmware version
      </Label>
      <Input id="firmware" defaultValue="V2.4.1" disabled />
    </div>
  ),
};
