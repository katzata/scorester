const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});