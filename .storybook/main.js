module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
    "storybook-formik/register",
    "storybook-addon-mock/register",
  ],
  core: {
    builder: "webpack5",
  },
};
