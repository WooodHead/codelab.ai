const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  setupFiles: [`${__dirname}/jest.setup.js`],
  setupFilesAfterEnv: [
    // `${__dirname}/.jest/jest.setup.js`,
    '@testing-library/jest-dom',
  ],
  testTimeout: 30000,
  // testPathIgnorePatterns: ['i.spec.ts'],
  // testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  // transform: {
  //   '^.+\\.(ts|js|html)$': 'ts-jest',
  // },
  // resolver: '@nrwl/jest/plugins/resolver',
  // moduleFileExtensions: ['ts', 'js', 'html'],
  // coverageReporters: ['html'],
  // transformIgnorePatterns: ['node_modules/(?!(deepdash-es|lodash-es)/)'],
}
