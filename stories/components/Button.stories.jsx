import React from "react";

import Button from "../../components/UI/Button";

export default {
  title: "UI/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "+ Add Feedback",
  role: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Edit Feedback",
  role: "secondary",
};

export const Default = Template.bind({});
Default.args = {
  children: "Cancel",
  role: "default",
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Delete",
  role: "danger",
};
