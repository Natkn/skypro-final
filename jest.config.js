
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})


const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {

    '^@/(.*)$': '<rootDir>/src/$1',
 '^next/navigation$': '<rootDir>/__mocks__/next/navigation.ts',
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.module\\.(css|sass|scss)$',
  ],
}

module.exports = createJestConfig(customJestConfig)