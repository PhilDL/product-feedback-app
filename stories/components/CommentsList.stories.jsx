import React from "react";

import CommentsList from "../../components/CommentsList";

export default {
  title: "Components/CommentsList",
  component: CommentsList,
};

const Template = (args) => <CommentsList {...args} />;

const comments = [
  {
    id: 8,
    content:
      "I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?",
    user: {
      avatar_url: "./assets/user-images/image-victoria.jpg",
      full_name: "Victoria Mejia",
      username: "arlen_the_marlin",
    },
    replies: [
      {
        content:
          "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
        replying_to: "arlen_the_marlin",
        user: {
          avatar_url: "./assets/user-images/image-zena.jpg",
          full_name: "Zena Kelley",
          username: "velvetround",
        },
      },
      {
        id: 5,
        content:
          "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
        replying_to: "arlen_the_marlin",
        user: {
          avatar_url: "./assets/user-images/image-george.jpg",
          full_name: "George Partridge",
          username: "soccerviewer8",
        },
      },
    ],
  },
  {
    id: 9,
    content:
      "I've been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that",
    user: {
      avatar_url: "./assets/user-images/image-jackson.jpg",
      full_name: "Jackson Barker",
      username: "countryspirit",
    },
  },
  {
    id: 3,
    content:
      "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
    user: {
      avatar_url: "./assets/user-images/image-elijah.jpg",
      full_name: "Elijah Moss",
      username: "hexagon.bestagon",
    },
  },
  {
    id: 4,
    content:
      "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
    user: {
      avatar_url: "./assets/user-images/image-james.jpg",
      full_name: "James Skinner",
      username: "hummingbird1",
    },
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
        replies: [
          {
            content:
              "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
            replying_to: "arlen_the_marlin",
            user: {
              avatar_url: "./assets/user-images/image-zena.jpg",
              full_name: "Zena Kelley",
              username: "velvetround",
            },
          },
        ],
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
      },
    ],
  },
];
export const Default = Template.bind({});
Default.args = {
  comments: comments,
  totalComments: 9,
};
