module.exports = {
  collectCoverageFrom: ['**/src/**/*.ts'],
  coverageThreshold: {
    // Change the threshold as the coverage grows
    global: { statements: 25, branches: 15, functions: 25, lines: 25 },
    // Add per glob coverage threshold here
  },
  // projects: ['./test/jest.app.js', './test/jest.lint.js'],
  projects: ['./test/jest.app.js', './test/jest.lint.js'],
  watchPlugins: ['jest-watch-select-projects'],
};
