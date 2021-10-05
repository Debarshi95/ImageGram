module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/coverage/",
    "!<rootDir>/build/",
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/utils/mocks/stylemock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
