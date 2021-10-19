module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/coverage/',
    '!<rootDir>/build/',
  ],
  moduleNameMapper: { '\\.(css|scss)$': '<rootDir>/src/utils/__mocks__/stylemock.js' },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
