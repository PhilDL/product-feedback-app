import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import Roadmap, { RoadmapProps } from "../../pages/roadmap";
import { mockedFeedbacks } from "../mock";

const meta: Meta = {
  title: "Pages/Roadmap",
  component: Roadmap,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
    withMock,
  ],
};

export default meta;

const Template: ComponentStory<FC<RoadmapProps>> = (args) => (
  <Roadmap {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialFeedbacks: mockedFeedbacks,
};

export const Empty = Template.bind({});
Empty.args = {
  initialFeedbacks: [],
};
Empty.parameters = {
  mockData: [
    {
      url: "/api/feedbacks",
      method: "GET",
      status: 200,
      response: {
        data: [],
      },
    },
  ],
};
