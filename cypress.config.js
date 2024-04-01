const { defineConfig } = require('cypress');
// https://docs.cypress.io/guides/guides/command-line

module.exports = defineConfig({
  projectId: '91h2z2', // https://cloud.cypress.io/projects/91h2z2/settings
  env: {
    codeCoverage: {
      url: 'http://localhost:9080/__coverage__/', // https://docs.cypress.io/guides/tooling/code-coverage#Full-stack-code-coverage
      expectBackendCoverageOnly: false
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    baseUrl: 'https://snapshot.bigstack.co/',
    video: true,
    experimentalStudio: true, // https://docs.cypress.io/guides/references/cypress-studio
    viewportHeight: 900,
    viewportWidth: 1440
  }
});
