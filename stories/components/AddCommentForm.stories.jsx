import React from "react";

import AddCommentForm from "../../components/AddCommentForm";

export default {
  title: "Components/AddCommentForm",
  component: AddCommentForm,
};

const Template = (args) => <AddCommentForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  feedbackId: "3",
  // replyToCommentId: "1",
};
