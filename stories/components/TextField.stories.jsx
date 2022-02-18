import React from "react";

import TextField from "../../components/UI/TextField";

export default {
  title: "UI/TextField",
  component: TextField,
};

const Template = (args) => <TextField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: "",
  help: "Add a short descriptive headline",
  label: "Feedback Title",
  inputName: "title",
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  className: "",
  help: "Add a short descriptive headline",
  label: "Feedback Title",
  inputName: "title",
  errors: ["Feedback should be more than 30 characters"],
};
