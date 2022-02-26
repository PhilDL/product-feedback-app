import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { FC } from "react";
import { withReactContext } from "storybook-react-context";
import { UserContext } from "../../utils/useUser";
import FeedbackDetails, {
  FeedbackDetailsProps,
} from "../../pages/feedback/[slug]";
import { mockedFeedbacks } from "../mock";

const meta: Meta = {
  title: "Pages/FeedbackDetails",
  component: FeedbackDetails,
  decorators: [
    withReactContext({
      Context: UserContext,
      initialState: { user: false },
    }),
    withMock,
  ],
};

export default meta;

const Template: ComponentStory<FC<FeedbackDetailsProps>> = (args) => (
  <FeedbackDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initFeedback: mockedFeedbacks[0],
  slug: mockedFeedbacks[0].slug,
};
