import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "components/Input",
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    label: "Enter text",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
    label: "Password",
  },
};
