import React from "react";

import TagsCloud from "../../components/TagsCloud";

export default {
  title: "Components/TagsCloud",
  component: TagsCloud,
};

const Template = (args) => <TagsCloud {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: [
    { id: 1, created_at: "2022-02-21T18:18:13+00:00", name: "UI" },
    { id: 2, created_at: "2022-02-21T18:18:20+00:00", name: "UX" },
    { id: 3, created_at: "2022-02-21T18:18:24+00:00", name: "Bug" },
    {
      id: 4,
      created_at: "2022-02-21T18:18:31+00:00",
      name: "Enhancement",
    },
    { id: 5, created_at: "2022-02-21T18:18:46+00:00", name: "Feature" },
  ],
  selectedTag: "enchancement",
};

export const TagActive = Template.bind({});
TagActive.args = {
  tags: [
    { id: 1, created_at: "2022-02-21T18:18:13+00:00", name: "UI" },
    { id: 2, created_at: "2022-02-21T18:18:20+00:00", name: "UX" },
    { id: 3, created_at: "2022-02-21T18:18:24+00:00", name: "Bug" },
    {
      id: 4,
      created_at: "2022-02-21T18:18:31+00:00",
      name: "Enhancement",
    },
    { id: 5, created_at: "2022-02-21T18:18:46+00:00", name: "Feature" },
  ],
  selectedTag: "enchancement",
};
