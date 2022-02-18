import React from "react";

import Tag from "../../components/UI/Tag";

export default {
  title: "UI/Tag",
  component: Tag,
};

const Template = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Enhancement",
  role: "Default",
  href: "#",
};

export const Selected = Template.bind({});
Selected.args = {
  children: "Feature",
  selected: true,
  href: "#",
};
