import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import NewFeedback, { NewFeedbackProps } from "../../pages/new-feedback";
import { mockedCategories } from "../mock";

const meta: Meta = {
  title: "Pages/NewFeedback",
  component: NewFeedback,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
    withMock,
  ],
};

export default meta;

const Template: ComponentStory<FC<NewFeedbackProps>> = (args) => (
  <NewFeedback {...args} />
);

export const Default = Template.bind({});
Default.args = {
  categories: mockedCategories,
};
