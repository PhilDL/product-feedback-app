import React from "react";

import Upvote from "../../components/UI/Upvote";

export default {
  title: "UI/Upvote",
  component: Upvote,
};

const Template = (args) => <Upvote {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 99,
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  count: 99,
  active: true,
};
