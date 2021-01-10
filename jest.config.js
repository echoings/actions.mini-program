module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/build/"],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  reporters: [
    'default', 
    ['jest-html-reporters', {
      "publicPath": "./coverage",
      "filename": "report.html",
      "expand": true
    }]
  ],
  collectCoverageFrom: ['src/**/*.{js,ts}']
};
