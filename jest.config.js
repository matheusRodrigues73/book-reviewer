const nextJest = require("next/jest");
const { root } = require("postcss");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
};

module.exports = createJestConfig(config);
