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
    { name: "Enhancement", slug: "enchancement" },
    { name: "Feature", slug: "feature" },
    { name: "Bug", slug: "bug" },
    { name: "UI", slug: "ui" },
    { name: "UX", slug: "ux" },
    { name: "Documentation", slug: "documentation" },
  ],
  selectedTag: "enchancement",
};

export const TagActive = Template.bind({});
TagActive.args = {
  tags: [
    { name: "Enhancement", slug: "enchancement" },
    { name: "Feature", slug: "feature" },
    { name: "Bug", slug: "bug" },
    { name: "UI", slug: "ui" },
    { name: "UX", slug: "ux" },
    { name: "Documentation", slug: "documentation" },
  ],
  selectedTag: "enchancement",
};
