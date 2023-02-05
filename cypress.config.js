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

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
