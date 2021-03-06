module.exports = {
  displayName: 'api-codelab',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'html'],
  coverageDirectory: '../../../coverage/apps/api/codelab',
}
