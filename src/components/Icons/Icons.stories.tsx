import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icons";

const meta: Meta<typeof Icon> = {
  title: "components/Icon",
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Add: Story = {
  args: {
    name: "add",
    size: 24,
  },
};

export const Delete: Story = {
  args: {
    name: "delete",
    size: 24,
  },
};
