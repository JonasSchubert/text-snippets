module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/{!(main|index|*.plugin|registerServiceWorker),}.{ts,vue}'
  ],
  coverageDirectory: './coverage/',
  coverageThreshold: {
    global: {
      branches: 22.5,
      functions: 70,
      lines: 77.5,
      statements: 77.5
    }
  },
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: [
    'jest-localstorage-mock'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  transformIgnorePatterns: [
    "/node_modules(?![\\\\/]vuetify[\\\\/])/"
  ]
};
