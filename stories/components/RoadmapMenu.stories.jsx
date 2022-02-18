import React from "react";

import RoadmapMenu from "../../components/RoadmapMenu";

export default {
  title: "Components/RoadmapMenu",
  component: RoadmapMenu,
};

const Template = (args) => <RoadmapMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  feedbackStatuses: [
    { name: "Planned", count: 2, color: "#F49F85" },
    { name: "In-Progress", count: 3, color: "#AD1FEA" },
    { name: "Live", count: 1, color: "#62BCFA" },
  ],
};
