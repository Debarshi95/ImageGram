module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
    amd: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
