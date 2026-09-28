import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    buttonType: "primary", // updated
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    buttonType: "secondary", // updated
  },
};
