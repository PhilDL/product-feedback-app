import React from "react";

import SortDropdown from "../../components/UI/SortDropdown";

export default {
  title: "UI/SortDropdown",
  component: SortDropdown,
};

const Template = (args) => <SortDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: {
    "most-upvotes": "Most Upvotes",
    "least-upvotes": "Least Upvotes",
    "most-comments": "Most Comments",
    "least-comments": "Least Comments",
  },
  defaultValue: "most-upvotes",
  inputName: "sort",
  onChangeSort: (value) => {
    console.log("Change sort to:", value);
  },
};
