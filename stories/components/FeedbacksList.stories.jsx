import React from "react";

import FeedbacksList from "../../components/FeedbacksList";

export default {
  title: "Components/FeedbacksList",
  component: FeedbacksList,
};

const FEEDBACKS = [
  {
    id: "1",
    title: "Add tags for solutions",
    description: "Easier to search for solutions based on specific task.",
    slug: "add-tags-for-solution-01",
    tag: { name: "Enhancement", slug: "enhancement" },
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    comments: 2,
    upvotes: 112,
  },
  {
    id: "2",
    title: "Add a dark theme option",
    description:
      "It would help people with light sensitivities and who prefer dark mode.",
    slug: "add-a-dark-theme-option-02",
    tag: { name: "Feature", slug: "feature" },
    createdAt: "2022-03-01T00:00:00.000Z",
    updatedAt: "2022-03-01T00:00:00.000Z",
    comments: 4,
    upvotes: 99,
  },
  {
    id: "3",
    title: "Q&A within the challenge hubs",
    description: "Challenge-specific Q&A would make for easy reference.",
    slug: "qa-withing-the-challenge-hubs-03",
    tag: { name: "Feature", slug: "feature" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 1,
    upvotes: 65,
  },
  {
    id: "4",
    title: "Allow image/video upload to feedback",
    description: "Images and screencasts can enhance comments on solutions..",
    slug: "allow-image-video-upload-to-feedback-04",
    tag: { name: "Enhancement", slug: "enhancement" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 2,
    upvotes: 51,
  },
  {
    id: "5",
    title: "Ability to follow others",
    description: "Stay updated on comments and solutions other people post.",
    slug: "ability-to-follow-others-05",
    tag: { name: "Feature", slug: "feature" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 3,
    upvotes: 42,
  },
  {
    id: "6",
    title: "Preview images not loading",
    description:
      "Challenge preview images are missing when you apply a filter.",
    slug: "preview-images-not-loading-06",
    tag: { name: "Bug", slug: "bug" },
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2022-11-01T00:00:00.000Z",
    comments: 0,
    upvotes: 3,
  },
];

const Template = (args) => <FeedbacksList {...args} />;

export const Default = Template.bind({});
Default.args = {
  feedbacks: FEEDBACKS,
  userUpvotedFeedbacksIds: ["4", "6"],
};

export const Empty = Template.bind({});
Empty.args = {
  feedbacks: [],
  userUpvotedFeedbacksIds: [],
};
