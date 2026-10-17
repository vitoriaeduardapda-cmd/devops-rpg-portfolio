/** Configuração do Jest para o portfólio RPG */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/app"],
  testMatch: ["<rootDir>/app/**/__tests__/**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^next/image$": "<rootDir>/__mocks__/next-image-mock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { isolatedModules: true }],
  },
};
