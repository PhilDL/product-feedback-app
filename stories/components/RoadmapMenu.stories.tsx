import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";

import RoadmapMenu, { RoadmapMenuProps } from "../../components/RoadmapMenu";

const meta: Meta = {
  title: "components/RoadmapMenu",
  component: RoadmapMenu,
};
export default meta;

const Template: ComponentStory<FC<RoadmapMenuProps>> = (args) => (
  <RoadmapMenu {...args} />
);

const feedbackStatuses = [
  { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
  { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
  { name: "Live", key: "live", count: 0, color: "#62BCFA" },
];

export const Default = Template.bind({});
Default.args = {
  feedbackStatuses: feedbackStatuses,
};
