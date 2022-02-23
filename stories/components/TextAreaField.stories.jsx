import React from "react";

import TextAreaField from "../../components/UI/TextAreaField";

export default {
  title: "UI/TextAreaField",
  component: TextAreaField,
};

const Template = (args) => <TextAreaField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: "",
  help: "Include any specific comments on what should be improved, added, etc.",
  label: "Feedback Detail",
  inputName: "description",
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  className: "",
  help: "Include any specific comments on what should be improved, added, etc.",
  label: "Feedback Detail",
  inputName: "description",
  errors: ["Feedback Detail should be less than 350 characters"],
};

export const WriteComment = Template.bind({});
WriteComment.args = {
  className: "",
  label: "Add Comment",
  inputName: "comment",
  placeholder: "Type your comment here",
  labelSize: "text-lg",
};
