import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import Suggestions, { SuggestionsProps } from "../../pages/index";
import { mockedFeedbacks, mockedCategories } from "../mock";

const meta: Meta = {
  title: "Pages/Suggestions",
  component: Suggestions,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
    withMock,
  ],
};

export default meta;

const Template: ComponentStory<FC<SuggestionsProps>> = (args) => (
  <Suggestions {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialFeedbacks: mockedFeedbacks,
  categories: mockedCategories,
};

export const Empty = Template.bind({});
Empty.args = {
  initialFeedbacks: [],
  categories: mockedCategories,
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
