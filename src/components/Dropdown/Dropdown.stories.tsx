import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Dropdown";

const meta: Meta<typeof Select> = {
  title: "components/Select",
  component: Select,
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Department",
    options: [
      { label: "Computer Science", value: "cs" },
      { label: "Electrical", value: "ee" },
      { label: "Mechanical", value: "me" },
    ],
  },
};

export const WithPreSelectedValue: Story = {
  args: {
    label: "Department",
    value: "cs",
    options: [
      { label: "Computer Science", value: "cs" },
      { label: "Electrical", value: "ee" },
      { label: "Mechanical", value: "me" },
    ],
  },
};
