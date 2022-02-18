import React from "react";

import SelectField from "../../components/UI/SelectField";

export default {
  title: "UI/SelectField",
  component: SelectField,
};

const Template = (args) => <SelectField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: {
    feature: "Feature",
    ui: "UI",
    ux: "UX",
    enhancement: "Enhancement",
    bug: "Bug",
  },
  defaultValue: "feature",
  inputName: "category",
  help: "Choose a category for your feedback",
  label: "Category",
};
