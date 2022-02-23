import React from "react";

import Comment from "../../components/Comment";

export default {
  title: "Components/Comment",
  component: Comment,
};

const Template = (args) => (
  <div className="bg-white" style={{ padding: "24px 48px" }}>
    <Comment {...args} />
  </div>
);

const comment = {
  id: 4,
  content:
    "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
  user: {
    avatar_url: "./assets/user-images/image-james.jpg",
    full_name: "James Skinner",
    username: "hummingbird1",
  },
  feedbackId: 2,
  replies: [],
};
const commentWithReplies = {
  id: 4,
  content:
    "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
  user: {
    avatar_url: "./assets/user-images/image-james.jpg",
    full_name: "James Skinner",
    username: "hummingbird1",
  },
  feedbackId: 2,
  replies: [
    {
      content:
        "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
      replying_to: "hummingbird1",
      user: {
        avatar_url: "./assets/user-images/image-anne.jpg",
        full_name: "Anne Valentine",
        username: "annev1990",
      },
      feedbackId: 2,
    },
    {
      content:
        "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
      replying_to: "annev1990",
      user: {
        avatar_url: "./assets/user-images/image-ryan.jpg",
        full_name: "Ryan Welles",
        username: "voyager.344",
      },
      feedbackId: 2,
    },
  ],
};
export const Default = Template.bind({});
Default.args = {
  comment: comment,
};

export const WithReplies = Template.bind({});
WithReplies.args = {
  comment: commentWithReplies,
};
