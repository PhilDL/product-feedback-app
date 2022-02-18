import React from "react";

import FeedbacksListHeader from "../../components/FeedbacksListHeader";

export default {
  title: "Components/FeedbacksListHeader",
  component: FeedbacksListHeader,
};

const Template = (args) => <FeedbacksListHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  feedbackCount: 6,
};

export const Empty = Template.bind({});
Empty.args = {
  feedbackCount: 0,
};
