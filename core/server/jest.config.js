module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[t]s?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__mock__/",
    "/redis/",
    "/mongo/",
    "/dist/",
  ],
  modulePathIgnorePatterns: [
    "/node_modules/",
    "/__mock__/",
    "/redis/",
    "/mongo/",
    "/dist/",
  ],
  globalSetup: "./__tests__/jest-setup.ts",
  globalTeardown: "./__tests__/jest-teardown.ts",
  cacheDirectory: ".jest-cache",
  testTimeout: 20000,
};
