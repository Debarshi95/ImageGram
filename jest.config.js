module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/utils/mocks/stylemock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
