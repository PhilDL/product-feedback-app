import React from "react";

import ApplicationLogo from "../../components/UI/ApplicationLogo";

export default {
  title: "UI/ApplicationLogo",
  component: ApplicationLogo,
};

const Template = (args) => <ApplicationLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
