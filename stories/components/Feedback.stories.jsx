import React from "react";

import Feedback from "../../components/Feedback";

export default {
  title: "Components/Feedback",
  component: Feedback,
};

const Template = (args) => <Feedback {...args} />;

const feedback = {
  id: "1",
  title: "Add tags for solutions",
  description: "Easier to search for solutions based on specific task.",
  slug: "add-tags-for-solution-01",
  tag: { name: "Enhancement", slug: "enhancement" },
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2020-01-01T00:00:00.000Z",
  comments: 32,
  upvotes: 44,
};
export const Default = Template.bind({});
Default.args = {
  feedback: feedback,
};

export const Upvoted = Template.bind({});
Upvoted.args = {
  feedback: feedback,
  userUpvote: true,
};
